import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../../../Components/Sidebar';
import FilterSelect from '../../../Components/FilterSelect';
import CMSTableReviews from '../../../Components/CMS/CMSTableReviews';
import Button from '../../../Components/Button';
import Pagination from '../../../Components/Pagination';
import { usePage, router } from '@inertiajs/react';

const CMSReviews = () => {
    const { reviews: initialReviews } = usePage().props;
    console.log(initialReviews);

    const [reviews, setReviews] = useState(initialReviews);
    const [filteredReviews, setFilteredReviews] = useState(reviews);
    const [filterRating, setFilterRating] = useState('');
    const [filterReviews, setFilterReviews] = useState('10');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = parseInt(filterReviews, 10);
    const [isAnySelected, setIsAnySelected] = useState(false);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = [...reviews];
    
            if (filterRating) {
                filtered = filtered.filter(review => review.rating_user === parseInt(filterRating, 10));
            }
    
            if (filterStatus) {
                filtered = filtered.filter(review => review.status === filterStatus);
            }
    
            if (searchTerm) {
                filtered = filtered.filter(review => 
                    review.review_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    review.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    review.film.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
    
            setFilteredReviews(filtered);
    
            const calculatedLastPage = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    
            if (currentPage > calculatedLastPage) {
                setCurrentPage(calculatedLastPage);
            }
        };
    
        applyFilters();
    }, [filterRating, filterStatus, searchTerm, reviews, itemsPerPage, currentPage]);
    

    useEffect(() => {
        const updateSelection = () => {
            const anyChecked = document.querySelectorAll('#reviews-table-body input[type="checkbox"]:checked').length > 0;
            setIsAnySelected(anyChecked);
        };

        updateSelection();

        const checkboxes = document.querySelectorAll('#reviews-table-body input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateSelection);
        });

        return () => {
            checkboxes.forEach(checkbox => {
                checkbox.removeEventListener('change', updateSelection);
            });
        };
    }, [filteredReviews]);

    const handleStatusChange = (e) => {
        setFilterStatus(e.target.value);
        setCurrentPage(1);
    };

    const handleRatingChange = (e) => {
        setFilterRating(e.target.value);
    };

    const handleReviewsChange = (e) => {
        setFilterReviews(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const approveSelected = () => {
        if (!isAnySelected) return;

        const checkboxes = document.querySelectorAll('#reviews-table-body input[type="checkbox"]:checked');
        const approvedReviews = [];

        checkboxes.forEach(checkbox => {
            const row = checkbox.closest('tr');
            const reviewId = row.getAttribute('data-review-id');
            approvedReviews.push(reviewId);
        });

        alert(`Review dengan ID ${approvedReviews} telah disetujui!`);
        router.put(route('cms.reviews.update', { review_id: approvedReviews }), {
            onSuccess: () => {
                approvedReviews.length = 0;
                router.get(route('cms.reviews.index'));
                console.log('Review telah disetujui! ' + approvedReviews);
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
        checkboxes.forEach(checkbox => checkbox.checked = false);
    };

    const deleteSelected = () => {
        if (!isAnySelected) return;

        const checkboxes = document.querySelectorAll('#reviews-table-body input[type="checkbox"]:checked');
        const reviewsToDelete = [];

        checkboxes.forEach(checkbox => {
            const row = checkbox.closest('tr');
            const reviewId = row.getAttribute('data-review-id');
            reviewsToDelete.push(reviewId);
        });
        
        if (window.confirm(`Apakah Anda yakin ingin menghapus ulasan yang dipilih?`)) {
            router.delete(route('cms.reviews.destroy', { review_id: reviewsToDelete }), {
                onSuccess: () => {
                    reviewsToDelete.length = 0;
                    router.get(route('cms.reviews.index'));
                    console.log('Review telah dihapus! ' + reviewsToDelete);
                },
                onError: (errors) => {
                    console.log(errors);
                },
            });

            checkboxes.forEach(checkbox => checkbox.checked = false);
        }
    };

    const handleSelectAll = (e) => {
        const checkboxes = document.querySelectorAll('#reviews-table-body input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = e.target.checked);
        setIsAnySelected(e.target.checked);
    };

    const columns = [
        { Header: '', accessor: 'select', width: '50px', editable: false },
        { Header: 'Username', accessor: { name: 'user', child_accessor: 'name' }, width: '150px', editable: false },
        { Header: 'Rate', accessor: 'rating_user', width: '100px', editable: false },
        { Header: 'Film', accessor: { name: 'film', child_accessor: 'title' }, width: '150px', editable: false },
        { Header: 'Reviews', accessor: 'review_text', width: '300px', editable: false },
        { Header: 'Status', accessor: 'status', width: '100px', editable: false },
    ];

    const lastPage = Math.max(1, Math.ceil(filteredReviews.length / itemsPerPage));
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredReviews.slice(indexOfFirstItem, indexOfLastItem);

    const data = currentItems.map(review => ({
        ...review,
        select: <input type="checkbox" className="h-4 w-4 text-blue-400" />
    }));

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar active_reviews={true} />
            <main className="flex-1 p-10 bg-gray-800 text-white">
                <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-7xl mx-auto mb-8">
                    <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-400">Reviews Management</h2>
                    <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
                        <FilterSelect 
                            label="Filter by Rating" 
                            value={filterRating} 
                            options={[
                                { value: '', label: 'All Ratings' },
                                { value: '1', label: '1 Star' },
                                { value: '2', label: '2 Stars' },
                                { value: '3', label: '3 Stars' },
                                { value: '4', label: '4 Stars' },
                                { value: '5', label: '5 Stars' },
                            ]} 
                            onChange={handleRatingChange} 
                            className="mb-4 md:mb-0"
                        />
                        <FilterSelect 
                            label="Filter by Status" 
                            value={filterStatus} 
                            options={[
                                { value: '', label: 'All Statuses' },
                                { value: 'approved', label: 'Approved' },
                                { value: 'pending', label: 'Pending' },
                            ]} 
                            onChange={handleStatusChange} 
                            className="mb-4 md:mb-0"
                        />
                        <FilterSelect 
                            label="Show Reviews" 
                            value={filterReviews} 
                            options={[
                                { value: '10', label: '10' },
                                { value: '20', label: '20' },
                                { value: '50', label: '50' },
                                { value: '100', label: '100' },
                            ]} 
                            onChange={handleReviewsChange} 
                            className="mb-4 md:mb-0"
                        />
                        <div className="flex-1">
                            <label htmlFor="search-reviews" className="block text-sm font-medium mb-1">Search Reviews</label>
                            <input
                                type="text"
                                id="search-reviews"
                                placeholder="Search by user, film, or review"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            />
                        </div>
                    </div>

                    {filteredReviews.length === 0 ? (
                        <div className="text-center text-gray-400">Tidak ada ulasan yang ditemukan.</div>
                    ) : (
                        <>
                            <CMSTableReviews
                                columns={columns}
                                data={data}
                                idAcessor={'review_id'}
                            />

                            <div className="flex justify-between items-center mt-4">
                                <div>
                                    <input type="checkbox" id="select-all-top" className="ml-4" onChange={handleSelectAll} />
                                    <label htmlFor="select-all-top" className="ml-2 text-sm font-medium">Select All</label>
                                </div>
                                <div className="flex space-x-4">
                                    <Button 
                                        text="Approve Selected" 
                                        className={`bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 ${!isAnySelected ? 'cursor-not-allowed opacity-50' : ''}`} 
                                        onClick={approveSelected} 
                                        disabled={!isAnySelected}
                                    />
                                    <Button 
                                        text="Delete Selected" 
                                        className={`bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 ${!isAnySelected ? 'cursor-not-allowed opacity-50' : ''}`} 
                                        onClick={deleteSelected} 
                                        disabled={!isAnySelected}
                                    />
                                </div>
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                lastPage={lastPage}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CMSReviews;