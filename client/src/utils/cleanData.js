export function getUrl(longUrl) {
    let domain = new URL(longUrl);
    domain = domain.hostname;
   return  domain.replace(/^www\./,'');
}

export function cleanUrl(url){
    const regEx = new RegExp(/(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (!url.match(regEx)){
        return false;
    }
    return true;
}

export const validateTwitter = (obj) => {
    if (obj.twitterCard === undefined) {
      return false;
    } else if (
      obj.twitterCard &&
      obj.twitterCard.content &&
      obj.twitterCard.content.includes("summary")
    ) {
      if (obj.title === undefined) {
        return false;
      } else {
        return true;
      }
    } else if (
      obj.twitterCard &&
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
      obj.twitterCard &&
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
    if (
      obj.title === undefined ||
      obj.url === undefined
    ) {
      return false;
    } else {
      return true;
    }
  };
