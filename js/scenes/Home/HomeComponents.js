import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  View,
  Text,
  ScrollView
} from 'react-native';
import Moment from 'moment';

// COMPONENTS

export const DateHolder = ({ cStyles, nextEvent }) => (
  <View style={cStyles.dateHolder}>
    <Text style={cStyles.eventDay}>{Moment.unix(nextEvent.date).format('D')}</Text>
    <Text style={cStyles.eventMonth}>{(Moment.unix(nextEvent.date).format('MMM')).toUpperCase()}</Text>
  </View>
);

export const EventInfo = ({ cStyles, nextEvent }) => (
  <View style={cStyles.eventInfo}>
    <Text style={cStyles.nextEvent}>Next Event:</Text>
    <Text style={cStyles.eventDate}>
      {Moment.unix(nextEvent.date).format('MMMM Do YYYY')}
    </Text>
    <Text style={cStyles.eventDate}>
      {Moment.unix(nextEvent.startTime).format('hh:mm a')} - {Moment.unix(nextEvent.endTime).format('hh:mm a')}
    </Text>
  </View>
)

export const EventLocation = ({ cStyles, location }) => {
  
  const {
    streetNumber,
    streetName,
    name,
    city,
    province,
    unitNumber,
    postCode
  } = location;
  
  return (
    <View>
      <Text style={cStyles.locationText}>
        {(location) && name}
      </Text>
      <Text style={cStyles.locationText}>
        {(location) && `${streetNumber} ${streetName} ${unitNumber}, ${city}, ${province}, ${postCode}`}
      </Text>
    </View>
  )
};

export const AttendeeListItem = ({ itemStyles, attendee }) => (
  <View style={itemStyles.attendeeContainer}>
    <Image
      style={itemStyles.attendeePhoto}
      source={require('../../assets/images/glenn.png')}
    />
    <Text style={itemStyles.attendeeName}>{attendee.fullName}</Text>
  </View>
);


export const AttendeeList = ({ cStyles, attendees }) => (
  <View style={cStyles.attendContainer}>
    <Text style={cStyles.attendHeader}>Attending</Text>
    <ScrollView contentContainerStyle={cStyles.attendeeScrollView}>
      {(attendees)
        && attendees.map(attendee => (
          <AttendeeListItem
            key={attendee.email}
            itemStyles={cStyles}
            attendee={attendee}
          />
        ))}
    </ScrollView>
  </View>
);

DateHolder.propTypes,
EventInfo.propTypes = {
  nextEvent: PropTypes.shape({
    attendees: PropTypes.arrayOf(PropTypes.shape({
      bio: PropTypes.string,
      email: PropTypes.string,
      fullName: PropTypes.string,
      goals: PropTypes.objectOf(PropTypes.string),
      myTalks: PropTypes.arrayOf(PropTypes.string),
      socialMediaUrls: PropTypes.objectOf(PropTypes.string),
      speakerStats: PropTypes.arrayOf(PropTypes.shape({
        quality: PropTypes.string,
        submitAmnt: PropTypes.number,
        value: PropTypes.number
      })),
    })),
    date: PropTypes.number,
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    eventCode: PropTypes.string,
    id: PropTypes.string,
    location: PropTypes.objectOf(PropTypes.string),
    speakers: PropTypes.arrayOf(PropTypes.string),
    talks: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

EventLocation.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired
};

AttendeeListItem.propTypes = {
  attendee: PropTypes.shape({
    bio: PropTypes.string,
    email: PropTypes.string,
    fullName: PropTypes.string,
    goals: PropTypes.objectOf(PropTypes.string),
    myTalks: PropTypes.arrayOf(PropTypes.string),
    socialMediaUrls: PropTypes.objectOf(PropTypes.string),
    speakerStats: PropTypes.arrayOf(PropTypes.shape({
      quality: PropTypes.string,
      submitAmnt: PropTypes.number,
      value: PropTypes.number
    }))
  }).isRequired
}

AttendeeList.propTypes = {
  attendees: PropTypes.arrayOf(PropTypes.shape({
    bio: PropTypes.string,
    email: PropTypes.string,
    fullName: PropTypes.string,
    goals: PropTypes.objectOf(PropTypes.string),
    myTalks: PropTypes.arrayOf(PropTypes.string),
    socialMediaUrls: PropTypes.objectOf(PropTypes.string),
    speakerStats: PropTypes.arrayOf(PropTypes.shape({
      quality: PropTypes.string,
      submitAmnt: PropTypes.number,
      value: PropTypes.number
    })),
  })).isRequired
};