import AutoComplete from '../autocomplete';
import SelectedFieldsDisplay from '../selected-fields-display';

const PlacesFilter = ({
  placesList,
  selectedPlaces,
  excludedPlaces,
  typedValue,
  handlePlacesChange,
  handlePlacesBlur,
  handleSelectFn,
  handleSelectedClick,
}) => {
  const selectedPlacesLabel = selectedPlaces.length > 0 ? 'Selected Places: ' : '';
  const excludedPlacesLabel = excludedPlaces.length > 0 ? 'Excluded Places: ' : '';

  return (
    <div className="h-min max-h-min">
      <input
        type="text"
        placeholder="Places"
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-2 mb-1 leading-tight focus:outline-none focus:bg-white"
        onChange={handlePlacesChange}
        onBlur={handlePlacesBlur}
        value={typedValue}
      /> 
      {placesList && placesList.results && placesList.results.length > 0 && 
        <AutoComplete type="places" matches={placesList} handleSelectFn={handleSelectFn}/> 
      }
      <SelectedFieldsDisplay
        selectedArray={selectedPlaces}
        selectedLabel={selectedPlacesLabel}
        selectedType="places"
        handleSelectedClick={handleSelectedClick}
      />
      <SelectedFieldsDisplay
        selectedArray={excludedPlaces}
        selectedLabel={excludedPlacesLabel}
        selectedType="placesExclude"
        handleSelectedClick={handleSelectedClick}
      />
    </div>
  );
};

export default PlacesFilter;
