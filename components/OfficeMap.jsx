import React from 'react'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps'
import { compose, withProps, lifecycle } from 'recompose'

const GOOGLE_MAPS_KEY_API = process.env.GOOGLE_MAPS_KEY_API || 'xxxxxxxxxx'

const defaultPosition = { lat: 41.85073, lng: -87.65126 }

const OfficeMap = ({ location, isMarkerShown }) => {
  if (!location) return null

  return (
    <GoogleMap defaultZoom={15} defaultCenter={location || defaultPosition}>
      {isMarkerShown && <Marker position={location || defaultPosition} />}
    </GoogleMap>
  )
}

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAPS_KEY_API}`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({ address: this.props.office }, (results, status) => {
        if (status === 'OK') {
          console.log('here result of geocoder', results)
          const { lat, lng } = results[0].geometry.location
          this.setState({ location: { lat: lat(), lng: lng() } })
        } else {
          console.log(
            `Geocode was not successful for the following reason: ${status}`
          )
        }
      })
    },
  })
)(OfficeMap)
