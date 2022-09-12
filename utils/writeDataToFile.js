const fs = require('fs');

async function writeDataToFile(fileName, content) {
    await fs.writeFile(fileName, JSON.stringify(content), (err) => {
        if (err) {
            console.log(err);
        }
    });
}

module.exports = writeDataToFile;
