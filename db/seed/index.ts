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
import { sql } from 'drizzle-orm';

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
  try {
    await Promise.all([
      db.delete(product_delivery),
      db.delete(product_quantity),

      db.delete(product_size),
      db.delete(product_color)
    ]);

    await db.delete(product);

    await Promise.all([
      db.delete(size),
      db.delete(color),
      db.delete(brand),
      db.delete(category)
    ]);

    await Promise.all([
      db.execute(
        sql`SELECT setval(pg_get_serial_sequence('cart', 'id'), 1, false)`
      ),
      db.execute(
        sql`SELECT setval(pg_get_serial_sequence('product', 'id'), 1, false)`
      ),
      db.execute(
        sql`SELECT setval(pg_get_serial_sequence('order', 'id'), 1, false)`
      ),
      db.execute(
        sql`SELECT setval(pg_get_serial_sequence('order_item', 'id'), 1, false)`
      ),
      db.execute(
        sql`SELECT setval(pg_get_serial_sequence('category', 'id'), 1, false)`
      ),
      db.execute(
        sql`SELECT setval(pg_get_serial_sequence('brand', 'id'), 1, false)`
      ),
      db.execute(
        sql`SELECT setval(pg_get_serial_sequence('product_delivery', 'id'), 1, false)`
      ),
      db.execute(
        sql`SELECT setval(pg_get_serial_sequence('color', 'id'), 1, false)`
      ),
      db.execute(
        sql`SELECT setval(pg_get_serial_sequence('product_quantity', 'id'), 1, false)`
      ),
      db.execute(
        sql`SELECT setval(pg_get_serial_sequence('size', 'id'), 1, false)`
      ),
      db.execute(
        sql`SELECT setval(pg_get_serial_sequence('product_color', 'id'), 1, false)`
      ),
      db.execute(
        sql`SELECT setval(pg_get_serial_sequence('product_size', 'id'), 1, false)`
      )
    ]);

    await Promise.all([
      db.insert(category).values(CATEGORY),
      db.insert(color).values(COLOR),
      db.insert(brand).values(BRAND),
      db.insert(size).values(SIZE)
    ]);

    const products = await db.insert(product).values(PRODUCT).returning();

    for (const product of products) {
      await Promise.all([
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
          shipping_fee: rand(1000, 3000),
          duration_days: rand(1, 5)
        })
      ]);
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    console.log('Seed data inserted');
    process.exit(0); // 프로세스 강제 종료
  }
})();
