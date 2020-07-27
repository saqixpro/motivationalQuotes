import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

export class Item extends Component {
  render() {
    return (
      <TouchableOpacity style={style.Item} onPress={this.props.onPress}>
        <LinearGradient
          style={{padding: 25, borderRadius: 12}}
          colors={['#B2004C', '#65002B', '#340016']}>
          <Text
            style={[
              {
                color: this.props.textColor || '#FFF',
                fontWeight: 'bold',
                fontSize: this.props.fontSize || 17,
              },
              style.text,
            ]}>
            {this.props.title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  Item: {
    width: '100%',
    marginVertical: 10,
    shadowColor: '#555',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.7,
  },
  text: {
    textAlign: 'center',
  },
});
