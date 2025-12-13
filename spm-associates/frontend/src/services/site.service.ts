import api from './api';
import { Site } from '../types/site';

export const getSites = async (): Promise<Site[]> => {
    const response = await api.get('/sites');
    return response.data;
};

export const getSiteById = async (id: number): Promise<Site> => {
    const response = await api.get(`/sites/${id}`);
    return response.data;
};

export const createSite = async (site: Site): Promise<Site> => {
    const response = await api.post('/sites', site);
    return response.data;
};

export const updateSite = async (id: number, site: Site): Promise<Site> => {
    const response = await api.put(`/sites/${id}`, site);
    return response.data;
};

export const deleteSite = async (id: number): Promise<void> => {
    await api.delete(`/sites/${id}`);
};
