<template>
    <div class="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
        <SearchBox />
        <PhotoList />
    </div>
</template>

<script>
    // @ is an alias to /src
    import SearchBox from '@/components/SearchBox.vue'
    import PhotoList from '@/components/PhotoList.vue'

    export default {
        name: 'Home',
        components: {
            SearchBox,
            PhotoList
        },
    }
</script>
