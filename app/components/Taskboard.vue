<template>
    <Page class="page" statusBarstyle="light" androidStatusBarBackground="#3b63a4" backgroundSpanUnderStatusBar="true"	 >
    <ActionBar title="P-manager" class="action-bar" backgroundColor="#4D7BC6" color="white" />
      <ScrollView orientation="horizontal">
        <FlexboxLayout class="container">

          <StackLayout v-for="status in status" orientation="vertical" class="container-list">
            <AbsoluteLayout class="Title-list">
                <label textWrap="true" :text="status" fontWeight="bold"/>
                <button class="add-card" text="+" fontWeight="bold" @tap="Nuevo(status)"/>
            </AbsoluteLayout>

            <ScrollView scrollBarIndicatorVisible="false" class="vertical" orientation="vertical">
              <StackLayout orientation="vertical" class="list">
                <WrapLayout @longPress="Delete(list.id)" v-if="list.status== status" v-for="list in tasks" class="cards" backgroundColor="white">
                  <label class="title-cards" textWrap="true" :text="list.title"/>
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
    data () {
        return {
        mensaje:"afios",
        status:['Backlog','Progress','Review','Stop'],
        tasks:[],
        delete_id:""
        };
    },
    methods:{
      Nuevo(status){
        var status=status
        this.$showModal(ModalComponent,{ props:{status: status}}).then(data =>{
          if(data.Titulo!=""){
          this.tasks.push({
            id:data.id,
            status:data.status,
            title:data.Titulo,
            progress: data.progress,
            coment: data.comment,
            play: data.play
            });
          }
        });
      },
      Delete(id){
        this.delete_id=id;
      }
    },
}
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



</style>
