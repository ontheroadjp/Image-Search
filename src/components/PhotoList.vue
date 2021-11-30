<template>
    <div v-if="this.$store.state.mode == 3 && photoListUrls"
        style="margin-top: 30px;"
    ><PhotoList :urls='photoListUrls' /></div>

    <div v-if="this.$store.state.mode == 1 && photoSearchUrls"
        style="margin-top: 30px;"
    ><PhotoSearch :urls='photoSearchUrls' /></div>

    <div v-if="this.$store.state.mode == 2 && collectionSearchUrls"
        style="margin-top: 30px;"
    ><CollectionSearch :urls='collectionSearchUrls' /></div>

    <div v-if="this.$store.state.mode == 4 && collectionListUrls"
        style="margin-top: 30px;"
    ><CollectionList :urls='collectionListUrls' /></div>
</template>

<script>
import PhotoList from './PhotoList/PhotoList'
import PhotoSearch from './PhotoList/PhotoSearch'
import CollectionSearch from './PhotoList/CollectionSearch'
import CollectionList from './PhotoList/CollectionList'

export default {
    components: {
        PhotoList,
        PhotoSearch,
        CollectionSearch,
        CollectionList,
    },
    computed: {
        photoListUrls: function () {
            return this.$store.getters.getPhotoListUrls
        },
        photoSearchUrls: function () {
            return this.$store.getters.getPhotoSearchUrls
        },
        collectionSearchUrls: function () {
            return this.$store.getters.getCollectionSearchUrls
        },
        collectionListUrls: function () {
            return this.$store.getters.getCollectionListUrls
        }
    },
}
</script>

<style lang="scss" scoped>
</style>
