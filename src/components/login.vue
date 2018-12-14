<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-shortkey="['enter']" @shortkey="login()" v-on:click="login()">Login</button>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                if(this.input.username != "" && this.input != "") {
                    if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                        this.$emit("authenticated", true);
                        window.open("http://3.16.216.222:3000/d-solo/EEHNviEmk/testing_graph?refresh=5s&panelId=8&orgId=1&from=now-5m&to=now");
                        
                    }
                    else if(this.input.username == this.$parent.mockAccount.user1 && this.input.password == this.$parent.mockAccount.pass) {
                    
                        window.open("http://www.google.com");

                    } else{
                        alert("The username/password is incorrect");
                    }
                } else{
                    alert("A username/password must be present");
                }
            }
        }
    }
</script>


