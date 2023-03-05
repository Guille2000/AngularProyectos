using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proyectos.DTOS;
using Proyectos.Entidades;
using Proyectos.Migrations;
using Proyectos.Servicios;
using System.Security.Claims;
using System.Text.Json;

namespace Proyectos.Controllers
{

    [ApiController]
    public class TareaController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ApplicationDBContext context;
        private readonly ITarea tareasService;

        public TareaController(IMapper mapper, ApplicationDBContext context, ITarea tareasService)
        {
            this.mapper = mapper;
            this.context = context;
            this.tareasService = tareasService;
        }

        [HttpGet]
        [Route("proyectos/tarea/listado")]
        public async Task<ActionResult<List<TareaDTO>>> GetTareasUser(int projectId)
        {
            try
            {
                var tareas = await tareasService.GetTareasUser(projectId);
                return tareas;
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message + "El proyecto no ha sido encontrado");
            }
        }

        [HttpPost]
        [Route("proyectos/tarea/agregar")]
        public async Task<ActionResult<TareaDTO>> Post(int proyectoId, [FromBody] TareaCreacionDTO tareaCreacionDTO)
        {
            try
            {
                var tarea = await tareasService.CrearTarea(proyectoId, tareaCreacionDTO);
                return Ok(tarea);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("proyectos/tarea/editar")]
        public async Task<ActionResult> Put(int Id, [FromBody] TareaCreacionDTO tareaCreacionDTO)
        {

            var tarea = await tareasService.EditarTarea(Id, tareaCreacionDTO);
            return Ok(tarea);
        }
        [HttpDelete]
        [Route("proyectos/tarea/borrar")]
        public IActionResult Delete(int id)
        {
            tareasService.Eliminar(id);
            return Ok();
        }

        [HttpPatch]
        [Route("proyectos/tarea/estado")]
        public async Task<ActionResult<Tarea>> UpdateTaskStatus(int Id, [FromBody] bool estado)

        {
            var tarea = await tareasService.UpdateTaskStatus(Id, estado);
            return Ok(tarea);
        }
    }
}
