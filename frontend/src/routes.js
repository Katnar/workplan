import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import RoutesGeneral from "./routes/routesgeneral";

import RoutesWorkplan from "./routes/routesworkplan";

import Routeskshirot from "./routes/routeskshirot";

const routes = (
    <>
        {Routeskshirot}
        {RoutesWorkplan}
        {RoutesGeneral}
    </>
)

export default routes