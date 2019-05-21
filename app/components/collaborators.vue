<template class="main-container">
	<page class="principal">
		<StackLayout>
			<StackLayout orientation="horizontal">
				<AbsoluteLayout @tap="$modal.close()" class="container-image-close">
					<Image class="image-close" src="res://icon_eraser" stretch="aspectFill"/>
				</AbsoluteLayout>
			</StackLayout>
			<label class="title" text="Miembros"/>
    <GridLayout class="container" orientation="vertical">
				<GridLayout class="container-users" >
				<ScrollView>
					<StackLayout class="users">
						<StackLayout orientation="horizontal" class="user">
							<AbsoluteLayout class="container-image">
								<Image class="image_profile" src="https://pmanagerd.mybluemix.net/static/img/persona2.png" stretch="aspectFill"/>
							</AbsoluteLayout>
							<label class="user-text" text="Jose Armando Colmenares"  />
						</StackLayout>
					</StackLayout>
				</ScrollView>
				</GridLayout>
				<AbsoluteLayout class="button_add">
					<StackLayout class="button_add" orientation="vertical">
						<Button @tap="new_collaborator()" backgroundColor="#c8852b" text="Agregar Colaborador" />
					</StackLayout>
				</AbsoluteLayout>
    </GridLayout>
	</StackLayout>
  </page>
</template>
<script>
import new_collaborator from "./new_collaborator";
export default {
    data() {
      return {

      };
    },
		created(){

		},
    methods: {
			new_collaborator(){
				this.$showModal(new_collaborator).then()
			}
    }
};
</script>

<style scoped>
	.button_add{
		vertical-align: bottom;
	}
  .principal{
    height: 100%;
  }
	.container-image-close{
		height: 35em;
		width: 35em;
		margin-left: 85%;
	}
	.image-close{
		width: 100%;
		height: 100%;
	}
	.title{
		width: 100%;
		height: 20em;
		margin-top: -5;
		text-align: center;
		font-size: 17em;
		color: black;
		font-weight: bold;
		vertical-align: top;
	}
	.container-users{
		margin-bottom: 45em;
	}
	.user{
		margin-bottom: 10em;
		margin-top: 15em;
		margin-left: 5em;
		margin-right: 5em;
	}
	.container-image{
    width: 40em;
    height: 40em;
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
	.button_add{
		width: 100%;
	}
</style>
