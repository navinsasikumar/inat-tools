import TaxaFilter from './filters/taxa';

const SearchFilter = ({
  handleTaxaChange,
  taxaList
}) => {
  return (
    <form className="pt-6 w-full">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TaxaFilter handleTaxaChange={handleTaxaChange} taxaList={taxaList}/>
        </div> 
      </div>
    </form>
  );
};

export default SearchFilter;
