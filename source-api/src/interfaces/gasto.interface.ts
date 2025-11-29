export interface Gasto {
    id: number;
    descripcion: string;
    monto: number;
    fechaPago: number; //día del mes
}
export interface GastoUpdate {
    descripcion?: string;
    monto?: number;
    fechaPago?: number;
};
