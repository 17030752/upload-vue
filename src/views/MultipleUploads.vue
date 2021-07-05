<template>
<div class="field">
  <form enctype="multipart/from-data" @submit.prevent="sendFile">
<div v-if="message"  :class="`message ${error ? 'is-danger': 'is-success'}`">
  <div class="message-body">{{message}}</div>
</div>
<div class="field">
<div class="file is-boxed is-primary">
    <label for="file" class="label">Upload field</label>
  <input multiple type="file" @change="selectFile" ref="files">
</div>
</div>
<div class="field">
<button class="button is-info">send</button>
  </div>
  
</form>
  <div v-for="(file,index) in files" :key="index"
  :class="`level ${file.invalidMessage && 'has-text-danger'}`" 
  
  >
    <div class="level-left">
      <div class="level-item">
        {{file.name}}
        <span v-if="file.invalidMessage">&nbsp;-{{file.invalidMessage}}</span>
        </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <a class="delete" @click.prevent="files.splice(index,1);uploadFiles.splice(index,1)"></a>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import axios from "axios";
import _ from 'lodash';
  export default {
    
    name:'MultipleUploads',
    data() {
      return {
        files:[],
        uploadFiles:[],
        message:"",
        error:false
      }
    },
    methods: {
        selectFile(){
        const files = this.$refs.files.files;
        // this.files =[...this.files, ...files];
        this.uploadFiles=[...this.uploadFiles, ...files];
        this.files=[...this.files,
        ..._.map(files,file => ({
          name: file.name,
          size: file.size,
          type:file.type,
          invalidMessage: this.validate(file)
        }))
        ];
        },
        validate(file){
          const allowedTypes =["image/jpeg","image/png","image/gif","video/mp4"];
          const MAX_SIZE = 500000;
          if (file.size > MAX_SIZE) {
            return `max size:${MAX_SIZE/1000}kb`;
          }
          if (!allowedTypes.includes(file.type)) {
            return "not an image";
          }
          return "";
        },
        async sendFile(){
      const formData =new FormData();
      _.forEach(this.uploadFiles,file =>{
        if (this.validate(file) === "") {
          formData.append('files',file);
        }
      });
      try {
         await axios.post('/multiple',formData)
         this.message="files has been uploaded";
        this.files=[];
        this.uploadFiles =[];
      } catch (err) {
        this.message= err.response.data.error;
        this.error = true; 
      }
        }
      },
    
  }
</script>

<style scoped>

</style>