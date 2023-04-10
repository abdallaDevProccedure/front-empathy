import axios from 'axios';

export const getAllUsers = async() => {
    try {
        const response = await axios.get('http://localhost:3001/user');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getUser = async(email: string, password: string) => {
    try {
        const response = await axios.get(`http://localhost:3001/user?email=${email}&password=${password}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getAllProducts = async() => {
    try {
        const response = await axios.get('http://localhost:3001/products');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default axios.create({
    baseURL: "http://localhost:3001"
})