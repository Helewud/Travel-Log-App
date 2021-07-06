import React from "react";

const starRating = () => {
  return (
    <div className="rating">
      <input id="5" type="radio" name="rating" value="5" />
      <label enabled htmlFor="5">
        5
      </label>

      <input id="4" type="radio" name="rating" value="4" />
      <label enabled htmlFor="4">
        4
      </label>

      <input id="3" type="radio" name="rating" value="3" />
      <label enabled htmlFor="3">
        3
      </label>

      <input id="2" type="radio" name="rating" value="2" />
      <label enabled htmlFor="2">
        2
      </label>

      <input id="1" type="radio" name="rating" value="1" />
      <label enabled htmlFor="1">
        1
      </label>
    </div>
  );
};

export default starRating;
