<template>
    <h1>{{ description }}</h1>
    <div>
        <div class="img-frame">
            <img :src="json.urls.regular" />
        </div>
        <div class="exif">
            <table style="margin: 20px; line-height: 2rem;">
                <tr><td style="width: 125px;">Model</td><td>{{ exif_model }}</td></tr>
                <tr><td>Focul Length</td><td>{{ exif_focul_length }}</td></tr>
                <tr><td>Speed</td><td>{{ exif_exposure_time }}</td></tr>
                <tr><td>Aperture</td><td>{{ exif_aperture }}</td></tr>
                <tr><td>ISO</td><td>{{ exif_iso }}</td></tr>
            </table>
        </div>
        <div class="tag-frame">
            <template v-for="(tag, index) in json.tags" :key="index">
                <div class="tag" :style='tagStyle'>{{ tag.title }}</div>
            </template>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import UnsplashApi from '../http/UnsplashApi'
//    import Color from '../utils/Color'

    export default {
        name: 'Work',
        computed: {
            json: function () {
                return this.$store.getters.getJson
            },
            description: function () {
                if( this.json.description != null ) {
                    return this.json.description
                } else if( this.json.alt_description != null ) {
                    return this.json.alt_description
                } else {
                    return 'No Title'
                }
            },
            tagStyle() {
                return {
                    '--color': this.json.color,
                    color: this.blackOrWhite(this.json.color)
                }
            },
            exif_model: function () {
                return this.json.exif.name ? this.json.exif.name : 'n/a'
            },
            exif_focul_length: function () {
                return this.json.exif.focul_length ? this.json.exif.focul_length : 'n/a'
            },
            exif_exposure_time: function () {
                return this.json.exif.exposure_time ? this.json.exif.exposure_time : 'n/a'
            },
            exif_aperture: function () {
                return this.json.exif.aperture ? this.json.exif.aperture : 'n/a'
            },
            exif_iso: function () {
                return this.json.exif.iso ? this.json.exif.iso : 'n/a'
            },
        },
        methods: {
            blackOrWhite: function (hexcolor) {
                const r = parseInt(hexcolor.substr(1, 2), 16)
                const g = parseInt(hexcolor.substr(3, 2), 16)
                const b = parseInt(hexcolor.substr(5, 2), 16)
                return ((((r * 299) + (g * 587) + (b * 114)) / 1000) < 128 )
                        ? "white"
                        : "#3c3b3b" ;
            }
        },
        created() {
            const id = (this.$route.params.id)
            console.log('Work view(' + id + ') created ...')
            const options = {
                per_page: 10,
                page: 1
            }
            UnsplashApi.photos(id, options).then((response) => {
                console.log(response.data)
                this.$store.dispatch('setJson', { json: response.data })
            })
            this.$store.dispatch('changeMode', 'work');
        }
    }
</script>
<style lang='scss' scoped>
.img-frame {
    height: 600px;
    width: 800px;
}
img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
}
.tag-frame {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.exif {
    background-color: #e9e9e9;
}
.tag {
    --color: f5f5f5;
    $hoge: white;
    background-color: var(--color);
    color: white;
    line-height: 1.2rem;
    border-radius: 3px;
    margin: 5px;
    padding: 5px 15px;
}
</style>
