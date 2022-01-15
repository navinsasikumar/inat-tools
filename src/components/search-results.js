import axios from 'axios';
import {useEffect, useState} from 'react';
import INatLinks from './inat-links';
import ObservationSquare from './observation-square';

const INAT_API_URL = 'https://api.inaturalist.org/v1';

const SearchResults = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchAPI() {
      const res = await axios.get(`${INAT_API_URL}/observations`);
      setData(res.data);
    }

    fetchAPI();
  }, []);

  return (
    <div>
      <section className="container mx-auto px-6 mb-10"> 
        <INatLinks queryStr="" />
        <div className="w-full lg:flex items-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 my-10 mb-2 flex-wrap">
            {
              data.results && data.results.map(obs => (
               <ObservationSquare obs={obs} />
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchResults;
