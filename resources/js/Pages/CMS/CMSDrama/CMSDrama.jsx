import React, { useState , useEffect} from 'react';
import Sidebar from '../../../Components/Sidebar';
import FilterSelect from '../../../Components/FilterSelect';
import SearchInput from '../../../Components/SearchInput';
import CMSTableDrama from '../../../Components/CMS/CMSTableDrama';
import Popup from '../../../Components/CMS/Popup';
import Pagination from '../../../Components/Pagination';
import { usePage, router} from '@inertiajs/react';

function CMSDrama() {
  const { films,filters } = usePage().props;
  const [filterStatus, setFilterStatus] = useState(filters.status || '');
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [filterFilm, setFilterFilm] = useState(filters.perPage || '10');
  const [currentFilm, setCurrentFilm] = useState(null);

  useEffect(() => {
    setFilterStatus(filters.status || '');
    setSearchTerm(filters.search || '');
    setFilterFilm(filters.perPage || '10');
  }, [filters]);

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setFilterStatus(value);
    router.get(route('cms.dramavalidasi.index'), {
      status: value,
      search: searchTerm,
      perPage: filterFilm,
    }, {
      replace: true,
      preserveState: true,
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    router.get(route('cms.dramavalidasi.index'), {
      status: filterStatus,
      search: value,
      perPage: filterFilm,
    }, {
      replace: true,
      preserveState: true,
    });
  };

  const handleFilmChange = (e) => {
    const value = e.target.value;
    setFilterFilm(value);
    router.get(route('cms.dramavalidasi.index'), {
      status:  filterStatus,
      search: searchTerm,
      perPage: value,
    }, {
      replace: true,
      preserveState: true,
    });
  };

  const showPopup = (title, id) => {
    const film = films.data.find((drama) => drama.film_id === id);
    setCurrentFilm(film);
  };

  const closePopup = () => {
    setCurrentFilm(null);
  };

  const acceptedFilm = () => {
    router.post(route('cms.dramavalidasi.accept', { film_id: currentFilm.film_id }), {
      status: filterStatus,
      search: searchTerm,
      perPage: filterFilm,
      page: films.current_page,
    }, {
      onSuccess: () => {
        alert('Film Accepted!');
        closePopup();
      },
      onError: (errors) => {
        console.log(errors);
      },
    });
  };
  
  const rejectedFilm = () => {
    router.post(route('cms.dramavalidasi.reject', { film_id: currentFilm.film_id }), {
      status: filterStatus,
      search: searchTerm,
      perPage: filterFilm,
      page: films.current_page,
    }, {
      onSuccess: () => {
        alert('Film Rejected!');
        closePopup();
      },
      onError: (errors) => {
        console.log(errors);
      },
    });
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this film?')) {
      router.delete(route('cms.dramavalidasi.destroy', { film_id: id }), {
        status: filterStatus,
        search: searchTerm,
        perPage: filterFilm,
        page: films.current_page,
      }, {
        onSuccess: () => {
          alert('Film has been deleted!');
        },
        onError: (errors) => {
          console.log(errors);
        },
      });
    }
  };

  const columns = [
    { Header: 'Title', accessor: 'title', width: 'auto' },
    {
      Header: 'Genre',
      accessor: 'genres',
      width: 'auto',
      Cell: ({ row }) => row.genres.map((genre) => genre.genre_name).join(', '),
    },
    { Header: 'Synopsis', accessor: 'synopsis', width: 'auto' },
    { Header: 'Status', accessor: 'status', width: 'auto' },
    { 
      Header: 'Actions', 
      accessor: 'actions', 
      width: '180px',
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => showPopup(row.title, row.film_id)} 
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Details
          </button>
          <button 
            onClick={() => router.visit(route('cms.dramavalidasi.edit', { film_id: row.film_id }))}
            className="px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Edit
          </button>
        </div>
      )
    },
  ];

  const handlePageChange = (page) => {
    router.get(route('cms.dramavalidasi.index'), {
      page,
      status: filterStatus,
      search: searchTerm,
      perPage: filterFilm,
    }, {
      replace: true,
      preserveState: true,
    });
  };

  return (
    <>
      <div className="flex">
        <Sidebar active_validate={true} />
        <div className="flex-1 flex flex-col items-center p-10 bg-gray-800 text-dark-text">
          <div className="bg-dark-card-bg text-dark-text p-8 rounded-lg shadow-md w-full max-w-6xl mb-8">
            <h2 className="text-3xl font-extrabold text-center mb-6 text-custom-blue-light">
              Film
            </h2>
            <div className="flex space-x-4 mb-6">
              <FilterSelect
                id="filter-status"
                label="Filter by Status"
                value={filterStatus}
                options={[
                  { value: ' ', label: 'All Status' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'accepted', label: 'Accepted' },
                  { value: 'rejected', label: 'Rejected' },
                ]}
                onChange={handleStatusChange}
              />
              <FilterSelect
                id="filter-film"
                label="Show Film"
                value={filterFilm}
                options={[
                  { value: '10', label: '10' },
                  { value: '20', label: '20' },
                  { value: '50', label: '50' },
                  { value: '100', label: '100' },
                ]}
                onChange={handleFilmChange}
              />
              <SearchInput
                id="search-film"
                label="Search Film"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <CMSTableDrama
              columns={columns}
              data={films.data}
              handleDelete={handleDelete}
              showPopup={showPopup}
            />
            <div className="bg-dark-card-bg text-dark-text p-4 rounded-lg shadow-md w-full max-w-6xl mt-2">
              <Pagination
                currentPage={films.current_page}
                lastPage={films.last_page}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
        {currentFilm && (
          <Popup
            film={currentFilm}
            onClose={closePopup}
            onAccept={acceptedFilm}
            onReject={rejectedFilm}
          />
        )}
      </div>
    </>
  );
}

export default CMSDrama;