using Microsoft.EntityFrameworkCore.Migrations;

namespace LineupApi.Migrations
{
    public partial class FixDivision : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CFBConferences_CFBDivisons_DivisonId",
                table: "CFBConferences");

            migrationBuilder.DropIndex(
                name: "IX_CFBConferences_DivisonId",
                table: "CFBConferences");

            migrationBuilder.AddColumn<int>(
                name: "DivisionId",
                table: "CFBConferences",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CFBConferences_DivisionId",
                table: "CFBConferences",
                column: "DivisionId");

            migrationBuilder.AddForeignKey(
                name: "FK_CFBConferences_CFBDivisons_DivisionId",
                table: "CFBConferences",
                column: "DivisionId",
                principalTable: "CFBDivisons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CFBConferences_CFBDivisons_DivisionId",
                table: "CFBConferences");

            migrationBuilder.DropIndex(
                name: "IX_CFBConferences_DivisionId",
                table: "CFBConferences");

            migrationBuilder.DropColumn(
                name: "DivisionId",
                table: "CFBConferences");

            migrationBuilder.CreateIndex(
                name: "IX_CFBConferences_DivisonId",
                table: "CFBConferences",
                column: "DivisonId");

            migrationBuilder.AddForeignKey(
                name: "FK_CFBConferences_CFBDivisons_DivisonId",
                table: "CFBConferences",
                column: "DivisonId",
                principalTable: "CFBDivisons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
