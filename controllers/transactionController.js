const fetch = require('node-fetch');
const crypto = require('crypto');
const { transactions, productPrepaids, productPascas } = require('../models'); 

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
        const { product_sku, customer_no, amount} = req.body;
        try {
            
            // Generate unique transaction number
            const trans_no = await transactionController.generateTransNo();
            // Generate unique reference ID
            const ref_id = await transactionController.generateReference();

            const product = await productPrepaids.findOne({ where: { product_sku } });

            if (!product) {
                return res.status(404).json({ error: 'Produk tidak ditemukan' });
              }

            // Create transaction record in the database
            const newTransaction = await transactions.create({
                trans_no: trans_no,
                transaction_reference: ref_id,
                transaction_status: 'pending',
                transaction_category: product.product_category,
                product_provider: product.product_provider,
                transaction_amount: amount || 0,
                seller_price: product.product_seller_price || 0,
                product_sku: product_sku,
                customer_no: customer_no || 1,
                transaction_sn: '1123123123123123123123',
                transaction_message: '1231231231231231231231',
                transaction_userid: '1',
                
            });

            // Kembalikan respon dengan data transaksi yang baru saja dibuat
            return res.status(201).json(newTransaction);
            } catch (error) {
            // Tangani error jika terjadi
            console.error(error);
            return res.status(500).json({ error: 'Terjadi kesalahan pada server' });
            }
    }
}

module.exports = transactionController;
