import api from './api';

export const cotizacionService = {
  crear: (payload) => api.post('/cotizaciones', payload),
};
