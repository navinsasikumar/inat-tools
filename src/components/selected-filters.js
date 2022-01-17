const SelectedFilters = ({
  selectedIndex,
  selectedValue,
  selectedType,
  handleSelectedClick,
}) => {
  const toTitleCase = str => str.replace(
    /\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );

  let selectedDisplay;
  if (selectedType === 'taxa' || selectedType === 'taxaExclude') {
    selectedDisplay = toTitleCase(selectedValue.common);
  } else if (selectedType === 'places' || selectedType === 'placesExclude') {
    selectedDisplay = selectedValue.display;
  } else if (selectedType === 'obsUsers' || selectedType === 'obsUsersExclude' || selectedType === 'identUsers') {
    selectedDisplay = selectedValue.login;
  } else if (selectedType === 'obsTerm') {
    selectedDisplay = selectedValue.name;
    if (selectedValue.selectedValue) {
      if (typeof selectedValue === 'object') {
        selectedDisplay += `=${selectedValue.common}`;
      } else {
        selectedDisplay += `=${selectedValue}`;
      }
    }
  } else if (selectedType === 'annotationTerms' || selectedType === 'annotationTermsExclude') {
    selectedDisplay = selectedValue.label;
  } else if (selectedType === 'annotationValues' || selectedType === 'annotationValuesExclude') {
    if (selectedValue.termLabel) {
      selectedDisplay = `${selectedValue.termLabel}: ${selectedValue.label}`;
    } else {
      selectedDisplay = selectedValue.label;
    }
  }

  return (
    <div
      className="border-gray-600 border-[1px] border-solid cursor-pointer inline-block mx-1 px-1 py-1"
      onClick={() => handleSelectedClick(
        selectedIndex,
        selectedType,
        selectedValue,
      )}
    >
      <div className="inline-block">{selectedDisplay}</div>
      <div className="inline-block ml-2">x</div>
    </div>
  );
};

export default SelectedFilters;
