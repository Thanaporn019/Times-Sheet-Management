-- CREATE SEQUENCE project_projectId_seq;
CREATE TABLE project(
    project_id SERIAL PRIMARY KEY,
	project_name  VARCHAR ,
    project_phase   VARCHAR,
    project_detail   text,
    project_start_date   DATE,
    project_end_date   DATE,
    project_mandays   VARCHAR,
    customer_email   VARCHAR,
    update_date TIMESTAMP,
    update_by   VARCHAR,
    create_date   TIMESTAMP,
    create_by    VARCHAR,
    delete_date  TIMESTAMP,
    delete_by    VARCHAR
);

-- CREATE SEQUENCE type_typeId_seq;
CREATE TABLE type(
    type_id SERIAL PRIMARY KEY,
	type_name  VARCHAR ,
	type_code  VARCHAR ,
    update_date TIMESTAMP,
    update_by   VARCHAR,
    create_date   TIMESTAMP,
    create_by    VARCHAR,
    delete_date  TIMESTAMP,
    delete_by    VARCHAR
);

-- CREATE SEQUENCE work_workId_seq;
CREATE TABLE work(
    work_id SERIAL PRIMARY KEY,
    work_date DATE,
    project_id integer,
    type_id integer,
    work_detail text,
    work_plan VARCHAR,
    work_ref VARCHAR,
    work_manhour VARCHAR,
    work_time_in TIME,
    work_time_out TIME,
    update_date TIMESTAMP,
    update_by   VARCHAR,
    create_date   TIMESTAMP,
    create_by    VARCHAR,
    delete_date  TIMESTAMP,
    delete_by    VARCHAR
);
