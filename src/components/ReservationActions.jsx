import { useState } from "react";
import api from "../api/axios";
import "../styles/ReservationActions.css";

function ReservationActions() {

    const [reservationId, setReservationId] =
        useState("");

    const [reservation, setReservation] =
        useState(null);

    const [bill, setBill] =
        useState(null);

    const getReservation = async () => {

        try {

            const response =
                    await api.get(
                    `/api/reservations/${reservationId}`
                );

            setReservation(response.data);

        } catch (error) {

            alert("Reservation not found");
        }
    };

    const markEntry = async () => {

        try {

            await api.put(
                `/api/reservations/${reservationId}/entry`
            );

            alert("Vehicle Entered");

        } catch {

            alert("Entry Failed");
        }
    };

    const markExit = async () => {

        try {

            await api.put(
                `/api/reservations/${reservationId}/exit`
            );

            alert("Vehicle Exited");

        } catch {

            alert("Exit Failed");
        }
    };

    const generateBill = async () => {

        try {

            const response =
                await api.post(
                    `/api/billing/${reservationId}`
                );

            setBill(response.data);

        } catch {

            alert("Bill Generation Failed");
        }
    };

    return (

        <div className="actions-card">

            <h2>Reservation Management</h2>

            <input
                type="number"
                placeholder="Reservation Id"
                value={reservationId}
                onChange={
                    (e) =>
                    setReservationId(
                        e.target.value
                    )
                }
                className="input-field"
            />

            <div className="button-row">

                <button
                    className="view-btn"
                    onClick={getReservation}
                >
                    View Reservation
                </button>

                <button
                    className="entry-btn"
                    onClick={markEntry}
                >
                    Entry
                </button>

                <button
                    className="exit-btn"
                    onClick={markExit}
                >
                    Exit
                </button>

                <button
                    className="bill-btn"
                    onClick={generateBill}
                >
                    Generate Bill
                </button>

            </div>

            {
                reservation &&
                (
                    <div className="reservation-result">

                        <h3>Reservation Details</h3>

                        <p>
                            Reservation ID:
                            {" "}
                            {reservation.reservationId}
                        </p>

                        <p>
                            Slot:
                            {" "}
                            {reservation.slotNumber}
                        </p>

                        <p>
                            Status:
                            {" "}
                            {reservation.status}
                        </p>

                    </div>
                )
            }

            {
                bill &&
                (
                    <div className="bill-card">

                        <h3>Parking Bill</h3>

                        <p>
                            Amount:
                            ₹{bill}
                        </p>

                    </div>
                )
            }

        </div>
    );
}

export default ReservationActions;