import { useState, useEffect } from 'react';

function useFetch(url) {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch(url)
        const res_json = await response.json()
        setData(res_json)
      } catch (e) {
        console.error('Cannot fetch data from remote: ', e)
        setError(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])
  return {data, loading, error}
}


export default useFetch;