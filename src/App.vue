<template>
    <div id="nav">
        <span class="nav-item"><router-link to="/">Home</router-link></span> |
        <span class="nav-item"><router-link to="/about">About</router-link></span> |
        <span class="nav-item"><ModeChanger /></span>
    </div>
    <router-view/>
    <EndlessScroll />
</template>

<script>
import ModeChanger from '@/components/ModeChanger.vue'
import EndlessScroll from '@/components/EndlessScroll.vue'
export default {
    components: {
        ModeChanger,
        EndlessScroll
    },
}
</script>

<style lang="scss" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    display: flex;
    align-items: center;
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
    }
    a.router-link-exact-active {
        color: #42b983;
    }
    .nav-item {
        margin: 0 20px;
    }
}


</style>
