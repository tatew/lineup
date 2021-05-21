using Microsoft.EntityFrameworkCore.Migrations;

namespace LineupApi.Migrations
{
    public partial class FixDivisionsForReal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DivisonId",
                table: "CFBConferences"
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
