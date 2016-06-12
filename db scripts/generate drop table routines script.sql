

SELECT table_name
	  CONCAT('DROP Table ' ,`'table_schema,'`.`',table_name,'`;') as stmt
FROM information_schema.tables
WHERE table_schema =  'dreamdkp_pms'

SELECT
    CONCAT('DROP ',ROUTINE_TYPE,' `',ROUTINE_SCHEMA,'`.`',ROUTINE_NAME,'`;') as stmt
FROM information_schema.ROUTINES
where routine_schema = 'dreamdkp_pms'


DROP PROCEDURE `dreamdkp_pms`.`add_update_doctor`;
DROP PROCEDURE `dreamdkp_pms`.`add_update_locations`;
DROP PROCEDURE `dreamdkp_pms`.`add_update_patient_birth_details`;
DROP PROCEDURE `dreamdkp_pms`.`authenticate`;
DROP PROCEDURE `dreamdkp_pms`.`book_appointment`;
DROP PROCEDURE `dreamdkp_pms`.`create_modify_medical_programme`;
DROP PROCEDURE `dreamdkp_pms`.`create_modify_patient`;
DROP PROCEDURE `dreamdkp_pms`.`create_modify_patients_programme`;
DROP PROCEDURE `dreamdkp_pms`.`create_modify_schedule`;
DROP PROCEDURE `dreamdkp_pms`.`create_modify_staff`;
DROP PROCEDURE `dreamdkp_pms`.`create_schedule`;
DROP PROCEDURE `dreamdkp_pms`.`getDoctorInfo`;
DROP PROCEDURE `dreamdkp_pms`.`get_all_doctors`;
DROP PROCEDURE `dreamdkp_pms`.`get_all_doctor_locations`;
DROP PROCEDURE `dreamdkp_pms`.`get_delivery_methods`;
DROP PROCEDURE `dreamdkp_pms`.`get_medication_programme`;
DROP PROCEDURE `dreamdkp_pms`.`get_medication_programme_list`;
DROP PROCEDURE `dreamdkp_pms`.`get_patients_list`;
DROP PROCEDURE `dreamdkp_pms`.`get_patients_programmes`;
DROP PROCEDURE `dreamdkp_pms`.`get_patients_programme_details`;
DROP PROCEDURE `dreamdkp_pms`.`get_patient_details`;
DROP PROCEDURE `dreamdkp_pms`.`get_programme_list_details`;
DROP PROCEDURE `dreamdkp_pms`.`get_schedule_calander_details`;
DROP PROCEDURE `dreamdkp_pms`.`get_schedule_list`;
DROP PROCEDURE `dreamdkp_pms`.`get_staff_details`;
DROP PROCEDURE `dreamdkp_pms`.`get_staff_list_for_doctor`;
DROP PROCEDURE `dreamdkp_pms`.`get_user_info_for_login`;
DROP PROCEDURE `dreamdkp_pms`.`make_reset_password_request`;
DROP PROCEDURE `dreamdkp_pms`.`reset_password`;
