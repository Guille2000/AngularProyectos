using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Proyectos.Entidades;

namespace Proyectos
{
    public class ApplicationDBContext:IdentityDbContext
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

        }

        public DbSet<Proyecto> Proyectos { get; set;}

        public DbSet<Tarea> Tareas { get; set;}

        public DbSet<Colaborador> Colaboradores { get; set;}
    }
}
