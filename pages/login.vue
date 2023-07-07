<template></template>

<script setup lang="ts">
const authentication = useAuthentication();

onMounted(() => authentication.login("foo@bar.com", "test"));
</script>