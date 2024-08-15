import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext(null);


export const ProfileProvider = ({ children }) => {
    const [playerId, setPlayerId] = useState(null);

    return (
        <ProfileContext.Provider value={{ playerId, setPlayerId }}>
            {children}
        </ProfileContext.Provider>
    );
};


export const useProfile = () => useContext(ProfileContext);
