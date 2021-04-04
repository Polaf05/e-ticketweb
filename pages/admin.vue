<template>
    <div>    
        <div v-if="tab == 0" class="table">
            <h2>Request Table</h2>
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
                    <td>{{req.computerId}}</td>
                    <td><button @click="details(req.ticket)">See Full Details...</button></td>
                </tr>
            
            </table>
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

        }
    },
    data(){
        return{
            request:[],
            ticket:"",
            tab:0

        }
    },
    mounted(){
        firebase.firestore().collection('Requests').where("is_done_request","==",false).get().then((querySnapshot) => {
            querySnapshot.forEach((docs) => {
                this.request = [...this.request, docs.data()];
            });
        });

    },
    
}
</script>


<style scoped>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
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
  background: radial-gradient(
    ellipse at left bottom,
    rgb(35, 22, 47) 0%,
    rgba(21, 20, 72, 0.9) 59%,
    rgba(17, 47, 75, 0.9) 100%
  );
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

button{
    background: transparent;
    color: #4c7faf;
    font-size: 14px;
    padding: 0;
    border: 0;
}
button:hover{
    text-decoration: underline  ;
}
</style>