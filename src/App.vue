<template>
    <div id="nav">
        <span class="nav-item"><router-link to="/">Home</router-link></span> |
        <span class="nav-item"><router-link to="/about">About</router-link></span> |
        <span class="nav-item"><ModeChanger /></span>
    </div>
    <router-view/>
</template>

<script>
import ModeChanger from '@/components/ModeChanger.vue'
export default {
    data() {
        return {
            inner: {
                width: '',
                height: ''
            },
            outer: {
                width: '',
                height: ''
            }
        }
    },
    components: {
        ModeChanger
    },
    created () {
        window.addEventListener("scroll", function () {
//            this.outer.width = window.outerWidth
//            this.outer.height = window.outerHeight
//            this.inner.width = window.innerWidth
//            this.inner.height = window.innerHeight
//            console.log(window.outerWidth)
//            console.log(window.outerHeight)
//            console.log(window.innerWidth)
//            console.log(window.innerHeight)
//            console.log(window.scrollY)
//            this.$store.dispatch('setScrollY', { val: window.scrollY })
        });
	},

	onUnmounted () {
        window.removeEventListener("scroll", function () {
            console.log('fire');
        });
	}
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
