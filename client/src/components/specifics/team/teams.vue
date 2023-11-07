<script lang="ts">
import  {ModalStore} from "../../../stores/ModalStore";
import {TeamStore} from "../../../stores/TeamStore";
import Icon from "../../generics/Icon/Icon.vue";
import {Icons} from "../../generics/Icon/Icons";

export default {
  name: "Teams",
  computed: {
    Icons() {
      return Icons
    }
  },
  components: {Icon},
  data() {
    return {
      teams: TeamStore(state => state.teams)
    }
  },
  methods: {

  },
  mounted() {
    TeamStore(state => state.getAll())
  }
}
</script>
<template>
  <div class="main-teams">
    <h1>Teams</h1>
    <div class="add-teams">
      <button type="button" class="add-button">Add</button>
    </div>
    <div class="container-teams">
      <div class="content-teams"  v-for="(team) in teams">
        <h2>{{team.name}}</h2>
        <div class="icon-eye">
          <Icon :name="Icons.IconEyeSharp" cursor-pointer class-name="eye-icon" :on-click="() => console.log('dssd')"/>
        </div>
        <div class="action-team">
          <button type="button" class="edit-button">Editer</button>
          <button type="button" class="delete-button">Supprimer</button>
        </div>
      </div>

    </div>
  </div>
</template>
<style scoped>
.main-teams {
  padding: 20px;
}
.container-teams {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}
h2 {
  text-align: center;
}
.content-teams {
  padding: 10px;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
}
.action-team {
  display: flex;
  justify-content: space-around;
}
.icon-eye {
  text-align: center;
  padding: 5px 0;
}
.eye-icon {
font-size: 2rem;
}
</style>