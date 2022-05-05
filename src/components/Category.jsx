import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IconCard, IconLoading } from "./Card";

const API = `https://virtserver.swaggerhub.com/hafidhirsyad/sport-arena-api/1.0.0`;

export function ListCategory() {
	const [skeleton] = useState([1, 2, 3, 4]);
	const [loading, setLoading] = useState(false);
	const [category, setCategory] = useState([]);

	useEffect(() => {
		fetchCategory();
	}, []);

	const fetchCategory = async () => {
		setLoading(true);
		await axios
			.get(`${API}/category`)
			.then((res) => {
				setCategory(res.data.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<h4 className="uppercase text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl my-8 text-teal-500 font-bold text-center">
				Category
			</h4>
			<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
				{loading
					? skeleton.map((item) => <IconLoading key={item} />)
					: category.map((item) => (
							<div key={item.id}>
								<IconCard
									id={item.id}
									icon={item.icon_name}
									name={item.name}
								/>
							</div>
					  ))}
			</div>
		</>
	);
}
