<template>
    <Page class="page" statusBarstyle="light" androidStatusBarBackground="#3b63a4" backgroundSpanUnderStatusBar="true"	 >
    <ActionBar title="P-manager" class="action-bar" backgroundColor="#4D7BC6" color="white" />
      <ScrollView orientation="horizontal">
        <FlexboxLayout class="container" backgroundColor="#014185">
          <StackLayout orientation="vertical" class="container-list">
            <AbsoluteLayout class="Title-list">
                <label textWrap="true" text="Review" fontWeight="bold"/>
                <button class="add-card" text="+" fontWeight="bold" @tap="agregar" />
            </AbsoluteLayout>
            <ScrollView scrollBarIndicatorVisible="false" class="vertical" orientation="vertical">
              <StackLayout orientation="vertical" class="list">
                <WrapLayout v-for="list in Backlog " class="cards" backgroundColor="white">
                  <label  class="title-cards" textWrap="true" :text="list.Titulo"/>
                  <label  class="progress-task" textWrap="true" :text="list.progress"/>
                </WrapLayout>
              </StackLayout>
            </ScrollView>
          </StackLayout>


        <StackLayout orientation="vertical"class="container-list">
          <AbsoluteLayout class="Title-list">
              <label textWrap="true" text="Review" fontWeight="bold"/>
              <button class="add-card" text="+" fontWeight="bold" />
          </AbsoluteLayout>
          <ScrollView scrollBarIndicatorVisible="false" class="vertical" orientation="vertical">
            <StackLayout orientation="vertical" class="list">
              <WrapLayout v-for="list in progress" class="cards" backgroundColor="white">
                <label class="title-cards" textWrap="true" :text="list.Titulo"/>
                <label  class="progress-task" textWrap="true" :text="list.progress"/>
              </WrapLayout>
            </StackLayout>
          </ScrollView>
          </StackLayout>


        <StackLayout orientation="vertical" class="container-list">
          <AbsoluteLayout class="Title-list">
              <label textWrap="true" text="Review" fontWeight="bold"/>
              <button class="add-card" text="+" fontWeight="bold" />
          </AbsoluteLayout>
          <ScrollView scrollBarIndicatorVisible="false" class="vertical" orientation="vertical">
            <StackLayout orientation="vertical" class="list">
              <WrapLayout class="cards" backgroundColor="white">
                <label class="title-cards" textWrap="true" :text="mensaje"/>
              </WrapLayout>
            </StackLayout>
          </ScrollView>
        </StackLayout>

        <StackLayout orientation="vertical" class="container-list">
          <AbsoluteLayout class="Title-list">
              <label textWrap="true" text="Review" fontWeight="bold"/>
              <button class="add-card" text="+" fontWeight="bold" />
          </AbsoluteLayout>
          <ScrollView scrollBarIndicatorVisible="false" class="vertical" orientation="vertical">
            <StackLayout orientation="vertical" class="list">
              <WrapLayout class="cards" backgroundColor="white">
                <label class="title-cards" textWrap="true" :text="mensaje"/>
              </WrapLayout>
            </StackLayout>
          </ScrollView>
        </StackLayout>
        </FlexboxLayout>
        </ScrollView>
    </Page>
</template>

<script>
const inputType = require('tns-core-modules/ui/dialogs');
export default {
    data () {
        return {
          Backlog:[

        ],
        progress:[
          {
            Titulo:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mi',
            progress:'100%'
          },
          {
            Titulo:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mi',
            progress:'100%'
          },
          {
            Titulo:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mi',
            progress:'100%'
          },
          {
            Titulo:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mi',
            progress:'100%'
          },
          {
            Titulo:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mi',
            progress:'100%'
          }
        ],
          mensaje:""
        };
    },
    methods:{
      agregar() {
      prompt({
        title: "nueva tarjeta",
        message: "Agregar nueva tarjeta",
        okButtonText: "confirmar",
        cancelButtonText: "Cancelar",
        neutralButtonText: "Neutral text",
        defaultText: "",
        inputType: inputType.text
      }).then((result) => {
        this.Backlog.push({
        Titulo: result.text,
         progress:"0"

          });
        })
      }
    },
}
</script>

<style scoped>
.container {
    width: 350%;
    height: 100%;
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
  text-align: center;
}
.progress-task{
  margin: 40px;
  text-align: left;
  width: 90%;
  color: #ee084d;
}



</style>
