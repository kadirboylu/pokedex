<template>
  <div @mouseleave="closeGroups">
    <i class="fas fa-star" @click="toggleGroups"></i>
    <div class="groups" :class="{ show: showGroups }">
      <div class="group-wrapper">
        <div class="group" v-for="group in groups" :key="`${pokemon.name}-${group}`">
          <div class="group-name">{{ group }}</div>
          <div class="operations">
            <i v-if="!findPokemonInFavorites || findPokemonInFavorites?.group !== group" class="fa-solid fa-plus" @click="addToFavorites(group)"></i>
            <i v-if="findPokemonInFavorites?.group === group" class="fa-solid fa-times" @click="removeFromFavorites"></i>
            <i class="fa-solid fa-trash-can" @click="deleteGroup(group)"></i>
          </div>
        </div>
      </div>
      <form @submit.prevent="addNewGroup" class="add-new-group">
        <input type="text" v-model="inputValue" :placeholder="placeHolder" />
        <button class="fas fa-plus"></button>
      </form>
      <i class="fa-solid fa-times close" @click="toggleGroups"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { strapiStore } from "@/store/strapi.module";
import { PokemonResponse, Favorites } from "@/service";
import { toastStore } from "@/store/toast.module";

@Component
export default class GroupSelection extends Vue {
  @Prop({ required: true }) pokemon!: PokemonResponse;

  inputValue = "";
  showGroups = false;

  get placeHolder(): string {
    return this.$t("add_new_group").toString();
  }

  get groups(): string[] | undefined {
    return strapiStore.user?.groups;
  }

  get favorites(): Favorites[] | undefined {
    return strapiStore.user?.favorites;
  }

  get findPokemonInFavorites(): Favorites | undefined {
    return this.favorites?.find((favorite) => favorite.name === this.pokemon.name);
  }

  filterFavorites(group: string): Favorites[] {
    if (this.favorites) {
      return this.favorites.filter((favorite) => favorite.group === group);
    } else {
      return [];
    }
  }

  toggleGroups() {
    this.showGroups = !this.showGroups;
  }

  closeGroups() {
    this.showGroups = false;
  }

  async addNewGroup() {
    if (this.inputValue) {
      await strapiStore.addNewGroup(this.inputValue);
      this.inputValue = "";
    } else {
      toastStore.createToast({ message: this.$i18n.t("toast.group_selection.empty_group").toString(), type: "error" });
    }
  }

  async deleteGroup(group: string) {
    const fav = this.filterFavorites(group);

    if (fav) {
      const promises = fav.map((favorite) => strapiStore.removeFromFavorites(favorite));
      await Promise.all(promises);

      await strapiStore.removeGroup(group);
    } else {
      await strapiStore.removeGroup(group);
    }
  }

  async addToFavorites(group: string) {
    if (this.findPokemonInFavorites) {
      await this.removeFromFavorites();
      strapiStore.addToFavorites({ name: this.pokemon.name, group: group });
    } else {
      strapiStore.addToFavorites({ name: this.pokemon.name, group: group });
    }
  }

  async removeFromFavorites() {
    if (this.findPokemonInFavorites) {
      await strapiStore.removeFromFavorites(this.findPokemonInFavorites);
    }
  }
}
</script>

<style lang="scss" scoped>
.fa-star {
  color: #f1c40f;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
}
.groups {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, var(--card-color-from), var(--card-color-to));
  border-radius: 50px 0 50px 0;
  z-index: 9999;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease-in;

  .close {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }

  .group-wrapper {
    width: 90%;
    height: 200px;
    overflow-y: auto;
    padding: 1rem 0;
    margin-top: 3px;
    border-radius: 50px 0 0 0;
  }
  .group {
    display: flex;
    align-items: center;
    padding: 0.25rem 1rem;
    justify-content: space-between;
    margin-bottom: 1rem;
    border-bottom: 1px solid whitesmoke;

    .group-name {
      overflow: hidden;
      text-overflow: ellipsis;
      transition: all 0.3s ease-in-out;

      &:hover {
        opacity: 0.8;
      }
    }

    .operations {
      display: flex;
      align-items: center;
      justify-content: center;

      .fa-trash-can {
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
          opacity: 0.8;
        }
      }

      .fa-plus,
      .fa-times {
        margin-right: 0.5rem;
        cursor: pointer;
        font-size: 16px;
        width: 20px;
        text-align: center;
        transition: all 0.3s ease-in-out;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .add-new-group {
    position: absolute;
    bottom: 5px;
    left: 5px;
    display: flex;
    align-items: center;
    margin-top: 1rem;
    cursor: pointer;

    input {
      padding: 0.25rem;
      margin-right: 0.5rem;
      width: 140px;
      font-family: "Montserrat", sans-serif;
      border: 1px solid #ccc;
      border-radius: 4px;
      outline: none;
      transition: all 0.3s ease-in-out;

      &:focus {
        box-shadow: 0 0 1px 1px #e63e3e;
      }
    }

    .fa-plus {
      background-color: transparent;
      border: none;
      outline: none;
      color: whitesmoke;
      font-size: 1.1rem;
      transition: all 0.3s ease-in-out;

      &:hover {
        opacity: 0.8;
      }

      &:active {
        transform: scale(0.8);
      }
    }
  }
}

.show {
  visibility: visible;
  opacity: 1;
}
</style>
