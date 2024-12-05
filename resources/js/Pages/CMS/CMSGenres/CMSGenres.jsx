import React, { useState } from "react";
import Sidebar from "../../../Components/Sidebar";
import Button from "../../../Components/Button";
import InputField from "../../../Components/InputField";
import CMSTable from "../../../Components/CMS/CMSTable";
import Pagination from "../../../Components/Pagination";
import { usePage, useForm } from "@inertiajs/react";

function CMSGenres() {
    const { genres } = usePage().props;
    const [genre, setGenre] = useState('');
    const [genresList, setGenresList] = useState(genres); // Using the full genres list
    const { post, put, delete: destroy } = useForm();

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'genre') {
            setGenre(value);
        } else if (name === 'search') {
            setSearchQuery(value);
            setCurrentPage(1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!genre.trim()) {
            alert('Genre name cannot be empty');
            return;
        } else {
            post(route('cms.genres.store', {
                genre_name: genre
            }), {
                onSuccess: () => {
                    setGenre('');
                    alert('Genre has been added!');
                    window.location.reload(); // Reload to fetch updated data
                },
                onError: (errors) => {
                    console.log(errors);
                }
            });
        }
    };

    const handleSave = (id, data) => {
        put(route('cms.genres.update', { genre_id: id, genre_name: data.genre_name }), {
            onSuccess: () => {
                alert('Genre has been updated!');
                setGenresList(prev => prev.map(item => item.genre_id === id ? { ...item, ...data } : item));
            }
        });
    };

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this genre?')) {
            return;
        } else {
            destroy(route('cms.genres.destroy', { genre_id: id }), {
                onSuccess: () => {
                    alert('Genre has been deleted!');
                    setGenresList(prev => prev.filter(item => item.genre_id !== id));
                },
                onError: (errors) => {
                    console.log(errors);
                }
            });
        }
    };

    const columns = [
        { Header: 'Genre Name', accessor: 'genre_name', editable: true },
    ];

    // Filter and paginate genres
    const filteredGenresList = genresList.filter(genreItem =>
        genreItem.genre_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredGenresList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredGenresList.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="flex">
                <Sidebar active_genres={true} />
                <div className="flex-1 flex flex-col items-center p-10 bg-gray-800 text-dark-text">
                    <div className="bg-dark-card-bg text-dark-text p-8 rounded-lg shadow-md w-full max-w-xl mb-8">
                        <h2 className="text-3xl font-extrabold text-center mb-6 text-custom-blue-light">Add New Genre</h2>
                        <form id="genre-form" className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="genre-name" className="block text-sm font-medium text-dark-text">Genre Name</label>
                                <InputField
                                    onChange={handleInputChange}
                                    value={genre}
                                    type="text"
                                    id="genre"
                                    name="genre"
                                    placeholder="Enter a genre name"
                                    className="mt-2 block w-full px-4 py-3 text-black text-custom-input-text border border-custom-input-border shadow-sm bg-custom-input-bg focus:outline-none focus:ring-custom-orange focus:border-custom-orange sm:text-sm"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-dark-accent text-dark-text py-3 px-4 rounded-md hover:bg-dark-hover focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-dark-accent text-sm font-medium"
                                text="Submit"
                            />
                        </form>
                    </div>

                    {/* Table Section */}
                    <div className="bg-dark-card-bg text-dark-text p-8 rounded-lg shadow-md w-full max-w-4xl">
                        <h2 className="text-2xl font-extrabold text-center mb-6 text-custom-blue-light">Genres List</h2>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="search"
                                value={searchQuery}
                                onChange={handleInputChange}
                                placeholder="Search genres..."
                                className="w-full p-2 border border-gray-300 rounded text-black"
                            />
                        </div>
                        <CMSTable
                            columns={columns}
                            data={currentItems} // Use current page data
                            handleSave={handleSave}
                            handleDelete={handleDelete}
                            idAccessor={'genre_id'}
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
}

export default CMSGenres;