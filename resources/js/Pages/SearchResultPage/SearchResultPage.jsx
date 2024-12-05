import React, { useState } from 'react';
import NavBar from '../../Components/NavBar'; 
import FilterSelect from '../../Components/FilterSelect'; 
import SearchResults from '../../Components/SearchResults'; 


const SearchResultPage = ({film}) => {
  if (!film) {
    return <div>Loading...</div>;
  }
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState('');
  const [availability, setAvailability] = useState('');
  const [award, setAward] = useState('');
  const [sortYear, setSortYear] = useState(''); // State untuk filter pengurutan tahun
  const [sortTitle, setSortTitle] = useState(''); // State untuk filter pengurutan judul

  const filmArray = Array.isArray(film) ? film : [];

  const getUniqueValues = (key) => {
    return [...new Set(filmArray.map(film => film[key]))].filter(value => value);
  };

  const getUniqueValuesFromCommaSeparatedString = (key) => {
    const allValues = filmArray.map(film => film[key]).join(',').split(',');
    return [...new Set(allValues)].filter(value => value);
  };

  // Sort yearOptions in descending order
  const yearOptions = getUniqueValues('year_release')
    .sort((a, b) => b - a)
    .map(value => ({ value, label: value }));

  // Sort genreOptions, availabilityOptions, and awardOptions in ascending order
  const genreOptions = getUniqueValues('genres')
    .flat()
    .map(genre => genre.genre_name)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()
    .map(value => ({ value, label: value }));

  const availabilityOptions = getUniqueValuesFromCommaSeparatedString('availability')
    .sort()
    .map(value => ({ value, label: value }));

  const awardOptions = getUniqueValues('awards')
    .flat()
    .map(award => award.award_name)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()
    .map(value => ({ value, label: value }));

  const options = {
    year: [{ value: '', label: 'All' }, ...yearOptions],
    genre: [{ value: '', label: 'All' }, ...genreOptions],
    status: [
      { value: '', label: 'All' },
      { value: 'accepted', label: 'Accepted' },
      { value: 'Upcoming', label: 'Upcoming' },
    ].sort((a, b) => a.label.localeCompare(b.label)),
    availability: [{ value: '', label: 'All' }, ...availabilityOptions],
    award: [{ value: '', label: 'All' }, ...awardOptions],
    sortYear: [
      { value: '', label: 'None' },
      { value: 'asc', label: 'Ascending' },
      { value: 'desc', label: 'Descending' },
    ],
    sortTitle: [
      { value: '', label: 'None' },
      { value: 'asc', label: 'A-Z' },
      { value: 'desc', label: 'Z-A' },
    ],
  };

  const filters = { year, genre, status, availability, award, sortYear, sortTitle };

  return (
    <div className="bg-gray-900 text-white min-h-screen w-full">
      <NavBar/>
      <div className="w-full p-4">
        <div className="flex justify-center space-x-4 mt-4">
          <FilterSelect
            label="Year"
            value={year}
            options={options.year}
            onChange={(e) => setYear(e.target.value)}
          />
          <FilterSelect
            label="Genre"
            value={genre}
            options={options.genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <FilterSelect
            label="Status"
            value={status}
            options={options.status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <FilterSelect
            label="Availability"
            value={availability}
            options={options.availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
          <FilterSelect
            label="Award"
            value={award}
            options={options.award}
            onChange={(e) => setAward(e.target.value)}
          />
          <FilterSelect
            label="Sort Year"
            value={sortYear}
            options={options.sortYear}
            onChange={(e) => setSortYear(e.target.value)}
          />
          <FilterSelect
            label="Sort Title"
            value={sortTitle}
            options={options.sortTitle}
            onChange={(e) => setSortTitle(e.target.value)}
          />
        </div>
        <SearchResults filters={filters} film={filmArray} />
      </div>
    </div>
  );
};

export default SearchResultPage;