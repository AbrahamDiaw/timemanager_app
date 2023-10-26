<script>

import { ModalStore } from "../../stores/ModalStore";

export default {

    data() {
        return {
            isOpen: ModalStore((state) => state.isOpen)
        };
    },

    methods: {


    }

}

</script>

<template>
  <p>{{ isOpen }}</p>
</template>

<style scoped>

</style>