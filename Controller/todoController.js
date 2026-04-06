import todoCollection from "../Model/todoModel.js";

// Existing public CRUD for compatibility
export const addTodo = async (req, res) => {
  try {
    const { todo, completed } = req.body;
    const data = new todoCollection({
      todo,
      completed: completed || false,
      userId: req.body.userId || null,
    });
    await data.save();
    res.status(201).json({ message: "data has been stored" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getTodo = async (req, res) => {
  try {
    const data = await todoCollection.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const data = await todoCollection.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await todoCollection.findByIdAndDelete(req.params.id);
    res.json({ message: "todo has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Authenticated task routes
export const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { userId: req.user._id };
    if (status === "completed") filter.completed = true;
    if (status === "pending") filter.completed = false;
    const tasks = await todoCollection.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { todo } = req.body;
    if (!todo || !todo.trim()) {
      return res.status(400).json({ message: "Task title is required." });
    }
    const task = new todoCollection({
      todo: todo.trim(),
      completed: false,
      userId: req.user._id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await todoCollection.findById(req.params.id);
    if (!task || task.userId?.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Task not found." });
    }
    task.todo = req.body.todo ?? task.todo;
    task.completed = req.body.completed ?? task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await todoCollection.findById(req.params.id);
    if (!task || task.userId?.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Task not found." });
    }
    await task.deleteOne();
    res.json({ message: "Task removed." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
