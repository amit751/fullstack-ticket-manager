export default function Search({ onChange }) {
  return (
    <div className="Search">
      <input
        onChange={(e) => {
          onChange(e.target.value);
        }}
        type="text"
        id="searchInput"
      ></input>
    </div>
  );
}
