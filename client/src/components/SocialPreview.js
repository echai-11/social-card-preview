import React, { useState } from "react";
import Preview from "./Preview";
import { cleanUrl } from "../utils/cleanData";
import { handleData } from "../utils/scrape";
import "../styles/socialpreview.scss";

export default function SocialPreview() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formError, setFormError] = useState({});
  const [disableBtn, setDisableBtn] = useState(false);
  const [serverError, setServerError] = useState(false);

  const getData = async () => {
    if (!cleanUrl(url)) {
      setFormError({
        error:
          "Please fix the format of the url, it should start with http:// or https://",
      });
      setDisableBtn(false);
      return;
    }
  
    let rawData = await fetch(url)
      .then((response) => {
        if (response.status === 200){
          console.log(response);
          return response.blob();
        } else {
          return response.json()
          .then(function (jsonRes) {
              return Promise.reject(jsonRes);
          });
        }
      })
      .then((blob) => {
        return new Response(blob).text();
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        showError(error);
      });

      if (!serverError){
        handleData(rawData)
        .then((response)=>{
          setData(response);
          setData(response);
          setShowPreview(true);
          setDisableBtn(false);
          console.log(response);
        })
        .catch((error)=>{
          showError(error);
        });
      }
  };
  
  function showError(error){
    setShowPreview(false);
    setDisableBtn(false);
    setServerError(true);
    console.log(error);
  }
  function reset() {
    setShowPreview(false);
    setFormError({});
    setServerError(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    reset();
    setDisableBtn(true);
    url !== "" && getData(url);
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
              data-testid="search-bar"
            />
            {formError?.error && (
              <span className="form-input__error" data-testid="search-err">
                {formError.error}
              </span>
            )}
          </div>
          <div className="form-submit">
            <button
              type="submit"
              onClick={(e) => {
                url !== "" && handleSubmit(e);
              }}
              disabled={disableBtn}
              data-testid="search-btn"
            >
              Search
            </button>
          </div>
        </form>
        {showPreview && <Preview data={data} />}
        {serverError && <div className="no-data">Server Error</div>}
      </div>
    </div>
  );
}
