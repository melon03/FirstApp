<template>
  <div class="container mt-4">
      <input type="text" placeholder="Search" v-model="searchtext">
      <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

    <table class="table table-bordered mt-4">
      <thead class="thead-light">
        <tr>
          <th>#</th>
          <th>Code</th>
          <th>Name</th>
          <th>Description</th>
          <th>Qty</th>
          <th>Unit</th>
          <th>Price</th>
          <th>Discount</th>
          <th>Total</th>
          <th width="500%">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <span v-if="editIndex !== index">{{ item.code }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" v-model="item.code">
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.name }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" v-model="item.name">
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.description }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" v-model="item.description">
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.qty }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" type="number" v-model.number="item.qty">
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.unit }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" v-model="item.unit">
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.price }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" type="number" v-model.number="item.price">
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.discount }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" type="number" v-model.number="item.discount">
            </span>
          </td>
          <td><div class="text-right">{{ subtotal(item) | money }}</div></td>
          <td>
            <span v-if="editIndex !== index">
              <button @click="edit(item, index)" class="btn btn-sm btn-outline-secondary mr-2">Edit</button>
              <button @click="remove(item, index)" class="btn btn-sm btn-outline-secondary mr-2">Remove</button>
            </span>
            <span v-else>
              <button class="btn btn-sm btn-outline-secondary mr-2" @click="cancel(item)">Cancel</button>
              <button class="btn btn-sm btn-outline-secondary mr-2" @click="save(item)">Save</button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="col-3 offset-9 text-right my-3">
      <button v-show="!editIndex" @click="add()" class="btn btn-sm btn-secondary">Add item</button>
    </div>

    

  </div>
</template>

<script>
export default {
  name: 'Uhuy',
  filters: {
    money: (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
  },
  data() {
    return {
      searchtext: '',
      editIndex: null,
      originalData: null,
      items: [
        { code: '111', name: 'Cuka', description: 'Cuka mahal', qty: 1, unit: null, price: 3500, discount: 10, },
        { code: '222', name: 'Kubis', description: 'Kubis enak', qty: 2, unit: null, price: 5000, discount: 2, },
      ],
      tax: 10,
    }
    
  },
  methods: {
    add() {
      this.originalData = null
      this.items.push({ code: '', name: '', description: '', qty: 1, unit: 1, price: 0, discount: 0 })
      this.editIndex = this.items.length - 1
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
      
    },
    save(item) {
      this.originalData = null
      this.editIndex = null
    },
    subtotal(item) {
      return (item.qty * item.price) - (item.qty * item.price * item.discount / 100)
    }
  },
  computed: {
    allSubTotal() {
      return this.items
        .map(item => this.subtotal(item))
        .reduce((a, b) => a + b, 0)
    },
    total() {
      return this.tax
        ? this.allSubTotal + (this.allSubTotal * (this.tax / 100))
        : this.allSubTotal
    }
  },
}
</script>

<style>
  input[type="number"] {
    text-align: right;
  }
</style>