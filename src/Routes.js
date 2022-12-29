import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Page404 from './components/Page404/Page404';
import Login from './containers/Login/Login';
import Dashboard from './containers/Dashboard/VisitPlan/TodayPlan';
import PlanDetails from './containers/Dashboard/VisitPlan/PlanDetails';
import ViewVisitPlan from './containers/Dashboard/VisitPlan/ViewVisitPlan';
import ViewSubmittedPlan from './containers/Dashboard/VisitPlan/ViewSubmittedPlan';
import VisitGuidelineMatrix from './containers/Dashboard/VisitPlan/VisitGuidelineMatrix';
import NextMonthPlan from './containers/Dashboard/VisitPlan/NextMonthPlan';
import Todos from './containers/Dashboard/VisitPlan/TodoList';
import AddVisit from './containers/Dashboard/VisitPlan/AddVisit';
import AdHocVisit from './containers/Dashboard/VisitPlan/AdHocVisit';
import ShipToCreation from './containers/Dashboard/VisitPlan/ShipToCreation';


function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={Login} />
			<Route path="/Dashboard" exact component={Dashboard} />
			<Route path="/PlanDetail" exact component={PlanDetails} />
			<Route path="/ViewVisitPlan" exact component={ViewVisitPlan} />
			<Route path="/ViewSubmittedPlan" exact component={ViewSubmittedPlan} />
			<Route path="/VisitGuidelineMatrix" exact component={VisitGuidelineMatrix} />
			<Route path="/NextMonthPlan" exact component={NextMonthPlan} />
			<Route path="/Todos" exact component={Todos} />
			<Route path="/AddVisit" exact component={AddVisit} />
			<Route path="/AdHocVisit" exact component={AdHocVisit} />
			<Route path="/ShipToCreation" exact component={ShipToCreation} />
			<Route component={Page404} />
		</Switch>
	);
}

export default Routes;