<template>
  <div class="about">
    <h1>{{ $t('about.body') }}</h1>
  </div>
</template>
<script>
import dummyModule from '@/store/modules/dummy';

export default {
  created() {
    this.$store.registerModule('dummy', dummyModule);
  },
};
</script>
