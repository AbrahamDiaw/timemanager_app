<script>

import {Components} from "../../_components/Components";
import {Icons} from "../../generics/Icon/Icons";
import Icon from "../../generics/Icon/Icon.vue";
import {ModalStore} from "../../../stores/ModalStore";
import {TeamService} from "../../../services/TeamService";
import {TeamStore} from "../../../stores/TeamStore";

const teamService = new TeamService();

export default {
    name: "AddTeam",

    computed: {
        Components() {
            return Components
        },
        Icons() {
            return Icons
        }
    },

    components: {Icon},

    data() {
        return {
            name: '',
            disabled: false
        }
    },

    methods: {
        ModalStore,

        addTeam(event) {
            event.preventDefault();

            if (this.name.trim().length > 0) {
                this.disabled = true;

                teamService.add({name: this.name}).then(async (response) => {
                    const jsonResponse = await response.json();
                    if (response.ok) {
                        TeamStore(state => state.add(jsonResponse.data));
                    }
                }).finally(() => {
                    this.disabled = false;
                    ModalStore(modalStore => modalStore.closeModal());
                })
            }
        }
    },

    mounted() {

    }
}

</script>

<template>
  <form @submit.prevent="addTeam" class="form">
      <div class="form-field-container">
          <div class="form-field">
            <input class="form-input" v-model="name" type="text" placeholder="Name">
          </div>
      </div>

      <button class="form-button" type="submit" :disabled="disabled">Submit</button>
  </form>
</template>

<style scoped>

</style>
