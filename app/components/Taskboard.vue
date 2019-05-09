<template>
	<Page class="page" statusBarstyle="light" androidStatusBarBackground="#3b63a4" backgroundSpanUnderStatusBar="true">
		<ActionBar class="action-bar" backgroundColor="#4D7BC6" color="white">
			<WrapLayout orientation="horizontal">
				<AbsoluteLayout class="return">
					<Image @tap="$navigateBack" class="button-return"  src="res://icon_back" stretch="aspectFill" verticalAlignment="center" />
				</AbsoluteLayout>
					<label verticalAlignment="center" class="title-page" textWrap="false" :text="title" fontWeight="bold"/>
					<AbsoluteLayout class="top-menu">
						<Image @tap="check_network()" class="button-calendar"  src="res://icon_add_green" stretch="aspectFill" verticalAlignment="center" />
					</AbsoluteLayout>
			</WrapLayout>
		</ActionBar>
		<GridLayout class="container-page">
		<GridLayout>
		<ScrollView orientation="horizontal">
			<FlexboxLayout class="container">
				<StackLayout v-for="list in lists" orientation="vertical" class="container-list">
					<AbsoluteLayout class="Title-list">
						<label verticalAlignment="center" textWrap="true" :text="list.td" fontWeight="bold"/>
						<AbsoluteLayout class="add-card" text="+" fontWeight="bold" @tap="Nuevo(list.td,list._id)">
							<Image class="button_add" src="res://icon_add" stretch="aspectFill" verticalAlignment="center"/>
						</AbsoluteLayout>
          </AbsoluteLayout>

            <ScrollView scrollBarIndicatorVisible="false" class="vertical" orientation="vertical">
              <StackLayout v-if="task._thingstoid==list._id" v-for="task in tasks" orientation="vertical" class="list">
                <WrapLayout  v-for="card in task.things" @longPress="showbutton(card._id,list._id)" class="cards" backgroundColor="white">
									<StackLayout @tap="checklist(card._id, card.name)" orientation="vertical">
				    				<label  class="title-cards" textWrap="true" :text="card.name"/>
                  	<label  class="progress-task" textWrap="true" text="8/10"/>
									</StackLayout>
									<WrapLayout class="content_components">
										<AbsoluteLayout v-show="card.button" class="left_button">
											<Image src="res://icon_left" stretch="aspectFill" verticalAlignment="center" @tap="change({status:card.status,_id:list._id, sai:'m',m:''})"/>
										</AbsoluteLayout>
										<AbsoluteLayout horizontalAlignment="center"  @tap="Delete({_id:card._id, m:''})" v-show="card.button" class="Delete_button">
											<Image src="res://icon_delete" stretch="aspectFill" verticalAlignment="center" />
										</AbsoluteLayout>
										<AbsoluteLayout v-show="card.button" class="right_button">
											<Image src="res://icon_right" stretch="aspectFill" verticalAlignment="center" @tap="change({status:card.status,_id:card._id, sai:'n',m:''})" />
										</AbsoluteLayout>
	                </WrapLayout>
                </WrapLayout>

              </StackLayout>
            </ScrollView>
          </StackLayout>
        </FlexboxLayout>
        </ScrollView>
			</GridLayout>
			</GridLayout>
    </Page>
</template>

<script>
require( "nativescript-localstorage" );
import ModalComponent from "./newtask";
import checklist from "./checklist";
import projects from './projects';
var SocketIO = require('nativescript-socketio').SocketIO;
var direccion_socket="https://pmanagerd.mybluemix.net/view"
var direccion_data="https://pmanagerd.mybluemix.net/api/"
var querystring = require ("querystring")
require( "nativescript-localstorage" );
var socketIO = new SocketIO(direccion_socket);
const httpModule = require("http");
const connectivity = require("tns-core-modules/connectivity");
export default {

props: ["user", "project","title"],
data() {
		return {
				lists: [],
				tasks: [],
				id:0,
				adios:"",
				mostrar:false
		};
},
	mounted(){
	socketIO.on('message', (msj)=>{
		if(msj.typeAction=='changeStatus'){
			this.change(msj);
		}else if(msj.typeAction=='deleteTask'){
			this.Delete(msj);
		}else if(msj.typeAction=='title'){
			this.update_title(msj);
		}else{
			this.new_task(msj);
		}
	})
	},
	created(){
	this.check_network();
	},
    methods: {
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
				socketIO.connect()
				httpModule.request({
						url: direccion_data+this.user+"/"+this.project+"/task",
						method:'GET'
					}).then((response)=>{
						var r = response.content.toJSON();
						this.lists=r.lists
						for (var a in r.liststodo) {
							for (var b in r.liststodo[a].things) {
								r.liststodo[a].things[b].button=false
							}
						}
						this.tasks=r.liststodo
					});
			},
			update_title(data){
				for (var a in this.tasks) {
					if (data._id==this.tasks[a]._id){
							this.tasks[a].work=data.work
							break;
					}
				}
			},
        Nuevo(status,id) {
            this.$showModal(ModalComponent, { props: { status: status, id:this.id} }).then(
                data => {
                    if (data.Titulo != "") {
												httpModule.request({
														url: direccion_data+this.user+"/"+this.project+"/task",
														method: 'POST',
														content: querystring.stringify({
														'name': data.Titulo,
														'status':id,
														'typeAction': data.typeAction,
														'tags':"",
														})
													});
                    }
                }
            );
        },
				new_task(data){
					for (var a in this.tasks) {
						if(this.tasks[a]._thingstoid==data.status){
							this.tasks[a].things.push({
							_id: data._id,
							name: data.name,
							details:"",
							button: false,
						});
						}
					}
				},
        Delete(data) {
					if(data.m==''){
					httpModule.request({
							url:  direccion_data+this.user+"/"+this.project+"/task",
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
        showbutton(card,list) {
            for (var a in this.tasks){
                if(this.tasks[a]._thingstoid==list){
									for (var b in this.tasks[a].things) {
										if(this.tasks[a].things[b]._id==card) {
											if (!this.tasks[a].things[b].button){
												this.tasks[a].things[b].button=true
											}else{
												this.tasks[a].things[b].button=false
											}
										}
									}
								}
							}
        },
				change(data){
					if(data.m==""){
					httpModule.request({
							url:  direccion_data+this.user+"/"+this.project+"/task",
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
								this.tasks[a].button=false
								break;
							}
						}
					}
				},
				checklist(id, work){
					this.$navigateTo(checklist,{transition:{name:"slideleft",duration:400}, props: {user:this.user, project:this.project, id:id, work:work }});
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
	height: 40em;
}
.title-page{
	font-size: 20em;
	width:50%;
}
.top-menu{
	width:30%;
	height:40em;
}
.button-calendar{
	height: 40em;
	margin-left: 60%;
}
.container-page{
	height: 100%;
}
.container {
    width: auto;
    background-Color:#014185;
}
.container-list{
  width: 320em;
  margin-top: 10em;
  margin-bottom: 8em;
}
.Title-list{
  border-radius: 10px 10px 0 0;
  margin-top: 25px;
  width: 90%;
  height: 50em;
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
  text-align: center;
	font-weight: bold;
	font-size: 17em;
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
.button-container{
  height: 50em;
  width: 50em;
  horizontal-align:right;
  vertical-align: bottom;
  margin-right: 13em;
  margin-bottom: 18em;
}
.buttons{
  height: 100%;
}
</style>
