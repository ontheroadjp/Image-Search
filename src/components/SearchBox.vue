<template>
    <div class="search-panel">
        <div class="search-components">
            <input class="search-box"
                v-model='keywords'
                placeholder="search"
            >
            <button class="search-btn"
                @click="handleClick"
            >Search</button>
        </div>
    </div>
</template>

<script>
import UnsplashApi from '../http/UnsplashApi'

export default {
    data() {
        return {
            keywords: '',
            per_page: 50,
            page: 1,
        }
    },
    methods: {
        handleClick: function () {
            console.log('load search()...')
            switch( this.$store.state.mode ) {
                case 1:
                    this.photoSearch()
                    break;
                case 2:
                    this.collectionSearch()
                    break;
            }
        },
        photoSearch: function () {
            console.log('photoSearch')
            UnsplashApi.photoSearch({
                query: this.keywords,
                per_page: this.per_page,
                page: this.page
            }).then( (response) => {
                console.log(response.data.results)
                this.$store.dispatch( 'setPhotoSearchJson', {
                    value: response.data.results
                })
                this.page += 1
            })
        },
        collectionSearch: function () {
            console.log('collectionSearch')
            UnsplashApi.collectionSearch({
                query: this.keywords,
                per_page: this.per_page,
                page: this.page
            }).then( (response) => {
                console.log(response.data.results)
                this.$store.dispatch( 'setCollectionSearchJson', {
                    value: response.data.results
                })
                this.page += 1
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.search-panel {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}
.search-components {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    border: 1px solid #c3c3c3;
    width: 50%;
}
.search-box {
    width: 100%;
    font-size: 18px;
    padding: 12px;
    border: none;
    &:focus  {
        outline: none;
    }
}
.search-btn {
    width: 100px;
    padding: 12px;
    height: 50px;
    border: none;
    outline: none;
    background-color: #3da5cd;
    color: #fff;
    &:hover {
        cursor: pointer;
        background-color: #73bedb;
    }
}

</style>
