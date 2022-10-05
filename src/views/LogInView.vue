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
        <input :type="passwordType" id="password" v-model="password" />
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
        <i
          class="show-password"
          :class="{ 'fa-regular fa-eye': passwordType === 'password', 'fa-regular fa-eye-slash': passwordType === 'text' }"
          @click="showPassword()"
        ></i>
      </div>
      <button class="btn" type="submit">Log in</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { toastStore } from "@/store/toast.module";
import { loginUser } from "@/service";
import { authStore } from "@/store/auth.module";

@Component({
  components: {},
})
export default class LoginView extends Vue {
  email = "";
  password = "";
  emailError = "";
  passwordError = "";
  passwordType = "password";

  showPassword() {
    this.passwordType = this.passwordType === "password" ? "text" : "password";
  }

  async login() {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*/.?&])[A-Za-z\d@$!./%*?&]{8,}$/;

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
      this.passwordError =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character";
      return;
    } else {
      this.passwordError = "";
    }

    try {
      const response = await loginUser(this.email, this.password);
      authStore.login(response);
      toastStore.createToast({ message: "User successfully logged in", type: "success" });

      this.$router.push({ name: "home" });
    } catch (error) {
      console.log(error);
      toastStore.createToast({ message: "Invalid email or password", type: "error" });
    }
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
