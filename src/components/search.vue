<template>
  <div class="col-md-12">
    <div class="form-group">
      <input type="text" class="form-control" v-model="search" placeholder="Search">
    </div>
    <div class="col-3 offset-9 text-right my-3">
      <button v-show="!editIndex" @click="add()" class="btn btn-sm btn-secondary">Add item</button>
    </div>
    <div>
      <table class="table table-striped table-dark table-bordered table-hover" style="width:100%">
          <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col" v-on:click="sort('name')">Name <i class="fas fa-sort-alpha-down float-right"></i></th>
                  <th scope="col" v-on:click="sort('email')">Email<i class="fas fa-sort-alpha-down float-right"></i></th>
                  <th scope="col" v-on:click="sort('city')">City</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Actions</th>

              </tr>
          </thead>
          <tbody>
              <tr v-for="(user, index) in (sortedActivity, filteredList)" :key="index">
                <td>{{index + 1}}</td>
                <td><span v-if="editIndex !== index">{{ user.name }}</span>
                    <span v-if="editIndex === index">
                    <input class="form-control form-control-sm" v-model="user.name">
                    
            </span></td>
                <td>{{user.email}}</td>
                <td>{{user.address.city}}</td>
                <td>{{user.phone}}</td>
                <td>
                <span v-if="editIndex !== index">
              <button @click="edit(user, index)" class="btn btn-sm btn-outline-secondary mr-2">Edit</button>
              <button @click="remove(user, index)" class="btn btn-sm btn-outline-secondary mr-2">Remove</button>
              <button @click="sort('name')" class="btn btn-sm btn-outline-secondary mr-2">Sort</button>
            </span>
            <span v-else>
              <button class="btn btn-sm btn-outline-secondary mr-2" @click="cancel(user)">Cancel</button>
              <button class="btn btn-sm btn-outline-secondary mr-2" @click="save(user)">Save</button>
            </span>
          </td>
              </tr>
          </tbody>
      </table>
    </div>
 
  </div>
</template>

<script>
/*eslint-disable*/
import axios from 'axios';
export default {
  data: () => ({
    users: [],
    currentSort:'name',
    currentSortDir:'asc',
    search: '',
    searchSelection: '',
    pageSize: 5,
    currentPage: 1,
    editIndex: null,
            originalData: null,
  }),
  methods:{
      add() {
      this.originalData = null
      this.users.push({})
      this.editIndex = this.users.length  - 1
    },
      edit(item, index) {
            this.originalData = Object.assign({}, item)
            this.editIndex = index
        },
        cancel(item) {
            this.editIndex = null
                if (!this.originalData) {
                    this.users.splice(this.users.indexOf(item), 1)
                    return
                }
            Object.assign(item, this.originalData)
            this.originalData = null
        },
        remove(item, index) {
            this.users.splice(index, 1)
      
        },
        save(item) {
            this.originalData = null
            this.editIndex = null
        },
    sort:function(s) {
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.users.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    }
  },
  computed: {
    sortedActivity:function() {
      return this.users.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
         return true;
      });
    },
    filteredList () {
      return this.users.filter((data) => {
        let email = data.email.toLowerCase().match(this.search.toLowerCase());
        let name = data.name.toLowerCase().match(this.search.toLowerCase());
        let city = data.address.city.toLowerCase().match(this.search.toLowerCase());
        let phone = data.phone.toLowerCase().match(this.search.toLowerCase());
        return email || name || city || phone;
      }).filter((row, index) => {
         return true;
      });
    }
  },
  created () {
    axios.get('http://localhost:3000/posts')
      .then(response => {
        this.users = response.data
      })
  },
}
</script>

<style>
th {
  cursor:pointer;
  /* width: 500px !important; */
  white-space: nowrap;
}
tr {
  white-space: nowrap;
}
</style>