var utility={getURLParam:function(t){var e=window.location.href;t=t.replace(/[\[\]]/g,"\\$&");var i=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)"),o=i.exec(e);return o?o[2]?decodeURIComponent(o[2].replace(/\+/g," ")):"":null},getTimeMinutesArray:function(){}},links={authenticateUrl:"index.php/authenticate/authenitcateUser",successRedirectUrl:"index.php/doctorDashboard/",registerDoctorUrl:"index.php/doctor/doctorInfo",adminUrl:"index.php/adminDashboard/admin",doctorListingUrl:"index.php/adminDashboard/doctorListing",logoutUrl:"index.php/authenticate/logout",doctorProfile:"index.php/doctorDashboard/doctorProfile",dashboardHomeUrl:"index.php/doctorDashboard/",newAppointmentUrl:"index.php/doctorDashboard/bookAppointment",patientsEntryUrl:"index.php/doctorDashboard/patientsEntry",patientsListingUrl:"index.php/doctorDashboard/patientsListing",closeAppointmentUrl:"index.php/doctorDashboard/closeAppointment",doctorsAppointmentsListUrl:"index.php/doctorDashboard/listAppointment",newScheduleUrl:"index.php/doctorDashboard/newSchedule",listScheduleUrl:"index.php/doctorDashboard/scheduleList",getScheduleCalendarUrl:"index.php/doctorDashboard/ScheduleCalenderView",addStaffUrl:"index.php/doctorDashboard/staffEntry",doctorsStaffListingUr:"index.php/doctorDashboard/staffListing",patientsHistoryUrl:"index.php/doctorDashboard/patientHistory",createProgramForPatientUrl:"index.php/doctorDashboard/createMedicalProgram",programmeListingsUrl:"index.php/doctorDashboard/programmeList",ManageLocationsUrl:"index.php/doctorDashboard/workLocationManagement",getAnalyticsUrl:"index.php/doctorDashboard/AnalyticsReport",getCalenderUrl:"index.php/doctorDashboard/calendarTemplate",accountingUrl:"index.php/doctorDashboard/accounting",medicineSearchUrl:"index.php/doctorDashboard/medicineSearch",getLocationUrl:"index.php/locations/getDoctorLocations",createUpdateScheduleUrl:"index.php/schedule/createUpdateSchedule",programmeListUrl:"index.php/programme/getMedicationProgrammeList",programmeEditUrl:"index.php/doctorDashboard/createMedicalProgram",createModifyProgrammeUrl:"index.php/programme/createModifyProgramme",getProgrammeUrl:"index.php/programme/getProgrammes",patientDetailPersistUrl:"index.php/patient/addUpdatePatient",patientsDetailsUrl:"index.php/patient/getPatientDetails",loginCheckUrl:"index.php/authenticate/isLoggedIn",getProgrammeList:"index.php/programme/getMedicationProgrammeList",programmeListDetailsUrl:"index.php/programme/getProgrammeListDetails",patientsProgrammesUrl:"index.php/programme/getPatientProgrammes",patientListingUrl:"index.php/patient/getPatientList",saveUpdateLocations:"index.php/locations/addUpdateLocation",locationListUrl:"index.php/locations/getDoctorLocations",deliveryMethodsUrl:"index.php/patient/getDeliveryMethods",doctorUrl:"index.php/doctor/saveUpdateDoctor",doctorDetailsUrl:"index.php/doctor/getDoctorDetails",loginCheckUrl:"index.php/authenticate/isLoggedIn",doctorDashUrl:"index.php/doctorDashboard/",logoutUrl:"index.php/authenticate/logout",createModifyStaffUrl:"index.php/staff/createModifyStaff",getStaffDetailsUrl:"index.php/staff/getStaffDetails",staffListingUrl:"index.php/staff/getDoctorsStaffList"};$(document).ready(function(){$(function(){void 0;var t={init:function(){this.logoutUrl=links.logoutUrl,this.doctorProfile=links.doctorProfile,this.dashboardHomeUrl=links.dashboardHomeUrl,this.newAppointmentUrl=links.newAppointmentUrl,this.patientsEntryUrl=links.patientsEntryUrl,this.patientsListingUrl=links.patientsListingUrl,this.closeAppointmentUrl=links.closeAppointmentUrl,this.doctorsAppointmentsListUrl=links.doctorsAppointmentsListUrl,this.newScheduleUrl=links.newScheduleUrl,this.listScheduleUrl=this.listScheduleUrl,this.ScheduleCalendarUrl=links.getScheduleCalendarUrl,this.addStaffUrl=links.addStaffUrl,this.doctorsStaffListingUr=links.doctorsStaffListingUr,this.patientsHistoryUrl=links.patientsHistoryUrl,this.createProgramForPatientUrl=links.createProgramForPatientUrl,this.programmeListingsUrl=links.programmeListingsUrl,this.ManageLocationsUrl=links.ManageLocationsUrl,this.CalendarTemplateUrl=links.getCalenderUrl,this.analyticsReportUrl=links.getAnalyticsUrl,this.accountingUrl=links.accountingUrl,this.medicineSearchUrl=links.medicineSearchUrl,e.init()}},e={init:function(){$("#pms-brand-btn-link").click(function(t){t.preventDefault(),void 0}),$("#user-Profile-Btn-Link").attr("href",t.doctorProfile),$("#doctor-dash-logout-btn").attr("href",t.logoutUrl),$("#dashboard-Section-Btn").attr("href",t.dashboardHomeUrl),$("#appointment-section-link-btn").attr("href",t.doctorsAppointmentsListUrl),$("#manage-Doctors-Schedule-Section-Link-Btn").attr("href",t.ScheduleCalendarUrl),$("#btn-programme-section-link").attr("href",t.programmeListingsUrl),$("#create-program-for-patient-section").attr("href",t.createProgramForPatientUrl),$("#patients-Entry-Section-Link-Btn").attr("href",t.patientsListingUrl),$("#staff-managment-section-link-btn").attr("href",t.doctorsStaffListingUr),$("#btn-manage-locations").attr("href",t.ManageLocationsUrl),$("#analytics-side-navigation-link-btn").attr("href",t.analyticsReportUrl),$("#accounting-side-navigation-link-btn").attr("href",t.accountingUrl),$("#medicine-side-navigation-link-btn").attr("href",t.medicineSearchUrl),$("#other-settings-section-link-btn").click(function(t){t.preventDefault()}),$("#calendar-template-section-link-btn").click(function(t){t.preventDefault()})},render:function(){}};t.init()}())}),$(document).ready(function(){$(function(){void 0;var t={loc:{id:0,name:""},list:[]},e={init:function(){this.saveUpdateLocations=links.saveUpdateLocations,this.locationListUrl=links.locationListUrl,i.init(),o.init(),this.updateLocationFromServer()},persistLocationModel:function(){void 0,$.post(e.saveUpdateLocations,t.loc).done(function(t){void 0,e.updateLocationFromServer()})},getLocationList:function(){return t.list},getLocationModel:function(){return t.loc},updateLocationFromServer:function(){$.get(e.locationListUrl,{}).done(function(e){void 0,t.list=e.data,o.render()})},updateModel:function(e,o){t.loc.id=e,t.loc.name=o,i.render()}},i={init:function(){this.locationName=$("#txt-location-name"),$("#btn-add-location").click(function(){void 0;var o=i.locationName.val(),n=e.getLocationModel();n.name=o,void 0,i.locationName.val(""),e.persistLocationModel()})},render:function(){var t=e.getLocationModel();this.locationName.val(t.name)}},o={init:function(){this.tableBody=$("#location-list-table-body")},render:function(){var t=e.getLocationList();this.tableBody.empty(),void 0;for(var i=0;i<t.length;i++){var o=$("<tr/>"),n=$("<td/>");n.text(t[i].name),o.append(n);var n=$("<a/>",{text:"Edit"});n.click(function(t){return function(){void 0,e.updateModel(t.id,t.name)}}(t[i])),o.append(n),this.tableBody.append(o)}}};e.init()}())});