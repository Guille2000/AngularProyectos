using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proyectos.DTOS;
using Proyectos.Entidades;
using Proyectos.Servicios;

namespace Proyectos.Controllers
{
    [ApiController]

    public class ProyectoController:ControllerBase
    {
        private readonly IServicioUsuarios servicioUsuarios;
        private readonly IMapper mapper;
        private readonly ApplicationDBContext context;

        public ProyectoController(IServicioUsuarios servicioUsuarios ,IMapper mapper ,ApplicationDBContext context)
        {
            this.servicioUsuarios = servicioUsuarios;
            this.mapper = mapper;
            this.context = context;
        }

        [HttpPost]
        [Route("proyectos/agregar")]
        public async Task<ActionResult> Post([FromBody] ProyectoCreacionDTO proyectoCreacionDTO)
        {
      
            var proyecto = mapper.Map<Proyecto>(proyectoCreacionDTO);
            context.Add(proyecto);
            await context.SaveChangesAsync();
            return Ok(proyecto);
        }
        [HttpGet]
        [Route("proyectos/listado")]
        public async Task<ActionResult<List<ProyectoDTO>>> GetProjectsForUser(string userId)
        {
            // Get the user with the specified ID
            var usuario = await context.Users.FindAsync(userId);

            if (usuario == null)
            {
                return NotFound();
            }

            // Get all the projects for the user
            var proyectos = await context.Proyectos
                .Where(p => p.UsuarioCreacionId == userId)
                .ToListAsync();

            return mapper.Map<List<ProyectoDTO>>(proyectos);


        }
        [HttpGet]
        [Route("proyectos/id")]
        public async Task<ActionResult<ProyectoDTO>> Get (int Id)
        {
            var proyecto = await context.Proyectos.SingleAsync(x => x.Id == Id); 

            if (proyecto == null)
            {
                return NotFound();
            }
            return mapper.Map<ProyectoDTO>(proyecto);
        }

        [HttpPut]
        [Route("proyectos/editar")]
        public async Task<ActionResult> Put (int Id, [FromBody] ProyectoCreacionDTO proyectoCreacionDTO)
        {
            var proyecto = await context.Proyectos.SingleAsync(x => x.Id == Id);
            if (proyecto == null)
            {
                return NotFound();
            }
            proyecto = mapper.Map(proyectoCreacionDTO, proyecto);
            await context.SaveChangesAsync();
            return Ok(proyecto);

        }
        [HttpDelete]
        [Route("proyectos/eliminar")]
        public async Task<ActionResult> Delete(int Id)
        {
            var existe = await context.Proyectos.AnyAsync(x => x.Id == Id);
            if (!existe)
            {
                return NotFound();
            }

            context.Remove(new Proyecto() { Id = Id });
            await context.SaveChangesAsync();
            return Ok(existe);
        }

    }
}
