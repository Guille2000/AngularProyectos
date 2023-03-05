namespace Proyectos.Entidades
{
    public class Colaborador
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public int ProyectoId { get; set; }

        public Proyecto Proyecto { get; set; }
    }
}
