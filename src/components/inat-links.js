const INatLinks = ({queryStr}) => {
  return (
    <div className="p-2 text-center text-white">
      See results on iNaturalist:
      <a 
        className="hover:text-gray-400 px-3 underline underline-offset-4"
        href={`https://inaturalist.org/observations?${queryStr}`}
        target="_blank" rel="noopener noreferrer"
      >
        Observations
      </a>
      |
      <a 
        className="hover:text-gray-400 px-3 underline underline-offset-4"
        href={`https://inaturalist.org/observations/identify?${queryStr}`}
        target="_blank" rel="noopener noreferrer"
      >
        Identify 
      </a>
      <div className="p-2 text-xs">
        Some filters may not work for both observations and identifications.
        Any default filters in iNat will still hold if they are not overwritten here.
      </div>
    </div>
  );
};

export default INatLinks;
