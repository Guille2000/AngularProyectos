using Proyectos.Entidades;

namespace Proyectos.DTOS
{
    public class ProyectoDTO
    {   
        public int Id { get; set; }
        public string Nombre { get; set; }

        public string Descripcion { get; set; }

        public string Cliente { get; set; }

        public string UsuarioCreacionId { get; set; }

        public List<Tarea> Tarea { get; set; }

        public DateTime FechaEntrega { get; set; }

    }
}
