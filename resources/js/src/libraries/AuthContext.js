import React from "react";

// this is the context itself
export const AuthContext = React.createContext({});

// this is the provider
// it will hold your context's model { loggedIn: boolean, user: something }
export default function AuthContextProvider({ children }) {
    const [model, setModel] = React.useState({
        // setLoggedIn: loggedIn => setModel(m => Object.assign({}, m, { loggedIn })),
        setUser: user => setModel(m => Object.assign({}, m, { user })),
        unsetUser: user => setModel(m => Object.assign({}, m, { loggedIn: false, user: undefined })),
        setStaffPanelAccess: staffPanelAccess => setModel(m => Object.assign({}, m, { staffPanelAccess })),
    })
    // it seems it's never getting to this point. Are you using he AuthContextProvider?
    // console.log('***** AuthContext: model: ', model); //i think i am issing this
    return (
        <AuthContext.Provider value={model}>
            {children}
        </AuthContext.Provider>
    )
}
