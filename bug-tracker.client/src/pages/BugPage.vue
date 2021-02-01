<template>
  <div class="bug-page row">
    <div class="col-12" v-if="state.loaded">
      <div class="row mt-3">
        <div class="col-4 offset-2">
          <h1>{{ state.bug.title }}</h1>
        </div>
        <div class="col-2 offset-2">
          <h5>{{ name }}</h5>
          <button class="btn btn-outline-warning" v-if="allowManage" @click="closeBug">
            Mark as resolved
          </button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-8 offset-2 py-1 px-4 body">
          <div class="indent"></div>
          <p v-if="!allowManage">
            {{ state.bug.description }}
          </p>
          <textarea class="bug-edit-text" v-model="state.bodyContent.description" v-else></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-2 offset-2">
          <button @click="editBug" v-if="state.bodyContent.description !== state.bug.description">
            Submit Edit
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-8 offset-2">
          <textarea v-model="state.noteEntry"></textarea>
          <button @click="leaveNote">
            Leave note
          </button>
          <Note v-for="n in notes" :key="n.id" :n="n" :allow-manage="allowManage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { onMounted, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import Note from '../components/Note'
export default {
  name: 'BugPage',

  setup(props) {
    const state = reactive({
      loaded: false,
      bug: computed(() => AppState.bugs.length === 1 ? AppState.bugs[0] : ''),
      account: computed(() => AppState.account),
      bodyContent: {},
      noteEntry: ''

    })
    const route = useRoute()
    onMounted(async() => {
      await bugsService.getById(route.params.id)
      await notesService.getByBug(route.params.id)
      state.bodyContent.description = state.bug.description
      state.loaded = true
    })
    return {
      state,
      name: computed(() => state.bug.creator ? state.bug.creator.name : ''),
      allowManage: computed(() => state.account ? state.account.name === state.bug.creator.name && state.bug.closed === false : ''),
      notes: computed(() => AppState.notes),

      async closeBug() {
        if (window.confirm('Marking a bug as resolved cannot be undone! Are you sure you want to continue?')) {
          await bugsService.remove(route.params.id)
        }
      },
      async editBug() {
        try {
          await bugsService.update(state.bug.id, state.bodyContent)
        } catch (error) {
          console.error(error)
        }
      },
      async leaveNote() {
        try {
          await notesService.post(state.noteEntry)
          state.noteEntry = ''
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: { Note }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
.bug-page{
  width: 100%;
}
.body {
  border: solid 2px $primary;
  font-size: 1.1rem;
  font-weight: 400;
}
.indent {
  float: left;
  width: 80px;
  height: 10px;
}

.bug-edit-text{
 width: 100%;
  min-height: 400px;
  height: fit-content;
}
</style>
