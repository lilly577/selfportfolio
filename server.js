const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' folder

// Store messages (in-memory, for demo purposes)
const messages = [];

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Store message
    messages.push({ name, email, message, timestamp: new Date() });
    
    // In a real application, you might want to:
    // - Save to a database
    // - Send an email notification
    // - Add validation and sanitization
    
    res.status(200).json({ message: 'Message received successfully' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});