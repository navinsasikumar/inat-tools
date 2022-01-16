import TaxaFilter from './filters/taxa';

const SearchFilter = ({
  taxaList,
  selectedTaxa,
  excludedTaxa,
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
      </div>
    </form>
  );
};

export default SearchFilter;
