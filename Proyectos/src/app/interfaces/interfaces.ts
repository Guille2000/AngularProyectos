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
}

export interface TareaCreacionDTO{
    id?:number;
    usuarioId:string;
    nombre:string;
    prioridad:string;
    descripcion:string;
    fechaEntrega:Date;
}