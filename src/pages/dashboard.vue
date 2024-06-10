<template>
  <div class="font-bold text-4xl py-3 "> Nuang Store</div>
  <div class="px-5">
    <div>
      <button class="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-400 " @click="modelAdd = true">Add New Post </button>
    </div>
    <!-- Show Card Data -->
    <div class="w-auto flex flex-wrap pt-5 space-x-4 p-8">
      <div class=" pt-4" v-for="data in  posts" :key="data.id">
        <div class="p-5 border rounded w-[300px] shadow">
          <div class="font-bold text-xl text-left  border-b">{{ data.name }} </div>
          <div class="text-left py-2 ">
            {{ data.description }}
          </div>
          <div class="text-left py-2 ">
            {{ data.price }}
          </div>
          <div class="flex space-x-2 pt-2">
            <button class="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-400" @click="edit(data.id)">Edit </button>
            <button class="px-4 py-2 border rounded bg-red-500 text-white hover:bg-red-400" @click="destory(data.id)">Delete </button>
          </div>
        </div>
      </div>
    </div>
    <!-- table -->

  <div class="container mx-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
    <tr>
      <th class="border border-slate-300 ...">Nama</th>
      <th class="border border-slate-300 ...">Harga</th>
      <th class="border border-slate-300 ...">Deskripsi</th>
      <th class="border border-slate-300 ...">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="data in  posts" :key="data.id">
      <td class="border border-slate-300 ...">{{ data.name }}</td>
      <td class="border border-slate-300 ...">{{ data.price }}</td>
      <td class="border border-slate-300 ...">{{ data.description }}</td>
      <td class="border border-slate-300 ...">
            <button @click="edit(data.id)" class="text-indigo-600 hover:text-indigo-900 mr-2 ">Edit</button>
            <button @click="destro(data.id)" class="text-red-600 hover:text-red-900">Delete</button>
          </td>
    </tr>
  </tbody>
</table>
</div>
    <!-- Pop up modal add new -->
    <div class="flex w-full h-full justify-center item-center" v-show="modelAdd">
      <!-- Background -->
      <div class="w-screen h-full bg-gray-900 bg-opacity-80 top-0 fixed sticky-0 left-0" @click="(modelAdd = false)">
      </div>
      <!-- Form -->
      <div class="   flex justify-center items-center top-[30%] fixed sticky-0 left-[40%]">
        <div class=" md:w-auto  relative flex flex-col justify-center items-center bg-white  p-8">
          <div class="my-5">
            <h1 role="main" class="text-xl font-semibold text-center text-gray-800">Add new post</h1>
          </div>
          <div class="mt-2 flex flex-col space-y-2">
            <input type="text" class="py-2 px-1 border-2 w-full text-gray-800   text-base leading-4 text-left mt-2 focus:outline-2 " placeholder="Title" v-model="data.name">
            <textarea class="border-2 py-2 px-1 w-full text-gray-800   text-base leading-4 text-left mt-2 focus:outline-2 " rows="8" cols="30" placeholder="Description" v-model="data.description" />
            <input type="text" class="py-2 px-1 border-2 w-full text-gray-800   text-base leading-4 text-left mt-2 focus:outline-2 " placeholder="price" v-model="data.price">
            
            
          </div>
          <button class="mt-2 px-4 py-2 border rounded bg-gray-500 text-white hover:bg-gray-400" @click="addnew">Create </button>
        </div>
      </div>
    </div>
    <!-- Pop up modal add new -->

    <!-- Pop up model Update  -->
    <div class="flex w-full h-full justify-center item-center" v-show="modelUpdate">
      <!-- Background -->
      <div class="w-screen h-full bg-gray-900 bg-opacity-80 top-0 fixed sticky-0 left-0" @click="(modelUpdate = false)">
      </div>
      <!-- Form -->
      <div class="   flex justify-center items-center top-[30%] fixed sticky-0 left-[40%]">
        <div class=" md:w-auto  relative flex flex-col justify-center items-center bg-white  p-8">
          <div class="my-5">
            <h1 role="main" class="text-xl font-semibold text-center text-gray-800">Update post</h1>
          </div>
          <div class="mt-3 flex flex-col space-y-3">
            <input type="text" class="py-2 px-1 border-2 w-full text-gray-800   text-base leading-4 text-left mt-2 focus:outline-2 " placeholder="Title" v-model="data.name">
            <input type="text" class="py-2 px-1 border-2 w-full text-gray-800   text-base leading-4 text-left mt-2 focus:outline-2 " placeholder="Price" v-model="data.price">
            <textarea class="border-2 py-2 px-1 w-full text-gray-800   text-base leading-4 text-left mt-2 focus:outline-2 " rows="8" cols="30" placeholder="Description" v-model="data.description" />

          </div>
          <button class="mt-2 px-4 py-2 border rounded bg-gray-500 text-white hover:bg-gray-400" @click="updatePost">Update </button>
        </div>
      </div>
    </div>
    <!-- Pop up model Update  -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      modelAdd: false,
      modelUpdate: false,
      data: {
        id: "",
        name: "",
        description: "",
        price: ""
      }
    }
  },
  computed: {
    ...mapGetters({
      posts: 'post/posts'
    })
  },
  methods: {
    addnew() {
      this.$store.dispatch('post/ADD_NEW', this.data).then(respone => {
        if (respone) {
          this.modelAdd = false;
          // reset data 
          this.data = {
            id: "",
            name: "",
            description: "",
            price: ""
          }
        }
      })
    },
    edit(id) {
      this.modelUpdate = true;
      this.$store.dispatch('post/GET_POST', id).then(respone => {
        //set data model
        this.data.id = respone[0].id;
        this.data.name = respone[0].name;
        this.data.description = respone[0].description;
        this.price = respone[0].price;
      })
    },
    updatePost() {
      this.$store.dispatch('post/UPDATE_POST', this.data).then(respone => {
        if (respone) {
          this.modelUpdate = false;
        }
      })
    },
    destory(id) {
      this.$store.dispatch('post/DELETE_POST', id).then(respone => {
        if (respone) {
          alert("ok");
        }
      })
    }
  }
}
</script>

<style>

</style>