import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE = 'https://kami-backend-5rs0.onrender.com'

const api = axios.create({
    baseURL: BASE,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const login = async (phone, password) => {
    try {
        const response = await api.post('/auth', {
            'phone': phone,
            'password': password
        })

        if (response.data.token) {
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('user', response.data.name);
        }

        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        console.error('Login error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
}

export const addService = async (name, price) => {
    try {
        const response = await api.post('/services', {
            'name': name,
            'price': price
        })
        return response.data;
    } catch (error) {
        console.error('Add service error:', error.response?.data || error.message);
        throw error;
    }
}

export const updateService = async (id, name, price) => {
    try {
        const response = await api.put(`/services/${id}`, {
            'name': name,
            'price': price
        })
        return response.data;
    } catch (error) {
        console.error('Update service error:', error.response?.data || error.message);
        throw error;
    }
}

export const getAllServices = async () => {
    try {
        const response = await api.get('/services');
        return response.data
    } catch (error) {
        console.error("Error while fetching: ", error)
        throw error;
    }
}

export const getAService = async (id) => {
    try {
        const response = await api.get(`/services/${id}`)
        return response.data
    } catch (error) {
        console.error("Error while fetching: " + error)
        throw error;
    }
}

export const deleteService = async (id) => {
    try {
        const response = await api.delete(`/services/${id}`)
        return response.data
    } catch (error) {
        console.error("Error while deleting: " + error)
        throw error;
    }
}

export const getAllCustomers = async () => {
    try {
        const response = await api.get('/customers')
        return response.data
    } catch (error) {
        console.error("Error while fetching: " + error)
        throw error;
    }
}

export const addCustomer = async (name, phone) => {
    try {
        const res = await api.post('/customers', {
            'name': name,
            'phone': phone
        })
        return res.data
    } catch (error) {

    }
}

export const getAllTransactions = async () => {
    try {
        const response = await api.get('/transactions')
        return response.data
    } catch (error) {
        console.error("Error while fetching: " + error)
        throw error;
    }
}

export const getTransaction = async (id) => {
    try {
        const response = await api.get(`/transactions/${id}`)
        return response.data
    } catch (error) {
        console.error("Error while fetching: " + error)
        throw error;
    }
}

export const logout = async () => {
    try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
    } catch (error) {
        console.error("Error while logging out: " + error)
        throw error;
    }
}

export default api;