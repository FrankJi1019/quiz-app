using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Repositories;

namespace Server.Controllers; 

[ApiController]
[Route("users")]
public class UserController : Controller {

    private readonly IMapper _mapper;
    private readonly UserRepository _userRepository;
    private readonly QuizRepository _quizRepository;

    public UserController(IMapper mapper, UserRepository userRepository, QuizRepository quizRepository) {
        this._mapper = mapper;
        this._userRepository = userRepository;
        this._quizRepository = quizRepository;
    }

    [HttpPost("{username}")]
    [ProducesResponseType(201, Type = typeof(string))]
    [ProducesResponseType(409, Type = typeof(string))]
    public IActionResult CreateUser(string username) {
        if (this._userRepository.IsUserExist(username)) {
            return Conflict("User already exist");
        } else {
            var createdUser = this._userRepository.AddUser(username);
            return CreatedAtAction(
                nameof(GetUserMetadata), 
                new {username = createdUser.Username}, 
                createdUser
            );
        }
    }

    [HttpGet("{username}/metadata")]
    [ProducesResponseType(200, Type = typeof(UserMetaDataOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult GetUserMetadata(string username) {
        var user = this._userRepository.GetUser(username);
        if (user == null) return NotFound("Invalid username");
        var userMetaOutput = this._mapper.Map<UserMetaDataOutputDto>(user);
        return Ok(userMetaOutput);
    }

    [HttpGet("{username}/quizzes")]
    [ProducesResponseType(200, Type = typeof(ICollection<QuizOutputDto>))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult GetQuizzesByUser(string username) {
        if (!this._userRepository.IsUserExist(username)) return NotFound("Username does not exist");
        var quizzes = this._quizRepository.GetQuizzesByUser(username);
        var quizOutput = this._mapper.Map<ICollection<QuizOutputDto>>(quizzes);
        return Ok(quizOutput);
    }
    
    [HttpGet("{username}/settings")]
    [ProducesResponseType(200, Type = typeof(SettingOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult GetUserSetting(string username) {
        var setting = this._userRepository.GetUserSetting(username);
        if (setting == null) return NotFound("Username does not exist");
        var settingOutput = this._mapper.Map<SettingOutputDto>(setting);
        return Ok(settingOutput);
    }

    [HttpPatch("{username}/settings")]
    [ProducesResponseType(200, Type = typeof(SettingOutputDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult ChangeUserSetting(string username, UpdateSettingDto updateSettingDto) {
        var setting = this._userRepository.GetUserSetting(username);
        if (setting == null) return NotFound("Username does not exist");
        setting.Theme = updateSettingDto.Theme ?? setting.Theme;
        var updatedSetting = this._userRepository.UpdateSetting(username, setting);
        var settingOutput = this._mapper.Map<SettingOutputDto>(updatedSetting);
        return Ok(settingOutput);
    }

}