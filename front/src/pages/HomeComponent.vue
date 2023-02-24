<template>
  <div>
    <div class="q-pa-md q-gutter-md">
      <div id="title">
        <h4 class="ow-text-white grid-top">AR CONDICIONADO</h4>
      </div>

      <div class="acj-1">
        <p class="grid-left">
          <span class="ow-text-white grid">ON/OFF</span>
          <button
            class="ow-btn"
            :class="{ 'ow-on': isActive }"
            @click="startACJ()"
          >
            {{ isActive ? "ON" : "OFF" }}
          </button>
        </p>
        <p class="grid">
          <span class="ow-text-white">COMPRESS</span>
          <span
            class="ow-compress-off"
            :class="{ 'ow-compress-on': compress === 'ON' }"
          >
            <strong> {{ compressor === "ON" ? "ON" : "OFF" }}</strong></span
          >
        </p>
        <p class="grid-right">
          <span class="ow-text-white grid">BAIXA</span>
          <button
            class="ow-btn"
            :class="{ 'ow-on': speed === 'low' }"
            @click="changeSpeed('low')"
          >
            {{ speed === "low" ? "ON" : "OFF" }}
          </button>
        </p>
      </div>

      <div class="acj-1">
        <p class="grid-left">
          <span class="ow-text-white grid">VENTILAR</span>
          <button
            class="ow-btn"
            :class="{ 'ow-on': functions === 'ventilar' }"
            @click="changeFunctions('ventilar')"
          >
            {{ functions === "ventilar" ? "ON" : "OFF" }}
          </button>
        </p>
        <p class="grid">
          <span class="ow-text-white">TEMP AMB</span>
          <span class="ow-text-down ow-text-white"
            ><strong>{{ temp.room }}</strong>
            <i class="ow-text-white">ºC</i>
          </span>
        </p>
        <p class="grid-right">
          <span class="ow-text-white grid">MÉDIA</span>
          <button
            class="ow-btn"
            :class="{ 'ow-on': speed === 'medium' }"
            @click="changeSpeed('medium')"
          >
            {{ speed === "medium" ? "ON" : "OFF" }}
          </button>
        </p>
      </div>

      <div class="acj-1">
        <p class="grid-left">
          <span class="ow-text-white grid">SLEEP</span>
          <button
            class="ow-btn"
            :class="{ 'ow-on': functions === 'sleep' }"
            @click="changeFunctions('sleep')"
          >
            {{ functions === "sleep" ? "ON" : "OFF" }}
          </button>
        </p>
        <p class="grid">
          <span class="ow-text-white">TEMP MIN</span>
          <span class="ow-text-white"
            ><strong>{{ temp.minimal }}</strong>
            <i class="ow-text-white"> ºC</i>
          </span>
        </p>
        <p class="grid-right">
          <span class="ow-text-white grid">TURBO</span>
          <button
            class="ow-btn"
            :class="{ 'ow-on': speed === 'turbo' }"
            @click="changeSpeed('turbo')"
          >
            {{ speed === "turbo" ? "ON" : "OFF" }}
          </button>
        </p>
      </div>

      <div class="acj-1">
        <p class="grid-left">
          <span class="ow-text-white grid">CONFORT</span>
          <button
            class="ow-btn"
            :class="{ 'ow-on': functions === 'confort' }"
            @click="changeFunctions('confort')"
          >
            {{ functions === "confort" ? "ON" : "OFF" }}
          </button>
        </p>
        <p>
          <span class="ow-text-white grid"
            >SET TEMP
            <i class="ow-text-white"
              ><strong>{{ temp.minimal }}</strong> ºC</i
            >
          </span>
          <button class="ow-set grid-left" @click="setTempUp">▲</button>
          <button class="ow-set grid-right" @click="setTemDown">▼</button>
        </p>
        <p class="grid-right">
          <span class="ow-text-white grid">JET</span>
          <button
            class="ow-btn"
            :class="{ 'ow-on': functions === 'jet' }"
            @click="changeFunctions('jet')"
          >
            {{ functions === "jet" ? "ON" : "OFF" }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import useNotify from "src/composable/UseNotify";
import { useMqttStore } from "src/stores/mqtt-store";

const mqttStore = useMqttStore();
const { payload } = storeToRefs(mqttStore);
const { useMqtt, usePublish } = mqttStore;
const { notifyWarning } = useNotify();

const owtech = "/owtech/home/acj/payload/mcu";

let isActive = ref(false);
let isSleep = ref(false);
let isJet = ref(false);
let strs = ref("");
let speed = ref("");
let compress = ref("");
let functions = ref("");

const temp = ref({
  room: 27,
  minimal: 21,
  set: 21,
});

onMounted(() => {
  usePublish(owtech, "get_payload");
  useMqtt();
  handlerPayload(payload);
});

const handlerPayload = (data) => {
  const { commands, compressor, sleep, jet, temp_max, room } = data.value;

  compress.value = compressor;
  temp.value.set = temp_max;
  temp.value.minimal = temp_max;
  temp.value.room = room;

  switch (commands) {
    case "start":
      isActive.value = true;
      isSleep.value = sleep;
      isJet.value = jet;
      speed.value = "low";
      temp.value.room = room;
      break;
    case "stop":
      isActive.value = false;
      strs.value = "stop";
      speed.value = "";
      functions.value = "";
      isSleep.value = false;
      isJet.value = false;
      break;
    case "low":
      if (isActive.value) {
        speed.value = "low";
      }
      break;
    case "medium":
      if (isActive.value) {
        speed.value = "medium";
      }
      break;
    case "turbo":
      if (isActive.value) {
        speed.value = "turbo";
      }
      break;
    case "ventilar":
      if (isActive.value) {
        isSleep.value = sleep;
        isJet.value = jet;
        functions.value = "ventilar";
        speed.value = "low";
      }
      break;
    case "sleep":
      if (isActive.value) {
        isSleep.value = sleep;
        isJet.value = jet;
        functions.value = "sleep";
        speed.value = "low";
      }
      break;
    case "confort":
      if (isActive.value) {
        isSleep.value = sleep;
        isJet.value = jet;
        functions.value = "confort";
        speed.value = "low";
      }
      break;
    case "jet":
      if (isActive.value) {
        isSleep.value = sleep;
        isJet.value = jet;
        functions.value = "jet";
        speed.value = "";
      }
      break;
  }
};

const startACJ = () => {
  isActive.value = !isActive.value;
  if (isActive.value) {
    strs.value = "start";
    speed.value = "low";
    usePublish(owtech, strs.value);
  } else {
    strs.value = "stop";
    speed.value = "";
    functions.value = "";
    isSleep.value = false;
    isJet.value = false;
    usePublish(owtech, strs.value);
  }
};

const changeSpeed = (spds) => {
  if (!isActive.value) {
    return;
  }
  isJet.value
    ? notifyWarning("A função JET está ativa!")
    : (speed.value = spds);
  switch (spds) {
    case "low":
      if (!isJet.value) {
        usePublish(owtech, "low");
      }
      break;
    case "medium":
      if (!isJet.value) {
        usePublish(owtech, "medium");
      }
      break;
    case "turbo":
      if (!isJet.value) {
        usePublish(owtech, "turbo");
      }
  }
};

const changeFunctions = (func) => {
  if (!isActive.value) {
    return;
  }
  if (func === "ventilar") {
    speed.value = "low";
    usePublish(owtech, "ventilar");
  }
  if (func === "sleep") {
    isSleep.value = true;
    usePublish(owtech, "sleep");
  } else {
    isSleep.value = false;
  }
  if (func === "confort") {
    usePublish(owtech, "confort");
  }
  if (func === "jet") {
    isJet.value = true;
    speed.value = "";
    usePublish(owtech, "jet");
  } else {
    isJet.value = false;
    speed.value = speed.value;
  }
  functions.value = func;
};

const setTempUp = () => {
  if (isSleep.value) {
    notifyWarning("A função SLEEP está ativa!");
  } else {
    temp.value.set++;
    if (temp.value.set > 30.0) {
      temp.value.set = 30.0;
    }
    temp.value.minimal = temp.value.set;
    usePublish(owtech, `${temp.value.set}`);
  }
};

const setTemDown = () => {
  if (isSleep.value) {
    notifyWarning("A função SLEEP está ativa!");
  } else {
    temp.value.set--;
    if (temp.value.set < 18.0) {
      temp.value.set = 18.0;
    }
    temp.value.minimal = temp.value.set;
    usePublish(owtech, `${temp.value.set}`);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped src="../css/app.css"></style>
