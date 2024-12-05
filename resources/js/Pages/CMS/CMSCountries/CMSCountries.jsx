import React, { useState } from 'react';
import CMSTable from '../../../Components/CMS/CMSTable';
import Sidebar from '../../../Components/Sidebar';
import Button from '../../../Components/Button';
import InputField from '../../../Components/InputField';
import { usePage, useForm } from "@inertiajs/react";
import Pagination from '../../../Components/Pagination';

const CMSCountries = () => {
  const { countries } = usePage().props;
  const [countryName, setCountryName] = useState('');
  const [countriesList, setCountriesList] = useState(countries); // Use the full countries list
  const { post, delete: destroy, put } = useForm();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'countryName') {
      setCountryName(value);
    } else if (name === 'search') {
      setSearchQuery(value);
      setCurrentPage(1); // Reset to first page on search
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('cms.countries.store', {
      country_name: countryName
    }), {
      onSuccess: () => {
        setCountryName('');
        alert('Country has been added!');
        window.location.reload(); // Reload to fetch updated data
      },
      onError: (errors) => {
        console.log(errors);
      }
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this country?')) {
      return;
    } else {
      destroy(route('cms.countries.destroy', { countries_id: id }), {
        onSuccess: () => {
          alert('Country has been deleted!');
          // Update the local state by filtering out the deleted country
          setCountriesList(prev => prev.filter(country => country.countries_id !== id));
        },
        onError: (errors) => {
          console.log(errors);
        }
      });
    }
  };

  const handleSave = (id, data) => {
    alert('ID: ' + id + ' Data: ' + data.country_name);
    put(route('cms.countries.update', { countries_id: id, country_name: data.country_name }), {
      onSuccess: () => {
        alert('Country has been updated!');
        // Update the local state with the edited country
        setCountriesList(prev => prev.map(country => country.countries_id === id ? { ...country, ...data } : country));
      },
      onError: (errors) => {
        console.log(errors);
      }
    });
  };

  const columns = [
    { Header: 'Country Name', accessor: 'country_name', editable: true },
  ];

  // Filter countries list based on search query
  const filteredCountriesList = countriesList.filter(country =>
    country.country_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCountriesList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCountriesList.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex">
        <Sidebar active_country={true} />
        <div className="flex-1 flex flex-col items-center p-10 bg-gray-800 text-dark-text">
          {/* Form Section */}
          <div className="bg-dark-card-bg text-dark-text p-8 rounded-lg shadow-md w-full max-w-xl mb-8">
            <h2 className="text-3xl font-extrabold text-center mb-6 text-custom-blue-light">Add New Country</h2>
            <form id="country-form" className="space-y-6" onSubmit={handleSubmit}>
              <InputField
                id="country-name"
                name="countryName"
                type="text"
                placeholder="Enter a country name"
                value={countryName}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                className="w-full bg-dark-accent text-dark-text py-3 px-4 rounded-md hover:bg-dark-hover focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-dark-accent text-sm font-medium"
                text="Submit"
              />
            </form>
          </div>

          {/* Countries Table */}
          <div className="bg-dark-card-bg p-8 rounded-lg shadow-md w-full max-w-4xl">
            <h2 className="text-2xl font-extrabold text-center mb-6 text-custom-blue-light">Countries List</h2>
            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search countries..."
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
            </div>
            <CMSTable
              columns={columns}
              data={currentItems} // Use current page data
              handleSave={handleSave}
              handleDelete={handleDelete}
              idAccessor={'countries_id'}
            />
          </div>
          {/* Pagination */}
          <div className="bg-dark-card-bg text-dark-text p-4 rounded-lg shadow-md w-full max-w-4xl mt-2">
            <Pagination
              currentPage={currentPage}
              lastPage={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CMSCountries;