import axios from "axios";

export async function listCategories() {
	const categories = await axios.get("http://localhost:3333/api/categories");
	return categories.data;
}

export async function listTasks() {
	const tasks = await axios.get("http://localhost:3333/api/tasks");
	return tasks.data;
}

export async function createTask(taskData) {
	try {
		const response = await axios.post(
			"http://localhost:3333/api/tasks",
			taskData
		);

		// Verifique se a solicitação foi bem-sucedida (status 2xx)
		if (response.status >= 200 && response.status < 300) {
			// A resposta contém os dados da nova tarefa (se disponíveis)
			return response.data;
		} else {
			// Trate erros de resposta aqui
			console.error(
				`Erro na solicitação: ${response.status} - ${response.statusText}`
			);
			throw new Error("Erro na solicitação");
		}
	} catch (error) {
		// Trate erros de rede ou exceções aqui
		console.error("Erro durante a solicitação:", error.message);
		throw new Error("Erro durante a solicitação");
	}
}

export async function createTaskCopy(taskData) {
	try {
		const response = await axios.post(
			"http://localhost:3333/api/taskCopy",
			taskData
		);
		if (response.status >= 200 && response.status < 300) {
			return response.data;
		} else {
			console.error(
				`Erro na solicitação: ${response.status} - ${response.statusText}`
			);
			throw new Error("Erro na solicitação");
		}
	} catch (e) {
		console.error("Erro durante a solicitação:", e.message);
		throw new Error("Erro durante a solicitação");
	}
}

export async function deleteTask(taskId) {
	try {
		const response = await axios.delete(
			`http://localhost:3333/api/tasks/${taskId}`
		);
		if (response.status >= 200 && response.status < 300) {
			console.log(`Task with ID ${taskId} deleted successfully.`);
		} else {
			console.error(
				`Error in request: ${response.status} - ${response.statusText}`
			);
			throw new Error("Error in request");
		}
	} catch (error) {
		console.error("Error during the request:", error.message);
		throw new Error("Error during the request");
	}
}

export async function createCategory(categoryData) {
	try {
		const response = await axios.post(
			"http://localhost:3333/api/categories",
			categoryData
		);

		if (response.status >= 200 && response.status < 300) {
			console.log("Category created successfully.");
		} else {
			console.error(
				`Error in request: ${response.status} - ${response.statusText}`
			);
			throw new Error("Error in request");
		}
	} catch (error) {
		console.error("Error during the request:", error.message);
		throw new Error("Error during the request");
	}
}
