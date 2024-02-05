import { GoogleMap, useJsApiLoader, Marker, InfoWindow, } from "@react-google-maps/api";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import numbro from "numbro";

const InfoBanner = ({ selectedMark }: any) => {
  return (
    <Link href={`/project/${selectedMark?.slug}`}>
      <Stack>
        <Image src={selectedMark?.headerImage?.url} alt={selectedMark?.title} width={250} height={100} />
          <div className="pt-[17px] pb-[5px]">
            <h4 className="pb-[5px] text-[18px] font-[500] leading-none">
              {selectedMark?.title}
            </h4>
            <p className="pb-0 text-[12px] uppercase">
              ₱ {numbro(selectedMark?.minPrice).format("0.0a")} -{" "}
              {numbro(selectedMark?.maxPrice).format("0.0a")}
            </p>
          </div>
      </Stack>
    </Link>
  )
}

function get_distance_in_miles(d1: any, d2: any) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = d1.latitude * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = d2.latitude * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (d2.longitude - d1.longitude) * (Math.PI / 180); // Radian difference (longitudes)
  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );

  return d.toFixed(2);
}

const MapLocator = ({ markers }: any) => {
  const [selectedMark, setSelectedMark] = useState<any>(null)
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GMAPS_TOKEN as string,
  });

  useEffect(() => {
    if (markers.length > 0) {
      setSelectedMark(markers[0])
    }
  }, [markers])

  const renderMap = () => {
    return (
      isLoaded && (
        <GoogleMap
          onLoad={map => {
            console.log('loaded')
          }}
          onUnmount={map => {
            // do your stuff before map is unmounted
          }}
          mapContainerStyle={{
            width: "100%",
            height: "800px",
          }}
          zoom={13} 
          center={{
            lat: selectedMark?.coordinates?.latitude,
            lng: selectedMark?.coordinates?.longitude,
          }}
        >
          {
            markers?.map((item: any, i: number) => (
              <>
                <Marker
                  position={{
                    lat: item?.coordinates?.latitude,
                    lng: item?.coordinates?.longitude,
                  }}
                  onClick={() => setSelectedMark(item)}
                />
                {selectedMark && (
                  <InfoWindow
                    key={i}
                    position={{
                      lat: selectedMark?.coordinates?.latitude,
                      lng: selectedMark?.coordinates?.longitude,
                    }}
                    onCloseClick={() => setSelectedMark(null)}
                  >
                    {
                      !selectedMark?.isLandmark ? <InfoBanner selectedMark={selectedMark} /> : (
                        <Stack direction="row">
                          <svg
                            className="mr-[15px]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="23"
                            viewBox="0 0 15 23"
                            fill="none"
                          >
                            <path
                              d="M7.33377 0.658447C3.59101 0.658447 0.545898 3.99358 0.545898 8.0928C0.545898 9.32339 0.826812 10.5435 1.36084 11.6257L6.96258 22.7219C7.03715 22.8698 7.17926 22.9615 7.33377 22.9615C7.48829 22.9615 7.6304 22.8698 7.70497 22.7219L13.3088 11.6221C13.8407 10.5435 14.1216 9.32335 14.1216 8.09276C14.1216 3.99358 11.0765 0.658447 7.33377 0.658447ZM7.33377 11.81C5.46239 11.81 3.93986 10.1424 3.93986 8.0928C3.93986 6.04319 5.46239 4.37565 7.33377 4.37565C9.20516 4.37565 10.7277 6.04319 10.7277 8.0928C10.7277 10.1424 9.20516 11.81 7.33377 11.81Z"
                              fill="#0377CB"
                            />
                          </svg>
                          <div className="">
                            <h4 className="pb-[5px] text-[18px] font-[500] leading-none">
                              {selectedMark?.title}
                            </h4>
                            <p className="pb-0 text-[12px] uppercase">
                              {get_distance_in_miles(selectedMark.coordinates, {
                                latitude: item?.coordinates?.latitude,
                                longitude: item?.coordinates?.longitude,
                              })}{" "}
                              mi
                            </p>
                          </div>
                        </Stack>
                      )
                    }
                  </InfoWindow>
                )}
              </>
            ))
          }
        </GoogleMap>
      )
    );
  };
  return renderMap()
}

export default MapLocator