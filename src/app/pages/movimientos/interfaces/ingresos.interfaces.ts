export interface ingresoResponse{
    ok: boolean,
    msg: string,
    data?: string
}

export interface Ingreso{
    //movimiento
    fecha_compra : string,
    cuenta       : string,
    lugar_compra : string,
    //detalleMovimiento
    nombre       : string,
    detalle      : string,
    unitario     : number
}