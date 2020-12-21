import { Request, Response } from 'express';

import Product from '../../models/Product';

const index = async (
  req: Request,
  res: Response,
): Promise<Response | undefined> => {
  try {
    const { limit = 30, page = 0 } = req.query;

    const total = await Product.countDocuments({ status: 'published' });
    const products = await Product.find({ status: 'published' })
      .limit(Number(limit))
      .skip(Number(page) * Number(limit))
      .sort('_id');

    return res.status(200).json({
      total,
      page,
      pageSize: products.length,
      products,
    });
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
};

const show = async (req: Request, res: Response): Promise<Response> => {
  try {
    const params = req.params;
    const code = Number(params.code);
    const product = await Product.findOne({ code });

    if (!product) {
      throw new Error('No products found.');
    }

    return res.status(200).json(product);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
};

const update = async (req: Request, res: Response): Promise<Response> => {
  try {
    const newProduct = req.body;
    const params = req.params;
    const code = Number(params.code);

    const product = await Product.findOneAndUpdate({ code }, newProduct);
    if (!product) {
      throw new Error('No products found.');
    }

    return res.status(201).json({
      success: true,
    });
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const params = req.params;
  const code = Number(params.code);

  try {
    const product = await Product.findOneAndUpdate(
      { code },
      { status: 'trash' },
    );

    if (!product) {
      throw new Error('Product does not exist.');
    }

    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
};

export default { index, show, update, destroy };
