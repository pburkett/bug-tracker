<template>
  <div v-if="displayClosed || !b.closed" class="row bb bug" :class="{'bg-light': index % 2 == 0, 'bg-white': index % 2 == 1 }">
    <div class="col-3 pt-2 bl br">
      <router-link :to="{name: 'Bug', params: {id:b.id}}">
        <h5>
          {{ b.title }}
        </h5>
      </router-link>
    </div>
    <div class="col-3 br">
      <div class="row justify-content-center align-items-center h-100 text-dark bug-closed-text">
        <p class="mb-0">
          {{ name }}
        </p>
      </div>
    </div>
    <div class="col-3 br">
      <div v-if="b.closed" class="row justify-content-center align-items-center h-100 text-success bug-closed-text">
        <p class="mb-0">
          Squashed
        </p>
      </div>
      <div v-else class="row justify-content-center align-items-center h-100 text-danger bug-open-text">
        <p class="mb-0">
          Open
        </p>
      </div>
    </div>
    <div class="col-3 br">
      <div class="row justify-content-center align-items-center h-100 text-dark">
        <p class="mb-0">
          <!-- eslint-disable-next-line vue/no-parsing-error -->
          {{ date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + '  '+ (date.getHours() > 12 ? date.getHours() - 12 : date.getHours() ) + ':' + (date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes()) + (date.getHours() > 12 ? ' PM' : ' AM') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'Bug',
  props: {
    b: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    displayClosed: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    // REVIEW how should we work with Mongo DB dates? Hopefully we can do better than splitting on the T!!
    return { name: computed(() => props.b.creator ? props.b.creator.name : ''), date: computed(() => new Date(props.b.updatedAt)) }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables';
.bb{
  border-bottom: 3px solid $secondary;
}
.bug-closed-text{
  font-weight: 500;
}
.bug-open-text{
  font-weight: 700;
}
.br {
  border-right: 3px solid $secondary;
}
.bl {
  border-left: 3px solid $secondary;
}
  </style>
