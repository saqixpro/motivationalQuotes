import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from '../components/Icon';
import {ScrollView} from 'react-native-gesture-handler';
import {quotesRef} from '../constants/firebase';
const {width, height} = Dimensions.get('screen');

const HomeScreen = ({route}) => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [animation] = useState(new Animated.Value(1));
  const [bounce] = useState(new Animated.Value(0));
  const [category, setCategory] = useState('wisdom');

  const bounceAnimation = () => {
    Animated.loop(
      Animated.timing(bounce, {
        toValue: -20,
        duration: 550,
        useNativeDriver: true,
      }),
    ).start();
  };

  const FadeInAnimation = () => {
    Animated.timing(animation, {
      toValue: 1.2,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  const loadQuoteOfTheDay = () => {
    fetch('http://quotes.rest/qod')
      .then((res) => res.json())
      .then((data) => {
        const {quote} = data.contents.quotes[0];
        const {author} = data.contents.quotes[0];
        setQuote(quote);
        setAuthor(author);
      });
  };

  const loadTechQuotes = () => {
    fetch('http://quotes.stormconsultancy.co.uk/random.json')
      .then((res) => res.json())
      .then((data) => {
        FadeInAnimation();
        setQuote(data.quote);
        setAuthor(data.author);
      })
      .catch((err) => {
        setQuote(err);
      });
  };

  const loadQuoteCategory = (category) => {
    const quoteContainer = [];

    quotesRef.where('type', '==', category).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        quoteContainer.push(doc.data());
      });

      let quote =
        quoteContainer[Math.floor(Math.random() * quoteContainer.length)];

      FadeInAnimation();
      if (quote) {
        setQuote(quote.quote);
        setAuthor(quote.author);
      }
    });
  };

  const loadQuotes = () => {
    switch (category) {
      case 'Daily':
        loadQuoteOfTheDay();
        break;
      case 'tech':
        loadTechQuotes();
        break;
      case 'badass':
        loadQuoteCategory('badass');
        break;
      case 'islamic':
        loadQuoteCategory('islamic');
        break;
      case 'wisdom':
        loadQuoteCategory('wisdom');
        break;
      case 'brainy':
        loadQuoteCategory('brainy');
        break;
    }
  };

  const changeCategory = () => {
    let _type = null;
    if (route)
      if (route.params) if (route.params._type) _type = route.params._type;

    if (_type) {
      setCategory(_type);
      reload();
    } else {
      setCategory('wisdom');
      reload();
    }
  };

  const reload = () => loadQuotes();

  useEffect(() => changeCategory(), []);
  useEffect(() => bounceAnimation());

  const bounceAnimationStyle = {
    transform: [
      {
        translateY: bounce,
      },
      {
        perspective: 1000,
      },
    ],
  };

  const scaleAnimation = {
    transform: [
      {
        scale: animation,
      },
      {
        perspective: 1000,
      },
    ],
  };

  return (
    <ImageBackground
      style={{width, height}}
      source={require('../assets/images/bg.png')}>
      <View style={styles.blackFilter} />
      <SafeAreaView>
        <View style={styles.centerAlign}>
          <View
            style={{
              backgroundColor: '#fff',
              shadowOpacity: 1.3,
              shadowOffset: {width: 8, height: 8},
              shadowColor: '#aaa',
              padding: 20,
              marginTop: -30,
              borderRadius: 10,
            }}>
            <Text style={{fontWeight: '600'}}>
              {category == 'badass' ? 'MOTIVATIONAL ' : category.toUpperCase()}{' '}
              QUOTES
            </Text>
          </View>
        </View>
        <Animated.View style={[styles.quoteContainer, scaleAnimation]}>
          <Text
            style={{
              ...styles.quote,
            }}>
            {quote}
          </Text>

          <Text style={styles.author}>{author}</Text>
        </Animated.View>

        <View style={styles.footer}>
          <ScrollView
            style={styles.scrollview}
            onScroll={(e) =>
              e.nativeEvent.contentOffset.y > 0 ? reload() : null
            }
          />
          <Animated.View style={bounceAnimationStyle}>
            <Icon
              name={category !== 'Daily' ? 'md-arrow-up' : null}
              size={34}
            />
          </Animated.View>
          <Text
            style={{
              fontSize: 20,
            }}>
            {category == 'Daily' ? '' : 'Swipe up to Change Quote'}
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  blackFilter: {
    backgroundColor: 'rgba(0,0,0,0.01)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: height / 1.25,
    left: width / 20,
    right: width / 20,
  },
  centerAlign: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteContainer: {
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#aaa',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 1.3,
    borderRadius: 10,
    position: 'absolute',
    top: height / 5,
    left: width / 20,
    right: width / 20,
  },
  quote: {
    paddingHorizontal: 15,
    fontSize:
      width > 400
        ? 25
        : width >= 350 && width < 400
        ? 22
        : width >= 300 && width < 350
        ? 20
        : 18,
    textAlign: 'justify',
  },
  author: {
    textAlign: 'right',
    paddingRight: 30,
    paddingTop: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  scrollview: {
    width: width - 40,
    height: 60,
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 100,
  },
  container: {
    width,
    height,
  },
});
