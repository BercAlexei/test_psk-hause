<template>
  <div id="app">
    <div class="head">
      <div class="container">
        <div class="head__wrapper">
          <select
            class="select"
            name="house"
            id="house"
            @change="selectHouse($event.target.value)"
          >
            <option
              v-for="(house, index) in data.houses"
              :value="house"
              :key="index"
              :selected="index === 0"
            >
              Дом № {{ index + 1 }}
            </option>
          </select>

          <div class="legends">
            <div class="legends__title">Легенда:</div>
            <div class="legends__block">
              <div class="legend legend_free"></div>
              <span class="legend__description">- свободно;</span>
            </div>

            <div class="legends__block">
              <div class="legend legend_sales"></div>
              <span class="legend__description">- выданы ключи;</span>
            </div>

            <div class="legends__block">
              <div class="legend legend_treaty"></div>
              <span class="legend__description">- договор;</span>
            </div>

            <div class="legends__block">
              <div class="legend legend_booking"></div>
              <span class="legend__description">- бронь;</span>
            </div>

            <div class="legends__block">
              <div class="legend legend_decor"></div>
              <span class="legend__description">- оформление;</span>
            </div>

            <div class="legends__block">
              <div class="legend legend_non-residential"></div>
              <span class="legend__description">- нежилое;</span>
            </div>

            <div class="legends__block">
              <div class="legend legend_additionally"></div>
              <span class="legend__description">- с предложениями.</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="chess">
      <div class="container">
        <div class="chess__wrapper">
          <Entrance
            v-for="(entrance, index) in curHouse"
            :entrance="entrance"
            :key="index"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

import Entrance from "@/components/EntranceLayout.vue";

export default {
  components: {
    Entrance,
  },
  computed: {
    ...mapState(["data", "curHouse"]),
  },

  methods: {
    ...mapMutations(["updateData", "selectHouse", "hiddenPopup"]),
    ...mapActions(["getData"]),
  },

  async created() {
    await this.getData()
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          this.updateData(data);
          this.selectHouse(data.houses[0]);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Что-то пошло не так! Попробуйте повторить попытку попозже!");
      });

    window.addEventListener("click", (event) => {
      if (!event.target.classList.contains("cell")) {
        this.hiddenPopup();
      }
    });

    window.addEventListener("keyup", (event) => {
      if (event.code === "Escape") {
        this.hiddenPopup();
      }
    });
  },
};
</script>

<style lang="scss">
.head {
  margin: 10px 0;
  &__wrapper {
    display: flex;
    text-align: center;
    justify-content: space-between;
  }

  .select {
    background: var(--bg);
    box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 15px;
    line-height: 20px;
    cursor: pointer;
  }
}

.legend {
  position: relative;
  width: 15px;
  height: 15px;
  background-color: var(--dark-100);

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

  &__description {
    margin-left: 5px;
  }

  &s {
    display: flex;

    &__title {
      line-height: 15px;
      font-size: 16px;
      font-weight: 500;
      margin-right: 15px;
    }

    &__block {
      display: flex;
      text-align: center;
      line-height: 15px;
      color: var(--dark-200);
      font-size: 14px;
      margin-right: 10px;

      &:last-child {
        margin: 0;
      }
    }
  }
}

.chess {
  padding: 30px 0;

  &__wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
}
</style>
