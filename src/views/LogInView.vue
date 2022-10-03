<template>
  <div class="login">
    <form @submit.prevent="login">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" />
        <p v-if="emailError" class="error">{{ emailError }}</p>
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
      </div>
      <button class="btn" type="submit">Log in</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { toastStore } from "@/store/toast.module";

@Component({
  components: {},
})
export default class LoginView extends Vue {
  email = "";
  password = "";
  emailError = "";
  passwordError = "";

  login(): undefined | void {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;

    if (!this.email) {
      this.emailError = "Email is required";
      return;
    } else if (!emailRegex.test(this.email)) {
      this.emailError = "Email is not valid (johndoe@example.com)";
      return;
    } else {
      this.emailError = "";
    }

    if (!this.password) {
      this.passwordError = "Password is required";
      return;
    } else if (!passwordRegex.test(this.password)) {
      this.passwordError = "Password is not valid (min 8 characters, 1 uppercase, 1 lowercase, 1 number)";
      return;
    } else {
      this.passwordError = "";
    }

    toastStore.createToast({ message: "User logged in successfully", type: "success" });
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
      width: 100%;
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
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

.error {
  width: fit-content;
  background-color: #ee4c4ce3;
  color: #fff;
  padding: 0.2rem 0.5rem;
  font-size: 9pt;
  font-weight: 500;
  margin-top: 0.5rem;
  border-radius: 10px;
}
</style>
