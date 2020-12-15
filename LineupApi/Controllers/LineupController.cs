using System.Linq;
using System.Collections.Generic;
using LineupApi.Models;
using LineupApi.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace LineupApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class LineupController : ControllerBase
    {
        private readonly LineupContext _context;
        private IMapper _mapper;

        public LineupController(LineupContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        [HttpGet("teams")]
        public IActionResult GetTeams()
        {
            var teams = _context.Teams.Include(t => t.Sport);
            var teamDTOs = _mapper.Map<List<TeamDTO>>(teams);
            return Ok(teamDTOs);
        } 

        [HttpGet("users/{id}/teams")]
        public IActionResult GetTeamsForUser(int id)
        {
            var user = _context.Users.Include(u => u.UserTeams).ThenInclude(ut => ut.Team).ThenInclude(t => t.Sport).FirstOrDefault(u => u.Id == id);
            var teams = new List<TeamDTO>();
            foreach (var userTeam in user.UserTeams)
            {
                var teamDto = new TeamDTO();
                teamDto.Id = userTeam.Team.Id;
                teamDto.Name = userTeam.Team.Name;
                teamDto.Abbreviation = userTeam.Team.Abbreviation;
                teamDto.Location = userTeam.Team.Location;
                teamDto.SportUrl = userTeam.Team.Sport.Url;
                teamDto.LogoUrl = userTeam.Team.LogoUrl;
                teams.Add(teamDto);
            }

            return Ok(teams);
        }

        [HttpGet("sports")]
        public IActionResult GetSports()
        {
            var sports = _context.Sports;
            var sportDTOs = _mapper.Map<List<SportDTO>>(sports);
            
            return Ok(sportDTOs);
        }

        [HttpGet("sports/{id}/teams")]
        public IActionResult GetTeamsForSport(int id)
        {
            var teams = _context.Teams.Include(t => t.Sport).Where(t => t.Sport.Id == id).OrderBy(t => t.Name);
            var teamDTOs = _mapper.Map<List<TeamDTO>>(teams);

            return Ok(teamDTOs);
        }

        [HttpPost("users/{id}/teams")]
        public IActionResult AddUserTeam(int id, [FromBody]TeamDTO teamDTO)
        {
            var userTeam = new UserTeams();
            userTeam.UserId = id;
            userTeam.TeamId = teamDTO.Id;

            _context.UserTeams.Add(userTeam);
            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("users/{id}/teams/{teamId}")]
        public IActionResult RemoveUserTeam(int id, int teamId)
        {
            var userTeam = _context.UserTeams.FirstOrDefault(ut => ut.UserId == id && ut.TeamId == teamId);
            if (userTeam == null)
            {
                return NotFound();
            }
            _context.UserTeams.Remove(userTeam);
            _context.SaveChanges();
            return Ok();
        }
    }
}