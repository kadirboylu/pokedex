<template>
  <div class="filters" :class="{ show: showFilters }">
    <div class="wrapper">
      <form class="filter-form" @submit.prevent="filter">
        <div class="form-group">
          <label for="minHeight">
            {{ $t("min") }} {{ $t("height") }}
            <input id="minHeight" type="number" v-model.number="minHeight" />
          </label>
          <label for="maxHeight">
            {{ $t("max") }} {{ $t("height") }}
            <input id="maxHeight" type="number" v-model.number="maxHeight" />
          </label>
        </div>
        <div class="form-group">
          <label for="minWeight">
            {{ $t("min") }} {{ $t("weight") }}
            <input id="minWeight" type="number" v-model.number="minWeight" />
          </label>
          <label for="maxWeight">
            {{ $t("max") }} {{ $t("weight") }}
            <input id="maxWeight" type="number" v-model.number="maxWeight" />
          </label>
        </div>
        <label for="filterType">
          {{ $t("type") }}
          <input id="filterType" type="text" v-model="type" />
        </label>
        <div class="buttons">
          <button class="filter-btn" type="submit">{{ $t("filter") }}</button>
          <button class="clear-btn" @click="clearFilters" :disabled="!isFiltered">{{ $t("clear") }}</button>
        </div>
        <i class="fas fa-times" @click="filtersClose"></i>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { toastStore } from "@/store/toast.module";
import { pokemonStore } from "@/store/pokemon.module";
import { PokemonResponse } from "@/service";

@Component({
  components: {},
})
export default class FiltersSection extends Vue {
  results: PokemonResponse[] = [];
  isFiltered = false;
  minHeight = 0;
  maxHeight = 0;
  minWeight = 0;
  maxWeight = 0;
  type = "";

  get showFilters(): boolean {
    return pokemonStore.showFilters;
  }

  filtersClose() {
    pokemonStore.closeFilters();
  }

  outsideClick(e: MouseEvent) {
    if (e.target === this.$el) {
      pokemonStore.closeFilters();
    }
  }

  mounted() {
    document.addEventListener("click", this.outsideClick);
  }

  beforeDestroy() {
    document.removeEventListener("click", this.outsideClick);
  }

  clearFilters() {
    this.minHeight = 0;
    this.maxHeight = 0;
    this.minWeight = 0;
    this.maxWeight = 0;
    this.type = "";
    this.isFiltered = false;
    this.results = [];
    this.$emit("filter", this.results);

    toastStore.createToast({ message: this.$i18n.t("toast.filters.clear").toString(), type: "error" });
  }

  heightFilter() {
    if (this.minHeight > this.maxHeight) {
      toastStore.createToast({ message: this.$i18n.t("toast.filters.min_height").toString(), type: "error" });
      this.isFiltered = false;
      return;
    } else if (this.minHeight < 0 || this.maxHeight < 0) {
      toastStore.createToast({ message: this.$i18n.t("toast.filters.height_less_than_0").toString(), type: "error" });
      this.isFiltered = false;
      return;
    } else if (this.minHeight === 0 && this.maxHeight === 0) {
      return;
    }
    this.results = this.results.filter((pokemon) => pokemon.height >= this.minHeight && pokemon.height <= this.maxHeight);
    this.isFiltered = true;
  }

  weightFilter() {
    if (this.minWeight > this.maxWeight) {
      toastStore.createToast({ message: this.$i18n.t("toast.filters.min_weight").toString(), type: "error" });
      this.isFiltered = false;
      return;
    } else if (this.minWeight < 0 || this.maxWeight < 0) {
      toastStore.createToast({ message: this.$i18n.t("toast.filters.weight_less_than_0").toString(), type: "error" });
      this.isFiltered = false;
      return;
    } else if (this.minWeight === 0 && this.maxWeight === 0) {
      return;
    }

    this.results = this.results.filter((pokemon) => pokemon.weight >= this.minWeight && pokemon.weight <= this.maxWeight);
    this.isFiltered = true;
  }

  typeFilter() {
    if (this.type === "") {
      return;
    }

    this.results = this.results.filter((pokemon) => pokemon.types.filter((type) => type.type.name === this.type).length > 0);
    this.isFiltered = true;
  }

  filter() {
    this.results = pokemonStore.pokemonList;
    this.heightFilter();
    this.weightFilter();
    this.typeFilter();

    if (this.isFiltered) {
      toastStore.createToast({
        message: this.$i18n.t("toast.filters.results", [this.results.length]).toString(),
        type: "info",
      });
      this.$emit("filter", this.results);
    } else {
      this.results = [];
      this.$emit("filter", this.results);
    }
  }
}
</script>

<style lang="scss" scoped>
.filters {
  position: fixed;
  top: 0;
  left: -5000px;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  transition: all 0.3s ease-in-out;

  .wrapper {
    position: relative;
    height: 100%;
    width: 40%;
    min-width: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--color-400);
    padding: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);

    .filter-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-bottom: 20px;

      label {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;

        input {
          margin-top: 5px;
          padding: 1rem;
          outline: none;
          height: 25px;
          text-indent: 5px;
          font-size: 12.6pt;
          font-family: "Montserrat", sans-serif;
          border-radius: 5px;
          border: solid 1.5px #d3d3d3;
          transition: all 0.3s ease-in-out;

          &:focus {
            box-shadow: 0 0 1px 1px #e63e3e;
            outline-width: 0px;
          }
        }
      }

      .buttons {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 10px;

        button {
          margin: 10px;
          padding: 5px 10px;
          border-radius: 5px;
          border: none;
          background-color: var(--color-200);
          color: var(--text-color);
          font-family: "Montserrat", sans-serif;
          font-weight: 600;
          transition: all 0.3s ease-in-out;

          &:hover {
            background-color: var(--color-100);
          }

          &:active {
            transform: scale(0.95);
          }
        }

        .clear-btn {
          background-color: red;
          color: white;

          &:hover {
            background-color: #e63e3e;
          }

          &:disabled {
            background-color: #e63e3e;
            color: white;
            opacity: 0.5;
            pointer-events: none;
            cursor: not-allowed;
          }
        }
      }

      i {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
        cursor: pointer;
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
}

.form-group {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.show {
  left: 0;
}
</style>
