import AutoComplete from '../autocomplete';
import SelectedFieldsDisplay from '../selected-fields-display';

const ObsFieldsFilter = ({
  obsFieldsList,
  selectedObsFields,
  currObsField,
  typedValue,
  obsFieldValuesList,
  selectedObsFieldValues,
  obsFieldValueTypedValue,
  handleObsFieldsChange,
  handleObsFieldsBlur,
  handleObsFieldsSelectFn,
  handleObsFieldValuesChange,
  handleObsFieldValuesBlur,
  handleObsFieldValuesSelectFn,
  handleSelectedClick,
}) => {
  
  const createObsFieldValueElem = () => {
    const obsFieldTermObj = selectedObsFields
      .filter(e => e.name === currObsField)[0];
    let obsFieldValueInput = (
      <input type="text"
        placeholder="Observation Field Values"
        onChange={(e) => handleObsFieldValuesChange(e, 'text')}
        onKeyPress={(e) => e.key === 'Enter' && handleObsFieldValuesChange(e, 'textEnter')}
        onBlur={handleObsFieldValuesBlur}
        value={obsFieldValueTypedValue}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-2 mb-1 leading-tight focus:outline-none focus:bg-white"
      />
    );

    if (obsFieldTermObj) {
      if (obsFieldTermObj.datatype === 'text' && obsFieldTermObj.allowed_values) {
        const allowedValues = obsFieldTermObj.allowed_values.split('|');
        const selectOpts = allowedValues.map(val => <option key={`${obsFieldTermObj.id}-${val}`} value={val}>{val}</option>);
        obsFieldValueInput = (
          <select
            onChange={(e) => handleObsFieldValuesChange(e, 'select')}
            defaultValue={'default'}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-2 mb-1 leading-tight focus:outline-none focus:bg-white"
          >
            <option value="default" disabled>Select {obsFieldTermObj.name}</option>
            {selectOpts}
          </select>
        );
      } else if (obsFieldTermObj.datatype === 'taxon') {
        obsFieldValueInput = (
          <>
            <input
              type="text"
              placeholder="Taxon"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-2 mb-1 leading-tight focus:outline-none focus:bg-white"
              onChange={(e) => handleObsFieldValuesChange(e, 'taxa')}
              onBlur={handleObsFieldValuesBlur}
              value={obsFieldValueTypedValue}
            /> 
            {obsFieldValuesList && obsFieldValuesList.results && obsFieldValuesList.results.length > 0 &&
              <AutoComplete type="taxa" matches={obsFieldValuesList} handleSelectFn={handleObsFieldValuesSelectFn} noExclude={true} />
            }
          </>
        );
      } else if (obsFieldTermObj.datatype === 'date') {
        // TODO Show date selector here
      } else if (obsFieldTermObj.datatype === 'numeric') {
        // TODO Enforce numeric values
      }
    }
    return obsFieldValueInput;
  }
  
  const selectedObsFieldsLabel = selectedObsFields.length > 0 ? 'Selected Fields: ' : '';
  const obsFieldValueInput = createObsFieldValueElem();

  return (
    <div className="h-min max-h-min flex flex-wrap">
      <div className="w-1/2 pr-1 mb-2 md:mb-0">
        <input
          type="text"
          placeholder="Observation Fields"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-2 mb-1 leading-tight focus:outline-none focus:bg-white"
          onChange={handleObsFieldsChange}
          onBlur={handleObsFieldsBlur}
          value={typedValue}
        /> 
        {obsFieldsList && obsFieldsList.length > 0 && 
          <AutoComplete type="obsFields" matches={obsFieldsList} handleSelectFn={handleObsFieldsSelectFn} /> 
        }
      </div>
      
      <div className="w-1/2 pr-1 mb-2 md:mb-0">
        {obsFieldValueInput}
      </div>
        
      {selectedObsFields.length > 0 && 
        <SelectedFieldsDisplay
          selectedArray={selectedObsFields}
          selectedLabel={selectedObsFieldsLabel}
          selectedType="obsFields"
          handleSelectedClick={handleSelectedClick}
        />
      }
    </div>
  );
};

export default ObsFieldsFilter;
