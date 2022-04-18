import { getMissingProperties } from "../utils/cleanData";
import "../styles/metainfo.scss";

export default function MetaInfo({ data }) {
  let parsedData = Object.keys(data).map((val) => data[val]);
  let errors = getMissingProperties(data);
  return (
    <div className="metaInfo">
      <table>
        <caption className="type">Meta Info</caption>
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
      </table>
      {Object.keys(errors).length > 0 && (
        <div className="meta-missing">
          <span>Missing values: </span>
          {Object.keys(errors).map((val,i) => {
            return <span key={`missing_${i}`}>{`og:${val}${i !== Object.keys(errors).length - 1 ? ", " : "."}`}</span>;
          })}
        </div>
      )}
    </div>
  );
}
