<template>
  <h2>vue-webpack-tmpl</h2>
  <img :src="smallImg" alt="小于10kb的图片" />
  <img :src="bigImg" alt="大于于10kb的图片" />
  <!-- 小图片背景容器 -->
  <div className="smallImg"></div>
  <!-- 大图片背景容器 -->
  <div className="bigImg"></div>
</template>

<script setup lang="ts">
import "@/App.less";
import bigImg from "@/assets/imgs/22kb.png";
import smallImg from "@/assets/imgs/5kb.png";
</script>
<style scoped></style>
