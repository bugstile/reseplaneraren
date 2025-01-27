import { useState } from "react";
import InputDate from "./InputDate.jsx";
import InputText from "./InputText.jsx";

function ActivityForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [activities, setActivities] = useState([]);

  const handleAddActivity = () => {
    if (name && location && date) {
      const newActivity = { name, location, date };
      setActivities([...activities, newActivity]);
      // Clear the input fields
      setName("");
      setLocation("");
      setDate("");
    } else {
      alert("Var vänlig fyll in alla fält."); // Simple validation
    }
  };

  const handleRemoveActivity = (index) => {
    const newActivities = activities.filter((_, i) => i !== index);
    setActivities(newActivities);
  };

  return (
    <section className="activity-form">
      <InputText label="Namn" value={name} onChange={setName} />
      <InputText label="Plats" value={location} onChange={setLocation} />
      <InputDate label="Datum" value={date} onChange={setDate} />
      <button className="button" onClick={handleAddActivity}>
        Lägg till aktivitet
      </button>

      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            {activity.name} - {activity.location} - {activity.date}
            <button 
              onClick={() => handleRemoveActivity(index)} 
              className="remove-button"
            >
              Ta bort
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ActivityForm;