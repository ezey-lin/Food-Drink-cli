<template>
    <div class="detail" :id="singleData.id">
        <div class="prodImg" :style="{backgroundImage:`url(${singleData.imageUrl}) `}"></div>
        <div class="prodCheck">
            <h4> {{singleData.title}}</h4>
            <div class="close" @click="closeBox"><i class="fas fa-times"></i></div>
            <hr>
            <div class="numberCheck">
                <div class="inputs">
                    <div class="price">
                        <span>PRICE : {{singleData.price | currency}} </span>
                    </div>
                    <div class="chooseNum">
                        <select name="number" id="" class="number" v-model="singleData.num">
                            <option :value="num" v-for="num in 10" :key="num"> {{num}} </option>
                        </select>
                            <button class="addCart" @click="addToCart">Add Cart</button>
                    </div>
                </div>
                <hr>
                <div class="total">
                    <span>TOTAL : {{totalPrice | currency}}</span>
                </div>
            </div>
            <hr>
            <p class="description"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis maxime doloremque aliquid reprehenderit tenetur sit pariatur </p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            popup:false,
            number:1,
        }
    },
    props:['singleData'],
    computed:{
        totalPrice(){
            return this.singleData.price * this.singleData.num;
        }
    },
    methods:{
        closeBox(){
            this.$emit('closebox')
        },
        addToCart(){
            // console.log()
            this.$emit('add',this.singleData)
        }
    },
    created() {
        this.singleData.num = 1;
    },
}
</script>
<style lang="scss">
@import '../.././assets/helpers/var';
.detail{
    z-index: 9999;
    width: 65vw;
    height: 70vh;
    @include fixed;
    display: flex;
    background: white;
    border-radius: 10px;
    box-shadow: 1px 1px 3px rgba(85,85,85,.5);
    @include media(768px){
        flex-direction: column;
        width: 90%;
        height: 80%;
    }
    .prodImg{
        width: 100%;
        // height: 40%;
        min-height: 40%;
        background-size: cover;
        background-position: center;
    }
    .prodCheck{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        .close{
            position: absolute;
            top: 15px;
            right: 15px;
            cursor: pointer;
        }
        h4{
            @include font(1.5);
            margin: 5px auto;
            padding-top: 15px;
        }
        .numberCheck{
            height: 40%;
            .inputs{
                max-height: 70%;
                min-height: 80px;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                .price{
                    @include font(1.5);
                    margin-bottom: 10px;
                    margin-right: 30px;
                }
                .chooseNum{
                    width: 100%;
                    height: 50%;
                    // padding-top: 15px;
                    .number{
                        width: 50%;
                        height: 40px;
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                        outline: none;
                        border-radius: 10px 0 0 10px;
                    }
                    .addCart{
                        width: 40%;
                        height: 40px;
                        @include btnReset;
                        background: #666;
                        color: white;
                        border-radius: 0 10px 10px 0;
                        transition: .3s;
                        &:hover{
                            background: lightblue;
                            color: white;
                        }
                    }
                }
            }
            .total{
                width: 100%;
                margin-top: 30px;
                @include font(1.7);
                @include media(768px){
                    margin: 0;
                }
                // min-height:80px;
                color: red;
            }
        }
        .description{
            // width: ;
            margin: 0;
            min-height: 50%;
            max-height: 100%;
            // position: absolute;
            // bottom: 0;
        }
    }
}   
</style>