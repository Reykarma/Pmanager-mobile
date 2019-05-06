<template>
  <Page class="page" statusBarstyle="light" androidStatusBarBackground="#3b63a4" backgroundSpanUnderStatusBar="true">
    <ActionBar class="action-bar" backgroundColor="#4D7BC6" color="white">
      <WrapLayout orientation="horizontal">
        <AbsoluteLayout class="return">
          <Image @tap="$navigateBack" class="button-return"  src="res://icon_back" stretch="aspectFill" verticalAlignment="center" />
        </AbsoluteLayout>
        <label verticalAlignment="center" class="title-page" textWrap="true" text="Tareas" fontWeight="bold"/>
      </WrapLayout>
    </ActionBar>

    <ScrollView orientation="vertical">
      <StackLayout orientation="vertical" class="properties">
        <StackLayout orientation="horizontal">
          <Textview @textChange="change_title_button()" verticalAlignment="center" class="title-task" v-model="title" fontWeight="bold"/>
        </StackLayout>
        <StackLayout orientation="horizontal">
          <WrapLayout class="description">
            <Textview @textChange="change_description_button()" v-model="description" class="description-text" @focus="edit_description_text()" @blur="edit_description_text()" :backgroundColor="text_description_color" hint="Agregar Descripción" />
          </WrapLayout>
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
                <Image @tap="task_finished(task._id, task.check,task.todo)" v-if="task.check=='check'" src="res://icon_yescheck" stretch="aspectFill"/>
                <Image @tap="task_finished(task._id, task.check,task.todo)" v-else src="res://icon_notcheck" stretch="aspectFill"/>
              </AbsoluteLayout>
              <StackLayout orientation="horizontal">
                <Textview editable="false" v-show="task.check=='check'" @blur="text_change($event)" style="text-Decoration:line-through;color:;" class="text-task" :text="task.todo"/>
                <Textview v-show="task.check==''" @focus="text_change($event)"  @textChange="text_change($event),edit_todo(task._id, task.check)" class="text-task" :text="task.todo"/>
              </StackLayout>
              <AbsoluteLayout @tap="delete_todo(task._id)" class="delete-container">>
                <Image src="res://icon_eraser" stretch="" verticalAlignment="center" />
              </AbsoluteLayout>
          </StackLayout>
        </StackLayout>
        <TextField v-model="newtodo" @returnPress="new_todo()" class="new-task" hint="Nueva Subtarea" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import * as utils from "utils/utils";
import Taskboard from './Taskboard';
const httpModule = require("http");
var querystring = require ("querystring");
var direccion_data="https://pmanagerd.mybluemix.net/api/"
var Toast = require("nativescript-toast");
export default {
  props: ["user","project","id","work"],

  created(){
    httpModule.request({
				url: direccion_data+this.user+"/"+this.project+"/t/"+this.id,
				method:'GET'
			}).then((response)=>{
				var r = response.content.toJSON();
        this.description=r.things.details
        this.checklist=r.resource.todo
			});

  },
    data () {
        return {
          text_description_color:"white",
          text_description_edit:false,

          title:this.work,
          description:"",
          newtodo:"",
          text_task_ckeck:"",

          checklist:[],
        };
    },
      methods: {
        text_change(args){
          this.text_task_ckeck=args.object["text"]
        },
        edit_description_text(){
          if(this.text_description_edit){
            this.text_description_edit=false
            this.text_description_color="white"
          }else{
            this.text_description_edit=true
            this.text_description_color=null
          }
        },
        task_finished(id,check,todo){
          if(check==""){
          httpModule.request({
							url: direccion_data+this.user+"/"+this.project+"/t/"+this.id,
							method: 'PUT',
							content: querystring.stringify({
								'action':'todo',
                'actodo':'update',
                '_id':id,
                'todo':todo,
                'check':"check",
							})
  					})
            for (var a in this.checklist) {
              if (id==this.checklist[a]._id){
                  this.checklist[a].check="check";
                  break;
              }
            }
            utils.ad.dismissSoftInput();
          }else{
            httpModule.request({
                url: direccion_data+this.user+"/"+this.project+"/t/"+this.id,
                method: 'PUT',
                content: querystring.stringify({
                  'action':'todo',
                  'actodo':'update',
                  '_id':id,
                  'todo':todo,
                  'check':"",
                })
              })
              for (var a in this.checklist) {
                if (id==this.checklist[a]._id){
                    this.checklist[a].check="";
                    break;
                }
              }
            utils.ad.dismissSoftInput();
          }
          /* for (var a in this.checklist){
              if(this.checklist[a]._id==id){
                  if(this.checklist[a].finished==false){
                      this.checklist[a].finished=true;
                      break;
                  }else{
                      this.checklist[a].finished=false;
                      break;
                  }
              }
          }*/
        },
        change_title_button(){
          httpModule.request({
							url: direccion_data+this.user+"/"+this.project+"/t/"+this.id,
							method: 'PUT',
							content: querystring.stringify({
                'newTitle':this.title,
                'action':'title',
							})
  					});
          //utils.ad.dismissSoftInput();
        },
        change_description_button(){
          httpModule.request({
							url: direccion_data+this.user+"/"+this.project+"/t/"+this.id,
							method: 'PUT',
							content: querystring.stringify({
                'newDescription':this.description,
                'action':'description',
							})
  					});
          //utils.ad.dismissSoftInput();
        },
        edit_todo(id, check){
          //utils.ad.dismissSoftInput();
          httpModule.request({
							url: direccion_data+this.user+"/"+this.project+"/t/"+this.id,
							method: 'PUT',
							content: querystring.stringify({
								'action':'todo',
                'actodo':'update',
                '_id':id,
                'todo':this.text_task_ckeck,
                'check':check,
							})
  					});

        },
        new_todo(){
          httpModule.request({
							url: direccion_data+this.user+"/"+this.project+"/t/"+this.id,
							method: 'PUT',
							content: querystring.stringify({
								'action':'todo',
                'actodo':'create',
                'todo':this.newtodo,
							})
  					}).then((response)=>{
              var r=response.content.toJSON()
              r.edit=false
              this.checklist.push(r)
              this.newtodo=""
              Toast.makeText("Elemento agregado").show();
            })
        },
        delete_todo(id){
          httpModule.request({
							url: direccion_data+this.user+"/"+this.project+"/t/"+this.id,
							method: 'PUT',
							content: querystring.stringify({
								'action':'todo',
                'actodo':'delete',
                '_id':id,
							})
  					});
            for (var a in this.checklist) {
							if (id==this.checklist[a]._id){
									this.checklist.splice(a,1);
                  Toast.makeText("Elemento Eliminado").show();
									break;
							}
						}
        }
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
	height: 40em;
}
.title-page{
  width: 85%;
  font-size: 20em;
}
.title-task{
	font-size: 18em;
	width:100%;
  background-color: #4D7BC6;
  color:white;
}
.ready-title{
  width: 10%;
  height: 100%;
}
.description{
margin-top: 10em;
margin-bottom: 10em;
width: 100%;
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
  color:black;
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
  width: 40em;
  height: 40em;
}
.check image{
  width: 40em;
  margin-left: 5em;
}
.text-task{
width: 85%;
background-color: white;
margin-left: 5em;
}
.delete-container{
  height: 40em;
  width: 40em;
}
.delete-container image{
  width: 40em;
}
.new-task{
  margin-bottom: 20em;
  border-width: 0 0 2 0;
  border-bottom-color: white;
  border-radius: 25px;
  background-color: #f1f1f1;
  width: 95%;
}
.text-prueba{
  margin-bottom: 10em;
}
</style>
