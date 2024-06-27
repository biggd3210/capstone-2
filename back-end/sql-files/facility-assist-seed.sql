-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        TRUE),
        ('dbiggers',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Derek',
        'Biggers',
        'biggd3210@gmail.com',
        TRUE);

INSERT INTO facilities (id,
                        facility_name,
                        address,
                        phone,
                        primary_contact,
                        is_home)
VALUES ('wolfe', 'Wolfe Home', '6561 County Road M, Delta, OH 43515', '4198224304', 'Dale Wolfe', TRUE),
        ('second-wind', 'Second Wind', '229 Woodland Ave, Swanton, OH 43558', '4194024108', 'Pauline Harvey', TRUE),
        ('main-office', 'Administrative Office', '6715 Dorr St, Toledo, OH 43615', '4198681178', 'Nancy Harvey', FALSE);