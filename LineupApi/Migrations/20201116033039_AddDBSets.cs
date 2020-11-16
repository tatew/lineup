using Microsoft.EntityFrameworkCore.Migrations;

namespace LineupApi.Migrations
{
    public partial class AddDBSets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CFBConference_CFBDivison_DivisonId",
                table: "CFBConference");

            migrationBuilder.DropForeignKey(
                name: "FK_Teams_CFBConference_ConferenceId",
                table: "Teams");

            migrationBuilder.DropForeignKey(
                name: "FK_Teams_Sport_SportId",
                table: "Teams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Sport",
                table: "Sport");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CFBDivison",
                table: "CFBDivison");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CFBConference",
                table: "CFBConference");

            migrationBuilder.RenameTable(
                name: "Sport",
                newName: "Sports");

            migrationBuilder.RenameTable(
                name: "CFBDivison",
                newName: "CFBDivisons");

            migrationBuilder.RenameTable(
                name: "CFBConference",
                newName: "CFBConferences");

            migrationBuilder.RenameIndex(
                name: "IX_CFBConference_DivisonId",
                table: "CFBConferences",
                newName: "IX_CFBConferences_DivisonId");

            migrationBuilder.AlterColumn<int>(
                name: "DivisonId",
                table: "CFBConferences",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Sports",
                table: "Sports",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CFBDivisons",
                table: "CFBDivisons",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CFBConferences",
                table: "CFBConferences",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CFBConferences_CFBDivisons_DivisonId",
                table: "CFBConferences",
                column: "DivisonId",
                principalTable: "CFBDivisons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_CFBConferences_ConferenceId",
                table: "Teams",
                column: "ConferenceId",
                principalTable: "CFBConferences",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_Sports_SportId",
                table: "Teams",
                column: "SportId",
                principalTable: "Sports",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CFBConferences_CFBDivisons_DivisonId",
                table: "CFBConferences");

            migrationBuilder.DropForeignKey(
                name: "FK_Teams_CFBConferences_ConferenceId",
                table: "Teams");

            migrationBuilder.DropForeignKey(
                name: "FK_Teams_Sports_SportId",
                table: "Teams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Sports",
                table: "Sports");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CFBDivisons",
                table: "CFBDivisons");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CFBConferences",
                table: "CFBConferences");

            migrationBuilder.RenameTable(
                name: "Sports",
                newName: "Sport");

            migrationBuilder.RenameTable(
                name: "CFBDivisons",
                newName: "CFBDivison");

            migrationBuilder.RenameTable(
                name: "CFBConferences",
                newName: "CFBConference");

            migrationBuilder.RenameIndex(
                name: "IX_CFBConferences_DivisonId",
                table: "CFBConference",
                newName: "IX_CFBConference_DivisonId");

            migrationBuilder.AlterColumn<int>(
                name: "DivisonId",
                table: "CFBConference",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Sport",
                table: "Sport",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CFBDivison",
                table: "CFBDivison",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CFBConference",
                table: "CFBConference",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CFBConference_CFBDivison_DivisonId",
                table: "CFBConference",
                column: "DivisonId",
                principalTable: "CFBDivison",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_CFBConference_ConferenceId",
                table: "Teams",
                column: "ConferenceId",
                principalTable: "CFBConference",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_Sport_SportId",
                table: "Teams",
                column: "SportId",
                principalTable: "Sport",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
