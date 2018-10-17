<template>

	<page class="principal">
  <DockLayout class="Agregar">
    <StackLayout dock="top" class="formulario">
      <Label class="Title" v-model="status" :text="'Nueva tarjeta en '+status" fontWeight="bold" />
      <TextField v-model="Titulo" class="inputs" hint="Agregar Texto" />
    </StackLayout>
    <StackLayout orientation="horizontal" class="Buttons" dock="bottom">
	     <Button fontWeight="bold"  color="crimson" text="Cancelar" @tap="$modal.close()" />
       <Button fontWeight="bold" color="black" @tap="Agregar()" text="Aceptar"/>
    </StackLayout>
	</DockLayout>
</page>
</template>
<script>
export default {
    props:['status'],
    data() {
        return {
					id:2,
					status:"",
					Titulo:"",
					progress:"",
					comment:"",
					play:"",
        };
    },
    methods:{
			Agregar(){
				this.$modal.close({id:this.id,status:this.status,Titulo:this.Titulo,progress:this.progress,coment:this.comment,play:this.play});
			}
		},
};
</script>

<style scoped>

.Agregar{
  width: 100%;
  height:800px;
}
.formulario{
  width: 100%;
  height: 70%;
}
.Buttons{
  height: 30%;
  width: 100%;
}
.Buttons Button{
  width: 50%;
  border-radius: 20px;
	font-size: 17px;
}
.Title{
  margin-top: 70px;
  width: 95%;
  height: 30%;
  text-align: left;
  font-size: 18px;
  border-radius:20px;
}

.inputs{
  border-width: 0 0 2 0;
  border-bottom-color: #33af14 ;
  background-color: white;
  height: 40%;
}
</style>
