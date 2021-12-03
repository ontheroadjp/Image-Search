<template>
    <SearchBox />
    <div class="collection-wrapper">
        <div class="photo-collection">
        <template v-for="(item, index) in json" :key="index">
            <div class="photo-collection-item">
                <template v-for="(urls, index) in item" :key='index'>
                    <img :src="urls.thumb" />
                </template>
            </div>
        </template>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import SearchBox from '@/components/SearchBox.vue'
import UnsplashApi from '../http/UnsplashApi'

export default {
    name: 'Collection',
    components: {
        SearchBox,
    },
    computed: {
        json: function () {
            return this.$store.getters.getJson
        },
    },
    methods: {
        fetchCollections: function () {
            if( this.$store.getters.getJson.length == 0 ) {
                const options = {
                    per_page: 30,
                    page: 1
                }
                UnsplashApi.fetchCollections(options).then((response) => {
                    console.log(response.data)
                    this.$store.dispatch('setJson', {
                        json: response.data
                    })
                })
            }
        }
    },
    created() {
        this.$store.dispatch('changeMode', 'collection');
        console.log('Collection view created ...')
        this.fetchCollections()
    },
    updated() {
        this.$store.dispatch('changeMode', 'collection');
        console.log('Collection view updated ...')
        this.fetchCollections()
    }
}
</script>
<style lang='scss' scoped>
.photo-collection {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
}
.photo-collection-item {
    display: flex;
    flex-wrap: wrap;
    height: 200px;
    width: 200px;
    margin-top: 10px;
    margin-right: 10px;
    border: 1px solid gray;
    border-radius: 5px;
    img {
        height: 100px;
        width: 100px;
    }
}
</style>
