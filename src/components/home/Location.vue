<template>
<div class="location">
    <h2 class="locationHead">LOCATION</h2>
    <ul class="storeList">
        <li class="store1">
            <span>Taipei</span>
            <a>Go</a>
        </li>
        <li class="store2">
            <span>Tauyaun</span>
            <a>Go</a>
        </li>
        <li class="store3">
            <span>Taichung</span>
            <a>Go</a>
        </li>
        <li class="store4">
            <span>Kaohsiung</span>
            <a>Go</a>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import '../.././assets/helpers/var';
.location{
    width: 100%;
    height: auto;
}
.locationHead{
    margin: 30px auto;
}
.storeList{
    width: 90%;
    height: 80vh;
    margin: 0 auto;
    display: flex;
    .store1{
        background:url('../../img/store1.jpeg') center;
    }
    .store2{
        background:url('../../img/store2.jpeg') center;
    }
    .store3{
        background:url('../../img/store3.jpeg') center;
    }
    .store4{
        background:url('../../img/store4.jpeg') center;
    }
    li{
        border: 1px solid #666;
        flex: 1;
        transition: .5s;
        transition-delay: .5s;
        position: relative;
        overflow: hidden;
        span{
            @include positionCenter;
            @include font(2.5);
            color: white;
            z-index: 99;
            @include media(965px){
            writing-mode: vertical-lr;
            text-orientation: upright;
            }
        }
        a{
            @include btnReset;
            @include font(2.5);
            color: pink;
            width: 15%;
            min-width: 100px;
            height: 50px;
            border: 1px solid #666;
            border-radius: 10px;
            position:absolute;
            bottom: -10%;
            opacity: 0;
            background: #666;
            z-index: 999;
            &:hover{
                background: black;
            }
        }
        &:hover{
            flex: 70%;
        }
        &::before{
            content: '';
            width: 100%;
            height: 50%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #666;
            opacity: .5;
            transition: .5s;
        }
        &::after{
            content: '';
            width: 100%;
            height: 50%;
            position: absolute;
            bottom: 0;
            left: 0;
            background-color: #666;
            opacity: .5;
            transition: .5s;
        }
        &:hover::before{
            background-color: pink;
            height: 0;
        }
        &:hover::after{
            background-color: pink;
            height: 0;
        }
        &:hover a{
            @include positionBottom;
            bottom: 10%;
            animation: btnMove 1s;
            animation-delay: 1s;
            transition: opacity 1s;
            transition-delay:1s;
            opacity: 1;
        }
    }
    @keyframes btnMove {
    from {
        // width:0 ;
        bottom: -10%;
        // opacity: 0;
        visibility: hidden;
    }
    to {
        // width: 20%;
        bottom: 10%;
        // opacity: 1;
        visibility: visible;
    }
}
}
</style>