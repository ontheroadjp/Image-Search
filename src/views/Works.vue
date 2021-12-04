<template>
    <h1 style="text-align: center;">{{ description }}</h1>
    <div>
        <div style="display: flex; justify-content: space-evenly">
            <div>
                <img :src="isJsonReady ? json.urls.small : ''" />
            </div>
            <div>
                <div class="info-panel">
                    <div>{{ json.width }} x {{ json.height }}</div>
                    <div>created at {{ json.created_at }}</div>
                </div>
                <div class="user-panel">
                    <img :src="json.user.profile_image.medium" style="border-radius: 50px;"/>
                    <div style="margin-left: 15px; line-height: 1.3rem;">Photo by<br>{{ json.user.name }} @{{ json.user.location }}</div>
                </div>
            </div>
        </div>
        <div class="download">
            <button id="download" class="download-btn" @click="onClickDownload()">Download</button>
        </div>
        <div class="rgb-color-panel">
            <template v-if="rgbColors.length != 0" class="rgb-color-panel">
                <template v-for="(c, index) in style.rgbColors" :key="index">
                    <div class="rgb-color-item" :style="style.rgbColors[index]"></div>
                </template>
            </template>
            <div v-else>
                <button class="color-analysis-btn"
                    :style="style.tag"
                    @click="onClickColorAnalysis"
                >Color Analysis</button>
            </div>
        </div>
        <div class="exif-panel">
            <div class="exif-box">
                <div>Model</div><div>{{ exif.model }}</div>
            </div>
            <div class="exif-box">
                <div>Focul Length</div><div>{{ exif.focul_length }}</div>
            </div>
            <div class="exif-box">
                <div>Speed</div><div>{{ exif.exposure_time }}</div>
            </div>
            <div class="exif-box">
                <div>Aperture</div><div>{{ exif.aperture }}</div>
            </div>
            <div class="exif-box">
                <div>ISO</div><div>{{ exif.iso }}</div>
            </div>
        </div>
        <div class="tag-panel">
            <template v-for="(tag, index) in json.tags" :key="index">
                <div class="tag"
                    :style='style.tag'
                    @click='onClickTag(tag.title)'
                    @mouseover="onMouseOver"
                    @mouseout="onMouseOut"
                >{{ tag.title }}
                </div>
            </template>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import UnsplashApi from '../http/UnsplashApi'
import RGBaster from 'rgbaster'
import axios from 'axios'
import { saveAs } from 'file-saver'

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
        isJsonReady: function() {
            return this.json.length != 0 ? true : false
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
            if(this.isJsonReady) {
                return {
                    'model': this.json.exif.name ? this.json.exif.name : 'n/a',
                    'focul_length': this.json.exif.focul_length ? this.json.exif.focul_length : 'n/a',
                    'exposure_time': this.json.exif.exposure_time ? this.json.exif.exposure_time : 'n/a',
                    'aperture': this.json.exif.aperture ? this.json.exif.aperture : 'n/a',
                    'iso': this.json.exif.iso ? this.json.exif.iso : 'n/a'
                }
            } else { return {} }
        },
        exClass: function () {
            return {
                tag: {
                }
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
            if(hexcolor) {
                const r = parseInt(hexcolor.substr(1, 2), 16)
                const g = parseInt(hexcolor.substr(3, 2), 16)
                const b = parseInt(hexcolor.substr(5, 2), 16)
                return ((((r * 299) + (g * 587) + (b * 114)) / 1000) < 128 )
                        ? "white"
                        : "#3c3b3b" ;
            } else {
                return ''
            }
        },
        onClickColorAnalysis: function () {
            RGBaster(this.json.urls.small).then((result) => {
                this.rgbColors = result
            })
        },
        onClickDownload: function() {
            //const url = this.json.links.download
            //const url = this.json.urls.full
            UnsplashApi.photoDownload(this.$route.params.id, {}).then((response) => {
                console.log(response)
                axios.get(response.data.url, {
                    responseType: "blob",
                }).then(response => {
                    const blob = new Blob([response.data], {
                        type: response.data.type
                    });
                    const fileName = 'image.jpg';
                    saveAs(blob, fileName);
                })
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
        },
        onMouseOver: function (e) {
            e.target.style.backgroundColor = 'gray'
            e.target.style.color = 'white'
        },
        onMouseOut: function (e) {
            e.target.style.backgroundColor = this.json.color
            e.target.style.color = this.blackOrWhite(this.json.color)
        }
    },
    created() {
        console.log('Work view created ...')
        this.$store.dispatch('changeMode', 'work');
        const id = this.$route.params.id
        if( this.json.length == 0 ) {
            UnsplashApi.fetchPhoto(id, {}).then((response) => {
                console.log(response.data)
                this.$store.dispatch('setJson', { json: response.data })
            })
        }
    },
    updated() {
        this.onClickColorAnalysis()
    }
}
</script>
<style lang='scss' scoped>
.img-panel {
    height: 600px;
    width: 800px;
}
img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
}
.user-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
}
.download {
    margin: 20px;
}
.color-analysis-btn, .download-btn {
    --color: f5f5f5;
    background-color: var(--color);
    padding: 5px 20px;
    width: 200px;
    line-height: 2rem;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid #ccc;
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
.exif-panel {
    background-color: #f9f7f7;
    display: flex;
    justify-content: space-around;
    padding: 5px;
    .exif-box {
        display: flex;
        flex-flow: column;
        line-height: 2rem;
        text-align: center;
    }
}

.tag-panel {
    width: 100%;
    margin-top: 20px;
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
    &:hover {
        background-color: gray;
        color: white;
    }
}
</style>
