using Microsoft.EntityFrameworkCore.Migrations;

namespace LineupApi.Migrations
{
    public partial class AddSportToTeam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Sport",
                table: "Teams",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sport",
                table: "Teams");
        }
    }
}
