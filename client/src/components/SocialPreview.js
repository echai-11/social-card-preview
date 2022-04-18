import React, { useState } from "react";
import Preview from "./Preview";
import { cleanUrl,isEmpty } from "../utils/cleanData";
import "../styles/socialpreview.scss";

export default function SocialPreview() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [noDataError, setNoDataError] = useState(false);
  const [formError,setFormError]=useState({});
  const [disableBtn, setDisableBtn]=useState(false);

  const getData = async () => {
    if (!cleanUrl(url)) {
      setFormError({
        error:'Please fix the format of the url, it should start with http:// or https://'
      });
      setDisableBtn(false);
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
        "Cache-Control": "no-cache",
      },
    })
      .then(function (response) {
        if (response.status === 204) {
          console.log(response);
          setShowPreview(false);
          setNoDataError(true);
          setDisableBtn(false);
          throw new Error("No Data Found!!!");
        } else {
          return response.json();
        }
      })
      .then(function (response) {
        console.log(response);
        if (isEmpty(response)){
          setShowPreview(false);
          setNoDataError(true);
          setDisableBtn(false);
          throw new Error("No Data Found!!!");
        }
        setNoDataError(false);
        setData(response);
        setShowPreview(true);
        setDisableBtn(false);
        return response;
      })
      .catch(function (error) {
        setDisableBtn(false);
        throw new Error(error);
      });
  };
  const reset = ()=>{
    setShowPreview(false);
    setNoDataError(false);
    setFormError({});
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    reset();
    setDisableBtn(true);
    url !== '' && getData(url);
  }
 
  return (
    <div>
      <div className="search">
        <form>
          <div className="form-input">
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.examplewebsite.com"
          />
          {formError?.error && <span className="form-input__error">{formError.error}</span>}
          </div>
          <div className="form-submit">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={disableBtn}
            >
              Search
            </button>
          </div>
        </form>
        {showPreview && <Preview data={data} />}
        {noDataError && <div className="no-data">No Data Found</div>}
      </div>
    </div>
  );
}
