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
export const cleanTwitterCardType = (obj) => {
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
export const validateTwitter = (obj) => {
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
  if (obj.title === undefined || obj.url === undefined) {
    return false;
  } else {
    return true;
  }
};
