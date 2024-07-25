const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to save code
app.post('/save-code', (req, res) => {
    const codeContent = req.body.code;
    const filePath = path.join(__dirname, 'saved_code.js');

    // Read the existing content of saved_code.js
    fs.readFile(filePath, 'utf8', (err, existingCode) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ success: false, message: 'Failed to read existing code' });
        }

        // Find the position of the "// END" comment
        const endIndex = existingCode.indexOf('// END');

        // Determine the content to be written to the file
        let contentToWrite = existingCode; // Start with the entire existing content
        if (endIndex !== -1) {
            // Preserve the content after "// END"
            const codeAfterEnd = existingCode.substring(endIndex + '// END'.length);
            contentToWrite = codeContent + '\n' + '// END' + codeAfterEnd;
        } else {
            // If "// END" is not found, simply append the new content
            contentToWrite = existingCode + '\n' + codeContent + '\n' + '// END';
        }

        // Write the modified content back to saved_code.js
        fs.writeFile(filePath, contentToWrite, (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ success: false, message: 'Failed to save code' });
            }

            console.log('File written successfully');
            res.json({ success: true });
        });
    });
});

// Endpoint to execute saved code
app.get('/execute-code', (req, res) => {
    const filePath = path.join(__dirname, 'saved_code.js');

    fs.readFile(filePath, 'utf8', (err, code) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ success: false, message: 'Failed to read code' });
        }

        // Find the position of the "// END" comment
        const endIndex = code.indexOf('// END');
        if (endIndex === -1) {
            return res.status(500).json({ success: false, message: 'Could not find // END comment' });
        }

        // Get the code until "// END"
        const codeToExecute = code.substring(0, endIndex);

        try {
            // Execute the JavaScript code
            const result = eval(codeToExecute);
            res.json({ success: true, result });
        } catch (error) {
            console.error('Error executing code:', error);
            res.status(500).json({ success: false, message: 'Error executing code', error: error.message });
        }
    });
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
