using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController :ControllerBase
    {
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
            this._repo = repo;

        }

        [HttpPost("register")]
        //Remember that u can use [FromBody] attribute if its not reading it. 
        public async Task<IActionResult> Register(UserForRegisterDTO userForRegisterDTO)
        {
            // Validate request

            userForRegisterDTO.Username = userForRegisterDTO.Username.ToLower();

            if (await _repo.UserExists(userForRegisterDTO.Username))
            {
                return BadRequest("Username already exists");
            }
            var userToCreate = new User
            {
                Username = userForRegisterDTO.Username

            };

            var createdUser = await _repo.Register(userToCreate,userForRegisterDTO.Password);

            return StatusCode(201);
        }
    }
}