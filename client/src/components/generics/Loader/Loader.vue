<script>

import Icon from "../Icon/Icon.vue";
import {Icons} from "../Icon/Icons";

export default {
    computed: {
        Icons() {
            return Icons
        }
    },
    components: {Icon}
}

</script>

<template>
    <div class="loader">
        <Icon :name="Icons.IconLoader" />
    </div>
</template>

<style scoped>

.loader {
    position: absolute;
    -webkit-animation: spin 1s linear infinite;
    -moz-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
}


.loader i {
    font-size: 2rem;
    color: var(--white);
}

@-moz-keyframes spin {
    100% { -moz-transform: rotate(360deg); }
}

@-webkit-keyframes spin {
    100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
    100% {
        -webkit-transform: rotate(360deg);
        transform:rotate(360deg);
    }
}

</style>
