CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE facilities (
    id VARCHAR(25) PRIMARY KEY,
    facility_name TEXT NOT NULL,
    is_home BOOLEAN NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    primary_contact TEXT NOT NULL
);

CREATE TABLE documents (
    id VARCHAR(50) PRIMARY KEY,
    author TEXT NOT NULL,
    doc_type TEXT NOT NULL,
    doc_period TEXT NOT NULL,
    doc_year TEXT NOT NULL,
    file_name TEXT NOT NULL,
    date_time TEXT NOT NULL,
    image_components BOOLEAN NOT NULL,
    due_date TEXT NOT NULL,
    facility_id VARCHAR(25) NOT NULL
        REFERENCES facilities ON DELETE CASCADE
);

CREATE TABLE user_facilities (
    user_id VARCHAR(25)
        REFERENCES users ON DELETE CASCADE,
    facility_id VARCHAR(25)
        REFERENCES facilities ON DELETE CASCADE,
    PRIMARY KEY (username, facility_id)
);

CREATE TABLE images (
    id VARCHAR(100) PRIMARY KEY,
    image_path VARCHAR NOT NULL,
    document_id VARCHAR
        REFERENCES documents ON DELETE CASCADE
);

CREATE TABLE documents_images (
    document_id VARCHAR(50)
        REFERENCES documents ON DELETE CASCADE,
    image_id VARCHAR(100)
        REFERENCES images ON DELETE CASCADE,
    PRIMARY KEY (document_id, image_id)
);