using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Proyectos.Migrations
{
    /// <inheritdoc />
    public partial class CompletadoDos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Completado",
                table: "Tareas");

            migrationBuilder.AddColumn<string>(
                name: "CompletadoId",
                table: "Tareas",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tareas_CompletadoId",
                table: "Tareas",
                column: "CompletadoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tareas_AspNetUsers_CompletadoId",
                table: "Tareas",
                column: "CompletadoId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tareas_AspNetUsers_CompletadoId",
                table: "Tareas");

            migrationBuilder.DropIndex(
                name: "IX_Tareas_CompletadoId",
                table: "Tareas");

            migrationBuilder.DropColumn(
                name: "CompletadoId",
                table: "Tareas");

            migrationBuilder.AddColumn<string>(
                name: "Completado",
                table: "Tareas",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
