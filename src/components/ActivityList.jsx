// ActivityList.jsx
import React from 'react';
import ActivityItem from './ActivityItem'; // Import ActivityItem

function ActivityList({ activities, onRemoveActivity, onEditActivity }) {
  return (
    <ul>
      {activities.map((activity) => (
        <ActivityItem 
          key={activity.id} 
          activity={activity} 
          onEdit={onEditActivity} 
          onRemove={onRemoveActivity} 
        />
      ))}
    </ul>
  );
}

export default ActivityList;