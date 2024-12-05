import React from "react";

const Filter = ({ filters, onChange }) => {
  return (
    <div className="filter">
      <h3>Filters</h3>
      <label style={{ fontWeight: "bold" }}>Price</label>
      <label>
        <input
          type="checkbox"
          name="price"
          value="low-to-high"
          checked={filters.price === "low-to-high"}
          onChange={onChange}
        />{" "}
        Low to High
      </label>
      <label>
        <input
          type="checkbox"
          name="price"
          value="high-to-low"
          checked={filters.price === "high-to-low"}
          onChange={onChange}
        />{" "}
        High to Low
      </label>

      <label style={{ fontWeight: "bold" }}>Gender</label>
      <label>
        <input
          type="checkbox"
          name="gender"
          value="men"
          checked={filters.gender === "men"}
          onChange={onChange}
        />{" "}
        Men
      </label>
      <label>
        <input
          type="checkbox"
          name="gender"
          value="women"
          checked={filters.gender === "women"}
          onChange={onChange}
        />{" "}
        Women
      </label>
      <label style={{ fontWeight: "bold" }}>Color</label>
      <div>
        <label>
          <input
            type="radio"
            name="color"
            value="red"
            checked={filters.color === "red"}
            onChange={onChange}
          />{" "}
          Red
        </label>
        <label>
          <input
            type="radio"
            name="color"
            value="blue"
            checked={filters.color === "blue"}
            onChange={onChange}
          />{" "}
          Blue
        </label>
        <label>
          <input
            type="radio"
            name="color"
            value="green"
            checked={filters.color === "green"}
            onChange={onChange}
          />{" "}
          Green
        </label>
        <label>
          <input
            type="radio"
            name="color"
            value="black"
            checked={filters.color === "black"}
            onChange={onChange}
          />{" "}
          Black
        </label>
        <label>
          <input
            type="radio"
            name="color"
            value="white"
            checked={filters.color === "white"}
            onChange={onChange}
          />{" "}
          White
        </label>
      </div>
    </div>
  );
};

export default Filter;
