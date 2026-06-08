import api from '../lib/api';

export const getUserInfo = () => {
    return api.get('/profile/');
};
