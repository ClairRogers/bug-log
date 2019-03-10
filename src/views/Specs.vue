<template>
  <div class="specs container-fluid">
    <div class="row">
      <div class="col-8 offset-2 text-left">
        <button @click="goBack" class="btn btn-info my-3"><i class="far fa-arrow-alt-circle-left"></i> Back</button>
        <div class="card text-center ">
          <div class="card-header d-flex justify-content-between">
            <h2>{{activeBug.title}}</h2> <span><button @click="deleteBug()" class="btn btn-danger"
                v-bind:class="{'disabled': activeBug.closed}"><i class="fas fa-trash-alt"></i></button>
              <button @click="showform = !showform" class="btn btn-info ml-1"
                v-bind:class="{'disabled': activeBug.closed}"><i class="far fa-edit"></i></button></span>
          </div>
          <div class="card-body text-left">
            <h5 class="card-title"><i class="fas fa-user"></i> {{activeBug.creator}}</h5>
            <p v-if="!showform" class="card-text">{{activeBug.description}}
            </p>
            <form v-if="showform" class="form-inline centerthing" @submit.prevent="editBug()">
              <textarea v-model="data2.description" class="form-control" cols="60" rows="2"
                placeholder="description"></textarea>
              <button class="btn btn-success" type="submit">Submit</button>
            </form>
          </div>
          <div class="card-footer text-muted" v-if="activeBug.closed == false">
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
            <div class="card" v-if="comment.flagged == 'rejected'" style="background-color: rgb(255, 221, 221)">
              <div class="card-body">
                <h5 class="card-title"><i class="fas fa-user"></i> {{comment.creator}}</h5>
                <p class="card-text">{{comment.content}}
                  <hr>
                  Status: {{comment.flagged}}
                </p>
                <button @click="deleteComment(comment._id)" class="btn btn-outline-danger mx-2">Delete
                  Comment</button>
                <div class="btn-group" role="group">
                  <button id="btnGroupDrop1" type="button" class="btn btn-outline-info dropdown-toggle mx-2"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Change Status
                  </button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" @click="changePending(comment._id)">Pending</a>
                    <a class="dropdown-item" @click="changeCompleted(comment._id)">Completed</a>
                    <a class="dropdown-item" @click="changeRejected(comment._id)">Rejected</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="card" v-else-if="comment.flagged == 'completed'" style="background-color: rgb(214, 255, 221)">
              <div class="card-body">
                <h5 class="card-title"><i class="fas fa-user"></i> {{comment.creator}}</h5>
                <p class="card-text">{{comment.content}}
                  <hr>
                  Status: {{comment.flagged}}
                </p>
                <button @click="deleteComment(comment._id)" class="btn btn-outline-danger mx-2">Delete
                  Comment</button>
                <div class="btn-group" role="group">
                  <button id="btnGroupDrop1" type="button" class="btn btn-outline-info dropdown-toggle mx-2"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Change Status
                  </button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" @click="changePending(comment._id)">Pending</a>
                    <a class="dropdown-item" @click="changeCompleted(comment._id)">Completed</a>
                    <a class="dropdown-item" @click="changeRejected(comment._id)">Rejected</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="card" v-else="comment.flagged == 'pending'" style="background-color: rgb(253, 245, 218)">
              <div class="card-body">
                <h5 class="card-title"><i class="fas fa-user"></i> {{comment.creator}}</h5>
                <p class="card-text">{{comment.content}}
                  <hr>
                  Status: {{comment.flagged}}
                </p>
                <button @click="deleteComment(comment._id)" class="btn btn-outline-danger mx-2">Delete
                  Comment</button>
                <div class="btn-group" role="group">
                  <button id="btnGroupDrop1" type="button" class="btn btn-outline-info dropdown-toggle mx-2"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Change Status
                  </button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" @click="changePending(comment._id)">Pending</a>
                    <a class="dropdown-item" @click="changeCompleted(comment._id)">Completed</a>
                    <a class="dropdown-item" @click="changeRejected(comment._id)">Rejected</a>
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
        showform: false,
        data2: {
          description: ''
        }
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
      changePending(data) {
        this.$store.dispatch('changePending', { bugId: this.id, commentId: data })
      },
      changeCompleted(data) {
        this.$store.dispatch('changeCompleted', { bugId: this.id, commentId: data })
      },
      changeRejected(data) {
        this.$store.dispatch('changeRejected', { bugId: this.id, commentId: data })
      },
      deleteBug() {
        this.$store.dispatch('deleteBug', this.id)
      },
      editBug() {
        this.showform = !this.showform
        this.$store.dispatch('editBug', { description: this.data2, id: this.id })
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