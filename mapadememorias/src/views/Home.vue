<template>
  <v-row>
    <v-col cols="12">
      <v-btn color="primary" @click="openDialog = true">Nuevo</v-btn>
    </v-col>
    <v-col cols="12">
      <Map :center="[-74.079297, 4.6551322]" :markers="markers" />
    </v-col>
    <FormNewMemory v-model="openDialog" />
  </v-row>
</template>

<script>
import { db } from '@/firebaseConfig.js'
import Map from '@/components/Map.vue'
import FormNewMemory from '@/components/FormNewMemory.vue'
export default {
  components: {
    Map,
    FormNewMemory
  },
  created() {
    db.collection('memories').onSnapshot(querySnapshot => {
      var markers = []
      querySnapshot.forEach(doc => {
        markers.push(doc.data())
      })
      console.log(markers)
      this.markers = markers
    })
  },
  data() {
    return {
      openDialog: false,
      markers: []
    }
  }
}
</script>
