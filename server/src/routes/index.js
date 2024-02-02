const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');
const CategoryController = require('../controllers/CategoryController');


router.get('/categories', CategoryController.listCategory);
router.post('/categories', CategoryController.createCategory);
router.get('/categories/:categoryId', CategoryController.getCategory);

router.post('/tasks', TaskController.createTask);
router.get('/tasks', TaskController.listTasks)
router.delete('/tasks/:id', TaskController.deleteTask);
router.put('/tasksCopy', TaskController.createTaskCopy)

module.exports = router;
