-- Roles
INSERT IGNORE INTO roles (id, name) VALUES (1, 'ROLE_ADMIN');
INSERT IGNORE INTO roles (id, name) VALUES (2, 'ROLE_MANAGER');
INSERT IGNORE INTO roles (id, name) VALUES (3, 'ROLE_ACCOUNTANT');

-- Admin User (password: password)
INSERT IGNORE INTO users (id, username, password, email, enabled) VALUES (1, 'admin', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'admin@spm.com', TRUE);

-- User Roles
INSERT IGNORE INTO user_roles (user_id, role_id) VALUES (1, 1);
