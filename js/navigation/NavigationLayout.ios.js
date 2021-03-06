import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem as TabItem,
} from '@expo/ex-navigation';
import {
  Text,
  Image,
  Linking,
  Alert
} from 'react-native';
import { styles } from './styles';
import { typography, colors } from '../config/styles';
import Router from './routes';
import { popModal } from '../redux/modules/moreModal';
import dashboard from '../assets/icons/dashboard_icon.png';
import home from '../assets/icons/home_icon.png';
import events from '../assets/icons/events_icon.png';
import newTalk from '../assets/icons/newtalk_icon.png';
import more from '../assets/icons/more_icon.png';

const defaultRouteConfig = {
  navigationBar: {
    tintColor: colors.white,
    tintBackground: colors.black,
    titleStyle: {
      fontFamily: typography.titleHeading,
      fontSize: typography.norwester18,
      height: 40,
    },
    height: 35,
    backgroundColor: colors.darkGrey
  }
}
class NavigationLayout extends Component {

  openEmail() {
    Linking.openURL('mailto:contact@soapboxspeakers.com')
      .catch(err => console.error('An error occurred', err))
  }

  render() {
    return (
      <TabNavigation
        id="main"
        navigatorUID="main"
        initialTab="home"
        tabBarColor="#353434"
      >
        <TabItem
          id="home"
          title="home"
          renderTitle={this.renderTitle}
          renderIcon={() => <Image source={home} style={styles.navIconIos} />}
        >
          <StackNavigation
            id="home"
            navigatorUID="home"
            initialRoute={Router.getRoute('home')}
            defaultRouteConfig={defaultRouteConfig}
          />
        </TabItem>
        <TabItem
          id="events"
          navigatorUID="events"
          title="events"
          renderTitle={this.renderTitle}
          renderIcon={() => <Image source={events} style={styles.navIconIos} />}
        >
          <StackNavigation
            id="events"
            navigatorUID="events"
            initialRoute={Router.getRoute('events')}
            defaultRouteConfig={defaultRouteConfig}
          />
        </TabItem>
        <TabItem
          id="newTalk"
          title="new talk"
          renderTitle={this.renderTitle}
          renderIcon={() => <Image source={newTalk} style={styles.navIconIos} />}
          onPress={() => Alert.alert(
            'E-mail client unavailable on device emulator.'
          )}
        >
          <StackNavigation
            id="newTalk"
            navigatorUID="newTalk"
            defaultRouteConfig={defaultRouteConfig}
          />
        </TabItem>
        <TabItem
          id="dashboard"
          title="dashboard"
          renderTitle={this.renderTitle}
          renderIcon={() => <Image source={dashboard} style={styles.navIconIos} />}
        >
          <StackNavigation
            id="dashboard"
            navigatorUID="dashboard"
            initialRoute={Router.getRoute('dashboard')}
            defaultRouteConfig={defaultRouteConfig}
          />
        </TabItem>
        <TabItem
          id="more"
          title="more"
          renderTitle={this.renderTitle}
          renderIcon={() => <Image source={more} style={styles.navIconIos} />}
          onPress={() => this.props.dispatch(popModal(!this.props.isModalVisible))}
        >
        </TabItem>
      </TabNavigation>
    );
  }

  renderTitle(isSelected, title) {
    const titleStyle = {
      color: isSelected ? colors.lightGrey : colors.lightGrey,
      fontSize: 10,
      fontFamily: typography.fontMainRegular
    }
    return (
      <Text style={titleStyle}>{title}</Text>
    )
  }

}

const mapStateToProps = (state) => ({
  isModalVisible: state.modal.isModalVisible
})

export default connect(mapStateToProps)(NavigationLayout);