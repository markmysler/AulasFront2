import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    isAuthenticated: false,
    token: '',
    isLoading: false,
    user: {
      username: '',
      email: '',
      id: ''
    },
    aulas:[],
    days:[
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
      
    ],
    months:[
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ]
  },
  getters: {
  },
  mutations: {
    initializeStore(state){
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token');
        state.isAuthenticated = true;
      }else{
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setIsLoading(state, status){
      state.isLoading = status;
    },
    async setToken(state, token){
      state.token = token
      state.isAuthenticated = true

      await axios
              .get(`api/v1/user/${state.token}/`, {headers: {Authorization: `Token ${state.token}`},withCredentials: true })
              .then(response=>{
                  const data = response.data;
                  state.user.id = data.id;
                  state.user.username = data.username;
                  state.user.email = data.email;
              }).catch(error=>{
                console.log(error);
              })
    },
    removeToken(state){
      state.token = ''
      state.isAuthenticated = false
    }
  },
  actions: {
  },
  modules: {
  }
})
