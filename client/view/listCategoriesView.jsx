/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { listCategories } from "../Requests/resquests";

export function ListCategoriesView() {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categoriesData = await listCategories();
				setCategories(categoriesData);
				console.log(categoriesData);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategories();
	}, []);

	return (
		<>
			{categories.map((category) => (
				<div key={category.id}>{category.name}</div>
			))}
		</>
	);
}

export default ListCategoriesView;