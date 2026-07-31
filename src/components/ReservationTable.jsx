import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/ReservationTable.css";

function ReservationTable() {

    const [reservations,
        setReservations] =
        useState([]);

    useEffect(() => {

        loadReservations();

    }, []);

    const loadReservations = async () => {

        const response =
            await api.get(
                "/api/reservations"
            );

        setReservations(
            response.data
        );
    };

    const markEntry = async (id) => {

        await api.put(
            `/api/reservations/${id}/entry`
        );

        loadReservations();
    };

    const markExit = async (id) => {

        await api.put(
            `/api/reservations/${id}/exit`
        );

        loadReservations();
    };

    const generateBill = async (id) => {

        const response =
            await api.post(
                `/api/billing/${id}`
            );

        alert(
            `Total Bill ₹${response.data}`
        );
    };

    return (

        <div className="table-card">

            <h2>
                Reservations
            </h2>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Slot</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                {
                    reservations.map(
                        reservation => (

                        <tr
                            key={
                              reservation.reservationId
                            }
                        >

                            <td>
                                {
                                reservation.reservationId
                                }
                            </td>

                            <td>
                                {
                                reservation.slotNumber
                                }
                            </td>

                            <td>
                                {
                                reservation.status
                                }
                            </td>

                            <td>

                                {
                                reservation.status ===
                                "RESERVED" &&

                                <button
                                  onClick={() =>
                                    markEntry(
                                    reservation.reservationId
                                  )}
                                >
                                    Entry
                                </button>
                                }

                                {
                                reservation.status ===
                                "PARKED" &&

                                <>
                                <button
                                  onClick={() =>
                                  markExit(
                                  reservation.reservationId
                                )}
                                >
                                    Exit
                                </button>

                                <button
                                  onClick={() =>
                                  generateBill(
                                  reservation.reservationId
                                )}
                                >
                                    Bill
                                </button>

                                </>
                                }

                            </td>

                        </tr>

                    ))
                }

                </tbody>

            </table>

        </div>
    );
}

export default ReservationTable;