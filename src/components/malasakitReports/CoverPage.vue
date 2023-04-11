<template>
  <div id="header" class="header">
    <div class="hItem logo">logo</div>
    <div class="hItem banner">banner</div>
    <div class="hItem doctitle">doctitle</div>
    <div class="hItem docdets">
      <div class="regno">regno</div>
      <div class="regno">value</div>
      <div class="revno">revo</div>
      <div class="revno">value</div>
      <div class="redno">date</div>
      <div class="redno">value</div>
    </div>
    <!-- <div class="hItem regno">regno</div>
    <div class="hItem revno">revno</div>
    <div class="hItem docdate">docdate</div> -->
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
.header {
  display: grid;
  height: 150px;
  grid-template-columns: 150px 2fr 1fr 1fr;
}
.hItem {
  background-color: lightslategray;
  border: 1px solid;
}
.logo {
  grid-row: 1 / span 3;
}
.banner {
  grid-column: 2 / 5;
  /* height: 150%; */
  height: 1fr;
}
.doctitle {
  grid-column: 2 / span 2;
  grid-row: 2 / span 2;
  height: 1fr;
}

.docdets {
  display: grid;
  align-content: auto;
  grid-template-columns: 1fr 1fr;
}
</style>