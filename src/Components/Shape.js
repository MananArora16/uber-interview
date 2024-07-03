import React, { useMemo, useState } from "react";
import "./Shape.css";

const Shape = ({ parsedData }) => {
  const [selected, setSelected] = useState(new Set());
  const handleClick = (event) => {
    const { target } = event;

    const index = target.getAttribute("data-index");
    const Status = target.getAttribute("data-Status");

    if (index == null || Status === "hidden") {
      return;
    }

    setSelected((prev) => {
      return new Set(prev.add(index.toString()));
    });
  };
  const oneDimArray = useMemo(() => parsedData.flat(Infinity), [parsedData]);

  return (
    <>
      <div className="boxes" onClick={handleClick}>
        {oneDimArray.map((box, index) => {
          // eslint-disable-next-line eqeqeq
          const status = box == 1 ? "visible" : "hidden";
          const isSelected = selected.has(index.toString());
          return (
            <div
              key={`${box}-${index}`}
              className={`box ${status} ${isSelected && `selected`} `}
              data-index={index}
              data-status={status}
            />
          );
        })}
      </div>
    </>
  );
};

export default Shape;
