using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Repositories;
using Server.Models;

namespace Server.Controllers; 

[ApiController]
[Route("topics")]
public class TopicController : Controller {

    private readonly IMapper _mapper;
    private readonly TopicRepository _topicRepository;

    public TopicController(IMapper mapper, TopicRepository topicRepository) {
        this._mapper = mapper;
        this._topicRepository = topicRepository;
    }
    
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(ICollection<TopicOutputDto>))]
    public IActionResult GetAll() {
        var topics = this._topicRepository.GetAll();
        var topicOutputs = this._mapper.Map<ICollection<TopicOutputDto>>(topics);
        return Ok(topicOutputs);
    }
    
    [HttpGet("{id}")]
    [ProducesResponseType(200, Type = typeof(TopicOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult GetOne(int id) {
        var topic = this._topicRepository.GetOneById(id);
        if (topic == null) {
            return NotFound("Topic does not exist");
        } else {
            var topicOutput = this._mapper.Map<TopicOutputDto>(topic);
            return Ok(topicOutput);
        }
    }
    
    [HttpPost()]
    [ProducesResponseType(201, Type = typeof(TopicOutputDto))]
    [ProducesResponseType(409, Type = typeof(string))]
    public IActionResult AddOne([FromBody] CreateTopicDto createTopicDto) {
        var topic = this._mapper.Map<Topic>(createTopicDto);
        if (this._topicRepository.IsTopicExist(topic)) {
            return Conflict("Topic already exist");
        } else {
            var createdTopic = this._topicRepository.AddTopic(topic);
            var topicOutput = this._mapper.Map<TopicOutputDto>(createdTopic);
            return CreatedAtAction(nameof(GetOne), new { createdTopic.Id }, topicOutput);
        }
    }
    
    [HttpDelete("{id}")]
    [ProducesResponseType(200, Type = typeof(TopicOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult DeleteOne(int id) {
        var topic = this._topicRepository.GetOneById(id);
        if (topic == null || !this._topicRepository.IsTopicExist(topic)) {
            return NotFound("Topic does not exist");
        } else {
            var deletedTopic = this._topicRepository.DeleteTopic(id);
            var topicOutput = this._mapper.Map<TopicOutputDto>(deletedTopic);
            return Ok(topicOutput);
        }
    }
    
    [HttpPatch("{id}")]
    [ProducesResponseType(200, Type = typeof(TopicOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult UpdateOne(int id, [FromBody] UpdateTopicDto updateTopicDto) {
        var topic = this._topicRepository.GetOneById(id);
        if (topic == null) {
            return NotFound("Topic does not exist");
        } else {
            topic.Name = updateTopicDto.Name ?? topic.Name;
            var updatedTopic = this._topicRepository.UpdateTopic(id, topic);
            var topicOutput = this._mapper.Map<TopicOutputDto>(updatedTopic);
            return Ok(topicOutput);
        }
    }

    [HttpGet("{name}/quizzes")]
    [ProducesResponseType(200, Type = typeof(TopicOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult GetQuizzesByTopicId(string name, [FromQuery] bool ignoreEmpty) {
        var topic = this._topicRepository.GetOneByName(name);
        if (topic == null) return NotFound("Topic does not exist");
        var quizzes = this._topicRepository.GetQuizzesByTopic(topic, ignoreEmpty);
        var quizOutput = this._mapper.Map<ICollection<QuizOutputDto>>(quizzes);
        return Ok(quizOutput);
    }

}