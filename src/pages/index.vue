<template>
  <div class="main">

    <div class="game-section__check-type">
      <div class="check-type__x-btn">
        <button class="x-btn__btn" :class="{'bg-red': xBtnSelected}" @click="onChangeTypeFunc('x')">X</button>
      </div>
      <div class="check-type__o-btn">
        <button class="o-btn__btn" :class="{'bg-red': oBtnSelected}" @click="onChangeTypeFunc('o')">O</button>
      </div>
    </div>

    <div class="game-section">
      <div v-for="btn in 9" class="game-section__button-block">
        <button class="button-block__btn" :data-id="btn-1" @click="onClickBtnFunc(btn-1)">
        </button>
      </div>
    </div>
  </div>

  <audio id="clickSound">
    <source src="../assets/sounds/click-button-app.mp3">
  </audio>
</template>

<script setup>
import {ref} from "vue";

let xBtnSelected = ref(true);
let oBtnSelected = ref(false);
let dataId = ref(Array(9).fill(null))

function onChangeTypeFunc(type) {
  xBtnSelected.value = type === 'x'
  oBtnSelected.value = type === 'o'
}
function btnStylesFunc(btn, text) {
  btn.innerHTML = text;
  btn.setAttribute('value', text)
  btn.style.cssText = 'background: lightgray; font-size: 28px; font-family: san-serif; pointer-events: none;'
}

function onClickBtnFunc(e) {
  let btn = document.querySelector(`button[data-id="${e}"]`)
  let sound = document.getElementById('clickSound')
  sound.play()
  if(xBtnSelected.value) {
    btnStylesFunc(btn, 'x')
    dataId.value[e] = 1
    xBtnSelected.value = false;
    oBtnSelected.value = true;
    checkWinnerFunc()
    return;
  }
  if(oBtnSelected.value) {
    btnStylesFunc(btn, 'o')
    dataId.value[e] = 0
    oBtnSelected.value = false;
    xBtnSelected.value = true;
    checkWinnerFunc()
  }
}

const checkWinnerFunc = () => {
  if(winComplectation(dataId.value, 1)) {
    alert('X Winn')
    resetValuesFunc()
    return;
  }
  if(winComplectation(dataId.value, 0)) {
    alert('O WInn')
    resetValuesFunc()
    return;
  }
  if(dataId.value.filter(item => item != null).length === 9) {
    alert('over')
    resetValuesFunc()
  }
}
function winComplectation(arr, type) {
  arr = arr.map((item,index) => item === type ? index : null)
  console.log(arr)
  let types = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
  let win = false;
  for(let i = 0; i < types.length; i++) {
      if(arr.includes(types[i][0]) && arr.includes(types[i][1]) && arr.includes(types[i][2])) {
        win = true;
        break;
      }
  }
  return win
}
function resetValuesFunc() {
  xBtnSelected.value = true;
  oBtnSelected.value = false;
  dataId.value = []
  let buttons = Array.from(document.querySelectorAll('button[data-id]'))
  for(let i = 0; i < buttons.length; i++) {
    buttons[i].style.cssText = 'Background: transparent;'
    buttons[i].innerHTML = ''
  }
}

</script>

<style scoped>
.bg-red {
  background-color: red !important;
}
.main {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;
}
.game-section {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 5px;
}
.game-section__check-type {
  border: 1px solid gray;
  display: flex;
  justify-content: space-between;
  width: 290px;
  border-radius: 8px;
  padding: 8px;
}

.x-btn__btn, .o-btn__btn {
  padding: 10px;
  width: 100px;
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 8px;
  cursor: pointer;
}
.game-section__button-block {
  width: 100%;
  height: 80px;
}
.button-block__btn {
  cursor: pointer;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  height: 100%;
  background-color: transparent;
}
</style>