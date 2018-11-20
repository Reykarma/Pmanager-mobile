<template>
    <Page class="page" statusBarstyle="light" androidStatusBarBackground="#3b63a4" backgroundSpanUnderStatusBar="true">
      <ActionBar class="action-bar" backgroundColor="#4D7BC6" color="white">
        <WrapLayout orientation="horizontal">
          <AbsoluteLayout class="return">
            <Image @tap="$navigateBack" class="button-return"  src="res://icon_back" stretch="aspectFill" verticalAlignment="center" />
          </AbsoluteLayout>
            <label verticalAlignment="center" class="title-page" :text="title" fontWeight="bold"/>
        </WrapLayout>
      </ActionBar>

          <ScrollView orientation="vertical">
            <StackLayout orientation="vertical" class="properties">
              <StackLayout orientation="horizontal">
              <WrapLayout class="description">
              <Textview v-model="description" class="description-text" @focus="edit_description()" @blur="edit_description()" :backgroundColor="text_description_color" hint="Agregar Descripción" />
              </WrapLayout>
              <AbsoluteLayout class="ready-description">
                <Image @tap="change_description()" v-show="save_description" src="res://icon_ready" stretch="aspectFill"/>
              </AbsoluteLayout>
              </StackLayout>

                <StackLayout orientation="horizontal" class="work">
                  <AbsoluteLayout class="logo-list">
                    <Image src="res://icon_checklist" stretch="aspectFill"/>
                  </AbsoluteLayout>
                    <label verticalAlignment="center" class="title-work" textWrap="true" text="Checklist" fontWeight="bold"/>
                </StackLayout>

                <StackLayout orientation="vertical" class="checklist">
                  <StackLayout orientation="horizontal" v-for="task in checklist" class="task" >
                    <AbsoluteLayout class="check">
                      <Image @tap="task_finished(task.id)" v-if="task.finished" src="res://icon_yescheck" stretch="aspectFill"/>
                      <Image @tap="task_finished(task.id)" v-else src="res://icon_notcheck" stretch="aspectFill"/>
                    </AbsoluteLayout>
                    <Textview @focus="show_buttons_task(task.id)" @blur="show_buttons_task(task.id)" @textChange="text_change($event)" @returnPress="prueba()" returnKeyType="done" class="text-task" :text="task.task"/>
                    <AbsoluteLayout class="button_list">
                      <Image v-show="task.edit" src="res://icon_ready" stretch="aspectFill"/>
                    </AbsoluteLayout>
                    <AbsoluteLayout class="button_list">
                      <Image v-show="task.edit" src="res://icon_trash" stretch="aspectFill"/>
                    </AbsoluteLayout>
                  </StackLayout>
                </StackLayout>

                <TextField class="new-task" hint="Enter text" />
                <label :text="text_task_ckeck"/>
            </StackLayout>
          </ScrollView>
    </Page>
</template>

<script>
import * as utils from "utils/utils";
export default {
  props: ["title", "direccion_data","direccion_socket","socketIO"],

    data () {
        return {

          text_description_color:"white",
          text_description_edit:false,
          save_description:false,

          description:"tu que perro :v",
          text_task_ckeck:"",

          checklist:[
            {
              id:"1",
              task:"Hacer algo",
              finished:false,
              edit:false
            },
            {
              id:"2",
              task:"Hacer otraa cosa",
              finished:false,
              edit:false
            },
            {
              id:"3",
              task:"Terminar",
              finished:false,
              edit:false
            },
            {
              id:"4",
              task:"fpafwfawfbasfknaslfbasf",
              finished:false,
              edit:false
            },
          ],
        };
    },
      methods: {
        text_change(args){
          this.text_task_ckeck=args.object["text"]
        },
        edit_description(){
          if(this.text_description_edit){
            this.text_description_edit=false
            this.text_description_color="white"
            this.save_description=false
          }else{
            this.text_description_edit=true
            this.text_description_color=null
            this.save_description=true
          }
        },
        change_description(){
          this.text=this.description
          utils.ad.dismissSoftInput();
        },
        task_finished(id){
          for (var a in this.checklist){
              if(this.checklist[a].id==id){
                  if(this.checklist[a].finished==false){
                      this.checklist[a].finished=true;
                      break;
                  }else{
                      this.checklist[a].finished=false;
                      break;
                  }
              }
          }
        },
        show_buttons_task(id){
          for (var a in this.checklist){
              if(this.checklist[a].id==id){
                  if(this.checklist[a].edit==false){
                      this.checklist[a].edit=true;
                      break;
                  }else{
                      this.checklist[a].edit=false;
                      break;
                  }
              }
          }
        },
        change_task(){

        }

      },
}
</script>

<style scoped>
.action-bar{
  height: 55em;
}
.return{
	width: 15%;
	height: 100%;
}
.button-return{
	height: 70%;
	margin-top: 15%;
}
.title-page{
	font-size: 20%;
	width:70%;
}
.description{
margin-top: 10em;
margin-bottom: 10em;
width: 85%;
}
.description-text{
  width: 100%;
}
.ready-description{
  width: 10%;
  height: 80%;
}
.ready-description image{
  width: 100%;
}
.work{
  width:100%;
  height:50em;
  background-color: #f0e9e9;
}
.logo-list{
  height: 80%;
  margin-left: 10em;
}
.logo-list image{
  height: 100%;
}
.title-work{
  margin-left: 10em;
  font-size: 20%;
}

.checklist{
  width: 100%;
  border:1 0 1 0;
  border-color: black;
}
.task{
  margin-top: 5em;
  margin-bottom: 5em;
}
.check{
  width: 50em;
  height: 50em;
}
.check image{
  width: 40em;
  margin-left: 5em;
}
.text-task{
width: 60%;
background-color: white;
}
.button_list{
  width: 50em;
  height: 50em;
}
.button_list image{
  width: 40em;
  margin-left: 5em;
}
.new-task{
  margin-top: 10em;
}
</style>
