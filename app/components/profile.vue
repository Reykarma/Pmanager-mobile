<template>
  <Page backgroundColor="#ededed" androidStatusBarBackground="#3b63a4" class="page">
    <ActionBar class="action-bar" backgroundColor="#4D7BC6" color="white">
			<WrapLayout orientation="horizontal">
				<AbsoluteLayout class="return">
					<Image @tap="$navigateBack" class="button-return"  src="res://icon_back" stretch="aspectFill" verticalAlignment="center" />
				</AbsoluteLayout>
					<label verticalAlignment="center" class="title-page" textWrap="false" text="Profile" fontWeight="bold"/>
			</WrapLayout>
		</ActionBar>
    <ScrollView>
      <StackLayout orientation="vertical" backgroundColor="white">
        <AbsoluteLayout class="container-image">

        </AbsoluteLayout>
        <StackLayout orientation="vertical" class="texts">
          <label class="Name" textWrap="true" text="Jose Armando Colmenares"/>
          <StackLayout orientation="horizontal" class="information">

          </StackLayout>
        </StackLayout>
      </StackLayout>
  </ScrollView>
  </Page>
</template>

<script>
require( "nativescript-localstorage" );
import projects from './projects'
export default {
    data () {
        return {

        };
    },
    methods:{

    }
}
</script>

<style scoped>
.return{
	width: 15%;
	height: 100%;
}
.button-return{
	height: 40em;
}
.title-page{
	font-size: 20em;
	width:80%;
}
  .container-image{
    background-color: red;
    width: 140em;
    height: 140em;
    border-radius: 100%;
    margin-top: 20em;
  }
  .Name{
    width: 100%;
    text-align: center;
    margin-top: 12em;
    font-size: 25em;
    font-weight: bold;
  }
  .information{
    width: 85%;
    height: 200em;
    border-radius: 10em;
    margin-top: 20em;
    background-color: #e6e7e7;
  }
</style>
