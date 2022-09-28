using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Models;
using Server.Repositories;

namespace Server.Controllers; 

[ApiController]
[Route("sessions")]
public class SessionController : Controller {

    private IMapper _mapper;
    private readonly SessionRepository _sessionRepository;
    private readonly QuizRepository _quizRepository;
    private readonly UserRepository _userRepository;
    private readonly AttemptRepository _attemptRepository;
    private readonly QuestionRepository _questionRepository;

    public SessionController(
        IMapper mapper, 
        SessionRepository sessionRepository,
        QuizRepository quizRepository,
        UserRepository userRepository,
        AttemptRepository attemptRepository,
        QuestionRepository questionRepository
    ) {
        this._mapper = mapper;
        this._sessionRepository = sessionRepository;
        this._quizRepository = quizRepository;
        this._userRepository = userRepository;
        this._attemptRepository = attemptRepository;
        this._questionRepository = questionRepository;
    }

    [HttpGet]
    [ProducesResponseType(200, Type = typeof(ICollection<SessionOutputDto>))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult GetUserSessions(
        [FromQuery] string username, 
        [FromQuery] SessionState state, 
        [FromQuery] int quizId = -1
    ) {
        if (!this._userRepository.IsUserExist(username)) return NotFound("User does not exist");
        if (quizId != -1 && !this._quizRepository.IsQuizExist(quizId)) return NotFound("Quiz does not exist");
        var sessions = this._sessionRepository.GetUserSessions(username, quizId, state);
        var sessionOutputs = this._mapper.Map<ICollection<SessionOutputDto>>(sessions);
        foreach (var sessionOutput in sessionOutputs) sessionOutput.Username = username;
        return Ok(sessionOutputs);
    }
    
    [HttpPost]
    [ProducesResponseType(200, Type = typeof(SessionOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult CreateSession([FromBody] CreateSessionDto createSessionDto) {
        var user = this._userRepository.GetUser(createSessionDto.Username);
        if (user == null) return NotFound("User does not exist");
        var quiz = this._quizRepository.GetOneById(createSessionDto.QuizId);
        if (quiz == null) return NotFound("Quiz does not exist");
        var existingSession = this._sessionRepository.GetUserSessions(
            createSessionDto.Username, createSessionDto.QuizId, SessionState.ACTIVE
        );
        foreach (var session in existingSession) this._sessionRepository.DeleteSession(session.Id);
        var newSession = new Session {
            User = user, Quiz = quiz
        };
        var createdSession = this._sessionRepository.CreateUserSession(newSession);
        var sessionOutput = this._mapper.Map<SessionOutputDto>(createdSession);
        sessionOutput.Username = createdSession.User.Username;
        return CreatedAtAction(null, null, sessionOutput);
    }
    
    [HttpPatch("{id}/finish")]
    [ProducesResponseType(200, Type = typeof(SessionOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult FinishSession(int id) {
        var finishedSession = this._sessionRepository.FinishSession(id);
        if (finishedSession == null) {
            return NotFound("Session does not exist");
        }
        var sessionOutput = this._mapper.Map<SessionOutputDto>(finishedSession);
        sessionOutput.Username = finishedSession.User.Username;
        return Ok(sessionOutput);
    }
    
    [HttpGet("{id}/check-answer")]
    [ProducesResponseType(200, Type = typeof(ICollection<AnswerOutputDto>))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult GetResult(int id) {
        var answerOutputList = new List<AnswerOutputDto>();
        var session = this._sessionRepository.GetOneById(id);
        if (session == null) return NotFound("Session does not exist");
        var questions = this._quizRepository.GetAllQuestions(session.Quiz.Id)!;
        var attemptList = this._attemptRepository.GetAttemptsBySession(id, true);
        foreach (var question in questions) {
            var correctAnswer = this._questionRepository.GetAnswer(question.Id)!;
            var attempt = attemptList.FirstOrDefault(x => x.Question.Id == question.Id);
            var answerOutput = new AnswerOutputDto {
                Question = this._mapper.Map<QuestionOutputDto>(question),
                CorrectAnswer = correctAnswer.Content,
                UserAnswer = attempt == null ? "" : attempt.Option.Content,
                IsCorrect = attempt != null && attempt.Option.IsCorrect
            };
            answerOutputList.Add(answerOutput);
        }
        this._sessionRepository.FinishSession(id);
        return Ok(answerOutputList);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(200, Type = typeof(SessionOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult DeleteSession(int id) {
        var deletedSession = this._sessionRepository.DeleteSession(id);
        if (deletedSession == null) return NotFound("Session does not exist");
        var sessionOutput = this._mapper.Map<SessionOutputDto>(deletedSession);
        sessionOutput.Username = deletedSession.User.Username;
        return Ok(sessionOutput);
    }
    
    [HttpGet("{id}")]
    public IActionResult GetSessionById(int id) {
        var session = this._sessionRepository.GetOneById(id);
        if (session == null) return NotFound("Session does not exist");
        var sessionOutput = this._mapper.Map<SessionOutputDto>(session);
        sessionOutput.Username = session.User.Username;
        return Ok(sessionOutput);
    }
    
    [HttpGet("{id}/detailed-record")]
    public IActionResult GetSessionRecordById(int id) {
        var session = this._sessionRepository.GetOneById(id);
        if (session == null) return NotFound("Session does not exist");
        if (session.State == SessionState.FINISHED) return BadRequest("Session has finished");
        var attempts = this._attemptRepository.GetAttemptsBySession(session.Id, true);
        var questions = this._quizRepository.GetAllQuestions(session.Quiz.Id)!;
        var recordOutputList = new List<RecordOutputDto>();
        foreach (var question in questions) {
            var attempt = attempts.FirstOrDefault(x => x.Question.Id == question.Id);
            var recordOutput = new RecordOutputDto {
                Question = this._mapper.Map<QuestionOutputDto>(question),
                Option = attempt == null ? null : this._mapper.Map<OptionOutputDto>(attempt.Option)
            };
            recordOutputList.Add(recordOutput);
        }
        return Ok(recordOutputList);
    }

    [HttpGet("{sessionId}/questions/{questionId}/check-answer")]
    public IActionResult GetQuestionResult(int sessionId, int questionId) {
        var question = this._questionRepository.GetOneById(questionId);
        if (question == null) return NotFound("Question does not exist");
        var session = this._sessionRepository.GetOneById(sessionId);
        if (session == null) return NotFound("Session does not exist");
        var correctAnswer = this._questionRepository.GetAnswer(question.Id)!;
        var attempt = this._attemptRepository.GetAttemptBySessionAndQuestion(session.Id, question.Id);
        var resultOutput = new AnswerOutputDto {
            Question = this._mapper.Map<QuestionOutputDto>(question),
            CorrectAnswer = correctAnswer.Content,
            IsCorrect = attempt != null && attempt.Option.Id == correctAnswer.Id,
            UserAnswer = attempt == null ? "" : attempt.Option.Content
        };
        return Ok(resultOutput);
    }

}
