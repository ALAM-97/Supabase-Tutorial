import { useEffect, useState } from "react";
import SmoothieCard from "../components/smoothie-card";
import supabase from "../config/supabase-client";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  const fetchSmoothies = async () => {
    const { data, error } = await supabase.from("smoothies").select();

    if (error) {
      setFetchError("Could not fetch the smoothies");
      setSmoothies(null);
      console.log(error);
    }
    if (data) {
      setSmoothies(data);
      setFetchError(null);
    }
  };

  useEffect(() => {
    fetchSmoothies();
  }, []);

  const handleDelete = (id) => {
    setSmoothies((prevSmoothies) => {
      return prevSmoothies.filter((sm) => sm.id !== id);
    });
  };

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
          {/* order-by buttons */}
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                jey={smoothie.id}
                smoothie={smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
