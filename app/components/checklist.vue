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
            <StackLayout class="properties">
                <StackLayout orientation="horizontal" class="work">
                  <AbsoluteLayout class="logo-list">
                    <Image src="res://icon_checklist" stretch="aspectFill"/>
                  </AbsoluteLayout>
                    <label verticalAlignment="center" class="title-work" textWrap="true" text="Checklist" fontWeight="bold"/>
                </StackLayout>

                <StackLayout orientation="horizontal" class="checklist">
                  <label :text="direccion"/>
                </StackLayout>

            </StackLayout>
          </ScrollView>
    </Page>
</template>

<script>
export default {
  props: ["title", "direccion_data","direccion_socket","socketIO"],

    data () {
        return {

        };
    },
      methods: {

      },
}
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
	width:70%;
}
.properties{
  height: 100%;
}
.work{
  width:100%;
  height:8%;
  background-color: #f0e9e9;
}
.logo-list{
  height: 80%;
  margin-left: 2%;
}
.title-work{
  margin-left: 4%;
  font-size: 20%;
}
.checklist{
  width: 100%;
  height: 200px;
}

</style>
