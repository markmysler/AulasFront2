import { createStore } from "vuex";
import axios from "axios";

export default createStore({
	state: {
		isAuthenticated: false,
		token: "",
		isLoading: false,
		user: {
			username: "",
			email: "",
			id: "",
		},
		aulas: [],
		days: [
			"Domingo",
			"Lunes",
			"Martes",
			"Miercoles",
			"Jueves",
			"Viernes",
			"Sabado",
		],
		months: [
			"Enero",
			"Febrero",
			"Marzo",
			"Abril",
			"Mayo",
			"Junio",
			"Julio",
			"Agosto",
			"Septiembre",
			"Octubre",
			"Noviembre",
			"Diciembre",
		],
	},
	getters: {},
	mutations: {
		initializeStore(state) {
			const token = localStorage.getItem("token");
			if (token) {
				this.commit("setToken", token);
				this.commit("getAulas");
			} else {
				state.token = "";
				state.isAuthenticated = false;
			}
		},
		setIsLoading(state, status) {
			state.isLoading = status;
		},
		async setToken(state, token) {
			state.token = token;
			state.isAuthenticated = true;

			const saved_user = localStorage.getItem("user");

			if (saved_user) {
				state.user = JSON.parse(saved_user);
			} else {
				await axios
					.get(`api/v1/user/${state.token}/`, {
						headers: { Authorization: `Token ${state.token}` },
						withCredentials: true,
					})
					.then((response) => {
						const data = response.data;
						localStorage.setItem("user", JSON.stringify(data));
						state.user.id = data.id;
						state.user.username = data.username;
						state.user.email = data.email;
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},
		removeToken(state) {
			state.token = "";
			state.isAuthenticated = false;
		},
		async getAulas(state) {
			const saved_aulas = localStorage.getItem("aulas");
			if (saved_aulas) {
				state.aulas = JSON.parse(saved_aulas);
			}
			await axios
				.get("/api/v1/aulas/", {
					headers: {
						Authorization: `Token ${state.token}`,
					},
					withCredentials: true,
				})
				.then((response) => {
					state.aulas = response.data;
					localStorage.setItem(
						"aulas",
						JSON.stringify(response.data)
					);
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	modules: {},
});
