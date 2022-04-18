import { useState, useEffect, useRef } from "react";
import { getUrl, validateFB } from "../../utils/cleanData";
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
      <p className="social-card__type">Facebook</p>
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
                  }
                : { backgroundSize: "cover", backgroundColor: "#f1f3f5" }
            }
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
                <p>{data?.url?.content ? getUrl(data.url.content) : ""}</p>
              </div>

              <div className="social-card__title">
                <p>{data?.title?.content ? data.title.content : ""}</p>
              </div>
              {cardSize === "article" &&
                data.title &&
                data.title.content &&
                data.title.content.length < 63 && (
                  <div className="social-card__description">
                    <p>
                      {data?.description?.content
                        ? data.description.content
                        : ""}
                    </p>
                  </div>
                )}
              {cardSize === "website" && (
                <div className="social-card__description">
                  <p>
                    {data?.description?.content ? data.description.content : ""}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>No Metadata Found</div>
      )}
    </div>
  );
}
