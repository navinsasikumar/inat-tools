import TaxaFilter from './filters/taxa';
import PlacesFilter from './filters/places';

const SearchFilter = ({
  taxaList,
  selectedTaxa,
  excludedTaxa,
  placesList,
  selectedPlaces,
  excludedPlaces,
  typedValue,
  handleInputChangeFns,
  handleInputBlurFns,
  handleSelectFns,
  handleSelectedClick,
}) => {
  return (
    <form className="pt-6 w-full">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TaxaFilter
            taxaList={taxaList}
            selectedTaxa={selectedTaxa}
            excludedTaxa={excludedTaxa}
            typedValue={typedValue.taxon}
            handleTaxaChange={handleInputChangeFns.taxa}
            handleTaxaBlur={handleInputBlurFns.taxa}
            handleSelectFn={handleSelectFns.taxa}
            handleSelectedClick={handleSelectedClick}
          />
        </div> 
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <PlacesFilter
            placesList={placesList}
            selectedPlaces={selectedPlaces}
            excludedPlaces={excludedPlaces}
            typedValue={typedValue.place}
            handlePlacesChange={handleInputChangeFns.places}
            handlePlacesBlur={handleInputBlurFns.places}
            handleSelectFn={handleSelectFns.places}
            handleSelectedClick={handleSelectedClick}
          />
        </div> 
      </div>
    </form>
  );
};

export default SearchFilter;
