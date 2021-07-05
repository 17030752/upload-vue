<template>
<form enctype="multipart/from-data" @submit.prevent="sendFile">
<div v-if="message"  :class="`message ${error ? 'is-danger': 'is-success'}`">
  <div class="message-body">{{message}}</div>
</div>
<div class="field">
<div class="file is-boxed is-primary">
    <label for="file" class="label">Upload field</label>
  <input type="file" @change="selectFile" ref="file">
</div>
</div>
<div class="field">
<button class="button is-info">send</button>
  </div>
  
</form>
</template>

<script>
import axios from "axios";
  export default {
    
    name:'SimpleUpload',
    data() {
      return {
        file:"",
        message:"",
        error:false
      }
    },
    methods: {
        selectFile(){
          const file = this.$resf.file.files[0];
          const allowedTypes =["image/jpeg","image/png","image/gif","video/mp4"];
          const MAX_SIZE = 500000;
          const tooLarge = file.size > MAX_SIZE;
          if (allowedTypes.includes(file.type) && !tooLarge) {
            this.file = file;
            this.error = false;
            this.message ="";
          }else{
            this.error = true;
            this.message = tooLarge ? `Too large: max size is ${MAX_SIZE/1000}kb`:"only images are allowed";
          }
        },
        async sendFile(){
          const formData = new FormData();
          formData.append('file',this.file)
          await axios.post('/upload',formData)
          .then(res => {
            console.log(res)
            this.message="file has upload sucessfully";
            this.error=false;
          })
          .catch(err => {
            console.error(err); 
            this.message= err.response.data.error;
            this.error=true;
          })
        }
      },
    
  }
</script>

<style scoped>

</style>