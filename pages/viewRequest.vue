<template>
  <div>
    <div class="testbox">
      <form @submit.prevent="updateRequest">
        <h1>Complaint Form</h1>
        <hr/>
        
        <div class="item">
          <p>Name</p>
          <input type="text" name="name" :value="name" readonly/>
        </div>
        <div class="item">
          <p>Email</p>
          <input type="text" name="email" :value="email" readonly/>
        </div>
        <div class="item">
          <p>Department</p>
          <input type="text" name="department" :value="department" readonly/>
        </div>
        <div class="item">
          <p>Computer ID</p>
          <input type="text" name="computer_ID" :value="computerID" readonly/>
        </div>
       
        <div class="item complaint-details">
          <p>Problem</p>
          <div class="complaint-details-item">
            <textarea rows="5" :value="description" readonly></textarea>
          </div>
        </div>
       
       <div class="item">
         <p>Complaint Screenshot</p>
         <a :href="image" target="_POST">{{image}}</a>
       </div>
       
        <div class="btn-block">
          <button type="submit">Mark as Complete</button>
          <button type="button" onclick="history.go(0)"> Back! </button>
        </div>
      </form>
      </div>
    </div>
</template>

<script>
import firebase from "firebase/app"
import "firebase/firestore"
import emailjs from 'emailjs-com'
    
export default {

    props:['ticketId'],

    data(){
        return{
            name:"",
            email:"",
            department:"",
            computerID:"",
            image:"",
            description:"",
            ticket:'',
            id:""
        }
    },
    mounted(){
        firebase.firestore().collection('Requests').where("ticket","==",this.ticketId).get().then(snapshot => {
            snapshot.docs.forEach(docs => {
                this.name = docs.data().name;
                this.email = docs.data().email;
                this.department = docs.data().department;
                this.computerID = docs.data().computer_ID;
                this.image = docs.data().screenshot_link;
                this.description = docs.data().complaint;
                this.id = docs.id;

                firebase.firestore().collection("Requests").doc(this.id).update({
                  is_ongoing_request: true,
                }).then(function() {
                  console.log("Document successfully updated!");
                  
                })
                .catch(function(error) {
                    console.error("Error updating document: ", error);
                });



            })
        }).catch(function(error) {
        console.log("Error getting documents: ", error);
        });
      
        
  },

  methods:{
    updateRequest(){
      //notifies the user via email about the completion report
      this.notifyUser()
      
      firebase.firestore().collection("Requests").doc(this.id).update({
        is_done_request: true,
        is_ongoing_request: false,
        is_new_request:false,
      }).then(function() {
        console.log("Document successfully updated!");
        
      })
      .catch(function(error) {
          console.error("Error updating document: ", error);
      });

      
    },
    notifyUser(){
       emailjs.send('service_v84ih4u', 'template_ev0sro6', {
          to_name: this.name,
          to_email: this.email,
          ticket_ID: this.ticket_ID,
          complaint: this.complaint
          }, 'user_sEKOlCjvi7BXc4HSE3Ovz')
          .then((result) => {
              console.log('SENT SUCCESS!', result.status, result.text);
              history.go(0);
          }, (error) => {
              console.log('SENT FAILED...', error);
          });
      }

  },
     
}

</script>

<style scoped>
    html, body {
      min-height: 100%;
      }
      body, div, form, input, select, p { 
      padding: 0;
      margin: 0;
      outline: none;
      font-family: Roboto, Arial, sans-serif;
      font-size: 14px;
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
      background: #FFFFFF;
      max-width: 80%;
      margin: 20px auto 20px;
      padding: 40px;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
      }
      input, select, textarea {
      width: 100%;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
      cursor: default;
      color: rgb(151, 151, 151);
      }
      input {
      width: calc(100% - 10px);
      padding: 5px;
      }
      input:hover, textarea:hover, select:hover {
      outline: none;
      border: 1px solid rgba(21, 20, 72, 1);
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
      background-color: rgba(21, 20, 72, 1);
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      }
      button:hover {
      background-color: rgba(17, 47, 75, 1);
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