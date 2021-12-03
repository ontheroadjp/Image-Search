<template>
    <h1>{{ description }}</h1>
    <div>
        <div class="img-frame">
            <img :src="json.urls.regular" />
        </div>
        <div class="rgb-color-panel">
            <template v-if="rgbColors.length != 0" class="rgb-color-panel">
                <template v-for="(c, index) in style.rgbColors" :key="index">
                    <div class="rgb-color-item" :style="style.rgbColors[index]"></div>
                </template>
            </template>
            <div v-else>
                <div class="color-analysis" :style="style.tag" @click="onClickColorAnalysis">Color Analysis</div>
            </div>
        </div>
        <div class="exif">
            <table style="margin: 20px; line-height: 2rem;">
                <tr><td style="width: 125px;">Model</td><td>{{ exif.model }}</td></tr>
                <tr><td>Focul Length</td><td>{{ exif.focul_length }}</td></tr>
                <tr><td>Speed</td><td>{{ exif.exposure_time }}</td></tr>
                <tr><td>Aperture</td><td>{{ exif.aperture }}</td></tr>
                <tr><td>ISO</td><td>{{ exif.iso }}</td></tr>
            </table>
        </div>
        <div class="tag-frame">
            <template v-for="(tag, index) in json.tags" :key="index">
                <div class="tag" :style='style.tag' @click='onClickTag(tag.title)'>
                    {{ tag.title }}
                </div>
            </template>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import UnsplashApi from '../http/UnsplashApi'
import RGBaster from 'rgbaster'

export default {
    name: 'Work',
    data() {
        return {
            rgbColors: [],
        }
    },
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
        exif: function () {
            return {
                'model': this.json.exif.name ? this.json.exif.name : 'n/a',
                'focul_length': this.json.exif.focul_length ? this.json.exif.focul_length : 'n/a',
                'exposure_time': this.json.exif.exposure_time ? this.json.exif.exposure_time : 'n/a',
                'aperture': this.json.exif.aperture ? this.json.exif.aperture : 'n/a',
                'iso': this.json.exif.iso ? this.json.exif.iso : 'n/a'
            }
        },
        style: function () {
            let rgbColors = []
            if(this.rgbColors.length != 0) {
                for( let i = 0; i < (this.rgbColors.length) / 3; i = i + 5000 ) {
                    rgbColors.push({'background-color': this.rgbColors[i].color})
                }
            }
            return {
                'rgbColors': rgbColors,
                'color-analysis': {
                    '--color': this.json.color,
                    color: this.blackOrWhite(this.json.color)
                },
                'tag': {
                    '--color': this.json.color,
                    color: this.blackOrWhite(this.json.color)
                },
            }
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
        },
        onClickColorAnalysis: function () {
            RGBaster(this.json.urls.regular).then((result) => {
                this.rgbColors = result
            })
        },
        onClickTag: function (keyword) {
            this.$router.push({path: '/photo'})
            const options = {
                query: keyword,
                per_page: 30,
                page: 1
            }
            this.$store.dispatch('setSearchCondition', options)
            UnsplashApi.searchPhoto(options).then((response) => {
                console.log(response.data.results)
                this.$store.dispatch('setJson', { json: response.data.results })
            })
        }
    },
    created() {
        console.log('Work view created ...')
//        const id = (this.$route.params.id)
//        const options = {
//            per_page: 10,
//            page: 1
//        }
//        UnsplashApi.fetchPhoto(id, options).then((response) => {
//            console.log(response.data)
//            this.$store.dispatch('setJson', { json: response.data })
//        })
        this.$store.dispatch('changeMode', 'work');
    },
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
.color-analysis {
    --color: f5f5f5;
    background-color: var(--color);
    padding: 5px 20px;
    width: 100px;
    line-height: 2rem;
    border-radius: 5px;
    cursor: pointer;
}
.rgb-color-panel {
    display: flex;
    flex-wrap: wrap;
    margin: 20px;
    .rgb-color-item {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        margin-right: 5px;
    }
}
.exif {
    background-color: #e9e9e9;
}

.tag-frame {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.tag {
    --color: f5f5f5;
    background-color: var(--color);
    color: white;
    line-height: 1.2rem;
    border-radius: 3px;
    margin: 5px;
    padding: 5px 15px;
    cursor: pointer;
}
</style>
