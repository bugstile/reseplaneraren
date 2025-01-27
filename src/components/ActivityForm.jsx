import React, { useState, useEffect } from "react";
import Input from './Input';
import ActivityList from "./ActivityList.jsx";

const ActivityForm = React.memo(() => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");
  const [editingActivityId, setEditingActivityId] = useState(null);

  // Load activities from local storage on component mount
  useEffect(() => {
    const loadedActivities = JSON.parse(localStorage.getItem("activities")) || [];
    console.log("Loaded activities:", loadedActivities);
    setActivities(loadedActivities);
  }, []);

  // Save activities to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
    console.log("Saved activities to local storage:", activities);
  }, [activities]);

  const handleAddActivity = () => {
    console.log("Adding activity...");
    if (name && location && date) {
      if (editingActivityId) {
        setActivities(activities.map(activity => 
          activity.id === editingActivityId 
            ? { ...activity, name, location, date } 
            : activity
        ));
        setEditingActivityId(null);
      } else {
        const newActivity = { id: Date.now(), name, location, date };
        setActivities([...activities, newActivity]);
      }
      setName("");
      setLocation("");
      setDate("");
      setError("");
    } else {
      setError("Var vänlig fyll in alla fält.");
    }
  };

  const handleRemoveActivity = (id) => {
    const newActivities = activities.filter(activity => activity.id !== id);
    setActivities(newActivities);
  };

  const handleEditActivity = (activity) => {
    setName(activity.name);
    setLocation(activity.location);
    setDate(activity.date);
    setEditingActivityId(activity.id);
  };

  return (
    <>
      <section className="activity-form">
        <Input label="Namn" value={name} onChange={setName} type="text" />
        <Input label="Plats" value={location} onChange={setLocation} type="text" />
        <Input label="Datum" value={date} onChange={setDate} type="date" />
        {error && <p className="error">{error}</p>}
        <button className="button button-update" onClick={handleAddActivity}>
          {editingActivityId ? "Uppdatera aktivitet" : "Lägg till aktivitet"}
        </button>
      </section>

      <section className="test">
        <h2 className="activities">Activities</h2>
        <ActivityList 
          activities={activities} 
          onRemoveActivity={handleRemoveActivity} 
          onEditActivity={handleEditActivity}
        />
      </section>
    </>
  );
});

export default ActivityForm;