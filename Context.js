import React, { createContext, useContext, useState, useEffect } from "react";
const KaiContext = React.createContext(); // creates a context

export function useKai() {
  return useContext(KaiContext);
}

export const KaiProvider = ({ children }) => {
  const [featureAccess, setFeatureAccess] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  return (
    <KaiContext.Provider
      value={{
        // these values will be passed down to any component and made available under budget provider
        featureAccess,
        setFeatureAccess,
        openLoginModal,
        setOpenLoginModal,
      }}
    >
      {children}
    </KaiContext.Provider>
  );
};
