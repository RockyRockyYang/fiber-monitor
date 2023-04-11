import { Popup } from 'react-map-gl';
import { Card } from 'antd';

function EventInfo(props) {
  return (
    <Popup
      longitude={Number(props.longitude)}
      latitude={Number(props.latitude)}
      onClose={props.onClose}
    >
      <Card size="small" title="Event Info" style={{margin: 0}}>
        <div>Port: {props.properties.Port}</div>
        <div>Duration: {props.properties.duration}</div>
        <div>Event Id: {props.properties.event_id}</div>
        <div>Event Type: {props.properties.event_type}</div>
        <div>From: {props.properties.from}</div>
        <div>To: {props.properties.to}</div>
        <div>Unit: {props.properties.unit}</div>
      </Card>
    </Popup>
  )
}

export default EventInfo;
