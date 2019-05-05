<template>
  <Page backgroundColor="#e7e8ec" androidStatusBarBackground="#3b63a4" class="page">
    <ActionBar color="white" backgroundColor="#4D7BC6">
    <StackLayout orientation="horizontal">
      <label textWrap="true" class="page-title" :text="'Proyectos ' + user"/>
    <AbsoluteLayout class="container-button-exit">
      <Image @tap="logout()" class="button_exit" src="res://icon_exit" stretch="aspectFill"/>
    </AbsoluteLayout>
    </StackLayout>
    </ActionBar>

    <GridLayout class="container">
      <GridLayout class="container-projects">
        <ScrollView>
          <StackLayout orientation="vertical">
            <StackLayout orientation="vertical" v-for="project in projects" @longPress="show_buttons(project.project_id)" @tap="go_project(project.proyect_id,project.title)" class="card" >
              <StackLayout orientation="horizontal" class="control-card">
                <label textWrap="true" class="project-name" :text="project.title"/>
                <AbsoluteLayout v-show="project.buttons" class="button_edit">
                  <Image @tap="new_edit_project('edit',project.title)" class="buttons" src="res://icon_edit" stretch="aspectFill"/>
                </AbsoluteLayout>
                <AbsoluteLayout v-show="project.buttons" class="button_delete">
                  <Image class="buttons" src="res://icon_trash" stretch="aspectFill"/>
                </AbsoluteLayout>
              </StackLayout>
              <StackLayout orientation="horizontal" class="details-project">
                <AbsoluteLayout class="icons-details">
                  <Image class="buttons" src="res://icon_tasks" stretch="aspectFill"/>
                </AbsoluteLayout>
                <label verticalAlignment="center" text="0 tareas"/>
                <AbsoluteLayout class="icons-details">
                  <Image class="buttons" src="res://icon_members" stretch="aspectFill"/>
                </AbsoluteLayout>
                <label verticalAlignment="center" text="1 miembros"/>
              </StackLayout>
            </StackLayout>
            <AbsoluteLayout class="separador">
            </AbsoluteLayout>
          </StackLayout>
          </ScrollView>
          </GridLayout>
          <AbsoluteLayout @tap="new_edit_project('create','')" class="button-container">
            <Image class="buttons" src="res://icon_new" stretch="aspectFill"/>
          </AbsoluteLayout>
      </GridLayout>
  </Page>
</template>

<script>
require( "nativescript-localstorage" );
import Taskboard from './Taskboard'
import Login from './Login'
import ModalComponent from "./newproject"
const httpModule = require("http");
var direccion_data="https://pmanagerd.mybluemix.net/api/projects/"
export default {
    data () {
        return {
          ID_user:localStorage.getItem('ID_user'),
          user:localStorage.getItem('user'),
          prueba:"",
          projects:[
            {
              _id:"12312",
              project:"plam",
              buttons:false,
            }
          ]
        };
    },
    created(){
      httpModule.request({
          url: direccion_data+this.user,
          method:'GET'
        }).then((response)=>{
          var projects = response.content.toJSON();
          for (var a in projects){
          projects[a].buttons = false;
        }
          this.projects = projects;
        });
    },
    methods:{
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
      logout(){
        localStorage.clear();
        this.$navigateTo(Login,{transition:{name:"slideright",duration:300}})
      },
      new_edit_project(action,title){
        this.$showModal(ModalComponent,{props:{action:action,title:title}}).then(
          data=>{
            if(data.action=="create" && data.Titulo!=""){
              this.projects.push({
                _id:"2365",
                project:data.Titulo,
                buttons:false
              });
            }
          })
      },
    }
}
</script>

<style scoped>
.separador{
  height: 40em;
}
.page-title{
  width: 80%;
  vertical-align: center;
  font-size: 20em;
  font-weight: bold;
}
.container-button-exit{
  height: 30em;
  width: 20%;
  text-align: right;
}
.button_exit{
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
  height: 100em;
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
}
.icons-details{
margin-left: 20em;
}
.project-name{
  font-weight: bold;
  font-style: italic;
  font-size: 25em;
  margin-left: 25em;
  color: black;
  vertical-align: center;
  width: 50%;
}
.button_edit{
  height: 30em;
  margin-left: 15em;
}
.button_delete{
  height: 35em;
  margin-left: 20em;
}
.buttons{
  height: 100%;
}
</style>
