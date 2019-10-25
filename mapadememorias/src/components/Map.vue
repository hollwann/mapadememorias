<template>
  <MglMap
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    :center="center"
    :zoom="zoom"
    :interactive="interactive"
    class="map"
  >
    <MglMarker :coordinates="center" :key="'center'" color="yellow" />
    <MglMarker
      v-for="marker in markers"
      :coordinates="marker.location"
      :key="marker.description"
      color="blue"
    />
  </MglMap>
</template>

<script>
import Mapbox from 'mapbox-gl'
import { MglMap, MglMarker } from 'vue-mapbox'

export default {
  props: {
    markers: {
      type: Array,
      required: false
    },
    center: {
      type: Array,
      required: true
    },
    zoom: {
      type: Number,
      required: false,
      default: 13
    },
    interactive: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  components: {
    MglMap,
    MglMarker
  },
  data() {
    return {
      accessToken:
        'pk.eyJ1IjoiY2FsZW5kYXBpIiwiYSI6ImNqd3o5ZzNxMjBrd200YWxjYjFnczFmZWUifQ.J6U35576sNSZs79wW2gLyQ', // your access token. Needed if you using Mapbox maps
      mapStyle: 'mapbox://styles/mapbox/streets-v11', // your map style
      coordinates: [-74.079297, 4.6551322]
    }
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox
  }
}
</script>

<style scoped>
@import 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css';
.map {
  width: 100%;
  height: 80vh;
}
</style>
