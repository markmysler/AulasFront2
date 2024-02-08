<template>
  <div class="columnItemsCenter">
    <h2>Aulas Disponibles</h2>
    <v-btn @click="$router.push('/reservar')" elevation="3" class="bg-blue text-white mt-3 px-8 px-lg-16 text-lg-h6" append-icon="mdi-plus">Reservar aula</v-btn>
    
    <div class="aulasWrapper">
      <v-card class="aula d-flex flex-column justify-space-between bg-blue-darken-1 elevation-7 text-start pa-5" v-for="aula in aulas" :key="aula.id" @click="$router.push(`/aula/${aula.id}`)">
        <div>
          <h3>Aula {{ aula.name }}</h3>
          <div class="d-flex align-items-center ga-2 justify-end">
            <div class="d-flex align-center" v-if="aula.has_negatoscope"><v-icon size="large"  icon="mdi-radiology-box"></v-icon></div>
            <div class="d-flex align-center" v-if="aula.has_screen"><v-icon  icon="mdi-projector-screen"></v-icon></div>
            <div class="d-flex align-center"><v-icon icon="mdi-account" ></v-icon> <p class="text-subtitle-1" style="vertical-align: middle; line-height: 100%"> {{ aula.max_capacity }}</p></div>
          </div>
        </div>
        
      </v-card>
    </div>
    <div class="elevation-5 pa-5 rounded-xl mb-5 w-75 text-sm-center">
      <h3 class="text-center text-h5 mb-2">Guia</h3>
      <p class="text-subtitle-1 d-sm-inline-flex mx-sm-5"><v-icon icon="mdi-radiology-box" class="text-h4"></v-icon> Negatoscopio</p>
      <p class="text-subtitle-1 d-sm-inline-flex mx-sm-5"><v-icon icon="mdi-projector-screen" class="text-h4"></v-icon> Pantalla</p>
      <p class="text-subtitle-1 d-sm-inline-flex mx-sm-5"><v-icon icon="mdi-account" class="text-h4"></v-icon> Capacidad</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HomeView',
  data(){
    return {
      aulas: []
    }
  },
  methods:{
    async getAulas(){
      await axios
      .get('/api/v1/aulas/', {headers: {Authorization: `Token ${this.$store.state.token}`},withCredentials: true })
      .then(response => {
        this.aulas = response.data;
        this.$store.state.aulas = response.data
      })
      .catch(error=>{
        console.log(error);
      })
    }
  },
  components: {
    
  },
  mounted(){
    document.title = 'Inicio'
    this.getAulas()
  }
}
</script>

<style scoped>
.aulasWrapper{
  width: 85%;
  gap: 5vw;
  display: flex;
  flex-wrap: wrap;
  margin: 7vw 2vw;
}
.aula{
  width: 45%;
  border-radius: 20px;
}
.aulaAvailable{
  border: 1px solid blue;
}
.aulaNotAvailable{
  background-color: red;
  color: white;
}
@media screen and (max-width: 550px) {
  .aulasWrapper{
    justify-content: center;
    
  }
  .aula{
    width: 90%;

  }
  
}
@media screen and (min-width: 870px) {
  .aulasWrapper{
    max-width: 70vw;
    gap: 2vw;
  }
}
</style>