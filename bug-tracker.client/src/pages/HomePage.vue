<template>
  <div class="home container-fluid">
    <report-form />
    <div v-if="bugs.length > 0" class="row mt-5 justify-content-center">
      <div class="col-8 h-100">
        <div class="row mb-3 align-items-center justify-content-end">
          <input type="checkbox" @click="state.displayClosed = !state.displayClosed" class="mr-3">
          <p class="mb-0">
            Hide Squashed Bugs
          </p>
        </div>
      </div>
    </div>
    <div class="row mb-5 justify-content-center">
      <div class="col-8">
        <div class="row bug mt-2">
          <div class="col-3">
            <h5>
              Bug Name
            </h5>
          </div>
          <div class="col-3">
            <h5>
              Reporter
            </h5>
          </div>
          <div class="col-3">
            <h5>
              Status
            </h5>
          </div>
          <div class="col-3">
            <h5>
              Last Update
            </h5>
          </div>
        </div>
        <div v-if="bugs.length > 0">
          <Bug v-for="(b, index) in bugs" :key="b.id" :b="b" :index="index" :display-closed="state.displayClosed" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import { onMounted, computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { ReportForm } from '../components/ReportForm'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      displayClosed: true
    })
    onMounted(async() => {
      try {
        await bugsService.getAll('api/bugs')
      } catch (error) {

      }
    })
    return {
      bugs: computed(() => AppState.bugs), state
    }
  },
  components: { ReportForm }

}

</script>

<style scoped lang="scss">
@import '../assets/scss/_variables.scss';
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
  .bug{
  border-bottom: 3px solid $secondary;
}
}
</style>
