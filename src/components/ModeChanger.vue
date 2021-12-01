<template>
    <select class="mode-selector" v-model="selected" @change='onChanged'>
        <option v-for="(option, index) in options"
            :key="index"
            :value="option.value"
        >{{ option.label }}</option>
    </select>
</template>

<script>
import UnsplashApi from '../http/UnsplashApi'
export default {
    data() {
        return {
            selected: 1,
            options: [
                { value: 1, label: '写真検索' },
                { value: 2, label: 'コレクション検索' },
                { value: 3, label: '写真リスト' },
                { value: 4, label: 'コレクションリスト' }
            ],
        }
    },
    methods: {
        onChanged: function () {
            console.log('change mode ...')
            this.$store.dispatch('changeMode', this.selected);
            const options = {
                per_page: 30,
                page: 1
            }
            switch (this.selected) {
                case 3:
                    UnsplashApi.photoList(options).then( (response) => {
                        this.appendJson(response)
                    })
                    break;
                case 4:
                    UnsplashApi.collectionList(options).then( (response) => {
                        this.appendJson(response)
                    })
                    break;
            }
        },
        appendJson: function (response) {
            console.log(response.data)
            this.$store.dispatch( 'appendJson', {
                json: response.data
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.mode-selector {
    height: 40px;
    width: 130px;
    border: none;
    outline: none;
    cursor: pointer;
}
</style>
