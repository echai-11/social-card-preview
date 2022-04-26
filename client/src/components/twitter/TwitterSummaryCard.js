
/* Summary Card and Summary Card with Large Image
====================================================================
Title:
A concise title for the related content.

Platform specific behaviors:
 - iOS, Android: Truncated to two lines in timeline and expanded Tweet
 - Web: Truncated to one line in timeline and expanded Tweet

====================================================================
Description:
A description that concisely summarizes the content as 
appropriate for presentation within a Tweet. 
You should not re-use the title as the description 
or use this field to describe the general services 
provided by the website. 

Platform specific behaviors:
 - iOS, Android: Not displayed
 - Web: Truncated to three lines in timeline and expanded Tweet

====================================================================
Image:
A URL to a unique image representing the content of the page. 
You should not use a generic image such as your website logo, 
author photo, or other image that spans multiple pages. Images 
for this Card support an aspect ratio of 1:1 with minimum dimensions 
of 144x144 or maximum of 4096x4096 pixels. 
Images must be less than 5MB in size. The image will be cropped 
to a square on all platforms. JPG, PNG, WEBP and GIF formats are supported.
Only the first frame of an animated GIF will be used. SVG is not supported.

===========================================================================
Image Alt:
A text description of the image conveying 
the essential nature of an image to users who are
visually impaired. Maximum 420 characters.

*/

export default function TwitterSummaryCard({ data, url,decodeHtml }) {
  return (
    <>
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
