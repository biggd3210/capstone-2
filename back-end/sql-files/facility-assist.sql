\echo 'Delete and recreate facility-assist db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE facility_assist;
CREATE DATABASE facility_assist;
\connect facilassist

\i facility-assist-schema.sql
\i facility-assist-seed.sql

\echo 'Delete and recreate facility_assist_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE facility_assist_test;
CREATE DATABASE facility_assist_test;
\connect facility_assist_test

\i facility-assist-schema.sql
