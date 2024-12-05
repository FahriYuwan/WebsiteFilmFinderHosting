import React, { useState } from 'react';
import MovieCard from "../../Components/MovieCard";
import NavBar from "../../Components/NavBar";
import Pagination from "../../Components/Pagination";
import { usePage, router} from '@inertiajs/react';


function getBannerUrl(urlBanner) {
  // Cek apakah urlBanner adalah URL lengkap (misalnya dimulai dengan http atau https)
  if (urlBanner.startsWith('http://') || urlBanner.startsWith('https://')) {
    return urlBanner; // Kembali kan URL asli
  } else {
    // Jika bukan URL lengkap, anggap sebagai path lokal
    return `/storage/${urlBanner}`; // Tambahkan path storage
  }
}

function Home() {
  const { films, userBookmarks } = usePage().props;
  console.log(films);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Tambahkan pengecekan untuk memastikan films dan films.data tidak undefined
  if (!films || !films.data) {
    return <div>Loading...</div>;
  }

  const filteredMovies = films.data.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    router.get(`/home?page=${page}`);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <NavBar/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-10">
        {currentMovies.map((movie, index) => {
          return (
            <MovieCard
              key={index}
              imgSrc={getBannerUrl(movie.url_banner)} // Sesuaikan dengan kolom di tabel
              title={movie.title}
              availability={movie.availability} // Sesuaikan dengan kolom di tabel
              id={movie.film_id}
              isBookmarked={userBookmarks.includes(movie.film_id)} // Kirim status bookmark
            />
          );
        })}
      </div>
      <Pagination
        currentPage={films.current_page}
        lastPage={films.last_page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Home;