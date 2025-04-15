const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/database.json');

    async function readOrders(){
      try {
        const data = await fs.readFile(dataPath, 'utf8');
        return JSON.parse(data);
      } catch (error) {
        if (error.code === 'ENOENT') {
            await writeOrders([]);
            return [];
        }
        throw error;
      }
    }

    async function writeOrders(orders) {
        await fs.writeFile(dataPath, JSON.stringify(orders, null, 2), 'utf8');
    }

    module.exports = {readOrders, writeOrders};