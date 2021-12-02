
<template>
    <div></div>
</template>

<script>
export default {
    props: [ 'urls' ],
    computed: {
        desc: function () {
            return this.$store.state.search.keywords
        },
    },
}
</script>

<style lang='scss' scoped>
.hover {
    position: relative;
}
.hover-img img {
    width: 100%;
    height: 100%;
}
.hover .hover-text {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    color: #fff;
    background-color: rgba(0,0,0,0.65);
    /*透明にして表示させない*/
    opacity: 0;
    /*ホバーの動き方*/
    transition: .3s ease-in-out;
}
.hover .hover-text .text1 {
    font-size: 22px;
    padding: 10px 20px;
}
.hover .hover-text .text2 {
    font-size: 16px;
    padding: 0 20px;
}
/*ホバーエフェクト*/
.hover:hover .hover-text {
    /*不透明にして表示*/
    opacity: 1;
}

</style>
