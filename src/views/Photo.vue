<template>
    <SearchBox />
    <div class="photo-wrapper" style="margin-top: 30px;">
    <masonry-wall
        :items="json"
        :ssr-columns="1"
        :column-width="200"
        :gap="5"
    >
        <template #default="{ item }">
            <div class="hover">
                <div class="hover-img">
                    <img :src="item.urls.thumb" style="width: 100%;"/>
                </div>
                <a @click='onClick(item.id)'>
                    <div class="hover-text">
                        <p class="text1">
                            {{ item.desc ? item.desc : description }}
                        </p>
                        <p class="text2">
                            {{ item.alt_desc }}
                        </p>
                    </div>
                </a>
            </div>
        </template>
    </masonry-wall>
    </div>
</template>

<script>
// @ is an alias to /src
import SearchBox from '@/components/SearchBox.vue'
import UnsplashApi from '../http/UnsplashApi'

export default {
    name: 'Photo',
    data () {
        return {
            scroll: {
                clientHeight: 0,
                y: 0
            },
        }
    },
    components: {
        SearchBox,
    },
    computed: {
        json: function () {
            return this.$store.getters.getJson
        },
        description: function () {
            return this.$store.state.search.keywords
        },
        isFire: function () {
            return this.scroll.clientHeight < this.scroll.y + 1500
        }
    },
    methods: {
        onClick: function (id) {
            this.$router.push({ path: '/photo/' + id });
            const options = {
                per_page: 10,
                page: 1
            }
            UnsplashApi.fetchPhoto(id, options).then((response) => {
                console.log(response.data)
                this.$store.dispatch('setJson', { json: response.data })
            })
        }
    },
    created() {
        this.$store.dispatch('changeMode', 1);
        console.log('Photo view created ...')
        if( this.$store.getters.getJson.length == 0 ) {
            const options = {
                per_page: 30,
                page: 1
            }
            UnsplashApi.fetchPhotos(options).then((response) => {
                console.log(response.data)
                this.$store.dispatch('setJson', {
                    json: response.data
                })
            })
        }

        // scroll event
        window.addEventListener("scroll", () => {
            this.scroll.clientHeight = this.$el.clientHeight
            this.scroll.y = window.scrollY
        });
    },
    onUnmounted () {
        window.removeEventListener("scroll", function () {
            console.log('fire');
        });
	},
    watch: {
        isFire: function () {
            if( this.isFire ) {
                UnsplashApi.fetchPhotoSearch({
                    query: this.$store.state.search.keywords,
                    per_page: this.$store.state.search.per_page,
                    page: this.$store.state.search.page
                }).then( (response) => {
                    console.log(response.data.results)
                    this.$store.dispatch( 'setJson', {
                        json: response.data.results,
                        append: true
                    })
                })
            }
        }
    },
}
</script>
<style lang='scss' scoped>
.hover {
    position: relative;
}
.hover-img img {
    width: 100%;
    height: 100%;
}
.hover .hover-text {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    color: #fff;
    background-color: rgba(0,0,0,0.65);
    opacity: 0;
    transition: .3s ease-in-out;
}
.hover .hover-text .text1 {
    font-size: 22px;
    padding: 10px 20px;
}
.hover .hover-text .text2 {
    font-size: 16px;
    padding: 0 20px;
}
.hover:hover .hover-text {
    opacity: 1;
}
</style>
