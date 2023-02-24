<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #1d1c1c">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>OWTech</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer elevated>
      <q-toolbar class="grid">
        <q-toolbar-title>Owtech Systems</q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="500">
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="sports_esports" />
            </q-item-section>

            <q-item-section>
              <RouterLink class="ow-bar-item" to="/">Controls</RouterLink>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="devices_other" />
            </q-item-section>

            <q-item-section>
              <RouterLink class="ow-bar-item" to="/devices">Devices</RouterLink>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section>
              <RouterLink class="ow-bar-item" to="/settings"
                >Settings</RouterLink
              >
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>

            <q-item-section>
              <RouterLink class="ow-bar-item" to="/login">Login</RouterLink>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    return {
      drawer: ref(false),
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.menu-list .q-item
  border-radius: 0 32px 32px 0
</style>
;
