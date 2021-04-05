<template>
     <section class="login">
            <div class="loginContainer">
                <h3>e-Ticket</h3> 

                <label>Email</label>
                <input type="text" autoFocus required placeholder="Enter Email Address" v-model="email"/>

                <label>Password</label>
                <input type="password" autoFocus required placeholder="Enter Password" v-model="password"/>

                <div class="btnContainer">
                   <button @click="login">Login</button>
                  
                </div>
            </div>
        </section>
</template>

<script>
import firebase from 'firebase/app'
import "firebase/auth"
export default {

    mounted(){
      
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$router.push('/admin')
        }
      });
    },

    methods:{
    
    login() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
                    this.$router.push("/admin");
               
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                // [START_EXCLUDE]
                if (errorCode === "auth/wrong-password") {
                    alert("Wrong password.");
                }
                if (errorCode === "auth/invalid-email") {
                    alert("Invalid email.");
                }
                if (errorCode === "auth/user-disabled") {
                    alert("User disabled.");
                }
                if (errorCode === "auth/user-not-found") {
                    alert("User Not Found");
                }
                console.log(error);
                // document.getElementById('login').disabled = false;
                // [END_EXCLUDE]
            });
        },
    },
    data: () => {
    return {
      email: "",
      password: "",
      flag:false,
      
    };
  },
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}
button {
  border: none;
  outline: none;
  width: 100%;
  padding: 15px;
  color: #fff;
  font-size: 14px;
  letter-spacing: 1px;
  background: #51b9d8;
  cursor: pointer;
}
.login {
  width: 100%;
  min-height: 100vh;
  padding: 0 20px;
  background: #e9e9e9;
  display: flex; 
  background-image: url("https://image.freepik.com/free-photo/detail-brush-strokes-random-colors-use-as-background-texture-crafts-school_47726-5802.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.login .loginContainer {
  padding: 60px;
  margin: auto;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f8f8f8;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  border-radius: 15px;
}
.login .loginContainer h3{
  color: #232323;
  display: flex;
  justify-content: center;
  font-size: 33px;
  line-height: 1;
}
.login .loginContainer label {
  color: #232323;
  margin: 14px 0;
  display: block;
  font-size: 18px;
  line-height: 1;
}
.login .loginContainer input {
  width: 100%;
  border: none;
  outline: none;
  margin: 0 0 15px;
  font-size: 15px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: #232323;
  letter-spacing: 1px;
  border: 1px solid #232323;
  border-radius: 10px;

}
.login .loginContainer input:focus{
  border: 1.5px solid #51b9d8;
}

.login .loginContainer .btnContainer {
  width: 100%;
  padding: 24px 0;
}
.login .loginContainer .btnContainer p {
  margin: 14px 0 0 0;
  text-align: right;
  color: #b3b3b3;
  font-size: 12px;
}
.login .loginContainer .btnContainer p span {
  color: #4c7faf;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-left: 5px;
  cursor: pointer;
  transition: all 400ms ease-in-out;
}
.login .loginContainer .btnContainer p span:hover {
  text-decoration: underline;
}
.login .loginContainer .errorMsg {
  color: red;
  font-size: 16px;
}

</style> 