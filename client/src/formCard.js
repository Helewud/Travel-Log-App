import React, { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { createLogEntry } from "./api";

const LogForm = ({ location, onClose }) => {
  //   let [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, control } = useForm();

  const { isSubmitted, isSubmitSuccessful } = useFormState({
    control,
  });
  const onSubmit = async (data) => {
    try {
      const form = new FormData();
      form.append("latitude", location.latitude);
      form.append("longitude", location.longitude);

      for (const key in data) {
        form.append(key, data[key]);
      }
      form.set("image", data.image[0]);
      setTimeout(() => {
        createLogEntry(form);
        onClose();
      }, 10000);
    } catch (error) {
      setError(error.message);
    }
  };

  const currentDate = new Date(Date.now()).toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      {/* {error ? <small>{error}</small> : null} */}
      <input
        className="display-form start"
        {...register("title", { required: true })}
        type="text"
        placeholder="Title"
      />
      <textarea
        className="display-form"
        type="text"
        {...register("description")}
        placeholder="Description"
        rows={3}
      />
      <textarea
        className="display-form"
        {...register("comment")}
        placeholder="Comment"
        rows={3}
      />
      <input
        className="display-form"
        type="file"
        accept="image/*"
        {...register("image", { required: true })}
      ></input>
      <select
        className="display-form"
        placeholder="Rate your experience"
        {...register("rating", { required: true })}
        id="rate"
      >
        <option value="">--rate your experience--</option>
        <option value="1">😡 Poor</option>
        <option value="2">😏 Average</option>
        <option value="3">🙂 Good</option>
        <option value="4">😊 Great</option>
        <option value="5">😁 Excellent</option>
      </select>
      <input
        className="display-form"
        type="Date"
        max={currentDate}
        value={currentDate}
        {...register("visitDate", { required: true })}
      />
      {isSubmitted && isSubmitSuccessful ? (
        <div className="lds-dual-ring"></div>
      ) : (
        <input className="display-form" type="submit"></input>
      )}
    </form>
  );
};

export default LogForm;
