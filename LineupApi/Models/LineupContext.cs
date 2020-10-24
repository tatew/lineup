using Microsoft.EntityFrameworkCore;

namespace LineupApi.Models
{
    public class LineupContext : DbContext
    {
        public LineupContext(DbContextOptions<LineupContext> options) : base(options)
        {
        }

        public DbSet<Team> Teams {get; set;}
        public DbSet<User> Users {get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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