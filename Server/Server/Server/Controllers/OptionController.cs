using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Server.Dto;
using Server.Models;
using Server.Repositories;

namespace Server.Controllers; 

[ApiController]
[Route("options")]
public class OptionController : Controller {

    private readonly IMapper _mapper;
    private readonly OptionRepository _optionRepository;
    private readonly QuestionRepository _questionRepository;

    public OptionController(IMapper mapper, OptionRepository optionRepository, QuestionRepository questionRepository) {
        this._mapper = mapper;
        this._optionRepository = optionRepository;
        this._questionRepository = questionRepository;
    }
    
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(ICollection<OptionOutputDto>))]
    public IActionResult GetAll() {
        var options = this._optionRepository.GetAll();
        var optionOutput = this._mapper.Map<ICollection<OptionOutputDto>>(options);
        return Ok(optionOutput);
    }
    
    [HttpGet("{id}")]
    [ProducesResponseType(200, Type = typeof(OptionOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult GetOne(int id) {
        var option = this._optionRepository.GetOneById(id);
        if (option == null) {
            return NotFound("Option does not exist");
        } else {
            var optionOutput = this._mapper.Map<OptionOutputDto>(option);
            return Ok(optionOutput);
        }
    }
    
    [HttpPost()]
    [ProducesResponseType(201, Type = typeof(OptionOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    [ProducesResponseType(409, Type = typeof(string))]
    public IActionResult AddOne([FromBody] CreateOptionDto createOptionDto) {
        var option = this._mapper.Map<Option>(createOptionDto);
        var question = this._questionRepository.GetOneById(createOptionDto.QuestionId);
        if (this._optionRepository.IsOptionExist(option.Id)) {
            return Conflict("Option already exist");
        } else if (question == null) {
            return NotFound("Question does not exist");
        } else {
            option.Question = question;
            var createdOption = this._optionRepository.AddOption(option);
            var optionOutput = this._mapper.Map<OptionOutputDto>(createdOption);
            return CreatedAtAction(nameof(GetOne), new { optionOutput.Id }, optionOutput);
        }
    }
    
    [HttpDelete("{id}")]
    [ProducesResponseType(200, Type = typeof(OptionOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult DeleteOne(int id) {
        var option = this._optionRepository.GetOneById(id);
        if (option == null || !this._optionRepository.IsOptionExist(option.Id)) {
            return NotFound("Option does not exist");
        } else {
            var deletedOption = this._optionRepository.DeleteOption(id);
            var optionOutput = this._mapper.Map<OptionOutputDto>(deletedOption);
            return Ok(optionOutput);
        }
    }
    
    [HttpPatch("{id}")]
    [ProducesResponseType(200, Type = typeof(OptionOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult UpdateOne(int id, [FromBody] UpdateOptionDto updateOptionDto) {
        var option = this._optionRepository.GetOneById(id);
        if (option == null) {
            return NotFound("Option does not exist");
        } else {
            option.Content = updateOptionDto.Content ?? option.Content;
            option.IsCorrect = updateOptionDto.IsCorrect ?? option.IsCorrect;
            var updatedOption = this._optionRepository.UpdateOption(id, option);
            var optionOutput = this._mapper.Map<OptionOutputDto>(updatedOption);
            return Ok(optionOutput);
        }
    }
    
}