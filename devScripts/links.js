var links = {



  //login js urls
   authenticateUrl : "index.php/authenticate/authenitcateUser",
   successRedirectUrl : "index.php/doctorDashboard/",
   registerDoctorUrl : "index.php/doctor/doctorInfo",
   adminUrl:"index.php/adminDashboard/admin",

   //password reset
   passwordRestRequestUrl: "index.php/authenticate/resetPasswordRequest",
   loginUrl: "index.php/authenticate/login",
   passwordResetUrl: "index.php/authenticate/passwordReset",
   forgotPasswordUrl: "index.php/authenticate/forgotPassword",

   //admin related
   doctorListingUrl: "index.php/adminDashboard/doctorListing",
   getAllDoctorsUrl: "index.php/adminDashboard/getAllDoctors",
   adminDoctorEditRedirect:"index.php/adminDashboard/adminDoctorEdit",

   logoutUrl : "index.php/authenticate/logout",

   //doctor dashboard links
   doctorProfile: "index.php/doctorDashboard/doctorProfile",
   dashboardHomeUrl : "index.php/doctorDashboard/",
   newAppointmentUrl : "index.php/doctorDashboard/bookAppointment",
   patientsEntryUrl : "index.php/doctorDashboard/patientsEntry",
   patientsListingUrl : "index.php/doctorDashboard/patientsListing",
   closeAppointmentUrl : "index.php/doctorDashboard/closeAppointment",
   doctorsAppointmentsListUrl : "index.php/doctorDashboard/listAppointment",
   newScheduleUrl : "index.php/doctorDashboard/newSchedule",
   deactivateScheduleUrl: "index.php/doctorDashboard/deactivateSchedule",
   listScheduleUrl : "index.php/doctorDashboard/scheduleList",
   getScheduleCalendarUrl: "index.php/doctorDashboard/ScheduleCalenderView",
   addStaffUrl : "index.php/doctorDashboard/staffEntry",
   doctorsStaffListingUr : "index.php/doctorDashboard/staffListing",
   patientsHistoryUrl : "index.php/doctorDashboard/patientHistory",
   createProgramForPatientUrl : "index.php/doctorDashboard/createMedicalProgram",
   programmeListingsUrl : "index.php/doctorDashboard/programmeList",
   ManageLocationsUrl : "index.php/doctorDashboard/workLocationManagement",
   getAnalyticsUrl : "index.php/doctorDashboard/AnalyticsReport",
   getCalenderUrl : "index.php/doctorDashboard/calendarTemplate",
   accountingUrl : "index.php/doctorDashboard/accounting",
   medicineSearchUrl : "index.php/doctorDashboard/medicineSearch",

   //schedule
   getLocationUrl: "index.php/locations/getDoctorLocations",
   createUpdateScheduleUrl: "index.php/schedule/createUpdateSchedule",
   getSechduleCalendarDetailsUrl: "index.php/schedule/getCalanderDetails",
   getSechduleforDeactivation: "index.php/schedule/getSchedulesForDeactivation",
   deactivateScheduleDays: "index.php/schedule/deactivateScheduleDays",

   //programme
   doctorsProgramsUrl:"index.php/programme/getDoctorsCheckupPrograms",
   programmeEditUrl:"index.php/doctorDashboard/createMedicalProgram",
   createModifyProgrammeUrl:"index.php/programme/createModifyProgramme",
   getProgrammeUrl:"index.php/programme/getProgrammes",


   //patient
   patientDetailPersistUrl:"index.php/patient/addUpdatePatient",
   patientsDetailsUrl:"index.php/patient/getPatientDetails",
   loginCheckUrl:"index.php/authenticate/isLoggedIn",
   getProgrammeList:"index.php/programme/getMedicationProgrammeList",
   programmeListDetailsUrl:"index.php/programme/getProgrammeListDetails",
   //patientsProgrammesUrl:"index.php/programme/getPatientProgrammes",
   patientListingUrl:"index.php/patient/getPatientList",
   getPatientsForAutoFillUrl:"index.php/patient/getPatientListForAutoFill",
   getPatientHistoryUrl:'index.php/patient/getPatientHistory',
   getpatientsImageUrl:'index.php/patient/getPatientImage',

   //Prescription
   getPrescriptionDetail:'index.php/patient/getPrescriptionDetail',


   bookAppointmentUrl: "index.php/appointment/bookAppointment",
   getAppointmentForTheDayUrl: "index.php/appointment/getAppointmentsForTheDay",
   getAllAppointmentsUrl: "index.php/appointment/getAllAppointments",
   cancelAppointmentUrl: "index.php/appointment/cancelAppointment",
   closeAppointmentUrl: "index.php/appointment/closeAppointment",
   rescheduleAppointmentUrl: "index.php/appointment/rescheduleAppointment",

   saveUpdateLocations:"index.php/locations/addUpdateLocation",
   locationListUrl:"index.php/locations/getDoctorLocations",
   deactivateLocationUrl:"index.php/locations/deactivateLocation",
   deliveryMethodsUrl:"index.php/patient/getDeliveryMethods",


   //registartion
   doctorUrl:"index.php/doctor/saveUpdateDoctor",
   doctorDetailsUrl:"index.php/doctor/getDoctorDetails",
   loginCheckUrl:"index.php/authenticate/isLoggedIn",
   doctorDashUrl:"index.php/doctorDashboard/",
   logoutUrl:"index.php/authenticate/logout",

   createModifyStaffUrl:"index.php/staff/createModifyStaff",
   getStaffDetailsUrl: "index.php/staff/getStaffDetails",
   staffListingUrl: "index.php/staff/getDoctorsStaffList",


    //upload
    closeApptUploadFiles:"index.php/Upload/CloseApptUpload",
    PatientUploadimage:"index.php/Upload/PatientImageUpload",
    GaurdianUploadimage:"index.php/Upload/GuardianImageUpload"


}
