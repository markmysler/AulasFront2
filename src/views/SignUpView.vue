<template>
	<div class="columnItemsCenter w-100 py-5 ga-5">
		<h2>Registrarse</h2>
		<v-form @submit.prevent="submitForm" class="columnItemsCenter w-100">
			<v-text-field
				class="inputWidth"
				placeholder="Nombre de usuario"
				v-model="username"
			/>
			<v-text-field
				class="inputWidth"
				placeholder="Email"
				v-model="email"
				type="email"
			/>
			<v-text-field
				class="inputWidth"
				placeholder="Contraseña"
				v-model="password"
				:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
				:type="show1 ? 'text' : 'password'"
				@click:append="show1 = !show1"
			/>
			<v-text-field
				class="inputWidth"
				placeholder="Repetir Contraseña"
				v-model="password2"
				:append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
				:type="show2 ? 'text' : 'password'"
				@click:append="show2 = !show2"
			/>
			<div v-if="errors.length">
				<p
					v-for="error in errors"
					:key="error"
					class="text-center text-red"
					style="max-width: 60vw"
				>
					{{ !!errorMap[error] ? errorMap[error] : error }}
				</p>
			</div>
			<v-btn
				elevation="5"
				class="bg-blue text-white my-3 px-10 px-lg-16 text-lg-h6 py-3 h-auto rounded-pill"
				type="submit"
				>Crear cuenta</v-btn
			>
			<div
				class="w-100 d-flex flex-row justify-center align-center ga-2 mt-5"
			>
				<p class="text-blue-grey-lighten-1">¿Ya tenes una cuenta?</p>
				<router-link class="text-blue" to="/iniciar-sesion"
					>Inicia sesión</router-link
				>
			</div>
		</v-form>
	</div>
</template>
<script>
import axios from "axios";
export default {
	name: "SignUpView",
	data() {
		return {
			username: "",
			email: "",
			password: "",
			password2: "",
			show1: false,
			show2: false,
			errors: [],
			errorMap: {
				"AxiosError: Request failed with status code 400":
					"La contraseña debe tener al menos 8 caracteres e incluir mayusculas, minusculas y un numero o caracter especial/Un usuario con ese nombre o email ya existe",
				"Email not allowed": "Email no autorizado",
			},
		};
	},
	methods: {
		async submitForm() {
			this.errors = [];
			if (this.username === "") {
				this.errors.push("El usuario no puede estar vacio");
			}
			if (this.email === "") {
				this.errors.push("El email no puede estar vacio");
			}
			if (this.password === "") {
				this.errors.push("La contraseña no puede estar vacia");
			}
			if (this.password !== this.password2) {
				this.errors.push("Las contraseñas deben ser iguales");
			}
			if (!this.errors.length) {
				const formData = {
					username: this.username,
					password: this.password,
					email: this.email,
				};
				await axios
					.post("/api/v1/users/", formData)
					.then((response) => {
						if (!response.data.error) {
							this.loginUser(formData);
						} else {
							this.errors.push(response.data.error);
						}
					})
					.catch((error) => {
						this.errors.push(error);
					});
			}
		},
		async loginUser(formData) {
			axios.defaults.headers.common["Authorization"] = "";
			localStorage.removeItem("token");
			await axios
				.post("/api/v1/token/login/", formData)
				.then((response) => {
					const token = response.data.auth_token;
					this.$store.commit("setToken", token);
					axios.defaults.headers.common["Authorization"] =
						"Token " + token;
					localStorage.setItem("token", token);
					this.$router.push("/inicio");
				})
				.catch((error) => {
					this.$router.push("/iniciar-sesion");
				});
		},
	},
	mounted() {
		document.title = "Registrarse";
	},
};
</script>

<style scoped></style>
