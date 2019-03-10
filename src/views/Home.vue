<template>
  <div class="home">
    <h1 class="mt-4">HelpDesk</h1>
    <p>Welcome to HelpDesk! Here you can submit your questions and recieve answers.</p>
    <form class="centerthing" @submit.prevent="createBug">
      <div class="form-group form-inline">
        <input class="form-control w-50" type="text" v-model="data.creator" placeholder="username" required>
        <input class="form-control w-50" type="text" v-model="data.title" placeholder="ticket title" required>
      </div>
      <textarea class="form-control w-50 mb-2" v-model="data.description" cols="80" rows="2"
        placeholder="describe the issue" required></textarea>
      <button class="btn btn-success mb-3" type="submit">Submit Ticket</button>
    </form>
    <div>
      <hr>
    </div>
    <div class="centerthing">
      <button v-if="!showform" class="btn btn-secondary mt-3" @click="filter(), showform = !showform">View Active
        Tickets</button>
      <button v-if="showform" class="btn btn-secondary mt-3" @click="getBugs(), showform = !showform">View All
        Tickets</button>
      <table class="table mt-1">
        <thead class="thead-dark">
          <tr class="table-active">
            <th scope="col">Created</th>
            <th scope="col">Title</th>
            <th scope="col">Posted By</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr @click="setActiveBug(bug)" v-for="bug in bugs" class=" pointer"
            v-bind:class="{'table-success': bug.closed,  'table-danger': !bug.closed}">
            <td scope="row">{{bug.createdAt | createdAtTransform}}</td>
            <th>{{bug.title}}</th>
            <td><i class="fas fa-user"></i> {{bug.creator}}</td>
            <td>{{bug.closed ? 'Closed' : 'Active'}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    mounted() {
      this.$store.dispatch('getBugs')
    },
    data() {
      return {
        data: {
          description: '',
          title: '',
          creator: '',
          user: 'Clair'
        },
        showform: false
      }
    },
    components: {
    },
    filters: {
      createdAtTransform: function (date) {
        let final = ''
        let newArr = date.split('')
        for (let i = 0; i < 8; i++) {
          newArr.pop()
        }
        newArr[10] = " "
        let output = newArr.join('').split(' ')
        final += output[0]
        for (let i = 0; i < 8; i++) {
          newArr.pop()
        }
        newArr[10] = " "
        let time = output[1].split(':')
        let hours = Number(time[0])
        let minutes = time[1]
        if (hours <= 12) {
          final += (' ' + hours.toString() + ':' + minutes + 'am')
        }
        else if (hours > 12) {
          final += (' at ' + (hours - 12).toString() + ':' + minutes + 'pm')
        }
        return final
      }
    },
    computed: {
      bugs() {
        return this.$store.state.bugs
      },
      // filter() {
      //   return this.$store.state.bugs.filter(bug => bug.closed == false)
      // }
    },
    methods: {
      createBug() {
        this.$store.dispatch('newBug', this.data)
      },
      setActiveBug(bug) {
        this.$store.dispatch('setActiveBug', bug)
      },
      filter() {
        this.$store.dispatch('filterBugs')
      },
      getBugs() {
        this.$store.dispatch('getBugs')
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

  h1 {
    font-family: 'Leckerli One', cursive;
  }

  .table {
    width: 80%;
  }

  .pointer {
    cursor: pointer;
  }
</style>