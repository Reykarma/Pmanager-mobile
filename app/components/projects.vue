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
    <ScrollView>
    <FlexboxLayout flexDirection="column" class="projects">
      <StackLayout orientation="vertical" v-for="project in projects" @longPress="show_buttons(project._id)" @tap="go_project(project.project)" class="card" >
      <StackLayout orientation="horizontal" class="control-card">
        <label textWrap="true" class="project-name" :text="project.project" />
        <AbsoluteLayout v-show="project.buttons" class="button_edit">
          <Image @tap="new_edit_project('edit',project.project)" class="buttons" src="res://icon_edit" stretch="aspectFill"/>
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
        <label verticalAlignment="center" text="1 miembro"/>
      </StackLayout>
      </StackLayout>
      <Button @tap="new_edit_project('create','')" class="new-project" text="Nuevo proyecto"/>
    </FlexboxLayout>
  </ScrollView>
  </Page>
</template>

<script>
require( "nativescript-localstorage" );
import Taskboard from './Taskboard'
import Login from './Login'
import ModalComponent from "./newproject"
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
    methods:{
      go_project(project){
        this.$navigateTo(Taskboard,{transition:{name:"slideleft",duration:400}, props: { user:this.user,project:project}});
      },
      show_buttons(id){
        for(var a in this.projects){
          if(this.projects[a]._id==id){
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
.new-project{
  border-radius: 20px;
  margin: 15em 90em 0 90em;
  background-color: #b3b3b3;
  height: 40em;
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
  width: 60%;
}
.button_edit{
  height: 35em;
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
