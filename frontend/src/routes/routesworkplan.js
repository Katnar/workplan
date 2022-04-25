import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Router, Route, Switch, Redirect, withRouter } from "react-router-dom";

import AdminRoute from "auth/AdminRoute.js";
import GdodRoute from "auth/GdodRoute";
import HativaRoute from "auth/HativaRoute";
import OgdaRoute from "auth/OgdaRoute";
import PikodRoute from "auth/PikodRoute";


import AddTipulScreen from "layouts/workplan/adminscreens/TipulScreens/AddTipulScreen";
import EditTipulScreen from "layouts/workplan/adminscreens/TipulScreens/EditipulScreen";
import EditActiveTipulScreen from "layouts/workplan/adminscreens/TipulScreens/EditactivetipulScreen";

import AdminTableScreen from "layouts/workplan/adminscreens/AdminTableScreen";

import GdodWorkplanTableScreen from "layouts/workplan/gdodscreens/GdodWorkplanTableScreen";
import HativaWorkplanTableScreen from "layouts/workplan/hativascreens/HativaWorkplanTableScreen";
import OgdaWorkplanTableScreen from "layouts/workplan/ogdascreens/OgdaWorkplanTableScreen";
import PikodWorkplanTableScreen from "layouts/workplan/pikodscreens/PikodWorkplanTableScreen";

import UpKeepScreen from "layouts/workplan/adminscreens/AdminUpkeepScreen";
import GdodUpKeepScreen from "layouts/workplan/gdodscreens/GdodUpkeepScreen";
import HativaUpKeepScreen from "layouts/workplan/hativascreens/HativaUpkeepScreen";
import OgdaUpKeepScreen from "layouts/workplan/ogdascreens/OgdaUpkeepScreen";
import PikodUpKeepScreen from "layouts/workplan/pikodscreens/PikodUpkeepScreen";
import AdminUnitTableScreen from "layouts/workplan/adminscreens/AdminUnitTableScreen";
import CarProfileLayout from "layouts/workplan/CarProfileLayout";
import TipulProfileLayout from "layouts/workplan/TipulProfileLayout";
import ActiveTipulProfileLayout from "layouts/workplan/ActiveTipulProfileLayout";

import AdminCarsTableScreen from "layouts/workplan/adminscreens/AdminCarsTableScreen";
import GdodCarsTableScreen from "layouts/workplan/gdodscreens/GdodCarsTableScreen";
import HativaCarsTableScreen from "layouts/workplan/hativascreens/HativaCarsTableScreen";
import OgdaCarsTableScreen from "layouts/workplan/ogdascreens/OgdaCarsTableScreen";
import PikodCarsTableScreen from "layouts/workplan/pikodscreens/PikodCarsTableScreen";

import ExcelPageZshigra from "views/workplan/adminpages/excelpages/ExcelPageZshigra";
import ExcelPageZmplanlog from "views/workplan/adminpages/excelpages/ExcelPageZmplanlog";
import ExcelPageNexttreat from "views/workplan/adminpages/excelpages/ExcelPageNexttreat";
import ExcelUploadScreen from "layouts/workplan/adminscreens/ExcelUploadScreen";

import AdminAllHistoryTipuls from "layouts/workplan/adminscreens/AdminAllHistoryTipuls";
import GdodHistoryTipulsScreen from "layouts/workplan/gdodscreens/GdodHistoryTipulsScreen";
import HativaHistoryTipulsScreen from "layouts/workplan/hativascreens/HativaHistoryTipulsScreen";
import OgdaHistoryTipulsScreen from "layouts/workplan/ogdascreens/OgdaHistoryTipulsScreen";
import PikodHistoryTipulsScreen from "layouts/workplan/pikodscreens/PikodHistoryTipulsScreen";

import SettingScreen from "layouts/workplan/adminscreens/SettingScreen";

const Routesworkplan =
    (
        <>
            {/*/////////Forms////////////*/}
            {/*//tipuls//*/}
            <Route path="/addtipul" exact component={AddTipulScreen} />
            <Route path="/edittipul/:tipulid" exact component={EditTipulScreen} />
            <Route path="/editactivetipul/:tipulid" exact component={EditActiveTipulScreen} />
            <Route path="/carprofile/:carid" exact component={CarProfileLayout} />
            <Route path="/tipulprofile/:tipulid" exact component={TipulProfileLayout} />
            <Route path="/activetipulprofile/:tipulid" exact component={ActiveTipulProfileLayout} />
            {/*//tipuls End//*/}
            {/*/////////Forms End////////*/}

            {/*///////////////////////////////////////////Admin User/////////////////////////////////////////////////*/}
            <AdminRoute path="/workplantable" exact component={AdminTableScreen} />
            <AdminRoute path="/upkeep" exact component={UpKeepScreen} />
            <AdminRoute path="/unittable" exact component={AdminUnitTableScreen} />
            <AdminRoute path="/allcarstable" exact component={AdminCarsTableScreen} />
            <AdminRoute path="/xltablezshigra" exact component={ExcelPageZshigra} />
            <AdminRoute path="/xltablezmplanlog" exact component={ExcelPageZmplanlog} />
            <AdminRoute path="/xltablenexttreat" exact component={ExcelPageNexttreat} />
            <AdminRoute path="/xluploadscreen" exact component={ExcelUploadScreen} />
            <AdminRoute path="/allhistorytipuls" exact component={AdminAllHistoryTipuls} />
            <AdminRoute path="/setting" exact component={SettingScreen} />
            {/*///////////////////////////////////////////Admin User/////////////////////////////////////////////////*/}

            {/*////////////////////////////////////////Gdod User//////////////////////////////////////////////////*/}
            <GdodRoute path="/workplantablegdod/:gdodid" exact component={GdodWorkplanTableScreen} />
            <GdodRoute path="/gdodupkeep/:gdodid" exact component={GdodUpKeepScreen} />
            <GdodRoute path="/gdodcarstable/:gdodid" exact component={GdodCarsTableScreen} />
            <GdodRoute path="/gdodhistorytipuls/:gdodid" exact component={GdodHistoryTipulsScreen} />
            {/*//////////////////////////////////////Gdod User End////////////////////////////////////////////////*/}

            {/*////////////////////////////////////////Hativa User//////////////////////////////////////////////////*/}
            <HativaRoute path="/workplantablehativa/:hativaid" exact component={HativaWorkplanTableScreen} />
            <HativaRoute path="/hativaupkeep/:hativaid" exact component={HativaUpKeepScreen} />
            <HativaRoute path="/hativacarstable/:hativaid" exact component={HativaCarsTableScreen} />
            <HativaRoute path="/hativahistorytipuls/:hativaid" exact component={HativaHistoryTipulsScreen} />
            {/*//////////////////////////////////////Hativa User End////////////////////////////////////////////////*/}

            {/*////////////////////////////////////////Ogda User//////////////////////////////////////////////////*/}
            <OgdaRoute path="/workplantableogda/:ogdaid" exact component={OgdaWorkplanTableScreen} />
            <OgdaRoute path="/ogdaupkeep/:ogdaid" exact component={OgdaUpKeepScreen} />
            <OgdaRoute path="/ogdacarstable/:ogdaid" exact component={OgdaCarsTableScreen} />
            <OgdaRoute path="/ogdahistorytipuls/:ogdaid" exact component={OgdaHistoryTipulsScreen} />
            {/*//////////////////////////////////////Ogda User End////////////////////////////////////////////////*/}

            {/*////////////////////////////////////////Pikod User//////////////////////////////////////////////////*/}
            <PikodRoute path="/workplantablepikod/:pikodid" exact component={PikodWorkplanTableScreen} />
            <PikodRoute path="/pikodupkeep/:pikodid" exact component={PikodUpKeepScreen} />
            <PikodRoute path="/pikodcarstable/:pikodid" exact component={PikodCarsTableScreen} />
            <PikodRoute path="/pikodhistorytipuls/:pikodid" exact component={PikodHistoryTipulsScreen} />
            {/*//////////////////////////////////////Pikod User End////////////////////////////////////////////////*/}
        </>
    )

export default Routesworkplan;