import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomeView from '../views/HomeView.vue'
import LogInView from '../views/LogInView.vue'
import SignUpView from '../views/SignUpView.vue'
import MyReservationsView from '../views/MyReservationsView.vue'
import ReservationView from '../views/ReservationView.vue'
import TutorialView from '../views/TutorialView.vue'
import ProfileView from '../views/ProfileView.vue'
import AulaDetailView from '../views/AulaDetailView.vue'
import ReservationDetailView from '../views/ReservationDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'Tutorial',
    component: TutorialView
  },
  {
    path: '/iniciar-sesion',
    name: 'IniciarSesion',
    component: LogInView
  },
  {
    path: '/registrarse',
    name: 'Registrarse',
    component: SignUpView
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: HomeView,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/reservar',
    name: 'Reservar',
    component: ReservationView,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/mis-reservas',
    name: 'MisReservas',
    component: MyReservationsView,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: ProfileView,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/aula/:id',
    name: 'AulaDetalle',
    component: AulaDetailView,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/reserva/:id',
    name: 'ReservaDetalle',
    component: ReservationDetailView,
    meta: {
      requireLogin: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from)=>{
  if (to.meta?.requireLogin && !store.state.isAuthenticated) {
    return 'iniciar-sesion'
  }
})

export default router
