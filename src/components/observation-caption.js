const ObservationCaption = ({obs}) => {
  const { taxon } = obs;
  let commonName = 'Unknown';
  let latinName = '';

  if (taxon) {
    latinName = taxon.name;
    if (taxon.preferred_common_name) {
      commonName = taxon.preferred_common_name;
    } else {
      commonName = '';
    }
  }

  return (
    <div class="overflow-hidden p-2 text-ellipsis whitespace-nowrap">
      { commonName && (
        <>
          <div class="text-sm">
            {commonName}
          </div>
          {latinName && (
            <div class="italic text-xs">
              ({latinName})
            </div>
          )}
        </>
      )}
      { !commonName && latinName && (
        <div class="italic text-sm">
          {latinName}
        </div>
      )}
    </div>
  );
};

export default ObservationCaption;
