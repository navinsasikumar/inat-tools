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
  
  const [obsUsersMatch, setObsUsersMatch] = useState('');
  const [obsUsersList, setObsUsersList] = useState([]);
  const [selectedObsUsers, setSelectedObsUsers] = useState([]);
  const [excludedObsUsers, setExcludedObsUsers] = useState([]);

  const [identUsersMatch, setIdentUsersMatch] = useState('');
  const [identUsersList, setIdentUsersList] = useState([]);
  const [selectedIdentUsers, setSelectedIdentUsers] = useState([]);
  const [excludedIdentUsers, setExcludedIdentUsers] = useState([]);

  const [annotationTermsMatch, setAnnotationTermsMatch] = useState('');
  const [annotationTermsList, setAnnotationTermsList] = useState([]);
  const [selectedAnnotationTerms, setSelectedAnnotationTerms] = useState([]);
  const [excludedAnnotationTerms, setExcludedAnnotationTerms] = useState([]);

  const [annotationValuesList, setAnnotationValuesList] = useState([]);
  const [selectedAnnotationValues, setSelectedAnnotationValues] = useState([]);
  const [excludedAnnotationValues, setExcludedAnnotationValues] = useState([]);
  const [annotationValuesOnFocus, setAnnotationValuesOnFocus] = useState(false);

  const [obsFieldsMatch, setObsFieldsMatch] = useState('');
  const [obsFieldsList, setObsFieldsList] = useState([]);
  const [selectedObsFields, setSelectedObsFields] = useState([]);
  const [excludedObsFields, setExcludedObsFields] = useState([]);
  const [currObsField, setCurrObsField] = useState('');

  const [obsFieldValuesMatch, setObsFieldValuesMatch] = useState('');
  const [obsFieldValuesType, setObsFieldValuesType] = useState('');
  const [obsFieldValuesList, setObsFieldValuesList] = useState([]);
  const [selectedObsFieldValues, setSelectedObsFieldValues] = useState([]);
  
  const [typedValue, setTypedValue] = useState({
    taxon: '',
    place: '',
    obsUser: '',
    identUser: '',
    annotationTerm: '',
    annotationValue: '',
    obsField: '',
    obsFieldValue: '',
  });

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
    obsUsers: (event) => {
      const searchStr = event.target.value;
      setTypedValue({...typedValue, obsUser: searchStr});
      if (searchStr.length > 2) {
        setObsUsersMatch(searchStr);
      } else {
        setObsUsersList([]);
      }
    },
    identUsers: (event) => {
      const searchStr = event.target.value;
      setTypedValue({...typedValue, identUser: searchStr});
      if (searchStr.length > 2) {
        setIdentUsersMatch(searchStr);
      } else {
        setIdentUsersList([]);
      }
    },
    annotationTerms: (event) => {
      if (event) {
        setAnnotationTermsMatch('search');
      }
    },
    annotationValues: (event) => {
      if (event) {
        setAnnotationValuesOnFocus(true);
      }
    },
    obsFields: (event) => {
      const searchStr = event.target.value;
      setTypedValue({...typedValue, obsField: searchStr});
      if (searchStr.length > 2) {
        setObsFieldsMatch(searchStr);
      } else {
        setObsFieldsList([]);
      }
    },
    obsFieldValues: (event, type) => {
      const searchStr = event.target.value;
      setTypedValue({...typedValue, obsFieldValue: searchStr});
  
      if (type === 'select') {
        handleSelectFns.obsFieldValues(searchStr);
      } else if (type === 'textEnter') {
        handleSelectFns.obsFieldValues(obsFieldValuesMatch);
      }

      if (searchStr.length > 2) {
        setObsFieldValuesMatch(searchStr);
        setObsFieldValuesType(type);
      } else {
        setObsFieldValuesList([]);
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
    obsUsers: () => {
      setTimeout(() => setObsUsersList([]), 500);
    },
    identUsers: () => {
      setTimeout(() => setIdentUsersList([]), 500);
    },
    annotationTerms: () => {
      setTimeout(() => setAnnotationTermsList([]), 500);
      setAnnotationTermsMatch('');
    },
    annotationValues: () => {
      setTimeout(() => setAnnotationValuesOnFocus(false), 500);
    },
    obsFields: () => {
      setTimeout(() => setObsFieldsList([]), 500);
    },
    obsFieldValues: () => {
      setTimeout(() => setObsFieldValuesList([]), 500);
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
    obsUsers: (selectedObsUser, exclude = false) => {
      if (exclude === false) {
        setSelectedObsUsers([...selectedObsUsers, selectedObsUser]);
        setObsUsersList([]);
        setTypedValue({...typedValue, obsUser: ''});
      } else {
        setExcludedObsUsers([...excludedObsUsers, selectedObsUser]);
        setObsUsersList([]);
        setTypedValue({...typedValue, obsUser: ''});
      }
    },
    identUsers: (selectedIdentUser, exclude = false) => {
      if (exclude === false) {
        setSelectedIdentUsers([...selectedIdentUsers, selectedIdentUser]);
        setIdentUsersList([]);
        setTypedValue({...typedValue, identUser: ''});
      } else {
        setExcludedIdentUsers([...excludedIdentUsers, selectedIdentUser]);
        setIdentUsersList([]);
        setTypedValue({...typedValue, identUser: ''});
      }
    },
    annotationTerms: (selectedAnnotationTerm, exclude = false) => {
      if (exclude === false) {
        if (!selectedAnnotationTerms.some(e => e.id === selectedAnnotationTerm.id)) {
          setSelectedAnnotationTerms([...selectedAnnotationTerms, selectedAnnotationTerm]);
        }
        setAnnotationTermsList([]);
        setTypedValue({...typedValue, annotationTerm: ''});
        const annotationValues = JSON.parse(JSON.stringify(selectedAnnotationTerm.values));
        annotationValues.forEach((value) => {
          const annotationVal = value;
          annotationVal.termId = selectedAnnotationTerm.id;
          annotationVal.termLabel = selectedAnnotationTerm.label;
        });
        setAnnotationValuesList(annotationValues);
      } else {
        if (!excludedAnnotationTerms.some(e => e.id === selectedAnnotationTerm.id)) {
          setExcludedAnnotationTerms([...excludedAnnotationTerms, selectedAnnotationTerm]);
        }
        setAnnotationTermsList([]);
        setTypedValue({...typedValue, annotationTerm: ''});
      }
    },
    annotationValues: (selectedAnnotationValue, exclude = false) => {
      if (exclude === false) {
        setSelectedAnnotationValues([...selectedAnnotationValues, selectedAnnotationValue]);
        setAnnotationValuesList([]);
        setTypedValue({...typedValue, annotationValue: ''});
      } else {
        setExcludedAnnotationValues([...excludedAnnotationValues, selectedAnnotationValue]);
        setAnnotationValuesList([]);
        setTypedValue({...typedValue, annotationValue: ''});
      }
    },
    obsFields: (selectedObsField, exclude = false) => {
      if (exclude === false) {
        if (!selectedObsFields.some(e => e.name === selectedObsField.name)) {
          setSelectedObsFields([...selectedObsFields, selectedObsField]);
        } 
        setObsFieldsList([]);
        setTypedValue({...typedValue, obsField: ''});
        setCurrObsField(selectedObsField.name);
      } else {
        setExcludedObsFields([...excludedObsFields, selectedObsField]);
        setObsFieldsList([]);
        setTypedValue({...typedValue, obsField: ''});
      }
      setObsFieldsMatch('');
    },
    obsFieldValues: (selectedObsFieldValue, exclude = false) => {
      if (exclude === false) {
        setSelectedObsFieldValues([...selectedObsFieldValues, selectedObsFieldValue]);
        setObsFieldValuesList([]);
        setTypedValue({...typedValue, obsFieldValue: ''});
        const localCurrObsFields = selectedObsFields.map(e => {
          if (e.name === currObsField) {
            const newObj = {...e};
            newObj.selectedValue = selectedObsFieldValue;
            return newObj;
          }
          return e;
        });
        setSelectedObsFields(localCurrObsFields);
        setCurrObsField('');
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
      case 'obsUsers': {
        const localSelectedObsUsers = [...selectedObsUsers];
        localSelectedObsUsers.splice(index, 1);
        setSelectedObsUsers(localSelectedObsUsers);
        break;
      }
      case 'obsUsersExclude': {
        const localExcludedObsUsers = [...excludedObsUsers];
        localExcludedObsUsers.splice(index, 1);
        setExcludedObsUsers(localExcludedObsUsers);
        break;
      }
      case 'identUsers': {
        const localSelectedIdentUsers = [...selectedIdentUsers];
        localSelectedIdentUsers.splice(index, 1);
        setSelectedIdentUsers(localSelectedIdentUsers);
        break;
      }
      case 'identUsersExclude': {
        const localExcludedIdentUsers = [...excludedIdentUsers];
        localExcludedIdentUsers.splice(index, 1);
        setExcludedIdentUsers(localExcludedIdentUsers);
        break;
      }
      case 'annotationTerms': {
        const localSelectedAnnotationTerms = [...selectedAnnotationTerms];
        localSelectedAnnotationTerms.splice(index, 1);
        setSelectedAnnotationTerms(localSelectedAnnotationTerms);
        break;
      }
      case 'annotationTermsExclude': {
        const localExcludedAnnotationTerms = [...excludedAnnotationTerms];
        localExcludedAnnotationTerms.splice(index, 1);
        setExcludedAnnotationTerms(localExcludedAnnotationTerms);
        break;
      }
      case 'annotationValues': {
        if (value.termId) {
          // This is a value - remove value and check if any other values with that termId exists
          // If none, remove the term as well
          const localSelectedAnnotationValues = [...selectedAnnotationValues];
          const localSelectedAnnotationTerms = [...selectedAnnotationTerms];

          localSelectedAnnotationValues.splice(index, 1);

          const matchedTerms = localSelectedAnnotationValues
            .findIndex(elem => elem.termId === value.termId) >= 0;

          if (!matchedTerms) {
            const matchedIndex = localSelectedAnnotationTerms.findIndex(elem => elem.id === value.termId);
            localSelectedAnnotationTerms.splice(matchedIndex, 1);
          }
          setSelectedAnnotationValues(localSelectedAnnotationValues);
          setSelectedAnnotationTerms(localSelectedAnnotationTerms);
        } else {
          // This is a term -  remove the term
          const localSelectedAnnotationTerms = [...selectedAnnotationTerms];
          const matchedIndex = localSelectedAnnotationTerms.findIndex(elem => elem.id === value.id);
          localSelectedAnnotationTerms.splice(matchedIndex, 1);
          setSelectedAnnotationTerms(localSelectedAnnotationTerms);
        }
        break;
      }
      case 'annotationValuesExclude': {
        if (value.termId) {
          // This is a value - remove value and check if any other values with that termId exists
          // If none, remove the term as well
          const localExcludedAnnotationValues = [...excludedAnnotationValues];
          const localExcludedAnnotationTerms = [...excludedAnnotationTerms];

          localExcludedAnnotationValues.splice(index, 1);

          const matchedTerms = localExcludedAnnotationValues
            .findIndex(elem => elem.termId === value.termId) >= 0;

          if (!matchedTerms) {
            const matchedIndex = localExcludedAnnotationTerms.findIndex(elem => elem.id === value.termId);
            localExcludedAnnotationTerms.splice(matchedIndex, 1);
          }
          setExcludedAnnotationValues(localExcludedAnnotationValues);
          setExcludedAnnotationTerms(localExcludedAnnotationTerms);
        } else {
          // This is a term -  remove the term
          const localExcludedAnnotationTerms = [...excludedAnnotationTerms];
          const matchedIndex = localExcludedAnnotationTerms.findIndex(elem => elem.id === value.id);
          localExcludedAnnotationTerms.splice(matchedIndex, 1);
          setExcludedAnnotationTerms(localExcludedAnnotationTerms);
        }
        break;
      }
      case 'obsFields': {
        const localSelectedObsFields = [...selectedObsFields];
        localSelectedObsFields.splice(index, 1);
        setSelectedObsFields(localSelectedObsFields);
        break;
      }
      case 'obsFieldValues': {
        const localSelectedObsFieldValues = [...selectedObsFieldValues];
        localSelectedObsFieldValues.splice(index, 1);
        setSelectedObsFieldValues(localSelectedObsFieldValues);
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
    async function fetchAPI() {
      const res = await axios.get(`${INAT_API_URL}/users/autocomplete?q=${obsUsersMatch}`)
      setObsUsersList(res.data);
    }

    const timeOutId = setTimeout(() => fetchAPI(), 500);
    return () => clearTimeout(timeOutId);
  }, [obsUsersMatch]);

  useEffect(() => {
    async function fetchAPI() {
      const res = await axios.get(`${INAT_API_URL}/users/autocomplete?q=${identUsersMatch}`)
      setIdentUsersList(res.data);
    }

    const timeOutId = setTimeout(() => fetchAPI(), 500);
    return () => clearTimeout(timeOutId);
  }, [identUsersMatch]);

  useEffect(() => {
    async function fetchAPI() {
      const res = await axios.get(`${INAT_API_URL}/controlled_terms`)
      setAnnotationTermsList(res.data);
    }

    if (annotationTermsMatch === 'search') {
      fetchAPI();
    }
  }, [annotationTermsMatch]);

  useEffect(() => {
    async function fetchAPI() {
      const res = await axios.get(`https://inaturalist.org/observation_fields.json?order_by=values_count&order=desc&per_page=10&q=${obsFieldsMatch}`)
      setObsFieldsList(res.data && res.data.slice(0, 10));
    }

    if (obsFieldsMatch.length > 2) {
      const timeOutId = setTimeout(() => fetchAPI(), 500);
      return () => clearTimeout(timeOutId);
    }
  }, [obsFieldsMatch]);

  useEffect(() => {
    async function fetchTaxaAPI() {
      const res = await axios.get(`${INAT_API_URL}/taxa/autocomplete?q=${obsFieldValuesMatch}`)
      setObsFieldValuesList(res.data);
    }

    if (obsFieldValuesType === 'taxa') {
      const timeOutId = setTimeout(() => fetchTaxaAPI(), 500);
      return () => clearTimeout(timeOutId);
    } else if (obsFieldValuesType === 'select') {
      // Nothing to do here; this is handled in the input change function
    }
  }, [obsFieldValuesMatch, obsFieldValuesType]);

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
    
    const makeObsUsersQuery = () => {
      const queryObj = {};
      const currObsUserIds = selectedObsUsers.map(obsUser => obsUser.id);
      const currExcludedObsUserIds = excludedObsUsers.map(obsUser => obsUser.id);

      if (currObsUserIds.length > 0) queryObj.user_id = currObsUserIds.join(',');
      if (currExcludedObsUserIds.length > 0) queryObj.not_user_id = currExcludedObsUserIds.join(',');

      return queryObj;
    }
    
    const makeIdentUsersQuery = () => {
      const queryObj = {};
      const currIdentUserIds = selectedIdentUsers.map(identUser => identUser.id);
      const currExcludedIdentUserIds = excludedIdentUsers.map(identUser => identUser.id);

      if (currIdentUserIds.length > 0) queryObj.ident_user_id = currIdentUserIds.join(',');
      if (currExcludedIdentUserIds.length > 0) queryObj.without_ident_user_id = currExcludedIdentUserIds.join(',');

      return queryObj;
    }

    const makeAnnotationTermsQuery = () => {
      const queryObj = {};
      const currAnnotationTermIds = selectedAnnotationTerms.map(annotationTerm => annotationTerm.id);
      const currExcludedAnnotationTermIds = excludedAnnotationTerms.map(annotationTerm => annotationTerm.id);

      if (currAnnotationTermIds.length > 0) queryObj.term_id = currAnnotationTermIds.join(',');
      if (currExcludedAnnotationTermIds.length > 0) queryObj.wthout_term_id = currExcludedAnnotationTermIds.join(',');

      return queryObj;
    }

    const makeAnnotationValuesQuery = () => {
      const queryObj = {};
      const currAnnotationValueIds = selectedAnnotationValues.map(annotationValue => annotationValue.id);
      const currExcludedAnnotationValueIds = excludedAnnotationValues.map(annotationValue => annotationValue.id);

      if (currAnnotationValueIds.length > 0) queryObj.term_value_id = currAnnotationValueIds.join(',');
      if (currExcludedAnnotationValueIds.length > 0) queryObj.without_term_value_id = currExcludedAnnotationValueIds.join(',');

      return queryObj;
    }

    const makeObsFieldsQuery = () => {
      const queryObj = {};
      selectedObsFields.map(term => ({ field: `field:${term.name}`, value: term.selectedValue }))
      .forEach((e) => { queryObj[e.field] = (typeof e.value === 'object' ? e.value.id : e.value) || null; });

      return queryObj;
    }


    async function fetchAPI() {
      const queryObj = {
        ...makeTaxaQuery(),
        ...makePlacesQuery(),
        ...makeObsUsersQuery(),
        ...makeIdentUsersQuery(),
        ...makeAnnotationTermsQuery(),
        ...makeAnnotationValuesQuery(),
        ...makeObsFieldsQuery(),
      };
      const queryStr = queryString.stringify(queryObj);
      const urlPath = queryStr ? `/observations?${queryStr}` : '/observations';
      setQuery(queryStr);

      const res = await axios.get(`${INAT_API_URL}${urlPath}`);
      setData(res.data);
    }

    fetchAPI();
  }, [
    selectedTaxa, excludedTaxa,
    selectedPlaces, excludedPlaces,
    selectedObsUsers, excludedObsUsers,
    selectedIdentUsers, excludedIdentUsers,
    selectedAnnotationTerms, excludedAnnotationTerms,
    selectedAnnotationValues, excludedAnnotationValues,
    selectedObsFields,
  ]);

  useEffect(() => {
    if (query) {
      navigate({
        search: query
      });
    }
  }, [query, navigate]);

  useEffect(() => {

    const makeTaxonObj = taxon => (
      {
        id: taxon.id,
        name: taxon.name,
        common: taxon.preferred_common_name,
      }
    );

    const makePlaceObj = place => (
      {
        id: place.id,
        name: place.name,
        display: place.display_name,
      }
    );

    const makeUserObj = user => (
      {
        id: user.id,
        name: user.name,
        login: user.login,
      }
    );

    const makeAnnotationObj = (annotations, idStr) => {
      const ids = idStr.split(',').map(id => Number(id));
      if (!annotations.results) return [];
      return annotations.results.filter(obj => ids.includes(obj.id));
    };

    const makeAnnotationValuesObj = (annotations, idStr) => {
      const ids = idStr.split(',').map(id => Number(id));
      return annotations.filter(obj => ids.includes(obj.id));
    };

    const makeFlattenedAnnotationValues = (annotations) => {
      if (!annotations.results) return [];
      const annotationValuesArr = [];
      annotations.results
        .forEach(obj => obj.values.forEach((val) => {
          const newVal = { ...val };
          newVal.termId = obj.id;
          newVal.termLabel = obj.label;
          annotationValuesArr.push(newVal);
        }));
      return annotationValuesArr;
    };

    async function splitQueryStr(query) {
      if (query.taxon_ids) {
        const res = await axios.get(`${INAT_API_URL}/taxa/${query.taxon_ids}`);
        setSelectedTaxa(res.data.results.map(makeTaxonObj));
      }
      if (query.without_taxon_id) {
        const res = await axios.get(`${INAT_API_URL}/taxa/${query.without_taxon_id}`);
        setExcludedTaxa(res.data.results.map(makeTaxonObj));
      }

      if (query.place_id) {
        const res = await axios.get(`${INAT_API_URL}/places/${query.place_id}`);
        setSelectedPlaces(res.data.results.map(makePlaceObj));
      }
      if (query.not_in_place) {
        const res = await axios.get(`${INAT_API_URL}/places/${query.not_in_place}`);
        setExcludedPlaces(res.data.results.map(makePlaceObj));
      }

      if (query.user_id) {
        const res = await axios.get(`${INAT_API_URL}/users/${query.user_id}`);
        setSelectedObsUsers(res.data.results.map(makeUserObj));
      }
      if (query.not_user_id) {
        const res = await axios.get(`${INAT_API_URL}/users/${query.not_user_id}`);
        setExcludedObsUsers(res.data.results.map(makeUserObj));
      }

      if (query.ident_user_id) {
        const res = await axios.get(`${INAT_API_URL}/users/${query.ident_user_id}`);
        setSelectedIdentUsers(res.data.results.map(makeUserObj));
      }

      if (query.without_ident_user_id) {
        const res = await axios.get(`${INAT_API_URL}/users/${query.without_ident_user_id}`);
        setExcludedIdentUsers(res.data.results.map(makeUserObj));
      }

      const obsFields = Object.keys(query).filter(key => key.startsWith('field'))
        .map(e => e.substring('field:'.length));
      const obsFieldObj  = obsFields.map((e) => {
        const obj = {
          name: e,
        };
        if (query[`field:${e}`]) {
          obj.selectedValue = query[`field:${e}`];
        }
        return obj;
      });
      if (obsFieldObj.length > 0) {
        setSelectedObsFields(obsFieldObj);
      }

      if (query.term_id
        || query.without_term_id
        || query.term_value_id
        || query.without_term_value_id
      ) {
        const res = await axios.get(`${INAT_API_URL}/controlled_terms`);
        const flattenedAnnotationValues = makeFlattenedAnnotationValues(res.data);
        if (query.term_id) {
          setSelectedAnnotationTerms(makeAnnotationObj(res.data, query.term_id));
        }
        if (query.without_term_id) {
          setExcludedAnnotationTerms(makeAnnotationObj(res.data, query.without_term_id));
        }

        if (query.term_value_id) {
          setSelectedAnnotationValues(makeAnnotationValuesObj(
            flattenedAnnotationValues,
            query.term_value_id,
          ));
        }
        if (query.without_term_value_id) {
          setExcludedAnnotationValues(makeAnnotationValuesObj(
            flattenedAnnotationValues,
            query.without_term_value_id,
          ));
        }
      }
    }
    // Read any existing query string parameters
    const parsedQuery= queryString.parse(window.location.search);
    splitQueryStr(parsedQuery);

  }, []);

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
          obsUsersList={obsUsersList}
          selectedObsUsers={selectedObsUsers}
          excludedObsUsers={excludedObsUsers}
          identUsersList={identUsersList}
          selectedIdentUsers={selectedIdentUsers}
          excludedIdentUsers={excludedIdentUsers}
          annotationTermsList={annotationTermsList}
          selectedAnnotationTerms={selectedAnnotationTerms}
          excludedAnnotationTerms={excludedAnnotationTerms}
          annotationValuesList={annotationValuesList}
          selectedAnnotationValues={selectedAnnotationValues}
          excludedAnnotationValues={excludedAnnotationValues}
          annotationValuesOnFocus={annotationValuesOnFocus}
          obsFieldsList={obsFieldsList}
          selectedObsFields={selectedObsFields}
          currObsField={currObsField}
          obsFieldValuesList={obsFieldValuesList}
          selectedObsFieldValues={selectedObsFieldValues}
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
