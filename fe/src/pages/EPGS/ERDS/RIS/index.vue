<template>
  <d2-container>
    <template slot="header">

    </template>
    <h1>Hola Alice.</h1>
    <template slot="footer">
      <div class="footer">
      <div class="copyright">
        Designed by <a href="https://www.ezhq.xyz" target="_blank">ezhq</a> in China | Template by <a href="https://github.com/d2-projects/d2-admin" target="_blank">D2 Admin</a>
      </div>

      </div>
    </template>
  </d2-container>
</template>
<style lang="scss" scoped>
  a {
    color: rgba(183, 205, 226, 1);
    font-size: 12px;
    font-weight: bold;
  }
  .footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .copyright {
    /*border: 2px solid limegreen;*/
    color: rgba(183, 205, 226, 1);
    font-size: 14px;
  }
</style>
