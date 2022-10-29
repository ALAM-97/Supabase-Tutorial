import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabase-client";

const Create = () => {
  const navigate = useNavigate();

  const [smoothieForm, setSmoothieForm] = useState({});
  const [formError, setFormError] = useState();

  const updateForm = (e) => {
    setSmoothieForm({
      ...smoothieForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!smoothieForm.title || !smoothieForm.method || !smoothieForm.rating) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .insert([
        {
          title: smoothieForm.title,
          method: smoothieForm.method,
          rating: smoothieForm.rating,
        },
      ])
      .select();

    if (error) {
      setFormError("Please fill in all the fields correctly");
    }
    if (data) {
      setFormError("Please fill in all the fields correctly");
      navigate("/");
    }
  };
  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={smoothieForm.title}
          onChange={(e) => updateForm(e)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          name="method"
          value={smoothieForm.method}
          onChange={(e) => updateForm(e)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={smoothieForm.rating}
          onChange={(e) => updateForm(e)}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
