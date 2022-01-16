import ObservationImage from './observation-image';
import ObservationCaption from './observation-caption';

const ObservationSquare = ({obs}) => {
  return (
    <div className="bg-zinc-900 max-w-[12rem] text-white w-48">
      <a href={obs.uri} target="_blank" rel="noopener noreferrer">
        <ObservationImage photos={obs.photos} />
        <ObservationCaption obs={obs} />
      </a>
    </div>
  );
};

export default ObservationSquare;
