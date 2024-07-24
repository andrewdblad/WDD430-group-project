import { NextApiRequest, NextApiResponse } from 'next';
import { createProduct } from '../../../lib/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { user_id, category_id, name, description, price, image_url } = req.body;

        if (!user_id || !category_id || !name || !description || !price || !image_url) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        try {
            const newProduct = await createProduct(user_id, category_id, name, description, parseFloat(price), image_url);
            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: 'Failed to create product' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
