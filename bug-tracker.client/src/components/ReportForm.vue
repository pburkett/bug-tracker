<template>
  <div class="modal fade"
       id="exampleModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            New Bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createBug" id="bug-form">
            <div class="row mb-5">
              <div class="col-8 offset-1">
                <input v-model="state.newBug.title" class="bl" type="text" placeholder="title . . .">
              </div>
            </div>
            <div class="row">
              <div class="col-10 offset-1">
                <textarea v-model="state.newBug.description" class="bl" placeholder="description . . ."></textarea>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" ref="close">
            Close
          </button>
          <button type="submit" form="bug-form" class="btn btn-primary">
            Submit Report
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { bugsService } from '../services/BugsService'
import $ from 'jquery'
export default {
  name: 'ReportForm',
  setup() {
    const state = reactive({
      newBug: { description: '', title: '' }
    })
    const router = useRouter()
    return {
      state,
      async createBug() {
        try {
          $('exampleModal').modal('hide')
          $('.modal-backdrop').remove()
          $('body').removeClass('modal-open')
          const id = await bugsService.create(this.state.newBug)
          router.push({ name: 'Bug', params: { id } })
        } catch (error) {
          console.error(error)
        }
      },
      closeModal() {
        console.log('button')
        const elem = this.$refs.close
        elem.click()
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
textarea {
  width:100%;
  resize: none;
  height: 100px;
}
.bl {
  border: none !important;
  border-left: 3px solid $secondary !important;
 box-shadow:  -1px -2px 5px $dark-transparent;
  transition: all 200ms ease;
}
textarea:focus {
  outline: none;
  box-shadow:  -8px -15px 20px $dark-transparent;
  transform: scale(1.02);
}
input {
  width: 100%;
}
input:focus {
  transform: scale(1.02);

  outline: none;
  box-shadow:  0 -6px 15px $dark-transparent;

}
.modal-dialog {
  margin-top: 180px;
}

</style>
