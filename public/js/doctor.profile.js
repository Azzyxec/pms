var utility={getURLParam:function(t){var e=window.location.href;t=t.replace(/[\[\]]/g,"\\$&");var o=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)"),r=o.exec(e);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null},getTimeMinutesArray:function(){}},links={authenticateUrl:"index.php/authenticate/authenitcateUser",successRedirectUrl:"index.php/doctorDashboard/",registerDoctorUrl:"index.php/doctor/doctorInfo",adminUrl:"index.php/adminDashboard/admin",doctorListingUrl:"index.php/adminDashboard/doctorListing",logoutUrl:"index.php/authenticate/logout",doctorProfile:"index.php/doctorDashboard/doctorProfile",dashboardHomeUrl:"index.php/doctorDashboard/",newAppointmentUrl:"index.php/doctorDashboard/bookAppointment",patientsEntryUrl:"index.php/doctorDashboard/patientsEntry",patientsListingUrl:"index.php/doctorDashboard/patientsListing",closeAppointmentUrl:"index.php/doctorDashboard/closeAppointment",doctorsAppointmentsListUrl:"index.php/doctorDashboard/listAppointment",newScheduleUrl:"index.php/doctorDashboard/newSchedule",listScheduleUrl:"index.php/doctorDashboard/scheduleList",getScheduleCalendarUrl:"index.php/doctorDashboard/ScheduleCalenderView",addStaffUrl:"index.php/doctorDashboard/staffEntry",doctorsStaffListingUr:"index.php/doctorDashboard/staffListing",patientsHistoryUrl:"index.php/doctorDashboard/patientHistory",createProgramForPatientUrl:"index.php/doctorDashboard/createMedicalProgram",programmeListingsUrl:"index.php/doctorDashboard/programmeList",ManageLocationsUrl:"index.php/doctorDashboard/workLocationManagement",getAnalyticsUrl:"index.php/doctorDashboard/AnalyticsReport",getCalenderUrl:"index.php/doctorDashboard/calendarTemplate",accountingUrl:"index.php/doctorDashboard/accounting",medicineSearchUrl:"index.php/doctorDashboard/medicineSearch",getLocationUrl:"index.php/locations/getDoctorLocations",createUpdateScheduleUrl:"index.php/schedule/createUpdateSchedule",programmeListUrl:"index.php/programme/getMedicationProgrammeList",programmeEditUrl:"index.php/doctorDashboard/createMedicalProgram",createModifyProgrammeUrl:"index.php/programme/createModifyProgramme",getProgrammeUrl:"index.php/programme/getProgrammes",patientDetailPersistUrl:"index.php/patient/addUpdatePatient",patientsDetailsUrl:"index.php/patient/getPatientDetails",loginCheckUrl:"index.php/authenticate/isLoggedIn",getProgrammeList:"index.php/programme/getMedicationProgrammeList",programmeListDetailsUrl:"index.php/programme/getProgrammeListDetails",patientsProgrammesUrl:"index.php/programme/getPatientProgrammes",patientListingUrl:"index.php/patient/getPatientList",saveUpdateLocations:"index.php/locations/addUpdateLocation",locationListUrl:"index.php/locations/getDoctorLocations",deliveryMethodsUrl:"index.php/patient/getDeliveryMethods",doctorUrl:"index.php/doctor/saveUpdateDoctor",doctorDetailsUrl:"index.php/doctor/getDoctorDetails",loginCheckUrl:"index.php/authenticate/isLoggedIn",doctorDashUrl:"index.php/doctorDashboard/",logoutUrl:"index.php/authenticate/logout",createModifyStaffUrl:"index.php/staff/createModifyStaff",getStaffDetailsUrl:"index.php/staff/getStaffDetails",staffListingUrl:"index.php/staff/getDoctorsStaffList"};$(document).ready(function(){$(function(){void 0;var t={init:function(){this.logoutUrl=links.logoutUrl,this.doctorProfile=links.doctorProfile,this.dashboardHomeUrl=links.dashboardHomeUrl,this.newAppointmentUrl=links.newAppointmentUrl,this.patientsEntryUrl=links.patientsEntryUrl,this.patientsListingUrl=links.patientsListingUrl,this.closeAppointmentUrl=links.closeAppointmentUrl,this.doctorsAppointmentsListUrl=links.doctorsAppointmentsListUrl,this.newScheduleUrl=links.newScheduleUrl,this.listScheduleUrl=this.listScheduleUrl,this.ScheduleCalendarUrl=links.getScheduleCalendarUrl,this.addStaffUrl=links.addStaffUrl,this.doctorsStaffListingUr=links.doctorsStaffListingUr,this.patientsHistoryUrl=links.patientsHistoryUrl,this.createProgramForPatientUrl=links.createProgramForPatientUrl,this.programmeListingsUrl=links.programmeListingsUrl,this.ManageLocationsUrl=links.ManageLocationsUrl,this.CalendarTemplateUrl=links.getCalenderUrl,this.analyticsReportUrl=links.getAnalyticsUrl,this.accountingUrl=links.accountingUrl,this.medicineSearchUrl=links.medicineSearchUrl,e.init()}},e={init:function(){$("#pms-brand-btn-link").click(function(t){t.preventDefault(),void 0}),$("#user-Profile-Btn-Link").attr("href",t.doctorProfile),$("#doctor-dash-logout-btn").attr("href",t.logoutUrl),$("#dashboard-Section-Btn").attr("href",t.dashboardHomeUrl),$("#appointment-section-link-btn").attr("href",t.doctorsAppointmentsListUrl),$("#manage-Doctors-Schedule-Section-Link-Btn").attr("href",t.ScheduleCalendarUrl),$("#btn-programme-section-link").attr("href",t.programmeListingsUrl),$("#create-program-for-patient-section").attr("href",t.createProgramForPatientUrl),$("#patients-Entry-Section-Link-Btn").attr("href",t.patientsListingUrl),$("#staff-managment-section-link-btn").attr("href",t.doctorsStaffListingUr),$("#btn-manage-locations").attr("href",t.ManageLocationsUrl),$("#analytics-side-navigation-link-btn").attr("href",t.analyticsReportUrl),$("#accounting-side-navigation-link-btn").attr("href",t.accountingUrl),$("#medicine-side-navigation-link-btn").attr("href",t.medicineSearchUrl),$("#other-settings-section-link-btn").click(function(t){t.preventDefault()}),$("#calendar-template-section-link-btn").click(function(t){t.preventDefault()})},render:function(){}};t.init()}())}),$(document).ready(function(){void 0;var t={id:0,name:"",contact:"",alternateContact:"",email:"",qualifications:"",address:"",recoveryContact:"",recoveryEmail:"",userName:"",password:"",isActive:0},e={init:function(){this.doctorUrl=links.doctorUrl,this.doctorDetailsUrl=links.doctorDetailsUrl,this.loginCheckUrl=links.loginCheckUrl,this.doctorDashUrl=links.doctorDashUrl,this.logoutUrl=links.logoutUrl,o.init(),this.getDoctorInfo()},getModel:function(){return t},getDoctorInfo:function(){$.post(e.loginCheckUrl,{}).done(function(t){void 0,"D"==t.data.type&&e.updateModelFromServer(t.data.id)})},updateModelFromServer:function(r){$.get(e.doctorDetailsUrl,{id:r}).done(function(e){void 0;var r=e.data;t.id=r.id,t.name=r.name,t.contact=r.contact,t.alternateContact=r.alternateContact,t.email=r.email,t.qualifications=r.qualifications,t.address=r.address,t.userName=r.userName,t.password=r.password,t.recoveryContact=r.recoveryContact,t.recoveryEmail=r.recoveryEmail,t.isActive=r.isActive,o.render()})},updateModelFromView:function(){return t.id=o.idControl.val(),t.name=o.nameControl.val(),t.contact=o.contactControl.val(),t.alternateContact=o.alternatContactControl.val(),t.email=o.emailControl.val(),t.qualifications=o.qualificationControl.val(),t.address=o.addressControl.val(),t.userName=o.userNameControl.val(),t.password=o.passwordControl.val(),t.recoveryContact=o.recoveryContactControl.val(),t.recoveryEmail=o.recoveryEmailControl.val(),o.activeControl.is(":checked")?t.isActive=1:t.isActive=0,t},saveDoctorAndRedirect:function(){$.post(e.doctorUrl,t).done(function(t){void 0,"-1"==t.data.status?void 0:"D"==t.data.user.type&&(void 0,window.location.href=e.logoutUrl)})}},o={init:function(){void 0,this.idControl=$("#did"),this.nameControl=$("#dname"),this.contactControl=$("#dcontact"),this.alternatContactControl=$("#dalternate-contact"),this.emailControl=$("#demail"),this.qualificationControl=$("#dqualifications"),this.addressControl=$("#daddress"),this.userNameControl=$("#duser-name"),this.passwordControl=$("#dpassword"),this.recoveryContactControl=$("#drecovery-contact"),this.recoveryEmailControl=$("#drecovery-email"),this.activeControl=$("#dactive"),this.inactiveControl=$("#dinactive"),$("#btn-doc-reg-sumit").on("click",function(e){return function(){void 0,e.updateModelFromView(),void 0,e.saveDoctorAndRedirect()}}(e)),this.render()},getControls:function(){return this.controls},render:function(){var t=e.getModel();this.idControl.val(t.id),this.nameControl.val(t.name),this.contactControl.val(t.contact),this.alternatContactControl.val(t.alternateContact),this.emailControl.val(t.email),this.qualificationControl.val(t.qualifications),this.addressControl.val(t.address),this.userNameControl.val(t.userName),this.passwordControl.val(t.password),this.recoveryContactControl.val(t.recoveryContact),this.recoveryEmailControl.val(t.recoveryEmail),1==t.isActive?(this.activeControl.prop("checked",!0),this.inactiveControl.prop("checked",!1)):(this.activeControl.prop("checked",!1),this.inactiveControl.prop("checked",!0))}};e.init()});