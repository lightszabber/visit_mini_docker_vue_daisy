<template>
  <div class="space-y-4">
    <div class="card bg-base-100 shadow">
      <div class="card-body">
        <h2 class="card-title">API teszt</h2>
        <p>Gombnyomásra hívjuk az API-t: <code>/api/visits</code></p>

        <div class="flex items-center gap-3">
          <button class="btn btn-primary" @click="hit" :disabled="loading">
            {{ loading ? "Tölt..." : "Visit +1" }}
          </button>

          <div class="badge badge-outline" v-if="visits !== null">
            visits: {{ visits }}
          </div>
        </div>

        <div class="alert alert-error" v-if="error">
          <span>{{ error }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const visits = ref(null);
const loading = ref(false);
const error = ref("");

async function hit() {
  loading.value = true;
  error.value = "";
  try {
    const r = await fetch("/api/visits");
    const data = await r.json();
    if (!data.ok) throw new Error(data.error ?? "API error");
    visits.value = data.visits;
  } catch (e) {
    error.value = String(e);
  } finally {
    loading.value = false;
  }
}
</script>
