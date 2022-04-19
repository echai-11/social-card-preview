import { getMissingProperties } from "../utils/cleanData";
import "../styles/metainfo.scss";

export default function MetaInfo({ data }) {
  let parsedData = Object.keys(data)
    .map((val) => data[val])
    .filter((item) => typeof item === "object");
  let errors = getMissingProperties(data);
  return (
    <div className="metaInfo">
      {parsedData.length === 0 ? (
        <div className="metaInfo_no-data">
          <p className="type">Meta Info</p>
          <div>
            <span>No metadata found</span>
          </div>
        </div>
      ) : (
        <table>
          <caption className="type" data-testid="meta-info-title">Meta Info</caption>
          <thead>
            <tr>
              <th>
                <span>Tag Name</span>
              </th>
              <th>
                <span>Content</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {parsedData.map((val, i) => {
              return (
                <tr key={`item_${i}`}>
                  <td>
                    <span>{val.name}</span>
                  </td>
                  <td>
                    <span>{val.content}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {Object.keys(errors).length > 0 && (
            <tfoot>
              <tr>
                <td>
                  <span>Missing values:</span>
                </td>
                <td>
                  {Object.keys(errors).map((val, i) => {
                    return (
                      <span key={`missing_${i}`}>{`og:${val}${
                        i !== Object.keys(errors).length - 1 ? ", " : "."
                      }`}</span>
                    );
                  })}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      )}
    </div>
  );
}
