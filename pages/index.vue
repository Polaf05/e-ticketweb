<template>
<div class="testbox">
      <form @submit.prevent='send'>
        <h1>Complaint Form</h1>
        <p>Please send us details about the incident you would like to report. Our Complaint Center will analyze your complaint and take the appropriate measures in order that the reported situation will not occur at any other time in the future.</p>
        <hr/>
        
        <div class="item">
          <p>Name</p>
          <input type="text" name="name" placeholder="Last Name, First Name M.I" v-model="name" required/>
        </div>
        <div class="item">
          <p>Email</p>
          <input type="text" name="email" placeholder="ex: myname@example.com" v-model="email" required/>
        </div>
        <div class="item">
          <p>Department</p>
          <input type="text" name="department" v-model="department" required/>
        </div>
        <div class="item">
          <p>Computer ID</p>
          <input type="text" name="computer_ID" accept=".jpg,.jpeg" v-model="computer_ID" required/>
        </div>
         <div class="item">
          <p>Upload Screenshot</p>
          <input type="file" name="name" accept=".jpg,.jpeg,.png" @change="processFile($event)" required/>
        </div>
       
        <div class="item complaint-details">
          <p>Describe the Problem</p>
          <div class="complaint-details-item">
            <textarea rows="5" v-model="complaint" required></textarea>
          </div>
        </div>
       
        <div class="btn-block">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
    
</template>

<script>

import firebase from "firebase/app"
import "firebase/firestore"
import 'firebase/storage'
import {db} from '~/plugins/firebase.js'

export default {
  
    data(){
      return{
        name: "",
        email: "",
        department: "",
        computer_ID: "",
        screenshot_link: "",
        complaint: "",
        file: ""
      }
    },
    methods:{
    
      processFile(event) {
        this.file = event.target.files[0]
        console.log(this.file);
      },

      uploadImage(){

        let file = this.file
        console.log('here: ' + file.name)
        var storageRef = firebase.storage().ref('Screenshots/' + file.name);
        let uploadTask = storageRef.put(file)
        
        uploadTask.on('state_changed', (snapshot) =>{
        }, (error) =>{
            console.log(error)
        }, () =>{
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                this.screenshot_link = downloadURL
                this.uploadData()
            });
        });
      },

      uploadData(){
        db.collection("Requests")
        .add({
          name: this.name,
          email: this.email,
          department: this.department,
          computer_ID: this.computer_ID,
          screenshot_link: this.screenshot_link,
          complaint: this.complaint,
          ticket: "",
          is_new_request: true,
          is_ongoing_request: false,
          is_done_request: false
        })
        .then((docRef)=>{
              console.log('Document written: ', docRef.id)
              alert('Your report is successfully sent')
              
              //updates ticket id to the document
              let document = docRef.id
              db.collection('Requests').doc(document)
              .update({
                ticket: document
              })
              .then(()=>{
                console.log('Updated ticket ID: ' + document)
              })
              .catch((error)=>{
                console.log(error)
              })
        })
        .catch((error)=>{
          console.log(error)
        })

      },

      send(){
        this.uploadImage()        
      }


    },
}
</script>

<style>
    html, body {
      min-height: 100%;
      }
      body, div, form, input, select, p { 
      padding: 0;
      margin: 0;
      outline: none;
      font-family: Roboto, Arial, sans-serif;
      font-size: 14px;
      color: #666;
      line-height: 22px;
      }
      h1 {
      margin: 15px 0;
      font-weight: 400;
      }
      h4 {
      margin-bottom: 4px;
      }
      .testbox {
      display: flex;
      justify-content: center;
      align-items: center;
      height: inherit;
      padding: 3px;
      }
      form {
      width: 100%;
      padding: 20px;
      background: #fff;
      box-shadow: 0 2px 5px #ccc; 
      }
      input, select, textarea {
      width: 100%;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
      }
      input {
      width: calc(100% - 10px);
      padding: 5px;
      }
      input:hover, textarea:hover, select:hover {
      outline: none;
      border: 1px solid #095484;
      }
      select {
      padding: 7px 0;
      background: transparent;
      }
      textarea {
      margin-bottom: 3px;
      }
      .item {
      position: relative;
      display: flex;
      flex-direction: column;
      margin: 10px 0;
      }
      input[type="date"]::-webkit-inner-spin-button {
      display: none;
      }
      .item i, input[type="date"]::-webkit-calendar-picker-indicator {
      position: absolute;
      font-size: 20px;
      color: #a9a9a9;
      }
      .item i {
      left: 94%;
      top: 30px;
     z-index: 1;
      }
      [type="date"]::-webkit-calendar-picker-indicator {
      left: 93%;
      z-index: 2;
      opacity: 0;
      cursor: pointer;
      }
      .street, .desired-outcome-item, .complaint-details-item {
      display: flex;
      flex-wrap: wrap;
      }
      .street input {
      margin-bottom: 10px;
      }
      small {
      display: block;
      line-height: 16px;
      opacity: 0.7;
      }
      .btn-block {
      margin-top: 20px;
      text-align: center;
      }
      button {
      width: 150px;
      padding: 10px;
      border: none;
      -webkit-border-radius: 5px; 
      -moz-border-radius: 5px; 
      border-radius: 5px; 
      background-color: #095484;
      font-size: 16px;
      color: #fff;
      cursor: pointer;
      }
      button:hover {
      background-color: #0666a3;
      }
      @media (min-width: 568px) {
      input {
      width: calc(35% - 20px);
      margin: 0 0 0 8px;
      }
      select {
      width: calc(50% - 8px);
      margin: 0 0 10px 8px;
      }
      .item {
      flex-direction: row;
      align-items: center;
      }
      .item p {
      width: 30%;
      }
      .item i {
      left: 61%;
      top: 25%;
      }
      [type="date"]::-webkit-calendar-picker-indicator {
      left: 60%;
      }
      .street, .desired-outcome-item, .complaint-details-item {
      width: 70%;
      }
      .street input {
      width: calc(50% - 20px);
      }
      .street .street-item {
      width: 100%;
      }
      .address p, .desired-outcome p, .complaint-details p {
      align-self: flex-start;
      margin-top: 6px;
      }
      .desired-outcome-item, .complaint-details-item {
      margin-left: 12px;
      }
      textarea {
      width: calc(100% - 6px);
      }
      }
</style>
