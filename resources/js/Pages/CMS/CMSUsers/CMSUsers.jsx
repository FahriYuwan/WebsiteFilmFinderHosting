import React, { useState } from "react";
// import InputField from "../../../Components/InputField";
// import Button from "../../../Components/Button";
import CMSTable from "../../../Components/CMS/CMSTable";
import Sidebar from "../../../Components/Sidebar";
import Pagination from "../../../Components/Pagination";

import { usePage, useForm, router } from "@inertiajs/react";

function CMSUsers() {
    const { users } = usePage().props;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userList, setUserList] = useState(users.data);
    const { post, put, delete: destroy } = useForm();

    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } 
        if (name === 'email') {
            setEmail(value);
        }
        if (name === 'search') {
            setSearchQuery(value); // Update search query state
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) {
            alert('Name and email cannot be empty');
            return;
        }
        post(route('cms.users.store', {
            name: name,
            email: email,
        }), {
            onSuccess: () => {
                setName('');
                setEmail('');
                alert('User has been added!');
                router.get(route('cms.users.index'));
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    };

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        } else {
            destroy(route('cms.users.destroy', { user_id: id }), {
                onSuccess: () => {
                    alert('User has been deleted!');
                    router.get(route('cms.users.index'));
                },
                onError: (errors) => {
                    console.log(errors);
                }
            });
        }
    };

    const handleSave = (rowId, updatedRow) => {
        // alert('Save mode activated for row ID: ' + rowId);
        // alert('Updated Name: ' + updatedRow.name);
        // alert('Updated Email: ' + updatedRow.email);
        // alert('Updated Status: ' + updatedRow.status);
        put(route('cms.users.update', { 
            user_id: rowId, 
            name: updatedRow.name, 
            email: updatedRow.email, 
            status: updatedRow.status
        }), {
            onSuccess: () => {
                alert('Data has been saved!');
                router.get(route('cms.users.index'));
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    };

    const handlePageChange = (page) => {
        router.get(route('cms.users.index', { page }));
    };

    const columns = [
        { Header: 'Name', accessor: 'name', editable: true },
        { Header: 'Email', accessor: 'email', editable: true },
        { Header: 'Status Active', accessor: 'status', editable: true },   
    ];

    // Filter user list based on search query
    const filteredUserList = userList.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="flex">
                <Sidebar active_users={true} />
                <main className="flex-1 flex flex-col items-center p-10 bg-gray-800 text-dark-text">
                    <div className="bg-dark-card-bg text-dark-text p-8 rounded-lg shadow-md w-full max-w-4xl">
                        <h2 className="text-2xl font-extrabold text-center mb-6 text-custom-blue-light">Users List</h2>
                        {/* Search Input */}
                        <div className="mb-4">
                            <input
                                type="text"
                                name="search"
                                value={searchQuery}
                                onChange={handleInputChange}
                                placeholder="Search users..."
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <CMSTable
                            columns={columns}
                            data={filteredUserList} // Use filtered data
                            handleSave={handleSave}
                            handleDelete={handleDelete}
                            idAccessor={'user_id'}
                        />
                    </div>
                    <div className="bg-dark-card-bg text-dark-text p-4 rounded-lg shadow-md w-full max-w-4xl mt-2">
                        <Pagination
                            currentPage={users.current_page}
                            lastPage={users.last_page}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </main>
            </div>
        </>
    );
}

export default CMSUsers;