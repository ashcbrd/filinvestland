"use client";

import React, { useState, useEffect, memo } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { createRoot } from "react-dom/client";

const gnw = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [
      {
        color: "#252525",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#7A7A7A",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1C1C1C",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        color: "#525252"
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
        // visibility: "off",
        color: "#7A7A7A"
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#7A7A7A",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#2C2C2C",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off"
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        color: "#999999"
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#2b2b2b",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#2b2b2b",
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
        color: "#2b2b2b",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#2D333C",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
        visibility: "off"
      },
    ],
  },
];

const Map = memo(function Map() {
    const Map = () => {
        const [map, setMap] = useState(null as any);
        const ref = React.createRef() as any;

        const mapOptions = {
            zoom: 13,
            mapId: "DEMO_MAP_ID",
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
            draggable: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
        };

        useEffect(() => {
            setMap(new window.google.maps.Map(ref.current, mapOptions));
        }, []);

        return (
            <div className="h-[666px] bg-black/30 relative">
                <div id="map" className="h-[666px] absolute top-0 right-0 left-0 bottom-0" ref={ref}>
                </div>
                <div className="absolute top-0 left-0 right-0 h-[378px]" style={{background: "linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%)"}}></div>
                <div className="absolute right-[15px] bottom-[20px] bg-white p-[22px] !pt-[17px] text-[15px] max-w-[416px]">
                  <div> 
                    <h3 className="text-[25px] font-cormorant pb-[3px] text-[#261119]">Filinvest Land, Inc</h3>
                    <p className="pb-[10px]">Building, 79, Filinvest, 1550 Epifanio de los Santos Ave, Mandaluyong, Metro Manila</p>
                    <div className="flex items-center pb-[7px]">
                      <label className="text-[20px] font-[500] mr-[7px]">3.6</label>
                      <svg className="mr-[8px]" width="79" height="16" viewBox="0 0 79 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.33398 0.0275879L10.0933 5.44209L15.7864 5.44209L11.1806 8.78843L12.9398 14.2029L8.33398 10.8566L3.72814 14.2029L5.48741 8.78843L0.881565 5.44209L6.57471 5.44209L8.33398 0.0275879Z" fill="#FF5D02"/>
                        <path d="M24.0059 0.0275879L25.7651 5.44209L31.4583 5.44209L26.8524 8.78843L28.6117 14.2029L24.0059 10.8566L19.4 14.2029L21.1593 8.78843L16.5534 5.44209L22.2466 5.44209L24.0059 0.0275879Z" fill="#FF5D02"/>
                        <path d="M39.6777 0.0275879L41.437 5.44209L47.1302 5.44209L42.5243 8.78843L44.2836 14.2029L39.6777 10.8566L35.0719 14.2029L36.8312 8.78843L32.2253 5.44209L37.9185 5.44209L39.6777 0.0275879Z" fill="#FF5D02"/>
                        <path d="M55.3496 0.0275879L57.1089 5.44209L62.802 5.44209L58.1962 8.78843L59.9555 14.2029L55.3496 10.8566L50.7438 14.2029L52.503 8.78843L47.8972 5.44209L53.5903 5.44209L55.3496 0.0275879Z" fill="#FF5D02"/>
                        <path d="M71.0215 0.0275879L72.7808 5.44209L78.4739 5.44209L73.8681 8.78843L75.6273 14.2029L71.0215 10.8566L66.4156 14.2029L68.1749 8.78843L63.5691 5.44209L69.2622 5.44209L71.0215 0.0275879Z" fill="#D9D9D9"/>
                      </svg>
                      <a href="https://www.google.com/maps/place/Filinvest+Land,+Inc/@14.5752826,121.0464886,17z/data=!4m8!3m7!1s0x3397c8469a3250a1:0x7e7373e86f49a9c9!8m2!3d14.5752826!4d121.0490635!9m1!1b1!16s%2Fg%2F12hpgd_7w?entry=ttu" target="_blank" className="text-[15px] text-[#0065C1]">190 reviews</a>
                    </div>
                    <a href="https://www.google.com/maps?rlz=1C5CHFA_enPH1008PH1008&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDsyBggCEEUYQDIGCAMQRRg5MgYIBBBFGDwyBggFEEUYPDIGCAYQRRhBMgYIBxBFGEHSAQg0MjUwajBqNKgCALACAA&q=filinvest+land+inc+mandaluyong&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjerd_JotmCAxXCT2wGHSNcAFQQ_AUoAXoECAMQAw" target="_blank" className="text-[15px] text-[#0065C1]">View larger map</a>
                  </div>
                  <div>
                    
                  </div>
                </div>
                {map && <Pins map={map} />}
            </div>
        );
    };

    const Pins = ({ map }: any) => {
        useEffect(() => {
            const styledMapType = new google.maps.StyledMapType(gnw);

            map.mapTypes.set("gnw", styledMapType);
            map.setMapTypeId("gnw");
            map.setCenter({
              lat: 14.575552558265183, 
              lng: 121.0489776649628
            });
        }, []);

        return [];
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
