using Microsoft.EntityFrameworkCore.Migrations;

namespace LineupApi.Migrations
{
    public partial class FixDivisionForReal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CFBConferences_CFBDivisons_DivisionId",
                table: "CFBConferences");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CFBDivisons",
                table: "CFBDivisons");

            migrationBuilder.RenameTable(
                name: "CFBDivisons",
                newName: "CFBDivisions");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CFBDivisions",
                table: "CFBDivisions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CFBConferences_CFBDivisions_DivisionId",
                table: "CFBConferences",
                column: "DivisionId",
                principalTable: "CFBDivisions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CFBConferences_CFBDivisions_DivisionId",
                table: "CFBConferences");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CFBDivisions",
                table: "CFBDivisions");

            migrationBuilder.RenameTable(
                name: "CFBDivisions",
                newName: "CFBDivisons");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CFBDivisons",
                table: "CFBDivisons",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CFBConferences_CFBDivisons_DivisionId",
                table: "CFBConferences",
                column: "DivisionId",
                principalTable: "CFBDivisons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
