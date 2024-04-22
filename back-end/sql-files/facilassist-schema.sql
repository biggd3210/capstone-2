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
    name TEXT NOT NULL,
    is_home BOOLEAN NOT NULL
)

CREATE TABLE user_facilities (
    username VARCHAR(25)
        REFERENCES user ON DELETE CASCADE,
    facility_id VARCHAR(25)
        REFERENCES facilities ON DELETE CASCADE,
    PRIMARY KEY (username, facility_id)
);

