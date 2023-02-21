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
        }
    }
}
