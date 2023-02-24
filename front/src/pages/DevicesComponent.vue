<template>
  <div class="q-pa-md" style="background-color: #c0c0c0">
    <q-table
      grid
      title="Info Device"
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-header
    >
    </q-table>
  </div>
</template>

<script setup>
//const { command, compressor, sleep, jet, temp_max, room } = payload.value;

const columns = [
  {
    name: "desc",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: false,
  },
  {
    name: "calories",
    align: "center",
    label: "Calories",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  { name: "carbs", label: "Carbs (g)", field: "carbs" },
];

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
  },
];
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped src="../css/app.css"></style>
