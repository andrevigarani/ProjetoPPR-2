import React, { useState } from "react";
import { createTaskCopy } from "../Requests/resquests"; 

function CreateTaskCopyView() {
	const [taskId, setTaskId] = useState("");
	const [modifications, setModifications] = useState({
		title: "",
		dueDate: "",
		description: "",
		category: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setModifications((prevModifications) => ({
			...prevModifications,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await createTaskCopy({
				taskId,
				modifications,
			});

			console.log("Nova tarefa criada:", response);
			// Lógica adicional, se necessário
		} catch (error) {
			console.error("Erro ao criar cópia da tarefa:", error.message);
			// Tratar erros, se necessário
		}
	};

	return (
		<div>
			<h2>Create Task Copy</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Task ID:
					<input
						type="text"
						name="taskId"
						value={taskId}
						onChange={(e) => setTaskId(e.target.value)}
					/>
				</label>
				<br />

				<label>
					Title:
					<input
						type="text"
						name="title"
						value={modifications.title}
						onChange={handleInputChange}
					/>
				</label>
				<br />

				<label>
					Due Date:
					<input
						type="date"
						name="dueDate"
						value={modifications.dueDate}
						onChange={handleInputChange}
					/>
				</label>
				<br />

				<label>
					Description:
					<textarea
						name="description"
						value={modifications.description}
						onChange={handleInputChange}
					/>
				</label>
				<br />

				<label>
					Category:
					<input
						type="text"
						name="category"
						value={modifications.category}
						onChange={handleInputChange}
					/>
				</label>
				<br />

				<button type="submit">Create Task Copy</button>
			</form>
		</div>
	);
}
export default CreateTaskCopyView;