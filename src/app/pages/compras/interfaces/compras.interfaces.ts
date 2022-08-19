export interface ComprasResponse{
    ok: boolean,
    msg: string,
    data?: Movimiento[]
}

export interface Movimiento{
    cuenta: string,
    lugar_compra: string,
    fecha_compra: string,
}