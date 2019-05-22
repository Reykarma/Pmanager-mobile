<template>
	<page class="principal">
		<StackLayout orientation="vertical" class="Agregar">
			<StackLayout class="formulario">
				<Label class="Title" text="Agregar Colaborador" fontWeight="bold" />
      <TextField  @returnPress="Agregar" v-model="Titulo" class="inputs" hint="Usuario o Correo" />
    </StackLayout>
			<StackLayout class="users">
				<StackLayout orientation="horizontal" class="user">
					<AbsoluteLayout class="container-image">
						<Image class="image_profile" src="https://pmanagerd.mybluemix.net/static/img/persona2.png" stretch="aspectFill"/>
					</AbsoluteLayout>
					<label class="user-text" text="Jose Armando Colmenares"  />
				</StackLayout>
			</StackLayout>
	</StackLayout>
</page>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    methods: {
        Agregar() {
					httpModule.request({
							url: direccion_data+"/api/search-user/"+localStorage.getItem('user'),
							method: 'POST',
							content: querystring.stringify({
							'commentary':this.newcomment,
							'user':this.user
							})
						}).then((response)=>{
							var r=response.content.toJSON()
							this.comments.push({
								usercomment:r.usercomment,
								commentary:r.commentary,
								_idcomment:r._idcomment
							})
						})
						this.newcomment=''
        }
    }
};
</script>

<style scoped>
.Agregar{
  width: 100%;
	height: 300em;
}
.formulario{
  width: 100%;
}
.Title{
  margin-top: 10px;
  width: 95%;
  text-align: left;
  font-size: 18px;
  border-radius:20px;
}
.inputs{
  border-width: 0 0 2 0;
  border-bottom-color: #33af14 ;
  background-color: white;
  height: 50em;
	margin-top: 5em;
	margin-bottom: 10em;
}
.user{
	margin-bottom: 5em;
	margin-top: 5em;
	margin-left: 5em;
	margin-right: 5em;
}
.container-image{
	width: 30em;
	height: 30em;
	border-radius: 100%;
}
.image_profile{
	width: 100%;
	height: 100%;
	border-radius: 100%;
}
.user-text{
	margin-left: 10em;
	text-align: center;
	vertical-align: center;
	font-size: 15em;
	font-weight: bold;
}
</style>
