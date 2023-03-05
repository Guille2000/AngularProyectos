using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Proyectos.Migrations
{
    /// <inheritdoc />
    public partial class TareaFixed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TareaId",
                table: "Proyectos");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TareaId",
                table: "Proyectos",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
