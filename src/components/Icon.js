import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Icon(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Ionicons name={props.name} size={props.size} style={props.style} />
    </TouchableOpacity>
  );
}
