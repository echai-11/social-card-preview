import fetch from "node-fetch";
import cheerio from "cheerio";

//view obj
var viewObj = {
  url: "",
  title: "",
  image: "",
  imageAlt: "",
  description: "",
  twitter: {
    card: "",
    image: "",
    imageAlt: "",
    title: "",
    description: "",
  },
};
function resetViewObj () {
   viewObj = {
        url: "",
        title: "",
        image: "",
        imageAlt: "",
        description: "",
        twitter: {
          card: "",
          image: "",
          imageAlt: "",
          title: "",
          description: "",
        },
      };
}
// function to get the raw data
const getRawData = (toScrapeUrl) => {
  return fetch(toScrapeUrl)
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};
//function to find attributes:
function checkProperties(item, attr, attr2) {
  const val = item.attribs[attr] || item.attribs[attr2] || null;
  const content = item.attribs.content;
  if (val !== null) {
    if (val === "og:image") {
      viewObj.image = content;
      return;
    }
    if (val === "og:image:alt") {
      viewObj.imageAlt = content;
      return;
    }
    if (val === "twitter:image") {
      viewObj.twitter.image = content;
      return;
    }
    if (val === "twitter:image:alt") {
      viewObj.twitter.imageAlt = content;
      return;
    }
    if (val === "og:title") {
      viewObj.title = content;
      return;
    }
    if (val === "twitter:title") {
      viewObj.twitter.title = content;
      return;
    }
    if (val === "og:description") {
      viewObj.description = content;
      return;
    }
    if (val === "twitter:description") {
      viewObj.twitter.description = content;
      return;
    }
    if (val === "og:url") {
      viewObj.url = content;
      return;
    }
    if (val === "twitter:card") {
      viewObj.twitter.card = content;
      return;
    }
  }
}
//callback
function getProperties(arr) {
  return new Promise((resolve) => {
    for (let i = 0; i < arr.length; i++) {
      checkProperties(arr[i], "property", "name");
    }
    resolve();
  });
}
function checkIfEmpty() {
    return Object.values(viewObj).every(x => x === null || x === '') || Object.values(viewObj.twitter).every(x => x === null || x === '');
}
// start of the program
const getData = async (aUrl, res) => {
  await getRawData(aUrl)
    .then(async (response) => {
      var rawData = response;
      const parsedRawData = cheerio.load(rawData);
      const metaTags = parsedRawData("meta");
      try {
        await getProperties(metaTags)
          .then(() => {
            console.log(viewObj);
            if (checkIfEmpty() === false) {
              let obj = {...viewObj};
              resetViewObj();
              res.status(200);
              res.end(JSON.stringify(obj));
            } else {
              res.status(204);
              res.end(JSON.stringify({}));
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(500);
            res.end(`Internal Server Error: ${error}`);
          });
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
