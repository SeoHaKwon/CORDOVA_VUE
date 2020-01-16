<template>
  <div class="main">
    <div class="subMain">
      404
    </div>
    <div class="subContents">
      찾을 수 없는 페이지 입니다.<br>
      요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요 :)
    </div>
    <div class="subBottom">
      <button class="btn" v-on:click="Back">돌아가기</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    Back () {
      window.history.go(-1)
    }
  },
  mounted () {
    let title = document.getElementsByTagName('title')[0]
    title.innerHTML = '404'
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & .subMain {
    font-size: 4rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    margin-top:20vh;
  }

  & .subContents {
    font-size: 1rem;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 300;
    margin-top:20px;
    text-align: center;
  }

  & .subBottom {
    margin-top: 10vh;

    & .btn {
      background-color: white;
      width: 30vw;
      height: 10vh;
    }
  }
}
</style>
