const express = require("express");
const zod = require("zod");
const { Todo } = require("../db");
const { authMiddleware } = require("./middleware");

const router = express.Router();

// Define Zod schemas with proper validation
const createSchema = zod.object({
    title: zod.string().min(1),
    description: zod.string().optional(),
    status: zod.enum(['pending', 'in-progress', 'completed']),
});

const updateSchema = zod.object({
    title: zod.string().optional(),
    description: zod.string().optional(),
    status: zod.enum(['pending', 'in-progress', 'completed']).optional(),
});

// Middleware to check authentication
router.use(authMiddleware);

// Create todo
router.post("/create", async (req, res) => {
    const result = createSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid Input",
            errors: result.error.errors
        });
    }

    try {
        const { title, description, status } = req.body;
        const todo = await Todo.create({
            title,
            description,
            status,
            userId: req.userId
        });

        res.status(201).json({
            message: "Successfully created todo",
            todo
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating todo",
            error: error.message
        });
    }
});

// Update todo
router.put("/update/:id", async (req, res) => {
    const result = updateSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid Input",
            errors: result.error.errors
        });
    }

    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        if (todo.userId.toString() !== req.userId) {
            return res.status(403).json({
                message: "Unauthorized to update this todo"
            });
        }

        res.status(200).json({
            message: "Updated Successfully",
            todo
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating todo",
            error: error.message
        });
    }
});

// Fetch todos
router.get("/todos", async (req, res) => {
    const { status } = req.query;

    // Validate status
    const validStatuses = ['all', 'pending', 'in-progress', 'completed'];
    if (status && !validStatuses.includes(status.toLowerCase())) {
        return res.status(400).json({
            message: "Invalid status",
            validStatuses
        });
    }

    try {
        // Query to fetch todos for the authenticated user
        const query = { userId: req.userId };
        if (!status || status.toLowerCase() !== 'all') {
            query.status = status.toLowerCase(); // Add status filter if provided
        }

        const todos = await Todo.find(query);
        console.log(todos);

        res.status(200).json({
            todos
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching todos",
            error: error.message
        });
    }
});

module.exports = router;
