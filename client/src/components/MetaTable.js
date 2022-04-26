import { useState, useEffect } from "react";
import { getMissingProperties } from "../utils/cleanData";
import "../styles/metatable.scss";

export default function MetaTable({ data }) {
  const [showTable, setShowTable] = useState(true);
  const [parsedData] = useState(
    Object.keys(data)
      .map((val) => data[val])
      .filter((item) => typeof item === "object")
  );

  useEffect(() => {
    if (parsedData.length === 0) {
      setShowTable(false);
    } else {
      setShowTable(true);
    }
  }, [parsedData]);

  let errors = getMissingProperties(data);

  return (
    <div className="metaInfo">
      {!showTable && (
        <div>
          <div className="no-data">
            <span>No meta tags found</span>
          </div>
        </div>
      )}
      {showTable && (
        <div>
          <table>
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
                    <span className="err">Missing values:</span>
                  </td>
                  <td>
                    {Object.keys(errors).map((val, i) => {
                      return (
                        <span key={`missing_${i}`} className="err">{`og:${val}${
                          i !== Object.keys(errors).length - 1 ? ", " : "."
                        }`}</span>
                      );
                    })}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}
    </div>
  );
}
