export interface ActivosResponse {
    ok: boolean,
    msg: string,
    data?: Activo[]
}

export interface Activo {
    nombre: string,
    tipo_activo: TipoActivo,
    detalle: string,
    costo: number,
    fecha: string,
    posicion?: number,
    uid?:string,
    estado_activo?: number
}

interface TipoActivo {
    _id: string,
    nombre: string
}