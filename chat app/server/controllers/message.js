const { pool } = require('../ConnectSQL');

// Function to save message to the database
const saveMessageToDatabase = async (req, res) => {
    try {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    const query = 'INSERT INTO Messages (MessageText) VALUES (@message)';
    const request = pool.request();
    request.input('message', message);
    await request.query(query);
    res.status(201).json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message to database:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
};

module.exports = {
  saveMessageToDatabase
};
