import api from './api';

export const productoService = {
    listar() {
        return api.get("/productos");
    },
    obtenerPorId(id) {
        return api.get('/productos/${id}');
    }
};
