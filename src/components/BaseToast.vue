<template>
  <div class="toasts">
    <div v-for="(toast, index) in toasts" :key="index" class="toast" :class="toast.type">
      <div class="toast__icon">
        <i v-if="toast.type === 'success'" class="fas fa-check"> </i>
        <i v-if="toast.type === 'error'" class="fas fa-times"> </i>
        <i v-if="toast.type === 'info'" class="fas fa-info"> </i>
      </div>
      <div class="toast__content">
        <p>{{ toast.message }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { toastStore } from "@/store/toast.module";

@Component({
  components: {},
})
export default class BaseToast extends Vue {
  get toasts() {
    return toastStore.toast;
  }
}
</script>

<style lang="scss" scoped>
.toasts {
  position: fixed;
  bottom: 20px;
  right: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1rem;
  transition: all 0.3s ease-in-out;

  .toast {
    right: -500px;
    width: 300px;
    margin-bottom: 1rem;
    margin-left: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background-color: var(--color-400);
    color: whitesmoke;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    animation: slide 0.5s forwards;

    &.success {
      background-color: #4caf50;
    }

    &.error {
      background-color: #f44336;
    }

    &.info {
      background-color: #2196f3;
    }

    .toast__icon {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 1rem;
    }

    .toast__content {
      flex: 1;
      p {
        margin: 0;
      }
    }

    .toast__close {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}

@keyframes slide {
  100% {
    right: 0;
  }
}
</style>
