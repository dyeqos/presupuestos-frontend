export interface EgresosResponse{
    ok: boolean,
    msg: string,
    data?: string
}

export interface Egreso{
    fecha_movimiento : string,
    cuenta           : string,
    lugar_compra     : string,
    detalle_mov      : DetalleEgreso[]
}

export interface DetalleEgreso{
    cantidad         : number,
    detalle          : string,
    unitario         : number
}