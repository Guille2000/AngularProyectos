using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.Identity.Client;
using Proyectos.DTOS;
using Proyectos.Entidades;

namespace Proyectos.Servicios
{
    public interface ITarea
    {
        Task<List<TareaDTO>> GetTareasUser(int projectId);
        Task<TareaDTO> CrearTarea(int projectId, TareaCreacionDTO tareaCreacion);
        void Eliminar(int id);

        Task<TareaDTO> EditarTarea(int Id, TareaCreacionDTO tareaCreacionDTO);
        Task<Tarea> UpdateTaskStatus(int id, bool estado);
    }
    public class TareasService:ITarea
    {
        private readonly ApplicationDBContext context;
        private readonly IMapper mapper;

        public TareasService(ApplicationDBContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<List<TareaDTO>> GetTareasUser(int projectId)
        {
            var proyectos = await context.Proyectos.FindAsync(projectId);
            if(proyectos == null)
            {
                return null;
            }

            var tareas = await context.Tareas
                .Where(p => p.ProyectoId == projectId)
                .ToListAsync();

            return mapper.Map<List<TareaDTO>>(tareas);
        }

        public async Task<TareaDTO> CrearTarea(int projectId, TareaCreacionDTO tareaCreacion)
        {
            var proyecto = await context.Proyectos
                .Include(p => p.Tareas)
                .SingleOrDefaultAsync(p => p.Id == projectId);

            if (proyecto == null)
            {
                throw new ArgumentException("Proyecto no encontrado");
            }

            var tarea = mapper.Map<Tarea>(tareaCreacion);

            if (proyecto.UsuarioCreacionId != tarea.UsuarioId)
            {
                throw new UnauthorizedAccessException("No tiene permisos para agregar una tarea a este proyecto.");
            }

            tarea.ProyectoId = projectId;
            proyecto.Tareas.Add(tarea);

            await context.SaveChangesAsync();

            return mapper.Map<TareaDTO>(tarea);
        }

        public async Task<TareaDTO> EditarTarea(int Id, TareaCreacionDTO tareaCreacionDTO)
        {
            var tarea = await context.Tareas.SingleAsync(x => x.Id == Id);
            if (tarea == null)
            {
                throw new ArgumentException("Tarea no encontrada");
            }
            tarea = mapper.Map(tareaCreacionDTO, tarea);
            await context.SaveChangesAsync();
            return mapper.Map<TareaDTO>(tarea);

        }

        public void Eliminar(int id)
        {
            var existe = context.Tareas.Any(x => x.Id == id);
            context.Remove(new Tarea() { Id = id });
            context.SaveChanges();
        }
        public async Task<Tarea> UpdateTaskStatus(int id, bool estado)
        {
            try
            {
                var tarea = await context.Tareas.FindAsync(id);

                if (tarea == null)
                {
                    throw new ArgumentException("Tarea no encontrada");
                }

                tarea.Estado = estado;

                await context.SaveChangesAsync();

                return tarea;
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al actualizar el estado de la tarea", ex);
            }
        }
    }


}
