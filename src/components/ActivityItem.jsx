// ActivityItem.jsx
import React from 'react';

function ActivityItem({ activity, onEdit, onRemove }) {
  return (
    <li>
      {activity.name} - {activity.location} - {activity.date}
      <button 
        onClick={() => onEdit(activity)} 
        className="button edit-button"
      >
        Redigera
      </button>
      <button 
        onClick={() => onRemove(activity.id)} 
        className="button remove-button"
      >
        Ta bort
      </button>
    </li>
  );
}

export default ActivityItem;