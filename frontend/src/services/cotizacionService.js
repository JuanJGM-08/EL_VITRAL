import api from './api';

export const cotizacionService = {
    crearCotizacion(datos) {
        return api.post("/cotizaciones", datos);
    },
    listarCotizaciones() {
        return api.get("/cotizaciones");
    }
};
