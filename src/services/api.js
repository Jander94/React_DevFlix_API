//chave API - 643494e9505ba0001f7c3b941502ce3a
//Base API - https://api.themoviedb.org/3/
//API- /movie/now_playing?api_key=643494e9505ba0001f7c3b941502ce3a&language=pt-BR

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})
export default api;