const fetch = require('node-fetch');
const crypto = require('crypto');
const { transactions } = require('../models'); 

class transactionController {
    // Function to generate a random and unique trans_no
    static async generateTransNo() {
        try {
            let trans_no;
            let isUnique = false;

            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');

            while (!isUnique) {
                const sequenceNumber = Math.floor(Math.random() * 1000000);
                const formattedSequenceNumber = sequenceNumber.toString().padStart(7, '0');
                trans_no = `INV-PR-${year}-${month}-${formattedSequenceNumber}`;

                const existingTransaction = await transactions.findOne({
                    where: { trans_no: trans_no },
                });

                if (!existingTransaction) {
                    isUnique = true;
                }
            }

            return trans_no;
        } catch (error) {
            console.error('Error generating trans_no:', error);
            throw new Error('Unable to generate trans_no');
        }
    }

    // Function to generate a random and unique reference
    static async generateReference() {
        try {
            let refid;

            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');

            const sequenceNumber = Math.floor(Math.random() * 1000000);
            const formattedSequenceNumber = sequenceNumber.toString().padStart(10, '0');
            refid = formattedSequenceNumber;  // Corrected to assign formattedSequenceNumber to refid

            return refid;  // Return refid instead of trans_no
        } catch (error) {
            console.error('Error generating reference:', error);
            throw new Error('Unable to generate reference');
        }
    }

    // Topup function that uses the generateTransNo method
    static async topup(req, res) {
        try {
            const { amount, user_id, product_sku, customer_no } = req.body;

            // Generate unique transaction number
            const trans_no = await transactionController.generateTransNo();
            // Generate unique reference ID
            const ref_id = await transactionController.generateReference();

            // Create transaction record in the database
            const newTransaction = await transactions.create({
                trans_no: trans_no,
                transaction_reference: ref_id,
                transaction_status: 'pending',
                transaction_type: 'topup',
                transaction_amount: amount || 0,
                transaction_userid: user_id || 1,
                customer_no: customer_no || 1,
                product_sku: product_sku,
            });

            // Update transaction based on DigiFlazz response
            if (response.status === 'success') {
                await newTransaction.update({ transaction_status: 'completed' });
                res.json({ success: true, trans_no: trans_no, message: 'Topup successful!' });
            } else {
                await newTransaction.update({ transaction_status: 'failed' });
                res.status(500).json({ error: 'Topup failed', details: response });
            }
        } catch (error) {
            console.error('Topup error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = transactionController;
