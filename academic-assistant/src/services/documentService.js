import api from '../lib/api';

export const getDocuments = () => {
    return api.get('/documents/');
};
