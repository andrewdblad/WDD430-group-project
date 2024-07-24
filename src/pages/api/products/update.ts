import { NextApiRequest, NextApiResponse } from 'next';
import { updateProduct } from '../../../lib/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { id, user_id, category_id, name, description, price, image_url } = req.body;

        try {
            const updatedProduct = await updateProduct(id, user_id, category_id, name, description, price, image_url);
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Failed to update product' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
