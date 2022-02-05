import TaxaFilter from './filters/taxa';
import PlacesFilter from './filters/places';
import ObsUsersFilter from './filters/obs-users';
import IdentUsersFilter from './filters/ident-users';
import AnnotationsFilter from './filters/annotations';
import ObsFieldsFilter from './filters/obs-fields';

const SearchFilter = ({
  taxaList,
  selectedTaxa,
  excludedTaxa,
  placesList,
  selectedPlaces,
  excludedPlaces,
  obsUsersList,
  selectedObsUsers,
  excludedObsUsers,
  identUsersList,
  selectedIdentUsers,
  excludedIdentUsers,
  annotationTermsList,
  selectedAnnotationTerms,
  excludedAnnotationTerms,
  annotationValuesList,
  selectedAnnotationValues,
  excludedAnnotationValues,
  annotationValuesOnFocus,
  obsFieldsList,
  selectedObsFields,
  currObsField,
  obsFieldValuesList,
  selectedObsFieldValues,
  typedValue,
  handleInputChangeFns,
  handleInputBlurFns,
  handleSelectFns,
  handleSelectedClick,
}) => {
  return (
    <form className="pt-6 w-full">
      <div className="flex flex-wrap -mx-3 mb-1">
        <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
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

      <div className="flex flex-wrap -mx-3 mb-1">
        <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
          <ObsUsersFilter
            obsUsersList={obsUsersList}
            selectedObsUsers={selectedObsUsers}
            excludedObsUsers={excludedObsUsers}
            typedValue={typedValue.obsUser}
            handleObsUsersChange={handleInputChangeFns.obsUsers}
            handleObsUsersBlur={handleInputBlurFns.obsUsers}
            handleSelectFn={handleSelectFns.obsUsers}
            handleSelectedClick={handleSelectedClick}
          />
        </div> 
        
        <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
          <IdentUsersFilter
            identUsersList={identUsersList}
            selectedIdentUsers={selectedIdentUsers}
            excludedIdentUsers={excludedIdentUsers}
            typedValue={typedValue.identUser}
            handleIdentUsersChange={handleInputChangeFns.identUsers}
            handleIdentUsersBlur={handleInputBlurFns.identUsers}
            handleSelectFn={handleSelectFns.identUsers}
            handleSelectedClick={handleSelectedClick}
          />
        </div> 
      </div>

      <div className="flex flex-wrap -mx-3 mb-1">
        <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
          <AnnotationsFilter
            annotationTermsList={annotationTermsList}
            selectedAnnotationTerms={selectedAnnotationTerms}
            excludedAnnotationTerms={excludedAnnotationTerms}
            typedValue={typedValue.annotationTerm}
            handleAnnotationTermsChange={handleInputChangeFns.annotationTerms}
            handleAnnotationTermsBlur={handleInputBlurFns.annotationTerms}
            handleTermSelectFn={handleSelectFns.annotationTerms}
            handleSelectedClick={handleSelectedClick}
            annotationValuesList={annotationValuesList}
            selectedAnnotationValues={selectedAnnotationValues}
            excludedAnnotationValues={excludedAnnotationValues}
            annotationValuesOnFocus={annotationValuesOnFocus}
            handleAnnotationValuesChange={handleInputChangeFns.annotationValues}
            handleAnnotationValuesBlur={handleInputBlurFns.annotationValues}
            handleValuesSelectFn={handleSelectFns.annotationValues}
          />
        </div> 
      
        <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
          <ObsFieldsFilter
            obsFieldsList={obsFieldsList}
            selectedObsFields={selectedObsFields}
            currObsField={currObsField}
            typedValue={typedValue.obsField}
            obsFieldValuesList={obsFieldValuesList}
            selectedObsFieldValues={selectedObsFieldValues}
            obsFieldValueTypedValue={typedValue.obsFieldValue}
            handleObsFieldsChange={handleInputChangeFns.obsFields}
            handleObsFieldsBlur={handleInputBlurFns.obsFields}
            handleObsFieldsSelectFn={handleSelectFns.obsFields}
            handleObsFieldValuesChange={handleInputChangeFns.obsFieldValues}
            handleObsFieldValuesBlur={handleInputBlurFns.obsFieldValues}
            handleObsFieldValuesSelectFn={handleSelectFns.obsFieldValues}
            handleSelectedClick={handleSelectedClick}
          />
        </div> 
      </div>
        
    </form>
  );
};

export default SearchFilter;
