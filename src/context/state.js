import React from "react";
import { SuperContext } from "./context";
import { userReducer } from "./reducer";
import { useReducer } from "react";
import Axios from "axios";

function SuperHeroState(props) {
  const initialState = {
    load: true,
    err: "",
    data: [],
    filter: [],
    byregion: [],
    darkclick : true
  };
  const [state, dispatch] = useReducer(userReducer, initialState);
  const fetch = () => {
    Axios.get(`https://restcountries.eu/rest/v2/all`)
      .then((res) => dispatch({ type: "success", payload: res.data }))
      .catch((err) => {
        dispatch({ type: "fail", payload: "network error" });
      });
  };
  const search = (cont, region) => {
    dispatch({ type: "search", payload1: cont, payload2: region });
  };
  const getregion = (reg) => {
    dispatch({ type: "byreg", payload2: reg });
  };
const godark=()=>{
  dispatch({ type: "dark"});
}
  return (
    <SuperContext.Provider
      value={{
        load: state.load,
        data: state.data,
        err: state.err,
        fetch,
        filter: state.filter,
        search,
        byregion: state.byregion,
        getregion,
        darkclick:state.darkclick,
        godark
      }}
    >
      {props.children}
    </SuperContext.Provider>
  );
}

export default SuperHeroState;
