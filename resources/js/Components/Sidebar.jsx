import React, { useState, useEffect } from 'react';
import Logo from '../assets/images/just-text.png';
import PropTypes from 'prop-types';
import { usePage, Link, router } from '@inertiajs/react';


function Sidebar(props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { auth } = usePage().props;
  const user = auth.user;
  useEffect(() => {
    const toggleButton = document.getElementById('toggle-button');
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    const handleToggle = () => {
      setIsCollapsed(!isCollapsed);
    };

    const handleMouseEnter = (event) => {
      if (!isCollapsed) {
        const submenu = event.currentTarget.querySelector('.submenu');
        if (submenu) {
          submenu.classList.add('expanded');
        }
      }
    };

    const handleMouseLeave = (event) => {
      if (!isCollapsed) {
        const submenu = event.currentTarget.querySelector('.submenu');
        if (submenu) {
          submenu.classList.remove('expanded');
        }
      }
    };

    toggleButton.addEventListener('click', handleToggle);

    sidebarItems.forEach(item => {
      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      toggleButton.removeEventListener('click', handleToggle);
      sidebarItems.forEach(item => {
        item.removeEventListener('mouseenter', handleMouseEnter);
        item.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isCollapsed]);

  useEffect(() => {
    const toggleIcon = document.getElementById('toggle-icon');
    const logoutText = document.getElementById('logout-text');
    const submenuElements = document.querySelectorAll('.submenu');

    if (isCollapsed) {
      toggleIcon.innerHTML = '<polyline points="9 6 15 12 9 18"></polyline>';
      logoutText.style.display = 'none';
      submenuElements.forEach(menu => menu.classList.remove('expanded'));
    } else {
      toggleIcon.innerHTML = '<polyline points="15 6 9 12 15 18"></polyline>';
      logoutText.style.display = 'block';
    }
  }, [isCollapsed]);

  return (
    // <!-- Sidebar -->
    <aside id="sidebar" className={`h-screen ${isCollapsed ? 'w-20' : 'w-64'} bg-dark-bg border-r border-dark-border shadow-sm flex flex-col sticky top-0 transition-width duration-300`}>
      {/* <!-- Header --> */}
      <div className="p-4 pb-2 flex justify-between items-center">
        {!isCollapsed && (
          <img src={Logo} id="sidebar-logo" className="overflow-hidden transition-all w-60" alt="Logo" />
        )}
        <button id="toggle-button" className="p-1.5 rounded-lg bg-dark-hover hover:bg-dark-border transition duration-300">
          <svg id="toggle-icon" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dark-text" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {isCollapsed ? (
              <polyline points="9 6 15 12 9 18"></polyline>
            ) : (
              <polyline points="15 6 9 12 15 18"></polyline>
            )}
          </svg>
        </button>
      </div>
  
      {/* <!-- User Info --> */}
      <div className="flex items-center p-4">
        <img   src={`https://ui-avatars.com/api/?background=3D5A80&color=F9FAFB&bold=true&name=${user ? user.name.split(' ').join('+') : 'Guest'}`} alt="User Avatar" className="w-10 h-10 rounded-md" />
        {!isCollapsed && (
          <div className="ml-3 sidebar-item-text">
            <h4 className="font-semibold text-dark-text">{user.name}</h4>
            <span className="text-xs text-gray-400">{user.email}</span>
          </div>
        )}
      </div>
  
    {/* <!-- Menu Items --> */}
    <ul className="flex-1 px-3">
      {/* <!-- Film Item --> */}
      <li className={`relative flex flex-col py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors text-dark-text sidebar-item group ${props.active_validate||props.active_input_new_film ? 'active' : ''}`}>
        <div className="flex items-center rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 ${isCollapsed ? 'w-6 h-6' : 'w-8 h-8'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>     
          {!isCollapsed && (
            <span className="sidebar-item-text group-hover:text-dark-accent ml-2">Film</span>
          )}
        </div>
        {isCollapsed && (
          <div className="tooltip absolute left-full rounded-md px-2 py-1 ml-6 bg-dark-hover text-dark-text text-sm -translate-x-3 text-center">
            Film
          </div>
        )}
        {/* <!-- Submenu --> */}
        <ul className={`submenu pl-8 mt-1 transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100 group-hover:opacity-100'}`}>
          <li className={`py-2 px-3 text-gray-400 transition-colors rounded-md hover:bg-dark-card-bg ${props.active_validate ? 'active' : ''}`}>
            <Link href="/cmsdrama" className="w-full h-full block">Validate</Link>
          </li>
          <li className={`py-2 px-3 text-gray-400 transition-colors rounded-md hover:bg-dark-card-bg ${props.active_input_new_film ? 'active' : ''}`}>
            <Link href="/cmsdramainput" className="w-full h-full block">Input New Film</Link>
          </li>
        </ul>
        <div className={`tooltip absolute left-full rounded-md px-2 py-1 ml-6 bg-dark-hover text-dark-text text-sm -translate-x-3 text-center ${isCollapsed ? 'hidden' : ''}`}>
          Film
        </div>
      </li>
      {/* <!-- Countries Item --> */}
      <li className={`relative flex flex-col py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors text-dark-text sidebar-item group ${props.active_country ? 'active' : ''}`}>
        <div className="flex items-center">
        <Link href="/cmscountries" className="flex items-center rounded-md w-full"> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 ${isCollapsed ? 'w-6 h-6' : 'w-8 h-8'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>        
            {!isCollapsed && (
              <span className="sidebar-item-text group-hover:text-dark-accent ml-2">Countries</span>
            )}
          </Link>
        </div>
        <div className={`tooltip absolute left-full rounded-md px-2 py-1 ml-6 bg-dark-hover text-dark-text text-sm -translate-x-3 text-center ${isCollapsed ? '' : 'hidden group-hover:block'}`}>
          Countries
        </div>
      </li>
      {/* <!-- Awards Item --> */}
      <li className={`relative flex flex-col py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors text-dark-text sidebar-item group ${props.active_awards ? 'active' : ''}`}>
        <div className="flex items-center">
            <Link href="/cmsawards" className="flex items-center rounded-md w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 ${isCollapsed ? 'w-6 h-6' : 'w-8 h-8'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
            </svg>          
            {!isCollapsed && (
              <span className="sidebar-item-text group-hover:text-dark-accent ml-2">Awards</span>
            )}
          </Link>
        </div>
          <div className={`tooltip absolute left-full rounded-md px-2 py-1 ml-6 bg-dark-hover text-dark-text text-sm -translate-x-3 text-center ${isCollapsed ? '' : 'hidden group-hover:block'}`}>
            Awards
          </div>
      </li>
      {/* <!-- Genres Item --> */}
      <li className={`relative flex flex-col py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors text-dark-text sidebar-item group ${props.active_genres ? 'active' : ''}`}>
        <div className="flex items-center">
          <Link href="/cmsgenres" className="flex items-center rounded-md w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 ${isCollapsed ? 'w-6 h-6' : 'w-8 h-8'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
            </svg>              
            {!isCollapsed && (
              <span className="sidebar-item-text group-hover:text-dark-accent ml-2">Genres</span>
            )}
          </Link>
        </div>
          <div className={`tooltip absolute left-full rounded-md px-2 py-1 ml-6 bg-dark-hover text-dark-text text-sm -translate-x-3 text-center ${isCollapsed ? '' : 'hidden group-hover:block'}`}>
            Genres
          </div>
      </li>
      {/* <!-- Actors Item --> */}
      <li className={`relative flex flex-col py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors text-dark-text sidebar-item group ${props.active_actors ? 'active' : ''}`}>
        <div className="flex items-center">
          <Link href="/cmsactors" className="flex items-center rounded-md w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 ${isCollapsed ? 'w-6 h-6' : 'w-8 h-8'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>                     
            {!isCollapsed && (
              <span className="sidebar-item-text group-hover:text-dark-accent ml-2">Actors</span>
            )}
          </Link>
        </div>
          <div className={`tooltip absolute left-full rounded-md px-2 py-1 ml-6 bg-dark-hover text-dark-text text-sm -translate-x-3 text-center ${isCollapsed ? '' : 'hidden group-hover:block'}`}>
            Actors
          </div>
      </li>
      {/* <!-- Comments Item --> */}
      <li className={`relative flex flex-col py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors text-dark-text sidebar-item group ${props.active_reviews ? 'active' : ''}`}>
        <div className="flex items-center">
          <Link href="/cmsreviews" className="flex items-center rounded-md w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 ${isCollapsed ? 'w-6 h-6' : 'w-8 h-8'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>                           
            {!isCollapsed && (
              <span className="sidebar-item-text group-hover:text-dark-accent ml-2">Reviews</span>
            )}
          </Link>
        </div>
          <div className={`tooltip absolute left-full rounded-md px-2 py-1 ml-6 bg-dark-hover text-dark-text text-sm -translate-x-3 text-center${isCollapsed ? '' : 'hidden group-hover:block'}`} >
            Reviews
          </div>
      </li>
      {/* <!-- Users Item --> */}
      <li className={`relative flex flex-col py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors text-dark-text sidebar-item group ${props.active_users ? 'active' : ''}`}>
        <div className="flex items-center">
          <Link href="/cmsusers" className="flex items-center rounded-md w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 ${isCollapsed ? 'w-6 h-6' : 'w-8 h-8'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>                                 
            {!isCollapsed && (
              <span className="sidebar-item-text group-hover:text-dark-accent ml-2">Users</span>
            )}
          </Link>
        </div>
          <div className={`tooltip absolute left-full rounded-md px-2 py-1 ml-6 bg-dark-hover text-dark-text text-sm -translate-x-3 text-center ${isCollapsed ? '' : 'hidden group-hover:block'}`}>
            Users
          </div>
      </li>
      </ul>
  
      {/* <!-- Footer/Logout --> */}
      <div className="border-t border-dark-border flex items-center p-3 mt-auto">
          <button id="logout-btn" className="flex items-center text-dark-text hover:text-dark-accent transition duration-300" onClick={() => router.post('/logout')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V5a3 3 0 013-3h5a3 3 0 013 3v1" />
            </svg>
            <span id="logout-text" className="ml-2">Logout</span>
          </button>
      </div>
    </aside>
);
};

Sidebar.propTypes = {
  active_country: PropTypes.bool,
  active_awards: PropTypes.bool,
  active_genres: PropTypes.bool,
  active_actors: PropTypes.bool,
  active_comments: PropTypes.bool,
  active_users: PropTypes.bool,
  active_validate: PropTypes.bool,
  active_input_new_film: PropTypes.bool
};

export default Sidebar;