var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');


var watchify = require('watchify');
//var browserSync = require('browser-sync').create();

var objConfig = {
  scriptsBasePath: "./devScripts/",
  scriptDestinationFolder: "./js",
  watchPath: ['./devScripts/*.js', './devScripts/**/*.js']
};

var filesList = [
  {build:true, files: [objConfig.scriptsBasePath +"login.js"], buildName: "login.all.js"},
  {build:true, files: [objConfig.scriptsBasePath + "doctor/registration.js"], buildName: "doctor.registration.js"},
  {build:true, files: [
                       objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                       objConfig.scriptsBasePath +"doctor/dash.home.js"
                       ], buildName: "dash.home.js"},
 {build:true, files: [
                      objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                      objConfig.scriptsBasePath +"doctor/registration.js"
                    ], buildName: "doctor.profile.js"},
  {build:true, files: [
                      objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                      objConfig.scriptsBasePath +"appointment/new.appointment.js"
                     ], buildName: "new.appointment.js"},
  {build:true, files: [
                     objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                     objConfig.scriptsBasePath +"appointment/close.appointment.js"
                   ], buildName: "close.appointment.js"},
 {build:true, files: [
                    objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                    objConfig.scriptsBasePath +"appointment/list.appointment.js"
                  ], buildName: "list.appointment.js"},
 {build:true, files: [
                    objConfig.scriptsBasePath +"moment.js",
                    objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                    objConfig.scriptsBasePath +"schedule/new.schedule.js"
                  ], buildName: "new.schedule.js"},
{build:true, files: [
                   objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                   objConfig.scriptsBasePath +"schedule/list.schedule.js"
                 ], buildName: "list.schedule.js"},
{build:true, files: [
                  objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                  objConfig.scriptsBasePath +"patient/list.patient.js"
                ], buildName: "list.patient.js"},
{build:true, files: [
                  objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                  objConfig.scriptsBasePath +"staffManage/add.staff.js"
                ], buildName: "add.staff.js"},
{build:true, files: [
                  objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                  objConfig.scriptsBasePath +"patient/patient.history.js"
                ], buildName: "patient.history.js"},
                {build:true, files: [
                                  objConfig.scriptsBasePath +"moment.js",
                                  objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                                  objConfig.scriptsBasePath +"patient/patient.entry.js"
                                ], buildName: "patient.entry.js"},
{build:true, files: [
                  objConfig.scriptsBasePath +"doctor/doctorDashboard.js",
                  objConfig.scriptsBasePath +"programme/programme.listing.js"
                ], buildName: "programme.listing.js"},
{build:true, files: [
                  objConfig.scriptsBasePath + "doctor/doctorDashboard.js",
                  objConfig.scriptsBasePath + "programme/medical.programme.js"
                ], buildName: "medical.programme.js"}
];

gulp.task('build-scripts', function(){

  //console.log('multi task', JSON.stringify(filesList));

  for(var i = 0; i < filesList.length; i++){
      //console.log(JSON.stringify(filesList[i]));

      if(filesList[i].build == true){
        gulp.src(filesList[i].files)
            .pipe(sourcemaps.init())
            //.pipe(uglify())
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
