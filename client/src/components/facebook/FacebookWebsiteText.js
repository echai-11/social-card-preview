export default function FacebookWebsiteText({ title, desc }) {
  return (
    <div className="social-card__website-text">
      <div className="social-card__title">
        <p data-testid="facebook-card-title">{title}</p>
      </div>

      <div className="social-card__description">
        <p data-testid="facebook-card-description">{desc}</p>
      </div>
    </div>
  );
}
