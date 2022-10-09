<template>
  <div class="wrapper">
    <div
      class="cell"
      @click="showPopup(id)"
      :class="{
        cell_sales: getDataFlat.status === 'Выданы ключи',
        cell_decor: getDataFlat.status === 'Оформление',
        cell_booking: getDataFlat.status === 'Бронь',
        cell_treaty: getDataFlat.status === 'Договор',
        'cell_non-residential': getDataFlat.type === 'Нежилые помещения',
        cell_additionally:
          getDataFlat.renovation ||
          getDataFlat.marginal ||
          getDataFlat.installment ||
          getDataFlat.subsidy,
      }"
    >
      {{ getDataFlat.plan_type }}
    </div>

    <Popup v-if="curFloor === id" :data="getDataFlat" />
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

import Popup from "./PopupLayout.vue";

export default {
  components: {
    Popup,
  },
  props: {
    id: {
      type: String,
    },
  },

  computed: {
    ...mapState(["data", "curFloor"]),
    getDataFlat() {
      let i;
      for (let key in this.data.flats) {
        if (key === this.id) {
          i = this.data.flats[key];
        }
      }
      return i;
    },
  },

  methods: {
    ...mapMutations(["showPopup"]),
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  margin-right: 5px;
}
.cell {
  position: relative;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--light);
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  background-color: var(--dark-100);

  &:hover {
    background-color: var(--dark-200);
  }

  &_sales {
    background-color: var(--dark-150);
  }

  &_booking {
    background-color: var(--yelow);
  }

  &_treaty {
    background-color: var(--green);
  }

  &_additionally {
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 6px;
      height: 6px;
      background: var(--red);
      top: -2px;
      right: -2px;
    }
  }

  &_decor {
    background-color: var(--yelow-200);
  }

  &_non-residential {
    background-color: var(--light-100);
  }
}
</style>