export default function TwitterPlayerCard({ data, url,decodeHtml }) {
  return (
    <>
      <div className="social-card__image-container">
        <div
          className="social-card__image"
          style={{
            backgroundImage: data?.twitterImage?.content
              ? `url(${data.twitterImage.content})`
              : data.image && data.image.content
              ? `url(${data.image.content})`
              : `url(${"https://via.placeholder.com/150"})`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            backgroundColor: "#e0e7ed",
          }}
        >
          {((data.twitterImage && data.twitterImage.content) ||
            (data.image && data.image.content)) && (
            <img
              style={{
                height: 0,
                width: 0,
              }}
              src={
                data?.twitterImage?.content
                  ? data.twitterImage.content
                  : data?.image?.content
                  ? data.image.content
                  : ""
              }
              alt={
                data?.twitterImageAlt?.content
                  ? data.twitterImageAlt.content
                  : data?.imageAlt?.content
                  ? data.imageAlt.content
                  : ""
              }
            />
          )}
        </div>
        <div className="social-card__player-button"></div>
      </div>
      <div className="social-card__text-container">
        <div className="social-card__text-container-inner">
          <div className="social-card__title">
            <h2>
              {data?.twitterTitle?.content
                ? decodeHtml(data.twitterTitle.content)
                : data?.title?.content
                ? decodeHtml(data.title.content)
                : ""}
            </h2>
          </div>
          <div className="social-card__description">
            <p>
              {data?.twitterDescription?.content
                ? decodeHtml(data.twitterDescription.content)
                : data?.description?.content
                ? decodeHtml(data.description.content)
                : ""}
            </p>
          </div>
          <div className="social-card__url">
            <span>{url}</span>
          </div>
        </div>
      </div>
    </>
  );
}
