<template>
  <div
    class="popup"
    :class="{
      popup_left: scrollWidth,
      popup_right: !scrollWidth,
      popup_bottom: scrollHeight,
      popup_top: !scrollHeight,
    }"
  >
    <div class="popup__title"></div>
    <div class="popup__content">
      <div class="popup__block">
        <span class="popup__subtitle">Тип: </span>{{ data.type }}
      </div>
      <div class="popup__block">
        <span class="popup__subtitle">Цена: </span
        >{{ data.cost.toLocaleString("ru-RU") }}
      </div>
      <div class="popup__block">
        <span class="popup__subtitle">Этаж: </span> {{ data.floor }}
      </div>
      <div class="popup__block">
        <span class="popup__subtitle">Номер квартиры: </span> {{ data.number }}
      </div>
      <div class="popup__block">
        <span class="popup__subtitle">Статус: </span> {{ data.status }}
      </div>
      <div class="popup__block">
        <span class="popup__subtitle">Планировка: </span>
        <span v-if="data.plan_type">{{ data.plan_type }}</span>
        <span v-else>&#8212;</span>
      </div>
      <div class="popup__block">
        <span class="popup__subtitle">Площадь: </span> {{ data.square }}
      </div>

      <div class="popup__block">
        <span class="popup__subtitle">Cубсидированная : </span>
        <span v-if="data.subsidy">Да</span>
        <span v-else>Нет</span>
      </div>
      <div class="popup__block">
        <span class="popup__subtitle">Маржинальная : </span>
        <span v-if="data.marginal">Да</span>
        <span v-else>Нет</span>
      </div>
      <div class="popup__block">
        <span class="popup__subtitle">С ремонтом: </span>
        <span v-if="data.renovation">Да</span>
        <span v-else>Нет</span>
      </div>
      <div class="popup__block">
        <span class="popup__subtitle">С рассрочкой: </span>
        <span v-if="data.installment">Да</span>
        <span v-else>Нет</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollWidth: false,
      scrollHeight: false,
    };
  },
  props: {
    data: {
      type: Object,
    },
  },
  mounted() {
    this.scrollWidth =
      document.documentElement.offsetWidth <
      document.documentElement.scrollWidth
        ? true
        : false;

    this.scrollHeight =
      document.documentElement.offsetHeight <
        document.documentElement.scrollHeight &&
      document.documentElement.scrollHeight > window.innerHeight
        ? true
        : false;
  },
};
</script>

<style lang="scss" scoped>
.popup {
  padding: 10px 8px;
  position: absolute;
  min-width: 250px;
  left: 38px;
  background-color: var(--neutral-100);
  z-index: 2;
  box-shadow: 2px 1px 10px black;
  color: var(--dark-200);

  &::after {
    content: "";
    position: absolute;
    transform: translateX(-100%);
    display: block;
    z-index: 30;
    border: 8px solid transparent;
    border-right: 8px solid var(--neutral-100);
  }

  &__content {
    text-align: left;
  }

  &__block {
    margin-top: 5px;
    &:first-child {
      margin: 0;
    }
  }

  &__subtitle {
    font-size: 16px;
    font-weight: 400;
  }

  &_right {
    &::after {
      left: 0;
    }
  }

  &_left {
    left: 0;
    transform: translateX(calc(-100% - 8px));

    &::after {
      transform: translateX(100%) rotate(180deg);
      right: 0;
    }
  }

  &_top {
    top: 0;

    &:after {
      top: 9px;
    }
  }

  &_bottom {
    bottom: 0;

    &:after {
      bottom: 9px;
    }
  }
}
</style>