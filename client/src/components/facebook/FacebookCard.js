import { useState, useEffect, useRef } from "react";
import { getUrl, validateFB, decodeHtml } from "../../utils/cleanData";
import FacebookArticleText from "./FacebookArticleText";
import FacebookWebsiteText from "./FacebookWebsiteText";

export default function FacebookCard({ data }) {
  const [showFBCard, setShowFBCard] = useState(true);
  const [cardSize, setCardSize] = useState("article");

  const imgElement = useRef(null);

  useEffect(() => {
    if (validateFB(data) === false) {
      setShowFBCard(false);
    }
  }, [data]);

  return (
    <div className="facebook">
      <p className="social-card__type" data-testid="facebook-card">
        Facebook
      </p>
      {showFBCard ? (
        <div className={`social-card__card ${cardSize}`}>
          <div
            className="social-card__image"
            style={
              data?.image?.content
                ? {
                    backgroundImage: `url(${data.image.content})`,
                    backgroundSize: "cover",
                    backgroundColor: "#f1f3f5",
                    backgroundPosition: "50% 50%",
                  }
                : {
                    backgroundSize: "cover",
                    backgroundColor: "#f1f3f5",
                    height: 0,
                  }
            }
            data-testid="facebook-card-image"
          >
            {data?.image?.content && (
              <img
                src={data?.image?.content}
                alt={data?.imageAlt ? data.imageAlt : ""}
                style={{ height: 0, width: 0 }}
                ref={imgElement}
                onLoad={() => {
                  if (imgElement.current.naturalWidth < 500) {
                    setCardSize("website");
                  } else {
                    if (cardSize !== "article") {
                      setCardSize("article");
                    }
                  }
                }}
              />
            )}
          </div>
          <div className="social-card__text-container">
            <div className="social-card__text-container-inner">
              <div className="social-card__url">
                <p data-testid="facebook-card-url">
                  {data?.url?.content
                    ? getUrl(data.url.content)
                    : data?.searchedUrl
                    ? getUrl(data.searchedUrl)
                    : ""}
                </p>
              </div>

              {cardSize === "article" && (
                <FacebookArticleText
                  title={
                    data?.title?.content
                      ? decodeHtml(data.title.content)
                      : data?.pageTitle
                      ? decodeHtml(data.pageTitle)
                      : ""
                  }
                  desc={
                    data?.description?.content
                      ? decodeHtml(data.description.content)
                      : ""
                  }
                />
              )}
              {cardSize === "website" && (
                <FacebookWebsiteText
                  title={
                    data?.title?.content
                      ? decodeHtml(data.title.content)
                      : data?.pageTitle
                      ? decodeHtml(data.pageTitle)
                      : ""
                  }
                  desc={
                    data?.description?.content
                      ? decodeHtml(data.description.content)
                      : ""
                  }
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>No meta tags found</div>
      )}
    </div>
  );
}
