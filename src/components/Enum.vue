<template>
  <div class="container">
    <div class="table-container">
      <div v-if="enumName">
        <h2>{{ enumName }}</h2>
        <p>{{ this.res }}</p>
      </div>
      <div style="padding: 50px">
        <button class="btn" @click="toTicket">Вернуться</button>
      </div>
    </div>
  </div>

</template>


<script>

export default {
  name: 'Enum',
  props: {
    enumStr: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      enumName: '',
      res: '',
      response:{
        data : ""
      }
    }
  },
  created() {
    this.getEnum()
  },
  methods: {
    toTicket() {
      this.$router.push('/TMA/api/v2/enums');
    },
    getEnum() {
      if (this.enumStr === 'ticket-types') {
        this.enumName = 'Список типов билетов'
        this.res = "Обычный, Дешевый, Бюджетный, VIP"
        // this.response.data.forEach(type => {
        //   type === "USUAL" ? this.res += "Обычный, " : type === "CHEAP" ? this.res += "Дешевый, " : type === "BUDGETARY" ? this.res += "Бюджетный, " : type === "VIP" ? this.res += "VIP" : ""
        // });
      } else if (this.enumStr === 'countries') {
        this.enumName = 'Список стран'
        this.res = "Северная Корея, Китай, Япония"
        // this.response.data.forEach(type => {
        //   type === "NORTH_KOREA" ? this.res += "Северная Корея, " : type === "CHINA" ? this.res += "Китай\n" : type === "JAPAN" ? this.res += "Япония, " : ""
        // });
      } else if (this.enumStr === 'eye-colors') {
        this.enumName = 'Список цвет глаз'
        this.res = "Зеленый, Красный, Синий"
        // this.response.data.forEach(type => {
        //   type === "GREEN" ? this.res += "Зеленый, " : type === "RED" ? this.res += "Красный, " : type === "BLUE" ? this.res += "Синий" : ""
        // });
      } else if (this.enumStr === 'hair-colors') {
        this.enumName = 'Список цвет волос'
        this.res = "Черный, Красный, Синий, Рыжий, Белый"
        // this.response.data.forEach(type => {
        //   type === "BLACK" ? this.res += "Черный, " : type === "RED" ? this.res += "Красный, " : type === "BLUE" ? this.res += "Синий, " : type === "ORANGE" ? this.res += "Рыжий, " : type === "WHITE" ? this.res += "Белый" : ""
        // });
      }
    },
    handleError(error) {
      if (error.response) {
        const errorData = error.response.data;
        const errorTitle = errorData.title;
        const errorDetail = errorData.detail;
        return `${errorTitle}\n${errorDetail}`
      } else if (error.response.status === 500) {
        const errorData = error.response.data;
        return `${errorData.title}\n${errorData.details}`
      } else {
        console.error(error);
        return 'Произошла ошибка. Пожалуйста, попробуйте позже.';
      }
    }
  }
}

</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
}


.textarea textarea {
  min-height: 25px;
  padding: 5px;
}

.table-container {
  flex: 2 0 700px;
}

table {
  text-align: center;
  width: 100%;
  margin: auto;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.field-options label {
  display: block;
}
</style>