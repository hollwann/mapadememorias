<template>
  <v-dialog v-model="showDialog" max-width="80%">
    <v-card>
      <v-card-title class="headline">
        Nueva memoria
      </v-card-title>
      <v-card-text>
        <form @submit.prevent="saveNewMemory">
          <v-text-field
            type="text"
            label="Fecha"
            v-mask="dateMask"
            v-model="form.date"
          />
          <v-text-field type="text" label="Lugar" v-model="form.place" />
          <MapSelect v-model="form.location" />
          <v-text-field type="text" label="Ocasión" v-model="form.reason" />
          <v-file-input
            label="Fotos"
            @change="updateFormPhotos"
            multiple
            accept="image/*"
          ></v-file-input>

          <v-rating v-model="form.rating"></v-rating>
          <v-textarea
            label="Descripción"
            v-model="form.description"
          ></v-textarea>
          <v-combobox
            v-model="form.tags"
            chips
            label="Etiquetas"
            multiple
          ></v-combobox>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="showDialog = false">
          Cancelar
        </v-btn>
        <v-btn color="primary" text @click="saveNewMemory">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mask } from 'vue-the-mask'
import { db, storageRef } from '@/firebaseConfig.js'
import MapSelect from '@/components/MapSelect.vue'
import imageCompression from 'browser-image-compression'

export default {
  components: {
    MapSelect
  },
  directives: {
    mask
  },
  props: {
    value: Boolean
  },
  data() {
    return {
      form: this.createFreshForm(),
      photos: [],
      dateMask: '####-##-##'
    }
  },
  computed: {
    showDialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    createFreshForm() {
      this.photos = []
      return {
        date: '',
        place: '',
        location: [-74.079297, 4.6551322],
        reason: '',
        rating: 5,
        description: ''
      }
    },
    async saveNewMemory() {
      await db.collection('memories').add(this.form)
      await Promise.all(
        this.photos.map(
          async photo =>
            await storageRef.child('memories/' + photo.name).put(photo)
        )
      )
      window.alert('Exito subiendo la memoria!')
    },
    async updateFormPhotos(files) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }

      this.photos = await Promise.all(
        files.map(async file => await imageCompression(file, options))
      )
    }
  }
}
</script>

<style lang="scss" scoped></style>
