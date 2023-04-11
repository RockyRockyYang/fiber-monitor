import { createContext, useEffect, useState } from 'react';
import useFetch from "../Api/Api"
import { BACKEND_SERVER } from '../Const'

export const RoutesContext = createContext({
  routes: null
})

export const RoutesContextProvider = (props) => {
  const [routes, setRoutes] = useState(null)

  const {data: routeData, loading: routeLoading, } = useFetch(BACKEND_SERVER + 'routes')
  useEffect(() => {
    if (!routeLoading) {
      if (routeData.success) {
        const routesGeojson = routeData.res.map((route) => {
          return {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "properties": {
                "name": route.name,
              },
              "geometry": route.geometry
            }]
          }
        })[0]   // might change if multiple route applies
        setRoutes(routesGeojson)
      }
    }
  }, [routeLoading, routeData])
  
  return (
    <RoutesContext.Provider
      value = {{
        routes: routes
      }}
    >
      {props.children}
    </RoutesContext.Provider>
  )
}

export default RoutesContext;