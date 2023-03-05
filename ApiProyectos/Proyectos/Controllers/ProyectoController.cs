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

    public class ProyectoController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ApplicationDBContext context;
        private readonly IProyecto proyectoService;

        public ProyectoController( IMapper mapper, ApplicationDBContext context, IProyecto proyectoService)
        {
            this.mapper = mapper;
            this.context = context;
            this.proyectoService = proyectoService;
        }

        [HttpPost]
        [Route("proyectos/agregar")]
        public IActionResult Post([FromBody] ProyectoCreacionDTO proyectoCreacionDTO)
        {
            return Ok(proyectoService.CrearProyecto(proyectoCreacionDTO));
        }
        [HttpGet]
        [Route("proyectos/listado")]
        public async Task<IActionResult> GetProjectsForUser(string userId)
        {
            try
            {
                var proyectos = await proyectoService.ListarProyectos(userId);
                return Ok(proyectos);
            }
            catch (UsuarioNoEncontradoException ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpGet]
        [Route("proyectos/id")]
        public async Task<IActionResult> Get(int id)
        {
            var proyecto = await proyectoService.GetProyectoId(id);

            if (proyecto == null)
            {
                return NotFound("Proyecto no encontrado");
            }
            return Ok(proyecto);
        }

        [HttpPut]
        [Route("proyectos/editar")]
        public async Task<IActionResult> EditarProyecto(int id, [FromBody] ProyectoCreacionDTO proyectoDTO)
        {
            var proyecto = await proyectoService.Editar(id, proyectoDTO);
            return Ok(proyecto);
        }
        [HttpDelete]
        [Route("proyectos/eliminar")]
        public IActionResult Delete(int id)
        {
            proyectoService.Eliminar(id);
            return Ok();
        }

    }
}
