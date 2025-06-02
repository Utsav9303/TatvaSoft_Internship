using BooksApi.Dto;
using BooksApi.Entities.Entities;
using BooksApi.Helpers;
using BooksApi.Services.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace BooksApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly JwtHelper _jwtHelper;

        public UserController(IUserService userService, JwtHelper jwtHelper)
        {
            _userService = userService;
            _jwtHelper = jwtHelper;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult> Register([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Validate email format
            if (!IsValidEmail(user.Email))
            {
                return BadRequest("Invalid email format");
            }

            // Hash the password
            user.Password = HashPassword(user.Password);
            
            // Set default role if not provided
            if (string.IsNullOrEmpty(user.Role))
            {
                user.Role = "User";
            }

            await _userService.AddUser(user);
            return Ok(new { message = "User registered successfully!" });
        }

        [HttpPost]
        [Route("Login")]
        public ActionResult Login([FromBody] LoginReqDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Password))
            {
                return BadRequest("Email and password are required");
            }

            // Hash the password for comparison
            var hashedPassword = HashPassword(dto.Password);
            var user = _userService.Login(dto.Email, hashedPassword);

            if (user == null)
            {
                return NotFound("Invalid email or password");
            }

            var token = _jwtHelper.GetJwtToken(user);

            return Ok(new LoginResDto 
            { 
                Email = user.Email, 
                Name = user.Name, 
                Role = user.Role, 
                Token = token 
            });
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }
    }
}
