const TaskManagerSingleton = require('../singleton/TaskManagerSingleton');
const TaskModel = require('../models/TaskModel');
const TaskPrototype = require('../prototype/TaskPrototype');
const TaskFactory = require('../factories/TaskFactory')
const TaskObserver = require('../observers/TaskObserver')
class TaskController {
  async createTask(req, res) {
    try {
      const { title, dueDate, description, category } = req.body;
      const newTask = await TaskFactory.createTask(title, description, dueDate, category);

      TaskManagerSingleton.addTask(newTask);

      TaskObserver.notifyAddition(newTask);

      res.status(201).json(newTask);
    } catch (e) {
      console.error(e);
      res.status(500).send("Erro interno no servidor");
    }
  }
  async listTasks(req, res) {
    try {
      const tasks = await TaskModel.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createTaskCopy(req, res) {
    try {
      const {taskId, modifications } = req.body;

      // Encontre a tarefa existente pelo ID
      const existingTask = await TaskModel.findById(taskId);

      if (!existingTask) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      // Crie uma cópia da tarefa existente com as modificações fornecidas
      const taskPrototype = new TaskPrototype();
      const newTask = taskPrototype.createTaskCopy(existingTask.toJSON(), modifications);

      // Adicione a nova tarefa ao gerenciador de tarefas (se necessário)
      TaskManagerSingleton.addTask(newTask);

      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  async deleteTask(req, res) {
    try {
      const taskId = req.params._id;
      await TaskModel.deleteOne(taskId);;

      res.status(200).json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }
}

module.exports = new TaskController();
