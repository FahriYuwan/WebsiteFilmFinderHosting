import React from 'react';
import PropTypes from 'prop-types';

function getBannerUrl(urlBanner) {
  // Cek apakah urlBanner adalah URL lengkap (misalnya dimulai dengan http atau https)
  if (urlBanner.startsWith('http://') || urlBanner.startsWith('https://')) {
    return urlBanner; // Kembali kan URL asli
  } else {
    // Jika bukan URL lengkap, anggap sebagai path lokal
    return `/storage/${urlBanner}`; // Tambahkan path storage
  }
}

const Popup = ({ film = {}, onClose, onAccept, onReject }) => (
  <div
    id="popup"
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
  >
    <div className="bg-gray-900 p-6 rounded-lg shadow-2xl w-full max-w-5xl overflow-y-auto max-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-white">Film Details</h2>
        <button
          className="text-gray-400 hover:text-gray-200 focus:outline-none"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kolom Kiri */}
        <div className="md:col-span-2">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            {film.title || 'N/A'}
          </h3>
          <p className="text-lg text-gray-300 mb-2">
            <span className="font-semibold">Release Year:</span>{' '}
            {film.year_release || 'N/A'}
          </p>
          <p className="text-lg text-gray-300 mb-2">
            <span className="font-semibold">Genres:</span>{' '}
            {film.genres?.map((genre) => genre.genre_name).join(', ') || 'N/A'}
          </p>
          <p className="text-lg text-gray-300 mb-2">
            <span className="font-semibold">Country:</span>{' '}
            {film.countries?.country_name || 'N/A'}
          </p>
          <p className="text-lg text-gray-300 mb-2">
            <span className="font-semibold">Availability:</span>{' '}
            {film.availability || 'N/A'}
          </p>
          <p className="text-lg text-gray-300 mb-4">
            <span className="font-semibold">Awards:</span>{' '}
            {film.awards?.map((awards)=>awards.award_name).join(', ') || 'N/A'}
          </p>
          <h3 className="text-xl font-semibold mb-2 text-white">Description</h3>
          <p className="text-base text-gray-300 mb-6">
            {film.synopsis || 'N/A'}
          </p>
          <h3 className="text-xl font-semibold mb-4 text-white">Actors</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {film.actors?.map((actor) => (
              <div key={actor.actor_id} className="text-center">
                <img
                  src={actor.url_actor}
                  alt={actor.actor_name}
                  className="w-full h-32 rounded-lg object-cover mb-2"
                />
                <p className="text-gray-300 text-sm">{actor.actor_name}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Kolom Kanan */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-white">
              Banner Image
            </h3>
            <img
              className="w-full rounded-lg object-cover"
              src={getBannerUrl(film.url_banner)}
              alt="Banner"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">Trailer</h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={film.url_trailer}
                title="Trailer"
                frameBorder="0"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-6">
        <button
          className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={onAccept}
        >
          Accept
        </button>
        <button
          className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={onReject}
        >
          Reject
        </button>
      </div>
    </div>
  </div>
);

Popup.propTypes = {
  film: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default Popup;