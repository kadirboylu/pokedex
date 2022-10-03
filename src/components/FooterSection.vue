<template>
  <footer>
    <span>
      See the source code on
      <a href="https://github.com/kadirboylu/pokedex" target="_blank">
        <i class="fa-brands fa-github"></i>
      </a>
    </span>
    <a href="https://www.linkedin.com/in/kadirboylu/" target="_blank">KADİR BOYLU</a>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  background-color: var(--color-400);
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1.5rem;
  padding: 0.5rem 0.25rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;

  span {
    display: flex;
    align-items: center;
    margin-right: auto;

    a {
      margin: 0 0.5rem;
      font-weight: 700;
      transition: all 0.3s ease-in-out;

      &:hover {
        opacity: 60%;
      }
    }
  }

  a {
    margin: 0 0.5rem;
    font-weight: 700;
    transition: all 0.3s ease-in-out;

    &:hover {
      opacity: 80%;
    }
  }
}
</style>
