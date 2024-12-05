import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, usePage, router } from '@inertiajs/react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'; // Import ikon bookmark

function getBannerUrl(urlBanner) {
  if (!urlBanner) {
    // Kembalikan path default atau placeholder jika urlBanner tidak tersedia
    return '/path/to/default/image.jpg';
  }

  if (urlBanner.startsWith('http://') || urlBanner.startsWith('https://')) {
    return urlBanner;
  } else {
    return `/storage/${urlBanner}`;
  }
}

const MovieDetails = ({ film, isBookmarked: initialIsBookmarked}) => {
  const { auth } = usePage().props;
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked); // State untuk bookmark
  const { post, delete: destroy } = useForm(); // Inertia.js form handling

  if (!film) {
    return <div>Loading...</div>;
  }

  const handleBookmarkClick = (e) => {
    e.preventDefault(); // Prevent default link behavior

    if (!auth.user) {
      // Jika pengguna tidak login, arahkan ke halaman login
      return router.get('/login');
    }
    if (isBookmarked) {
      destroy(route('bookmarks.destroy', { film: film.film_id }), {
        onSuccess: () => setIsBookmarked(false),
        onError: (errors) => console.error(errors), // Log error jika ada
      });
    } else {
      post(route('bookmarks.store', {film_id: film.film_id}), {
        onSuccess: () => setIsBookmarked(true),
        onError: (errors) => console.error(errors), // Log error jika ada
      }
      );
      console.log('Film ID:', film.film_id); // Log film ID ke konsol browser
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-0 p-4 mt-5">
        {/* Gambar */}
        <div className="relative max-w-xs mx-auto rounded overflow-hidden shadow-lg bg-gray-100">
          <img
            className="w-full"
            src={getBannerUrl(film.url_banner) || "No image"}
            alt={film.title || "No title"}
          />
          <div className="absolute top-0 right-0 p-2">
            <button onClick={handleBookmarkClick} className="focus:outline-none">
              {isBookmarked ? <FaBookmark className="text-yellow-500" style={{ fontSize: '24px' }} /> : <FaRegBookmark className="text-gray-500" style={{ fontSize: '24px' }} />}
            </button>
          </div>
        </div>
        {/* Deskripsi */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-2">{film.title || "No title"}</h1>
          <div className="text-sm text-white-500 mb-1">{film.year_release || "N/A"}</div>
          <div className="text-sm text-white-500 mb-1">Country : {film.countries.country_name || "N/A"}</div>
          <div className="text-sm text-white-500 mb-1">Status : {film.status || "N/A"}</div>
          <div className="text-sm text-white-500 mb-1">Award : 
            {film.awards ? film.awards.map(award => award.award_name).join(',') : '-'}</div>
          <div className="text-sm text-white-500 mb-1">Duration : {film.duration || "N/A"} minutes</div>
          <p className="text-sm text-white-700 mb-3">
            {film.synopsis || "No synopsis available"}
          </p>
          <div className="text-sm text-white-500 mb-1">
            Genre : {film.genres ? film.genres.map(genre => genre.genre_name).join(', ') : 'N/A'}
          </div>
          <div className="text-sm text-white-500 mb-1">
            Availability : {film.availability || "N/A"}
          </div>
          <div className="text-sm text-white-500 mb-1">Rating: {film.rating_film || "N/A"}</div>
        </div>
      </div>
    </>
  );
};

MovieDetails.propTypes = {
  film: PropTypes.shape({
    film_id: PropTypes.number.isRequired,
    url_banner: PropTypes.string,
    title: PropTypes.string,
    year_release: PropTypes.string,
    countries: PropTypes.shape({
      country_name: PropTypes.string,
    }),
    status: PropTypes.string,
    awards: PropTypes.arrayOf(PropTypes.shape({
      award_name: PropTypes.string,
    })),
    duration: PropTypes.number,
    synopsis: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.shape({
      genre_name: PropTypes.string,
    })),
    availability: PropTypes.string,
    rating_film: PropTypes.string,
  }).isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  auth: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

export default MovieDetails;