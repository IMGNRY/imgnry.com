<template>
    <!-- <div class="placeholder gallery-image"> -->
    <img :src="lowResSrc" data-sizes="auto" :data-srcset="srcSets" class="lazyload gallery-image" />
    <!-- <img class="lazyload gallery-image" /> -->
    <!-- <img :src="lowResSrc" class="lazyload gallery-image" /> -->
    <!-- </div> -->
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({})
export default class LazyImage extends Vue {
    @Prop() name: string

    get srcSets() {
        return [30, 200, 300, 400, 500, 600, 800, 1000, 1320, 1600, 2000, 2500].map(n => {
            return `https://res.cloudinary.com/picular/image/upload/f_auto,w_${n}/imgnry/proj-${this.name} ${n}w`
        })
    }

    get lowResSrc() {
        return this.srcSets[0].split(' ')[0]
    }
}
</script>

<style lang="scss" scoped>
img {
    background: #212121;
    // border-radius: 10px;
    // width: 100%;
    // height: 300px;
    // border: 2px solid red;
    // img {
    //     opacity: 0;
    // }
}
</style>
