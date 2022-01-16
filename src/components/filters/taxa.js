import AutoComplete from '../autocomplete';
import SelectedFieldsDisplay from '../selected-fields-display';

const TaxaFilter = ({
  handleTaxaChange,
  taxaList,
  selectedTaxa,
  excludedTaxa,
  typedValue,
  handleSelectFn,
  handleSelectedClick,
}) => {
  const selectedTaxaLabel = selectedTaxa.length > 0 ? 'Selected Taxa: ' : '';
  const excludedTaxaLabel = excludedTaxa.length > 0 ? 'Excluded Taxa: ' : '';

  return (
    <div>
      <input
        type="text"
        placeholder="Taxa"
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-2 mb-1 leading-tight focus:outline-none focus:bg-white"
        onChange={handleTaxaChange}
        value={typedValue}
      /> 
      {taxaList && taxaList.results && taxaList.results.length > 0 && 
        <AutoComplete type="taxa" matches={taxaList} handleSelectFn={handleSelectFn}/> 
      }
      <SelectedFieldsDisplay
        selectedArray={selectedTaxa}
        selectedLabel={selectedTaxaLabel}
        selectedType="taxa"
        handleSelectedClick={handleSelectedClick}
      />
      <SelectedFieldsDisplay
        selectedArray={excludedTaxa}
        selectedLabel={excludedTaxaLabel}
        selectedType="taxaExclude"
        handleSelectedClick={handleSelectedClick}
      />
    </div>
  );
};

export default TaxaFilter;
