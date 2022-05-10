export function getUrl(longUrl) {
  let domain = new URL(longUrl);
  domain = domain.hostname;
  return domain.replace(/^www\./, "");
}

export function cleanUrl(url) {
  const regEx = new RegExp(
    /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (!url.match(regEx)) {
    return false;
  }
  return true;
}

export function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export function cleanTwitterCardType (obj) {
  if (obj.twitterCard === undefined) {
    if (
      obj.type !== undefined &&
      obj.title !== undefined &&
      obj.description !== undefined
    ) {
      return "summary";
    } 
    return "";
  } else if (
    obj.twitterCard.content &&
    !obj.twitterCard.content.includes("summary") &&
    obj.twitterCard.content !== "app" &&
    obj.twitterCard.content !== "player"
  ) {
    if (
      obj.type !== undefined &&
      obj.title !== undefined &&
      obj.description !== undefined
    ) {
      return "summary";
    }
    return ""
  } else {
    return obj.twitterCard.content
  }
};

export function validateTwitter (obj) {
  if (obj.twitterCard === undefined) {
    //If an og:type, og:title and og:description exist
    //in the markup but twitter:card is absent, then a
    //summary card may be rendered.
    //https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
    if (
      obj.type !== undefined &&
      obj.title !== undefined &&
      obj.description !== undefined
    ) {
      return true;
    }
    return false;
  } else if (
    obj.twitterCard.content &&
    !obj.twitterCard.content.includes("summary") &&
    obj.twitterCard.content !== "app" &&
    obj.twitterCard.content !== "player"
  ) {
    if (
      obj.type !== undefined &&
      obj.title !== undefined &&
      obj.description !== undefined
    ) {
      return true;
    }
    return false;
  } else if (
    obj.twitterCard.content &&
    obj.twitterCard.content.includes("summary")
  ) {
    if (obj.title === undefined) {
      return false;
    } else {
      return true;
    }
  } else if (
    obj.twitterCard.content &&
    obj.twitterCard.content === "player"
  ) {
    if (
      obj.twitterTitle === undefined ||
      obj.twitterSite === undefined ||
      obj.twitterPlayer === undefined ||
      obj.twitterPlayerWidth === undefined ||
      obj.twitterPlayerHeight === undefined ||
      obj.twitterImage === undefined
    ) {
      return false;
    } else {
      return true;
    }
  } else if (
    obj.twitterCard.content &&
    obj.twitterCard.content === "app"
  ) {
    if (
      obj.twitterSite === undefined ||
      obj.twitterAppIdIphone === undefined ||
      obj.twitterAppIdIpad === undefined ||
      obj.twitterAppIdGooglePlay === undefined
    ) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export const validateFB = (obj) => {
  //When the path referred to by og:url returns an og:url link 
  //that is different, the new link is followed. The sharing details 
  //that Facebook uses are the ones at the final link in the redirect 
  //chain. The final link in the chain should also include 
  //the og:url meta tag. If og:url isn't specified, 
  //then the URL of the page is assumed to be the canonical URL.
  //https://developers.facebook.com/docs/sharing/webmasters/getting-started/versioned-link
  if (obj.url === undefined){
    if (obj.searchedUrl !== ""){
      //if there is a url but no title
      if (!obj.title && !obj.pageTitle) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  } 
};

export function getMissingProperties(obj){
  let missing = {}
  if (obj.title === undefined){
    missing.title = true
  }
  if (obj.description === undefined){
    missing.description = true
  }
  if (obj.type === undefined){
    missing.type = true
  }
  if (obj.url === undefined){
    missing.url = true
  }
  if (obj.image === undefined){
    missing.image = true
  }
  return missing;
}
