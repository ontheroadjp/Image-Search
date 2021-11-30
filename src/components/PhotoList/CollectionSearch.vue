<template>
    <masonry-wall
        :items="urls"
        :ssr-columns="1"
        :column-width="200"
        :gap="5"
    >
        <template #default="{ item }">
            <div v-for="(urls, index) in item" :key='index'>
                <img :src="urls.thumb" style="width: 100%;"/>
            </div>
        </template>
    </masonry-wall>
</template>

<script>
export default {
    props: [ 'urls' ]
}
</script>

