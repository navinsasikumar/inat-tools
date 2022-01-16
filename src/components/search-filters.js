import TaxaFilter from './filters/taxa';

const SearchFilter = ({
  handleTaxaChange,
  taxaList,
  selectedTaxa,
  typedValue,
  handleSelectFns,
  handleSelectedClick,
}) => {
  return (
    <form className="pt-6 w-full">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TaxaFilter
            handleTaxaChange={handleTaxaChange}
            taxaList={taxaList}
            selectedTaxa={selectedTaxa}
            typedValue={typedValue.taxon}
            handleSelectFn={handleSelectFns.taxa}
            handleSelectedClick={handleSelectedClick}
          />
        </div> 
      </div>
    </form>
  );
};

export default SearchFilter;
