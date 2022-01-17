const handleTaxonSelect = (taxon, exclude, handleSelectFn) => {
  const selectedTaxon = {
    id: taxon.id,
    name: taxon.name,
    common: taxon.preferred_common_name,
  };
  handleSelectFn(selectedTaxon, exclude);
};

const displayTaxa = (matches, handleSelectFn) => {
  return matches && Array.isArray(matches.results) && matches.results.map(taxon => {
    let photoElem;
    if (taxon.default_photo && taxon.default_photo.square_url) {
      photoElem = <img
        className="h-10 w-10"
        src={taxon.default_photo.square_url}
        alt={taxon.name}
      />;
    } else {
      photoElem = '';
    }

    return (
      <li key={taxon.id}>
        <div className="border-[1px] border-gray-800 border-solid p-1">
          <div className="grid grid-cols-4 p-0">
            <div
              className="col-span-3 hover:text-gray-400"
              onClick={() => handleTaxonSelect(taxon, false, handleSelectFn)}
            >
              <div className="align-middle inline-block w-10">
                {photoElem}
              </div>
              <div className="align-middle inline-block pl-2">
                <div className="">
                  {taxon.preferred_common_name}
                </div>
                <div className="">
                  <div className="capitalize inline-block">
                    {taxon.rank === 'species' ? '' : `${taxon.rank}\u00a0`}
                  </div>
                  <div className="inline-block">
                    {taxon.name}
                  </div>
                </div>
              </div>
            </div>
            <div 
              className="border-l-[1px] border-gray-300 border-solid text-center hover:text-gray-400"
              onClick={() => handleTaxonSelect(taxon, true, handleSelectFn)}
            >
              <div className="align-middle inline-block leading-10">
                Exclude
               </div>
            </div>
          </div>
        </div>
      </li>
    );
  })
};

const handlePlaceSelect = (place, exclude, handleSelectFn) => {
  const selectedPlace = {
    id: place.id,
    name: place.name,
    display: place.display_name,
  };
  handleSelectFn(selectedPlace, exclude);
};

const displayPlaces = (matches, handleSelectFn) => {
  return matches && Array.isArray(matches.results) && matches.results.map(place => {
    return (
      <li key={place.id}>
        <div className="border-[1px] border-gray-800 border-solid p-1">
          <div className="grid grid-cols-4 p-0">
            <div
              className="col-span-3 hover:text-gray-400"
              onClick={() => handlePlaceSelect(place, false, handleSelectFn)}
            >
              <div className="align-middle inline-block pl-2">
                {place.display_name}
              </div>
            </div>
            <div 
              className="border-l-[1px] border-gray-300 border-solid text-center hover:text-gray-400"
              onClick={() => handlePlaceSelect(place, true, handleSelectFn)}
            >
              <div className="align-middle inline-block leading-10">
                Exclude
               </div>
            </div>
          </div>
        </div>
      </li>
    );
  })
};

const handleObsUserSelect = (obsUser, exclude, handleSelectFn) => {
  const selectedObsUser = {
    id: obsUser.id,
    name: obsUser.name,
    login: obsUser.login,
  };
  handleSelectFn(selectedObsUser, exclude);
};

const displayObsUsers = (matches, handleSelectFn) => {
  return matches && Array.isArray(matches.results) && matches.results.map(obsUser => {
    let photoElem;
    if (obsUser.icon) {
      photoElem = <img
        className="h-10 w-10"
        src={obsUser.icon}
        alt={obsUser.login}
      />;
    } else {
      photoElem = '';
    }

    return (
      <li key={obsUser.id}>
        <div className="border-[1px] border-gray-800 border-solid p-1">
          <div className="grid grid-cols-4 p-0">
            <div
              className="col-span-3 hover:text-gray-400"
              onClick={() => handleObsUserSelect(obsUser, false, handleSelectFn)}
            >
              <div className="align-middle inline-block w-10">
                {photoElem}
              </div>
              <div className="align-middle inline-block pl-2">
                <div className="">
                  {obsUser.name}
                </div>
                <div className="">
                  <div className="inline-block">
                    {obsUser.login}
                  </div>
                </div>
              </div>
            </div>
            <div 
              className="border-l-[1px] border-gray-300 border-solid text-center hover:text-gray-400"
              onClick={() => handleObsUserSelect(obsUser, true, handleSelectFn)}
            >
              <div className="align-middle inline-block leading-10">
                Exclude
               </div>
            </div>
          </div>
        </div>
      </li>
    );
  })
};

const handleIdentUserSelect = (identUser, exclude, handleSelectFn) => {
  const selectedIdentUser = {
    id: identUser.id,
    name: identUser.name,
    login: identUser.login,
  };
  console.log(selectedIdentUser);
  handleSelectFn(selectedIdentUser, exclude);
};

const displayIdentUsers = (matches, handleSelectFn) => {
  return matches && Array.isArray(matches.results) && matches.results.map(identUser => {
    let photoElem;
    if (identUser.icon) {
      photoElem = <img
        className="h-10 w-10"
        src={identUser.icon}
        alt={identUser.login}
      />;
    } else {
      photoElem = '';
    }

    return (
      <li key={identUser.id}>
        <div className="border-[1px] border-gray-800 border-solid p-1">
          <div className="grid grid-cols-4 p-0">
            <div
              className="col-span-3 hover:text-gray-400"
              onClick={() => handleIdentUserSelect(identUser, false, handleSelectFn)}
            >
              <div className="align-middle inline-block w-10">
                {photoElem}
              </div>
              <div className="align-middle inline-block pl-2">
                <div className="">
                  {identUser.name}
                </div>
                <div className="">
                  <div className="inline-block">
                    {identUser.login}
                  </div>
                </div>
              </div>
            </div>
            <div 
              className="border-l-[1px] border-gray-300 border-solid text-center hover:text-gray-400"
              onClick={() => handleIdentUserSelect(identUser, true, handleSelectFn)}
            >
              <div className="align-middle inline-block leading-10">
                Exclude
               </div>
            </div>
          </div>
        </div>
      </li>
    );
  })
};

const getMatchesList = (type, matches, handleSelectFn) => {
  let matchesList;
  switch(type) {
    case 'taxa':
      matchesList = displayTaxa(matches, handleSelectFn);
      break;
    case 'places':
      matchesList = displayPlaces(matches, handleSelectFn);
      break;
    case 'obsUsers':
      matchesList = displayObsUsers(matches, handleSelectFn);
      break;
    case 'identUsers':
      matchesList = displayIdentUsers(matches, handleSelectFn);
      break;
    default:
      matchesList = '<li></li>';
  }
  return matchesList;
};

const AutoComplete = ({
  type,
  matches,
  handleSelectFn,
}) => {
  const matchesList = getMatchesList(type, matches, handleSelectFn);
  return (
    <div className="relative">
      <ul className="absolute bg-slate-900 cursor-pointer pt-1 text-xs text-white -top-2 w-96 z-50">
        {matchesList}
      </ul>
    </div>
  );
};

export default AutoComplete;
