import Mapbox, {
  Camera,
  CircleLayer,
  Images,
  LocationPuck,
  ShapeSource,
  SymbolLayer,
} from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';
import { router, Stack } from 'expo-router';
import { View } from 'react-native';

import { useNearbyEvents } from '~/hooks/useNearbyEvents';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN!);

export default function EventsMapView() {
  const { events } = useNearbyEvents();
  //console.log(events);

  const points = events
    .filter((event) => event.long && event.lat)
    .map((event) => point([event.long, event.lat], { event }));

  return (
    <View className="flex-1">
      <Stack.Screen options={{ headerBackTitleVisible: false }} />
      <Mapbox.MapView style={{ height: '100%' }}>
        <Camera followUserLocation followZoomLevel={14} />
        <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />

        <ShapeSource
          id="events"
          cluster
          shape={featureCollection(points)}
          onPress={(event) => router.push(`/event/${event.features[0].properties.event.id}`)}>
          {/* <SymbolLayer
            id="events-icons"
            style={{
              iconImage: 'pin',
              iconSize: 0.5,
              iconAllowOverlap: true,
              iconAnchor: 'bottom',
            }}
          />
          <Images images={{}} /> */}
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
