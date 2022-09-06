using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Repositories;
using Server.Models;

namespace Server.Controllers; 

[ApiController]
[Route("quizzes")]
public class QuizController : Controller {

    private readonly IMapper _mapper;
    private readonly QuizRepository _quizRepository;
    private readonly TopicRepository _topicRepository;
    private readonly QuestionRepository _questionRepository;
    private readonly OptionRepository _optionRepository;
    private readonly UserRepository _userRepository;

    public QuizController(
        IMapper mapper, 
        QuizRepository quizRepository, 
        TopicRepository topicRepository, 
        QuestionRepository questionRepository,
        OptionRepository optionRepository,
        UserRepository userRepository
    ) {
        this._mapper = mapper;
        this._quizRepository = quizRepository;
        this._topicRepository = topicRepository;
        this._questionRepository = questionRepository;
        this._optionRepository = optionRepository;
        this._userRepository = userRepository;
    }

    [HttpGet]
    [ProducesResponseType(200, Type = typeof(ICollection<QuizOutputDto>))]
    public IActionResult GetAll([FromQuery] bool ignoreEmpty, [FromQuery] string? keyword = "") {
        // var quizzes = ignoreEmpty ? this._quizRepository.GetAllNonEmpty() : this._quizRepository.GetAll() ;
        var quizzes = this._quizRepository.GetAll(ignoreEmpty);
        quizzes = quizzes.Where(x => x.Name.ToLower().Contains(keyword!.ToLower())).ToList();
        var quizOutputs = this._mapper.Map<ICollection<QuizOutputDto>>(quizzes);
        return Ok(quizOutputs);
    }
    
    [HttpGet("{id}")]
    [ProducesResponseType(200, Type = typeof(QuizOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult GetOne(int id) {
        var quiz = this._quizRepository.GetOneById(id);
        if (quiz == null) {
            return NotFound("Quiz does not exist");
        } else {
            QuizOutputDto quizOutput = this._mapper.Map<QuizOutputDto>(quiz);
            quizOutput.Topics = quiz.Topics.Select(x => x.Name).ToList();
            quizOutput.AuthorUsername = quiz.Author.Username;
            return Ok(quizOutput);
        }
    }

    [HttpGet("{id}/questions")]
    [ProducesResponseType(200, Type = typeof(ICollection<QuestionOutputDto>))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult GetQuestions(int id) {
        var questions = this._quizRepository.GetAllQuestions(id);
        if (questions == null) {
            return NotFound("Quiz does not exist");
        } else {
            var questionOutput = this._mapper.Map<ICollection<QuestionOutputDto>>(questions);
            return Ok(questionOutput);
        }
    }
    
    [HttpGet("{id}/question-count")]
    [ProducesResponseType(200, Type = typeof(int))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult GetQuestionCount(int id) {
        var count = this._quizRepository.GetQuestionNumber(id);
        if (count == -1) {
            return NotFound("Quiz does not exist");
        } else {
            return Ok(count);
        }
    }

    [HttpPost()]
    [ProducesResponseType(201, Type = typeof(QuizOutputDto))]
    [ProducesResponseType(403, Type = typeof(string))]
    [ProducesResponseType(404, Type = typeof(string))]
    [ProducesResponseType(409, Type = typeof(string))]
    public IActionResult AddOne([FromBody] CreateQuizDto createQuizDto) {
        var author = this._userRepository.GetUser(createQuizDto.AuthorUsername);
        if (author == null) {
            return NotFound("Invalid author ID");
        }
        if (createQuizDto.TopicStrings.Count > 3) {
            return Forbid("A quiz can have up to 3 topics");
        }
        if (createQuizDto.TopicStrings.Count == 0) {
            return Forbid("A quiz must have at least 1 topic");
        }
        var quiz = this._mapper.Map<Quiz>(createQuizDto);
        var topics = new List<Topic>();
        foreach (var s in createQuizDto.TopicStrings) {
            var topic = this._topicRepository.GetOneByName(s) ?? this._topicRepository.AddTopic(new Topic { Name = s });
            topics.Add(topic);
        }
        quiz.Topics = topics;
        if (this._quizRepository.IsQuizExist(quiz.Id)) {
            return Conflict("Quiz already exist");
        } else {
            quiz.Author = author;
            var createdQuiz = this._quizRepository.AddQuiz(quiz);
            var quizOutput = this._mapper.Map<QuizOutputDto>(createdQuiz);
            this.AppendTopicStringList(createdQuiz, quizOutput);
            return CreatedAtAction(nameof(GetOne), new { createdQuiz.Id }, quizOutput);
        }
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(200, Type = typeof(QuizOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult DeleteOne(int id) {
        var deletedQuiz = this._quizRepository.DeleteQuiz(id);
        if (deletedQuiz == null) {
            return NotFound("Quiz does not exist");
        } else {
            var quizOutput = this._mapper.Map<QuizOutputDto>(deletedQuiz);
            this.AppendTopicStringList(deletedQuiz, quizOutput);
            return Ok(quizOutput);
        }
    }

    [HttpPatch("{id}")]
    [ProducesResponseType(200, Type = typeof(QuizOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult UpdateOne(int id, [FromBody] UpdateQuizDto updateQuizDto) {
        var quiz = this._quizRepository.GetOneById(id);
        if (quiz == null) {
            return NotFound("Quiz does not exist");
        } else {
            quiz.Name = updateQuizDto.Name ?? quiz.Name;
            quiz.Description = updateQuizDto.Description ?? quiz.Description;
            var updatedQuiz = this._quizRepository.UpdateQuiz(id, quiz);
            var quizOutput = this._mapper.Map<QuizOutputDto>(updatedQuiz);
            this.AppendTopicStringList(updatedQuiz!, quizOutput);
            return Ok(quizOutput);
        }
    }
    
    [HttpPost("{id}/check-answer")]
    [ProducesResponseType(200, Type = typeof(ICollection<AnswerOutputDto>))]
    [ProducesResponseType(403, Type = typeof(string))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult CheckAnswer(int id, [FromBody] ICollection<CheckAnswerDto> checkAnswerDtos) {
        var answerOutputList = new List<AnswerOutputDto>();
        var questions = this._quizRepository.GetAllQuestions(id);
        if (questions == null) return NotFound("Quiz does not exist");
        foreach (var checkAnswerDto in checkAnswerDtos) {
            if (questions.All(x => x.Id != checkAnswerDto.QuestionId)) {
                return BadRequest($"Question id {checkAnswerDto.QuestionId} does not exist in the quiz {id}");
            }
        }
        foreach (var question in questions) {
            var options = this._questionRepository.GetOptionsOfQuestion(question.Id);
            var correctOption = this._questionRepository.GetAnswer(question.Id);
            if (correctOption == null) return BadRequest($"Invalid question id {question.Id}: no correct answer");
            var userAnswer = checkAnswerDtos.FirstOrDefault(x => x.QuestionId == question.Id);
            var userOptionContent = "";
            if (userAnswer != null) {
                var userOption = this._optionRepository.GetOneById(userAnswer.AnswerOptionId);
                if (userOption == null) return NotFound($"Option id {userAnswer.AnswerOptionId} does not exist");
                if (options.All(x => x.Id != userAnswer.AnswerOptionId))
                    return BadRequest(
                        $"Option {userAnswer.AnswerOptionId} does not exist in question {question.Id}"
                    );
                userOptionContent = userOption.Content;
            }
            var answerOutput = new AnswerOutputDto {
                QuestionId = question.Id,
                QuestionContent = question.Content,
                CorrectAnswer = correctOption.Content,
                UserAnswer = userOptionContent
            };
            answerOutputList.Add(answerOutput);
        }
        return Ok(answerOutputList);
    }

    private void AppendTopicStringList(Quiz quiz, QuizOutputDto quizOutputDto) {
        quizOutputDto.Topics = quiz.Topics.Select(x => x.Name).ToList();
    }

}