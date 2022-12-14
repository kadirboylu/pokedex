<template>
  <div v-if="!user" class="signup">
    <form @submit.prevent="signup">
      <div class="form-control">
        <label for="username">{{ $t("username") }}</label>
        <input type="text" id="username" v-model="username" />
        <p v-if="usernameError" class="error">{{ usernameError }}</p>
      </div>
      <div class="form-control">
        <label for="email">{{ $t("email") }}</label>
        <input type="email" id="email" v-model="email" />
        <p v-if="emailError" class="error">{{ emailError }}</p>
      </div>
      <div class="form-control">
        <label for="password">{{ $t("password") }}</label>
        <input :type="passwordType" id="password" v-model="password" />
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
        <i
          class="show-password"
          :class="{ 'fa-regular fa-eye': passwordType === 'password', 'fa-regular fa-eye-slash': passwordType === 'text' }"
          @click="showPassword1()"
        ></i>
      </div>
      <div class="form-control">
        <label for="password2">{{ $t("password") }}</label>
        <input :type="password2Type" id="password2" v-model="password2" />
        <p v-if="password2Error" class="error">{{ password2Error }}</p>
        <i
          class="show-password"
          :class="{ 'fa-regular fa-eye': password2Type === 'password', 'fa-regular fa-eye-slash': password2Type === 'text' }"
          @click="showPassword2()"
        ></i>
      </div>
      <div class="form-control">
        <label for="profile-picture">
          {{ $t("sign_up_form.profile_picture") }}
          <div id="display-image">
            <img v-if="image" :src="image" alt="" />
            <p v-else>{{ $t("sign_up_form.choose_img") }}</p>
          </div>
        </label>
        <input type="file" id="profile-picture" accept="image/jpeg, image/png, image/jpg" @input="handleImage" />
        <p v-if="!image" class="error">{{ profilePictureError }}</p>
      </div>
      <button class="btn" type="submit" :disabled="!validated">{{ $t("sign_up") }}</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { toastStore } from "@/store/toast.module";
import { registerUser } from "@/service";
import { strapiStore } from "@/store/strapi.module";
import { User } from "@/service";

@Component({
  components: {},
})
export default class SignUpView extends Vue {
  username = "";
  email = "";
  password = "";
  passwordType = "password";
  password2 = "";
  password2Type = "password";
  image = "";

  created() {
    if (strapiStore.user) {
      this.$router.push({ name: "home" });
    }
  }

  get user(): User | null {
    return strapiStore.user;
  }

  handleImage(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result;
        this.image = base64 as string;
      };
    }
  }

  showPassword1() {
    this.passwordType = this.passwordType === "password" ? "text" : "password";
  }

  showPassword2() {
    this.password2Type = this.password2Type === "password" ? "text" : "password";
  }

  get usernameError(): string {
    const regex = /^[a-zA-Z0-9]{3,10}$/;

    if (!this.username) {
      return this.$i18n.t("sign_up_form.username_required").toString();
    } else if (this.username.length < 3) {
      return this.$i18n.t("sign_up_form.username_min").toString();
    } else if (this.username.length > 10) {
      return this.$i18n.t("sign_up_form.username_max").toString();
    } else if (!regex.test(this.username)) {
      return this.$i18n.t("sign_up_form.username_alphanumeric").toString();
    } else {
      return "";
    }
  }

  get emailError(): string {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!this.email) {
      return this.$i18n.t("sign_up_form.email_required").toString();
    } else if (!regex.test(this.email)) {
      return this.$i18n.t("sign_up_form.email_invalid").toString();
    } else {
      return "";
    }
  }

  get passwordError(): string {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*/.?&])[A-Za-z\d@$!./%*?&]{8,}$/;

    if (!this.password) {
      return this.$i18n.t("sign_up_form.password_required").toString();
    } else if (!regex.test(this.password)) {
      return this.$i18n.t("sign_up_form.password_invalid").toString();
    } else {
      return "";
    }
  }

  get password2Error(): string {
    if (this.password2 !== this.password) {
      return this.$i18n.t("sign_up_form.passwords_not_match").toString();
    } else {
      return "";
    }
  }

  get profilePictureError(): string {
    if (!this.image) {
      return this.$i18n.t("sign_up_form.img_required").toString();
    } else {
      return "";
    }
  }

  get validated(): boolean {
    if (this.usernameError || this.emailError || this.passwordError || this.password2Error || this.profilePictureError) {
      return false;
    } else {
      return true;
    }
  }

  async signup() {
    try {
      const response = await registerUser(this.username, this.email, this.password, [], [], this.image);
      strapiStore.login(response);
      toastStore.createToast({
        message: this.$i18n.t("toast.signup_view.success").toString(),
        type: "success",
      });
      this.$router.push({ name: "home" });
    } catch (error) {
      const err = (error as Error).message;
      toastStore.createToast({ message: err, type: "error" });
    }
  }
}
</script>

<style lang="scss" scoped>
.signup {
  width: 100%;
  min-height: 80vh;
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

#display-image {
  max-width: 320px;
  margin-top: 1rem;
  padding: 2rem;
  border-radius: 10px;
  background-color: var(--color-300);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    height: 100px;
    max-width: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
}

input[type="file"] {
  display: none;
}
</style>
