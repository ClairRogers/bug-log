<template>
  <div class="specs container-fluid">
    <div class="row">
      <div class="col-8 offset-2 text-left">
        <button @click="goBack" class="btn btn-info my-3"><i class="far fa-arrow-alt-circle-left"></i> Back</button>
        <div class="card text-center ">
          <div class="card-header">
            <h2>{{activeBug.title}}</h2>
          </div>
          <div class="card-body text-left">
            <h5 class="card-title"><i class="fas fa-user"></i> {{activeBug.creator}}</h5>
            <p class="card-text">{{activeBug.description}}</p>
          </div>
          <div class="card-footer text-muted">
            <h5>Submit a comment:</h5>
            <form class="form-inline centerthing" @submit.prevent="createComment()">
              <input v-model="data.creator" class="form-control" type="text" placeholder="name" required>
              <textarea v-model="data.content" class="form-control" cols="30" rows="1" placeholder="description"
                required></textarea>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-8 offset-2">
        <div v-for="comment in comments" class="row my-2">
          <div class="col-10 offset-1">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{comment.creator}}</h5>
                <p class="card-text">{{comment.content}}
                  <hr>
                  {{comment.flagged}}
                </p>
                <button @click="deleteComment(comment._id)" class="btn btn-outline-danger mx-2">Delete
                  Comment</button>
                <div class="btn-group" role="group">
                  <button id="btnGroupDrop1" type="button" class="btn btn-outline-info dropdown-toggle mx-2"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Change Status
                  </button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" @click="changeStats(comment._id, 'pending')">Pending</a>
                    <a class="dropdown-item" @click="changeStats(comment._id)">Completed</a>
                    <a class="dropdown-item" @click="changeStats(comment._id)">Rejected</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "specs",
    mounted() {
      if (!this.$store.state.activeBug._id) {
        this.$store.dispatch('getBug', this.id)
      }
      this.$store.dispatch('getComments', this.id)
    },
    props: ['id'],
    data() {
      return {
        data: {
          content: '',
          creator: '',
          flagged: 'pending',
          bug: this.id,
          user: 'Clair'
        },
      }
    },
    computed: {
      activeBug() {
        return this.$store.state.activeBug
      },
      comments() {
        return this.$store.state.comments
      }
    },
    methods: {
      goBack() {
        this.$store.dispatch('goBack')
      },
      createComment() {
        this.$store.dispatch('createComment', this.data)
      },
      deleteComment(data) {
        this.$store.dispatch('deleteComment', { bugId: this.id, commentId: data })
      },
      changeStats(data) {
        this.$store.dispatch('changeStats', { bugId: this.id, commentId: data })
      }
    },
    components: {}
  }
</script>

<style>
  .centerthing {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>