import fetch from "node-fetch";
import cheerio from "cheerio";

import {
  TITLE,
  DESCRIPTION,
  IMAGE,
  IMAGE_ALT,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  IMAGE_TYPE,
  URL,
  TYPE,
  AUDIO,
  AUDIO_TYPE,
  VIDEO,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
  VIDEO_TYPE,
  SITE_NAME,
  TWITTER_CARD,
  TWITTER_SITE,
  TWITTER_TITLE,
  TWITTER_DESCRIPTION,
  TWITTER_IMAGE,
  TWITTER_IMAGE_ALT,
  TWITTER_PLAYER,
  TWITTER_PLAYER_WIDTH,
  TWITTER_PLAYER_HEIGHT,
  TWITTER_APP_ID_IPHONE,
  TWITTER_APP_ID_IPAD,
  TWITTER_APP_ID_GOOGLEPLAY,
  TWITTER_APP_URL_IPHONE,
  TWITTER_APP_URL_IPAD,
  TWITTER_APP_URL_GOOGLEPLAY,
  TWITTER_APP_COUNTRY,
} from "./constants.js";

// function to get the raw data
function getRawData (toScrapeUrl) {
  return fetch(toScrapeUrl)
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};

function getProperties($) {
   function getContent(property) {
      if (
      $(`meta[property='${property}']`).attr("content") !== undefined){
        return ({
          content: $(`meta[property='${property}']`).attr("content"),
          name: property
        });
      } else if ($(`meta[name='${property}']`).attr("content") !== undefined) {
        return ({
          content: $(`meta[name='${property}']`).attr("content"),
          name: property
        });
      }
   }
  let viewObj = {};
  viewObj.url = getContent(URL);
  viewObj.title = getContent(TITLE);
  viewObj.description = getContent(DESCRIPTION);
  viewObj.type = getContent(TYPE);
  viewObj.image = getContent(IMAGE);
  viewObj.imageAlt = getContent(IMAGE_ALT);
  viewObj.imageWidth = getContent(IMAGE_WIDTH);
  viewObj.imageHeight = getContent(IMAGE_HEIGHT);
  viewObj.imageType = getContent(IMAGE_TYPE);
  viewObj.audio = getContent(AUDIO);
  viewObj.audioType = getContent(AUDIO_TYPE);
  viewObj.video = getContent(VIDEO);
  viewObj.videoWidth = getContent(VIDEO_WIDTH);
  viewObj.videoHeight = getContent(VIDEO_HEIGHT);
  viewObj.videoType = getContent(VIDEO_TYPE);
  viewObj.siteName = getContent(SITE_NAME);
  viewObj.twitterCard = getContent(TWITTER_CARD);
  viewObj.twitterSite = getContent(TWITTER_SITE);
  viewObj.twitterTitle = getContent(TWITTER_TITLE);
  viewObj.twitterDescription = getContent(TWITTER_DESCRIPTION);
  viewObj.twitterImage = getContent(TWITTER_IMAGE);
  viewObj.twitterImageAlt = getContent(TWITTER_IMAGE_ALT);
  viewObj.twitterPlayer = getContent(TWITTER_PLAYER);
  viewObj.twitterPlayerWidth = getContent(TWITTER_PLAYER_WIDTH);
  viewObj.twitterPlayerHeight = getContent(TWITTER_PLAYER_HEIGHT);
  viewObj.twitterAppIdIphone = getContent(TWITTER_APP_ID_IPHONE);
  viewObj.twitterAppIdIpad = getContent(TWITTER_APP_ID_IPAD);
  viewObj.twitterAppIdGooglePlay = getContent(TWITTER_APP_ID_GOOGLEPLAY);
  viewObj.twitterAppUrlIphone = getContent(TWITTER_APP_URL_IPHONE);
  viewObj.twitterAppUrlIpad = getContent(TWITTER_APP_URL_IPAD);
  viewObj.twitterAppUrlGooglePlay = getContent(TWITTER_APP_URL_GOOGLEPLAY);
  viewObj.twitterAppCountry = getContent(TWITTER_APP_COUNTRY);
  
  return new Promise(resolve=>{
    resolve(viewObj);
  });
}

async function checkProperties($,res) {
  const result = await getProperties($);
  console.log("result", result);
  if (checkIfEmpty(result) === false) {
    res.status(200);
    res.end(JSON.stringify(result));
  } else {
    res.status(204);
    res.end(JSON.stringify({}));
  }
}

function checkIfEmpty(obj) {
  return (
    Object.values(obj).every((x) => x === null || x === "" || typeof x === undefined)
  );
}
// start of the program
const getData = async (aUrl, res) => {
  await getRawData(aUrl)
    .then(async (response) => {
      var rawData = response;
      const $ = cheerio.load(rawData);
      try {
        checkProperties($,res);
      } catch (error) {
        console.log(error);
        res.status(500);
        res.end(`Internal Server Error: ${error}`);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400);
      res.end(`Bad Request: ${error}`);
    });
};

export default getData;
