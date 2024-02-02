// .view/listTasks.jsx

import React, { useEffect, useState } from "react";
import { listTasks, listCategories, deleteTask } from "../Requests/resquests";

// Command Pattern: DeleteTaskCommand
class DeleteTaskCommand {
	constructor(taskId, onDelete) {
		this.taskId = taskId;
		this.onDelete = onDelete;
	}

	execute() {
		this.onDelete(this.taskId);
	}
}

const DeleteTaskButton = ({ taskId, onDelete }) => {
	const handleDelete = () => {
		const deleteTaskCommand = new DeleteTaskCommand(taskId, onDelete);
		deleteTaskCommand.execute();
	};

	return <button onClick={handleDelete}>Delete Task</button>;
};




export function ListTasksView() {
	const [tasks, setTasks] = useState([]);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [tasksData, categoriesData] = await Promise.all([
					listTasks(),
					listCategories(),
				]);
				setTasks(tasksData);
				setCategories(categoriesData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData(); // Chame a função para buscar dados imediatamente
	}, [tasks]); // Dependency array vazio para garantir que seja executado apenas uma vez

	const groupTasksByCategory = (categories, tasks) => {
		const groupedTasks = {};

		if (!categories || !categories.length) {
			console.error(
				"No categories found. All tasks will be Uncategorized.",
				tasks
			);
			groupedTasks["Uncategorized"] = tasks;
			return groupedTasks;
		}

		categories.forEach((category) => {
			groupedTasks[category._id] = [];
		});

		// Assign tasks to their respective categories
		tasks.forEach((task) => {
			const categoryId = task.category ? task.category._id : "Uncategorized";
			if (!groupedTasks[categoryId]) {
				console.error(`Category '${categoryId}' not found. Task:`, task);
				groupedTasks[categoryId] = [];
			}
			groupedTasks[categoryId].push(task);
		});

		return groupedTasks;
	};

	const handleDeleteTask = (taskId) => {
		deleteTask(taskId);
		console.log("Deleting task with ID:", taskId);
	};

	const groupedTasks = groupTasksByCategory(categories, tasks);

	return (
		<>
			{Object.entries(groupedTasks).map(([categoryId, categoryTasks]) => (
				<div key={categoryId}>
					<table>
						<tbody>
							{categoryTasks.map((task) => (
								<tr key={task._id}>
									<td></td>
									<td>{task.title}</td>
									<td>{task.dueDate}</td>
									<td>
										<DeleteTaskButton
											taskId={task._id}
											onDelete={handleDeleteTask}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			))}
		</>
	);
}
