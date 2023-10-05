import React from "react";

const CheckBoxItems = ({
  id,
  isChecked,
  label,
  onClick,
  borderClass,
  onChange,
}) => {
  return (
    <div className={`form-check ${borderClass}`}>
      <input
        type="checkbox"
        className="form-check-input"
        id={id}
        checked={isChecked}
        onChange={onChange}
      />
      <label
        className="form-check-label tree-text clickable"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        {label}
      </label>
    </div>
  );
}

export default CheckBoxItems;
