<script>

export default {
}

</script>

<template>
    <div class="loader-wrap">
        <div class="loader">
            <div class="box-1 box"></div>
            <div class="box-2 box"></div>
            <div class="box-3 box"></div>
            <div class="box-4 box"></div>
            <div class="box-5 box"></div>
        </div>
    </div>
</template>

<style scoped>

.loader-wrap{
    background: var(--bg-dark-img);
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 99999;
}

.loader{
    font-size: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 120px;
    height: 20px;
}

.loader:after{
    color: var(--btn-primary-color-hover);
    content: "Loading...";
    font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
    font-size: 15px;
    position: absolute;
    width: 120px;
    top: 40px;
    left: 5px;
    text-align: center;
}

[class*='box-']{
    display: inline-block;
    font-size: 15px;
    line-height: 20px;
    margin-right: 5px;
    height: 20px;
    width: 20px;
    border: 5px solid var(--btn-primary-color-hover);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    box-shadow: 0 0 10px var(--btn-primary-color);
    border-radius: 50%;
    transform: scale(0.7);
    animation: loader 1s infinite linear;
}

[class*='box-']:last-child{
    margin-right: 0;
}

.box-1{
    animation-delay: .4s;
}

.box-2{
    animation-delay: .3s;
}

.box-3{
    animation-delay: .2s;
}

.box-4{
    animation-delay: .3s;
}

.box-5{
    animation-delay: .4s;
}

@keyframes loader {
    0% {
        transform: scale(1.2);
        opacity: 1;
    }

    100% {
        transform: scale(0.7) rotate(10deg);
        opacity: 0.1;
    }
}

</style>
