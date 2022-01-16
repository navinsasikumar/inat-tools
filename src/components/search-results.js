import axios from 'axios';
import {useEffect, useState} from 'react';
import INatLinks from './inat-links';
import ObservationSquare from './observation-square';
import SearchFilters from './search-filters';

const INAT_API_URL = 'https://api.inaturalist.org/v1';


const SearchResults = () => {
  const [data, setData] = useState([]);
  
  const [taxaMatch, setTaxaMatch] = useState('');
  const [taxaList, setTaxaList] = useState([]);

  const handleTaxaChange = (event) => {
    const searchStr = event.target.value;
    console.log(searchStr);
    if (searchStr.length > 2) {
      setTaxaMatch(searchStr);
    }
  };

  useEffect(() => {
    async function fetchAPI() {
      const res = await axios.get(`${INAT_API_URL}/taxa/autocomplete?q=${taxaMatch}`)
      console.log(res.data);
      setTaxaList(res.data);
    }

    const timeOutId = setTimeout(() => fetchAPI(), 500);
    return () => clearTimeout(timeOutId);
  }, [taxaMatch]);

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
        <SearchFilters
          handleTaxaChange={handleTaxaChange}
          taxaList={taxaList}
        />
        <INatLinks queryStr="" />
        <div className="w-full lg:flex items-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 my-10 mb-2 flex-wrap">
            {
              data.results && data.results.map(obs => (
               <ObservationSquare obs={obs} key={obs.id} />
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchResults;
