export interface MovimientosResponse{
    ok: boolean,
    msg: string,
    data?: Movimientos[]
}

export interface Movimientos{
    fecha_movimiento: string,
    cuenta: Cuenta,
    total: number,
    lugar_compra: string,
    detalle_movimiento: DetalleMovimiento

}

interface Cuenta{
    numero_cuenta: number,
    banco: Banco
}

interface Banco{
    nombre: string
}

interface DetalleMovimiento{
    nombre: string,
    detalle: string,
    cantidad: number,
    unitario: number,
    sub_total: number

}