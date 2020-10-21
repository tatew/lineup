using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LineupApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LineupApi.Controllers
{
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