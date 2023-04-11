import { createContext, useEffect, useState } from 'react';
import useFetch from "../Api/Api"
import { BACKEND_SERVER } from '../Const'

export const EventsContext = createContext({
  events: null
})

export const EventsContextProvider = (props) => {
  const [events, setEvents] = useState(null)

  const {data: eventData, loading: eventLoading, } = useFetch(BACKEND_SERVER + 'events')
  useEffect(() => {
    if (!eventLoading) {
      if (eventData.success) {
        const eventsGeojson = {
          "type": "FeatureCollection",
          "features": eventData.res.map((event) => {
            return {
              "type": "Feature",
              "properties": {
                "event_id": event.event_id,
                "time": new Date(event.time),
                "Port": event.port,
                "event_type": event.event_type,
                "from": event.start,
                "to": event.end,
                "unit": event.unit,
                "duration": event.duration
              },
              "geometry": event.geometry
            }
          })
        }
        setEvents(eventsGeojson)
      }
    }
  }, [eventLoading, eventData])

  return (
    <EventsContext.Provider
      value = {{
        events: events
      }}
    >
      {props.children}
    </EventsContext.Provider>
  )
}

export default EventsContext;