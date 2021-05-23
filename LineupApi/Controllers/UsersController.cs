using System;
using System.Linq;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

using LineupApi.Models;
using LineupApi.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using AutoMapper;



namespace LineupApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly LineupContext _context;
        private IMapper _mapper;

        public UsersController(LineupContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserDTO userDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == userDto.Username && u.Password == userDto.Password);
            
            if (user == null)
            {
                return BadRequest("Incorrect email or password");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Top_Secret_Key123");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] {new Claim(ClaimTypes.Name, user.Id.ToString())}),
                Expires = DateTime.UtcNow.AddDays(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new 
            {
                user.Id,
                Token = tokenString
            });
        } 

        [AllowAnonymous]
        [HttpPost("addUser")]
        public IActionResult AddUser([FromBody] UserDTO userDTO)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == userDTO.Username);
            if (user != null)
            {
                return Conflict();
            }

            var newUser = _mapper.Map<User>(userDTO);
            _context.Users.Add(newUser);
            _context.SaveChanges();

            return StatusCode(201);
        }
    }
}