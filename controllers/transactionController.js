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

            const sequenceNumber = Math.floor(Math.random() * 1000000000);
            const formattedSequenceNumber = sequenceNumber.toString().padStart(10, '5');
            refid = formattedSequenceNumber;  // Corrected to assign formattedSequenceNumber to refid

            return refid;  // Return refid instead of trans_no
        } catch (error) {
            console.error('Error generating reference:', error);
            throw new Error('Unable to generate reference');
        }
    }

    static async digiTopup(ref_id, customer_no, product_sku) {
        try {
            const signature = crypto
                .createHash('md5')
                .update(`${process.env.DIGIFLAZ_USER}${process.env.DIGIFLAZ_KEY}${ref_id}`)
                .digest('hex');
    
            const payload = {
                username: process.env.DIGIFLAZ_USER,
                buyer_sku_code: product_sku,
                customer_no: customer_no,
                ref_id: ref_id,
                sign: signature,
            };
    
            const response = await fetch(`https://api.digiflazz.com/v1/transaction`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
    
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error calling DigiFlazz API:', error);
            throw new Error('Gagal terhubung ke DigiFlazz');
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
                transaction_status: product.product_status,
                transaction_category: product.product_category,
                product_provider: product.product_provider,
                transaction_amount: amount || 0,
                seller_price: product.product_seller_price,
                product_sku: product_sku,
                customer_no: customer_no || 1,
                transaction_sn: null,
                transaction_message: 'Menunggu respon dari DigiFlazz',
                transaction_userid: '1',
                
            });

            // Panggil API DigiFlazz
            const digiFlazzResponse = await transactionController.digiTopup(
                ref_id,
                customer_no,
                product_sku
            );
            
            // Update transaksi berdasarkan respon dari DigiFlazz
            const updatedTransaction = await newTransaction.update({
                transaction_status: digiFlazzResponse.data.status, // "pending", "success", atau "failed"
                transaction_message: digiFlazzResponse.data.message || 'Respon tidak ada',
                transaction_sn: digiFlazzResponse.data.sn || 'N/A',
            });

            // Kembalikan respon dengan data transaksi yang baru saja dibuat
            return res.status(201).json(updatedTransaction);
            } catch (error) {
            // Tangani error jika terjadi
            console.error(error);
            return res.status(500).json({ error: 'Terjadi kesalahan pada server' });
            }
    }

}

module.exports = transactionController;
