

drop PROCEDURE if exists `add_update_doctor`;
drop PROCEDURE if exists `add_update_locations`;
drop PROCEDURE if exists `add_update_patient_birth_details`;
drop PROCEDURE if exists `authenticate`;
drop PROCEDURE if exists `book_appointment`;
drop PROCEDURE if exists `create_modify_medical_programme`;
drop PROCEDURE if exists `create_modify_patient`;
drop PROCEDURE if exists `create_modify_patients_programme`;
drop PROCEDURE if exists `create_modify_schedule`;
drop PROCEDURE if exists `create_modify_staff`;
drop PROCEDURE if exists `create_schedule`;
drop PROCEDURE if exists `getDoctorInfo`;
drop PROCEDURE if exists `get_all_doctors`;
drop PROCEDURE if exists `get_all_doctor_locations`;
drop PROCEDURE if exists `get_delivery_methods`;
drop PROCEDURE if exists `get_medication_programme`;
drop PROCEDURE if exists `get_medication_programme_list`;
drop PROCEDURE if exists `get_patients_list`;
drop PROCEDURE if exists `get_patients_programmes`;
drop PROCEDURE if exists `get_patients_programme_details`;
drop PROCEDURE if exists `get_patient_details`;
drop PROCEDURE if exists `get_programme_list_details`;
drop PROCEDURE if exists `get_schedule_calander_details`;
drop PROCEDURE if exists `get_schedule_list`;
drop PROCEDURE if exists `get_staff_details`;
drop PROCEDURE if exists `get_staff_list_for_doctor`;
drop PROCEDURE if exists `get_user_info_for_login`;
drop PROCEDURE if exists `make_reset_password_request`;
drop PROCEDURE if exists `reset_password`;


DROP TABLE IF EXISTS appointment;
DROP TABLE IF EXISTS doctor;
DROP TABLE IF EXISTS login;
DROP TABLE IF EXISTS medication_programme;
DROP TABLE IF EXISTS medication_programme_list;
DROP TABLE IF EXISTS password_reset_request;
DROP TABLE IF EXISTS patient;
DROP TABLE IF EXISTS patient_birth_details;
DROP TABLE IF EXISTS patient_medication_programme;
DROP TABLE IF EXISTS patient_medication_programme_list;
DROP TABLE IF EXISTS schedule;
DROP TABLE IF EXISTS schedule_day;
DROP TABLE IF EXISTS staff;
DROP TABLE IF EXISTS work_locations;