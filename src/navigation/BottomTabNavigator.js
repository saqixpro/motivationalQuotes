import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({navigation, route}) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({headerTitle: getHeaderTitle(route)});

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: '#004F8C',
        inactiveTintColor: '#555',
        showLabel: false,
        labelPosition: 'below-icon',
        tabStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          height: 75,
        },
        style: {
          backgroundColor: 'rgba(255,255,255,0.7)',
          borderWidth: 0,
          borderRadius: 40,
          height: 75,
          position: 'absolute',
          left: 0,
          bottom: 20,
          right: 0,
        },
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Quotes',
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name="md-bulb" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={LinksScreen}
        options={{
          title: 'Categories',
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name="md-apps" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'FIREFLY';
    case 'Explore':
      return 'Browse Quotes';
  }
}
