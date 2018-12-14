<template>
  <div>
  <b-button @click="showModal()" ref="btnShow">
    Open Modal
  </b-button>
  <b-modal @hidden="onHidden()">
    <div class="d-block">Hello From My Modal!</div>
    <b-btn @click="hideModal()">Close Me</b-btn>
  </b-modal>
</div>
</template>

<script>
export default {
  methods: {
     showModal () {
    this.$root.$emit('bv::show::modal','modal1')
  },
  hideModal () {
    this.$root.$emit('bv::hide::modal','modal1')
  },
  onHidden (evt) {
    // Return focus to our Open Modal button
    // See accessibility below for additional return-focus methods
    this.$refs.btnShow.$el.focus()
  }
  }
}
</script>

<!-- modal-methods-1.vue -->