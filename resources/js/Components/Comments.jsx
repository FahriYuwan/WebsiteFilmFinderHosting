import React, { useState } from 'react';
import { usePage, useForm } from '@inertiajs/react';

const Comments = ({ film }) => {
  const { auth } = usePage().props;
  const user = auth.user;
  const [filter, setFilter] = useState(0);

  const { data, setData, post, processing, errors, reset} = useForm({
    film_id: film.film_id,
    rating_user: '',
    review_text: '',
  });

  const handleFilterChange = (event) => {
    setFilter(parseInt(event.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('reviews.store'), {
      onSuccess: () => reset('rating_user', 'review_text') // Reset fields after successful submission
    });
  };

  const filteredReviews = filter === 0 ? film.reviews : film.reviews.filter(review => review.rating_user === filter);

  return (
    <div className="p-6 m-8">
      {/* Daftar Aktor */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 mb-10">
        {film.actors.map((actor, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-40 h-40 bg-gray-200 rounded overflow-hidden">
              <img
                src={actor.url_actor}
                alt={actor.actor_name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm text-center">{actor.actor_name}</p>
          </div>
        ))}
      </div>

      {/* Video Placeholder */}
      <div className="flex justify-center items-center">
        <iframe
          className="w-full max-w-3xl h-96"
          src={film.url_trailer}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* Komentar */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">({filteredReviews.length}) People think about this Film</h3>
        <div className="flex justify-end mb-2">
          <label htmlFor="filter" className="mr-2 text-sm">Filtered by:</label>
          <select id="filter" className="border rounded px-2 py-1 text-sm bg-gray-700" onChange={handleFilterChange}>
            <option value="0">All</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="1">★☆☆☆☆</option>
          </select>
        </div>

        {filteredReviews.map((review, index) => (
          <div key={index} className="flex mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <p>
                <span className="font-semibold">{review.user.name}</span>{" "}
                <span className="text-gray-500">({new Date(review.created_at).toLocaleDateString()})</span>
                <br />
                {review.review_text}
              </p>
              <div className="mt-1">
                Rating : <span className="text-red-500">{review.rating_user}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border rounded">
        <h4 className="text-lg font-semibold mb-4">Add yours!</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="rate" className="block text-sm font-medium mb-2">
              Rate
            </label>
            <select
              id="rate"
              className="w-full px-3 py-2 border rounded bg-gray-700"
              disabled={!user}
              value={data.rating_user}
              onChange={(e) => setData('rating_user', e.target.value)}
            >
              <option value="">Select rating</option>
              <option value="1">★☆☆☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="3">★★★☆☆</option>
              <option value="4">★★★★☆</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
            {errors.rating_user && <div className="text-red-500 text-sm">{errors.rating_user}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="thoughts" className="block text-sm font-medium mb-2">
              Your thoughts
            </label>
            <textarea
              id="thoughts"
              className="w-full px-3 py-2 border rounded bg-gray-700"
              disabled={!user}
              value={data.review_text}
              onChange={(e) => setData('review_text', e.target.value)}
            ></textarea>
            {errors.review_text && <div className="text-red-500 text-sm">{errors.review_text}</div>}
          </div>
          {!user && (
            <div className="mb-4 text-red-500 text-sm">
              You must be logged in to submit a comment.
            </div>
          )}
          <button type="submit" className="px-4 py-2 bg-custom-blue-light text-dark-text rounded" disabled={!user || processing}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;