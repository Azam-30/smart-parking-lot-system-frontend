import { useState } from "react";
import api from "../api/axios";
import "../styles/ReservationForm.css";

function ReservationForm() {

  const [reservation, setReservation] = useState({
    registrationNumber: "",
    vehicleType: "CAR",
    ev: false
  });

  const [result, setResult] = useState(null);

const reserve = async () => {

    try {

        const response =
            await api.post(
                "/api/reservations",
                reservation
            );

        setResult(response.data);

        alert(
            "✅ Parking slot reserved successfully"
        );

        if(onReservationCreated){
            onReservationCreated();
        }

    } catch(error){

        alert(
            error.response?.data?.message
        );
    }

  };

  return (

    <div className="reservation-card">

      <h2>Reserve Parking Slot</h2>

      <div className="form-grid">

        <input
          className="input-field"
          placeholder="Registration Number"
          onChange={(e) =>
            setReservation({
              ...reservation,
              registrationNumber: e.target.value
            })
          }
        />

        <select
          className="input-field"
          onChange={(e) =>
            setReservation({
              ...reservation,
              vehicleType: e.target.value
            })
          }
        >
          <option>CAR</option>
          <option>BIKE</option>
          <option>TRUCK</option>
        </select>

      </div>

      <div className="checkbox-wrapper">

        <input
          type="checkbox"
          onChange={(e) =>
            setReservation({
              ...reservation,
              ev: e.target.checked
            })
          }
        />

        <span>EV Charging Required</span>

      </div>

      <button
        className="reserve-btn"
        onClick={reserve}
      >
        Reserve Slot
      </button>

      {result && (

        <div className="success-card">

          <h3>Reservation Successful</h3>

          <p>
            Reservation ID :
            {result.reservationId}
          </p>

          <p>
            Slot Number :
            {result.slotNumber}
          </p>

          <p>
            Status :
            {result.status}
          </p>

        </div>
      )}

    </div>
  );
}

export default ReservationForm;