<template>
   <div class="banner">
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel"
          data-interval="4000" data-pause="false" >
      <div class="carousel-inner">
        <div class="carousel-item ca1 active">
          <div class="carousel-title">
            <p>THE BEST FOOD</p>
          </div>
        </div>
        <div class="carousel-item ca2">
          <div class="carousel-title">
            <p>THE BEST DRINK</p>
          </div>
        </div>
        <div class="carousel-item ca3">
          <div class="carousel-title">
            <p>THE BEST SEVERVICE</p>
          </div>
        </div>
      </div>
          <div class="scrollDown">
          <div class="scrollPoint"></div>
        </div>
    </div>
      </div>
</template>

<script>
export default {
//  mounted(){
//      $('.carousel').carousel({
//   interval: 2000
// })
//   },
}
</script>

<style lang="scss">
@import '../.././assets/helpers/var';
.banner{
  // position: relative;
    .carousel-item{
      height: 100vh;
      animation: itemTrans 2.5s;
      .carousel-title{
        width: 100%;
        position: absolute;
        top: 45%;
        left: 0;
        p{
        @include font(3);
        color: #666;
        animation: itemopa 3s;
        }
      }
    }
  @keyframes itemTrans {
  from {        
      transform: scale(1.5);
  }
  to {
      transform: scale(1);
  }
}
  @keyframes itemopa {
  from {
      transform: translateY(50px);
      opacity: 0;
  }
  to {
      transform: translateY(0px);
      opacity: 1;
  }
}
      .ca1{
        background: url("../../img/banner1.png");
        // background-position: top 40% left 50%;
      }
      .ca2{
         background: url("../../img/banner2.png");
      }
      .ca3{
         background: url("../../img/banner3.png");
      }
.scrollDown{
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999;
    .scrollPoint{
      display: block;
      width: 1px;
      height: 60px;
      background-color: white;
      margin-top: 100px;
      position: relative;
      &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background-color: white;
          border-radius: 50%;
          animation: scroll 2s infinite;
      }
    }
}
@keyframes scroll {
    0% {
        top: 0;
    }
    30% {
        top: 100%;
        transform: translateX(-50%) scale(1);
        opacity: 1;
    }
    100% {
        top: 100%;
        transform: translateX(-50%) scale(5);
        opacity: 0;
    }
}
}
</style>