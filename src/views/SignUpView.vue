<template>
  <div class="signup">
    <form @submit.prevent="signup">
      <div class="form-control">
        <label for="name">Name</label>
        <input type="text" id="Name" v-model="name" />
        <p v-if="nameError" class="error">{{ nameError }}</p>
      </div>
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
      <button class="btn" type="submit" :disabled="!validated">Sign Up</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { toastStore } from "@/store/toast.module";

@Component({
  components: {},
})
export default class SignUpView extends Vue {
  name = "";
  email = "";
  password = "";
  validated = false;

  get nameError(): string {
    if (!this.name) {
      this.validated = false;
      return "Name is required";
    } else {
      this.validated = true;
      return "";
    }
  }

  get emailError(): string {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!this.email) {
      this.validated = false;
      return "Email is required";
    } else if (!regex.test(this.email)) {
      this.validated = false;
      return "Email is not valid (johndoe@example.com)";
    } else {
      this.validated = true;
      return "";
    }
  }

  get passwordError(): string {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!this.password) {
      this.validated = false;
      return "Password is required";
    } else if (!regex.test(this.password)) {
      this.validated = false;
      return "Password is not valid (min 8 characters, 1 uppercase, 1 lowercase, 1 number)";
    } else {
      this.validated = true;
      return "";
    }
  }

  signup(): void {
    toastStore.createToast({ message: "User signed up successfully", type: "success" });
  }
}
</script>

<style lang="scss" scoped>
.signup {
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
      background-color: rgb(190, 38, 18);
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

      &:disabled {
        opacity: 0.5;
        pointer-events: none;
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
