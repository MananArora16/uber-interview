import React, { useEffect, useMemo, useState } from "react";
import "./Shape.css";

const Shape = ({ parsedData }) => {
  const [selected, setSelected] = useState(new Set());

  const [unloading, setUnloading] = useState(false);

  const handleClick = (event) => {
    const { target } = event;

    const index = target.getAttribute("data-index");
    const Status = target.getAttribute("data-Status");

    if (
      index == null ||
      Status === "hidden" ||
      selected.has(index) ||
      unloading
    ) {
      return;
    }

    setSelected((prev) => {
      return new Set(prev.add(index.toString()));
    });
  };

  const oneDimArray = useMemo(() => parsedData.flat(Infinity), [parsedData]);
  const countOfVisibleBoxes = useMemo(() => {
    return oneDimArray.reduce((acc, box) => {
      if (box == "1") {
        acc += 1;
      }
      return acc;
    }, 0);
  }, [oneDimArray]);

  const unload = () => {
    const keys = Array.from(selected.keys());
    const removeNextKey = () => {
      if (keys.length) {
        const currentKey = keys.shift();
        setSelected((prev) => {
          const updatedKeys = new Set(prev);
          updatedKeys.delete(currentKey);
          return updatedKeys;
        });
        setTimeout(removeNextKey, 500);
        setUnloading(true);
      } else {
        setUnloading(false);
      }
    };
    setTimeout(removeNextKey, 100);
  };

  useEffect(() => {
    // selected.size >= countOfVisbileBoxes
    if (selected.size >= countOfVisibleBoxes) {
      //unloading

      unload();

      setUnloading(false);
    }
  }, [selected]);

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
