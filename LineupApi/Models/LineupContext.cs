using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace LineupApi.Models
{
    public class LineupContext : DbContext
    {
        public LineupContext(DbContextOptions<LineupContext> options) : base(options)
        {
        }

        public DbSet<Team> Teams { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Sport> Sports { get; set; }
        public DbSet<CFBConference> CFBConferences { get; set; }
        public DbSet<CFBDivison> CFBDivisons { get; set; }
        public DbSet<UserTeams> UserTeams { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelBuilder.Entity<UserTeams>()
                .HasKey(ut => new { ut.UserId, ut.TeamId });
            modelBuilder.Entity<UserTeams>()
                .HasOne(ut => ut.User)
                .WithMany(u => u.UserTeams)
                .HasForeignKey(ut => ut.UserId);
            modelBuilder.Entity<UserTeams>()
                .HasOne(ut => ut.Team)
                .WithMany(t => t.TeamUsers)
                .HasForeignKey(ut => ut.TeamId);
        }
    }
}