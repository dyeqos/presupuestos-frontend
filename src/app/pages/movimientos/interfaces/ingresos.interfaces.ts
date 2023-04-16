export interface IngresoResponse{
    ok: boolean,
    msg: string,
    data?: string
}

export interface Ingreso{
    //movimiento
    fecha_movimiento : string,
    cuenta       : string,
    lugar_compra : string,
    //detalleMovimiento
    nombre       : string,
    detalle      : string,
    unitario     : number
}