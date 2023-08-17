import {createContext, useReducer,} from "react";
  
  export const ToggleContext = createContext();
  
  export const ToggleContextProvider = ({ children }) => {
    const INITIAL_STATE = {
      toggle:(window.innerHeight>window.innerWidth),
      navtoggle:true
    };
  
    const toggleReducer = (state, action) => {
      switch (action.type) {
        case "Resize":
          return {
            toggle:action.payload,
            navtoggle:state.navtoggle
          };
        case "Nav_Toggle":
            return{
                toggle:state.toggle,
                navtoggle:!(state.navtoggle)
            }
        default:
          return state;
      }
    };
  
    const [state, dispatch1] = useReducer(toggleReducer, INITIAL_STATE);
  
    return (
      <ToggleContext.Provider value={{ data1:state, dispatch1 }}>
        {children}
      </ToggleContext.Provider>
    );
  };