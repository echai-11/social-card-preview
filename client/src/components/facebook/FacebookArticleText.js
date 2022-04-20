export default function FacebookArticleText({ title, desc }) {
  return (
    <>
      <div className="social-card__title">
        <p data-testid="facebook-card-title">{title}</p>
      </div>
      {title.length < 63 && (
        <div className="social-card__description">
          <p data-testid="facebook-card-description">{desc}</p>
        </div>
      )}
    </>
  );
}
