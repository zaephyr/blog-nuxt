<template>
    <form action="Post"></form>
  
</template>

<script>
export default {
    async asyncData({ params, $axios}) {
        const login = await $axios.$post()
    }
}
</script>

<style>

</style>