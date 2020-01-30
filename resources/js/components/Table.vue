<template>
  <v-app id="app">

    <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        :search="search"
        sort-by="name"
        class="elevation-1"
    >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>
          <v-text-field
          v-model="search"
          append-icon="search"
          label="Busqueda"
          single-line
          hide-details
        ></v-text-field>
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
         <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline" v-text="formTitle"></span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Username"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field type="password" name="password" v-model="editedItem.password" label="Password"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
       
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template> -->
    </v-data-table>
  </v-app>
</template>

<script>
  import axios from 'axios';

  export default {
      
    data: () => ({
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Name (Username)',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        password: '',
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        email: '',
        password: '',
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Item' : 'Editar Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize ()  {

        let url = '/api/users';

        axios.get(url)
        .then( (response) => {

          let answer = response.data;
          this.desserts = answer.users;

        })
        .catch( (error) => {
          console.log(error);
        })

      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
       

        const index = this.desserts.indexOf(item)

        let conf = confirm('Desea eliminar este elemento?');
      
        let id = item.id;
        

        let url = '/api/users/delete/'+id;

        if(conf){
          axios.delete(url)
          .then( (response) => {
            
              this.desserts.splice(index, 1)
            
            
          })
          .catch( (error) => {
            console.error(error);
          })
        }

        
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {

          let id = this.editedItem.id;
          let url =  '/api/users/update/'+id;
          let route = '/api/users/register';

          if (this.editedIndex > -1) {

            axios.put(url, {
              
            'name': this.editedItem.name,
            'email': this.editedItem.email,
            'password': this.editedItem.password,
            
            })
            .then( (response) => {
              Object.assign(this.desserts[this.editedIndex], this.editedItem)
              this.close()
            })
            .catch( (error) => {
              this.close()
            })

          
          } else {

            axios.post(route, {
             
            'name': this.editedItem.name,
            'email': this.editedItem.email,
            'password': this.editedItem.password,

            })
            .then( (response) => {

              this.initialize();

              this.close()
            })
            .catch( (error) => {
              this.close()
            })
          }     
      },
    },
  }
</script>