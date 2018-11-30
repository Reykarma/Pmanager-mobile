<template>
  <Page backgroundColor="#ededed" androidStatusBarBackground="#3b63a4" class="page">
    <ActionBar backgroundColor="#dfd6da" title="Inicar Sesión" />
    <ScrollView>
    <FlexboxLayout flexDirection="column" class="login">
      <StackLayout class="image">
        <label class="images" />
      </StackLayout>
      <label textWrap="true" class="Text-login" text="P-Manager "/>
      <TextField v-model="user" class="form-Login"  hint="Correo"/>
      <TextField @returnPress="login()" v-model="password" secure="true" class="form-Login" hint="Contraseña"/>
        <Button text="Aceptar" class="button-login" @tap="login()" />
    </FlexboxLayout>
  </ScrollView>
  </Page>
</template>

<script>
require( "nativescript-localstorage" );
import projects from './projects'
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
        if(this.user.toLowerCase()==this.user_prueba.toLowerCase()){
          if(this.password==this.password_prueba){
          localStorage.setItem('ID_user', "123")
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

      },
    }
}
</script>

<style scoped>

.image{
  margin-top: 70em;
  height:120em;
  width: 90em;
}
.images{
  height: 130em;
  width:130em;
  border-radius: 30em;
  background-color:#2872ec;
}
.Text-login{
  margin-top: 25em;
  text-align: center;
  font-size: 23em;
  height: 50em;
  font-weight: bold;
  color: black;
  font-style: italic;
}
.form-Login{
  margin-top: 15em;
  border-width: 0 0 2 0;
  border-bottom-color: crimson;
  text-align: center;
}
.button-login{
  border-radius: 10em;
  background-color:#2872ec;
  margin-top: 40em;
  text-align: center;
  font-size: 20em;
  margin-left: 20em;
  margin-right: 20em;
  color:#e7e7e7;
}
</style>
