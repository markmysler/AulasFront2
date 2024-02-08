<template>
    <h2>Perfil</h2>
    <div class="profileInfo elevation-3 rounded-lg pa-4 mx-0" style="max-width: 500px; min-width:">
        <p class="text-center text-subtitle-1">Nombre: {{ profile.name }} </p>
        <p class="text-center text-subtitle-1">Email: {{ profile.email }} </p>
        <div class="d-flex justify-space-evenly my-2">
            <v-btn class="bg-blue" prepend-icon="mdi-home" @click="this.$router.push('/inicio/')">Inicio</v-btn>
            <v-btn class="bg-blue" prepend-icon="mdi-calendar-plus" @click="this.$router.push('/mis-reservas/')">mis reservas</v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name:'ProfileView',
    /* Perfil Provisorio */
    data(){
        return{
            profile: {
                name: '',
                email: '',
                id: ''
            }
        }
    },
    methods:{
        getUserData(){
                this.profile.name = this.$store.state.user.username;
                this.profile.email = this.$store.state.user.email;
                this.profile.id = this.$store.state.user.id;
            }
    },
    mounted(){
        document.title = 'Perfil',
        this.getUserData()
    }
}
</script>

<style scoped>
.profileInfo{
    width: 85%;
    margin: 5vw;
}
@media screen and (max-width:400px) {
    .profileInfo{
        width: 95%;
    }
}
</style>