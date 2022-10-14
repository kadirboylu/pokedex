<template>
  <div v-if="!user" class="login">
    <form @submit.prevent="login">
      <div class="form-control">
        <label for="email">{{ $t("email") }}</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="form-control">
        <label for="password">{{ $t("password") }}</label>
        <input :type="passwordType" id="password" v-model="password" />
        <i
          class="show-password"
          :class="{ 'fa-regular fa-eye': passwordType === 'password', 'fa-regular fa-eye-slash': passwordType === 'text' }"
          @click="showPassword()"
        ></i>
      </div>
      <button class="btn" type="submit">{{ $t("log_in") }}</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { toastStore } from "@/store/toast.module";
import { loginUser } from "@/service";
import { strapiStore } from "@/store/strapi.module";
import { User } from "@/service";

@Component({
  components: {},
})
export default class LoginView extends Vue {
  email = "";
  password = "";
  passwordType = "password";

  created() {
    if (strapiStore.user) {
      this.$router.push({ name: "home" });
    }
  }

  showPassword() {
    this.passwordType = this.passwordType === "password" ? "text" : "password";
  }

  async login() {
    try {
      const response = await loginUser(this.email, this.password);
      strapiStore.login(response);
      toastStore.createToast({ message: this.$i18n.t("toast.login_view.success").toString(), type: "success" });

      this.$router.push({ name: "home" });
    } catch (error) {
      toastStore.createToast({ message: this.$i18n.t("toast.login_view.error").toString(), type: "error" });
    }
  }

  get user(): User | null {
    return strapiStore.user;
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    margin-bottom: 3rem;
    text-decoration-line: underline;
  }
  form {
    width: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;

    .form-control {
      position: relative;
      width: 100%;
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }

      .show-password {
        position: absolute;
        top: 45px;
        right: 10px;
        transform: translateY(-50%);
        color: rgb(33, 101, 146);
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
          color: red;
        }
      }

      input {
        width: 100%;
        padding: 0.5rem;
        font-family: "Montserrat", sans-serif;
        border: 1px solid #ccc;
        border-radius: 4px;
        outline: none;
        transition: all 0.3s ease-in-out;

        &:focus {
          box-shadow: 0 0 1px 1px #e63e3e;
        }
      }
    }

    .btn {
      width: 100%;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      background-color: rgb(39, 139, 39);
      color: #fff;
      cursor: pointer;
      font-family: "Montserrat", sans-serif;
      font-size: 12pt;
      font-weight: 600;
      transition: all 0.3s ease-in-out;

      &:hover {
        opacity: 0.8;
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
}
</style>
