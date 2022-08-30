using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers; 

[ApiController]
[Route("/")]
public class HomeController : Controller {

    [HttpGet("health")]
    public IActionResult GetHealth() {
        return Ok("OK");
    }
    
}