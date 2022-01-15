const ImageSquare = ({children}) => {
  return (
    <div class="leading-[12rem] h-48 w-48 text-center">
      {children}
    </div>
  );
};

const ObservationImage = ({photos}) => {
  let dispPhoto = photos.length > 0 ? photos[0].url : '';
  dispPhoto = dispPhoto.replace(/square/, 'medium');
  const attribution =  photos.length > 0 ? photos[0].attribution: '';

  if (dispPhoto) {
    return (
      <ImageSquare>
        <img src={dispPhoto} alt={attribution} class="h-48 w-48 object-cover overflow-hidden t" />
      </ImageSquare>
    );
  } else {
    return (
      <ImageSquare>
        No Image
      </ImageSquare>
    );
  }
};

export default ObservationImage;
