<template>
    <Page class="page" statusBarstyle="light" androidStatusBarBackground="#3b63a4" backgroundSpanUnderStatusBar="true">
      <ActionBar class="action-bar" backgroundColor="#4D7BC6" color="white">
        <WrapLayout orientation="horizontal">
          <AbsoluteLayout class="return">
            <Image @tap="$navigateBack" class="button-return"  src="res://icon_back" stretch="aspectFill" verticalAlignment="center" />
          </AbsoluteLayout>
            <Textview @focus="edit_title_text()" @blur="edit_title_text()" verticalAlignment="center" class="title-page" :text="title" fontWeight="bold"/>
            <AbsoluteLayout class="ready-title">
              <Image @tap="change_title_button()" v-show="save_title" src="res://icon_ready" stretch="aspectFill"/>
            </AbsoluteLayout>
        </WrapLayout>
      </ActionBar>

          <ScrollView orientation="vertical">
            <StackLayout orientation="vertical" class="properties">
              <StackLayout orientation="horizontal">
              <WrapLayout class="description">
              <Textview v-model="description" class="description-text" @focus="edit_description_text()" @blur="edit_description_text()" :backgroundColor="text_description_color" hint="Agregar Descripción" />
              </WrapLayout>
              <AbsoluteLayout class="ready-description">
                <Image @tap="change_description_button()" v-show="save_description" src="res://icon_ready" stretch="aspectFill"/>
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
                      <Image @tap="task_finished(task._id)" v-if="task.finished" src="res://icon_yescheck" stretch="aspectFill"/>
                      <Image @tap="task_finished(task._id)" v-else src="res://icon_notcheck" stretch="aspectFill"/>
                    </AbsoluteLayout>
                    <Textview v-show="!task.finished"  @focus="show_buttons_task(task._id)" @blur="show_buttons_task(task._id)" @textChange="text_change($event)" class="text-task" :text="task.todo"/>
                    <Textview v-show="task.finished"  @focus="show_buttons_task(task._id)" @blur="show_buttons_task(task._id)" style="text-Decoration:line-through;color:;" class="text-task" :text="task.todo"/>
                    <AbsoluteLayout class="button_list">
                      <Image v-show="task.edit && !task.finished" src="res://icon_ready" stretch="aspectFill"/>
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
const httpModule = require("http");
var querystring = require ("querystring");
var direccion_data="https://pmanagerd.mybluemix.net/api/momantai/plam/t/"
export default {
  props: ["id"],

  created(){
    httpModule.request({
				url: direccion_data+this.id,
				method:'GET'
			}).then((response)=>{
				var r = response.content.toJSON();
        for (var a in r.task[0].todo){
        r.task[0].todo[a].finished = false;
        r.task[0].todo[a].edit = false;
      }
        this.checklist=r.task[0].todo
			});

  },
    data () {
        return {
          text_description_color:"white",
          text_description_edit:false,
          save_description:false,
          save_title:false,

          title:"asd",
          description:"tu que perro :v",

          text_task_ckeck:"",

          checklist:[],
        };
    },
      methods: {
        text_change(args){
          this.text_task_ckeck=args.object["text"]
        },
        edit_title_text(){
          if(this.save_title){
          this.save_title=false;
        }else{
          this.save_title=true;
        }
        },
        edit_description_text(){
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
        show_buttons_task(id){
          for (var a in this.checklist){
              if(this.checklist[a]._id==id){
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
        task_finished(id){
          for (var a in this.checklist){
              if(this.checklist[a]._id==id){
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
        change_title_button(){
          utils.ad.dismissSoftInput();
        },
        change_description_button(){
          utils.ad.dismissSoftInput();
        },
      },
}
</script>

<style scoped>
.action-bar{

}
.return{
	width: 15%;
	height: 100%;
}
.button-return{
	height: 70%;
}
.title-page{
	font-size: 18em;
	width:70%;
  background-color: #4D7BC6;
}
.ready-title{
  width: 15%;
  height: 100%;
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
