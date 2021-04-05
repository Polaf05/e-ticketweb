<template >
    <div class="body">    
        <div v-if="tab == 0" class="table">
            <h2>Request Table</h2> 
            <br>
             <div class="item">
                <p>Ticket ID:</p> <input type="text" name="ticket_ID" v-model="ticket_ID_search" required/>
            </div>
            <div class="btn-block">
                <button @click="search">Search</button>
            </div>
            <no-ssr>
            <table id="customers">
                <tr>
                    <th>Ticket ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Computer ID</th>
                    <th>Others...</th>
                </tr>
                
                <tr v-for="(req,index) in request" :key="index">
                    <td>{{req.ticket}}</td>
                    <td>{{req.name}}</td>
                    <td>{{req.email}}</td>
                    <td>{{req.department}}</td>
                    <td>{{req.computer_ID}}</td>
                    <td><button id="details" @click="details(req.ticket)">See Full Details...</button></td>
                </tr>
            
            </table>
            </no-ssr>
            <h2>Finished Request</h2> 
            <no-ssr>
            <table id="customers">
                <tr>
                    <th>Ticket ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Computer ID</th>
                    
                </tr>
                
                <tr v-for="(done,index) in done" :key="index">
                    <td>{{done.ticket}}</td>
                    <td>{{done.name}}</td>
                    <td>{{done.email}}</td>
                    <td>{{done.department}}</td>
                    <td>{{done.computer_ID}}</td>
                </tr>
            
            </table>
            <button id="so" @click="signout()">Sign Out</button>
            </no-ssr>
            
        </div>
        <div>
            <ViewReq v-bind:ticketId = "ticket" v-if="tab == 1"/>
        </div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import ViewReq from "./viewRequest";

export default {
    components: {
        ViewReq
    },
    methods:{
        details(id){
            this.ticket = id;
            this.tab = 1;

        },
         signout(){
    firebase.auth().signOut().then(() => {
              this.$router.push('/login');
            }).catch((error) => {
              // An error happened.
        });
    },
    search(){
        console.log(this.ticket_ID_search);
        this.request.forEach(docs => {
            
            if(this.ticket_ID_search == docs.ticket){
                this.flag = 1;
                this.details(this.ticket_ID_search);
                
            }
        });
        if(this.flag == 0){
            alert("Cannot Find ticket Id");
        }
    }
    },
    data(){
        return{
            request:[],
            done:[],
            ticket:"",
            tab:0,
            ticket_ID_search:"",
            flag:0,

        }
    },
    mounted(){
        firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          this.$router.push('/login')
        }
        else{
        firebase.firestore().collection('Requests').where("is_done_request","==",false).get().then((querySnapshot) => {
            querySnapshot.forEach((docs) => {
                this.request = [...this.request, docs.data()];
            });
        });

        firebase.firestore().collection('Requests').where("is_done_request","==",true).get().then((querySnapshot) => {
            querySnapshot.forEach((docs) => {
                this.done = [...this.done, docs.data()];
            });
        });
        }

        });

    },
    
}
</script>


<style scoped>
.body{
    margin-top: -20px;
    background-color: #b3b3b3;
    background-image: url("https://image.freepik.com/free-photo/detail-brush-strokes-random-colors-use-as-background-texture-crafts-school_47726-5802.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    width: 100%;
    padding-top: 20px;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 10vh;
  margin: 20px auto;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #51b9d8;
  color: white;
}

.table{
    background: #FFFFFF;
    max-width: 80%;
    margin: 15px auto 10px;
    padding: 45px 45px 150px 45px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

h2{ 
    display: flex;
    justify-content: center;
    font-size: 33px;
    margin-bottom: 15px;
}

#details{
    background: transparent;
    color: #4c7faf;
    font-size: 14px;
    padding: 0;
    border: 0;
}
#details:hover{
    text-decoration: underline  ;
}
.btn-block{
    display: inline;
    align-self: right;
}
.item p {
    display: inline;
}
.item{
    display: inline;
}
.btn-block button{
    border: 1px solid #4c7faf;
    background-color: #51b9d8;
    border-radius: 5px;
    color: #fff;
}
#so {
    border: 1px solid #4c7faf;
    background-color: #51b9d8;
    border-radius: 5px;
    color: #fff;
}
.btn-block button:hover{
    background-color: #0666a3;
}
#so:hover{
    background-color: #0666a3;
}
</style>