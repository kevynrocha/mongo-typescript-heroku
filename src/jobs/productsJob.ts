import { CronJob } from 'cron';
import zlib from 'zlib';

import logger from '../logger';
import sendEmail from '../mailer';
import Product, { ProductInterface } from '../models/Product';
import ProductImportHistory from '../models/ProductImportHistory';
import api from '../services/api';

logger.info('Product extraction job enabled');

const importedDate = new Date();

const getFilenames = async () => {
  logger.info('Fetching urls...');
  const { data } = await api('data/delta/index.txt');
  if (!data.length) {
    throw new Error('Failed to fetch urls');
  }

  const existsProductsHistory = await ProductImportHistory.findOne({
    filenames: data,
  });

  if (existsProductsHistory) {
    throw new Error('Products are already registered.');
  }

  const formattedFilenames = data
    .split('\n')
    .filter((product: string) => Boolean(product));

  return {
    formattedFilenames,
    filenames: data,
  };
};

const getProducts = async (filename: string) => {
  const { data } = await api(`data/delta/${filename}`, {
    responseType: 'arraybuffer',
  });

  if (!data) {
    throw new Error('Failed to fetch products');
  }

  const unzippedFiles = zlib
    .gunzipSync(data)
    .toString()
    .replace(/\n/g, ',')
    .replace(/,$/, '');

  const parsedFiles = JSON.parse(`[${unzippedFiles}]`);
  logger.info(
    `Fetching and unzipping files - ${filename} - quantity: ${parsedFiles.length}`,
  );
  return parsedFiles;
};

const createValidProduct = (products: ProductInterface[]) => {
  const formattedProduct = products.map(product => {
    let imageUrl = `${process.env.OPEN_FOOD_URL}images/products/`;
    const lengthBarcode = String(product._id).length < 12;

    if (lengthBarcode) {
      imageUrl += `${product._id}/1.jpg`;
    } else {
      const firstSlice = product._id.substring(0, 3);
      const secondSlice = product._id.substring(3, 6);
      const thirdSlice = product._id.substring(6, 9);
      const fourthSlice = product._id.substring(9, 13);
      imageUrl += `${firstSlice}/${secondSlice}/${thirdSlice}/${fourthSlice}/1.jpg`;
    }

    return {
      code: product._id,
      barcode: `${product._id}(EAN / EAN-13)`,
      imported_t: importedDate,
      url: `https://world.openfoodfacts.org/product/${product._id}`,
      product_name: product.product_name,
      quantity: product.quantity,
      categories: product.categories,
      packaging: product.packaging,
      brands: product.brands,
      image_url: imageUrl,
    };
  });

  return formattedProduct;
};

const cronStart = async () => {
  try {
    let allProducts: Partial<ProductInterface>[] = [];
    const { filenames, formattedFilenames } = await getFilenames();

    for (const filename of formattedFilenames) {
      const products = await getProducts(filename);
      const product = createValidProduct(products);
      allProducts = [...allProducts, ...product];
    }

    logger.info('Inserted in the database');
    await Product.deleteMany({});
    await Product.insertMany(allProducts);
    await ProductImportHistory.create({
      filenames,
      imported_t: importedDate,
    });

    return true;
  } catch (e) {
    logger.error(e.message);
    sendEmail(e.message);
  }
};

const everyDayAtMidnight = '15 02 * * *';

const job = new CronJob(everyDayAtMidnight, cronStart, null, true);

export default job;
