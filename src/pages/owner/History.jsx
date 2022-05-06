import React, { useEffect, useState } from "react";
import { ResponsiveDrawer } from "../../components/Drawer";
import { fetchBookingData } from "../../services/Owner";
import DataTable from "../../components/DataTable";
import moment from "moment";

export default function Transaction() {
	const [bookingData, setBookingData] = useState([]);
	document.title = "Transaction History";

	useEffect(() => {
		fetchBookingData(setBookingData);
	}, []);
	const historyColumns = [
		{ field: "day", headerName: "Day", width: 150 },
		{
			field: "date",
			headerName: "Date",
			type: "date",
			width: 150,
		},
		{
			field: "booking",
			headerName: "Booking Time",
			width: 200,
		},
		{
			field: "user",
			headerName: "Booked by",
			width: 250,
		},
		{
			field: "price",
			headerName: "Price",
			type: "number",
			width: 200,
		},
	];
	function countTotal() {
		let total = 0;
		for (let i = 0; i < bookingData.length; i++) {
			total += bookingData[i].venue.price;
		}
		return total;
	}

	return (
		<ResponsiveDrawer>
			<p className="text-xl my-2 font-semibold">Transaction History</p>
			{bookingData.map((data) => {
				return (
					<DataTable
						key={data.id}
						columns={historyColumns}
						rows={[
							{
								id: data.id,
								day: moment(data.venue.date).format("dddd"),
								date: moment(data.venue.date).format(
									"DD MMMM YYYY"
								),
								booking: data.venue.hours,
								user: data.user.fullname,
								price: data.venue.price,
							},
						]}
					/>
				);
			})}
			<div className="flex justify-between my-5">
				<p className="text-xl font-semibold">Total:</p>
				<p className="text-xl font-semibold">
					Rp. {countTotal().toLocaleString()}
				</p>
			</div>
		</ResponsiveDrawer>
	);
}
