<template>
  <div class="entrance">
    <div
      class="entrance__floors"
      v-for="(floor, index) in entrance.floors"
      :key="index"
    >
      <div class="entrance__floor">{{ floor.floor }}</div>
      <Cell v-for="(flat, index) in floor.flats" :key="index" :id="flat.id" />
    </div>
    <div class="entrance__title">
      {{ entrance.title }}
    </div>
  </div>
</template>

<script>
import Cell from "./CellLayout.vue";

export default {
  components: {
    Cell,
  },
  props: {
    entrance: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.entrance {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  flex-direction: column;

  &__floor {
    width: 15px;
    margin-right: 20px;
    font-size: 14px;
    color: var(--dark-100);

    &s {
      display: flex;
      align-items: center;
      margin-bottom: 5px;

      .cell {
        &:last-child {
          margin: 0;
        }
      }
    }
  }

  &__title {
    color: var(--dark-200);
    font-size: 18px;
    font-weight: 500;
    margin-top: 20px;
  }
}
</style>