<template>
  <div id="app">
      <nav>
        <router-link to="/datatable">Table</router-link>
        <router-link to="/livetable">LiveTable</router-link>
        <router-link to="/modal">Modal</router-link>
      </nav>

    <router-view/>
  </div>
</template>

<script>
import Skills from './components/Skills.vue'
import table from './components/datatable.vue'
import search from './components/search.vue'

export default {
  name: 'app',
  components: {
    Skills,
    table,
    search
    
  },
  data(){
    return {
      authenticated: false,
      mockAccount: {
        username: "Amalan",
        password: "password",
        user1: "Ani",
        pass: "ani"
      }
    }
  },
  mounted() {
    
  },
  methods: {
    },
  }

</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

  body {
    background-color: lightgrey;
    font-family: 'Montserrat', sans-serif;
    display: grid;
    grid-template-rows: auto;
    justify-items: center;
    padding-top: 50px;
}

nav {
  padding: 20px 20px 20px 0;
}

nav a {
  padding: 10px;
  text-decoration: none;
  background: #fff;
  border-radius: 3px;
  color: rgb(0, 110, 255);
  font-weight: bold;
  margin-right: 15px;
}
  body, html {
    margin: 0;
    height: 100%;
    
}
  #app {
    width: 50%;
  }
</style>
