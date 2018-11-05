<template>
	<page class="principal">
		<DockLayout class="Agregar">
			<StackLayout dock="top" class="formulario">
				<Label class="Title" :text="'Nueva tarjeta en '+ status" fontWeight="bold" />
      <TextField @returnPress="Agregar" v-model="Titulo" class="inputs" hint="Agregar Texto" />
    </StackLayout>
    <StackLayout orientation="horizontal" class="Buttons" dock="bottom">
	     <Button fontWeight="bold"  color="crimson" text="Cancelar" @tap="$modal.close()" />
       <Button fontWeight="bold" color="black" @tap="Agregar" text="Aceptar"/>
    </StackLayout>
	</DockLayout>
</page>
</template>
<script>
export default {
    props: ["status", "id"],
    data() {
        return {
            Titulo: "",
            progress: "8/5",
            comment: "",
            button: false
        };
    },
    methods: {
        Agregar() {
            this.$modal.close({
                id: this.id,
                status: this.status,
                Titulo: this.Titulo,
                progress: this.progress,
                coment: this.comment,
                button: this.button
            });
        }
    }
};
</script>

<style scoped>
.Agregar{
  width: 100%;
  height:40%;
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
