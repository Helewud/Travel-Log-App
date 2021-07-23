import * as React from "react";

const displayCard = ({ location }) => {
  return (
    <div className="display-card">
      <div className="display-image">
        <img src={location.image} alt="location-header"></img>
      </div>

      <h3>{location.title}</h3>
      <fieldset>
        <legend>Description</legend>
        <small>{location.description}</small>
      </fieldset>
      <fieldset>
        <legend>Comment</legend>
        <small>{location.comment}</small>
      </fieldset>
      <fieldset>
        <legend>Rating</legend>
        <div className="display-rated">
          {[5, 4, 3, 2, 1].map((num) => {
            return (
              <React.Fragment key={num}>
                <input
                  checked={location.rating === num ? true : false}
                  id={num}
                  type="radio"
                  value={num}
                  readOnly
                />
                <label disabled htmlFor={num}></label>
              </React.Fragment>
            );
          })}
        </div>
      </fieldset>
      <fieldset>
        <legend>Visit Date</legend>
        <small>{new Date(location.visitDate).toString().slice(0, 16)}</small>
      </fieldset>
    </div>
  );
};

export default displayCard;
