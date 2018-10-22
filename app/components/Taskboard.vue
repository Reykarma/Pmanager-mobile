<template>
	<Page class="page" statusBarstyle="light" androidStatusBarBackground="#3b63a4" backgroundSpanUnderStatusBar="true">
		<ActionBar title="P-manager" class="action-bar" backgroundColor="#4D7BC6" color="white">
			
		</ActionBar>

		<ScrollView orientation="horizontal">
			<FlexboxLayout class="container">

				<StackLayout v-for="status in status" orientation="vertical" class="container-list">
					<AbsoluteLayout class="Title-list">
						<label textWrap="true" :text="status" fontWeight="bold"/>
            <button class="add-card" text="+" fontWeight="bold" @tap="Nuevo(status)"/>
          </AbsoluteLayout>

            <ScrollView scrollBarIndicatorVisible="false" class="vertical" orientation="vertical">
              <StackLayout orientation="vertical" class="list">
                <WrapLayout @longPress="showbutton(list.id, list.button)" v-if="list.status==status" v-for="list in tasks" class="cards" backgroundColor="white">
				    <label class="title-cards" textWrap="true" :text="list.title"/>
                <AbsoluteLayout  class="content_components">
					<Label @longPress="showbutton(list.id,list.button)" @tap="Delete(list.id)" fontWeight="bold" textWrap="true" color="white" text="Eliminar" v-show="list.button" class="Delete_button" />
                </AbsoluteLayout>
                  <label class="progress-task" textWrap="true" :text="list.progress"/>
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
            mensaje: "afios",
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

                }
            }
        },
        showbutton(id, button) {
            for (var a in this.tasks){
                if(this.tasks[a].id===id){
                    if(this.tasks[a].button==false){
                        this.tasks[a].button=true;
                    }else{
                        this.tasks[a].button=false;
                    }
                }
            }
        }
    }
};
</script>

<style scoped>
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
  width: 180px;
  height:180px;
 border-radius: 100%;
 margin-left: 80%;
 margin-top: 5%;
 color: white;
 background-color: crimson;
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
.Delete_button{
    width:100%;
    height:35%;
    padding:10px 0 10px 0;
    background-Color:crimson;
    font-size:22px;
    border-radius:20px;
}
</style>
