import React from "react";

const logEntryForm = () => {
  return (
    <div>
      <form>
        <input
          className="fm-1"
          type="text"
          name="title"
          placeholder="Title"
        ></input>
        <textarea
          className="fm-1"
          type="text"
          name="description"
          placeholder="Description"
        />
        <textarea className="fm-1" name="comment" placeholder="comment" />
        <input className="fm-1" type="file" name="filename"></input>
        <div className="rating">
          <label for="r5">5</label>
          <input type="radio" name="rating" value="5" />
          <label for="r4">4</label>
          <input type="radio" name="rating" value="4" />
          <label for="r3">3</label>
          <input type="radio" name="rating" value="3" />
          <label for="r2">2</label>
          <input type="radio" name="rating" value="2" />
          <label for="r1">1</label>
          <input type="radio" name="rating" value="1" />
        </div>
        <input className="fm-1" type="submit"></input>
      </form>
    </div>
  );
};

export default logEntryForm;
