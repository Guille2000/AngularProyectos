export interface respuestaAuth{
    token:string;
}

export interface ProyectoCreacionDTO{
    nombre:string;
    cliente:string;
    descripcion:string;
    fechaEntrega:Date;
    usuarioCreacionId:string;
}

export interface ProyectosListado{
    nombre:string;
    cliente:string;
    fechaEntrega:Date;
    id:number;
    usuarioCreacionId?:string;
    colaboradores: string;
    rol: 'Administrador' | 'Colaborador';
}

export interface TareaCreacionDTO{
    id?:number;
    usuarioId:string;
    nombre:string;
    prioridad:string;
    descripcion:string;
    fechaEntrega:Date;
    completadaPor?: string 

}

export interface Colaborador{
    email:string;
    id?:number;
}