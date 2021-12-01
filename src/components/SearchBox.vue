<template>
    <div class="search-panel">
        <div class="search-components">
            <input class="search-box"
                v-model='input'
                placeholder="search"
            >
            <button class="search-btn"
                @click="onClick"
            >Search</button>
        </div>
    </div>
</template>

<script>
import UnsplashApi from '../http/UnsplashApi'

export default {
    data() {
        return {
            input: '',
        }
    },
    computed: {
        keywords: function () {
            return this.$store.state.search.keywords
        },
        page: function () {
            return this.$store.state.search.page
        },
        per_page: function () {
            return this.$store.state.search.per_page
        },
    },
    methods: {
        onClick: function () {
            console.log('load search()...')
            const options = {
                query: this.input,
                per_page: this.per_page,
                page: this.page
            }
            this.$store.dispatch('setSearchCondition', options)
            switch( this.$store.state.mode ) {
                case 1:
                    UnsplashApi.photoSearch(options).then((response) => {
                        this.setJson(response.data.results)
                    })
                    break;
                case 2:
                    UnsplashApi.collectionSearch(options).then((response) => {
                        this.setJson(response.data.results)
                    })
                    break;
            }
        },
        setJson: function (json) {
            console.log(json)
//            this.$store.dispatch('setJson', { json: json })
            this.$store.dispatch('appendJson', { json: json })
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
