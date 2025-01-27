// ActivityItem.jsx
import React from 'react';

function ActivityItem({ activity, onEdit, onRemove }) {
  return (
    <li>
      {activity.name} - {activity.location} - {activity.date}
      
      <button 
        onClick={() => onEdit(activity)} // Call onEdit function with the current activity as an argument
        className="button edit-button"
      >
        Redigera
      </button>
      
      <button 
        onClick={() => onRemove(activity.id)} // Call onRemove function with the activity's ID
        className="button remove-button"
      >
        Ta bort
      </button>
    </li>
  );
}

export default ActivityItem;