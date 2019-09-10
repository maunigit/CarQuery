import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      posts: {}, //obj
    };
  }

  showData = () => {
    if (this.state.posts) {
      return (
        <Text style={styles.paragraph}>
          DataCarQuery {JSON.stringify(this.state.posts)}
        </Text>
      );
    } else {
      return null;
    }
  };

  //asynch version of the fetch
  fetchAsyncCarApi = async url => {
    try {
      let data = await (await fetch(url)).json();
      this.setState({ isLoaded: true, posts: data });
    } catch (error) {
      alert(error);
    }
  };

  onPressShowCar = () => {
    var urlCarQuery =
      'https://www.carqueryapi.com/api/0.3/?&cmd=getModels&make=ford&year=2010&body=SUV';
    this.fetchAsyncCarApi(urlCarQuery);

    //synch version of the fetch
    /*fetch(urlCarQuery).then(response=>response.json()).then((result)=>{
    this.setState({
      isLoaded: true,
      posts: result
    })
  }).catch(error=>alert(error))*/
  };

  urlCarMakes = 'https://www.carqueryapi.com/api/0.3/?&cmd=getMakes';

  list = [
    {
      name: 'Amy Farha',
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President',
    },
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
    },
  ];

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={item.subtitle}
      leftAvatar={{ source: { uri: item.avatar_url } }}
      bottomDivider
      chevron
    />
  );

  render() {
    return (
      <View style={styles.container}>
        {this.showData()}
        <Button
          onPress={this.onPressShowCar}
          title="View cars"
          color="#841584"
        />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.list}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
