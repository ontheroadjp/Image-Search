<template>
    <div class="collection-wrapper">
        <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
        <SearchBox />
        <PhotoPanel />
    </div>
</template>

<script>
    // @ is an alias to /src
    import SearchBox from '@/components/SearchBox.vue'
    import PhotoPanel from '@/components/PhotoPanel.vue'
    import UnsplashApi from '../http/UnsplashApi'

    export default {
        name: 'Collection',
        components: {
            SearchBox,
            PhotoPanel
        },
        created() {
            this.$store.dispatch('changeMode', 4);
            console.log('Collection view created ...')
            if( this.$store.getters.getUrls.length == 0 ) {
                const options = {
                    per_page: 30,
                    page: 1
                }
                UnsplashApi.collectionList(options).then((response) => {
                    console.log(response.data)
                    this.$store.dispatch('appendJson', {
                        json: response.data
                    })
                })
            }
        }
    }
</script>
