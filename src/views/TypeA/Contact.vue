<template>
  <div class="sub-wrap">
    <div class="sub-visual-wrap">
      <SubVisual/>
      <div class="sub-info-txt">
        <div class="inner">
          <strong class="sub-title">IR Contact</strong>
          <div class="history">
            <span class="icon-home" v-on:click="goHome">
              <img src="@/assets/images/icon/icon_home.png" alt="">
            </span>
            <span>IR Contact</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content-bottom gray-bg">
      <IrContact/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import SubVisual from '@/components/TypeA/SubVisual.vue'
import IrContact from '@/components/TypeA/IrContact.vue'
import Footer from '@/components/TypeA/Footer.vue'

export default {
  name: 'Contact',
  components: {
    SubVisual,
    IrContact,
    Footer
  },
  methods: {
    goHome () {
      this.$router.push('/')
    }
  }
}

</script>
