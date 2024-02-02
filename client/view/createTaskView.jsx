import React, { useState, useEffect } from "react";
import { createTask, listCategories } from "../Requests/resquests";

function CreateTaskView() {
	const [taskData, setTaskData] = useState({
		title: "",
		dueDate: "",
		description: "",
		category: "", // Store category ID
	});

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categoriesData = await listCategories();
				setCategories(categoriesData);
			} catch (error) {
				console.error("Error fetching categories:", error.message);
			}
		};

		fetchCategories();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setTaskData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// Ensure the selected category exists
			const selectedCategory = categories.find(
				(category) => category._id === taskData.category
			);

			if (!selectedCategory) {
				console.error("Invalid category selected");
				return;
			}

			await createTask(taskData);
			console.log("Task created:", taskData);

			// Clear the form data or perform any additional necessary actions
			setTaskData({
				title: "",
				dueDate: "",
				description: "",
				category: "",
			});
		} catch (error) {
			console.error("Error creating task:", error.message);
			// Handle errors, if necessary
		}
	};

	return (
		<div>
			<h2>Create Task</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Title:
					<input
						type="text"
						name="title"
						value={taskData.title}
						onChange={handleInputChange}
					/>
				</label>
				<br />

				<label>
					Due Date:
					<input
						type="date"
						name="dueDate"
						value={taskData.dueDate}
						onChange={handleInputChange}
					/>
				</label>
				<br />

				<label>
					Description:
					<textarea
						name="description"
						value={taskData.description}
						onChange={handleInputChange}
					/>
				</label>
				<br />

				<label>
					Category:
					<select
						name="category"
						value={taskData.category}
						onChange={handleInputChange}>
						<option value="" disabled>
							Select a category
						</option>
						{categories.map((category) => (
							<option key={category._id} value={category._id}>
								{category.name}
							</option>
						))}
					</select>
				</label>
				<br />

				<button type="submit">Create Task</button>
			</form>
		</div>
	);
}

export default CreateTaskView;
