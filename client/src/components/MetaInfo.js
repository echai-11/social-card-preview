import "../styles/metainfo.scss";

export default function MetaInfo({ data }) {
  let parsedData = Object.keys(data).map((val) => data[val]);
  return (
    <div className="metaInfo">
      <table>
        <caption className="type">Meta Info</caption>
        <thead>
          <tr>
            <th><span>Tag Name</span></th>
            <th><span>Content</span></th>
          </tr>
        </thead>
        <tbody>
          {parsedData.map((val,i) => {
            return (
              <tr key={`item_${i}`}>
                <td><span>{val.name}</span></td>
                <td><span>{val.content}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
