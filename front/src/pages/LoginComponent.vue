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
        ref="nameRef"
        filled
        v-model="name"
        label="Seu nome:"
        hint="Nome e sobrenome"
        lazy-rules
        :rules="nameRules"
      />

      <q-input
        ref="emailRef"
        filled
        type="email"
        v-model="email"
        label="Seu e-mail:"
        hint="Digite um e-mail válido"
        lazy-rules
        :rules="emailRules"
      />

      <q-input
        ref="pwdRef"
        filled
        type="password"
        v-model="pwd"
        label="Sua senha:"
        hint="Máximo 8 caracteres"
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

    const name = ref(null);
    const nameRef = ref(null);

    const pwd = ref(null);
    const pwdRef = ref(null);

    const email = ref(null);
    const emailRef = ref(null);

    const accept = ref(false);

    return {
      name,
      nameRef,
      nameRules: [(val) => (val && val.length > 0) || "Por favor digite algo"],

      pwd,
      pwdRef,
      passwordRules: [
        (val) => (val !== null && val !== "") || "Por favor, digite sua senha",
        (val) =>
          (val > 0 && val < 10000000) || "Por favor, digite uma senha real",
      ],

      email,
      emailRef,
      emailRules: [
        (val) => (val !== null && val !== "") || "Por favor, digite seu e-mail",
        (val) =>
          (val !== null &&
            val !==
              "/^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/") ||
          "Por favor, digite um e-mail real",
      ],

      onSubmit() {
        nameRef.value.validate();
        pwdRef.value.validate();
        emailRef.value.validate();

        if (nameRef.value.hasError || pwdRef.value.hasError) {
          // form has error
        } else {
          notifySuccsses("Formulário enviado");
        }
      },

      onReset() {
        name.value = null;
        pwd.value = null;
        email.value = null;

        nameRef.value.resetValidation();
        pwdRef.value.resetValidation();
        emailRef.value.resetValidation();
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped src="../css/app.css"></style>
