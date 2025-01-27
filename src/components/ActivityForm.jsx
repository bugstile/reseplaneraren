import React, { useState, useEffect } from "react";
import Input from './Input';
import ActivityList from "./ActivityList.jsx";

// Functional component for the Activity Form
const ActivityForm = () => {
  const [state, setState] = useState({
    name: "", // Activity name
    location: "", // Activity location
    date: "", // Activity date
    activities: [], // List of all activities
    error: "", // Error message for form validation
    editingActivityId: null // ID of the activity being edited
  });

  // Load activities from local storage when the component mounts
  useEffect(() => {
    const loadedActivities = JSON.parse(localStorage.getItem("activities")) || [];
    console.log("Loaded activities:", loadedActivities);
    setState(prevState => ({ ...prevState, activities: loadedActivities }));
  }, []);

  // Save activities to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
    console.log("Saved activities to local storage:", state.activities);
  }, [state.activities]);

  // Function to handle adding or updating an activity
  const handleAddActivity = () => {
    console.log("Adding activity...");
    const { name, location, date, editingActivityId } = state; 

    // Check if all fields are filled
    if (name && location && date) {
      if (editingActivityId) {
        setState(prevState => ({
          ...prevState,
          activities: prevState.activities.map(activity =>
            activity.id === editingActivityId
              ? { ...activity, name, location, date } 
              : activity 
          ),
          editingActivityId: null // Reset editing state
        }));
      } else {
        // Create a new activity
        const newActivity = { id: Date.now(), name, location, date };
        setState(prevState => ({
          ...prevState,
          activities: [...prevState.activities, newActivity]
        }));
      }
      // Reset form
      setState(prevState => ({ ...prevState, name: "", location: "", date: "", error: "" }));
    } else {
      // Show error if any field is empty
      setState(prevState => ({ ...prevState, error: "Var vänlig fyll in alla fält." }));
    }
  };

  // Function to handle removing an activity
  const handleRemoveActivity = (id) => {
    setState(prevState => ({
      ...prevState,
      activities: prevState.activities.filter(activity => activity.id !== id)
    }));
  };

  // Function to handle editing an activity
  const handleEditActivity = (activity) => {
    setState(prevState => ({
      ...prevState,
      name: activity.name,
      location: activity.location,
      date: activity.date,
      editingActivityId: activity.id
    }));
  };

  //Render HTML
  return (
    <>
      <section className="activity-form">
        <Input label="Namn" value={state.name} onChange={(value) => setState(prev => ({ ...prev, name: value }))} type="text" />
        <Input label="Plats" value={state.location} onChange={(value) => setState(prev => ({ ...prev, location: value }))} type="text" />
        <Input label="Datum" value={state.date} onChange={(value) => setState(prev => ({ ...prev, date: value }))} type="date" />
        {state.error && <p className="error">{state.error}</p>}
        <button className="button button-update" onClick={handleAddActivity}>
          {state.editingActivityId ? "Uppdatera aktivitet" : "Lägg till aktivitet"}
        </button>
      </section>

      <section className="test">
        <h2 className="activities">Activities</h2>
        <ActivityList 
          activities={state.activities} 
          onRemoveActivity={handleRemoveActivity} 
          onEditActivity={handleEditActivity}
        />
      </section>
    </>
  );
};

export default ActivityForm;