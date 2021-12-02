<template>
    <h1>{{ urls.description }}</h1>
    <div>
        <div class="img-frame">
            <img :src="urls.urls.regular" />
        </div>
        <div class="tag-frame">
            <template v-for="(tag, index) in urls.tags" :key="index">
                <div class="tag">{{ tag.title }}</div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'urls' ],
}
</script>

<style lang='scss' scoped>
.img-frame {
    height: 80%;
    width: 80%;
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
.tag {
    line-height: 1.2rem;
    background-color: grey;
    border-radius: 3px;
    margin: 5px;
    padding: 5px 15px;
}
</style>
