<template>
  <div>
    <!-- menu level 1 -->
    <nav-menu-item v-for="(level1Item, level1Index) in menuForRoles" :key="level1Index" :menu-item="level1Item">

      <template v-if="level1Item.items">
        {{ level1Item.text }}
        <!-- menu level 2 -->
        <nav-menu-item
          v-for="(level2Item, level2Index) in level1Item.items"
          :key="level2Index"
          :menu-item="level2Item"
          subgroup
          small
        >
          <template v-if="level2Item.items">

            <!-- menu level 3 -->
            <nav-menu-item
              v-for="(level3Item, level3Index) in level2Item.items"
              :key="level3Index"
              :menu-item="level3Item"
              small
            />
          </template>
        </nav-menu-item>
      </template>
    </nav-menu-item>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavMenuItem from './NavMenuItem'

/*
|---------------------------------------------------------------------
| Navigation Menu Component
|---------------------------------------------------------------------
|
| Multi-layer navigation menu
|
| menu: [{ text: 'Menu Levels',
|    items: [
|      { text: 'Menu Levels 2.1' },
|      { text: 'Menu Levels 2.2',
|        items: [
|          { text: 'Menu Levels 3.1' },
|          { text: 'Menu Levels 3.2' }
|        ]
|      }
|    ]
|  }]
|
*/
export default {
  components: {
    NavMenuItem
  },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState({
      role: (state) => state.auth.user.role
    }),
    menuForRoles() {
      return this.menu.filter((menu_item) => {
        return menu_item.visibleFor ? menu_item.visibleFor.includes(this.role) : true
      })
    }
  }
}
</script>
