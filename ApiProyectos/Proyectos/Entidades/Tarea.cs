namespace Proyectos.Entidades
{
    public class Tarea
    {
        public int Id {get; set; }

        public string Nombre { get; set; }

        public string Descripcion { get; set; }

        public Boolean Estado { get; set; }

        public DateTime FechaEntrega { get; set; }

        public string Prioridad { get; set; }

        public int ProyectoId { get; set; }

        public Proyecto Proyecto { get; set; }
    }
}
