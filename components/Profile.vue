<template>
  <div class="flex flex-col sm:flex-row justify-around">
    <div
      class="sm:w-1/2 md:w-1/3 w-4/5 mx-auto mt-4 sm:mx-8 p-2 border-2 border-green-300"
    >
      <div class="block border border-grey-light  sm:w-full p-3 rounded mb-4">
        {{ getMe.username }}
      </div>
      <input
        v-model="getMe.name_first"
        type="text"
        class="block border border-grey-light w-full p-3 rounded mb-4"
        name="name_first"
        placeholder="First Name"
      />
      <input
        v-model="getMe.name_last"
        type="text"
        class="block border border-grey-light w-full p-3 rounded mb-4"
        name="name_last"
        placeholder="Last Name"
      />
      <input
        v-model="getMe.email"
        type="text"
        class="block border border-grey-light w-full p-3 rounded mb-4"
        name="email"
        placeholder="example@email.com"
      />
      <button class="btn mx-auto" @click="updateUser">
        Update
      </button>
    </div>
    <div class="flex-col sm:my-auto mx-auto mt-4 ">
      <ProfilePic
        :profile_img="getMe.profile_img"
        class="mb-2 flex
      justify-center"
      />

      <button class="btn" @click="openCloudinaryWidget">Upload image</button>
    </div>
  </div>
</template>

<script>
import ProfilePic from "./ProfilePic.vue";
export default {
  components: { ProfilePic },
  props: ["getMe"],
  data() {
    return {
      file: null,
      formData: null,
      imgUrl: null
    };
  },
  head() {
    return {
      script: [{ src: "https://widget.cloudinary.com/v2.0/global/all.js" }]
    };
  },

  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
      this.filesSelected = event.target.files.length;
    },
    async updateUser() {
      let res = await this.$axios.$patch(`users/updateMe`, {
        username: this.getMe.username,
        name_first: this.getMe.name_first,
        name_last: this.getMe.name_last,
        email: this.getMe.email
      });
      return res;
    },
    createCloudinaryWidget() {
      const newWidget = cloudinary.createUploadWidget(
        {
          cloudName: process.env.CLOUDNAME,
          uploadPreset: "ml_default",
          public_id: this.getMe.username,
          multiple: false,
          maxFiles: 1,
          cropping: true,
          croppingAspectRatio: 1,
          croppingCoordinateMode: "face",
          clientAllowedFormats: ["png", "gif", "jpeg"]
        },
        (error, result) => {
          //checking if upload was successfully done!
          if (!error && result && result.event === "success") {
            //save url to a server database, or prerform any other logic here
            const img_url = result.info.public_id;
            let res = this.$axios.patch("users/updateMe", {
              profile_img: img_url
            });
          }
        }
      );
      return newWidget;
    },
    openCloudinaryWidget() {
      const widget = this.createCloudinaryWidget();
      widget.open();
    }
  }
};
</script>
