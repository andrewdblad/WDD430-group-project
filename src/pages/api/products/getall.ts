import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await sql`
            SELECT products.*, 
            CASE 
                WHEN categories.id = 1 THEN 'jewelry' 
                WHEN categories.id = 2 THEN 'toys' 
                WHEN categories.id = 3 THEN 'decoration' 
            END as category_name
            FROM products
            JOIN categories ON products.category_id = categories.id;
        `;
        console.log('Products fetched:', result.rows); // Debugging statement
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ message: 'Failed to fetch products.' });
    }
}
