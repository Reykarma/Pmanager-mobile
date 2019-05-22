<template>
  <Page backgroundColor="#ededed" androidStatusBarBackground="#374152" class="page">
    <ActionBar title="" backgroundColor="#3c495e" id="action-bar" flat="true" />
    <ScrollView>
      <StackLayout backgroundColor="#3c495e">
                <Image id="logo-icon" src="res://img_login"/>
                <StackLayout id="form-login">
                  <Label text="Correo" />
                  <TextField v-model="user" keyboardType="email" class="inputs-login" hint="Correo" />
                  <Label text="Contraseña" />
                  <TextField @returnPress="login()" v-model="password" secure="true" class="inputs-login" hint="Contraseña" />
                  <Button @tap="login()" id="button-login" text="Login" />
                </StackLayout>
                <StackLayout id="options-login">
                  <label textWrap="true" text="Register now"/>
                  <label textWrap="true" text="Forgot your password?"/>
                </StackLayout>
            </StackLayout>
  </ScrollView>
  </Page>
</template>

<script>
require( "nativescript-localstorage" );
import projects from './projects'
var direccion_data="https://pmanagerd.mybluemix.net"
var querystring = require ("querystring");
const httpModule = require("http");
export default {
    data () {
        return {
          user:"",
          password:"",
          user_prueba:"momantai",
          password_prueba:"123456789"
        };
    },
    methods:{
      login(){
        httpModule.request({
            url: direccion_data+'/api/user/signin',
            method: 'POST',
            content: querystring.stringify({
            'user':this.user,
            'password':this.user
            })
          }).then((response)=>{
            var r=response.content.toJSON()
            alert(r)
            .then(() => {
              console.log("Alert dialog closed.");
              });
          })
        /*
        if(this.user.toLowerCase()==this.user_prueba.toLowerCase()){
          if(this.password==this.password_prueba){
          localStorage.setItem('ID_user', "momantai")
          localStorage.setItem('user',this.user.toLowerCase())
          this.$navigateTo(projects,{transition:{name:"slideleft",duration:300}});
        }else{
          alert('Contraseña Incorrecta')
          .then(() => {
            console.log("Alert dialog closed.");
            });
        }
        }else{
          alert('Usuario Incorrecto')
          .then(() => {
            console.log("Alert dialog closed.");
            });
        }
        */
      },
    }
}
</script>

<style scoped>
#action-bar{
  height:40em;
}

#logo-icon{
  width: 140em;
  margin-top: 15em;
  margin-bottom: 30em;
}
#form-login{
  width: 85%;
}
#form-login label{
  color: white;
}
.inputs-login{
  color:#338dd7;
      border-width: 1;
      border-radius: 4;
      border-color:#FFFFFF;
      background-color:#FFFFFF;
      placeholder-color: rgba(16, 50, 65, .45);
      vertical-align: middle;
      margin-bottom: 25em;
}
#button-login{
margin-top: 15em;
background-color: #3482d7;
border-radius: 5em;
color: white;
}
#options-login{
  width: 80%;
}
#options-login label{
  margin-top: 25em;
  width: 55%;
  text-align: center;
  color: white;
  font-weight: bold;
}
</style>
