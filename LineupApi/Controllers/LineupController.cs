using System.Linq;
using System.Collections.Generic;
using LineupApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet("users/{id}/teams")]
        public IActionResult GetTeamsForUser(int id)
        {
            var user = _context.Users.Include(u => u.UserTeams).ThenInclude(ut => ut.Team).FirstOrDefault(u => u.Id == id);
            var teams = new List<TeamDTO>();
            foreach (var userTeam in user.UserTeams)
            {
                var teamDto = new TeamDTO();
                teamDto.Id = userTeam.Team.Id;
                teamDto.Name = userTeam.Team.Name;
                teamDto.Abbreviation = userTeam.Team.Abbreviation;
                teamDto.City = userTeam.Team.City;
                teams.Add(teamDto);
            }
            return Ok(teams);
        }
    }
}