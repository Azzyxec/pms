var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var cssNano = require('gulp-cssnano');

var watchify = require('watchify');
//var browserSync = require('browser-sync').create();

var objConfig = {
  scriptsBasePath: "./devScripts/",
  scriptDestinationFolder: "./public/js",
  watchPath: ['./devScripts/*.js', './devScripts/**/*.js'],
  cssPath: './css/',
  cssDest: './public/css',
  cssBuildName: 'bundle.css'
};

var filesList = [
  {build:true, files: [
                        objConfig.scriptsBasePath +"links.js",
                        objConfig.scriptsBasePath +"utility.js",
                        objConfig.scriptsBasePath +"login.js"
                      ], buildName: "login.all.js"},
  {build:true, files: [
                        objConfig.scriptsBasePath +"links.js",
                        objConfig.scriptsBasePath +"utility.js",
                        objConfig.scriptsBasePath +"vendor/bootstrap.min.js",
                        objConfig.scriptsBasePath +"bootstrapValidator.min.js",
                        objConfig.scriptsBasePath +"validator.js",
                        objConfig.scriptsBasePath + "doctor/registration.js"
                      ], buildName: "doctor.registration.js"},
  {build:true, files: [
                       objConfig.scriptsBasePath +"utility.js",
                       objConfig.scriptsBasePath +"links.js",
                       objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                       objConfig.scriptsBasePath +"bootstrapValidator.min.js",
                       objConfig.scriptsBasePath +"vendor/bootstrap3-typeahead.min.js",

                        objConfig.scriptsBasePath +"vendor/jquery.ui.widget.js",
                        objConfig.scriptsBasePath +"vendor/jquery.iframe-transport.js",
                        objConfig.scriptsBasePath +"vendor/jquery.fileupload.js",

                       objConfig.scriptsBasePath +"vendor/loadash.js",
                       objConfig.scriptsBasePath +"vendor/moment.js",
                        objConfig.scriptsBasePath +"bootstrap-datetimepicker.min.js",
                       objConfig.scriptsBasePath +"doctor/dash.home.js",
                       objConfig.scriptsBasePath +"appointment/new.appointment.func.js",
                       objConfig.scriptsBasePath +"appointment/cancel.appointment.func.js",
                       objConfig.scriptsBasePath +"appointment/close.appointment.func.js",
                       objConfig.scriptsBasePath +"appointment/reschedule.appointment.func.js",
                       objConfig.scriptsBasePath +"appointment/close.appointment.js"
                       ], buildName: "dash.home.js"},
 {build:true, files: [
                      objConfig.scriptsBasePath +"utility.js",
                      objConfig.scriptsBasePath +"links.js",
                      objConfig.scriptsBasePath +"validator.js",
                      objConfig.scriptsBasePath +"bootstrapValidator.min.js",
                      objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                      objConfig.scriptsBasePath +"doctor/profile.edit.js"
                    ], buildName: "doctor.profile.js"},
  {build:true, files: [
                      objConfig.scriptsBasePath +"utility.js",
                      objConfig.scriptsBasePath +"links.js",
                      objConfig.scriptsBasePath +"moment.js",
                      objConfig.scriptsBasePath +"bootstrapValidator.min.js",
                      objConfig.scriptsBasePath +"vendor/typeahead.bundle.min.js",
                      objConfig.scriptsBasePath +"vendor/bootstrap3-typeahead.min.js",
                      objConfig.scriptsBasePath +"bootstrap-datetimepicker.min.js",
                      objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                      objConfig.scriptsBasePath +"appointment/new.appointment.func.js",
                      objConfig.scriptsBasePath +"appointment/new.appointment.js"
                     ], buildName: "new.appointment.js"},
  {build:true, files: [
                     objConfig.scriptsBasePath +"utility.js",
                     objConfig.scriptsBasePath +"links.js",
                     objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                     objConfig.scriptsBasePath +"appointment/close.appointment.js"
                   ], buildName: "close.appointment.js"},

    {build:true, files: [
                     objConfig.scriptsBasePath +"utility.js",
                     objConfig.scriptsBasePath +"links.js",
                     objConfig.scriptsBasePath +"moment.js",
                     objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                     objConfig.scriptsBasePath +"schedule/manageClinicSchedule.js"
                   ], buildName: "schedule.manageClinicSchedule.js"},

 {build:true, files: [
                    objConfig.scriptsBasePath +"utility.js",
                    objConfig.scriptsBasePath +"links.js",
                    objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                    objConfig.scriptsBasePath +"vendor/jquery.dataTables.min.js",
                    objConfig.scriptsBasePath +"vendor/dataTables.bootstrap.js",
                    objConfig.scriptsBasePath +"appointment/list.appointment.js"
                  ], buildName: "list.appointment.js"},
 {build:true, files: [
                    objConfig.scriptsBasePath +"moment.js",
                    objConfig.scriptsBasePath +"bootstrap-datetimepicker.min.js",
                    objConfig.scriptsBasePath +"utility.js",
                    objConfig.scriptsBasePath +"links.js",
                    objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                    objConfig.scriptsBasePath +"schedule/new.schedule.js"
                  ], buildName: "new.schedule.js"},
{build:true, files: [
                   objConfig.scriptsBasePath +"moment.js",
                   objConfig.scriptsBasePath +"bootstrap-datetimepicker.min.js",
                   objConfig.scriptsBasePath +"utility.js",
                   objConfig.scriptsBasePath +"links.js",
                   objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                   objConfig.scriptsBasePath +"schedule/deactivate.schedule.js"
                 ], buildName: "deactivate.schedule.js"},
{build:true, files: [
                   objConfig.scriptsBasePath +"utility.js",
                   objConfig.scriptsBasePath +"links.js",
                   objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                   objConfig.scriptsBasePath +"schedule/list.schedule.js"
                 ], buildName: "list.schedule.js"},
{build:true, files: [
                  objConfig.scriptsBasePath +"utility.js",
                  objConfig.scriptsBasePath +"links.js",
                  objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                  objConfig.scriptsBasePath +"vendor/jquery.dataTables.min.js",
                  objConfig.scriptsBasePath +"vendor/dataTables.bootstrap.js",
                  objConfig.scriptsBasePath +"patient/list.patient.js"
                ], buildName: "list.patient.js"},
{build:true, files: [
                  objConfig.scriptsBasePath +"validator.js",
                  objConfig.scriptsBasePath +"utility.js",
                  objConfig.scriptsBasePath +"links.js",
                  objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                  objConfig.scriptsBasePath +"bootstrapValidator.min.js",
                  objConfig.scriptsBasePath +"staff/add.staff.js"
                ], buildName: "add.staff.js"},
{build:true, files: [
                  objConfig.scriptsBasePath +"links.js",
                  objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                  objConfig.scriptsBasePath +"staff/list.staff.js"
                ], buildName: "list.staff.js"},
{build:true, files: [
                    objConfig.scriptsBasePath +"links.js",
                    objConfig.scriptsBasePath +"moment.js",
                    objConfig.scriptsBasePath +"utility.js",
                    objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                    objConfig.scriptsBasePath +"vendor/jquery.dataTables.min.js",
                    objConfig.scriptsBasePath +"vendor/dataTables.bootstrap.js",
                    objConfig.scriptsBasePath +"patient/patient.history.js"
                ], buildName: "patient.history.js"},
                {build:true, files: [
                                  objConfig.scriptsBasePath +"moment.js",
                                  objConfig.scriptsBasePath +"bootstrap-datetimepicker.min.js",
                                  objConfig.scriptsBasePath +"utility.js",
                                  objConfig.scriptsBasePath +"links.js",
                                  objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                                  objConfig.scriptsBasePath +"vendor/jquery.ui.widget.js",
                                  objConfig.scriptsBasePath +"vendor/jquery.iframe-transport.js",
                                  objConfig.scriptsBasePath +"vendor/jquery.fileupload.js",
                                  objConfig.scriptsBasePath +"bootstrapValidator.min.js",
                                  objConfig.scriptsBasePath +"patient/patient.entry.js",
                                objConfig.scriptsBasePath +"vendor/jquery.dataTables.min.js",
                                objConfig.scriptsBasePath +"vendor/dataTables.bootstrap.js",
                                  objConfig.scriptsBasePath +"patient/patient.history.js"
                                ], buildName: "patient.entry.js"},
{build:true, files: [
                  objConfig.scriptsBasePath +"links.js",
                  objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                  objConfig.scriptsBasePath +"programme/programme.listing.js"
                ], buildName: "programme.listing.js"},
{build:true, files: [
                  objConfig.scriptsBasePath +"utility.js",
                  objConfig.scriptsBasePath +"links.js",
                  objConfig.scriptsBasePath +"validator.js",
                  objConfig.scriptsBasePath + "doctor/doctorDashboard.js",
                  objConfig.scriptsBasePath + "programme/medical.programme.js"
                ], buildName: "medical.programme.js"},
{build:true, files: [
                  objConfig.scriptsBasePath +"links.js",
                  objConfig.scriptsBasePath + "admin/adminDashboard.js",
                  objConfig.scriptsBasePath + "admin/admin.dash.home.js"
                ], buildName: "admin.dash.home.js"},
{build:true, files: [
                  objConfig.scriptsBasePath +"links.js",
                  objConfig.scriptsBasePath + "admin/adminDashboard.js",
                  objConfig.scriptsBasePath + "admin/admin.doctor.listings.js"
                ], buildName: "admin.doctor.listings.js"},
{build:true, files: [
                  objConfig.scriptsBasePath +"utility.js",
                  objConfig.scriptsBasePath +"validator.js",
                  objConfig.scriptsBasePath +"links.js",
                  objConfig.scriptsBasePath +"bootstrapValidator.min.js",
                  objConfig.scriptsBasePath + "admin/adminDashboard.js",
                  objConfig.scriptsBasePath + "admin/admin.doctor.edit.js"
                ], buildName: "admin.doctor.edit.js"},
{build:true, files: [
                  objConfig.scriptsBasePath +"utility.js",
                  objConfig.scriptsBasePath +"links.js",
                  objConfig.scriptsBasePath +"validator.js",
                  objConfig.scriptsBasePath + "doctor/doctorDashboard.js",
                  objConfig.scriptsBasePath + "doctor/manage.locations.js"
                ], buildName: "manage.locations.js"},
{build:true, files: [
              objConfig.scriptsBasePath +"utility.js",
              objConfig.scriptsBasePath +"links.js",
              objConfig.scriptsBasePath +"vendor/typeahead.bundle.min.js",
              objConfig.scriptsBasePath +"vendor/bootstrap3-typeahead.min.js",
              objConfig.scriptsBasePath +"bootstrapValidator.min.js",
              objConfig.scriptsBasePath + "doctor/doctorDashboard.js",
              objConfig.scriptsBasePath +"vendor/jquery.dataTables.min.js",
              objConfig.scriptsBasePath + "inventory/addsub.inventory.js"
            ], buildName: "addsub.inventory.js"},
{build:true, files: [
                  objConfig.scriptsBasePath +"links.js",
                  objConfig.scriptsBasePath + "doctor/doctorDashboard.js",
                  objConfig.scriptsBasePath + "doctor/medicineSearch.js"
                ], buildName: "medicineSearch.js"},

{build:true, files: [
                  objConfig.scriptsBasePath +"links.js",
                  objConfig.scriptsBasePath + "doctor/doctorDashboard.js",
                  objConfig.scriptsBasePath + "vendor/raphael.min.js",
                  objConfig.scriptsBasePath + "vendor/morris.min.js",
                  objConfig.scriptsBasePath + "vendor/morris-data.js",
                  objConfig.scriptsBasePath + "doctor/analytics.js"
                ], buildName: "analytics.js"},
{build:true, files: [
                  objConfig.scriptsBasePath + "links.js",
                  objConfig.scriptsBasePath + "moment.js",
                  objConfig.scriptsBasePath + "bootstrap-datetimepicker.min.js",
                  objConfig.scriptsBasePath + "doctor/doctorDashboard.js",
                  objConfig.scriptsBasePath + "schedule/schedule.calendar.js"
                ], buildName: "schedule.calendar.js"},
{build:true, files: [
                  objConfig.scriptsBasePath + "links.js",
                  objConfig.scriptsBasePath + "authenticate/forgot.password.js"
                ], buildName: "forgot.password.js"},
{build:true, files: [
                objConfig.scriptsBasePath +"utility.js",
                objConfig.scriptsBasePath + "links.js",
                objConfig.scriptsBasePath + "authenticate/password.reset.js"
              ], buildName: "password.reset.js"}
];  //

gulp.task('build-scripts', function(){

  //console.log('multi task', JSON.stringify(filesList));

  for(var i = 0; i < filesList.length; i++){
      //console.log(JSON.stringify(filesList[i]));

      if(filesList[i].build == true){
        gulp.src(filesList[i].files)
            .pipe(sourcemaps.init())
            .pipe(concat(filesList[i].buildName))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(objConfig.scriptDestinationFolder));
      }
  }

  return;

});

gulp.task('watch-scripts', function() {
  gulp.watch(objConfig.watchPath, ['build-scripts']);
});


gulp.task('publish-build-js', function(){

  for(var i = 0; i < filesList.length; i++){
    //console.log(JSON.stringify(filesList[i]));
      console.log('at ' + i + 'name' + filesList[i].buildName);
      //console.log('lenght' + filesList.length);
      //console.log('error at ' + JSON.stringify(filesList[16]));
      //var i = 15;
      //error at 17, 26
      if(i != 17 && i != 25 && filesList[i].build == true){
        gulp.src(filesList[i].files)
            .pipe(concat(filesList[i].buildName))
            .pipe(uglify())
            //.pipe(stripDebug())
            .pipe(gulp.dest(objConfig.scriptDestinationFolder));
      }
  }

  return;

});

gulp.task('vendor-build-js', function(){

  //combining the jquery files first
  var vendorFiles = [objConfig.scriptsBasePath + 'vendor/jquery-2.1.4.min.js', objConfig.scriptsBasePath + 'vendor/bootstrap.min.js'];
  var fileName = 'jquery.bundle.js';

  gulp.src(vendorFiles)
      //.pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat(fileName))
      //.pipe(sourcemaps.write())
      .pipe(gulp.dest(objConfig.scriptDestinationFolder));
  return;

});

var cssBundleFileList = [
    objConfig.cssPath + 'styles.css',
    objConfig.cssPath + 'my-custom-style.css',
     objConfig.cssPath + 'bootstrap.css',
    objConfig.cssPath + 'bootstrap-theme.css',
  objConfig.cssPath + 'metisMenu.min.css',
  objConfig.cssPath + 'sb-admin.css',
  objConfig.cssPath + 'font-awesome.min.css'
];

gulp.task('concat-css-dev', function(){

  return gulp.src(cssBundleFileList)
      .pipe(sourcemaps.init())
      .pipe(concat(objConfig.cssBuildName))
      .pipe(sourcemaps.write())
      //.pipe(cssNano())
      .pipe(gulp.dest(objConfig.cssDest));

});

gulp.task('concat-css-publish', function(){

  return gulp.src(cssBundleFileList)
      //.pipe(sourcemaps.init())
      .pipe(concat(objConfig.cssBuildName))
      //.pipe(sourcemaps.write())
      //.pipe(cssNano())
      .pipe(gulp.dest(objConfig.cssDest));

});
