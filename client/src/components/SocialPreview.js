import React, { useState } from "react";
import Preview from "./Preview";
import { cleanUrl } from "../utils/cleanData";
import "../styles/socialpreview.scss";

export default function SocialPreview() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [showPreview,setShowPreview]=useState(false);
  const [noDataError,setNoDataError]=useState(false);
  const getData = async () => {
    if (!cleanUrl(url)){
        alert('Please fix the format of the url, it should start with http:// or https://');
        return;
    }
    fetch("/url", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        url: url,
      }),
      headers: {
        "Content-Type": "application/json",
        Origin: "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Cache-Control": "no-cache"
      },
    })
      .then(function (response) {
          if (response.status === 204){
            console.log(response);
              setShowPreview(false);
              setNoDataError(true);
              throw new Error('No Data Found!!!')
          } else {
             return response.json();
          }
      })
      .then(function (response) {
        console.log(response);
        setNoDataError(false);
        setData(response);
        setShowPreview(true);
        return response;
      })
      .catch(function (error) {
        throw new Error(error);
      });
  };
  return (
    <div>
        <div className="search">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.examplewebsite.com"
        />
        <button
          onClick={() => {
            url !== "" && getData(url);
          }}
        >
          Check this url
        </button>
        {showPreview && (
          <Preview data={data}/>
        )}
        {noDataError && 
        <div className="no-data">
          No Data Found
        </div>}
      </div>
    </div>
  );
}
