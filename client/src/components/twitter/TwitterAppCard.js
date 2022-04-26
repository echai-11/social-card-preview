/* Twitter App Card
====================================================================
Description:
A description of the content in a maximum of 200 characters

Player(twitter:player):
HTTPS URL to iFrame player. This must be a HTTPS URL which does not 
generate active mixed content warnings in a web browser. The audio or
 video player must not require plugins such as Adobe Flash.

Image:
Image to be displayed in place of the player on platforms that don’t 
support iFrames or inline players. You should make this image the same 
dimensions as your player. Images with fewer than 68,600 pixels
 (a 262x262 square image, or a 350x196 16:9 image) will cause the 
 player card not to render. Images must be less than 5MB in size. 
 JPG, PNG, WEBP and GIF formats are supported. Only the first frame 
 of an animated GIF will be used. SVG is not supported.
*/
export default function TwitterAppCard({ data, url,decodeHtml }) {
  return (
    <>
      <div
        className="social-card__image"
        style={{
          backgroundImage: data?.twitterImage?.content
            ? `url(${data.twitterImage.content})`
            : data?.image?.content
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
                : "https://via.placeholder.com/150"
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
