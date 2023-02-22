using AutoMapper;
using Proyectos.DTOS;
using Proyectos.Entidades;

namespace Proyectos.Utilidades
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Proyecto, ProyectoDTO>().ReverseMap();

            CreateMap<ProyectoCreacionDTO, Proyecto>();

            CreateMap<Tarea, TareaDTO>().ReverseMap();

            CreateMap<TareaCreacionDTO, Tarea>();
        }
    }
}
