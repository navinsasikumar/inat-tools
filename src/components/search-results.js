import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import queryString from 'query-string';
import INatLinks from './inat-links';
import ObservationSquare from './observation-square';
import SearchFilters from './search-filters';

const INAT_API_URL = 'https://api.inaturalist.org/v1';


const SearchResults = () => {
  const [data, setData] = useState([]);

  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  
  const [taxaMatch, setTaxaMatch] = useState('');
  const [taxaList, setTaxaList] = useState([]);
  const [selectedTaxa, setSelectedTaxa] = useState([]);
  const [excludedTaxa, setExcludedTaxa] = useState([]);
  
  const [placesMatch, setPlacesMatch] = useState('');
  const [placesList, setPlacesList] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [excludedPlaces, setExcludedPlaces] = useState([]);
  
  const [typedValue, setTypedValue] = useState({ taxon: '', place: ''});

  const handleInputChangeFns = {
    taxa: (event) => {
      const searchStr = event.target.value;
      setTypedValue({...typedValue, taxon: searchStr});
      if (searchStr.length > 2) {
        setTaxaMatch(searchStr);
      } else {
        setTaxaList([]);
      }
    },
    places: (event) => {
      const searchStr = event.target.value;
      setTypedValue({...typedValue, place: searchStr});
      if (searchStr.length > 2) {
        setPlacesMatch(searchStr);
      } else {
        setPlacesList([]);
      }
    },
  };

  const handleInputBlurFns = {
    taxa: () => {
      setTimeout(() => setTaxaList([]), 500);
    },
    places: () => {
      setTimeout(() => setPlacesList([]), 500);
    },
  };

  const handleSelectFns = {
    taxa: (selectedTaxon, exclude = false) => {
      if (exclude === false) {
        setSelectedTaxa([...selectedTaxa, selectedTaxon]);
        setTaxaList([]);
        setTypedValue({...typedValue, taxon: ''});
      } else {
        setExcludedTaxa([...excludedTaxa, selectedTaxon]);
        setTaxaList([]);
        setTypedValue({...typedValue, taxon: ''});
      }
    },
    places: (selectedPlace, exclude = false) => {
      if (exclude === false) {
        setSelectedPlaces([...selectedPlaces, selectedPlace]);
        setPlacesList([]);
        setTypedValue({...typedValue, place: ''});
      } else {
        setExcludedPlaces([...excludedPlaces, selectedPlace]);
        setPlacesList([]);
        setTypedValue({...typedValue, place: ''});
      }
    },
  };

  const handleSelectedClick = (index, type, value) => {
    switch (type) {
      case 'taxa': {
        const localSelectedTaxa = [...selectedTaxa];
        localSelectedTaxa.splice(index, 1);
        setSelectedTaxa(localSelectedTaxa);
        break;
      }
      case 'taxaExclude': {
        const localExcludedTaxa = [...excludedTaxa];
        localExcludedTaxa.splice(index, 1);
        setExcludedTaxa(localExcludedTaxa);
        break;
      }
      case 'places': {
        const localSelectedPlaces = [...selectedPlaces];
        localSelectedPlaces.splice(index, 1);
        setSelectedPlaces(localSelectedPlaces);
        break;
      }
      case 'placesExclude': {
        const localExcludedPlaces = [...excludedPlaces];
        localExcludedPlaces.splice(index, 1);
        setExcludedPlaces(localExcludedPlaces);
        break;
      }
      default:
    } 
  };

  useEffect(() => {
    async function fetchAPI() {
      const res = await axios.get(`${INAT_API_URL}/taxa/autocomplete?q=${taxaMatch}`)
      setTaxaList(res.data);
    }

    const timeOutId = setTimeout(() => fetchAPI(), 500);
    return () => clearTimeout(timeOutId);
  }, [taxaMatch]);

  useEffect(() => {
    async function fetchAPI() {
      const res = await axios.get(`${INAT_API_URL}/places/autocomplete?q=${placesMatch}`)
      setPlacesList(res.data);
    }

    const timeOutId = setTimeout(() => fetchAPI(), 500);
    return () => clearTimeout(timeOutId);
  }, [placesMatch]);

  useEffect(() => {
    const makeTaxaQuery = () => {
      const queryObj = {};
      const currTaxonIds = selectedTaxa.map(taxon => taxon.id);
      const currExcludedTaxonIds = excludedTaxa.map(taxon => taxon.id);

      if (currTaxonIds.length > 0) queryObj.taxon_ids = currTaxonIds.join(',');
      if (currExcludedTaxonIds.length > 0) queryObj.without_taxon_id = currExcludedTaxonIds.join(',');

      return queryObj;
    }
    
    const makePlacesQuery = () => {
      const queryObj = {};
      const currPlaceIds = selectedPlaces.map(place => place.id);
      const currExcludedPlaceIds = excludedPlaces.map(place => place.id);

      if (currPlaceIds.length > 0) queryObj.place_id = currPlaceIds.join(',');
      if (currExcludedPlaceIds.length > 0) queryObj.not_in_place = currExcludedPlaceIds.join(',');

      return queryObj;
    }

    async function fetchAPI() {
      const queryObj = {
        ...makeTaxaQuery(),
        ...makePlacesQuery(),
      };
      const queryStr = queryString.stringify(queryObj);
      const urlPath = queryStr ? `/observations?${queryStr}` : '/observations';
      setQuery(queryStr);

      const res = await axios.get(`${INAT_API_URL}${urlPath}`);
      setData(res.data);
    }

    fetchAPI();
  }, [selectedTaxa, excludedTaxa, selectedPlaces, excludedPlaces]);

  useEffect(() => {
    navigate(`/?${query}`); 
  }, [query, navigate]);

  return (
    <div>
      <section className="container mx-auto px-6 mb-10"> 
        <SearchFilters
          taxaList={taxaList}
          selectedTaxa={selectedTaxa}
          excludedTaxa={excludedTaxa}
          placesList={placesList}
          selectedPlaces={selectedPlaces}
          excludedPlaces={excludedPlaces}
          typedValue={typedValue}
          handleInputChangeFns={handleInputChangeFns}
          handleInputBlurFns={handleInputBlurFns}
          handleSelectFns={handleSelectFns}
          handleSelectedClick={handleSelectedClick}
        />
        <INatLinks queryStr={query} />
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
