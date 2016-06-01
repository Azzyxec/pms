-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2016 at 06:25 AM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_update_doctor`(IN `pid` INT, IN `pname` VARCHAR(100), IN `pcontact1` VARCHAR(50), IN `pcontact2` VARCHAR(50), IN `pemail` VARCHAR(100), IN `pqualification` VARCHAR(1000), IN `paddress` VARCHAR(2000), IN `precovery_contact` VARCHAR(100), IN `precovery_email` VARCHAR(100), IN `plogin_id` VARCHAR(100), IN `ppassword` VARCHAR(100), IN `pis_active` INT)
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_update_locations`(IN `pid` INT, IN `pname` VARCHAR(100), IN `pdoctor_id` INT)
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_update_patient_birth_details`(IN `ppatient_id` INT, IN `pdelivery_method_id` INT, IN `pbirth_weight` VARCHAR(20), IN `plength` VARCHAR(20), IN `phead` VARCHAR(20), IN `pblood_group` VARCHAR(10), IN `pmothers_name` VARCHAR(100), IN `pmothers_blood_group` VARCHAR(10), IN `pfathers_name` VARCHAR(100), IN `pfathers_blood_group` VARCHAR(10), IN `psiblings` VARCHAR(100), IN `puser_id` INT, IN `puser_type` VARCHAR(5), IN `pis_active` INT, IN `premarks` VARCHAR(4000))
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
									 , `created_date`
									 , `fk_created_by_id`
									 , `created_by_type`
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
									,now()
									,puser_id
									,puser_type
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
									,`modified_date` = now()
									,`fk_modified_by_id` = puser_id
									,`modified_by_type` = puser_type
									,`is_active`= pis_active 
						WHERE fk_patient_id = ppatient_id;
end if;

select 1 as status;	


end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `authenticate`(IN `plogin_id` VARCHAR(90), IN `ppassword` VARCHAR(90))
    READS SQL DATA
begin

declare lLoginId int;
declare lUserType varchar(5);
declare lname varchar(100);
declare luserId int;
declare ldoctorId int;

set @ldoctorId = -1;

select id
	   ,`type`
       into @lLoginId
       		,@lUserType
       from login
       where login_id = plogin_id
       		  and `password` = ppassword
              and is_active = 1;
              
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `book_appointment`(IN `pdoctor_id` INT, IN `ppatient_id` INT, IN `pappointment_date_time` DATETIME, IN `ppatient_contact` VARCHAR(50), IN `ppatient_email` VARCHAR(50), IN `ppatient_gender` INT, IN `ppatient_DOB` DATE, IN `pdescription` VARCHAR(2000))
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_modify_medical_programme`(IN `pprogramme_id` INT, IN `pdoctor_id` INT, IN `pprogramme_name` VARCHAR(100), IN `pprogrammes_count` INT, IN `pprogrammes_xml` VARCHAR(65535))
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_modify_patient`(IN `pid` INT, IN `pname` VARCHAR(100), IN `pdate_of_birth` VARCHAR(30), IN `pblood_group` VARCHAR(50), IN `pweight` VARCHAR(50), IN `pheight` VARCHAR(50), IN `pgender` INT, IN `pcontact1` VARCHAR(20), IN `pcontact2` VARCHAR(20), IN `paddress` VARCHAR(1000), IN `ppicture_path` VARCHAR(200), IN `pis_guardain` INT, IN `ppatient_id` INT, IN `pdoctor_id` INT)
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
					, `is_guardian`
					, `patient_id`
					, `created_date`
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
					,pis_guardain
					,ppatient_id
					,now()
					,1
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
					WHERE id = pid;
					
	select 1 as status
		  ,pid as patient_id;

end if;

commit;



end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_modify_patients_programme`(IN `ppatient_id` INT, IN `pdoctor_id` INT, IN `pprogramme_count` INT, IN `pprogramme_xml` VARCHAR(65535))
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_modify_schedule`(IN `pdoctor_id` INT, IN `pstart_date` VARCHAR(20), IN `pend_date` VARCHAR(20), IN `pschedule_count` INT, IN `plocation_count` INT, IN `pschedule_xml` VARCHAR(65535))
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_modify_staff`(IN `pid` INT, IN `pfk_doctor_id` INT, IN `pfk_location_id` INT, IN `pfirst_name` VARCHAR(100), IN `plast_name` VARCHAR(100), IN `pcontact1` VARCHAR(50), IN `pcontact2` VARCHAR(50), IN `pemail` VARCHAR(100), IN `paddress` VARCHAR(1000), IN `puser_name` VARCHAR(100), IN `ppassword` VARCHAR(100), IN `precovery_contact` VARCHAR(50), IN `precovery_email` VARCHAR(100), IN `pfk_logged_in_user_id` INT, IN `plogged_in_user_type` VARCHAR(2), IN `pis_active` INT)
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_schedule`(IN `pdoctor_id` INT, IN `pstart_date` VARCHAR(15), IN `pend_date` VARCHAR(15), IN `pschedule_count` INT, IN `plocation_id` INT, IN `puser_id` INT, IN `puser_type` VARCHAR(5), IN `pschedule_xml` VARCHAR(65535))
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `getDoctorInfo`(IN `pid` INT)
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_doctors`()
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_doctor_locations`(IN `pdoctor_id` INT)
    NO SQL
begin

select id
	   ,name
from work_locations
where fk_doctor_id = fk_doctor_id;


end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_delivery_methods`()
    READS SQL DATA
select id
	   ,name
from delivery_methods
where is_active = 1$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_medication_programme`(IN `pdoctor_id` INT, IN `pprogramme_id` INT)
    READS SQL DATA
select id
	   , name
       , date_format(created_date, '%d %b %Y') as created_date
from medication_programme
where fk_doctors_id = pdoctor_id
	  and id = pprogramme_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_medication_programme_list`(IN `pdoctor_id` INT)
    READS SQL DATA
select id
	   , name
       , date_format(created_date, '%d %b %Y') as created_date
from medication_programme
where fk_doctors_id = pdoctor_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_patients_list`(IN `pdoctor_id` INT)
    READS SQL DATA
SELECT `id`
		,`name`
		, `date_of_birth`
		, `blood_group`,
		`weight`
		, `height`
		, `gender`
		, `contact1`
		,`address`
		, `picture_path`
FROM `patient` 
WHERE fk_doctor_id = pdoctor_id
	  and is_guardian = 0$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_patients_programmes`(IN `ppatient_id` INT)
    NO SQL
SELECT 	 id
		,fk_medication_pogramme_id
		, name
FROM patient_medication_programme
WHERE fk_patient_id = ppatient_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_patients_programme_details`(IN `ppatient_id` INT, IN `pmedication_programme_id` INT)
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_patient_details`(IN `ppatient_id` INT)
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
		, `is_guardian`
		, `patient_id`
FROM `patient` 
WHERE id = ppatient_id;



end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_programme_list_details`(IN `pprogramme_id` INT)
    READS SQL DATA
select `duration_days`
	  , duration_text
	  , `medicine`
      , `dose_no`
      , id
from medication_programme_list
where fk_medication_programme_id = pprogramme_id
	  and is_active = 1$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_schedule_calander_details`(IN `pdoctor_id` INT, IN `plocation_id` INT, IN `pstart_date` VARCHAR(10), IN `pend_date` VARCHAR(10))
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_schedule_list`(IN `pdoctor_id` INT)
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_staff_details`(IN `pid` INT)
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_staff_list_for_doctor`(IN `pdoctor_id` INT)
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

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE IF NOT EXISTS `appointment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_doctor_id` int(11) NOT NULL,
  `fk_patient_id` int(11) NOT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time_minutes` int(11) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `appointment_state` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `is_active` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`id`, `fk_login_id`, `name`, `contact1`, `contact2`, `email`, `qualification`, `address`, `recovery_contact`, `recovery_email`, `is_active`) VALUES
(1, 33, 'Abharamasdf', '3412', '213412', 'fsdf@sdf.com', 'wqwer', 'wer', 'qwer', 'qwer', 1),
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
(24, 56, 'Savio', '1234512345', '', 'savio@dreamlogic.in', 'MA', 'adjnasldn', '123', 'saviothecooliohotmail.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(10) NOT NULL,
  `login_id` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created` datetime NOT NULL,
  `last_modified` datetime DEFAULT NULL,
  `is_active` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=58 ;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `type`, `login_id`, `password`, `created`, `last_modified`, `is_active`) VALUES
(1, 'A', 'admin', 'admin', '1899-11-30 00:00:00', '0000-00-00 00:00:00', 1),
(33, 'D', 'gogo', 'gogo', '2016-05-01 18:26:09', '2016-05-01 18:54:07', 1),
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
(50, 'D', 'greg', 'greg', '2016-05-02 13:44:21', '2016-05-14 01:25:54', 1),
(51, 'D', 'dino', 'dino', '2016-05-04 00:02:56', '2016-05-14 01:38:07', 1),
(52, 'D', 'dino1', 'dino1', '2016-05-04 00:03:22', NULL, 1),
(53, 'D', 'kkkk', 'kkkk', '2016-05-04 00:04:30', NULL, 1),
(54, 'D', 'frank', 'frank', '2016-05-04 00:16:08', NULL, 1),
(55, 'D', 'frank2', 'frank2', '2016-05-04 00:17:25', '2016-05-04 00:33:15', 1),
(56, 'D', 'saviopereira88', 'cipla@123', '2016-05-13 21:46:23', '2016-05-14 01:31:31', 1),
(57, 'S', 'usie', 'usie', '2016-05-28 22:35:17', NULL, 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `medication_programme`
--

INSERT INTO `medication_programme` (`id`, `fk_doctors_id`, `name`, `created_date`, `is_active`) VALUES
(1, 18, 'Newnatal', '2016-05-10', 1),
(2, 18, 'Newnatal1', '2016-05-10', 1),
(6, 18, 'Yo self b4 others', '2016-05-12', 1),
(7, 18, 'Yo self b4 others', '2016-05-12', 1),
(8, 18, 'Yo self b4 others', '2016-05-12', 1),
(9, 18, 'Get Will Soon edited', '2016-05-12', 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

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
(10, 9, 3, 'green', 'Cartao', 3, '2016-05-12', 1, 18, NULL, 0);

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
  `contact2` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(1000) NOT NULL,
  `picture_path` varchar(200) DEFAULT NULL,
  `is_guardian` int(11) NOT NULL DEFAULT '0',
  `patient_id` int(11) DEFAULT NULL,
  `created_date` date NOT NULL,
  `is_active` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=49 ;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `fk_doctor_id`, `name`, `date_of_birth`, `blood_group`, `weight`, `height`, `gender`, `contact1`, `contact2`, `email`, `address`, `picture_path`, `is_guardian`, `patient_id`, `created_date`, `is_active`) VALUES
(1, 0, 'Donald', '2016-04-01', '', '', '25 Centimeters', 1, '04918093241', '345324523452', 'elgore@executive.com', 'White House, Washington DC', '1.jpg', 0, 0, '2016-05-07', 1),
(2, 0, 'Hillary', '2016-04-01', '', '', '5.5 Feet', 0, '04918093241', '345324523452', 'elgore@executive.com', 'White House, Washington DC', '2.jpg', 1, 1, '2016-05-07', 1),
(3, 0, 'Ted', '2016-04-01', '', '2.1 kgs', '25 cms', 1, '41243', '234123', 'ted@republican.gov', 'dfasdfasdf', '1.jpg', 0, 0, '2016-05-07', 1),
(4, 0, 'Cruz', '2016-04-01', '', '2.1 kgs', '25 cms', 1, '41243', '234123', 'ted@republican.gov', 'dfasdfasdf', '1.jpg', 0, 0, '2016-05-07', 1),
(5, 18, 'Kesizh', '2016-04-01', '', '2', '23 cms ', 1, '423', '1243', 'dsfa@starwarz@empire.com', 'asdfdf', '1.jpg', 0, 0, '2016-05-08', 1),
(6, 18, 'Kesizh', '2016-04-01', '', '2', '23 cms ', 1, '423', '1243', 'dsfa@starwarz@empire.com', 'asdfdf', '1.jpg', 0, 0, '2016-05-08', 1),
(7, 18, 'Kesizh', '2016-04-01', '', '2', '23 cms ', 1, '423', '1243', 'dsfa@starwarz@empire.com', 'asdfdf', '1.jpg', 0, 0, '2016-05-08', 1),
(8, 18, 'Kesizh', '2016-04-01', '', '2', '23 cms ', 1, '423', '1243', 'dsfa@starwarz@empire.com', 'asdfdf', '1.jpg', 0, 0, '2016-05-08', 1),
(43, 18, 'Travolda', '2016-04-01', 'AB+', '2 kgs', '20 cms', 1, '14242341', '12412341', NULL, 'Kanas', '2.jpg', 0, NULL, '2016-05-10', 1),
(44, 18, 'Travolda', '2016-04-01', 'AB+', '2 kgs', '20 cms', 1, '14242341', '12412341', NULL, 'Kanas', '2.jpg', 0, NULL, '2016-05-10', 1),
(45, 18, 'Travolda', '2016-04-01', 'AB+', '2 kgs', '20 cms', 1, '14242341', '12412341', NULL, 'Kanas', '2.jpg', 0, NULL, '2016-05-10', 1),
(46, 18, 'Travolda', '2016-04-01', 'AB+', '2 kgs', '20 cms', 1, '14242341', '12412341', NULL, 'Kanas', '2.jpg', 0, NULL, '2016-05-10', 1),
(47, 18, 'Travolda', '2016-04-01', 'AB+', '2 kgs', '20 cms', 1, '14242341', '12412341', NULL, 'Kanas', '2.jpg', 0, NULL, '2016-05-10', 1),
(48, 18, 'Travolda', '2016-04-01', 'AB+', '2 kgs', '20 cms', 1, '14242341', '12412341', NULL, 'Kanas', '2.jpg', 0, NULL, '2016-05-12', 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `patient_medication_programme`
--

INSERT INTO `patient_medication_programme` (`id`, `fk_patient_id`, `fk_doctor_id`, `fk_medication_pogramme_id`, `name`, `created_date`, `is_active`) VALUES
(6, 45, 18, 1, 'Newnatal', '2016-05-10', 1),
(7, 45, 18, 2, 'Newnatal1', '2016-05-10', 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=49 ;

--
-- Dumping data for table `patient_medication_programme_list`
--

INSERT INTO `patient_medication_programme_list` (`id`, `fk_patient_id`, `fk_doctor_id`, `fk_medication_programme_id`, `fk_medication_programme_list_id`, `duration_days`, `medicine`, `dose_no`, `due_on`, `give_on`, `batch_no`) VALUES
(40, 45, 18, 1, 1, 0, 'BCG', 0, '2016-05-12', '2016-05-05', 'rqwer'),
(41, 45, 18, 1, 2, 0, 'OPV', 0, '2016-05-19', '2016-05-19', 'qwer'),
(42, 45, 18, 1, 3, 0, 'Hepatatis B', 1, '2016-05-18', '2016-05-08', 'qwer'),
(43, 45, 18, 2, 4, 14, 'Pnemococcal Conjugate vaccine', 1, '2016-05-04', '2016-05-18', 'wer'),
(44, 45, 18, 2, 5, 14, 'DTaP-IPV/Hib', 1, '2016-05-19', '2016-05-12', 'sdfsd'),
(45, 45, 18, 2, 6, 14, 'Rotavirus', 1, '2016-05-18', '2016-05-20', 'sssss'),
(46, 48, 18, 1, 1, 0, 'BCG', 0, '2016-05-11', '2016-05-11', 'qwer'),
(47, 48, 18, 1, 2, 0, 'OPV', 0, '2016-05-25', '2016-05-24', 'qwer'),
(48, 48, 18, 1, 3, 0, 'Hepatatis B', 1, '2016-05-18', '2016-05-26', 'qwer');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=73 ;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `fk_doctor_id`, `start_date`, `end_date`, `created_date`, `created_by`, `created_by_type`, `is_active`) VALUES
(70, 18, '2016-06-01', '2016-06-30', '2016-05-29 00:00:00', 18, 'D', 1),
(71, 18, '2016-05-31', '2016-06-15', '2016-05-31 00:00:00', 18, 'D', 1),
(72, 18, '2016-05-31', '2016-06-15', '2016-05-31 00:00:00', 18, 'D', 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=229426 ;

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
(229425, 18, 72, 13, 20160615, 540, 720, 0, 1);

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
(14, 18, 'asdf', ''),
(15, 18, 'Temp', ''),
(16, 18, 'dsaf', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
