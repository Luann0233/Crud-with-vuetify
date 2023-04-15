<template>
  <v-app dark>
    <!-- LeftBar -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- TopBar -->
    <v-app-bar
      fixed
      app
    >
      <!-- Icone Exbi/Oculta LeftBar -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',

  data () {
    return {
      drawer: false,
      title: 'CRUD-ONFLY',
      items: [
        {
          icon: 'mdi-apps',
          title: 'Usuários',
          to: '/'
        }
      ]
    }
  }
}
</script>
