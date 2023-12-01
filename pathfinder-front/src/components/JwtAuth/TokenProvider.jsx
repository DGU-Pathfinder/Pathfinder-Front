import React, { useState } from "react";
import TokenContext from "./TokenContext";

function TokenProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    return (
        <TokenContext.Provider
            value={{
                accessToken, setAccessToken,
                refreshToken, setRefreshToken
            }}
        >
            {children}
        </TokenContext.Provider>
    )
}

export default TokenProvider;