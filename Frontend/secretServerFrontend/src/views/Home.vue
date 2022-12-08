<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';

const secrets = ref([]);
const secretMessage = ref('');
const expireAfterViews = ref(0);
const expireAfter = ref(0);
let secretMsgInputTouched = false;

// This function returns a text to show in secrets' status list
const expireText = expiresAt => {
  let expireValue = null;
  // if expiresAt is a date type, calculate the expiration in minutes
  if (expiresAt) {
    expireValue = new Date(expiresAt).getMinutes() - new Date().getMinutes();
  }
  if (expireValue > 0) {
    return `${expireValue} min(s)`; // shows how many minutes left
  }
  if (!expireValue && expireValue !== 0) return 'Never Expire'; // when the "expire after" input set to zero, the secret never expires by time
  if (expireValue <= 0 && expireValue !== null) return 'Expired'; // when the time is up the secret get expired status
  return 'Calculation error';
};

watch(secretMessage, () =>{
  if (secretMessage.value.trim() !== '') {
    secretMsgInputTouched = true;
  }
})

onMounted(async () => {
  // load the secrets' status from mongoDB
  const resAllstatus = await axios.get('http://localhost:8080/api/all-status');
  secrets.value = resAllstatus.data;
});

const createSecret = async () => {
  if (secretMessage.value.trim() === '') {
    return;
  }
  // send inputs data to backend
  await axios.post('http://localhost:8080/api/secret', {
    secret: {
      secret: secretMessage.value,
      expireAfter: expireAfter.value,
      expireAfterViews: expireAfterViews.value,
    },
  });
  // reset the form
  secretMessage.value = '';
  expireAfterViews.value = 0;
  expireAfter.value = 0;
  secretMsgInputTouched = false;
  const resAllstatus = await axios.get('http://localhost:8080/api/all-status');
  secrets.value = resAllstatus.data;
};
</script>

<template>
  <header></header>

  <main>
    <section class="title-box">
      <h1 class="title main-title">Secret Message App</h1>
    </section>

    <section class="createSecret-box">
      <h2 class="title">Create new secret message</h2>

      <form @submit.prevent="createSecret">
        <p>
          Secret message
          <input
            v-bind:style="secretMessage === '' && secretMsgInputTouched ? 'border: 2px solid #ff3535;' : 'border: 1px solid #000000;'"
            class="input input-message"
            type="text"
            placeholder="type your secret message here"
            v-model="secretMessage"
          />
        </p>
        <p>
          Expire after
          <input
            class="input input-expview"
            type="number"
            min="0"
            v-model="expireAfterViews"
          />
          views.
        </p>
        <p>
          Expire after
          <input
            class="input input-exptime"
            type="number"
            min="0"
            v-model="expireAfter"
          />
          minute(s).
        </p>
        <div class="button-box">
          <input class="button button-submit" type="submit" value="Create" />
        </div>
      </form>
    </section>

    <section class="revealSecret">
      <h2 class="title">Reveal the secret message</h2>

      <div class="list-box" v-bind:style="secrets.length ? 'padding: 12px;' : 'padding: 0px;'">
        <div class="list" v-for="(secret, index) in secrets" :key="secret.id">
          <div class="labels">
            <b
              ><p>{{ `${index + 1}.` }}</p></b
            >
            <p>
              Views left: <b>{{ secret.remainingViews }}</b>
            </p>
            <p>
              Expire after:
              <b>{{ expireText(secret.expiresAt) }}</b>
            </p>
            <div class="button-box">
              <RouterLink
                class="button button-show"
                :to="{ name: 'Secret', params: { hash: secret.hash } }"
                >show</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped>
template {
  position: relative;
}

main {
  width: 500px;
  max-width: 550px;
  max-height: 1000px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background-color: rgba(245, 245, 245, 0.692);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.671);
}
.createSecret-box {
  margin-bottom: 60px;
}

.main-title {
  font-size: 2rem;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #242424;
}

p {
  font-size: 20px;
  color: #4d4d4d;
}

.input {
  border-radius: 4px;
  padding: 5px;
  font-size: 1rem;
}

.input-message {
  width: 20rem;
}

.input-expview,
.input-exptime {
  width: 2rem;
}

.button-box {
  text-align: center;
}

.button {
  padding: 10px 15px;
  background: none;
  border: none;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.671);
}
.button-submit {
  border: 1px solid #51bd80;
  background-color: #51bd80;
  font-size: 20px;
}

.button-show {
  border: 1px solid #3427e6;
  background-color: #3427e6;
  font-size: 12px;
  margin-bottom: 30px;
  text-decoration: none;
}

.list-box {
  border-radius: 4px;
  max-height: 400px;
  overflow-y: scroll;
  box-shadow: 0px 7px 11px 0px rgba(0, 0, 0, 0.3) inset;
  -webkit-box-shadow: 0px 7px 11px 0px rgba(0, 0, 0, 0.3) inset;
  -moz-box-shadow: 0px 7px 11px 0px rgba(0, 0, 0, 0.3) inset;
}
.list {
  background-color: #fff;
  color: #4d4d4d;
  font-size: 18px;
  border-radius: 4px;
  padding: 5px;
  margin-bottom: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.671);
}
.labels {
  margin-left: 5px;
  align-items: center;
  display: flex;
  justify-content: space-around;
}
</style>
