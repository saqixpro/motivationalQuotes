import * as React from 'react';
import {StyleSheet, View, ImageBackground, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');

import {Item} from '../components/Item';
import {Component} from 'react';

const Buttons = [
  {
    id: 'Daily',
    title: 'Quote of The Day',
  },
  {
    id: 'wisdom',
    title: 'Wisdom Quotes',
  },
  {
    id: 'islamic',
    title: 'Islamic Quotes',
  },
  {
    id: 'tech',
    title: 'Technology Quotes',
  },
  {
    id: 'badass',
    title: 'Motivational Quotes',
  },
  {
    id: 'brainy',
    title: 'Other Random Quotes',
  },
];

export default class LinksScreen extends Component {
  handlePress = (id) => {
    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'Home', params: {_type: id}}],
    });
  };

  render() {
    return (
      <ImageBackground
        style={{width, height}}
        source={require('../assets/images/bg.png')}>
        <View style={styles.container}>
          <FlatList
            style={{marginTop: 100, paddingHorizontal: 10}}
            data={Buttons}
            renderItem={({item}) => (
              <Item
                title={item.title}
                id={item.id}
                onPress={() => this.handlePress(item.id)}
              />
            )}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
