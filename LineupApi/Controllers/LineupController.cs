using System.Linq;
using LineupApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace LineupApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class LineupController : ControllerBase
    {
        private readonly LineupContext _context;

        public LineupController(LineupContext context)
        {
            _context = context;
        }

        [HttpGet("teams")]
        public IActionResult GetTeams()
        {
            var teams = _context.Teams.ToList();
            return Ok(teams);
        } 
    }
}