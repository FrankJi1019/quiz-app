using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Models;
using Server.Repositories;

namespace Server.Controllers; 

[ApiController]
[Route("attempts")]
public class AttemptController : Controller {

    private readonly AttemptRepository _attemptRepository;
    private readonly SessionRepository _sessionRepository;
    private readonly QuestionRepository _questionRepository;
    private readonly OptionRepository _optionRepository;

    public AttemptController(
        AttemptRepository attemptRepository, 
        SessionRepository sessionRepository,
        QuestionRepository questionRepository,
        OptionRepository optionRepository
    ) {
        this._attemptRepository = attemptRepository;
        this._sessionRepository = sessionRepository;
        this._questionRepository = questionRepository;
        this._optionRepository = optionRepository;
    }
    
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(ICollection<AttemptOutputDto>))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult GetAttempts([FromQuery] int sessionId) {
        if (this._sessionRepository.IsSessionExist(sessionId)) return NotFound("Session does not exist");
        var attempts = this._attemptRepository.GetAttemptsBySession(sessionId);
        var attemptOutputList = new List<AttemptOutputDto>();
        foreach (var attempt in attempts) {
            var attemptOutputDto = new AttemptOutputDto {
                Id = attempt.Id, OptionId = attempt.Option.Id,
                QuestionId = attempt.Question.Id, SessionId = attempt.Session.Id
            };
            attemptOutputList.Add(attemptOutputDto);
        }
        return Ok(attemptOutputList);
    }
    
    [HttpGet("{id}/check-answer")]
    [ProducesResponseType(200, Type = typeof(AttemptOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult GetAnswer(int id) {
        var attempt = this._attemptRepository.GetOneById(id);
        if (attempt == null) return NotFound("Attempt does not exist");
        var correctOption = this._questionRepository.GetAnswer(attempt.Question.Id)!;
        var output = new AnswerOutputDto {
            QuestionId = attempt.Question.Id,
            QuestionContent = attempt.Question.Content,
            CorrectAnswer = correctOption.Content,
            UserAnswer = attempt.Option.Content,
            IsCorrect = attempt.Option.IsCorrect
        };
        return Ok(output);
    }
    
    [HttpPost]
    [ProducesResponseType(200, Type = typeof(AttemptOutputDto))]
    [ProducesResponseType(400, Type = typeof(string))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult CreateAttempt([FromBody] CreateAttemptDto createAttemptDto) {
        var question = this._questionRepository.GetOneById(createAttemptDto.QuestionId);
        if (question == null) return NotFound("Question does not exist");
        var option = this._optionRepository.GetOneById(createAttemptDto.OptionId);
        if (option == null) return NotFound("Option does not exist");
        if (option.Question.Id != question.Id) return BadRequest("Option does not belong to the question");
        var session = this._sessionRepository.GetOneById(createAttemptDto.SessionId);
        if (session == null) return NotFound("Session does not exist");
        var existingAttempt = this._attemptRepository.GetAttemptBySessionAndQuestion(
                createAttemptDto.SessionId, createAttemptDto.QuestionId
        );
        Attempt newAttempt;
        if (existingAttempt == null) {
            var attempt = new Attempt {
                Option = option, Question = question, Session = session
            };
            newAttempt = this._attemptRepository.CreateAttempt(attempt);
        } else {
            newAttempt = this._attemptRepository.ChangeOption(existingAttempt.Id, createAttemptDto.OptionId);
        }
        var attemptOutput = new AttemptOutputDto {
            Id = newAttempt.Id, OptionId = newAttempt.Option.Id,
            QuestionId = newAttempt.Question.Id, SessionId = newAttempt.Session.Id
        };
        return Ok(attemptOutput);
    }
    
}