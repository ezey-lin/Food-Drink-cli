<template>
    <div class="homeIntro">
        <h2>Product Introduction</h2>
        <h3>Our Prodcut</h3>
        <div class="productPic">
            <div class="proContain pro1">
                <div class="picBox picBox1">
                    <div class="picFilter"></div>
                    <div class="picInfo">
                    <p>tasty food Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
                 <div class="scrollDown">
                    <div class="scrollPoint"></div>
                </div>
                <h4>FOOD</h4>
            </div>
            <div class="proContain pro2">
                <h4>DRINK</h4>
                <div class="scrollDown">
                    <div class="scrollPoint"></div>
                </div>
                <div class="picBox picBox2">
                    <div class="picInfo">
                    <p>tasty food Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div class="picFilter"></div>
                </div>
            </div>
        </div>
        <div class="introBack"></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style  lang="scss" scoped>
@import '../.././assets/helpers/var';
.homeIntro{
    width: 100%;
    height: auto;
    position: relative;
  .introBack{
      width: 60%;
      height: 70%;
      background: lightblue;
      @include positionCenter;
      top: 62%;
      z-index: -1;
  }
  h2{
      @include font(2);
      display: block;
      padding: 50px 0;
  }
  .productPic{
      max-width: 80%;
      height: 75%;
      margin: 50px auto;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    @include media(1280px){
        max-width: 99%;
    }
    @include media(415px){
        flex-direction: column;
    }
    .proContain{
        flex: 1;
        height: 700px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h4{
            @include font(3);
            font-weight: 1000;
            width: 80%;
        }
        .picBox{
          max-width: 100%;
          height: 100%;
          z-index: 999;
          position: relative;
        .picFilter{
          width: 100%;
          height: 100%;
          background: #000;
          position: absolute;
          transition:.8s;
          background-color: rgba(43, 61, 93, 0.6);
        }
        &:hover .picFilter{
          top: 0;
        }
        &:hover .picInfo{
            animation: itemopa 2s;
            opacity: 1;
        }
        .picInfo{
            width: 100%;
            height: 100%;
            margin: 0 auto;
            position: relative;
            z-index: 999;
            opacity: 0;
          p{
              @include font(1.5);
              @include positionCenter;
              color: white;
              width: 70%;
              height: 60%;
          }
        }
          @keyframes itemopa {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            transform: translateY(0px);
            opacity: 1;
          }
        }
        }
    }
    .pro1{
        .picBox1{
        clip-path: polygon(0 0%, 100% 0%, 70% 100%, 0 100%);
        background:url('../../img/food.jpeg') center;
        .picFilter{
        top: -100%;
        }
        .picInfo{
         p{
            left: 45%;
         }
        }
        }
        h4{
            transform: translateY(50px)
        }
.scrollDown{
    position: absolute;
    bottom: -10%;
    left: 40%;
    transform: translate(-50%, -50%);
    z-index: 99999;
    .scrollPoint{
      display: block;
      width: 2px;
      height: 60px;
      background-color: lightgray;
      margin-top: 100px;
      position: relative;
      transform:rotate(180deg);
      &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 15px;
          height: 15px;
          background-color: lightgray;
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
    .pro2{
        margin-top: 100px;
        .picBox2{
        clip-path: polygon(30% 0, 100% 0%, 100% 100%, 0 100%);
        background:url('../../img/drink.jpeg');
        background-position: center;
        .picFilter{
            top: -100%;
        }
        .picInfo{
         p{
            left: 60%;
         }
        }
        }
        h4{
        align-self:flex-end;
        transform: translateY(-50px)
        }
.scrollDown{
    position: absolute;
    top: 0;
    right: 40%;
    transform: translate(-50%, -50%);
    z-index: 99999;
    .scrollPoint{
      display: block;
      width: 2px;
      height: 60px;
      background-color: lightgray;
      margin-top: 100px;
      position: relative;
      &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 15px;
          height: 15px;
          background-color: lightgray;
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
  }
}
</style>
