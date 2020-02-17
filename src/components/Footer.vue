<template>
    <div class="footer">
        <div class="info">
            <p> <img src=".././img/ig.svg"><img class="fb" src=".././img/fb.svg"> tel:0902187026</p>
            <p>E-MAIL:4a252099@gmail.com</p>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import '.././assets/helpers/var';
.footer{
    width: 100%;
    height: 180px;
    background-color: #666;
    display: flex;
    justify-content: flex-end;
}
.info{
    // border: 1px solid white;
    // width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-right: 10px;
    p{
        cursor: pointer;
        @include font(1.4);
        color: white;
        // margin-top:50px;
        img{
            width: 65px;
            height: 50px;
        }
        .fb{
            width: 70px;
            height: 53px;
        }
    }
}
</style>