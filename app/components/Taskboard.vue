<template>
	<Page class="page" statusBarstyle="light" androidStatusBarBackground="#3b63a4" backgroundSpanUnderStatusBar="true">
		<ActionBar class="action-bar" backgroundColor="#4D7BC6" color="white">
			<WrapLayout orientation="horizontal">
				<AbsoluteLayout class="return">
					<Image class="button-return"  src="res://icon_back" stretch="aspectFill" verticalAlignment="center" />
				</AbsoluteLayout>
					<label verticalAlignment="center" class="title-page" textWrap="true" text="P-Manager" fontWeight="bold"/>
					<AbsoluteLayout class="top-menu">
						<Image @tap="prueba()" class="button-calendar"  src="res://icon_calendar" stretch="aspectFill" verticalAlignment="center" />
					</AbsoluteLayout>
			</WrapLayout>
		</ActionBar>

		<ScrollView orientation="horizontal">
			<FlexboxLayout class="container">
				<StackLayout v-for="status in status" orientation="vertical" class="container-list">
					<AbsoluteLayout class="Title-list">
						<label verticalAlignment="center" textWrap="true" :text="status" fontWeight="bold"/>
						<AbsoluteLayout class="add-card" text="+" fontWeight="bold" @tap="Nuevo(status)">
							<Image class="button_add" src="res://icon_add" stretch="aspectFill" verticalAlignment="center" />
						</AbsoluteLayout>
          </AbsoluteLayout>

            <ScrollView scrollBarIndicatorVisible="false" class="vertical" orientation="vertical">
              <StackLayout orientation="vertical" class="list">
                <WrapLayout @tap="checklist(list._id)"  @longPress="showbutton(list._id)" v-if="list.status==status" v-for="list in tasks" class="cards" backgroundColor="white">
				    			<label class="title-cards" textWrap="true" :text="list.work"/>
                  <label class="progress-task" textWrap="true" text="8/10"/>

									<WrapLayout class="content_components">
										<AbsoluteLayout v-show="list.button" class="left_button">
											<Image v-show="list.status!='Backlog'" src="res://icon_left" stretch="aspectFill" verticalAlignment="center" @tap="change({status:list.status,_id:list._id, sai:'m',m:''})"/>
										</AbsoluteLayout>

										<AbsoluteLayout horizontalAlignment="center"  @tap="Delete({_id:list._id, m:''})" v-show="list.button" class="Delete_button">
											<Image src="res://icon_delete" stretch="aspectFill" verticalAlignment="center" />
										</AbsoluteLayout>

										<AbsoluteLayout v-show="list.button" class="right_button">
											<Image  v-show="list.status!='Stop'" src="res://icon_right" stretch="aspectFill" verticalAlignment="center" @tap="change({status:list.status,_id:list._id, sai:'n',m:''})" />
										</AbsoluteLayout>
	                </WrapLayout>

                </WrapLayout>

              </StackLayout>
            </ScrollView>
          </StackLayout>
        </FlexboxLayout>
        </ScrollView>
    </Page>
</template>

<script>
require( "nativescript-localstorage" );
import ModalComponent from "./newtask";
import checklist from "./checklist";
var SocketIO = require('nativescript-socketio').SocketIO;
var direccion_socket="https://pmanagerd.mybluemix.net/view"
var direccion_data="https://pmanagerd.mybluemix.net/api/momantai/plam/task"
var querystring = require ("querystring")
var socketIO = new SocketIO(direccion_socket);
socketIO.connect()
const httpModule = require("http");
export default {
	mounted(){
	socketIO.on('message', (msj)=>{
		if(msj.typeAction=='changeStatus'){
			this.change(msj);
		}else if(msj.typeAction=='deleteTask'){
			this.Delete(msj);
		}else{
			this.new_task(msj);
		}
	})
	},
	created(){
		httpModule.request({
				url: direccion_data,
				method:'GET'
			}).then((response)=>{
				var r = response.content.toJSON();
				for (var a in r.task){
				r.task[a].button = false;
			}
				this.tasks = r.task;
			});
	},
    data() {
        return {
            status: ["Backlog", "Progress", "Review", "Stop"],
            tasks: [],
            id:0,
						adios:""
        };
    },
    methods: {
        Nuevo(status) {
            this.$showModal(ModalComponent, { props: { status: status, id:this.id} }).then(
                data => {
                    if (data.Titulo != "") {
												httpModule.request({
														url: direccion_data,
														method: 'POST',
														content: querystring.stringify({
														'work': data.Titulo,
														'status': data.status,
														'm': data.m,
														'typeAction': data.typeAction,
														'tags':"",
														})
													});
                    }
                }
            );
        },
				new_task(data){
					if (data.work != "") {
							this.tasks.push({
							_id: data._id,
							status: data.status,
							work: data.work,
							button: false,
						});
					}
				},
        Delete(data) {
					if(data.m==''){
					httpModule.request({
							url: direccion_data,
							method: 'PUT',
							content: querystring.stringify({
								'_id':data._id,
								'm': 'rm',
								'typeAction':'deleteTask',
								'action':'delete'
							})
						});
					}else{
						for (var a in this.tasks) {
							if (data.id==this.tasks[a]._id){
									this.tasks.splice(a,1);
									break;
							}
						}
					}
        },
        showbutton(id) {
            for (var a in this.tasks){
                if(this.tasks[a]._id==id){
                    if(this.tasks[a].button==false){
                        this.tasks[a].button=true;
												break;
                    }else{
                        this.tasks[a].button=false;
												break;
                    }
                }
            }
        },
				change(data){
					if(data.m==""){
					httpModule.request({
							url: direccion_data,
							method: 'PUT',
							content: querystring.stringify({
								'_id':data._id,
								'status': data.status,
								'm': 'rm',
								'move':data.sai,
								'typeAction':'changeStatus'
							})
						});
					}else{
						for(var a in this.tasks){
							if(data._id==this.tasks[a]._id){
								this.tasks[a].status=data.status
								break;
							}
						}
					}
				},
				checklist(id){
					this.$navigateTo(checklist,{ props: { id:id }});
				},
	}
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
	font-size: 20%;
	width:30%;
}
.top-menu{
	width:40%;
	height:40em;
}
.button-calendar{
	height: 40em;
	margin-left: 75%;
}
.container {
    width: 350%;
    height: 100%;
    background-Color:#014185;
}
.container-list{
  width: 25%;
  margin-top: 40px;
  margin-bottom: 35px;
}
.Title-list{
  border-radius: 10px 10px 0 0;
  margin-top: 25px;
  width: 90%;
  height: 200px;
  background-color: #f0e9e9;
  color: #000000;
}
.Title-list label{
  width: 75%;
  height: 80%;
  text-align: left;
  font-size: 22px;
  margin-top: 20%;
  padding-left: 10%;
}
.add-card{
  height:90%;
	margin-top: 5%;
  margin-left: 80%;
 color: white;
}
.button_add{
	width: 100%;
	height: 100%;
}
.list{
  width: 90%;
  background-color: #dadbdb;
}
.cards{
  margin-top:30px;
  margin-bottom: 25px;
  width: 90%;
  height: auto;
  text-align: center;
  box-shadow: 0 8px 10px 9px;
  border-radius: 10px;
}
.content_components{
    width:100%;
    height:auto;
}
.title-cards{
  width: 100%;
  height: auto;
  text-align: justify;
}
.progress-task{
  margin: 40px;
  text-align: left;
  width: 90%;
  color: #ee084d;
}
.Delete_button, .left_button, .right_button{
    width:12%;
    padding:10px 0 10px 0;
    font-size:22px;
    border-radius:20px;
		background-color: crimson;
}
.Delete_button{
	margin-right: 30%;
	margin-left: 30%;
}
.Delete_button image, .left_button image, .right_button image{
    width: 100%;
}
.left_button, .right_button{
		background-color: white;
}
.left_button{
	margin-left: 2%;
}
</style>
