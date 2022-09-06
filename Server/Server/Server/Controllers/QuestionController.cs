using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Models;
using Server.Repositories;

namespace Server.Controllers; 

[ApiController]
[Route("questions")]
public class QuestionController : Controller {

    private readonly IMapper _mapper;
    private readonly QuestionRepository _questionRepository;
    private readonly QuizRepository _quizRepository;

    public QuestionController(IMapper mapper, QuestionRepository questionRepository, QuizRepository quizRepository) {
        this._mapper = mapper;
        this._questionRepository = questionRepository;
        this._quizRepository = quizRepository;
    }

    [HttpGet]
    [ProducesResponseType(200, Type = typeof(ICollection<QuestionOutputDto>))]
    public IActionResult GetAll() {
        var questions = this._questionRepository.GetAll();
        var questionOutput = this._mapper.Map<ICollection<QuestionOutputDto>>(questions);
        return Ok(questionOutput);
    }
    
    [HttpGet("{id}")]
    [ProducesResponseType(200, Type = typeof(QuestionOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult GetOne(int id) {
        var question = this._questionRepository.GetOneById(id);
        if (question == null) {
            return NotFound("Question does not exist");
        } else {
            var questionOutput = this._mapper.Map<QuestionOutputDto>(question);
            return Ok(questionOutput);
        }
    }
    
    [HttpPost()]
    [ProducesResponseType(201, Type = typeof(QuestionOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    [ProducesResponseType(409, Type = typeof(string))]
    public IActionResult AddOne([FromBody] CreateQuestionDto createQuestionDto) {
        var question = this._mapper.Map<Question>(createQuestionDto);
        var quiz = this._quizRepository.GetOneById(createQuestionDto.QuizId);
        if (this._questionRepository.IsQuestionExist(question.Id)) {
            return Conflict("Question already exist");
        } else if (quiz == null) {
            return NotFound("Quiz does not exist");
        } else {
            question.Quiz = quiz;
            var createdQuestion = this._questionRepository.AddQuestion(question);
            var questionOutput = this._mapper.Map<QuestionOutputDto>(createdQuestion);
            return CreatedAtAction(nameof(GetOne), new { questionOutput.Id }, questionOutput);
        }
    }
    
    [HttpDelete("{id}")]
    [ProducesResponseType(200, Type = typeof(QuestionOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult DeleteOne(int id) {
        var question = this._questionRepository.GetOneById(id);
        if (question == null || !this._questionRepository.IsQuestionExist(id)) {
            return NotFound("Question does not exist");
        } else {
            var deletedQuestion = this._questionRepository.DeleteQuestion(id);
            var questionOutput = this._mapper.Map<QuestionOutputDto>(deletedQuestion);
            return Ok(questionOutput);
        }
    }
    
    [HttpPatch("{id}")]
    [ProducesResponseType(200, Type = typeof(QuestionOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult UpdateOne(int id, [FromBody] UpdateQuestionDto updateQuestionDto) {
        var question = this._questionRepository.GetOneById(id);
        if (question == null) {
            return NotFound("Question does not exist");
        } else {
            question.Content = updateQuestionDto.Content ?? question.Content;
            question.Explanation = updateQuestionDto.Explanation ?? question.Explanation;
            var updatedQuestion = this._questionRepository.UpdateQuestion(id, question);
            var questionOutput = this._mapper.Map<QuestionOutputDto>(updatedQuestion);
            return Ok(questionOutput);
        }
    }

    [HttpGet("{id}/options")]
    [ProducesResponseType(200, Type = typeof(ICollection<OptionOutputDto>))]
    [ProducesResponseType(200, Type = typeof(ICollection<OptionNoAnswerOutputDto>))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult GetAllOptions(int id, [FromQuery] bool withAnswer) {
        var options = this._questionRepository.GetOptionsOfQuestion(id);
        if (options == null) {
            return NotFound("Question does not exist");
        } else if(withAnswer) {
            var optionOutput = this._mapper.Map<ICollection<OptionOutputDto>>(options);
            return Ok(optionOutput);
        } else {
            var optionOutput = this._mapper.Map<ICollection<OptionNoAnswerOutputDto>>(options);
            return Ok(optionOutput);
        }
    }

    [HttpPost("with-options")]
    [ProducesResponseType(200, Type = typeof(QuestionOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    [ProducesResponseType(409, Type = typeof(string))]
    public IActionResult CreateQuestionWithOptions([FromBody] CreateQuestionWithOptionDto createQuestionDto) {
        var question = this._mapper.Map<Question>(createQuestionDto);
        var options = new List<Option>();
        var quiz = this._quizRepository.GetOneById(createQuestionDto.QuizId);
        if (quiz == null) return NotFound("Quiz does not exist");
        question.Quiz = quiz;
        foreach (var option in createQuestionDto.Options) {
            var repeatedContentCount = createQuestionDto.Options.Count(x => x.Content == option.Content);
            if (repeatedContentCount > 1) return Conflict("Repeated option content");
        }
        foreach (var createOptionDto in createQuestionDto.Options) {
            createOptionDto.QuestionId = 0;
            var option = this._mapper.Map<Option>(createOptionDto);
            options.Add(option);
        }
        question.Options = options;
        var createdQuestion = this._questionRepository.AddQuestion(question);
        var questionOutput = this._mapper.Map<QuestionOutputDto>(createdQuestion);
        return CreatedAtAction(nameof(GetOne), new { questionOutput.Id }, questionOutput);
    }

}