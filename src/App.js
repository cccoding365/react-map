import React, { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";
import { chinaMapConfig } from "./config";
import geoJson from './china.json';
import { resData } from "./data";

export default function App() {
  const BASE_URL = 'https://geo.datav.aliyun.com/areas_v3/bound/geojson';
  const [geoJSON, setGeoJSON] = useState(geoJson);
  const ref = useRef(null);
  let mapInstance = null;

  const renderMap = () => {
    const renderedMapInstance = echarts.getInstanceByDom(ref.current);
    if (renderedMapInstance) {
      mapInstance = renderedMapInstance;
    } else {
      mapInstance = echarts.init(ref.current);
    }
    mapInstance.setOption(
      chinaMapConfig({ data: resData.data, max: resData.max, min: 0 })
    );
    mapInstance.on('click', async (e) => {
      const { adcode, childrenNum } = geoJSON.features.find(item => item.properties.name === e.name).properties;
      if (!childrenNum) {
        setGeoJsonData();
      } else {
        setGeoJsonData(adcode);
      }
      echarts.registerMap("china", { geoJSON });
      renderMap();
    });
  };

  const setGeoJsonData = async (adcode = 100000) => {
    const response = await fetch(`${BASE_URL}?code=${adcode}_full`);
    const result = await response.json();
    console.log(result);
    setGeoJSON(result);
  };

  useEffect(() => {
    echarts.registerMap("china", { geoJSON });
    renderMap();
  });

  useEffect(() => {
    window.onresize = function () {
      mapInstance.resize();
    };
    return () => {
      mapInstance && mapInstance.dispose();
    };
  });

  return (
    <>
      <div style={{ width: "100%", height: "99vh" }} ref={ref}></div>
    </>
  );
}
