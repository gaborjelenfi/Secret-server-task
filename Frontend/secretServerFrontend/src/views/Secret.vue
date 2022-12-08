<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

let secret = ref(' ');

onMounted(() => {
  // get the hash from url
  const href = window.location.href;
  const cutAfter = 'secret/';

  const index = href.indexOf(cutAfter);
  const length = cutAfter.length;

  const hash = href.slice(index + length);

  revealSecret(hash);
});

const revealSecret = async (hash) => {
  // get the decrypted secret message
    const res = await axios.get(`http://localhost:8080/api/secret/${hash}`);
    secret.value = res?.data?.secretText;
  };
</script>

<template>
  <h1 class="secret-text">{{`"${secret}"`}}</h1>
</template>

<style scoped>
.secret-text {
    text-align: center;
}
</style>
