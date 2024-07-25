import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await sql`
            SELECT reviews.*, users.username as user_name, products.name as product_name
            FROM reviews
            JOIN users ON reviews.user_id = users.id
            JOIN products ON reviews.product_id = products.id;
        `;
        console.log('Reviews fetched:', result.rows);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ message: 'Failed to fetch reviews.' });
    }
}
