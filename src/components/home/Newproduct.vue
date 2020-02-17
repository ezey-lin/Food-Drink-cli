<template>
    <div class="newPro">
        <h3>NEW PRODUCT</h3>
        <ul class="prodList">
            <li>
                <div class="prod prod1"></div>
                <span class="proName">cake</span>
                <span class="seeMore">See More</span>
            </li>
            <li>
                <div class="prod prod2"></div>
                <span class="proName">cookie</span>
                <span class="seeMore">See More</span>
            </li>
            <li>
                <div class="prod prod3"></div>
                <span class="proName">pancake</span>
                <span class="seeMore">See More</span>
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
.newPro{
    height: auto;
    padding-bottom: 50px;
}
h3{
    @include font(2);
    margin: 30px auto;
}
.prodList{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 90%;
    margin: 0 auto;
    @include media(415px){
        flex-direction: column;
    }
    li{
      margin: 10px auto;
      width: 33%;
      height: 500px;
      border-radius: 20px;
      overflow: hidden;
      position: relative;
    @include media(415px){
      width: 100%;
    }
      span{
          color: white;
      }
       &:hover .prod{
              transform: translateY(-80px) scale(1.2)rotate(4deg);
          }
       &:hover .proName{
           display: none;
       }
       &:hover span{
        transform:scale(1.2);
        opacity: 1;
        color: rgb(255, 255, 255);
        transform: rotate(4deg)translateX(-50%)translateY(-50%)scale(1.2);
       }
       &:hover::before{
        width: 140%;
        height: 140%;
        border-radius: 200px;
       }
      .prod{
          position: absolute;
          left: 0;
          top: 0;
          width: 110%;
          height: 110%;
          transition: all 1s;
      }
      .prod1{
          background:url('../../img/newpro1.jpeg') center;
      }
      .prod2{
          background:url('../../img/newpro2.jpeg') center;
      }
      .prod3{
          background:url('../../img/newpro3.jpeg') center;
      }
      .proName{
          font-size:2.5vmax;
          transition: all 0.5s;
          z-index: 1;
          @include positionCenter;
      }
      .seeMore{
          cursor: pointer;
          opacity: 0;
          font-size:2.5vmax;
          transition: all 0.5s;
          color: black;
          text-decoration:underline;
          z-index: 1;
          @include positionCenter;
        }
    &::before{
        content: '';
        position: absolute;
        width: 0%;
        height: 0%;
        background-color: rgb(240, 150, 150);
        transition: all 0.8s;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.2;
        z-index: 1;
    }
    }
}
</style>