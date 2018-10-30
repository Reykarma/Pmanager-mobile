<template>
	<Page class="page" statusBarstyle="light" androidStatusBarBackground="#3b63a4" backgroundSpanUnderStatusBar="true">
		<ActionBar class="action-bar" backgroundColor="#4D7BC6" color="white">
			<WrapLayout orientation="horizontal">
				<AbsoluteLayout class="return">
					<Image class="button-return"  src="res://icon_back" stretch="aspectFill" verticalAlignment="center" />
				</AbsoluteLayout>
					<label verticalAlignment="center" class="title-page" textWrap="true" text="P-Manager" fontWeight="bold"/>
					<AbsoluteLayout class="top-menu">
						<Image class="button-calendar"  src="res://icon_calendar" stretch="aspectFill" verticalAlignment="center" />
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

                <WrapLayout @longPress="showbutton(list.id)" v-if="list.status==status" v-for="list in tasks" class="cards" backgroundColor="white">
				    			<label class="title-cards" textWrap="true" :text="list.title"/>
                  <label class="progress-task" textWrap="true" :text="list.progress"/>

									<WrapLayout class="content_components">
										<AbsoluteLayout v-show="list.button" class="left_button">
											<Image v-show="list.status!='Backlog'" src="res://icon_left" stretch="aspectFill" verticalAlignment="center" @tap="change_left(list.status,list.id)"/>
										</AbsoluteLayout>

										<AbsoluteLayout horizontalAlignment="center"  @tap="Delete(list.id)" v-show="list.button" class="Delete_button">
											<Image src="res://icon_delete" stretch="aspectFill" verticalAlignment="center" />
										</AbsoluteLayout>

										<AbsoluteLayout v-show="list.button" class="right_button">
											<Image  v-show="list.status!='Stop'" src="res://icon_right" stretch="aspectFill" verticalAlignment="center" @tap="change_right(list.status,list.id)" />
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
import ModalComponent from "./newtask";
export default {
    data() {
        return {
            status: ["Backlog", "Progress", "Review", "Stop"],
            tasks: [],
            id:0,
        };
    },
    methods: {
        Nuevo(status) {
            var status = status;
						this.id=this.id+1
            this.$showModal(ModalComponent, { props: { status: status, id:this.id} }).then(
                data => {
                    if (data.Titulo != "") {
                        this.tasks.push({
                            id: data.id,
                            status: data.status,
                            title: data.Titulo,
                            progress: data.progress,
                            coment: data.comment,
                            button: data.button
                        });
                    }
                }
            );
        },
        Delete(id) {
            for (var a in this.tasks) {
                if (this.tasks[a].id ===id) {
                    this.tasks.splice(a, 1);
										break;
                }
            }
        },
        showbutton(id) {
            for (var a in this.tasks){
                if(this.tasks[a].id===id){
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
				change_right(status,id){
					var index = this.status.indexOf(status)
					for(var a in this.tasks){
						if (this.tasks[a].id === id) {
								this.tasks[a].status=this.status[index+1];
								this.tasks[a].button=false;
								break;
						}
					}
				},
				change_left(status,id){
					var index = this.status.indexOf(status)
					for(var a in this.tasks){
						if (this.tasks[a].id === id) {
								this.tasks[a].status=this.status[index-1]
								this.tasks[a].button=false;
								break;
						}
					}
				}
    }
};
</script>

<style scoped>
.return{
	width: 15%;
}
.button-return{
	width: 70%;
	height: 100%;
}
.title-page{
	font-size: 20%;
	width:30%;
}
.top-menu{
	width:40%;
}
.button-calendar{
	width: 25%;
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
