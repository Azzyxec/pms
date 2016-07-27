-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2016 at 10:57 PM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_update_doctor`(IN `pid` INT, IN `pname` VARCHAR(100), IN `pcontact1` VARCHAR(50), IN `pemail` VARCHAR(100), IN `pqualification` VARCHAR(1000), IN `paddress` VARCHAR(2000), IN `plogin_id` VARCHAR(100), IN `ppassword` VARCHAR(100), IN `pis_active` INT)
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

			set @llogin_id = last_insert_id();

			 /*
			 select max(id)
			 into @llogin_id
			 from login;
             */


			INSERT INTO `doctor`
							(`fk_login_id`
							, `name`
							, `contact1`
							, `email`
							, `qualification`
							, `address`
							,is_active
							)
					VALUES (@llogin_id
							,pname
							,pcontact1
							,pemail
							,pqualification
							,paddress
							,pis_active
							);

             set @ldoctor_id = last_insert_id();
			 /*
		     select max(id)
			 into @ldoctor_id
			 from doctor;
             */

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_update_locations`(
IN `pid` INT
, IN `pname` VARCHAR(100)
, IN `pis_active` INT
, IN `pdoctor_id` INT
)
    MODIFIES SQL DATA
begin


	if pid <= 0 then

		insert into work_locations(
            						fk_doctor_id
									,name
                                    ,created_date
                                    ,is_active
								  )
							values
									(
                                    pdoctor_id
									,pname
                                    ,now()
                                    ,pis_active
								   );
		else

		UPDATE `work_locations`
		SET `name` = pname
			 ,modified_date = now()
             ,is_active = pis_active
		WHERE id = pid;

	end if;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_update_patient_birth_details`(IN `ppatient_id` INT, IN `pdelivery_method_id` INT, IN `pbirth_weight` VARCHAR(20), IN `plength` VARCHAR(20), IN `phead` VARCHAR(20), IN `pblood_group` VARCHAR(10), IN `pmothers_name` VARCHAR(100), IN `pmothers_blood_group` VARCHAR(10), IN `pfathers_name` VARCHAR(100), IN `pfathers_blood_group` VARCHAR(10), IN `psiblings` VARCHAR(100), IN `premarks` VARCHAR(4000), IN `pis_active` INT)
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_update_product_stock`(IN `pdoctor_id` INT, IN `plocation_id` INT, IN `pproduct_id` INT, IN `pname` VARCHAR(200), IN `pstock` INT, IN `poperation_type` INT, IN `ploggedin_user_id` INT, IN `ploggedin_user_type` VARCHAR(5))
BEGIN

	declare lProductId int;

    set @lProductId = pproduct_id;

 if pproduct_id <= 0 then

	insert into product(
						fk_doctor_id
                        ,fk_location_id
                        ,`name`
                        ,current_stock
                        ,created_date
                        ,created_by_id
                        ,created_by_type
                        ,is_active
					   )
				 values(
						pdoctor_id
                        ,plocation_id
                        ,pname
                        ,0
                        ,now()
                        ,ploggedin_user_id
                        ,ploggedin_user_type
                        ,1
					   );

	set @lProductId = last_insert_id();

 end if;

	insert into product_stock_history (
										fk_product_id
                                        ,stock
                                        ,operation_type
                                        ,created_date
                                        ,created_by_id
                                        ,created_by_type
									  )
								values(
										@lProductId
                                        , ABS(pstock)
                                        ,poperation_type
                                        ,now()
                                        ,ploggedin_user_id
                                        ,ploggedin_user_type
									  );

	update product p
    set    current_stock = current_stock + case when poperation_type = 1 then ABS(pstock)
												when poperation_type = -1 then  -ABS(pstock)
                                                else 0 end
    where p.id = @lProductId;

    commit;

 select 1 status;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `authenticate`(IN `plogin_id` VARCHAR(90), IN `ppassword` VARCHAR(90))
    READS SQL DATA
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `cancel_appointment`(IN `pappointment_id` INT, IN `premarks` VARCHAR(3000), IN `pcancelled_by_id` INT, IN `pcancelled_by_type` VARCHAR(5))
    MODIFIES SQL DATA
begin



declare lcanCancelAppointment int;

select count(*)
into @lcanCancelAppointment
from appointment a
where a.id = pappointment_id
	  and a.state = 0
	  and a.is_active = 1;

if @lcanCancelAppointment = 1 then

 /*
 appointmentt states
 0 - active
 1 - closed
 2 - cancelled
 3 - rescheduled
 */

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `close_appointment_proc`(IN `pappointment_id` INT, IN `pclosing_date` VARCHAR(20), IN `pclosing_time_mins` INT, IN `premarks` VARCHAR(3000), IN `pclosed_by_id` INT, IN `pclosed_by_type` VARCHAR(5), IN `pprescription_count` INT, IN `pprescription_xml` VARCHAR(65535))
    NO SQL
begin

declare lpatientId int;
declare lexsitingEntry int;
DECLARE lcounter INT DEFAULT 1;
DECLARE lmedName varchar(200);
DECLARE lremarks varchar(1000);

select count(fk_appointment_id)
into  @lexsitingEntry
from close_appointment
where fk_appointment_id = pappointment_id;

if COALESCE(@lexsitingEntry, 0) = 0 then

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


		#insert into prescription list

		set @lcounter = 1;

		while @lcounter <= pprescription_count do

			SELECT ExtractValue(pprescription_xml, 'list/item[$@lcounter]/name')
				   ,ExtractValue(pprescription_xml, 'list/item[$@lcounter]/remarks')
			into 	@lmedName
				   ,@lremarks;

			insert into close_appointment_prescriptions
												(
												 fk_appointment_id
												 ,medicine
												 ,remarks
												 )
												values
												(
												pappointment_id
												,@lmedName
												,@lremarks
												);

			SET @lcounter = @lcounter + 1;

		END WHILE;

		select 1 as status;


	end if;

end if;

select 2 as status;

end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_modify_guardian`(IN `pfk_patient_id` INT, IN `pname` VARCHAR(100), IN `pdate_of_birth` VARCHAR(20), IN `pgender` INT, IN `pphone1` VARCHAR(20), IN `pphone2` VARCHAR(20), IN `ppicture_path` VARCHAR(100), IN `pis_active` INT, IN `paddress` VARCHAR(3000))
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


end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_modify_medical_programme`(
IN `pprogramme_id` INT
, IN `pdoctor_id` INT
, IN `pprogramme_name` VARCHAR(100)
, IN `pis_active` INT
, IN `pprogrammes_count` INT
, IN puser_id INT
, IN puser_type INT
, IN `pprogrammes_xml` VARCHAR(65535)
)
    MODIFIES SQL DATA
begin

	declare lmaxProgrammeId int;
	declare lcounter int;

	declare lprogrammeId int;
	declare lprogrammeDuration int;
	declare ldurationText varchar(100);
	declare lvaccine varchar(100);
	declare ldoseNo varchar(100);

	if pprogramme_id <= 0 then

		INSERT INTO `medication_programme`(
											`fk_doctors_id`
											, `name`
											, `created_date`
											, `is_active`
                                            , created_by_id
                                            , created_by_type
											)
									VALUES (
											pdoctor_id
											,pprogramme_name
											,now()
											,pis_active
                                            ,puser_id
                                            ,puser_type
										   );

		set @lmaxProgrammeId = LAST_INSERT_ID();

		/*
		select max(id)
		into @lmaxProgrammeId
		from medication_programme;
        */

		set @lcounter = 1;

		while @lcounter <= pprogrammes_count do

			SELECT ExtractValue(pprogrammes_xml, 'programme/item[$@lcounter]/duration')
				   ,ExtractValue(pprogrammes_xml, 'programme/item[$@lcounter]/text')
				   ,ExtractValue(pprogrammes_xml, 'programme/item[$@lcounter]/vaccine')
				   ,ExtractValue(pprogrammes_xml, 'programme/item[$@lcounter]/doseNo')
			into  @lprogrammeDuration
				 ,@ldurationText
				 ,@lvaccine
				 ,@ldoseNo;

			INSERT INTO `medication_programme_list`(
													 `fk_medication_programme_id`
													, `duration_days`
													,  duration_text
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
													,pis_active
												  );

			SET @lcounter = @lcounter + 1;
		END WHILE;


	else

		UPDATE `medication_programme`
		   SET  `name`= pprogramme_name
				,is_active = pis_active
                ,modified_date = now()
                ,modified_by_id = puser_id
                ,modified_by_type = puser_type
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

		/*
		UPDATE `medication_programme_list`
		   SET  is_active = 0
		WHERE  fk_medication_programme_id  = pprogramme_id
			  and update_marker = 0
			  and is_active = 1;

		UPDATE `medication_programme_list`
		   SET  `update_marker` = 0
		WHERE fk_medication_programme_id  = pprogramme_id
			  and is_active = 1;
	   */



	end if;

	commit;

	select 1 as status;

end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_modify_patient`(IN `pid` INT, IN `pname` VARCHAR(100), IN `pdate_of_birth` VARCHAR(30), IN `pblood_group` VARCHAR(50), IN `pweight` VARCHAR(50), IN `pheight` VARCHAR(50), IN `pgender` INT, IN `pcontact1` VARCHAR(20), IN `pcontact2` VARCHAR(20), IN `paddress` VARCHAR(1000), IN `ppicture_path` VARCHAR(200), IN `pdoctor_id` INT, IN `pfk_logged_in_user_id` INT, IN `plogged_in_user_type` VARCHAR(5), IN `pis_active` INT)
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

	set @lmaxPatientId = last_insert_id();

    /*
	select max(id)
	into @lmaxPatientId
	from patient;
    */

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


    # adding program header only if it alerady does not exist
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
		from patient_medication_programme mp
		where mp.fk_medication_pogramme_id = @lprogrammeId
			  and mp.fk_patient_id = ppatient_id;

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


		#programme details
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
											,case when @ldueOn is null then null else STR_TO_DATE(@ldueOn, '%d-%m-%Y') end
											,case when @lgivenOn is null then null else STR_TO_DATE(@lgivenOn, '%d-%m-%Y') end
											,@lbatchNo);

			else

				update patient_medication_programme_list
				   set due_on = case when @ldueOn is null then due_on else  STR_TO_DATE(@ldueOn, '%d-%m-%Y') end
					   ,give_on = case when @lgivenOn is null then null else STR_TO_DATE(@lgivenOn, '%d-%m-%Y') end
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

    set @lmaxScheduleId = last_insert_id();

    /*
	select max(id)
	into @lmaxScheduleId
	from schedule;
    */


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

             set @llogin_id = last_insert_id();

			/*
			 select max(id)
			 into @llogin_id
			 from login;
             */

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

			 set @lstaff_id = last_insert_id();
			/*
			 select max(id)
			 into @lstaff_id
			 from staff;
             */

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_schedule`(IN `pdoctor_id` INT, IN `pstart_date` VARCHAR(15), IN `pend_date` VARCHAR(15), IN `pschedule_count` INT, IN `plocation_id` INT, IN `puser_id` INT, IN `puser_type` VARCHAR(5), IN `pschedule_xml` VARCHAR(65535))
    MODIFIES SQL DATA
    DETERMINISTIC
begin


	declare lscheduleExists int;
	declare lscheduleExistCounter int;

    DECLARE lmaxScheduleId INT;
	DECLARE lcounter INT DEFAULT 1;

	DECLARE lscheduleDate varchar(20);
	DECLARE lstartTimeMins varchar(20);
	DECLARE lendTimeMins varchar(20);
	DECLARE lisActive INT;

	set @lscheduleExists = 0;
	set @lscheduleExistCounter = 0;

	set @lcounter = 1;

	while @lcounter <= pschedule_count do

			SELECT ExtractValue(pschedule_xml, 'schedules/item[$@lcounter]/date')
				   ,ExtractValue(pschedule_xml, 'schedules/item[$@lcounter]/startTimeMinutes')
				   ,ExtractValue(pschedule_xml, 'schedules/item[$@lcounter]/endTimeMinutes')
				   ,ExtractValue(pschedule_xml, 'schedules/item[$@lcounter]/active')
			into @lscheduleDate
				 ,@lstartTimeMins
				 ,@lendTimeMins
				 ,@lisActive;

			select count(*)
			into @lscheduleExists
			from schedule_day sd
			where sd.fk_doctor_id = pdoctor_id
				  and sd.is_active = 1
				  and sd.`date` = STR_TO_DATE(@lscheduleDate, '%d-%m-%Y')
                  and 1 = is_timing_overlapping(@lstartTimeMins
												, @lendTimeMins
                                                , sd.start_time_mins
                                                , sd.end_time_mins)
				  and sd.location_id = plocation_id;


			set @lscheduleExistCounter = @lscheduleExistCounter + @lscheduleExists;

		SET @lcounter = @lcounter + 1;
	END WHILE;

	if @lscheduleExistCounter = 0 then


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
							,now()
							,puser_id
							,puser_type
							,1
							);


	set @lmaxScheduleId = last_insert_id();

    /*
	select max(id)

	into @lmaxScheduleId
	from schedule;
    */

	set @lcounter = 1;

	while @lcounter <= pschedule_count do

			SELECT ExtractValue(pschedule_xml, 'schedules/item[$@lcounter]/date')
				   ,ExtractValue(pschedule_xml, 'schedules/item[$@lcounter]/startTimeMinutes')
				   ,ExtractValue(pschedule_xml, 'schedules/item[$@lcounter]/endTimeMinutes')
				   ,ExtractValue(pschedule_xml, 'schedules/item[$@lcounter]/active')
			into @lscheduleDate
				 ,@lstartTimeMins
				 ,@lendTimeMins
				 ,@lisActive;

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
					  ,plocation_id
					  ,STR_TO_DATE(@lscheduleDate, '%d-%m-%Y')
					  ,@lstartTimeMins
					  ,@lendTimeMins
					  ,@lisActive
					 );

			SET @lcounter = @lcounter + 1;
	END WHILE;

	commit;

	SELECT 1 as status;

		else

	SELECT -2 as status;

	end if;

end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deactivate_location_for_doctor`(IN `plocationId` INT)
BEGIN

  #TODO dont deactivate if there are appointmetns on a location
  # add deactivated by info

  update work_locations wl
  set wl.is_active = 0
	  ,wl.modified_date = now()
  where wl.id = plocationId;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deactivate_schedule_days`(IN `pdoctor_id` INT, IN `plocation_id` INT, IN `pschedule_count` INT, IN `puser_id` INT, IN `puser_type` VARCHAR(5), `pschedule_days_xml` VARCHAR(65535))
BEGIN

	DECLARE lcounter INT DEFAULT 1;

    DECLARE lscheduleDayId INT;
    DECLARE lactiveAppointmentCount INT;

    DECLARE lnotDeactivated INT;

    set @lnotDeactivated = 0;

	set @lcounter = 1;

    while @lcounter <= pschedule_count do

			SELECT ExtractValue(pschedule_days_xml, 'schedules/item[$@lcounter]/scheduleDayId')
			into @lscheduleDayId;

            set @lactiveAppointmentCount = 0;


            select count(*)
            into @lactiveAppointmentCount
            from appointment a
            where a.state = 0
				  and a.is_active = 1
                  and a.fk_schedule_day_id = @lscheduleDayId
                  and a.fk_doctor_id = pdoctor_id;


		   if @lactiveAppointmentCount = 0 then

		    update schedule_day sd
			   set sd.is_active = 0
				   ,sd.modified_by_id = puser_id
                   ,sd.modified_by_type = puser_type
                   ,sd.modified_date = now()
             where sd.id = @lscheduleDayId
				   and sd.fk_doctor_id = pdoctor_id;

		   else

			set @lnotDeactivated = @lnotDeactivated + 1;

           end if;
		set @lcounter = @lcounter + 1;
    END WHILE;

    select 1 status;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getDoctorInfo`(IN `pid` INT)
    READS SQL DATA
SELECT
   d.name ,
   d.contact1 ,
   d.email ,
   d.qualification ,
   d.address ,
   d.is_active ,
   l.login_id,
   l.password
FROM  doctor d
	  inner join login l on d.fk_login_id = l.id
WHERE d.id = pid$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_appointments`(IN `pdoctor_id` INT)
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
     ,0 as is_rescheduled
 from appointment a
 inner join patient p on a.fk_patient_id = p.id
    inner join work_locations l on a.fk_location_id = l.id
 where a.fk_doctor_id = pdoctor_id
    and a.is_active = 1
 order by a.start_mins asc;


end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_doctors`()
    NO SQL
begin

SELECT `id`
		, `name`
		, `contact1`
		, `email`
		, `qualification`
		, `is_active`
  FROM `doctor`
  order by id desc;



end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_doctor_locations`(
IN `pdoctor_id` INT
,IN `ponly_active_rows` INT
)
    NO SQL
begin

select id
	   ,name
       ,is_active
       ,case when is_active = 0 then 'inactive' else 'active' end as `status`
from work_locations
where fk_doctor_id = pdoctor_id
	  and is_active = case when ponly_active_rows =  1 then 1 else is_active end;


end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_products`(IN `pdoctor_id` INT, IN `plocation_id` INT)
BEGIN

SELECT 	 product.id
		,product.fk_doctor_id
		,product.fk_location_id
		,product.name
		,product.current_stock
        ,date_format(product.created_date, '%d-%m-%Y') as created_date
		,product.created_by_id
		,product.created_by_type
FROM pms.product
Where fk_doctor_id = pdoctor_id
      and is_active = 1;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_All_Uploaded_Doc`(in pappointment_id int)
BEGIN

select fk_appointment_id
    ,document_name
       ,document_path

from  close_appointment_documents
where  fk_appointment_id = pappointment_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_appointments_for_the_day`(IN `pdoctor_id` INT, IN `plocation_id` INT, IN `pdate` VARCHAR(20))
    NO SQL
begin

	declare lappointmentDate date;
    set @lappointmentDate = STR_TO_DATE(pdate, '%d-%m-%Y');

	select  a.id
		   ,a.contact
		   ,a.fk_patient_id
		   ,p.name
		   ,a.start_mins
		   ,a.end_mins
		   ,a.description
		   ,case when a.`state` = 1 then cl.remarks
				 when a.`state` = 2 then ca.remarks
                 when a.`state` = 3 then ra.remarks
									else '' end as remarks
		   ,a.`state`
           ,a.fk_location_id as loc
	from appointment a
	inner join patient p on a.fk_patient_id = p.id
	left join cancelled_appointments ca on ca.fk_appointment_id = a.id
	left join close_appointment cl on cl.fk_appointment_id = a.id
    left join rescheduled_appointments ra on ra.fk_appointment_id = a.id
	where a.fk_doctor_id = pdoctor_id
		  and a.fk_location_id = case when plocation_id > 0 then  plocation_id else a.fk_location_id end
		  and a.appointment_date =  @lappointmentDate
		  and a.is_active = 1
	order by a.start_mins asc;


end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_birth_details`(IN `ppatient_id` INT)
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_delivery_methods`()
    READS SQL DATA
select id
	   ,name
from delivery_methods$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_doctors_checkup_programs`(
IN `pdoctor_id` INT
,IN `pget_active_rows` INT
)
    READS SQL DATA
select id
	   , name
       , date_format(created_date, '%d %b %Y') as created_date
       , case when is_active = 1 then 'active'
			  else 'inactive'
              end as state
from medication_programme
where fk_doctors_id = pdoctor_id
	  and is_active = case when pget_active_rows = 1 then 1 else is_active end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_guardian_info`(IN `ppatient_id` INT)
    NO SQL
begin

SELECT `name`
		, DATE_FORMAT(`date_of_birth`, '%d-%m-%Y') as date_of_birth
		, `gender`
		, `picture_path`
		, `phone1`
		, `address`
		, `is_active`
FROM `guardian`
WHERE fk_patient_id = ppatient_id;


end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_medication_programme`(IN `pdoctor_id` INT, IN `pprogramme_id` INT)
    READS SQL DATA
select id
	   , name
       , date_format(created_date, '%d %b %Y') as created_date
       ,is_active
from medication_programme
where fk_doctors_id = pdoctor_id
	  and id = pprogramme_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_patients_list`(IN `pdoctor_id` INT, IN `pfetch_inactive` INT)
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
        , is_active
FROM `patient`
WHERE fk_doctor_id = pdoctor_id
	  and is_active = case when COALESCE(pfetch_inactive, 0) = 0 then 1 else is_active end$$

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
        , case when due_on is null then '' else date_format(due_on, '%d-%m-%Y') end as due_on
		, case when give_on is null then '' else date_format(give_on, '%d-%m-%Y') end as give_on
		, batch_no
FROM  patient_medication_programme_list
WHERE fk_patient_id = ppatient_id
	  and fk_medication_programme_id = pmedication_programme_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_patient_all_appointments_history`(IN `patient_id` INT)
    NO SQL
begin



	select  a.id
		   ,a.contact
           ,date_format(a.appointment_date, '%d-%m-%Y') as appointment_date
		   ,p.name
           ,l.name as location_name
		   ,a.start_mins
		   ,a.end_mins
		   ,a.description
           ,a.`state`
		   ,case when a.`state` = 0 then 'active'
				 when a.`state` = 1 then 'closed'
                 when a.`state` = 2 then 'cancelled'
                 when a.`state` = 3 then 'rescheduled' end as state_text
		  ,case when a.`state` = 1 then cl.remarks
				 when a.`state` = 2 then ca.remarks
                 when a.`state` = 3 then ra.remarks
									else '' end as remarks
	from appointment a
	inner join patient p on a.fk_patient_id = p.id
    inner join work_locations l on a.fk_location_id = l.id
    left join cancelled_appointments ca on ca.fk_appointment_id = a.id
	left join close_appointment cl on cl.fk_appointment_id = a.id
    left join rescheduled_appointments ra on ra.fk_appointment_id = a.id
	where a.fk_patient_id = patient_id
		  and a.is_active = 1
	order by a.start_mins asc;


end$$

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
        , is_active
FROM `patient`
WHERE id = ppatient_id;



end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_prescriptions_list`(in pappointment_id int )
BEGIN

select fk_appointment_id
    ,medicine
       ,remarks

from  close_appointment_prescriptions
where  fk_appointment_id = pappointment_id;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_product_stock_history`(IN `pproduct_id` INT)
BEGIN

SELECT  ph.id
		,ph.fk_product_id
        ,p.name as product_name
		,ph.stock
		,case when ph.operation_type = 1 then 'added'
			  when ph.operation_type = 2 then 'substracted'
              end as operation_type
        ,date_format(ph.created_date, '%d-%m-%Y') as created_date
		,case when ph.created_by_type = 'D' then d.name
			  when ph.created_by_type = 'S' then s.first_name
              end as created_by
		,case when ph.created_by_type = 'D' then 'doctor'
			  when ph.created_by_type = 'S' then 'Staff'
              end as created_by_type
FROM product_stock_history ph
inner join product p on p.id = ph.fk_product_id
left join doctor d on d.id = ph.created_by_id and ph.created_by_type = 'D'
left join staff s on  s.id = ph.created_by_id and ph.created_by_type = 'S'
where ph.fk_product_id = pproduct_id;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_programme_list_details`(
IN `pprogramme_id` INT
,IN `pget_active_rows` INT
)
    READS SQL DATA
select `duration_days`
	  , duration_text
	  , `medicine`
      , `dose_no`
      , id
from medication_programme_list
where fk_medication_programme_id = pprogramme_id
	  and is_active = case when pget_active_rows = 1 then 1 else is_active end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_schedules_for_deactivation`(IN `pdoctor_id` INT, IN `plocation_id` INT, IN `pstart_date` VARCHAR(10), IN `pend_date` VARCHAR(10))
    READS SQL DATA
BEGIN

	declare lstartDate date;
    declare lendDate date;

    set @lstartDate = STR_TO_DATE(pstart_date, '%d-%m-%Y');
    set @lendDate = STR_TO_DATE(pend_date, '%d-%m-%Y');


SELECT DATE_FORMAT(`date`, '%d-%m-%Y') as `schedule_date`
	   ,start_time_mins
	   ,end_time_mins
	   ,fk_schedule_id
       ,id
  FROM schedule_day
  WHERE fk_doctor_id = pdoctor_id
		and location_id = plocation_id
		and `date` >= @lstartDate
		and `date` <= @lendDate
        and is_active = 1
  group by `date`, start_time_mins, end_time_mins
  order by `date` asc, start_time_mins asc;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_schedules_timings_for_the_day`(IN `pdoctor_id` INT, IN `plocation_id` INT, IN `pdate` VARCHAR(20))
    READS SQL DATA
begin

	declare ldate date;

    set @ldate = STR_TO_DATE(pdate, '%d-%m-%Y');

	select sd.start_time_mins
		   ,sd.end_time_mins
           ,sd.location_id as loc_id
           ,sd.fk_schedule_id as schedule_id
           ,id
	from schedule_day sd
	where sd.fk_doctor_id = pdoctor_id
		  and sd.location_id = case when plocation_id > 0 then plocation_id else sd.location_id end
		  and sd.date = @ldate
		  and sd.is_active = 1;


end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_schedule_calander_details`(IN `pdoctor_id` INT, IN `plocation_id` INT, IN `pstart_date` VARCHAR(10), IN `pend_date` VARCHAR(10))
    READS SQL DATA
begin

	declare lstartDate date;
    declare lendDate date;

    set @lstartDate = STR_TO_DATE(pstart_date, '%d-%m-%Y');
    set @lendDate = STR_TO_DATE(pend_date, '%d-%m-%Y');

	SELECT DATE_FORMAT(`date`, '%d-%m-%Y') as `schedule_date`
		   ,start_time_mins
		   ,end_time_mins
		   ,fk_schedule_id
           ,id as schedule_day_id
           ,(
			  select count(*)
              from appointment a
              where a.fk_schedule_day_id = sd.id
				    and a.is_active = 1
                    and a.state = 0
			) as appointment_count
	  FROM schedule_day sd
	  WHERE fk_doctor_id = pdoctor_id
			and location_id = plocation_id
			and `date` >= @lstartDate
			and `date` <= @lendDate
			and is_active = 1
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_info`(IN `puser_id` VARCHAR(100))
    READS SQL DATA
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_info_for_login`(IN `plogin_id_pk` INT)
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_new_appointment`(IN `pdoctor_id` INT, IN `plocation_id` INT, IN `pfk_schedule_day_id` INT, IN `ppatient_id` INT, IN `pappointment_date` VARCHAR(10), IN `pstart_mins` INT, IN `pend_mins` INT, IN `pcreated_by_id` INT, IN `pcreated_by_type` VARCHAR(5), IN `pcontact` VARCHAR(20), IN `pdescription` VARCHAR(2000))
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
							, `created_date_time`
							, `fk_created_by_pk`
							, `created_by_type`
							, `is_active`
                            , fk_schedule_day_id
							) VALUES (
							 pdoctor_id
							,plocation_id
							,ppatient_id
                            , pcontact
							,STR_TO_DATE(pappointment_date, '%d-%m-%Y')
							,pstart_mins
							,pend_mins
                            ,pdescription
							,0
							,now()
							,pcreated_by_id
							,pcreated_by_type
							,1
                            ,pfk_schedule_day_id
						 );

commit;

end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_next_appointment`(IN `pappointment_id` INT, IN `pappointment_date` VARCHAR(10), IN `pstart_mins` INT, IN `pend_mins` INT, IN `pcreated_by_id` INT, IN `pcreated_by_type` VARCHAR(5))
    MODIFIES SQL DATA
BEGIN

	declare lDoctorId int;
    declare lLocationId int;
    declare lPatientId int;
    declare lcontact varchar(20);
    declare ldecription VARCHAR(2000);

    declare lscheduleDayId int;

    select  fk_doctor_id
		   ,fk_location_id
		   ,fk_patient_id
           ,contact
	into    @lDoctorId
		   ,@lLocationId
           ,@lPatientId
           ,@lcontact
    from appointment a
    where a.id = pappointment_id;


	set @lscheduleDayId = get_schedule_day_id(
											  @lDoctorId
											  ,@lLocationId
											  ,pappointment_date
											  ,pstart_mins
											  ,pend_mins
											 );

    if @lscheduleDayId > 0 then


		if COALESCE(@lDoctorId, 0) > 0 then

			set @ldecription = 'booked when closing appointment';

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
                                        , fk_schedule_day_id
										) VALUES (
										 @lDoctorId
										,@lLocationId
										,@lPatientId
										,@lcontact
										,STR_TO_DATE(pappointment_date, '%d-%m-%Y')
										,pstart_mins
										,pend_mins
										,@ldecription
										,0
										,0
										,now()
										,pcreated_by_id
										,pcreated_by_type
										,1
                                        ,@lscheduleDayId
									 );

			commit;


		end if; #if COALESCE(@lDoctorId, 0) > 0 then

    end if; #if @lscheduleDayId > 0 then


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `make_reset_password_request`(IN `plogin_id` VARCHAR(100))
    MODIFIES SQL DATA
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `reschedule_appointment`(IN `pappointment_id` INT, IN `pappointment_date` VARCHAR(10), IN `pstart_mins` INT, IN `pend_mins` INT, IN `pcreated_by_id` INT, IN `pcreated_by_type` VARCHAR(5), IN `premarks` VARCHAR(2000))
BEGIN

	declare lDoctorId int;
    declare lLocationId int;
    declare lPatientId int;
    declare lcontact varchar(20);
    declare ldecription VARCHAR(2000);
    declare lscheduleDayId int;

    declare lnewAppointmentId int;


    select  fk_doctor_id
		   ,fk_location_id
		   ,fk_patient_id
           ,contact
	into    @lDoctorId
		   ,@lLocationId
           ,@lPatientId
           ,@lcontact
    from appointment a
    where a.id = pappointment_id
		  and a.is_active = 1;

	set @lscheduleDayId = get_schedule_day_id(
											  @lDoctorId
											  ,@lLocationId
											  ,pappointment_date
											  ,pstart_mins
											  ,pend_mins
											 );

    if @lscheduleDayId > 0 then

    if COALESCE(@lDoctorId, 0) > 0 then

			#make a new appointment entry

			set @ldecription = 'rescheduled appointment';

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
										, `created_date_time`
										, `fk_created_by_pk`
										, `created_by_type`
										, `is_active`
                                        , fk_schedule_day_id
										)
								 VALUES (
										 @lDoctorId
										,@lLocationId
										,@lPatientId
										,@lcontact
										,STR_TO_DATE(pappointment_date, '%d-%m-%Y')
										,pstart_mins
										,pend_mins
										,@ldecription
										,0
										,now()
										,pcreated_by_id
										,pcreated_by_type
										,1
                                        , @lscheduleDayId
										);

			#update the current appointment state to rescheduled

			set @lnewAppointmentId = last_insert_id();

			update appointment a
			set state = 3
				,fk_rescheduled_id = @lnewAppointmentId
			where a.id = pappointment_id
				  and a.is_active = 1;



			#make an entry in the rescheduled table

			insert into rescheduled_appointments (
												  fk_appointment_id
												  ,fk_appointment_id_next
												  ,created_date
												  ,fk_created_by_id
												  ,fk_created_by_type
												  ,remarks
												)
											values
												(
												 pappointment_id
												 ,@lnewAppointmentId
												 ,now()
												 ,pcreated_by_id
												 ,pcreated_by_type
												 ,premarks
												);

			commit;

		end if; # if COALESCE(@lDoctorId, 0) > 0 then

	end if; #if @lscheduleDayId > 0 then

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `reset_password`(IN `preset_code` VARCHAR(100), IN `pnew_password` VARCHAR(100))
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
CREATE DEFINER=`root`@`localhost` FUNCTION `check_appointment_avalibility`(`pdoctor_id` INT, `plocation_id` INT, `pappointment_date` VARCHAR(20), `pstart_time` INT, `pend_time` INT) RETURNS int(11)
    NO SQL
begin

	/*
	1 time slot available
    2 no schedule
    3 timing clasing with existing appointment
    4 back dated booking date
    */

	declare lnewAppointmentDate date;
	declare lscheduleCount int;

	declare lappointmentSum int;
	declare ltodaysDate date;

	set @ltodaysDate = CURDATE();

	set @lnewAppointmentDate = STR_TO_DATE(pappointment_date, '%d-%m-%Y');

	if @lnewAppointmentDate  <  @ltodaysDate then
		return 4;
			end if;

	select count(sc.id)
	into   @lscheduleCount
	from schedule_day sc
	where sc.fk_doctor_id = pdoctor_id
		  and sc.location_id = plocation_id
		  and date(sc.`date`) = date(@lnewAppointmentDate)
		  and sc.start_time_mins <= pstart_time
		  and sc.end_time_mins >= pend_time
		  and sc.is_active = 1;

	if COALESCE(@lscheduleCount, 0) = 0 then
		return 2;  	end if;

	/*
     appointmetn states
     0 - active
     1 - closed
     2 - cancelled
     3 - rescheduled
    */

	 select sum(is_timing_overlapping(pstart_time, pend_time, a.start_mins, a.end_mins))
	 into  @lappointmentSum
	 from appointment a
	 where  a.fk_doctor_id = pdoctor_id
			and a.fk_location_id  = plocation_id
			and a.appointment_date = @lnewAppointmentDate
			and a.state in (0, 1)
			and a.is_active = 1;

	if COALESCE(@lappointmentSum, 0) > 0 then
		return 3; 	else
		return 1; 	end if;

end$$

CREATE DEFINER=`root`@`localhost` FUNCTION `check_next_appointment_avilibility`(`pappointment_id` INT, `pappointment_date` VARCHAR(20), `pstart_time` INT, `pend_time` INT) RETURNS int(11)
BEGIN

	/*
	1 time slot available
	2 no schedule
	3 timing clasing with existing appointment
	4 back dated booking date
    5 no appointment for found
	*/

	declare lDoctorId int;
    declare lLocationId int;
    declare lAvalibilityStatus int;

    select fk_doctor_id
		   ,fk_location_id
	into   @lDoctorId
		   ,@lLocationId
    from appointment a
    where a.id = pappointment_id;

    if COALESCE(@lDoctorId, 0) > 0 then


		set @lAvalibilityStatus = check_appointment_avalibility(@lDoctorId
																, @lLocationId
																, pappointment_date
																, pstart_time
																, pend_time
															   );


		return @lAvalibilityStatus;

    else
		#there is no appointment for this id
		return 5;

    end if;

RETURN 1;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `get_schedule_day_id`(`pdoctor_id` INT, `plocation_id` INT, `pappointment_date` VARCHAR(20), `pstart_time` INT, `pend_time` INT) RETURNS int(11)
    NO SQL
BEGIN

	/*
     0 when there is no schedule available on that day
     < 0 i.e. schedule day id when a schedule id available on that day
    */

	declare lnewAppointmentDate date;
    declare lscheduleDayId date;

    set @lscheduleDayId = 0;

	set @lnewAppointmentDate = STR_TO_DATE(pappointment_date, '%d-%m-%Y');

    select COALESCE(sc.id, 0)
	into   @lscheduleDayId
	from schedule_day sc
	where sc.fk_doctor_id = pdoctor_id
		  and sc.location_id = plocation_id
		  and sc.`date` = @lnewAppointmentDate
		  and sc.start_time_mins <= pstart_time
		  and sc.end_time_mins >= pend_time
		  and sc.is_active = 1;


RETURN  @lscheduleDayId;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `isCbetweenAB`(`pointA` INT, `pointB` INT, `pointC` INT) RETURNS int(11)
    NO SQL
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

CREATE DEFINER=`root`@`localhost` FUNCTION `is_timing_overlapping`(`pnewStartTime` INT, `pnewEndTime` INT, `pAppointStartTime` INT, `pAppointEndTime` INT) RETURNS int(11)
    NO SQL
begin


	# check for start time being less then end time
	if  pnewStartTime >= pnewEndTime
		or  pAppointStartTime >= pAppointEndTime then
		return 1;
	end if;

    #its assumed cases for boundry conditions are take care by the calling proc/function


	# test for starttime after the  endtime of an existing appointment
    # and for endtime before the start time of an existing appointment
	if pnewStartTime >= pAppointEndTime
		or pnewEndTime <= pAppointStartTime then
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
  `fk_rescheduled_id` int(11) DEFAULT NULL,
  `created_date_time` datetime NOT NULL,
  `fk_created_by_pk` int(11) NOT NULL,
  `created_by_type` varchar(5) NOT NULL,
  `is_active` int(11) NOT NULL,
  `fk_schedule_day_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=122 ;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `fk_doctor_id`, `fk_location_id`, `fk_patient_id`, `contact`, `appointment_date`, `start_mins`, `end_mins`, `description`, `state`, `fk_rescheduled_id`, `created_date_time`, `fk_created_by_pk`, `created_by_type`, `is_active`, `fk_schedule_day_id`) VALUES
(1, 1, 14, 96, '342314', '2016-06-09', 555, 570, 'app', 1, NULL, '2016-06-09 15:23:49', 1, 'D', 1, 0),
(7, 1, 14, 105, '4444444', '2016-06-09', 540, 555, 'test appointemtn', 1, NULL, '2016-06-11 16:41:13', 1, 'D', 1, 0),
(8, 1, 14, 106, '4352', '2016-06-09', 660, 675, 'Hair fall', 2, NULL, '2016-06-12 00:01:08', 1, 'D', 1, 0),
(9, 1, 14, 107, '7038348822', '2016-06-14', 540, 555, 'test problem', 1, NULL, '2016-06-14 12:11:46', 1, 'D', 1, 0),
(10, 1, 14, 108, '7038348822', '2016-06-14', 555, 570, 'qwerqew', 0, NULL, '2016-06-14 12:21:12', 1, 'D', 1, 0),
(11, 1, 14, 109, '323423', '2016-06-14', 570, 585, 'dsdsfdasf', 0, NULL, '2016-06-14 12:28:31', 1, 'D', 1, 0),
(12, 1, 14, 110, '323423', '2016-06-14', 585, 600, 'asdfasd', 0, NULL, '2016-06-14 12:28:48', 1, 'D', 1, 0),
(13, 1, 14, 111, '3243', '2016-06-14', 600, 615, 'just a lil test', 0, NULL, '2016-06-14 12:54:43', 1, 'D', 1, 0),
(14, 1, 14, 112, '34234', '2016-06-14', 615, 630, 'dfdasf', 0, NULL, '2016-06-14 13:19:41', 1, 'D', 1, 0),
(15, 1, 14, 113, '23414', '2016-06-14', 630, 645, 'this is good', 2, NULL, '2016-06-14 13:21:10', 1, 'D', 1, 0),
(16, 1, 14, 100, '14242341', '2016-06-15', 540, 555, 'New Appointment', 2, NULL, '2016-06-15 09:06:28', 1, 'D', 1, 0),
(17, 1, 14, 100, '14242341', '2016-06-15', 555, 570, 'sdfasd', 2, NULL, '2016-06-15 10:59:30', 1, 'D', 1, 0),
(18, 1, 14, 114, '9049035958', '2016-06-15', 555, 570, 'guygu', 2, NULL, '2016-06-15 11:54:49', 1, 'D', 1, 0),
(19, 1, 14, 93, '14242341', '2016-06-15', 540, 555, 'temp', 0, NULL, '2016-06-15 16:10:28', 1, 'D', 1, 0),
(20, 1, 14, 106, '4352', '2016-06-15', 660, 675, 'test jay', 0, NULL, '2016-06-15 16:12:10', 1, 'D', 1, 0),
(21, 1, 14, 108, '7038348822', '2016-06-15', 615, 630, 'Tim ', 0, NULL, '2016-06-15 16:12:57', 1, 'D', 1, 0),
(22, 1, 14, 115, '23414', '2016-06-15', 555, 565, 'asda', 0, NULL, '2016-06-15 18:02:56', 1, 'D', 1, 0),
(23, 1, 18, 116, '14242341', '2016-06-29', 540, 555, 'sdfasdf', 1, NULL, '2016-06-29 12:31:26', 1, 'D', 1, 0),
(24, 1, 18, 104, '4444444', '2016-06-30', 540, 555, 'test appointment', 1, NULL, '2016-06-30 14:13:40', 1, 'D', 1, 0),
(25, 1, 18, 108, '7038348822', '2016-06-30', 555, 570, 'test', 1, NULL, '2016-06-30 14:15:10', 1, 'D', 1, 0),
(26, 1, 18, 108, '7038348822', '2016-06-30', 570, 585, 'dfasd', 1, NULL, '2016-06-30 14:19:24', 1, 'D', 1, 0),
(27, 1, 18, 108, '7038348822', '2016-06-30', 585, 600, 'test', 1, NULL, '2016-06-30 14:25:03', 1, 'D', 1, 0),
(28, 1, 18, 117, '14242341', '2016-06-30', 600, 615, 'test', 0, NULL, '2016-06-30 14:29:14', 1, 'D', 1, 0),
(29, 1, 18, 100, '14242341', '2016-07-04', 540, 555, 'sdfasdf', 2, NULL, '2016-07-04 18:57:32', 1, 'D', 1, 0),
(30, 1, 18, 100, '14242341', '2016-07-04', 570, 585, 'sdfsdf', 2, NULL, '2016-07-04 18:58:14', 1, 'D', 1, 0),
(31, 1, 18, 100, '14242341', '2016-07-04', 600, 615, 'asdfasd', 2, NULL, '2016-07-04 19:27:31', 1, 'D', 1, 0),
(32, 1, 18, 93, '14242341', '2016-07-04', 540, 555, 'asdfasd', 0, NULL, '2016-07-04 21:36:20', 1, 'D', 1, 0),
(33, 1, 18, 104, '4444444', '2016-07-04', 555, 570, 'new appp', 1, NULL, '2016-07-04 22:21:59', 1, 'D', 1, 0),
(34, 1, 18, 118, 'asdfasdfasd', '2016-07-06', 540, 555, 'asdfasdf', 1, NULL, '2016-07-06 16:10:37', 1, 'D', 1, 0),
(35, 1, 18, 118, '5235245', '2016-07-06', 555, 570, 'Tims appointment', 2, NULL, '2016-07-06 16:15:46', 1, 'D', 1, 0),
(36, 1, 18, 119, '12412341234', '2016-07-06', 570, 585, 'To see the doc', 1, NULL, '2016-07-06 16:17:20', 1, 'D', 1, 0),
(37, 1, 18, 101, '14242341', '2016-07-06', 555, 570, 'asdfasdf', 0, NULL, '2016-07-06 21:52:22', 1, 'D', 1, 0),
(38, 1, 18, 101, '123423', '2016-07-06', 585, 600, 'fadsfasd', 0, NULL, '2016-07-06 21:52:49', 1, 'D', 1, 0),
(39, 1, 18, 120, '41243123', '2016-07-06', 600, 615, 'dasdfads', 0, NULL, '2016-07-06 21:59:15', 1, 'D', 1, 0),
(40, 1, 18, 100, '14242341', '2016-07-07', 540, 555, 'sdf', 0, NULL, '2016-07-07 20:21:33', 1, 'D', 1, 0),
(41, 1, 18, 100, '14242341', '2016-07-09', 540, 555, 'sfsdf', 0, NULL, '2016-07-09 09:34:37', 1, 'D', 1, 0),
(42, 1, 18, 121, '142423413434', '2016-07-09', 555, 570, 'dfdgf', 0, NULL, '2016-07-09 09:35:25', 1, 'D', 1, 0),
(43, 1, 18, 100, '14242341', '2016-07-09', 570, 585, 'sdf', 0, NULL, '2016-07-09 09:36:24', 1, 'D', 1, 0),
(44, 1, 18, 122, '14242341', '2016-07-09', 585, 600, 'sdfsf', 0, NULL, '2016-07-09 09:50:59', 1, 'D', 1, 0),
(45, 1, 18, 100, '34234', '2016-07-09', 600, 615, 'SFS', 0, NULL, '2016-07-09 09:51:28', 1, 'D', 1, 0),
(46, 1, 18, 123, '34234', '2016-07-09', 615, 630, 'SDFSDF', 0, NULL, '2016-07-09 09:52:06', 1, 'D', 1, 0),
(47, 1, 18, 124, '3434343', '2016-07-09', 630, 645, 'sdfsdf', 2, NULL, '2016-07-09 09:53:22', 1, 'D', 1, 0),
(48, 1, 18, 100, '32234243', '2016-07-09', 645, 660, 'sdfsadf', 2, NULL, '2016-07-09 10:11:40', 1, 'D', 1, 0),
(49, 1, 18, 125, '432423', '2016-07-09', 645, 660, 'sadfsdf', 2, NULL, '2016-07-09 10:13:12', 1, 'D', 1, 0),
(50, 1, 18, 126, '4324234435345', '2016-07-09', 660, 675, 'sdfsaf', 2, NULL, '2016-07-09 10:14:43', 1, 'D', 1, 0),
(51, 1, 18, 127, '43242334535345', '2016-07-09', 675, 690, 'sdfasf', 2, NULL, '2016-07-09 10:15:22', 1, 'D', 1, 0),
(52, 1, 18, 128, '432423', '2016-07-09', 690, 705, 'sdfsad', 2, NULL, '2016-07-09 10:15:57', 1, 'D', 1, 0),
(53, 1, 18, 129, '323423', '2016-07-09', 690, 705, 'sdfsadfaf', 0, NULL, '2016-07-09 15:27:26', 1, 'D', 1, 0),
(54, 1, 18, 130, '323423', '2016-07-09', 705, 720, 'asdfaf', 0, NULL, '2016-07-09 15:27:51', 1, 'D', 1, 0),
(55, 1, 18, 131, '323423', '2016-07-09', 675, 690, 'sad', 0, NULL, '2016-07-09 15:33:04', 1, 'D', 1, 0),
(56, 1, 18, 132, '2222', '2016-07-09', 660, 675, 'sdfadf', 0, NULL, '2016-07-09 15:33:34', 1, 'D', 1, 0),
(57, 1, 18, 109, '432413', '2016-07-09', 630, 645, 'dsfa', 0, NULL, '2016-07-09 17:21:48', 1, 'D', 1, 0),
(58, 1, 18, 133, '4324233', '2016-07-09', 645, 660, 'dfgd', 2, NULL, '2016-07-09 17:22:26', 1, 'D', 1, 0),
(59, 1, 18, 134, '4324233', '2016-07-09', 645, 660, 'asdfsaf', 2, NULL, '2016-07-09 17:23:45', 1, 'D', 1, 0),
(60, 1, 18, 135, '4324233', '2016-07-09', 645, 660, 'asdfsdf', 2, NULL, '2016-07-09 17:24:13', 1, 'D', 1, 0),
(61, 1, 18, 133, '4324233', '2016-07-09', 645, 660, 'asdf', 0, NULL, '2016-07-09 17:28:09', 1, 'D', 1, 0),
(62, 1, 18, 136, '4134134', '2016-07-12', 540, 555, 'hahaha', 1, NULL, '2016-07-12 15:34:12', 1, 'D', 1, 0),
(63, 1, 18, 137, '3241234132', '2016-07-13', 540, 555, 'TYT', 1, NULL, '2016-07-13 15:47:45', 1, 'D', 1, 0),
(64, 1, 18, 137, '3241234132', '2016-07-13', 555, 570, 'the host', 1, NULL, '2016-07-13 16:40:38', 1, 'D', 1, 0),
(65, 1, 18, 138, '3413241324', '2016-07-13', 570, 585, 'host at tyt', 1, NULL, '2016-07-13 17:06:56', 1, 'D', 1, 0),
(66, 1, 18, 138, '3413241324', '2016-07-13', 585, 600, 'just a test', 1, NULL, '2016-07-13 17:58:17', 1, 'D', 1, 0),
(67, 1, 18, 139, '523452345', '2016-07-13', 600, 615, 'Lavine', 1, NULL, '2016-07-13 18:08:54', 1, 'D', 1, 0),
(68, 1, 18, 139, '523452345', '2016-07-13', 615, 630, 'Sugar', 1, NULL, '2016-07-13 18:10:04', 1, 'D', 1, 0),
(69, 1, 18, 118, 'asdfasdfasd', '2016-07-13', 630, 645, 'asdafsdfasdf', 1, NULL, '2016-07-13 22:51:15', 1, 'D', 1, 0),
(70, 1, 18, 140, '3241234123', '2016-07-13', 645, 660, 'hello', 2, NULL, '2016-07-13 23:08:21', 1, 'D', 1, 0),
(71, 1, 18, 140, '3241234123', '2016-07-13', 660, 675, 'asdfasdf', 0, NULL, '2016-07-13 23:21:55', 1, 'D', 1, 0),
(72, 1, 18, 140, '3241234123', '2016-07-13', 675, 690, 'asdfasdf', 0, NULL, '2016-07-13 23:23:03', 1, 'D', 1, 0),
(73, 1, 18, 118, 'asdfasdfasd', '2016-07-13', 690, 705, 'Cant edit once the patient info had been added', 0, NULL, '2016-07-13 23:51:20', 1, 'D', 1, 0),
(74, 1, 18, 114, '9049035958', '2016-07-13', 705, 720, 'aasdf', 0, NULL, '2016-07-13 23:55:22', 1, 'D', 1, 0),
(75, 1, 18, 100, '14242341', '2016-07-14', 540, 555, 'aa', 0, NULL, '2016-07-14 15:54:44', 1, 'D', 1, 0),
(76, 1, 18, 112, '7845612332', '2016-07-14', 555, 570, 'aa', 1, NULL, '2016-07-14 15:55:34', 1, 'D', 1, 0),
(77, 1, 18, 141, '121235123', '2016-07-14', 570, 585, '123', 1, NULL, '2016-07-14 15:57:47', 1, 'D', 1, 0),
(78, 1, 18, 141, '121235123', '2016-07-14', 585, 600, 'asd', 2, NULL, '2016-07-14 15:59:37', 1, 'D', 1, 0),
(79, 1, 18, 141, '111242323', '2016-07-14', 600, 615, 'asd', 2, NULL, '2016-07-14 16:00:08', 1, 'D', 1, 0),
(80, 1, 18, 142, '3423432', '2016-07-14', 615, 630, 'test this thing', 2, NULL, '2016-07-14 19:21:23', 1, 'D', 1, 0),
(81, 1, 18, 116, '14242341', '2016-07-14', 630, 645, 'test this thing', 0, NULL, '2016-07-14 19:23:12', 1, 'D', 1, 0),
(82, 1, 18, 116, '23423423', '2016-07-14', 645, 660, 'this did not rest it', 0, NULL, '2016-07-14 19:24:50', 1, 'D', 1, 0),
(83, 1, 18, 114, '9049035958', '2016-07-14', 660, 675, 'description for Amanda lee', 0, NULL, '2016-07-14 19:31:18', 1, 'D', 1, 0),
(84, 1, 18, 114, '3423423', '2016-07-14', 675, 690, 'Description for the new person', 0, NULL, '2016-07-14 19:32:30', 1, 'D', 1, 0),
(85, 1, 18, 140, '3241234123', '2016-07-14', 690, 705, 'Hebo', 0, NULL, '2016-07-14 19:59:25', 1, 'D', 1, 0),
(86, 1, 18, 140, '97898709', '2016-07-14', 705, 720, 'Bennoit', 0, NULL, '2016-07-14 20:00:04', 1, 'D', 1, 0),
(87, 1, 18, 140, '3241234123', '2016-07-14', 585, 600, 'sdfasd', 0, NULL, '2016-07-14 20:03:33', 1, 'D', 1, 0),
(88, 1, 18, 143, '44543534', '2016-07-14', 600, 615, 'Criag list', 0, NULL, '2016-07-14 20:04:58', 1, 'D', 1, 0),
(89, 1, 18, 121, '5555555555', '2016-07-15', 540, 555, 'asdfasdf', 0, NULL, '2016-07-15 00:22:32', 1, 'D', 1, 0),
(90, 1, 18, 100, '14242341', '2016-07-18', 540, 555, 'asdf', 0, NULL, '2016-07-16 18:09:59', 2, 'S', 1, 0),
(91, 1, 18, 112, '34234', '2016-07-18', 555, 570, 'asdfdas', 2, NULL, '2016-07-18 15:46:52', 1, 'D', 1, 0),
(92, 1, 18, 100, '14242341', '2016-07-18', 570, 585, 'asdfasd', 2, NULL, '2016-07-18 15:48:06', 1, 'D', 1, 0),
(93, 1, 18, 136, '4134134', '2016-07-18', 675, 690, 'new appointment', 0, NULL, '2016-07-18 16:50:44', 1, 'D', 1, 0),
(94, 43, 21, 145, '2423423', '2016-07-18', 540, 555, 'test jamie', 0, NULL, '2016-07-18 17:07:48', 43, 'D', 1, 0),
(95, 1, 18, 146, 'asdfasd', '2016-07-18', 690, 705, 'sdf', 0, NULL, '2016-07-18 23:21:21', 1, 'D', 1, 0),
(96, 1, 18, 147, '433423', '2016-07-18', 705, 720, 'dfasdfasd', 0, NULL, '2016-07-18 23:22:00', 1, 'D', 1, 0),
(97, 47, 23, 148, '3421341234', '2016-07-18', 540, 555, 'hello', 0, NULL, '2016-07-18 23:29:05', 47, 'D', 1, 0),
(98, 1, 18, 149, '904903595', '2016-07-19', 540, 555, 'sdf', 0, NULL, '2016-07-19 14:10:46', 1, 'D', 1, 0),
(99, 1, 18, 150, '979', '2016-07-19', 555, 570, 'asdfs', 0, NULL, '2016-07-19 14:11:52', 1, 'D', 1, 0),
(100, 1, 18, 150, '97943', '2016-07-19', 570, 585, 'sdf', 0, NULL, '2016-07-19 14:12:11', 1, 'D', 1, 0),
(101, 1, 18, 150, '97934324242', '2016-07-19', 585, 600, 'safd', 0, NULL, '2016-07-19 14:12:29', 1, 'D', 1, 0),
(102, 1, 18, 150, '979', '2016-07-19', 600, 615, 'asdfsf', 0, NULL, '2016-07-19 15:14:33', 1, 'D', 1, 0),
(103, 1, 18, 151, '435', '2016-07-19', 615, 630, 'xv', 0, NULL, '2016-07-19 15:38:53', 1, 'D', 1, 0),
(104, 1, 18, 150, '979', '2016-07-19', 630, 645, 'asdfsaf', 0, NULL, '2016-07-19 15:52:49', 1, 'D', 1, 0),
(105, 1, 18, 169, '324234234234', '2016-07-21', 540, 555, 'Jamie needs a appointment\n', 0, NULL, '2016-07-21 16:25:00', 1, 'D', 1, 0),
(106, 1, 18, 169, '324234234234', '2016-07-21', 600, 615, 'booked when closing appointment', 1, NULL, '2016-07-21 23:28:49', 1, 'D', 1, 0),
(107, 1, 18, 169, '324234234234', '2016-07-21', 600, 615, 'booked when closing appointment', 1, NULL, '2016-07-21 23:29:19', 1, 'D', 1, 0),
(108, 1, 18, 173, '45345234', '2016-07-22', 540, 555, 'Neal wants to see the doctor', 0, NULL, '2016-07-22 16:00:02', 1, 'D', 1, 0),
(109, 1, 18, 136, '4134134', '2016-07-23', 540, 555, 'This is manual appointment', 3, 110, '2016-07-23 15:15:41', 1, 'D', 1, 0),
(110, 1, 18, 136, '4134134', '2016-07-24', 600, 615, 'rescheduled appointment', 2, NULL, '2016-07-23 15:16:33', 1, 'D', 1, 0),
(111, 1, 18, 171, '67668768', '2016-07-23', 555, 570, 'manual appointment for Gearson', 3, 112, '2016-07-23 15:52:12', 1, 'D', 1, 0),
(112, 1, 18, 171, '67668768', '2016-07-24', 540, 555, 'rescheduled appointment', 0, NULL, '2016-07-23 15:52:48', 1, 'D', 1, 0),
(113, 1, 18, 136, '4134134', '2016-07-23', 540, 555, 'asdfsdf', 0, NULL, '2016-07-23 17:47:47', 1, 'D', 1, 0),
(114, 1, 18, 147, '433423', '2016-07-24', 555, 570, 'Hanks needs more hair', 0, NULL, '2016-07-24 20:53:46', 1, 'D', 1, 229488),
(115, 1, 18, 140, '3241234123', '2016-07-24', 570, 585, 'Charlie has chocolate addictions', 0, NULL, '2016-07-24 21:03:21', 1, 'D', 1, 229488),
(116, 1, 18, 174, '342342343', '2016-07-25', 540, 555, 'Hanna is anna', 3, 117, '2016-07-25 19:08:31', 1, 'D', 1, 229456),
(117, 1, 18, 174, '342342343', '2016-07-26', 600, 615, 'rescheduled appointment', 3, 118, '2016-07-25 19:09:04', 1, 'D', 1, NULL),
(118, 1, 18, 174, '342342343', '2016-07-25', 600, 615, 'rescheduled appointment', 3, 119, '2016-07-25 19:21:45', 1, 'D', 1, 229456),
(119, 1, 18, 174, '342342343', '2016-07-26', 600, 615, 'rescheduled appointment', 3, 120, '2016-07-25 21:11:49', 1, 'D', 1, 229457),
(120, 1, 18, 174, '342342343', '2016-07-27', 600, 615, 'rescheduled appointment', 3, 121, '2016-07-25 21:12:38', 1, 'D', 1, 229458),
(121, 1, 18, 174, '342342343', '2016-07-26', 660, 675, 'rescheduled appointment', 0, NULL, '2016-07-25 21:13:16', 1, 'D', 1, 229457);

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
(18, 'test', '2016-06-15 16:11:05', 1, 'D'),
(29, 'cancel\n', '2016-07-04 18:58:24', 1, 'D'),
(30, 'cancel', '2016-07-04 18:58:40', 1, 'D'),
(31, 'asdfasd', '2016-07-04 19:27:36', 1, 'D'),
(35, 'He is well again', '2016-07-06 16:17:41', 1, 'D'),
(48, 'sdf', '2016-07-09 10:12:46', 1, 'D'),
(52, '45', '2016-07-09 15:24:54', 1, 'D'),
(51, 'sdfsdfsfsdf', '2016-07-09 15:25:04', 1, 'D'),
(50, 'sdfsdfs', '2016-07-09 15:25:32', 1, 'D'),
(49, 'sdfasdf', '2016-07-09 15:25:36', 1, 'D'),
(47, 'sdfasddf', '2016-07-09 15:25:43', 1, 'D'),
(58, 'asdfasfd', '2016-07-09 17:23:21', 1, 'D'),
(59, 'asdfsa', '2016-07-09 17:23:51', 1, 'D'),
(60, 'asdf', '2016-07-09 17:24:20', 1, 'D'),
(70, 'asdfasdf', '2016-07-13 23:57:06', 1, 'D'),
(78, 'sdfasd', '2016-07-14 20:00:43', 1, 'D'),
(79, 'sdf', '2016-07-14 20:02:42', 1, 'D'),
(80, 'asdfasd', '2016-07-14 20:02:47', 1, 'D'),
(92, 'erwer', '2016-07-18 16:48:42', 1, 'D'),
(91, 'this is ', '2016-07-18 16:50:17', 1, 'D'),
(110, 'test cancel', '2016-07-23 16:25:54', 1, 'D');

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
  `created_by_type` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `close_appointment`
--

INSERT INTO `close_appointment` (`fk_appointment_id`, `closing_date`, `closing_time_mins`, `fk_patient_id`, `remarks`, `created_date_time`, `fk_created_by_id`, `created_by_type`) VALUES
(64, '2016-07-13', 9, 137, 'he is happpy', '2016-07-13 17:06:22', 1, 'D'),
(65, '2016-07-13', 9, 138, 'only the lists dont get cleartted', '2016-07-13 17:07:22', 1, 'D'),
(66, '2016-07-13', 10, 138, 'happy patient', '2016-07-13 17:59:29', 1, 'D'),
(67, '2016-07-13', 10, 139, 'pay phone', '2016-07-13 18:09:29', 1, 'D'),
(68, '2016-07-13', 10, 139, 'cool man', '2016-07-13 18:10:35', 1, 'D'),
(69, '2016-07-13', 10, 118, 'Tim is happy', '2016-07-13 22:59:15', 1, 'D'),
(76, '2016-07-14', 9, 112, 'clsedo', '2016-07-14 15:56:39', 1, 'D'),
(77, '2016-07-14', 9, 141, 'asd', '2016-07-14 15:58:48', 1, 'D'),
(106, '2016-07-21', 10, 169, 'sdfasdfasd', '2016-07-21 23:29:19', 1, 'D'),
(107, '2016-07-21', 10, 169, 'just close and dont book', '2016-07-21 23:38:47', 1, 'D');

-- --------------------------------------------------------

--
-- Table structure for table `close_appointment_documents`
--

CREATE TABLE IF NOT EXISTS `close_appointment_documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_appointment_id` int(11) NOT NULL,
  `document_name` varchar(200) NOT NULL,
  `document_path` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `close_appointment_prescriptions`
--

CREATE TABLE IF NOT EXISTS `close_appointment_prescriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_appointment_id` int(11) NOT NULL,
  `medicine` varchar(200) DEFAULT NULL,
  `remarks` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `close_appointment_prescriptions`
--

INSERT INTO `close_appointment_prescriptions` (`id`, `fk_appointment_id`, `medicine`, `remarks`) VALUES
(11, 64, 'asdfasd', 'sdfasdf'),
(12, 64, 'smile', 'every time'),
(13, 66, 'smile', 'Always'),
(14, 66, 're frame', 'Always'),
(15, 67, 'sing', 'all day'),
(16, 68, 'ohh man', 'just a render'),
(17, 69, 'Smile', 'Whenever you can'),
(18, 69, 'Grateful', 'When you are free'),
(19, 76, 'asd', '1x1x1'),
(20, 77, 'asd', '21');

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
  `email` varchar(100) NOT NULL,
  `qualification` varchar(1000) NOT NULL,
  `address` varchar(2000) NOT NULL,
  `is_active` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=48 ;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`id`, `fk_login_id`, `name`, `contact1`, `email`, `qualification`, `address`, `is_active`) VALUES
(1, 33, 'Doc', '3412', 'fsdf@sdf.com', 'wqwer', 'wer', 1),
(25, 58, 'savio', '94234234', 'savio@dreamlogic.in', 'asdfasdf', 'asdf', 1),
(29, 71, 'Greg', '324234', 'azzyxec@gmail.com', 'dsfsda', 'asdfsadf', 0),
(30, 72, 'Greg', '324234', 'azzyxec@gmail.com', 'dsfsda', 'asdfsadf', 0),
(31, 73, 'Greg', '324234', 'azzyxec@gmail.com', 'dsfsda', 'asdfsadf', 0),
(32, 74, 'Greg', '324234', 'azzyxec@gmail.com', 'dsfsda', 'asdfsadf', 0),
(33, 75, 'Greg', '324234', 'azzyxec@gmail.com', 'dsfsda', 'asdfsadf', 0),
(34, 76, 'Greg', '324234', 'azzyxec@gmail.com', 'dsfsda', 'asdfsadf', 0),
(35, 77, 'Greg', '324234', 'azzyxec@gmail.com', 'dsfsda', 'asdfsadf', 0),
(36, 78, 'Greg', '324234', 'azzyxec@gmail.com', 'dsfsda', 'asdfsadf', 0),
(37, 79, 'den', '234234', 'azzyxec@gmail.com', 'asdfdsf', 'adsfadsf', 0),
(38, 80, 'den', '234234', 'azzyxec@gmail.com', 'asdfdsf', 'adsfadsf', 0),
(39, 81, 'minelli', '23423423423', 'azzyxec@gmail.com', '423423', 'Flat no AF 11, Haroon green fields, near Raj motors, St. Jose de areal, mugali, Margao Goa', 0),
(40, 82, 'dariuds', '4324234', 'azzyxec@gmail.com', 'sdfajksdfhlasd', 'asdfsdf', 0),
(41, 83, 'dariuds', '4324234', 'azzyxec@gmail.com', 'sdfajksdfhlasd', 'asdfsdf', 0),
(42, 84, 'dariuds', '4324234', 'azzyxec@gmail.com', 'sdfajksdfhlasd', 'asdfsdf', 0),
(43, 85, 'newan', '4213423', 'azzyxec@gmail.com', 'sdfasdf', 'Flat no AF 11, Haroon green fields, near Raj motors, St. Jose de areal, mugali, Margao Goa', 1),
(44, 86, 'Timmy', '+5', 'azzyxec@gmail', 'asdf ', 'Flat no AF 11, Haroon green fields, near Raj motors, St. Jose de areal, mugali, Margao Goa', 1),
(45, 87, 'Dan', '3423423423423423', 'asdfasdf@dssad.com', 'sadfasdf', 'sadfasdf', 0),
(46, 88, 'picolo', '2341234123', 'azzyxec@gmail.com', '2342342134', 'Flat no AF 11, Haroon green fields, near Raj motors, St. Jose de areal, mugali, Margao Goa', 0),
(47, 89, 'hanks', '67677', 'azzyxec@gmail.com', 'adsafd', 'Flat no AF 11, Haroon green fields, near Raj motors, St. Jose de areal, mugali, Margao Goa', 1);

-- --------------------------------------------------------

--
-- Table structure for table `guardian`
--

CREATE TABLE IF NOT EXISTS `guardian` (
  `fk_patient_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` int(11) NOT NULL DEFAULT '1',
  `picture_path` varchar(100) DEFAULT NULL,
  `phone1` varchar(20) NOT NULL,
  `phone2` varchar(20) DEFAULT NULL,
  `address` varchar(3000) NOT NULL,
  `is_active` int(11) DEFAULT '1',
  PRIMARY KEY (`fk_patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `guardian`
--

INSERT INTO `guardian` (`fk_patient_id`, `name`, `date_of_birth`, `gender`, `picture_path`, `phone1`, `phone2`, `address`, `is_active`) VALUES
(100, 'Marie Forleo', NULL, 0, 'undefined', '3423423432', NULL, '', 1),
(101, 'asdfsdf', '2020-07-20', 1, '7.jpg', '5345345', 'asdfasdfsf', 'asdfdasf', 1),
(125, 'Hamba', NULL, 1, 'undefined', '234234', NULL, '', 0),
(154, 'tony', NULL, 1, '', '4234234', '', '', 1),
(155, '', NULL, 1, '', '', '', '', 1),
(156, '', NULL, 1, '', '', '', '', 1),
(162, 'guardian', NULL, 1, '', '66666666', NULL, '', 1),
(170, 'Guardian', NULL, 1, 'undefined', '7676756', NULL, '', 1),
(171, 'Guardian', NULL, 1, 'undefined', '6876876876', NULL, '', 1),
(172, 'James', NULL, 1, 'undefined', '686868', NULL, 'hgjhgjh', 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=92 ;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `type`, `login_id`, `password`, `created`, `last_modified`, `is_active`) VALUES
(1, 'A', 'admin', '$2y$12$4exp7y9xOEJ4mJoryW/H0eEPA6VE5o.y3lVtnPYIh/lPfOW8rN9b2', '1899-11-30 00:00:00', '0000-00-00 00:00:00', 1),
(33, 'D', 'doc', '$2y$12$femdEL9iXOFphtG4NQARJOwXdIG4LDxAiTL32eb9VBAFGoaR.soSa', '2016-05-01 18:26:09', '2016-07-18 18:57:52', 1),
(58, 'D', 'savio', '$2y$12$/W.gLAwQ/i5/FnVeHnJBDOe.N.2MBLW/wZL7Ma30I33dT.C5J86y.', '2016-06-15 21:07:02', NULL, 1),
(60, 'S', 'staff', '$2y$12$7OWYFWYvJRDie5vvf/O2NOus6bxNgV5hL/40UnxgHsYALhwfMsTMa', '2016-06-27 20:18:24', '2016-07-11 17:39:04', 1),
(71, 'D', 'greg', '$2y$12$uChOxKAHGWGTNo.kL2ZeL.hLyn8V0A/ycFRx9txbJm3etSWmeWPn.', '2016-07-01 13:12:35', NULL, 0),
(72, 'D', 'greg1', '$2y$12$ojHLC5SzUdeR/vIAj02xPOHK.bohocQBg6lK0mGg7JyY2r/MnElVW', '2016-07-01 13:14:21', NULL, 0),
(73, 'D', 'greg2', '$2y$12$ELXgLQUlSZV9J4yDF.kBq.WN7SoAVNE5BaBTtagL/GGOaAni7SF6S', '2016-07-01 13:14:55', NULL, 0),
(74, 'D', 'greg3', '$2y$12$/VNhMWUtpMme.mjWdb8fPOarg7CUSVi8RtfHjNtuHIsXTX00YTxw.', '2016-07-01 13:15:18', NULL, 0),
(75, 'D', 'greg4', '$2y$12$hjaDSfKHgs1W7zv2kVp6aOtGZP648d6q1WIOyb1PMZA2N.2FL2fyy', '2016-07-01 13:15:35', NULL, 0),
(76, 'D', 'greg5', '$2y$12$Y1dpDuw6aww1ufthQn.utu6pOdL3PfY.v/7PzUtgGac.6WQTcbKFK', '2016-07-01 13:15:50', NULL, 0),
(77, 'D', 'greg6', '$2y$12$/ERJExDQeYGGXsI7cX5GsuQbJGEXM6eTnPRRzlLzVsXfDHr30RIeK', '2016-07-01 13:16:46', NULL, 0),
(78, 'D', 'greg7', '$2y$12$oNJNpJ94zwiqhR5nNOazaOFP8.5o9TGRkubsvmFRQY13l9K.IgrfG', '2016-07-01 13:17:18', NULL, 0),
(79, 'D', 'den', '$2y$12$XT4aV3WuKLP4XVkLmvQKgecHiOjGG5wrf6Jzi8naiZ6T3eNyzeML.', '2016-07-01 13:24:57', NULL, 0),
(80, 'D', 'den1', '$2y$12$br26T69j865Q03bYZxj4Ge//oasI8dV0ywoyyAyhFHTqx5Iiimlfy', '2016-07-01 13:25:09', NULL, 0),
(81, 'D', 'minelli', '$2y$12$oZPgL1Ykg6xFiVYmM8F3neUa00ieN54KYm2YYFsYTsn71cPVOTqKO', '2016-07-17 18:42:22', NULL, 0),
(82, 'D', 'darius', '$2y$12$mXQq3u1iCk9XTrG9.dML3O5NEBbv8/SDLOUZvvgQIDFgMRBtmiFQO', '2016-07-17 19:09:56', NULL, 0),
(83, 'D', 'darius1', '$2y$12$CQsJ4KM3xHW7rJS6RSQ6BuuvMVE7xbT3wnLf5gi.aWoKBp2V9S7h.', '2016-07-17 19:13:21', NULL, 0),
(84, 'D', 'darius2', '$2y$12$9K6ZrZdCasDUrY3N8/gudOUVQzrL8gBbBnYUbzs5AmUOQonSAqIda', '2016-07-17 19:13:59', NULL, 0),
(85, 'D', 'newan', '$2y$12$3Zag1luAOeZ6CDYzoWzNl.gsJKB6REmO05h9iGumZRLGQtvHg1vJC', '2016-07-18 17:01:08', '2016-07-18 17:02:56', 1),
(86, 'D', 'timmy', '$2y$12$9129aC9jd1VxSVRPLty27ebnGBwOMGseslZSA2p/HchCIfpI/6WOu', '2016-07-18 17:09:34', '2016-07-18 18:30:20', 1),
(87, 'D', 'dan', '$2y$12$5E5VHzymTDr6MXcwrrYqFOhOqLAt0f3eOzcpbE8kv8xLEPh1j0NF6', '2016-07-18 21:25:39', NULL, 0),
(88, 'D', 'picolo', '$2y$12$ra430g6xGWEE7/ub6fsT9uVzkcYgO9FBJ8P974q/M0GgbTKG6ZxhO', '2016-07-18 21:45:37', NULL, 0),
(89, 'D', 'hans', '$2y$12$hRFvYZESR5X3aymuQqM04OVDgZU2yJkcxAXiMjCjIBOUO49d4HTse', '2016-07-18 23:27:11', '2016-07-18 23:27:38', 1),
(90, 'S', 'someone', '$2y$12$tzbdZ8nznpvfbrMU5NhPIOWqJmCaRYbcq97q8Qydg31v4IO0WovcG', '2016-07-28 01:13:58', '2016-07-28 01:17:26', 1),
(91, 'S', 'staffer', '$2y$12$TVOmTA6W1au0.SrZgHt0AePiiQsppbLbP8XS/rhzMt2t3lJbN5rsS', '2016-07-28 01:30:15', '2016-07-28 01:30:54', 1);

-- --------------------------------------------------------

--
-- Table structure for table `medication_programme`
--

CREATE TABLE IF NOT EXISTS `medication_programme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_doctors_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_date` datetime NOT NULL,
  `is_active` int(11) NOT NULL,
  `created_by_id` int(11) DEFAULT NULL,
  `created_by_type` varchar(5) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `modified_by_id` int(11) DEFAULT NULL,
  `modified_by_type` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `medication_programme`
--

INSERT INTO `medication_programme` (`id`, `fk_doctors_id`, `name`, `created_date`, `is_active`, `created_by_id`, `created_by_type`, `modified_date`, `modified_by_id`, `modified_by_type`) VALUES
(1, 1, 'polio', '2016-07-09 00:00:00', 1, NULL, NULL, NULL, NULL, NULL),
(2, 1, 'test1', '2016-07-18 00:00:00', 1, NULL, NULL, NULL, NULL, NULL),
(3, 1, 'Polio', '2016-07-19 00:00:00', 1, NULL, NULL, NULL, NULL, NULL),
(4, 1, 'Test', '2016-07-27 00:00:00', 1, NULL, NULL, NULL, NULL, NULL),
(5, 1, 'New', '2016-07-27 00:00:00', 1, NULL, NULL, NULL, NULL, NULL),
(6, 1, 'Xerces', '2016-07-27 00:00:00', 0, NULL, NULL, '2016-07-27 18:32:22', 1, '0'),
(7, 1, 'newst', '2016-07-27 00:00:00', 1, NULL, NULL, NULL, NULL, NULL),
(8, 1, 'Reno', '2016-07-27 17:53:16', 0, 1, '0', NULL, NULL, NULL),
(9, 1, 'CVW', '2016-07-27 17:55:01', 0, 1, '0', '2016-07-27 18:09:45', 1, '0');

-- --------------------------------------------------------

--
-- Table structure for table `medication_programme_list`
--

CREATE TABLE IF NOT EXISTS `medication_programme_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_medication_programme_id` int(11) NOT NULL,
  `duration_days` int(11) NOT NULL,
  `duration_text` varchar(100) NOT NULL,
  `medicine` varchar(100) NOT NULL,
  `dose_no` varchar(100) NOT NULL,
  `created_date` datetime NOT NULL,
  `is_active` int(11) DEFAULT '0',
  `fk_doctor_id` int(11) NOT NULL,
  `modified_date` datetime DEFAULT NULL,
  `update_marker` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `medication_programme_list`
--

INSERT INTO `medication_programme_list` (`id`, `fk_medication_programme_id`, `duration_days`, `duration_text`, `medicine`, `dose_no`, `created_date`, `is_active`, `fk_doctor_id`, `modified_date`, `update_marker`) VALUES
(1, 1, 34444, 'sdafs', 'dfda', '34', '2016-07-09 00:00:00', 1, 1, '2016-07-19 18:45:21', 0),
(2, 1, 4, '1 month', 'Hepatitis B', '2', '0000-00-00 00:00:00', 1, 1, '2016-07-19 18:45:21', 0),
(3, 2, 3, '3 weeks', 'zyx', '3', '2016-07-18 00:00:00', 1, 1, '2016-07-22 13:33:47', 0),
(4, 2, 4, '4 weeks', 'zzz', '5', '2016-07-18 00:00:00', 1, 1, '2016-07-22 13:33:47', 0),
(5, 2, 5, '5 w', 'eeks', '6', '2016-07-18 00:00:00', 1, 1, '2016-07-22 13:33:47', 0),
(6, 1, 5, 'five weeks', 'five', '4', '2016-07-19 00:00:00', 1, 1, '2016-07-19 18:45:21', 0),
(7, 3, 4, '4 weeks', 'polio', '4', '2016-07-19 00:00:00', 1, 1, NULL, 0),
(8, 4, 5, 'update', 'sss', '4', '2016-07-27 17:17:37', 1, 1, NULL, 1),
(9, 6, 4, '333', '333', '2333', '2016-07-27 17:24:46', 1, 1, '2016-07-27 18:32:22', 1),
(10, 8, 4, 'four', 'xyz', 'dose', '2016-07-27 17:53:16', 0, 1, NULL, 0),
(11, 9, 3, '3', '3', '3', '2016-07-27 17:55:01', 0, 1, NULL, 0);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `password_reset_request`
--

INSERT INTO `password_reset_request` (`id`, `fk_login_id`, `old_password`, `reset_code`, `recovery_email`, `recovery_mobile`, `created_date_time`, `modified_date`, `is_valid`) VALUES
(1, 33, '$2y$12$femdEL9iXOFphtG4NQARJOwXdIG4LDxAiTL32eb9VBAFGoaR.soSa', 'P1307436', 'fsdf@sdf.com', NULL, '2016-07-18 21:27:52', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE IF NOT EXISTS `patient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_doctor_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date_of_birth` date NOT NULL,
  `blood_group` varchar(10) DEFAULT NULL,
  `weight` varchar(50) DEFAULT NULL,
  `height` varchar(50) DEFAULT NULL,
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
  `is_active` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=175 ;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `fk_doctor_id`, `name`, `date_of_birth`, `blood_group`, `weight`, `height`, `gender`, `contact1`, `contact2`, `email`, `address`, `picture_path`, `created_date`, `fk_created_by_id`, `created_by_type`, `modified_date`, `fk_modified_by_id`, `modified_by_type`, `is_active`) VALUES
(93, 1, 'Travolda', '2016-04-01', 'AB+', '2 kgs', '20 cms', 1, '14242341', '12412341', NULL, 'Kanas', '2.jpg', '2016-06-07 12:56:30', 1, 'D', NULL, NULL, NULL, 1),
(94, 1, 'Travolda', '2016-04-01', 'AB+', '2 kgs', '20 cms', 1, '14242341', '12412341', NULL, 'Kanas', NULL, '2016-06-07 12:58:46', 1, 'D', NULL, 1, 'D', 1),
(95, 1, 'Travolda1', '2016-04-01', 'AB+', '2 kgs', '20 cms', 1, '14242341', '12412341', NULL, 'Kanas', NULL, '2016-06-07 13:06:23', 1, 'D', NULL, 1, 'D', 1),
(96, 1, 'Travolda', '2016-04-01', 'AB+', '2 kgs', '20 cms', 1, '14242341', '12412341', NULL, 'Kanas', '2.jpg', '2016-06-07 15:59:56', 1, 'D', NULL, NULL, NULL, 1),
(100, 1, 'Amanda Lee', '1995-04-01', 'AB+', '5', '5', 1, '14242341', NULL, NULL, 'sdfsdf', 'Azhar  in  Don Avatar2.jpg', '2016-06-10 22:43:05', 1, 'D', NULL, 1, 'D', 1),
(101, 1, 'Amanda Lee', '1995-04-01', 'AB+', '57 Kg', '5.8 ft', 1, '14242341', '45345', NULL, 'asdf', 'A-707-web-image-09.jpg', '2016-06-10 22:46:27', 1, 'D', NULL, 1, 'D', 1),
(102, 1, 'Amanda Lee', '1995-04-01', 'AB+', '57 Kg', '5.8 ft', 0, '14242341', NULL, NULL, NULL, NULL, '2016-06-10 22:48:16', 1, 'D', NULL, NULL, NULL, 1),
(103, 1, 'Amanda Lee', '1995-04-01', 'AB+', '57', '5.8', 0, '14242341', NULL, NULL, '', 'null', '2016-06-10 22:48:58', 1, 'D', NULL, 1, 'D', 1),
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
(117, 1, 'Travolda (14242341)', '2016-04-01', 'AB+', '2 kgs', '20 cms', 1, '14242341', NULL, NULL, NULL, NULL, '2016-06-30 14:29:14', 1, 'D', NULL, NULL, NULL, 1),
(118, 1, 'Tim', '2016-07-06', '', '', '', 1, 'asdfasdfasd', NULL, NULL, NULL, NULL, '2016-07-06 16:10:37', 1, 'D', NULL, NULL, NULL, 1),
(119, 1, 'Pingu', '2016-07-06', '', '', '', 1, '12412341234', NULL, NULL, NULL, NULL, '2016-07-06 16:17:20', 1, 'D', NULL, NULL, NULL, 1),
(120, 1, '', '2016-07-06', '', '', 'sadf', 1, '41243123', NULL, NULL, NULL, NULL, '2016-07-06 21:59:15', 1, 'D', NULL, NULL, NULL, 1),
(121, 1, 'Amanda Lee 2', '1995-04-01', 'AB+', '57 Kg', '5.8 ft', 0, '142423413434', NULL, NULL, NULL, NULL, '2016-07-09 09:35:25', 1, 'D', NULL, NULL, NULL, 1),
(122, 1, 'Amanda Lee (14242341)', '1995-04-01', 'AB+', '57 Kg', '5.8 ft', 0, '14242341', NULL, NULL, NULL, NULL, '2016-07-09 09:50:59', 1, 'D', NULL, NULL, NULL, 1),
(123, 1, 'asdf (34234)', '2016-06-21', '', '434', '43', 1, '34234', NULL, NULL, NULL, NULL, '2016-07-09 09:52:06', 1, 'D', NULL, NULL, NULL, 1),
(124, 1, 'Tim (asdfasdfasd)', '2016-07-06', 'AB+', 'sdf', 'sdaf', 1, '3434343', NULL, NULL, NULL, NULL, '2016-07-09 09:53:22', 1, 'D', NULL, NULL, NULL, 1),
(125, 1, 'jhon', '2016-07-29', 'A+', '34', '343', 1, '432423', NULL, NULL, '', 'null', '2016-07-09 10:13:12', 1, 'D', NULL, 1, 'D', 0),
(126, 1, 'jhon (432423)', '2016-07-29', 'A+', '34', '343', 1, '4324234435345', NULL, NULL, NULL, NULL, '2016-07-09 10:14:43', 1, 'D', NULL, NULL, NULL, 1),
(127, 1, 'jhon (432423)', '2016-07-29', 'A+', '34', '343', 1, '43242334535345', NULL, NULL, NULL, NULL, '2016-07-09 10:15:22', 1, 'D', NULL, NULL, NULL, 1),
(128, 1, 'jhon (432423)', '2016-07-29', 'A+', '34', '343', 1, '432423', NULL, NULL, NULL, NULL, '2016-07-09 10:15:57', 1, 'D', NULL, NULL, NULL, 1),
(129, 1, 'TEst 3 (323423)', '2016-06-14', 'B+', '23', '12', 1, '323423', NULL, NULL, NULL, NULL, '2016-07-09 15:27:26', 1, 'D', NULL, NULL, NULL, 1),
(130, 1, 'TEst 3 (323423) (323423)', '2016-06-14', 'B+', '23', '12', 1, '323423', NULL, NULL, NULL, NULL, '2016-07-09 15:27:51', 1, 'D', NULL, NULL, NULL, 1),
(131, 1, 'TEst 3 (323423)', '2016-06-14', 'B+', '23', '12', 1, '323423', NULL, NULL, NULL, NULL, '2016-07-09 15:33:04', 1, 'D', NULL, NULL, NULL, 1),
(132, 1, 'TEst 3 (323423)', '2016-06-14', '', '23', '12', 1, '2222', NULL, NULL, NULL, NULL, '2016-07-09 15:33:34', 1, 'D', NULL, NULL, NULL, 1),
(133, 1, 'crusty', '2016-06-27', 'AB-', '34', '34', 1, '4324233', NULL, NULL, NULL, NULL, '2016-07-09 17:22:26', 1, 'D', NULL, NULL, NULL, 1),
(134, 1, 'crusty (4324233)', '2016-06-27', 'AB-', '34', '34', 1, '4324233', NULL, NULL, NULL, NULL, '2016-07-09 17:23:45', 1, 'D', NULL, NULL, NULL, 1),
(135, 1, 'crusty (4324233) (4324233)', '2016-06-27', 'AB-', '34', '34', 1, '4324233', NULL, NULL, NULL, NULL, '2016-07-09 17:24:13', 1, 'D', NULL, NULL, NULL, 1),
(136, 1, 'TaylorDavis', '2016-07-12', '', '', '', 0, '4134134', NULL, NULL, NULL, NULL, '2016-07-12 15:34:12', 1, 'D', NULL, NULL, NULL, 1),
(137, 1, 'Cenk ', '2016-07-13', '', '', '', 1, '3241234132', NULL, NULL, NULL, NULL, '2016-07-13 15:47:45', 1, 'D', NULL, NULL, NULL, 1),
(138, 1, 'Kasperian', '2016-07-13', '', '', '', 0, '3413241324', NULL, NULL, NULL, NULL, '2016-07-13 17:06:56', 1, 'D', NULL, NULL, NULL, 1),
(139, 1, 'Adam', '2016-07-13', '', '', '', 1, '523452345', NULL, NULL, NULL, NULL, '2016-07-13 18:08:54', 1, 'D', NULL, NULL, NULL, 1),
(140, 1, 'Charlie', '2016-07-13', '', '', '', 1, '3241234123', NULL, NULL, NULL, NULL, '2016-07-13 23:08:21', 1, 'D', NULL, NULL, NULL, 1),
(141, 1, 'savio', '2016-07-05', 'B-', '33', '4', 1, '121235123', NULL, NULL, NULL, NULL, '2016-07-14 15:57:47', 1, 'D', NULL, NULL, NULL, 1),
(142, 1, 'Chipla', '2016-07-14', 'B+', '33', '22', 1, '3423432', NULL, NULL, NULL, NULL, '2016-07-14 19:21:23', 1, 'D', NULL, NULL, NULL, 1),
(143, 1, 'Taylor ', '2016-07-13', 'A+', '77', '66', 0, '44543534', NULL, NULL, NULL, NULL, '2016-07-14 20:04:58', 1, 'D', NULL, NULL, NULL, 1),
(144, 1, 'timmy', '2016-07-15', 'hgj', 'dsff', 'sdfsf', 1, '5435', 'e544', NULL, 'fddzvzc', '6.jpg', '2016-07-18 16:21:57', 1, 'D', NULL, 1, 'D', 1),
(145, 43, 'Jamie', '2016-07-18', 'A+', '34', '43', 1, '2423423', NULL, NULL, NULL, NULL, '2016-07-18 17:07:48', 43, 'D', NULL, NULL, NULL, 1),
(146, 1, 'Jimmy', '2016-07-18', '', '', '', 1, 'asdfasd', NULL, NULL, NULL, NULL, '2016-07-18 23:21:21', 1, 'D', NULL, NULL, NULL, 1),
(147, 1, 'Hanks', '2016-07-18', '', '', '', 1, '433423', NULL, NULL, NULL, NULL, '2016-07-18 23:22:00', 1, 'D', NULL, NULL, NULL, 1),
(148, 47, 'Fellon', '2016-07-18', '', '', '', 1, '3421341234', NULL, NULL, NULL, NULL, '2016-07-18 23:29:05', 47, 'D', NULL, NULL, NULL, 1),
(149, 1, 'akeelo', '2016-07-19', 'B-', '46 ', '4.3', 1, '904903595', NULL, NULL, NULL, NULL, '2016-07-19 14:10:46', 1, 'D', NULL, NULL, NULL, 1),
(150, 1, 'ruby xec', '2016-07-11', 'O-', '40', '5.6', 1, '979', NULL, NULL, NULL, NULL, '2016-07-19 14:11:52', 1, 'D', NULL, NULL, NULL, 1),
(151, 1, 'Amanda Leesdf', '2016-07-19', 'A+', '', '5.9', 1, '435', NULL, NULL, NULL, NULL, '2016-07-19 15:38:53', 1, 'D', NULL, NULL, NULL, 1),
(152, 1, 'timmie', '2019-07-20', '', '', '', 0, '3423423', NULL, NULL, '', 'undefined', '2016-07-19 23:22:00', 1, 'D', NULL, NULL, NULL, 0),
(153, 1, 'Joie', '2019-07-20', '', '', '', 1, '42341234', NULL, NULL, '', 'undefined', '2016-07-19 23:24:25', 1, 'D', NULL, NULL, NULL, 1),
(154, 1, 'Tony', '2016-07-20', '', '', '', 1, '234234', NULL, NULL, '', 'undefined', '2016-07-20 02:09:15', 1, 'D', NULL, NULL, NULL, 1),
(155, 1, 'Marie', '2016-07-20', '', '', '', 1, '534534', NULL, NULL, '', 'undefined', '2016-07-20 02:10:21', 1, 'D', NULL, NULL, NULL, 1),
(156, 1, 'M Forleo', '2016-07-20', '', '', '', 1, '34234234', NULL, NULL, '', 'undefined', '2016-07-20 02:17:31', 1, 'D', NULL, NULL, NULL, 1),
(157, 1, 'patient', '2016-07-20', '-', '', '', 1, '3423423', NULL, NULL, '', 'undefined', '2016-07-20 13:25:37', 1, 'D', NULL, NULL, NULL, 1),
(158, 1, 'patient', '2016-07-20', '-', '', '', 1, '3423423', NULL, NULL, '', 'undefined', '2016-07-20 13:25:55', 1, 'D', NULL, NULL, NULL, 1),
(159, 1, 'patient', '2016-07-20', '-', '', '', 1, '3423423', NULL, NULL, '', 'undefined', '2016-07-20 13:27:06', 1, 'D', NULL, NULL, NULL, 1),
(160, 1, 'patient', '2016-07-20', '-', '', '', 1, '3423423', NULL, NULL, '', 'undefined', '2016-07-20 13:27:17', 1, 'D', NULL, NULL, NULL, 1),
(161, 1, 'test patient', '2016-07-20', '-', '', '', 1, '3423423', NULL, NULL, '', 'undefined', '2016-07-20 13:28:38', 1, 'D', NULL, NULL, NULL, 1),
(162, 1, 'test patient', '2016-07-20', '-', '', '', 1, '3423423', NULL, NULL, '', 'undefined', '2016-07-20 13:28:52', 1, 'D', NULL, NULL, NULL, 1),
(163, 1, 'scooby', '2016-07-20', '-', '', '', 1, '23423423', NULL, NULL, '', 'undefined', '2016-07-20 14:00:54', 1, 'D', NULL, NULL, NULL, 1),
(164, 1, 'scooby', '2016-07-20', '-', '', '', 1, '23423423', NULL, NULL, '', 'undefined', '2016-07-20 14:04:39', 1, 'D', NULL, 1, 'D', 1),
(165, 1, 'scooby', '2016-07-20', '-', '', '', 1, '23423423', NULL, NULL, '', 'undefined', '2016-07-20 14:08:18', 1, 'D', NULL, NULL, NULL, 1),
(166, 1, 'scooby', '2016-07-20', '-', '', '', 1, '23423423', NULL, NULL, '', 'undefined', '2016-07-20 14:32:46', 1, 'D', NULL, NULL, NULL, 1),
(167, 1, 'scooby', '2016-07-20', '-', '', '', 1, '23423423', NULL, NULL, '', 'undefined', '2016-07-20 14:34:48', 1, 'D', NULL, NULL, NULL, 1),
(168, 1, 'Dan', '2016-07-20', '-', '', '', 1, '423423432', NULL, NULL, '', 'undefined', '2016-07-20 18:30:30', 1, 'D', NULL, 1, 'D', 1),
(169, 1, 'Jamie', '2016-07-21', '', '', '', 1, '324234234234', NULL, NULL, NULL, NULL, '2016-07-21 16:25:00', 1, 'D', NULL, NULL, NULL, 1),
(170, 1, 'Brown', '2016-07-22', '-', '', '', 1, '423423432', NULL, NULL, '', 'undefined', '2016-07-22 13:39:23', 1, 'D', NULL, 1, 'D', 1),
(171, 1, 'Gearson', '2016-07-22', '-', '', '', 1, '67668768', NULL, NULL, '', 'undefined', '2016-07-22 14:21:57', 1, 'D', NULL, 1, 'D', 1),
(172, 1, 'Aulther', '2016-07-22', '-', '', '', 1, '6876868', NULL, NULL, '', 'undefined', '2016-07-22 14:51:35', 1, 'D', NULL, 1, 'D', 1),
(173, 1, 'Neal', '2016-07-22', '-', '', '', 1, '45345234', NULL, NULL, NULL, NULL, '2016-07-22 16:00:02', 1, 'D', NULL, NULL, NULL, 1),
(174, 1, 'Hanna', '2016-07-25', '-', '', '', 0, '342342343', NULL, NULL, NULL, NULL, '2016-07-25 19:08:31', 1, 'D', NULL, NULL, NULL, 1);

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
  `created_date` datetime NOT NULL,
  `is_active` int(100) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `patient_medication_programme`
--

INSERT INTO `patient_medication_programme` (`id`, `fk_patient_id`, `fk_doctor_id`, `fk_medication_pogramme_id`, `name`, `created_date`, `is_active`) VALUES
(1, 163, 1, 1, 'polio', '2016-07-20 00:00:00', 1),
(2, 167, 1, 1, 'polio', '2016-07-20 14:34:48', 1),
(3, 168, 1, 1, 'polio', '2016-07-20 18:30:30', 1),
(4, 168, 1, 2, 'test', '2016-07-21 00:11:43', 1),
(5, 100, 1, 1, 'polio', '2016-07-22 19:24:20', 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `patient_medication_programme_list`
--

INSERT INTO `patient_medication_programme_list` (`id`, `fk_patient_id`, `fk_doctor_id`, `fk_medication_programme_id`, `fk_medication_programme_list_id`, `duration_days`, `medicine`, `dose_no`, `due_on`, `give_on`, `batch_no`) VALUES
(1, 163, 1, 1, 1, 34444, 'dfda', 34, '2016-07-22', '2016-07-22', ''),
(2, 163, 1, 1, 2, 4, 'Hepatitis B', 2, '2016-07-22', '2016-07-22', ''),
(3, 163, 1, 1, 6, 5, 'five', 4, '2016-07-22', '2016-07-22', ''),
(4, 164, 1, 1, 1, 34444, 'dfda', 34, '2016-07-22', '2016-07-22', ''),
(5, 164, 1, 1, 2, 4, 'Hepatitis B', 2, '2016-07-22', '2016-07-22', ''),
(6, 164, 1, 1, 6, 5, 'five', 4, '2016-07-22', '2016-07-22', ''),
(7, 165, 1, 1, 1, 34444, 'dfda', 34, '2016-07-22', '2016-07-22', ''),
(8, 165, 1, 1, 2, 4, 'Hepatitis B', 2, '2016-07-22', '2016-07-22', ''),
(9, 165, 1, 1, 6, 5, 'five', 4, '2016-07-22', '2016-07-22', ''),
(10, 166, 1, 1, 1, 34444, 'dfda', 34, '2016-07-22', '2016-07-22', ''),
(11, 166, 1, 1, 2, 4, 'Hepatitis B', 2, '2016-07-22', '2016-07-22', ''),
(12, 166, 1, 1, 6, 5, 'five', 4, '2016-07-22', '2016-07-22', ''),
(13, 167, 1, 1, 1, 34444, 'dfda', 34, '2016-07-22', '2016-07-22', ''),
(14, 167, 1, 1, 2, 4, 'Hepatitis B', 2, '2016-07-22', '2016-07-22', ''),
(15, 167, 1, 1, 6, 5, 'five', 4, '2016-07-22', '2016-07-22', ''),
(16, 168, 1, 1, 1, 34444, 'dfda', 34, '2016-07-22', '2016-07-22', '22'),
(17, 168, 1, 1, 2, 4, 'Hepatitis B', 2, '2016-07-22', '2016-07-22', '23'),
(18, 168, 1, 1, 6, 5, 'five', 4, '2016-07-22', '2016-07-22', '44'),
(19, 168, 1, 2, 3, 3, 'zyx', 3, '2016-07-22', '2016-07-22', '1'),
(20, 168, 1, 2, 4, 4, 'zzz', 5, '2016-07-22', '2016-07-22', '2'),
(21, 168, 1, 2, 5, 5, 'eeks', 6, '2016-07-22', '2016-07-22', '3'),
(22, 100, 1, 1, 1, 34444, 'dfda', 34, '2016-07-21', '2016-07-22', '4'),
(23, 100, 1, 1, 2, 4, 'Hepatitis B', 2, '2016-07-22', '2016-07-23', '5'),
(24, 100, 1, 1, 6, 5, 'five', 4, '2016-07-23', '2016-07-24', '6');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_doctor_id` int(11) NOT NULL,
  `fk_location_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `current_stock` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by_id` int(11) NOT NULL,
  `created_by_type` varchar(5) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=38 ;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `fk_doctor_id`, `fk_location_id`, `name`, `current_stock`, `created_date`, `created_by_id`, `created_by_type`, `is_active`) VALUES
(23, 1, 0, 'Crossin', 44, '2016-07-27 01:51:49', 1, 'D', 1),
(24, 1, 19, 'dCold', 50, '2016-07-27 01:52:26', 1, 'D', 1),
(25, 1, 19, 'd', 9, '2016-07-27 01:54:25', 1, 'D', 1),
(26, 1, 18, 'dcold', 35, '2016-07-27 02:15:26', 1, 'D', 1),
(27, 1, 20, 'crossin', 333, '2016-07-27 02:16:24', 1, 'D', 1),
(28, 1, 20, 'vascod', 33, '2016-07-27 02:16:50', 1, 'D', 1),
(29, 1, 20, 'dd', 3, '2016-07-27 02:26:34', 1, 'D', 1),
(30, 1, 18, 'abaxki', 3, '2016-07-27 02:26:54', 1, 'D', 1),
(31, 1, 19, 'dddddd', 9, '2016-07-27 02:57:37', 1, 'D', 1),
(32, 1, 19, 'ddddddd', 6, '2016-07-27 02:58:15', 1, 'D', 1),
(33, 1, 0, 'new', 6, '2016-07-27 03:14:38', 1, 'D', 1),
(34, 1, 0, 'sdf', 5, '2016-07-27 03:23:04', 1, 'D', 1),
(35, 1, 0, 'sdf', 5, '2016-07-27 03:23:13', 1, 'D', 1),
(36, 1, 19, 'fasdfasd', 5, '2016-07-27 03:23:19', 1, 'D', 1),
(37, 1, 18, 'new', 11, '2016-07-27 03:32:39', 1, 'D', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_stock_history`
--

CREATE TABLE IF NOT EXISTS `product_stock_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_product_id` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `operation_type` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `created_by_id` int(11) NOT NULL,
  `created_by_type` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=48 ;

--
-- Dumping data for table `product_stock_history`
--

INSERT INTO `product_stock_history` (`id`, `fk_product_id`, `stock`, `operation_type`, `created_date`, `created_by_id`, `created_by_type`) VALUES
(23, 23, 44, 1, '2016-07-27 01:51:49', 1, 'D'),
(24, 24, 44, 1, '2016-07-27 01:52:26', 1, 'D'),
(25, 25, 3, 1, '2016-07-27 01:54:25', 1, 'D'),
(26, 26, 33, 1, '2016-07-27 02:15:26', 1, 'D'),
(27, 27, 333, 1, '2016-07-27 02:16:24', 1, 'D'),
(28, 28, 33, 1, '2016-07-27 02:16:50', 1, 'D'),
(29, 29, 3, 1, '2016-07-27 02:26:34', 1, 'D'),
(30, 30, 3, 1, '2016-07-27 02:26:54', 1, 'D'),
(31, 24, 3, 1, '2016-07-27 02:57:07', 1, 'D'),
(32, 24, 3, 1, '2016-07-27 02:57:26', 1, 'D'),
(33, 31, 3, 1, '2016-07-27 02:57:37', 1, 'D'),
(34, 31, 3, 1, '2016-07-27 02:57:41', 1, 'D'),
(35, 31, 3, 1, '2016-07-27 02:57:56', 1, 'D'),
(36, 31, 3, -1, '2016-07-27 02:58:03', 1, 'D'),
(37, 32, 3, 1, '2016-07-27 02:58:15', 1, 'D'),
(38, 31, 3, 1, '2016-07-27 03:03:26', 1, 'D'),
(39, 32, 3, 1, '2016-07-27 03:03:51', 1, 'D'),
(40, 33, 6, 1, '2016-07-27 03:14:38', 1, 'D'),
(41, 25, 6, 1, '2016-07-27 03:22:43', 1, 'D'),
(42, 34, 5, 1, '2016-07-27 03:23:04', 1, 'D'),
(43, 35, 5, 1, '2016-07-27 03:23:13', 1, 'D'),
(44, 36, 5, 1, '2016-07-27 03:23:19', 1, 'D'),
(45, 26, 2, 1, '2016-07-27 03:24:44', 1, 'D'),
(46, 37, 5, 1, '2016-07-27 03:32:39', 1, 'D'),
(47, 37, 6, 1, '2016-07-27 03:32:45', 1, 'D');

-- --------------------------------------------------------

--
-- Table structure for table `rescheduled_appointments`
--

CREATE TABLE IF NOT EXISTS `rescheduled_appointments` (
  `fk_appointment_id` int(11) NOT NULL,
  `fk_appointment_id_next` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `fk_created_by_id` int(11) NOT NULL,
  `fk_created_by_type` varchar(5) NOT NULL,
  `remarks` varchar(2000) DEFAULT NULL,
  UNIQUE KEY `fk_appointment_id_UNIQUE` (`fk_appointment_id`),
  UNIQUE KEY `fk_appointment_id_next_UNIQUE` (`fk_appointment_id_next`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rescheduled_appointments`
--

INSERT INTO `rescheduled_appointments` (`fk_appointment_id`, `fk_appointment_id_next`, `created_date`, `fk_created_by_id`, `fk_created_by_type`, `remarks`) VALUES
(111, 112, '2016-07-23 15:52:48', 1, 'D', 'Rescheduled due to misscommunication'),
(116, 117, '2016-07-25 19:09:04', 1, 'D', 'she wants to return tomorrow'),
(117, 118, '2016-07-25 19:21:45', 1, 'D', 'back to where I belong'),
(118, 119, '2016-07-25 21:11:49', 1, 'D', 'on 26 th'),
(119, 120, '2016-07-25 21:12:38', 1, 'D', 'on 27th'),
(120, 121, '2016-07-25 21:13:16', 1, 'D', 'on 26th');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=85 ;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `fk_doctor_id`, `start_date`, `end_date`, `created_date`, `created_by`, `created_by_type`, `is_active`) VALUES
(74, 1, '2016-06-29', '2016-07-14', '2016-06-29 00:00:00', 1, 'D', 1),
(75, 1, '2016-07-15', '2016-07-30', '2016-07-15 00:00:00', 1, 'D', 1),
(79, 43, '2016-07-18', '2016-07-20', '2016-07-18 17:05:50', 43, 'D', 1),
(80, 47, '2016-07-18', '2016-07-31', '2016-07-18 23:28:33', 47, 'D', 1),
(81, 1, '2016-07-23', '2016-07-24', '2016-07-23 13:04:41', 1, 'D', 1),
(82, 1, '2016-08-01', '2016-08-15', '2016-07-26 21:28:16', 1, 'D', 1),
(83, 1, '2016-08-01', '2016-08-15', '2016-07-27 03:05:50', 1, 'D', 1),
(84, 1, '2016-07-28', '2016-08-01', '2016-07-28 02:24:05', 1, 'D', 1);

-- --------------------------------------------------------

--
-- Table structure for table `schedule_day`
--

CREATE TABLE IF NOT EXISTS `schedule_day` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_doctor_id` int(11) NOT NULL,
  `fk_schedule_id` int(11) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `start_time_mins` int(11) NOT NULL,
  `end_time_mins` int(11) NOT NULL,
  `is_active` int(11) DEFAULT NULL,
  `modified_by_id` int(11) DEFAULT NULL,
  `modified_by_type` varchar(5) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=229509 ;

--
-- Dumping data for table `schedule_day`
--

INSERT INTO `schedule_day` (`id`, `fk_doctor_id`, `fk_schedule_id`, `location_id`, `date`, `start_time_mins`, `end_time_mins`, `is_active`, `modified_by_id`, `modified_by_type`, `modified_date`) VALUES
(229438, 1, 74, 18, '2016-06-29', 540, 720, 1, NULL, NULL, NULL),
(229439, 1, 74, 18, '2016-06-30', 540, 720, 1, NULL, NULL, NULL),
(229440, 1, 74, 18, '2016-07-01', 540, 720, 1, NULL, NULL, NULL),
(229441, 1, 74, 18, '2016-07-04', 540, 720, 1, NULL, NULL, NULL),
(229442, 1, 74, 18, '2016-07-05', 540, 720, 1, NULL, NULL, NULL),
(229443, 1, 74, 18, '2016-07-06', 540, 720, 1, NULL, NULL, NULL),
(229444, 1, 74, 18, '2016-07-07', 540, 720, 1, NULL, NULL, NULL),
(229445, 1, 74, 18, '2016-07-08', 540, 720, 1, NULL, NULL, NULL),
(229446, 1, 74, 18, '2016-07-11', 540, 720, 1, NULL, NULL, NULL),
(229447, 1, 74, 18, '2016-07-12', 540, 720, 1, NULL, NULL, NULL),
(229448, 1, 74, 18, '2016-07-13', 540, 720, 1, NULL, NULL, NULL),
(229449, 1, 74, 18, '2016-07-14', 540, 720, 1, NULL, NULL, NULL),
(229450, 1, 75, 18, '2016-07-15', 540, 720, 1, NULL, NULL, NULL),
(229451, 1, 75, 18, '2016-07-18', 540, 720, 1, NULL, NULL, NULL),
(229452, 1, 75, 18, '2016-07-19', 540, 720, 1, NULL, NULL, NULL),
(229453, 1, 75, 18, '2016-07-20', 540, 720, 1, NULL, NULL, NULL),
(229454, 1, 75, 18, '2016-07-21', 540, 720, 1, NULL, NULL, NULL),
(229455, 1, 75, 18, '2016-07-22', 540, 720, 1, NULL, NULL, NULL),
(229456, 1, 75, 18, '2016-07-25', 540, 720, 1, NULL, NULL, NULL),
(229457, 1, 75, 18, '2016-07-26', 540, 720, 1, NULL, NULL, NULL),
(229458, 1, 75, 18, '2016-07-27', 540, 720, 0, 1, 'D', '2016-07-26 03:11:12'),
(229459, 1, 75, 18, '2016-07-28', 540, 720, 0, 1, 'D', '2016-07-26 03:11:12'),
(229460, 1, 75, 18, '2016-07-29', 540, 720, 1, 1, 'D', '2016-07-26 03:03:49'),
(229470, 43, 79, 21, '2016-07-18', 540, 720, 1, NULL, NULL, NULL),
(229471, 43, 79, 21, '2016-07-19', 540, 720, 1, NULL, NULL, NULL),
(229472, 43, 79, 21, '2016-07-20', 540, 720, 1, NULL, NULL, NULL),
(229473, 47, 80, 23, '2016-07-18', 540, 720, 1, NULL, NULL, NULL),
(229474, 47, 80, 23, '2016-07-19', 540, 720, 1, NULL, NULL, NULL),
(229475, 47, 80, 23, '2016-07-20', 540, 720, 1, NULL, NULL, NULL),
(229476, 47, 80, 23, '2016-07-21', 540, 720, 1, NULL, NULL, NULL),
(229477, 47, 80, 23, '2016-07-22', 540, 720, 1, NULL, NULL, NULL),
(229478, 47, 80, 23, '2016-07-23', 540, 720, 1, NULL, NULL, NULL),
(229479, 47, 80, 23, '2016-07-24', 540, 720, 1, NULL, NULL, NULL),
(229480, 47, 80, 23, '2016-07-25', 540, 720, 1, NULL, NULL, NULL),
(229481, 47, 80, 23, '2016-07-26', 540, 720, 1, NULL, NULL, NULL),
(229482, 47, 80, 23, '2016-07-27', 540, 720, 1, NULL, NULL, NULL),
(229483, 47, 80, 23, '2016-07-28', 540, 720, 1, NULL, NULL, NULL),
(229484, 47, 80, 23, '2016-07-29', 540, 720, 1, NULL, NULL, NULL),
(229485, 47, 80, 23, '2016-07-30', 540, 720, 1, NULL, NULL, NULL),
(229486, 47, 80, 23, '2016-07-31', 540, 720, 1, NULL, NULL, NULL),
(229487, 1, 81, 18, '2016-07-23', 540, 720, 1, NULL, NULL, NULL),
(229488, 1, 81, 18, '2016-07-24', 540, 720, 1, NULL, NULL, NULL),
(229489, 1, 83, 18, '2016-08-01', 540, 720, 1, NULL, NULL, NULL),
(229490, 1, 83, 18, '2016-08-02', 540, 720, 1, NULL, NULL, NULL),
(229491, 1, 83, 18, '2016-08-03', 540, 720, 1, NULL, NULL, NULL),
(229492, 1, 83, 18, '2016-08-04', 540, 720, 1, NULL, NULL, NULL),
(229493, 1, 83, 18, '2016-08-05', 540, 720, 1, NULL, NULL, NULL),
(229494, 1, 83, 18, '2016-08-06', 540, 720, 1, NULL, NULL, NULL),
(229495, 1, 83, 18, '2016-08-07', 540, 720, 1, NULL, NULL, NULL),
(229496, 1, 83, 18, '2016-08-08', 540, 720, 1, NULL, NULL, NULL),
(229497, 1, 83, 18, '2016-08-09', 540, 720, 1, NULL, NULL, NULL),
(229498, 1, 83, 18, '2016-08-10', 540, 720, 1, NULL, NULL, NULL),
(229499, 1, 83, 18, '2016-08-11', 540, 720, 1, NULL, NULL, NULL),
(229500, 1, 83, 18, '2016-08-12', 540, 720, 1, NULL, NULL, NULL),
(229501, 1, 83, 18, '2016-08-13', 540, 720, 1, NULL, NULL, NULL),
(229502, 1, 83, 18, '2016-08-14', 540, 720, 1, NULL, NULL, NULL),
(229503, 1, 83, 18, '2016-08-15', 540, 720, 1, NULL, NULL, NULL),
(229504, 1, 84, 20, '2016-07-28', 540, 720, 1, NULL, NULL, NULL),
(229505, 1, 84, 20, '2016-07-29', 540, 720, 1, NULL, NULL, NULL),
(229506, 1, 84, 20, '2016-07-30', 540, 720, 1, NULL, NULL, NULL),
(229507, 1, 84, 20, '2016-07-31', 540, 720, 1, NULL, NULL, NULL),
(229508, 1, 84, 20, '2016-08-01', 540, 720, 1, NULL, NULL, NULL);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `first_name`, `last_name`, `contact1`, `contact2`, `email`, `address`, `fk_location_id`, `fk_doctor_id`, `fk_user_id`, `fk_created_by_id`, `created_by_type`, `created_date`, `fk_modified_by_id`, `modified_by_type`, `modified_date`, `is_active`) VALUES
(2, 'magnus', 'staff', '423412', '3234', 'staff@gmail.com', '34124', 18, 1, 60, 1, 'D', '2016-06-27 20:18:24', 1, 0, '2016-07-11 17:39:04', 1),
(3, 'New Staff', 'Last', '70423423', '', 'gmail@email.com', 'Some Address', 18, 1, 90, 1, 'D', '2016-07-28 01:13:58', 1, 0, '2016-07-28 01:17:26', 1),
(4, 'staffer', 'again', '234234', '', 'asdf@asd.com', 'sadfsd', 18, 1, 91, 1, 'D', '2016-07-28 01:30:15', 1, 0, '2016-07-28 01:30:54', 1);

-- --------------------------------------------------------

--
-- Table structure for table `work_locations`
--

CREATE TABLE IF NOT EXISTS `work_locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_doctor_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `is_active` int(11) DEFAULT '1',
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `work_locations`
--

INSERT INTO `work_locations` (`id`, `fk_doctor_id`, `name`, `description`, `is_active`, `created_date`, `modified_date`) VALUES
(18, 1, 'Margaon', '', 1, NULL, NULL),
(19, 1, 'Panjim', '', 1, NULL, NULL),
(20, 1, 'Vasco', '', 1, NULL, '2016-07-28 02:23:38'),
(21, 43, 'Cali', '', 1, NULL, NULL),
(22, 43, 'Tex', '', 1, NULL, NULL),
(23, 47, 'Vermont', '', 1, NULL, NULL),
(24, 47, 'Mich', '', 1, NULL, NULL),
(25, 1, 'new', '', 0, '2016-07-28 02:23:26', '2016-07-28 02:23:34');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
