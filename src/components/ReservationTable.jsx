import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/ReservationTable.css";

function ReservationTable(refreshFlag) {

    const [reservations,
        setReservations] = useState([]);

    const [search,
        setSearch] = useState("");

    const [statusFilter,
        setStatusFilter] = useState("ALL");

    const [invoice,
        setInvoice] = useState(null);

    useEffect(() => {

        loadReservations();

    }, [refreshFlag]);

    const loadReservations = async () => {

        try {

            const response =
                await api.get(
                    "/api/reservations"
                );

            setReservations(
                response.data
            );

        } catch(err) {

            console.log(err);
        }
    };

    const markEntry = async (id) => {

        try {

            await api.put(
                `/api/reservations/${id}/entry`
            );

            loadReservations();

        } catch(err) {

            alert(
                err.response?.data?.message
            );
        }
    };

    const markExit = async (id) => {

        try {

            await api.put(
                `/api/reservations/${id}/exit`
            );

            loadReservations();

        } catch(err){

            alert(
                err.response?.data?.message
            );
        }
    };

    const generateBill = async (id) => {

        try {

            const response =
                await api.post(
                    `/api/billing/${id}`
                );

            setInvoice(
                response.data
            );

            loadReservations();

        } catch(err) {

            alert(
                err.response?.data?.message ||
                "Cannot generate bill"
            );
        }
    };

    const filteredReservations =
        reservations.filter(r => {

            const searchMatch =
                r.registrationNumber
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const statusMatch =
                statusFilter === "ALL"
                ||
                r.status === statusFilter;

            return searchMatch &&
                   statusMatch;
        });

    return (

        <div className="table-card">

            <div className="table-header">

                <h2>
                    My Reservations
                </h2>

            </div>

            <div className="filters">

                <input
                    type="text"
                    placeholder="Search Vehicle Number"
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
                    }
                >

                    <option value="ALL">
                        All Status
                    </option>

                    <option value="RESERVED">
                        Reserved
                    </option>

                    <option value="PARKED">
                        Parked
                    </option>

                    <option value="COMPLETED">
                        Completed
                    </option>

                    <option value="CANCELLED">
                        Cancelled
                    </option>

                </select>

            </div>

            <table>

                <thead>

                <tr>

                    <th>ID</th>

                    <th>Vehicle</th>

                    <th>Slot</th>

                    <th>Status</th>

                    <th>Bill</th>

                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {
                    filteredReservations.map(
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
                                reservation.registrationNumber
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
                                reservation.billAmount
                                ?
                                `₹${reservation.billAmount}`
                                :
                                "-"
                                }

                            </td>

                            <td>

                                {
                                reservation.status ===
                                "RESERVED" &&

                                <button
                                    className="entry-btn"
                                    onClick={() =>
                                        markEntry(
                                            reservation.reservationId
                                        )
                                    }
                                >
                                    Entry
                                </button>
                                }

                                {
                                reservation.status ===
                                "PARKED" &&

                                <button
                                    className="exit-btn"
                                    onClick={() =>
                                        markExit(
                                            reservation.reservationId
                                        )
                                    }
                                >
                                    Exit
                                </button>
                                }

                                {
                                reservation.status ===
                                "COMPLETED" &&

                                <button
                                    className="bill-btn"
                                    onClick={() =>
                                        generateBill(
                                            reservation.reservationId
                                        )
                                    }
                                >
                                    Generate Bill
                                </button>
                                }

                            </td>

                        </tr>

                    ))
                }

                </tbody>

            </table>

            {
                invoice &&

                <div className="invoice-card">

                    <h2>
                        Parking Invoice
                    </h2>

                    <p>
                        Reservation :
                        {
                        invoice.reservationId
                        }
                    </p>

                    <p>
                        Vehicle :
                        {
                        invoice.registrationNumber
                        }
                    </p>

                    <p>
                        Slot :
                        {
                        invoice.slotNumber
                        }
                    </p>

                    <p>
                        Duration :
                        {
                        invoice.durationHours
                        } Hours
                    </p>

                    <p className="amount">

                        ₹{
                        invoice.amount
                        }

                    </p>

                </div>
            }

        </div>
    );
}

export default ReservationTable;