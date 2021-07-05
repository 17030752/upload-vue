<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="progress container-fluid">
 <progress :value="uploadValue" class="progress-bar progress-bar-striped" role="progressbar" style="width: 10%" 
 v-bind:aria-valuenow="uploadValue" aria-valuemin="0" aria-valuemax="100" progressbar> % </progress>
    </div>
    <input type="file" @change="onFileSelected" class="form-control" accept="image/jpeg,image/png,application/pdf">
    <button @click="onUpload">send</button>
    <div class="container-fluid">
<iframe :src="picture" style="width:600px; height:500px;" frameborder="0"></iframe>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import firebase from 'firebase'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
    selectedFile : null,
    uploadValue:0,
    picture:null,
    extension:"",
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile)
      var str = this.selectedFile.type;
      var inicio = str.search("/");
      var final = str.length;
      this.extension = str.slice(inicio+1,final)
     console.log(this.extension)
    },
    onUpload(){
      var n = Date.now();
      var storageRef = firebase.storage().ref(`/imagenes/${n}.${this.extension}`);;
      if(this.selectedFile.type=="application/pdf"){
       storageRef = firebase.storage().ref(`/documentos/${n}.${this.extension}`);
      }

const task = storageRef.put(this.selectedFile);
task.on(`state_changed`,snapshot=>{
  let percentage =(snapshot.bytesTransferred/snapshot.totalBytes)*100;
  this.uploadValue=percentage;
},error=>{console.log(error.message)},
  ()=>{this.uploadValue=100;
  //downloadUrl
  task.snapshot.ref.getDownloadURL().then((url)=>{
    this.picture=url;
    console.log(this.picture)
  });
  });
}
    }
}
</script>
