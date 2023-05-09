import { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import icons from "../ultils/icons";

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;
const { HiOutlineLocationMarker } = icons;

export default function SimpleMap({ address }: any) {
  const [toaDo, setToaDo] = useState<{ lat: number; lng: number }>({
    lat: 21.030746,
    lng: 105.823916,
  });
  const defaultProps = {
    center: {
      lat: 21.030746,
      lng: 105.823916,
    },
    zoom: 13,
  };

  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [shouldUpdateMap, setShouldUpdateMap] = useState(false);
  const wait = (ms: any) => new Promise((y) => setTimeout(y, ms));
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => setMapsLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    // if (mapsLoaded) {
    //   const getCoors = async () => {
    //     const result = await geocodeByAddress(address);
    //     const latIng: any = await getLatLng(result[0]);
    //     console.log({ result, latIng });
    //     setToaDo(latIng);
    //     setShouldUpdateMap(!shouldUpdateMap);
    //   };
    //   getCoors();
    // }
  }, [mapsLoaded, address]);
  return (
    <div style={{ height: "300px", width: "100%" }}>
      {mapsLoaded && Number(toaDo.lat) && Number(toaDo.lng) && (
        <>
          <GoogleMapReact
            key={shouldUpdateMap as any}
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAP_KEY || "",
            }}
            defaultCenter={{ lat: Number(toaDo.lat), lng: Number(toaDo.lng) }}
            defaultZoom={defaultProps.zoom}
            debounced
          >
            <AnyReactComponent
              lat={toaDo.lat}
              lng={toaDo.lng}
              text={<HiOutlineLocationMarker color="red" size={24} />}
            />
          </GoogleMapReact>
        </>
      )}
    </div>
  );
}
