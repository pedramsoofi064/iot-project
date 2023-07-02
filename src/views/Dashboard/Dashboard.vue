<template>
  <section class="dashboard">
  
    <div class="dashboard__view">
      <SidebarComponent  />
      <div class="dashboard__main">
        <router-view />
      </div>
    </div>



  </section>
</template>

<script src="./Dashboard.js">
</script>

<style lang="scss" src="./Dashboard.scss">
</style>