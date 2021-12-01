<template>
    <div class="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
        <SearchBox />
        <PhotoPanel />
    </div>
</template>

<script>
    // @ is an alias to /src
    import SearchBox from '@/components/SearchBox.vue'
    import PhotoPanel from '@/components/PhotoPanel.vue'

    export default {
        name: 'Home',
        data () {
            return {
                keywords: ''
            }
        },
        components: {
            SearchBox,
            PhotoPanel
        },
    }
</script>
