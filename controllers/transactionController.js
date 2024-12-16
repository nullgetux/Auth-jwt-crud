const { transactions } = require('../models'); // Import the correct model

class transactionController {
    // Function to generate a random and unique trans_no
    static async generateTransNo() {
        try {
            let trans_no;
            let isUnique = false;

            // Keep generating random trans_no until it's unique
            while (!isUnique) {
                // Generate a random 6-digit trans_no
                const randomNumber = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999
                trans_no = randomNumber.toString().padStart(7, '0'); // Ensure 6 digits

                // Check if the trans_no already exists in the transactions table
                const existingTransaction = await transactions.findOne({
                    where: { trans_no: trans_no },
                });

                // If no existing transaction with this trans_no, it's unique
                if (!existingTransaction) {
                    isUnique = true;
                }
            }

            return trans_no; // Return the unique trans_no
        } catch (error) {
            console.error('Error generating trans_no:', error);
            throw new Error('Unable to generate trans_no');
        }
    }

    // Topup function that uses the generateTransNo method
    static async topup(req, res) {
        try {
            const trans_no = await transactionController.generateTransNo(); // Get the unique random trans_no
            
            // Here, you can create a new transaction in the database if needed
            await transactions.create({
                trans_no: trans_no,
                transaction_status: 'pending', // Example status
                transaction_type: 'topup', // Example type
                transaction_amount: 100, // Example amount
                transaction_userid: req.body.user_id || 1, // Example user ID (replace with actual value)
            });

            res.json({ trans_no: trans_no }); // Return the generated trans_no as JSON response
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = transactionController;
