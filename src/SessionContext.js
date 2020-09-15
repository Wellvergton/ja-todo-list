import React from "react";

export const SessionContext = React.createContext({
  isSigned: true,
  setIsSigned: () => {},
});
