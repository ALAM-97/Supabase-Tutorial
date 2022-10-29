import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabase-client";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [smoothieForm, setSmoothieForm] = useState({});
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setSmoothieForm({
          title: data.title,
          method: data.method,
          rating: data.rating,
        });
        console.log(data);
      }
    };

    fetchSmoothie();
  }, [id, navigate]);

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
      .update({
        title: smoothieForm.title,
        method: smoothieForm.method,
        rating: smoothieForm.rating,
      })
      .eq("id", id)
      .select();

    if (error) {
      setFormError("Please fill in all the fields correctly");
    }
    if (data) {
      setFormError(null);
      navigate("/");
    }
  };

  return (
    <div className="page update">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={smoothieForm.title || ""}
          onChange={(e) => updateForm(e)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          name="method"
          value={smoothieForm.method || ""}
          onChange={(e) => updateForm(e)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={smoothieForm.rating || ""}
          onChange={(e) => updateForm(e)}
        />

        <button>Update Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
