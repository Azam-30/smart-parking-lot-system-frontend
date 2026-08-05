import { useState } from "react";
import api from "../api/axios";
import "../styles/ReservationForm.css";

function ReservationForm({
    onReservationCreated
}) {

    const [reservation, setReservation] =
        useState({
            registrationNumber: "",
            vehicleType: "CAR",
            ev: false
        });

    const [result,
        setResult] = useState(null);

    const [message,
        setMessage] = useState(null);

    const reserve = async () => {

        try {

            const response =
                await api.post(
                    "/api/reservations",
                    reservation
                );

            setResult(
                response.data
            );

            setMessage({
                type: "success",
                text:
                `✅ Slot ${response.data.slotNumber}
                 reserved successfully`
            });

            if(onReservationCreated){

                onReservationCreated();
            }

            setTimeout(() => {

                document
                .querySelector(".table-card")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

            }, 300);

        } catch(error){

            setMessage({
                type: "error",
                text:
                error.response?.data?.message
                ||
                "Unable to reserve slot."
            });
        }
    };

    return (

        <div className="reservation-card">

            <h2>
                Reserve Parking Slot
            </h2>

            {
                message &&
                (
                    <div
                        className={
                            message.type ===
                            "success"
                            ?
                            "success-message"
                            :
                            "error-message"
                        }
                    >
                        {message.text}
                    </div>
                )
            }

            <div className="form-grid">

                <input
                    className="input-field"
                    placeholder="Vehicle Number"
                    value={
                        reservation.registrationNumber
                    }
                    onChange={(e) =>
                        setReservation({
                            ...reservation,
                            registrationNumber:
                            e.target.value
                        })
                    }
                />

                <select
                    className="input-field"
                    value={reservation.vehicleType}
                    onChange={(e) =>
                        setReservation({
                            ...reservation,
                            vehicleType:
                            e.target.value
                        })
                    }
                >
                    <option value="CAR">
                        CAR
                    </option>

                    <option value="BIKE">
                        BIKE
                    </option>

                    <option value="TRUCK">
                        TRUCK
                    </option>
                </select>

            </div>

            <div className="checkbox-wrapper">

                <input
                    type="checkbox"
                    checked={reservation.ev}
                    onChange={(e) =>
                        setReservation({
                            ...reservation,
                            ev: e.target.checked
                        })
                    }
                />

                <span>
                    EV Charging Required
                </span>

            </div>

            <button
                className="reserve-btn"
                onClick={reserve}
            >
                Reserve Slot
            </button>

            {
                result &&
                (
                    <div className="success-card">

                        <h3>
                            Reservation Successful
                        </h3>

                        <p>
                            Reservation ID:
                            {result.reservationId}
                        </p>

                        <p>
                            Slot:
                            {result.slotNumber}
                        </p>

                        <p>
                            Status:
                            {result.status}
                        </p>

                    </div>
                )
            }

        </div>
    );
}

export default ReservationForm;