\echo 'Delete and recreate facilassist db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE facilassist;
CREATE DATABASE facilassist;
\connect facilassist

\i facilassist-schema.sql
\i facilassist-seed.sql

\echo 'Delete and recreate facilassist_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE facilassist_test;
CREATE DATABASE facilassist_test;
\connect facilassist_test

\i facilassist-schema.sql
