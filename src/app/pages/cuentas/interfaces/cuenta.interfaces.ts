export interface CuentaResponse{
    ok: boolean,
    msg: string,
    data?: Cuenta[]
}

export interface Cuenta{
    numero_cuenta: string,
    banco: Banco,
    usuario: Usuario,
    tipo_cuenta: TipoCuenta,
    descripcion: string,
    saldo?: number,
    uid?: string
}

interface Banco{
    _id: string,
    nombre: string
}

interface TipoCuenta{
    _id: string,
    nombre: string
}

interface Usuario{
    _id: string,
    nombre: string,
    paterno: string,
    materno: string
}