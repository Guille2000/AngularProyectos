using Microsoft.AspNetCore.Identity;

namespace Proyectos.Entidades
{
    public class Proyecto
    {
        public int Id { get; set; }

        public string Nombre { get; set; }

        public string Descripcion { get; set; }

        public DateTime FechaEntrega { get; set; }
        public string UsuarioCreacionId { get; set; }

        public string Cliente { get; set; }

        public IdentityUser UsuarioCreacion { get; set; }

        public int TareaId { get; set; }
        public List<Tarea> Tareas { get; set; }

        public List<Colaborador> Colaboradores { get; set; }

        public Proyecto()
        {
            Tareas = new List<Tarea>();
            Colaboradores = new List<Colaborador>();

        }
    }
}
