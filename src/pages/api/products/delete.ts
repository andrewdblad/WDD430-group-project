
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteProduct } from '../../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'DELETE') {
        const { id } = req.body;
        try {
            const deletedProduct = await deleteProduct(id);
            res.status(200).json(deletedProduct);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete product' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
