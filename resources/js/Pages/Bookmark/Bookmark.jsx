import React, { useState } from 'react';
import MovieCard from "../../Components/MovieCard";
import NavBar from "../../Components/NavBar";
import { usePage, router } from '@inertiajs/react';

function getBannerUrl(urlBanner) {
  // Cek apakah urlBanner adalah URL lengkap (misalnya dimulai dengan http atau https)
  if (urlBanner.startsWith('http://') || urlBanner.startsWith('https://')) {
    return urlBanner; // Kembali kan URL asli
  } else {
    // Jika bukan URL lengkap, anggap sebagai path lokal
    return `/storage/${urlBanner}`; // Tambahkan path storage
  }
}

function Bookmark() {
  const { userBookmarks, films } = usePage().props;
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarkedMovies, setBookmarkedMovies] = useState(films);

  console.log(films);
  console.log(userBookmarks);

  // Pastikan data films dan userBookmarks tidak undefined
  if (!films || !userBookmarks) {
    return <div>Loading...</div>;
  }

  // Fungsi untuk menghapus bookmark
  const handleUnbookmark = (filmId) => {
    console.log(`Unbookmarking film with ID: ${filmId}`);
    
    // Verifikasi bahwa filmId tidak undefined atau null
    if (!filmId) {
      console.error('Film ID is undefined or null.');
      return;
    }

    router.delete(route('bookmarks.destroy', { film: filmId }), {
      onSuccess: () => {
        console.log(`Successfully unbookmarked film with ID: ${filmId}`);
        // Perbarui daftar film yang di-bookmark setelah berhasil menghapus
        // setBookmarkedMovies(prevMovies => prevMovies.filter(movie => movie.film_id !== filmId));
        router.get(route('bookmark.index'));
      },
      onError: (errors) => {
        console.error('Error unbookmarking film:', errors);
      }
    });
  };

  // Filter film yang di-bookmark
  const filteredMovies = bookmarkedMovies.filter(movie =>
    userBookmarks.includes(movie.film_id) &&
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <NavBar />
      <div className="p-10">
        <input
          type="text"
          placeholder="Search your bookmarks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 p-2 w-full rounded bg-gray-800 text-white"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard
                key={movie.film_id}
                imgSrc={getBannerUrl(movie.url_banner) || "No image"}
                title={movie.title}
                availability={movie.availability}
                id={movie.film_id}
                isBookmarked={true}
                onUnbookmark={() => handleUnbookmark(movie.film_id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center">No bookmarks found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bookmark;
