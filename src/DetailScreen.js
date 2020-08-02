import * as React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {SceneProgress} from './SceneProgress';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    marginTop: 20,
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
  },
});

export const DetailScreen = ({navigation,route}) => (
  
  <React.Fragment>
  
    <View style={styles.container}>
      <SharedElement id={route.params.item.id} style={StyleSheet.absoluteFill}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{uri:route.params.item.avatar}}
        />
      </SharedElement>
      <SharedElement id={route.params.item.id +10}>
<Text style={styles.text}>{route.params.item.first_name+" "+ route.params.item.last_name }{"\n"}

</Text>

      </SharedElement>
      
      
    </View>
    <SceneProgress />
  </React.Fragment>
);

DetailScreen.navigationOptions = {
  title: 'Boys will be boys',
};

// Add the `sharedElements` function to the component, which
// should return a list of shared-elements to transition.
// The `sharedElements` function is called whenever you navigate
// to or from this screen. You can use the provided navigation
// states or trigger or disable animations.
DetailScreen.sharedElements = (navigation, otherNavigation, showing) => [
  {id:navigation.route.params.item.id},
  {id:navigation.route.params.item.id+10, animation: 'fade'},
  
  ]
  