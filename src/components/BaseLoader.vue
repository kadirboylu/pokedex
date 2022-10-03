<template>
  <div class="base">
    <div class="loading-wrapper">
      <div class="animate-spin loading"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  width: 2.5rem;
  height: 2.5rem;
  border: 0px solid rgb(239 68 68);
  border-bottom-width: 2px;
  border-left-width: 2px;
  border-radius: 50%;
}
</style>
