import { sql } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';

export const cart = pgTable('cart', {
  id: serial('id').primaryKey().notNull(),
  product_id: integer('product_id')
    .notNull()
    .references(() => product.id),
  quantity: integer('quantity').notNull(),
  created_at: timestamp('created_at', { mode: 'string' })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { mode: 'string' }).defaultNow(),
  user_id: uuid('user_id').default(sql`auth.uid()`)
});

export const product = pgTable('product', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name').notNull(),
  description: text('description').notNull(),
  category_id: integer('category_id')
    .notNull()
    .references(() => category.id),
  brand_id: integer('brand_id')
    .notNull()
    .references(() => brand.id),
  price: integer('price').notNull(),
  image_url: varchar('image_url').notNull(),
  created_at: timestamp('created_at', { mode: 'string' })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { mode: 'string' }).defaultNow()
});

export const order = pgTable('order', {
  id: serial('id').primaryKey().notNull(),
  created_at: timestamp('created_at', { mode: 'string' })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { mode: 'string' }).defaultNow(),
  user_id: uuid('user_id').default(sql`auth.uid()`)
});

export const order_item = pgTable('order_item', {
  id: serial('id').primaryKey().notNull(),
  order_id: integer('order_id')
    .notNull()
    .references(() => order.id),
  product_id: integer('product_id')
    .notNull()
    .references(() => product.id),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
  created_at: timestamp('created_at', { mode: 'string' })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { mode: 'string' }).defaultNow()
});

export const category = pgTable('category', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name').notNull()
});

export const brand = pgTable('brand', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name').notNull(),
  description: text('description').notNull(),
  logo_url: varchar('logo_url').notNull()
});

export const product_delivery = pgTable('product_delivery', {
  id: serial('id').primaryKey().notNull(),
  product_id: integer('product_id')
    .notNull()
    .references(() => product.id),
  shipping_fee: integer('shipping_fee').notNull(),
  release_date: timestamp('release_date', { mode: 'string' }).notNull()
});

export const color = pgTable(
  'color',
  {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name').notNull(),
    hex_code: varchar('hex_code').notNull()
  },
  (table) => {
    return {
      color_name_unique: unique('color_name_unique').on(table.name)
    };
  }
);

export const product_quantity = pgTable(
  'product_quantity',
  {
    id: serial('id').primaryKey().notNull(),
    product_id: integer('product_id')
      .notNull()
      .references(() => product.id),
    quantity: integer('quantity').default(0).notNull()
  },
  (table) => {
    return {
      product_quantity_product_id_unique: unique(
        'product_quantity_product_id_unique'
      ).on(table.product_id)
    };
  }
);

export const size = pgTable(
  'size',
  {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name').notNull()
  },
  (table) => {
    return {
      size_name_unique: unique('size_name_unique').on(table.name)
    };
  }
);

export const product_color = pgTable(
  'product_color',
  {
    id: serial('id').primaryKey().notNull(),
    product_id: integer('product_id')
      .notNull()
      .references(() => product.id),
    color_id: integer('color_id')
      .notNull()
      .references(() => color.id)
  },
  (table) => {
    return {
      product_color_unique: unique('product_color_unique').on(
        table.product_id,
        table.color_id
      )
    };
  }
);

export const product_size = pgTable(
  'product_size',
  {
    id: serial('id').primaryKey().notNull(),
    product_id: integer('product_id')
      .notNull()
      .references(() => product.id),
    size_id: integer('size_id')
      .notNull()
      .references(() => size.id)
  },
  (table) => {
    return {
      product_size_unique: unique('product_size_unique').on(
        table.product_id,
        table.size_id
      )
    };
  }
);
