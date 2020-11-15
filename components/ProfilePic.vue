<template>
  <cld-image :publicId="profile_img" alt="no profile img">
    <cld-transformation
      radius="max"
      width="65"
      crop="fill"
      gravity="face"
      loading="lazy"
    />
  </cld-image>
</template>

<script>
export default {
  props: ["profile_img"]
};
</script>

<style></style>
