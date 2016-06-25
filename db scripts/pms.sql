-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2016 at 03:03 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `pms`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `add_update_doctor`(IN `pid` INT, IN `pname` VARCHAR(100), IN `pcontact1` VARCHAR(50), IN `pcontact2` VARCHAR(50), IN `pemail` VARCHAR(100), IN `pqualification` VARCHAR(1000), IN `paddress` VARCHAR(2000), IN `precovery_contact` VARCHAR(100), IN `precovery_email` VARCHAR(100), IN `plogin_id` VARCHAR(100), IN `ppassword` VARCHAR(100), IN `pis_active` INT)
    MODIFIES SQL DATA
begin

	declare llogin_id_exists int;
	declare llogin_id int;
	declare ldoctor_id int;

	if COALESCE(pid, 0) > 0 then 

		select fk_login_id
		into @llogin_id
		from doctor
		where  id = pid;
		  
	end if;

    select count(id) 
    into  @llogin_id_exists
    from login
    where login_id = plogin_id
          and id <> COALESCE(@llogin_id, 0);


	if  COALESCE(@llogin_id_exists, 0) = 0 then

		if pid <= 0 then
			
			INSERT INTO `login`( `type`
								, `login_id`
								, `password`
								, `created`
								,last_modified
                                ,is_active
								)
								VALUES 
								('D'
								,plogin_id
								,ppassword
								,now()
								,null
                                ,pis_active
								);
								
			 select max(id)
			 into @llogin_id
			 from login;
			 
			 
			INSERT INTO `doctor`
							(`fk_login_id`
							, `name`
							, `contact1`
							, `contact2`
							, `email`
							, `qualification`
							, `address`
							, `recovery_contact`
							, `recovery_email`
							,is_active
							) 
					VALUES (@llogin_id
							,pname
							,pcontact1
							,pcontact2
							,pemail
							,pqualification
							,paddress
							,precovery_contact
							,precovery_email
							,pis_active
							);
							
		     select max(id)
			 into @ldoctor_id
			 from doctor;
			
		else

			select fk_login_id
			into @llogin_id
			from doctor 
			where id = pid;
			
			set @ldoctor_id = pid;
			
			UPDATE `login` 
					SET `login_id`= plogin_id
					,`password`= ppassword
					,`last_modified`= now()
                    ,is_active = pis_active
			WHERE id = @llogin_id;
			
			
			UPDATE `doctor` 
						SET `name`= pname
						,`contact1`= pcontact1
						,`contact2`= pcontact2
						,`email`= pemail
						,`qualification`= pqualification
						,`address`= paddress
						,`recovery_contact`= precovery_contact
						,`recovery_email`= precovery_email
						,is_active = pis_active
			WHERE id = pid;

	end if;
	
        commit;
		select '1' as status
			   ,@ldoctor_id as id
			   ,pname as name
			   ,'D' as `type`;

	else

		select '-1' as status
				,'-1' as id
				,'-1' as name
				,'-1' as `type`;

	end if;

end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `add_update_locations`(IN `pid` INT, IN `pname` VARCHAR(100), IN `pdoctor_id` INT)
    MODIFIES SQL DATA
begin


	if pid <= 0 then
	
		insert into work_locations(
            						fk_doctor_id
									,name
								  )
							values
									(
                                    pdoctor_id
									,pname
								   );
		else
		
		UPDATE `work_locations` 
		SET `name` = pname
		WHERE id = pid;
		
	
	end if;
end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `add_update_patient_birth_details`(IN `ppatient_id` INT, IN `pdelivery_method_id` INT, IN `pbirth_weight` VARCHAR(20), IN `plength` VARCHAR(20), IN `phead` VARCHAR(20), IN `pblood_group` VARCHAR(10), IN `pmothers_name` VARCHAR(100), IN `pmothers_blood_group` VARCHAR(10), IN `pfathers_name` VARCHAR(100), IN `pfathers_blood_group` VARCHAR(10), IN `psiblings` VARCHAR(100), IN `premarks` VARCHAR(4000), IN `pis_active` INT)
    MODIFIES SQL DATA
begin

declare lbirthEntryExists int;


select count(*)
into   @lbirthEntryExists
from   patient_birth_details
where  fk_patient_id = ppatient_id;

if @lbirthEntryExists = 0 then

INSERT INTO `patient_birth_details`(
									`fk_patient_id`
									 , `fk_delivery_method_id`
									 , `birth_weight`
									 , `length`
									 , `head`
									 , `blood_group`
									 , `mother_name`
									 , `mother_blood_group`
									 , `father_name`
									 , `father_blood_group`
									 , `siblings`
									 , `remarks`
									 , `is_active`
									 ) 
							VALUES (
									ppatient_id
									,pdelivery_method_id
									,pbirth_weight
									,plength
									,phead
									,pblood_group
									,pmothers_name
									,pmothers_blood_group
									,pfathers_name
									,pfathers_blood_group
									,psiblings
									,premarks
									,pis_active
									);
else

UPDATE `patient_birth_details` SET 
									`fk_delivery_method_id` = pdelivery_method_id
									,`birth_weight` = pbirth_weight
									,`length`= plength
									,`head` = phead
									,`blood_group`= pblood_group
									,`mother_name`= pmothers_name
									,`mother_blood_group` = pmothers_blood_group
									,`father_name`= pfathers_name
									,`father_blood_group`= pfathers_blood_group
									,`siblings` = psiblings
									,`remarks` = premarks
									,`is_active`= pis_active 
						WHERE fk_patient_id = ppatient_id;
end if;

select 1 as status;	


end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `authenticate`(IN `plogin_id` VARCHAR(90), IN `ppassword` VARCHAR(90))
    READS SQL DATA
begin

declare lLoginId int;
declare lUserType varchar(5);
declare lname varchar(100);
declare lhashPassword varchar(255);
declare luserId int;
declare ldoctorId int;

set @ldoctorId = -1;

select id
	   ,`type`
	   ,`password`
       into @lLoginId
       		,@lUserType
			,@lhashPassword
       from login
       where login_id = plogin_id
              and is_active = 1;
              
if @lUserType is null then

    select '-1' as id
    	   ,'-1' as `type`
           ,'-1' as name
		   , "" as `password`
		   ,@ldoctorId as doctor_id;
              
              
elseif @lUserType = 'A' then

	select 1 as id
    	   ,@lUserType as `type`
           ,'admin' as name
		   ,@lhashPassword as `password`
		   ,@ldoctorId as doctor_id;
           
elseif @lUserType = 'D' then

	select name
    	   ,id
    into @lname
    	 ,@luserId
    from doctor
    where fk_login_id = @lLoginId;

	select @luserId as id
    	   ,@lUserType as `type`
           ,@lname as name
		   ,@lhashPassword as `password`
		   ,@luserId as doctor_id;
		   
elseif @lUserType = 'S' then

	select first_name
    	   ,id
		   ,fk_doctor_id
    into @lname
    	 ,@luserId
		 ,ldoctorId
    from staff
    where fk_user_id = @lLoginId;

	select @luserId as id
    	   ,@lUserType as `type`
           ,@lname as name
		   ,@lhashPassword as `password`
		   ,@ldoctorId as doctor_id;

end if;

end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `book_appointment`(IN `pdoctor_id` INT, IN `ppatient_id` INT, IN `pappointment_date_time` DATETIME, IN `ppatient_contact` VARCHAR(50), IN `ppatient_email` VARCHAR(50), IN `ppatient_gender` INT, IN `ppatient_DOB` DATE, IN `pdescription` VARCHAR(2000))
    NO SQL
begin

		
	INSERT INTO `appointment`(
								`fk_doctor_id`
								, `fk_patient_id`
								, `appointment_date`
								, `appointment_time_minutes`
								, `description`
								, `appointment_state`
								, `created_date`
								, `is_active`
								) 
						 VALUES (
								  pdoctor_id
								 ,ppatient_id
								 ,pappointment_date_time
								 ,0
								 ,0
								 ,pdescription
								 ,1
								 );
	
	select 1 as state;


end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `cancel_appointment`(IN `pappointment_id` INT, IN `premarks` VARCHAR(3000), IN `pcancelled_by_id` INT, IN `pcancelled_by_type` VARCHAR(5))
    MODIFIES SQL DATA
begin

/*
status 1 appointment cancelled
status 2 appointment cant be cancelled

*/

declare lcanCancelAppointment int;

select count(*)
into @lcanCancelAppointment
from appointment a
where a.id = pappointment_id
	  and a.state = 0
	  and a.is_active = 1;
	  
if @lcanCancelAppointment > 0 then

update appointment a
	set a.state = 2
where a.id = pappointment_id
	  and a.state = 0
	  and a.is_active = 1;
	  
insert into cancelled_appointments (
									fk_appointment_id,
									remarks,
									cancelled_date_time,
									fk_cancelled_by_pk,
									cancelled_by_type
									)
									values
									(
									 pappointment_id,
									 premarks,
									 now(),
									 pcancelled_by_id,
									 pcancelled_by_type
									);
									 
commit;		
select 1 as status;							
end if;

select 2 as status;

end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `close_appointment_proc`(IN `pappointment_id` INT, IN `pclosing_date` VARCHAR(20), IN `pclosing_time_mins` INT, IN `premarks` VARCHAR(3000), IN `pclosed_by_id` INT, IN `pclosed_by_type` VARCHAR(5), IN `pPrescriptionListXML` VARCHAR(65535))
    NO SQL
begin

declare lpatientId int;

select fk_patient_id
into @lpatientId
from appointment
where id = pappointment_id;

if COALESCE(@lpatientId, 0) > 0 then

update appointment a
set a.state = 1
where id = pappointment_id;

insert into close_appointment(
							  fk_appointment_id
							  ,closing_date
							  ,closing_time_mins
							  ,fk_patient_id
							  ,remarks
							  ,created_date_time
							  ,fk_created_by_id
							  ,created_by_type
							  )
						values
						      (
							   pappointment_id
							   ,STR_TO_DATE(pclosing_date, '%d-%m-%Y') 
							   ,pclosing_time_mins
							   ,@lpatientId
							   ,premarks
							   ,now()
							   ,pclosed_by_id
							   ,pclosed_by_type
							  );
							  
select 1 as status;

#need to insert the prescriptions							  
							  
end if;					

select 2 as status;

end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `create_modify_guardian`(IN `pfk_patient_id` INT, IN `pname` VARCHAR(100), IN `pdate_of_birth` VARCHAR(20), IN `pgender` INT, IN `pphone1` VARCHAR(20), IN `pphone2` VARCHAR(20), IN `ppicture_path` VARCHAR(100), IN `pis_active` INT, IN `paddress` VARCHAR(3000))
    MODIFIES SQL DATA
begin

declare lguardianEntryExists int;

select count(*)
into   @lguardianEntryExists
from   guardian
where  fk_patient_id = pfk_patient_id;


if @lguardianEntryExists = 0 then

INSERT INTO `guardian`
					(
					  fk_patient_id
					, `name`
					, `date_of_birth`
					, `gender`
					, `picture_path`
					, `phone1`
					, `phone2`
					, `address`
					, `is_active`
					) VALUES (
					 pfk_patient_id
					,pname
					,STR_TO_DATE(pdate_of_birth, '%d-%m-%Y') 
					,pgender
					,ppicture_path
					,pphone1
					,pphone2
					,paddress
					,pis_active
					);



else

	UPDATE `guardian` SET `name`= pname
						  ,`date_of_birth`= STR_TO_DATE(pdate_of_birth, '%d-%m-%Y') 
						  ,`gender`= pgender
						  ,`phone1`= pphone1
						  ,`phone2`= pphone2
						  ,`address`= paddress
						  ,`picture_path`= ppicture_path
						  ,`is_active` =  pis_active
					WHERE fk_patient_id = pfk_patient_id;
					
end if;

select 1 as status;

#commit

end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `create_modify_medical_programme`(IN `pprogramme_id` INT, IN `pdoctor_id` INT, IN `pprogramme_name` VARCHAR(100), IN `pprogrammes_count` INT, IN `pprogrammes_xml` VARCHAR(65535))
    MODIFIES SQL DATA
begin

	declare lmaxProgrammeId int;
	declare lcounter int;
	
	declare lprogrammeId int;
	declare lprogrammeDuration int;
	declare ldurationText varchar(50);
	declare lvaccine varchar(100);
	declare ldoseNo int;

	if pprogramme_id <= 0 then
			
		INSERT INTO `medication_programme`(
											`fk_doctors_id`
											, `name`
											, `created_date`
											, `is_active`
											) 
									VALUES (
											pdoctor_id
											,pprogramme_name
											,now()
											,1
										   );
										   
		select max(id)
		into @lmaxProgrammeId
		from medication_programme;
		
		set @lcounter = 1;
	
		while @lcounter <= pprogrammes_count do
		
			SELECT ExtractValue(pprogrammes_xml, 'programme/item[$@lcounter]/id')
				   ,ExtractValue(pprogrammes_xml, 'programme/item[$@lcounter]/duration')
				   ,ExtractValue(pprogrammes_xml, 'programme/item[$@lcounter]/text')
				   ,ExtractValue(pprogrammes_xml, 'programme/item[$@lcounter]/vaccine')
				   ,ExtractValue(pprogrammes_xml, 'programme/item[$@lcounter]/doseNo')
			into @lprogrammeId
				 ,@lprogrammeDuration
				 ,@ldurationText
				 ,@lvaccine
				 ,@ldoseNo;
				 
			INSERT INTO `medication_programme_list`(
													 `fk_medication_programme_id`
													, `duration_days`
													, duration_text
													, `medicine`
													, `dose_no`
													, `created_date`
													, `fk_doctor_id`
													, `is_active`
													) 
											VALUES (
													@lmaxProgrammeId
													,@lprogrammeDuration
													,@ldurationText
													,@lvaccine
													,@ldoseNo
													,now()
													,pdoctor_id
													,1
												  );
		
			SET @lcounter = @lcounter + 1;
		END WHILE; 
	

	else
		
		UPDATE `medication_programme` 
		   SET  `name`= pprogramme_name
		 WHERE id = pprogramme_id;
		 
		 set @lcounter = 1;
	
		while @lcounter <= pprogrammes_count do
		
			SELECT ExtractValue(pprogrammes_xml, 'programme/item[$@lcounter]/id')
				   ,ExtractValue(pprogrammes_xml, 'programme/item[$@lcounter]/duration')
				   ,ExtractValue(pprogrammes_xml, 'programme/item[$@lcounter]/text')
				   ,ExtractValue(pprogrammes_xml, 'programme/item[$@lcounter]/vaccine')
				   ,ExtractValue(pprogrammes_xml, 'programme/item[$@lcounter]/doseNo')
			into @lprogrammeId
				 ,@lprogrammeDuration
				 ,@ldurationText
				 ,@lvaccine
				 ,@ldoseNo;
				 
		    if COALESCE(@lprogrammeId, 0)  <= 0 then
				 
			INSERT INTO `medication_programme_list`(
													 `fk_medication_programme_id`
													, `duration_days`
													, duration_text
													, `medicine`
													, `dose_no`
													, `created_date`
													, `fk_doctor_id`
													, `is_active`
													,update_marker
													) 
											VALUES (
													pprogramme_id
													,@lprogrammeDuration
													,@ldurationText
													,@lvaccine
													,@ldoseNo
													,now()
													,pdoctor_id
													,1
													,1
												  );
			else
			
			    				UPDATE `medication_programme_list` 
				   SET  `duration_days`= @lprogrammeDuration
						,`duration_text`= @ldurationText
						,`medicine`= @lvaccine
						,`dose_no`= @ldoseNo
						,`modified_date`= now()
						,`update_marker` = 1 
				WHERE id = @lprogrammeId
					  and fk_medication_programme_id  = pprogramme_id
					  and is_active = 1;

			end if;
		
			SET @lcounter = @lcounter + 1;
		END WHILE; 
		
		UPDATE `medication_programme_list` 
		   SET  is_active = 0
		WHERE  fk_medication_programme_id  = pprogramme_id
			  and update_marker = 0
			  and is_active = 1;
		
				UPDATE `medication_programme_list` 
		   SET  `update_marker` = 0 
		WHERE fk_medication_programme_id  = pprogramme_id
			  and is_active = 1;
		 
		 
	
						
									
	
	end if;
	
	commit;
	
	select 1 as status;
	
end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `create_modify_patient`(IN `pid` INT, IN `pname` VARCHAR(100), IN `pdate_of_birth` VARCHAR(30), IN `pblood_group` VARCHAR(50), IN `pweight` VARCHAR(50), IN `pheight` VARCHAR(50), IN `pgender` INT, IN `pcontact1` VARCHAR(20), IN `pcontact2` VARCHAR(20), IN `paddress` VARCHAR(1000), IN `ppicture_path` VARCHAR(200), IN `pdoctor_id` INT, IN `pfk_logged_in_user_id` INT, IN `plogged_in_user_type` VARCHAR(5), IN `pis_active` INT)
begin

declare lmaxPatientId int;

if pid <= 0 then

INSERT INTO `patient`
					(fk_doctor_id
					,`name`
					, `date_of_birth`
					,  blood_group
					, `weight`
					, `height`
					, `gender`
					, `contact1`
					, `contact2`
					, `address`
					, `picture_path`
					, `created_date`
					, `fk_created_by_id`
					, `created_by_type`
					, `is_active`
					) VALUES (
					pdoctor_id
					,pname
					,STR_TO_DATE(pdate_of_birth, '%d-%m-%Y') 
					,pblood_group
					,pweight
					,pheight
					,pgender
					,pcontact1
					,pcontact2
					,paddress
					,ppicture_path
					,now()
					,pfk_logged_in_user_id
					,plogged_in_user_type
					,pis_active
					);
	select max(id)
	into @lmaxPatientId
	from patient;
	
	select 1 as status
		   ,@lmaxPatientId as patient_id;
							
else

	UPDATE `patient` SET `name`= pname
						  ,`date_of_birth`= STR_TO_DATE(pdate_of_birth, '%d-%m-%Y') 
						  ,blood_group = pblood_group
						  ,`weight`= pweight
						  ,`height`= pheight
						  ,`gender`= pgender
						  ,`contact1`= pcontact1
						  ,`contact2`= pcontact2
						  ,`address`= paddress
						  ,`picture_path`= ppicture_path
						  ,`fk_modified_by_id`= pfk_logged_in_user_id
						  ,`modified_by_type`= plogged_in_user_type
						  ,`is_active` =  pis_active
					WHERE id = pid;
					
	select 1 as status
		  ,pid as patient_id;

end if;

commit;



end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `create_modify_patients_programme`(IN `ppatient_id` INT, IN `pdoctor_id` INT, IN `pprogramme_count` INT, IN `pprogramme_xml` VARCHAR(65535))
    MODIFIES SQL DATA
begin
	declare lprogrammeExists int;
	declare lprogrammeId int;
	declare lprogrammeName varchar(100);
	declare lprogrameDetailsCount int;
	declare lcounter1 int;
	
		declare lcounter2 int;
	declare lprogrammeDetailsExists int;
	declare lprogrammeDetailsId int;
	declare lfkProgrammeListId int;
	declare ldurationDays int;
	declare lmedicine varchar(100);
	declare ldoseNo int;
	declare ldueOn varchar(20);
	declare lgivenOn varchar(20);
	declare lbatchNo varchar(100);
	
	set @lcounter1 = 1;
	
	while @lcounter1 <= pprogramme_count do
	
		SELECT ExtractValue(pprogramme_xml, 'programme/item[$@lcounter1]/id')
			   ,ExtractValue(pprogramme_xml, 'programme/item[$@lcounter1]/name')
			   ,ExtractValue(pprogramme_xml, 'programme/item[$@lcounter1]/count')
		into @lprogrammeId
			 ,@lprogrammeName
			 ,@lprogrameDetailsCount;
			 
				select count(id)
		into @lprogrammeExists
		from patient_medication_programme
		where fk_medication_pogramme_id = @lprogrammeId;
		
		if @lprogrammeExists = 0 then

			INSERT INTO `patient_medication_programme`
						(`fk_patient_id`
						, `fk_doctor_id`
						, `fk_medication_pogramme_id`
						, `name`
						, `created_date`
						,is_active
						) VALUES (
						ppatient_id
						,pdoctor_id
						,@lprogrammeId
						,@lprogrammeName
						,now()
						,1
						);
						
		end if;
		
		set @lcounter2 = 1;
	
		while @lcounter2 <= @lprogrameDetailsCount do
		
			SELECT ExtractValue(pprogramme_xml, 'programme/item[$@lcounter1]/list/item[$@lcounter2]/id')
				   ,ExtractValue(pprogramme_xml, 'programme/item[$@lcounter1]/list/item[$@lcounter2]/programmeListId')
				   ,ExtractValue(pprogramme_xml, 'programme/item[$@lcounter1]/list/item[$@lcounter2]/durationDays')
				   ,ExtractValue(pprogramme_xml, 'programme/item[$@lcounter1]/list/item[$@lcounter2]/medicine')
				   ,ExtractValue(pprogramme_xml, 'programme/item[$@lcounter1]/list/item[$@lcounter2]/doseNo')
				   ,ExtractValue(pprogramme_xml, 'programme/item[$@lcounter1]/list/item[$@lcounter2]/dueOn')
				   ,ExtractValue(pprogramme_xml, 'programme/item[$@lcounter1]/list/item[$@lcounter2]/givenOn')
				   ,ExtractValue(pprogramme_xml, 'programme/item[$@lcounter1]/list/item[$@lcounter2]/batchNo')
			into @lprogrammeDetailsId
				 ,@lfkProgrammeListId
				 ,@ldurationDays
				 ,@lmedicine
				 ,@ldoseNo
				 ,@ldueOn
				 ,@lgivenOn
				 ,@lbatchNo;
		
			select count(id)
			into @lprogrammeDetailsExists
			from patient_medication_programme_list
			where id = @lprogrammeDetailsId;
			
			if @lprogrammeDetailsExists = 0 then
								
				INSERT INTO `patient_medication_programme_list`(
											`fk_patient_id`
											, `fk_doctor_id`
											, `fk_medication_programme_id`
											, fk_medication_programme_list_id
											, `duration_days`
											, `medicine`
											, `dose_no`
											, due_on
											, give_on
											, batch_no
											)
									values(	ppatient_id
											,pdoctor_id
											,@lprogrammeId
											,@lfkProgrammeListId
											,@ldurationDays
											,@lmedicine
											,@ldoseNo
											,STR_TO_DATE(@ldueOn, '%d-%m-%Y') 
											,STR_TO_DATE(@lgivenOn, '%d-%m-%Y') 
											,@lbatchNo);
											
			else
			
				update patient_medication_programme_list 
				   set due_on = STR_TO_DATE(@ldueOn, '%d-%m-%Y') 
					   ,give_on = STR_TO_DATE(@lgivenOn, '%d-%m-%Y') 
					   ,batch_no = @lbatchNo
			    where id = @lprogrammeDetailsId;
				
			end if;
			
			
			
			SET @lcounter2 = @lcounter2 + 1;
			
		END WHILE; 
				
		SET @lcounter1 = @lcounter1 + 1;
	END WHILE; 
		
	
	
	select pprogramme_count as status;

	
end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `create_modify_schedule`(IN `pdoctor_id` INT, IN `pstart_date` VARCHAR(20), IN `pend_date` VARCHAR(20), IN `pschedule_count` INT, IN `plocation_count` INT, IN `pschedule_xml` VARCHAR(65535))
    NO SQL
begin


    DECLARE lmaxScheduleId INT;
	
	DECLARE lnodeCount int DEFAULT 0;
	DECLARE lcounter INT DEFAULT 1;
	declare lcounter2 int;
	
	DECLARE lscheduleDate varchar(20);
	DECLARE llocationId INT;
	DECLARE lstartTimeMins varchar(20);
	DECLARE lendTimeMins varchar(20);
	
	
	INSERT INTO `schedule`
							(`fk_doctor_id`
							, `start_date`
							, `end_date`
							, `created_date`
							, `created_by`
							, `is_active`
							) 
					VALUES (pdoctor_id
							,STR_TO_DATE(pstart_date, '%m-%d-%Y')
							,STR_TO_DATE(pend_date, '%m-%d-%Y')
							,CURDATE()
							,1 							,1
							);
	select max(id)
	into @lmaxScheduleId
	from schedule;
	
	
	set @lcounter = 1;
	WHILE @lcounter <= plocation_count DO
	
		SELECT ExtractValue(pschedule_xml, 'schedules/item[$@lcounter]/id')
		into @llocationId;
		
		set @lcounter2 = 1;
		
		while @lcounter2 <= pschedule_count do
		
			SELECT ExtractValue(pschedule_xml, 'schedules/item[$@lcounter]/schedule/item[$@lcounter2]/date')
				   ,ExtractValue(pschedule_xml, 'schedules/item[$@lcounter]/schedule/item[$@lcounter2]/timeSlots/startTime')
				   ,ExtractValue(pschedule_xml, 'schedules/item[$@lcounter]/schedule/item[$@lcounter2]/timeSlots/startTime')
			into @lscheduleDate
				 ,@lstartTimeMins
				 ,@lendTimeMins;
		
		
			INSERT INTO `schedule_day`
					(
					  fk_doctor_id
					  ,fk_schedule_id
					  ,location_id
					  ,`date`
					  ,start_time_mins
					  ,end_time_mins
					  ,is_active
					 ) 
			 VALUES (
					 pdoctor_id
					,@lmaxScheduleId
					,@llocationId
					,STR_TO_DATE(@lscheduleDate, '%m-%d-%Y')
					,@lstartTimeMins
					,@lendTimeMins
					,1
					 );
		
				 
			SET @lcounter2 = @lcounter2 + 1;
		end while;
		
		SET @lcounter = @lcounter + 1;
	END WHILE;
	
	commit;
	
	SELECT plocation_count as schedule;

end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `create_modify_staff`(IN `pid` INT, IN `pfk_doctor_id` INT, IN `pfk_location_id` INT, IN `pfirst_name` VARCHAR(100), IN `plast_name` VARCHAR(100), IN `pcontact1` VARCHAR(50), IN `pcontact2` VARCHAR(50), IN `pemail` VARCHAR(100), IN `paddress` VARCHAR(1000), IN `puser_name` VARCHAR(100), IN `ppassword` VARCHAR(100), IN `precovery_contact` VARCHAR(50), IN `precovery_email` VARCHAR(100), IN `pfk_logged_in_user_id` INT, IN `plogged_in_user_type` VARCHAR(2), IN `pis_active` INT)
    MODIFIES SQL DATA
begin

	declare llogin_id_exists int;
	declare llogin_id int;
	declare lstaff_id int;

	if COALESCE(pid, 0) > 0 then 

		select fk_user_id
		into @llogin_id
		from staff
		where id = pid;
		  
	end if;
	
    select count(id) 
    into  @llogin_id_exists
    from login
    where login_id = puser_name
          and id <> COALESCE(@llogin_id, 0);
		  
	if  COALESCE(@llogin_id_exists, 0) = 0 then
	
		if pid <= 0 then
		
			INSERT INTO `login`( `type`
						, `login_id`
						, `password`
						, `created`
						,last_modified
						,is_active
						)
						VALUES 
						('S'
						,puser_name
						,ppassword
						,now()
						,null
						,pis_active
						);
								
			 select max(id)
			 into @llogin_id
			 from login;
		
			INSERT INTO `staff`(
								`first_name`,
								`last_name`, 
								`contact1`,
								`contact2`,
								`email`,
								`address`,
								`recovery_contact`,
								`recovery_email`,
								`fk_location_id`,
								`fk_doctor_id`,
								 fk_user_id,
								`fk_created_by_id`,
								created_by_type,
								`created_date`,
								`is_active`) 
					   VALUES (pfirst_name,
							   plast_name,
							   pcontact1,
							   pcontact2,
							   pemail,
							   paddress,
							   precovery_contact,
							   precovery_email,
							   pfk_location_id,
							   pfk_doctor_id,
							   @llogin_id,
							   pfk_logged_in_user_id,
							   plogged_in_user_type,
							   now(),
							   pis_active
							   );
							   
			 select max(id)
			 into @lstaff_id
			 from staff;
			 
		else
		
			select fk_user_id
			into @llogin_id
			from staff 
			where id = pid;
			
			set @lstaff_id = pid;
			
			UPDATE `login` 
					SET `login_id`= puser_name
					,`password`= ppassword
					,`last_modified`= now()
                    ,is_active = pis_active
			WHERE id = @llogin_id;
			
			UPDATE `staff` SET  `first_name`= pfirst_name
								,`last_name`= plast_name
								,`contact1`= pcontact1
								,`contact2`= pcontact2
								,`email`= pemail
								,`address`= paddress
								,`recovery_contact`= precovery_contact
								,`recovery_email`= precovery_email
								,`fk_location_id`= pfk_location_id
								,`fk_doctor_id`= pfk_doctor_id
								,fk_modified_by_id = pfk_logged_in_user_id
								,modified_by_type = plogged_in_user_type
								,modified_date = now()
								,`is_active`= pis_active 
							WHERE id = pid;
				
		end if;
		
		commit;
		select '1' as status
	   ,@lstaff_id as id
	   ,pfirst_name as name
	   ,'S' as `type`;
	
	else

		select '-1' as status
				,'-1' as id
				,'-1' as name
				,'-1' as `type`;

	end if;

end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `create_schedule`(IN `pdoctor_id` INT, IN `pstart_date` VARCHAR(15), IN `pend_date` VARCHAR(15), IN `pschedule_count` INT, IN `plocation_id` INT, IN `puser_id` INT, IN `puser_type` VARCHAR(5), IN `pschedule_xml` VARCHAR(65535))
    MODIFIES SQL DATA
    DETERMINISTIC
begin

    DECLARE lmaxScheduleId INT;
	DECLARE lcounter INT DEFAULT 1;
	
	DECLARE lscheduleDate varchar(20);
	DECLARE lstartTimeMins varchar(20);
	DECLARE lendTimeMins varchar(20);
	DECLARE lisBlocked INT;
	DECLARE lisActive INT;
	
	
	INSERT INTO `schedule`
							(`fk_doctor_id`
							,`start_date`
							,`end_date`
							,`created_date`
							,`created_by`
							,created_by_type
							,`is_active`
							) 
					VALUES (pdoctor_id
							,STR_TO_DATE(pstart_date, '%d-%m-%Y')
							,STR_TO_DATE(pend_date, '%d-%m-%Y')
							,CURDATE()
							,puser_id
							,puser_type
							,1
							);
	select max(id)
	into @lmaxScheduleId
	from schedule;
	
	set @lcounter = 1;
	
	while @lcounter <= pschedule_count do
	
			SELECT ExtractValue(pschedule_xml, 'schedules/item[$@lcounter]/date')
				   ,ExtractValue(pschedule_xml, 'schedules/item[$@lcounter]/startTimeMinutes')
				   ,ExtractValue(pschedule_xml, 'schedules/item[$@lcounter]/endTimeMinutes')
				   ,ExtractValue(pschedule_xml, 'schedules/item[$@lcounter]/isBlocked')
				   ,ExtractValue(pschedule_xml, 'schedules/item[$@lcounter]/active')
			into @lscheduleDate
				 ,@lstartTimeMins
				 ,@lendTimeMins
				 ,@lisBlocked
				 ,@lisActive;
				 
			INSERT INTO `schedule_day`
					(
					  fk_doctor_id
					  ,fk_schedule_id
					  ,location_id
					  ,`date`
					  ,start_time_mins
					  ,end_time_mins
					  ,is_blocked
					  ,is_active
					) 
			 VALUES (
					  pdoctor_id
					  ,@lmaxScheduleId
					  ,plocation_id
					  ,STR_TO_DATE(@lscheduleDate, '%d-%m-%Y')
					  ,@lstartTimeMins
					  ,@lendTimeMins
					  ,@lisBlocked
					  ,@lisActive
					 );
	
			SET @lcounter = @lcounter + 1;
	END WHILE;
	
	commit;
	
	SELECT 1 as status;

end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `getDoctorInfo`(IN `pid` INT)
    READS SQL DATA
SELECT
   d.name ,
   d.contact1 ,
   d.contact2 ,
   d.email ,
   d.qualification ,
   d.address ,
   d.recovery_contact,
   d.recovery_email,
   d.is_active ,
   l.login_id,
   l.password
FROM  doctor d
	  inner join login l on d.fk_login_id = l.id
WHERE d.id = pid$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_all_appointments`(IN `pdoctor_id` INT)
    READS SQL DATA
begin



 select  a.id
     ,a.contact
     ,a.fk_patient_id
           ,a.appointment_date
     ,p.name
           ,l.name as location_name
     ,a.start_mins
     ,a.end_mins
     ,a.description
     ,a.`state`
     ,a.is_rescheduled
 from appointment a
 inner join patient p on a.fk_patient_id = p.id
    inner join work_locations l on a.fk_location_id = l.id
 where a.fk_doctor_id = pdoctor_id
    and a.is_active = 1
 order by a.start_mins asc;


end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_all_doctors`()
    NO SQL
begin

SELECT `id`
		, `name`
		, `contact1`
		, `email`
		, `qualification`
		, `is_active` 
  FROM `doctor`; 



end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_all_doctor_locations`(IN `pdoctor_id` INT)
    NO SQL
begin

select id
	   ,name
from work_locations
where fk_doctor_id = pdoctor_id;


end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_appointments_for_the_day`(IN `pdoctor_id` INT, IN `plocation_id` INT, IN `pdate` VARCHAR(20))
    NO SQL
begin



	select  a.id
		   ,a.contact
		   ,a.fk_patient_id
		   ,p.name
		   ,a.start_mins
		   ,a.end_mins
		   ,a.description
		   ,a.`state`
		   ,a.is_rescheduled
           ,a.fk_location_id as loc
	from appointment a
	inner join patient p on a.fk_patient_id = p.id
	where a.fk_doctor_id = pdoctor_id
		  and a.fk_location_id = case when plocation_id > 0 then  plocation_id else a.fk_location_id end
		  and DATE(a.appointment_date) =  DATE(STR_TO_DATE(pdate, '%d-%m-%Y'))
		  and a.is_active = 1
	order by a.start_mins asc;


end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_birth_details`(IN `ppatient_id` INT)
    READS SQL DATA
begin


SELECT `fk_delivery_method_id`
		, `birth_weight`
		, `length`
		, `head`
		, `blood_group`
		, `mother_name`
		, `mother_blood_group`
		, `father_name`
		, `father_blood_group`
		, `siblings`
		, `remarks`
		, `is_active` 
FROM `patient_birth_details` 
WHERE fk_patient_id = ppatient_id;


end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_delivery_methods`()
    READS SQL DATA
select id
	   ,name
from delivery_methods$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_doctors_checkup_programs`(IN `pdoctor_id` INT)
    READS SQL DATA
select id
	   , name
       , date_format(created_date, '%d %b %Y') as created_date
from medication_programme
where fk_doctors_id = pdoctor_id$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_guardian_info`(IN `ppatient_id` INT)
    NO SQL
begin

SELECT `name`
		, DATE_FORMAT(`date_of_birth`, '%d-%m-%Y') as date_of_birth
		, `gender`
		, `picture_path`
		, `phone1`
		, `phone2`
		, `address`
		, `is_active` 
FROM `guardian` 
WHERE fk_patient_id = ppatient_id;

#commit

end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_medication_programme`(IN `pdoctor_id` INT, IN `pprogramme_id` INT)
    READS SQL DATA
select id
	   , name
       , date_format(created_date, '%d %b %Y') as created_date
from medication_programme
where fk_doctors_id = pdoctor_id
	  and id = pprogramme_id$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_patients_list`(IN `pdoctor_id` INT)
    READS SQL DATA
SELECT `id`
		,`name`
		, date_format(`date_of_birth`, '%d-%m-%Y') as date_of_birth
		, `blood_group`,
		`weight`
		, `height`
		, `gender`
		, `contact1`
		,`address`
		, `picture_path`
        , concat(`name`, ' (', contact1 , ')') as display
FROM `patient` 
WHERE fk_doctor_id = pdoctor_id
	  and is_active = 1$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_patients_programmes`(IN `ppatient_id` INT)
    NO SQL
SELECT 	 id
		,fk_medication_pogramme_id
		, name
FROM patient_medication_programme
WHERE fk_patient_id = ppatient_id$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_patients_programme_details`(IN `ppatient_id` INT, IN `pmedication_programme_id` INT)
    NO SQL
SELECT 	id
		, fk_medication_programme_id
		, fk_medication_programme_list_id
		, duration_days
		, medicine
		, dose_no
		, due_on
		, give_on
		, batch_no
FROM  patient_medication_programme_list 
WHERE fk_patient_id = ppatient_id
	  and fk_medication_programme_id = pmedication_programme_id$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_patient_details`(IN `ppatient_id` INT)
    NO SQL
begin

SELECT  `name`
		, DATE_FORMAT(`date_of_birth`, '%d-%m-%Y') as date_of_birth
		, `blood_group`
		, `weight`
		, `height`
		, `gender`
		, `contact1`
		, `contact2`
		, `email`
		, `address`
		, `picture_path`
        , is_active
FROM `patient` 
WHERE id = ppatient_id;



end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_programme_list_details`(IN `pprogramme_id` INT)
    READS SQL DATA
select `duration_days`
	  , duration_text
	  , `medicine`
      , `dose_no`
      , id
from medication_programme_list
where fk_medication_programme_id = pprogramme_id
	  and is_active = 1$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_schedules_timings_for_the_day`(IN `pdoctor_id` INT, IN `plocation_id` INT, IN `pdate` VARCHAR(20))
    READS SQL DATA
begin

	select sd.start_time_mins
		   ,sd.end_time_mins
           ,sd.location_id as loc_id
	from schedule_day sd
	where sd.fk_doctor_id = pdoctor_id
		  and sd.location_id = case when plocation_id > 0 then plocation_id else sd.location_id end
		  and sd.date = STR_TO_DATE(pdate, '%d-%m-%Y')
		  and sd.is_active = 1;


end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_schedule_calander_details`(IN `pdoctor_id` INT, IN `plocation_id` INT, IN `pstart_date` VARCHAR(10), IN `pend_date` VARCHAR(10))
    READS SQL DATA
begin


SELECT DATE_FORMAT(`date`, '%d-%m-%Y') as `schedule_date`
	   ,start_time_mins 
	   ,end_time_mins 
	   ,fk_schedule_id
  FROM schedule_day 
  WHERE fk_doctor_id = pdoctor_id 
		and location_id = plocation_id
		and `date` >= STR_TO_DATE(pstart_date, '%d-%m-%Y')
		and `date` <= STR_TO_DATE(pend_date, '%d-%m-%Y')
  group by `date`, start_time_mins, end_time_mins 
  order by `date` asc, start_time_mins asc;
  
 end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_schedule_list`(IN `pdoctor_id` INT)
    NO SQL
begin

SELECT s.id
	   ,s.start_date
	   ,s.end_date
	   ,s.created_date
	   ,s.is_active
FROM schedule s 
where s.fk_doctor_id = pdoctor_id;

end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_staff_details`(IN `pid` INT)
    READS SQL DATA
begin

declare luser_id int;
declare luser_name varchar(100);
declare lpassword varchar(100);

select fk_user_id
into   @luser_id
from staff
where  id = pid;

SELECT `login_id`
		,`password`
into   @luser_name
	   ,@lpassword
FROM `login` 
WHERE  id = @luser_id;

SELECT `first_name`
		, `last_name`
		, `contact1`
		, `contact2`
		, `email`
		, `address`
		, `recovery_contact`
		, `recovery_email`
		, `fk_location_id`
		, `is_active`
		,@luser_name as user_name
		,@lpassword as password
FROM `staff` 
WHERE id = pid;

end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_staff_list_for_doctor`(IN `pdoctor_id` INT)
    NO SQL
begin

SELECT   s.id
		,s.first_name
		, s.contact1
		, s.email
		, s.address
		, date_format(s.created_date, '%d-%m-%Y') as created_date
		, s.is_active
		,(select name
		  from work_locations l
		  where l.id = s.fk_location_id) as location
FROM staff s
WHERE fk_doctor_id = pdoctor_id;

end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_user_info`(IN `puser_id` VARCHAR(100))
    READS SQL DATA
begin

declare lLoginId int;
declare lUserType varchar(5);
declare lname varchar(100);
declare lhashPassword varchar(255);
declare luserId int;
declare ldoctorId int;

set @ldoctorId = -1;

select id
	   ,`type`
	   ,`password`
       into @lLoginId
       		,@lUserType
			,@lhashPassword
       from login
       where login_id = puser_id
              and is_active = 1;
              
if @lUserType is null then

    select '-1' as id
    	   ,'-1' as `type`
           ,'-1' as name
		   , "" as `password`
		   ,@ldoctorId as doctor_id;
              
              
elseif @lUserType = 'A' then

	select 1 as id
    	   ,@lUserType as `type`
           ,'admin' as name
		   ,@lhashPassword as `password`
		   ,@ldoctorId as doctor_id;
           
elseif @lUserType = 'D' then

	select name
    	   ,id
    into @lname
    	 ,@luserId
    from doctor
    where fk_login_id = @lLoginId;

	select @luserId as id
    	   ,@lUserType as `type`
           ,@lname as name
		   ,@lhashPassword as `password`
		   ,@luserId as doctor_id;
		   
elseif @lUserType = 'S' then

	select first_name
    	   ,id
		   ,fk_doctor_id
    into @lname
    	 ,@luserId
		 ,ldoctorId
    from staff
    where fk_user_id = @lLoginId;

	select @luserId as id
    	   ,@lUserType as `type`
           ,@lname as name
		   ,@lhashPassword as `password`
		   ,@ldoctorId as doctor_id;

end if;

end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `get_user_info_for_login`(IN `plogin_id_pk` INT)
    READS SQL DATA
begin

	declare lLoginId int;
	declare lUserType varchar(5);
	declare ldoctorId int;
	
	set @ldoctorId = -1;

	select id
		   ,`type`
	into @lLoginId
		,@lUserType
	from login
	where id = plogin_id_pk;
	
	
if @lUserType is null then

    select '-1' as id
    	   ,'-1' as `type`
           ,'-1' as name
		   ,@ldoctorId as doctor_id;
              
              
elseif @lUserType = 'A' then

	select 1 as id
    	   ,@lUserType as `type`
           ,'admin' as name
		   ,@ldoctorId as doctor_id;
           
elseif @lUserType = 'D' then

	select name
    	   ,id
    into @lname
    	 ,@luserId
    from doctor
    where fk_login_id = @lLoginId;

	select @luserId as id
    	   ,@lUserType as `type`
           ,@lname as name
		   ,@luserId as doctor_id;
		   
elseif @lUserType = 'S' then

	select first_name
    	   ,id
		   ,fk_doctor_id
    into @lname
    	 ,@luserId
		 ,ldoctorId
    from staff
    where fk_user_id = @lLoginId;

	select @luserId as id
    	   ,@lUserType as `type`
           ,@lname as name
		   ,@ldoctorId as doctor_id;

end if;


end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `insert_new_appointment`(IN `pdoctor_id` INT, IN `plocation_id` INT, IN `ppatient_id` INT, IN `pappointment_date` VARCHAR(10), IN `pstart_mins` INT, IN `pend_mins` INT, IN `pcreated_by_id` INT, IN `pcreated_by_type` VARCHAR(5), IN `pcontact` VARCHAR(20), IN `pdescription` VARCHAR(2000))
    MODIFIES SQL DATA
begin


INSERT INTO `appointment`(
							`fk_doctor_id`
							, `fk_location_id`
							, `fk_patient_id`
    						, contact
							, `appointment_date`
							, `start_mins`
							, `end_mins`
    						, description
							, `state`
							, `is_rescheduled`
							, `created_date_time`
							, `fk_created_by_pk`
							, `created_by_type`
							, `is_active`
							) VALUES (
							pdoctor_id
							,plocation_id
							,ppatient_id
                            , pcontact
							,STR_TO_DATE(pappointment_date, '%d-%m-%Y')
							,pstart_mins
							,pend_mins
                            ,pdescription
							, 0  # 0 active appointment, 1 closed, 2 cancelled
							,0 # this is  a new appointment and is not rescheduled
							,now()
							,pcreated_by_id
							,pcreated_by_type
							,1 # is active
							);
			
commit;				

end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `make_reset_password_request`(IN `plogin_id` VARCHAR(100))
    MODIFIES SQL DATA
begin
	/*
	description: generates a reset code, which will be used to reset the password
	Ques: what should happen when the user logs in with the old password after, making a password reset request
		   should the request be made invalid, or just leave it, right now, the request will remain valid for some time
		   like two days or so, assuming that user found his password or he dosnt need the account ne more
	status codes
		0;  # every things is alright
		2;  # either the user is inactive, cannot generate password rest for this user
	*/

	DECLARE lstatus INT;
	DECLARE llogin_id_pk INT;
	DECLARE lpreviousRequestCount INT;	
	DECLARE lresetRequestId INT;	
	DECLARE lpassword varchar(100);
	DECLARE luserType varchar(5);	
	DECLARE lrecoveryEmail varchar(100);	
	DECLARE lresetCode varchar(100);	
	declare lexitLoop int;
	declare lmaxNo int;
	declare lminNo int;
	
	
    set @lstatus = 0; # every things is alright
	set @lresetCode  = '';
	set @lrecoveryEmail = '';
	set @lmaxNo = 11350;
	set @lminNo = 1350;
	
	#get the old password, if the use is acitve
	SELECT `password`
		   ,`type`
		   ,id
	into  @lpassword
		  ,@luserType
		  ,@llogin_id_pk
	FROM `login` 
	WHERE login_id = plogin_id
		  and is_active = 1;
		  
	if @lpassword is null then
		set @lstatus = 2;  # either the user is inactive, cannot generate password rest for this user
		
	else 
	# user is active and proceed with makeing a password reset request
	
	# check if a password reset request has already been sent for the existing user on the same email
	# if a request has been made invalidate the last one and make a new one
	# a new request is made because the user can change the recovery
	
    select count(*)
	into @lpreviousRequestCount
	from password_reset_request
	where fk_login_id = @llogin_id_pk
		  and is_valid = 1;
		  
	if COALESCE(@lpreviousRequestCount, 0) > 0 then
		#invalidate the previous requests
			  
		update password_reset_request
		set is_valid = 0
		where fk_login_id = @llogin_id_pk
			  and is_valid = 1;
		
	end if;
	
	# make a fresh request
	
	#generate unique random reset code
	
	
	#set @lresetCode  = 'daddfa2321';
	#generating a unique rest code,
	
	
	set @lexitLoop = 1;
	while COALESCE(@lexitLoop, 0) = 1 do
	
		SELECT concat(
					CAST(CONCAT( CHAR(FLOOR(RAND()*26)+65),FLOOR(100+RAND()*(500-100))) AS CHAR(50))
					, FLOOR(@lminNo +RAND() *(@lmaxNo - @lminNo))
				)AS random_num
		into @lresetCode;
		
		SELECT count(*)
		into @lexitLoop  #  count should be zero
		FROM password_reset_request 
		where reset_code = @lresetCode
			  and is_valid =  1;
	
		SET @lcounter = @lcounter + 1;
	END WHILE;
	
	
	#getting the recovery email
	
	if @luserType = 'D' then
	
		select recovery_email
		into @lrecoveryEmail
		from doctor
		where fk_login_id = @llogin_id_pk;
	
	elseif @luserType = 'S' then
	
		select recovery_email
		into @lrecoveryEmail
		from staff
		where fk_user_id = @llogin_id_pk;
	
	end if;	
	
	INSERT INTO `password_reset_request`(`fk_login_id`
										 , `old_password`
										 , `reset_code`
										 , `recovery_email`
										 , `recovery_mobile`
										 , `created_date_time`
										 , `is_valid`
										 ) 
										VALUES 
										(@llogin_id_pk
										,@lpassword
										,@lresetCode
										,@lrecoveryEmail
										,null
										,now()
										,1
										);
	
	end if;
	
	commit;
	
	select @lstatus as status
		   ,@lresetCode as reset_code
		   ,@lrecoveryEmail as recovery_email;
	
end$$

CREATE DEFINER=`dreamdkp`@`localhost` PROCEDURE `reset_password`(IN `preset_code` VARCHAR(100), IN `pnew_password` VARCHAR(100))
    NO SQL
begin
	
	DECLARE lstatus INT;
	declare llogin_id_pk int;
	declare lreset_request_id int;
	DECLARE ldiff int;
	DECLARE lmaxValidHours int;
	
	set @lstatus = 0;
	set @lmaxValidHours = 48;

	select fk_login_id
		   ,id
		   ,cast( hour(timediff(created_date_time, now())) as SIGNED )
	into  @llogin_id_pk
		  ,@lreset_request_id
		  ,@ldiff
	from password_reset_request
	where reset_code = preset_code
		  and created_date_time < now()
		  and is_valid = 1;
	
	
	if @llogin_id_pk is not null and @ldiff < @lmaxValidHours then
		#if valid entry exists and the request was made less then two days or 48 hours
		  
		update login
		set password = pnew_password
			,last_modified = now()
		where id = @llogin_id_pk
			  and is_active = 1;
			  
		update password_reset_request
		set is_valid = 0
			,modified_date = now()
		where id = @lreset_request_id;
	
	else
		set @lstatus = 2;
	end if;
	
	commit;
	
	select @lstatus as status
		   ,@llogin_id_pk as login_id_pk;
	
end$$

--
-- Functions
--
CREATE DEFINER=`dreamdkp`@`localhost` FUNCTION `check_appointment_avalibility`(`pdoctor_id` INT, `plocation_id` INT, `pappointment_date` VARCHAR(20), `pstart_time` INT, `pend_time` INT) RETURNS int(11)
    NO SQL
begin

	
	declare lnewAppointmentDate date;
	declare lscheduleCount int;

	declare lappointmentSum int;
	
	/*
	inputs of this function to book a new appointment
	pdoctor_id  
	plocation_id
	pappointment_date
	pstart_time -- start time of the new appointment
	pend_time   -- end time for the new appoitment
	
	Return codes
	1 can book appointment
	2 schedule not added or timimgs dont match
	3 appointment timings overlap
	*/
	
	/*
	check if the doctor has added a schedule for this day 
	and check if the timimngs are within this range
	*/
	set @lnewAppointmentDate = STR_TO_DATE(pappointment_date, '%d-%m-%Y');
	
	
	select count(sc.id)
	into   @lscheduleCount
	from schedule_day sc
	where sc.fk_doctor_id = pdoctor_id
		  and sc.location_id = plocation_id
		  and date(sc.`date`) = date(@lnewAppointmentDate)
		  and sc.start_time_mins <= pstart_time
		  and sc.end_time_mins >= pend_time
		  and sc.is_blocked = 0
		  and sc.is_active = 1;
		  
	if COALESCE(@lscheduleCount, 0) = 0 then
		return 2;  #either the schedule is not added or the appointment timings dont match
	end if;

	 /*
	 check if there are any appointments on that day, which are over lapping with the current appointment
	 
	 input for is_timing_overlapping(), this function return 1 if there is a timing overlap
	 
	 pnewStartTime - start time for the new appointment
	 pnewEndTime - end time for the new appointment
	 
	 pAppointStartTime  --start time for an existing appointment
	 pAppointEndTime	--end time for an exsiting appointment
	 */

	 
	 select sum(is_timing_overlapping(pstart_time, pend_time, a.start_mins, a.end_mins))
	 into  @lappointmentSum
	 from appointment a
	 where  a.fk_doctor_id = pdoctor_id
			and a.fk_location_id  = plocation_id
			and date(a.appointment_date) = date(@lnewAppointmentDate)
			and a.state = 0
			and a.is_active = 1;
			
	if COALESCE(@lappointmentSum, 0) > 0 then 
		return 3; #appointment is not available on this day
	else
		return 1; #can book appointment 
	end if;




end$$

CREATE DEFINER=`dreamdkp`@`localhost` FUNCTION `isCbetweenAB`(`pointA` INT, `pointB` INT, `pointC` INT) RETURNS int(11)
    NO SQL
begin

#gives 0 if the point c on or in between a and b

declare dotProduct int;
declare lenghtSsuare int;

# dot product (c.x - a.x)*(b.x - a.x) + (c.y - a.y)*(b.y - a.y)
# here x = 0, so pointA = a.y, pointB = b.y and pointC = c.y
# and a.x, b.x and c.x = 0

set @dotProduct = (pointC - pointA) * (pointB -pointA);

if @dotProduct < 0 then
	return 0; 
    #point c does not lie between a and b
end if;

#lengthSquare(ab) = (b.x - a.x)*(b.x - a.x) + (b.y - a.y)*(b.y - a.y)
#here x = 0, so a.x and b.x = 0

set @lenghtSsuare = (pointB - pointA)*(pointB - pointA);

if @dotProduct > @lenghtSsuare then
	return 0;
    #point c does not lie between a and b
end if;

return 1; #return 1, point lies between a and b

end$$

CREATE DEFINER=`dreamdkp`@`localhost` FUNCTION `is_timing_overlapping`(`pnewStartTime` INT, `pnewEndTime` INT, `pAppointStartTime` INT, `pAppointEndTime` INT) RETURNS int(11)
    NO SQL
begin
	
	/*
	 pnewStartTime - start time for the new appointment
	 pnewEndTime - end time for the new appointment
	 
	 pAppointStartTime  --start time for an existing appointment
	 pAppointEndTime	--end time for an exsiting appointment
	 
	*/
	
	#validations start time should net be greater or equal to end time
	if  pnewStartTime >= pnewEndTime 
		or  pAppointStartTime >= pAppointEndTime then
		return 1;
	end if;

	if pnewStartTime >= pAppointEndTime or pnewEndTime <= pAppointStartTime then
		#test to check of the appointments are outside the time range each other
		# i.e it the existing appointment is from 9.15 to 9.30 then the new appointment ends before 
		# or at 9.15 or starts on or after 9.30 
		#can book new appointment
		return 0;
	else
		return 1;
	end if;
	
end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE IF NOT EXISTS `appointment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_doctor_id` int(11) NOT NULL,
  `fk_location_id` int(11) NOT NULL,
  `fk_patient_id` int(11) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `appointment_date` date NOT NULL,
  `start_mins` int(11) NOT NULL,
  `end_mins` int(11) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `state` int(11) NOT NULL,
  `is_rescheduled` int(11) NOT NULL,
  `created_date_time` datetime NOT NULL,
  `fk_created_by_pk` int(11) NOT NULL,
  `created_by_type` varchar(5) NOT NULL,
  `is_active` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `fk_doctor_id`, `fk_location_id`, `fk_patient_id`, `contact`, `appointment_date`, `start_mins`, `end_mins`, `description`, `state`, `is_rescheduled`, `created_date_time`, `fk_created_by_pk`, `created_by_type`, `is_active`) VALUES
(1, 1, 14, 96, '342314', '2016-06-09', 555, 570, 'app', 1, 0, '2016-06-09 15:23:49', 1, 'D', 1),
(7, 1, 14, 105, '4444444', '2016-06-09', 540, 555, 'test appointemtn', 1, 0, '2016-06-11 16:41:13', 1, 'D', 1),
(8, 1, 14, 106, '4352', '2016-06-09', 660, 675, 'Hair fall', 2, 0, '2016-06-12 00:01:08', 1, 'D', 1),
(9, 1, 14, 107, '7038348822', '2016-06-14', 540, 555, 'test problem', 0, 0, '2016-06-14 12:11:46', 1, 'D', 1),
(10, 1, 14, 108, '7038348822', '2016-06-14', 555, 570, 'qwerqew', 0, 0, '2016-06-14 12:21:12', 1, 'D', 1),
(11, 1, 14, 109, '323423', '2016-06-14', 570, 585, 'dsdsfdasf', 0, 0, '2016-06-14 12:28:31', 1, 'D', 1),
(12, 1, 14, 110, '323423', '2016-06-14', 585, 600, 'asdfasd', 0, 0, '2016-06-14 12:28:48', 1, 'D', 1),
(13, 1, 14, 111, '3243', '2016-06-14', 600, 615, 'just a lil test', 0, 0, '2016-06-14 12:54:43', 1, 'D', 1),
(14, 1, 14, 112, '34234', '2016-06-14', 615, 630, 'dfdasf', 0, 0, '2016-06-14 13:19:41', 1, 'D', 1),
(15, 1, 14, 113, '23414', '2016-06-14', 630, 645, 'this is good', 2, 0, '2016-06-14 13:21:10', 1, 'D', 1),
(16, 1, 14, 100, '14242341', '2016-06-15', 540, 555, 'New Appointment', 2, 0, '2016-06-15 09:06:28', 1, 'D', 1),
(17, 1, 14, 100, '14242341', '2016-06-15', 555, 570, 'sdfasd', 2, 0, '2016-06-15 10:59:30', 1, 'D', 1),
(18, 1, 14, 114, '9049035958', '2016-06-15', 555, 570, 'guygu', 2, 0, '2016-06-15 11:54:49', 1, 'D', 1),
(19, 1, 14, 93, '14242341', '2016-06-15', 540, 555, 'temp', 0, 0, '2016-06-15 16:10:28', 1, 'D', 1),
(20, 1, 14, 106, '4352', '2016-06-15', 660, 675, 'test jay', 0, 0, '2016-06-15 16:12:10', 1, 'D', 1),
(21, 1, 14, 108, '7038348822', '2016-06-15', 615, 630, 'Tim ', 0, 0, '2016-06-15 16:12:57', 1, 'D', 1),
(22, 1, 14, 115, '23414', '2016-06-15', 555, 565, 'asda', 0, 0, '2016-06-15 18:02:56', 1, 'D', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cancelled_appointments`
--

CREATE TABLE IF NOT EXISTS `cancelled_appointments` (
  `fk_appointment_id` int(11) NOT NULL,
  `remarks` varchar(300) NOT NULL,
  `cancelled_date_time` datetime NOT NULL,
  `fk_cancelled_by_pk` int(11) NOT NULL,
  `cancelled_by_type` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cancelled_appointments`
--

INSERT INTO `cancelled_appointments` (`fk_appointment_id`, `remarks`, `cancelled_date_time`, `fk_cancelled_by_pk`, `cancelled_by_type`) VALUES
(17, 'cancel', '2016-06-15 11:04:03', 1, 'D'),
(17, 'asdfasd', '2016-06-15 11:06:17', 1, 'D'),
(17, 'asdfasd', '2016-06-15 11:08:56', 1, 'D'),
(17, 'sdfasdf', '2016-06-15 11:10:50', 1, 'D'),
(17, '', '2016-06-15 11:12:58', 1, 'D'),
(17, 'cancel', '2016-06-15 11:14:47', 1, 'D'),
(17, 'dfasadf', '2016-06-15 11:16:10', 1, 'D'),
(17, 'cancel', '2016-06-15 11:17:38', 1, 'D'),
(17, 'this is cancelled for test', '2016-06-15 11:18:44', 1, 'D'),
(15, 'cancel', '2016-06-15 11:51:24', 1, 'D'),
(16, 'dfasdfasd', '2016-06-15 16:09:59', 1, 'D'),
(18, 'test', '2016-06-15 16:11:05', 1, 'D');

-- --------------------------------------------------------

--
-- Table structure for table `close_appointment`
--

CREATE TABLE IF NOT EXISTS `close_appointment` (
  `fk_appointment_id` int(11) NOT NULL,
  `closing_date` date NOT NULL,
  `closing_time_mins` int(11) NOT NULL,
  `fk_patient_id` int(11) NOT NULL,
  `remarks` varchar(3000) NOT NULL,
  `created_date_time` datetime NOT NULL,
  `fk_created_by_id` int(11) NOT NULL,
  `created_by_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `close_appointment`
--

INSERT INTO `close_appointment` (`fk_appointment_id`, `closing_date`, `closing_time_mins`, `fk_patient_id`, `remarks`, `created_date_time`, `fk_created_by_id`, `created_by_type`) VALUES
(1, '0000-00-00', 9, 96, 'remarks are there', '2016-06-17 10:52:39', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `close_appointment_documents`
--

CREATE TABLE IF NOT EXISTS `close_appointment_documents` (
  `id` int(11) NOT NULL,
  `fk_appointment_id` int(11) NOT NULL,
  `document_name` varchar(200) NOT NULL,
  `document_path` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `close_appointment_prescriptions`
--

CREATE TABLE IF NOT EXISTS `close_appointment_prescriptions` (
  `id` int(11) NOT NULL,
  `fk_appointment_id` int(11) NOT NULL,
  `medicine_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `delivery_methods`
--

CREATE TABLE IF NOT EXISTS `delivery_methods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `delivery_methods`
--

INSERT INTO `delivery_methods` (`id`, `name`) VALUES
(1, 'Normal'),
(2, 'Forceps');

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE IF NOT EXISTS `doctor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_login_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `contact1` varchar(50) NOT NULL,
  `contact2` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `qualification` varchar(1000) NOT NULL,
  `address` varchar(2000) NOT NULL,
  `recovery_contact` varchar(100) NOT NULL,
  `recovery_email` varchar(100) NOT NULL,
  `is_active` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`id`, `fk_login_id`, `name`, `contact1`, `contact2`, `email`, `qualification`, `address`, `recovery_contact`, `recovery_email`, `is_active`) VALUES
(1, 33, 'Abharamasdf', '3412', '213412', 'fsdf@sdf.com', 'wqwer', 'wer', 'qwer', 'azzyxec@gmail.com', 1),
(2, 34, 'Abharamasdf', '3412', '213412', 'fsdf@sdf.com', 'wqwer', 'wer', 'qwer', 'qwer', 1),
(3, 35, 'Abharamasdf', '3412', '213412', 'fsdf@sdf.com', 'wqwer', 'wer', 'qwer', 'qwer', 1),
(4, 36, 'Ginna Grannis', '3214234', '4234123', 'asdfad@gmail.com', 'MBBS Neurology', 'Cali', '', '', 1),
(5, 37, 'Ginna Grannis', '3214234', '4234123', 'asdfad@gmail.com', 'MBBS Neurology', 'Cali', '', '', 1),
(6, 38, 'Ginna Grannis', '3214234', '4234123', 'asdfad@gmail.com', 'MBBS Neurology', 'Cali', '', '', 1),
(7, 39, 'Ginna Grannis', '3214234', '4234123', 'asdfad@gmail.com', 'MBBS Neurology', 'Cali', '', '', 1),
(8, 40, 'Ginna Grannis', '3214234', '4234123', 'asdfad@gmail.com', 'MBBS Neurology', 'Cali', '', '', 1),
(9, 41, 'Ginna Grannis', '3214234', '4234123', 'asdfad@gmail.com', 'MBBS Neurology', 'Cali', '', '', 1),
(10, 42, 'Ginna Grannis', '3214234', '4234123', 'asdfad@gmail.com', 'MBBS Neurology', 'Cali', '', '', 1),
(11, 43, 'Ginna Grannis', '3214234', '4234123', 'asdfad@gmail.com', 'MBBS Neurology', 'Cali', '', '', 1),
(12, 44, 'Ginna Grannis', '3214234', '4234123', 'asdfad@gmail.com', 'MBBS Neurology', 'Cali', '', '', 1),
(13, 45, 'Ginna Grannis', '3214234', '4234123', 'asdfad@gmail.com', 'MBBS Neurology', 'Cali', '', '', 1),
(14, 46, 'Ginna Grannis', '3214234', '4234123', 'asdfad@gmail.com', 'MBBS Neurology', 'Cali', '', '', 1),
(15, 47, 'Ginna Grannis', '3214234', '4234123', 'asdfad@gmail.com', 'MBBS Neurology', 'Cali', '', '', 1),
(16, 48, 'Ginna Grannis', '3214234', '4234123', 'asdfad@gmail.com', 'MBBS Neurology', 'Cali', '', '', 1),
(17, 49, 'Ginna Grannis', '3214234', '4234123', 'asdfad@gmail.com', 'MBBS Neurology', 'Cali', '', '', 1),
(18, 50, 'Greg', '2341231111', '12341111', 'asdfasdf', '123411', '1234111', '3333', 'recova', 1),
(19, 51, 'Dino', '341234', '234123', 'fdafd@gmail.com', 'asdf', 'asdf', '3241234', 'asdfsd', 1),
(20, 52, 'Dino', '341234', '234123', 'fdafd@gmail.com', 'asdf', 'asdf', '3241234', 'asdfsd', 1),
(21, 53, 'ddd', '2134', '2134', 'dsaf', 'asdf', 'asdf', 'asdf', 'asdf', 1),
(22, 54, 'Frank', '1234', '12342', '1234', '1234', '123', 'asdf', 'asdf', 1),
(23, 55, 'Frank', '1234', '12342', '1234', '1234', '123', 'asdf', 'asdf', 1),
(24, 56, 'Savio', '1234512345', '', 'savio@dreamlogic.in', 'MA', 'adjnasldn', '123', 'saviothecooliohotmail.com', 1),
(25, 58, 'savio', '94234234', 'dfasdfa', 'savio@dreamlogic.in', 'asdfasdf', 'asdf', '5245245', 'savio@dreamlogic.in', 1),
(26, 59, 'savio', '94234234', 'dfasdfa', 'savio@dreamlogic.in', 'asdfasdf', 'asdf', '5245245', 'savio@dreamlogic.in', 1);

-- --------------------------------------------------------

--
-- Table structure for table `guardian`
--

CREATE TABLE IF NOT EXISTS `guardian` (
  `fk_patient_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` int(11) NOT NULL,
  `picture_path` varchar(100) DEFAULT NULL,
  `phone1` varchar(20) NOT NULL,
  `phone2` varchar(20) NOT NULL,
  `address` varchar(3000) NOT NULL,
  `is_active` int(11) NOT NULL,
  PRIMARY KEY (`fk_patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `guardian`
--

INSERT INTO `guardian` (`fk_patient_id`, `name`, `date_of_birth`, `gender`, `picture_path`, `phone1`, `phone2`, `address`, `is_active`) VALUES
(93, 'Guardian', '2016-04-01', 1, '2.jpg', '14242341', '12412341', 'Osaka', 1),
(94, 'Guardian', '2016-04-01', 1, '2.jpg', '14242341', '12412341', 'Osaka', 1),
(95, 'Guardian1', '2020-04-20', 1, NULL, '14242341', '12412341', 'Osaka', 1),
(96, 'Guardian', '2016-04-01', 1, '2.jpg', '14242341', '12412341', 'Osaka', 1);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(10) NOT NULL,
  `login_id` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  `last_modified` datetime DEFAULT NULL,
  `is_active` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=60 ;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `type`, `login_id`, `password`, `created`, `last_modified`, `is_active`) VALUES
(1, 'A', 'admin', 'admin', '1899-11-30 00:00:00', '0000-00-00 00:00:00', 1),
(33, 'D', 'gogo', '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', '2016-05-01 18:26:09', '2016-06-04 18:17:01', 1),
(34, 'D', 'gog', 'gogo', '2016-05-01 18:54:35', NULL, 1),
(35, 'D', 'ggg', 'gogo', '2016-05-01 18:56:40', NULL, 1),
(36, 'D', 'ginna', 'ginna', '2016-05-02 10:44:51', NULL, 1),
(37, 'D', 'ginna1', 'ginna', '2016-05-02 10:52:49', NULL, 1),
(38, 'D', 'ginna2', 'ginna', '2016-05-02 11:16:49', NULL, 1),
(39, 'D', 'ginna3', 'ginna', '2016-05-02 11:18:09', NULL, 1),
(40, 'D', 'ginna4', 'ginna', '2016-05-02 11:18:56', NULL, 1),
(41, 'D', 'ginna5', 'ginna', '2016-05-02 11:19:25', NULL, 1),
(42, 'D', 'ginna6', 'ginna', '2016-05-02 11:19:48', NULL, 1),
(43, 'D', 'ginna8', 'ginna', '2016-05-02 11:20:39', NULL, 1),
(44, 'D', 'ginna9', 'ginna', '2016-05-02 11:21:03', NULL, 1),
(45, 'D', 'ginna10', 'ginna', '2016-05-02 11:21:28', NULL, 1),
(46, 'D', 'ginna11', 'ginna', '2016-05-02 11:22:34', NULL, 1),
(47, 'D', 'ginna12', 'ginna', '2016-05-02 11:22:50', NULL, 1),
(48, 'D', 'ginna13', 'ginna', '2016-05-02 11:23:31', NULL, 1),
(49, 'D', 'ginna14', 'ginna', '2016-05-02 11:23:47', NULL, 1),
(50, 'D', 'greg', 'greg', '2016-05-02 13:44:21', '2016-06-02 23:14:18', 1),
(51, 'D', 'dino', 'dino', '2016-05-04 00:02:56', '2016-05-14 01:38:07', 1),
(52, 'D', 'dino1', 'dino1', '2016-05-04 00:03:22', NULL, 1),
(53, 'D', 'kkkk', 'kkkk', '2016-05-04 00:04:30', NULL, 1),
(54, 'D', 'frank', 'frank', '2016-05-04 00:16:08', NULL, 1),
(55, 'D', 'frank2', 'frank2', '2016-05-04 00:17:25', '2016-05-04 00:33:15', 1),
(56, 'D', 'saviopereira88', 'cipla@123', '2016-05-13 21:46:23', '2016-05-14 01:31:31', 1),
(57, 'S', 'usie', 'usie', '2016-05-28 22:35:17', NULL, 1),
(58, 'D', 'savio', '$2y$12$/W.gLAwQ/i5/FnVeHnJBDOe.N.2MBLW/wZL7Ma30I33dT.C5J86y.', '2016-06-15 21:07:02', NULL, 1),
(59, 'D', 'savio1', '$2y$12$f0Yjda8tXKfNPyGnjC7VDuSU3UV5fW9.5VeGcbBJwpfMlRTf5ogti', '2016-06-15 21:07:22', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `medication_programme`
--

CREATE TABLE IF NOT EXISTS `medication_programme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_doctors_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_date` date NOT NULL,
  `is_active` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `medication_programme`
--

INSERT INTO `medication_programme` (`id`, `fk_doctors_id`, `name`, `created_date`, `is_active`) VALUES
(1, 18, 'Newnatal', '2016-05-10', 1),
(2, 18, 'Newnatal1', '2016-05-10', 1),
(6, 18, 'Yo self b4 others', '2016-05-12', 1),
(7, 18, 'Yo self b4 others', '2016-05-12', 1),
(8, 18, 'Yo self b4 others', '2016-05-12', 1),
(9, 18, 'Get Will Soon edited', '2016-05-12', 1),
(10, 1, 'Test', '2016-06-07', 1);

-- --------------------------------------------------------

--
-- Table structure for table `medication_programme_list`
--

CREATE TABLE IF NOT EXISTS `medication_programme_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_medication_programme_id` int(11) NOT NULL,
  `duration_days` int(11) NOT NULL,
  `duration_text` varchar(50) NOT NULL,
  `medicine` varchar(100) NOT NULL,
  `dose_no` int(11) NOT NULL,
  `created_date` date NOT NULL,
  `is_active` int(11) NOT NULL,
  `fk_doctor_id` int(11) NOT NULL,
  `modified_date` datetime DEFAULT NULL,
  `update_marker` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `medication_programme_list`
--

INSERT INTO `medication_programme_list` (`id`, `fk_medication_programme_id`, `duration_days`, `duration_text`, `medicine`, `dose_no`, `created_date`, `is_active`, `fk_doctor_id`, `modified_date`, `update_marker`) VALUES
(1, 1, 0, '', 'BCG', 0, '2016-05-07', 1, 18, '0000-00-00 00:00:00', 0),
(2, 1, 0, '', 'OPV', 0, '2016-05-07', 1, 18, '0000-00-00 00:00:00', 0),
(3, 1, 0, '', 'Hepatatis B', 1, '2016-05-07', 1, 18, '0000-00-00 00:00:00', 0),
(4, 2, 14, '', 'Pnemococcal Conjugate vaccine', 1, '2016-05-09', 1, 18, '0000-00-00 00:00:00', 0),
(5, 2, 14, '', 'DTaP-IPV/Hib', 1, '2016-05-09', 1, 18, '0000-00-00 00:00:00', 0),
(6, 2, 14, '', 'Rotavirus', 1, '2016-05-09', 1, 18, '0000-00-00 00:00:00', 0),
(7, 9, 1, 'One Week', 'XYZ', 0, '2016-05-12', 0, 18, '2016-05-12 23:19:30', 0),
(8, 9, 1, 'One Week', 'XYZ1', 1, '2016-05-12', 1, 18, '2016-05-12 23:25:21', 0),
(9, 9, 2, 'two errk', 'humumculus', 2, '2016-05-12', 1, 18, '2016-05-12 23:25:21', 0),
(10, 9, 3, 'green', 'Cartao', 3, '2016-05-12', 1, 18, NULL, 0),
(11, 10, 2, 'Two', 'zyx', 2, '2016-06-07', 1, 1, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_request`
--

CREATE TABLE IF NOT EXISTS `password_reset_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_login_id` int(11) NOT NULL,
  `old_password` varchar(100) NOT NULL,
  `reset_code` varchar(100) NOT NULL,
  `recovery_email` varchar(100) NOT NULL,
  `recovery_mobile` varchar(20) DEFAULT NULL,
  `created_date_time` datetime NOT NULL,
  `modified_date` datetime DEFAULT NULL,
  `is_valid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=99 ;

--
-- Dumping data for table `password_reset_request`
--

INSERT INTO `password_reset_request` (`id`, `fk_login_id`, `old_password`, `reset_code`, `recovery_email`, `recovery_mobile`, `created_date_time`, `modified_date`, `is_valid`) VALUES
(10, 33, 'gogo', 'D1827518', 'qwer', NULL, '2016-06-02 18:41:06', NULL, 0),
(11, 33, 'gogo', 'K4289892', 'qwer', NULL, '2016-06-02 18:42:38', NULL, 0),
(12, 33, 'gogo', 'C35310237', 'qwer', NULL, '2016-06-02 18:49:13', NULL, 0),
(13, 33, 'gogo', 'O2371538', 'qwer', NULL, '2016-06-02 18:49:41', NULL, 0),
(14, 33, 'gogo', 'C35711114', 'qwer', NULL, '2016-06-02 18:50:05', NULL, 0),
(15, 33, 'gogo', 'N4945269', 'qwer', NULL, '2016-06-02 18:50:40', NULL, 0),
(16, 33, 'gogo', 'A1456724', 'qwer', NULL, '2016-06-02 18:50:53', NULL, 0),
(17, 33, 'gogo', 'L4461436', 'qwer', NULL, '2016-06-02 19:04:28', NULL, 0),
(18, 50, 'greg', 'K11511085', 'recova', NULL, '2016-06-02 19:07:50', NULL, 0),
(19, 50, 'greg', 'X4467364', 'recova', NULL, '2016-06-02 19:07:57', NULL, 0),
(20, 50, 'greg', 'L1605925', 'recova', NULL, '2016-06-02 19:08:05', NULL, 0),
(21, 50, 'greg', 'B3308619', 'recova', NULL, '2016-06-02 19:08:34', NULL, 0),
(22, 50, 'greg', 'X3576865', 'recova', NULL, '2016-06-02 19:10:18', NULL, 0),
(23, 50, 'greg', 'W4813618', 'recova', NULL, '2016-06-02 19:12:00', NULL, 0),
(24, 50, 'greg', 'U2172581', 'recova', NULL, '2016-06-02 19:21:54', '2016-06-02 23:14:18', 0),
(25, 50, 'greg', 'R4504974', 'recova', NULL, '2016-06-02 23:28:56', NULL, 0),
(26, 33, 'gogo', 'L4957008', 'qwer', NULL, '2016-06-03 08:34:22', '2016-06-03 08:35:22', 0),
(27, 33, 'gogi', 'A10611063', 'qwer', NULL, '2016-06-03 20:13:40', NULL, 0),
(28, 33, 'gogi', 'F47411331', 'azzyxec@gmail.com', NULL, '2016-06-03 20:28:28', NULL, 0),
(29, 33, 'gogi', 'D4876042', 'azzyxec@gmail.com', NULL, '2016-06-03 20:29:14', NULL, 0),
(30, 33, 'gogi', 'G3869599', 'azzyxec@gmail.com', NULL, '2016-06-03 20:30:44', NULL, 0),
(31, 33, 'gogi', 'E3193873', 'azzyxec@gmail.com', NULL, '2016-06-03 20:31:20', NULL, 0),
(32, 33, 'gogi', 'R1517904', 'azzyxec@gmail.com', NULL, '2016-06-03 20:40:15', NULL, 0),
(33, 33, 'gogi', 'H1094370', 'azzyxec@gmail.com', NULL, '2016-06-03 20:44:38', NULL, 0),
(34, 50, 'greg', 'I48510306', 'recova', NULL, '2016-06-03 20:45:53', NULL, 1),
(35, 33, 'gogi', 'E1076576', 'azzyxec@gmail.com', NULL, '2016-06-03 20:46:05', NULL, 0),
(36, 33, 'gogi', 'Z3745818', 'azzyxec@gmail.com', NULL, '2016-06-03 20:47:35', NULL, 0),
(37, 33, 'gogi', 'C1544723', 'azzyxec@gmail.com', NULL, '2016-06-03 22:26:39', NULL, 0),
(38, 33, 'gogi', 'Y3545132', 'azzyxec@gmail.com', NULL, '2016-06-03 22:26:47', NULL, 0),
(39, 33, 'gogi', 'T2365394', 'azzyxec@gmail.com', NULL, '2016-06-04 12:18:31', NULL, 0),
(40, 33, 'gogi', 'Q2207751', 'azzyxec@gmail.com', NULL, '2016-06-04 12:21:39', NULL, 0),
(41, 33, 'gogi', 'P39911307', 'azzyxec@gmail.com', NULL, '2016-06-04 12:23:35', NULL, 0),
(42, 33, 'gogi', 'V2869328', 'azzyxec@gmail.com', NULL, '2016-06-04 12:24:41', NULL, 0),
(43, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'P4639026', 'azzyxec@gmail.com', NULL, '2016-06-04 23:48:07', NULL, 0),
(44, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'G4517932', 'azzyxec@gmail.com', NULL, '2016-06-04 23:48:27', NULL, 0),
(45, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'G4669067', 'azzyxec@gmail.com', NULL, '2016-06-04 23:48:44', NULL, 0),
(46, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'K3835060', 'azzyxec@gmail.com', NULL, '2016-06-04 23:48:49', NULL, 0),
(47, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'V45411025', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:05', NULL, 0),
(48, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'V3132771', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:07', NULL, 0),
(49, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'Z1144064', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:07', NULL, 0),
(50, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'W2625747', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:07', NULL, 0),
(51, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'V1401536', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:08', NULL, 0),
(52, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'G23610540', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:08', NULL, 0),
(53, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'J2843940', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:08', NULL, 0),
(54, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'D3832596', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:08', NULL, 0),
(55, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'D4409522', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:09', NULL, 0),
(56, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'Y3403554', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:09', NULL, 0),
(57, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'P4567964', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:09', NULL, 0),
(58, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'H48810690', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:09', NULL, 0),
(59, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'V4398400', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:10', NULL, 0),
(60, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'Z2652103', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:10', NULL, 0),
(61, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'Z1406613', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:11', NULL, 0),
(62, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'G1469562', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:12', NULL, 0),
(63, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'F2514386', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:12', NULL, 0),
(64, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'H1316704', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:12', NULL, 0),
(65, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'F4904448', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:12', NULL, 0),
(66, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'K1849410', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:13', NULL, 0),
(67, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'A4666935', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:13', NULL, 0),
(68, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'U1675820', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:13', NULL, 0),
(69, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'J3551919', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:14', NULL, 0),
(70, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'V2354060', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:31', NULL, 0),
(71, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'Q2764553', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:31', NULL, 0),
(72, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'W4438673', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:32', NULL, 0),
(73, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'X3565874', 'azzyxec@gmail.com', NULL, '2016-06-04 23:49:38', NULL, 0),
(74, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'T1282074', 'azzyxec@gmail.com', NULL, '2016-06-04 23:50:05', NULL, 0),
(75, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'G1317175', 'azzyxec@gmail.com', NULL, '2016-06-04 23:50:07', NULL, 0),
(76, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'G23711113', 'azzyxec@gmail.com', NULL, '2016-06-04 23:50:07', NULL, 0),
(77, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'Y2845955', 'azzyxec@gmail.com', NULL, '2016-06-04 23:50:08', NULL, 0),
(78, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'O4873006', 'azzyxec@gmail.com', NULL, '2016-06-04 23:50:08', NULL, 0),
(79, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'S4696295', 'azzyxec@gmail.com', NULL, '2016-06-04 23:50:09', NULL, 0),
(80, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'I3502809', 'azzyxec@gmail.com', NULL, '2016-06-04 23:50:09', NULL, 0),
(81, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'W3394925', 'azzyxec@gmail.com', NULL, '2016-06-04 23:50:09', NULL, 0),
(82, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'N3527466', 'azzyxec@gmail.com', NULL, '2016-06-04 23:50:09', NULL, 0),
(83, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'E4216102', 'azzyxec@gmail.com', NULL, '2016-06-04 23:50:10', NULL, 0),
(84, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'P1418692', 'azzyxec@gmail.com', NULL, '2016-06-04 23:50:10', NULL, 0),
(85, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'Y4496191', 'azzyxec@gmail.com', NULL, '2016-06-04 23:50:46', NULL, 0),
(86, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'E1309519', 'azzyxec@gmail.com', NULL, '2016-06-04 23:50:51', NULL, 0),
(87, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'U1786991', 'azzyxec@gmail.com', NULL, '2016-06-04 23:50:58', NULL, 0),
(88, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'I3989299', 'azzyxec@gmail.com', NULL, '2016-06-04 23:50:59', NULL, 0),
(89, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'P2512027', 'azzyxec@gmail.com', NULL, '2016-06-04 23:51:00', NULL, 0),
(90, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'R2813676', 'azzyxec@gmail.com', NULL, '2016-06-04 23:51:00', NULL, 0),
(91, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'M1411540', 'azzyxec@gmail.com', NULL, '2016-06-04 23:51:36', NULL, 0),
(92, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'W4874273', 'azzyxec@gmail.com', NULL, '2016-06-04 23:51:54', NULL, 0),
(93, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'H2106623', 'azzyxec@gmail.com', NULL, '2016-06-04 23:51:58', NULL, 0),
(94, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'J3947206', 'azzyxec@gmail.com', NULL, '2016-06-04 23:52:32', NULL, 0),
(95, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'P3737999', 'azzyxec@gmail.com', NULL, '2016-06-04 23:53:02', NULL, 0),
(96, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'O4862497', 'azzyxec@gmail.com', NULL, '2016-06-04 23:54:09', NULL, 0),
(97, 33, '$2y$12$rb0YCYGlpR1JGe12p703ZuHGJg4JHSCXuneDpV/kiSt1W8AVYM5iu', 'V1259638', 'azzyxec@gmail.com', NULL, '2016-06-05 00:03:48', NULL, 1),
(98, 58, '$2y$12$/W.gLAwQ/i5/FnVeHnJBDOe.N.2MBLW/wZL7Ma30I33dT.C5J86y.', 'F4377188', 'savio@dreamlogic.in', NULL, '2016-06-15 21:10:31', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE IF NOT EXISTS `patient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_doctor_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date_of_birth` date NOT NULL,
  `blood_group` varchar(10) NOT NULL,
  `weight` varchar(50) NOT NULL,
  `height` varchar(50) NOT NULL,
  `gender` int(11) NOT NULL DEFAULT '0',
  `contact1` varchar(50) NOT NULL,
  `contact2` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `picture_path` varchar(200) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `fk_created_by_id` int(11) NOT NULL,
  `created_by_type` varchar(5) NOT NULL,
  `modified_date` datetime DEFAULT NULL,
  `fk_modified_by_id` int(11) DEFAULT NULL,
  `modified_by_type` varchar(5) DEFAULT NULL,
  `is_active` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=116 ;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `fk_doctor_id`, `name`, `date_of_birth`, `blood_group`, `weight`, `height`, `gender`, `contact1`, `contact2`, `email`, `address`, `picture_path`, `created_date`, `fk_created_by_id`, `created_by_type`, `modified_date`, `fk_modified_by_id`, `modified_by_type`, `is_active`) VALUES
(93, 1, 'Travolda', '2016-04-01', 'AB+', '2 kgs', '20 cms', 1, '14242341', '12412341', NULL, 'Kanas', '2.jpg', '2016-06-07 12:56:30', 1, 'D', NULL, NULL, NULL, 1),
(94, 1, 'Travolda', '2016-04-01', 'AB+', '2 kgs', '20 cms', 1, '14242341', '12412341', NULL, 'Kanas', '2.jpg', '2016-06-07 12:58:46', 1, 'D', NULL, NULL, NULL, 1),
(95, 1, 'Travolda1', '2016-04-01', 'AB+', '2 kgs', '20 cms', 1, '14242341', '12412341', NULL, 'Kanas', NULL, '2016-06-07 13:06:23', 1, 'D', NULL, 1, 'D', 1),
(96, 1, 'Travolda', '2016-04-01', 'AB+', '2 kgs', '20 cms', 1, '14242341', '12412341', NULL, 'Kanas', '2.jpg', '2016-06-07 15:59:56', 1, 'D', NULL, NULL, NULL, 1),
(100, 1, 'Amanda Lee', '1995-04-01', 'AB+', '57 Kg', '5.8 ft', 0, '14242341', NULL, NULL, NULL, NULL, '2016-06-10 22:43:05', 1, 'D', NULL, NULL, NULL, 1),
(101, 1, 'Amanda Lee', '1995-04-01', 'AB+', '57 Kg', '5.8 ft', 0, '14242341', NULL, NULL, NULL, NULL, '2016-06-10 22:46:27', 1, 'D', NULL, NULL, NULL, 1),
(102, 1, 'Amanda Lee', '1995-04-01', 'AB+', '57 Kg', '5.8 ft', 0, '14242341', NULL, NULL, NULL, NULL, '2016-06-10 22:48:16', 1, 'D', NULL, NULL, NULL, 1),
(103, 1, 'Amanda Lee', '1995-04-01', 'AB+', '57 Kg', '5.8 ft', 0, '14242341', NULL, NULL, NULL, NULL, '2016-06-10 22:48:58', 1, 'D', NULL, NULL, NULL, 1),
(104, 1, 'Greg', '1995-03-21', 'AB+', '67', '5.9 ft', 1, '4444444', NULL, NULL, NULL, NULL, '2016-06-10 22:52:29', 1, 'D', NULL, NULL, NULL, 1),
(105, 1, 'Greg', '1995-03-21', 'AB+', '67', '5.9 ft', 1, '4444444', NULL, NULL, NULL, NULL, '2016-06-11 16:41:13', 1, 'D', NULL, NULL, NULL, 1),
(106, 1, 'Jay', '2016-06-13', 'AB+', '80 kg', '6 ft', 1, '4352', NULL, NULL, NULL, NULL, '2016-06-12 00:01:08', 1, 'D', NULL, NULL, NULL, 1),
(107, 1, 'nes', '2016-06-13', 'AB+', '67 kg', '5.8 ft', 1, '7038348822', NULL, NULL, NULL, NULL, '2016-06-14 12:11:46', 1, 'D', NULL, NULL, NULL, 1),
(108, 1, 'two', '2016-06-13', 'AB+', '67 kg', '5.8 ft', 1, '7038348822', NULL, NULL, NULL, NULL, '2016-06-14 12:21:12', 1, 'D', NULL, NULL, NULL, 1),
(109, 1, 'TEst 3', '2016-06-14', 'sa', '23', '12', 1, '323423', NULL, NULL, NULL, NULL, '2016-06-14 12:28:31', 1, 'D', NULL, NULL, NULL, 1),
(110, 1, 'one more3', '2016-06-14', 'sa', '23', '12', 1, '323423', NULL, NULL, NULL, NULL, '2016-06-14 12:28:48', 1, 'D', NULL, NULL, NULL, 1),
(111, 1, 'Wiz', '2016-06-12', 'A', '34', '21', 1, '3243', NULL, NULL, NULL, NULL, '2016-06-14 12:54:43', 1, 'D', NULL, NULL, NULL, 1),
(112, 1, 'asdf', '2016-06-21', 'a', '434', '43', 1, '34234', NULL, NULL, NULL, NULL, '2016-06-14 13:19:41', 1, 'D', NULL, NULL, NULL, 1),
(113, 1, 'dfasd', '2016-06-22', 'asd', '23', 'e', 1, '23414', NULL, NULL, NULL, NULL, '2016-06-14 13:21:10', 1, 'D', NULL, NULL, NULL, 1),
(114, 1, 'Amanda Lee (14242341)', '1995-04-01', 'AB+', '57 Kg', '5.8 ft', 0, '9049035958', NULL, NULL, NULL, NULL, '2016-06-15 11:54:49', 1, 'D', NULL, NULL, NULL, 1),
(115, 1, 'dfasd (23414)', '2016-06-06', 'A+', '23', 'e', 1, '23414', NULL, NULL, NULL, NULL, '2016-06-15 18:02:56', 1, 'D', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `patient_birth_details`
--

CREATE TABLE IF NOT EXISTS `patient_birth_details` (
  `fk_patient_id` int(11) NOT NULL,
  `fk_delivery_method_id` int(11) NOT NULL,
  `birth_weight` varchar(20) NOT NULL,
  `length` varchar(20) NOT NULL,
  `head` varchar(20) NOT NULL,
  `blood_group` varchar(10) NOT NULL,
  `mother_name` varchar(1000) NOT NULL,
  `mother_blood_group` varchar(10) NOT NULL,
  `father_name` varchar(100) NOT NULL,
  `father_blood_group` varchar(10) NOT NULL,
  `siblings` varchar(1000) NOT NULL,
  `remarks` varchar(4000) NOT NULL,
  `created_date` date NOT NULL,
  `modified_date` date NOT NULL,
  `fk_created_by_id` int(11) NOT NULL,
  `created_by_type` int(11) NOT NULL,
  `fk_modified_by_id` int(11) NOT NULL,
  `modified_by_type` int(11) NOT NULL,
  `is_active` int(11) NOT NULL,
  PRIMARY KEY (`fk_patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient_birth_details`
--

INSERT INTO `patient_birth_details` (`fk_patient_id`, `fk_delivery_method_id`, `birth_weight`, `length`, `head`, `blood_group`, `mother_name`, `mother_blood_group`, `father_name`, `father_blood_group`, `siblings`, `remarks`, `created_date`, `modified_date`, `fk_created_by_id`, `created_by_type`, `fk_modified_by_id`, `modified_by_type`, `is_active`) VALUES
(93, 1, '2 kg', '25 cms', ' 10 cms', 'AB+', 'Jenny', 'B+', 'Edward', 'AB+', '1', 'Test Data', '0000-00-00', '0000-00-00', 0, 0, 0, 0, 1),
(94, 1, '2 kg', '25 cms', ' 10 cms', 'AB+', 'Jenny', 'B+', 'Edward', 'AB+', '1', 'Test Data', '0000-00-00', '0000-00-00', 0, 0, 0, 0, 1),
(95, 2, '2.1 kg', '25 cms', ' 10 cms', 'AB+', 'Jenny', 'B+', 'Edward', 'AB+', '1', 'Test Data...', '0000-00-00', '0000-00-00', 0, 0, 0, 0, 1),
(96, 1, '2 kg', '25 cms', ' 10 cms', 'AB+', 'Jenny', 'B+', 'Edward', 'AB+', '1', 'Test Data', '0000-00-00', '0000-00-00', 0, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `patient_medication_programme`
--

CREATE TABLE IF NOT EXISTS `patient_medication_programme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_patient_id` int(11) NOT NULL,
  `fk_doctor_id` int(11) NOT NULL,
  `fk_medication_pogramme_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_date` date NOT NULL,
  `is_active` int(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `patient_medication_programme`
--

INSERT INTO `patient_medication_programme` (`id`, `fk_patient_id`, `fk_doctor_id`, `fk_medication_pogramme_id`, `name`, `created_date`, `is_active`) VALUES
(8, 93, 1, 0, '', '2016-06-07', 1),
(9, 95, 1, 10, 'Test', '2016-06-07', 1);

-- --------------------------------------------------------

--
-- Table structure for table `patient_medication_programme_list`
--

CREATE TABLE IF NOT EXISTS `patient_medication_programme_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_patient_id` int(11) NOT NULL,
  `fk_doctor_id` int(11) NOT NULL,
  `fk_medication_programme_id` int(11) NOT NULL,
  `fk_medication_programme_list_id` int(11) NOT NULL,
  `duration_days` int(11) NOT NULL,
  `medicine` varchar(100) NOT NULL,
  `dose_no` int(11) NOT NULL,
  `due_on` date DEFAULT NULL,
  `give_on` date DEFAULT NULL,
  `batch_no` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=50 ;

--
-- Dumping data for table `patient_medication_programme_list`
--

INSERT INTO `patient_medication_programme_list` (`id`, `fk_patient_id`, `fk_doctor_id`, `fk_medication_programme_id`, `fk_medication_programme_list_id`, `duration_days`, `medicine`, `dose_no`, `due_on`, `give_on`, `batch_no`) VALUES
(49, 95, 1, 10, 11, 2, 'zyx', 2, '0000-00-00', '0000-00-00', 'daa');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE IF NOT EXISTS `schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_doctor_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_by_type` varchar(5) DEFAULT NULL,
  `is_active` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=74 ;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `fk_doctor_id`, `start_date`, `end_date`, `created_date`, `created_by`, `created_by_type`, `is_active`) VALUES
(70, 18, '2016-06-01', '2016-06-30', '2016-05-29 00:00:00', 18, 'D', 1),
(71, 18, '2016-05-31', '2016-06-15', '2016-05-31 00:00:00', 18, 'D', 1),
(72, 18, '2016-05-31', '2016-06-15', '2016-05-31 00:00:00', 18, 'D', 1),
(73, 1, '2016-06-09', '2016-06-24', '2016-06-09 00:00:00', 1, 'D', 1);

-- --------------------------------------------------------

--
-- Table structure for table `schedule_day`
--

CREATE TABLE IF NOT EXISTS `schedule_day` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_doctor_id` int(11) NOT NULL,
  `fk_schedule_id` int(11) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  `date` int(11) DEFAULT NULL,
  `start_time_mins` int(11) NOT NULL,
  `end_time_mins` int(11) NOT NULL,
  `is_blocked` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=229438 ;

--
-- Dumping data for table `schedule_day`
--

INSERT INTO `schedule_day` (`id`, `fk_doctor_id`, `fk_schedule_id`, `location_id`, `date`, `start_time_mins`, `end_time_mins`, `is_blocked`, `is_active`) VALUES
(229385, 18, 70, 12, 20160601, 540, 720, 0, 1),
(229386, 18, 70, 12, 20160602, 540, 720, 0, 1),
(229387, 18, 70, 12, 20160603, 540, 720, 0, 1),
(229388, 18, 70, 12, 20160606, 540, 720, 0, 1),
(229389, 18, 70, 12, 20160607, 540, 720, 0, 1),
(229390, 18, 70, 12, 20160608, 540, 720, 0, 1),
(229391, 18, 70, 12, 20160609, 540, 720, 0, 1),
(229392, 18, 70, 12, 20160610, 540, 720, 0, 1),
(229393, 18, 70, 12, 20160613, 540, 720, 0, 1),
(229394, 18, 70, 12, 20160614, 540, 720, 0, 1),
(229395, 18, 70, 12, 20160615, 540, 720, 0, 1),
(229396, 18, 70, 12, 20160616, 540, 720, 0, 1),
(229397, 18, 70, 12, 20160617, 540, 720, 0, 1),
(229398, 18, 70, 12, 20160620, 540, 720, 0, 1),
(229399, 18, 70, 12, 20160621, 540, 720, 0, 1),
(229400, 18, 70, 12, 20160622, 540, 720, 0, 1),
(229401, 18, 70, 12, 20160623, 540, 720, 0, 1),
(229402, 18, 70, 12, 20160624, 540, 720, 0, 1),
(229403, 18, 70, 12, 20160627, 540, 720, 0, 1),
(229404, 18, 70, 12, 20160628, 540, 720, 0, 1),
(229405, 18, 70, 12, 20160629, 540, 720, 0, 1),
(229406, 18, 70, 12, 20160630, 540, 720, 0, 1),
(229407, 18, 71, 12, 20160531, 900, 1080, 0, 1),
(229408, 18, 71, 12, 20160601, 900, 1080, 0, 1),
(229409, 18, 71, 12, 20160602, 900, 1080, 0, 1),
(229410, 18, 71, 12, 20160603, 900, 1080, 0, 1),
(229411, 18, 71, 12, 20160606, 900, 1080, 0, 1),
(229412, 18, 71, 12, 20160607, 900, 1080, 0, 1),
(229413, 18, 71, 12, 20160608, 900, 1080, 0, 1),
(229414, 18, 71, 12, 20160609, 900, 1080, 0, 1),
(229415, 18, 71, 12, 20160610, 900, 1080, 0, 1),
(229416, 18, 71, 12, 20160613, 900, 1080, 0, 1),
(229417, 18, 71, 12, 20160614, 900, 1080, 0, 1),
(229418, 18, 71, 12, 20160615, 900, 1080, 0, 1),
(229419, 18, 72, 13, 20160601, 540, 720, 0, 1),
(229420, 18, 72, 13, 20160603, 540, 720, 0, 1),
(229421, 18, 72, 13, 20160606, 540, 720, 0, 1),
(229422, 18, 72, 13, 20160608, 540, 720, 0, 1),
(229423, 18, 72, 13, 20160610, 540, 720, 0, 1),
(229424, 18, 72, 13, 20160613, 540, 720, 0, 1),
(229425, 18, 72, 13, 20160615, 540, 720, 0, 1),
(229426, 1, 73, 14, 20160609, 540, 720, 0, 1),
(229427, 1, 73, 14, 20160610, 540, 720, 0, 1),
(229428, 1, 73, 14, 20160613, 540, 720, 0, 1),
(229429, 1, 73, 14, 20160614, 540, 720, 0, 1),
(229430, 1, 73, 14, 20160615, 540, 720, 0, 1),
(229431, 1, 73, 14, 20160616, 540, 720, 0, 1),
(229432, 1, 73, 14, 20160617, 540, 720, 0, 1),
(229433, 1, 73, 14, 20160620, 540, 720, 0, 1),
(229434, 1, 73, 14, 20160621, 540, 720, 0, 1),
(229435, 1, 73, 14, 20160622, 540, 720, 0, 1),
(229436, 1, 73, 14, 20160623, 540, 720, 0, 1),
(229437, 1, 73, 14, 20160624, 540, 720, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE IF NOT EXISTS `staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `contact1` varchar(50) NOT NULL,
  `contact2` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(2000) NOT NULL,
  `recovery_contact` varchar(50) NOT NULL,
  `recovery_email` varchar(100) NOT NULL,
  `fk_location_id` int(11) NOT NULL,
  `fk_doctor_id` int(11) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `fk_created_by_id` int(11) NOT NULL,
  `created_by_type` varchar(5) NOT NULL,
  `created_date` datetime NOT NULL,
  `fk_modified_by_id` int(11) NOT NULL,
  `modified_by_type` int(11) NOT NULL,
  `modified_date` datetime NOT NULL,
  `is_active` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `first_name`, `last_name`, `contact1`, `contact2`, `email`, `address`, `recovery_contact`, `recovery_email`, `fk_location_id`, `fk_doctor_id`, `fk_user_id`, `fk_created_by_id`, `created_by_type`, `created_date`, `fk_modified_by_id`, `modified_by_type`, `modified_date`, `is_active`) VALUES
(1, 'Ama zone', 'asdf', 'sdf', 'sdf', 'sdf', 'sdf', 'asdf', 'sdaf', 13, 18, 0, 18, 'D', '2016-05-28 22:35:17', 0, 0, '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `work_locations`
--

CREATE TABLE IF NOT EXISTS `work_locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_doctor_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Dumping data for table `work_locations`
--

INSERT INTO `work_locations` (`id`, `fk_doctor_id`, `name`, `description`) VALUES
(12, 18, 'Panjim', ''),
(13, 18, 'Margaon', ''),
(14, 1, 'Margaon', ''),
(15, 1, 'Panjim', ''),
(16, 18, 'dsaf', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
