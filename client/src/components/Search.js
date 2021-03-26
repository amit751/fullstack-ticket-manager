export default function Search({ onChange }) {
  return (
    <div className="Search">
      <input
        placeholder="filter"
        id="searchInput"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        type="text"
      ></input>
    </div>
  );
}
