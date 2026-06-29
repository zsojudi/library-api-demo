import axios from 'axios';

//Use relative path - will work with Vite proxy
const API_BASE = '/api';

const api = axios.create({
    baseURL : API_BASE,
    headers : {
        'Content_Type' : 'application/json',
    },
});

export const getBooks = () => api.get('/books');
export const addBook = (book) => api.get(`/add_book/${book}`);
export const markRead = (id) => api.get(`/books/${id}`);
export const deleteBook = (id) => api.get(`/delete_book/${id}`);

export default api;
