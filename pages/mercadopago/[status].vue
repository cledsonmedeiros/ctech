<script lang="ts" setup>
definePageMeta({
  layout: false
})

const route = useRoute();
const status = route.params.status as string;
const queryParams = route.query;
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">
      Status do redirecionamento: {{ status }}
    </h1>
    <div class="mt-4" v-if="Object.keys(queryParams).length > 0">
      <h2 class="text-2xl font-semibold underline mb-2">Parâmetros da Query:</h2>
      <ul class="list-disc list-inside">
        <li v-for="(value, key) in queryParams" :key="key">
          <strong>{{ key }}:</strong> {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>