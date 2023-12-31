using Microsoft.AspNetCore.Mvc;
using ChatApp.Services;
using ChatApp.Models;
using ChatApp.Data;
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace ChatApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly PasswordService _passwordService;
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AccountsController(PasswordService passwordService, AppDbContext context, IConfiguration configuration)
        {
            _passwordService = passwordService;
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("create")]
        public IActionResult CreateAccount([FromBody] CreateAccountModel model)
        {
            try
            {
                // Check if a user with the same username already exists
                var existingUser = _context.Users.FirstOrDefault(u => u.Username == model.Username);
                if (existingUser != null)
                {
                    // If a user is found, return a BadRequest with an error message
                    return BadRequest(new { Message = "A user with this username already exists" });
                }

                // If no existing user is found, proceed with account creation
                var (hash, salt) = _passwordService.HashPassword(model.Password);

                var user = new User
                {
                    Username = model.Username,
                    PasswordHash = hash,
                    PasswordSalt = salt
                };

                _context.Users.Add(user);
                _context.SaveChanges();

                return Ok(new { Message = "Account created successfully" });
            }
            catch (Exception ex)
            {
                // Log the exception
                // ...
                return StatusCode(500, new { Message = "An error occurred while creating the account" });
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            try
            {
                // Find the user by username
                var user = _context.Users.FirstOrDefault(u => u.Username == model.Username);
                if (user == null)
                {
                    // If no user is found, return a BadRequest with an error message
                    return BadRequest(new { Message = "Invalid username or password" });
                }

                // Verify the password using the stored hash and salt
                bool isPasswordValid = _passwordService.VerifyPassword(model.Password, user.PasswordHash, user.PasswordSalt);
                if (!isPasswordValid)
                {
                    // If the password is not valid, return a BadRequest with an error message
                    return BadRequest(new { Message = "Invalid username or password" });
                }

                // If the password is valid, proceed with login
                // Typically, you would generate a JWT or some other form of token here 
                // and include it in the response

                var token = CreateToken(model);

                return Ok(token);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, new { Message = "An error occurred while logging in" });
            }
        }

        private string CreateToken(LoginModel user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YOURSECRETKEY"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
