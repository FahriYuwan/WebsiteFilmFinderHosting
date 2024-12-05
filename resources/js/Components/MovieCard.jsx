import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'; // Import ikon bookmark

const MovieCard = (props) => {
  const { auth} = usePage().props; // Ambil informasi autentikasi dari props
  const [isBookmarked, setIsBookmarked] = useState(props.isBookmarked); // State untuk bookmark
  const { post, delete: destroy } = useForm(); // Inertia.js form handling

  const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) {
      return text;
    }
    const truncated = text.substring(0, maxLength);
    const lastCommaIndex = truncated.lastIndexOf(',');
    if (lastCommaIndex !== -1) {
      return truncated.substring(0, lastCommaIndex) + '...';
    }
    return truncated + '...';
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300'; // URL gambar fallback
  };

  const handleBookmarkClick = (e) => {
    e.preventDefault(); // Prevent default link behavior

    if (!auth.user) {
      // Jika pengguna tidak login, arahkan ke halaman login
      return router.get('/login');
    }

    if (isBookmarked) {
      destroy(route('bookmarks.destroy', { film: props.id }), {
        onSuccess: () => setIsBookmarked(false),
        onError: (errors) => console.error(errors), // Log error jika ada
      });
    } else {
      post(route('bookmarks.store', {film_id: props.id}), {
        onSuccess: () => setIsBookmarked(true),
        onError: (errors) => console.error(errors), // Log error jika ada
      }
      );
      console.log('Film ID:', props.id); // Log film ID ke konsol browser
    }
  };

  const handleUnbookmark = (filmId) => {
    console.log(`Unbookmarking film with ID: ${filmId}`);
    router.post('/unbookmark', { film_id: filmId }, {
      onSuccess: () => {
        console.log('Unbookmark successful');
        setIsBookmarked(false);
      }
    });
  };

  return (
    <div className="relative max-w-sm rounded overflow-hidden shadow-lg bg-white block ml-7">
      <Link href={`/detailpage/${props.id}`}>
      <img
        className="w-full h-4/5 object-cover"
        src={props.imgSrc}
        alt={`${props.title} Image`}
        onError={handleImageError}
      />
      </Link>
      <div className="absolute top-0 right-0 p-2">
        <button onClick={handleBookmarkClick} className="focus:outline-none">
          {isBookmarked ? <FaBookmark className="text-yellow-500" style={{ fontSize: '24px' }} /> : <FaRegBookmark className="text-gray-500" style={{ fontSize: '24px' }} />}
        </button>
      </div>
      <div className="px-6 py-4">
        <div className="text-black text-xl mb-2">{props.title}</div>
        <p className="text-gray-700 text-base">{truncateText(props.availability)}</p>
      </div>
      {isBookmarked && (
        <button onClick={() => handleUnbookmark(props.id)}>Unbookmark</button>
      )}
    </div>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  isBookmarked: PropTypes.bool.isRequired, // Tambahkan prop untuk status bookmark
};

MovieCard.defaultProps = {
  imgSrc: 'https://via.placeholder.com/300',
  title: 'Movie Title',
  availability: 'N/A',
  isBookmarked: false, // Default value untuk status bookmark
};

export default MovieCard;