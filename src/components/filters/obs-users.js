import AutoComplete from '../autocomplete';
import SelectedFieldsDisplay from '../selected-fields-display';

const ObsUsersFilter = ({
  obsUsersList,
  selectedObsUsers,
  excludedObsUsers,
  typedValue,
  handleObsUsersChange,
  handleObsUsersBlur,
  handleSelectFn,
  handleSelectedClick,
}) => {
  const selectedObsUsersLabel = selectedObsUsers.length > 0 ? 'Selected ObsUsers: ' : '';
  const excludedObsUsersLabel = excludedObsUsers.length > 0 ? 'Excluded ObsUsers: ' : '';

  return (
    <div className="h-min max-h-min">
      <input
        type="text"
        placeholder="Observing Users"
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-2 mb-1 leading-tight focus:outline-none focus:bg-white"
        onChange={handleObsUsersChange}
        onBlur={handleObsUsersBlur}
        value={typedValue}
      /> 
      {obsUsersList && obsUsersList.results && obsUsersList.results.length > 0 && 
        <AutoComplete type="obsUsers" matches={obsUsersList} handleSelectFn={handleSelectFn}/> 
      }
      <SelectedFieldsDisplay
        selectedArray={selectedObsUsers}
        selectedLabel={selectedObsUsersLabel}
        selectedType="obsUsers"
        handleSelectedClick={handleSelectedClick}
      />
      <SelectedFieldsDisplay
        selectedArray={excludedObsUsers}
        selectedLabel={excludedObsUsersLabel}
        selectedType="obsUsersExclude"
        handleSelectedClick={handleSelectedClick}
      />
    </div>
  );
};

export default ObsUsersFilter;
