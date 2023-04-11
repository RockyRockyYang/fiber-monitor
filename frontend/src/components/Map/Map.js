import "./Map.css";
import { useRef, useState, useEffect, useContext } from 'react';
import Map, { NavigationControl, Source, Layer } from "react-map-gl";
import { MAPBOX_TOKEN } from './MapboxConst'
import GeocoderControl from './GeocoderControl';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer, routeLayer } from './layers';
import EventInfo from "./EventInfo";
import { Spin } from 'antd';
import { EventsContext } from '../../store/events-context'
import { RoutesContext } from '../../store/routes-context'
import { FiltersContext } from '../../store/filters-context'


function Mapbox() {
  const mapRef = useRef(null);
  const [popupInfo, setPopupInfo] = useState(null);

  const eventsCtx = useContext(EventsContext)
  const [eventsGeojson, setEventsGeojson]= useState(null)
  useEffect(() => {
    if (eventsCtx.events) {
      setEventsGeojson(eventsCtx.events)
    }
  }, [eventsCtx.events])

  const routesCtx = useContext(RoutesContext)
  const [routesGeojson, setRoutesGeojson]= useState(null)
  useEffect(() => {
    if (routesCtx.routes) {
      setRoutesGeojson(routesCtx.routes)
    }
  }, [routesCtx.routes])

  const [mapLoading, setMapLoading] = useState(true)
  useEffect(() => {
    if (eventsGeojson && routesGeojson) {
      setMapLoading(false)
    }
  }, [eventsGeojson, routesGeojson]) 

  // event filter
  const filtersCtx = useContext(FiltersContext)
  useEffect(() => {
    const filterDict = filtersCtx.filters
    if (filterDict) {
      if ('time' in filterDict) {
        if (!filterDict['time']) { // clear
          setEventsGeojson(eventsCtx.events)
        } else {
          const filteredEvents = eventsGeojson.features.filter((event) => {
            return (event.properties.time >= filterDict['time'][0]  && event.properties.time <= filterDict['time'][1])
          })
          setEventsGeojson((geojson) => {
            return {
              ...geojson,
              "features": filteredEvents
            }
          })
        }
      }
    }
  }, [filtersCtx.filters, eventsCtx, eventsGeojson])

  const onClick = event => {
    const feature = event.features[0];
    if (!feature) {
      return
    }
    if (feature.layer.id === 'clusters') {
      const clusterId = feature.properties.cluster_id;
      mapRef.current.getSource('event').getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
          return;
        }
        mapRef.current.easeTo({
          center: feature.geometry.coordinates,
          zoom,
          duration: 500
        });
      });
    }
    if (feature.layer.id === 'unclustered-point') {
      // console.log('point:', feature)
      const coordinates = feature.geometry.coordinates.slice();
      setPopupInfo({
        longitude: coordinates[0],
        latitude: coordinates[1],
        properties: feature.properties
      });
    }
  };

  return (
    <>
      {mapLoading && 
        <Spin tip="Loading" size="large" className="spin"/>
      }
      {!mapLoading && 
        <Map
          initialViewState={{
            longitude: -74.6,
            latitude: 40.4,
            zoom: 10,
          }}
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{position: "absolute", width: "100%", top: "0", bottom: "0"}}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          onClick={onClick}
          ref={mapRef}
          interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
        >
          <NavigationControl position="top-left" />
          <GeocoderControl position="top-right" />
          <Source
            id="route"
            type="geojson"
            data={routesGeojson}
            // data="./data/route.geojson"
          >
            <Layer {...routeLayer}/>
          </Source>
          <Source
            id="event"
            type="geojson"
            data={eventsGeojson}
            // data = "./data/sample.geojson"
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
          </Source>
          {popupInfo && (
            <EventInfo
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              properties={popupInfo.properties}
              onClose={() => setPopupInfo(null)}
            />
          ) 
          }
        </Map>
      }
    </>
  );
}

export default Mapbox;
