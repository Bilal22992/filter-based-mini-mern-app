import { useEffect, useState } from "react";

function App() {
  const [data, setdata] = useState([]);
  // 1. Create a state to store the selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((response) => setdata(response));
  }, []); // Added empty array so it only fetches once

  // 2. Filter the data based on the selectedCategory
  const filteredData = data.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory; 
  });

  return (
    <div>
      {/* 3. Clickable buttons/divs to set the category */}
      <div style={{ display: "flex", gap: "10px", cursor: "pointer" }}>
        <b onClick={() => setSelectedCategory("All")}>All</b>
        <b onClick={() => setSelectedCategory("Interior")}>Samsung</b>
        <b onClick={() => setSelectedCategory("Tech")}>Apple</b>
      </div>

      <hr />

      {/* 4. Map over the FILTERED data instead of the original data */}
      <div>
        {filteredData.map((item, index) => (
          <div key={index}>
            <p>{item.name} - {item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;