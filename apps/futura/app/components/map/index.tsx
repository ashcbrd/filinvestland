"use client";

import React, { useState, useEffect, useMemo, memo } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { createRoot } from "react-dom/client";
import numbro from "numbro";
import Link from "next/link";

const gnw = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [
      {
        color: "#f7f7f7",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#858585",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        color: "#AAAAAA",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry",
    stylers: [
      {
        color: "#9e9e9e",
      },
      {
        lightness: 35,
      },
      {
        weight: 0.5,
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "all",
    stylers: [
      {
        color: "#AAAAAA",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#ededed",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];

const Map = memo(function Map({
  projects,
  active,
  activeLocation,
  type,
}: {
  projects: any;
  active?: any;
  activeLocation?: any;
  type?: any;
}) {
  const Map = () => {
    const [map, setMap] = useState(null as any);
    const ref = React.createRef() as any;

    const mapOptions = {
      zoom: 10,
      mapId: "DEMO_MAP_ID",
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
    };

    useEffect(() => {
      setMap(new window.google.maps.Map(ref.current, mapOptions));
    }, []);

    return (
      <>
        <div id="map" className="h-[350px] w-full md:h-[600px]" ref={ref}></div>
        {map && <Pins map={map} />}
      </>
    );
  };

  const Pins = ({ map }: any) => {
    const [selected, setSelected] = useState(
      active.id ? active.id : (null as any)
    );

    useEffect(() => {
      const styledMapType = new google.maps.StyledMapType(gnw);

      map.mapTypes.set("gnw", styledMapType);
      map.setMapTypeId("gnw");

      var bounds = new google.maps.LatLngBounds();

      if (
        projects.filter(
          (p: any) => p.coordinates.latitude && p.coordinates.longitude
        ).length > 0
      ) {
        for (const p of projects.filter(
          (p: any) => p.coordinates.latitude && p.coordinates.longitude
        )) {
          bounds.extend({
            lat: p.coordinates.latitude,
            lng: p.coordinates.longitude,
          });
        }
      } else if (activeLocation && activeLocation.coordinates) {
        bounds.extend({
          lat: activeLocation.coordinates.latitude,
          lng: activeLocation.coordinates.longitude,
        });
      }

      if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
        var extendPoint1 = new google.maps.LatLng(
          bounds.getNorthEast().lat() + 0.01,
          bounds.getNorthEast().lng() + 0.01
        );
        var extendPoint2 = new google.maps.LatLng(
          bounds.getNorthEast().lat() - 0.01,
          bounds.getNorthEast().lng() - 0.01
        );
        bounds.extend(extendPoint1);
        bounds.extend(extendPoint2);
      }

      map.fitBounds(bounds);
    }, []);

    if (
      projects.filter(
        (p: any) => p.coordinates.latitude && p.coordinates.longitude
      ).length > 0
    ) {
      return (
        <>
          {projects
            .filter(
              (p: any) => p.coordinates.latitude && p.coordinates.longitude
            )
            .map((p: any, index: number) => (
              <Pin
                project={p}
                map={map}
                selected={{
                  get: selected,
                  set: () => setSelected(selected === p.id ? null : p.id),
                }}
              />
            ))}
        </>
      );
    }

    // if (activeLocation) {
    //     return (
    //         <>
    //             <Pin
    //                 project={activeLocation}
    //                 map={map}
    //                 seeDetails={true}
    //                 selected={{
    //                     get: selected,
    //                     set: () => setSelected(activeLocation.id),
    //                 }}
    //             />
    //         </>
    //     );
    // }
  };

  const Pin = ({ project, map, seeDetails = false, selected }: any) => {
    const p = project;
    const position = {
      lat: p.coordinates.latitude,
      lng: p.coordinates.longitude,
    };

    useEffect(() => {
      if (active.id === p.id) {
        setTimeout(() => {
          map.setCenter(position);
        }, 100);
      }
    }, [active]);

    return (
      <Marker
        map={map}
        active={selected.get === p.id}
        position={position}
        onClick={() => {
          selected.set();
          map.setCenter(position);
        }}
      >
        <div className="marker">
          <div className="relative">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="11.8476"
                cy="12.5038"
                r="10.123"
                fill="#E12827"
                stroke="white"
                stroke-width="3"
              />
              <circle cx="11.8478" cy="12.5041" r="2.35172" fill="white" />
            </svg>
            <div
              className={`${
                selected.get === p.id
                  ? "!opacity-100"
                  : "pointer-events-none opacity-0"
              } absolute bottom-[100%] left-[50%] z-[2] mb-[7px] w-[195px] translate-x-[-50%] overflow-hidden rounded-[10px] border-[6px] border-white bg-white ${
                type === "detail" ? "w-[249px]" : ""
              }`}
            >
              <Link href={`/project/${p.slug}`} className="relative">
                <div
                  className={`bg-custom-gray-3 relative h-[128px] w-full overflow-hidden rounded-[10px] bg-cover bg-center ${
                    type === "detail" ? "border-[6px] border-white" : ""
                  }`}
                  style={{ backgroundImage: `url(${p.headerImage.url})` }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[63px] w-full"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
                    }}
                  ></div>
                </div>
                {type === "detail" && (
                  <>
                    <h4 className="absolute bottom-0 left-0 z-[2] pb-[17px] pl-[19px] text-[18px] font-[500] leading-none text-white">
                      {p.title}
                    </h4>
                    <div
                      className="absolute bottom-[6px] left-[6px] right-[6px] h-[80px]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)",
                      }}
                    />
                  </>
                )}
                {type !== "detail" && (
                  <div className="absolute bottom-0 left-0 right-0 z-[1] p-[9px] pb-[9px] text-white">
                    <h4
                      className="pb-[2px] text-[15px] font-[600] leading-[18px]"
                      style={{ fontFamily: "Quicksand" }}
                    >
                      {p.title}
                    </h4>
                    <p
                      className="pb-[2px] text-[13px] font-[500] uppercase leading-[16px]"
                      style={{ fontFamily: "Quicksand" }}
                    >
                      ₱ {numbro(p.minPrice).format("0.0a")} -{" "}
                      {numbro(p.maxPrice).format("0.0a")}
                    </p>
                    <p
                      className="text-[10px] font-[500]"
                      style={{ fontFamily: "Quicksand" }}
                    >
                      {p.location.title}
                    </p>
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
      </Marker>
    );
  };

  const Marker = ({ map, position, children, onClick, active }: any) => {
    const rootRef = React.useRef();
    const markerRef = React.useRef() as any;

    useEffect(() => {
      if (!rootRef.current) {
        const container = document.createElement("div");
        (rootRef as any).current = createRoot(container);

        markerRef.current = new (google.maps.marker as any).AdvancedMarkerView({
          position,
          content: container,
          zIndex: active ? 99 : 1,
        });
      }
    }, []);

    useEffect(() => {
      (rootRef.current as any).render(children);
      markerRef.current.position = position;
      markerRef.current.map = map;

      markerRef.current.addListener("click", onClick);
    }, [map, position, children, onClick]);

    return null;
  };

  return (
    <Wrapper
      apiKey="AIzaSyB-Og1uzNQZVJ6Onne-56491DlQ1IMlovY"
      version="beta"
      libraries={["marker"]}
    >
      <Map />
    </Wrapper>
  );
});

export default Map;
