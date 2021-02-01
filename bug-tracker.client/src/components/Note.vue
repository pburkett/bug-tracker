<template>
  <div class="note p-3 row bg-white">
    <div class="col-12">
      <div class="row">
        <div class="col-3">
          <p>by: {{ name }}</p>
        </div>
        <div class="col-8">
          <h5>{{ n.content }}</h5>
        </div>
      </div>
    </div>
    <button v-if="allowManage || state.allowManageLocal" @click="remove">
      Delete
    </button>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { notesService } from '../services/NotesService'
import { AppState } from '../AppState'
export default {
  name: 'Note',
  props: {
    n: {
      type: Object,
      required: true
    },
    allowManage: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      allowManageLocal: props.allowManage
    })
    onMounted(() => {
      if (AppState.account.email === props.n.creator.email) {
        state.allowManageLocal = true
        console.log(props.n.creator.email, AppState.account.email, state.allowManageLocal)
      }
    })
    return {
      state,
      name: computed(() => props.n.creator ? props.n.creator.name : ''),
      remove() {
        try {
          if (window.confirm('Are you sure you want to delete this note?')) { notesService.remove(props.n.id) }
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.row {
  border-radius: 15px;
}
</style>
