<template>
    <div class="datatable">
        <div class="form-group">
            <button v-show="!editIndex" @click="add()" class="btn btn-sm btn-secondary">Add item</button>
            <input type="text" class="form-control" placeholder="Search" v-model="searchtext" id="myInput">
        </div>
        <table id="myTable" class="table table-bordered table-light">
            <caption>Sample table</caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col" v-on:click="sort('name')">Name</th>
                    <th scope="col" v-on:click="sort('Role')">Role</th>
                    <th scope="col" v-on:click="sort('code')">Number</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in (sortedActivity, filteredList)" :key="index">
                    <td>{{index}}</td>
                    <td>
                        <span v-if="editIndex !== index">{{ item.name }}</span>
                        <span v-if="editIndex === index">
                        <input class="form-control form-control-sm" v-model="item.name">
                        </span>
                    </td>
                    <td>
                        <span v-if="editIndex !== index">{{ item.Role }}</span>
                        <span v-if="editIndex === index">
                        <input class="form-control form-control-sm" v-model="item.Role">
                    
                        </span>
                    </td>
                    <td>
                        <span v-if="editIndex !== index">{{ item.code}}</span>
                        <span v-if="editIndex === index">
                        <input class="form-control form-control-sm" v-model="item.code">
                        </span>
                    </td>
                    <td>
                        <span v-if="editIndex !== index">
                            <button @click="edit(item, index)" class="btn btn-sm btn-outline-secondary mr-2">Edit</button>
                            <button @click="remove(item, index)" class="btn btn-sm btn-outline-secondary mr-2">Remove</button>
                            <button class="btn btn-sm btn-outline-secondary mr-2 " v-on:click="view(item)">View</button>
                        </span>
                        <span v-else>
                            <button class="btn btn-sm btn-outline-secondary mr-2" @click="cancel(item)">Cancel</button>
                            <button class="btn btn-sm btn-outline-secondary mr-2" @click="save(item)">Save</button>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            modalVisible: false,
            modalShow: false,
            searchtext: '',
            currentSort:'name',
            currentSortDir:'asc',
            editIndex: null,
            originalData: null,
            searchSelection: '',
            users: [],
            items: [],
            num: '',
        }
    },
    created () {
        axios.get('http://localhost:3000/posts').then(response => {
            this.items = response.data
      })
    },
    methods: {

        view(item){
            alert(item.name + ' ' + item.Role + ' ' + item.code)
        },

        add() {
            this.originalData = null
            this.filteredList.push({})
            this.editIndex = this.filteredList.length - 1
      
        },
        
        
        sort:function(s) {
            if(s === this.currentSort) {
                this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
            }
            this.currentSort = s;
        },
        

        edit(item, index) {
            this.originalData = Object.assign({}, item)
            this.editIndex = index

            

        },
        cancel(item) {
            this.editIndex = null
                if (!this.originalData) {
                    this.items.splice(this.items.indexOf(item), 1)
                    return
                }
            Object.assign(item, this.originalData)
            this.originalData = null
        },
        remove(item, index) {
            this.items.splice(index, 1)
            var link = 'http://localhost:3000/posts/' + item.id;
            axios.delete(link);
      
        },
        save(item) {
            this.originalData = null
            this.editIndex = null
            if(item.id == undefined){
                axios({method: "POST", "url":"http://localhost:3000/posts/", "data":{"name": item.name, "Role": item.Role, "code": item.code}, "headers": { "content-type": "application/json" } })
            }else{
                axios({method: "PUT", "url":"http://localhost:3000/posts/"+item.id, "data":{"name": item.name, "Role": item.Role, "code": item.code}, "headers": { "content-type": "application/json" } })
            }    
        },

        
    },
    computed: {
        sortedActivity:function() {
            return this.items.sort((a,b) => {
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
      return this.items.filter((data) => {
        let name = data.name.toLowerCase().match(this.searchtext.toLowerCase());
        let Role = data.Role.toLowerCase().match(this.searchtext.toLowerCase());
        let code = data.code.toLowerCase().match(this.searchtext.toLowerCase());
        return name || Role || code;
      }).filter((row, index) => {
         return true;
      });
    },
    

    
    }
}

</script>