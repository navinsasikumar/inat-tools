import AutoComplete from '../autocomplete';
import SelectedFieldsDisplay from '../selected-fields-display';

const AnnotationTermsFilter = ({
  annotationTermsList,
  selectedAnnotationTerms,
  excludedAnnotationTerms,
  annotationValuesList,
  selectedAnnotationValues,
  excludedAnnotationValues,
  annotationValuesOnFocus,
  typedValue,
  handleAnnotationTermsChange,
  handleAnnotationTermsBlur,
  handleTermSelectFn,
  handleAnnotationValuesChange,
  handleAnnotationValuesBlur,
  handleValuesSelectFn,
  handleSelectedClick,
}) => {
  const diff = (arr1, arr2) => arr1.filter(x => !arr2.map(y => y.termId).includes(x.id))
  
  const selectedAnnotations = [
    ...selectedAnnotationValues,
    ...diff(selectedAnnotationTerms, selectedAnnotationValues),
  ];
  const excludedAnnotations = [
    ...excludedAnnotationValues,
    ...diff(excludedAnnotationTerms, excludedAnnotationValues),
  ];
  
  const selectedAnnotationTermsLabel = selectedAnnotations.length > 0 ? 'Selected Annotations: ' : '';
  const excludedAnnotationTermsLabel = excludedAnnotations.length > 0 ? 'Excluded Annotations: ' : '';

  return (
    <div className="h-min max-h-min flex flex-wrap">
      <div className="w-1/2 pr-1 mb-2 md:mb-0">
        <input
          type="text"
          placeholder="Annotations"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-2 mb-1 leading-tight focus:outline-none focus:bg-white"
          onFocus={handleAnnotationTermsChange}
          onBlur={handleAnnotationTermsBlur}
        /> 
        {annotationTermsList && annotationTermsList.results && annotationTermsList.results.length > 0 && 
          <AutoComplete type="annotationTerms" matches={annotationTermsList} handleSelectFn={handleTermSelectFn} /> 
        }
      </div>
        
      <div className="w-1/2 pl-1 mb-2 md:mb-0">
        <input
          type="text"
          placeholder="Annotation Value"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-2 mb-1 leading-tight focus:outline-none focus:bg-white"
          onFocus={handleAnnotationValuesChange}
          onBlur={handleAnnotationValuesBlur}
        /> 
        {annotationValuesOnFocus && annotationValuesList && annotationValuesList.length > 0 && 
          <AutoComplete type="annotationValues" matches={annotationValuesList} handleSelectFn={handleValuesSelectFn}/> 
        }
      </div>

      {selectedAnnotations.length > 0 && 
        <SelectedFieldsDisplay
          selectedArray={selectedAnnotations}
          selectedLabel={selectedAnnotationTermsLabel}
          selectedType="annotationValues"
          handleSelectedClick={handleSelectedClick}
        />
      }
      {excludedAnnotations.length > 0 && 
        <SelectedFieldsDisplay
          selectedArray={excludedAnnotations}
          selectedLabel={excludedAnnotationTermsLabel}
          selectedType="annotationValuesExclude"
          handleSelectedClick={handleSelectedClick}
        />
      }
    </div>
  );
};

export default AnnotationTermsFilter;
