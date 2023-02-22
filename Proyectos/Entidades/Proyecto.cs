﻿using Microsoft.AspNetCore.Identity;

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

        public List<Tarea> Tareas { get; set; }
    }
}
