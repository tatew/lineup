using Microsoft.EntityFrameworkCore;

namespace LineupApi.Models
{
    public class LineupContext : DbContext
    {
        public LineupContext(DbContextOptions<LineupContext> options) : base(options)
        {
        }

        public DbSet<Team> Teams {get; set;}
    }
}