using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LineupApi.Migrations
{
    public partial class AddConferenceAndDivison : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ConferenceId",
                table: "Teams",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CFBDivison",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CFBDivison", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CFBConference",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true),
                    DivisonId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CFBConference", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CFBConference_CFBDivison_DivisonId",
                        column: x => x.DivisonId,
                        principalTable: "CFBDivison",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Teams_ConferenceId",
                table: "Teams",
                column: "ConferenceId");

            migrationBuilder.CreateIndex(
                name: "IX_CFBConference_DivisonId",
                table: "CFBConference",
                column: "DivisonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_CFBConference_ConferenceId",
                table: "Teams",
                column: "ConferenceId",
                principalTable: "CFBConference",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teams_CFBConference_ConferenceId",
                table: "Teams");

            migrationBuilder.DropTable(
                name: "CFBConference");

            migrationBuilder.DropTable(
                name: "CFBDivison");

            migrationBuilder.DropIndex(
                name: "IX_Teams_ConferenceId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "ConferenceId",
                table: "Teams");
        }
    }
}
