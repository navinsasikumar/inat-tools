import axios from 'axios';
import {useEffect, useState} from 'react';
import queryString from 'query-string';
import INatLinks from './inat-links';
import ObservationSquare from './observation-square';
import SearchFilters from './search-filters';

const INAT_API_URL = 'https://api.inaturalist.org/v1';


const SearchResults = () => {
  const [data, setData] = useState([]);
  
  const [taxaMatch, setTaxaMatch] = useState('');
  const [taxaList, setTaxaList] = useState([]);
  const [selectedTaxa, setSelectedTaxa] = useState([]);
  const [typedValue, setTypedValue] = useState({ taxon: ''});

  const handleTaxaChange = (event) => {
    const searchStr = event.target.value;
    setTypedValue({...typedValue, taxon: searchStr});
    if (searchStr.length > 2) {
      setTaxaMatch(searchStr);
    }
  };

  const handleSelectFns = {
    taxa: (selectedTaxon, exclude = false) => {
      if (exclude === false) {
        setSelectedTaxa([...selectedTaxa, selectedTaxon]);
        setTaxaList([]);
        setTypedValue({...typedValue, taxon: ''});
      } else {
        console.log(selectedTaxon);
      }
    },
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
    const makeTaxaQuery = () => {
      const queryObj = {};
      const currTaxonIds = selectedTaxa.map(taxon => taxon.id);
      // const currExcludedTaxonIds = excludedTaxa.map(taxon => taxon.id);

      if (currTaxonIds.length > 0) queryObj.taxon_ids = currTaxonIds.join(',');
      // if (currExcludedTaxonIds.length > 0) queryObj.without_taxon_id = currExcludedTaxonIds.join(',');

      return queryObj;
    }

    async function fetchAPI() {
      const queryObj = {
        ...makeTaxaQuery(),
      };
      const queryStr = queryString.stringify(queryObj);
      const urlPath = queryStr ? `/observations?${queryStr}` : '/observations';

      const res = await axios.get(`${INAT_API_URL}${urlPath}`);
      setData(res.data);
    }

    fetchAPI();
  }, [selectedTaxa]);

  return (
    <div>
      <section className="container mx-auto px-6 mb-10"> 
        <SearchFilters
          handleTaxaChange={handleTaxaChange}
          taxaList={taxaList}
          selectedTaxa={selectedTaxa}
          typedValue={typedValue}
          handleSelectFns={handleSelectFns}
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
