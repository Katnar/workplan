import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Router, Route, Switch, Redirect, withRouter } from "react-router-dom";

/*////////////////////////////////////////////////////////////*/
import AdminRoute from "auth/AdminRoute.js";
import GdodRoute from "auth/GdodRoute";
import HativaRoute from "auth/HativaRoute";
import OgdaRoute from "auth/OgdaRoute";
import PikodRoute from "auth/PikodRoute";
/*////////////////////////////////////////////////////////////*/

/*////////////////////////////////////////////////////////////*/
import AddTipulScreen from "layouts/kshirot/kshirotlayouts/AddTipulScreen";
import EditTipulScreen from "layouts/kshirot/kshirotlayouts/EditTipulScreen";
import EditKshirotOnlyScreen from "layouts/kshirot/kshirotlayouts/EditKshirotOnlyScreen";

import AddTrainingScreen from "layouts/kshirot/traininglayouts/AddTrainingScreen";
import EditTrainingScreen from "layouts/kshirot/traininglayouts/EditTrainingScreen";
import EditTrainingOnlyScreen from "layouts/kshirot/traininglayouts/EditTrainingOnlyScreen";

import AddMatagScreen from "layouts/kshirot/mataglayouts/AddMatagScreen";
import EditMatagScreen from "layouts/kshirot/mataglayouts/EditMatagScreen";
import EditMatagOnlyScreen from "layouts/kshirot/mataglayouts/EditMatagOnlyScreen";
/*////////////////////////////////////////////////////////////*/

import AddMashaKshirotPikod from "layouts/kshirot/kshirotlayouts/masha/AddMashaKshirotPikod";
import EditMashaKshirotPikod from "layouts/kshirot/kshirotlayouts/masha/EditMashaKshirotPikod";
/*////////////////////////////////////////////////////////////*/
import KshirotTreeScreen from "layouts/kshirot/useradminscreens/KshirotTreeScreen";
import UserAdminEditPageScreen from "layouts/kshirot/useradminscreens/UserAdminEditPageScreen";
/*////////////////////////////////////////////////////////////*/

/*////////////////////////////////////////////////////////////*/
import UserGdodEditPageScreen from "layouts/kshirot/usergdodscreens/UserGdodEditPageScreen";
/*////////////////////////////////////////////////////////////*/

/*////////////////////////////////////////////////////////////*/
import UserHativaEditPageScreen from "layouts/kshirot/userhativascreens/UserHativaEditPageScreen";
/*////////////////////////////////////////////////////////////*/

/*////////////////////////////////////////////////////////////*/
import UserOgdaEditPageScreen from "layouts/kshirot/userogdascreens/UserOgdaEditPageScreen";
/*////////////////////////////////////////////////////////////*/

/*////////////////////////////////////////////////////////////*/
import UserPikodEditPageScreen from "layouts/kshirot/userpikodscreens/UserPikodEditPageScreen";
/*////////////////////////////////////////////////////////////*/

const Routeskshirot =
        (
                <>
                        {/*/////////Forms////////////*/}
                        {/*//kshirot//*/}
                        <Route path="/addtipul/:gdodid" exact component={AddTipulScreen} />
                        <Route path="/addtipul/:gdodid" exact component={AddTipulScreen} /> <Route path="/edittipul/:gdodid/:tipulid" exact component={EditTipulScreen} />
                        <Route path="/editkshirotonly/:tipulid/:gdodid" exact component={EditKshirotOnlyScreen} />
                        {/*//kshirot End//*/}
                        {/*//training//*/}
                        <Route path="/addtraining/:gdodid" exact component={AddTrainingScreen} />
                        <Route path="/edittraining/:gdodid/:trainingid" exact component={EditTrainingScreen} />
                        <Route path="/edittrainingonly/:trainingid/:gdodid" exact component={EditTrainingOnlyScreen} />
                        {/*//training End//*/}
                        {/*//matag//*/}
                        <Route path="/addmatag/:hativaid" exact component={AddMatagScreen} />
                        <Route path="/editmatag/:hativaid/:matagid" exact component={EditMatagScreen} />
                        <Route path="/editmatagonly/:matagid/:hativaid" exact component={EditMatagOnlyScreen} />
                        {/*//matag End//*/}
                        <Route path="/addmashakshirotpikod/:pikodid" exact component={AddMashaKshirotPikod} />
                        <Route path="/editmashakshirotpikod/:pikodid/:kshirotid" exact component={EditMashaKshirotPikod} />
                       
                        {/*/////////Forms End////////*/}

                        {/*///////////////////////////////////////////Admin User/////////////////////////////////////////////////*/}
                        <AdminRoute exact path="/kshirottree" exact component={KshirotTreeScreen} />
                        <AdminRoute exact path="/useradmineditpage" exact component={UserAdminEditPageScreen} />
                        <AdminRoute exact path="/useradmineditpage/:pikodid" exact component={UserAdminEditPageScreen} />
                        {/*///////////////////////////////////////////Admin User End//////////////////////////////////////////////*/}

                        {/*////////////////////////////////////////Gdod User//////////////////////////////////////////////////*/}
                        <GdodRoute path="/usergdodeditpage/:gdodid" exact component={UserGdodEditPageScreen} />
                        <GdodRoute path="/usergdodeditpage/:pikodid/:ogdaid/:hativaid/:gdodid" exact component={UserGdodEditPageScreen} />
                        {/*//////////////////////////////////////Gdod User End////////////////////////////////////////////////*/}

                        {/*////////////////////////////////////////Hativa User//////////////////////////////////////////////////*/}
                        <HativaRoute path="/userhativaeditpage/:hativaid" exact component={UserHativaEditPageScreen} />
                        <HativaRoute path="/userhativaeditpage/:pikodid/:ogdaid/:hativaid" exact component={UserHativaEditPageScreen} />
                        {/*//////////////////////////////////////Hativa User End////////////////////////////////////////////////*/}

                        {/*////////////////////////////////////////Ogda User//////////////////////////////////////////////////*/}
                        <OgdaRoute path="/userogdaeditpage/:ogdaid" exact component={UserOgdaEditPageScreen} />
                        {/* tree view */}
                        <OgdaRoute path="/userogdaeditpage/:hativa/:ogdaid" exact component={UserOgdaEditPageScreen} />
                        
                        {/*//////////////////////////////////////Ogda User End////////////////////////////////////////////////*/}

                        {/*////////////////////////////////////////Pikod User//////////////////////////////////////////////////*/}
                        <PikodRoute path="/userpikodeditpage/:pikodid" exact component={UserPikodEditPageScreen} />
                        {/*//////////////////////////////////////Pikod User End////////////////////////////////////////////////*/}
                </>
        )
export default Routeskshirot;