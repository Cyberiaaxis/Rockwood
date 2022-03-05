import React from "react";

// this is the context itself
export const AuthContext = React.createContext({});

// this is the provider
// it will hold your context's model { loggedIn: boolean, user: something }
export const AuthContextProvider = ({ children }) => {
	const [model, setModel] = React.useState({
		setUser: user => setModel(m => Object.assign({}, m, { loggedIn: true, user })),
		unsetUser: user => setModel(m => Object.assign({}, m, { loggedIn: false, user: undefined }))
	})
	return (
		<AuthContext.Provider value={model}>
			{children}
		</AuthContext.Provider>
	)
}
