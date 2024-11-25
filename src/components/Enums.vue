<template>
  <div class="container">
    <div class="table-container">
      <div>
        <button class="btn" @click="getСountries">Получить страны</button>
      </div>
      <div>
        <button class="btn" @click="getEyeColors">Получить цвета глаз</button>
      </div>
      <div>
        <button class="btn" @click="getHairColors">Получить цвета волос</button>
      </div>
      <div>
        <button class="btn" @click="getTypes">Получить типы билетов</button>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'Enums',
  data() {
    return {
      types: [],
      eyeColors: [],
      hairColors: [],
      countries: [],
    }
  },
  methods: {
    getСountries() {
      this.$router.push({name: 'Enum', params: {enumStr: 'countries'}});
    },
    getEyeColors() {
      this.$router.push({name: 'Enum', params: {enumStr: 'eye-colors'}});
    },
    getHairColors() {
      this.$router.push({name: 'Enum', params: {enumStr: 'hair-colors'}});
    },
    getTypes() {
      this.$router.push({name: 'Enum', params: {enumStr: 'ticket-types'}});
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
  flex: 2 0 700px; /* Table will take 2 parts of the space, won't shrink below 700px */
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

.btn {
  margin: 8px 8px 8px 8px
}

.field-options label {
  display: block;
}
</style>
