<template>
  <Page backgroundColor="#ededed" androidStatusBarBackground="#3b63a4" class="page">
    <ActionBar class="action-bar" backgroundColor="#4D7BC6" color="white">
			<WrapLayout orientation="horizontal">
				<AbsoluteLayout class="return">
					<Image @tap="$navigateBack" class="button-return"  src="res://icon_back" stretch="aspectFill" verticalAlignment="center" />
				</AbsoluteLayout>
					<label verticalAlignment="center" class="title-page" textWrap="false" text="Profile" fontWeight="bold"/>
			</WrapLayout>
		</ActionBar>
    <ScrollView>
      <StackLayout orientation="vertical" backgroundColor="white">
        <AbsoluteLayout class="container-image">
          <Image class="image_profile" src="https://pmanagerd.mybluemix.net/static/img/persona2.png" stretch="aspectFill"/>-
        </AbsoluteLayout>
        <StackLayout orientation="vertical" class="texts">
          <label class="Name" textWrap="true" text="Jose Armando Colmenares"/>
          <StackLayout orientation="vertical" class="information">
            <label class="section" text="Correo"/>
            <label class="information-text" text="Armando567@hotmail.com"/>
            <label class="section" text="Usuario"/>
            <label class="information-text" text="Armando"/>
          </StackLayout>
          <StackLayout orientation="vertical" class="container-buttons">
            <Button class="logout" text="Cambiar contraseña" @tap="prueba()"/>
            <Button class="logout" text="Cerrar sesion" @tap="logout()"/>
          </StackLayout>
        </StackLayout>
      </StackLayout>
  </ScrollView>
  </Page>
</template>

<script>
require( "nativescript-localstorage" );
import projects from './projects'
import Login from './Login'
export default {
    data () {
        return {

        };
    },
    methods:{
      logout(){
        localStorage.clear();
        this.$navigateTo(Login,{transition:{name:"slideright",duration:300}})
      },
    }
}
</script>

<style scoped>
.return{
	width: 15%;
	height: 100%;
}
.button-return{
	height: 40em;
}
.title-page{
	font-size: 20em;
	width:80%;
}
  .container-image{
    width: 140em;
    height: 140em;
    border-radius: 100%;
    margin-top: 40em;
    background-color: red;
  }
  .image_profile{
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
  .Name{
    width: 100%;
    text-align: center;
    margin-top: 30em;
    font-size: 25em;
    font-weight: bold;
  }
  .information{
    width: 85%;
    height: 140em;
    border-radius: 10em;
    margin-top: 15em;
    background-color: #e6e7e7;
  }
  .section{
    width: 100%;
    text-align: center;
    font-size: 18em;
    margin-top: 10em;
    font-weight: bold;
  }
  .information-text{
    text-align:center;
    width: 100%;
    font-size: 15em;
  }
  .logout{
    margin-top: 20em;
    width: 90%;
    font-size: 17em;
    font-weight: bold;
    background-color:#4D7BC6;
    color: white;
  }
</style>
