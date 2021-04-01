<template>
    <div>    
        <div v-if="tab == 0">
            <h2>Request</h2>
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
                    <td>{{req.ticketId}}</td>
                    <td>{{req.name}}</td>
                    <td>{{req.email}}</td>
                    <td>{{req.department}}</td>
                    <td>{{req.computerId}}</td>
                    <td><button @click="details(req.ticketId)">See Full Details...</button></td>
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
        firebase.firestore().collection("request").get().then((querySnapshot) => {
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

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}
</style>