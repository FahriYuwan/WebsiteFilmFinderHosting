import React, { useState } from "react";
import Sidebar from "../../../Components/Sidebar";
import Button from "../../../Components/Button";
import InputField from "../../../Components/InputField";
import CMSTable from "../../../Components/CMS/CMSTable";
import { usePage, useForm } from "@inertiajs/react";
import Pagination from '../../../Components/Pagination';

function CMSActors() {

    const { countries, actors } = usePage().props;
    const [ActorList, setActors] = useState(actors);
    const [Country, setCountry] = useState('');
    const [Actor, setActor] = useState('');
    const [Birthdate, setBirthdate] = useState('');
    const [link_picture, setLinkPicture] = useState('');
    const { post, delete: destroy, put } = useForm();

    const [searchQuery, setSearchQuery] = useState('');

    // Pagination states for client-side
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

    console.log(ActorList,Country);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'country_name') {
            setCountry(value);
        } else if (name === 'Actor') {
            setActor(value);
        } else if (name === 'Birthdate') {
            setBirthdate(value);
        } else if (name === 'Picture') {
            setLinkPicture(value);
        } else if (name === 'search') {
            setSearchQuery(value);
            setCurrentPage(1); // Reset to first page on search
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('cms.actors.store', {
            countries_id: Country,
            actor_name: Actor,
            birthdate: Birthdate,
            url_actor: link_picture
        }), {
            onSuccess: () => {
                setCountry('');
                setActor('');
                setBirthdate('');
                setLinkPicture('');
                alert('Actor has been added!');
                window.location.reload(); // Reload to fetch updated data
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    };

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this actor?')) {
            return;
        } else {
            destroy(route('cms.actors.destroy', { actor_id: id }), {
                onSuccess: () => {
                    alert('Actor has been deleted!');
                    setActors(prev => prev.filter(actor => actor.actor_id !== id));
                },
                onError: (errors) => {
                    console.log(errors);
                }
            });
        }
    };

    const handleSave = (id, data) => {
        alert( 'ACTOR ID: ' + id + 'actor_name: ' + data.actor_name + 'birthdate: ' + data.birthdate);
        put(route('cms.actors.update', { actor_id: id, actor_name: data.actor_name, birthdate: data.birthdate }), {
            onSuccess: () => {
                alert('Actor has been updated!');
                setActors(prev => prev.map(actor => actor.actor_id === id ? { ...actor, ...data } : actor));
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    };

    const columns = [
        { Header: 'Country', accessor: { name: 'countries', child_accessor: 'country_name' } },
        { Header: 'Actor', accessor: 'actor_name', editable: true },
        { Header: 'Birthdate', accessor: 'birthdate', editable: true },
        { Header: 'Picture', accessor: 'url_actor' },
    ];

    // Filter actor list based on search query
    const filteredActorList = ActorList.filter(actor =>
        actor.actor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        actor.birthdate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        actor.countries.country_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate indices for current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredActorList.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(filteredActorList.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="flex">
                <Sidebar active_actors={true} />
                <div className="flex-1 flex flex-col items-center p-10 bg-gray-800 text-dark-text">
                    <div className="bg-dark-card-bg text-dark-text p-8 rounded-lg shadow-md w-full max-w-xl mb-8">
                        <h2 className="text-3xl font-extrabold text-center mb-6 text-custom-blue-light">Add Actor</h2>
                        <form id="actor-form" className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-dark-text">Country</label>
                                <InputField
                                    id="countries_id"
                                    name="country_name"
                                    type="select"
                                    placeholder="Enter a country"
                                    className="mt-2 block w-full px-4 py-3 text-black border border-gray-300 shadow-sm focus:outline-none focus:ring-custom-blue-light focus:border-custom-blue-light sm:text-sm"
                                    value={countries}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Country</option>
                                    {countries.map(country => (
                                        <option key={country.countries_id} value={country.countries_id}>{country.country_name}</option>
                                    ))}
                                </InputField>
                            </div>
                            <div>
                                <label htmlFor="actor" className="block text-sm font-medium text-dark-text">Actor</label>
                                <InputField
                                    id="actor"
                                    name="Actor"
                                    type="text"
                                    placeholder="Enter an actor"
                                    className="mt-2 block w-full px-4 py-3 text-black border border-gray-300 shadow-sm focus:outline-none focus:ring-custom-blue-light focus:border-custom-blue-light sm:text-sm"
                                    value={Actor}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="birthdate" className="block text-sm font-medium text-dark-text">Birthdate</label>
                                <InputField
                                    id="birthdate"
                                    name="Birthdate"
                                    type="date"
                                    placeholder="Enter a birthdate"
                                    className="mt-2 block w-full px-4 py-3 text-black border border-gray-300 shadow-sm focus:outline-none focus:ring-custom-blue-light focus:border-custom-blue-light sm:text-sm"
                                    value={Birthdate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="link_picture" className="block text-sm font-medium text-dark-text">Upload Picture</label>
                                <InputField
                                    id="picture"
                                    name="Picture"
                                    type="text"
                                    placeholder="Enter link for picture"
                                    className="mt-2 block w-full px-4 py-3 text-black border border-gray-300 shadow-sm focus:outline-none focus:ring-custom-blue-light focus:border-custom-blue-light sm:text-sm"
                                    value={link_picture}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-dark-accent text-dark-text py-3 px-4 hover:bg-dark-hover focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-dark-accent text-sm font-medium"
                                text="Submit"
                            />
                        </form>
                    </div>
                    <div className="bg-dark-card-bg p-8 rounded-lg shadow-md w-full max-w-4xl">
                        <h2 className="text-2xl font-extrabold text-center mb-6 text-custom-blue-light">Actors List</h2>
                        {/* Search Input */}
                        <div className="mb-4">
                            <input
                                type="text"
                                name="search"
                                value={searchQuery}
                                onChange={handleInputChange}
                                placeholder="Search actors..."
                                className="w-full p-2 border border-gray-300 rounded text-black"
                            />
                        </div>
                        <CMSTable
                            columns={columns}
                            data={currentItems} // Use current page items
                            handleSave={handleSave}
                            handleDelete={handleDelete}
                            idAccessor={'actor_id'}
                        />
                    </div>
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

export default CMSActors;