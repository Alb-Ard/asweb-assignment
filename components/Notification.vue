<script setup lang="ts">

    const toggleDropDown = ref(false);
    const testNot = ref(["notifica1","notifica2", "notifica3"])

    //TO DO on mounted

</script>

<template>
    <div class="notify">
        <button class="fa fa-bell" @click="toggleDropDown = !toggleDropDown">
            <span class="num">{{testNot.length}}</span>
        </button>
        <dialog v-if="toggleDropDown" :open="toggleDropDown">
            <!-- add dynamically place id based on notification-->
            <ButtonLink to="/place/64a702d8eca121ace97da058" v-for="item in testNot">{{item}}</ButtonLink>
        </dialog>
    </div>
</template>

<style scoped>

    button {
        margin: 0 auto;
        display: block;
    }

    button:focus {
    outline: none;
    }

    .notify {
        position: relative;
        display: inline-block;
        z-index: 1;
    }

    .fa-bell {
        color: red;
        font-size: 40px;
        background-color: transparent;
    }

    .num {
        background-color: red;
        color: white;

        font-size: 20px;

        position: absolute;
        top: 0;
        right: 0;
    }


</style>