import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import ReservationForm from "../components/ReservationForm";
import ReservationActions from "../components/ReservationActions";
import ReservationTable from "../components/ReservationTable";
import "../styles/Dashboard.css";

function Dashboard() {

  return (
    <>
      <Navbar />

      <div className="dashboard-container">

        <h1 className="dashboard-title">
          Smart Parking Dashboard
        </h1>

        <DashboardCards />

        <ReservationForm />

<ReservationTable/>
      </div>
    </>
  );
}

export default Dashboard;