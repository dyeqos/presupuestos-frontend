export interface ParametroResponse {
    ok: boolean,
    msg: string,
    data?: Parametro[]
}

export interface Parametro {
    uid: string,
    tipo: string,
    nombre: string
}