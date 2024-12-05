import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Sidebar from '../../../Components/Sidebar';
import InputField from '../../../Components/InputField';
import Button from '../../../Components/Button';
import CMSTable from '../../../Components/CMS/CMSTable';
import Pagination from '../../../Components/Pagination';

function CMSAwards() {
    const { awards } = usePage().props;
    const [AwardList, setAwards] = useState(awards); // Load all awards
    const [awardName, setAwardName] = useState('');
    const [year, setYear] = useState('');
    const { post, delete: destroy, put } = useForm();

    const [searchQuery, setSearchQuery] = useState('');

    // Pagination states for client-side
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'award') {
            setAwardName(value);
        } else if (name === 'year') {
            setYear(value);
        } else if (name === 'search') {
            setSearchQuery(value); // Update search query state
            setCurrentPage(1); // Reset page to first when searching
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('cms.awards.store', {
            award: awardName,
            year: year
        }), {
            onSuccess: () => {
                setAwardName('');
                setYear('');
                alert('Award has been added!');
                window.location.reload(); // Reload to fetch updated data
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    };

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this award?')) {
            return;
        } else {
            destroy(route('cms.awards.destroy', { award_id: id }), {
                onSuccess: () => {
                    alert('Award has been deleted!');
                    setAwards(prev => prev.filter(award => award.award_id !== id));
                },
                onError: (errors) => {
                    console.log(errors);
                }
            });
        }
    };

    const handleSave = (id, updatedData) => {
        put(route('cms.awards.update', {
            award_id: id,
            award: updatedData.award_name,
            year: updatedData.year
        }), {
            onSuccess: () => {
                alert('Award has been updated!');
                setAwards(prev => prev.map(award => award.award_id === id ? { ...award, ...updatedData } : award));
            },
            onError: () => alert('Error updating award.'),
        });
    };

    const columns = [
        { Header: 'Award', accessor: 'award_name', editable: true },
        { Header: 'Year', accessor: 'year', editable: true },
    ];

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear; i >= 2000; i--) {
            years.push(<option key={i} value={i}>{i}</option>);
        }
        return years;
    };

    // Filter awards list based on search query
    const filteredAwardList = AwardList.filter(award =>
        award.award_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        award.year.toString().includes(searchQuery.toLowerCase())
    );

    // Paginate filtered awards
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAwardList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAwardList.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="flex">
                <Sidebar active_awards={true} />
                <div className="flex-1 flex flex-col items-center p-10 bg-gray-800 text-dark-text">
                    <div className="bg-dark-card-bg text-dark-text p-8 rounded-lg shadow-md w-full max-w-xl mb-8">
                        <h2 className="text-3xl font-extrabold text-center mb-6 text-custom-blue-light">Add Award</h2>
                        <form id="award-form" className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="award" className="block text-sm font-medium text-dark-text">Award</label>
                                <InputField
                                    type="text"
                                    id="award"
                                    name="award"
                                    placeholder="Enter award"
                                    value={awardName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="year" className="block text-sm font-medium text-dark-text">Year</label>
                                <select
                                    id="year"
                                    name="year"
                                    value={year}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full bg-dark-card-bg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dark-accent focus:border-dark-accent sm:text-sm px-3 py-2"
                                >
                                    <option value="">Select Year</option>
                                    {generateYearOptions()}
                                </select>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-dark-accent text-dark-text py-3 px-4 hover:bg-dark-hover focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-dark-accent text-sm font-medium"
                                text="Submit"
                            />
                        </form>
                    </div>
                    <div className="bg-dark-card-bg text-dark-text p-8 rounded-lg shadow-md w-full max-w-4xl">
                        <h2 className="text-2xl font-extrabold text-center mb-6 text-custom-blue-light">Awards List</h2>
                        {/* Search Input */}
                        <div className="mb-4">
                            <input
                                type="text"
                                name="search"
                                value={searchQuery}
                                onChange={handleInputChange}
                                placeholder="Search awards..."
                                className="w-full p-2 border border-gray-300 rounded text-black"
                            />
                        </div>
                        <CMSTable
                            columns={columns}
                            data={currentItems} // Use current page data
                            handleDelete={handleDelete}
                            handleSave={handleSave}
                            idAccessor={'award_id'}
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

export default CMSAwards;