import * as React from 'react';
import {View, StyleSheet, Text, Image,ActivityIndicator,FlatList,TouchableOpacity} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import TouchableScale from 'react-native-touchable-scale';
import {SceneProgress} from './SceneProgress';


const styles = StyleSheet.create({
  flex: {
  width:"100%",
  height:100,
    left:30,
    top:20
  },
  container: {
    
    flexDirection:"row"
  },
  text: {
    fontSize: 30,
  },
  caption: {
    fontSize: 20,
    opacity: 0.5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius:200,
    resizeMode: 'contain',
  },
});

export class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'react-navigation-shared-element',
  };
constructor(props){
  super(props)
  this.state={
    list:[]
  }
}
componentDidMount(){
  getMoviesFromApiAsync().then(e=>this.setState({list:e}))

}
  render() {
    const {modal} = this.props;
    console.log(this.state.list)
    // Wrap the component that you want to transition in <SharedElement>
    return (
      <React.Fragment>
        {this.state.list.length===0?<ActivityIndicator />:<FlatList data={this.state.list} keyExtractor={item => item.id} renderItem={({ item})=>
        
        <TouchableOpacity
        style={styles.flex}
        onPress={() => {
          this.props.navigation.navigate('Detail',{item});
        }}>
        <View style={styles.container}>
          <SharedElement id={item.id}>
            <Image style={styles.image} source={{uri:item.avatar}} />
          </SharedElement>
          <View style={{flexDirection:"column",left:40}}>
          <SharedElement id={item.id+10}>
      <Text style={styles.text}>{item.first_name + item.last_name}</Text>
          </SharedElement>
          <Text style={styles.caption}>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>}/>}
        
        <SceneProgress />
      </React.Fragment>
    );
  }

  

  onPressModal = () => {
    this.props.navigation.navigate('Modal');
  };
}


const getMoviesFromApiAsync = async () => {
  try {
    let response = await fetch(
      'https://reqres.in/api/users?page=2'
    );
    let json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error);
  }
};