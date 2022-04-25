import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
// reactstrap components

// reactstrap components
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";

// core components
import PanelHeader from "components/kshirot/PanelHeader/PanelHeader.js";

import GdodHistoryEditPageSortingTable from "components/kshirot/GdodHistoryEditPageSortingTable/SortingTable";
import Onekshirot from "views/kshirot/kshirotforms/onekshirot";

import GdodTrainingHistoryEditPageSortingTable from "components/kshirot/GdodTrainingHistoryEditPageSortingTable/SortingTable";
import Onetraining from "views/kshirot/trainingforms/OneTraining";

import OpenCardnew from "components/kshirot/OpenCardnew/OpenCardnew";

const UserGdodKal = ({ gdod, user }) => {
  const GdodNameHeader = (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h1 style={{ color: "white", textAlign: "center" }}>
        {gdod.name} - חי״ר קל
      </h1>
    </Container>
  );

  const UserGdodHistoryEditPageSortingTablecardheadline = (
    <span>היסטורית כשירויות</span>
  );

  const UserGdodTrainingHistoryEditPageSortingTablecardheadline = (
    <span>היסטורית אימונים</span>
  );

  return (
    <>
      <Button>
        <Link to="/kshirottree" style={{ color: "white" }}>
          פתח עץ מסגרות
        </Link>
      </Button>
      <PanelHeader content={GdodNameHeader} />
      <Container style={{ paddingTop: "20px" }}>
        <Card>
          <CardHeader>
            <CardTitle
              tag="h4"
              style={{ direction: "rtl", textAlign: "right" }}
            >
              כשירות נוכחית
            </CardTitle>

            {/*headline*/}
          </CardHeader>
          <CardBody style={{ direction: "rtl", textAlign: "right" }}>
            {gdod.kshirot ? (
              <>
                <Onekshirot id={gdod.kshirot} />
                {user.kshirot === "1" ? null : (
                  <Link   to={{
                    pathname: `/edittipul/${gdod._id}/${gdod.kshirot}`,
                    state: {gdod}
               }}>
                    <button className="btn">ערוך כשירות</button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <h3>לא קיימת כשירות נוכחית</h3>
                {user.kshirot === "1" ? null : (
                  <>
                    <Link 
                    to={{
                        pathname: `/addtipul/${gdod._id}`,
                        state: {gdod}
                   }}>
                      <button className="btn">הוסף כשירות</button>
                    </Link>
                  </>
                )}
              </>
            )}
          </CardBody>
        </Card>
        {gdod.history ? (
          gdod.history.length != 0 ? (
            <>
              <OpenCardnew
                headline={UserGdodHistoryEditPageSortingTablecardheadline}
                content={<GdodHistoryEditPageSortingTable />}
              />
            </>
          ) : (
            <>
              <Card style={{ direction: "rtl", textAlign: "right" }}>
                <h3>לא קיימת היסטוריית כשירויות</h3>
              </Card>
            </>
          )
        ) : null}
      </Container>
      <Container style={{ paddingTop: "20px" }}>
        <Card>
          <CardHeader>
            <CardTitle
              tag="h4"
              style={{ direction: "rtl", textAlign: "right" }}
            >
              אימון פלגות טנ"א נוכחי
            </CardTitle>
            {/*headline*/}
          </CardHeader>
          <CardBody style={{ direction: "rtl", textAlign: "right" }}>
            {gdod.training ? (
              <>
                <Onetraining id={gdod.training} />
                {user.kshirot === "1" ? null : (
                  <Link to={`/edittraining/${gdod._id}/${gdod.training}`}>
                    <button className="btn">ערוך אימון</button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <h3>לא קיים אימון נוכחי</h3>
                {user.kshirot === "1" ? null : (
                  <>
                    <Link to={`/addtraining/${gdod._id}`}>
                      <button className="btn">הוסף אימון</button>
                    </Link>
                  </>
                )}
              </>
            )}
          </CardBody>
        </Card>
        {gdod.traininghistory && gdod.traininghistory.length != 0 ? (
          <>
            <OpenCardnew
              headline={UserGdodTrainingHistoryEditPageSortingTablecardheadline}
              content={<GdodTrainingHistoryEditPageSortingTable />}
            />
          </>
        ) : (
          <>
            <Card style={{ direction: "rtl", textAlign: "right" }}>
              <h3>לא קיימת היסטוריית אימונים</h3>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};
export default withRouter(UserGdodKal);
