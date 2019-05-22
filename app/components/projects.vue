<template>
  <Page backgroundColor="#e7e8ec" androidStatusBarBackground="#3b63a4" class="page">
    <ActionBar color="white" backgroundColor="#4D7BC6">
    <StackLayout orientation="horizontal">
      <label textWrap="true" class="page-title" :text="'Proyectos ' + user"/>
    <AbsoluteLayout class="container-button-profile">
      <Image @tap="profile()" class="button_profile" src="res://icon_profile" stretch="aspectFill"/>
    </AbsoluteLayout>
    </StackLayout>
    </ActionBar>

    <GridLayout class="container">
      <GridLayout class="container-projects">
        <ActivityIndicator class="animation" :busy="animation" @busyChange="" />
        <ScrollView>
          <StackLayout v-show="mostrar" orientation="vertical">
            <StackLayout v-if="mostrar" orientation="vertical" v-for="project in projects" @longPress="show_buttons(project.project_id)" class="card" >
              <WrapLayout @tap="go_project(project.project_id,project.title)">
              <StackLayout orientation="horizontal" class="control-card">
                <label textWrap="true" class="project-name" :text="project.title"/>
              </StackLayout>
              <StackLayout orientation="horizontal" class="details-project">

                <StackLayout class="container-icons-details" orientation="vertical">
                  <StackLayout class="container-info" orientation="horizontal">
                    <AbsoluteLayout>
                      <Image class="buttons" src="res://icon_tasks" stretch="aspectFill"/>
                    </AbsoluteLayout>
                    <label verticalAlignment="center" text="0 tareas"/>
                  </StackLayout>
                </StackLayout>
                <StackLayout class="container-icons-details" orientation="vertical">
                  <StackLayout class="container-info" orientation="horizontal">
                    <AbsoluteLayout>
                      <Image class="buttons" src="res://icon_members" stretch="aspectFill"/>
                    </AbsoluteLayout>
                    <label verticalAlignment="center" :text= " project.members+' miembros'"/>
                  </StackLayout>
                </StackLayout>

              </StackLayout>
              </WrapLayout>
              <StackLayout orientation="horizontal">
                <StackLayout orientation="vertical" class="buttons-container">
                  <AbsoluteLayout @tap="new_edit_project('edit',project.title,project.project_id)" v-show="project.buttons" class="button_edit">
                    <Image @tap="" class="buttons" src="res://icon_edit" stretch="aspectFill"/>
                  </AbsoluteLayout>
                </StackLayout>
                <StackLayout orientation="vertical" class="buttons-container">
                  <AbsoluteLayout @tap="delete_project(project.project_id)" v-show="project.buttons" class="button_delete">
                    <Image class="buttons" src="res://icon_trash" stretch="aspectFill"/>
                  </AbsoluteLayout>
                </StackLayout>
              </StackLayout>
            </StackLayout>
            <AbsoluteLayout class="separador">
            </AbsoluteLayout>
          </StackLayout>
          </ScrollView>
          </GridLayout>
          <AbsoluteLayout @tap="new_edit_project('create','','')" class="button-container">
            <Image class="buttons" src="res://icon_new" stretch="aspectFill"/>
          </AbsoluteLayout>
      </GridLayout>
  </Page>
</template>

<script>
require( "nativescript-localstorage" );
import Taskboard from './Taskboard'
import Profile from './profile'
import ModalComponent from "./newproject"
const httpModule = require("http");
var querystring = require ("querystring");
var direccion_data="https://pmanagerd.mybluemix.net/api/projects/"
var direccion_update="https://pmanagerd.mybluemix.net/api/project/"
const connectivity = require("tns-core-modules/connectivity");
const timerModule = require("tns-core-modules/timer");
export default {
    data () {
        return {
          ID_user:localStorage.getItem('ID_user'),
          user:localStorage.getItem('user'),
          prueba:"",
          projects:[],
          mostrar:false,
          animation:true
        };
    },
    mounted(){

    },
    created(){
      this.check_network();
    },
    methods:{
      check_network(){
				const connectionType = connectivity.getConnectionType();
				if(connectionType==connectivity.connectionType.none){
					alert({
		  			title: "Sin Conexion",
		  			message: "asegúrese de estar conectado a internet",
		  			okButtonText: "Reintentar"
						}).then(() => {
		  				this.check_network()
							return false
						});
				}else{
					this.load_page()
					return true
				}
			},
      load_page(){
        httpModule.request({
            url: direccion_data+this.user,
            method:'GET'
          }).then((response)=>{
            var projects = response.content.toJSON();
            for (var a in projects){
            projects[a].buttons = false;
            var count= projects[a].team
            projects[a].members=Object.keys(count).length
          }
            this.projects = projects;
            this.show_projects()
          });
      },
      show_projects(){
				setTimeout(() => {
          this.mostrar=true
          this.animation=false
	     }, 600);
			},
      go_project(project,title){
        this.$navigateTo(Taskboard,{transition:{name:"slideleft",duration:400}, props: { user:this.user,project:project,title:title}});
      },
      show_buttons(id){
        for(var a in this.projects){
          if(this.projects[a].project_id==id){
            if(!this.projects[a].buttons){
                this.projects[a].buttons=true
                break
              }else{
                this.projects[a].buttons=false
                break
              }
            }
          }
      },
      profile(){
        this.$navigateTo(Profile,{transition:{name:"slideBottom",duration:300}})
      },
      new_edit_project(action,title,id){
        this.$showModal(ModalComponent,{props:{action:action,title:title}}).then(
          data=>{
            if(data.action=="create" && data.Titulo!=""){
              httpModule.request({
    							url: direccion_data+this.ID_user,
    							method: 'PUT',
    							content: querystring.stringify({
    								'title':data.Titulo
    							})
      					}).then((response)=>{
                  var r=response.content.toJSON()
                  r.buttons=false
                  this.projects.unshift(r)
                })
            }else if(data.action=="edit" && data.Titulo!=""){
              httpModule.request({
    							url: direccion_update+this.ID_user+"/"+id,
    							method: 'PUT',
    							content: querystring.stringify({
    								'type':"update",
                    'title':data.Titulo
    							})
      					}).then((response)=>{
                  for(var a in this.projects) {
                    if (this.projects[a].project_id===id) {
                      this.projects[a].title=data.Titulo
                    }
                  }
                })
            }
          })
      },
      delete_project(project){
        confirm({
          title: "Confirmacion",
          message: "Realmente desea eliminar proyecto?",
          okButtonText: "Confirmar",
          cancelButtonText: "Cancelar"
        }).then(result => {
          if (result) {
            httpModule.request({
              url:  direccion_update+this.user+"/"+project,
              method: 'PUT',
              content: querystring.stringify({
                'type':'deleteProject',
                'sure':true
              })
            }).then((response)=>{
              var r=response.content.toJSON()
              for(var a in this.projects) {
                if (this.projects[a].project_id==project && r.status) {
                  	this.projects.splice(a,1);
                    break;
                }
              }
            })

          }
        });
      }
    }
}
</script>

<style scoped>
.separador{
  height: 55em;
}
.page-title{
  width: 80%;
  vertical-align: center;
  font-size: 20em;
  font-weight: bold;
}
.container-button-profile{
  height: 40em;
  width: 20%;
  text-align: right;
}
.button_profile{
  height: 100%;
  vertical-align: center;
}
.container{
width: auto;
}
.container-projects{
  vertical-align: top;
  height: 100%;
  margin-bottom: 200px;
}
.animation{
  height: 100em;
  width: 100em;
  color: #37a338;
}
.button-container{
  height: 55em;
  width: 55em;
  horizontal-align:right;
  vertical-align: bottom;
  margin-right: 20em;
  margin-bottom: 18em;
}
.new-project{
  border-radius: 20px;
  margin: 15em 90em 0 90em;
  background-color: #b3b3b3;
  height: 40em;
  horizontal-align:right;
}
.card{
  height: auto;
  margin: 18em 15em 0 15em;
  background-color: white;
  border-radius: 15px;
}
.control-card{
  height: 60em;
  vertical-align: center;
}
.details-project{
  height: 40em;
  text-align: center;
  margin-bottom: 10em;
  width: 100%;
}
.container-icons-details{
  width: 50%;
}
.container-info{
  width: 120em;
}
.project-name{
  font-style: italic;
  font-size: 25em;
  margin-left: 25em;
  color: black;
  vertical-align: center;
  width: 90%;
}
.button_edit{
  height: 30em;
  width: 30em;
}
.button_delete{
  height: 35em;
  width: 35em;
}
.buttons{
  height: 100%;
}
.buttons-container{
  width: 50%;
  margin-bottom: 10em;
}
</style>
