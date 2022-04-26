import SocialCard from "./SocialCard";
import MetaTable from "./MetaTable";
import { FACEBOOK, TWITTER } from "../config/constants";
import "../styles/preview.scss";

export default function Preview({ data }) {
  return (
    <div className="preview" data-testid="preview">
      <table>
        <tbody>
          <tr>
            <td>
              <p className="preview__type" data-testid="meta-info-title">
                Meta Tags
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <MetaTable data={data} />
            </td>
          </tr>
          <tr>
            <td>
              <p className="preview__type" data-testid="facebook-card">
                Facebook
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <SocialCard cardType={FACEBOOK} data={data} />
            </td>
          </tr>
          <tr>
            <td>
              <p className="preview__type" data-testid="twitter-card">
                Twitter
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <SocialCard cardType={TWITTER} data={data} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
