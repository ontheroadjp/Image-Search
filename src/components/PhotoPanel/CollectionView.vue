<template>
    <div class="photo-collection">
    <template v-for="(item, index) in urls" :key="index">
        <div class="photo-collection-item">
            <template v-for="(urls, index) in item" :key='index'>
                <img :src="urls.thumb" />
            </template>
        </div>
    </template>
    </div>
</template>

<script>
export default {
    props: [ 'urls' ]
}
</script>

<style lang='scss' scoped>
.photo-collection {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.photo-collection-item {
    display: flex;
    flex-wrap: wrap;
    height: 200px;
    width: 200px;
    margin-top: 10px;
    margin-right: 10px;
    border: 1px solid gray;
    border-radius: 5px;
    img {
        height: 100px;
        width: 100px;
    }
}

</style>
