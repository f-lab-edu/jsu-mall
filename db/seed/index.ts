import {
  brand,
  category,
  color,
  product,
  product_color,
  product_delivery,
  product_quantity,
  product_size,
  size
} from 'db/schema';

import BRAND from './BRAND.json';
import CATEGORY from './CATEOGORY.json';
import COLOR from './COLOR.json';
import PRODUCT from './PRODCUT.json';
import SIZE from './SIZE.json';

import { db } from 'db/db';

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

(async () => {
  Promise.all([
    db.insert(category).values(CATEGORY),
    db.insert(color).values(COLOR),
    db.insert(brand).values(BRAND),
    db.insert(size).values(SIZE)
  ]);

  const products = await db.insert(product).values(PRODUCT).returning();

  for (const product of products) {
    Promise.all([
      db.insert(product_color).values([
        {
          product_id: product.id,
          color_id: rand(1, 3)
        },
        {
          product_id: product.id,
          color_id: rand(4, 6)
        },
        {
          product_id: product.id,
          color_id: rand(7, 9)
        }
      ]),

      db.insert(product_size).values([
        {
          product_id: product.id,
          size_id: 1
        },
        {
          product_id: product.id,
          size_id: 2
        },
        {
          product_id: product.id,
          size_id: 3
        }
      ]),

      db.insert(product_quantity).values([
        {
          product_id: product.id,
          quantity: rand(1, 100)
        }
      ]),

      db.insert(product_delivery).values({
        product_id: product.id,
        shipping_fee: 1000,
        duration_days: rand(1, 5)
      })
    ]);
  }

  console.log('Seed data inserted');
})();
