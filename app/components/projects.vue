<template>
  <Page backgroundColor="#ededed" androidStatusBarBackground="#3b63a4" class="page">
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
      <StackLayout orientation="horizontal" v-for="project in projects" @tap="go_project(project.project)" class="project-card">
        <label textWrap="true" class="project-name" text="plam" />
        <AbsoluteLayout class="button_edit">
          <Image  src="res://icon_edit" stretch="aspectFill"/>
        </AbsoluteLayout>
      </StackLayout>
    </FlexboxLayout>
  </ScrollView>
  </Page>
</template>

<script>
require( "nativescript-localstorage" );
import Taskboard from './Taskboard'
import Login from './Login'
export default {
    data () {
        return {
          ID_user:localStorage.getItem('ID_user'),
          user:localStorage.getItem('user'),
          projects:[
            {
              id_project:"12312",
              project:"plam",
            }
          ]
        };
    },
    methods:{
      go_project(project){
        this.$navigateTo(Taskboard,{transition:{name:"slideleft",duration:400}, props: { user:this.user,project:project}});
      },
      logout(){
        localStorage.clear();
        this.$navigateTo(Login)
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
.project-card{
  height: 60em;
  border-radius: 10em;
  background-color: #dadada;
  vertical-align: center;
  margin: 20em 10em 0 10em;
}
.project-name{
  font-weight: bold;
  font-style: italic;
  font-size: 25em;
  margin-left: 20em;
  color: black;
  background-color: red;
  vertical-align: center;
}
.button_edit{
  height: 40em;
}

</style>
