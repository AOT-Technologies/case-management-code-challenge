import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import authReducer from "../reducers/authReducer";
import documentsReducer from "../reducers/documentsReducer";
import applicationReducer from "../reducers/applicationReducer";
import caseReducer from "../reducers/newCaseReducer";
import caseHistoryReducer from "../reducers/caseHistoryReducer";
import constantsReducer from "../reducers/constantsReducer";
import lobReducer from "../reducers/lobReducer";
import taskReducer from "../reducers/taskReducer";
import contactReducer from "../reducers/newContactReducer";
import individualReducer from "../reducers/newIndividualReducer";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    auth: authReducer,
    documents: documentsReducer,
    app: applicationReducer,
    cases: caseReducer,
    caseHistory: caseHistoryReducer,
    constants: constantsReducer,
    lob: lobReducer,
    tasks: taskReducer,
    contacts: contactReducer,
    individuals: individualReducer,
  }),
  middleware: [routerMiddleware],
});

export const history = createReduxHistory(store);
