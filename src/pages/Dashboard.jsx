import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import ReservationForm from "../components/ReservationForm";
import ReservationTable from "../components/ReservationTable";
import "../styles/Dashboard.css";

import { useState } from "react";

function Dashboard() {

    const [refreshFlag, setRefreshFlag] =
        useState(false);

    const refreshReservations = () => {

        setRefreshFlag(prev => !prev);
    };

    return (
        <>
            <Navbar />

            <div className="dashboard-container">

                <DashboardCards />

                <ReservationForm
                    onReservationCreated={
                        refreshReservations
                    }
                />

                <ReservationTable
                    refreshFlag={refreshFlag}
                />

            </div>
        </>
    );
}

export default Dashboard;