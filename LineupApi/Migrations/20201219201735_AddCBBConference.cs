using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LineupApi.Migrations
{
    public partial class AddCBBConference : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teams_CFBConferences_ConferenceId",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Teams_ConferenceId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "ConferenceId",
                table: "Teams");

            migrationBuilder.AddColumn<int>(
                name: "CBBConferenceId",
                table: "Teams",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CFBConferenceId",
                table: "Teams",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CBBConferences",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CBBConferences", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Teams_CBBConferenceId",
                table: "Teams",
                column: "CBBConferenceId");

            migrationBuilder.CreateIndex(
                name: "IX_Teams_CFBConferenceId",
                table: "Teams",
                column: "CFBConferenceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_CBBConferences_CBBConferenceId",
                table: "Teams",
                column: "CBBConferenceId",
                principalTable: "CBBConferences",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_CFBConferences_CFBConferenceId",
                table: "Teams",
                column: "CFBConferenceId",
                principalTable: "CFBConferences",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teams_CBBConferences_CBBConferenceId",
                table: "Teams");

            migrationBuilder.DropForeignKey(
                name: "FK_Teams_CFBConferences_CFBConferenceId",
                table: "Teams");

            migrationBuilder.DropTable(
                name: "CBBConferences");

            migrationBuilder.DropIndex(
                name: "IX_Teams_CBBConferenceId",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Teams_CFBConferenceId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "CBBConferenceId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "CFBConferenceId",
                table: "Teams");

            migrationBuilder.AddColumn<int>(
                name: "ConferenceId",
                table: "Teams",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Teams_ConferenceId",
                table: "Teams",
                column: "ConferenceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_CFBConferences_ConferenceId",
                table: "Teams",
                column: "ConferenceId",
                principalTable: "CFBConferences",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
