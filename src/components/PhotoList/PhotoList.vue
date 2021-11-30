<template>
    <masonry-wall
        :items="urls"
        :ssr-columns="1"
        :column-width="200"
        :gap="5"
    >
        <template #default="{ item }">
            <img :src="item.thumb" style="width: 100%;"/>
        </template>
    </masonry-wall>
</template>

<script>
export default {
    props: [ 'urls' ]
}
</script>

