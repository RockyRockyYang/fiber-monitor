import { createContext, useState } from 'react';


export const FiltersContext = createContext({
  filters: null,
  setFiltersHandler: () => {}
})

export const FiltersContextProvider = (props) => {
  const [filters, setFilters] = useState(null)
  
  const setFiltersHandler = (inputFilters) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        ...inputFilters
      }
    })
  }

  return (
    <FiltersContext.Provider
      value = {{
        filters: filters,
        setFiltersHandler: setFiltersHandler
      }}
    >
      {props.children}
    </FiltersContext.Provider>
  )
}

export default FiltersContext;