<template>
    <div class="columnItemsCenter w-100">
        <h2 class="subtitle">Tutorial</h2>
        <iframe class="video mb-3 rounded-lg"
        src="https://www.youtube.com/embed/Ob6suhkSbsA">
        </iframe>
    </div>
</template>
<script>
export default {
    name:'TutorialView',
    mounted(){
        document.title = 'Tutorial'
    }
}
</script>

<style lang="scss" scoped>
.video{
    width: 80vw;
    height: 45vw;
}
@media screen and (min-width:1000px) {
    .video{
        width: 60vw;
        height: 30vw;
    }
}
</style>