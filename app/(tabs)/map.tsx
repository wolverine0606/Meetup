import Mapbox, { Camera, CircleLayer, LocationPuck, ShapeSource } from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';
import { router, Stack } from 'expo-router';
import { View } from 'react-native';

import { useNearbyEvents } from '~/hooks/useNearbyEvents';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN!);

export default function EventsTabLayout() {
  const { events } = useNearbyEvents();
  //console.log(events);

  const points = events
    .filter((event) => event.long && event.lat)
    .map((event) => point([event.long, event.lat], { event }));
  return (
    <View className="flex-1 gap-3 bg-white">
      <Stack.Screen options={{ title: 'map', headerBackTitleVisible: false }} />
      <Mapbox.MapView style={{ height: '100%' }}>
        <Camera followUserLocation followZoomLevel={10} />
        <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />

        <ShapeSource
          id="events"
          cluster
          shape={featureCollection(points)}
          onPress={(event) => {
            console.log(event);
            router.push(`/event/${event.features[0].properties.event.id}`);
          }}>
          {/* {points.map((point, index) => (
            <Mapbox.PointAnnotation
              coordinate={point.geometry.coordinates}
              id={`pt-ann-${index}`}
              key={`pt-ann-${index}`}>
              <Feather name="map-pin" size={24} color="red" />
            </Mapbox.PointAnnotation>
          ))} */}

          <CircleLayer
            id="events"
            style={{
              circlePitchAlignment: 'map',
              circleColor: '#42E100',
              circleRadius: 15,
              circleOpacity: 1,
              circleStrokeWidth: 2,
              circleStrokeColor: 'white',
            }}
          />
        </ShapeSource>
      </Mapbox.MapView>
    </View>
  );
}
