import api from './api';

export const productoService = {
  listar: () => api.get('/productos'),
};
