<template>
  <div>
    <v-tabs :show-arrows="false" background-color="transparent" class="mt-3">
      <v-tab @click="tab=0">Location 1</v-tab>
      <v-tab @click="tab=1">Location 2</v-tab>
    </v-tabs>

    <v-tabs-items>
      <div v-if="tab===0">
        <div style="border: 4px dashed #e3e7eb" class="pa-2 mt-2 rounded">
          <div class="title text-uppercase font-weight-bold text-body-2 mb-2">Zone A</div>

          <!-- draggable cards -->
          <vue-draggable
            v-model="cardsA"
            :delay="sortDelay"
            v-bind="dragOptions"
            animation="250"
            class="d-flex flex-wrap"
            group="cardsGroup"
          >
            <div v-for="card in cardsA" :key="card.id" class="board-item pa-1 w-full w-lg-half">
              <machine-card :card="card"></machine-card>
            </div>
          </vue-draggable>

        </div>

        <div style="border: 4px dashed #e3e7eb" class="pa-2 mt-2 rounded">
          <div class="title text-uppercase font-weight-bold text-body-2 mb-2">Zone B</div>

          <!-- draggable cards -->
          <vue-draggable
            v-model="cardsB"
            :delay="sortDelay"
            v-bind="dragOptions"
            animation="250"
            class="d-flex flex-wrap"
            group="cardsGroup"
          >
            <div v-for="card in cardsB" :key="card.id" class="board-item pa-1 w-full w-lg-half">
              <machine-card :card="card"></machine-card>
            </div>
          </vue-draggable>

        </div>
      </div>
      <div v-if="tab===1">
        <div style="border: 4px dashed #e3e7eb" class="pa-2 mt-2 rounded">
          <div class="title text-uppercase font-weight-bold text-body-2 mb-2">Zone C</div>

          <!-- draggable cards -->
          <vue-draggable
            v-model="cardsA"
            :delay="sortDelay"
            v-bind="dragOptions"
            animation="250"
            class="d-flex flex-wrap"
            group="cardsGroup"
          >
            <div v-for="card in cardsA" :key="card.id" class="board-item pa-1 w-full w-lg-half">
              <machine-card :card="card"></machine-card>
            </div>
          </vue-draggable>

        </div>

        <div style="border: 4px dashed #e3e7eb" class="pa-2 mt-2 rounded">
          <div class="title text-uppercase font-weight-bold text-body-2 mb-2">Zone D</div>

          <!-- draggable cards -->
          <vue-draggable
            v-model="cardsB"
            :delay="sortDelay"
            v-bind="dragOptions"
            animation="250"
            class="d-flex flex-wrap"
            group="cardsGroup"
          >
            <div v-for="card in cardsB" :key="card.id" class="board-item pa-1 w-full w-lg-half">
              <machine-card :card="card"></machine-card>
            </div>
          </vue-draggable>

        </div>
      </div>
    </v-tabs-items>
  </div>
</template>

<script>
import MachineCard from '../../components/dashboard/machines/MachineCard'
import VueDraggable from 'vuedraggable'

export default {
  components: {
    MachineCard,
    VueDraggable
  },
  data() {
    return {
      tab: 0,

      // time in milliseconds to define when the sorting should start
      sortDelay: 0,

      cardsA: [{
        id: 1,
        title: 'M1',
        description: '',
        order: 0,
        state: 'RUNNING'
      }, {
        id: 2,
        title: 'M2',
        description: '',
        order: 1,
        state: 'RUNNING'
      }, {
        id: 3,
        title: 'M3',
        description: '',
        order: 2,
        state: 'MAINTENANCE'
      }, {
        id: 4,
        title: 'M4',
        description: '',
        order: 3,
        state: 'STOPPED'
      }],

      cardsB: [{
        id: 5,
        title: 'M5',
        description: '',
        order: 4,
        state: 'RUNNING'
      }, {
        id: 6,
        title: 'M6',
        description: '',
        order: 5,
        state: 'RUNNING'
      }, {
        id: 7,
        title: 'M7',
        description: '',
        order: 6,
        state: 'RUNNING'
      }, {
        id: 8,
        title: 'M8',
        description: '',
        order: 7,
        state: 'RUNNING'
      }]
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ghost {
  opacity: 0.5;
  background: var(--v-primary-lighten1) !important;
}

.board {
  display: flex;
  overflow-x: scroll;

  .board-column {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 180px;

    &-actions {
      position: absolute;
      top: 12px;
      right: 6px;
    }
  }

  .board-group {
    min-height: 100%;
  }

  .board-item {
    position: relative;
    min-height: 54px;
    transition: transform 0.2s;
    cursor: pointer;

    > a {
      display: block;
      padding: 8px;
    }

    &:hover {
      transform: translateY(-6px);
    }

    &.sortable-chosen {
      cursor: all-scroll;
    }
  }
}

.v-application--is-rtl {
  .board-column-actions {
    left: 6px;
    right: auto;
  }
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-gap: 2rem;
}
</style>
