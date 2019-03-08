<template>
  <div class="home">
    <h1>Helpdesk</h1>
    <p>Welcome to Helpdesk! Here you can submit your questions and recieve answers.</p>
    <form class="centerthing" @submit.prevent="">
      <div class="form-group form-inline">
        <input class="form-control w-50" type="text" v-model="data.creator" placeholder="username">
        <input class="form-control w-50" type="text" v-model="data.title" placeholder="title"><br>
      </div>
      <textarea class="form-control w-50" v-model="data.description" cols="80" rows="2"
        placeholder="describe the issue"></textarea><br>
      <button class="btn btn-info mb-5" type="submit">SUBMIT</button>
    </form>
    <div class="centerthing">
      <table class="table">
        <thead>
          <tr class="table-active">
            <th scope="col">Created</th>
            <th scope="col">Title</th>
            <th scope="col">Posted By</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bug in bugs" class="table-danger">
            <th scope="row">{{bug.timestamp}}</th>
            <td>{{bug.title}}</td>
            <td>{{bug.creator}}</td>
            <td>{{bug.open}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src


  export default {
    name: 'home',
    mounted() {
      this.$store.dispatch('getBugs')
    },
    data() {
      return {
        data: {
          open: true,
          description: '',
          title: '',
          creator: '',
          user: 'Clair'
        }
      }
    },
    components: {
    },
    computed: {
      bugs() {
        return this.$store.state.bugs
      }
    }
  }
</script>

<style scoped>
  .centerthing {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .table {
    width: 80%;
  }
</style>