import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  const handleChange = (e) => {
    const selectedValue = e.target.value;

    searchParams.set("sortBy", selectedValue);

    setSearchParams(searchParams);
  };

  return (
    <Select
      type="white" // or any other type if needed
      options={options}
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
