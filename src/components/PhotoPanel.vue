<template>
<div class="photo-panel">
    <div v-if="getMode == 1 && getUrls"
    ><PhotoView :urls='getUrls' /></div>

    <div v-if="getMode == 2 && getUrls"
    ><CollectionView :urls='getUrls' /></div>

    <div v-if="getMode == 3 && getUrls"
    ><PhotoView :urls='getUrls' /></div>

    <div v-if="getMode == 4 && getUrls"
    ><CollectionView :urls='getUrls' /></div>
</div>
</template>

<script>
import PhotoView from './PhotoPanel/PhotoView'
import CollectionView from './PhotoPanel/CollectionView'
import UnsplashApi from '../http/UnsplashApi'

export default {
    data () {
        return {
            scroll: {
                clientHeight: 0,
                y: 0
            },
        }
    },
    components: {
        PhotoView,
        CollectionView,
    },
    computed: {
        getMode: function () {
            return this.$store.state.mode
        },
        getUrls: function () {
            return this.$store.getters.getUrls
        },
        isFire: function () {
            return this.scroll.clientHeight < this.scroll.y + 1500
        }
    },
    watch: {
        isFire: function () {
            if( this.isFire ) {
                UnsplashApi.photoSearch({
                    query: this.$store.state.search.keywords,
                    per_page: this.$store.state.search.per_page,
                    page: this.$store.state.search.page
                }).then( (response) => {
                    console.log(response.data.results)
                    this.$store.dispatch( 'appendJson', {
                        json: response.data.results
                    })
                })
            }
        }
    },
    created () {
        window.addEventListener("scroll", () => {
            this.scroll.clientHeight = this.$el.clientHeight
            this.scroll.y = window.scrollY
//            console.log(this.$el.clientHeight)
//            console.log(this.$el)
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
.photo-panel {
    margin-top: 30px;
}
</style>
