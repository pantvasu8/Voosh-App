import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000' || process.env.REACT_APP_BACKEND_URL
});

const api = {
    userSignup: async (userData) => {
        return instance.post('/add-user', userData);
    },
    userLogin: async (userData) => {
        return instance.post('/login-user', userData);
    },
    addOrder: async (orderData) => {
        return instance.post('/add-order', orderData, {
            headers: { Authorization: `${localStorage.getItem('token')}` }
        });
    },
    getOrder: async (user_id) => {
        return instance.get(`/get-order?user_id=${user_id}`, {
            headers: { Authorization: `${localStorage.getItem('token')}` }
        });
    },
};

export default api;
