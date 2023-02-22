using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proyectos.DTOS;
using Proyectos.Entidades;
using Proyectos.Migrations;
using Proyectos.Servicios;
using System.Security.Claims;

namespace Proyectos.Controllers
{

    [ApiController]
    public class TareaController:ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ApplicationDBContext context;

        public TareaController(IMapper mapper, ApplicationDBContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpPost]
        [Route("proyectos/tarea/agregar")]
        public async Task<ActionResult<TareaDTO>> Post(int proyectoId, [FromBody] TareaCreacionDTO tareaCreacionDTO)
        {
            var tarea = mapper.Map<Tarea>(tareaCreacionDTO);
                
            var proyecto = await context.Proyectos.FindAsync(proyectoId);

            if (proyecto == null)
            {
                return NotFound();
            }
          
            if(proyecto.UsuarioCreacionId != tarea.UsuarioId)
            {
                return Unauthorized("You do not have permission to add a task to this project.");

            }
            tarea.ProyectoId = proyectoId;
            context.Add(tarea);
            await context.SaveChangesAsync();
            return Ok(tarea);
        }

    }
}
