-- Database Schema for SPM Associates

-- Users and Roles
CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    enabled BOOLEAN DEFAULT TRUE
);

CREATE TABLE user_roles (
    user_id BIGINT,
    role_id BIGINT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Employees
CREATE TABLE employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    phone VARCHAR(15),
    email VARCHAR(100),
    address TEXT,
    designation VARCHAR(50), -- Mason, Helper, Supervisor
    salary_type VARCHAR(20), -- DAILY, MONTHLY
    basic_salary DECIMAL(10, 2),
    daily_wage DECIMAL(10, 2),
    joining_date DATE,
    aadhaar_number VARCHAR(20),
    pan_number VARCHAR(20),
    bank_account_number VARCHAR(30),
    ifsc_code VARCHAR(15),
    status VARCHAR(20) DEFAULT 'ACTIVE'
);

-- Sites
CREATE TABLE sites (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    client_name VARCHAR(100),
    budget DECIMAL(15, 2),
    start_date DATE,
    status VARCHAR(20) DEFAULT 'ONGOING'
);

-- Attendance
CREATE TABLE attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT,
    site_id BIGINT,
    date DATE NOT NULL,
    status VARCHAR(20), -- PRESENT, ABSENT, HALF_DAY
    check_in_time TIME,
    check_out_time TIME,
    overtime_hours DECIMAL(4, 2) DEFAULT 0,
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (site_id) REFERENCES sites(id)
);

-- Payroll
CREATE TABLE salaries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT,
    month INT,
    year INT,
    total_days_worked DECIMAL(4, 1),
    basic_amount DECIMAL(10, 2),
    da_amount DECIMAL(10, 2),
    hra_amount DECIMAL(10, 2),
    overtime_amount DECIMAL(10, 2),
    bonus_amount DECIMAL(10, 2),
    deductions DECIMAL(10, 2), -- PF, Tax, Loan
    net_salary DECIMAL(10, 2),
    payment_status VARCHAR(20) DEFAULT 'PENDING',
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- Suppliers and Materials
CREATE TABLE suppliers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    phone VARCHAR(15),
    gst_number VARCHAR(20),
    address TEXT
);

CREATE TABLE materials (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    unit VARCHAR(20), -- kg, bags, sqft
    description TEXT
);

CREATE TABLE supplier_bills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    supplier_id BIGINT,
    site_id BIGINT,
    bill_number VARCHAR(50),
    bill_date DATE,
    total_amount DECIMAL(12, 2),
    paid_amount DECIMAL(12, 2) DEFAULT 0,
    status VARCHAR(20), -- PAID, PARTIAL, PENDING
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
    FOREIGN KEY (site_id) REFERENCES sites(id)
);

-- Invoices (Client Billing)
CREATE TABLE invoices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    site_id BIGINT,
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    invoice_date DATE,
    due_date DATE,
    subtotal DECIMAL(15, 2),
    tax_amount DECIMAL(15, 2),
    total_amount DECIMAL(15, 2),
    status VARCHAR(20), -- DRAFT, SENT, PAID
    FOREIGN KEY (site_id) REFERENCES sites(id)
);

CREATE TABLE invoice_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    invoice_id BIGINT,
    description VARCHAR(255),
    quantity DECIMAL(10, 2),
    unit_price DECIMAL(10, 2),
    amount DECIMAL(12, 2),
    FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);

-- Initial Data
INSERT INTO roles (name) VALUES ('ROLE_ADMIN'), ('ROLE_MANAGER'), ('ROLE_ACCOUNTANT');
INSERT INTO users (username, password, email, enabled) VALUES ('admin', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'admin@spm.com', TRUE); -- password: password
INSERT INTO user_roles (user_id, role_id) SELECT u.id, r.id FROM users u, roles r WHERE u.username = 'admin' AND r.name = 'ROLE_ADMIN';
