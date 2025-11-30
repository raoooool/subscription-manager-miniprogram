import {
  boolean,
  datetime,
  decimal,
  index,
  int,
  json,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: varchar('id', { length: 191 }).primaryKey(),
  openId: varchar('open_id', { length: 191 }).notNull().unique(),
  unionId: varchar('union_id', { length: 191 }).unique(),
  phone: varchar('phone', { length: 32 }).unique(),
  createdAt: timestamp('created_at', { fsp: 3 }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { fsp: 3 }).notNull().defaultNow().onUpdateNow(),
  lastLoginAt: datetime('last_login_at', { fsp: 3 }),
});

export const subscriptionTemplates = mysqlTable('subscription_templates', {
  id: varchar('id', { length: 191 }).primaryKey(),
  name: varchar('name', { length: 191 }).notNull(),
  logoUrl: varchar('logo_url', { length: 512 }),
  defaultPrice: decimal('default_price', { precision: 10, scale: 2 }),
  currency: varchar('currency', { length: 16 }).notNull().default('CNY'),
  cycle: varchar('cycle', { length: 64 }).notNull(),
  category: varchar('category', { length: 128 }),
  description: text('description'),
  createdAt: timestamp('created_at', { fsp: 3 }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { fsp: 3 }).notNull().defaultNow().onUpdateNow(),
});

export const subscriptions = mysqlTable(
  'subscriptions',
  {
    id: varchar('id', { length: 191 }).primaryKey(),
    userId: varchar('user_id', { length: 191 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 191 }).notNull(),
    logoUrl: varchar('logo_url', { length: 512 }),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    currency: varchar('currency', { length: 16 }).notNull().default('CNY'),
    cycle: varchar('cycle', { length: 64 }).notNull(),
    customCycleDays: int('custom_cycle_days'),
    nextDueDate: datetime('next_due_date', { fsp: 3 }).notNull(),
    category: varchar('category', { length: 128 }),
    notes: text('notes'),
    status: varchar('status', { length: 32 }).notNull().default('active'),
    paymentMethod: varchar('payment_method', { length: 128 }),
    createdAt: timestamp('created_at', { fsp: 3 }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { fsp: 3 }).notNull().defaultNow().onUpdateNow(),
    templateId: varchar('template_id', { length: 191 }).references(() => subscriptionTemplates.id, {
      onDelete: 'set null',
    }),
  },
  (table) => ({
    userIdIdx: index('subscriptions_user_id_idx').on(table.userId),
    templateIdIdx: index('subscriptions_template_id_idx').on(table.templateId),
  }),
);

export const notificationSettings = mysqlTable(
  'notification_settings',
  {
    id: varchar('id', { length: 191 }).primaryKey(),
    subscriptionId: varchar('subscription_id', { length: 191 })
      .notNull()
      .references(() => subscriptions.id, { onDelete: 'cascade' }),
    advanceDays: int('advance_days').notNull(),
    channel: varchar('channel', { length: 64 }).notNull(),
    active: boolean('active').notNull().default(true),
    lastSentAt: datetime('last_sent_at', { fsp: 3 }),
    createdAt: timestamp('created_at', { fsp: 3 }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { fsp: 3 }).notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    subscriptionChannelUnique: uniqueIndex('notification_settings_subscription_channel_key').on(
      table.subscriptionId,
      table.channel,
    ),
    subscriptionIdx: index('notification_settings_subscription_id_idx').on(table.subscriptionId),
  }),
);

export const notificationLogs = mysqlTable(
  'notification_logs',
  {
    id: varchar('id', { length: 191 }).primaryKey(),
    subscriptionId: varchar('subscription_id', { length: 191 })
      .notNull()
      .references(() => subscriptions.id, { onDelete: 'cascade' }),
    channel: varchar('channel', { length: 64 }).notNull(),
    status: varchar('status', { length: 64 }).notNull(),
    response: json('response'),
    sentAt: datetime('sent_at', { fsp: 3 }).notNull(),
    createdAt: timestamp('created_at', { fsp: 3 }).notNull().defaultNow(),
  },
  (table) => ({
    subscriptionIdx: index('notification_logs_subscription_id_idx').on(table.subscriptionId),
  }),
);

export const auditLogs = mysqlTable(
  'audit_logs',
  {
    id: varchar('id', { length: 191 }).primaryKey(),
    userId: varchar('user_id', { length: 191 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    entity: varchar('entity', { length: 128 }).notNull(),
    entityId: varchar('entity_id', { length: 191 }).notNull(),
    action: varchar('action', { length: 64 }).notNull(),
    before: json('before'),
    after: json('after'),
    createdAt: timestamp('created_at', { fsp: 3 }).notNull().defaultNow(),
  },
  (table) => ({
    entityIdx: index('audit_logs_entity_entity_id_idx').on(table.entity, table.entityId),
    userIdx: index('audit_logs_user_id_idx').on(table.userId),
  }),
);
