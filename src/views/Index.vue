<template>
<div>
  <navbar />
  <index />
</div>
</template>

<script>
import Navbar from '@/components/navbar/index.vue';
import Index from '@/components/Index/index.vue';

export default {
  components: {
    Index,
    Navbar
  }
}
</script>
