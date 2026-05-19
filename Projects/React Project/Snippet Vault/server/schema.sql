-- Run this SQL script in your MySQL client to set up the Snippet Vault database

CREATE DATABASE IF NOT EXISTS snippet_vault;
USE snippet_vault;

CREATE TABLE IF NOT EXISTS snippets (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255)  NOT NULL,
  language    VARCHAR(50)   NOT NULL DEFAULT 'javascript',
  code        LONGTEXT      NOT NULL,
  description TEXT,
  tags        TEXT,                   -- stored as comma-separated string
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
