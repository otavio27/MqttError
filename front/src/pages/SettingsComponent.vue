<template>
  <div class="q-pa-md" style="max-width: 100%; background-color: #fff">
    <div class="q-pa-md grid">
      <img style="height: 20rem; width: 18rem" src="../assets/owtech.jpg" />
    </div>

    <form
      @submit.prevent.stop="onSubmit"
      @reset.prevent.stop="onReset"
      class="q-gutter-md"
    >
      <q-input
        ref="brokerRef"
        filled
        type="text"
        v-model="broker"
        label="Broker:"
        hint="Digite o nome do broker"
        lazy-rules
        :rules="brokerRules"
      />
      <q-input
        ref="urlRef"
        filled
        type="text"
        v-model="url"
        label="URL:"
        hint="Informe a url"
        lazy-rules
        :rules="urlRules"
      />

      <q-input
        ref="portRef"
        filled
        type="number"
        v-model="port"
        label="Porta:"
        hint="Máximo 5 caracteres"
        lazy-rules
        :rules="portdRules"
      />

      <q-input
        ref="userBrokerRef"
        filled
        type="text"
        v-model="userBroker"
        label="Seu usuário:"
        hint="Usuário"
        lazy-rules
        :rules="userBrokerRules"
      />

      <q-input
        ref="pwdRef"
        filled
        type="password"
        v-model="pwd"
        label="Sua senha:"
        hint="Informe sua senha"
        lazy-rules
        :rules="passwordRules"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useNotify from "src/composable/UseNotify";

export default {
  setup() {
    const { notifyDager, notifySuccsses } = useNotify();

    const broker = ref(null);
    const brokerRef = ref(null);

    const url = ref(null);
    const urlRef = ref(null);

    const port = ref(null);
    const portRef = ref(null);

    const userBroker = ref(null);
    const userBrokerRef = ref(null);

    const pwd = ref(null);
    const pwdRef = ref(null);

    const accept = ref(false);

    return {
      broker,
      brokerRef,
      brokerRules: [
        (val) => (val && val.length > 0) || "Por favor digite o nome do broker",
      ],

      url,
      urlRef,
      urlRules: [
        (val) => (val !== null && val !== "") || "Por favor, digite seu e-mail",
        (val) =>
          (val !== null &&
            val !==
              "/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g") ||
          "Por favor, digite uma url válida",
      ],

      port,
      portRef,
      portdRules: [
        (val) => (val !== null && val !== "") || "Por favor, digite a porta",
        (val) =>
          (val > 0 && val < 10000) ||
          "Por favor, digite uma porta de 0 à 65535",
      ],

      userBroker,
      userBrokerRef,
      userBrokerRules: [
        (val) => (val && val.length > 0) || "Por favor digite algo",
      ],

      pwd,
      pwdRef,
      passwordRules: [
        (val) => (val !== null && val !== "") || "Por favor, digite sua senha",
        (val) =>
          (val > 0 && val < 10000000) || "Por favor, digite uma senha real",
      ],

      onSubmit() {
        brokerRef.value.validate();
        urlRef.value.validate();
        portRef.value.validate();
        userBrokerRef.value.validate();
        pwdRef.value.validate();

        if (
          broker.value.hasError &&
          urlRef.value.hasError &&
          portRef.value.hasError &&
          userBroker.value.hasError &&
          pwd.value.hasError
        ) {
          notifyDager("Existem campos inválidos!");
        } else {
          notifySuccsses("Formulário enviado");
        }
      },

      onReset() {
        broker.value = null;
        url.value = null;
        port.value = null;
        userBroker.value = null;
        pwd.value = null;

        brokerRef.value.resetValidation();
        urlRef.value.resetValidation();
        portRef.value.resetValidation();
        userBrokerRef.value.resetValidation();
        pwdRef.value.resetValidation();
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped src="../css/app.css"></style>
