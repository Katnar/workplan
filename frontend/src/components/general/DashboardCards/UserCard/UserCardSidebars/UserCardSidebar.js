import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from 'auth/index';

import UserAdminSidebar from './UserAdminSidebar';
import UserGdodSidebar from './UserGdodSidebar';
import UserHativaSidebar from './UserHativaSidebar';
import UserOgdaSidebar from './UserOgdaSidebar';
import UserPikodSidebar from './UserPikodSidebar';

function UserCardSidebar() {
  const { user } = isAuthenticated()

  return (
          <div className="sidebar-wrapper">
            {user.role === "0" ? <UserAdminSidebar /> :

              user.role === "1" ? <UserGdodSidebar /> :

                user.role === "2" ? <UserHativaSidebar /> :

                  user.role === "3" ? <UserOgdaSidebar /> :

                    user.role === "4" ? <UserPikodSidebar /> : null
            }
          </div>
  );
}

export default UserCardSidebar;
