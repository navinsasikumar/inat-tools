import AutoComplete from '../autocomplete';
import SelectedFieldsDisplay from '../selected-fields-display';

const IdentUsersFilter = ({
  identUsersList,
  selectedIdentUsers,
  excludedIdentUsers,
  typedValue,
  handleIdentUsersChange,
  handleIdentUsersBlur,
  handleSelectFn,
  handleSelectedClick,
}) => {
  const selectedIdentUsersLabel = selectedIdentUsers.length > 0 ? 'Selected Users: ' : '';
  const excludedIdentUsersLabel = excludedIdentUsers.length > 0 ? 'Excluded Users: ' : '';

  return (
    <div className="h-min max-h-min">
      <input
        type="text"
        placeholder="Identifying Users"
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-2 mb-1 leading-tight focus:outline-none focus:bg-white"
        onChange={handleIdentUsersChange}
        onBlur={handleIdentUsersBlur}
        value={typedValue}
      /> 
      {identUsersList && identUsersList.results && identUsersList.results.length > 0 && 
        <AutoComplete type="identUsers" matches={identUsersList} handleSelectFn={handleSelectFn}/> 
      }
      {selectedIdentUsers.length > 0 && 
        <SelectedFieldsDisplay
          selectedArray={selectedIdentUsers}
          selectedLabel={selectedIdentUsersLabel}
          selectedType="identUsers"
          handleSelectedClick={handleSelectedClick}
        />
      }
      {excludedIdentUsers.length > 0 && 
        <SelectedFieldsDisplay
          selectedArray={excludedIdentUsers}
          selectedLabel={excludedIdentUsersLabel}
          selectedType="identUsersExclude"
          handleSelectedClick={handleSelectedClick}
        />
      }
    </div>
  );
};

export default IdentUsersFilter;
