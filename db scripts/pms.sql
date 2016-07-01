-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2016 at 08:03 AM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pms`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_update_doctor` (IN `pid` INT, IN `pname` VARCHAR(100), IN `pcontact1` VARCHAR(50), IN `pcontact2` VARCHAR(50), IN `pemail` VARCHAR(100), IN `pqualification` VARCHAR(1000), IN `paddress` VARCHAR(2000), IN `precovery_contact` VARCHAR(100), IN `precovery_email` VARCHAR(100), IN `plogin_id` VARCHAR(100), IN `ppassword` VARCHAR(100), IN `pis_active` INT)  MODIFIES SQL DATA
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
							,is_active
							) 
					VALUES (@llogin_id
							,pname
							,pcontact1
							,pcontact2
							,pemail
							,pqualification
							,paddress
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
					SET `login_id` = plogin_id
					,`password` = case when ppassword is null OR ppassword = '' then `password` else ppassword end
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_update_locations` (IN `pid` INT, IN `pname` VARCHAR(100), IN `pdoctor_id` INT)  MODIFIES SQL DATA
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_update_patient_birth_details` (IN `ppatient_id` INT, IN `pdelivery_method_id` INT, IN `pbirth_weight` VARCHAR(20), IN `plength` VARCHAR(20), IN `phead` VARCHAR(20), IN `pblood_group` VARCHAR(10), IN `pmothers_name` VARCHAR(100), IN `pmothers_blood_group` VARCHAR(10), IN `pfathers_name` VARCHAR(100), IN `pfathers_blood_group` VARCHAR(10), IN `psiblings` VARCHAR(100), IN `premarks` VARCHAR(4000), IN `pis_active` INT)  MODIFIES SQL DATA
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `authenticate` (IN `plogin_id` VARCHAR(90), IN `ppassword` VARCHAR(90))  READS SQL DATA
begin

declare lLoginId int;
declare lUserType varchar(5);
declare lisActive int;
declare llocationId int;
declare lname varchar(100);
declare lhashPassword varchar(255);
declare luserId int;
declare ldoctorId int;

set @ldoctorId = -1;

       select id
	   ,`type`
	   ,`password`
	   ,`is_active`
       into @lLoginId
       		,@lUserType
			,@lhashPassword
			,@lisActive
       from login
       where login_id = plogin_id;
              
if @lUserType is null then

    select '-1' as id
    	   ,'-1' as `type`
           ,'-1' as name
		   , "" as `password`
		   ,0 as is_active
		   , -1 as location_id
		   ,@ldoctorId as doctor_id;
		   
elseif @lisActive = 0 then

	select 1 as id
    	   ,@lUserType as `type`
           ,'admin' as name
		   ,@lhashPassword as `password`
		   ,0 as is_active
		   ,-1 as location_id
		   ,@ldoctorId as doctor_id;

elseif @lUserType = 'A' then

	select 1 as id
    	   ,@lUserType as `type`
           ,'' as name
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
		   ,1 as is_active
		   ,-1 as location_id
		   ,@luserId as doctor_id;
		   
elseif @lUserType = 'S' then

	select first_name
    	   ,id
		   ,fk_doctor_id
		   ,fk_location_id
    into @lname
    	 ,@luserId
		 ,@ldoctorId
		 ,@llocationId
    from staff
    where fk_user_id = @lLoginId;

	select @luserId as id
    	   ,@lUserType as `type`
           ,@lname as name
		   ,@lhashPassword as `password`
		   ,1 as is_active
		   ,@llocationId as location_id
		   ,@ldoctorId as doctor_id;

end if;

end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `book_appointment` (IN `pdoctor_id` INT, IN `ppatient_id` INT, IN `pappointment_date_time` DATETIME, IN `ppatient_contact` VARCHAR(50), IN `ppatient_email` VARCHAR(50), IN `ppatient_gender` INT, IN `ppatient_DOB` DATE, IN `pdescription` VARCHAR(2000))  NO SQL
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `cancel_appointment` (IN `pappointment_id` INT, IN `premarks` VARCHAR(3000), IN `pcancelled_by_id` INT, IN `pcancelled_by_type` VARCHAR(5))  MODIFIES SQL DATA
begin



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

CREATE DEFINER=`root`@`localhost` PROCEDURE `close_appointment_proc` (IN `pappointment_id` INT, IN `pclosing_date` VARCHAR(20), IN `pclosing_time_mins` INT, IN `premarks` VARCHAR(3000), IN `pclosed_by_id` INT, IN `pclosed_by_type` VARCHAR(5), IN `pPrescriptionListXML` VARCHAR(65535))  NO SQL
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

							  
end if;					

select 2 as status;

end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_modify_guardian` (IN `pfk_patient_id` INT, IN `pname` VARCHAR(100), IN `pdate_of_birth` VARCHAR(20), IN `pgender` INT, IN `pphone1` VARCHAR(20), IN `pphone2` VARCHAR(20), IN `ppicture_path` VARCHAR(100), IN `pis_active` INT, IN `paddress` VARCHAR(3000))  MODIFIES SQL DATA
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


end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_modify_medical_programme` (IN `pprogramme_id` INT, IN `pdoctor_id` INT, IN `pprogramme_name` VARCHAR(100), IN `pprogrammes_count` INT, IN `pprogrammes_xml` VARCHAR(65535))  MODIFIES SQL DATA
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_modify_patient` (IN `pid` INT, IN `pname` VARCHAR(100), IN `pdate_of_birth` VARCHAR(30), IN `pblood_group` VARCHAR(50), IN `pweight` VARCHAR(50), IN `pheight` VARCHAR(50), IN `pgender` INT, IN `pcontact1` VARCHAR(20), IN `pcontact2` VARCHAR(20), IN `paddress` VARCHAR(1000), IN `ppicture_path` VARCHAR(200), IN `pdoctor_id` INT, IN `pfk_logged_in_user_id` INT, IN `plogged_in_user_type` VARCHAR(5), IN `pis_active` INT)  begin

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_modify_patients_programme` (IN `ppatient_id` INT, IN `pdoctor_id` INT, IN `pprogramme_count` INT, IN `pprogramme_xml` VARCHAR(65535))  MODIFIES SQL DATA
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_modify_schedule` (IN `pdoctor_id` INT, IN `pstart_date` VARCHAR(20), IN `pend_date` VARCHAR(20), IN `pschedule_count` INT, IN `plocation_count` INT, IN `pschedule_xml` VARCHAR(65535))  NO SQL
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_modify_staff` (IN `pid` INT, IN `pfk_doctor_id` INT, IN `pfk_location_id` INT, IN `pfirst_name` VARCHAR(100), IN `plast_name` VARCHAR(100), IN `pcontact1` VARCHAR(50), IN `pcontact2` VARCHAR(50), IN `pemail` VARCHAR(100), IN `paddress` VARCHAR(1000), IN `puser_name` VARCHAR(100), IN `ppassword` VARCHAR(100), IN `precovery_contact` VARCHAR(50), IN `precovery_email` VARCHAR(100), IN `pfk_logged_in_user_id` INT, IN `plogged_in_user_type` VARCHAR(2), IN `pis_active` INT)  MODIFIES SQL DATA
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
					,`password`= case when ppassword is null OR ppassword = '' then `password` else ppassword end
					,`last_modified`= now()
                    ,is_active = pis_active
			WHERE id = @llogin_id;
			
			UPDATE `staff` SET  `first_name`= pfirst_name
								,`last_name`= plast_name
								,`contact1`= pcontact1
								,`contact2`= pcontact2
								,`email`= pemail
								,`address`= paddress
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_schedule` (IN `pdoctor_id` INT, IN `pstart_date` VARCHAR(15), IN `pend_date` VARCHAR(15), IN `pschedule_count` INT, IN `plocation_id` INT, IN `puser_id` INT, IN `puser_type` VARCHAR(5), IN `pschedule_xml` VARCHAR(65535))  MODIFIES SQL DATA
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `getDoctorInfo` (IN `pid` INT)  READS SQL DATA
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_appointments` (IN `pdoctor_id` INT)  READS SQL DATA
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_doctors` ()  NO SQL
begin

SELECT `id`
		, `name`
		, `contact1`
		, `email`
		, `qualification`
		, `is_active` 
  FROM `doctor`; 



end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_doctor_locations` (IN `pdoctor_id` INT)  NO SQL
begin

select id
	   ,name
from work_locations
where fk_doctor_id = pdoctor_id;


end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_appointments_for_the_day` (IN `pdoctor_id` INT, IN `plocation_id` INT, IN `pdate` VARCHAR(20))  NO SQL
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
		  and a.fk_location_id in ( select id from work_locations where fk_doctor_id = pdoctor_id)
	order by a.start_mins asc;


end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_birth_details` (IN `ppatient_id` INT)  READS SQL DATA
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_delivery_methods` ()  READS SQL DATA
select id
	   ,name
from delivery_methods$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_doctors_checkup_programs` (IN `pdoctor_id` INT)  READS SQL DATA
select id
	   , name
       , date_format(created_date, '%d %b %Y') as created_date
from medication_programme
where fk_doctors_id = pdoctor_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_guardian_info` (IN `ppatient_id` INT)  NO SQL
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


end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_medication_programme` (IN `pdoctor_id` INT, IN `pprogramme_id` INT)  READS SQL DATA
select id
	   , name
       , date_format(created_date, '%d %b %Y') as created_date
from medication_programme
where fk_doctors_id = pdoctor_id
	  and id = pprogramme_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_patients_list` (IN `pdoctor_id` INT)  READS SQL DATA
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_patients_programmes` (IN `ppatient_id` INT)  NO SQL
SELECT 	 id
		,fk_medication_pogramme_id
		, name
FROM patient_medication_programme
WHERE fk_patient_id = ppatient_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_patients_programme_details` (IN `ppatient_id` INT, IN `pmedication_programme_id` INT)  NO SQL
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_patient_all_appointments_history` (IN `patient_id` INT)  NO SQL
begin



	select  a.id
		   ,a.contact
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
	where a.fk_patient_id = patient_id
		  and a.is_active = 1
	order by a.start_mins asc;


end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_patient_details` (IN `ppatient_id` INT)  NO SQL
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_programme_list_details` (IN `pprogramme_id` INT)  READS SQL DATA
select `duration_days`
	  , duration_text
	  , `medicine`
      , `dose_no`
      , id
from medication_programme_list
where fk_medication_programme_id = pprogramme_id
	  and is_active = 1$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_schedules_timings_for_the_day` (IN `pdoctor_id` INT, IN `plocation_id` INT, IN `pdate` VARCHAR(20))  READS SQL DATA
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_schedule_calander_details` (IN `pdoctor_id` INT, IN `plocation_id` INT, IN `pstart_date` VARCHAR(10), IN `pend_date` VARCHAR(10))  READS SQL DATA
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_schedule_list` (IN `pdoctor_id` INT)  NO SQL
begin

SELECT s.id
	   ,s.start_date
	   ,s.end_date
	   ,s.created_date
	   ,s.is_active
FROM schedule s 
where s.fk_doctor_id = pdoctor_id;

end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_staff_details` (IN `pid` INT)  READS SQL DATA
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_staff_list_for_doctor` (IN `pdoctor_id` INT)  NO SQL
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_info` (IN `puser_id` VARCHAR(100))  READS SQL DATA
begin

declare lLoginId int;
declare lUserType varchar(5);
declare lname varchar(100);
declare lhashPassword varchar(255);
declare luserId int;
declare ldoctorId int;
declare llocationId int;

set @ldoctorId = -1;
set @locationId = -1;

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
		   ,@locationId as location_id
		   ,@ldoctorId as doctor_id;
              
              
elseif @lUserType = 'A' then

	select 1 as id
    	   ,@lUserType as `type`
           ,'admin' as name
		   ,@lhashPassword as `password`
		   ,@locationId as location_id
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
		   ,@locationId as location_id
		   ,@luserId as doctor_id;
		   
elseif @lUserType = 'S' then

	select first_name
    	   ,id
		   ,fk_doctor_id
		   ,fk_location_id
    into @lname
    	 ,@luserId
		 ,@ldoctorId
		 ,@locationId
    from staff
    where fk_user_id = @lLoginId;

	select @luserId as id
    	   ,@lUserType as `type`
           ,@lname as name
		   ,@lhashPassword as `password`
		   ,@locationId as location_id
		   ,@ldoctorId as doctor_id;

end if;

end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_info_for_login` (IN `plogin_id_pk` INT)  READS SQL DATA
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_new_appointment` (IN `pdoctor_id` INT, IN `plocation_id` INT, IN `ppatient_id` INT, IN `pappointment_date` VARCHAR(10), IN `pstart_mins` INT, IN `pend_mins` INT, IN `pcreated_by_id` INT, IN `pcreated_by_type` VARCHAR(5), IN `pcontact` VARCHAR(20), IN `pdescription` VARCHAR(2000))  MODIFIES SQL DATA
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
							, 0  							,0 							,now()
							,pcreated_by_id
							,pcreated_by_type
							,1 							);
			
commit;				

end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `make_reset_password_request` (IN `plogin_id` VARCHAR(100))  MODIFIES SQL DATA
begin
	

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
	
	
    set @lstatus = 0; 	set @lresetCode  = '';
	set @lrecoveryEmail = '';
	set @lmaxNo = 11350;
	set @lminNo = 1350;
	
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
		set @lstatus = 2;  		
	else 
		
				
    select count(*)
	into @lpreviousRequestCount
	from password_reset_request
	where fk_login_id = @llogin_id_pk
		  and is_valid = 1;
		  
	if COALESCE(@lpreviousRequestCount, 0) > 0 then
					  
		update password_reset_request
		set is_valid = 0
		where fk_login_id = @llogin_id_pk
			  and is_valid = 1;
		
	end if;
	
		
		
	
			
	
	set @lexitLoop = 1;
	while COALESCE(@lexitLoop, 0) = 1 do
	
		SELECT concat(
					CAST(CONCAT( CHAR(FLOOR(RAND()*26)+65),FLOOR(100+RAND()*(500-100))) AS CHAR(50))
					, FLOOR(@lminNo +RAND() *(@lmaxNo - @lminNo))
				)AS random_num
		into @lresetCode;
		
		SELECT count(*)
		into @lexitLoop  		FROM password_reset_request 
		where reset_code = @lresetCode
			  and is_valid =  1;
	
		SET @lcounter = @lcounter + 1;
	END WHILE;
	
	
		
	if @luserType = 'D' then
	
		select email
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `reset_password` (IN `preset_code` VARCHAR(100), IN `pnew_password` VARCHAR(100))  NO SQL
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
CREATE DEFINER=`root`@`localhost` FUNCTION `check_appointment_avalibility` (`pdoctor_id` INT, `plocation_id` INT, `pappointment_date` VARCHAR(20), `pstart_time` INT, `pend_time` INT) RETURNS INT(11) NO SQL
begin

	/*
	  1 can book
	  2 Either there is no schedule or appointment timings are oustide the work timings
	  3 Timings clash with an existing appointment
	  4 cannot book appointment for a previous date
	*/

	
	declare lnewAppointmentDate date;
	declare lscheduleCount int;

	declare lappointmentSum int;
	declare ltodaysDate date;
	
	set @ltodaysDate = CURDATE();
	
	set @lnewAppointmentDate = STR_TO_DATE(pappointment_date, '%d-%m-%Y');
	
	if @lnewAppointmentDate  <  @ltodaysDate then
		return 4;  
		#cannot book appointment for a previous date
	end if;
	
	
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
		return 2;  	end if;
	 
	 select sum(is_timing_overlapping(pstart_time, pend_time, a.start_mins, a.end_mins))
	 into  @lappointmentSum
	 from appointment a
	 where  a.fk_doctor_id = pdoctor_id
			and a.fk_location_id  = plocation_id
			and date(a.appointment_date) = date(@lnewAppointmentDate)
			and a.state = 0
			and a.is_active = 1;
			
	if COALESCE(@lappointmentSum, 0) > 0 then 
		return 3; 	else
		return 1; 	end if;




end$$

CREATE DEFINER=`root`@`localhost` FUNCTION `isCbetweenAB` (`pointA` INT, `pointB` INT, `pointC` INT) RETURNS INT(11) NO SQL
begin


declare dotProduct int;
declare lenghtSsuare int;


set @dotProduct = (pointC - pointA) * (pointB -pointA);

if @dotProduct < 0 then
	return 0; 
    end if;


set @lenghtSsuare = (pointB - pointA)*(pointB - pointA);

if @dotProduct > @lenghtSsuare then
	return 0;
    end if;

return 1; 
end$$

CREATE DEFINER=`root`@`localhost` FUNCTION `is_timing_overlapping` (`pnewStartTime` INT, `pnewEndTime` INT, `pAppointStartTime` INT, `pAppointEndTime` INT) RETURNS INT(11) NO SQL
begin
	
	
	
		if  pnewStartTime >= pnewEndTime 
		or  pAppointStartTime >= pAppointEndTime then
		return 1;
	end if;

	if pnewStartTime >= pAppointEndTime or pnewEndTime <= pAppointStartTime then
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

CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
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
  `is_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `fk_doctor_id`, `fk_location_id`, `fk_patient_id`, `contact`, `appointment_date`, `start_mins`, `end_mins`, `description`, `state`, `is_rescheduled`, `created_date_time`, `fk_created_by_pk`, `created_by_type`, `is_active`) VALUES
(1, 1, 14, 96, '342314', '2016-06-09', 555, 570, 'app', 1, 0, '2016-06-09 15:23:49', 1, 'D', 1),
(7, 1, 14, 105, '4444444', '2016-06-09', 540, 555, 'test appointemtn', 1, 0, '2016-06-11 16:41:13', 1, 'D', 1),
(8, 1, 14, 106, '4352', '2016-06-09', 660, 675, 'Hair fall', 2, 0, '2016-06-12 00:01:08', 1, 'D', 1),
(9, 1, 14, 107, '7038348822', '2016-06-14', 540, 555, 'test problem', 1, 0, '2016-06-14 12:11:46', 1, 'D', 1),
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
(22, 1, 14, 115, '23414', '2016-06-15', 555, 565, 'asda', 0, 0, '2016-06-15 18:02:56', 1, 'D', 1),
(23, 1, 18, 116, '14242341', '2016-06-29', 540, 555, 'sdfasdf', 1, 0, '2016-06-29 12:31:26', 1, 'D', 1),
(24, 1, 18, 104, '4444444', '2016-06-30', 540, 555, 'test appointment', 1, 0, '2016-06-30 14:13:40', 1, 'D', 1),
(25, 1, 18, 108, '7038348822', '2016-06-30', 555, 570, 'test', 1, 0, '2016-06-30 14:15:10', 1, 'D', 1),
(26, 1, 18, 108, '7038348822', '2016-06-30', 570, 585, 'dfasd', 1, 0, '2016-06-30 14:19:24', 1, 'D', 1),
(27, 1, 18, 108, '7038348822', '2016-06-30', 585, 600, 'test', 1, 0, '2016-06-30 14:25:03', 1, 'D', 1),
(28, 1, 18, 117, '14242341', '2016-06-30', 600, 615, 'test', 0, 0, '2016-06-30 14:29:14', 1, 'D', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cancelled_appointments`
--

CREATE TABLE `cancelled_appointments` (
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

CREATE TABLE `close_appointment` (
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
(1, '0000-00-00', 9, 96, 'remarks are there', '2016-06-17 10:52:39', 1, 0),
(9, '2016-06-22', 9, 107, 'dfasdf', '2016-06-22 17:52:38', 1, 0),
(23, '2016-06-30', 9, 116, 'asdfasdf', '2016-06-30 14:07:18', 1, 0),
(24, '2016-06-30', 9, 104, 'test', '2016-06-30 14:13:57', 1, 0),
(25, '2016-06-30', 9, 108, 'sadfasdf', '2016-06-30 14:15:29', 1, 0),
(26, '2016-06-30', 9, 108, 'sdfasdf', '2016-06-30 14:19:45', 1, 0),
(27, '2016-06-30', 10, 108, 'dfadsfds', '2016-06-30 14:25:23', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `close_appointment_documents`
--

CREATE TABLE `close_appointment_documents` (
  `id` int(11) NOT NULL,
  `fk_appointment_id` int(11) NOT NULL,
  `document_name` varchar(200) NOT NULL,
  `document_path` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `close_appointment_prescriptions`
--

CREATE TABLE `close_appointment_prescriptions` (
  `id` int(11) NOT NULL,
  `fk_appointment_id` int(11) NOT NULL,
  `medicine_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `delivery_methods`
--

CREATE TABLE `delivery_methods` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

CREATE TABLE `doctor` (
  `id` int(11) NOT NULL,
  `fk_login_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `contact1` varchar(50) NOT NULL,
  `contact2` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `qualification` varchar(1000) NOT NULL,
  `address` varchar(2000) NOT NULL,
  `is_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`id`, `fk_login_id`, `name`, `contact1`, `contact2`, `email`, `qualification`, `address`, `is_active`) VALUES
(1, 33, 'Abharamasdf', '3412', '213412', 'fsdf@sdf.com', 'wqwer', 'wer', 1),
(25, 58, 'savio', '94234234', 'dfasdfa', 'savio@dreamlogic.in', 'asdfasdf', 'asdf', 1),
(26, 68, 'Greg', '3413', 'dsfasdf', 'azzyxec@gmail.com', 'woldfads', 'dasfasdf', 0),
(27, 69, 'Greg', 'sdfasdf', 'sdfasdf', 'azzyxec@gmail.com', 'sdfasdf', 'sdfasdf', 0),
(28, 70, 'Greg', '32423', '23423', 'a', 'asdfasdf', 'asdfasdf', 0);

-- --------------------------------------------------------

--
-- Table structure for table `guardian`
--

CREATE TABLE `guardian` (
  `fk_patient_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` int(11) NOT NULL,
  `picture_path` varchar(100) DEFAULT NULL,
  `phone1` varchar(20) NOT NULL,
  `phone2` varchar(20) NOT NULL,
  `address` varchar(3000) NOT NULL,
  `is_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `type` varchar(10) NOT NULL,
  `login_id` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  `last_modified` datetime DEFAULT NULL,
  `is_active` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `type`, `login_id`, `password`, `created`, `last_modified`, `is_active`) VALUES
(1, 'A', 'admin', '$2y$12$4exp7y9xOEJ4mJoryW/H0eEPA6VE5o.y3lVtnPYIh/lPfOW8rN9b2', '1899-11-30 00:00:00', '0000-00-00 00:00:00', 1),
(33, 'D', 'doc', '$2y$12$cXnJ8dLJiRSZFhn3IRIozePhFbZAtvngFoAHlhSPUOndMWUDUtob.', '2016-05-01 18:26:09', '2016-07-01 10:44:44', 1),
(58, 'D', 'savio', '$2y$12$/W.gLAwQ/i5/FnVeHnJBDOe.N.2MBLW/wZL7Ma30I33dT.C5J86y.', '2016-06-15 21:07:02', NULL, 1),
(60, 'S', 'staff', '$2y$12$.tRDVYkRw9SuzxctqalzeuBdfjCjP9o4TQuWiOJYd6UCDYuNCkSbu', '2016-06-27 20:18:24', '2016-06-29 12:38:16', 1),
(61, 'D', 'aria', '$2y$12$Hiouw4.4LUcQ/WKnG.ZbDODrGBVvd/0IjKa./EccDTfBHVPp3hmEm', '2016-07-01 02:14:11', NULL, 0),
(62, 'D', 'tony', '$2y$12$jHKiL.Riw6KaKVzk3M2CYOLi6C9zItBYSdTGQpt5NXWyaK3kavb4a', '2016-07-01 10:15:40', NULL, 0),
(63, 'D', 'greg', '$2y$12$lyMZG4NfGYfmewY6ou3UEuC4vpVlUK/0nQPGC4hkkqim0lJwRrkC.', '2016-07-01 10:45:27', NULL, 0),
(64, 'D', 'greg1', '$2y$12$BW89BPjY2pITg86UYqeGVeu0Riq3nAQkilhJVa6MW9Pq21B8ZJu6a', '2016-07-01 10:48:53', NULL, 0),
(65, 'D', 'greg2', '$2y$12$1TvTrlVmiLbrbPzKjVyGO.XeDPnHaQqNBwOz4u9g8Lim57RHAXXHu', '2016-07-01 10:51:07', NULL, 0),
(66, 'D', 'greg3', '$2y$12$EK9sa.UTLTaijQbHGQ5yLOUrwHpm2H3qwNsFQM5DgUdTkaxccV.xe', '2016-07-01 10:52:24', NULL, 0),
(67, 'D', 'greg4', '$2y$12$0vIhNynSvrj5Cz1gdaKjRO/qEmpnOjWj6NldO558NEuVJNHUmDTuS', '2016-07-01 10:53:23', NULL, 0),
(68, 'D', 'wol', '$2y$12$W6.o2Dzm5sM.UvMh/qX5CedSl//4s3HE03lzAlAMZ/B/29lz.lxfy', '2016-07-01 11:23:40', NULL, 0),
(69, 'D', 'wol2', '$2y$12$C.qGqkSGRrceUK3H7PB8E.qkFQtTKHreqoCh1N30IU5dCXYPTpxYO', '2016-07-01 11:27:31', NULL, 0),
(70, 'D', 'wol3', '$2y$12$6Aoe1yHnHGCKh9cPWic.6u68URctumt6PvD74QtGdsiT7/q4FkCXy', '2016-07-01 11:28:46', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `medication_programme`
--

CREATE TABLE `medication_programme` (
  `id` int(11) NOT NULL,
  `fk_doctors_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_date` date NOT NULL,
  `is_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `medication_programme_list`
--

CREATE TABLE `medication_programme_list` (
  `id` int(11) NOT NULL,
  `fk_medication_programme_id` int(11) NOT NULL,
  `duration_days` int(11) NOT NULL,
  `duration_text` varchar(50) NOT NULL,
  `medicine` varchar(100) NOT NULL,
  `dose_no` int(11) NOT NULL,
  `created_date` date NOT NULL,
  `is_active` int(11) NOT NULL,
  `fk_doctor_id` int(11) NOT NULL,
  `modified_date` datetime DEFAULT NULL,
  `update_marker` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_request`
--

CREATE TABLE `password_reset_request` (
  `id` int(11) NOT NULL,
  `fk_login_id` int(11) NOT NULL,
  `old_password` varchar(100) NOT NULL,
  `reset_code` varchar(100) NOT NULL,
  `recovery_email` varchar(100) NOT NULL,
  `recovery_mobile` varchar(20) DEFAULT NULL,
  `created_date_time` datetime NOT NULL,
  `modified_date` datetime DEFAULT NULL,
  `is_valid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id` int(11) NOT NULL,
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
  `is_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(115, 1, 'dfasd (23414)', '2016-06-06', 'A+', '23', 'e', 1, '23414', NULL, NULL, NULL, NULL, '2016-06-15 18:02:56', 1, 'D', NULL, NULL, NULL, 1),
(116, 1, 'Amanda Lee (14242341)', '1995-04-01', 'AB+', '57 Kg', '5.8 ft', 0, '14242341', NULL, NULL, NULL, NULL, '2016-06-29 12:31:26', 1, 'D', NULL, NULL, NULL, 1),
(117, 1, 'Travolda (14242341)', '2016-04-01', 'AB+', '2 kgs', '20 cms', 1, '14242341', NULL, NULL, NULL, NULL, '2016-06-30 14:29:14', 1, 'D', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `patient_birth_details`
--

CREATE TABLE `patient_birth_details` (
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
  `is_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `patient_medication_programme`
--

CREATE TABLE `patient_medication_programme` (
  `id` int(11) NOT NULL,
  `fk_patient_id` int(11) NOT NULL,
  `fk_doctor_id` int(11) NOT NULL,
  `fk_medication_pogramme_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_date` date NOT NULL,
  `is_active` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `patient_medication_programme_list`
--

CREATE TABLE `patient_medication_programme_list` (
  `id` int(11) NOT NULL,
  `fk_patient_id` int(11) NOT NULL,
  `fk_doctor_id` int(11) NOT NULL,
  `fk_medication_programme_id` int(11) NOT NULL,
  `fk_medication_programme_list_id` int(11) NOT NULL,
  `duration_days` int(11) NOT NULL,
  `medicine` varchar(100) NOT NULL,
  `dose_no` int(11) NOT NULL,
  `due_on` date DEFAULT NULL,
  `give_on` date DEFAULT NULL,
  `batch_no` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `fk_doctor_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_by_type` varchar(5) DEFAULT NULL,
  `is_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `fk_doctor_id`, `start_date`, `end_date`, `created_date`, `created_by`, `created_by_type`, `is_active`) VALUES
(73, 1, '2016-06-09', '2016-06-24', '2016-06-09 00:00:00', 1, 'D', 1),
(74, 1, '2016-06-29', '2016-07-14', '2016-06-29 00:00:00', 1, 'D', 1);

-- --------------------------------------------------------

--
-- Table structure for table `schedule_day`
--

CREATE TABLE `schedule_day` (
  `id` int(11) NOT NULL,
  `fk_doctor_id` int(11) NOT NULL,
  `fk_schedule_id` int(11) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  `date` int(11) DEFAULT NULL,
  `start_time_mins` int(11) NOT NULL,
  `end_time_mins` int(11) NOT NULL,
  `is_blocked` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedule_day`
--

INSERT INTO `schedule_day` (`id`, `fk_doctor_id`, `fk_schedule_id`, `location_id`, `date`, `start_time_mins`, `end_time_mins`, `is_blocked`, `is_active`) VALUES
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
(229437, 1, 73, 14, 20160624, 540, 720, 0, 1),
(229438, 1, 74, 18, 20160629, 540, 720, 0, 1),
(229439, 1, 74, 18, 20160630, 540, 720, 0, 1),
(229440, 1, 74, 18, 20160701, 540, 720, 0, 1),
(229441, 1, 74, 18, 20160704, 540, 720, 0, 1),
(229442, 1, 74, 18, 20160705, 540, 720, 0, 1),
(229443, 1, 74, 18, 20160706, 540, 720, 0, 1),
(229444, 1, 74, 18, 20160707, 540, 720, 0, 1),
(229445, 1, 74, 18, 20160708, 540, 720, 0, 1),
(229446, 1, 74, 18, 20160711, 540, 720, 0, 1),
(229447, 1, 74, 18, 20160712, 540, 720, 0, 1),
(229448, 1, 74, 18, 20160713, 540, 720, 0, 1),
(229449, 1, 74, 18, 20160714, 540, 720, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `contact1` varchar(50) NOT NULL,
  `contact2` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(2000) NOT NULL,
  `fk_location_id` int(11) NOT NULL,
  `fk_doctor_id` int(11) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `fk_created_by_id` int(11) NOT NULL,
  `created_by_type` varchar(5) NOT NULL,
  `created_date` datetime NOT NULL,
  `fk_modified_by_id` int(11) NOT NULL,
  `modified_by_type` int(11) NOT NULL,
  `modified_date` datetime NOT NULL,
  `is_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `first_name`, `last_name`, `contact1`, `contact2`, `email`, `address`, `fk_location_id`, `fk_doctor_id`, `fk_user_id`, `fk_created_by_id`, `created_by_type`, `created_date`, `fk_modified_by_id`, `modified_by_type`, `modified_date`, `is_active`) VALUES
(2, 'staff', 'staff', '423412', '3234', 'staff@gmail.com', '34124', 18, 1, 60, 1, 'D', '2016-06-27 20:18:24', 1, 0, '2016-06-29 12:38:16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `work_locations`
--

CREATE TABLE `work_locations` (
  `id` int(11) NOT NULL,
  `fk_doctor_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `work_locations`
--

INSERT INTO `work_locations` (`id`, `fk_doctor_id`, `name`, `description`) VALUES
(18, 1, 'Margaon', ''),
(19, 1, 'Panjim', ''),
(20, 1, 'Vasco', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `delivery_methods`
--
ALTER TABLE `delivery_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guardian`
--
ALTER TABLE `guardian`
  ADD PRIMARY KEY (`fk_patient_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medication_programme`
--
ALTER TABLE `medication_programme`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medication_programme_list`
--
ALTER TABLE `medication_programme_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_request`
--
ALTER TABLE `password_reset_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient_birth_details`
--
ALTER TABLE `patient_birth_details`
  ADD PRIMARY KEY (`fk_patient_id`);

--
-- Indexes for table `patient_medication_programme`
--
ALTER TABLE `patient_medication_programme`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient_medication_programme_list`
--
ALTER TABLE `patient_medication_programme_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule_day`
--
ALTER TABLE `schedule_day`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `work_locations`
--
ALTER TABLE `work_locations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `delivery_methods`
--
ALTER TABLE `delivery_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
--
-- AUTO_INCREMENT for table `medication_programme`
--
ALTER TABLE `medication_programme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `medication_programme_list`
--
ALTER TABLE `medication_programme_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `password_reset_request`
--
ALTER TABLE `password_reset_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;
--
-- AUTO_INCREMENT for table `patient_medication_programme`
--
ALTER TABLE `patient_medication_programme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `patient_medication_programme_list`
--
ALTER TABLE `patient_medication_programme_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
--
-- AUTO_INCREMENT for table `schedule_day`
--
ALTER TABLE `schedule_day`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229450;
--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `work_locations`
--
ALTER TABLE `work_locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
