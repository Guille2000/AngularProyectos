using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Proyectos.Migrations
{
    /// <inheritdoc />
    public partial class TareaId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TareaId",
                table: "Proyectos",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TareaId",
                table: "Proyectos");
        }
    }
}
