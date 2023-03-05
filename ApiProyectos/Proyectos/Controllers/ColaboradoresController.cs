using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proyectos.DTOS;
using Proyectos.Entidades;
using Proyectos.Migrations;

namespace Proyectos.Controllers
{

    [ApiController]
    public class ColaboradoresController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ApplicationDBContext context;

        public ColaboradoresController(IMapper mapper, ApplicationDBContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet]
        [Route("proyectos/buscar/colaboradores")]
        public async Task<ActionResult> BuscarColaborador(string email)
        {
            var usuario = await context.Users
                  .Where(u => u.Email == email)
                  .Select(u => new { u.Id, u.Email })
                  .SingleAsync();

            if (usuario == null)
            {
                return NotFound("No se ha encontrado el colaborador");
            }

            return Ok(usuario);

        }
        [HttpGet]
        [Route("proyectos/listar/colaboradores")]
        public async Task<ActionResult<List<ColaboradoresDTO>>> ListarColaboradores(int proyectoId)
        {
            var proyecto = await context.Proyectos.FindAsync(proyectoId);


            if (proyecto == null)
            {
                return NotFound("El proyecto no existe");
            }

            var colaboradores = await context.Colaboradores
                .Where(p => p.ProyectoId == proyectoId)
            .ToListAsync();

            if(colaboradores == null)
            {
                return NotFound("No existen colaboradores");
            }

            return mapper.Map<List<ColaboradoresDTO>>(colaboradores);
        }


        [HttpPost]
        [Route("proyectos/agregar/colaborador")]
        public async Task<ActionResult<List<Colaborador>>> AgregarColaborador(int proyectoId, [FromBody] string email)
        {
            var proyecto = await context.Proyectos
         .Include(p => p.Colaboradores)
         .SingleAsync(p => p.Id == proyectoId);

            if (proyecto == null)
            {
                return NotFound("El proyecto no existe.");
            }

            var usuario = await context.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (usuario == null)
            {
                return NotFound("El usuario no existe.");
            }

            if (proyecto.UsuarioCreacionId == usuario.Id)
            {
                return BadRequest("El usuario creador del proyecto no puede ser colaborador.");
            }

            if (proyecto.Colaboradores.Any(c => c.Email == email))
            {
                return BadRequest("El usuario ya es colaborador del proyecto.");
            }

            var colaborador = new Colaborador
            {
                ProyectoId = proyecto.Id,
                Email = email
            };
            proyecto.Colaboradores.Add(colaborador);

            await context.SaveChangesAsync();

            proyecto = await context.Proyectos
                .Include(p => p.Colaboradores)
                .SingleAsync(p => p.Id == proyectoId);

            return Ok(colaborador);
        }

        [HttpDelete]
        [Route("proyectos/eliminar/colaborador")]
        public async Task<ActionResult> Delete(int Id)
        {
            var existe = await context.Colaboradores.AnyAsync(x => x.Id == Id);
            if (!existe)
            {
                return NotFound();
            }
            context.Remove(new Colaborador() { Id = Id });
            await context.SaveChangesAsync();
            return Ok(existe);
        }
    }
}
