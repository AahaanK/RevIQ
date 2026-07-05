# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Database Architecture & Selection Justification

### Database Choice: PostgreSQL via Supabase
For the **revIQ Telemetry Ingestion Platform**, **PostgreSQL** hosted on **Supabase** was chosen as our primary storage layer. The engineering justifications for this choice include:

1. **Strict Relational Integrity:** Telemetry ingestion tracking inherently requires relational mapping. By utilizing PostgreSQL, we can enforce rigid foreign key constraints between our `clients` and `telemetry_logs` entities, ensuring that telemetry packets can never exist as orphaned data without a valid tracking parent.
2. **Powerful Join Performance:** The revIQ dashboard relies on compiling high-density matrix feeds that blend client profiles with system log metadata. PostgreSQL excels at low-latency `INNER JOIN` operations, allowing the FastAPI engine to query and package full relational objects in a single database round-trip.
3. **Cloud Scalability & Developer Tooling:** Supabase provides an enterprise-grade cloud PostgreSQL cluster out of the box. It features real-time database streaming listeners, intuitive connection string mapping, and built-in migration tools that accelerate local-to-cloud workspace syncing.

---

## 📊 Relational Database Schema Diagram

Below is the visual structure mapping our database design, detailing all data fields, explicit types, primary/foreign keys, and relational constraints:

![Database Schema Diagram](./schema_diagram.png)

> **Architectural Note:** The system establishes a strict **One-to-Many (1:N)** relationship where a single record inside the `clients` table can generate and reference multiple historic streaming indices inside the `telemetry_logs` container.

---

## 🛠️ "Set Up the Database" Installation Guide

Follow these exact steps to instantiate and sync your database tables with the remote cloud infrastructure:

### 1. Execute the SQL Schema Scripts
Log into your Supabase Workspace console, navigate to the **SQL Editor**, open a new query terminal, and execute the structural commands below to seed your tables:

```sql
-- Step 1: Create the Parent Clients Table
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(255) UNIQUE NOT NULL,
    environment VARCHAR(50) DEFAULT 'Development'
);

-- Step 2: Create the Child Telemetry Logs Table with Foreign Key Constraints
CREATE TABLE telemetry_logs (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
    feedback TEXT NOT NULL,
    priority VARCHAR(50) DEFAULT 'Low',
    badge VARCHAR(100) DEFAULT 'Central Ledger'
);

-- Step 3: Seed Default Mock Tracking Clients for Dashboard Matrix Lookups
INSERT INTO clients (client_name, environment) VALUES 
('1 (Web3Verse App)', 'Development'),
('2 (Spartans Arena Portal)', 'Production');

