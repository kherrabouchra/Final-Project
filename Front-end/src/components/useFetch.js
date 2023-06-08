import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState({}); 

  useEffect(() => {
    const fetchData = async () => {
    
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
     
    };

    fetchData();
  }, [ ]);

  return { data };
};
