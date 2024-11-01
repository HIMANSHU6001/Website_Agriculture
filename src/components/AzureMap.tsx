"use client";
import React, { useEffect, useRef, useState } from "react";
import * as atlas from "azure-maps-control";

interface AzureMapProps {
  subscriptionKey: string ;
}
interface POIResult {
  position: {
    lon: number;
    lat: number;
  };
  poi: {
    name: string;
  };
}

const AzureMap: React.FC<AzureMapProps> = ({ subscriptionKey }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  const UserLocationPin = `
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
        fill="#3478F5"
        fill-opacity="0.2"
      />
      <path
        d="M25 37C31.6274 37 37 31.6274 37 25C37 18.3726 31.6274 13 25 13C18.3726 13 13 18.3726 13 25C13 31.6274 18.3726 37 25 37Z"
        fill="white"
      />
      <path
        d="M25 35C30.5228 35 35 30.5228 35 25C35 19.4772 30.5228 15 25 15C19.4772 15 15 19.4772 15 25C15 30.5228 19.4772 35 25 35Z"
        fill="#3478F5"
      />
    </svg>`;
  useEffect(() => {
    let map: atlas.Map | null = null;
    const loadMap = (center: [number, number]) => {
      if (!mapRef.current) return;

      map = new atlas.Map(mapRef.current, {
        center: center,
        zoom: 10,
        authOptions: {
          authType: atlas.AuthenticationType.subscriptionKey,
          subscriptionKey: subscriptionKey,
        },
        tileset:
          "https://atlas.microsoft.com/map/tileset?api-version=2.1&language=NGT&tilesetId=microsoft.traffic.relative",
        mode: "no-cors",
        view: "Auto",
      });

      map.events.add("ready", () => {
        if (!map) return;

        if (center[0] !== 0 && center[1] !== 0) {
          map?.markers.add(
            new atlas.HtmlMarker({
              position: center,
              htmlContent: UserLocationPin,
            })
          );
        }
      });
    };

    const loadLabs = (center: [number, number]) => {
      var query = "Soil Testing Laboratory";
      var radius = 10000;
      var lon = center[0];
      var lat = center[1];
      var url = `https://atlas.microsoft.com/search/poi/json?api-version=1.0&query=${query}&lat=${lat}&lon=${lon}&radius=${radius}`;
      console.log("url", url);

      fetch(url, {
        headers: {
          "Subscription-Key": subscriptionKey,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          var bounds = [];
          bounds.push([lon, lat]);
          const labDataSource = new atlas.source.DataSource();
          if (!map) return;
          map.sources.add(labDataSource);

          response.results.forEach((result: POIResult) => {
            console.log("result", result);

            const point = new atlas.data.Point([
              result.position.lon,
              result.position.lat,
            ]);
            const feature = new atlas.data.Feature(point, {
              name: result.poi.name,
            });
            labDataSource.add(feature);
            bounds.push([result.position.lon, result.position.lat]);
          });

          const symbolLayer = new atlas.layer.SymbolLayer(
            labDataSource,
            undefined,
            {
              iconOptions: {
                image: "pin-red",
                anchor: "center",
                allowOverlap: true,
                offset: [0, -10],
              },
              textOptions: {
                textField: ["get", "name"],
                offset: [0, 1.2],
              },
            }
          );

          map.layers.add(symbolLayer);

          if (bounds.length > 0) {
            map.setCamera({
              bounds: atlas.data.BoundingBox.fromPositions(bounds),
              padding: 50,
            });
          }
        });
    };

    if (typeof window !== "undefined") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([longitude, latitude]);
            loadMap([longitude, latitude]);
            loadLabs([longitude, latitude]);
          },
          (error) => {
            console.error("Error getting user location:", error);
            loadMap([0, 0]);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        loadMap([0, 0]);
      }
    }

    if (!mapRef.current) return;

    return () => {
      if (map) {
        map.dispose();
      }
    };
  }, [subscriptionKey]);

  return <div ref={mapRef} className="h-full w-full"></div>;
};

export default AzureMap;
