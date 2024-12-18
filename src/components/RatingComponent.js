import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRatings } from '../graphql/queries';
import { createRating } from '../graphql/mutations';

function RatingComponent({ recipeId }) {
  const [ratings, setRatings] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchRatings();
  }, [recipeId]);

  const fetchRatings = async () => {
    try {
      const ratingData = await API.graphql(
        graphqlOperation(listRatings, { filter: { recipeID: { eq: recipeId } } })
      );
      setRatings(ratingData.data.listRatings.items);
    } catch (err) {
      console.error('Error fetching ratings:', err);
    }
  };

  const handleRating = async (e) => {
    e.preventDefault();
    const newRating = {
      score,
      recipeID: recipeId,
      user: 'currentUser', // Replace with actual user identifier
    };
    try {
      await API.graphql(graphqlOperation(createRating, { input: newRating }));
      setScore(0);
      fetchRatings();
    } catch (err) {
      console.error('Error creating rating:', err);
    }
  };

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((acc, curr) => acc + curr.score, 0) / ratings.length
      : 'No ratings yet';

  return (
    <div className="rating-component">
      <h4>Average Rating: {averageRating}</h4>
      <form onSubmit={handleRating}>
        <label>Rate this recipe:</label>
        <select value={score} onChange={(e) => setScore(parseInt(e.target.value))} required>
          <option value="" disabled>Select</option>
          {[1,2,3,4,5].map(num => (
            <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
          ))}
        </select>
        <button type="submit">Submit Rating</button>
      </form>
    </div>
  );
}

export default RatingComponent;