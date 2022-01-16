import AutoComplete from '../autocomplete';

const TaxaFilter = ({
  handleTaxaChange,
  taxaList
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Taxa"
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        onChange={handleTaxaChange}
      /> 
      <AutoComplete type="taxa" matches={taxaList} />
    </div>
  );
};

export default TaxaFilter;
