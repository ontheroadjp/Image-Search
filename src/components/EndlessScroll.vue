<template>
    <a href=""></a>
</template>

<script>
import UnsplashApi from '../http/UnsplashApi'
export default {
    data() {
        return {
            scroll: {
                innerHeight: '',
                y: ''
            }
        }
    },
    computed: {
        isFire: function () {
            return (this.scroll.innerHeight - 200) < this.scroll.y
        }
    },
    watch: {
        isFire: function () {
            if( this.isFire ) {
                console.log('isFireeeeeeeeeeeeeeeeeeeeee')
                UnsplashApi.photoSearch({
                    query: this.$store.state.keywords,
                    per_page: this.$store.state.per_page,
                    page: this.$store.state.page
                }).then( (response) => {
                    console.log(response.data.results)
                    this.$store.dispatch( 'setPhotoSearchJson', {
                        value: response.data.results
                    })
//                    this.page += 1
                })
            }
        }
    },
    created () {
        window.addEventListener("scroll", () => {
            this.scroll.innerHeight = window.innerHeight
            this.scroll.y = window.scrollY
        });
	},
	onUnmounted () {
        window.removeEventListener("scroll", function () {
            console.log('fire');
        });
	}
}
</script>
