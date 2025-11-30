CREATE TABLE `audit_logs` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`entity` varchar(128) NOT NULL,
	`entity_id` varchar(191) NOT NULL,
	`action` varchar(64) NOT NULL,
	`before` json,
	`after` json,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notification_logs` (
	`id` varchar(191) NOT NULL,
	`subscription_id` varchar(191) NOT NULL,
	`channel` varchar(64) NOT NULL,
	`status` varchar(64) NOT NULL,
	`response` json,
	`sent_at` datetime(3) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `notification_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notification_settings` (
	`id` varchar(191) NOT NULL,
	`subscription_id` varchar(191) NOT NULL,
	`advance_days` int NOT NULL,
	`channel` varchar(64) NOT NULL,
	`active` boolean NOT NULL DEFAULT true,
	`last_sent_at` datetime(3),
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `notification_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `notification_settings_subscription_channel_key` UNIQUE(`subscription_id`,`channel`)
);
--> statement-breakpoint
CREATE TABLE `subscription_templates` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`logo_url` varchar(512),
	`default_price` decimal(10,2),
	`currency` varchar(16) NOT NULL DEFAULT 'CNY',
	`cycle` varchar(64) NOT NULL,
	`category` varchar(128),
	`description` text,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscription_templates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`logo_url` varchar(512),
	`price` decimal(10,2) NOT NULL,
	`currency` varchar(16) NOT NULL DEFAULT 'CNY',
	`cycle` varchar(64) NOT NULL,
	`custom_cycle_days` int,
	`next_due_date` datetime(3) NOT NULL,
	`category` varchar(128),
	`notes` text,
	`status` varchar(32) NOT NULL DEFAULT 'active',
	`payment_method` varchar(128),
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`template_id` varchar(191),
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(191) NOT NULL,
	`open_id` varchar(191) NOT NULL,
	`union_id` varchar(191),
	`phone` varchar(32),
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`last_login_at` datetime(3),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_open_id_unique` UNIQUE(`open_id`),
	CONSTRAINT `users_union_id_unique` UNIQUE(`union_id`),
	CONSTRAINT `users_phone_unique` UNIQUE(`phone`)
);
--> statement-breakpoint
CREATE INDEX `audit_logs_entity_entity_id_idx` ON `audit_logs` (`entity`,`entity_id`);--> statement-breakpoint
CREATE INDEX `audit_logs_user_id_idx` ON `audit_logs` (`user_id`);--> statement-breakpoint
CREATE INDEX `notification_logs_subscription_id_idx` ON `notification_logs` (`subscription_id`);--> statement-breakpoint
CREATE INDEX `notification_settings_subscription_id_idx` ON `notification_settings` (`subscription_id`);--> statement-breakpoint
CREATE INDEX `subscriptions_user_id_idx` ON `subscriptions` (`user_id`);--> statement-breakpoint
CREATE INDEX `subscriptions_template_id_idx` ON `subscriptions` (`template_id`);--> statement-breakpoint
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notification_logs` ADD CONSTRAINT `notification_logs_subscription_id_subscriptions_id_fk` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notification_settings` ADD CONSTRAINT `notification_settings_subscription_id_subscriptions_id_fk` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_template_id_subscription_templates_id_fk` FOREIGN KEY (`template_id`) REFERENCES `subscription_templates`(`id`) ON DELETE set null ON UPDATE no action;