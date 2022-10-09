import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    curHouse: [],
    curFloor: ''
  },
  getters: {
  },
  mutations: {
    updateData(state, event) {
      state.data = event;
    },
    selectHouse(state, event) {
      state.curHouse = [];
      state.curHouse = state.data.entrances.filter(item => item.house_id === event)
    },
    showPopup(state, event) {
      state.curFloor = event
    },
    hiddenPopup(state) {
      state.curFloor = ''
    },
  },

  actions: {
    async getData() {
      const res = await fetch('data.json');
      return res;
    }
  }
})
