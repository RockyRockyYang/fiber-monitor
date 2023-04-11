export const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'event',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
  }
};

export const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'event',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12
  }
};

export const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'event',
  filter: ['!', ['has', 'point_count']],
  paint: {
    // 'circle-color': '#11b4da',
    'circle-color': [
      'match',
      ['get', 'event_type'],
      'A',
      '#e01919',
      'B',
      '#f07b07',
      'C',
      '#f0e807',
      '#11b4da' // other
    ],
    'circle-radius': 10,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
  }
};

export const routeLayer = {
  'id': 'route',
  'type': 'line',
  'source': 'route',
  'layout': {
    'line-join': 'round',
    'line-cap': 'round'
  },
  'paint': {
    'line-color': '#888',
    'line-width': 6
  }
}