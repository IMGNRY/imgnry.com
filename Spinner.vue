<template>
    <div class="center-container spinner">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            style="margin: auto; background: rgba(241, 242, 243, 0); display: block;"
            width="231px"
            height="231px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <circle cx="50" cy="50" r="23" stroke="#d0d0d0" stroke-width="0" fill="none"></circle>
            <circle
                cx="50"
                cy="50"
                r="23"
                stroke="#ededed"
                stroke-width="3"
                stroke-linecap="round"
                fill="none"
                transform="rotate(98.3117 50 50)"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="0.9345794392523364s"
                    values="0 50 50;180 50 50;720 50 50"
                    keyTimes="0;0.5;1"
                ></animateTransform>
                <animate
                    attributeName="stroke-dasharray"
                    repeatCount="indefinite"
                    dur="0.9345794392523364s"
                    values="27.457519792374793 117.05574227275568;52.02477434344697 92.4884877216835;27.457519792374793 117.05574227275568"
                    keyTimes="0;0.5;1"
                ></animate>
            </circle>
        </svg>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped>
.center-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.39);
    border-radius: 10px;
    transition: opacity 1s 1s;
    svg {
        opacity: 0.6;
    }
}
</style>
