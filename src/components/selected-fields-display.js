import SelectedFilters from './selected-filters';

const SelectedFieldsDisplay = ({
  selectedArray,
  selectedLabel,
  selectedType,
  handleSelectedClick,
}) => {
  return (
    <div className="inline-block pr-3 text-xs text-white">
      {selectedLabel}
      {selectedArray && selectedArray.map((item, index) => (
        <SelectedFilters
          key={`${selectedType}-${item.id}`}
          selectedIndex={index}
          selectedValue={item}
          selectedType={selectedType}
          handleSelectedClick={handleSelectedClick}
        />
      ))}
    </div>
  );
};

export default SelectedFieldsDisplay;
