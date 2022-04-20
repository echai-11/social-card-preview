import { useState, useEffect } from "react";
import {
  getUrl,
  validateTwitter,
  cleanTwitterCardType,
} from "../../utils/cleanData";
import TwitterSummaryCard from "./TwitterSummaryCard";
import TwitterAppCard from "./TwitterAppCard";
import TwitterPlayerCard from "./TwitterPlayerCard";
export default function TwitterCard({ data }) {
  const [showTwitterCard, setShowTwitterCard] = useState(true);
  const [twitterCardType, setTwitterCardType] = useState("summary");

  useEffect(() => {
    if (validateTwitter(data) === false) {
      setShowTwitterCard(false);
    }
    setTwitterCardType(cleanTwitterCardType(data));
  }, [data]);

  return (
    <div className="twitter">
      <p className="social-card__type" data-testid='twitter-card'>Twitter</p>
      {showTwitterCard ? (
        <div className={`social-card__card ${twitterCardType}`}>
          {twitterCardType.includes("summary") && (
            <TwitterSummaryCard
              data={data}
              url={data?.url?.content ? getUrl(data.url.content) : ""}
            />
          )}
          {twitterCardType === "app" && (
            <TwitterAppCard
              data={data}
              url={data?.url?.content ? getUrl(data.url.content) : ""}
            />
          )}

          {twitterCardType === "player" && (
            <TwitterPlayerCard
              data={data}
              url={data?.url?.content ? getUrl(data.url.content) : ""}
            />
          )}
        </div>
      ) : (
        <div>No metadata found</div>
      )}
    </div>
  );
}
