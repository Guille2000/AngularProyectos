using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proyectos.DTOS;
using Proyectos.Entidades;
using Proyectos.Migrations;

namespace Proyectos.Servicios
{
    public interface IProyecto
    {
        Proyecto CrearProyecto(ProyectoCreacionDTO proyectoCreacion);
        Task<List<ProyectoDTO>> ListarProyectos(string userId);

        Task<ProyectoDTO> GetProyectoId(int id);

        Task<ProyectoDTO> Editar(int id, ProyectoCreacionDTO proyectoCreacionDTO);

        void Eliminar(int id);
    }

    public class UsuarioNoEncontradoException : Exception
    {
        public UsuarioNoEncontradoException(string message) : base(message)
        {
        }
    }

    public class ProyectosService : IProyecto
    {
        private readonly ApplicationDBContext context;
        private readonly IMapper mapper;

        public ProyectosService(ApplicationDBContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public Proyecto CrearProyecto(ProyectoCreacionDTO proyectoCreacion)
        {
            var proyecto = mapper.Map<Proyecto>(proyectoCreacion);
            context.Add(proyecto);
            context.SaveChanges();
            return proyecto;

        }

        public async Task<List<ProyectoDTO>> ListarProyectos(string userId)
        {
            var usuario = await context.Users.FindAsync(userId);

            if (usuario == null)
            {
                throw new UsuarioNoEncontradoException($"El usuario con ID {userId} no se encontró en la base de datos.");
            }

            var proyectos = await context.Proyectos
               .Where(p => p.UsuarioCreacionId == userId)
               .ToListAsync();

            return mapper.Map<List<ProyectoDTO>>(proyectos);
        }

        public async Task<ProyectoDTO> GetProyectoId(int id)
        {
            var proyecto = await context.Proyectos.SingleOrDefaultAsync(x => x.Id == id);

            if (proyecto == null)
            {
                return null;
            }
            return mapper.Map<ProyectoDTO>(proyecto);
        }

        public async Task<ProyectoDTO> Editar(int id, ProyectoCreacionDTO proyectoCreacionDTO)
        {
            var proyecto = await context.Proyectos.SingleAsync(x => x.Id == id);
            if (proyecto == null)
            {
                return null;
            }
            proyecto = mapper.Map(proyectoCreacionDTO, proyecto);
            await context.SaveChangesAsync();
            return mapper.Map<ProyectoDTO>(proyecto);
        }

        public void Eliminar(int id)
        {
            var existe = context.Proyectos.Any(x => x.Id == id);
            context.Remove(new Proyecto() { Id = id });
            context.SaveChanges();
        }
    }
}
