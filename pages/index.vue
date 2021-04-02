<template>
     <section class="login">
            <div class="loginContainer">
                <h1>E-Ticket</h1> 

                <label>Email</label>
                <input type="text" autoFocus required placeholder="Enter Email Address" v-model="email"/>

                <label>Password</label>
                <input type="password" autoFocus required placeholder="Enter Password" v-model="password"/>

                <div class="btnContainer">
                   <button v-if="!flag" @click="login">Login</button>
                   <button v-if="flag" @click="signup">Register</button>

                   <p v-if="!flag">
                       Don't have an account?
                            <span v-on:click="flag = true" >Sign Up</span>
                    </p>

                    <p v-if="flag">
                       Have an account?
                            <span v-on:click="flag = false"  >Sign In</span>
                    </p>
                </div>
            </div>
        </section>
</template>

<script>
import firebase from 'firebase/app'
import "firebase/auth"
export default {
    methods:{
    state() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user);
        }
      });
    },
    signup() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => 
      {
          alert("Thank you for signing up");
          console.log(user);
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then((user) => {
              alert("Verification Email Sent");
            })
            .catch((error) => {
              console.log(error);
              this.error = error;
            });
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
    login() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
                if(this.email == "admin@admin.com"){
                    this.$router.push("/admin");
                }else{
                    this.$router.push("/complaint");
                }
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
  font-family: "Nunito", sans-serif;
}
button {
  border: none;
  outline: none;
  width: 100%;
  padding: 15px 0;
  color: #fff;
  font-size: 16px;
  letter-spacing: 1px;
  background: #603bbb;
  cursor: pointer;
}
.login {
  width: 100%;
  min-height: 100vh;
  padding: 0 20px;
  background: #e9e9e9;
  display: flex;
}
.login .loginContainer {
  padding: 60px;
  margin: auto;
  width: 100%;
  max-width: 520px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: radial-gradient(
    ellipse at left bottom,
    rgba(22, 24, 47, 1) 0%,
    rgba(38, 20, 72, 0.9) 59%,
    rgba(17, 27, 75, 0.9) 100%
  );
  box-shadow: 0 50px 70px -20px rgba(0, 0, 0, 0.8);
}
.login .loginContainer h1{
  color: white;
  margin: 14px 0;
  display: flex;
  justify-content: center;
  font-size: 33px;
  line-height: 1;
}
.login .loginContainer label {
  color: white;
  margin: 14px 0;
  display: block;
  font-size: 22px;
  line-height: 1;
}
.login .loginContainer input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 19px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  letter-spacing: 1px;
}
.login .loginContainer .btnContainer {
  width: 100%;
  padding: 24px 0;
}
.login .loginContainer .btnContainer p {
  margin: 14px 0 0 0;
  text-align: right;
  color: #fff;
}
.login .loginContainer .btnContainer p span {
  color: yellow;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-left: 5px;
  cursor: pointer;
  transition: all 400ms ease-in-out;
}
.login .loginContainer .btnContainer p span:hover {
  color: red;
}
.login .loginContainer .errorMsg {
  color: red;
  font-size: 16px;
}
</style> 