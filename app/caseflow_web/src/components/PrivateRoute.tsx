import React, { useEffect, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserService from "../services/UserService";
import {
  setAuthToken,
  setAuthenticated,
  setUserDetails,
} from "../reducers/authReducer";
import Loading from "../containers/Loading";

import Home from "./Home/Home";
import CaseDocuments from "./CaseDocuments/CaseDocuments";

import Cases from "./Cases/Cases";
import Dashboard from "./Dashboard/Dashboard";
import CaseDetails from "./CaseDetails/CaseDetails";
import NewCaseComponent from "./NewCase/NewCaseComponent";
import { State } from "../interfaces/stateInterface";
import AdvancedSearch from "./AdvanedSearch/advancedSearch";
import Configurations from "./configurations/configurations";
import NatsSubscription from "./Nats/NatsSubscription";
import Contacts from "./Contacts/Contacts";
import ContactDetail from "./ContactDetails/ContactDetails";

const NotFound = lazy(() => import("./NotFound/NotFound"));

const PrivateRoute = React.memo(({ store }: any) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: State) => state.auth.isAuthenticated);
  useEffect(() => {
    if (store) {
    }
    UserService.initKeycloak(store, (res: any) => {
      const { token, userInfo } = res || {};
      userInfo.then((res: any) => res && dispatch(setUserDetails(res)));
      dispatch(setAuthToken(token));
      dispatch(setAuthenticated(true));
    });
  }, [store, dispatch]);

  return (
    <>
      {isAuth ? (
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path="nats" element={<NatsSubscription />} />
            <Route path="cases">
              <Route index element={<Cases />} />
              <Route path="create" element={<NewCaseComponent />} />
              <Route path=":id/edit" element={<NewCaseComponent />} />
              <Route path=":id/details" element={<CaseDetails />} />
            </Route>
            <Route path="contacts">
              <Route index element={<Contacts />} />
              {/* <Route path="create" element={<Contacts />} />  */}
              <Route path=":id/details" element={<ContactDetail />} />
            </Route>
            <Route path="documents" element={<CaseDocuments />} />
            <Route path="advancedSearch" element={<AdvancedSearch />} />
            <Route path="configurations" element={<Configurations />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Loading />
      )}
    </>
  );
});

export default PrivateRoute;
