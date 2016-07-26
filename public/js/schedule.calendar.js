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

//! moment.js
//! version : 2.13.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            m._isValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                m._isValid = m._isValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    function isUndefined(input) {
        return input === void 0;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (utils_hooks__hooks.deprecationHandler != null) {
                utils_hooks__hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (utils_hooks__hooks.deprecationHandler != null) {
            utils_hooks__hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;
    utils_hooks__hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function isObject(input) {
        return Object.prototype.toString.call(input) === '[object Object]';
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    // internal storage for locale config files
    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale');
                config = mergeConfigs(locales[name]._config, config);
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    config = mergeConfigs(locales[config.parentLocale]._config, config);
                } else {
                    // treat as if there is no base config
                    deprecateSimple('parentLocaleUndefined',
                            'specified parentLocale is not defined yet');
                }
            }
            locales[name] = new Locale(config);

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale;
            if (locales[name] != null) {
                config = mergeConfigs(locales[name]._config, config);
            }
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function locale_locales__listLocales() {
        return keys(locales);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function get_set__set (mom, unit, value) {
        if (mom.isValid()) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    // MOMENTS

    function getSet (units, value) {
        var unit;
        if (typeof units === 'object') {
            for (unit in units) {
                this.set(unit, units[unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        return isArray(this._months) ? this._months[m.month()] :
            this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function units_month__handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = create_utc__createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return units_month__handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (typeof value !== 'number') {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        //the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(utils_hooks__hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (getParsingFlags(config).bigHour === true &&
                config._a[HOUR] <= 12 &&
                config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else if (isDate(input)) {
            config._d = input;
        } else {
            configFromInput(config);
        }

        if (!valid__isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date(utils_hooks__hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
         'moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
         function () {
             var other = local__createLocal.apply(null, arguments);
             if (this.isValid() && other.isValid()) {
                 return other < this ? this : other;
             } else {
                 return valid__createInvalid();
             }
         }
     );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
        function () {
            var other = local__createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return valid__createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = ((string || '').match(matcher) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : local__createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
            } else if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            this.utcOffset(offsetFromString(matchOffset, this._i));
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? local__createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

    function create__createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])        * sign,
                h  : toInt(match[HOUR])        * sign,
                m  : toInt(match[MINUTE])      * sign,
                s  : toInt(match[SECOND])      * sign,
                ms : toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function moment_calendar__calendar (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            diff = this.diff(sod, 'days', true),
            format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input,units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input,units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    utils_hooks__hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if (isFunction(Date.prototype.toISOString)) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? utils_hooks__hooks.defaultFormatUtc : utils_hooks__hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }

        // 'date' is an alias for 'day', so it should be considered as such.
        if (units === 'date') {
            units = 'day';
        }

        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return this._offset ? new Date(this.valueOf()) : this._d;
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return this._weekdaysShort[m.day()];
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return this._weekdaysMin[m.day()];
    }

    function day_of_week__handleStrictParse(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = create_utc__createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return day_of_week__handleStrictParse.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = create_utc__createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add               = add_subtract__add;
    momentPrototype__proto.calendar          = moment_calendar__calendar;
    momentPrototype__proto.clone             = clone;
    momentPrototype__proto.diff              = diff;
    momentPrototype__proto.endOf             = endOf;
    momentPrototype__proto.format            = format;
    momentPrototype__proto.from              = from;
    momentPrototype__proto.fromNow           = fromNow;
    momentPrototype__proto.to                = to;
    momentPrototype__proto.toNow             = toNow;
    momentPrototype__proto.get               = getSet;
    momentPrototype__proto.invalidAt         = invalidAt;
    momentPrototype__proto.isAfter           = isAfter;
    momentPrototype__proto.isBefore          = isBefore;
    momentPrototype__proto.isBetween         = isBetween;
    momentPrototype__proto.isSame            = isSame;
    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
    momentPrototype__proto.isValid           = moment_valid__isValid;
    momentPrototype__proto.lang              = lang;
    momentPrototype__proto.locale            = locale;
    momentPrototype__proto.localeData        = localeData;
    momentPrototype__proto.max               = prototypeMax;
    momentPrototype__proto.min               = prototypeMin;
    momentPrototype__proto.parsingFlags      = parsingFlags;
    momentPrototype__proto.set               = getSet;
    momentPrototype__proto.startOf           = startOf;
    momentPrototype__proto.subtract          = add_subtract__subtract;
    momentPrototype__proto.toArray           = toArray;
    momentPrototype__proto.toObject          = toObject;
    momentPrototype__proto.toDate            = toDate;
    momentPrototype__proto.toISOString       = moment_format__toISOString;
    momentPrototype__proto.toJSON            = toJSON;
    momentPrototype__proto.toString          = toString;
    momentPrototype__proto.unix              = unix;
    momentPrototype__proto.valueOf           = to_type__valueOf;
    momentPrototype__proto.creationData      = creationData;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

    var momentPrototype = momentPrototype__proto;

    function moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    function preParsePostFormat (string) {
        return string;
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var prototype__proto = Locale.prototype;

    prototype__proto._calendar       = defaultCalendar;
    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto._longDateFormat = defaultLongDateFormat;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto._invalidDate    = defaultInvalidDate;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto._ordinal        = defaultOrdinal;
    prototype__proto.ordinal         = ordinal;
    prototype__proto._ordinalParse   = defaultOrdinalParse;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto._relativeTime   = defaultRelativeTime;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months            =        localeMonths;
    prototype__proto._months           = defaultLocaleMonths;
    prototype__proto.monthsShort       =        localeMonthsShort;
    prototype__proto._monthsShort      = defaultLocaleMonthsShort;
    prototype__proto.monthsParse       =        localeMonthsParse;
    prototype__proto._monthsRegex      = defaultMonthsRegex;
    prototype__proto.monthsRegex       = monthsRegex;
    prototype__proto._monthsShortRegex = defaultMonthsShortRegex;
    prototype__proto.monthsShortRegex  = monthsShortRegex;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto._week = defaultLocaleWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto._weekdays      = defaultLocaleWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    prototype__proto._weekdaysRegex      = defaultWeekdaysRegex;
    prototype__proto.weekdaysRegex       =        weekdaysRegex;
    prototype__proto._weekdaysShortRegex = defaultWeekdaysShortRegex;
    prototype__proto.weekdaysShortRegex  =        weekdaysShortRegex;
    prototype__proto._weekdaysMinRegex   = defaultWeekdaysMinRegex;
    prototype__proto.weekdaysMinRegex    =        weekdaysMinRegex;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = lists__get(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = locale_locales__getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return lists__get(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = lists__get(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function lists__listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function lists__listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function lists__listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function lists__listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
                minutes <= 1           && ['m']           ||
                minutes < thresholds.m && ['mm', minutes] ||
                hours   <= 1           && ['h']           ||
                hours   < thresholds.h && ['hh', hours]   ||
                days    <= 1           && ['d']           ||
                days    < thresholds.d && ['dd', days]    ||
                months  <= 1           && ['M']           ||
                months  < thresholds.M && ['MM', months]  ||
                years   <= 1           && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var seconds = iso_string__abs(this._milliseconds) / 1000;
        var days         = iso_string__abs(this._days);
        var months       = iso_string__abs(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    utils_hooks__hooks.version = '2.13.0';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.now                   = now;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.updateLocale          = updateLocale;
    utils_hooks__hooks.locales               = locale_locales__listLocales;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
    utils_hooks__hooks.prototype             = momentPrototype;

    var _moment = utils_hooks__hooks;

    return _moment;

}));
/*! version : 4.17.37
 =========================================================
 bootstrap-datetimejs
 https://github.com/Eonasdan/bootstrap-datetimepicker
 Copyright (c) 2015 Jonathan Peterson
 =========================================================
 */
!function(a){"use strict";if("function"==typeof define&&define.amd)define(["jquery","moment"],a);else if("object"==typeof exports)a(require("jquery"),require("moment"));else{if("undefined"==typeof jQuery)throw"bootstrap-datetimepicker requires jQuery to be loaded first";if("undefined"==typeof moment)throw"bootstrap-datetimepicker requires Moment.js to be loaded first";a(jQuery,moment)}}(function(a,b){"use strict";if(!b)throw new Error("bootstrap-datetimepicker requires Moment.js to be loaded first");var c=function(c,d){var e,f,g,h,i,j,k,l={},m=!0,n=!1,o=!1,p=0,q=[{clsName:"days",navFnc:"M",navStep:1},{clsName:"months",navFnc:"y",navStep:1},{clsName:"years",navFnc:"y",navStep:10},{clsName:"decades",navFnc:"y",navStep:100}],r=["days","months","years","decades"],s=["top","bottom","auto"],t=["left","right","auto"],u=["default","top","bottom"],v={up:38,38:"up",down:40,40:"down",left:37,37:"left",right:39,39:"right",tab:9,9:"tab",escape:27,27:"escape",enter:13,13:"enter",pageUp:33,33:"pageUp",pageDown:34,34:"pageDown",shift:16,16:"shift",control:17,17:"control",space:32,32:"space",t:84,84:"t","delete":46,46:"delete"},w={},x=function(a){var c,e,f,g,h,i=!1;return void 0!==b.tz&&void 0!==d.timeZone&&null!==d.timeZone&&""!==d.timeZone&&(i=!0),void 0===a||null===a?c=i?b().tz(d.timeZone).startOf("d"):b().startOf("d"):i?(e=b().tz(d.timeZone).utcOffset(),f=b(a,j,d.useStrict).utcOffset(),f!==e?(g=b().tz(d.timeZone).format("Z"),h=b(a,j,d.useStrict).format("YYYY-MM-DD[T]HH:mm:ss")+g,c=b(h,j,d.useStrict).tz(d.timeZone)):c=b(a,j,d.useStrict).tz(d.timeZone)):c=b(a,j,d.useStrict),c},y=function(a){if("string"!=typeof a||a.length>1)throw new TypeError("isEnabled expects a single character string parameter");switch(a){case"y":return-1!==i.indexOf("Y");case"M":return-1!==i.indexOf("M");case"d":return-1!==i.toLowerCase().indexOf("d");case"h":case"H":return-1!==i.toLowerCase().indexOf("h");case"m":return-1!==i.indexOf("m");case"s":return-1!==i.indexOf("s");default:return!1}},z=function(){return y("h")||y("m")||y("s")},A=function(){return y("y")||y("M")||y("d")},B=function(){var b=a("<thead>").append(a("<tr>").append(a("<th>").addClass("prev").attr("data-action","previous").append(a("<span>").addClass(d.icons.previous))).append(a("<th>").addClass("picker-switch").attr("data-action","pickerSwitch").attr("colspan",d.calendarWeeks?"6":"5")).append(a("<th>").addClass("next").attr("data-action","next").append(a("<span>").addClass(d.icons.next)))),c=a("<tbody>").append(a("<tr>").append(a("<td>").attr("colspan",d.calendarWeeks?"8":"7")));return[a("<div>").addClass("datepicker-days").append(a("<table>").addClass("table-condensed").append(b).append(a("<tbody>"))),a("<div>").addClass("datepicker-months").append(a("<table>").addClass("table-condensed").append(b.clone()).append(c.clone())),a("<div>").addClass("datepicker-years").append(a("<table>").addClass("table-condensed").append(b.clone()).append(c.clone())),a("<div>").addClass("datepicker-decades").append(a("<table>").addClass("table-condensed").append(b.clone()).append(c.clone()))]},C=function(){var b=a("<tr>"),c=a("<tr>"),e=a("<tr>");return y("h")&&(b.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.incrementHour}).addClass("btn").attr("data-action","incrementHours").append(a("<span>").addClass(d.icons.up)))),c.append(a("<td>").append(a("<span>").addClass("timepicker-hour").attr({"data-time-component":"hours",title:d.tooltips.pickHour}).attr("data-action","showHours"))),e.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.decrementHour}).addClass("btn").attr("data-action","decrementHours").append(a("<span>").addClass(d.icons.down))))),y("m")&&(y("h")&&(b.append(a("<td>").addClass("separator")),c.append(a("<td>").addClass("separator").html(":")),e.append(a("<td>").addClass("separator"))),b.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.incrementMinute}).addClass("btn").attr("data-action","incrementMinutes").append(a("<span>").addClass(d.icons.up)))),c.append(a("<td>").append(a("<span>").addClass("timepicker-minute").attr({"data-time-component":"minutes",title:d.tooltips.pickMinute}).attr("data-action","showMinutes"))),e.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.decrementMinute}).addClass("btn").attr("data-action","decrementMinutes").append(a("<span>").addClass(d.icons.down))))),y("s")&&(y("m")&&(b.append(a("<td>").addClass("separator")),c.append(a("<td>").addClass("separator").html(":")),e.append(a("<td>").addClass("separator"))),b.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.incrementSecond}).addClass("btn").attr("data-action","incrementSeconds").append(a("<span>").addClass(d.icons.up)))),c.append(a("<td>").append(a("<span>").addClass("timepicker-second").attr({"data-time-component":"seconds",title:d.tooltips.pickSecond}).attr("data-action","showSeconds"))),e.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.decrementSecond}).addClass("btn").attr("data-action","decrementSeconds").append(a("<span>").addClass(d.icons.down))))),h||(b.append(a("<td>").addClass("separator")),c.append(a("<td>").append(a("<button>").addClass("btn btn-primary").attr({"data-action":"togglePeriod",tabindex:"-1",title:d.tooltips.togglePeriod}))),e.append(a("<td>").addClass("separator"))),a("<div>").addClass("timepicker-picker").append(a("<table>").addClass("table-condensed").append([b,c,e]))},D=function(){var b=a("<div>").addClass("timepicker-hours").append(a("<table>").addClass("table-condensed")),c=a("<div>").addClass("timepicker-minutes").append(a("<table>").addClass("table-condensed")),d=a("<div>").addClass("timepicker-seconds").append(a("<table>").addClass("table-condensed")),e=[C()];return y("h")&&e.push(b),y("m")&&e.push(c),y("s")&&e.push(d),e},E=function(){var b=[];return d.showTodayButton&&b.push(a("<td>").append(a("<a>").attr({"data-action":"today",title:d.tooltips.today}).append(a("<span>").addClass(d.icons.today)))),!d.sideBySide&&A()&&z()&&b.push(a("<td>").append(a("<a>").attr({"data-action":"togglePicker",title:d.tooltips.selectTime}).append(a("<span>").addClass(d.icons.time)))),d.showClear&&b.push(a("<td>").append(a("<a>").attr({"data-action":"clear",title:d.tooltips.clear}).append(a("<span>").addClass(d.icons.clear)))),d.showClose&&b.push(a("<td>").append(a("<a>").attr({"data-action":"close",title:d.tooltips.close}).append(a("<span>").addClass(d.icons.close)))),a("<table>").addClass("table-condensed").append(a("<tbody>").append(a("<tr>").append(b)))},F=function(){var b=a("<div>").addClass("bootstrap-datetimepicker-widget dropdown-menu"),c=a("<div>").addClass("datepicker").append(B()),e=a("<div>").addClass("timepicker").append(D()),f=a("<ul>").addClass("list-unstyled"),g=a("<li>").addClass("picker-switch"+(d.collapse?" accordion-toggle":"")).append(E());return d.inline&&b.removeClass("dropdown-menu"),h&&b.addClass("usetwentyfour"),y("s")&&!h&&b.addClass("wider"),d.sideBySide&&A()&&z()?(b.addClass("timepicker-sbs"),"top"===d.toolbarPlacement&&b.append(g),b.append(a("<div>").addClass("row").append(c.addClass("col-md-6")).append(e.addClass("col-md-6"))),"bottom"===d.toolbarPlacement&&b.append(g),b):("top"===d.toolbarPlacement&&f.append(g),A()&&f.append(a("<li>").addClass(d.collapse&&z()?"collapse in":"").append(c)),"default"===d.toolbarPlacement&&f.append(g),z()&&f.append(a("<li>").addClass(d.collapse&&A()?"collapse":"").append(e)),"bottom"===d.toolbarPlacement&&f.append(g),b.append(f))},G=function(){var b,e={};return b=c.is("input")||d.inline?c.data():c.find("input").data(),b.dateOptions&&b.dateOptions instanceof Object&&(e=a.extend(!0,e,b.dateOptions)),a.each(d,function(a){var c="date"+a.charAt(0).toUpperCase()+a.slice(1);void 0!==b[c]&&(e[a]=b[c])}),e},H=function(){var b,e=(n||c).position(),f=(n||c).offset(),g=d.widgetPositioning.vertical,h=d.widgetPositioning.horizontal;if(d.widgetParent)b=d.widgetParent.append(o);else if(c.is("input"))b=c.after(o).parent();else{if(d.inline)return void(b=c.append(o));b=c,c.children().first().after(o)}if("auto"===g&&(g=f.top+1.5*o.height()>=a(window).height()+a(window).scrollTop()&&o.height()+c.outerHeight()<f.top?"top":"bottom"),"auto"===h&&(h=b.width()<f.left+o.outerWidth()/2&&f.left+o.outerWidth()>a(window).width()?"right":"left"),"top"===g?o.addClass("top").removeClass("bottom"):o.addClass("bottom").removeClass("top"),"right"===h?o.addClass("pull-right"):o.removeClass("pull-right"),"relative"!==b.css("position")&&(b=b.parents().filter(function(){return"relative"===a(this).css("position")}).first()),0===b.length)throw new Error("datetimepicker component should be placed within a relative positioned container");o.css({top:"top"===g?"auto":e.top+c.outerHeight(),bottom:"top"===g?e.top+c.outerHeight():"auto",left:"left"===h?b===c?0:e.left:"auto",right:"left"===h?"auto":b.outerWidth()-c.outerWidth()-(b===c?0:e.left)})},I=function(a){"dp.change"===a.type&&(a.date&&a.date.isSame(a.oldDate)||!a.date&&!a.oldDate)||c.trigger(a)},J=function(a){"y"===a&&(a="YYYY"),I({type:"dp.update",change:a,viewDate:f.clone()})},K=function(a){o&&(a&&(k=Math.max(p,Math.min(3,k+a))),o.find(".datepicker > div").hide().filter(".datepicker-"+q[k].clsName).show())},L=function(){var b=a("<tr>"),c=f.clone().startOf("w").startOf("d");for(d.calendarWeeks===!0&&b.append(a("<th>").addClass("cw").text("#"));c.isBefore(f.clone().endOf("w"));)b.append(a("<th>").addClass("dow").text(c.format("dd"))),c.add(1,"d");o.find(".datepicker-days thead").append(b)},M=function(a){return d.disabledDates[a.format("YYYY-MM-DD")]===!0},N=function(a){return d.enabledDates[a.format("YYYY-MM-DD")]===!0},O=function(a){return d.disabledHours[a.format("H")]===!0},P=function(a){return d.enabledHours[a.format("H")]===!0},Q=function(b,c){if(!b.isValid())return!1;if(d.disabledDates&&"d"===c&&M(b))return!1;if(d.enabledDates&&"d"===c&&!N(b))return!1;if(d.minDate&&b.isBefore(d.minDate,c))return!1;if(d.maxDate&&b.isAfter(d.maxDate,c))return!1;if(d.daysOfWeekDisabled&&"d"===c&&-1!==d.daysOfWeekDisabled.indexOf(b.day()))return!1;if(d.disabledHours&&("h"===c||"m"===c||"s"===c)&&O(b))return!1;if(d.enabledHours&&("h"===c||"m"===c||"s"===c)&&!P(b))return!1;if(d.disabledTimeIntervals&&("h"===c||"m"===c||"s"===c)){var e=!1;if(a.each(d.disabledTimeIntervals,function(){return b.isBetween(this[0],this[1])?(e=!0,!1):void 0}),e)return!1}return!0},R=function(){for(var b=[],c=f.clone().startOf("y").startOf("d");c.isSame(f,"y");)b.push(a("<span>").attr("data-action","selectMonth").addClass("month").text(c.format("MMM"))),c.add(1,"M");o.find(".datepicker-months td").empty().append(b)},S=function(){var b=o.find(".datepicker-months"),c=b.find("th"),g=b.find("tbody").find("span");c.eq(0).find("span").attr("title",d.tooltips.prevYear),c.eq(1).attr("title",d.tooltips.selectYear),c.eq(2).find("span").attr("title",d.tooltips.nextYear),b.find(".disabled").removeClass("disabled"),Q(f.clone().subtract(1,"y"),"y")||c.eq(0).addClass("disabled"),c.eq(1).text(f.year()),Q(f.clone().add(1,"y"),"y")||c.eq(2).addClass("disabled"),g.removeClass("active"),e.isSame(f,"y")&&!m&&g.eq(e.month()).addClass("active"),g.each(function(b){Q(f.clone().month(b),"M")||a(this).addClass("disabled")})},T=function(){var a=o.find(".datepicker-years"),b=a.find("th"),c=f.clone().subtract(5,"y"),g=f.clone().add(6,"y"),h="";for(b.eq(0).find("span").attr("title",d.tooltips.prevDecade),b.eq(1).attr("title",d.tooltips.selectDecade),b.eq(2).find("span").attr("title",d.tooltips.nextDecade),a.find(".disabled").removeClass("disabled"),d.minDate&&d.minDate.isAfter(c,"y")&&b.eq(0).addClass("disabled"),b.eq(1).text(c.year()+"-"+g.year()),d.maxDate&&d.maxDate.isBefore(g,"y")&&b.eq(2).addClass("disabled");!c.isAfter(g,"y");)h+='<span data-action="selectYear" class="year'+(c.isSame(e,"y")&&!m?" active":"")+(Q(c,"y")?"":" disabled")+'">'+c.year()+"</span>",c.add(1,"y");a.find("td").html(h)},U=function(){var a=o.find(".datepicker-decades"),c=a.find("th"),g=b({y:f.year()-f.year()%100-1}),h=g.clone().add(100,"y"),i=g.clone(),j="";for(c.eq(0).find("span").attr("title",d.tooltips.prevCentury),c.eq(2).find("span").attr("title",d.tooltips.nextCentury),a.find(".disabled").removeClass("disabled"),(g.isSame(b({y:1900}))||d.minDate&&d.minDate.isAfter(g,"y"))&&c.eq(0).addClass("disabled"),c.eq(1).text(g.year()+"-"+h.year()),(g.isSame(b({y:2e3}))||d.maxDate&&d.maxDate.isBefore(h,"y"))&&c.eq(2).addClass("disabled");!g.isAfter(h,"y");)j+='<span data-action="selectDecade" class="decade'+(g.isSame(e,"y")?" active":"")+(Q(g,"y")?"":" disabled")+'" data-selection="'+(g.year()+6)+'">'+(g.year()+1)+" - "+(g.year()+12)+"</span>",g.add(12,"y");j+="<span></span><span></span><span></span>",a.find("td").html(j),c.eq(1).text(i.year()+1+"-"+g.year())},V=function(){var b,c,g,h,i=o.find(".datepicker-days"),j=i.find("th"),k=[];if(A()){for(j.eq(0).find("span").attr("title",d.tooltips.prevMonth),j.eq(1).attr("title",d.tooltips.selectMonth),j.eq(2).find("span").attr("title",d.tooltips.nextMonth),i.find(".disabled").removeClass("disabled"),j.eq(1).text(f.format(d.dayViewHeaderFormat)),Q(f.clone().subtract(1,"M"),"M")||j.eq(0).addClass("disabled"),Q(f.clone().add(1,"M"),"M")||j.eq(2).addClass("disabled"),b=f.clone().startOf("M").startOf("w").startOf("d"),h=0;42>h;h++)0===b.weekday()&&(c=a("<tr>"),d.calendarWeeks&&c.append('<td class="cw">'+b.week()+"</td>"),k.push(c)),g="",b.isBefore(f,"M")&&(g+=" old"),b.isAfter(f,"M")&&(g+=" new"),b.isSame(e,"d")&&!m&&(g+=" active"),Q(b,"d")||(g+=" disabled"),b.isSame(x(),"d")&&(g+=" today"),(0===b.day()||6===b.day())&&(g+=" weekend"),c.append('<td data-action="selectDay" data-day="'+b.format("L")+'" class="day'+g+'">'+b.date()+"</td>"),b.add(1,"d");i.find("tbody").empty().append(k),S(),T(),U()}},W=function(){var b=o.find(".timepicker-hours table"),c=f.clone().startOf("d"),d=[],e=a("<tr>");for(f.hour()>11&&!h&&c.hour(12);c.isSame(f,"d")&&(h||f.hour()<12&&c.hour()<12||f.hour()>11);)c.hour()%4===0&&(e=a("<tr>"),d.push(e)),e.append('<td data-action="selectHour" class="hour'+(Q(c,"h")?"":" disabled")+'">'+c.format(h?"HH":"hh")+"</td>"),c.add(1,"h");b.empty().append(d)},X=function(){for(var b=o.find(".timepicker-minutes table"),c=f.clone().startOf("h"),e=[],g=a("<tr>"),h=1===d.stepping?5:d.stepping;f.isSame(c,"h");)c.minute()%(4*h)===0&&(g=a("<tr>"),e.push(g)),g.append('<td data-action="selectMinute" class="minute'+(Q(c,"m")?"":" disabled")+'">'+c.format("mm")+"</td>"),c.add(h,"m");b.empty().append(e)},Y=function(){for(var b=o.find(".timepicker-seconds table"),c=f.clone().startOf("m"),d=[],e=a("<tr>");f.isSame(c,"m");)c.second()%20===0&&(e=a("<tr>"),d.push(e)),e.append('<td data-action="selectSecond" class="second'+(Q(c,"s")?"":" disabled")+'">'+c.format("ss")+"</td>"),c.add(5,"s");b.empty().append(d)},Z=function(){var a,b,c=o.find(".timepicker span[data-time-component]");h||(a=o.find(".timepicker [data-action=togglePeriod]"),b=e.clone().add(e.hours()>=12?-12:12,"h"),a.text(e.format("A")),Q(b,"h")?a.removeClass("disabled"):a.addClass("disabled")),c.filter("[data-time-component=hours]").text(e.format(h?"HH":"hh")),c.filter("[data-time-component=minutes]").text(e.format("mm")),c.filter("[data-time-component=seconds]").text(e.format("ss")),W(),X(),Y()},$=function(){o&&(V(),Z())},_=function(a){var b=m?null:e;return a?(a=a.clone().locale(d.locale),1!==d.stepping&&a.minutes(Math.round(a.minutes()/d.stepping)*d.stepping%60).seconds(0),void(Q(a)?(e=a,f=e.clone(),g.val(e.format(i)),c.data("date",e.format(i)),m=!1,$(),I({type:"dp.change",date:e.clone(),oldDate:b})):(d.keepInvalid||g.val(m?"":e.format(i)),I({type:"dp.error",date:a})))):(m=!0,g.val(""),c.data("date",""),I({type:"dp.change",date:!1,oldDate:b}),void $())},aa=function(){var b=!1;return o?(o.find(".collapse").each(function(){var c=a(this).data("collapse");return c&&c.transitioning?(b=!0,!1):!0}),b?l:(n&&n.hasClass("btn")&&n.toggleClass("active"),o.hide(),a(window).off("resize",H),o.off("click","[data-action]"),o.off("mousedown",!1),o.remove(),o=!1,I({type:"dp.hide",date:e.clone()}),g.blur(),l)):l},ba=function(){_(null)},ca={next:function(){var a=q[k].navFnc;f.add(q[k].navStep,a),V(),J(a)},previous:function(){var a=q[k].navFnc;f.subtract(q[k].navStep,a),V(),J(a)},pickerSwitch:function(){K(1)},selectMonth:function(b){var c=a(b.target).closest("tbody").find("span").index(a(b.target));f.month(c),k===p?(_(e.clone().year(f.year()).month(f.month())),d.inline||aa()):(K(-1),V()),J("M")},selectYear:function(b){var c=parseInt(a(b.target).text(),10)||0;f.year(c),k===p?(_(e.clone().year(f.year())),d.inline||aa()):(K(-1),V()),J("YYYY")},selectDecade:function(b){var c=parseInt(a(b.target).data("selection"),10)||0;f.year(c),k===p?(_(e.clone().year(f.year())),d.inline||aa()):(K(-1),V()),J("YYYY")},selectDay:function(b){var c=f.clone();a(b.target).is(".old")&&c.subtract(1,"M"),a(b.target).is(".new")&&c.add(1,"M"),_(c.date(parseInt(a(b.target).text(),10))),z()||d.keepOpen||d.inline||aa()},incrementHours:function(){var a=e.clone().add(1,"h");Q(a,"h")&&_(a)},incrementMinutes:function(){var a=e.clone().add(d.stepping,"m");Q(a,"m")&&_(a)},incrementSeconds:function(){var a=e.clone().add(1,"s");Q(a,"s")&&_(a)},decrementHours:function(){var a=e.clone().subtract(1,"h");Q(a,"h")&&_(a)},decrementMinutes:function(){var a=e.clone().subtract(d.stepping,"m");Q(a,"m")&&_(a)},decrementSeconds:function(){var a=e.clone().subtract(1,"s");Q(a,"s")&&_(a)},togglePeriod:function(){_(e.clone().add(e.hours()>=12?-12:12,"h"))},togglePicker:function(b){var c,e=a(b.target),f=e.closest("ul"),g=f.find(".in"),h=f.find(".collapse:not(.in)");if(g&&g.length){if(c=g.data("collapse"),c&&c.transitioning)return;g.collapse?(g.collapse("hide"),h.collapse("show")):(g.removeClass("in"),h.addClass("in")),e.is("span")?e.toggleClass(d.icons.time+" "+d.icons.date):e.find("span").toggleClass(d.icons.time+" "+d.icons.date)}},showPicker:function(){o.find(".timepicker > div:not(.timepicker-picker)").hide(),o.find(".timepicker .timepicker-picker").show()},showHours:function(){o.find(".timepicker .timepicker-picker").hide(),o.find(".timepicker .timepicker-hours").show()},showMinutes:function(){o.find(".timepicker .timepicker-picker").hide(),o.find(".timepicker .timepicker-minutes").show()},showSeconds:function(){o.find(".timepicker .timepicker-picker").hide(),o.find(".timepicker .timepicker-seconds").show()},selectHour:function(b){var c=parseInt(a(b.target).text(),10);h||(e.hours()>=12?12!==c&&(c+=12):12===c&&(c=0)),_(e.clone().hours(c)),ca.showPicker.call(l)},selectMinute:function(b){_(e.clone().minutes(parseInt(a(b.target).text(),10))),ca.showPicker.call(l)},selectSecond:function(b){_(e.clone().seconds(parseInt(a(b.target).text(),10))),ca.showPicker.call(l)},clear:ba,today:function(){var a=x();Q(a,"d")&&_(a)},close:aa},da=function(b){return a(b.currentTarget).is(".disabled")?!1:(ca[a(b.currentTarget).data("action")].apply(l,arguments),!1)},ea=function(){var b,c={year:function(a){return a.month(0).date(1).hours(0).seconds(0).minutes(0)},month:function(a){return a.date(1).hours(0).seconds(0).minutes(0)},day:function(a){return a.hours(0).seconds(0).minutes(0)},hour:function(a){return a.seconds(0).minutes(0)},minute:function(a){return a.seconds(0)}};return g.prop("disabled")||!d.ignoreReadonly&&g.prop("readonly")||o?l:(void 0!==g.val()&&0!==g.val().trim().length?_(ga(g.val().trim())):d.useCurrent&&m&&(g.is("input")&&0===g.val().trim().length||d.inline)&&(b=x(),"string"==typeof d.useCurrent&&(b=c[d.useCurrent](b)),_(b)),o=F(),L(),R(),o.find(".timepicker-hours").hide(),o.find(".timepicker-minutes").hide(),o.find(".timepicker-seconds").hide(),$(),K(),a(window).on("resize",H),o.on("click","[data-action]",da),o.on("mousedown",!1),n&&n.hasClass("btn")&&n.toggleClass("active"),o.show(),H(),d.focusOnShow&&!g.is(":focus")&&g.focus(),I({type:"dp.show"}),l)},fa=function(){return o?aa():ea()},ga=function(a){return a=void 0===d.parseInputDate?b.isMoment(a)||a instanceof Date?b(a):x(a):d.parseInputDate(a),a.locale(d.locale),a},ha=function(a){var b,c,e,f,g=null,h=[],i={},j=a.which,k="p";w[j]=k;for(b in w)w.hasOwnProperty(b)&&w[b]===k&&(h.push(b),parseInt(b,10)!==j&&(i[b]=!0));for(b in d.keyBinds)if(d.keyBinds.hasOwnProperty(b)&&"function"==typeof d.keyBinds[b]&&(e=b.split(" "),e.length===h.length&&v[j]===e[e.length-1])){for(f=!0,c=e.length-2;c>=0;c--)if(!(v[e[c]]in i)){f=!1;break}if(f){g=d.keyBinds[b];break}}g&&(g.call(l,o),a.stopPropagation(),a.preventDefault())},ia=function(a){w[a.which]="r",a.stopPropagation(),a.preventDefault()},ja=function(b){var c=a(b.target).val().trim(),d=c?ga(c):null;return _(d),b.stopImmediatePropagation(),!1},ka=function(){g.on({change:ja,blur:d.debug?"":aa,keydown:ha,keyup:ia,focus:d.allowInputToggle?ea:""}),c.is("input")?g.on({focus:ea}):n&&(n.on("click",fa),n.on("mousedown",!1))},la=function(){g.off({change:ja,blur:blur,keydown:ha,keyup:ia,focus:d.allowInputToggle?aa:""}),c.is("input")?g.off({focus:ea}):n&&(n.off("click",fa),n.off("mousedown",!1))},ma=function(b){var c={};return a.each(b,function(){var a=ga(this);a.isValid()&&(c[a.format("YYYY-MM-DD")]=!0)}),Object.keys(c).length?c:!1},na=function(b){var c={};return a.each(b,function(){c[this]=!0}),Object.keys(c).length?c:!1},oa=function(){var a=d.format||"L LT";i=a.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,function(a){var b=e.localeData().longDateFormat(a)||a;return b.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,function(a){return e.localeData().longDateFormat(a)||a})}),j=d.extraFormats?d.extraFormats.slice():[],j.indexOf(a)<0&&j.indexOf(i)<0&&j.push(i),h=i.toLowerCase().indexOf("a")<1&&i.replace(/\[.*?\]/g,"").indexOf("h")<1,y("y")&&(p=2),y("M")&&(p=1),y("d")&&(p=0),k=Math.max(p,k),m||_(e)};if(l.destroy=function(){aa(),la(),c.removeData("DateTimePicker"),c.removeData("date")},l.toggle=fa,l.show=ea,l.hide=aa,l.disable=function(){return aa(),n&&n.hasClass("btn")&&n.addClass("disabled"),g.prop("disabled",!0),l},l.enable=function(){return n&&n.hasClass("btn")&&n.removeClass("disabled"),g.prop("disabled",!1),l},l.ignoreReadonly=function(a){if(0===arguments.length)return d.ignoreReadonly;if("boolean"!=typeof a)throw new TypeError("ignoreReadonly () expects a boolean parameter");return d.ignoreReadonly=a,l},l.options=function(b){if(0===arguments.length)return a.extend(!0,{},d);if(!(b instanceof Object))throw new TypeError("options() options parameter should be an object");return a.extend(!0,d,b),a.each(d,function(a,b){if(void 0===l[a])throw new TypeError("option "+a+" is not recognized!");l[a](b)}),l},l.date=function(a){if(0===arguments.length)return m?null:e.clone();if(!(null===a||"string"==typeof a||b.isMoment(a)||a instanceof Date))throw new TypeError("date() parameter must be one of [null, string, moment or Date]");return _(null===a?null:ga(a)),l},l.format=function(a){if(0===arguments.length)return d.format;if("string"!=typeof a&&("boolean"!=typeof a||a!==!1))throw new TypeError("format() expects a sting or boolean:false parameter "+a);return d.format=a,i&&oa(),l},l.timeZone=function(a){return 0===arguments.length?d.timeZone:(d.timeZone=a,l)},l.dayViewHeaderFormat=function(a){if(0===arguments.length)return d.dayViewHeaderFormat;if("string"!=typeof a)throw new TypeError("dayViewHeaderFormat() expects a string parameter");return d.dayViewHeaderFormat=a,l},l.extraFormats=function(a){if(0===arguments.length)return d.extraFormats;if(a!==!1&&!(a instanceof Array))throw new TypeError("extraFormats() expects an array or false parameter");return d.extraFormats=a,j&&oa(),l},l.disabledDates=function(b){if(0===arguments.length)return d.disabledDates?a.extend({},d.disabledDates):d.disabledDates;if(!b)return d.disabledDates=!1,$(),l;if(!(b instanceof Array))throw new TypeError("disabledDates() expects an array parameter");return d.disabledDates=ma(b),d.enabledDates=!1,$(),l},l.enabledDates=function(b){if(0===arguments.length)return d.enabledDates?a.extend({},d.enabledDates):d.enabledDates;if(!b)return d.enabledDates=!1,$(),l;if(!(b instanceof Array))throw new TypeError("enabledDates() expects an array parameter");return d.enabledDates=ma(b),d.disabledDates=!1,$(),l},l.daysOfWeekDisabled=function(a){if(0===arguments.length)return d.daysOfWeekDisabled.splice(0);if("boolean"==typeof a&&!a)return d.daysOfWeekDisabled=!1,$(),l;if(!(a instanceof Array))throw new TypeError("daysOfWeekDisabled() expects an array parameter");if(d.daysOfWeekDisabled=a.reduce(function(a,b){return b=parseInt(b,10),b>6||0>b||isNaN(b)?a:(-1===a.indexOf(b)&&a.push(b),a)},[]).sort(),d.useCurrent&&!d.keepInvalid){for(var b=0;!Q(e,"d");){if(e.add(1,"d"),7===b)throw"Tried 7 times to find a valid date";b++}_(e)}return $(),l},l.maxDate=function(a){if(0===arguments.length)return d.maxDate?d.maxDate.clone():d.maxDate;if("boolean"==typeof a&&a===!1)return d.maxDate=!1,$(),l;"string"==typeof a&&("now"===a||"moment"===a)&&(a=x());var b=ga(a);if(!b.isValid())throw new TypeError("maxDate() Could not parse date parameter: "+a);if(d.minDate&&b.isBefore(d.minDate))throw new TypeError("maxDate() date parameter is before options.minDate: "+b.format(i));return d.maxDate=b,d.useCurrent&&!d.keepInvalid&&e.isAfter(a)&&_(d.maxDate),f.isAfter(b)&&(f=b.clone().subtract(d.stepping,"m")),$(),l},l.minDate=function(a){if(0===arguments.length)return d.minDate?d.minDate.clone():d.minDate;if("boolean"==typeof a&&a===!1)return d.minDate=!1,$(),l;"string"==typeof a&&("now"===a||"moment"===a)&&(a=x());var b=ga(a);if(!b.isValid())throw new TypeError("minDate() Could not parse date parameter: "+a);if(d.maxDate&&b.isAfter(d.maxDate))throw new TypeError("minDate() date parameter is after options.maxDate: "+b.format(i));return d.minDate=b,d.useCurrent&&!d.keepInvalid&&e.isBefore(a)&&_(d.minDate),f.isBefore(b)&&(f=b.clone().add(d.stepping,"m")),$(),l},l.defaultDate=function(a){if(0===arguments.length)return d.defaultDate?d.defaultDate.clone():d.defaultDate;if(!a)return d.defaultDate=!1,l;"string"==typeof a&&("now"===a||"moment"===a)&&(a=x());var b=ga(a);if(!b.isValid())throw new TypeError("defaultDate() Could not parse date parameter: "+a);if(!Q(b))throw new TypeError("defaultDate() date passed is invalid according to component setup validations");return d.defaultDate=b,(d.defaultDate&&d.inline||""===g.val().trim())&&_(d.defaultDate),l},l.locale=function(a){if(0===arguments.length)return d.locale;if(!b.localeData(a))throw new TypeError("locale() locale "+a+" is not loaded from moment locales!");return d.locale=a,e.locale(d.locale),f.locale(d.locale),i&&oa(),o&&(aa(),ea()),l},l.stepping=function(a){return 0===arguments.length?d.stepping:(a=parseInt(a,10),(isNaN(a)||1>a)&&(a=1),d.stepping=a,l)},l.useCurrent=function(a){var b=["year","month","day","hour","minute"];if(0===arguments.length)return d.useCurrent;if("boolean"!=typeof a&&"string"!=typeof a)throw new TypeError("useCurrent() expects a boolean or string parameter");if("string"==typeof a&&-1===b.indexOf(a.toLowerCase()))throw new TypeError("useCurrent() expects a string parameter of "+b.join(", "));return d.useCurrent=a,l},l.collapse=function(a){if(0===arguments.length)return d.collapse;if("boolean"!=typeof a)throw new TypeError("collapse() expects a boolean parameter");return d.collapse===a?l:(d.collapse=a,o&&(aa(),ea()),l)},l.icons=function(b){if(0===arguments.length)return a.extend({},d.icons);if(!(b instanceof Object))throw new TypeError("icons() expects parameter to be an Object");return a.extend(d.icons,b),o&&(aa(),ea()),l},l.tooltips=function(b){if(0===arguments.length)return a.extend({},d.tooltips);if(!(b instanceof Object))throw new TypeError("tooltips() expects parameter to be an Object");return a.extend(d.tooltips,b),o&&(aa(),ea()),l},l.useStrict=function(a){if(0===arguments.length)return d.useStrict;if("boolean"!=typeof a)throw new TypeError("useStrict() expects a boolean parameter");return d.useStrict=a,l},l.sideBySide=function(a){if(0===arguments.length)return d.sideBySide;if("boolean"!=typeof a)throw new TypeError("sideBySide() expects a boolean parameter");return d.sideBySide=a,o&&(aa(),ea()),l},l.viewMode=function(a){if(0===arguments.length)return d.viewMode;if("string"!=typeof a)throw new TypeError("viewMode() expects a string parameter");if(-1===r.indexOf(a))throw new TypeError("viewMode() parameter must be one of ("+r.join(", ")+") value");return d.viewMode=a,k=Math.max(r.indexOf(a),p),K(),l},l.toolbarPlacement=function(a){if(0===arguments.length)return d.toolbarPlacement;if("string"!=typeof a)throw new TypeError("toolbarPlacement() expects a string parameter");if(-1===u.indexOf(a))throw new TypeError("toolbarPlacement() parameter must be one of ("+u.join(", ")+") value");return d.toolbarPlacement=a,o&&(aa(),ea()),l},l.widgetPositioning=function(b){if(0===arguments.length)return a.extend({},d.widgetPositioning);if("[object Object]"!=={}.toString.call(b))throw new TypeError("widgetPositioning() expects an object variable");if(b.horizontal){if("string"!=typeof b.horizontal)throw new TypeError("widgetPositioning() horizontal variable must be a string");if(b.horizontal=b.horizontal.toLowerCase(),-1===t.indexOf(b.horizontal))throw new TypeError("widgetPositioning() expects horizontal parameter to be one of ("+t.join(", ")+")");d.widgetPositioning.horizontal=b.horizontal}if(b.vertical){if("string"!=typeof b.vertical)throw new TypeError("widgetPositioning() vertical variable must be a string");if(b.vertical=b.vertical.toLowerCase(),-1===s.indexOf(b.vertical))throw new TypeError("widgetPositioning() expects vertical parameter to be one of ("+s.join(", ")+")");d.widgetPositioning.vertical=b.vertical}return $(),l},l.calendarWeeks=function(a){if(0===arguments.length)return d.calendarWeeks;if("boolean"!=typeof a)throw new TypeError("calendarWeeks() expects parameter to be a boolean value");return d.calendarWeeks=a,$(),l},l.showTodayButton=function(a){if(0===arguments.length)return d.showTodayButton;if("boolean"!=typeof a)throw new TypeError("showTodayButton() expects a boolean parameter");return d.showTodayButton=a,o&&(aa(),ea()),l},l.showClear=function(a){if(0===arguments.length)return d.showClear;if("boolean"!=typeof a)throw new TypeError("showClear() expects a boolean parameter");return d.showClear=a,o&&(aa(),ea()),l},l.widgetParent=function(b){if(0===arguments.length)return d.widgetParent;if("string"==typeof b&&(b=a(b)),null!==b&&"string"!=typeof b&&!(b instanceof a))throw new TypeError("widgetParent() expects a string or a jQuery object parameter");return d.widgetParent=b,o&&(aa(),ea()),l},l.keepOpen=function(a){if(0===arguments.length)return d.keepOpen;if("boolean"!=typeof a)throw new TypeError("keepOpen() expects a boolean parameter");return d.keepOpen=a,l},l.focusOnShow=function(a){if(0===arguments.length)return d.focusOnShow;if("boolean"!=typeof a)throw new TypeError("focusOnShow() expects a boolean parameter");return d.focusOnShow=a,l},l.inline=function(a){if(0===arguments.length)return d.inline;if("boolean"!=typeof a)throw new TypeError("inline() expects a boolean parameter");return d.inline=a,l},l.clear=function(){return ba(),l},l.keyBinds=function(a){return d.keyBinds=a,l},l.getMoment=function(a){return x(a)},l.debug=function(a){if("boolean"!=typeof a)throw new TypeError("debug() expects a boolean parameter");return d.debug=a,l},l.allowInputToggle=function(a){if(0===arguments.length)return d.allowInputToggle;if("boolean"!=typeof a)throw new TypeError("allowInputToggle() expects a boolean parameter");return d.allowInputToggle=a,l},l.showClose=function(a){if(0===arguments.length)return d.showClose;if("boolean"!=typeof a)throw new TypeError("showClose() expects a boolean parameter");return d.showClose=a,l},l.keepInvalid=function(a){if(0===arguments.length)return d.keepInvalid;if("boolean"!=typeof a)throw new TypeError("keepInvalid() expects a boolean parameter");return d.keepInvalid=a,l},l.datepickerInput=function(a){if(0===arguments.length)return d.datepickerInput;if("string"!=typeof a)throw new TypeError("datepickerInput() expects a string parameter");return d.datepickerInput=a,l},l.parseInputDate=function(a){if(0===arguments.length)return d.parseInputDate;
if("function"!=typeof a)throw new TypeError("parseInputDate() sholud be as function");return d.parseInputDate=a,l},l.disabledTimeIntervals=function(b){if(0===arguments.length)return d.disabledTimeIntervals?a.extend({},d.disabledTimeIntervals):d.disabledTimeIntervals;if(!b)return d.disabledTimeIntervals=!1,$(),l;if(!(b instanceof Array))throw new TypeError("disabledTimeIntervals() expects an array parameter");return d.disabledTimeIntervals=b,$(),l},l.disabledHours=function(b){if(0===arguments.length)return d.disabledHours?a.extend({},d.disabledHours):d.disabledHours;if(!b)return d.disabledHours=!1,$(),l;if(!(b instanceof Array))throw new TypeError("disabledHours() expects an array parameter");if(d.disabledHours=na(b),d.enabledHours=!1,d.useCurrent&&!d.keepInvalid){for(var c=0;!Q(e,"h");){if(e.add(1,"h"),24===c)throw"Tried 24 times to find a valid date";c++}_(e)}return $(),l},l.enabledHours=function(b){if(0===arguments.length)return d.enabledHours?a.extend({},d.enabledHours):d.enabledHours;if(!b)return d.enabledHours=!1,$(),l;if(!(b instanceof Array))throw new TypeError("enabledHours() expects an array parameter");if(d.enabledHours=na(b),d.disabledHours=!1,d.useCurrent&&!d.keepInvalid){for(var c=0;!Q(e,"h");){if(e.add(1,"h"),24===c)throw"Tried 24 times to find a valid date";c++}_(e)}return $(),l},l.viewDate=function(a){if(0===arguments.length)return f.clone();if(!a)return f=e.clone(),l;if(!("string"==typeof a||b.isMoment(a)||a instanceof Date))throw new TypeError("viewDate() parameter must be one of [string, moment or Date]");return f=ga(a),J(),l},c.is("input"))g=c;else if(g=c.find(d.datepickerInput),0===g.size())g=c.find("input");else if(!g.is("input"))throw new Error('CSS class "'+d.datepickerInput+'" cannot be applied to non input element');if(c.hasClass("input-group")&&(n=0===c.find(".datepickerbutton").size()?c.find(".input-group-addon"):c.find(".datepickerbutton")),!d.inline&&!g.is("input"))throw new Error("Could not initialize DateTimePicker without an input element");return e=x(),f=e.clone(),a.extend(!0,d,G()),l.options(d),oa(),ka(),g.prop("disabled")&&l.disable(),g.is("input")&&0!==g.val().trim().length?_(ga(g.val().trim())):d.defaultDate&&void 0===g.attr("placeholder")&&_(d.defaultDate),d.inline&&ea(),l};a.fn.datetimepicker=function(b){return this.each(function(){var d=a(this);d.data("DateTimePicker")||(b=a.extend(!0,{},a.fn.datetimepicker.defaults,b),d.data("DateTimePicker",c(d,b)))})},a.fn.datetimepicker.defaults={timeZone:"Etc/UTC",format:!1,dayViewHeaderFormat:"MMMM YYYY",extraFormats:!1,stepping:1,minDate:!1,maxDate:!1,useCurrent:!0,collapse:!0,locale:b.locale(),defaultDate:!1,disabledDates:!1,enabledDates:!1,icons:{time:"glyphicon glyphicon-time",date:"glyphicon glyphicon-calendar",up:"glyphicon glyphicon-chevron-up",down:"glyphicon glyphicon-chevron-down",previous:"glyphicon glyphicon-chevron-left",next:"glyphicon glyphicon-chevron-right",today:"glyphicon glyphicon-screenshot",clear:"glyphicon glyphicon-trash",close:"glyphicon glyphicon-remove"},tooltips:{today:"Go to today",clear:"Clear selection",close:"Close the picker",selectMonth:"Select Month",prevMonth:"Previous Month",nextMonth:"Next Month",selectYear:"Select Year",prevYear:"Previous Year",nextYear:"Next Year",selectDecade:"Select Decade",prevDecade:"Previous Decade",nextDecade:"Next Decade",prevCentury:"Previous Century",nextCentury:"Next Century",pickHour:"Pick Hour",incrementHour:"Increment Hour",decrementHour:"Decrement Hour",pickMinute:"Pick Minute",incrementMinute:"Increment Minute",decrementMinute:"Decrement Minute",pickSecond:"Pick Second",incrementSecond:"Increment Second",decrementSecond:"Decrement Second",togglePeriod:"Toggle Period",selectTime:"Select Time"},useStrict:!1,sideBySide:!1,daysOfWeekDisabled:!1,calendarWeeks:!1,viewMode:"days",toolbarPlacement:"default",showTodayButton:!1,showClear:!1,showClose:!1,widgetPositioning:{horizontal:"auto",vertical:"auto"},widgetParent:null,ignoreReadonly:!1,keepOpen:!1,focusOnShow:!0,inline:!1,keepInvalid:!1,datepickerInput:".datepickerinput",keyBinds:{up:function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")?this.date(b.clone().subtract(7,"d")):this.date(b.clone().add(this.stepping(),"m"))}},down:function(a){if(!a)return void this.show();var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")?this.date(b.clone().add(7,"d")):this.date(b.clone().subtract(this.stepping(),"m"))},"control up":function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")?this.date(b.clone().subtract(1,"y")):this.date(b.clone().add(1,"h"))}},"control down":function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")?this.date(b.clone().add(1,"y")):this.date(b.clone().subtract(1,"h"))}},left:function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")&&this.date(b.clone().subtract(1,"d"))}},right:function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")&&this.date(b.clone().add(1,"d"))}},pageUp:function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")&&this.date(b.clone().subtract(1,"M"))}},pageDown:function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")&&this.date(b.clone().add(1,"M"))}},enter:function(){this.hide()},escape:function(){this.hide()},"control space":function(a){a.find(".timepicker").is(":visible")&&a.find('.btn[data-action="togglePeriod"]').click()},t:function(){this.date(this.getMoment())},"delete":function(){this.clear()}},debug:!1,allowInputToggle:!1,disabledTimeIntervals:!1,disabledHours:!1,enabledHours:!1,viewDate:!1}});
$(document).ready(function(){

  //defining the helper functions in global

  $(function(){

    console.log('Doctor Dashboard js loaded');

    //top level controller
    var controller = {
      init: function(){
        //wiring the navigation
        this.logoutUrl = links.logoutUrl;
        this.doctorProfile = links.doctorProfile;
        this.dashboardHomeUrl = links.dashboardHomeUrl;
        this.newAppointmentUrl = links.newAppointmentUrl;
        this.patientsEntryUrl = links.patientsEntryUrl;
        this.patientsListingUrl = links.patientsListingUrl;
        this.closeAppointmentUrl = links.closeAppointmentUrl;
        this.doctorsAppointmentsListUrl = links.doctorsAppointmentsListUrl;

        this.newScheduleUrl = links.newScheduleUrl;
        this.listScheduleUrl = this.listScheduleUrl;
        this.ScheduleCalendarUrl = links.getScheduleCalendarUrl;
        this.addStaffUrl = links.addStaffUrl;
        this.doctorsStaffListingUr = links.doctorsStaffListingUr;

        this.patientsHistoryUrl = links.patientsHistoryUrl;

        this.createProgramForPatientUrl = links.createProgramForPatientUrl ;
        this.programmeListingsUrl = links.programmeListingsUrl;

        this.ManageLocationsUrl = links.ManageLocationsUrl;
        this.CalendarTemplateUrl = links.getCalenderUrl;

        this.analyticsReportUrl = links.getAnalyticsUrl;
        this.accountingUrl = links.accountingUrl;
        this.medicineSearchUrl = links.medicineSearchUrl;

        this.staffListingUrl = links.doctorsStaffListingUr;

        //do somethng about doctors info and registration

        //The url from the browser  can be compared to set the active navigation
        navView.init();

      }
    };

    var navView = {
      init: function(){

        //wiring the navigation clicks


        $("#pms-brand-btn-link").click(function(e){
          e.preventDefault();
          console.log('PMS brand click');
        });



        $("#user-Profile-Btn-Link").attr('href', controller.doctorProfile);

        $("#doctor-dash-logout-btn").attr('href', controller.logoutUrl);



        $("#dashboard-Section-Btn").attr('href', controller.dashboardHomeUrl);

        $("#appointment-section-link-btn").attr('href', controller.doctorsAppointmentsListUrl);

        $("#manage-Doctors-Schedule-Section-Link-Btn").attr('href', controller.ScheduleCalendarUrl);

        $("#btn-programme-section-link").attr('href', controller.programmeListingsUrl);

        $("#create-program-for-patient-section").attr('href', controller.createProgramForPatientUrl);

        $("#patients-Entry-Section-Link-Btn").attr('href', controller.patientsListingUrl);

        //$("#patients-entry-create-section-link-Btn").attr('href', controller.patientsEntryUrl);
        //$("#patients-History-Section-Link-Btn").attr('href', controller.patientsHistoryUrl);

        $("#staff-managment-section-link-btn").attr('href', controller.doctorsStaffListingUr);

        $("#btn-manage-locations").attr('href', controller.ManageLocationsUrl);

        $("#analytics-side-navigation-link-btn").attr('href', controller.analyticsReportUrl);
        $("#accounting-side-navigation-link-btn").attr('href', controller.accountingUrl);
        $("#medicine-side-navigation-link-btn").attr('href', controller.medicineSearchUrl);

        $("#dash-staff-manage-link").attr('href', controller.doctorsStaffListingUr);
        $("#dash-location-manage-link").attr('href', controller.ManageLocationsUrl);



        //$("#book-Appointments-Section-Btn").attr('href', controller.newAppointmentUrl);
        //$("#close-Book-Appointment-Section-Link-Btn").attr('href', controller.closeAppointmentUrl);
        //$("#view-Appointment-Section-Link-Btn").attr('href', controller.doctorsAppointmentsListUrl);
        //$("#manage-Doctors-Schedule-Section-Link-Btn").attr('href', controller.listScheduleUrl);
        //$("#manage-schedule-create-section-link-Btn").attr('href', controller.newScheduleUrl);
        //$("#calendar-Template-Btn-Link").attr('href', controller.CalendarTemplateUrl);
        //$("#manage-schedule-list-section-link-Btn").attr('href', controller.ScheduleCalendarUrl);

        $("#other-settings-section-link-btn").click(function(e){
          e.preventDefault();
        });
        $("#calendar-template-section-link-btn").click(function(e){
          e.preventDefault();
        });


      },
      render: function(){
        //highlight the right navigation
      }
    }

    controller.init();

  }());

});

$(document).ready(function(){

  $(function(){
    console.log('calander js loaded');


    var model = {
      locationList:[],
      calendarList: [],
      startDate:'',
      endDate:''
    };

    var backGroundColorList = [
      '#337ab7', //blue
      '#F44336', //red
      '#4CAF50', //green
      '#FB8C00', //orange
      '#37474F', //gray
      '#37AF4F', //gray
      '#37474F', //gray
      '#3747AF', //gray
      '#AF474F',//gray
      '#37FF4F', //gray
      '#FF334F', //gray
      '#33FF4F', //gray
      '#3347FFF' //gray
    ];

    var controller = {
      init: function(){
        this.getSechduleCalendarDetailsUrl = links.getSechduleCalendarDetailsUrl;

        calendarView.init();

        var mTodaysDate = moment();


        var mstartDate = moment({ years:mTodaysDate.get('year'), months:mTodaysDate.get('month')})
        var mendDate = moment(mstartDate).endOf('month');

        //month
        var lstartDate = mstartDate.format('DD-MM-YYYY');
        var lendDate = mendDate.format('DD-MM-YYYY');

        //updating model
        model.startDate = lstartDate;
        model.endDate = lendDate;

        console.log('start date ' + lstartDate + ' end date ' + lendDate);

        this.getDetailsFromServer(lstartDate, lendDate);

      },
      getLocationList: function(){
        return  model.locationList;
      },
      getStartDate: function(){
        return model.startDate;
      },
      searchSchedule: function(scheduleList, date){
        console.log('length' + scheduleList.length);
        for(var i = 0; i < scheduleList.length; i++){
          if(scheduleList[i].date == date){
            return scheduleList[i];
          }
        }
        return null;
      },
      assignColorCodesTolocationList(){

        for(var i = 0; i < model.locationList.length; i++){
          if(i < backGroundColorList.length){
            model.locationList[i].colour = backGroundColorList[i];
          }else{
            model.locationList[i].colour =  backGroundColorList[0];
          }

        }

      },
      getLocationColour: function(id){
        for(var i = 0; i < model.locationList.length; i++){
          if(model.locationList[i].id == id){
            return model.locationList[i].colour;
          }
        }
      },
      findElementInconstructedArray: function(parray, pdate){
        //console.log('length' + parray.length);
        for(var i = 0; i < parray.length; i++){
          //console.log('date ' + parray[i].date + ' ' + pdate);
          if(parray[i].date == pdate){
            return parray[i];
          }
        }
        return null;
      },
      constructScheduleListForRendering:function(){


        var mfromDate = moment(model.startDate, "DD-MM-YYYY");
        var mtoDate = moment(model.endDate, "DD-MM-YYYY");
        //console.log('date range from ' + model.startDate + ' to ' + model.endDate);
        //console.log('date range from ' + mfromDate + ' to ' + mtoDate);

        //Initilize the schedule array with items for all the days of the month
        //plus with extra days needed to fill the calendar from monday
        var constructedScheduleListModel = [];

        //finding the no of days that need to be filled, to start from monday
        var startDay = mfromDate.format('ddd');

        if(startDay != 'Mon'){

          var blocksToAdd = 0; //no of days needed to start from monday

          if(startDay == "Tue"){
            blocksToAdd = 1;
          }else if(startDay == "Wed"){
            blocksToAdd = 2;
          }else if(startDay == "Thu"){
            blocksToAdd = 3;
          }else if(startDay == "Fri"){
            blocksToAdd = 4;
          }else if(startDay == "Sat"){
            blocksToAdd = 5;
          }else if(startDay == "Sun"){
            blocksToAdd = 6;
          }

          //find the start date for monday
          var calanderStartDate = moment(mfromDate).subtract(blocksToAdd, 'days');

          //console.log('cal start date ' + calanderStartDate.format('DD-MM-YYYY'));
          //add inactve items
          for(var i = 0; i < blocksToAdd ; i++){

            var schedule = {
              isActive: false,
              date: calanderStartDate.format('DD-MM-YYYY'),
              list:[]
            };
            constructedScheduleListModel.push(schedule);
            //constructedScheduleListModel.push(calanderStartDate.format('DD-MM-YYYY'));
            calanderStartDate.add(1, 'd');
          }
        }

        //adding items for the duration of the time period
        var daysDuration =  moment.duration(mtoDate.diff(mfromDate)).asDays();

        for(var scheduleCounter = 0; scheduleCounter <= daysDuration; scheduleCounter++){

          var schedule = {
            isActive: false,
            date: mfromDate.format('DD-MM-YYYY'),
            list:[]
          };
          constructedScheduleListModel.push(schedule);
          mfromDate.add(1, 'd');
        }

        //console.log('constructed Model ' + JSON.stringify(constructedScheduleListModel));

        //looping through the schedules for each location
        if(model.calendarList){
        for(var locCounter = 0; locCounter < model.calendarList.length; locCounter++){

          var lscheduleList = model.calendarList[locCounter].scheduleList;
          var locId = model.calendarList[locCounter].locationId;

          //console.log('schedu ' + JSON.stringify(scheduleList));

          for(var scheduleCounter = 0; scheduleCounter < lscheduleList.length; scheduleCounter++){

            //console.log('schedu ' + JSON.stringify(scheduleList[scheduleCounter]));

            //get the item from the constructed array
            var item = this.findElementInconstructedArray(constructedScheduleListModel, lscheduleList[scheduleCounter].date);
            if(item){
              item.isActive = true;

              var schedule = {
                locationId: locId,
                timings: lscheduleList[scheduleCounter].timings
              }
              item.list.push(schedule);

            }

          }//inner loop for schedule items in locations


        }//outer loop for locations
      }

        //console.log('constructed Model after' + JSON.stringify(constructedScheduleListModel));

        return constructedScheduleListModel;
      },
      getDetailsFromServer: function(pstartDate, pendDate){
        $.get(this.getSechduleCalendarDetailsUrl , {startDate:pstartDate, endDate:pendDate})
        .done(function( response ) {
          console.log('locs ' + JSON.stringify(response));
          model = response.data;
          controller.assignColorCodesTolocationList();
          calendarView.render();
        });
      }
    };


    var calendarView = {
      init: function(){
        this.newScheduleButton = $("#btn-new-schedule");
        this.deactivateScheduleButton = $("#btn-deactivate-schedule");
        this.txtMonthHeader = $('#txt-month-header');
        this.locationListTop = $('#location-list-top');
        this.calendarTableBody = $('#calendar-body');

        this.btnPreviousSchedule = $('#btn-previous-schedule');
        this.btnNextSchedule = $('#btn-next-schedule');

        this.newScheduleButton.click(function(e){
          e.preventDefault();
          window.location.href = links.newScheduleUrl;
        });

        this.deactivateScheduleButton.click(function(e){
          e.preventDefault();
          window.location.href = links.deactivateScheduleUrl;
        });





        this.btnPreviousSchedule.click(function(e){
          e.preventDefault();

          var strDate = controller.getStartDate();
          mdate = moment(strDate, "DD-MM-YYYY");

          console.log('start date ' + mdate.format('DD-MM-YYYY'));

          var mstartDate = moment({ years:mdate.get('year'), months: +mdate.get('month') - 1});

          var lstartDate = mstartDate.format('DD-MM-YYYY');

          var mendDate = mstartDate.endOf('month');
          var lendDate = mendDate.format('DD-MM-YYYY');

          //updating model
          model.startDate = lstartDate;
          model.endDate = lendDate;

          controller.getDetailsFromServer(lstartDate, lendDate);

        });

        this.btnNextSchedule.click(function(e){
          e.preventDefault();
          var strDate = controller.getStartDate();
          mdate = moment(strDate, "DD-MM-YYYY");

          console.log('start date ' + mdate.format('DD-MM-YYYY'));

          var mstartDate = moment({ years:mdate.get('year'), months: +mdate.get('month') + 1});

          var lstartDate = mstartDate.format('DD-MM-YYYY');

          var mendDate = mstartDate.endOf('month');
          var lendDate = mendDate.format('DD-MM-YYYY');

          //updating model
          model.startDate = lstartDate;
          model.endDate = lendDate;


          console.log('start ' + lstartDate + ' end ' + lendDate);
          controller.getDetailsFromServer(lstartDate, lendDate);
        })

      },
      render: function(){

        var strDate = controller.getStartDate();
        mStartDate = moment(strDate, "DD-MM-YYYY");
        this.txtMonthHeader.text(mStartDate.format('MMM YY'));


        //adding the locaiton list on top
        var locationList = controller.getLocationList();
        this.locationListTop.empty();

        //<li><label class="label  label-primary">&nbsp;&nbsp;</label><span class="invisible">.....</span><label>Margao </label></li>
        for(var i = 0; i < locationList.length; i++){
          //console.log(locationList[i].name);
          //label label-primary location-label
          var label = $('<label/>', {
            class: ' location-label label-primary ',
            css: {
              "background-color" : backGroundColorList[i]
            },
          });

          var span = $('<span/>', {
            class: 'invisible',
            text:'...'
          });

             var span23 = $('<span/>', {
            class: 'invisible',
            text:'...'
          });

          var label1 = $('<label/>', {
            text:locationList[i].name
          });

          var li = $('<li/>');
          li.append(label);
          label.append(span23);

          li.append(span);
          li.append(label1);
          this.locationListTop.append(li);
        }

        //end of adding the location list on top

        //adding the entries to the calendar

        var scheduleList = controller.constructScheduleListForRendering();
        console.log('rendering ' +JSON.stringify(scheduleList));

        var indexCounter = 0;
        var daysCount = scheduleList.length;
        var loopCount = Math.ceil(daysCount / 7);  //divide by seven days of week

        this.calendarTableBody.empty();
        for(var i = 0; i < loopCount ; i++){

          var tr = $('<tr/>',{class: 'text-center'});

          for(var j = 0; j < 7 && indexCounter < daysCount; j++){

            var scheduleItem = scheduleList[indexCounter];

            var date = moment(scheduleItem.date, "DD-MM-YYYY");
            var span =  $('<span/>',{class: 'pull-right font-16 calendar-date', text:date.format('Do')});
            var td = $('<td/>').append(span)
            .append($('<br><br>'));

            if(scheduleItem.isActive){

              var list = scheduleItem.list;

              for(var listCounter = 0; listCounter < list.length; listCounter++){

                //console.log(JSON.stringify(list[listCounter].timings));

                var timimgList = list[listCounter].timings;

                //one more loop to add the timings
                for(var timingCounter = 0; timingCounter < timimgList.length; timingCounter++){
                  //get the start and end minutes

                  var spanLocation =  $('<span/>',{class: 'location-label-2 label label-info',
                    css: {
                      "background-color" : controller.getLocationColour(list[listCounter].locationId)
                    }
                  });


                var startTimeMinutes = timimgList[timingCounter].startTimeMinutes;
                var mstartTime = moment({ hour:0, minutes:0 });
                mstartTime.add(startTimeMinutes, 'minutes');
                var endTimeMinutes = timimgList[timingCounter].endTimeMinutes;
                var mendTime = moment({ hour:0, minutes:0 });
                mendTime.add(endTimeMinutes, 'minutes');

                //console.log(JSON.stringify(timimgList[timingCounter]));

                var time = mstartTime.format('hh:mm a') + ' - ' + mendTime.format('hh:mm a');
                var span1 =  $('<span/>',{class: 'label font-16 label-custom'});
                span1.text(time);

               // td.append(spanLocation);
                td.append(span1);

                spanLocation.appendTo(span1);
              }


            }

            tr.append(td);

          }else{

            var span1 =  $('<span/>',{class: 'label font-16 label-info', text:'No Schedule'});
            td.append(span1);
            tr.append(td);

          }
          +
          ++indexCounter;

        }  //inner loop

        this.calendarTableBody.append(tr);

      }//outer loop

      //adding the entries in the top row
      //var tr = $('<tr/>');
      //this.calendarBody.append(tr);

    }
  }

  controller.init();

  /*
  $(document).on("click", ".calendar-time-Btn", function (ev) {

  $(".calendar-time-Btn").parent().parent().css("background-color","white");
  $(this).parent().parent().css("background-color","#e6ecf4");
  */

}());

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbmtzLmpzIiwibW9tZW50LmpzIiwiYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLm1pbi5qcyIsImRvY3RvckRhc2hib2FyZC5qcyIsInNjaGVkdWxlLmNhbGVuZGFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2OEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjaGVkdWxlLmNhbGVuZGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGxpbmtzID0ge1xyXG5cclxuXHJcblxyXG4gIC8vbG9naW4ganMgdXJsc1xyXG4gICBhdXRoZW50aWNhdGVVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvYXV0aGVuaXRjYXRlVXNlclwiLFxyXG4gICBzdWNjZXNzUmVkaXJlY3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIHJlZ2lzdGVyRG9jdG9yVXJsIDogXCJpbmRleC5waHAvZG9jdG9yL2RvY3RvckluZm9cIixcclxuICAgYWRtaW5Vcmw6XCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvYWRtaW5cIixcclxuXHJcbiAgIC8vcGFzc3dvcmQgcmVzZXRcclxuICAgcGFzc3dvcmRSZXN0UmVxdWVzdFVybDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL3Jlc2V0UGFzc3dvcmRSZXF1ZXN0XCIsXHJcbiAgIGxvZ2luVXJsOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9naW5cIixcclxuICAgcGFzc3dvcmRSZXNldFVybDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL3Bhc3N3b3JkUmVzZXRcIixcclxuICAgZm9yZ290UGFzc3dvcmRVcmw6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9mb3Jnb3RQYXNzd29yZFwiLFxyXG5cclxuICAgLy9hZG1pbiByZWxhdGVkXHJcbiAgIGRvY3Rvckxpc3RpbmdVcmw6IFwiaW5kZXgucGhwL2FkbWluRGFzaGJvYXJkL2RvY3Rvckxpc3RpbmdcIixcclxuICAgZ2V0QWxsRG9jdG9yc1VybDogXCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvZ2V0QWxsRG9jdG9yc1wiLFxyXG4gICBhZG1pbkRvY3RvckVkaXRSZWRpcmVjdDpcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9hZG1pbkRvY3RvckVkaXRcIixcclxuXHJcbiAgIGxvZ291dFVybCA6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dvdXRcIixcclxuXHJcbiAgIC8vZG9jdG9yIGRhc2hib2FyZCBsaW5rc1xyXG4gICBkb2N0b3JQcm9maWxlOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvZG9jdG9yUHJvZmlsZVwiLFxyXG4gICBkYXNoYm9hcmRIb21lVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBuZXdBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9ib29rQXBwb2ludG1lbnRcIixcclxuICAgcGF0aWVudHNFbnRyeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0VudHJ5XCIsXHJcbiAgIHBhdGllbnRzTGlzdGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0xpc3RpbmdcIixcclxuICAgY2xvc2VBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jbG9zZUFwcG9pbnRtZW50XCIsXHJcbiAgIGRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2xpc3RBcHBvaW50bWVudFwiLFxyXG4gICBuZXdTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9uZXdTY2hlZHVsZVwiLFxyXG4gICBkZWFjdGl2YXRlU2NoZWR1bGVVcmw6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9kZWFjdGl2YXRlU2NoZWR1bGVcIixcclxuICAgbGlzdFNjaGVkdWxlVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3NjaGVkdWxlTGlzdFwiLFxyXG4gICBnZXRTY2hlZHVsZUNhbGVuZGFyVXJsOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvU2NoZWR1bGVDYWxlbmRlclZpZXdcIixcclxuICAgYWRkU3RhZmZVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc3RhZmZFbnRyeVwiLFxyXG4gICBkb2N0b3JzU3RhZmZMaXN0aW5nVXIgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc3RhZmZMaXN0aW5nXCIsXHJcbiAgIHBhdGllbnRzSGlzdG9yeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50SGlzdG9yeVwiLFxyXG4gICBjcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiLFxyXG4gICBwcm9ncmFtbWVMaXN0aW5nc1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wcm9ncmFtbWVMaXN0XCIsXHJcbiAgIE1hbmFnZUxvY2F0aW9uc1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC93b3JrTG9jYXRpb25NYW5hZ2VtZW50XCIsXHJcbiAgIGdldEFuYWx5dGljc1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9BbmFseXRpY3NSZXBvcnRcIixcclxuICAgZ2V0Q2FsZW5kZXJVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY2FsZW5kYXJUZW1wbGF0ZVwiLFxyXG4gICBhY2NvdW50aW5nVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2FjY291bnRpbmdcIixcclxuICAgbWVkaWNpbmVTZWFyY2hVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbWVkaWNpbmVTZWFyY2hcIixcclxuXHJcbiAgIC8vc2NoZWR1bGVcclxuICAgZ2V0TG9jYXRpb25Vcmw6IFwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgY3JlYXRlVXBkYXRlU2NoZWR1bGVVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2NyZWF0ZVVwZGF0ZVNjaGVkdWxlXCIsXHJcbiAgIGdldFNlY2hkdWxlQ2FsZW5kYXJEZXRhaWxzVXJsOiBcImluZGV4LnBocC9zY2hlZHVsZS9nZXRDYWxhbmRlckRldGFpbHNcIixcclxuICAgZ2V0U2VjaGR1bGVmb3JEZWFjdGl2YXRpb246IFwiaW5kZXgucGhwL3NjaGVkdWxlL2dldFNjaGVkdWxlc0ZvckRlYWN0aXZhdGlvblwiLFxyXG4gICBkZWFjdGl2YXRlU2NoZWR1bGVEYXlzOiBcImluZGV4LnBocC9zY2hlZHVsZS9kZWFjdGl2YXRlU2NoZWR1bGVEYXlzXCIsXHJcblxyXG4gICAvL3Byb2dyYW1tZVxyXG4gICBkb2N0b3JzUHJvZ3JhbXNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldERvY3RvcnNDaGVja3VwUHJvZ3JhbXNcIixcclxuICAgcHJvZ3JhbW1lRWRpdFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9jcmVhdGVNb2RpZnlQcm9ncmFtbWVcIixcclxuICAgZ2V0UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVzXCIsXHJcblxyXG5cclxuICAgLy9wYXRpZW50XHJcbiAgIHBhdGllbnREZXRhaWxQZXJzaXN0VXJsOlwiaW5kZXgucGhwL3BhdGllbnQvYWRkVXBkYXRlUGF0aWVudFwiLFxyXG4gICBwYXRpZW50c0RldGFpbHNVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50RGV0YWlsc1wiLFxyXG4gICBsb2dpbkNoZWNrVXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9pc0xvZ2dlZEluXCIsXHJcbiAgIGdldFByb2dyYW1tZUxpc3Q6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldE1lZGljYXRpb25Qcm9ncmFtbWVMaXN0XCIsXHJcbiAgIHByb2dyYW1tZUxpc3REZXRhaWxzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVMaXN0RGV0YWlsc1wiLFxyXG4gICAvL3BhdGllbnRzUHJvZ3JhbW1lc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UGF0aWVudFByb2dyYW1tZXNcIixcclxuICAgcGF0aWVudExpc3RpbmdVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50TGlzdFwiLFxyXG4gICBnZXRQYXRpZW50c0ZvckF1dG9GaWxsVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0UGF0aWVudExpc3RGb3JBdXRvRmlsbFwiLFxyXG4gICBnZXRQYXRpZW50SGlzdG9yeVVybDonaW5kZXgucGhwL3BhdGllbnQvZ2V0UGF0aWVudEhpc3RvcnknLFxyXG4gICBnZXRwYXRpZW50c0ltYWdlVXJsOidpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50SW1hZ2UnLFxyXG5cclxuXHJcbiAgIGJvb2tBcHBvaW50bWVudFVybDogXCJpbmRleC5waHAvYXBwb2ludG1lbnQvYm9va0FwcG9pbnRtZW50XCIsXHJcbiAgIGdldEFwcG9pbnRtZW50Rm9yVGhlRGF5VXJsOiBcImluZGV4LnBocC9hcHBvaW50bWVudC9nZXRBcHBvaW50bWVudHNGb3JUaGVEYXlcIixcclxuICAgZ2V0QWxsQXBwb2ludG1lbnRzVXJsOiBcImluZGV4LnBocC9hcHBvaW50bWVudC9nZXRBbGxBcHBvaW50bWVudHNcIixcclxuICAgY2FuY2VsQXBwb2ludG1lbnRVcmw6IFwiaW5kZXgucGhwL2FwcG9pbnRtZW50L2NhbmNlbEFwcG9pbnRtZW50XCIsXHJcbiAgIGNsb3NlQXBwb2ludG1lbnRVcmw6IFwiaW5kZXgucGhwL2FwcG9pbnRtZW50L2Nsb3NlQXBwb2ludG1lbnRcIixcclxuICAgcmVzY2hlZHVsZUFwcG9pbnRtZW50VXJsOiBcImluZGV4LnBocC9hcHBvaW50bWVudC9yZXNjaGVkdWxlQXBwb2ludG1lbnRcIixcclxuXHJcbiAgIHNhdmVVcGRhdGVMb2NhdGlvbnM6XCJpbmRleC5waHAvbG9jYXRpb25zL2FkZFVwZGF0ZUxvY2F0aW9uXCIsXHJcbiAgIGxvY2F0aW9uTGlzdFVybDpcImluZGV4LnBocC9sb2NhdGlvbnMvZ2V0RG9jdG9yTG9jYXRpb25zXCIsXHJcbiAgIGRlYWN0aXZhdGVMb2NhdGlvblVybDpcImluZGV4LnBocC9sb2NhdGlvbnMvZGVhY3RpdmF0ZUxvY2F0aW9uXCIsXHJcbiAgIGRlbGl2ZXJ5TWV0aG9kc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldERlbGl2ZXJ5TWV0aG9kc1wiLFxyXG5cclxuXHJcbiAgIC8vcmVnaXN0YXJ0aW9uXHJcbiAgIGRvY3RvclVybDpcImluZGV4LnBocC9kb2N0b3Ivc2F2ZVVwZGF0ZURvY3RvclwiLFxyXG4gICBkb2N0b3JEZXRhaWxzVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9nZXREb2N0b3JEZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZG9jdG9yRGFzaFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIGxvZ291dFVybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9nb3V0XCIsXHJcblxyXG4gICBjcmVhdGVNb2RpZnlTdGFmZlVybDpcImluZGV4LnBocC9zdGFmZi9jcmVhdGVNb2RpZnlTdGFmZlwiLFxyXG4gICBnZXRTdGFmZkRldGFpbHNVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldFN0YWZmRGV0YWlsc1wiLFxyXG4gICBzdGFmZkxpc3RpbmdVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldERvY3RvcnNTdGFmZkxpc3RcIixcclxuXHJcblxyXG4gICAgLy91cGxvYWRcclxuICAgIGNsb3NlQXBwdFVwbG9hZEZpbGVzOlwiaW5kZXgucGhwL1VwbG9hZC9DbG9zZUFwcHRVcGxvYWRcIixcclxuICAgIFBhdGllbnRVcGxvYWRpbWFnZTpcImluZGV4LnBocC9VcGxvYWQvUGF0aWVudEltYWdlVXBsb2FkXCIsXHJcbiAgICBHYXVyZGlhblVwbG9hZGltYWdlOlwiaW5kZXgucGhwL1VwbG9hZC9HdWFyZGlhbkltYWdlVXBsb2FkXCJcclxuXHJcblxyXG59XHJcbiIsIi8vISBtb21lbnQuanNcclxuLy8hIHZlcnNpb24gOiAyLjEzLjBcclxuLy8hIGF1dGhvcnMgOiBUaW0gV29vZCwgSXNrcmVuIENoZXJuZXYsIE1vbWVudC5qcyBjb250cmlidXRvcnNcclxuLy8hIGxpY2Vuc2UgOiBNSVRcclxuLy8hIG1vbWVudGpzLmNvbVxyXG5cclxuOyhmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XHJcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XHJcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxyXG4gICAgZ2xvYmFsLm1vbWVudCA9IGZhY3RvcnkoKVxyXG59KHRoaXMsIGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBob29rQ2FsbGJhY2s7XHJcblxyXG4gICAgZnVuY3Rpb24gdXRpbHNfaG9va3NfX2hvb2tzICgpIHtcclxuICAgICAgICByZXR1cm4gaG9va0NhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhpcyBpcyBkb25lIHRvIHJlZ2lzdGVyIHRoZSBtZXRob2QgY2FsbGVkIHdpdGggbW9tZW50KClcclxuICAgIC8vIHdpdGhvdXQgY3JlYXRpbmcgY2lyY3VsYXIgZGVwZW5kZW5jaWVzLlxyXG4gICAgZnVuY3Rpb24gc2V0SG9va0NhbGxiYWNrIChjYWxsYmFjaykge1xyXG4gICAgICAgIGhvb2tDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzQXJyYXkoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBBcnJheSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBBcnJheV0nO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzRGF0ZShpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIERhdGUgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1hcChhcnIsIGZuKSB7XHJcbiAgICAgICAgdmFyIHJlcyA9IFtdLCBpO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgcmVzLnB1c2goZm4oYXJyW2ldLCBpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFzT3duUHJvcChhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhLCBiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBleHRlbmQoYSwgYikge1xyXG4gICAgICAgIGZvciAodmFyIGkgaW4gYikge1xyXG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChiLCBpKSkge1xyXG4gICAgICAgICAgICAgICAgYVtpXSA9IGJbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoYXNPd25Qcm9wKGIsICd0b1N0cmluZycpKSB7XHJcbiAgICAgICAgICAgIGEudG9TdHJpbmcgPSBiLnRvU3RyaW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhhc093blByb3AoYiwgJ3ZhbHVlT2YnKSkge1xyXG4gICAgICAgICAgICBhLnZhbHVlT2YgPSBiLnZhbHVlT2Y7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVfdXRjX19jcmVhdGVVVEMgKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUxvY2FsT3JVVEMoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QsIHRydWUpLnV0YygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlZmF1bHRQYXJzaW5nRmxhZ3MoKSB7XHJcbiAgICAgICAgLy8gV2UgbmVlZCB0byBkZWVwIGNsb25lIHRoaXMgb2JqZWN0LlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGVtcHR5ICAgICAgICAgICA6IGZhbHNlLFxyXG4gICAgICAgICAgICB1bnVzZWRUb2tlbnMgICAgOiBbXSxcclxuICAgICAgICAgICAgdW51c2VkSW5wdXQgICAgIDogW10sXHJcbiAgICAgICAgICAgIG92ZXJmbG93ICAgICAgICA6IC0yLFxyXG4gICAgICAgICAgICBjaGFyc0xlZnRPdmVyICAgOiAwLFxyXG4gICAgICAgICAgICBudWxsSW5wdXQgICAgICAgOiBmYWxzZSxcclxuICAgICAgICAgICAgaW52YWxpZE1vbnRoICAgIDogbnVsbCxcclxuICAgICAgICAgICAgaW52YWxpZEZvcm1hdCAgIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHVzZXJJbnZhbGlkYXRlZCA6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc28gICAgICAgICAgICAgOiBmYWxzZSxcclxuICAgICAgICAgICAgcGFyc2VkRGF0ZVBhcnRzIDogW10sXHJcbiAgICAgICAgICAgIG1lcmlkaWVtICAgICAgICA6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFBhcnNpbmdGbGFncyhtKSB7XHJcbiAgICAgICAgaWYgKG0uX3BmID09IG51bGwpIHtcclxuICAgICAgICAgICAgbS5fcGYgPSBkZWZhdWx0UGFyc2luZ0ZsYWdzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtLl9wZjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc29tZTtcclxuICAgIGlmIChBcnJheS5wcm90b3R5cGUuc29tZSkge1xyXG4gICAgICAgIHNvbWUgPSBBcnJheS5wcm90b3R5cGUuc29tZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc29tZSA9IGZ1bmN0aW9uIChmdW4pIHtcclxuICAgICAgICAgICAgdmFyIHQgPSBPYmplY3QodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSB0Lmxlbmd0aCA+Pj4gMDtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpIGluIHQgJiYgZnVuLmNhbGwodGhpcywgdFtpXSwgaSwgdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWRfX2lzVmFsaWQobSkge1xyXG4gICAgICAgIGlmIChtLl9pc1ZhbGlkID09IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIGZsYWdzID0gZ2V0UGFyc2luZ0ZsYWdzKG0pO1xyXG4gICAgICAgICAgICB2YXIgcGFyc2VkUGFydHMgPSBzb21lLmNhbGwoZmxhZ3MucGFyc2VkRGF0ZVBhcnRzLCBmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgIT0gbnVsbDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG0uX2lzVmFsaWQgPSAhaXNOYU4obS5fZC5nZXRUaW1lKCkpICYmXHJcbiAgICAgICAgICAgICAgICBmbGFncy5vdmVyZmxvdyA8IDAgJiZcclxuICAgICAgICAgICAgICAgICFmbGFncy5lbXB0eSAmJlxyXG4gICAgICAgICAgICAgICAgIWZsYWdzLmludmFsaWRNb250aCAmJlxyXG4gICAgICAgICAgICAgICAgIWZsYWdzLmludmFsaWRXZWVrZGF5ICYmXHJcbiAgICAgICAgICAgICAgICAhZmxhZ3MubnVsbElucHV0ICYmXHJcbiAgICAgICAgICAgICAgICAhZmxhZ3MuaW52YWxpZEZvcm1hdCAmJlxyXG4gICAgICAgICAgICAgICAgIWZsYWdzLnVzZXJJbnZhbGlkYXRlZCAmJlxyXG4gICAgICAgICAgICAgICAgKCFmbGFncy5tZXJpZGllbSB8fCAoZmxhZ3MubWVyaWRpZW0gJiYgcGFyc2VkUGFydHMpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtLl9zdHJpY3QpIHtcclxuICAgICAgICAgICAgICAgIG0uX2lzVmFsaWQgPSBtLl9pc1ZhbGlkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZ3MuY2hhcnNMZWZ0T3ZlciA9PT0gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWdzLnVudXNlZFRva2Vucy5sZW5ndGggPT09IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICBmbGFncy5iaWdIb3VyID09PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG0uX2lzVmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWRfX2NyZWF0ZUludmFsaWQgKGZsYWdzKSB7XHJcbiAgICAgICAgdmFyIG0gPSBjcmVhdGVfdXRjX19jcmVhdGVVVEMoTmFOKTtcclxuICAgICAgICBpZiAoZmxhZ3MgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBleHRlbmQoZ2V0UGFyc2luZ0ZsYWdzKG0pLCBmbGFncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MobSkudXNlckludmFsaWRhdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzVW5kZWZpbmVkKGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0ID09PSB2b2lkIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUGx1Z2lucyB0aGF0IGFkZCBwcm9wZXJ0aWVzIHNob3VsZCBhbHNvIGFkZCB0aGUga2V5IGhlcmUgKG51bGwgdmFsdWUpLFxyXG4gICAgLy8gc28gd2UgY2FuIHByb3Blcmx5IGNsb25lIG91cnNlbHZlcy5cclxuICAgIHZhciBtb21lbnRQcm9wZXJ0aWVzID0gdXRpbHNfaG9va3NfX2hvb2tzLm1vbWVudFByb3BlcnRpZXMgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb3B5Q29uZmlnKHRvLCBmcm9tKSB7XHJcbiAgICAgICAgdmFyIGksIHByb3AsIHZhbDtcclxuXHJcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pc0FNb21lbnRPYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHRvLl9pc0FNb21lbnRPYmplY3QgPSBmcm9tLl9pc0FNb21lbnRPYmplY3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faSkpIHtcclxuICAgICAgICAgICAgdG8uX2kgPSBmcm9tLl9pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2YpKSB7XHJcbiAgICAgICAgICAgIHRvLl9mID0gZnJvbS5fZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9sKSkge1xyXG4gICAgICAgICAgICB0by5fbCA9IGZyb20uX2w7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fc3RyaWN0KSkge1xyXG4gICAgICAgICAgICB0by5fc3RyaWN0ID0gZnJvbS5fc3RyaWN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3R6bSkpIHtcclxuICAgICAgICAgICAgdG8uX3R6bSA9IGZyb20uX3R6bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pc1VUQykpIHtcclxuICAgICAgICAgICAgdG8uX2lzVVRDID0gZnJvbS5faXNVVEM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fb2Zmc2V0KSkge1xyXG4gICAgICAgICAgICB0by5fb2Zmc2V0ID0gZnJvbS5fb2Zmc2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3BmKSkge1xyXG4gICAgICAgICAgICB0by5fcGYgPSBnZXRQYXJzaW5nRmxhZ3MoZnJvbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fbG9jYWxlKSkge1xyXG4gICAgICAgICAgICB0by5fbG9jYWxlID0gZnJvbS5fbG9jYWxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG1vbWVudFByb3BlcnRpZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGkgaW4gbW9tZW50UHJvcGVydGllcykge1xyXG4gICAgICAgICAgICAgICAgcHJvcCA9IG1vbWVudFByb3BlcnRpZXNbaV07XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBmcm9tW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9bcHJvcF0gPSB2YWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0bztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdXBkYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cclxuICAgIC8vIE1vbWVudCBwcm90b3R5cGUgb2JqZWN0XHJcbiAgICBmdW5jdGlvbiBNb21lbnQoY29uZmlnKSB7XHJcbiAgICAgICAgY29weUNvbmZpZyh0aGlzLCBjb25maWcpO1xyXG4gICAgICAgIHRoaXMuX2QgPSBuZXcgRGF0ZShjb25maWcuX2QgIT0gbnVsbCA/IGNvbmZpZy5fZC5nZXRUaW1lKCkgOiBOYU4pO1xyXG4gICAgICAgIC8vIFByZXZlbnQgaW5maW5pdGUgbG9vcCBpbiBjYXNlIHVwZGF0ZU9mZnNldCBjcmVhdGVzIG5ldyBtb21lbnRcclxuICAgICAgICAvLyBvYmplY3RzLlxyXG4gICAgICAgIGlmICh1cGRhdGVJblByb2dyZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB1cGRhdGVJblByb2dyZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldCh0aGlzKTtcclxuICAgICAgICAgICAgdXBkYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc01vbWVudCAob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIE1vbWVudCB8fCAob2JqICE9IG51bGwgJiYgb2JqLl9pc0FNb21lbnRPYmplY3QgIT0gbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWJzRmxvb3IgKG51bWJlcikge1xyXG4gICAgICAgIGlmIChudW1iZXIgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwobnVtYmVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihudW1iZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b0ludChhcmd1bWVudEZvckNvZXJjaW9uKSB7XHJcbiAgICAgICAgdmFyIGNvZXJjZWROdW1iZXIgPSArYXJndW1lbnRGb3JDb2VyY2lvbixcclxuICAgICAgICAgICAgdmFsdWUgPSAwO1xyXG5cclxuICAgICAgICBpZiAoY29lcmNlZE51bWJlciAhPT0gMCAmJiBpc0Zpbml0ZShjb2VyY2VkTnVtYmVyKSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGFic0Zsb29yKGNvZXJjZWROdW1iZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbXBhcmUgdHdvIGFycmF5cywgcmV0dXJuIHRoZSBudW1iZXIgb2YgZGlmZmVyZW5jZXNcclxuICAgIGZ1bmN0aW9uIGNvbXBhcmVBcnJheXMoYXJyYXkxLCBhcnJheTIsIGRvbnRDb252ZXJ0KSB7XHJcbiAgICAgICAgdmFyIGxlbiA9IE1hdGgubWluKGFycmF5MS5sZW5ndGgsIGFycmF5Mi5sZW5ndGgpLFxyXG4gICAgICAgICAgICBsZW5ndGhEaWZmID0gTWF0aC5hYnMoYXJyYXkxLmxlbmd0aCAtIGFycmF5Mi5sZW5ndGgpLFxyXG4gICAgICAgICAgICBkaWZmcyA9IDAsXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICgoZG9udENvbnZlcnQgJiYgYXJyYXkxW2ldICE9PSBhcnJheTJbaV0pIHx8XHJcbiAgICAgICAgICAgICAgICAoIWRvbnRDb252ZXJ0ICYmIHRvSW50KGFycmF5MVtpXSkgIT09IHRvSW50KGFycmF5MltpXSkpKSB7XHJcbiAgICAgICAgICAgICAgICBkaWZmcysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkaWZmcyArIGxlbmd0aERpZmY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd2Fybihtc2cpIHtcclxuICAgICAgICBpZiAodXRpbHNfaG9va3NfX2hvb2tzLnN1cHByZXNzRGVwcmVjYXRpb25XYXJuaW5ncyA9PT0gZmFsc2UgJiZcclxuICAgICAgICAgICAgICAgICh0eXBlb2YgY29uc29sZSAhPT0gICd1bmRlZmluZWQnKSAmJiBjb25zb2xlLndhcm4pIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdEZXByZWNhdGlvbiB3YXJuaW5nOiAnICsgbXNnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVwcmVjYXRlKG1zZywgZm4pIHtcclxuICAgICAgICB2YXIgZmlyc3RUaW1lID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh1dGlsc19ob29rc19faG9va3MuZGVwcmVjYXRpb25IYW5kbGVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy5kZXByZWNhdGlvbkhhbmRsZXIobnVsbCwgbXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZmlyc3RUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB3YXJuKG1zZyArICdcXG5Bcmd1bWVudHM6ICcgKyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLmpvaW4oJywgJykgKyAnXFxuJyArIChuZXcgRXJyb3IoKSkuc3RhY2spO1xyXG4gICAgICAgICAgICAgICAgZmlyc3RUaW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfSwgZm4pO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZXByZWNhdGlvbnMgPSB7fTtcclxuXHJcbiAgICBmdW5jdGlvbiBkZXByZWNhdGVTaW1wbGUobmFtZSwgbXNnKSB7XHJcbiAgICAgICAgaWYgKHV0aWxzX2hvb2tzX19ob29rcy5kZXByZWNhdGlvbkhhbmRsZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MuZGVwcmVjYXRpb25IYW5kbGVyKG5hbWUsIG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGVwcmVjYXRpb25zW25hbWVdKSB7XHJcbiAgICAgICAgICAgIHdhcm4obXNnKTtcclxuICAgICAgICAgICAgZGVwcmVjYXRpb25zW25hbWVdID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnN1cHByZXNzRGVwcmVjYXRpb25XYXJuaW5ncyA9IGZhbHNlO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmRlcHJlY2F0aW9uSGFuZGxlciA9IG51bGw7XHJcblxyXG4gICAgZnVuY3Rpb24gaXNGdW5jdGlvbihpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIEZ1bmN0aW9uIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNPYmplY3QoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9jYWxlX3NldF9fc2V0IChjb25maWcpIHtcclxuICAgICAgICB2YXIgcHJvcCwgaTtcclxuICAgICAgICBmb3IgKGkgaW4gY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHByb3AgPSBjb25maWdbaV07XHJcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHByb3ApKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2ldID0gcHJvcDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbJ18nICsgaV0gPSBwcm9wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICAvLyBMZW5pZW50IG9yZGluYWwgcGFyc2luZyBhY2NlcHRzIGp1c3QgYSBudW1iZXIgaW4gYWRkaXRpb24gdG9cclxuICAgICAgICAvLyBudW1iZXIgKyAocG9zc2libHkpIHN0dWZmIGNvbWluZyBmcm9tIF9vcmRpbmFsUGFyc2VMZW5pZW50LlxyXG4gICAgICAgIHRoaXMuX29yZGluYWxQYXJzZUxlbmllbnQgPSBuZXcgUmVnRXhwKHRoaXMuX29yZGluYWxQYXJzZS5zb3VyY2UgKyAnfCcgKyAoL1xcZHsxLDJ9Lykuc291cmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtZXJnZUNvbmZpZ3MocGFyZW50Q29uZmlnLCBjaGlsZENvbmZpZykge1xyXG4gICAgICAgIHZhciByZXMgPSBleHRlbmQoe30sIHBhcmVudENvbmZpZyksIHByb3A7XHJcbiAgICAgICAgZm9yIChwcm9wIGluIGNoaWxkQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKGNoaWxkQ29uZmlnLCBwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzT2JqZWN0KHBhcmVudENvbmZpZ1twcm9wXSkgJiYgaXNPYmplY3QoY2hpbGRDb25maWdbcHJvcF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzW3Byb3BdID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5kKHJlc1twcm9wXSwgcGFyZW50Q29uZmlnW3Byb3BdKTtcclxuICAgICAgICAgICAgICAgICAgICBleHRlbmQocmVzW3Byb3BdLCBjaGlsZENvbmZpZ1twcm9wXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoaWxkQ29uZmlnW3Byb3BdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNbcHJvcF0gPSBjaGlsZENvbmZpZ1twcm9wXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHJlc1twcm9wXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIExvY2FsZShjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXQoY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGtleXM7XHJcblxyXG4gICAgaWYgKE9iamVjdC5rZXlzKSB7XHJcbiAgICAgICAga2V5cyA9IE9iamVjdC5rZXlzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBrZXlzID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICB2YXIgaSwgcmVzID0gW107XHJcbiAgICAgICAgICAgIGZvciAoaSBpbiBvYmopIHtcclxuICAgICAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKG9iaiwgaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMucHVzaChpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaW50ZXJuYWwgc3RvcmFnZSBmb3IgbG9jYWxlIGNvbmZpZyBmaWxlc1xyXG4gICAgdmFyIGxvY2FsZXMgPSB7fTtcclxuICAgIHZhciBnbG9iYWxMb2NhbGU7XHJcblxyXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplTG9jYWxlKGtleSkge1xyXG4gICAgICAgIHJldHVybiBrZXkgPyBrZXkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCdfJywgJy0nKSA6IGtleTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwaWNrIHRoZSBsb2NhbGUgZnJvbSB0aGUgYXJyYXlcclxuICAgIC8vIHRyeSBbJ2VuLWF1JywgJ2VuLWdiJ10gYXMgJ2VuLWF1JywgJ2VuLWdiJywgJ2VuJywgYXMgaW4gbW92ZSB0aHJvdWdoIHRoZSBsaXN0IHRyeWluZyBlYWNoXHJcbiAgICAvLyBzdWJzdHJpbmcgZnJvbSBtb3N0IHNwZWNpZmljIHRvIGxlYXN0LCBidXQgbW92ZSB0byB0aGUgbmV4dCBhcnJheSBpdGVtIGlmIGl0J3MgYSBtb3JlIHNwZWNpZmljIHZhcmlhbnQgdGhhbiB0aGUgY3VycmVudCByb290XHJcbiAgICBmdW5jdGlvbiBjaG9vc2VMb2NhbGUobmFtZXMpIHtcclxuICAgICAgICB2YXIgaSA9IDAsIGosIG5leHQsIGxvY2FsZSwgc3BsaXQ7XHJcblxyXG4gICAgICAgIHdoaWxlIChpIDwgbmFtZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHNwbGl0ID0gbm9ybWFsaXplTG9jYWxlKG5hbWVzW2ldKS5zcGxpdCgnLScpO1xyXG4gICAgICAgICAgICBqID0gc3BsaXQubGVuZ3RoO1xyXG4gICAgICAgICAgICBuZXh0ID0gbm9ybWFsaXplTG9jYWxlKG5hbWVzW2kgKyAxXSk7XHJcbiAgICAgICAgICAgIG5leHQgPSBuZXh0ID8gbmV4dC5zcGxpdCgnLScpIDogbnVsbDtcclxuICAgICAgICAgICAgd2hpbGUgKGogPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhbGUgPSBsb2FkTG9jYWxlKHNwbGl0LnNsaWNlKDAsIGopLmpvaW4oJy0nKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChuZXh0ICYmIG5leHQubGVuZ3RoID49IGogJiYgY29tcGFyZUFycmF5cyhzcGxpdCwgbmV4dCwgdHJ1ZSkgPj0gaiAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoZSBuZXh0IGFycmF5IGl0ZW0gaXMgYmV0dGVyIHRoYW4gYSBzaGFsbG93ZXIgc3Vic3RyaW5nIG9mIHRoaXMgb25lXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBqLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkTG9jYWxlKG5hbWUpIHtcclxuICAgICAgICB2YXIgb2xkTG9jYWxlID0gbnVsbDtcclxuICAgICAgICAvLyBUT0RPOiBGaW5kIGEgYmV0dGVyIHdheSB0byByZWdpc3RlciBhbmQgbG9hZCBhbGwgdGhlIGxvY2FsZXMgaW4gTm9kZVxyXG4gICAgICAgIGlmICghbG9jYWxlc1tuYW1lXSAmJiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpICYmXHJcbiAgICAgICAgICAgICAgICBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIG9sZExvY2FsZSA9IGdsb2JhbExvY2FsZS5fYWJicjtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmUoJy4vbG9jYWxlLycgKyBuYW1lKTtcclxuICAgICAgICAgICAgICAgIC8vIGJlY2F1c2UgZGVmaW5lTG9jYWxlIGN1cnJlbnRseSBhbHNvIHNldHMgdGhlIGdsb2JhbCBsb2NhbGUsIHdlXHJcbiAgICAgICAgICAgICAgICAvLyB3YW50IHRvIHVuZG8gdGhhdCBmb3IgbGF6eSBsb2FkZWQgbG9jYWxlc1xyXG4gICAgICAgICAgICAgICAgbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZShvbGRMb2NhbGUpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsZXNbbmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGxvYWQgbG9jYWxlIGFuZCB0aGVuIHNldCB0aGUgZ2xvYmFsIGxvY2FsZS4gIElmXHJcbiAgICAvLyBubyBhcmd1bWVudHMgYXJlIHBhc3NlZCBpbiwgaXQgd2lsbCBzaW1wbHkgcmV0dXJuIHRoZSBjdXJyZW50IGdsb2JhbFxyXG4gICAgLy8gbG9jYWxlIGtleS5cclxuICAgIGZ1bmN0aW9uIGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGUgKGtleSwgdmFsdWVzKSB7XHJcbiAgICAgICAgdmFyIGRhdGE7XHJcbiAgICAgICAgaWYgKGtleSkge1xyXG4gICAgICAgICAgICBpZiAoaXNVbmRlZmluZWQodmFsdWVzKSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUoa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBkZWZpbmVMb2NhbGUoa2V5LCB2YWx1ZXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgLy8gbW9tZW50LmR1cmF0aW9uLl9sb2NhbGUgPSBtb21lbnQuX2xvY2FsZSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWxMb2NhbGUgPSBkYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZ2xvYmFsTG9jYWxlLl9hYmJyO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlZmluZUxvY2FsZSAobmFtZSwgY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25maWcuYWJiciA9IG5hbWU7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGRlcHJlY2F0ZVNpbXBsZSgnZGVmaW5lTG9jYWxlT3ZlcnJpZGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndXNlIG1vbWVudC51cGRhdGVMb2NhbGUobG9jYWxlTmFtZSwgY29uZmlnKSB0byBjaGFuZ2UgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbiBleGlzdGluZyBsb2NhbGUuIG1vbWVudC5kZWZpbmVMb2NhbGUobG9jYWxlTmFtZSwgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb25maWcpIHNob3VsZCBvbmx5IGJlIHVzZWQgZm9yIGNyZWF0aW5nIGEgbmV3IGxvY2FsZScpO1xyXG4gICAgICAgICAgICAgICAgY29uZmlnID0gbWVyZ2VDb25maWdzKGxvY2FsZXNbbmFtZV0uX2NvbmZpZywgY29uZmlnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb25maWcucGFyZW50TG9jYWxlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsb2NhbGVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWcgPSBtZXJnZUNvbmZpZ3MobG9jYWxlc1tjb25maWcucGFyZW50TG9jYWxlXS5fY29uZmlnLCBjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0cmVhdCBhcyBpZiB0aGVyZSBpcyBubyBiYXNlIGNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgICAgIGRlcHJlY2F0ZVNpbXBsZSgncGFyZW50TG9jYWxlVW5kZWZpbmVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzcGVjaWZpZWQgcGFyZW50TG9jYWxlIGlzIG5vdCBkZWZpbmVkIHlldCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxvY2FsZXNbbmFtZV0gPSBuZXcgTG9jYWxlKGNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAvLyBiYWNrd2FyZHMgY29tcGF0IGZvciBub3c6IGFsc28gc2V0IHRoZSBsb2NhbGVcclxuICAgICAgICAgICAgbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZShuYW1lKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHVzZWZ1bCBmb3IgdGVzdGluZ1xyXG4gICAgICAgICAgICBkZWxldGUgbG9jYWxlc1tuYW1lXTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsZShuYW1lLCBjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIGxvY2FsZTtcclxuICAgICAgICAgICAgaWYgKGxvY2FsZXNbbmFtZV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnID0gbWVyZ2VDb25maWdzKGxvY2FsZXNbbmFtZV0uX2NvbmZpZywgY29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsb2NhbGUgPSBuZXcgTG9jYWxlKGNvbmZpZyk7XHJcbiAgICAgICAgICAgIGxvY2FsZS5wYXJlbnRMb2NhbGUgPSBsb2NhbGVzW25hbWVdO1xyXG4gICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbG9jYWxlO1xyXG5cclxuICAgICAgICAgICAgLy8gYmFja3dhcmRzIGNvbXBhdCBmb3Igbm93OiBhbHNvIHNldCB0aGUgbG9jYWxlXHJcbiAgICAgICAgICAgIGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGUobmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gcGFzcyBudWxsIGZvciBjb25maWcgdG8gdW51cGRhdGUsIHVzZWZ1bCBmb3IgdGVzdHNcclxuICAgICAgICAgICAgaWYgKGxvY2FsZXNbbmFtZV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsZXNbbmFtZV0ucGFyZW50TG9jYWxlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbG9jYWxlc1tuYW1lXS5wYXJlbnRMb2NhbGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvY2FsZXNbbmFtZV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBsb2NhbGVzW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJldHVybnMgbG9jYWxlIGRhdGFcclxuICAgIGZ1bmN0aW9uIGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUgKGtleSkge1xyXG4gICAgICAgIHZhciBsb2NhbGU7XHJcblxyXG4gICAgICAgIGlmIChrZXkgJiYga2V5Ll9sb2NhbGUgJiYga2V5Ll9sb2NhbGUuX2FiYnIpIHtcclxuICAgICAgICAgICAga2V5ID0ga2V5Ll9sb2NhbGUuX2FiYnI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2xvYmFsTG9jYWxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc0FycmF5KGtleSkpIHtcclxuICAgICAgICAgICAgLy9zaG9ydC1jaXJjdWl0IGV2ZXJ5dGhpbmcgZWxzZVxyXG4gICAgICAgICAgICBsb2NhbGUgPSBsb2FkTG9jYWxlKGtleSk7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAga2V5ID0gW2tleV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY2hvb3NlTG9jYWxlKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9jYWxlX2xvY2FsZXNfX2xpc3RMb2NhbGVzKCkge1xyXG4gICAgICAgIHJldHVybiBrZXlzKGxvY2FsZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhbGlhc2VzID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkVW5pdEFsaWFzICh1bml0LCBzaG9ydGhhbmQpIHtcclxuICAgICAgICB2YXIgbG93ZXJDYXNlID0gdW5pdC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGFsaWFzZXNbbG93ZXJDYXNlXSA9IGFsaWFzZXNbbG93ZXJDYXNlICsgJ3MnXSA9IGFsaWFzZXNbc2hvcnRoYW5kXSA9IHVuaXQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplVW5pdHModW5pdHMpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHVuaXRzID09PSAnc3RyaW5nJyA/IGFsaWFzZXNbdW5pdHNdIHx8IGFsaWFzZXNbdW5pdHMudG9Mb3dlckNhc2UoKV0gOiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplT2JqZWN0VW5pdHMoaW5wdXRPYmplY3QpIHtcclxuICAgICAgICB2YXIgbm9ybWFsaXplZElucHV0ID0ge30sXHJcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wLFxyXG4gICAgICAgICAgICBwcm9wO1xyXG5cclxuICAgICAgICBmb3IgKHByb3AgaW4gaW5wdXRPYmplY3QpIHtcclxuICAgICAgICAgICAgaWYgKGhhc093blByb3AoaW5wdXRPYmplY3QsIHByb3ApKSB7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkUHJvcCA9IG5vcm1hbGl6ZVVuaXRzKHByb3ApO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRQcm9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplZElucHV0W25vcm1hbGl6ZWRQcm9wXSA9IGlucHV0T2JqZWN0W3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbm9ybWFsaXplZElucHV0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1ha2VHZXRTZXQgKHVuaXQsIGtlZXBUaW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZ2V0X3NldF9fc2V0KHRoaXMsIHVuaXQsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQodGhpcywga2VlcFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0X3NldF9fZ2V0KHRoaXMsIHVuaXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRfc2V0X19nZXQgKG1vbSwgdW5pdCkge1xyXG4gICAgICAgIHJldHVybiBtb20uaXNWYWxpZCgpID9cclxuICAgICAgICAgICAgbW9tLl9kWydnZXQnICsgKG1vbS5faXNVVEMgPyAnVVRDJyA6ICcnKSArIHVuaXRdKCkgOiBOYU47XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0X3NldF9fc2V0IChtb20sIHVuaXQsIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKG1vbS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgbW9tLl9kWydzZXQnICsgKG1vbS5faXNVVEMgPyAnVVRDJyA6ICcnKSArIHVuaXRdKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldCAodW5pdHMsIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIHVuaXQ7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1bml0cyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgZm9yICh1bml0IGluIHVuaXRzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldCh1bml0LCB1bml0c1t1bml0XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcclxuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpc1t1bml0c10pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1t1bml0c10odmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHplcm9GaWxsKG51bWJlciwgdGFyZ2V0TGVuZ3RoLCBmb3JjZVNpZ24pIHtcclxuICAgICAgICB2YXIgYWJzTnVtYmVyID0gJycgKyBNYXRoLmFicyhudW1iZXIpLFxyXG4gICAgICAgICAgICB6ZXJvc1RvRmlsbCA9IHRhcmdldExlbmd0aCAtIGFic051bWJlci5sZW5ndGgsXHJcbiAgICAgICAgICAgIHNpZ24gPSBudW1iZXIgPj0gMDtcclxuICAgICAgICByZXR1cm4gKHNpZ24gPyAoZm9yY2VTaWduID8gJysnIDogJycpIDogJy0nKSArXHJcbiAgICAgICAgICAgIE1hdGgucG93KDEwLCBNYXRoLm1heCgwLCB6ZXJvc1RvRmlsbCkpLnRvU3RyaW5nKCkuc3Vic3RyKDEpICsgYWJzTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBmb3JtYXR0aW5nVG9rZW5zID0gLyhcXFtbXlxcW10qXFxdKXwoXFxcXCk/KFtIaF1tbShzcyk/fE1vfE1NP00/TT98RG98REREb3xERD9EP0Q/fGRkZD9kP3xkbz98d1tvfHddP3xXW298V10/fFFvP3xZWVlZWVl8WVlZWVl8WVlZWXxZWXxnZyhnZ2c/KT98R0coR0dHPyk/fGV8RXxhfEF8aGg/fEhIP3xraz98bW0/fHNzP3xTezEsOX18eHxYfHp6P3xaWj98LikvZztcclxuXHJcbiAgICB2YXIgbG9jYWxGb3JtYXR0aW5nVG9rZW5zID0gLyhcXFtbXlxcW10qXFxdKXwoXFxcXCk/KExUU3xMVHxMTD9MP0w/fGx7MSw0fSkvZztcclxuXHJcbiAgICB2YXIgZm9ybWF0RnVuY3Rpb25zID0ge307XHJcblxyXG4gICAgdmFyIGZvcm1hdFRva2VuRnVuY3Rpb25zID0ge307XHJcblxyXG4gICAgLy8gdG9rZW46ICAgICdNJ1xyXG4gICAgLy8gcGFkZGVkOiAgIFsnTU0nLCAyXVxyXG4gICAgLy8gb3JkaW5hbDogICdNbydcclxuICAgIC8vIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7IHRoaXMubW9udGgoKSArIDEgfVxyXG4gICAgZnVuY3Rpb24gYWRkRm9ybWF0VG9rZW4gKHRva2VuLCBwYWRkZWQsIG9yZGluYWwsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIGZ1bmMgPSBjYWxsYmFjaztcclxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBmdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbY2FsbGJhY2tdKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1t0b2tlbl0gPSBmdW5jO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFkZGVkKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW3BhZGRlZFswXV0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gemVyb0ZpbGwoZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCBwYWRkZWRbMV0sIHBhZGRlZFsyXSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcmRpbmFsKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW29yZGluYWxdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm9yZGluYWwoZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCB0b2tlbik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZUZvcm1hdHRpbmdUb2tlbnMoaW5wdXQpIHtcclxuICAgICAgICBpZiAoaW5wdXQubWF0Y2goL1xcW1tcXHNcXFNdLykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL15cXFt8XFxdJC9nLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9cXFxcL2csICcnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYWtlRm9ybWF0RnVuY3Rpb24oZm9ybWF0KSB7XHJcbiAgICAgICAgdmFyIGFycmF5ID0gZm9ybWF0Lm1hdGNoKGZvcm1hdHRpbmdUb2tlbnMpLCBpLCBsZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChmb3JtYXRUb2tlbkZ1bmN0aW9uc1thcnJheVtpXV0pIHtcclxuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gZm9ybWF0VG9rZW5GdW5jdGlvbnNbYXJyYXlbaV1dO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXJyYXlbaV0gPSByZW1vdmVGb3JtYXR0aW5nVG9rZW5zKGFycmF5W2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtb20pIHtcclxuICAgICAgICAgICAgdmFyIG91dHB1dCA9ICcnLCBpO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCArPSBhcnJheVtpXSBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gYXJyYXlbaV0uY2FsbChtb20sIGZvcm1hdCkgOiBhcnJheVtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZm9ybWF0IGRhdGUgdXNpbmcgbmF0aXZlIGRhdGUgb2JqZWN0XHJcbiAgICBmdW5jdGlvbiBmb3JtYXRNb21lbnQobSwgZm9ybWF0KSB7XHJcbiAgICAgICAgaWYgKCFtLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbS5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcm1hdCA9IGV4cGFuZEZvcm1hdChmb3JtYXQsIG0ubG9jYWxlRGF0YSgpKTtcclxuICAgICAgICBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XSA9IGZvcm1hdEZ1bmN0aW9uc1tmb3JtYXRdIHx8IG1ha2VGb3JtYXRGdW5jdGlvbihmb3JtYXQpO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0obSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZXhwYW5kRm9ybWF0KGZvcm1hdCwgbG9jYWxlKSB7XHJcbiAgICAgICAgdmFyIGkgPSA1O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlTG9uZ0RhdGVGb3JtYXRUb2tlbnMoaW5wdXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZS5sb25nRGF0ZUZvcm1hdChpbnB1dCkgfHwgaW5wdXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2NhbEZvcm1hdHRpbmdUb2tlbnMubGFzdEluZGV4ID0gMDtcclxuICAgICAgICB3aGlsZSAoaSA+PSAwICYmIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy50ZXN0KGZvcm1hdCkpIHtcclxuICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UobG9jYWxGb3JtYXR0aW5nVG9rZW5zLCByZXBsYWNlTG9uZ0RhdGVGb3JtYXRUb2tlbnMpO1xyXG4gICAgICAgICAgICBsb2NhbEZvcm1hdHRpbmdUb2tlbnMubGFzdEluZGV4ID0gMDtcclxuICAgICAgICAgICAgaSAtPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbWF0Y2gxICAgICAgICAgPSAvXFxkLzsgICAgICAgICAgICAvLyAgICAgICAwIC0gOVxyXG4gICAgdmFyIG1hdGNoMiAgICAgICAgID0gL1xcZFxcZC87ICAgICAgICAgIC8vICAgICAgMDAgLSA5OVxyXG4gICAgdmFyIG1hdGNoMyAgICAgICAgID0gL1xcZHszfS87ICAgICAgICAgLy8gICAgIDAwMCAtIDk5OVxyXG4gICAgdmFyIG1hdGNoNCAgICAgICAgID0gL1xcZHs0fS87ICAgICAgICAgLy8gICAgMDAwMCAtIDk5OTlcclxuICAgIHZhciBtYXRjaDYgICAgICAgICA9IC9bKy1dP1xcZHs2fS87ICAgIC8vIC05OTk5OTkgLSA5OTk5OTlcclxuICAgIHZhciBtYXRjaDF0bzIgICAgICA9IC9cXGRcXGQ/LzsgICAgICAgICAvLyAgICAgICAwIC0gOTlcclxuICAgIHZhciBtYXRjaDN0bzQgICAgICA9IC9cXGRcXGRcXGRcXGQ/LzsgICAgIC8vICAgICA5OTkgLSA5OTk5XHJcbiAgICB2YXIgbWF0Y2g1dG82ICAgICAgPSAvXFxkXFxkXFxkXFxkXFxkXFxkPy87IC8vICAgOTk5OTkgLSA5OTk5OTlcclxuICAgIHZhciBtYXRjaDF0bzMgICAgICA9IC9cXGR7MSwzfS87ICAgICAgIC8vICAgICAgIDAgLSA5OTlcclxuICAgIHZhciBtYXRjaDF0bzQgICAgICA9IC9cXGR7MSw0fS87ICAgICAgIC8vICAgICAgIDAgLSA5OTk5XHJcbiAgICB2YXIgbWF0Y2gxdG82ICAgICAgPSAvWystXT9cXGR7MSw2fS87ICAvLyAtOTk5OTk5IC0gOTk5OTk5XHJcblxyXG4gICAgdmFyIG1hdGNoVW5zaWduZWQgID0gL1xcZCsvOyAgICAgICAgICAgLy8gICAgICAgMCAtIGluZlxyXG4gICAgdmFyIG1hdGNoU2lnbmVkICAgID0gL1srLV0/XFxkKy87ICAgICAgLy8gICAgLWluZiAtIGluZlxyXG5cclxuICAgIHZhciBtYXRjaE9mZnNldCAgICA9IC9afFsrLV1cXGRcXGQ6P1xcZFxcZC9naTsgLy8gKzAwOjAwIC0wMDowMCArMDAwMCAtMDAwMCBvciBaXHJcbiAgICB2YXIgbWF0Y2hTaG9ydE9mZnNldCA9IC9afFsrLV1cXGRcXGQoPzo6P1xcZFxcZCk/L2dpOyAvLyArMDAgLTAwICswMDowMCAtMDA6MDAgKzAwMDAgLTAwMDAgb3IgWlxyXG5cclxuICAgIHZhciBtYXRjaFRpbWVzdGFtcCA9IC9bKy1dP1xcZCsoXFwuXFxkezEsM30pPy87IC8vIDEyMzQ1Njc4OSAxMjM0NTY3ODkuMTIzXHJcblxyXG4gICAgLy8gYW55IHdvcmQgKG9yIHR3bykgY2hhcmFjdGVycyBvciBudW1iZXJzIGluY2x1ZGluZyB0d28vdGhyZWUgd29yZCBtb250aCBpbiBhcmFiaWMuXHJcbiAgICAvLyBpbmNsdWRlcyBzY290dGlzaCBnYWVsaWMgdHdvIHdvcmQgYW5kIGh5cGhlbmF0ZWQgbW9udGhzXHJcbiAgICB2YXIgbWF0Y2hXb3JkID0gL1swLTldKlsnYS16XFx1MDBBMC1cXHUwNUZGXFx1MDcwMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSt8W1xcdTA2MDAtXFx1MDZGRlxcL10rKFxccyo/W1xcdTA2MDAtXFx1MDZGRl0rKXsxLDJ9L2k7XHJcblxyXG5cclxuICAgIHZhciByZWdleGVzID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkUmVnZXhUb2tlbiAodG9rZW4sIHJlZ2V4LCBzdHJpY3RSZWdleCkge1xyXG4gICAgICAgIHJlZ2V4ZXNbdG9rZW5dID0gaXNGdW5jdGlvbihyZWdleCkgPyByZWdleCA6IGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGlzU3RyaWN0ICYmIHN0cmljdFJlZ2V4KSA/IHN0cmljdFJlZ2V4IDogcmVnZXg7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4gKHRva2VuLCBjb25maWcpIHtcclxuICAgICAgICBpZiAoIWhhc093blByb3AocmVnZXhlcywgdG9rZW4pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKHVuZXNjYXBlRm9ybWF0KHRva2VuKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVnZXhlc1t0b2tlbl0oY29uZmlnLl9zdHJpY3QsIGNvbmZpZy5fbG9jYWxlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDb2RlIGZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNTYxNDkzL2lzLXRoZXJlLWEtcmVnZXhwLWVzY2FwZS1mdW5jdGlvbi1pbi1qYXZhc2NyaXB0XHJcbiAgICBmdW5jdGlvbiB1bmVzY2FwZUZvcm1hdChzKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlZ2V4RXNjYXBlKHMucmVwbGFjZSgnXFxcXCcsICcnKS5yZXBsYWNlKC9cXFxcKFxcWyl8XFxcXChcXF0pfFxcWyhbXlxcXVxcW10qKVxcXXxcXFxcKC4pL2csIGZ1bmN0aW9uIChtYXRjaGVkLCBwMSwgcDIsIHAzLCBwNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcDEgfHwgcDIgfHwgcDMgfHwgcDQ7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlZ2V4RXNjYXBlKHMpIHtcclxuICAgICAgICByZXR1cm4gcy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdG9rZW5zID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkUGFyc2VUb2tlbiAodG9rZW4sIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIGksIGZ1bmMgPSBjYWxsYmFjaztcclxuICAgICAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0b2tlbiA9IFt0b2tlbl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIGZ1bmMgPSBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICBhcnJheVtjYWxsYmFja10gPSB0b0ludChpbnB1dCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0b2tlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0b2tlbnNbdG9rZW5baV1dID0gZnVuYztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkV2Vla1BhcnNlVG9rZW4gKHRva2VuLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGFkZFBhcnNlVG9rZW4odG9rZW4sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZywgdG9rZW4pIHtcclxuICAgICAgICAgICAgY29uZmlnLl93ID0gY29uZmlnLl93IHx8IHt9O1xyXG4gICAgICAgICAgICBjYWxsYmFjayhpbnB1dCwgY29uZmlnLl93LCBjb25maWcsIHRva2VuKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRUaW1lVG9BcnJheUZyb21Ub2tlbih0b2tlbiwgaW5wdXQsIGNvbmZpZykge1xyXG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsICYmIGhhc093blByb3AodG9rZW5zLCB0b2tlbikpIHtcclxuICAgICAgICAgICAgdG9rZW5zW3Rva2VuXShpbnB1dCwgY29uZmlnLl9hLCBjb25maWcsIHRva2VuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIFlFQVIgPSAwO1xyXG4gICAgdmFyIE1PTlRIID0gMTtcclxuICAgIHZhciBEQVRFID0gMjtcclxuICAgIHZhciBIT1VSID0gMztcclxuICAgIHZhciBNSU5VVEUgPSA0O1xyXG4gICAgdmFyIFNFQ09ORCA9IDU7XHJcbiAgICB2YXIgTUlMTElTRUNPTkQgPSA2O1xyXG4gICAgdmFyIFdFRUsgPSA3O1xyXG4gICAgdmFyIFdFRUtEQVkgPSA4O1xyXG5cclxuICAgIHZhciBpbmRleE9mO1xyXG5cclxuICAgIGlmIChBcnJheS5wcm90b3R5cGUuaW5kZXhPZikge1xyXG4gICAgICAgIGluZGV4T2YgPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5kZXhPZiA9IGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgICAgIC8vIEkga25vd1xyXG4gICAgICAgICAgICB2YXIgaTtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzW2ldID09PSBvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGF5c0luTW9udGgoeWVhciwgbW9udGgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoeWVhciwgbW9udGggKyAxLCAwKSkuZ2V0VVRDRGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignTScsIFsnTU0nLCAyXSwgJ01vJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnRoKCkgKyAxO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ01NTScsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzU2hvcnQodGhpcywgZm9ybWF0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdNTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tb250aHModGhpcywgZm9ybWF0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFMSUFTRVNcclxuXHJcbiAgICBhZGRVbml0QWxpYXMoJ21vbnRoJywgJ00nKTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbignTScsICAgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdNTScsICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignTU1NJywgIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5tb250aHNTaG9ydFJlZ2V4KGlzU3RyaWN0KTtcclxuICAgIH0pO1xyXG4gICAgYWRkUmVnZXhUb2tlbignTU1NTScsIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5tb250aHNSZWdleChpc1N0cmljdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRQYXJzZVRva2VuKFsnTScsICdNTSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XHJcbiAgICAgICAgYXJyYXlbTU9OVEhdID0gdG9JbnQoaW5wdXQpIC0gMTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZFBhcnNlVG9rZW4oWydNTU0nLCAnTU1NTSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcsIHRva2VuKSB7XHJcbiAgICAgICAgdmFyIG1vbnRoID0gY29uZmlnLl9sb2NhbGUubW9udGhzUGFyc2UoaW5wdXQsIHRva2VuLCBjb25maWcuX3N0cmljdCk7XHJcbiAgICAgICAgLy8gaWYgd2UgZGlkbid0IGZpbmQgYSBtb250aCBuYW1lLCBtYXJrIHRoZSBkYXRlIGFzIGludmFsaWQuXHJcbiAgICAgICAgaWYgKG1vbnRoICE9IG51bGwpIHtcclxuICAgICAgICAgICAgYXJyYXlbTU9OVEhdID0gbW9udGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZE1vbnRoID0gaW5wdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTE9DQUxFU1xyXG5cclxuICAgIHZhciBNT05USFNfSU5fRk9STUFUID0gL0Rbb0RdPyhcXFtbXlxcW1xcXV0qXFxdfFxccyspK01NTU0/LztcclxuICAgIHZhciBkZWZhdWx0TG9jYWxlTW9udGhzID0gJ0phbnVhcnlfRmVicnVhcnlfTWFyY2hfQXByaWxfTWF5X0p1bmVfSnVseV9BdWd1c3RfU2VwdGVtYmVyX09jdG9iZXJfTm92ZW1iZXJfRGVjZW1iZXInLnNwbGl0KCdfJyk7XHJcbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHMgKG0sIGZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX21vbnRocykgPyB0aGlzLl9tb250aHNbbS5tb250aCgpXSA6XHJcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1tNT05USFNfSU5fRk9STUFULnRlc3QoZm9ybWF0KSA/ICdmb3JtYXQnIDogJ3N0YW5kYWxvbmUnXVttLm1vbnRoKCldO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0TG9jYWxlTW9udGhzU2hvcnQgPSAnSmFuX0ZlYl9NYXJfQXByX01heV9KdW5fSnVsX0F1Z19TZXBfT2N0X05vdl9EZWMnLnNwbGl0KCdfJyk7XHJcbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHNTaG9ydCAobSwgZm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fbW9udGhzU2hvcnQpID8gdGhpcy5fbW9udGhzU2hvcnRbbS5tb250aCgpXSA6XHJcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1Nob3J0W01PTlRIU19JTl9GT1JNQVQudGVzdChmb3JtYXQpID8gJ2Zvcm1hdCcgOiAnc3RhbmRhbG9uZSddW20ubW9udGgoKV07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdW5pdHNfbW9udGhfX2hhbmRsZVN0cmljdFBhcnNlKG1vbnRoTmFtZSwgZm9ybWF0LCBzdHJpY3QpIHtcclxuICAgICAgICB2YXIgaSwgaWksIG1vbSwgbGxjID0gbW9udGhOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tb250aHNQYXJzZSkge1xyXG4gICAgICAgICAgICAvLyB0aGlzIGlzIG5vdCB1c2VkXHJcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1BhcnNlID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlID0gW107XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBtb20gPSBjcmVhdGVfdXRjX19jcmVhdGVVVEMoWzIwMDAsIGldKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0gPSB0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0gPSB0aGlzLm1vbnRocyhtb20sICcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RyaWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdNTU0nKSB7XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydE1vbnRoc1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX2xvbmdNb250aHNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSAnTU1NJykge1xyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9sb25nTW9udGhzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbG9uZ01vbnRoc1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0TW9udGhzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxvY2FsZU1vbnRoc1BhcnNlIChtb250aE5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XHJcbiAgICAgICAgdmFyIGksIG1vbSwgcmVnZXg7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tb250aHNQYXJzZUV4YWN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bml0c19tb250aF9faGFuZGxlU3RyaWN0UGFyc2UuY2FsbCh0aGlzLCBtb250aE5hbWUsIGZvcm1hdCwgc3RyaWN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fbW9udGhzUGFyc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fbW9udGhzUGFyc2UgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRPRE86IGFkZCBzb3J0aW5nXHJcbiAgICAgICAgLy8gU29ydGluZyBtYWtlcyBzdXJlIGlmIG9uZSBtb250aCAob3IgYWJicikgaXMgYSBwcmVmaXggb2YgYW5vdGhlclxyXG4gICAgICAgIC8vIHNlZSBzb3J0aW5nIGluIGNvbXB1dGVNb250aHNQYXJzZVxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxyXG4gICAgICAgICAgICBtb20gPSBjcmVhdGVfdXRjX19jcmVhdGVVVEMoWzIwMDAsIGldKTtcclxuICAgICAgICAgICAgaWYgKHN0cmljdCAmJiAhdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMubW9udGhzKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnJykgKyAnJCcsICdpJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnJykgKyAnJCcsICdpJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzdHJpY3QgJiYgIXRoaXMuX21vbnRoc1BhcnNlW2ldKSB7XHJcbiAgICAgICAgICAgICAgICByZWdleCA9ICdeJyArIHRoaXMubW9udGhzKG1vbSwgJycpICsgJ3xeJyArIHRoaXMubW9udGhzU2hvcnQobW9tLCAnJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAocmVnZXgucmVwbGFjZSgnLicsICcnKSwgJ2knKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB0ZXN0IHRoZSByZWdleFxyXG4gICAgICAgICAgICBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ01NTU0nICYmIHRoaXMuX2xvbmdNb250aHNQYXJzZVtpXS50ZXN0KG1vbnRoTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdNTU0nICYmIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmIHRoaXMuX21vbnRoc1BhcnNlW2ldLnRlc3QobW9udGhOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIGZ1bmN0aW9uIHNldE1vbnRoIChtb20sIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGRheU9mTW9udGg7XHJcblxyXG4gICAgICAgIGlmICghbW9tLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAvLyBObyBvcFxyXG4gICAgICAgICAgICByZXR1cm4gbW9tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgaWYgKC9eXFxkKyQvLnRlc3QodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRvSW50KHZhbHVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gbW9tLmxvY2FsZURhdGEoKS5tb250aHNQYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBBbm90aGVyIHNpbGVudCBmYWlsdXJlP1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXlPZk1vbnRoID0gTWF0aC5taW4obW9tLmRhdGUoKSwgZGF5c0luTW9udGgobW9tLnllYXIoKSwgdmFsdWUpKTtcclxuICAgICAgICBtb20uX2RbJ3NldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgJ01vbnRoJ10odmFsdWUsIGRheU9mTW9udGgpO1xyXG4gICAgICAgIHJldHVybiBtb207XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0TW9udGggKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgc2V0TW9udGgodGhpcywgdmFsdWUpO1xyXG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0X3NldF9fZ2V0KHRoaXMsICdNb250aCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXREYXlzSW5Nb250aCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGRheXNJbk1vbnRoKHRoaXMueWVhcigpLCB0aGlzLm1vbnRoKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0TW9udGhzU2hvcnRSZWdleCA9IG1hdGNoV29yZDtcclxuICAgIGZ1bmN0aW9uIG1vbnRoc1Nob3J0UmVnZXggKGlzU3RyaWN0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21vbnRoc1BhcnNlRXhhY3QpIHtcclxuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfbW9udGhzUmVnZXgnKSkge1xyXG4gICAgICAgICAgICAgICAgY29tcHV0ZU1vbnRoc1BhcnNlLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFJlZ2V4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleCA6IHRoaXMuX21vbnRoc1Nob3J0UmVnZXg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0TW9udGhzUmVnZXggPSBtYXRjaFdvcmQ7XHJcbiAgICBmdW5jdGlvbiBtb250aHNSZWdleCAoaXNTdHJpY3QpIHtcclxuICAgICAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xyXG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNSZWdleCcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wdXRlTW9udGhzUGFyc2UuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNTdHJpY3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTdHJpY3RSZWdleDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNSZWdleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb250aHNTdHJpY3RSZWdleCA6IHRoaXMuX21vbnRoc1JlZ2V4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb21wdXRlTW9udGhzUGFyc2UgKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNtcExlblJldihhLCBiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHNob3J0UGllY2VzID0gW10sIGxvbmdQaWVjZXMgPSBbXSwgbWl4ZWRQaWVjZXMgPSBbXSxcclxuICAgICAgICAgICAgaSwgbW9tO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxyXG4gICAgICAgICAgICBtb20gPSBjcmVhdGVfdXRjX19jcmVhdGVVVEMoWzIwMDAsIGldKTtcclxuICAgICAgICAgICAgc2hvcnRQaWVjZXMucHVzaCh0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpKTtcclxuICAgICAgICAgICAgbG9uZ1BpZWNlcy5wdXNoKHRoaXMubW9udGhzKG1vbSwgJycpKTtcclxuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaCh0aGlzLm1vbnRocyhtb20sICcnKSk7XHJcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2godGhpcy5tb250aHNTaG9ydChtb20sICcnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNvcnRpbmcgbWFrZXMgc3VyZSBpZiBvbmUgbW9udGggKG9yIGFiYnIpIGlzIGEgcHJlZml4IG9mIGFub3RoZXIgaXRcclxuICAgICAgICAvLyB3aWxsIG1hdGNoIHRoZSBsb25nZXIgcGllY2UuXHJcbiAgICAgICAgc2hvcnRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xyXG4gICAgICAgIGxvbmdQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xyXG4gICAgICAgIG1peGVkUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xyXG4gICAgICAgICAgICBzaG9ydFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKHNob3J0UGllY2VzW2ldKTtcclxuICAgICAgICAgICAgbG9uZ1BpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKGxvbmdQaWVjZXNbaV0pO1xyXG4gICAgICAgICAgICBtaXhlZFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKG1peGVkUGllY2VzW2ldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX21vbnRoc1JlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbWl4ZWRQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xyXG4gICAgICAgIHRoaXMuX21vbnRoc1Nob3J0UmVnZXggPSB0aGlzLl9tb250aHNSZWdleDtcclxuICAgICAgICB0aGlzLl9tb250aHNTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIGxvbmdQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xyXG4gICAgICAgIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBzaG9ydFBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tPdmVyZmxvdyAobSkge1xyXG4gICAgICAgIHZhciBvdmVyZmxvdztcclxuICAgICAgICB2YXIgYSA9IG0uX2E7XHJcblxyXG4gICAgICAgIGlmIChhICYmIGdldFBhcnNpbmdGbGFncyhtKS5vdmVyZmxvdyA9PT0gLTIpIHtcclxuICAgICAgICAgICAgb3ZlcmZsb3cgPVxyXG4gICAgICAgICAgICAgICAgYVtNT05USF0gICAgICAgPCAwIHx8IGFbTU9OVEhdICAgICAgID4gMTEgID8gTU9OVEggOlxyXG4gICAgICAgICAgICAgICAgYVtEQVRFXSAgICAgICAgPCAxIHx8IGFbREFURV0gICAgICAgID4gZGF5c0luTW9udGgoYVtZRUFSXSwgYVtNT05USF0pID8gREFURSA6XHJcbiAgICAgICAgICAgICAgICBhW0hPVVJdICAgICAgICA8IDAgfHwgYVtIT1VSXSAgICAgICAgPiAyNCB8fCAoYVtIT1VSXSA9PT0gMjQgJiYgKGFbTUlOVVRFXSAhPT0gMCB8fCBhW1NFQ09ORF0gIT09IDAgfHwgYVtNSUxMSVNFQ09ORF0gIT09IDApKSA/IEhPVVIgOlxyXG4gICAgICAgICAgICAgICAgYVtNSU5VVEVdICAgICAgPCAwIHx8IGFbTUlOVVRFXSAgICAgID4gNTkgID8gTUlOVVRFIDpcclxuICAgICAgICAgICAgICAgIGFbU0VDT05EXSAgICAgIDwgMCB8fCBhW1NFQ09ORF0gICAgICA+IDU5ICA/IFNFQ09ORCA6XHJcbiAgICAgICAgICAgICAgICBhW01JTExJU0VDT05EXSA8IDAgfHwgYVtNSUxMSVNFQ09ORF0gPiA5OTkgPyBNSUxMSVNFQ09ORCA6XHJcbiAgICAgICAgICAgICAgICAtMTtcclxuXHJcbiAgICAgICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MobSkuX292ZXJmbG93RGF5T2ZZZWFyICYmIChvdmVyZmxvdyA8IFlFQVIgfHwgb3ZlcmZsb3cgPiBEQVRFKSkge1xyXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3cgPSBEQVRFO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MobSkuX292ZXJmbG93V2Vla3MgJiYgb3ZlcmZsb3cgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBvdmVyZmxvdyA9IFdFRUs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGdldFBhcnNpbmdGbGFncyhtKS5fb3ZlcmZsb3dXZWVrZGF5ICYmIG92ZXJmbG93ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3cgPSBXRUVLREFZO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MobSkub3ZlcmZsb3cgPSBvdmVyZmxvdztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlzbyA4NjAxIHJlZ2V4XHJcbiAgICAvLyAwMDAwLTAwLTAwIDAwMDAtVzAwIG9yIDAwMDAtVzAwLTAgKyBUICsgMDAgb3IgMDA6MDAgb3IgMDA6MDA6MDAgb3IgMDA6MDA6MDAuMDAwICsgKzAwOjAwIG9yICswMDAwIG9yICswMClcclxuICAgIHZhciBleHRlbmRlZElzb1JlZ2V4ID0gL15cXHMqKCg/OlsrLV1cXGR7Nn18XFxkezR9KS0oPzpcXGRcXGQtXFxkXFxkfFdcXGRcXGQtXFxkfFdcXGRcXGR8XFxkXFxkXFxkfFxcZFxcZCkpKD86KFR8ICkoXFxkXFxkKD86OlxcZFxcZCg/OjpcXGRcXGQoPzpbLixdXFxkKyk/KT8pPykoW1xcK1xcLV1cXGRcXGQoPzo6P1xcZFxcZCk/fFxccypaKT8pPy87XHJcbiAgICB2YXIgYmFzaWNJc29SZWdleCA9IC9eXFxzKigoPzpbKy1dXFxkezZ9fFxcZHs0fSkoPzpcXGRcXGRcXGRcXGR8V1xcZFxcZFxcZHxXXFxkXFxkfFxcZFxcZFxcZHxcXGRcXGQpKSg/OihUfCApKFxcZFxcZCg/OlxcZFxcZCg/OlxcZFxcZCg/OlsuLF1cXGQrKT8pPyk/KShbXFwrXFwtXVxcZFxcZCg/Ojo/XFxkXFxkKT98XFxzKlopPyk/LztcclxuXHJcbiAgICB2YXIgdHpSZWdleCA9IC9afFsrLV1cXGRcXGQoPzo6P1xcZFxcZCk/LztcclxuXHJcbiAgICB2YXIgaXNvRGF0ZXMgPSBbXHJcbiAgICAgICAgWydZWVlZWVktTU0tREQnLCAvWystXVxcZHs2fS1cXGRcXGQtXFxkXFxkL10sXHJcbiAgICAgICAgWydZWVlZLU1NLUREJywgL1xcZHs0fS1cXGRcXGQtXFxkXFxkL10sXHJcbiAgICAgICAgWydHR0dHLVtXXVdXLUUnLCAvXFxkezR9LVdcXGRcXGQtXFxkL10sXHJcbiAgICAgICAgWydHR0dHLVtXXVdXJywgL1xcZHs0fS1XXFxkXFxkLywgZmFsc2VdLFxyXG4gICAgICAgIFsnWVlZWS1EREQnLCAvXFxkezR9LVxcZHszfS9dLFxyXG4gICAgICAgIFsnWVlZWS1NTScsIC9cXGR7NH0tXFxkXFxkLywgZmFsc2VdLFxyXG4gICAgICAgIFsnWVlZWVlZTU1ERCcsIC9bKy1dXFxkezEwfS9dLFxyXG4gICAgICAgIFsnWVlZWU1NREQnLCAvXFxkezh9L10sXHJcbiAgICAgICAgLy8gWVlZWU1NIGlzIE5PVCBhbGxvd2VkIGJ5IHRoZSBzdGFuZGFyZFxyXG4gICAgICAgIFsnR0dHR1tXXVdXRScsIC9cXGR7NH1XXFxkezN9L10sXHJcbiAgICAgICAgWydHR0dHW1ddV1cnLCAvXFxkezR9V1xcZHsyfS8sIGZhbHNlXSxcclxuICAgICAgICBbJ1lZWVlEREQnLCAvXFxkezd9L11cclxuICAgIF07XHJcblxyXG4gICAgLy8gaXNvIHRpbWUgZm9ybWF0cyBhbmQgcmVnZXhlc1xyXG4gICAgdmFyIGlzb1RpbWVzID0gW1xyXG4gICAgICAgIFsnSEg6bW06c3MuU1NTUycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZFxcLlxcZCsvXSxcclxuICAgICAgICBbJ0hIOm1tOnNzLFNTU1MnLCAvXFxkXFxkOlxcZFxcZDpcXGRcXGQsXFxkKy9dLFxyXG4gICAgICAgIFsnSEg6bW06c3MnLCAvXFxkXFxkOlxcZFxcZDpcXGRcXGQvXSxcclxuICAgICAgICBbJ0hIOm1tJywgL1xcZFxcZDpcXGRcXGQvXSxcclxuICAgICAgICBbJ0hIbW1zcy5TU1NTJywgL1xcZFxcZFxcZFxcZFxcZFxcZFxcLlxcZCsvXSxcclxuICAgICAgICBbJ0hIbW1zcyxTU1NTJywgL1xcZFxcZFxcZFxcZFxcZFxcZCxcXGQrL10sXHJcbiAgICAgICAgWydISG1tc3MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkL10sXHJcbiAgICAgICAgWydISG1tJywgL1xcZFxcZFxcZFxcZC9dLFxyXG4gICAgICAgIFsnSEgnLCAvXFxkXFxkL11cclxuICAgIF07XHJcblxyXG4gICAgdmFyIGFzcE5ldEpzb25SZWdleCA9IC9eXFwvP0RhdGVcXCgoXFwtP1xcZCspL2k7XHJcblxyXG4gICAgLy8gZGF0ZSBmcm9tIGlzbyBmb3JtYXRcclxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21JU08oY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIGksIGwsXHJcbiAgICAgICAgICAgIHN0cmluZyA9IGNvbmZpZy5faSxcclxuICAgICAgICAgICAgbWF0Y2ggPSBleHRlbmRlZElzb1JlZ2V4LmV4ZWMoc3RyaW5nKSB8fCBiYXNpY0lzb1JlZ2V4LmV4ZWMoc3RyaW5nKSxcclxuICAgICAgICAgICAgYWxsb3dUaW1lLCBkYXRlRm9ybWF0LCB0aW1lRm9ybWF0LCB0ekZvcm1hdDtcclxuXHJcbiAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmlzbyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gaXNvRGF0ZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNvRGF0ZXNbaV1bMV0uZXhlYyhtYXRjaFsxXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRlRm9ybWF0ID0gaXNvRGF0ZXNbaV1bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dUaW1lID0gaXNvRGF0ZXNbaV1bMl0gIT09IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRlRm9ybWF0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtYXRjaFszXSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgbCA9IGlzb1RpbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc29UaW1lc1tpXVsxXS5leGVjKG1hdGNoWzNdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtYXRjaFsyXSBzaG91bGQgYmUgJ1QnIG9yIHNwYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVGb3JtYXQgPSAobWF0Y2hbMl0gfHwgJyAnKSArIGlzb1RpbWVzW2ldWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGltZUZvcm1hdCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghYWxsb3dUaW1lICYmIHRpbWVGb3JtYXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1hdGNoWzRdKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHpSZWdleC5leGVjKG1hdGNoWzRdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHR6Rm9ybWF0ID0gJ1onO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uZmlnLl9mID0gZGF0ZUZvcm1hdCArICh0aW1lRm9ybWF0IHx8ICcnKSArICh0ekZvcm1hdCB8fCAnJyk7XHJcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGF0ZSBmcm9tIGlzbyBmb3JtYXQgb3IgZmFsbGJhY2tcclxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21TdHJpbmcoY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIG1hdGNoZWQgPSBhc3BOZXRKc29uUmVnZXguZXhlYyhjb25maWcuX2kpO1xyXG5cclxuICAgICAgICBpZiAobWF0Y2hlZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZSgrbWF0Y2hlZFsxXSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbmZpZ0Zyb21JU08oY29uZmlnKTtcclxuICAgICAgICBpZiAoY29uZmlnLl9pc1ZhbGlkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLl9pc1ZhbGlkO1xyXG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2soY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrID0gZGVwcmVjYXRlKFxyXG4gICAgICAgICdtb21lbnQgY29uc3RydWN0aW9uIGZhbGxzIGJhY2sgdG8ganMgRGF0ZS4gVGhpcyBpcyAnICtcclxuICAgICAgICAnZGlzY291cmFnZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB1cGNvbWluZyBtYWpvciAnICtcclxuICAgICAgICAncmVsZWFzZS4gUGxlYXNlIHJlZmVyIHRvICcgK1xyXG4gICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQwNyBmb3IgbW9yZSBpbmZvLicsXHJcbiAgICAgICAgZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShjb25maWcuX2kgKyAoY29uZmlnLl91c2VVVEMgPyAnIFVUQycgOiAnJykpO1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRGF0ZSAoeSwgbSwgZCwgaCwgTSwgcywgbXMpIHtcclxuICAgICAgICAvL2Nhbid0IGp1c3QgYXBwbHkoKSB0byBjcmVhdGUgYSBkYXRlOlxyXG4gICAgICAgIC8vaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xODEzNDgvaW5zdGFudGlhdGluZy1hLWphdmFzY3JpcHQtb2JqZWN0LWJ5LWNhbGxpbmctcHJvdG90eXBlLWNvbnN0cnVjdG9yLWFwcGx5XHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh5LCBtLCBkLCBoLCBNLCBzLCBtcyk7XHJcblxyXG4gICAgICAgIC8vdGhlIGRhdGUgY29uc3RydWN0b3IgcmVtYXBzIHllYXJzIDAtOTkgdG8gMTkwMC0xOTk5XHJcbiAgICAgICAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwICYmIGlzRmluaXRlKGRhdGUuZ2V0RnVsbFllYXIoKSkpIHtcclxuICAgICAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcih5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlVVRDRGF0ZSAoeSkge1xyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMuYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XHJcblxyXG4gICAgICAgIC8vdGhlIERhdGUuVVRDIGZ1bmN0aW9uIHJlbWFwcyB5ZWFycyAwLTk5IHRvIDE5MDAtMTk5OVxyXG4gICAgICAgIGlmICh5IDwgMTAwICYmIHkgPj0gMCAmJiBpc0Zpbml0ZShkYXRlLmdldFVUQ0Z1bGxZZWFyKCkpKSB7XHJcbiAgICAgICAgICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignWScsIDAsIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgeSA9IHRoaXMueWVhcigpO1xyXG4gICAgICAgIHJldHVybiB5IDw9IDk5OTkgPyAnJyArIHkgOiAnKycgKyB5O1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydZWScsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueWVhcigpICUgMTAwO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydZWVlZJywgICA0XSwgICAgICAgMCwgJ3llYXInKTtcclxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWVknLCAgNV0sICAgICAgIDAsICd5ZWFyJyk7XHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVlZWScsIDYsIHRydWVdLCAwLCAneWVhcicpO1xyXG5cclxuICAgIC8vIEFMSUFTRVNcclxuXHJcbiAgICBhZGRVbml0QWxpYXMoJ3llYXInLCAneScpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdZJywgICAgICBtYXRjaFNpZ25lZCk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdZWScsICAgICBtYXRjaDF0bzIsIG1hdGNoMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdZWVlZJywgICBtYXRjaDF0bzQsIG1hdGNoNCk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdZWVlZWScsICBtYXRjaDF0bzYsIG1hdGNoNik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdZWVlZWVknLCBtYXRjaDF0bzYsIG1hdGNoNik7XHJcblxyXG4gICAgYWRkUGFyc2VUb2tlbihbJ1lZWVlZJywgJ1lZWVlZWSddLCBZRUFSKTtcclxuICAgIGFkZFBhcnNlVG9rZW4oJ1lZWVknLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XHJcbiAgICAgICAgYXJyYXlbWUVBUl0gPSBpbnB1dC5sZW5ndGggPT09IDIgPyB1dGlsc19ob29rc19faG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpIDogdG9JbnQoaW5wdXQpO1xyXG4gICAgfSk7XHJcbiAgICBhZGRQYXJzZVRva2VuKCdZWScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcclxuICAgICAgICBhcnJheVtZRUFSXSA9IHV0aWxzX2hvb2tzX19ob29rcy5wYXJzZVR3b0RpZ2l0WWVhcihpbnB1dCk7XHJcbiAgICB9KTtcclxuICAgIGFkZFBhcnNlVG9rZW4oJ1knLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XHJcbiAgICAgICAgYXJyYXlbWUVBUl0gPSBwYXJzZUludChpbnB1dCwgMTApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSEVMUEVSU1xyXG5cclxuICAgIGZ1bmN0aW9uIGRheXNJblllYXIoeWVhcikge1xyXG4gICAgICAgIHJldHVybiBpc0xlYXBZZWFyKHllYXIpID8gMzY2IDogMzY1O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzTGVhcFllYXIoeWVhcikge1xyXG4gICAgICAgIHJldHVybiAoeWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMCkgfHwgeWVhciAlIDQwMCA9PT0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIT09LU1xyXG5cclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5wYXJzZVR3b0RpZ2l0WWVhciA9IGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiB0b0ludChpbnB1dCkgKyAodG9JbnQoaW5wdXQpID4gNjggPyAxOTAwIDogMjAwMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICB2YXIgZ2V0U2V0WWVhciA9IG1ha2VHZXRTZXQoJ0Z1bGxZZWFyJywgdHJ1ZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SXNMZWFwWWVhciAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzTGVhcFllYXIodGhpcy55ZWFyKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN0YXJ0LW9mLWZpcnN0LXdlZWsgLSBzdGFydC1vZi15ZWFyXHJcbiAgICBmdW5jdGlvbiBmaXJzdFdlZWtPZmZzZXQoeWVhciwgZG93LCBkb3kpIHtcclxuICAgICAgICB2YXIgLy8gZmlyc3Qtd2VlayBkYXkgLS0gd2hpY2ggamFudWFyeSBpcyBhbHdheXMgaW4gdGhlIGZpcnN0IHdlZWsgKDQgZm9yIGlzbywgMSBmb3Igb3RoZXIpXHJcbiAgICAgICAgICAgIGZ3ZCA9IDcgKyBkb3cgLSBkb3ksXHJcbiAgICAgICAgICAgIC8vIGZpcnN0LXdlZWsgZGF5IGxvY2FsIHdlZWtkYXkgLS0gd2hpY2ggbG9jYWwgd2Vla2RheSBpcyBmd2RcclxuICAgICAgICAgICAgZndkbHcgPSAoNyArIGNyZWF0ZVVUQ0RhdGUoeWVhciwgMCwgZndkKS5nZXRVVENEYXkoKSAtIGRvdykgJSA3O1xyXG5cclxuICAgICAgICByZXR1cm4gLWZ3ZGx3ICsgZndkIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICAvL2h0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZSNDYWxjdWxhdGluZ19hX2RhdGVfZ2l2ZW5fdGhlX3llYXIuMkNfd2Vla19udW1iZXJfYW5kX3dlZWtkYXlcclxuICAgIGZ1bmN0aW9uIGRheU9mWWVhckZyb21XZWVrcyh5ZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSkge1xyXG4gICAgICAgIHZhciBsb2NhbFdlZWtkYXkgPSAoNyArIHdlZWtkYXkgLSBkb3cpICUgNyxcclxuICAgICAgICAgICAgd2Vla09mZnNldCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSksXHJcbiAgICAgICAgICAgIGRheU9mWWVhciA9IDEgKyA3ICogKHdlZWsgLSAxKSArIGxvY2FsV2Vla2RheSArIHdlZWtPZmZzZXQsXHJcbiAgICAgICAgICAgIHJlc1llYXIsIHJlc0RheU9mWWVhcjtcclxuXHJcbiAgICAgICAgaWYgKGRheU9mWWVhciA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJlc1llYXIgPSB5ZWFyIC0gMTtcclxuICAgICAgICAgICAgcmVzRGF5T2ZZZWFyID0gZGF5c0luWWVhcihyZXNZZWFyKSArIGRheU9mWWVhcjtcclxuICAgICAgICB9IGVsc2UgaWYgKGRheU9mWWVhciA+IGRheXNJblllYXIoeWVhcikpIHtcclxuICAgICAgICAgICAgcmVzWWVhciA9IHllYXIgKyAxO1xyXG4gICAgICAgICAgICByZXNEYXlPZlllYXIgPSBkYXlPZlllYXIgLSBkYXlzSW5ZZWFyKHllYXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc1llYXIgPSB5ZWFyO1xyXG4gICAgICAgICAgICByZXNEYXlPZlllYXIgPSBkYXlPZlllYXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB5ZWFyOiByZXNZZWFyLFxyXG4gICAgICAgICAgICBkYXlPZlllYXI6IHJlc0RheU9mWWVhclxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd2Vla09mWWVhcihtb20sIGRvdywgZG95KSB7XHJcbiAgICAgICAgdmFyIHdlZWtPZmZzZXQgPSBmaXJzdFdlZWtPZmZzZXQobW9tLnllYXIoKSwgZG93LCBkb3kpLFxyXG4gICAgICAgICAgICB3ZWVrID0gTWF0aC5mbG9vcigobW9tLmRheU9mWWVhcigpIC0gd2Vla09mZnNldCAtIDEpIC8gNykgKyAxLFxyXG4gICAgICAgICAgICByZXNXZWVrLCByZXNZZWFyO1xyXG5cclxuICAgICAgICBpZiAod2VlayA8IDEpIHtcclxuICAgICAgICAgICAgcmVzWWVhciA9IG1vbS55ZWFyKCkgLSAxO1xyXG4gICAgICAgICAgICByZXNXZWVrID0gd2VlayArIHdlZWtzSW5ZZWFyKHJlc1llYXIsIGRvdywgZG95KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHdlZWsgPiB3ZWVrc0luWWVhcihtb20ueWVhcigpLCBkb3csIGRveSkpIHtcclxuICAgICAgICAgICAgcmVzV2VlayA9IHdlZWsgLSB3ZWVrc0luWWVhcihtb20ueWVhcigpLCBkb3csIGRveSk7XHJcbiAgICAgICAgICAgIHJlc1llYXIgPSBtb20ueWVhcigpICsgMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNZZWFyID0gbW9tLnllYXIoKTtcclxuICAgICAgICAgICAgcmVzV2VlayA9IHdlZWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3ZWVrOiByZXNXZWVrLFxyXG4gICAgICAgICAgICB5ZWFyOiByZXNZZWFyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3ZWVrc0luWWVhcih5ZWFyLCBkb3csIGRveSkge1xyXG4gICAgICAgIHZhciB3ZWVrT2Zmc2V0ID0gZmlyc3RXZWVrT2Zmc2V0KHllYXIsIGRvdywgZG95KSxcclxuICAgICAgICAgICAgd2Vla09mZnNldE5leHQgPSBmaXJzdFdlZWtPZmZzZXQoeWVhciArIDEsIGRvdywgZG95KTtcclxuICAgICAgICByZXR1cm4gKGRheXNJblllYXIoeWVhcikgLSB3ZWVrT2Zmc2V0ICsgd2Vla09mZnNldE5leHQpIC8gNztcclxuICAgIH1cclxuXHJcbiAgICAvLyBQaWNrIHRoZSBmaXJzdCBkZWZpbmVkIG9mIHR3byBvciB0aHJlZSBhcmd1bWVudHMuXHJcbiAgICBmdW5jdGlvbiBkZWZhdWx0cyhhLCBiLCBjKSB7XHJcbiAgICAgICAgaWYgKGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3VycmVudERhdGVBcnJheShjb25maWcpIHtcclxuICAgICAgICAvLyBob29rcyBpcyBhY3R1YWxseSB0aGUgZXhwb3J0ZWQgbW9tZW50IG9iamVjdFxyXG4gICAgICAgIHZhciBub3dWYWx1ZSA9IG5ldyBEYXRlKHV0aWxzX2hvb2tzX19ob29rcy5ub3coKSk7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5fdXNlVVRDKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbbm93VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSwgbm93VmFsdWUuZ2V0VVRDTW9udGgoKSwgbm93VmFsdWUuZ2V0VVRDRGF0ZSgpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtub3dWYWx1ZS5nZXRGdWxsWWVhcigpLCBub3dWYWx1ZS5nZXRNb250aCgpLCBub3dWYWx1ZS5nZXREYXRlKCldO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnZlcnQgYW4gYXJyYXkgdG8gYSBkYXRlLlxyXG4gICAgLy8gdGhlIGFycmF5IHNob3VsZCBtaXJyb3IgdGhlIHBhcmFtZXRlcnMgYmVsb3dcclxuICAgIC8vIG5vdGU6IGFsbCB2YWx1ZXMgcGFzdCB0aGUgeWVhciBhcmUgb3B0aW9uYWwgYW5kIHdpbGwgZGVmYXVsdCB0byB0aGUgbG93ZXN0IHBvc3NpYmxlIHZhbHVlLlxyXG4gICAgLy8gW3llYXIsIG1vbnRoLCBkYXkgLCBob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzZWNvbmRdXHJcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tQXJyYXkgKGNvbmZpZykge1xyXG4gICAgICAgIHZhciBpLCBkYXRlLCBpbnB1dCA9IFtdLCBjdXJyZW50RGF0ZSwgeWVhclRvVXNlO1xyXG5cclxuICAgICAgICBpZiAoY29uZmlnLl9kKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN1cnJlbnREYXRlID0gY3VycmVudERhdGVBcnJheShjb25maWcpO1xyXG5cclxuICAgICAgICAvL2NvbXB1dGUgZGF5IG9mIHRoZSB5ZWFyIGZyb20gd2Vla3MgYW5kIHdlZWtkYXlzXHJcbiAgICAgICAgaWYgKGNvbmZpZy5fdyAmJiBjb25maWcuX2FbREFURV0gPT0gbnVsbCAmJiBjb25maWcuX2FbTU9OVEhdID09IG51bGwpIHtcclxuICAgICAgICAgICAgZGF5T2ZZZWFyRnJvbVdlZWtJbmZvKGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2lmIHRoZSBkYXkgb2YgdGhlIHllYXIgaXMgc2V0LCBmaWd1cmUgb3V0IHdoYXQgaXQgaXNcclxuICAgICAgICBpZiAoY29uZmlnLl9kYXlPZlllYXIpIHtcclxuICAgICAgICAgICAgeWVhclRvVXNlID0gZGVmYXVsdHMoY29uZmlnLl9hW1lFQVJdLCBjdXJyZW50RGF0ZVtZRUFSXSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnLl9kYXlPZlllYXIgPiBkYXlzSW5ZZWFyKHllYXJUb1VzZSkpIHtcclxuICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLl9vdmVyZmxvd0RheU9mWWVhciA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRhdGUgPSBjcmVhdGVVVENEYXRlKHllYXJUb1VzZSwgMCwgY29uZmlnLl9kYXlPZlllYXIpO1xyXG4gICAgICAgICAgICBjb25maWcuX2FbTU9OVEhdID0gZGF0ZS5nZXRVVENNb250aCgpO1xyXG4gICAgICAgICAgICBjb25maWcuX2FbREFURV0gPSBkYXRlLmdldFVUQ0RhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERlZmF1bHQgdG8gY3VycmVudCBkYXRlLlxyXG4gICAgICAgIC8vICogaWYgbm8geWVhciwgbW9udGgsIGRheSBvZiBtb250aCBhcmUgZ2l2ZW4sIGRlZmF1bHQgdG8gdG9kYXlcclxuICAgICAgICAvLyAqIGlmIGRheSBvZiBtb250aCBpcyBnaXZlbiwgZGVmYXVsdCBtb250aCBhbmQgeWVhclxyXG4gICAgICAgIC8vICogaWYgbW9udGggaXMgZ2l2ZW4sIGRlZmF1bHQgb25seSB5ZWFyXHJcbiAgICAgICAgLy8gKiBpZiB5ZWFyIGlzIGdpdmVuLCBkb24ndCBkZWZhdWx0IGFueXRoaW5nXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDMgJiYgY29uZmlnLl9hW2ldID09IG51bGw7ICsraSkge1xyXG4gICAgICAgICAgICBjb25maWcuX2FbaV0gPSBpbnB1dFtpXSA9IGN1cnJlbnREYXRlW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gWmVybyBvdXQgd2hhdGV2ZXIgd2FzIG5vdCBkZWZhdWx0ZWQsIGluY2x1ZGluZyB0aW1lXHJcbiAgICAgICAgZm9yICg7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgY29uZmlnLl9hW2ldID0gaW5wdXRbaV0gPSAoY29uZmlnLl9hW2ldID09IG51bGwpID8gKGkgPT09IDIgPyAxIDogMCkgOiBjb25maWcuX2FbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3IgMjQ6MDA6MDAuMDAwXHJcbiAgICAgICAgaWYgKGNvbmZpZy5fYVtIT1VSXSA9PT0gMjQgJiZcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtNSU5VVEVdID09PSAwICYmXHJcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbU0VDT05EXSA9PT0gMCAmJlxyXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW01JTExJU0VDT05EXSA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb25maWcuX25leHREYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25maWcuX2FbSE9VUl0gPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uZmlnLl9kID0gKGNvbmZpZy5fdXNlVVRDID8gY3JlYXRlVVRDRGF0ZSA6IGNyZWF0ZURhdGUpLmFwcGx5KG51bGwsIGlucHV0KTtcclxuICAgICAgICAvLyBBcHBseSB0aW1lem9uZSBvZmZzZXQgZnJvbSBpbnB1dC4gVGhlIGFjdHVhbCB1dGNPZmZzZXQgY2FuIGJlIGNoYW5nZWRcclxuICAgICAgICAvLyB3aXRoIHBhcnNlWm9uZS5cclxuICAgICAgICBpZiAoY29uZmlnLl90em0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25maWcuX2Quc2V0VVRDTWludXRlcyhjb25maWcuX2QuZ2V0VVRDTWludXRlcygpIC0gY29uZmlnLl90em0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5fbmV4dERheSkge1xyXG4gICAgICAgICAgICBjb25maWcuX2FbSE9VUl0gPSAyNDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGF5T2ZZZWFyRnJvbVdlZWtJbmZvKGNvbmZpZykge1xyXG4gICAgICAgIHZhciB3LCB3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3ksIHRlbXAsIHdlZWtkYXlPdmVyZmxvdztcclxuXHJcbiAgICAgICAgdyA9IGNvbmZpZy5fdztcclxuICAgICAgICBpZiAody5HRyAhPSBudWxsIHx8IHcuVyAhPSBudWxsIHx8IHcuRSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGRvdyA9IDE7XHJcbiAgICAgICAgICAgIGRveSA9IDQ7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBXZSBuZWVkIHRvIHRha2UgdGhlIGN1cnJlbnQgaXNvV2Vla1llYXIsIGJ1dCB0aGF0IGRlcGVuZHMgb25cclxuICAgICAgICAgICAgLy8gaG93IHdlIGludGVycHJldCBub3cgKGxvY2FsLCB1dGMsIGZpeGVkIG9mZnNldCkuIFNvIGNyZWF0ZVxyXG4gICAgICAgICAgICAvLyBhIG5vdyB2ZXJzaW9uIG9mIGN1cnJlbnQgY29uZmlnICh0YWtlIGxvY2FsL3V0Yy9vZmZzZXQgZmxhZ3MsIGFuZFxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgbm93KS5cclxuICAgICAgICAgICAgd2Vla1llYXIgPSBkZWZhdWx0cyh3LkdHLCBjb25maWcuX2FbWUVBUl0sIHdlZWtPZlllYXIobG9jYWxfX2NyZWF0ZUxvY2FsKCksIDEsIDQpLnllYXIpO1xyXG4gICAgICAgICAgICB3ZWVrID0gZGVmYXVsdHMody5XLCAxKTtcclxuICAgICAgICAgICAgd2Vla2RheSA9IGRlZmF1bHRzKHcuRSwgMSk7XHJcbiAgICAgICAgICAgIGlmICh3ZWVrZGF5IDwgMSB8fCB3ZWVrZGF5ID4gNykge1xyXG4gICAgICAgICAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRvdyA9IGNvbmZpZy5fbG9jYWxlLl93ZWVrLmRvdztcclxuICAgICAgICAgICAgZG95ID0gY29uZmlnLl9sb2NhbGUuX3dlZWsuZG95O1xyXG5cclxuICAgICAgICAgICAgd2Vla1llYXIgPSBkZWZhdWx0cyh3LmdnLCBjb25maWcuX2FbWUVBUl0sIHdlZWtPZlllYXIobG9jYWxfX2NyZWF0ZUxvY2FsKCksIGRvdywgZG95KS55ZWFyKTtcclxuICAgICAgICAgICAgd2VlayA9IGRlZmF1bHRzKHcudywgMSk7XHJcblxyXG4gICAgICAgICAgICBpZiAody5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vIHdlZWtkYXkgLS0gbG93IGRheSBudW1iZXJzIGFyZSBjb25zaWRlcmVkIG5leHQgd2Vla1xyXG4gICAgICAgICAgICAgICAgd2Vla2RheSA9IHcuZDtcclxuICAgICAgICAgICAgICAgIGlmICh3ZWVrZGF5IDwgMCB8fCB3ZWVrZGF5ID4gNikge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlZWtkYXlPdmVyZmxvdyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAody5lICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vIGxvY2FsIHdlZWtkYXkgLS0gY291bnRpbmcgc3RhcnRzIGZyb20gYmVnaW5pbmcgb2Ygd2Vla1xyXG4gICAgICAgICAgICAgICAgd2Vla2RheSA9IHcuZSArIGRvdztcclxuICAgICAgICAgICAgICAgIGlmICh3LmUgPCAwIHx8IHcuZSA+IDYpIHtcclxuICAgICAgICAgICAgICAgICAgICB3ZWVrZGF5T3ZlcmZsb3cgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gZGVmYXVsdCB0byBiZWdpbmluZyBvZiB3ZWVrXHJcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gZG93O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh3ZWVrIDwgMSB8fCB3ZWVrID4gd2Vla3NJblllYXIod2Vla1llYXIsIGRvdywgZG95KSkge1xyXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dXZWVrcyA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh3ZWVrZGF5T3ZlcmZsb3cgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dXZWVrZGF5ID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZW1wID0gZGF5T2ZZZWFyRnJvbVdlZWtzKHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSk7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fYVtZRUFSXSA9IHRlbXAueWVhcjtcclxuICAgICAgICAgICAgY29uZmlnLl9kYXlPZlllYXIgPSB0ZW1wLmRheU9mWWVhcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uc3RhbnQgdGhhdCByZWZlcnMgdG8gdGhlIElTTyBzdGFuZGFyZFxyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLklTT184NjAxID0gZnVuY3Rpb24gKCkge307XHJcblxyXG4gICAgLy8gZGF0ZSBmcm9tIHN0cmluZyBhbmQgZm9ybWF0IHN0cmluZ1xyXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdChjb25maWcpIHtcclxuICAgICAgICAvLyBUT0RPOiBNb3ZlIHRoaXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBjcmVhdGlvbiBmbG93IHRvIHByZXZlbnQgY2lyY3VsYXIgZGVwc1xyXG4gICAgICAgIGlmIChjb25maWcuX2YgPT09IHV0aWxzX2hvb2tzX19ob29rcy5JU09fODYwMSkge1xyXG4gICAgICAgICAgICBjb25maWdGcm9tSVNPKGNvbmZpZyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbmZpZy5fYSA9IFtdO1xyXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmVtcHR5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gVGhpcyBhcnJheSBpcyB1c2VkIHRvIG1ha2UgYSBEYXRlLCBlaXRoZXIgd2l0aCBgbmV3IERhdGVgIG9yIGBEYXRlLlVUQ2BcclxuICAgICAgICB2YXIgc3RyaW5nID0gJycgKyBjb25maWcuX2ksXHJcbiAgICAgICAgICAgIGksIHBhcnNlZElucHV0LCB0b2tlbnMsIHRva2VuLCBza2lwcGVkLFxyXG4gICAgICAgICAgICBzdHJpbmdMZW5ndGggPSBzdHJpbmcubGVuZ3RoLFxyXG4gICAgICAgICAgICB0b3RhbFBhcnNlZElucHV0TGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgdG9rZW5zID0gZXhwYW5kRm9ybWF0KGNvbmZpZy5fZiwgY29uZmlnLl9sb2NhbGUpLm1hdGNoKGZvcm1hdHRpbmdUb2tlbnMpIHx8IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xyXG4gICAgICAgICAgICBwYXJzZWRJbnB1dCA9IChzdHJpbmcubWF0Y2goZ2V0UGFyc2VSZWdleEZvclRva2VuKHRva2VuLCBjb25maWcpKSB8fCBbXSlbMF07XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd0b2tlbicsIHRva2VuLCAncGFyc2VkSW5wdXQnLCBwYXJzZWRJbnB1dCxcclxuICAgICAgICAgICAgLy8gICAgICAgICAncmVnZXgnLCBnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4odG9rZW4sIGNvbmZpZykpO1xyXG4gICAgICAgICAgICBpZiAocGFyc2VkSW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIHNraXBwZWQgPSBzdHJpbmcuc3Vic3RyKDAsIHN0cmluZy5pbmRleE9mKHBhcnNlZElucHV0KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2tpcHBlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkSW5wdXQucHVzaChza2lwcGVkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZy5zbGljZShzdHJpbmcuaW5kZXhPZihwYXJzZWRJbnB1dCkgKyBwYXJzZWRJbnB1dC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdG90YWxQYXJzZWRJbnB1dExlbmd0aCArPSBwYXJzZWRJbnB1dC5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZG9uJ3QgcGFyc2UgaWYgaXQncyBub3QgYSBrbm93biB0b2tlblxyXG4gICAgICAgICAgICBpZiAoZm9ybWF0VG9rZW5GdW5jdGlvbnNbdG9rZW5dKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VkSW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5lbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkVG9rZW5zLnB1c2godG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYWRkVGltZVRvQXJyYXlGcm9tVG9rZW4odG9rZW4sIHBhcnNlZElucHV0LCBjb25maWcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbmZpZy5fc3RyaWN0ICYmICFwYXJzZWRJbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkVG9rZW5zLnB1c2godG9rZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhZGQgcmVtYWluaW5nIHVucGFyc2VkIGlucHV0IGxlbmd0aCB0byB0aGUgc3RyaW5nXHJcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuY2hhcnNMZWZ0T3ZlciA9IHN0cmluZ0xlbmd0aCAtIHRvdGFsUGFyc2VkSW5wdXRMZW5ndGg7XHJcbiAgICAgICAgaWYgKHN0cmluZy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZElucHV0LnB1c2goc3RyaW5nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNsZWFyIF8xMmggZmxhZyBpZiBob3VyIGlzIDw9IDEyXHJcbiAgICAgICAgaWYgKGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPT09IHRydWUgJiZcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA8PSAxMiAmJlxyXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdID4gMCkge1xyXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykucGFyc2VkRGF0ZVBhcnRzID0gY29uZmlnLl9hLnNsaWNlKDApO1xyXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLm1lcmlkaWVtID0gY29uZmlnLl9tZXJpZGllbTtcclxuICAgICAgICAvLyBoYW5kbGUgbWVyaWRpZW1cclxuICAgICAgICBjb25maWcuX2FbSE9VUl0gPSBtZXJpZGllbUZpeFdyYXAoY29uZmlnLl9sb2NhbGUsIGNvbmZpZy5fYVtIT1VSXSwgY29uZmlnLl9tZXJpZGllbSk7XHJcblxyXG4gICAgICAgIGNvbmZpZ0Zyb21BcnJheShjb25maWcpO1xyXG4gICAgICAgIGNoZWNrT3ZlcmZsb3coY29uZmlnKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gbWVyaWRpZW1GaXhXcmFwIChsb2NhbGUsIGhvdXIsIG1lcmlkaWVtKSB7XHJcbiAgICAgICAgdmFyIGlzUG07XHJcblxyXG4gICAgICAgIGlmIChtZXJpZGllbSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vIG5vdGhpbmcgdG8gZG9cclxuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsb2NhbGUubWVyaWRpZW1Ib3VyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZS5tZXJpZGllbUhvdXIoaG91ciwgbWVyaWRpZW0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9jYWxlLmlzUE0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyBGYWxsYmFja1xyXG4gICAgICAgICAgICBpc1BtID0gbG9jYWxlLmlzUE0obWVyaWRpZW0pO1xyXG4gICAgICAgICAgICBpZiAoaXNQbSAmJiBob3VyIDwgMTIpIHtcclxuICAgICAgICAgICAgICAgIGhvdXIgKz0gMTI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc1BtICYmIGhvdXIgPT09IDEyKSB7XHJcbiAgICAgICAgICAgICAgICBob3VyID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaG91cjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB0aGlzIGlzIG5vdCBzdXBwb3NlZCB0byBoYXBwZW5cclxuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGRhdGUgZnJvbSBzdHJpbmcgYW5kIGFycmF5IG9mIGZvcm1hdCBzdHJpbmdzXHJcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tU3RyaW5nQW5kQXJyYXkoY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHRlbXBDb25maWcsXHJcbiAgICAgICAgICAgIGJlc3RNb21lbnQsXHJcblxyXG4gICAgICAgICAgICBzY29yZVRvQmVhdCxcclxuICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgY3VycmVudFNjb3JlO1xyXG5cclxuICAgICAgICBpZiAoY29uZmlnLl9mLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5pbnZhbGlkRm9ybWF0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoTmFOKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbmZpZy5fZi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjdXJyZW50U2NvcmUgPSAwO1xyXG4gICAgICAgICAgICB0ZW1wQ29uZmlnID0gY29weUNvbmZpZyh7fSwgY29uZmlnKTtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZy5fdXNlVVRDICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRlbXBDb25maWcuX3VzZVVUQyA9IGNvbmZpZy5fdXNlVVRDO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRlbXBDb25maWcuX2YgPSBjb25maWcuX2ZbaV07XHJcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQodGVtcENvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXZhbGlkX19pc1ZhbGlkKHRlbXBDb25maWcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW55IGlucHV0IHRoYXQgd2FzIG5vdCBwYXJzZWQgYWRkIGEgcGVuYWx0eSBmb3IgdGhhdCBmb3JtYXRcclxuICAgICAgICAgICAgY3VycmVudFNjb3JlICs9IGdldFBhcnNpbmdGbGFncyh0ZW1wQ29uZmlnKS5jaGFyc0xlZnRPdmVyO1xyXG5cclxuICAgICAgICAgICAgLy9vciB0b2tlbnNcclxuICAgICAgICAgICAgY3VycmVudFNjb3JlICs9IGdldFBhcnNpbmdGbGFncyh0ZW1wQ29uZmlnKS51bnVzZWRUb2tlbnMubGVuZ3RoICogMTA7XHJcblxyXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykuc2NvcmUgPSBjdXJyZW50U2NvcmU7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2NvcmVUb0JlYXQgPT0gbnVsbCB8fCBjdXJyZW50U2NvcmUgPCBzY29yZVRvQmVhdCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcmVUb0JlYXQgPSBjdXJyZW50U2NvcmU7XHJcbiAgICAgICAgICAgICAgICBiZXN0TW9tZW50ID0gdGVtcENvbmZpZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXh0ZW5kKGNvbmZpZywgYmVzdE1vbWVudCB8fCB0ZW1wQ29uZmlnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tT2JqZWN0KGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcuX2QpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGkgPSBub3JtYWxpemVPYmplY3RVbml0cyhjb25maWcuX2kpO1xyXG4gICAgICAgIGNvbmZpZy5fYSA9IG1hcChbaS55ZWFyLCBpLm1vbnRoLCBpLmRheSB8fCBpLmRhdGUsIGkuaG91ciwgaS5taW51dGUsIGkuc2Vjb25kLCBpLm1pbGxpc2Vjb25kXSwgZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqICYmIHBhcnNlSW50KG9iaiwgMTApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25maWdGcm9tQXJyYXkoY29uZmlnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVGcm9tQ29uZmlnIChjb25maWcpIHtcclxuICAgICAgICB2YXIgcmVzID0gbmV3IE1vbWVudChjaGVja092ZXJmbG93KHByZXBhcmVDb25maWcoY29uZmlnKSkpO1xyXG4gICAgICAgIGlmIChyZXMuX25leHREYXkpIHtcclxuICAgICAgICAgICAgLy8gQWRkaW5nIGlzIHNtYXJ0IGVub3VnaCBhcm91bmQgRFNUXHJcbiAgICAgICAgICAgIHJlcy5hZGQoMSwgJ2QnKTtcclxuICAgICAgICAgICAgcmVzLl9uZXh0RGF5ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwcmVwYXJlQ29uZmlnIChjb25maWcpIHtcclxuICAgICAgICB2YXIgaW5wdXQgPSBjb25maWcuX2ksXHJcbiAgICAgICAgICAgIGZvcm1hdCA9IGNvbmZpZy5fZjtcclxuXHJcbiAgICAgICAgY29uZmlnLl9sb2NhbGUgPSBjb25maWcuX2xvY2FsZSB8fCBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKGNvbmZpZy5fbCk7XHJcblxyXG4gICAgICAgIGlmIChpbnB1dCA9PT0gbnVsbCB8fCAoZm9ybWF0ID09PSB1bmRlZmluZWQgJiYgaW5wdXQgPT09ICcnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsaWRfX2NyZWF0ZUludmFsaWQoe251bGxJbnB1dDogdHJ1ZX0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY29uZmlnLl9pID0gaW5wdXQgPSBjb25maWcuX2xvY2FsZS5wcmVwYXJzZShpbnB1dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNNb21lbnQoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgTW9tZW50KGNoZWNrT3ZlcmZsb3coaW5wdXQpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoZm9ybWF0KSkge1xyXG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kQXJyYXkoY29uZmlnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdCkge1xyXG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KGNvbmZpZyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IGlucHV0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21JbnB1dChjb25maWcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF2YWxpZF9faXNWYWxpZChjb25maWcpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21JbnB1dChjb25maWcpIHtcclxuICAgICAgICB2YXIgaW5wdXQgPSBjb25maWcuX2k7XHJcbiAgICAgICAgaWYgKGlucHV0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUodXRpbHNfaG9va3NfX2hvb2tzLm5vdygpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZShpbnB1dCkpIHtcclxuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoaW5wdXQudmFsdWVPZigpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZyhjb25maWcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShpbnB1dCkpIHtcclxuICAgICAgICAgICAgY29uZmlnLl9hID0gbWFwKGlucHV0LnNsaWNlKDApLCBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQob2JqLCAxMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25maWdGcm9tQXJyYXkoY29uZmlnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZihpbnB1dCkgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21PYmplY3QoY29uZmlnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZihpbnB1dCkgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIC8vIGZyb20gbWlsbGlzZWNvbmRzXHJcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKGlucHV0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2soY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlTG9jYWxPclVUQyAoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QsIGlzVVRDKSB7XHJcbiAgICAgICAgdmFyIGMgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZihsb2NhbGUpID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgICAgc3RyaWN0ID0gbG9jYWxlO1xyXG4gICAgICAgICAgICBsb2NhbGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIG9iamVjdCBjb25zdHJ1Y3Rpb24gbXVzdCBiZSBkb25lIHRoaXMgd2F5LlxyXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNDIzXHJcbiAgICAgICAgYy5faXNBTW9tZW50T2JqZWN0ID0gdHJ1ZTtcclxuICAgICAgICBjLl91c2VVVEMgPSBjLl9pc1VUQyA9IGlzVVRDO1xyXG4gICAgICAgIGMuX2wgPSBsb2NhbGU7XHJcbiAgICAgICAgYy5faSA9IGlucHV0O1xyXG4gICAgICAgIGMuX2YgPSBmb3JtYXQ7XHJcbiAgICAgICAgYy5fc3RyaWN0ID0gc3RyaWN0O1xyXG5cclxuICAgICAgICByZXR1cm4gY3JlYXRlRnJvbUNvbmZpZyhjKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2NhbF9fY3JlYXRlTG9jYWwgKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUxvY2FsT3JVVEMoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcHJvdG90eXBlTWluID0gZGVwcmVjYXRlKFxyXG4gICAgICAgICAnbW9tZW50KCkubWluIGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQubWF4IGluc3RlYWQuIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNTQ4JyxcclxuICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgdmFyIG90aGVyID0gbG9jYWxfX2NyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiYgb3RoZXIuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyIDwgdGhpcyA/IHRoaXMgOiBvdGhlcjtcclxuICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkX19jcmVhdGVJbnZhbGlkKCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICApO1xyXG5cclxuICAgIHZhciBwcm90b3R5cGVNYXggPSBkZXByZWNhdGUoXHJcbiAgICAgICAgJ21vbWVudCgpLm1heCBpcyBkZXByZWNhdGVkLCB1c2UgbW9tZW50Lm1pbiBpbnN0ZWFkLiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTU0OCcsXHJcbiAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgb3RoZXIgPSBsb2NhbF9fY3JlYXRlTG9jYWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmIG90aGVyLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyID4gdGhpcyA/IHRoaXMgOiBvdGhlcjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZF9fY3JlYXRlSW52YWxpZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBQaWNrIGEgbW9tZW50IG0gZnJvbSBtb21lbnRzIHNvIHRoYXQgbVtmbl0ob3RoZXIpIGlzIHRydWUgZm9yIGFsbFxyXG4gICAgLy8gb3RoZXIuIFRoaXMgcmVsaWVzIG9uIHRoZSBmdW5jdGlvbiBmbiB0byBiZSB0cmFuc2l0aXZlLlxyXG4gICAgLy9cclxuICAgIC8vIG1vbWVudHMgc2hvdWxkIGVpdGhlciBiZSBhbiBhcnJheSBvZiBtb21lbnQgb2JqZWN0cyBvciBhbiBhcnJheSwgd2hvc2VcclxuICAgIC8vIGZpcnN0IGVsZW1lbnQgaXMgYW4gYXJyYXkgb2YgbW9tZW50IG9iamVjdHMuXHJcbiAgICBmdW5jdGlvbiBwaWNrQnkoZm4sIG1vbWVudHMpIHtcclxuICAgICAgICB2YXIgcmVzLCBpO1xyXG4gICAgICAgIGlmIChtb21lbnRzLmxlbmd0aCA9PT0gMSAmJiBpc0FycmF5KG1vbWVudHNbMF0pKSB7XHJcbiAgICAgICAgICAgIG1vbWVudHMgPSBtb21lbnRzWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW1vbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhbF9fY3JlYXRlTG9jYWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzID0gbW9tZW50c1swXTtcclxuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgbW9tZW50cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBpZiAoIW1vbWVudHNbaV0uaXNWYWxpZCgpIHx8IG1vbWVudHNbaV1bZm5dKHJlcykpIHtcclxuICAgICAgICAgICAgICAgIHJlcyA9IG1vbWVudHNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPOiBVc2UgW10uc29ydCBpbnN0ZWFkP1xyXG4gICAgZnVuY3Rpb24gbWluICgpIHtcclxuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBpY2tCeSgnaXNCZWZvcmUnLCBhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYXggKCkge1xyXG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xyXG5cclxuICAgICAgICByZXR1cm4gcGlja0J5KCdpc0FmdGVyJywgYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG5vdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gRGF0ZS5ub3cgPyBEYXRlLm5vdygpIDogKyhuZXcgRGF0ZSgpKTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gRHVyYXRpb24gKGR1cmF0aW9uKSB7XHJcbiAgICAgICAgdmFyIG5vcm1hbGl6ZWRJbnB1dCA9IG5vcm1hbGl6ZU9iamVjdFVuaXRzKGR1cmF0aW9uKSxcclxuICAgICAgICAgICAgeWVhcnMgPSBub3JtYWxpemVkSW5wdXQueWVhciB8fCAwLFxyXG4gICAgICAgICAgICBxdWFydGVycyA9IG5vcm1hbGl6ZWRJbnB1dC5xdWFydGVyIHx8IDAsXHJcbiAgICAgICAgICAgIG1vbnRocyA9IG5vcm1hbGl6ZWRJbnB1dC5tb250aCB8fCAwLFxyXG4gICAgICAgICAgICB3ZWVrcyA9IG5vcm1hbGl6ZWRJbnB1dC53ZWVrIHx8IDAsXHJcbiAgICAgICAgICAgIGRheXMgPSBub3JtYWxpemVkSW5wdXQuZGF5IHx8IDAsXHJcbiAgICAgICAgICAgIGhvdXJzID0gbm9ybWFsaXplZElucHV0LmhvdXIgfHwgMCxcclxuICAgICAgICAgICAgbWludXRlcyA9IG5vcm1hbGl6ZWRJbnB1dC5taW51dGUgfHwgMCxcclxuICAgICAgICAgICAgc2Vjb25kcyA9IG5vcm1hbGl6ZWRJbnB1dC5zZWNvbmQgfHwgMCxcclxuICAgICAgICAgICAgbWlsbGlzZWNvbmRzID0gbm9ybWFsaXplZElucHV0Lm1pbGxpc2Vjb25kIHx8IDA7XHJcblxyXG4gICAgICAgIC8vIHJlcHJlc2VudGF0aW9uIGZvciBkYXRlQWRkUmVtb3ZlXHJcbiAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzID0gK21pbGxpc2Vjb25kcyArXHJcbiAgICAgICAgICAgIHNlY29uZHMgKiAxZTMgKyAvLyAxMDAwXHJcbiAgICAgICAgICAgIG1pbnV0ZXMgKiA2ZTQgKyAvLyAxMDAwICogNjBcclxuICAgICAgICAgICAgaG91cnMgKiAxMDAwICogNjAgKiA2MDsgLy91c2luZyAxMDAwICogNjAgKiA2MCBpbnN0ZWFkIG9mIDM2ZTUgdG8gYXZvaWQgZmxvYXRpbmcgcG9pbnQgcm91bmRpbmcgZXJyb3JzIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8yOTc4XHJcbiAgICAgICAgLy8gQmVjYXVzZSBvZiBkYXRlQWRkUmVtb3ZlIHRyZWF0cyAyNCBob3VycyBhcyBkaWZmZXJlbnQgZnJvbSBhXHJcbiAgICAgICAgLy8gZGF5IHdoZW4gd29ya2luZyBhcm91bmQgRFNULCB3ZSBuZWVkIHRvIHN0b3JlIHRoZW0gc2VwYXJhdGVseVxyXG4gICAgICAgIHRoaXMuX2RheXMgPSArZGF5cyArXHJcbiAgICAgICAgICAgIHdlZWtzICogNztcclxuICAgICAgICAvLyBJdCBpcyBpbXBvc3NpYmxlIHRyYW5zbGF0ZSBtb250aHMgaW50byBkYXlzIHdpdGhvdXQga25vd2luZ1xyXG4gICAgICAgIC8vIHdoaWNoIG1vbnRocyB5b3UgYXJlIGFyZSB0YWxraW5nIGFib3V0LCBzbyB3ZSBoYXZlIHRvIHN0b3JlXHJcbiAgICAgICAgLy8gaXQgc2VwYXJhdGVseS5cclxuICAgICAgICB0aGlzLl9tb250aHMgPSArbW9udGhzICtcclxuICAgICAgICAgICAgcXVhcnRlcnMgKiAzICtcclxuICAgICAgICAgICAgeWVhcnMgKiAxMjtcclxuXHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLl9sb2NhbGUgPSBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2J1YmJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzRHVyYXRpb24gKG9iaikge1xyXG4gICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBEdXJhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgZnVuY3Rpb24gb2Zmc2V0ICh0b2tlbiwgc2VwYXJhdG9yKSB7XHJcbiAgICAgICAgYWRkRm9ybWF0VG9rZW4odG9rZW4sIDAsIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMudXRjT2Zmc2V0KCk7XHJcbiAgICAgICAgICAgIHZhciBzaWduID0gJysnO1xyXG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gLW9mZnNldDtcclxuICAgICAgICAgICAgICAgIHNpZ24gPSAnLSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNpZ24gKyB6ZXJvRmlsbCh+fihvZmZzZXQgLyA2MCksIDIpICsgc2VwYXJhdG9yICsgemVyb0ZpbGwofn4ob2Zmc2V0KSAlIDYwLCAyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvZmZzZXQoJ1onLCAnOicpO1xyXG4gICAgb2Zmc2V0KCdaWicsICcnKTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbignWicsICBtYXRjaFNob3J0T2Zmc2V0KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ1paJywgbWF0Y2hTaG9ydE9mZnNldCk7XHJcbiAgICBhZGRQYXJzZVRva2VuKFsnWicsICdaWiddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcclxuICAgICAgICBjb25maWcuX3VzZVVUQyA9IHRydWU7XHJcbiAgICAgICAgY29uZmlnLl90em0gPSBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoU2hvcnRPZmZzZXQsIGlucHV0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhFTFBFUlNcclxuXHJcbiAgICAvLyB0aW1lem9uZSBjaHVua2VyXHJcbiAgICAvLyAnKzEwOjAwJyA+IFsnMTAnLCAgJzAwJ11cclxuICAgIC8vICctMTUzMCcgID4gWyctMTUnLCAnMzAnXVxyXG4gICAgdmFyIGNodW5rT2Zmc2V0ID0gLyhbXFwrXFwtXXxcXGRcXGQpL2dpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9mZnNldEZyb21TdHJpbmcobWF0Y2hlciwgc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIG1hdGNoZXMgPSAoKHN0cmluZyB8fCAnJykubWF0Y2gobWF0Y2hlcikgfHwgW10pO1xyXG4gICAgICAgIHZhciBjaHVuayAgID0gbWF0Y2hlc1ttYXRjaGVzLmxlbmd0aCAtIDFdIHx8IFtdO1xyXG4gICAgICAgIHZhciBwYXJ0cyAgID0gKGNodW5rICsgJycpLm1hdGNoKGNodW5rT2Zmc2V0KSB8fCBbJy0nLCAwLCAwXTtcclxuICAgICAgICB2YXIgbWludXRlcyA9ICsocGFydHNbMV0gKiA2MCkgKyB0b0ludChwYXJ0c1syXSk7XHJcblxyXG4gICAgICAgIHJldHVybiBwYXJ0c1swXSA9PT0gJysnID8gbWludXRlcyA6IC1taW51dGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybiBhIG1vbWVudCBmcm9tIGlucHV0LCB0aGF0IGlzIGxvY2FsL3V0Yy96b25lIGVxdWl2YWxlbnQgdG8gbW9kZWwuXHJcbiAgICBmdW5jdGlvbiBjbG9uZVdpdGhPZmZzZXQoaW5wdXQsIG1vZGVsKSB7XHJcbiAgICAgICAgdmFyIHJlcywgZGlmZjtcclxuICAgICAgICBpZiAobW9kZWwuX2lzVVRDKSB7XHJcbiAgICAgICAgICAgIHJlcyA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGRpZmYgPSAoaXNNb21lbnQoaW5wdXQpIHx8IGlzRGF0ZShpbnB1dCkgPyBpbnB1dC52YWx1ZU9mKCkgOiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpLnZhbHVlT2YoKSkgLSByZXMudmFsdWVPZigpO1xyXG4gICAgICAgICAgICAvLyBVc2UgbG93LWxldmVsIGFwaSwgYmVjYXVzZSB0aGlzIGZuIGlzIGxvdy1sZXZlbCBhcGkuXHJcbiAgICAgICAgICAgIHJlcy5fZC5zZXRUaW1lKHJlcy5fZC52YWx1ZU9mKCkgKyBkaWZmKTtcclxuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldChyZXMsIGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KS5sb2NhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXREYXRlT2Zmc2V0IChtKSB7XHJcbiAgICAgICAgLy8gT24gRmlyZWZveC4yNCBEYXRlI2dldFRpbWV6b25lT2Zmc2V0IHJldHVybnMgYSBmbG9hdGluZyBwb2ludC5cclxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9wdWxsLzE4NzFcclxuICAgICAgICByZXR1cm4gLU1hdGgucm91bmQobS5fZC5nZXRUaW1lem9uZU9mZnNldCgpIC8gMTUpICogMTU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSE9PS1NcclxuXHJcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW5ldmVyIGEgbW9tZW50IGlzIG11dGF0ZWQuXHJcbiAgICAvLyBJdCBpcyBpbnRlbmRlZCB0byBrZWVwIHRoZSBvZmZzZXQgaW4gc3luYyB3aXRoIHRoZSB0aW1lem9uZS5cclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQgPSBmdW5jdGlvbiAoKSB7fTtcclxuXHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgLy8ga2VlcExvY2FsVGltZSA9IHRydWUgbWVhbnMgb25seSBjaGFuZ2UgdGhlIHRpbWV6b25lLCB3aXRob3V0XHJcbiAgICAvLyBhZmZlY3RpbmcgdGhlIGxvY2FsIGhvdXIuIFNvIDU6MzE6MjYgKzAzMDAgLS1bdXRjT2Zmc2V0KDIsIHRydWUpXS0tPlxyXG4gICAgLy8gNTozMToyNiArMDIwMCBJdCBpcyBwb3NzaWJsZSB0aGF0IDU6MzE6MjYgZG9lc24ndCBleGlzdCB3aXRoIG9mZnNldFxyXG4gICAgLy8gKzAyMDAsIHNvIHdlIGFkanVzdCB0aGUgdGltZSBhcyBuZWVkZWQsIHRvIGJlIHZhbGlkLlxyXG4gICAgLy9cclxuICAgIC8vIEtlZXBpbmcgdGhlIHRpbWUgYWN0dWFsbHkgYWRkcy9zdWJ0cmFjdHMgKG9uZSBob3VyKVxyXG4gICAgLy8gZnJvbSB0aGUgYWN0dWFsIHJlcHJlc2VudGVkIHRpbWUuIFRoYXQgaXMgd2h5IHdlIGNhbGwgdXBkYXRlT2Zmc2V0XHJcbiAgICAvLyBhIHNlY29uZCB0aW1lLiBJbiBjYXNlIGl0IHdhbnRzIHVzIHRvIGNoYW5nZSB0aGUgb2Zmc2V0IGFnYWluXHJcbiAgICAvLyBfY2hhbmdlSW5Qcm9ncmVzcyA9PSB0cnVlIGNhc2UsIHRoZW4gd2UgaGF2ZSB0byBhZGp1c3QsIGJlY2F1c2VcclxuICAgIC8vIHRoZXJlIGlzIG5vIHN1Y2ggdGltZSBpbiB0aGUgZ2l2ZW4gdGltZXpvbmUuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXRPZmZzZXQgKGlucHV0LCBrZWVwTG9jYWxUaW1lKSB7XHJcbiAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuX29mZnNldCB8fCAwLFxyXG4gICAgICAgICAgICBsb2NhbEFkanVzdDtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gb2Zmc2V0RnJvbVN0cmluZyhtYXRjaFNob3J0T2Zmc2V0LCBpbnB1dCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoaW5wdXQpIDwgMTYpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gaW5wdXQgKiA2MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2lzVVRDICYmIGtlZXBMb2NhbFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIGxvY2FsQWRqdXN0ID0gZ2V0RGF0ZU9mZnNldCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSBpbnB1dDtcclxuICAgICAgICAgICAgdGhpcy5faXNVVEMgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAobG9jYWxBZGp1c3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGQobG9jYWxBZGp1c3QsICdtJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9mZnNldCAhPT0gaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIGlmICgha2VlcExvY2FsVGltZSB8fCB0aGlzLl9jaGFuZ2VJblByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCh0aGlzLCBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uKGlucHV0IC0gb2Zmc2V0LCAnbScpLCAxLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9jaGFuZ2VJblByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VJblByb2dyZXNzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgPyBvZmZzZXQgOiBnZXREYXRlT2Zmc2V0KHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXRab25lIChpbnB1dCwga2VlcExvY2FsVGltZSkge1xyXG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IC1pbnB1dDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoaW5wdXQsIGtlZXBMb2NhbFRpbWUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIC10aGlzLnV0Y09mZnNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb1VUQyAoa2VlcExvY2FsVGltZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnV0Y09mZnNldCgwLCBrZWVwTG9jYWxUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb0xvY2FsIChrZWVwTG9jYWxUaW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzVVRDKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KDAsIGtlZXBMb2NhbFRpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9pc1VUQyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGtlZXBMb2NhbFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VidHJhY3QoZ2V0RGF0ZU9mZnNldCh0aGlzKSwgJ20nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb1BhcnNlZE9mZnNldCAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3R6bSkge1xyXG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCh0aGlzLl90em0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuX2kgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KG9mZnNldEZyb21TdHJpbmcobWF0Y2hPZmZzZXQsIHRoaXMuX2kpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFzQWxpZ25lZEhvdXJPZmZzZXQgKGlucHV0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlucHV0ID0gaW5wdXQgPyBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpLnV0Y09mZnNldCgpIDogMDtcclxuXHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnV0Y09mZnNldCgpIC0gaW5wdXQpICUgNjAgPT09IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNEYXlsaWdodFNhdmluZ1RpbWUgKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KCkgPiB0aGlzLmNsb25lKCkubW9udGgoMCkudXRjT2Zmc2V0KCkgfHxcclxuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoKSA+IHRoaXMuY2xvbmUoKS5tb250aCg1KS51dGNPZmZzZXQoKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNEYXlsaWdodFNhdmluZ1RpbWVTaGlmdGVkICgpIHtcclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX2lzRFNUU2hpZnRlZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzRFNUU2hpZnRlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjID0ge307XHJcblxyXG4gICAgICAgIGNvcHlDb25maWcoYywgdGhpcyk7XHJcbiAgICAgICAgYyA9IHByZXBhcmVDb25maWcoYyk7XHJcblxyXG4gICAgICAgIGlmIChjLl9hKSB7XHJcbiAgICAgICAgICAgIHZhciBvdGhlciA9IGMuX2lzVVRDID8gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKGMuX2EpIDogbG9jYWxfX2NyZWF0ZUxvY2FsKGMuX2EpO1xyXG4gICAgICAgICAgICB0aGlzLl9pc0RTVFNoaWZ0ZWQgPSB0aGlzLmlzVmFsaWQoKSAmJlxyXG4gICAgICAgICAgICAgICAgY29tcGFyZUFycmF5cyhjLl9hLCBvdGhlci50b0FycmF5KCkpID4gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9pc0RTVFNoaWZ0ZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0RTVFNoaWZ0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNMb2NhbCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gIXRoaXMuX2lzVVRDIDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNVdGNPZmZzZXQgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXMuX2lzVVRDIDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNVdGMgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXMuX2lzVVRDICYmIHRoaXMuX29mZnNldCA9PT0gMCA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFTUC5ORVQganNvbiBkYXRlIGZvcm1hdCByZWdleFxyXG4gICAgdmFyIGFzcE5ldFJlZ2V4ID0gL14oXFwtKT8oPzooXFxkKilbLiBdKT8oXFxkKylcXDooXFxkKykoPzpcXDooXFxkKylcXC4/KFxcZHszfSk/XFxkKik/JC87XHJcblxyXG4gICAgLy8gZnJvbSBodHRwOi8vZG9jcy5jbG9zdXJlLWxpYnJhcnkuZ29vZ2xlY29kZS5jb20vZ2l0L2Nsb3N1cmVfZ29vZ19kYXRlX2RhdGUuanMuc291cmNlLmh0bWxcclxuICAgIC8vIHNvbWV3aGF0IG1vcmUgaW4gbGluZSB3aXRoIDQuNC4zLjIgMjAwNCBzcGVjLCBidXQgYWxsb3dzIGRlY2ltYWwgYW55d2hlcmVcclxuICAgIC8vIGFuZCBmdXJ0aGVyIG1vZGlmaWVkIHRvIGFsbG93IGZvciBzdHJpbmdzIGNvbnRhaW5pbmcgYm90aCB3ZWVrIGFuZCBkYXlcclxuICAgIHZhciBpc29SZWdleCA9IC9eKC0pP1AoPzooLT9bMC05LC5dKilZKT8oPzooLT9bMC05LC5dKilNKT8oPzooLT9bMC05LC5dKilXKT8oPzooLT9bMC05LC5dKilEKT8oPzpUKD86KC0/WzAtOSwuXSopSCk/KD86KC0/WzAtOSwuXSopTSk/KD86KC0/WzAtOSwuXSopUyk/KT8kLztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uIChpbnB1dCwga2V5KSB7XHJcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gaW5wdXQsXHJcbiAgICAgICAgICAgIC8vIG1hdGNoaW5nIGFnYWluc3QgcmVnZXhwIGlzIGV4cGVuc2l2ZSwgZG8gaXQgb24gZGVtYW5kXHJcbiAgICAgICAgICAgIG1hdGNoID0gbnVsbCxcclxuICAgICAgICAgICAgc2lnbixcclxuICAgICAgICAgICAgcmV0LFxyXG4gICAgICAgICAgICBkaWZmUmVzO1xyXG5cclxuICAgICAgICBpZiAoaXNEdXJhdGlvbihpbnB1dCkpIHtcclxuICAgICAgICAgICAgZHVyYXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICBtcyA6IGlucHV0Ll9taWxsaXNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICBkICA6IGlucHV0Ll9kYXlzLFxyXG4gICAgICAgICAgICAgICAgTSAgOiBpbnB1dC5fbW9udGhzXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge307XHJcbiAgICAgICAgICAgIGlmIChrZXkpIHtcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uW2tleV0gPSBpbnB1dDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uLm1pbGxpc2Vjb25kcyA9IGlucHV0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICghIShtYXRjaCA9IGFzcE5ldFJlZ2V4LmV4ZWMoaW5wdXQpKSkge1xyXG4gICAgICAgICAgICBzaWduID0gKG1hdGNoWzFdID09PSAnLScpID8gLTEgOiAxO1xyXG4gICAgICAgICAgICBkdXJhdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIHkgIDogMCxcclxuICAgICAgICAgICAgICAgIGQgIDogdG9JbnQobWF0Y2hbREFURV0pICAgICAgICAqIHNpZ24sXHJcbiAgICAgICAgICAgICAgICBoICA6IHRvSW50KG1hdGNoW0hPVVJdKSAgICAgICAgKiBzaWduLFxyXG4gICAgICAgICAgICAgICAgbSAgOiB0b0ludChtYXRjaFtNSU5VVEVdKSAgICAgICogc2lnbixcclxuICAgICAgICAgICAgICAgIHMgIDogdG9JbnQobWF0Y2hbU0VDT05EXSkgICAgICAqIHNpZ24sXHJcbiAgICAgICAgICAgICAgICBtcyA6IHRvSW50KG1hdGNoW01JTExJU0VDT05EXSkgKiBzaWduXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIGlmICghIShtYXRjaCA9IGlzb1JlZ2V4LmV4ZWMoaW5wdXQpKSkge1xyXG4gICAgICAgICAgICBzaWduID0gKG1hdGNoWzFdID09PSAnLScpID8gLTEgOiAxO1xyXG4gICAgICAgICAgICBkdXJhdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIHkgOiBwYXJzZUlzbyhtYXRjaFsyXSwgc2lnbiksXHJcbiAgICAgICAgICAgICAgICBNIDogcGFyc2VJc28obWF0Y2hbM10sIHNpZ24pLFxyXG4gICAgICAgICAgICAgICAgdyA6IHBhcnNlSXNvKG1hdGNoWzRdLCBzaWduKSxcclxuICAgICAgICAgICAgICAgIGQgOiBwYXJzZUlzbyhtYXRjaFs1XSwgc2lnbiksXHJcbiAgICAgICAgICAgICAgICBoIDogcGFyc2VJc28obWF0Y2hbNl0sIHNpZ24pLFxyXG4gICAgICAgICAgICAgICAgbSA6IHBhcnNlSXNvKG1hdGNoWzddLCBzaWduKSxcclxuICAgICAgICAgICAgICAgIHMgOiBwYXJzZUlzbyhtYXRjaFs4XSwgc2lnbilcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2UgaWYgKGR1cmF0aW9uID09IG51bGwpIHsvLyBjaGVja3MgZm9yIG51bGwgb3IgdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge307XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZHVyYXRpb24gPT09ICdvYmplY3QnICYmICgnZnJvbScgaW4gZHVyYXRpb24gfHwgJ3RvJyBpbiBkdXJhdGlvbikpIHtcclxuICAgICAgICAgICAgZGlmZlJlcyA9IG1vbWVudHNEaWZmZXJlbmNlKGxvY2FsX19jcmVhdGVMb2NhbChkdXJhdGlvbi5mcm9tKSwgbG9jYWxfX2NyZWF0ZUxvY2FsKGR1cmF0aW9uLnRvKSk7XHJcblxyXG4gICAgICAgICAgICBkdXJhdGlvbiA9IHt9O1xyXG4gICAgICAgICAgICBkdXJhdGlvbi5tcyA9IGRpZmZSZXMubWlsbGlzZWNvbmRzO1xyXG4gICAgICAgICAgICBkdXJhdGlvbi5NID0gZGlmZlJlcy5tb250aHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXQgPSBuZXcgRHVyYXRpb24oZHVyYXRpb24pO1xyXG5cclxuICAgICAgICBpZiAoaXNEdXJhdGlvbihpbnB1dCkgJiYgaGFzT3duUHJvcChpbnB1dCwgJ19sb2NhbGUnKSkge1xyXG4gICAgICAgICAgICByZXQuX2xvY2FsZSA9IGlucHV0Ll9sb2NhbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24uZm4gPSBEdXJhdGlvbi5wcm90b3R5cGU7XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VJc28gKGlucCwgc2lnbikge1xyXG4gICAgICAgIC8vIFdlJ2Qgbm9ybWFsbHkgdXNlIH5+aW5wIGZvciB0aGlzLCBidXQgdW5mb3J0dW5hdGVseSBpdCBhbHNvXHJcbiAgICAgICAgLy8gY29udmVydHMgZmxvYXRzIHRvIGludHMuXHJcbiAgICAgICAgLy8gaW5wIG1heSBiZSB1bmRlZmluZWQsIHNvIGNhcmVmdWwgY2FsbGluZyByZXBsYWNlIG9uIGl0LlxyXG4gICAgICAgIHZhciByZXMgPSBpbnAgJiYgcGFyc2VGbG9hdChpbnAucmVwbGFjZSgnLCcsICcuJykpO1xyXG4gICAgICAgIC8vIGFwcGx5IHNpZ24gd2hpbGUgd2UncmUgYXQgaXRcclxuICAgICAgICByZXR1cm4gKGlzTmFOKHJlcykgPyAwIDogcmVzKSAqIHNpZ247XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShiYXNlLCBvdGhlcikge1xyXG4gICAgICAgIHZhciByZXMgPSB7bWlsbGlzZWNvbmRzOiAwLCBtb250aHM6IDB9O1xyXG5cclxuICAgICAgICByZXMubW9udGhzID0gb3RoZXIubW9udGgoKSAtIGJhc2UubW9udGgoKSArXHJcbiAgICAgICAgICAgIChvdGhlci55ZWFyKCkgLSBiYXNlLnllYXIoKSkgKiAxMjtcclxuICAgICAgICBpZiAoYmFzZS5jbG9uZSgpLmFkZChyZXMubW9udGhzLCAnTScpLmlzQWZ0ZXIob3RoZXIpKSB7XHJcbiAgICAgICAgICAgIC0tcmVzLm1vbnRocztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcy5taWxsaXNlY29uZHMgPSArb3RoZXIgLSArKGJhc2UuY2xvbmUoKS5hZGQocmVzLm1vbnRocywgJ00nKSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpIHtcclxuICAgICAgICB2YXIgcmVzO1xyXG4gICAgICAgIGlmICghKGJhc2UuaXNWYWxpZCgpICYmIG90aGVyLmlzVmFsaWQoKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHttaWxsaXNlY29uZHM6IDAsIG1vbnRoczogMH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvdGhlciA9IGNsb25lV2l0aE9mZnNldChvdGhlciwgYmFzZSk7XHJcbiAgICAgICAgaWYgKGJhc2UuaXNCZWZvcmUob3RoZXIpKSB7XHJcbiAgICAgICAgICAgIHJlcyA9IHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlcyA9IHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2Uob3RoZXIsIGJhc2UpO1xyXG4gICAgICAgICAgICByZXMubWlsbGlzZWNvbmRzID0gLXJlcy5taWxsaXNlY29uZHM7XHJcbiAgICAgICAgICAgIHJlcy5tb250aHMgPSAtcmVzLm1vbnRocztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWJzUm91bmQgKG51bWJlcikge1xyXG4gICAgICAgIGlmIChudW1iZXIgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKC0xICogbnVtYmVyKSAqIC0xO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKG51bWJlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE86IHJlbW92ZSAnbmFtZScgYXJnIGFmdGVyIGRlcHJlY2F0aW9uIGlzIHJlbW92ZWRcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUFkZGVyKGRpcmVjdGlvbiwgbmFtZSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBwZXJpb2QpIHtcclxuICAgICAgICAgICAgdmFyIGR1ciwgdG1wO1xyXG4gICAgICAgICAgICAvL2ludmVydCB0aGUgYXJndW1lbnRzLCBidXQgY29tcGxhaW4gYWJvdXQgaXRcclxuICAgICAgICAgICAgaWYgKHBlcmlvZCAhPT0gbnVsbCAmJiAhaXNOYU4oK3BlcmlvZCkpIHtcclxuICAgICAgICAgICAgICAgIGRlcHJlY2F0ZVNpbXBsZShuYW1lLCAnbW9tZW50KCkuJyArIG5hbWUgICsgJyhwZXJpb2QsIG51bWJlcikgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBtb21lbnQoKS4nICsgbmFtZSArICcobnVtYmVyLCBwZXJpb2QpLicpO1xyXG4gICAgICAgICAgICAgICAgdG1wID0gdmFsOyB2YWwgPSBwZXJpb2Q7IHBlcmlvZCA9IHRtcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFsID0gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgPyArdmFsIDogdmFsO1xyXG4gICAgICAgICAgICBkdXIgPSBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uKHZhbCwgcGVyaW9kKTtcclxuICAgICAgICAgICAgYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCh0aGlzLCBkdXIsIGRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCAobW9tLCBkdXJhdGlvbiwgaXNBZGRpbmcsIHVwZGF0ZU9mZnNldCkge1xyXG4gICAgICAgIHZhciBtaWxsaXNlY29uZHMgPSBkdXJhdGlvbi5fbWlsbGlzZWNvbmRzLFxyXG4gICAgICAgICAgICBkYXlzID0gYWJzUm91bmQoZHVyYXRpb24uX2RheXMpLFxyXG4gICAgICAgICAgICBtb250aHMgPSBhYnNSb3VuZChkdXJhdGlvbi5fbW9udGhzKTtcclxuXHJcbiAgICAgICAgaWYgKCFtb20uaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIG9wXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVwZGF0ZU9mZnNldCA9IHVwZGF0ZU9mZnNldCA9PSBudWxsID8gdHJ1ZSA6IHVwZGF0ZU9mZnNldDtcclxuXHJcbiAgICAgICAgaWYgKG1pbGxpc2Vjb25kcykge1xyXG4gICAgICAgICAgICBtb20uX2Quc2V0VGltZShtb20uX2QudmFsdWVPZigpICsgbWlsbGlzZWNvbmRzICogaXNBZGRpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF5cykge1xyXG4gICAgICAgICAgICBnZXRfc2V0X19zZXQobW9tLCAnRGF0ZScsIGdldF9zZXRfX2dldChtb20sICdEYXRlJykgKyBkYXlzICogaXNBZGRpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobW9udGhzKSB7XHJcbiAgICAgICAgICAgIHNldE1vbnRoKG1vbSwgZ2V0X3NldF9fZ2V0KG1vbSwgJ01vbnRoJykgKyBtb250aHMgKiBpc0FkZGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1cGRhdGVPZmZzZXQpIHtcclxuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldChtb20sIGRheXMgfHwgbW9udGhzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGFkZF9zdWJ0cmFjdF9fYWRkICAgICAgPSBjcmVhdGVBZGRlcigxLCAnYWRkJyk7XHJcbiAgICB2YXIgYWRkX3N1YnRyYWN0X19zdWJ0cmFjdCA9IGNyZWF0ZUFkZGVyKC0xLCAnc3VidHJhY3QnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBtb21lbnRfY2FsZW5kYXJfX2NhbGVuZGFyICh0aW1lLCBmb3JtYXRzKSB7XHJcbiAgICAgICAgLy8gV2Ugd2FudCB0byBjb21wYXJlIHRoZSBzdGFydCBvZiB0b2RheSwgdnMgdGhpcy5cclxuICAgICAgICAvLyBHZXR0aW5nIHN0YXJ0LW9mLXRvZGF5IGRlcGVuZHMgb24gd2hldGhlciB3ZSdyZSBsb2NhbC91dGMvb2Zmc2V0IG9yIG5vdC5cclxuICAgICAgICB2YXIgbm93ID0gdGltZSB8fCBsb2NhbF9fY3JlYXRlTG9jYWwoKSxcclxuICAgICAgICAgICAgc29kID0gY2xvbmVXaXRoT2Zmc2V0KG5vdywgdGhpcykuc3RhcnRPZignZGF5JyksXHJcbiAgICAgICAgICAgIGRpZmYgPSB0aGlzLmRpZmYoc29kLCAnZGF5cycsIHRydWUpLFxyXG4gICAgICAgICAgICBmb3JtYXQgPSBkaWZmIDwgLTYgPyAnc2FtZUVsc2UnIDpcclxuICAgICAgICAgICAgICAgIGRpZmYgPCAtMSA/ICdsYXN0V2VlaycgOlxyXG4gICAgICAgICAgICAgICAgZGlmZiA8IDAgPyAnbGFzdERheScgOlxyXG4gICAgICAgICAgICAgICAgZGlmZiA8IDEgPyAnc2FtZURheScgOlxyXG4gICAgICAgICAgICAgICAgZGlmZiA8IDIgPyAnbmV4dERheScgOlxyXG4gICAgICAgICAgICAgICAgZGlmZiA8IDcgPyAnbmV4dFdlZWsnIDogJ3NhbWVFbHNlJztcclxuXHJcbiAgICAgICAgdmFyIG91dHB1dCA9IGZvcm1hdHMgJiYgKGlzRnVuY3Rpb24oZm9ybWF0c1tmb3JtYXRdKSA/IGZvcm1hdHNbZm9ybWF0XSgpIDogZm9ybWF0c1tmb3JtYXRdKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0KG91dHB1dCB8fCB0aGlzLmxvY2FsZURhdGEoKS5jYWxlbmRhcihmb3JtYXQsIHRoaXMsIGxvY2FsX19jcmVhdGVMb2NhbChub3cpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvbmUgKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTW9tZW50KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzQWZ0ZXIgKGlucHV0LCB1bml0cykge1xyXG4gICAgICAgIHZhciBsb2NhbElucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpO1xyXG4gICAgICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHMoIWlzVW5kZWZpbmVkKHVuaXRzKSA/IHVuaXRzIDogJ21pbGxpc2Vjb25kJyk7XHJcbiAgICAgICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA+IGxvY2FsSW5wdXQudmFsdWVPZigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhbElucHV0LnZhbHVlT2YoKSA8IHRoaXMuY2xvbmUoKS5zdGFydE9mKHVuaXRzKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzQmVmb3JlIChpbnB1dCwgdW5pdHMpIHtcclxuICAgICAgICB2YXIgbG9jYWxJbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KTtcclxuICAgICAgICBpZiAoISh0aGlzLmlzVmFsaWQoKSAmJiBsb2NhbElucHV0LmlzVmFsaWQoKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKCFpc1VuZGVmaW5lZCh1bml0cykgPyB1bml0cyA6ICdtaWxsaXNlY29uZCcpO1xyXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCkgPCBsb2NhbElucHV0LnZhbHVlT2YoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmVuZE9mKHVuaXRzKS52YWx1ZU9mKCkgPCBsb2NhbElucHV0LnZhbHVlT2YoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNCZXR3ZWVuIChmcm9tLCB0bywgdW5pdHMsIGluY2x1c2l2aXR5KSB7XHJcbiAgICAgICAgaW5jbHVzaXZpdHkgPSBpbmNsdXNpdml0eSB8fCAnKCknO1xyXG4gICAgICAgIHJldHVybiAoaW5jbHVzaXZpdHlbMF0gPT09ICcoJyA/IHRoaXMuaXNBZnRlcihmcm9tLCB1bml0cykgOiAhdGhpcy5pc0JlZm9yZShmcm9tLCB1bml0cykpICYmXHJcbiAgICAgICAgICAgIChpbmNsdXNpdml0eVsxXSA9PT0gJyknID8gdGhpcy5pc0JlZm9yZSh0bywgdW5pdHMpIDogIXRoaXMuaXNBZnRlcih0bywgdW5pdHMpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc1NhbWUgKGlucHV0LCB1bml0cykge1xyXG4gICAgICAgIHZhciBsb2NhbElucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpLFxyXG4gICAgICAgICAgICBpbnB1dE1zO1xyXG4gICAgICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMgfHwgJ21pbGxpc2Vjb25kJyk7XHJcbiAgICAgICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA9PT0gbG9jYWxJbnB1dC52YWx1ZU9mKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5wdXRNcyA9IGxvY2FsSW5wdXQudmFsdWVPZigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpLnN0YXJ0T2YodW5pdHMpLnZhbHVlT2YoKSA8PSBpbnB1dE1zICYmIGlucHV0TXMgPD0gdGhpcy5jbG9uZSgpLmVuZE9mKHVuaXRzKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzU2FtZU9yQWZ0ZXIgKGlucHV0LCB1bml0cykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzU2FtZShpbnB1dCwgdW5pdHMpIHx8IHRoaXMuaXNBZnRlcihpbnB1dCx1bml0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNTYW1lT3JCZWZvcmUgKGlucHV0LCB1bml0cykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzU2FtZShpbnB1dCwgdW5pdHMpIHx8IHRoaXMuaXNCZWZvcmUoaW5wdXQsdW5pdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRpZmYgKGlucHV0LCB1bml0cywgYXNGbG9hdCkge1xyXG4gICAgICAgIHZhciB0aGF0LFxyXG4gICAgICAgICAgICB6b25lRGVsdGEsXHJcbiAgICAgICAgICAgIGRlbHRhLCBvdXRwdXQ7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE5hTjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoYXQgPSBjbG9uZVdpdGhPZmZzZXQoaW5wdXQsIHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAoIXRoYXQuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBOYU47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB6b25lRGVsdGEgPSAodGhhdC51dGNPZmZzZXQoKSAtIHRoaXMudXRjT2Zmc2V0KCkpICogNmU0O1xyXG5cclxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcclxuXHJcbiAgICAgICAgaWYgKHVuaXRzID09PSAneWVhcicgfHwgdW5pdHMgPT09ICdtb250aCcgfHwgdW5pdHMgPT09ICdxdWFydGVyJykge1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBtb250aERpZmYodGhpcywgdGhhdCk7XHJcbiAgICAgICAgICAgIGlmICh1bml0cyA9PT0gJ3F1YXJ0ZXInKSB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQgLyAzO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVuaXRzID09PSAneWVhcicpIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dCAvIDEyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGVsdGEgPSB0aGlzIC0gdGhhdDtcclxuICAgICAgICAgICAgb3V0cHV0ID0gdW5pdHMgPT09ICdzZWNvbmQnID8gZGVsdGEgLyAxZTMgOiAvLyAxMDAwXHJcbiAgICAgICAgICAgICAgICB1bml0cyA9PT0gJ21pbnV0ZScgPyBkZWx0YSAvIDZlNCA6IC8vIDEwMDAgKiA2MFxyXG4gICAgICAgICAgICAgICAgdW5pdHMgPT09ICdob3VyJyA/IGRlbHRhIC8gMzZlNSA6IC8vIDEwMDAgKiA2MCAqIDYwXHJcbiAgICAgICAgICAgICAgICB1bml0cyA9PT0gJ2RheScgPyAoZGVsdGEgLSB6b25lRGVsdGEpIC8gODY0ZTUgOiAvLyAxMDAwICogNjAgKiA2MCAqIDI0LCBuZWdhdGUgZHN0XHJcbiAgICAgICAgICAgICAgICB1bml0cyA9PT0gJ3dlZWsnID8gKGRlbHRhIC0gem9uZURlbHRhKSAvIDYwNDhlNSA6IC8vIDEwMDAgKiA2MCAqIDYwICogMjQgKiA3LCBuZWdhdGUgZHN0XHJcbiAgICAgICAgICAgICAgICBkZWx0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFzRmxvYXQgPyBvdXRwdXQgOiBhYnNGbG9vcihvdXRwdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vbnRoRGlmZiAoYSwgYikge1xyXG4gICAgICAgIC8vIGRpZmZlcmVuY2UgaW4gbW9udGhzXHJcbiAgICAgICAgdmFyIHdob2xlTW9udGhEaWZmID0gKChiLnllYXIoKSAtIGEueWVhcigpKSAqIDEyKSArIChiLm1vbnRoKCkgLSBhLm1vbnRoKCkpLFxyXG4gICAgICAgICAgICAvLyBiIGlzIGluIChhbmNob3IgLSAxIG1vbnRoLCBhbmNob3IgKyAxIG1vbnRoKVxyXG4gICAgICAgICAgICBhbmNob3IgPSBhLmNsb25lKCkuYWRkKHdob2xlTW9udGhEaWZmLCAnbW9udGhzJyksXHJcbiAgICAgICAgICAgIGFuY2hvcjIsIGFkanVzdDtcclxuXHJcbiAgICAgICAgaWYgKGIgLSBhbmNob3IgPCAwKSB7XHJcbiAgICAgICAgICAgIGFuY2hvcjIgPSBhLmNsb25lKCkuYWRkKHdob2xlTW9udGhEaWZmIC0gMSwgJ21vbnRocycpO1xyXG4gICAgICAgICAgICAvLyBsaW5lYXIgYWNyb3NzIHRoZSBtb250aFxyXG4gICAgICAgICAgICBhZGp1c3QgPSAoYiAtIGFuY2hvcikgLyAoYW5jaG9yIC0gYW5jaG9yMik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYW5jaG9yMiA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYgKyAxLCAnbW9udGhzJyk7XHJcbiAgICAgICAgICAgIC8vIGxpbmVhciBhY3Jvc3MgdGhlIG1vbnRoXHJcbiAgICAgICAgICAgIGFkanVzdCA9IChiIC0gYW5jaG9yKSAvIChhbmNob3IyIC0gYW5jaG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY2hlY2sgZm9yIG5lZ2F0aXZlIHplcm8sIHJldHVybiB6ZXJvIGlmIG5lZ2F0aXZlIHplcm9cclxuICAgICAgICByZXR1cm4gLSh3aG9sZU1vbnRoRGlmZiArIGFkanVzdCkgfHwgMDtcclxuICAgIH1cclxuXHJcbiAgICB1dGlsc19ob29rc19faG9va3MuZGVmYXVsdEZvcm1hdCA9ICdZWVlZLU1NLUREVEhIOm1tOnNzWic7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MuZGVmYXVsdEZvcm1hdFV0YyA9ICdZWVlZLU1NLUREVEhIOm1tOnNzW1pdJztcclxuXHJcbiAgICBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5sb2NhbGUoJ2VuJykuZm9ybWF0KCdkZGQgTU1NIEREIFlZWVkgSEg6bW06c3MgW0dNVF1aWicpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vbWVudF9mb3JtYXRfX3RvSVNPU3RyaW5nICgpIHtcclxuICAgICAgICB2YXIgbSA9IHRoaXMuY2xvbmUoKS51dGMoKTtcclxuICAgICAgICBpZiAoMCA8IG0ueWVhcigpICYmIG0ueWVhcigpIDw9IDk5OTkpIHtcclxuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBuYXRpdmUgaW1wbGVtZW50YXRpb24gaXMgfjUweCBmYXN0ZXIsIHVzZSBpdCB3aGVuIHdlIGNhblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9EYXRlKCkudG9JU09TdHJpbmcoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXRNb21lbnQobSwgJ1lZWVktTU0tRERbVF1ISDptbTpzcy5TU1NbWl0nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXRNb21lbnQobSwgJ1lZWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1taXScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmb3JtYXQgKGlucHV0U3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCFpbnB1dFN0cmluZykge1xyXG4gICAgICAgICAgICBpbnB1dFN0cmluZyA9IHRoaXMuaXNVdGMoKSA/IHV0aWxzX2hvb2tzX19ob29rcy5kZWZhdWx0Rm9ybWF0VXRjIDogdXRpbHNfaG9va3NfX2hvb2tzLmRlZmF1bHRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvdXRwdXQgPSBmb3JtYXRNb21lbnQodGhpcywgaW5wdXRTdHJpbmcpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5wb3N0Zm9ybWF0KG91dHB1dCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZnJvbSAodGltZSwgd2l0aG91dFN1ZmZpeCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJlxyXG4gICAgICAgICAgICAgICAgKChpc01vbWVudCh0aW1lKSAmJiB0aW1lLmlzVmFsaWQoKSkgfHxcclxuICAgICAgICAgICAgICAgICBsb2NhbF9fY3JlYXRlTG9jYWwodGltZSkuaXNWYWxpZCgpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlX19jcmVhdGVEdXJhdGlvbih7dG86IHRoaXMsIGZyb206IHRpbWV9KS5sb2NhbGUodGhpcy5sb2NhbGUoKSkuaHVtYW5pemUoIXdpdGhvdXRTdWZmaXgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmcm9tTm93ICh3aXRob3V0U3VmZml4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJvbShsb2NhbF9fY3JlYXRlTG9jYWwoKSwgd2l0aG91dFN1ZmZpeCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG8gKHRpbWUsIHdpdGhvdXRTdWZmaXgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiZcclxuICAgICAgICAgICAgICAgICgoaXNNb21lbnQodGltZSkgJiYgdGltZS5pc1ZhbGlkKCkpIHx8XHJcbiAgICAgICAgICAgICAgICAgbG9jYWxfX2NyZWF0ZUxvY2FsKHRpbWUpLmlzVmFsaWQoKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24oe2Zyb206IHRoaXMsIHRvOiB0aW1lfSkubG9jYWxlKHRoaXMubG9jYWxlKCkpLmh1bWFuaXplKCF3aXRob3V0U3VmZml4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9Ob3cgKHdpdGhvdXRTdWZmaXgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50byhsb2NhbF9fY3JlYXRlTG9jYWwoKSwgd2l0aG91dFN1ZmZpeCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgcGFzc2VkIGEgbG9jYWxlIGtleSwgaXQgd2lsbCBzZXQgdGhlIGxvY2FsZSBmb3IgdGhpc1xyXG4gICAgLy8gaW5zdGFuY2UuICBPdGhlcndpc2UsIGl0IHdpbGwgcmV0dXJuIHRoZSBsb2NhbGUgY29uZmlndXJhdGlvblxyXG4gICAgLy8gdmFyaWFibGVzIGZvciB0aGlzIGluc3RhbmNlLlxyXG4gICAgZnVuY3Rpb24gbG9jYWxlIChrZXkpIHtcclxuICAgICAgICB2YXIgbmV3TG9jYWxlRGF0YTtcclxuXHJcbiAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGUuX2FiYnI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3TG9jYWxlRGF0YSA9IGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUoa2V5KTtcclxuICAgICAgICAgICAgaWYgKG5ld0xvY2FsZURhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9jYWxlID0gbmV3TG9jYWxlRGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGxhbmcgPSBkZXByZWNhdGUoXHJcbiAgICAgICAgJ21vbWVudCgpLmxhbmcoKSBpcyBkZXByZWNhdGVkLiBJbnN0ZWFkLCB1c2UgbW9tZW50KCkubG9jYWxlRGF0YSgpIHRvIGdldCB0aGUgbGFuZ3VhZ2UgY29uZmlndXJhdGlvbi4gVXNlIG1vbWVudCgpLmxvY2FsZSgpIHRvIGNoYW5nZSBsYW5ndWFnZXMuJyxcclxuICAgICAgICBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvY2FsZURhdGEgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3RhcnRPZiAodW5pdHMpIHtcclxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcclxuICAgICAgICAvLyB0aGUgZm9sbG93aW5nIHN3aXRjaCBpbnRlbnRpb25hbGx5IG9taXRzIGJyZWFrIGtleXdvcmRzXHJcbiAgICAgICAgLy8gdG8gdXRpbGl6ZSBmYWxsaW5nIHRocm91Z2ggdGhlIGNhc2VzLlxyXG4gICAgICAgIHN3aXRjaCAodW5pdHMpIHtcclxuICAgICAgICBjYXNlICd5ZWFyJzpcclxuICAgICAgICAgICAgdGhpcy5tb250aCgwKTtcclxuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xyXG4gICAgICAgIGNhc2UgJ3F1YXJ0ZXInOlxyXG4gICAgICAgIGNhc2UgJ21vbnRoJzpcclxuICAgICAgICAgICAgdGhpcy5kYXRlKDEpO1xyXG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXHJcbiAgICAgICAgY2FzZSAnd2Vlayc6XHJcbiAgICAgICAgY2FzZSAnaXNvV2Vlayc6XHJcbiAgICAgICAgY2FzZSAnZGF5JzpcclxuICAgICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICAgICAgdGhpcy5ob3VycygwKTtcclxuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xyXG4gICAgICAgIGNhc2UgJ2hvdXInOlxyXG4gICAgICAgICAgICB0aGlzLm1pbnV0ZXMoMCk7XHJcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cclxuICAgICAgICBjYXNlICdtaW51dGUnOlxyXG4gICAgICAgICAgICB0aGlzLnNlY29uZHMoMCk7XHJcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cclxuICAgICAgICBjYXNlICdzZWNvbmQnOlxyXG4gICAgICAgICAgICB0aGlzLm1pbGxpc2Vjb25kcygwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHdlZWtzIGFyZSBhIHNwZWNpYWwgY2FzZVxyXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ3dlZWsnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2Vla2RheSgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVuaXRzID09PSAnaXNvV2VlaycpIHtcclxuICAgICAgICAgICAgdGhpcy5pc29XZWVrZGF5KDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcXVhcnRlcnMgYXJlIGFsc28gc3BlY2lhbFxyXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ3F1YXJ0ZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9udGgoTWF0aC5mbG9vcih0aGlzLm1vbnRoKCkgLyAzKSAqIDMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZW5kT2YgKHVuaXRzKSB7XHJcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XHJcbiAgICAgICAgaWYgKHVuaXRzID09PSB1bmRlZmluZWQgfHwgdW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAnZGF0ZScgaXMgYW4gYWxpYXMgZm9yICdkYXknLCBzbyBpdCBzaG91bGQgYmUgY29uc2lkZXJlZCBhcyBzdWNoLlxyXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ2RhdGUnKSB7XHJcbiAgICAgICAgICAgIHVuaXRzID0gJ2RheSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydE9mKHVuaXRzKS5hZGQoMSwgKHVuaXRzID09PSAnaXNvV2VlaycgPyAnd2VlaycgOiB1bml0cykpLnN1YnRyYWN0KDEsICdtcycpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvX3R5cGVfX3ZhbHVlT2YgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kLnZhbHVlT2YoKSAtICgodGhpcy5fb2Zmc2V0IHx8IDApICogNjAwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVuaXggKCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMudmFsdWVPZigpIC8gMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9EYXRlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb2Zmc2V0ID8gbmV3IERhdGUodGhpcy52YWx1ZU9mKCkpIDogdGhpcy5fZDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b0FycmF5ICgpIHtcclxuICAgICAgICB2YXIgbSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIFttLnllYXIoKSwgbS5tb250aCgpLCBtLmRhdGUoKSwgbS5ob3VyKCksIG0ubWludXRlKCksIG0uc2Vjb25kKCksIG0ubWlsbGlzZWNvbmQoKV07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9PYmplY3QgKCkge1xyXG4gICAgICAgIHZhciBtID0gdGhpcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB5ZWFyczogbS55ZWFyKCksXHJcbiAgICAgICAgICAgIG1vbnRoczogbS5tb250aCgpLFxyXG4gICAgICAgICAgICBkYXRlOiBtLmRhdGUoKSxcclxuICAgICAgICAgICAgaG91cnM6IG0uaG91cnMoKSxcclxuICAgICAgICAgICAgbWludXRlczogbS5taW51dGVzKCksXHJcbiAgICAgICAgICAgIHNlY29uZHM6IG0uc2Vjb25kcygpLFxyXG4gICAgICAgICAgICBtaWxsaXNlY29uZHM6IG0ubWlsbGlzZWNvbmRzKClcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvSlNPTiAoKSB7XHJcbiAgICAgICAgLy8gbmV3IERhdGUoTmFOKS50b0pTT04oKSA9PT0gbnVsbFxyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXMudG9JU09TdHJpbmcoKSA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW9tZW50X3ZhbGlkX19pc1ZhbGlkICgpIHtcclxuICAgICAgICByZXR1cm4gdmFsaWRfX2lzVmFsaWQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2luZ0ZsYWdzICgpIHtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kKHt9LCBnZXRQYXJzaW5nRmxhZ3ModGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGludmFsaWRBdCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldFBhcnNpbmdGbGFncyh0aGlzKS5vdmVyZmxvdztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGlvbkRhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaW5wdXQ6IHRoaXMuX2ksXHJcbiAgICAgICAgICAgIGZvcm1hdDogdGhpcy5fZixcclxuICAgICAgICAgICAgbG9jYWxlOiB0aGlzLl9sb2NhbGUsXHJcbiAgICAgICAgICAgIGlzVVRDOiB0aGlzLl9pc1VUQyxcclxuICAgICAgICAgICAgc3RyaWN0OiB0aGlzLl9zdHJpY3RcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ2dnJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53ZWVrWWVhcigpICUgMTAwO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydHRycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNvV2Vla1llYXIoKSAlIDEwMDtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4gKHRva2VuLCBnZXR0ZXIpIHtcclxuICAgICAgICBhZGRGb3JtYXRUb2tlbigwLCBbdG9rZW4sIHRva2VuLmxlbmd0aF0sIDAsIGdldHRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkV2Vla1llYXJGb3JtYXRUb2tlbignZ2dnZycsICAgICAnd2Vla1llYXInKTtcclxuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ2dnZ2dnJywgICAgJ3dlZWtZZWFyJyk7XHJcbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdHR0dHJywgICdpc29XZWVrWWVhcicpO1xyXG4gICAgYWRkV2Vla1llYXJGb3JtYXRUb2tlbignR0dHR0cnLCAnaXNvV2Vla1llYXInKTtcclxuXHJcbiAgICAvLyBBTElBU0VTXHJcblxyXG4gICAgYWRkVW5pdEFsaWFzKCd3ZWVrWWVhcicsICdnZycpO1xyXG4gICAgYWRkVW5pdEFsaWFzKCdpc29XZWVrWWVhcicsICdHRycpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdHJywgICAgICBtYXRjaFNpZ25lZCk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdnJywgICAgICBtYXRjaFNpZ25lZCk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdHRycsICAgICBtYXRjaDF0bzIsIG1hdGNoMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdnZycsICAgICBtYXRjaDF0bzIsIG1hdGNoMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdHR0dHJywgICBtYXRjaDF0bzQsIG1hdGNoNCk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdnZ2dnJywgICBtYXRjaDF0bzQsIG1hdGNoNCk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdHR0dHRycsICBtYXRjaDF0bzYsIG1hdGNoNik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdnZ2dnZycsICBtYXRjaDF0bzYsIG1hdGNoNik7XHJcblxyXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWydnZ2dnJywgJ2dnZ2dnJywgJ0dHR0cnLCAnR0dHR0cnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XHJcbiAgICAgICAgd2Vla1t0b2tlbi5zdWJzdHIoMCwgMildID0gdG9JbnQoaW5wdXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWydnZycsICdHRyddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcclxuICAgICAgICB3ZWVrW3Rva2VuXSA9IHV0aWxzX2hvb2tzX19ob29rcy5wYXJzZVR3b0RpZ2l0WWVhcihpbnB1dCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0V2Vla1llYXIgKGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGdldFNldFdlZWtZZWFySGVscGVyLmNhbGwodGhpcyxcclxuICAgICAgICAgICAgICAgIGlucHV0LFxyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWVrKCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLndlZWtkYXkoKSxcclxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRvdyxcclxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRveSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0SVNPV2Vla1llYXIgKGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGdldFNldFdlZWtZZWFySGVscGVyLmNhbGwodGhpcyxcclxuICAgICAgICAgICAgICAgIGlucHV0LCB0aGlzLmlzb1dlZWsoKSwgdGhpcy5pc29XZWVrZGF5KCksIDEsIDQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldElTT1dlZWtzSW5ZZWFyICgpIHtcclxuICAgICAgICByZXR1cm4gd2Vla3NJblllYXIodGhpcy55ZWFyKCksIDEsIDQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFdlZWtzSW5ZZWFyICgpIHtcclxuICAgICAgICB2YXIgd2Vla0luZm8gPSB0aGlzLmxvY2FsZURhdGEoKS5fd2VlaztcclxuICAgICAgICByZXR1cm4gd2Vla3NJblllYXIodGhpcy55ZWFyKCksIHdlZWtJbmZvLmRvdywgd2Vla0luZm8uZG95KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXRXZWVrWWVhckhlbHBlcihpbnB1dCwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpIHtcclxuICAgICAgICB2YXIgd2Vla3NUYXJnZXQ7XHJcbiAgICAgICAgaWYgKGlucHV0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdlZWtPZlllYXIodGhpcywgZG93LCBkb3kpLnllYXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2Vla3NUYXJnZXQgPSB3ZWVrc0luWWVhcihpbnB1dCwgZG93LCBkb3kpO1xyXG4gICAgICAgICAgICBpZiAod2VlayA+IHdlZWtzVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICB3ZWVrID0gd2Vla3NUYXJnZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNldFdlZWtBbGwuY2FsbCh0aGlzLCBpbnB1dCwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRXZWVrQWxsKHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSkge1xyXG4gICAgICAgIHZhciBkYXlPZlllYXJEYXRhID0gZGF5T2ZZZWFyRnJvbVdlZWtzKHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSksXHJcbiAgICAgICAgICAgIGRhdGUgPSBjcmVhdGVVVENEYXRlKGRheU9mWWVhckRhdGEueWVhciwgMCwgZGF5T2ZZZWFyRGF0YS5kYXlPZlllYXIpO1xyXG5cclxuICAgICAgICB0aGlzLnllYXIoZGF0ZS5nZXRVVENGdWxsWWVhcigpKTtcclxuICAgICAgICB0aGlzLm1vbnRoKGRhdGUuZ2V0VVRDTW9udGgoKSk7XHJcbiAgICAgICAgdGhpcy5kYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1EnLCAwLCAnUW8nLCAncXVhcnRlcicpO1xyXG5cclxuICAgIC8vIEFMSUFTRVNcclxuXHJcbiAgICBhZGRVbml0QWxpYXMoJ3F1YXJ0ZXInLCAnUScpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdRJywgbWF0Y2gxKTtcclxuICAgIGFkZFBhcnNlVG9rZW4oJ1EnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XHJcbiAgICAgICAgYXJyYXlbTU9OVEhdID0gKHRvSW50KGlucHV0KSAtIDEpICogMztcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXRRdWFydGVyIChpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gTWF0aC5jZWlsKCh0aGlzLm1vbnRoKCkgKyAxKSAvIDMpIDogdGhpcy5tb250aCgoaW5wdXQgLSAxKSAqIDMgKyB0aGlzLm1vbnRoKCkgJSAzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ3cnLCBbJ3d3JywgMl0sICd3bycsICd3ZWVrJyk7XHJcbiAgICBhZGRGb3JtYXRUb2tlbignVycsIFsnV1cnLCAyXSwgJ1dvJywgJ2lzb1dlZWsnKTtcclxuXHJcbiAgICAvLyBBTElBU0VTXHJcblxyXG4gICAgYWRkVW5pdEFsaWFzKCd3ZWVrJywgJ3cnKTtcclxuICAgIGFkZFVuaXRBbGlhcygnaXNvV2VlaycsICdXJyk7XHJcblxyXG4gICAgLy8gUEFSU0lOR1xyXG5cclxuICAgIGFkZFJlZ2V4VG9rZW4oJ3cnLCAgbWF0Y2gxdG8yKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ3d3JywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignVycsICBtYXRjaDF0bzIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignV1cnLCBtYXRjaDF0bzIsIG1hdGNoMik7XHJcblxyXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWyd3JywgJ3d3JywgJ1cnLCAnV1cnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XHJcbiAgICAgICAgd2Vla1t0b2tlbi5zdWJzdHIoMCwgMSldID0gdG9JbnQoaW5wdXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSEVMUEVSU1xyXG5cclxuICAgIC8vIExPQ0FMRVNcclxuXHJcbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrIChtb20pIHtcclxuICAgICAgICByZXR1cm4gd2Vla09mWWVhcihtb20sIHRoaXMuX3dlZWsuZG93LCB0aGlzLl93ZWVrLmRveSkud2VlaztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdExvY2FsZVdlZWsgPSB7XHJcbiAgICAgICAgZG93IDogMCwgLy8gU3VuZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXHJcbiAgICAgICAgZG95IDogNiAgLy8gVGhlIHdlZWsgdGhhdCBjb250YWlucyBKYW4gMXN0IGlzIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyLlxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBsb2NhbGVGaXJzdERheU9mV2VlayAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWsuZG93O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxvY2FsZUZpcnN0RGF5T2ZZZWFyICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2Vlay5kb3k7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldFdlZWsgKGlucHV0KSB7XHJcbiAgICAgICAgdmFyIHdlZWsgPSB0aGlzLmxvY2FsZURhdGEoKS53ZWVrKHRoaXMpO1xyXG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gd2VlayA6IHRoaXMuYWRkKChpbnB1dCAtIHdlZWspICogNywgJ2QnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXRJU09XZWVrIChpbnB1dCkge1xyXG4gICAgICAgIHZhciB3ZWVrID0gd2Vla09mWWVhcih0aGlzLCAxLCA0KS53ZWVrO1xyXG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gd2VlayA6IHRoaXMuYWRkKChpbnB1dCAtIHdlZWspICogNywgJ2QnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0QnLCBbJ0REJywgMl0sICdEbycsICdkYXRlJyk7XHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygnZGF0ZScsICdEJyk7XHJcblxyXG4gICAgLy8gUEFSU0lOR1xyXG5cclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0QnLCAgbWF0Y2gxdG8yKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0REJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignRG8nLCBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBpc1N0cmljdCA/IGxvY2FsZS5fb3JkaW5hbFBhcnNlIDogbG9jYWxlLl9vcmRpbmFsUGFyc2VMZW5pZW50O1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkUGFyc2VUb2tlbihbJ0QnLCAnREQnXSwgREFURSk7XHJcbiAgICBhZGRQYXJzZVRva2VuKCdEbycsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcclxuICAgICAgICBhcnJheVtEQVRFXSA9IHRvSW50KGlucHV0Lm1hdGNoKG1hdGNoMXRvMilbMF0sIDEwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICB2YXIgZ2V0U2V0RGF5T2ZNb250aCA9IG1ha2VHZXRTZXQoJ0RhdGUnLCB0cnVlKTtcclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2QnLCAwLCAnZG8nLCAnZGF5Jyk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2RkJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5c01pbih0aGlzLCBmb3JtYXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2RkZCcsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXNTaG9ydCh0aGlzLCBmb3JtYXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2RkZGQnLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLndlZWtkYXlzKHRoaXMsIGZvcm1hdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignZScsIDAsIDAsICd3ZWVrZGF5Jyk7XHJcbiAgICBhZGRGb3JtYXRUb2tlbignRScsIDAsIDAsICdpc29XZWVrZGF5Jyk7XHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygnZGF5JywgJ2QnKTtcclxuICAgIGFkZFVuaXRBbGlhcygnd2Vla2RheScsICdlJyk7XHJcbiAgICBhZGRVbml0QWxpYXMoJ2lzb1dlZWtkYXknLCAnRScpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdkJywgICAgbWF0Y2gxdG8yKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2UnLCAgICBtYXRjaDF0bzIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignRScsICAgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdkZCcsICAgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcclxuICAgICAgICByZXR1cm4gbG9jYWxlLndlZWtkYXlzTWluUmVnZXgoaXNTdHJpY3QpO1xyXG4gICAgfSk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdkZGQnLCAgIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5c1Nob3J0UmVnZXgoaXNTdHJpY3QpO1xyXG4gICAgfSk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdkZGRkJywgICBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbGUud2Vla2RheXNSZWdleChpc1N0cmljdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2RkJywgJ2RkZCcsICdkZGRkJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xyXG4gICAgICAgIHZhciB3ZWVrZGF5ID0gY29uZmlnLl9sb2NhbGUud2Vla2RheXNQYXJzZShpbnB1dCwgdG9rZW4sIGNvbmZpZy5fc3RyaWN0KTtcclxuICAgICAgICAvLyBpZiB3ZSBkaWRuJ3QgZ2V0IGEgd2Vla2RheSBuYW1lLCBtYXJrIHRoZSBkYXRlIGFzIGludmFsaWRcclxuICAgICAgICBpZiAod2Vla2RheSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHdlZWsuZCA9IHdlZWtkYXk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZFdlZWtkYXkgPSBpbnB1dDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2QnLCAnZScsICdFJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xyXG4gICAgICAgIHdlZWtbdG9rZW5dID0gdG9JbnQoaW5wdXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSEVMUEVSU1xyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlV2Vla2RheShpbnB1dCwgbG9jYWxlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc05hTihpbnB1dCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGlucHV0LCAxMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnB1dCA9IGxvY2FsZS53ZWVrZGF5c1BhcnNlKGlucHV0KTtcclxuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBMT0NBTEVTXHJcblxyXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVXZWVrZGF5cyA9ICdTdW5kYXlfTW9uZGF5X1R1ZXNkYXlfV2VkbmVzZGF5X1RodXJzZGF5X0ZyaWRheV9TYXR1cmRheScuc3BsaXQoJ18nKTtcclxuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzIChtLCBmb3JtYXQpIHtcclxuICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl93ZWVrZGF5cykgPyB0aGlzLl93ZWVrZGF5c1ttLmRheSgpXSA6XHJcbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzW3RoaXMuX3dlZWtkYXlzLmlzRm9ybWF0LnRlc3QoZm9ybWF0KSA/ICdmb3JtYXQnIDogJ3N0YW5kYWxvbmUnXVttLmRheSgpXTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdExvY2FsZVdlZWtkYXlzU2hvcnQgPSAnU3VuX01vbl9UdWVfV2VkX1RodV9GcmlfU2F0Jy5zcGxpdCgnXycpO1xyXG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXNTaG9ydCAobSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0W20uZGF5KCldO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXNNaW4gPSAnU3VfTW9fVHVfV2VfVGhfRnJfU2EnLnNwbGl0KCdfJyk7XHJcbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrZGF5c01pbiAobSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblttLmRheSgpXTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkYXlfb2Zfd2Vla19faGFuZGxlU3RyaWN0UGFyc2Uod2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XHJcbiAgICAgICAgdmFyIGksIGlpLCBtb20sIGxsYyA9IHdlZWtkYXlOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2UgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2UgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyArK2kpIHtcclxuICAgICAgICAgICAgICAgIG1vbSA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyhbMjAwMCwgMV0pLmRheShpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2VbaV0gPSB0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2VbaV0gPSB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0gPSB0aGlzLndlZWtkYXlzKG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdHJpY3QpIHtcclxuICAgICAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ2RkZGQnKSB7XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChmb3JtYXQgPT09ICdkZGQnKSB7XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbWluV2Vla2RheXNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSAnZGRkZCcpIHtcclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3dlZWtkYXlzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX21pbldlZWtkYXlzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ2RkZCcpIHtcclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX21pbldlZWtkYXlzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbWluV2Vla2RheXNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXNQYXJzZSAod2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XHJcbiAgICAgICAgdmFyIGksIG1vbSwgcmVnZXg7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRheV9vZl93ZWVrX19oYW5kbGVTdHJpY3RQYXJzZS5jYWxsKHRoaXMsIHdlZWtkYXlOYW1lLCBmb3JtYXQsIHN0cmljdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9mdWxsV2Vla2RheXNQYXJzZSA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcclxuXHJcbiAgICAgICAgICAgIG1vbSA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyhbMjAwMCwgMV0pLmRheShpKTtcclxuICAgICAgICAgICAgaWYgKHN0cmljdCAmJiAhdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2VbaV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLndlZWtkYXlzKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnXFwuPycpICsgJyQnLCAnaScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykucmVwbGFjZSgnLicsICdcXC4/JykgKyAnJCcsICdpJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnXFwuPycpICsgJyQnLCAnaScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZVtpXSkge1xyXG4gICAgICAgICAgICAgICAgcmVnZXggPSAnXicgKyB0aGlzLndlZWtkYXlzKG1vbSwgJycpICsgJ3xeJyArIHRoaXMud2Vla2RheXNTaG9ydChtb20sICcnKSArICd8XicgKyB0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAocmVnZXgucmVwbGFjZSgnLicsICcnKSwgJ2knKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB0ZXN0IHRoZSByZWdleFxyXG4gICAgICAgICAgICBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ2RkZGQnICYmIHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnZGRkJyAmJiB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdkZCcgJiYgdGhpcy5fbWluV2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCAmJiB0aGlzLl93ZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0RGF5T2ZXZWVrIChpbnB1dCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgPyB0aGlzIDogTmFOO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZGF5ID0gdGhpcy5faXNVVEMgPyB0aGlzLl9kLmdldFVUQ0RheSgpIDogdGhpcy5fZC5nZXREYXkoKTtcclxuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpbnB1dCA9IHBhcnNlV2Vla2RheShpbnB1dCwgdGhpcy5sb2NhbGVEYXRhKCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hZGQoaW5wdXQgLSBkYXksICdkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRheTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0TG9jYWxlRGF5T2ZXZWVrIChpbnB1dCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgPyB0aGlzIDogTmFOO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgd2Vla2RheSA9ICh0aGlzLmRheSgpICsgNyAtIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRvdykgJSA3O1xyXG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gd2Vla2RheSA6IHRoaXMuYWRkKGlucHV0IC0gd2Vla2RheSwgJ2QnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXRJU09EYXlPZldlZWsgKGlucHV0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGJlaGF2ZXMgdGhlIHNhbWUgYXMgbW9tZW50I2RheSBleGNlcHRcclxuICAgICAgICAvLyBhcyBhIGdldHRlciwgcmV0dXJucyA3IGluc3RlYWQgb2YgMCAoMS03IHJhbmdlIGluc3RlYWQgb2YgMC02KVxyXG4gICAgICAgIC8vIGFzIGEgc2V0dGVyLCBzdW5kYXkgc2hvdWxkIGJlbG9uZyB0byB0aGUgcHJldmlvdXMgd2Vlay5cclxuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHRoaXMuZGF5KCkgfHwgNyA6IHRoaXMuZGF5KHRoaXMuZGF5KCkgJSA3ID8gaW5wdXQgOiBpbnB1dCAtIDcpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0V2Vla2RheXNSZWdleCA9IG1hdGNoV29yZDtcclxuICAgIGZ1bmN0aW9uIHdlZWtkYXlzUmVnZXggKGlzU3RyaWN0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VFeGFjdCkge1xyXG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcclxuICAgICAgICAgICAgICAgIGNvbXB1dGVXZWVrZGF5c1BhcnNlLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCA6IHRoaXMuX3dlZWtkYXlzUmVnZXg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0V2Vla2RheXNTaG9ydFJlZ2V4ID0gbWF0Y2hXb3JkO1xyXG4gICAgZnVuY3Rpb24gd2Vla2RheXNTaG9ydFJlZ2V4IChpc1N0cmljdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcclxuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wdXRlV2Vla2RheXNQYXJzZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc1N0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0UmVnZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFN0cmljdFJlZ2V4ICYmIGlzU3RyaWN0ID9cclxuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleCA6IHRoaXMuX3dlZWtkYXlzU2hvcnRSZWdleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRXZWVrZGF5c01pblJlZ2V4ID0gbWF0Y2hXb3JkO1xyXG4gICAgZnVuY3Rpb24gd2Vla2RheXNNaW5SZWdleCAoaXNTdHJpY3QpIHtcclxuICAgICAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XHJcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzUmVnZXgnKSkge1xyXG4gICAgICAgICAgICAgICAgY29tcHV0ZVdlZWtkYXlzUGFyc2UuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNTdHJpY3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzTWluUmVnZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNNaW5TdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4IDogdGhpcy5fd2Vla2RheXNNaW5SZWdleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXB1dGVXZWVrZGF5c1BhcnNlICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBjbXBMZW5SZXYoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBtaW5QaWVjZXMgPSBbXSwgc2hvcnRQaWVjZXMgPSBbXSwgbG9uZ1BpZWNlcyA9IFtdLCBtaXhlZFBpZWNlcyA9IFtdLFxyXG4gICAgICAgICAgICBpLCBtb20sIG1pbnAsIHNob3J0cCwgbG9uZ3A7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcclxuICAgICAgICAgICAgbW9tID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKFsyMDAwLCAxXSkuZGF5KGkpO1xyXG4gICAgICAgICAgICBtaW5wID0gdGhpcy53ZWVrZGF5c01pbihtb20sICcnKTtcclxuICAgICAgICAgICAgc2hvcnRwID0gdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpO1xyXG4gICAgICAgICAgICBsb25ncCA9IHRoaXMud2Vla2RheXMobW9tLCAnJyk7XHJcbiAgICAgICAgICAgIG1pblBpZWNlcy5wdXNoKG1pbnApO1xyXG4gICAgICAgICAgICBzaG9ydFBpZWNlcy5wdXNoKHNob3J0cCk7XHJcbiAgICAgICAgICAgIGxvbmdQaWVjZXMucHVzaChsb25ncCk7XHJcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2gobWlucCk7XHJcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2goc2hvcnRwKTtcclxuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaChsb25ncCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNvcnRpbmcgbWFrZXMgc3VyZSBpZiBvbmUgd2Vla2RheSAob3IgYWJicikgaXMgYSBwcmVmaXggb2YgYW5vdGhlciBpdFxyXG4gICAgICAgIC8vIHdpbGwgbWF0Y2ggdGhlIGxvbmdlciBwaWVjZS5cclxuICAgICAgICBtaW5QaWVjZXMuc29ydChjbXBMZW5SZXYpO1xyXG4gICAgICAgIHNob3J0UGllY2VzLnNvcnQoY21wTGVuUmV2KTtcclxuICAgICAgICBsb25nUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcclxuICAgICAgICBtaXhlZFBpZWNlcy5zb3J0KGNtcExlblJldik7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICBzaG9ydFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKHNob3J0UGllY2VzW2ldKTtcclxuICAgICAgICAgICAgbG9uZ1BpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKGxvbmdQaWVjZXNbaV0pO1xyXG4gICAgICAgICAgICBtaXhlZFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKG1peGVkUGllY2VzW2ldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3dlZWtkYXlzUmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBtaXhlZFBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XHJcbiAgICAgICAgdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4ID0gdGhpcy5fd2Vla2RheXNSZWdleDtcclxuICAgICAgICB0aGlzLl93ZWVrZGF5c01pblJlZ2V4ID0gdGhpcy5fd2Vla2RheXNSZWdleDtcclxuXHJcbiAgICAgICAgdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIGxvbmdQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xyXG4gICAgICAgIHRoaXMuX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIHNob3J0UGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcclxuICAgICAgICB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbWluUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0RERCcsIFsnRERERCcsIDNdLCAnREREbycsICdkYXlPZlllYXInKTtcclxuXHJcbiAgICAvLyBBTElBU0VTXHJcblxyXG4gICAgYWRkVW5pdEFsaWFzKCdkYXlPZlllYXInLCAnREREJyk7XHJcblxyXG4gICAgLy8gUEFSU0lOR1xyXG5cclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0RERCcsICBtYXRjaDF0bzMpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignRERERCcsIG1hdGNoMyk7XHJcbiAgICBhZGRQYXJzZVRva2VuKFsnREREJywgJ0REREQnXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnLl9kYXlPZlllYXIgPSB0b0ludChpbnB1dCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIRUxQRVJTXHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldERheU9mWWVhciAoaW5wdXQpIHtcclxuICAgICAgICB2YXIgZGF5T2ZZZWFyID0gTWF0aC5yb3VuZCgodGhpcy5jbG9uZSgpLnN0YXJ0T2YoJ2RheScpIC0gdGhpcy5jbG9uZSgpLnN0YXJ0T2YoJ3llYXInKSkgLyA4NjRlNSkgKyAxO1xyXG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gZGF5T2ZZZWFyIDogdGhpcy5hZGQoKGlucHV0IC0gZGF5T2ZZZWFyKSwgJ2QnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgZnVuY3Rpb24gaEZvcm1hdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ob3VycygpICUgMTIgfHwgMTI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24ga0Zvcm1hdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ob3VycygpIHx8IDI0O1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdIJywgWydISCcsIDJdLCAwLCAnaG91cicpO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2gnLCBbJ2hoJywgMl0sIDAsIGhGb3JtYXQpO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2snLCBbJ2trJywgMl0sIDAsIGtGb3JtYXQpO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdobW0nLCAwLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnICsgaEZvcm1hdC5hcHBseSh0aGlzKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdobW1zcycsIDAsIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJycgKyBoRm9ybWF0LmFwcGx5KHRoaXMpICsgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpICtcclxuICAgICAgICAgICAgemVyb0ZpbGwodGhpcy5zZWNvbmRzKCksIDIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0htbScsIDAsIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJycgKyB0aGlzLmhvdXJzKCkgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignSG1tc3MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnICsgdGhpcy5ob3VycygpICsgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpICtcclxuICAgICAgICAgICAgemVyb0ZpbGwodGhpcy5zZWNvbmRzKCksIDIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gbWVyaWRpZW0gKHRva2VuLCBsb3dlcmNhc2UpIHtcclxuICAgICAgICBhZGRGb3JtYXRUb2tlbih0b2tlbiwgMCwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubWVyaWRpZW0odGhpcy5ob3VycygpLCB0aGlzLm1pbnV0ZXMoKSwgbG93ZXJjYXNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBtZXJpZGllbSgnYScsIHRydWUpO1xyXG4gICAgbWVyaWRpZW0oJ0EnLCBmYWxzZSk7XHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygnaG91cicsICdoJyk7XHJcblxyXG4gICAgLy8gUEFSU0lOR1xyXG5cclxuICAgIGZ1bmN0aW9uIG1hdGNoTWVyaWRpZW0gKGlzU3RyaWN0LCBsb2NhbGUpIHtcclxuICAgICAgICByZXR1cm4gbG9jYWxlLl9tZXJpZGllbVBhcnNlO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2EnLCAgbWF0Y2hNZXJpZGllbSk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdBJywgIG1hdGNoTWVyaWRpZW0pO1xyXG4gICAgYWRkUmVnZXhUb2tlbignSCcsICBtYXRjaDF0bzIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignaCcsICBtYXRjaDF0bzIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignSEgnLCBtYXRjaDF0bzIsIG1hdGNoMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdoaCcsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdobW0nLCBtYXRjaDN0bzQpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignaG1tc3MnLCBtYXRjaDV0bzYpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignSG1tJywgbWF0Y2gzdG80KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0htbXNzJywgbWF0Y2g1dG82KTtcclxuXHJcbiAgICBhZGRQYXJzZVRva2VuKFsnSCcsICdISCddLCBIT1VSKTtcclxuICAgIGFkZFBhcnNlVG9rZW4oWydhJywgJ0EnXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnLl9pc1BtID0gY29uZmlnLl9sb2NhbGUuaXNQTShpbnB1dCk7XHJcbiAgICAgICAgY29uZmlnLl9tZXJpZGllbSA9IGlucHV0O1xyXG4gICAgfSk7XHJcbiAgICBhZGRQYXJzZVRva2VuKFsnaCcsICdoaCddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcclxuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0KTtcclxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgYWRkUGFyc2VUb2tlbignaG1tJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHBvcyA9IGlucHV0Lmxlbmd0aCAtIDI7XHJcbiAgICAgICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dC5zdWJzdHIoMCwgcG9zKSk7XHJcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MpKTtcclxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgYWRkUGFyc2VUb2tlbignaG1tc3MnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcclxuICAgICAgICB2YXIgcG9zMSA9IGlucHV0Lmxlbmd0aCAtIDQ7XHJcbiAgICAgICAgdmFyIHBvczIgPSBpbnB1dC5sZW5ndGggLSAyO1xyXG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvczEpKTtcclxuICAgICAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczEsIDIpKTtcclxuICAgICAgICBhcnJheVtTRUNPTkRdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczIpKTtcclxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgYWRkUGFyc2VUb2tlbignSG1tJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHBvcyA9IGlucHV0Lmxlbmd0aCAtIDI7XHJcbiAgICAgICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dC5zdWJzdHIoMCwgcG9zKSk7XHJcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MpKTtcclxuICAgIH0pO1xyXG4gICAgYWRkUGFyc2VUb2tlbignSG1tc3MnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcclxuICAgICAgICB2YXIgcG9zMSA9IGlucHV0Lmxlbmd0aCAtIDQ7XHJcbiAgICAgICAgdmFyIHBvczIgPSBpbnB1dC5sZW5ndGggLSAyO1xyXG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvczEpKTtcclxuICAgICAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczEsIDIpKTtcclxuICAgICAgICBhcnJheVtTRUNPTkRdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczIpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIExPQ0FMRVNcclxuXHJcbiAgICBmdW5jdGlvbiBsb2NhbGVJc1BNIChpbnB1dCkge1xyXG4gICAgICAgIC8vIElFOCBRdWlya3MgTW9kZSAmIElFNyBTdGFuZGFyZHMgTW9kZSBkbyBub3QgYWxsb3cgYWNjZXNzaW5nIHN0cmluZ3MgbGlrZSBhcnJheXNcclxuICAgICAgICAvLyBVc2luZyBjaGFyQXQgc2hvdWxkIGJlIG1vcmUgY29tcGF0aWJsZS5cclxuICAgICAgICByZXR1cm4gKChpbnB1dCArICcnKS50b0xvd2VyQ2FzZSgpLmNoYXJBdCgwKSA9PT0gJ3AnKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdExvY2FsZU1lcmlkaWVtUGFyc2UgPSAvW2FwXVxcLj9tP1xcLj8vaTtcclxuICAgIGZ1bmN0aW9uIGxvY2FsZU1lcmlkaWVtIChob3VycywgbWludXRlcywgaXNMb3dlcikge1xyXG4gICAgICAgIGlmIChob3VycyA+IDExKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpc0xvd2VyID8gJ3BtJyA6ICdQTSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlzTG93ZXIgPyAnYW0nIDogJ0FNJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICAvLyBTZXR0aW5nIHRoZSBob3VyIHNob3VsZCBrZWVwIHRoZSB0aW1lLCBiZWNhdXNlIHRoZSB1c2VyIGV4cGxpY2l0bHlcclxuICAgIC8vIHNwZWNpZmllZCB3aGljaCBob3VyIGhlIHdhbnRzLiBTbyB0cnlpbmcgdG8gbWFpbnRhaW4gdGhlIHNhbWUgaG91ciAoaW5cclxuICAgIC8vIGEgbmV3IHRpbWV6b25lKSBtYWtlcyBzZW5zZS4gQWRkaW5nL3N1YnRyYWN0aW5nIGhvdXJzIGRvZXMgbm90IGZvbGxvd1xyXG4gICAgLy8gdGhpcyBydWxlLlxyXG4gICAgdmFyIGdldFNldEhvdXIgPSBtYWtlR2V0U2V0KCdIb3VycycsIHRydWUpO1xyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignbScsIFsnbW0nLCAyXSwgMCwgJ21pbnV0ZScpO1xyXG5cclxuICAgIC8vIEFMSUFTRVNcclxuXHJcbiAgICBhZGRVbml0QWxpYXMoJ21pbnV0ZScsICdtJyk7XHJcblxyXG4gICAgLy8gUEFSU0lOR1xyXG5cclxuICAgIGFkZFJlZ2V4VG9rZW4oJ20nLCAgbWF0Y2gxdG8yKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ21tJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xyXG4gICAgYWRkUGFyc2VUb2tlbihbJ20nLCAnbW0nXSwgTUlOVVRFKTtcclxuXHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgdmFyIGdldFNldE1pbnV0ZSA9IG1ha2VHZXRTZXQoJ01pbnV0ZXMnLCBmYWxzZSk7XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdzJywgWydzcycsIDJdLCAwLCAnc2Vjb25kJyk7XHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygnc2Vjb25kJywgJ3MnKTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbigncycsICBtYXRjaDF0bzIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignc3MnLCBtYXRjaDF0bzIsIG1hdGNoMik7XHJcbiAgICBhZGRQYXJzZVRva2VuKFsncycsICdzcyddLCBTRUNPTkQpO1xyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICB2YXIgZ2V0U2V0U2Vjb25kID0gbWFrZUdldFNldCgnU2Vjb25kcycsIGZhbHNlKTtcclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIH5+KHRoaXMubWlsbGlzZWNvbmQoKSAvIDEwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gfn4odGhpcy5taWxsaXNlY29uZCgpIC8gMTApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1MnLCAzXSwgMCwgJ21pbGxpc2Vjb25kJyk7XHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1MnLCA0XSwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDtcclxuICAgIH0pO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTUycsIDVdLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDtcclxuICAgIH0pO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1MnLCA2XSwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwO1xyXG4gICAgfSk7XHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTU1MnLCA3XSwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDtcclxuICAgIH0pO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTUycsIDhdLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDAwMDtcclxuICAgIH0pO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTU1MnLCA5XSwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDAwO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vIEFMSUFTRVNcclxuXHJcbiAgICBhZGRVbml0QWxpYXMoJ21pbGxpc2Vjb25kJywgJ21zJyk7XHJcblxyXG4gICAgLy8gUEFSU0lOR1xyXG5cclxuICAgIGFkZFJlZ2V4VG9rZW4oJ1MnLCAgICBtYXRjaDF0bzMsIG1hdGNoMSk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdTUycsICAgbWF0Y2gxdG8zLCBtYXRjaDIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignU1NTJywgIG1hdGNoMXRvMywgbWF0Y2gzKTtcclxuXHJcbiAgICB2YXIgdG9rZW47XHJcbiAgICBmb3IgKHRva2VuID0gJ1NTU1MnOyB0b2tlbi5sZW5ndGggPD0gOTsgdG9rZW4gKz0gJ1MnKSB7XHJcbiAgICAgICAgYWRkUmVnZXhUb2tlbih0b2tlbiwgbWF0Y2hVbnNpZ25lZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VNcyhpbnB1dCwgYXJyYXkpIHtcclxuICAgICAgICBhcnJheVtNSUxMSVNFQ09ORF0gPSB0b0ludCgoJzAuJyArIGlucHV0KSAqIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodG9rZW4gPSAnUyc7IHRva2VuLmxlbmd0aCA8PSA5OyB0b2tlbiArPSAnUycpIHtcclxuICAgICAgICBhZGRQYXJzZVRva2VuKHRva2VuLCBwYXJzZU1zKTtcclxuICAgIH1cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICB2YXIgZ2V0U2V0TWlsbGlzZWNvbmQgPSBtYWtlR2V0U2V0KCdNaWxsaXNlY29uZHMnLCBmYWxzZSk7XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCd6JywgIDAsIDAsICd6b25lQWJicicpO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ3p6JywgMCwgMCwgJ3pvbmVOYW1lJyk7XHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFpvbmVBYmJyICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgPyAnVVRDJyA6ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFpvbmVOYW1lICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgPyAnQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWUnIDogJyc7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG1vbWVudFByb3RvdHlwZV9fcHJvdG8gPSBNb21lbnQucHJvdG90eXBlO1xyXG5cclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uYWRkICAgICAgICAgICAgICAgPSBhZGRfc3VidHJhY3RfX2FkZDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uY2FsZW5kYXIgICAgICAgICAgPSBtb21lbnRfY2FsZW5kYXJfX2NhbGVuZGFyO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5jbG9uZSAgICAgICAgICAgICA9IGNsb25lO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5kaWZmICAgICAgICAgICAgICA9IGRpZmY7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmVuZE9mICAgICAgICAgICAgID0gZW5kT2Y7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmZvcm1hdCAgICAgICAgICAgID0gZm9ybWF0O1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5mcm9tICAgICAgICAgICAgICA9IGZyb207XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmZyb21Ob3cgICAgICAgICAgID0gZnJvbU5vdztcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG8gICAgICAgICAgICAgICAgPSB0bztcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9Ob3cgICAgICAgICAgICAgPSB0b05vdztcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZ2V0ICAgICAgICAgICAgICAgPSBnZXRTZXQ7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmludmFsaWRBdCAgICAgICAgID0gaW52YWxpZEF0O1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0FmdGVyICAgICAgICAgICA9IGlzQWZ0ZXI7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzQmVmb3JlICAgICAgICAgID0gaXNCZWZvcmU7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzQmV0d2VlbiAgICAgICAgID0gaXNCZXR3ZWVuO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1NhbWUgICAgICAgICAgICA9IGlzU2FtZTtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNTYW1lT3JBZnRlciAgICAgPSBpc1NhbWVPckFmdGVyO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1NhbWVPckJlZm9yZSAgICA9IGlzU2FtZU9yQmVmb3JlO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1ZhbGlkICAgICAgICAgICA9IG1vbWVudF92YWxpZF9faXNWYWxpZDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubGFuZyAgICAgICAgICAgICAgPSBsYW5nO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5sb2NhbGUgICAgICAgICAgICA9IGxvY2FsZTtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubG9jYWxlRGF0YSAgICAgICAgPSBsb2NhbGVEYXRhO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5tYXggICAgICAgICAgICAgICA9IHByb3RvdHlwZU1heDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWluICAgICAgICAgICAgICAgPSBwcm90b3R5cGVNaW47XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnBhcnNpbmdGbGFncyAgICAgID0gcGFyc2luZ0ZsYWdzO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5zZXQgICAgICAgICAgICAgICA9IGdldFNldDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uc3RhcnRPZiAgICAgICAgICAgPSBzdGFydE9mO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5zdWJ0cmFjdCAgICAgICAgICA9IGFkZF9zdWJ0cmFjdF9fc3VidHJhY3Q7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvQXJyYXkgICAgICAgICAgID0gdG9BcnJheTtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9PYmplY3QgICAgICAgICAgPSB0b09iamVjdDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9EYXRlICAgICAgICAgICAgPSB0b0RhdGU7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvSVNPU3RyaW5nICAgICAgID0gbW9tZW50X2Zvcm1hdF9fdG9JU09TdHJpbmc7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvSlNPTiAgICAgICAgICAgID0gdG9KU09OO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b1N0cmluZyAgICAgICAgICA9IHRvU3RyaW5nO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by51bml4ICAgICAgICAgICAgICA9IHVuaXg7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnZhbHVlT2YgICAgICAgICAgID0gdG9fdHlwZV9fdmFsdWVPZjtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uY3JlYXRpb25EYXRhICAgICAgPSBjcmVhdGlvbkRhdGE7XHJcblxyXG4gICAgLy8gWWVhclxyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by55ZWFyICAgICAgID0gZ2V0U2V0WWVhcjtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNMZWFwWWVhciA9IGdldElzTGVhcFllYXI7XHJcblxyXG4gICAgLy8gV2VlayBZZWFyXHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLndlZWtZZWFyICAgID0gZ2V0U2V0V2Vla1llYXI7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWtZZWFyID0gZ2V0U2V0SVNPV2Vla1llYXI7XHJcblxyXG4gICAgLy8gUXVhcnRlclxyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5xdWFydGVyID0gbW9tZW50UHJvdG90eXBlX19wcm90by5xdWFydGVycyA9IGdldFNldFF1YXJ0ZXI7XHJcblxyXG4gICAgLy8gTW9udGhcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubW9udGggICAgICAgPSBnZXRTZXRNb250aDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF5c0luTW9udGggPSBnZXREYXlzSW5Nb250aDtcclxuXHJcbiAgICAvLyBXZWVrXHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLndlZWsgICAgICAgICAgID0gbW9tZW50UHJvdG90eXBlX19wcm90by53ZWVrcyAgICAgICAgPSBnZXRTZXRXZWVrO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc29XZWVrICAgICAgICA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNvV2Vla3MgICAgID0gZ2V0U2V0SVNPV2VlaztcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ud2Vla3NJblllYXIgICAgPSBnZXRXZWVrc0luWWVhcjtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNvV2Vla3NJblllYXIgPSBnZXRJU09XZWVrc0luWWVhcjtcclxuXHJcbiAgICAvLyBEYXlcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF0ZSAgICAgICA9IGdldFNldERheU9mTW9udGg7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRheSAgICAgICAgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRheXMgICAgICAgICAgICAgPSBnZXRTZXREYXlPZldlZWs7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLndlZWtkYXkgICAgPSBnZXRTZXRMb2NhbGVEYXlPZldlZWs7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWtkYXkgPSBnZXRTZXRJU09EYXlPZldlZWs7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRheU9mWWVhciAgPSBnZXRTZXREYXlPZlllYXI7XHJcblxyXG4gICAgLy8gSG91clxyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5ob3VyID0gbW9tZW50UHJvdG90eXBlX19wcm90by5ob3VycyA9IGdldFNldEhvdXI7XHJcblxyXG4gICAgLy8gTWludXRlXHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1pbnV0ZSA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWludXRlcyA9IGdldFNldE1pbnV0ZTtcclxuXHJcbiAgICAvLyBTZWNvbmRcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uc2Vjb25kID0gbW9tZW50UHJvdG90eXBlX19wcm90by5zZWNvbmRzID0gZ2V0U2V0U2Vjb25kO1xyXG5cclxuICAgIC8vIE1pbGxpc2Vjb25kXHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1pbGxpc2Vjb25kID0gbW9tZW50UHJvdG90eXBlX19wcm90by5taWxsaXNlY29uZHMgPSBnZXRTZXRNaWxsaXNlY29uZDtcclxuXHJcbiAgICAvLyBPZmZzZXRcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udXRjT2Zmc2V0ICAgICAgICAgICAgPSBnZXRTZXRPZmZzZXQ7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnV0YyAgICAgICAgICAgICAgICAgID0gc2V0T2Zmc2V0VG9VVEM7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmxvY2FsICAgICAgICAgICAgICAgID0gc2V0T2Zmc2V0VG9Mb2NhbDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ucGFyc2Vab25lICAgICAgICAgICAgPSBzZXRPZmZzZXRUb1BhcnNlZE9mZnNldDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaGFzQWxpZ25lZEhvdXJPZmZzZXQgPSBoYXNBbGlnbmVkSG91ck9mZnNldDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNEU1QgICAgICAgICAgICAgICAgPSBpc0RheWxpZ2h0U2F2aW5nVGltZTtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNEU1RTaGlmdGVkICAgICAgICAgPSBpc0RheWxpZ2h0U2F2aW5nVGltZVNoaWZ0ZWQ7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzTG9jYWwgICAgICAgICAgICAgID0gaXNMb2NhbDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNVdGNPZmZzZXQgICAgICAgICAgPSBpc1V0Y09mZnNldDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNVdGMgICAgICAgICAgICAgICAgPSBpc1V0YztcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNVVEMgICAgICAgICAgICAgICAgPSBpc1V0YztcclxuXHJcbiAgICAvLyBUaW1lem9uZVxyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by56b25lQWJiciA9IGdldFpvbmVBYmJyO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by56b25lTmFtZSA9IGdldFpvbmVOYW1lO1xyXG5cclxuICAgIC8vIERlcHJlY2F0aW9uc1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5kYXRlcyAgPSBkZXByZWNhdGUoJ2RhdGVzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSBkYXRlIGluc3RlYWQuJywgZ2V0U2V0RGF5T2ZNb250aCk7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1vbnRocyA9IGRlcHJlY2F0ZSgnbW9udGhzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb250aCBpbnN0ZWFkJywgZ2V0U2V0TW9udGgpO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by55ZWFycyAgPSBkZXByZWNhdGUoJ3llYXJzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSB5ZWFyIGluc3RlYWQnLCBnZXRTZXRZZWFyKTtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uem9uZSAgID0gZGVwcmVjYXRlKCdtb21lbnQoKS56b25lIGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQoKS51dGNPZmZzZXQgaW5zdGVhZC4gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE3NzknLCBnZXRTZXRab25lKTtcclxuXHJcbiAgICB2YXIgbW9tZW50UHJvdG90eXBlID0gbW9tZW50UHJvdG90eXBlX19wcm90bztcclxuXHJcbiAgICBmdW5jdGlvbiBtb21lbnRfX2NyZWF0ZVVuaXggKGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCAqIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vbWVudF9fY3JlYXRlSW5ab25lICgpIHtcclxuICAgICAgICByZXR1cm4gbG9jYWxfX2NyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cykucGFyc2Vab25lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRDYWxlbmRhciA9IHtcclxuICAgICAgICBzYW1lRGF5IDogJ1tUb2RheSBhdF0gTFQnLFxyXG4gICAgICAgIG5leHREYXkgOiAnW1RvbW9ycm93IGF0XSBMVCcsXHJcbiAgICAgICAgbmV4dFdlZWsgOiAnZGRkZCBbYXRdIExUJyxcclxuICAgICAgICBsYXN0RGF5IDogJ1tZZXN0ZXJkYXkgYXRdIExUJyxcclxuICAgICAgICBsYXN0V2VlayA6ICdbTGFzdF0gZGRkZCBbYXRdIExUJyxcclxuICAgICAgICBzYW1lRWxzZSA6ICdMJ1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBsb2NhbGVfY2FsZW5kYXJfX2NhbGVuZGFyIChrZXksIG1vbSwgbm93KSB7XHJcbiAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuX2NhbGVuZGFyW2tleV07XHJcbiAgICAgICAgcmV0dXJuIGlzRnVuY3Rpb24ob3V0cHV0KSA/IG91dHB1dC5jYWxsKG1vbSwgbm93KSA6IG91dHB1dDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdExvbmdEYXRlRm9ybWF0ID0ge1xyXG4gICAgICAgIExUUyAgOiAnaDptbTpzcyBBJyxcclxuICAgICAgICBMVCAgIDogJ2g6bW0gQScsXHJcbiAgICAgICAgTCAgICA6ICdNTS9ERC9ZWVlZJyxcclxuICAgICAgICBMTCAgIDogJ01NTU0gRCwgWVlZWScsXHJcbiAgICAgICAgTExMICA6ICdNTU1NIEQsIFlZWVkgaDptbSBBJyxcclxuICAgICAgICBMTExMIDogJ2RkZGQsIE1NTU0gRCwgWVlZWSBoOm1tIEEnXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvbmdEYXRlRm9ybWF0IChrZXkpIHtcclxuICAgICAgICB2YXIgZm9ybWF0ID0gdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5XSxcclxuICAgICAgICAgICAgZm9ybWF0VXBwZXIgPSB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXkudG9VcHBlckNhc2UoKV07XHJcblxyXG4gICAgICAgIGlmIChmb3JtYXQgfHwgIWZvcm1hdFVwcGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldID0gZm9ybWF0VXBwZXIucmVwbGFjZSgvTU1NTXxNTXxERHxkZGRkL2csIGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbC5zbGljZSgxKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRJbnZhbGlkRGF0ZSA9ICdJbnZhbGlkIGRhdGUnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGludmFsaWREYXRlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW52YWxpZERhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRPcmRpbmFsID0gJyVkJztcclxuICAgIHZhciBkZWZhdWx0T3JkaW5hbFBhcnNlID0gL1xcZHsxLDJ9LztcclxuXHJcbiAgICBmdW5jdGlvbiBvcmRpbmFsIChudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3JkaW5hbC5yZXBsYWNlKCclZCcsIG51bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHJlUGFyc2VQb3N0Rm9ybWF0IChzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0UmVsYXRpdmVUaW1lID0ge1xyXG4gICAgICAgIGZ1dHVyZSA6ICdpbiAlcycsXHJcbiAgICAgICAgcGFzdCAgIDogJyVzIGFnbycsXHJcbiAgICAgICAgcyAgOiAnYSBmZXcgc2Vjb25kcycsXHJcbiAgICAgICAgbSAgOiAnYSBtaW51dGUnLFxyXG4gICAgICAgIG1tIDogJyVkIG1pbnV0ZXMnLFxyXG4gICAgICAgIGggIDogJ2FuIGhvdXInLFxyXG4gICAgICAgIGhoIDogJyVkIGhvdXJzJyxcclxuICAgICAgICBkICA6ICdhIGRheScsXHJcbiAgICAgICAgZGQgOiAnJWQgZGF5cycsXHJcbiAgICAgICAgTSAgOiAnYSBtb250aCcsXHJcbiAgICAgICAgTU0gOiAnJWQgbW9udGhzJyxcclxuICAgICAgICB5ICA6ICdhIHllYXInLFxyXG4gICAgICAgIHl5IDogJyVkIHllYXJzJ1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiByZWxhdGl2ZV9fcmVsYXRpdmVUaW1lIChudW1iZXIsIHdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpIHtcclxuICAgICAgICB2YXIgb3V0cHV0ID0gdGhpcy5fcmVsYXRpdmVUaW1lW3N0cmluZ107XHJcbiAgICAgICAgcmV0dXJuIChpc0Z1bmN0aW9uKG91dHB1dCkpID9cclxuICAgICAgICAgICAgb3V0cHV0KG51bWJlciwgd2l0aG91dFN1ZmZpeCwgc3RyaW5nLCBpc0Z1dHVyZSkgOlxyXG4gICAgICAgICAgICBvdXRwdXQucmVwbGFjZSgvJWQvaSwgbnVtYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXN0RnV0dXJlIChkaWZmLCBvdXRwdXQpIHtcclxuICAgICAgICB2YXIgZm9ybWF0ID0gdGhpcy5fcmVsYXRpdmVUaW1lW2RpZmYgPiAwID8gJ2Z1dHVyZScgOiAncGFzdCddO1xyXG4gICAgICAgIHJldHVybiBpc0Z1bmN0aW9uKGZvcm1hdCkgPyBmb3JtYXQob3V0cHV0KSA6IGZvcm1hdC5yZXBsYWNlKC8lcy9pLCBvdXRwdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBwcm90b3R5cGVfX3Byb3RvID0gTG9jYWxlLnByb3RvdHlwZTtcclxuXHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9jYWxlbmRhciAgICAgICA9IGRlZmF1bHRDYWxlbmRhcjtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uY2FsZW5kYXIgICAgICAgID0gbG9jYWxlX2NhbGVuZGFyX19jYWxlbmRhcjtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX2xvbmdEYXRlRm9ybWF0ID0gZGVmYXVsdExvbmdEYXRlRm9ybWF0O1xyXG4gICAgcHJvdG90eXBlX19wcm90by5sb25nRGF0ZUZvcm1hdCAgPSBsb25nRGF0ZUZvcm1hdDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX2ludmFsaWREYXRlICAgID0gZGVmYXVsdEludmFsaWREYXRlO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5pbnZhbGlkRGF0ZSAgICAgPSBpbnZhbGlkRGF0ZTtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX29yZGluYWwgICAgICAgID0gZGVmYXVsdE9yZGluYWw7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLm9yZGluYWwgICAgICAgICA9IG9yZGluYWw7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9vcmRpbmFsUGFyc2UgICA9IGRlZmF1bHRPcmRpbmFsUGFyc2U7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLnByZXBhcnNlICAgICAgICA9IHByZVBhcnNlUG9zdEZvcm1hdDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ucG9zdGZvcm1hdCAgICAgID0gcHJlUGFyc2VQb3N0Rm9ybWF0O1xyXG4gICAgcHJvdG90eXBlX19wcm90by5fcmVsYXRpdmVUaW1lICAgPSBkZWZhdWx0UmVsYXRpdmVUaW1lO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5yZWxhdGl2ZVRpbWUgICAgPSByZWxhdGl2ZV9fcmVsYXRpdmVUaW1lO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5wYXN0RnV0dXJlICAgICAgPSBwYXN0RnV0dXJlO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5zZXQgICAgICAgICAgICAgPSBsb2NhbGVfc2V0X19zZXQ7XHJcblxyXG4gICAgLy8gTW9udGhcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ubW9udGhzICAgICAgICAgICAgPSAgICAgICAgbG9jYWxlTW9udGhzO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5fbW9udGhzICAgICAgICAgICA9IGRlZmF1bHRMb2NhbGVNb250aHM7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1vbnRoc1Nob3J0ICAgICAgID0gICAgICAgIGxvY2FsZU1vbnRoc1Nob3J0O1xyXG4gICAgcHJvdG90eXBlX19wcm90by5fbW9udGhzU2hvcnQgICAgICA9IGRlZmF1bHRMb2NhbGVNb250aHNTaG9ydDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ubW9udGhzUGFyc2UgICAgICAgPSAgICAgICAgbG9jYWxlTW9udGhzUGFyc2U7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9tb250aHNSZWdleCAgICAgID0gZGVmYXVsdE1vbnRoc1JlZ2V4O1xyXG4gICAgcHJvdG90eXBlX19wcm90by5tb250aHNSZWdleCAgICAgICA9IG1vbnRoc1JlZ2V4O1xyXG4gICAgcHJvdG90eXBlX19wcm90by5fbW9udGhzU2hvcnRSZWdleCA9IGRlZmF1bHRNb250aHNTaG9ydFJlZ2V4O1xyXG4gICAgcHJvdG90eXBlX19wcm90by5tb250aHNTaG9ydFJlZ2V4ICA9IG1vbnRoc1Nob3J0UmVnZXg7XHJcblxyXG4gICAgLy8gV2Vla1xyXG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrID0gbG9jYWxlV2VlaztcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX3dlZWsgPSBkZWZhdWx0TG9jYWxlV2VlaztcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uZmlyc3REYXlPZlllYXIgPSBsb2NhbGVGaXJzdERheU9mWWVhcjtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uZmlyc3REYXlPZldlZWsgPSBsb2NhbGVGaXJzdERheU9mV2VlaztcclxuXHJcbiAgICAvLyBEYXkgb2YgV2Vla1xyXG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrZGF5cyAgICAgICA9ICAgICAgICBsb2NhbGVXZWVrZGF5cztcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX3dlZWtkYXlzICAgICAgPSBkZWZhdWx0TG9jYWxlV2Vla2RheXM7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWtkYXlzTWluICAgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzTWluO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5fd2Vla2RheXNNaW4gICA9IGRlZmF1bHRMb2NhbGVXZWVrZGF5c01pbjtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ud2Vla2RheXNTaG9ydCAgPSAgICAgICAgbG9jYWxlV2Vla2RheXNTaG9ydDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX3dlZWtkYXlzU2hvcnQgPSBkZWZhdWx0TG9jYWxlV2Vla2RheXNTaG9ydDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ud2Vla2RheXNQYXJzZSAgPSAgICAgICAgbG9jYWxlV2Vla2RheXNQYXJzZTtcclxuXHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl93ZWVrZGF5c1JlZ2V4ICAgICAgPSBkZWZhdWx0V2Vla2RheXNSZWdleDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ud2Vla2RheXNSZWdleCAgICAgICA9ICAgICAgICB3ZWVrZGF5c1JlZ2V4O1xyXG4gICAgcHJvdG90eXBlX19wcm90by5fd2Vla2RheXNTaG9ydFJlZ2V4ID0gZGVmYXVsdFdlZWtkYXlzU2hvcnRSZWdleDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ud2Vla2RheXNTaG9ydFJlZ2V4ICA9ICAgICAgICB3ZWVrZGF5c1Nob3J0UmVnZXg7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl93ZWVrZGF5c01pblJlZ2V4ICAgPSBkZWZhdWx0V2Vla2RheXNNaW5SZWdleDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ud2Vla2RheXNNaW5SZWdleCAgICA9ICAgICAgICB3ZWVrZGF5c01pblJlZ2V4O1xyXG5cclxuICAgIC8vIEhvdXJzXHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLmlzUE0gPSBsb2NhbGVJc1BNO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5fbWVyaWRpZW1QYXJzZSA9IGRlZmF1bHRMb2NhbGVNZXJpZGllbVBhcnNlO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5tZXJpZGllbSA9IGxvY2FsZU1lcmlkaWVtO1xyXG5cclxuICAgIGZ1bmN0aW9uIGxpc3RzX19nZXQgKGZvcm1hdCwgaW5kZXgsIGZpZWxkLCBzZXR0ZXIpIHtcclxuICAgICAgICB2YXIgbG9jYWxlID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZSgpO1xyXG4gICAgICAgIHZhciB1dGMgPSBjcmVhdGVfdXRjX19jcmVhdGVVVEMoKS5zZXQoc2V0dGVyLCBpbmRleCk7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsZVtmaWVsZF0odXRjLCBmb3JtYXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxpc3RNb250aHNJbXBsIChmb3JtYXQsIGluZGV4LCBmaWVsZCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZm9ybWF0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcclxuICAgICAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICcnO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdHNfX2dldChmb3JtYXQsIGluZGV4LCBmaWVsZCwgJ21vbnRoJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaTtcclxuICAgICAgICB2YXIgb3V0ID0gW107XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcclxuICAgICAgICAgICAgb3V0W2ldID0gbGlzdHNfX2dldChmb3JtYXQsIGksIGZpZWxkLCAnbW9udGgnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvLyAoKVxyXG4gICAgLy8gKDUpXHJcbiAgICAvLyAoZm10LCA1KVxyXG4gICAgLy8gKGZtdClcclxuICAgIC8vICh0cnVlKVxyXG4gICAgLy8gKHRydWUsIDUpXHJcbiAgICAvLyAodHJ1ZSwgZm10LCA1KVxyXG4gICAgLy8gKHRydWUsIGZtdClcclxuICAgIGZ1bmN0aW9uIGxpc3RXZWVrZGF5c0ltcGwgKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCwgZmllbGQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGxvY2FsZVNvcnRlZCA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZm9ybWF0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBmb3JtYXQ7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAnJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3JtYXQgPSBsb2NhbGVTb3J0ZWQ7XHJcbiAgICAgICAgICAgIGluZGV4ID0gZm9ybWF0O1xyXG4gICAgICAgICAgICBsb2NhbGVTb3J0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZm9ybWF0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBmb3JtYXQ7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBsb2NhbGUgPSBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKCksXHJcbiAgICAgICAgICAgIHNoaWZ0ID0gbG9jYWxlU29ydGVkID8gbG9jYWxlLl93ZWVrLmRvdyA6IDA7XHJcblxyXG4gICAgICAgIGlmIChpbmRleCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0c19fZ2V0KGZvcm1hdCwgKGluZGV4ICsgc2hpZnQpICUgNywgZmllbGQsICdkYXknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIHZhciBvdXQgPSBbXTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgIG91dFtpXSA9IGxpc3RzX19nZXQoZm9ybWF0LCAoaSArIHNoaWZ0KSAlIDcsIGZpZWxkLCAnZGF5Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbGlzdHNfX2xpc3RNb250aHMgKGZvcm1hdCwgaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gbGlzdE1vbnRoc0ltcGwoZm9ybWF0LCBpbmRleCwgJ21vbnRocycpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxpc3RzX19saXN0TW9udGhzU2hvcnQgKGZvcm1hdCwgaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gbGlzdE1vbnRoc0ltcGwoZm9ybWF0LCBpbmRleCwgJ21vbnRoc1Nob3J0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbGlzdHNfX2xpc3RXZWVrZGF5cyAobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIGxpc3RXZWVrZGF5c0ltcGwobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4LCAnd2Vla2RheXMnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsaXN0c19fbGlzdFdlZWtkYXlzU2hvcnQgKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0V2Vla2RheXNJbXBsKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCwgJ3dlZWtkYXlzU2hvcnQnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsaXN0c19fbGlzdFdlZWtkYXlzTWluIChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gbGlzdFdlZWtkYXlzSW1wbChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5c01pbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGUoJ2VuJywge1xyXG4gICAgICAgIG9yZGluYWxQYXJzZTogL1xcZHsxLDJ9KHRofHN0fG5kfHJkKS8sXHJcbiAgICAgICAgb3JkaW5hbCA6IGZ1bmN0aW9uIChudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIGIgPSBudW1iZXIgJSAxMCxcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9ICh0b0ludChudW1iZXIgJSAxMDAgLyAxMCkgPT09IDEpID8gJ3RoJyA6XHJcbiAgICAgICAgICAgICAgICAoYiA9PT0gMSkgPyAnc3QnIDpcclxuICAgICAgICAgICAgICAgIChiID09PSAyKSA/ICduZCcgOlxyXG4gICAgICAgICAgICAgICAgKGIgPT09IDMpID8gJ3JkJyA6ICd0aCc7XHJcbiAgICAgICAgICAgIHJldHVybiBudW1iZXIgKyBvdXRwdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU2lkZSBlZmZlY3QgaW1wb3J0c1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmxhbmcgPSBkZXByZWNhdGUoJ21vbWVudC5sYW5nIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb21lbnQubG9jYWxlIGluc3RlYWQuJywgbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZSk7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MubGFuZ0RhdGEgPSBkZXByZWNhdGUoJ21vbWVudC5sYW5nRGF0YSBpcyBkZXByZWNhdGVkLiBVc2UgbW9tZW50LmxvY2FsZURhdGEgaW5zdGVhZC4nLCBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKTtcclxuXHJcbiAgICB2YXIgbWF0aEFicyA9IE1hdGguYWJzO1xyXG5cclxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2Fic19fYWJzICgpIHtcclxuICAgICAgICB2YXIgZGF0YSAgICAgICAgICAgPSB0aGlzLl9kYXRhO1xyXG5cclxuICAgICAgICB0aGlzLl9taWxsaXNlY29uZHMgPSBtYXRoQWJzKHRoaXMuX21pbGxpc2Vjb25kcyk7XHJcbiAgICAgICAgdGhpcy5fZGF5cyAgICAgICAgID0gbWF0aEFicyh0aGlzLl9kYXlzKTtcclxuICAgICAgICB0aGlzLl9tb250aHMgICAgICAgPSBtYXRoQWJzKHRoaXMuX21vbnRocyk7XHJcblxyXG4gICAgICAgIGRhdGEubWlsbGlzZWNvbmRzICA9IG1hdGhBYnMoZGF0YS5taWxsaXNlY29uZHMpO1xyXG4gICAgICAgIGRhdGEuc2Vjb25kcyAgICAgICA9IG1hdGhBYnMoZGF0YS5zZWNvbmRzKTtcclxuICAgICAgICBkYXRhLm1pbnV0ZXMgICAgICAgPSBtYXRoQWJzKGRhdGEubWludXRlcyk7XHJcbiAgICAgICAgZGF0YS5ob3VycyAgICAgICAgID0gbWF0aEFicyhkYXRhLmhvdXJzKTtcclxuICAgICAgICBkYXRhLm1vbnRocyAgICAgICAgPSBtYXRoQWJzKGRhdGEubW9udGhzKTtcclxuICAgICAgICBkYXRhLnllYXJzICAgICAgICAgPSBtYXRoQWJzKGRhdGEueWVhcnMpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0IChkdXJhdGlvbiwgaW5wdXQsIHZhbHVlLCBkaXJlY3Rpb24pIHtcclxuICAgICAgICB2YXIgb3RoZXIgPSBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uKGlucHV0LCB2YWx1ZSk7XHJcblxyXG4gICAgICAgIGR1cmF0aW9uLl9taWxsaXNlY29uZHMgKz0gZGlyZWN0aW9uICogb3RoZXIuX21pbGxpc2Vjb25kcztcclxuICAgICAgICBkdXJhdGlvbi5fZGF5cyAgICAgICAgICs9IGRpcmVjdGlvbiAqIG90aGVyLl9kYXlzO1xyXG4gICAgICAgIGR1cmF0aW9uLl9tb250aHMgICAgICAgKz0gZGlyZWN0aW9uICogb3RoZXIuX21vbnRocztcclxuXHJcbiAgICAgICAgcmV0dXJuIGR1cmF0aW9uLl9idWJibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdXBwb3J0cyBvbmx5IDIuMC1zdHlsZSBhZGQoMSwgJ3MnKSBvciBhZGQoZHVyYXRpb24pXHJcbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX2FkZCAoaW5wdXQsIHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QodGhpcywgaW5wdXQsIHZhbHVlLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdXBwb3J0cyBvbmx5IDIuMC1zdHlsZSBzdWJ0cmFjdCgxLCAncycpIG9yIHN1YnRyYWN0KGR1cmF0aW9uKVxyXG4gICAgZnVuY3Rpb24gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19zdWJ0cmFjdCAoaW5wdXQsIHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QodGhpcywgaW5wdXQsIHZhbHVlLCAtMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWJzQ2VpbCAobnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG51bWJlciA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtYmVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKG51bWJlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJ1YmJsZSAoKSB7XHJcbiAgICAgICAgdmFyIG1pbGxpc2Vjb25kcyA9IHRoaXMuX21pbGxpc2Vjb25kcztcclxuICAgICAgICB2YXIgZGF5cyAgICAgICAgID0gdGhpcy5fZGF5cztcclxuICAgICAgICB2YXIgbW9udGhzICAgICAgID0gdGhpcy5fbW9udGhzO1xyXG4gICAgICAgIHZhciBkYXRhICAgICAgICAgPSB0aGlzLl9kYXRhO1xyXG4gICAgICAgIHZhciBzZWNvbmRzLCBtaW51dGVzLCBob3VycywgeWVhcnMsIG1vbnRoc0Zyb21EYXlzO1xyXG5cclxuICAgICAgICAvLyBpZiB3ZSBoYXZlIGEgbWl4IG9mIHBvc2l0aXZlIGFuZCBuZWdhdGl2ZSB2YWx1ZXMsIGJ1YmJsZSBkb3duIGZpcnN0XHJcbiAgICAgICAgLy8gY2hlY2s6IGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8yMTY2XHJcbiAgICAgICAgaWYgKCEoKG1pbGxpc2Vjb25kcyA+PSAwICYmIGRheXMgPj0gMCAmJiBtb250aHMgPj0gMCkgfHxcclxuICAgICAgICAgICAgICAgIChtaWxsaXNlY29uZHMgPD0gMCAmJiBkYXlzIDw9IDAgJiYgbW9udGhzIDw9IDApKSkge1xyXG4gICAgICAgICAgICBtaWxsaXNlY29uZHMgKz0gYWJzQ2VpbChtb250aHNUb0RheXMobW9udGhzKSArIGRheXMpICogODY0ZTU7XHJcbiAgICAgICAgICAgIGRheXMgPSAwO1xyXG4gICAgICAgICAgICBtb250aHMgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBjb2RlIGJ1YmJsZXMgdXAgdmFsdWVzLCBzZWUgdGhlIHRlc3RzIGZvclxyXG4gICAgICAgIC8vIGV4YW1wbGVzIG9mIHdoYXQgdGhhdCBtZWFucy5cclxuICAgICAgICBkYXRhLm1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcyAlIDEwMDA7XHJcblxyXG4gICAgICAgIHNlY29uZHMgICAgICAgICAgID0gYWJzRmxvb3IobWlsbGlzZWNvbmRzIC8gMTAwMCk7XHJcbiAgICAgICAgZGF0YS5zZWNvbmRzICAgICAgPSBzZWNvbmRzICUgNjA7XHJcblxyXG4gICAgICAgIG1pbnV0ZXMgICAgICAgICAgID0gYWJzRmxvb3Ioc2Vjb25kcyAvIDYwKTtcclxuICAgICAgICBkYXRhLm1pbnV0ZXMgICAgICA9IG1pbnV0ZXMgJSA2MDtcclxuXHJcbiAgICAgICAgaG91cnMgICAgICAgICAgICAgPSBhYnNGbG9vcihtaW51dGVzIC8gNjApO1xyXG4gICAgICAgIGRhdGEuaG91cnMgICAgICAgID0gaG91cnMgJSAyNDtcclxuXHJcbiAgICAgICAgZGF5cyArPSBhYnNGbG9vcihob3VycyAvIDI0KTtcclxuXHJcbiAgICAgICAgLy8gY29udmVydCBkYXlzIHRvIG1vbnRoc1xyXG4gICAgICAgIG1vbnRoc0Zyb21EYXlzID0gYWJzRmxvb3IoZGF5c1RvTW9udGhzKGRheXMpKTtcclxuICAgICAgICBtb250aHMgKz0gbW9udGhzRnJvbURheXM7XHJcbiAgICAgICAgZGF5cyAtPSBhYnNDZWlsKG1vbnRoc1RvRGF5cyhtb250aHNGcm9tRGF5cykpO1xyXG5cclxuICAgICAgICAvLyAxMiBtb250aHMgLT4gMSB5ZWFyXHJcbiAgICAgICAgeWVhcnMgPSBhYnNGbG9vcihtb250aHMgLyAxMik7XHJcbiAgICAgICAgbW9udGhzICU9IDEyO1xyXG5cclxuICAgICAgICBkYXRhLmRheXMgICA9IGRheXM7XHJcbiAgICAgICAgZGF0YS5tb250aHMgPSBtb250aHM7XHJcbiAgICAgICAgZGF0YS55ZWFycyAgPSB5ZWFycztcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGF5c1RvTW9udGhzIChkYXlzKSB7XHJcbiAgICAgICAgLy8gNDAwIHllYXJzIGhhdmUgMTQ2MDk3IGRheXMgKHRha2luZyBpbnRvIGFjY291bnQgbGVhcCB5ZWFyIHJ1bGVzKVxyXG4gICAgICAgIC8vIDQwMCB5ZWFycyBoYXZlIDEyIG1vbnRocyA9PT0gNDgwMFxyXG4gICAgICAgIHJldHVybiBkYXlzICogNDgwMCAvIDE0NjA5NztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb250aHNUb0RheXMgKG1vbnRocykge1xyXG4gICAgICAgIC8vIHRoZSByZXZlcnNlIG9mIGRheXNUb01vbnRoc1xyXG4gICAgICAgIHJldHVybiBtb250aHMgKiAxNDYwOTcgLyA0ODAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFzICh1bml0cykge1xyXG4gICAgICAgIHZhciBkYXlzO1xyXG4gICAgICAgIHZhciBtb250aHM7XHJcbiAgICAgICAgdmFyIG1pbGxpc2Vjb25kcyA9IHRoaXMuX21pbGxpc2Vjb25kcztcclxuXHJcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XHJcblxyXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21vbnRoJyB8fCB1bml0cyA9PT0gJ3llYXInKSB7XHJcbiAgICAgICAgICAgIGRheXMgICA9IHRoaXMuX2RheXMgICArIG1pbGxpc2Vjb25kcyAvIDg2NGU1O1xyXG4gICAgICAgICAgICBtb250aHMgPSB0aGlzLl9tb250aHMgKyBkYXlzVG9Nb250aHMoZGF5cyk7XHJcbiAgICAgICAgICAgIHJldHVybiB1bml0cyA9PT0gJ21vbnRoJyA/IG1vbnRocyA6IG1vbnRocyAvIDEyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGhhbmRsZSBtaWxsaXNlY29uZHMgc2VwYXJhdGVseSBiZWNhdXNlIG9mIGZsb2F0aW5nIHBvaW50IG1hdGggZXJyb3JzIChpc3N1ZSAjMTg2NylcclxuICAgICAgICAgICAgZGF5cyA9IHRoaXMuX2RheXMgKyBNYXRoLnJvdW5kKG1vbnRoc1RvRGF5cyh0aGlzLl9tb250aHMpKTtcclxuICAgICAgICAgICAgc3dpdGNoICh1bml0cykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnd2VlaycgICA6IHJldHVybiBkYXlzIC8gNyAgICAgKyBtaWxsaXNlY29uZHMgLyA2MDQ4ZTU7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdkYXknICAgIDogcmV0dXJuIGRheXMgICAgICAgICArIG1pbGxpc2Vjb25kcyAvIDg2NGU1O1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaG91cicgICA6IHJldHVybiBkYXlzICogMjQgICAgKyBtaWxsaXNlY29uZHMgLyAzNmU1O1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbWludXRlJyA6IHJldHVybiBkYXlzICogMTQ0MCAgKyBtaWxsaXNlY29uZHMgLyA2ZTQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzZWNvbmQnIDogcmV0dXJuIGRheXMgKiA4NjQwMCArIG1pbGxpc2Vjb25kcyAvIDEwMDA7XHJcbiAgICAgICAgICAgICAgICAvLyBNYXRoLmZsb29yIHByZXZlbnRzIGZsb2F0aW5nIHBvaW50IG1hdGggZXJyb3JzIGhlcmVcclxuICAgICAgICAgICAgICAgIGNhc2UgJ21pbGxpc2Vjb25kJzogcmV0dXJuIE1hdGguZmxvb3IoZGF5cyAqIDg2NGU1KSArIG1pbGxpc2Vjb25kcztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignVW5rbm93biB1bml0ICcgKyB1bml0cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETzogVXNlIHRoaXMuYXMoJ21zJyk/XHJcbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9hc19fdmFsdWVPZiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzICtcclxuICAgICAgICAgICAgdGhpcy5fZGF5cyAqIDg2NGU1ICtcclxuICAgICAgICAgICAgKHRoaXMuX21vbnRocyAlIDEyKSAqIDI1OTJlNiArXHJcbiAgICAgICAgICAgIHRvSW50KHRoaXMuX21vbnRocyAvIDEyKSAqIDMxNTM2ZTZcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1ha2VBcyAoYWxpYXMpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcyhhbGlhcyk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYXNNaWxsaXNlY29uZHMgPSBtYWtlQXMoJ21zJyk7XHJcbiAgICB2YXIgYXNTZWNvbmRzICAgICAgPSBtYWtlQXMoJ3MnKTtcclxuICAgIHZhciBhc01pbnV0ZXMgICAgICA9IG1ha2VBcygnbScpO1xyXG4gICAgdmFyIGFzSG91cnMgICAgICAgID0gbWFrZUFzKCdoJyk7XHJcbiAgICB2YXIgYXNEYXlzICAgICAgICAgPSBtYWtlQXMoJ2QnKTtcclxuICAgIHZhciBhc1dlZWtzICAgICAgICA9IG1ha2VBcygndycpO1xyXG4gICAgdmFyIGFzTW9udGhzICAgICAgID0gbWFrZUFzKCdNJyk7XHJcbiAgICB2YXIgYXNZZWFycyAgICAgICAgPSBtYWtlQXMoJ3knKTtcclxuXHJcbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9nZXRfX2dldCAodW5pdHMpIHtcclxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcclxuICAgICAgICByZXR1cm4gdGhpc1t1bml0cyArICdzJ10oKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYWtlR2V0dGVyKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVtuYW1lXTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBtaWxsaXNlY29uZHMgPSBtYWtlR2V0dGVyKCdtaWxsaXNlY29uZHMnKTtcclxuICAgIHZhciBzZWNvbmRzICAgICAgPSBtYWtlR2V0dGVyKCdzZWNvbmRzJyk7XHJcbiAgICB2YXIgbWludXRlcyAgICAgID0gbWFrZUdldHRlcignbWludXRlcycpO1xyXG4gICAgdmFyIGhvdXJzICAgICAgICA9IG1ha2VHZXR0ZXIoJ2hvdXJzJyk7XHJcbiAgICB2YXIgZGF5cyAgICAgICAgID0gbWFrZUdldHRlcignZGF5cycpO1xyXG4gICAgdmFyIG1vbnRocyAgICAgICA9IG1ha2VHZXR0ZXIoJ21vbnRocycpO1xyXG4gICAgdmFyIHllYXJzICAgICAgICA9IG1ha2VHZXR0ZXIoJ3llYXJzJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gd2Vla3MgKCkge1xyXG4gICAgICAgIHJldHVybiBhYnNGbG9vcih0aGlzLmRheXMoKSAvIDcpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciByb3VuZCA9IE1hdGgucm91bmQ7XHJcbiAgICB2YXIgdGhyZXNob2xkcyA9IHtcclxuICAgICAgICBzOiA0NSwgIC8vIHNlY29uZHMgdG8gbWludXRlXHJcbiAgICAgICAgbTogNDUsICAvLyBtaW51dGVzIHRvIGhvdXJcclxuICAgICAgICBoOiAyMiwgIC8vIGhvdXJzIHRvIGRheVxyXG4gICAgICAgIGQ6IDI2LCAgLy8gZGF5cyB0byBtb250aFxyXG4gICAgICAgIE06IDExICAgLy8gbW9udGhzIHRvIHllYXJcclxuICAgIH07XHJcblxyXG4gICAgLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBtb21lbnQuZm4uZnJvbSwgbW9tZW50LmZuLmZyb21Ob3csIGFuZCBtb21lbnQuZHVyYXRpb24uZm4uaHVtYW5pemVcclxuICAgIGZ1bmN0aW9uIHN1YnN0aXR1dGVUaW1lQWdvKHN0cmluZywgbnVtYmVyLCB3aXRob3V0U3VmZml4LCBpc0Z1dHVyZSwgbG9jYWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5yZWxhdGl2ZVRpbWUobnVtYmVyIHx8IDEsICEhd2l0aG91dFN1ZmZpeCwgc3RyaW5nLCBpc0Z1dHVyZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZHVyYXRpb25faHVtYW5pemVfX3JlbGF0aXZlVGltZSAocG9zTmVnRHVyYXRpb24sIHdpdGhvdXRTdWZmaXgsIGxvY2FsZSkge1xyXG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24ocG9zTmVnRHVyYXRpb24pLmFicygpO1xyXG4gICAgICAgIHZhciBzZWNvbmRzICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdzJykpO1xyXG4gICAgICAgIHZhciBtaW51dGVzICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdtJykpO1xyXG4gICAgICAgIHZhciBob3VycyAgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdoJykpO1xyXG4gICAgICAgIHZhciBkYXlzICAgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdkJykpO1xyXG4gICAgICAgIHZhciBtb250aHMgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdNJykpO1xyXG4gICAgICAgIHZhciB5ZWFycyAgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCd5JykpO1xyXG5cclxuICAgICAgICB2YXIgYSA9IHNlY29uZHMgPCB0aHJlc2hvbGRzLnMgJiYgWydzJywgc2Vjb25kc10gIHx8XHJcbiAgICAgICAgICAgICAgICBtaW51dGVzIDw9IDEgICAgICAgICAgICYmIFsnbSddICAgICAgICAgICB8fFxyXG4gICAgICAgICAgICAgICAgbWludXRlcyA8IHRocmVzaG9sZHMubSAmJiBbJ21tJywgbWludXRlc10gfHxcclxuICAgICAgICAgICAgICAgIGhvdXJzICAgPD0gMSAgICAgICAgICAgJiYgWydoJ10gICAgICAgICAgIHx8XHJcbiAgICAgICAgICAgICAgICBob3VycyAgIDwgdGhyZXNob2xkcy5oICYmIFsnaGgnLCBob3Vyc10gICB8fFxyXG4gICAgICAgICAgICAgICAgZGF5cyAgICA8PSAxICAgICAgICAgICAmJiBbJ2QnXSAgICAgICAgICAgfHxcclxuICAgICAgICAgICAgICAgIGRheXMgICAgPCB0aHJlc2hvbGRzLmQgJiYgWydkZCcsIGRheXNdICAgIHx8XHJcbiAgICAgICAgICAgICAgICBtb250aHMgIDw9IDEgICAgICAgICAgICYmIFsnTSddICAgICAgICAgICB8fFxyXG4gICAgICAgICAgICAgICAgbW9udGhzICA8IHRocmVzaG9sZHMuTSAmJiBbJ01NJywgbW9udGhzXSAgfHxcclxuICAgICAgICAgICAgICAgIHllYXJzICAgPD0gMSAgICAgICAgICAgJiYgWyd5J10gICAgICAgICAgIHx8IFsneXknLCB5ZWFyc107XHJcblxyXG4gICAgICAgIGFbMl0gPSB3aXRob3V0U3VmZml4O1xyXG4gICAgICAgIGFbM10gPSArcG9zTmVnRHVyYXRpb24gPiAwO1xyXG4gICAgICAgIGFbNF0gPSBsb2NhbGU7XHJcbiAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGVUaW1lQWdvLmFwcGx5KG51bGwsIGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBzZXQgYSB0aHJlc2hvbGQgZm9yIHJlbGF0aXZlIHRpbWUgc3RyaW5nc1xyXG4gICAgZnVuY3Rpb24gZHVyYXRpb25faHVtYW5pemVfX2dldFNldFJlbGF0aXZlVGltZVRocmVzaG9sZCAodGhyZXNob2xkLCBsaW1pdCkge1xyXG4gICAgICAgIGlmICh0aHJlc2hvbGRzW3RocmVzaG9sZF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsaW1pdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aHJlc2hvbGRzW3RocmVzaG9sZF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocmVzaG9sZHNbdGhyZXNob2xkXSA9IGxpbWl0O1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGh1bWFuaXplICh3aXRoU3VmZml4KSB7XHJcbiAgICAgICAgdmFyIGxvY2FsZSA9IHRoaXMubG9jYWxlRGF0YSgpO1xyXG4gICAgICAgIHZhciBvdXRwdXQgPSBkdXJhdGlvbl9odW1hbml6ZV9fcmVsYXRpdmVUaW1lKHRoaXMsICF3aXRoU3VmZml4LCBsb2NhbGUpO1xyXG5cclxuICAgICAgICBpZiAod2l0aFN1ZmZpeCkge1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBsb2NhbGUucGFzdEZ1dHVyZSgrdGhpcywgb3V0cHV0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBsb2NhbGUucG9zdGZvcm1hdChvdXRwdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpc29fc3RyaW5nX19hYnMgPSBNYXRoLmFicztcclxuXHJcbiAgICBmdW5jdGlvbiBpc29fc3RyaW5nX190b0lTT1N0cmluZygpIHtcclxuICAgICAgICAvLyBmb3IgSVNPIHN0cmluZ3Mgd2UgZG8gbm90IHVzZSB0aGUgbm9ybWFsIGJ1YmJsaW5nIHJ1bGVzOlxyXG4gICAgICAgIC8vICAqIG1pbGxpc2Vjb25kcyBidWJibGUgdXAgdW50aWwgdGhleSBiZWNvbWUgaG91cnNcclxuICAgICAgICAvLyAgKiBkYXlzIGRvIG5vdCBidWJibGUgYXQgYWxsXHJcbiAgICAgICAgLy8gICogbW9udGhzIGJ1YmJsZSB1cCB1bnRpbCB0aGV5IGJlY29tZSB5ZWFyc1xyXG4gICAgICAgIC8vIFRoaXMgaXMgYmVjYXVzZSB0aGVyZSBpcyBubyBjb250ZXh0LWZyZWUgY29udmVyc2lvbiBiZXR3ZWVuIGhvdXJzIGFuZCBkYXlzXHJcbiAgICAgICAgLy8gKHRoaW5rIG9mIGNsb2NrIGNoYW5nZXMpXHJcbiAgICAgICAgLy8gYW5kIGFsc28gbm90IGJldHdlZW4gZGF5cyBhbmQgbW9udGhzICgyOC0zMSBkYXlzIHBlciBtb250aClcclxuICAgICAgICB2YXIgc2Vjb25kcyA9IGlzb19zdHJpbmdfX2Ficyh0aGlzLl9taWxsaXNlY29uZHMpIC8gMTAwMDtcclxuICAgICAgICB2YXIgZGF5cyAgICAgICAgID0gaXNvX3N0cmluZ19fYWJzKHRoaXMuX2RheXMpO1xyXG4gICAgICAgIHZhciBtb250aHMgICAgICAgPSBpc29fc3RyaW5nX19hYnModGhpcy5fbW9udGhzKTtcclxuICAgICAgICB2YXIgbWludXRlcywgaG91cnMsIHllYXJzO1xyXG5cclxuICAgICAgICAvLyAzNjAwIHNlY29uZHMgLT4gNjAgbWludXRlcyAtPiAxIGhvdXJcclxuICAgICAgICBtaW51dGVzICAgICAgICAgICA9IGFic0Zsb29yKHNlY29uZHMgLyA2MCk7XHJcbiAgICAgICAgaG91cnMgICAgICAgICAgICAgPSBhYnNGbG9vcihtaW51dGVzIC8gNjApO1xyXG4gICAgICAgIHNlY29uZHMgJT0gNjA7XHJcbiAgICAgICAgbWludXRlcyAlPSA2MDtcclxuXHJcbiAgICAgICAgLy8gMTIgbW9udGhzIC0+IDEgeWVhclxyXG4gICAgICAgIHllYXJzICA9IGFic0Zsb29yKG1vbnRocyAvIDEyKTtcclxuICAgICAgICBtb250aHMgJT0gMTI7XHJcblxyXG5cclxuICAgICAgICAvLyBpbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vZG9yZGlsbGUvbW9tZW50LWlzb2R1cmF0aW9uL2Jsb2IvbWFzdGVyL21vbWVudC5pc29kdXJhdGlvbi5qc1xyXG4gICAgICAgIHZhciBZID0geWVhcnM7XHJcbiAgICAgICAgdmFyIE0gPSBtb250aHM7XHJcbiAgICAgICAgdmFyIEQgPSBkYXlzO1xyXG4gICAgICAgIHZhciBoID0gaG91cnM7XHJcbiAgICAgICAgdmFyIG0gPSBtaW51dGVzO1xyXG4gICAgICAgIHZhciBzID0gc2Vjb25kcztcclxuICAgICAgICB2YXIgdG90YWwgPSB0aGlzLmFzU2Vjb25kcygpO1xyXG5cclxuICAgICAgICBpZiAoIXRvdGFsKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIHNhbWUgYXMgQyMncyAoTm9kYSkgYW5kIHB5dGhvbiAoaXNvZGF0ZSkuLi5cclxuICAgICAgICAgICAgLy8gYnV0IG5vdCBvdGhlciBKUyAoZ29vZy5kYXRlKVxyXG4gICAgICAgICAgICByZXR1cm4gJ1AwRCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKHRvdGFsIDwgMCA/ICctJyA6ICcnKSArXHJcbiAgICAgICAgICAgICdQJyArXHJcbiAgICAgICAgICAgIChZID8gWSArICdZJyA6ICcnKSArXHJcbiAgICAgICAgICAgIChNID8gTSArICdNJyA6ICcnKSArXHJcbiAgICAgICAgICAgIChEID8gRCArICdEJyA6ICcnKSArXHJcbiAgICAgICAgICAgICgoaCB8fCBtIHx8IHMpID8gJ1QnIDogJycpICtcclxuICAgICAgICAgICAgKGggPyBoICsgJ0gnIDogJycpICtcclxuICAgICAgICAgICAgKG0gPyBtICsgJ00nIDogJycpICtcclxuICAgICAgICAgICAgKHMgPyBzICsgJ1MnIDogJycpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvID0gRHVyYXRpb24ucHJvdG90eXBlO1xyXG5cclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYWJzICAgICAgICAgICAgPSBkdXJhdGlvbl9hYnNfX2FicztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYWRkICAgICAgICAgICAgPSBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX2FkZDtcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uc3VidHJhY3QgICAgICAgPSBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX3N1YnRyYWN0O1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hcyAgICAgICAgICAgICA9IGFzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc01pbGxpc2Vjb25kcyA9IGFzTWlsbGlzZWNvbmRzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc1NlY29uZHMgICAgICA9IGFzU2Vjb25kcztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNNaW51dGVzICAgICAgPSBhc01pbnV0ZXM7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzSG91cnMgICAgICAgID0gYXNIb3VycztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNEYXlzICAgICAgICAgPSBhc0RheXM7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzV2Vla3MgICAgICAgID0gYXNXZWVrcztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNNb250aHMgICAgICAgPSBhc01vbnRocztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNZZWFycyAgICAgICAgPSBhc1llYXJzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by52YWx1ZU9mICAgICAgICA9IGR1cmF0aW9uX2FzX192YWx1ZU9mO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5fYnViYmxlICAgICAgICA9IGJ1YmJsZTtcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uZ2V0ICAgICAgICAgICAgPSBkdXJhdGlvbl9nZXRfX2dldDtcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubWlsbGlzZWNvbmRzICAgPSBtaWxsaXNlY29uZHM7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnNlY29uZHMgICAgICAgID0gc2Vjb25kcztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubWludXRlcyAgICAgICAgPSBtaW51dGVzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5ob3VycyAgICAgICAgICA9IGhvdXJzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5kYXlzICAgICAgICAgICA9IGRheXM7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLndlZWtzICAgICAgICAgID0gd2Vla3M7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLm1vbnRocyAgICAgICAgID0gbW9udGhzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by55ZWFycyAgICAgICAgICA9IHllYXJzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5odW1hbml6ZSAgICAgICA9IGh1bWFuaXplO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by50b0lTT1N0cmluZyAgICA9IGlzb19zdHJpbmdfX3RvSVNPU3RyaW5nO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by50b1N0cmluZyAgICAgICA9IGlzb19zdHJpbmdfX3RvSVNPU3RyaW5nO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by50b0pTT04gICAgICAgICA9IGlzb19zdHJpbmdfX3RvSVNPU3RyaW5nO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5sb2NhbGUgICAgICAgICA9IGxvY2FsZTtcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubG9jYWxlRGF0YSAgICAgPSBsb2NhbGVEYXRhO1xyXG5cclxuICAgIC8vIERlcHJlY2F0aW9uc1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by50b0lzb1N0cmluZyA9IGRlcHJlY2F0ZSgndG9Jc29TdHJpbmcoKSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIHRvSVNPU3RyaW5nKCkgaW5zdGVhZCAobm90aWNlIHRoZSBjYXBpdGFscyknLCBpc29fc3RyaW5nX190b0lTT1N0cmluZyk7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmxhbmcgPSBsYW5nO1xyXG5cclxuICAgIC8vIFNpZGUgZWZmZWN0IGltcG9ydHNcclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1gnLCAwLCAwLCAndW5peCcpO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ3gnLCAwLCAwLCAndmFsdWVPZicpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCd4JywgbWF0Y2hTaWduZWQpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignWCcsIG1hdGNoVGltZXN0YW1wKTtcclxuICAgIGFkZFBhcnNlVG9rZW4oJ1gnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcclxuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShwYXJzZUZsb2F0KGlucHV0LCAxMCkgKiAxMDAwKTtcclxuICAgIH0pO1xyXG4gICAgYWRkUGFyc2VUb2tlbigneCcsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKHRvSW50KGlucHV0KSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTaWRlIGVmZmVjdCBpbXBvcnRzXHJcblxyXG5cclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy52ZXJzaW9uID0gJzIuMTMuMCc7XHJcblxyXG4gICAgc2V0SG9va0NhbGxiYWNrKGxvY2FsX19jcmVhdGVMb2NhbCk7XHJcblxyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmZuICAgICAgICAgICAgICAgICAgICA9IG1vbWVudFByb3RvdHlwZTtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5taW4gICAgICAgICAgICAgICAgICAgPSBtaW47XHJcbiAgICB1dGlsc19ob29rc19faG9va3MubWF4ICAgICAgICAgICAgICAgICAgID0gbWF4O1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLm5vdyAgICAgICAgICAgICAgICAgICA9IG5vdztcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy51dGMgICAgICAgICAgICAgICAgICAgPSBjcmVhdGVfdXRjX19jcmVhdGVVVEM7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MudW5peCAgICAgICAgICAgICAgICAgID0gbW9tZW50X19jcmVhdGVVbml4O1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLm1vbnRocyAgICAgICAgICAgICAgICA9IGxpc3RzX19saXN0TW9udGhzO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmlzRGF0ZSAgICAgICAgICAgICAgICA9IGlzRGF0ZTtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5sb2NhbGUgICAgICAgICAgICAgICAgPSBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmludmFsaWQgICAgICAgICAgICAgICA9IHZhbGlkX19jcmVhdGVJbnZhbGlkO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmR1cmF0aW9uICAgICAgICAgICAgICA9IGNyZWF0ZV9fY3JlYXRlRHVyYXRpb247XHJcbiAgICB1dGlsc19ob29rc19faG9va3MuaXNNb21lbnQgICAgICAgICAgICAgID0gaXNNb21lbnQ7XHJcbiAgICB1dGlsc19ob29rc19faG9va3Mud2Vla2RheXMgICAgICAgICAgICAgID0gbGlzdHNfX2xpc3RXZWVrZGF5cztcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5wYXJzZVpvbmUgICAgICAgICAgICAgPSBtb21lbnRfX2NyZWF0ZUluWm9uZTtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5sb2NhbGVEYXRhICAgICAgICAgICAgPSBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmlzRHVyYXRpb24gICAgICAgICAgICA9IGlzRHVyYXRpb247XHJcbiAgICB1dGlsc19ob29rc19faG9va3MubW9udGhzU2hvcnQgICAgICAgICAgID0gbGlzdHNfX2xpc3RNb250aHNTaG9ydDtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy53ZWVrZGF5c01pbiAgICAgICAgICAgPSBsaXN0c19fbGlzdFdlZWtkYXlzTWluO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmRlZmluZUxvY2FsZSAgICAgICAgICA9IGRlZmluZUxvY2FsZTtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVMb2NhbGUgICAgICAgICAgPSB1cGRhdGVMb2NhbGU7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MubG9jYWxlcyAgICAgICAgICAgICAgID0gbG9jYWxlX2xvY2FsZXNfX2xpc3RMb2NhbGVzO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLndlZWtkYXlzU2hvcnQgICAgICAgICA9IGxpc3RzX19saXN0V2Vla2RheXNTaG9ydDtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5ub3JtYWxpemVVbml0cyAgICAgICAgPSBub3JtYWxpemVVbml0cztcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5yZWxhdGl2ZVRpbWVUaHJlc2hvbGQgPSBkdXJhdGlvbl9odW1hbml6ZV9fZ2V0U2V0UmVsYXRpdmVUaW1lVGhyZXNob2xkO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnByb3RvdHlwZSAgICAgICAgICAgICA9IG1vbWVudFByb3RvdHlwZTtcclxuXHJcbiAgICB2YXIgX21vbWVudCA9IHV0aWxzX2hvb2tzX19ob29rcztcclxuXHJcbiAgICByZXR1cm4gX21vbWVudDtcclxuXHJcbn0pKTsiLCIvKiEgdmVyc2lvbiA6IDQuMTcuMzdcclxuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gYm9vdHN0cmFwLWRhdGV0aW1lanNcclxuIGh0dHBzOi8vZ2l0aHViLmNvbS9Fb25hc2Rhbi9ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXJcclxuIENvcHlyaWdodCAoYykgMjAxNSBKb25hdGhhbiBQZXRlcnNvblxyXG4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqL1xyXG4hZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXCJqcXVlcnlcIixcIm1vbWVudFwiXSxhKTtlbHNlIGlmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzKWEocmVxdWlyZShcImpxdWVyeVwiKSxyZXF1aXJlKFwibW9tZW50XCIpKTtlbHNle2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBqUXVlcnkpdGhyb3dcImJvb3RzdHJhcC1kYXRldGltZXBpY2tlciByZXF1aXJlcyBqUXVlcnkgdG8gYmUgbG9hZGVkIGZpcnN0XCI7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIG1vbWVudCl0aHJvd1wiYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyIHJlcXVpcmVzIE1vbWVudC5qcyB0byBiZSBsb2FkZWQgZmlyc3RcIjthKGpRdWVyeSxtb21lbnQpfX0oZnVuY3Rpb24oYSxiKXtcInVzZSBzdHJpY3RcIjtpZighYil0aHJvdyBuZXcgRXJyb3IoXCJib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIgcmVxdWlyZXMgTW9tZW50LmpzIHRvIGJlIGxvYWRlZCBmaXJzdFwiKTt2YXIgYz1mdW5jdGlvbihjLGQpe3ZhciBlLGYsZyxoLGksaixrLGw9e30sbT0hMCxuPSExLG89ITEscD0wLHE9W3tjbHNOYW1lOlwiZGF5c1wiLG5hdkZuYzpcIk1cIixuYXZTdGVwOjF9LHtjbHNOYW1lOlwibW9udGhzXCIsbmF2Rm5jOlwieVwiLG5hdlN0ZXA6MX0se2Nsc05hbWU6XCJ5ZWFyc1wiLG5hdkZuYzpcInlcIixuYXZTdGVwOjEwfSx7Y2xzTmFtZTpcImRlY2FkZXNcIixuYXZGbmM6XCJ5XCIsbmF2U3RlcDoxMDB9XSxyPVtcImRheXNcIixcIm1vbnRoc1wiLFwieWVhcnNcIixcImRlY2FkZXNcIl0scz1bXCJ0b3BcIixcImJvdHRvbVwiLFwiYXV0b1wiXSx0PVtcImxlZnRcIixcInJpZ2h0XCIsXCJhdXRvXCJdLHU9W1wiZGVmYXVsdFwiLFwidG9wXCIsXCJib3R0b21cIl0sdj17dXA6MzgsMzg6XCJ1cFwiLGRvd246NDAsNDA6XCJkb3duXCIsbGVmdDozNywzNzpcImxlZnRcIixyaWdodDozOSwzOTpcInJpZ2h0XCIsdGFiOjksOTpcInRhYlwiLGVzY2FwZToyNywyNzpcImVzY2FwZVwiLGVudGVyOjEzLDEzOlwiZW50ZXJcIixwYWdlVXA6MzMsMzM6XCJwYWdlVXBcIixwYWdlRG93bjozNCwzNDpcInBhZ2VEb3duXCIsc2hpZnQ6MTYsMTY6XCJzaGlmdFwiLGNvbnRyb2w6MTcsMTc6XCJjb250cm9sXCIsc3BhY2U6MzIsMzI6XCJzcGFjZVwiLHQ6ODQsODQ6XCJ0XCIsXCJkZWxldGVcIjo0Niw0NjpcImRlbGV0ZVwifSx3PXt9LHg9ZnVuY3Rpb24oYSl7dmFyIGMsZSxmLGcsaCxpPSExO3JldHVybiB2b2lkIDAhPT1iLnR6JiZ2b2lkIDAhPT1kLnRpbWVab25lJiZudWxsIT09ZC50aW1lWm9uZSYmXCJcIiE9PWQudGltZVpvbmUmJihpPSEwKSx2b2lkIDA9PT1hfHxudWxsPT09YT9jPWk/YigpLnR6KGQudGltZVpvbmUpLnN0YXJ0T2YoXCJkXCIpOmIoKS5zdGFydE9mKFwiZFwiKTppPyhlPWIoKS50eihkLnRpbWVab25lKS51dGNPZmZzZXQoKSxmPWIoYSxqLGQudXNlU3RyaWN0KS51dGNPZmZzZXQoKSxmIT09ZT8oZz1iKCkudHooZC50aW1lWm9uZSkuZm9ybWF0KFwiWlwiKSxoPWIoYSxqLGQudXNlU3RyaWN0KS5mb3JtYXQoXCJZWVlZLU1NLUREW1RdSEg6bW06c3NcIikrZyxjPWIoaCxqLGQudXNlU3RyaWN0KS50eihkLnRpbWVab25lKSk6Yz1iKGEsaixkLnVzZVN0cmljdCkudHooZC50aW1lWm9uZSkpOmM9YihhLGosZC51c2VTdHJpY3QpLGN9LHk9ZnVuY3Rpb24oYSl7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGF8fGEubGVuZ3RoPjEpdGhyb3cgbmV3IFR5cGVFcnJvcihcImlzRW5hYmxlZCBleHBlY3RzIGEgc2luZ2xlIGNoYXJhY3RlciBzdHJpbmcgcGFyYW1ldGVyXCIpO3N3aXRjaChhKXtjYXNlXCJ5XCI6cmV0dXJuLTEhPT1pLmluZGV4T2YoXCJZXCIpO2Nhc2VcIk1cIjpyZXR1cm4tMSE9PWkuaW5kZXhPZihcIk1cIik7Y2FzZVwiZFwiOnJldHVybi0xIT09aS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJkXCIpO2Nhc2VcImhcIjpjYXNlXCJIXCI6cmV0dXJuLTEhPT1pLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImhcIik7Y2FzZVwibVwiOnJldHVybi0xIT09aS5pbmRleE9mKFwibVwiKTtjYXNlXCJzXCI6cmV0dXJuLTEhPT1pLmluZGV4T2YoXCJzXCIpO2RlZmF1bHQ6cmV0dXJuITF9fSx6PWZ1bmN0aW9uKCl7cmV0dXJuIHkoXCJoXCIpfHx5KFwibVwiKXx8eShcInNcIil9LEE9ZnVuY3Rpb24oKXtyZXR1cm4geShcInlcIil8fHkoXCJNXCIpfHx5KFwiZFwiKX0sQj1mdW5jdGlvbigpe3ZhciBiPWEoXCI8dGhlYWQ+XCIpLmFwcGVuZChhKFwiPHRyPlwiKS5hcHBlbmQoYShcIjx0aD5cIikuYWRkQ2xhc3MoXCJwcmV2XCIpLmF0dHIoXCJkYXRhLWFjdGlvblwiLFwicHJldmlvdXNcIikuYXBwZW5kKGEoXCI8c3Bhbj5cIikuYWRkQ2xhc3MoZC5pY29ucy5wcmV2aW91cykpKS5hcHBlbmQoYShcIjx0aD5cIikuYWRkQ2xhc3MoXCJwaWNrZXItc3dpdGNoXCIpLmF0dHIoXCJkYXRhLWFjdGlvblwiLFwicGlja2VyU3dpdGNoXCIpLmF0dHIoXCJjb2xzcGFuXCIsZC5jYWxlbmRhcldlZWtzP1wiNlwiOlwiNVwiKSkuYXBwZW5kKGEoXCI8dGg+XCIpLmFkZENsYXNzKFwibmV4dFwiKS5hdHRyKFwiZGF0YS1hY3Rpb25cIixcIm5leHRcIikuYXBwZW5kKGEoXCI8c3Bhbj5cIikuYWRkQ2xhc3MoZC5pY29ucy5uZXh0KSkpKSxjPWEoXCI8dGJvZHk+XCIpLmFwcGVuZChhKFwiPHRyPlwiKS5hcHBlbmQoYShcIjx0ZD5cIikuYXR0cihcImNvbHNwYW5cIixkLmNhbGVuZGFyV2Vla3M/XCI4XCI6XCI3XCIpKSk7cmV0dXJuW2EoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcImRhdGVwaWNrZXItZGF5c1wiKS5hcHBlbmQoYShcIjx0YWJsZT5cIikuYWRkQ2xhc3MoXCJ0YWJsZS1jb25kZW5zZWRcIikuYXBwZW5kKGIpLmFwcGVuZChhKFwiPHRib2R5PlwiKSkpLGEoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcImRhdGVwaWNrZXItbW9udGhzXCIpLmFwcGVuZChhKFwiPHRhYmxlPlwiKS5hZGRDbGFzcyhcInRhYmxlLWNvbmRlbnNlZFwiKS5hcHBlbmQoYi5jbG9uZSgpKS5hcHBlbmQoYy5jbG9uZSgpKSksYShcIjxkaXY+XCIpLmFkZENsYXNzKFwiZGF0ZXBpY2tlci15ZWFyc1wiKS5hcHBlbmQoYShcIjx0YWJsZT5cIikuYWRkQ2xhc3MoXCJ0YWJsZS1jb25kZW5zZWRcIikuYXBwZW5kKGIuY2xvbmUoKSkuYXBwZW5kKGMuY2xvbmUoKSkpLGEoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcImRhdGVwaWNrZXItZGVjYWRlc1wiKS5hcHBlbmQoYShcIjx0YWJsZT5cIikuYWRkQ2xhc3MoXCJ0YWJsZS1jb25kZW5zZWRcIikuYXBwZW5kKGIuY2xvbmUoKSkuYXBwZW5kKGMuY2xvbmUoKSkpXX0sQz1mdW5jdGlvbigpe3ZhciBiPWEoXCI8dHI+XCIpLGM9YShcIjx0cj5cIiksZT1hKFwiPHRyPlwiKTtyZXR1cm4geShcImhcIikmJihiLmFwcGVuZChhKFwiPHRkPlwiKS5hcHBlbmQoYShcIjxhPlwiKS5hdHRyKHtocmVmOlwiI1wiLHRhYmluZGV4OlwiLTFcIix0aXRsZTpkLnRvb2x0aXBzLmluY3JlbWVudEhvdXJ9KS5hZGRDbGFzcyhcImJ0blwiKS5hdHRyKFwiZGF0YS1hY3Rpb25cIixcImluY3JlbWVudEhvdXJzXCIpLmFwcGVuZChhKFwiPHNwYW4+XCIpLmFkZENsYXNzKGQuaWNvbnMudXApKSkpLGMuYXBwZW5kKGEoXCI8dGQ+XCIpLmFwcGVuZChhKFwiPHNwYW4+XCIpLmFkZENsYXNzKFwidGltZXBpY2tlci1ob3VyXCIpLmF0dHIoe1wiZGF0YS10aW1lLWNvbXBvbmVudFwiOlwiaG91cnNcIix0aXRsZTpkLnRvb2x0aXBzLnBpY2tIb3VyfSkuYXR0cihcImRhdGEtYWN0aW9uXCIsXCJzaG93SG91cnNcIikpKSxlLmFwcGVuZChhKFwiPHRkPlwiKS5hcHBlbmQoYShcIjxhPlwiKS5hdHRyKHtocmVmOlwiI1wiLHRhYmluZGV4OlwiLTFcIix0aXRsZTpkLnRvb2x0aXBzLmRlY3JlbWVudEhvdXJ9KS5hZGRDbGFzcyhcImJ0blwiKS5hdHRyKFwiZGF0YS1hY3Rpb25cIixcImRlY3JlbWVudEhvdXJzXCIpLmFwcGVuZChhKFwiPHNwYW4+XCIpLmFkZENsYXNzKGQuaWNvbnMuZG93bikpKSkpLHkoXCJtXCIpJiYoeShcImhcIikmJihiLmFwcGVuZChhKFwiPHRkPlwiKS5hZGRDbGFzcyhcInNlcGFyYXRvclwiKSksYy5hcHBlbmQoYShcIjx0ZD5cIikuYWRkQ2xhc3MoXCJzZXBhcmF0b3JcIikuaHRtbChcIjpcIikpLGUuYXBwZW5kKGEoXCI8dGQ+XCIpLmFkZENsYXNzKFwic2VwYXJhdG9yXCIpKSksYi5hcHBlbmQoYShcIjx0ZD5cIikuYXBwZW5kKGEoXCI8YT5cIikuYXR0cih7aHJlZjpcIiNcIix0YWJpbmRleDpcIi0xXCIsdGl0bGU6ZC50b29sdGlwcy5pbmNyZW1lbnRNaW51dGV9KS5hZGRDbGFzcyhcImJ0blwiKS5hdHRyKFwiZGF0YS1hY3Rpb25cIixcImluY3JlbWVudE1pbnV0ZXNcIikuYXBwZW5kKGEoXCI8c3Bhbj5cIikuYWRkQ2xhc3MoZC5pY29ucy51cCkpKSksYy5hcHBlbmQoYShcIjx0ZD5cIikuYXBwZW5kKGEoXCI8c3Bhbj5cIikuYWRkQ2xhc3MoXCJ0aW1lcGlja2VyLW1pbnV0ZVwiKS5hdHRyKHtcImRhdGEtdGltZS1jb21wb25lbnRcIjpcIm1pbnV0ZXNcIix0aXRsZTpkLnRvb2x0aXBzLnBpY2tNaW51dGV9KS5hdHRyKFwiZGF0YS1hY3Rpb25cIixcInNob3dNaW51dGVzXCIpKSksZS5hcHBlbmQoYShcIjx0ZD5cIikuYXBwZW5kKGEoXCI8YT5cIikuYXR0cih7aHJlZjpcIiNcIix0YWJpbmRleDpcIi0xXCIsdGl0bGU6ZC50b29sdGlwcy5kZWNyZW1lbnRNaW51dGV9KS5hZGRDbGFzcyhcImJ0blwiKS5hdHRyKFwiZGF0YS1hY3Rpb25cIixcImRlY3JlbWVudE1pbnV0ZXNcIikuYXBwZW5kKGEoXCI8c3Bhbj5cIikuYWRkQ2xhc3MoZC5pY29ucy5kb3duKSkpKSkseShcInNcIikmJih5KFwibVwiKSYmKGIuYXBwZW5kKGEoXCI8dGQ+XCIpLmFkZENsYXNzKFwic2VwYXJhdG9yXCIpKSxjLmFwcGVuZChhKFwiPHRkPlwiKS5hZGRDbGFzcyhcInNlcGFyYXRvclwiKS5odG1sKFwiOlwiKSksZS5hcHBlbmQoYShcIjx0ZD5cIikuYWRkQ2xhc3MoXCJzZXBhcmF0b3JcIikpKSxiLmFwcGVuZChhKFwiPHRkPlwiKS5hcHBlbmQoYShcIjxhPlwiKS5hdHRyKHtocmVmOlwiI1wiLHRhYmluZGV4OlwiLTFcIix0aXRsZTpkLnRvb2x0aXBzLmluY3JlbWVudFNlY29uZH0pLmFkZENsYXNzKFwiYnRuXCIpLmF0dHIoXCJkYXRhLWFjdGlvblwiLFwiaW5jcmVtZW50U2Vjb25kc1wiKS5hcHBlbmQoYShcIjxzcGFuPlwiKS5hZGRDbGFzcyhkLmljb25zLnVwKSkpKSxjLmFwcGVuZChhKFwiPHRkPlwiKS5hcHBlbmQoYShcIjxzcGFuPlwiKS5hZGRDbGFzcyhcInRpbWVwaWNrZXItc2Vjb25kXCIpLmF0dHIoe1wiZGF0YS10aW1lLWNvbXBvbmVudFwiOlwic2Vjb25kc1wiLHRpdGxlOmQudG9vbHRpcHMucGlja1NlY29uZH0pLmF0dHIoXCJkYXRhLWFjdGlvblwiLFwic2hvd1NlY29uZHNcIikpKSxlLmFwcGVuZChhKFwiPHRkPlwiKS5hcHBlbmQoYShcIjxhPlwiKS5hdHRyKHtocmVmOlwiI1wiLHRhYmluZGV4OlwiLTFcIix0aXRsZTpkLnRvb2x0aXBzLmRlY3JlbWVudFNlY29uZH0pLmFkZENsYXNzKFwiYnRuXCIpLmF0dHIoXCJkYXRhLWFjdGlvblwiLFwiZGVjcmVtZW50U2Vjb25kc1wiKS5hcHBlbmQoYShcIjxzcGFuPlwiKS5hZGRDbGFzcyhkLmljb25zLmRvd24pKSkpKSxofHwoYi5hcHBlbmQoYShcIjx0ZD5cIikuYWRkQ2xhc3MoXCJzZXBhcmF0b3JcIikpLGMuYXBwZW5kKGEoXCI8dGQ+XCIpLmFwcGVuZChhKFwiPGJ1dHRvbj5cIikuYWRkQ2xhc3MoXCJidG4gYnRuLXByaW1hcnlcIikuYXR0cih7XCJkYXRhLWFjdGlvblwiOlwidG9nZ2xlUGVyaW9kXCIsdGFiaW5kZXg6XCItMVwiLHRpdGxlOmQudG9vbHRpcHMudG9nZ2xlUGVyaW9kfSkpKSxlLmFwcGVuZChhKFwiPHRkPlwiKS5hZGRDbGFzcyhcInNlcGFyYXRvclwiKSkpLGEoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcInRpbWVwaWNrZXItcGlja2VyXCIpLmFwcGVuZChhKFwiPHRhYmxlPlwiKS5hZGRDbGFzcyhcInRhYmxlLWNvbmRlbnNlZFwiKS5hcHBlbmQoW2IsYyxlXSkpfSxEPWZ1bmN0aW9uKCl7dmFyIGI9YShcIjxkaXY+XCIpLmFkZENsYXNzKFwidGltZXBpY2tlci1ob3Vyc1wiKS5hcHBlbmQoYShcIjx0YWJsZT5cIikuYWRkQ2xhc3MoXCJ0YWJsZS1jb25kZW5zZWRcIikpLGM9YShcIjxkaXY+XCIpLmFkZENsYXNzKFwidGltZXBpY2tlci1taW51dGVzXCIpLmFwcGVuZChhKFwiPHRhYmxlPlwiKS5hZGRDbGFzcyhcInRhYmxlLWNvbmRlbnNlZFwiKSksZD1hKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJ0aW1lcGlja2VyLXNlY29uZHNcIikuYXBwZW5kKGEoXCI8dGFibGU+XCIpLmFkZENsYXNzKFwidGFibGUtY29uZGVuc2VkXCIpKSxlPVtDKCldO3JldHVybiB5KFwiaFwiKSYmZS5wdXNoKGIpLHkoXCJtXCIpJiZlLnB1c2goYykseShcInNcIikmJmUucHVzaChkKSxlfSxFPWZ1bmN0aW9uKCl7dmFyIGI9W107cmV0dXJuIGQuc2hvd1RvZGF5QnV0dG9uJiZiLnB1c2goYShcIjx0ZD5cIikuYXBwZW5kKGEoXCI8YT5cIikuYXR0cih7XCJkYXRhLWFjdGlvblwiOlwidG9kYXlcIix0aXRsZTpkLnRvb2x0aXBzLnRvZGF5fSkuYXBwZW5kKGEoXCI8c3Bhbj5cIikuYWRkQ2xhc3MoZC5pY29ucy50b2RheSkpKSksIWQuc2lkZUJ5U2lkZSYmQSgpJiZ6KCkmJmIucHVzaChhKFwiPHRkPlwiKS5hcHBlbmQoYShcIjxhPlwiKS5hdHRyKHtcImRhdGEtYWN0aW9uXCI6XCJ0b2dnbGVQaWNrZXJcIix0aXRsZTpkLnRvb2x0aXBzLnNlbGVjdFRpbWV9KS5hcHBlbmQoYShcIjxzcGFuPlwiKS5hZGRDbGFzcyhkLmljb25zLnRpbWUpKSkpLGQuc2hvd0NsZWFyJiZiLnB1c2goYShcIjx0ZD5cIikuYXBwZW5kKGEoXCI8YT5cIikuYXR0cih7XCJkYXRhLWFjdGlvblwiOlwiY2xlYXJcIix0aXRsZTpkLnRvb2x0aXBzLmNsZWFyfSkuYXBwZW5kKGEoXCI8c3Bhbj5cIikuYWRkQ2xhc3MoZC5pY29ucy5jbGVhcikpKSksZC5zaG93Q2xvc2UmJmIucHVzaChhKFwiPHRkPlwiKS5hcHBlbmQoYShcIjxhPlwiKS5hdHRyKHtcImRhdGEtYWN0aW9uXCI6XCJjbG9zZVwiLHRpdGxlOmQudG9vbHRpcHMuY2xvc2V9KS5hcHBlbmQoYShcIjxzcGFuPlwiKS5hZGRDbGFzcyhkLmljb25zLmNsb3NlKSkpKSxhKFwiPHRhYmxlPlwiKS5hZGRDbGFzcyhcInRhYmxlLWNvbmRlbnNlZFwiKS5hcHBlbmQoYShcIjx0Ym9keT5cIikuYXBwZW5kKGEoXCI8dHI+XCIpLmFwcGVuZChiKSkpfSxGPWZ1bmN0aW9uKCl7dmFyIGI9YShcIjxkaXY+XCIpLmFkZENsYXNzKFwiYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLXdpZGdldCBkcm9wZG93bi1tZW51XCIpLGM9YShcIjxkaXY+XCIpLmFkZENsYXNzKFwiZGF0ZXBpY2tlclwiKS5hcHBlbmQoQigpKSxlPWEoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcInRpbWVwaWNrZXJcIikuYXBwZW5kKEQoKSksZj1hKFwiPHVsPlwiKS5hZGRDbGFzcyhcImxpc3QtdW5zdHlsZWRcIiksZz1hKFwiPGxpPlwiKS5hZGRDbGFzcyhcInBpY2tlci1zd2l0Y2hcIisoZC5jb2xsYXBzZT9cIiBhY2NvcmRpb24tdG9nZ2xlXCI6XCJcIikpLmFwcGVuZChFKCkpO3JldHVybiBkLmlubGluZSYmYi5yZW1vdmVDbGFzcyhcImRyb3Bkb3duLW1lbnVcIiksaCYmYi5hZGRDbGFzcyhcInVzZXR3ZW50eWZvdXJcIikseShcInNcIikmJiFoJiZiLmFkZENsYXNzKFwid2lkZXJcIiksZC5zaWRlQnlTaWRlJiZBKCkmJnooKT8oYi5hZGRDbGFzcyhcInRpbWVwaWNrZXItc2JzXCIpLFwidG9wXCI9PT1kLnRvb2xiYXJQbGFjZW1lbnQmJmIuYXBwZW5kKGcpLGIuYXBwZW5kKGEoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcInJvd1wiKS5hcHBlbmQoYy5hZGRDbGFzcyhcImNvbC1tZC02XCIpKS5hcHBlbmQoZS5hZGRDbGFzcyhcImNvbC1tZC02XCIpKSksXCJib3R0b21cIj09PWQudG9vbGJhclBsYWNlbWVudCYmYi5hcHBlbmQoZyksYik6KFwidG9wXCI9PT1kLnRvb2xiYXJQbGFjZW1lbnQmJmYuYXBwZW5kKGcpLEEoKSYmZi5hcHBlbmQoYShcIjxsaT5cIikuYWRkQ2xhc3MoZC5jb2xsYXBzZSYmeigpP1wiY29sbGFwc2UgaW5cIjpcIlwiKS5hcHBlbmQoYykpLFwiZGVmYXVsdFwiPT09ZC50b29sYmFyUGxhY2VtZW50JiZmLmFwcGVuZChnKSx6KCkmJmYuYXBwZW5kKGEoXCI8bGk+XCIpLmFkZENsYXNzKGQuY29sbGFwc2UmJkEoKT9cImNvbGxhcHNlXCI6XCJcIikuYXBwZW5kKGUpKSxcImJvdHRvbVwiPT09ZC50b29sYmFyUGxhY2VtZW50JiZmLmFwcGVuZChnKSxiLmFwcGVuZChmKSl9LEc9ZnVuY3Rpb24oKXt2YXIgYixlPXt9O3JldHVybiBiPWMuaXMoXCJpbnB1dFwiKXx8ZC5pbmxpbmU/Yy5kYXRhKCk6Yy5maW5kKFwiaW5wdXRcIikuZGF0YSgpLGIuZGF0ZU9wdGlvbnMmJmIuZGF0ZU9wdGlvbnMgaW5zdGFuY2VvZiBPYmplY3QmJihlPWEuZXh0ZW5kKCEwLGUsYi5kYXRlT3B0aW9ucykpLGEuZWFjaChkLGZ1bmN0aW9uKGEpe3ZhciBjPVwiZGF0ZVwiK2EuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrYS5zbGljZSgxKTt2b2lkIDAhPT1iW2NdJiYoZVthXT1iW2NdKX0pLGV9LEg9ZnVuY3Rpb24oKXt2YXIgYixlPShufHxjKS5wb3NpdGlvbigpLGY9KG58fGMpLm9mZnNldCgpLGc9ZC53aWRnZXRQb3NpdGlvbmluZy52ZXJ0aWNhbCxoPWQud2lkZ2V0UG9zaXRpb25pbmcuaG9yaXpvbnRhbDtpZihkLndpZGdldFBhcmVudCliPWQud2lkZ2V0UGFyZW50LmFwcGVuZChvKTtlbHNlIGlmKGMuaXMoXCJpbnB1dFwiKSliPWMuYWZ0ZXIobykucGFyZW50KCk7ZWxzZXtpZihkLmlubGluZSlyZXR1cm4gdm9pZChiPWMuYXBwZW5kKG8pKTtiPWMsYy5jaGlsZHJlbigpLmZpcnN0KCkuYWZ0ZXIobyl9aWYoXCJhdXRvXCI9PT1nJiYoZz1mLnRvcCsxLjUqby5oZWlnaHQoKT49YSh3aW5kb3cpLmhlaWdodCgpK2Eod2luZG93KS5zY3JvbGxUb3AoKSYmby5oZWlnaHQoKStjLm91dGVySGVpZ2h0KCk8Zi50b3A/XCJ0b3BcIjpcImJvdHRvbVwiKSxcImF1dG9cIj09PWgmJihoPWIud2lkdGgoKTxmLmxlZnQrby5vdXRlcldpZHRoKCkvMiYmZi5sZWZ0K28ub3V0ZXJXaWR0aCgpPmEod2luZG93KS53aWR0aCgpP1wicmlnaHRcIjpcImxlZnRcIiksXCJ0b3BcIj09PWc/by5hZGRDbGFzcyhcInRvcFwiKS5yZW1vdmVDbGFzcyhcImJvdHRvbVwiKTpvLmFkZENsYXNzKFwiYm90dG9tXCIpLnJlbW92ZUNsYXNzKFwidG9wXCIpLFwicmlnaHRcIj09PWg/by5hZGRDbGFzcyhcInB1bGwtcmlnaHRcIik6by5yZW1vdmVDbGFzcyhcInB1bGwtcmlnaHRcIiksXCJyZWxhdGl2ZVwiIT09Yi5jc3MoXCJwb3NpdGlvblwiKSYmKGI9Yi5wYXJlbnRzKCkuZmlsdGVyKGZ1bmN0aW9uKCl7cmV0dXJuXCJyZWxhdGl2ZVwiPT09YSh0aGlzKS5jc3MoXCJwb3NpdGlvblwiKX0pLmZpcnN0KCkpLDA9PT1iLmxlbmd0aCl0aHJvdyBuZXcgRXJyb3IoXCJkYXRldGltZXBpY2tlciBjb21wb25lbnQgc2hvdWxkIGJlIHBsYWNlZCB3aXRoaW4gYSByZWxhdGl2ZSBwb3NpdGlvbmVkIGNvbnRhaW5lclwiKTtvLmNzcyh7dG9wOlwidG9wXCI9PT1nP1wiYXV0b1wiOmUudG9wK2Mub3V0ZXJIZWlnaHQoKSxib3R0b206XCJ0b3BcIj09PWc/ZS50b3ArYy5vdXRlckhlaWdodCgpOlwiYXV0b1wiLGxlZnQ6XCJsZWZ0XCI9PT1oP2I9PT1jPzA6ZS5sZWZ0OlwiYXV0b1wiLHJpZ2h0OlwibGVmdFwiPT09aD9cImF1dG9cIjpiLm91dGVyV2lkdGgoKS1jLm91dGVyV2lkdGgoKS0oYj09PWM/MDplLmxlZnQpfSl9LEk9ZnVuY3Rpb24oYSl7XCJkcC5jaGFuZ2VcIj09PWEudHlwZSYmKGEuZGF0ZSYmYS5kYXRlLmlzU2FtZShhLm9sZERhdGUpfHwhYS5kYXRlJiYhYS5vbGREYXRlKXx8Yy50cmlnZ2VyKGEpfSxKPWZ1bmN0aW9uKGEpe1wieVwiPT09YSYmKGE9XCJZWVlZXCIpLEkoe3R5cGU6XCJkcC51cGRhdGVcIixjaGFuZ2U6YSx2aWV3RGF0ZTpmLmNsb25lKCl9KX0sSz1mdW5jdGlvbihhKXtvJiYoYSYmKGs9TWF0aC5tYXgocCxNYXRoLm1pbigzLGsrYSkpKSxvLmZpbmQoXCIuZGF0ZXBpY2tlciA+IGRpdlwiKS5oaWRlKCkuZmlsdGVyKFwiLmRhdGVwaWNrZXItXCIrcVtrXS5jbHNOYW1lKS5zaG93KCkpfSxMPWZ1bmN0aW9uKCl7dmFyIGI9YShcIjx0cj5cIiksYz1mLmNsb25lKCkuc3RhcnRPZihcIndcIikuc3RhcnRPZihcImRcIik7Zm9yKGQuY2FsZW5kYXJXZWVrcz09PSEwJiZiLmFwcGVuZChhKFwiPHRoPlwiKS5hZGRDbGFzcyhcImN3XCIpLnRleHQoXCIjXCIpKTtjLmlzQmVmb3JlKGYuY2xvbmUoKS5lbmRPZihcIndcIikpOyliLmFwcGVuZChhKFwiPHRoPlwiKS5hZGRDbGFzcyhcImRvd1wiKS50ZXh0KGMuZm9ybWF0KFwiZGRcIikpKSxjLmFkZCgxLFwiZFwiKTtvLmZpbmQoXCIuZGF0ZXBpY2tlci1kYXlzIHRoZWFkXCIpLmFwcGVuZChiKX0sTT1mdW5jdGlvbihhKXtyZXR1cm4gZC5kaXNhYmxlZERhdGVzW2EuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKV09PT0hMH0sTj1mdW5jdGlvbihhKXtyZXR1cm4gZC5lbmFibGVkRGF0ZXNbYS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpXT09PSEwfSxPPWZ1bmN0aW9uKGEpe3JldHVybiBkLmRpc2FibGVkSG91cnNbYS5mb3JtYXQoXCJIXCIpXT09PSEwfSxQPWZ1bmN0aW9uKGEpe3JldHVybiBkLmVuYWJsZWRIb3Vyc1thLmZvcm1hdChcIkhcIildPT09ITB9LFE9ZnVuY3Rpb24oYixjKXtpZighYi5pc1ZhbGlkKCkpcmV0dXJuITE7aWYoZC5kaXNhYmxlZERhdGVzJiZcImRcIj09PWMmJk0oYikpcmV0dXJuITE7aWYoZC5lbmFibGVkRGF0ZXMmJlwiZFwiPT09YyYmIU4oYikpcmV0dXJuITE7aWYoZC5taW5EYXRlJiZiLmlzQmVmb3JlKGQubWluRGF0ZSxjKSlyZXR1cm4hMTtpZihkLm1heERhdGUmJmIuaXNBZnRlcihkLm1heERhdGUsYykpcmV0dXJuITE7aWYoZC5kYXlzT2ZXZWVrRGlzYWJsZWQmJlwiZFwiPT09YyYmLTEhPT1kLmRheXNPZldlZWtEaXNhYmxlZC5pbmRleE9mKGIuZGF5KCkpKXJldHVybiExO2lmKGQuZGlzYWJsZWRIb3VycyYmKFwiaFwiPT09Y3x8XCJtXCI9PT1jfHxcInNcIj09PWMpJiZPKGIpKXJldHVybiExO2lmKGQuZW5hYmxlZEhvdXJzJiYoXCJoXCI9PT1jfHxcIm1cIj09PWN8fFwic1wiPT09YykmJiFQKGIpKXJldHVybiExO2lmKGQuZGlzYWJsZWRUaW1lSW50ZXJ2YWxzJiYoXCJoXCI9PT1jfHxcIm1cIj09PWN8fFwic1wiPT09Yykpe3ZhciBlPSExO2lmKGEuZWFjaChkLmRpc2FibGVkVGltZUludGVydmFscyxmdW5jdGlvbigpe3JldHVybiBiLmlzQmV0d2Vlbih0aGlzWzBdLHRoaXNbMV0pPyhlPSEwLCExKTp2b2lkIDB9KSxlKXJldHVybiExfXJldHVybiEwfSxSPWZ1bmN0aW9uKCl7Zm9yKHZhciBiPVtdLGM9Zi5jbG9uZSgpLnN0YXJ0T2YoXCJ5XCIpLnN0YXJ0T2YoXCJkXCIpO2MuaXNTYW1lKGYsXCJ5XCIpOyliLnB1c2goYShcIjxzcGFuPlwiKS5hdHRyKFwiZGF0YS1hY3Rpb25cIixcInNlbGVjdE1vbnRoXCIpLmFkZENsYXNzKFwibW9udGhcIikudGV4dChjLmZvcm1hdChcIk1NTVwiKSkpLGMuYWRkKDEsXCJNXCIpO28uZmluZChcIi5kYXRlcGlja2VyLW1vbnRocyB0ZFwiKS5lbXB0eSgpLmFwcGVuZChiKX0sUz1mdW5jdGlvbigpe3ZhciBiPW8uZmluZChcIi5kYXRlcGlja2VyLW1vbnRoc1wiKSxjPWIuZmluZChcInRoXCIpLGc9Yi5maW5kKFwidGJvZHlcIikuZmluZChcInNwYW5cIik7Yy5lcSgwKS5maW5kKFwic3BhblwiKS5hdHRyKFwidGl0bGVcIixkLnRvb2x0aXBzLnByZXZZZWFyKSxjLmVxKDEpLmF0dHIoXCJ0aXRsZVwiLGQudG9vbHRpcHMuc2VsZWN0WWVhciksYy5lcSgyKS5maW5kKFwic3BhblwiKS5hdHRyKFwidGl0bGVcIixkLnRvb2x0aXBzLm5leHRZZWFyKSxiLmZpbmQoXCIuZGlzYWJsZWRcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKSxRKGYuY2xvbmUoKS5zdWJ0cmFjdCgxLFwieVwiKSxcInlcIil8fGMuZXEoMCkuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKSxjLmVxKDEpLnRleHQoZi55ZWFyKCkpLFEoZi5jbG9uZSgpLmFkZCgxLFwieVwiKSxcInlcIil8fGMuZXEoMikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKSxnLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLGUuaXNTYW1lKGYsXCJ5XCIpJiYhbSYmZy5lcShlLm1vbnRoKCkpLmFkZENsYXNzKFwiYWN0aXZlXCIpLGcuZWFjaChmdW5jdGlvbihiKXtRKGYuY2xvbmUoKS5tb250aChiKSxcIk1cIil8fGEodGhpcykuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKX0pfSxUPWZ1bmN0aW9uKCl7dmFyIGE9by5maW5kKFwiLmRhdGVwaWNrZXIteWVhcnNcIiksYj1hLmZpbmQoXCJ0aFwiKSxjPWYuY2xvbmUoKS5zdWJ0cmFjdCg1LFwieVwiKSxnPWYuY2xvbmUoKS5hZGQoNixcInlcIiksaD1cIlwiO2ZvcihiLmVxKDApLmZpbmQoXCJzcGFuXCIpLmF0dHIoXCJ0aXRsZVwiLGQudG9vbHRpcHMucHJldkRlY2FkZSksYi5lcSgxKS5hdHRyKFwidGl0bGVcIixkLnRvb2x0aXBzLnNlbGVjdERlY2FkZSksYi5lcSgyKS5maW5kKFwic3BhblwiKS5hdHRyKFwidGl0bGVcIixkLnRvb2x0aXBzLm5leHREZWNhZGUpLGEuZmluZChcIi5kaXNhYmxlZFwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLGQubWluRGF0ZSYmZC5taW5EYXRlLmlzQWZ0ZXIoYyxcInlcIikmJmIuZXEoMCkuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKSxiLmVxKDEpLnRleHQoYy55ZWFyKCkrXCItXCIrZy55ZWFyKCkpLGQubWF4RGF0ZSYmZC5tYXhEYXRlLmlzQmVmb3JlKGcsXCJ5XCIpJiZiLmVxKDIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7IWMuaXNBZnRlcihnLFwieVwiKTspaCs9JzxzcGFuIGRhdGEtYWN0aW9uPVwic2VsZWN0WWVhclwiIGNsYXNzPVwieWVhcicrKGMuaXNTYW1lKGUsXCJ5XCIpJiYhbT9cIiBhY3RpdmVcIjpcIlwiKSsoUShjLFwieVwiKT9cIlwiOlwiIGRpc2FibGVkXCIpKydcIj4nK2MueWVhcigpK1wiPC9zcGFuPlwiLGMuYWRkKDEsXCJ5XCIpO2EuZmluZChcInRkXCIpLmh0bWwoaCl9LFU9ZnVuY3Rpb24oKXt2YXIgYT1vLmZpbmQoXCIuZGF0ZXBpY2tlci1kZWNhZGVzXCIpLGM9YS5maW5kKFwidGhcIiksZz1iKHt5OmYueWVhcigpLWYueWVhcigpJTEwMC0xfSksaD1nLmNsb25lKCkuYWRkKDEwMCxcInlcIiksaT1nLmNsb25lKCksaj1cIlwiO2ZvcihjLmVxKDApLmZpbmQoXCJzcGFuXCIpLmF0dHIoXCJ0aXRsZVwiLGQudG9vbHRpcHMucHJldkNlbnR1cnkpLGMuZXEoMikuZmluZChcInNwYW5cIikuYXR0cihcInRpdGxlXCIsZC50b29sdGlwcy5uZXh0Q2VudHVyeSksYS5maW5kKFwiLmRpc2FibGVkXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIiksKGcuaXNTYW1lKGIoe3k6MTkwMH0pKXx8ZC5taW5EYXRlJiZkLm1pbkRhdGUuaXNBZnRlcihnLFwieVwiKSkmJmMuZXEoMCkuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKSxjLmVxKDEpLnRleHQoZy55ZWFyKCkrXCItXCIraC55ZWFyKCkpLChnLmlzU2FtZShiKHt5OjJlM30pKXx8ZC5tYXhEYXRlJiZkLm1heERhdGUuaXNCZWZvcmUoaCxcInlcIikpJiZjLmVxKDIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7IWcuaXNBZnRlcihoLFwieVwiKTspais9JzxzcGFuIGRhdGEtYWN0aW9uPVwic2VsZWN0RGVjYWRlXCIgY2xhc3M9XCJkZWNhZGUnKyhnLmlzU2FtZShlLFwieVwiKT9cIiBhY3RpdmVcIjpcIlwiKSsoUShnLFwieVwiKT9cIlwiOlwiIGRpc2FibGVkXCIpKydcIiBkYXRhLXNlbGVjdGlvbj1cIicrKGcueWVhcigpKzYpKydcIj4nKyhnLnllYXIoKSsxKStcIiAtIFwiKyhnLnllYXIoKSsxMikrXCI8L3NwYW4+XCIsZy5hZGQoMTIsXCJ5XCIpO2orPVwiPHNwYW4+PC9zcGFuPjxzcGFuPjwvc3Bhbj48c3Bhbj48L3NwYW4+XCIsYS5maW5kKFwidGRcIikuaHRtbChqKSxjLmVxKDEpLnRleHQoaS55ZWFyKCkrMStcIi1cIitnLnllYXIoKSl9LFY9ZnVuY3Rpb24oKXt2YXIgYixjLGcsaCxpPW8uZmluZChcIi5kYXRlcGlja2VyLWRheXNcIiksaj1pLmZpbmQoXCJ0aFwiKSxrPVtdO2lmKEEoKSl7Zm9yKGouZXEoMCkuZmluZChcInNwYW5cIikuYXR0cihcInRpdGxlXCIsZC50b29sdGlwcy5wcmV2TW9udGgpLGouZXEoMSkuYXR0cihcInRpdGxlXCIsZC50b29sdGlwcy5zZWxlY3RNb250aCksai5lcSgyKS5maW5kKFwic3BhblwiKS5hdHRyKFwidGl0bGVcIixkLnRvb2x0aXBzLm5leHRNb250aCksaS5maW5kKFwiLmRpc2FibGVkXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIiksai5lcSgxKS50ZXh0KGYuZm9ybWF0KGQuZGF5Vmlld0hlYWRlckZvcm1hdCkpLFEoZi5jbG9uZSgpLnN1YnRyYWN0KDEsXCJNXCIpLFwiTVwiKXx8ai5lcSgwKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpLFEoZi5jbG9uZSgpLmFkZCgxLFwiTVwiKSxcIk1cIil8fGouZXEoMikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKSxiPWYuY2xvbmUoKS5zdGFydE9mKFwiTVwiKS5zdGFydE9mKFwid1wiKS5zdGFydE9mKFwiZFwiKSxoPTA7NDI+aDtoKyspMD09PWIud2Vla2RheSgpJiYoYz1hKFwiPHRyPlwiKSxkLmNhbGVuZGFyV2Vla3MmJmMuYXBwZW5kKCc8dGQgY2xhc3M9XCJjd1wiPicrYi53ZWVrKCkrXCI8L3RkPlwiKSxrLnB1c2goYykpLGc9XCJcIixiLmlzQmVmb3JlKGYsXCJNXCIpJiYoZys9XCIgb2xkXCIpLGIuaXNBZnRlcihmLFwiTVwiKSYmKGcrPVwiIG5ld1wiKSxiLmlzU2FtZShlLFwiZFwiKSYmIW0mJihnKz1cIiBhY3RpdmVcIiksUShiLFwiZFwiKXx8KGcrPVwiIGRpc2FibGVkXCIpLGIuaXNTYW1lKHgoKSxcImRcIikmJihnKz1cIiB0b2RheVwiKSwoMD09PWIuZGF5KCl8fDY9PT1iLmRheSgpKSYmKGcrPVwiIHdlZWtlbmRcIiksYy5hcHBlbmQoJzx0ZCBkYXRhLWFjdGlvbj1cInNlbGVjdERheVwiIGRhdGEtZGF5PVwiJytiLmZvcm1hdChcIkxcIikrJ1wiIGNsYXNzPVwiZGF5JytnKydcIj4nK2IuZGF0ZSgpK1wiPC90ZD5cIiksYi5hZGQoMSxcImRcIik7aS5maW5kKFwidGJvZHlcIikuZW1wdHkoKS5hcHBlbmQoayksUygpLFQoKSxVKCl9fSxXPWZ1bmN0aW9uKCl7dmFyIGI9by5maW5kKFwiLnRpbWVwaWNrZXItaG91cnMgdGFibGVcIiksYz1mLmNsb25lKCkuc3RhcnRPZihcImRcIiksZD1bXSxlPWEoXCI8dHI+XCIpO2ZvcihmLmhvdXIoKT4xMSYmIWgmJmMuaG91cigxMik7Yy5pc1NhbWUoZixcImRcIikmJihofHxmLmhvdXIoKTwxMiYmYy5ob3VyKCk8MTJ8fGYuaG91cigpPjExKTspYy5ob3VyKCklND09PTAmJihlPWEoXCI8dHI+XCIpLGQucHVzaChlKSksZS5hcHBlbmQoJzx0ZCBkYXRhLWFjdGlvbj1cInNlbGVjdEhvdXJcIiBjbGFzcz1cImhvdXInKyhRKGMsXCJoXCIpP1wiXCI6XCIgZGlzYWJsZWRcIikrJ1wiPicrYy5mb3JtYXQoaD9cIkhIXCI6XCJoaFwiKStcIjwvdGQ+XCIpLGMuYWRkKDEsXCJoXCIpO2IuZW1wdHkoKS5hcHBlbmQoZCl9LFg9ZnVuY3Rpb24oKXtmb3IodmFyIGI9by5maW5kKFwiLnRpbWVwaWNrZXItbWludXRlcyB0YWJsZVwiKSxjPWYuY2xvbmUoKS5zdGFydE9mKFwiaFwiKSxlPVtdLGc9YShcIjx0cj5cIiksaD0xPT09ZC5zdGVwcGluZz81OmQuc3RlcHBpbmc7Zi5pc1NhbWUoYyxcImhcIik7KWMubWludXRlKCklKDQqaCk9PT0wJiYoZz1hKFwiPHRyPlwiKSxlLnB1c2goZykpLGcuYXBwZW5kKCc8dGQgZGF0YS1hY3Rpb249XCJzZWxlY3RNaW51dGVcIiBjbGFzcz1cIm1pbnV0ZScrKFEoYyxcIm1cIik/XCJcIjpcIiBkaXNhYmxlZFwiKSsnXCI+JytjLmZvcm1hdChcIm1tXCIpK1wiPC90ZD5cIiksYy5hZGQoaCxcIm1cIik7Yi5lbXB0eSgpLmFwcGVuZChlKX0sWT1mdW5jdGlvbigpe2Zvcih2YXIgYj1vLmZpbmQoXCIudGltZXBpY2tlci1zZWNvbmRzIHRhYmxlXCIpLGM9Zi5jbG9uZSgpLnN0YXJ0T2YoXCJtXCIpLGQ9W10sZT1hKFwiPHRyPlwiKTtmLmlzU2FtZShjLFwibVwiKTspYy5zZWNvbmQoKSUyMD09PTAmJihlPWEoXCI8dHI+XCIpLGQucHVzaChlKSksZS5hcHBlbmQoJzx0ZCBkYXRhLWFjdGlvbj1cInNlbGVjdFNlY29uZFwiIGNsYXNzPVwic2Vjb25kJysoUShjLFwic1wiKT9cIlwiOlwiIGRpc2FibGVkXCIpKydcIj4nK2MuZm9ybWF0KFwic3NcIikrXCI8L3RkPlwiKSxjLmFkZCg1LFwic1wiKTtiLmVtcHR5KCkuYXBwZW5kKGQpfSxaPWZ1bmN0aW9uKCl7dmFyIGEsYixjPW8uZmluZChcIi50aW1lcGlja2VyIHNwYW5bZGF0YS10aW1lLWNvbXBvbmVudF1cIik7aHx8KGE9by5maW5kKFwiLnRpbWVwaWNrZXIgW2RhdGEtYWN0aW9uPXRvZ2dsZVBlcmlvZF1cIiksYj1lLmNsb25lKCkuYWRkKGUuaG91cnMoKT49MTI/LTEyOjEyLFwiaFwiKSxhLnRleHQoZS5mb3JtYXQoXCJBXCIpKSxRKGIsXCJoXCIpP2EucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTphLmFkZENsYXNzKFwiZGlzYWJsZWRcIikpLGMuZmlsdGVyKFwiW2RhdGEtdGltZS1jb21wb25lbnQ9aG91cnNdXCIpLnRleHQoZS5mb3JtYXQoaD9cIkhIXCI6XCJoaFwiKSksYy5maWx0ZXIoXCJbZGF0YS10aW1lLWNvbXBvbmVudD1taW51dGVzXVwiKS50ZXh0KGUuZm9ybWF0KFwibW1cIikpLGMuZmlsdGVyKFwiW2RhdGEtdGltZS1jb21wb25lbnQ9c2Vjb25kc11cIikudGV4dChlLmZvcm1hdChcInNzXCIpKSxXKCksWCgpLFkoKX0sJD1mdW5jdGlvbigpe28mJihWKCksWigpKX0sXz1mdW5jdGlvbihhKXt2YXIgYj1tP251bGw6ZTtyZXR1cm4gYT8oYT1hLmNsb25lKCkubG9jYWxlKGQubG9jYWxlKSwxIT09ZC5zdGVwcGluZyYmYS5taW51dGVzKE1hdGgucm91bmQoYS5taW51dGVzKCkvZC5zdGVwcGluZykqZC5zdGVwcGluZyU2MCkuc2Vjb25kcygwKSx2b2lkKFEoYSk/KGU9YSxmPWUuY2xvbmUoKSxnLnZhbChlLmZvcm1hdChpKSksYy5kYXRhKFwiZGF0ZVwiLGUuZm9ybWF0KGkpKSxtPSExLCQoKSxJKHt0eXBlOlwiZHAuY2hhbmdlXCIsZGF0ZTplLmNsb25lKCksb2xkRGF0ZTpifSkpOihkLmtlZXBJbnZhbGlkfHxnLnZhbChtP1wiXCI6ZS5mb3JtYXQoaSkpLEkoe3R5cGU6XCJkcC5lcnJvclwiLGRhdGU6YX0pKSkpOihtPSEwLGcudmFsKFwiXCIpLGMuZGF0YShcImRhdGVcIixcIlwiKSxJKHt0eXBlOlwiZHAuY2hhbmdlXCIsZGF0ZTohMSxvbGREYXRlOmJ9KSx2b2lkICQoKSl9LGFhPWZ1bmN0aW9uKCl7dmFyIGI9ITE7cmV0dXJuIG8/KG8uZmluZChcIi5jb2xsYXBzZVwiKS5lYWNoKGZ1bmN0aW9uKCl7dmFyIGM9YSh0aGlzKS5kYXRhKFwiY29sbGFwc2VcIik7cmV0dXJuIGMmJmMudHJhbnNpdGlvbmluZz8oYj0hMCwhMSk6ITB9KSxiP2w6KG4mJm4uaGFzQ2xhc3MoXCJidG5cIikmJm4udG9nZ2xlQ2xhc3MoXCJhY3RpdmVcIiksby5oaWRlKCksYSh3aW5kb3cpLm9mZihcInJlc2l6ZVwiLEgpLG8ub2ZmKFwiY2xpY2tcIixcIltkYXRhLWFjdGlvbl1cIiksby5vZmYoXCJtb3VzZWRvd25cIiwhMSksby5yZW1vdmUoKSxvPSExLEkoe3R5cGU6XCJkcC5oaWRlXCIsZGF0ZTplLmNsb25lKCl9KSxnLmJsdXIoKSxsKSk6bH0sYmE9ZnVuY3Rpb24oKXtfKG51bGwpfSxjYT17bmV4dDpmdW5jdGlvbigpe3ZhciBhPXFba10ubmF2Rm5jO2YuYWRkKHFba10ubmF2U3RlcCxhKSxWKCksSihhKX0scHJldmlvdXM6ZnVuY3Rpb24oKXt2YXIgYT1xW2tdLm5hdkZuYztmLnN1YnRyYWN0KHFba10ubmF2U3RlcCxhKSxWKCksSihhKX0scGlja2VyU3dpdGNoOmZ1bmN0aW9uKCl7SygxKX0sc2VsZWN0TW9udGg6ZnVuY3Rpb24oYil7dmFyIGM9YShiLnRhcmdldCkuY2xvc2VzdChcInRib2R5XCIpLmZpbmQoXCJzcGFuXCIpLmluZGV4KGEoYi50YXJnZXQpKTtmLm1vbnRoKGMpLGs9PT1wPyhfKGUuY2xvbmUoKS55ZWFyKGYueWVhcigpKS5tb250aChmLm1vbnRoKCkpKSxkLmlubGluZXx8YWEoKSk6KEsoLTEpLFYoKSksSihcIk1cIil9LHNlbGVjdFllYXI6ZnVuY3Rpb24oYil7dmFyIGM9cGFyc2VJbnQoYShiLnRhcmdldCkudGV4dCgpLDEwKXx8MDtmLnllYXIoYyksaz09PXA/KF8oZS5jbG9uZSgpLnllYXIoZi55ZWFyKCkpKSxkLmlubGluZXx8YWEoKSk6KEsoLTEpLFYoKSksSihcIllZWVlcIil9LHNlbGVjdERlY2FkZTpmdW5jdGlvbihiKXt2YXIgYz1wYXJzZUludChhKGIudGFyZ2V0KS5kYXRhKFwic2VsZWN0aW9uXCIpLDEwKXx8MDtmLnllYXIoYyksaz09PXA/KF8oZS5jbG9uZSgpLnllYXIoZi55ZWFyKCkpKSxkLmlubGluZXx8YWEoKSk6KEsoLTEpLFYoKSksSihcIllZWVlcIil9LHNlbGVjdERheTpmdW5jdGlvbihiKXt2YXIgYz1mLmNsb25lKCk7YShiLnRhcmdldCkuaXMoXCIub2xkXCIpJiZjLnN1YnRyYWN0KDEsXCJNXCIpLGEoYi50YXJnZXQpLmlzKFwiLm5ld1wiKSYmYy5hZGQoMSxcIk1cIiksXyhjLmRhdGUocGFyc2VJbnQoYShiLnRhcmdldCkudGV4dCgpLDEwKSkpLHooKXx8ZC5rZWVwT3Blbnx8ZC5pbmxpbmV8fGFhKCl9LGluY3JlbWVudEhvdXJzOmZ1bmN0aW9uKCl7dmFyIGE9ZS5jbG9uZSgpLmFkZCgxLFwiaFwiKTtRKGEsXCJoXCIpJiZfKGEpfSxpbmNyZW1lbnRNaW51dGVzOmZ1bmN0aW9uKCl7dmFyIGE9ZS5jbG9uZSgpLmFkZChkLnN0ZXBwaW5nLFwibVwiKTtRKGEsXCJtXCIpJiZfKGEpfSxpbmNyZW1lbnRTZWNvbmRzOmZ1bmN0aW9uKCl7dmFyIGE9ZS5jbG9uZSgpLmFkZCgxLFwic1wiKTtRKGEsXCJzXCIpJiZfKGEpfSxkZWNyZW1lbnRIb3VyczpmdW5jdGlvbigpe3ZhciBhPWUuY2xvbmUoKS5zdWJ0cmFjdCgxLFwiaFwiKTtRKGEsXCJoXCIpJiZfKGEpfSxkZWNyZW1lbnRNaW51dGVzOmZ1bmN0aW9uKCl7dmFyIGE9ZS5jbG9uZSgpLnN1YnRyYWN0KGQuc3RlcHBpbmcsXCJtXCIpO1EoYSxcIm1cIikmJl8oYSl9LGRlY3JlbWVudFNlY29uZHM6ZnVuY3Rpb24oKXt2YXIgYT1lLmNsb25lKCkuc3VidHJhY3QoMSxcInNcIik7UShhLFwic1wiKSYmXyhhKX0sdG9nZ2xlUGVyaW9kOmZ1bmN0aW9uKCl7XyhlLmNsb25lKCkuYWRkKGUuaG91cnMoKT49MTI/LTEyOjEyLFwiaFwiKSl9LHRvZ2dsZVBpY2tlcjpmdW5jdGlvbihiKXt2YXIgYyxlPWEoYi50YXJnZXQpLGY9ZS5jbG9zZXN0KFwidWxcIiksZz1mLmZpbmQoXCIuaW5cIiksaD1mLmZpbmQoXCIuY29sbGFwc2U6bm90KC5pbilcIik7aWYoZyYmZy5sZW5ndGgpe2lmKGM9Zy5kYXRhKFwiY29sbGFwc2VcIiksYyYmYy50cmFuc2l0aW9uaW5nKXJldHVybjtnLmNvbGxhcHNlPyhnLmNvbGxhcHNlKFwiaGlkZVwiKSxoLmNvbGxhcHNlKFwic2hvd1wiKSk6KGcucmVtb3ZlQ2xhc3MoXCJpblwiKSxoLmFkZENsYXNzKFwiaW5cIikpLGUuaXMoXCJzcGFuXCIpP2UudG9nZ2xlQ2xhc3MoZC5pY29ucy50aW1lK1wiIFwiK2QuaWNvbnMuZGF0ZSk6ZS5maW5kKFwic3BhblwiKS50b2dnbGVDbGFzcyhkLmljb25zLnRpbWUrXCIgXCIrZC5pY29ucy5kYXRlKX19LHNob3dQaWNrZXI6ZnVuY3Rpb24oKXtvLmZpbmQoXCIudGltZXBpY2tlciA+IGRpdjpub3QoLnRpbWVwaWNrZXItcGlja2VyKVwiKS5oaWRlKCksby5maW5kKFwiLnRpbWVwaWNrZXIgLnRpbWVwaWNrZXItcGlja2VyXCIpLnNob3coKX0sc2hvd0hvdXJzOmZ1bmN0aW9uKCl7by5maW5kKFwiLnRpbWVwaWNrZXIgLnRpbWVwaWNrZXItcGlja2VyXCIpLmhpZGUoKSxvLmZpbmQoXCIudGltZXBpY2tlciAudGltZXBpY2tlci1ob3Vyc1wiKS5zaG93KCl9LHNob3dNaW51dGVzOmZ1bmN0aW9uKCl7by5maW5kKFwiLnRpbWVwaWNrZXIgLnRpbWVwaWNrZXItcGlja2VyXCIpLmhpZGUoKSxvLmZpbmQoXCIudGltZXBpY2tlciAudGltZXBpY2tlci1taW51dGVzXCIpLnNob3coKX0sc2hvd1NlY29uZHM6ZnVuY3Rpb24oKXtvLmZpbmQoXCIudGltZXBpY2tlciAudGltZXBpY2tlci1waWNrZXJcIikuaGlkZSgpLG8uZmluZChcIi50aW1lcGlja2VyIC50aW1lcGlja2VyLXNlY29uZHNcIikuc2hvdygpfSxzZWxlY3RIb3VyOmZ1bmN0aW9uKGIpe3ZhciBjPXBhcnNlSW50KGEoYi50YXJnZXQpLnRleHQoKSwxMCk7aHx8KGUuaG91cnMoKT49MTI/MTIhPT1jJiYoYys9MTIpOjEyPT09YyYmKGM9MCkpLF8oZS5jbG9uZSgpLmhvdXJzKGMpKSxjYS5zaG93UGlja2VyLmNhbGwobCl9LHNlbGVjdE1pbnV0ZTpmdW5jdGlvbihiKXtfKGUuY2xvbmUoKS5taW51dGVzKHBhcnNlSW50KGEoYi50YXJnZXQpLnRleHQoKSwxMCkpKSxjYS5zaG93UGlja2VyLmNhbGwobCl9LHNlbGVjdFNlY29uZDpmdW5jdGlvbihiKXtfKGUuY2xvbmUoKS5zZWNvbmRzKHBhcnNlSW50KGEoYi50YXJnZXQpLnRleHQoKSwxMCkpKSxjYS5zaG93UGlja2VyLmNhbGwobCl9LGNsZWFyOmJhLHRvZGF5OmZ1bmN0aW9uKCl7dmFyIGE9eCgpO1EoYSxcImRcIikmJl8oYSl9LGNsb3NlOmFhfSxkYT1mdW5jdGlvbihiKXtyZXR1cm4gYShiLmN1cnJlbnRUYXJnZXQpLmlzKFwiLmRpc2FibGVkXCIpPyExOihjYVthKGIuY3VycmVudFRhcmdldCkuZGF0YShcImFjdGlvblwiKV0uYXBwbHkobCxhcmd1bWVudHMpLCExKX0sZWE9ZnVuY3Rpb24oKXt2YXIgYixjPXt5ZWFyOmZ1bmN0aW9uKGEpe3JldHVybiBhLm1vbnRoKDApLmRhdGUoMSkuaG91cnMoMCkuc2Vjb25kcygwKS5taW51dGVzKDApfSxtb250aDpmdW5jdGlvbihhKXtyZXR1cm4gYS5kYXRlKDEpLmhvdXJzKDApLnNlY29uZHMoMCkubWludXRlcygwKX0sZGF5OmZ1bmN0aW9uKGEpe3JldHVybiBhLmhvdXJzKDApLnNlY29uZHMoMCkubWludXRlcygwKX0saG91cjpmdW5jdGlvbihhKXtyZXR1cm4gYS5zZWNvbmRzKDApLm1pbnV0ZXMoMCl9LG1pbnV0ZTpmdW5jdGlvbihhKXtyZXR1cm4gYS5zZWNvbmRzKDApfX07cmV0dXJuIGcucHJvcChcImRpc2FibGVkXCIpfHwhZC5pZ25vcmVSZWFkb25seSYmZy5wcm9wKFwicmVhZG9ubHlcIil8fG8/bDoodm9pZCAwIT09Zy52YWwoKSYmMCE9PWcudmFsKCkudHJpbSgpLmxlbmd0aD9fKGdhKGcudmFsKCkudHJpbSgpKSk6ZC51c2VDdXJyZW50JiZtJiYoZy5pcyhcImlucHV0XCIpJiYwPT09Zy52YWwoKS50cmltKCkubGVuZ3RofHxkLmlubGluZSkmJihiPXgoKSxcInN0cmluZ1wiPT10eXBlb2YgZC51c2VDdXJyZW50JiYoYj1jW2QudXNlQ3VycmVudF0oYikpLF8oYikpLG89RigpLEwoKSxSKCksby5maW5kKFwiLnRpbWVwaWNrZXItaG91cnNcIikuaGlkZSgpLG8uZmluZChcIi50aW1lcGlja2VyLW1pbnV0ZXNcIikuaGlkZSgpLG8uZmluZChcIi50aW1lcGlja2VyLXNlY29uZHNcIikuaGlkZSgpLCQoKSxLKCksYSh3aW5kb3cpLm9uKFwicmVzaXplXCIsSCksby5vbihcImNsaWNrXCIsXCJbZGF0YS1hY3Rpb25dXCIsZGEpLG8ub24oXCJtb3VzZWRvd25cIiwhMSksbiYmbi5oYXNDbGFzcyhcImJ0blwiKSYmbi50b2dnbGVDbGFzcyhcImFjdGl2ZVwiKSxvLnNob3coKSxIKCksZC5mb2N1c09uU2hvdyYmIWcuaXMoXCI6Zm9jdXNcIikmJmcuZm9jdXMoKSxJKHt0eXBlOlwiZHAuc2hvd1wifSksbCl9LGZhPWZ1bmN0aW9uKCl7cmV0dXJuIG8/YWEoKTplYSgpfSxnYT1mdW5jdGlvbihhKXtyZXR1cm4gYT12b2lkIDA9PT1kLnBhcnNlSW5wdXREYXRlP2IuaXNNb21lbnQoYSl8fGEgaW5zdGFuY2VvZiBEYXRlP2IoYSk6eChhKTpkLnBhcnNlSW5wdXREYXRlKGEpLGEubG9jYWxlKGQubG9jYWxlKSxhfSxoYT1mdW5jdGlvbihhKXt2YXIgYixjLGUsZixnPW51bGwsaD1bXSxpPXt9LGo9YS53aGljaCxrPVwicFwiO3dbal09aztmb3IoYiBpbiB3KXcuaGFzT3duUHJvcGVydHkoYikmJndbYl09PT1rJiYoaC5wdXNoKGIpLHBhcnNlSW50KGIsMTApIT09aiYmKGlbYl09ITApKTtmb3IoYiBpbiBkLmtleUJpbmRzKWlmKGQua2V5QmluZHMuaGFzT3duUHJvcGVydHkoYikmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGQua2V5QmluZHNbYl0mJihlPWIuc3BsaXQoXCIgXCIpLGUubGVuZ3RoPT09aC5sZW5ndGgmJnZbal09PT1lW2UubGVuZ3RoLTFdKSl7Zm9yKGY9ITAsYz1lLmxlbmd0aC0yO2M+PTA7Yy0tKWlmKCEodltlW2NdXWluIGkpKXtmPSExO2JyZWFrfWlmKGYpe2c9ZC5rZXlCaW5kc1tiXTticmVha319ZyYmKGcuY2FsbChsLG8pLGEuc3RvcFByb3BhZ2F0aW9uKCksYS5wcmV2ZW50RGVmYXVsdCgpKX0saWE9ZnVuY3Rpb24oYSl7d1thLndoaWNoXT1cInJcIixhLnN0b3BQcm9wYWdhdGlvbigpLGEucHJldmVudERlZmF1bHQoKX0samE9ZnVuY3Rpb24oYil7dmFyIGM9YShiLnRhcmdldCkudmFsKCkudHJpbSgpLGQ9Yz9nYShjKTpudWxsO3JldHVybiBfKGQpLGIuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCksITF9LGthPWZ1bmN0aW9uKCl7Zy5vbih7Y2hhbmdlOmphLGJsdXI6ZC5kZWJ1Zz9cIlwiOmFhLGtleWRvd246aGEsa2V5dXA6aWEsZm9jdXM6ZC5hbGxvd0lucHV0VG9nZ2xlP2VhOlwiXCJ9KSxjLmlzKFwiaW5wdXRcIik/Zy5vbih7Zm9jdXM6ZWF9KTpuJiYobi5vbihcImNsaWNrXCIsZmEpLG4ub24oXCJtb3VzZWRvd25cIiwhMSkpfSxsYT1mdW5jdGlvbigpe2cub2ZmKHtjaGFuZ2U6amEsYmx1cjpibHVyLGtleWRvd246aGEsa2V5dXA6aWEsZm9jdXM6ZC5hbGxvd0lucHV0VG9nZ2xlP2FhOlwiXCJ9KSxjLmlzKFwiaW5wdXRcIik/Zy5vZmYoe2ZvY3VzOmVhfSk6biYmKG4ub2ZmKFwiY2xpY2tcIixmYSksbi5vZmYoXCJtb3VzZWRvd25cIiwhMSkpfSxtYT1mdW5jdGlvbihiKXt2YXIgYz17fTtyZXR1cm4gYS5lYWNoKGIsZnVuY3Rpb24oKXt2YXIgYT1nYSh0aGlzKTthLmlzVmFsaWQoKSYmKGNbYS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpXT0hMCl9KSxPYmplY3Qua2V5cyhjKS5sZW5ndGg/YzohMX0sbmE9ZnVuY3Rpb24oYil7dmFyIGM9e307cmV0dXJuIGEuZWFjaChiLGZ1bmN0aW9uKCl7Y1t0aGlzXT0hMH0pLE9iamVjdC5rZXlzKGMpLmxlbmd0aD9jOiExfSxvYT1mdW5jdGlvbigpe3ZhciBhPWQuZm9ybWF0fHxcIkwgTFRcIjtpPWEucmVwbGFjZSgvKFxcW1teXFxbXSpcXF0pfChcXFxcKT8oTFRTfExUfExMP0w/TD98bHsxLDR9KS9nLGZ1bmN0aW9uKGEpe3ZhciBiPWUubG9jYWxlRGF0YSgpLmxvbmdEYXRlRm9ybWF0KGEpfHxhO3JldHVybiBiLnJlcGxhY2UoLyhcXFtbXlxcW10qXFxdKXwoXFxcXCk/KExUU3xMVHxMTD9MP0w/fGx7MSw0fSkvZyxmdW5jdGlvbihhKXtyZXR1cm4gZS5sb2NhbGVEYXRhKCkubG9uZ0RhdGVGb3JtYXQoYSl8fGF9KX0pLGo9ZC5leHRyYUZvcm1hdHM/ZC5leHRyYUZvcm1hdHMuc2xpY2UoKTpbXSxqLmluZGV4T2YoYSk8MCYmai5pbmRleE9mKGkpPDAmJmoucHVzaChpKSxoPWkudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiYVwiKTwxJiZpLnJlcGxhY2UoL1xcWy4qP1xcXS9nLFwiXCIpLmluZGV4T2YoXCJoXCIpPDEseShcInlcIikmJihwPTIpLHkoXCJNXCIpJiYocD0xKSx5KFwiZFwiKSYmKHA9MCksaz1NYXRoLm1heChwLGspLG18fF8oZSl9O2lmKGwuZGVzdHJveT1mdW5jdGlvbigpe2FhKCksbGEoKSxjLnJlbW92ZURhdGEoXCJEYXRlVGltZVBpY2tlclwiKSxjLnJlbW92ZURhdGEoXCJkYXRlXCIpfSxsLnRvZ2dsZT1mYSxsLnNob3c9ZWEsbC5oaWRlPWFhLGwuZGlzYWJsZT1mdW5jdGlvbigpe3JldHVybiBhYSgpLG4mJm4uaGFzQ2xhc3MoXCJidG5cIikmJm4uYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKSxnLnByb3AoXCJkaXNhYmxlZFwiLCEwKSxsfSxsLmVuYWJsZT1mdW5jdGlvbigpe3JldHVybiBuJiZuLmhhc0NsYXNzKFwiYnRuXCIpJiZuLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIiksZy5wcm9wKFwiZGlzYWJsZWRcIiwhMSksbH0sbC5pZ25vcmVSZWFkb25seT1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5pZ25vcmVSZWFkb25seTtpZihcImJvb2xlYW5cIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcImlnbm9yZVJlYWRvbmx5ICgpIGV4cGVjdHMgYSBib29sZWFuIHBhcmFtZXRlclwiKTtyZXR1cm4gZC5pZ25vcmVSZWFkb25seT1hLGx9LGwub3B0aW9ucz1mdW5jdGlvbihiKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gYS5leHRlbmQoITAse30sZCk7aWYoIShiIGluc3RhbmNlb2YgT2JqZWN0KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucygpIG9wdGlvbnMgcGFyYW1ldGVyIHNob3VsZCBiZSBhbiBvYmplY3RcIik7cmV0dXJuIGEuZXh0ZW5kKCEwLGQsYiksYS5lYWNoKGQsZnVuY3Rpb24oYSxiKXtpZih2b2lkIDA9PT1sW2FdKXRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb24gXCIrYStcIiBpcyBub3QgcmVjb2duaXplZCFcIik7bFthXShiKX0pLGx9LGwuZGF0ZT1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gbT9udWxsOmUuY2xvbmUoKTtpZighKG51bGw9PT1hfHxcInN0cmluZ1wiPT10eXBlb2YgYXx8Yi5pc01vbWVudChhKXx8YSBpbnN0YW5jZW9mIERhdGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJkYXRlKCkgcGFyYW1ldGVyIG11c3QgYmUgb25lIG9mIFtudWxsLCBzdHJpbmcsIG1vbWVudCBvciBEYXRlXVwiKTtyZXR1cm4gXyhudWxsPT09YT9udWxsOmdhKGEpKSxsfSxsLmZvcm1hdD1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5mb3JtYXQ7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGEmJihcImJvb2xlYW5cIiE9dHlwZW9mIGF8fGEhPT0hMSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcImZvcm1hdCgpIGV4cGVjdHMgYSBzdGluZyBvciBib29sZWFuOmZhbHNlIHBhcmFtZXRlciBcIithKTtyZXR1cm4gZC5mb3JtYXQ9YSxpJiZvYSgpLGx9LGwudGltZVpvbmU9ZnVuY3Rpb24oYSl7cmV0dXJuIDA9PT1hcmd1bWVudHMubGVuZ3RoP2QudGltZVpvbmU6KGQudGltZVpvbmU9YSxsKX0sbC5kYXlWaWV3SGVhZGVyRm9ybWF0PWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmRheVZpZXdIZWFkZXJGb3JtYXQ7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcImRheVZpZXdIZWFkZXJGb3JtYXQoKSBleHBlY3RzIGEgc3RyaW5nIHBhcmFtZXRlclwiKTtyZXR1cm4gZC5kYXlWaWV3SGVhZGVyRm9ybWF0PWEsbH0sbC5leHRyYUZvcm1hdHM9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuZXh0cmFGb3JtYXRzO2lmKGEhPT0hMSYmIShhIGluc3RhbmNlb2YgQXJyYXkpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJleHRyYUZvcm1hdHMoKSBleHBlY3RzIGFuIGFycmF5IG9yIGZhbHNlIHBhcmFtZXRlclwiKTtyZXR1cm4gZC5leHRyYUZvcm1hdHM9YSxqJiZvYSgpLGx9LGwuZGlzYWJsZWREYXRlcz1mdW5jdGlvbihiKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5kaXNhYmxlZERhdGVzP2EuZXh0ZW5kKHt9LGQuZGlzYWJsZWREYXRlcyk6ZC5kaXNhYmxlZERhdGVzO2lmKCFiKXJldHVybiBkLmRpc2FibGVkRGF0ZXM9ITEsJCgpLGw7aWYoIShiIGluc3RhbmNlb2YgQXJyYXkpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJkaXNhYmxlZERhdGVzKCkgZXhwZWN0cyBhbiBhcnJheSBwYXJhbWV0ZXJcIik7cmV0dXJuIGQuZGlzYWJsZWREYXRlcz1tYShiKSxkLmVuYWJsZWREYXRlcz0hMSwkKCksbH0sbC5lbmFibGVkRGF0ZXM9ZnVuY3Rpb24oYil7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuZW5hYmxlZERhdGVzP2EuZXh0ZW5kKHt9LGQuZW5hYmxlZERhdGVzKTpkLmVuYWJsZWREYXRlcztpZighYilyZXR1cm4gZC5lbmFibGVkRGF0ZXM9ITEsJCgpLGw7aWYoIShiIGluc3RhbmNlb2YgQXJyYXkpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJlbmFibGVkRGF0ZXMoKSBleHBlY3RzIGFuIGFycmF5IHBhcmFtZXRlclwiKTtyZXR1cm4gZC5lbmFibGVkRGF0ZXM9bWEoYiksZC5kaXNhYmxlZERhdGVzPSExLCQoKSxsfSxsLmRheXNPZldlZWtEaXNhYmxlZD1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5kYXlzT2ZXZWVrRGlzYWJsZWQuc3BsaWNlKDApO2lmKFwiYm9vbGVhblwiPT10eXBlb2YgYSYmIWEpcmV0dXJuIGQuZGF5c09mV2Vla0Rpc2FibGVkPSExLCQoKSxsO2lmKCEoYSBpbnN0YW5jZW9mIEFycmF5KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZGF5c09mV2Vla0Rpc2FibGVkKCkgZXhwZWN0cyBhbiBhcnJheSBwYXJhbWV0ZXJcIik7aWYoZC5kYXlzT2ZXZWVrRGlzYWJsZWQ9YS5yZWR1Y2UoZnVuY3Rpb24oYSxiKXtyZXR1cm4gYj1wYXJzZUludChiLDEwKSxiPjZ8fDA+Ynx8aXNOYU4oYik/YTooLTE9PT1hLmluZGV4T2YoYikmJmEucHVzaChiKSxhKX0sW10pLnNvcnQoKSxkLnVzZUN1cnJlbnQmJiFkLmtlZXBJbnZhbGlkKXtmb3IodmFyIGI9MDshUShlLFwiZFwiKTspe2lmKGUuYWRkKDEsXCJkXCIpLDc9PT1iKXRocm93XCJUcmllZCA3IHRpbWVzIHRvIGZpbmQgYSB2YWxpZCBkYXRlXCI7YisrfV8oZSl9cmV0dXJuICQoKSxsfSxsLm1heERhdGU9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQubWF4RGF0ZT9kLm1heERhdGUuY2xvbmUoKTpkLm1heERhdGU7aWYoXCJib29sZWFuXCI9PXR5cGVvZiBhJiZhPT09ITEpcmV0dXJuIGQubWF4RGF0ZT0hMSwkKCksbDtcInN0cmluZ1wiPT10eXBlb2YgYSYmKFwibm93XCI9PT1hfHxcIm1vbWVudFwiPT09YSkmJihhPXgoKSk7dmFyIGI9Z2EoYSk7aWYoIWIuaXNWYWxpZCgpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJtYXhEYXRlKCkgQ291bGQgbm90IHBhcnNlIGRhdGUgcGFyYW1ldGVyOiBcIithKTtpZihkLm1pbkRhdGUmJmIuaXNCZWZvcmUoZC5taW5EYXRlKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwibWF4RGF0ZSgpIGRhdGUgcGFyYW1ldGVyIGlzIGJlZm9yZSBvcHRpb25zLm1pbkRhdGU6IFwiK2IuZm9ybWF0KGkpKTtyZXR1cm4gZC5tYXhEYXRlPWIsZC51c2VDdXJyZW50JiYhZC5rZWVwSW52YWxpZCYmZS5pc0FmdGVyKGEpJiZfKGQubWF4RGF0ZSksZi5pc0FmdGVyKGIpJiYoZj1iLmNsb25lKCkuc3VidHJhY3QoZC5zdGVwcGluZyxcIm1cIikpLCQoKSxsfSxsLm1pbkRhdGU9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQubWluRGF0ZT9kLm1pbkRhdGUuY2xvbmUoKTpkLm1pbkRhdGU7aWYoXCJib29sZWFuXCI9PXR5cGVvZiBhJiZhPT09ITEpcmV0dXJuIGQubWluRGF0ZT0hMSwkKCksbDtcInN0cmluZ1wiPT10eXBlb2YgYSYmKFwibm93XCI9PT1hfHxcIm1vbWVudFwiPT09YSkmJihhPXgoKSk7dmFyIGI9Z2EoYSk7aWYoIWIuaXNWYWxpZCgpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJtaW5EYXRlKCkgQ291bGQgbm90IHBhcnNlIGRhdGUgcGFyYW1ldGVyOiBcIithKTtpZihkLm1heERhdGUmJmIuaXNBZnRlcihkLm1heERhdGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJtaW5EYXRlKCkgZGF0ZSBwYXJhbWV0ZXIgaXMgYWZ0ZXIgb3B0aW9ucy5tYXhEYXRlOiBcIitiLmZvcm1hdChpKSk7cmV0dXJuIGQubWluRGF0ZT1iLGQudXNlQ3VycmVudCYmIWQua2VlcEludmFsaWQmJmUuaXNCZWZvcmUoYSkmJl8oZC5taW5EYXRlKSxmLmlzQmVmb3JlKGIpJiYoZj1iLmNsb25lKCkuYWRkKGQuc3RlcHBpbmcsXCJtXCIpKSwkKCksbH0sbC5kZWZhdWx0RGF0ZT1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5kZWZhdWx0RGF0ZT9kLmRlZmF1bHREYXRlLmNsb25lKCk6ZC5kZWZhdWx0RGF0ZTtpZighYSlyZXR1cm4gZC5kZWZhdWx0RGF0ZT0hMSxsO1wic3RyaW5nXCI9PXR5cGVvZiBhJiYoXCJub3dcIj09PWF8fFwibW9tZW50XCI9PT1hKSYmKGE9eCgpKTt2YXIgYj1nYShhKTtpZighYi5pc1ZhbGlkKCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcImRlZmF1bHREYXRlKCkgQ291bGQgbm90IHBhcnNlIGRhdGUgcGFyYW1ldGVyOiBcIithKTtpZighUShiKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZGVmYXVsdERhdGUoKSBkYXRlIHBhc3NlZCBpcyBpbnZhbGlkIGFjY29yZGluZyB0byBjb21wb25lbnQgc2V0dXAgdmFsaWRhdGlvbnNcIik7cmV0dXJuIGQuZGVmYXVsdERhdGU9YiwoZC5kZWZhdWx0RGF0ZSYmZC5pbmxpbmV8fFwiXCI9PT1nLnZhbCgpLnRyaW0oKSkmJl8oZC5kZWZhdWx0RGF0ZSksbH0sbC5sb2NhbGU9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQubG9jYWxlO2lmKCFiLmxvY2FsZURhdGEoYSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcImxvY2FsZSgpIGxvY2FsZSBcIithK1wiIGlzIG5vdCBsb2FkZWQgZnJvbSBtb21lbnQgbG9jYWxlcyFcIik7cmV0dXJuIGQubG9jYWxlPWEsZS5sb2NhbGUoZC5sb2NhbGUpLGYubG9jYWxlKGQubG9jYWxlKSxpJiZvYSgpLG8mJihhYSgpLGVhKCkpLGx9LGwuc3RlcHBpbmc9ZnVuY3Rpb24oYSl7cmV0dXJuIDA9PT1hcmd1bWVudHMubGVuZ3RoP2Quc3RlcHBpbmc6KGE9cGFyc2VJbnQoYSwxMCksKGlzTmFOKGEpfHwxPmEpJiYoYT0xKSxkLnN0ZXBwaW5nPWEsbCl9LGwudXNlQ3VycmVudD1mdW5jdGlvbihhKXt2YXIgYj1bXCJ5ZWFyXCIsXCJtb250aFwiLFwiZGF5XCIsXCJob3VyXCIsXCJtaW51dGVcIl07aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQudXNlQ3VycmVudDtpZihcImJvb2xlYW5cIiE9dHlwZW9mIGEmJlwic3RyaW5nXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJ1c2VDdXJyZW50KCkgZXhwZWN0cyBhIGJvb2xlYW4gb3Igc3RyaW5nIHBhcmFtZXRlclwiKTtpZihcInN0cmluZ1wiPT10eXBlb2YgYSYmLTE9PT1iLmluZGV4T2YoYS50b0xvd2VyQ2FzZSgpKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwidXNlQ3VycmVudCgpIGV4cGVjdHMgYSBzdHJpbmcgcGFyYW1ldGVyIG9mIFwiK2Iuam9pbihcIiwgXCIpKTtyZXR1cm4gZC51c2VDdXJyZW50PWEsbH0sbC5jb2xsYXBzZT1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5jb2xsYXBzZTtpZihcImJvb2xlYW5cIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcImNvbGxhcHNlKCkgZXhwZWN0cyBhIGJvb2xlYW4gcGFyYW1ldGVyXCIpO3JldHVybiBkLmNvbGxhcHNlPT09YT9sOihkLmNvbGxhcHNlPWEsbyYmKGFhKCksZWEoKSksbCl9LGwuaWNvbnM9ZnVuY3Rpb24oYil7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGEuZXh0ZW5kKHt9LGQuaWNvbnMpO2lmKCEoYiBpbnN0YW5jZW9mIE9iamVjdCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcImljb25zKCkgZXhwZWN0cyBwYXJhbWV0ZXIgdG8gYmUgYW4gT2JqZWN0XCIpO3JldHVybiBhLmV4dGVuZChkLmljb25zLGIpLG8mJihhYSgpLGVhKCkpLGx9LGwudG9vbHRpcHM9ZnVuY3Rpb24oYil7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGEuZXh0ZW5kKHt9LGQudG9vbHRpcHMpO2lmKCEoYiBpbnN0YW5jZW9mIE9iamVjdCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcInRvb2x0aXBzKCkgZXhwZWN0cyBwYXJhbWV0ZXIgdG8gYmUgYW4gT2JqZWN0XCIpO3JldHVybiBhLmV4dGVuZChkLnRvb2x0aXBzLGIpLG8mJihhYSgpLGVhKCkpLGx9LGwudXNlU3RyaWN0PWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLnVzZVN0cmljdDtpZihcImJvb2xlYW5cIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcInVzZVN0cmljdCgpIGV4cGVjdHMgYSBib29sZWFuIHBhcmFtZXRlclwiKTtyZXR1cm4gZC51c2VTdHJpY3Q9YSxsfSxsLnNpZGVCeVNpZGU9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuc2lkZUJ5U2lkZTtpZihcImJvb2xlYW5cIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcInNpZGVCeVNpZGUoKSBleHBlY3RzIGEgYm9vbGVhbiBwYXJhbWV0ZXJcIik7cmV0dXJuIGQuc2lkZUJ5U2lkZT1hLG8mJihhYSgpLGVhKCkpLGx9LGwudmlld01vZGU9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQudmlld01vZGU7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcInZpZXdNb2RlKCkgZXhwZWN0cyBhIHN0cmluZyBwYXJhbWV0ZXJcIik7aWYoLTE9PT1yLmluZGV4T2YoYSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcInZpZXdNb2RlKCkgcGFyYW1ldGVyIG11c3QgYmUgb25lIG9mIChcIityLmpvaW4oXCIsIFwiKStcIikgdmFsdWVcIik7cmV0dXJuIGQudmlld01vZGU9YSxrPU1hdGgubWF4KHIuaW5kZXhPZihhKSxwKSxLKCksbH0sbC50b29sYmFyUGxhY2VtZW50PWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLnRvb2xiYXJQbGFjZW1lbnQ7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcInRvb2xiYXJQbGFjZW1lbnQoKSBleHBlY3RzIGEgc3RyaW5nIHBhcmFtZXRlclwiKTtpZigtMT09PXUuaW5kZXhPZihhKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwidG9vbGJhclBsYWNlbWVudCgpIHBhcmFtZXRlciBtdXN0IGJlIG9uZSBvZiAoXCIrdS5qb2luKFwiLCBcIikrXCIpIHZhbHVlXCIpO3JldHVybiBkLnRvb2xiYXJQbGFjZW1lbnQ9YSxvJiYoYWEoKSxlYSgpKSxsfSxsLndpZGdldFBvc2l0aW9uaW5nPWZ1bmN0aW9uKGIpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBhLmV4dGVuZCh7fSxkLndpZGdldFBvc2l0aW9uaW5nKTtpZihcIltvYmplY3QgT2JqZWN0XVwiIT09e30udG9TdHJpbmcuY2FsbChiKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwid2lkZ2V0UG9zaXRpb25pbmcoKSBleHBlY3RzIGFuIG9iamVjdCB2YXJpYWJsZVwiKTtpZihiLmhvcml6b250YWwpe2lmKFwic3RyaW5nXCIhPXR5cGVvZiBiLmhvcml6b250YWwpdGhyb3cgbmV3IFR5cGVFcnJvcihcIndpZGdldFBvc2l0aW9uaW5nKCkgaG9yaXpvbnRhbCB2YXJpYWJsZSBtdXN0IGJlIGEgc3RyaW5nXCIpO2lmKGIuaG9yaXpvbnRhbD1iLmhvcml6b250YWwudG9Mb3dlckNhc2UoKSwtMT09PXQuaW5kZXhPZihiLmhvcml6b250YWwpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJ3aWRnZXRQb3NpdGlvbmluZygpIGV4cGVjdHMgaG9yaXpvbnRhbCBwYXJhbWV0ZXIgdG8gYmUgb25lIG9mIChcIit0LmpvaW4oXCIsIFwiKStcIilcIik7ZC53aWRnZXRQb3NpdGlvbmluZy5ob3Jpem9udGFsPWIuaG9yaXpvbnRhbH1pZihiLnZlcnRpY2FsKXtpZihcInN0cmluZ1wiIT10eXBlb2YgYi52ZXJ0aWNhbCl0aHJvdyBuZXcgVHlwZUVycm9yKFwid2lkZ2V0UG9zaXRpb25pbmcoKSB2ZXJ0aWNhbCB2YXJpYWJsZSBtdXN0IGJlIGEgc3RyaW5nXCIpO2lmKGIudmVydGljYWw9Yi52ZXJ0aWNhbC50b0xvd2VyQ2FzZSgpLC0xPT09cy5pbmRleE9mKGIudmVydGljYWwpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJ3aWRnZXRQb3NpdGlvbmluZygpIGV4cGVjdHMgdmVydGljYWwgcGFyYW1ldGVyIHRvIGJlIG9uZSBvZiAoXCIrcy5qb2luKFwiLCBcIikrXCIpXCIpO2Qud2lkZ2V0UG9zaXRpb25pbmcudmVydGljYWw9Yi52ZXJ0aWNhbH1yZXR1cm4gJCgpLGx9LGwuY2FsZW5kYXJXZWVrcz1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5jYWxlbmRhcldlZWtzO2lmKFwiYm9vbGVhblwiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiY2FsZW5kYXJXZWVrcygpIGV4cGVjdHMgcGFyYW1ldGVyIHRvIGJlIGEgYm9vbGVhbiB2YWx1ZVwiKTtyZXR1cm4gZC5jYWxlbmRhcldlZWtzPWEsJCgpLGx9LGwuc2hvd1RvZGF5QnV0dG9uPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLnNob3dUb2RheUJ1dHRvbjtpZihcImJvb2xlYW5cIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcInNob3dUb2RheUJ1dHRvbigpIGV4cGVjdHMgYSBib29sZWFuIHBhcmFtZXRlclwiKTtyZXR1cm4gZC5zaG93VG9kYXlCdXR0b249YSxvJiYoYWEoKSxlYSgpKSxsfSxsLnNob3dDbGVhcj1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5zaG93Q2xlYXI7aWYoXCJib29sZWFuXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJzaG93Q2xlYXIoKSBleHBlY3RzIGEgYm9vbGVhbiBwYXJhbWV0ZXJcIik7cmV0dXJuIGQuc2hvd0NsZWFyPWEsbyYmKGFhKCksZWEoKSksbH0sbC53aWRnZXRQYXJlbnQ9ZnVuY3Rpb24oYil7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQud2lkZ2V0UGFyZW50O2lmKFwic3RyaW5nXCI9PXR5cGVvZiBiJiYoYj1hKGIpKSxudWxsIT09YiYmXCJzdHJpbmdcIiE9dHlwZW9mIGImJiEoYiBpbnN0YW5jZW9mIGEpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJ3aWRnZXRQYXJlbnQoKSBleHBlY3RzIGEgc3RyaW5nIG9yIGEgalF1ZXJ5IG9iamVjdCBwYXJhbWV0ZXJcIik7cmV0dXJuIGQud2lkZ2V0UGFyZW50PWIsbyYmKGFhKCksZWEoKSksbH0sbC5rZWVwT3Blbj1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5rZWVwT3BlbjtpZihcImJvb2xlYW5cIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcImtlZXBPcGVuKCkgZXhwZWN0cyBhIGJvb2xlYW4gcGFyYW1ldGVyXCIpO3JldHVybiBkLmtlZXBPcGVuPWEsbH0sbC5mb2N1c09uU2hvdz1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5mb2N1c09uU2hvdztpZihcImJvb2xlYW5cIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcImZvY3VzT25TaG93KCkgZXhwZWN0cyBhIGJvb2xlYW4gcGFyYW1ldGVyXCIpO3JldHVybiBkLmZvY3VzT25TaG93PWEsbH0sbC5pbmxpbmU9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuaW5saW5lO2lmKFwiYm9vbGVhblwiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiaW5saW5lKCkgZXhwZWN0cyBhIGJvb2xlYW4gcGFyYW1ldGVyXCIpO3JldHVybiBkLmlubGluZT1hLGx9LGwuY2xlYXI9ZnVuY3Rpb24oKXtyZXR1cm4gYmEoKSxsfSxsLmtleUJpbmRzPWZ1bmN0aW9uKGEpe3JldHVybiBkLmtleUJpbmRzPWEsbH0sbC5nZXRNb21lbnQ9ZnVuY3Rpb24oYSl7cmV0dXJuIHgoYSl9LGwuZGVidWc9ZnVuY3Rpb24oYSl7aWYoXCJib29sZWFuXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJkZWJ1ZygpIGV4cGVjdHMgYSBib29sZWFuIHBhcmFtZXRlclwiKTtyZXR1cm4gZC5kZWJ1Zz1hLGx9LGwuYWxsb3dJbnB1dFRvZ2dsZT1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5hbGxvd0lucHV0VG9nZ2xlO2lmKFwiYm9vbGVhblwiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiYWxsb3dJbnB1dFRvZ2dsZSgpIGV4cGVjdHMgYSBib29sZWFuIHBhcmFtZXRlclwiKTtyZXR1cm4gZC5hbGxvd0lucHV0VG9nZ2xlPWEsbH0sbC5zaG93Q2xvc2U9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuc2hvd0Nsb3NlO2lmKFwiYm9vbGVhblwiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwic2hvd0Nsb3NlKCkgZXhwZWN0cyBhIGJvb2xlYW4gcGFyYW1ldGVyXCIpO3JldHVybiBkLnNob3dDbG9zZT1hLGx9LGwua2VlcEludmFsaWQ9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQua2VlcEludmFsaWQ7aWYoXCJib29sZWFuXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJrZWVwSW52YWxpZCgpIGV4cGVjdHMgYSBib29sZWFuIHBhcmFtZXRlclwiKTtyZXR1cm4gZC5rZWVwSW52YWxpZD1hLGx9LGwuZGF0ZXBpY2tlcklucHV0PWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmRhdGVwaWNrZXJJbnB1dDtpZihcInN0cmluZ1wiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZGF0ZXBpY2tlcklucHV0KCkgZXhwZWN0cyBhIHN0cmluZyBwYXJhbWV0ZXJcIik7cmV0dXJuIGQuZGF0ZXBpY2tlcklucHV0PWEsbH0sbC5wYXJzZUlucHV0RGF0ZT1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5wYXJzZUlucHV0RGF0ZTtcclxuaWYoXCJmdW5jdGlvblwiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwicGFyc2VJbnB1dERhdGUoKSBzaG9sdWQgYmUgYXMgZnVuY3Rpb25cIik7cmV0dXJuIGQucGFyc2VJbnB1dERhdGU9YSxsfSxsLmRpc2FibGVkVGltZUludGVydmFscz1mdW5jdGlvbihiKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5kaXNhYmxlZFRpbWVJbnRlcnZhbHM/YS5leHRlbmQoe30sZC5kaXNhYmxlZFRpbWVJbnRlcnZhbHMpOmQuZGlzYWJsZWRUaW1lSW50ZXJ2YWxzO2lmKCFiKXJldHVybiBkLmRpc2FibGVkVGltZUludGVydmFscz0hMSwkKCksbDtpZighKGIgaW5zdGFuY2VvZiBBcnJheSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcImRpc2FibGVkVGltZUludGVydmFscygpIGV4cGVjdHMgYW4gYXJyYXkgcGFyYW1ldGVyXCIpO3JldHVybiBkLmRpc2FibGVkVGltZUludGVydmFscz1iLCQoKSxsfSxsLmRpc2FibGVkSG91cnM9ZnVuY3Rpb24oYil7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuZGlzYWJsZWRIb3Vycz9hLmV4dGVuZCh7fSxkLmRpc2FibGVkSG91cnMpOmQuZGlzYWJsZWRIb3VycztpZighYilyZXR1cm4gZC5kaXNhYmxlZEhvdXJzPSExLCQoKSxsO2lmKCEoYiBpbnN0YW5jZW9mIEFycmF5KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZGlzYWJsZWRIb3VycygpIGV4cGVjdHMgYW4gYXJyYXkgcGFyYW1ldGVyXCIpO2lmKGQuZGlzYWJsZWRIb3Vycz1uYShiKSxkLmVuYWJsZWRIb3Vycz0hMSxkLnVzZUN1cnJlbnQmJiFkLmtlZXBJbnZhbGlkKXtmb3IodmFyIGM9MDshUShlLFwiaFwiKTspe2lmKGUuYWRkKDEsXCJoXCIpLDI0PT09Yyl0aHJvd1wiVHJpZWQgMjQgdGltZXMgdG8gZmluZCBhIHZhbGlkIGRhdGVcIjtjKyt9XyhlKX1yZXR1cm4gJCgpLGx9LGwuZW5hYmxlZEhvdXJzPWZ1bmN0aW9uKGIpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmVuYWJsZWRIb3Vycz9hLmV4dGVuZCh7fSxkLmVuYWJsZWRIb3Vycyk6ZC5lbmFibGVkSG91cnM7aWYoIWIpcmV0dXJuIGQuZW5hYmxlZEhvdXJzPSExLCQoKSxsO2lmKCEoYiBpbnN0YW5jZW9mIEFycmF5KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZW5hYmxlZEhvdXJzKCkgZXhwZWN0cyBhbiBhcnJheSBwYXJhbWV0ZXJcIik7aWYoZC5lbmFibGVkSG91cnM9bmEoYiksZC5kaXNhYmxlZEhvdXJzPSExLGQudXNlQ3VycmVudCYmIWQua2VlcEludmFsaWQpe2Zvcih2YXIgYz0wOyFRKGUsXCJoXCIpOyl7aWYoZS5hZGQoMSxcImhcIiksMjQ9PT1jKXRocm93XCJUcmllZCAyNCB0aW1lcyB0byBmaW5kIGEgdmFsaWQgZGF0ZVwiO2MrK31fKGUpfXJldHVybiAkKCksbH0sbC52aWV3RGF0ZT1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZi5jbG9uZSgpO2lmKCFhKXJldHVybiBmPWUuY2xvbmUoKSxsO2lmKCEoXCJzdHJpbmdcIj09dHlwZW9mIGF8fGIuaXNNb21lbnQoYSl8fGEgaW5zdGFuY2VvZiBEYXRlKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwidmlld0RhdGUoKSBwYXJhbWV0ZXIgbXVzdCBiZSBvbmUgb2YgW3N0cmluZywgbW9tZW50IG9yIERhdGVdXCIpO3JldHVybiBmPWdhKGEpLEooKSxsfSxjLmlzKFwiaW5wdXRcIikpZz1jO2Vsc2UgaWYoZz1jLmZpbmQoZC5kYXRlcGlja2VySW5wdXQpLDA9PT1nLnNpemUoKSlnPWMuZmluZChcImlucHV0XCIpO2Vsc2UgaWYoIWcuaXMoXCJpbnB1dFwiKSl0aHJvdyBuZXcgRXJyb3IoJ0NTUyBjbGFzcyBcIicrZC5kYXRlcGlja2VySW5wdXQrJ1wiIGNhbm5vdCBiZSBhcHBsaWVkIHRvIG5vbiBpbnB1dCBlbGVtZW50Jyk7aWYoYy5oYXNDbGFzcyhcImlucHV0LWdyb3VwXCIpJiYobj0wPT09Yy5maW5kKFwiLmRhdGVwaWNrZXJidXR0b25cIikuc2l6ZSgpP2MuZmluZChcIi5pbnB1dC1ncm91cC1hZGRvblwiKTpjLmZpbmQoXCIuZGF0ZXBpY2tlcmJ1dHRvblwiKSksIWQuaW5saW5lJiYhZy5pcyhcImlucHV0XCIpKXRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBpbml0aWFsaXplIERhdGVUaW1lUGlja2VyIHdpdGhvdXQgYW4gaW5wdXQgZWxlbWVudFwiKTtyZXR1cm4gZT14KCksZj1lLmNsb25lKCksYS5leHRlbmQoITAsZCxHKCkpLGwub3B0aW9ucyhkKSxvYSgpLGthKCksZy5wcm9wKFwiZGlzYWJsZWRcIikmJmwuZGlzYWJsZSgpLGcuaXMoXCJpbnB1dFwiKSYmMCE9PWcudmFsKCkudHJpbSgpLmxlbmd0aD9fKGdhKGcudmFsKCkudHJpbSgpKSk6ZC5kZWZhdWx0RGF0ZSYmdm9pZCAwPT09Zy5hdHRyKFwicGxhY2Vob2xkZXJcIikmJl8oZC5kZWZhdWx0RGF0ZSksZC5pbmxpbmUmJmVhKCksbH07YS5mbi5kYXRldGltZXBpY2tlcj1mdW5jdGlvbihiKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGQ9YSh0aGlzKTtkLmRhdGEoXCJEYXRlVGltZVBpY2tlclwiKXx8KGI9YS5leHRlbmQoITAse30sYS5mbi5kYXRldGltZXBpY2tlci5kZWZhdWx0cyxiKSxkLmRhdGEoXCJEYXRlVGltZVBpY2tlclwiLGMoZCxiKSkpfSl9LGEuZm4uZGF0ZXRpbWVwaWNrZXIuZGVmYXVsdHM9e3RpbWVab25lOlwiRXRjL1VUQ1wiLGZvcm1hdDohMSxkYXlWaWV3SGVhZGVyRm9ybWF0OlwiTU1NTSBZWVlZXCIsZXh0cmFGb3JtYXRzOiExLHN0ZXBwaW5nOjEsbWluRGF0ZTohMSxtYXhEYXRlOiExLHVzZUN1cnJlbnQ6ITAsY29sbGFwc2U6ITAsbG9jYWxlOmIubG9jYWxlKCksZGVmYXVsdERhdGU6ITEsZGlzYWJsZWREYXRlczohMSxlbmFibGVkRGF0ZXM6ITEsaWNvbnM6e3RpbWU6XCJnbHlwaGljb24gZ2x5cGhpY29uLXRpbWVcIixkYXRlOlwiZ2x5cGhpY29uIGdseXBoaWNvbi1jYWxlbmRhclwiLHVwOlwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLXVwXCIsZG93bjpcImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1kb3duXCIscHJldmlvdXM6XCJnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tbGVmdFwiLG5leHQ6XCJnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tcmlnaHRcIix0b2RheTpcImdseXBoaWNvbiBnbHlwaGljb24tc2NyZWVuc2hvdFwiLGNsZWFyOlwiZ2x5cGhpY29uIGdseXBoaWNvbi10cmFzaFwiLGNsb3NlOlwiZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmVcIn0sdG9vbHRpcHM6e3RvZGF5OlwiR28gdG8gdG9kYXlcIixjbGVhcjpcIkNsZWFyIHNlbGVjdGlvblwiLGNsb3NlOlwiQ2xvc2UgdGhlIHBpY2tlclwiLHNlbGVjdE1vbnRoOlwiU2VsZWN0IE1vbnRoXCIscHJldk1vbnRoOlwiUHJldmlvdXMgTW9udGhcIixuZXh0TW9udGg6XCJOZXh0IE1vbnRoXCIsc2VsZWN0WWVhcjpcIlNlbGVjdCBZZWFyXCIscHJldlllYXI6XCJQcmV2aW91cyBZZWFyXCIsbmV4dFllYXI6XCJOZXh0IFllYXJcIixzZWxlY3REZWNhZGU6XCJTZWxlY3QgRGVjYWRlXCIscHJldkRlY2FkZTpcIlByZXZpb3VzIERlY2FkZVwiLG5leHREZWNhZGU6XCJOZXh0IERlY2FkZVwiLHByZXZDZW50dXJ5OlwiUHJldmlvdXMgQ2VudHVyeVwiLG5leHRDZW50dXJ5OlwiTmV4dCBDZW50dXJ5XCIscGlja0hvdXI6XCJQaWNrIEhvdXJcIixpbmNyZW1lbnRIb3VyOlwiSW5jcmVtZW50IEhvdXJcIixkZWNyZW1lbnRIb3VyOlwiRGVjcmVtZW50IEhvdXJcIixwaWNrTWludXRlOlwiUGljayBNaW51dGVcIixpbmNyZW1lbnRNaW51dGU6XCJJbmNyZW1lbnQgTWludXRlXCIsZGVjcmVtZW50TWludXRlOlwiRGVjcmVtZW50IE1pbnV0ZVwiLHBpY2tTZWNvbmQ6XCJQaWNrIFNlY29uZFwiLGluY3JlbWVudFNlY29uZDpcIkluY3JlbWVudCBTZWNvbmRcIixkZWNyZW1lbnRTZWNvbmQ6XCJEZWNyZW1lbnQgU2Vjb25kXCIsdG9nZ2xlUGVyaW9kOlwiVG9nZ2xlIFBlcmlvZFwiLHNlbGVjdFRpbWU6XCJTZWxlY3QgVGltZVwifSx1c2VTdHJpY3Q6ITEsc2lkZUJ5U2lkZTohMSxkYXlzT2ZXZWVrRGlzYWJsZWQ6ITEsY2FsZW5kYXJXZWVrczohMSx2aWV3TW9kZTpcImRheXNcIix0b29sYmFyUGxhY2VtZW50OlwiZGVmYXVsdFwiLHNob3dUb2RheUJ1dHRvbjohMSxzaG93Q2xlYXI6ITEsc2hvd0Nsb3NlOiExLHdpZGdldFBvc2l0aW9uaW5nOntob3Jpem9udGFsOlwiYXV0b1wiLHZlcnRpY2FsOlwiYXV0b1wifSx3aWRnZXRQYXJlbnQ6bnVsbCxpZ25vcmVSZWFkb25seTohMSxrZWVwT3BlbjohMSxmb2N1c09uU2hvdzohMCxpbmxpbmU6ITEsa2VlcEludmFsaWQ6ITEsZGF0ZXBpY2tlcklucHV0OlwiLmRhdGVwaWNrZXJpbnB1dFwiLGtleUJpbmRzOnt1cDpmdW5jdGlvbihhKXtpZihhKXt2YXIgYj10aGlzLmRhdGUoKXx8dGhpcy5nZXRNb21lbnQoKTthLmZpbmQoXCIuZGF0ZXBpY2tlclwiKS5pcyhcIjp2aXNpYmxlXCIpP3RoaXMuZGF0ZShiLmNsb25lKCkuc3VidHJhY3QoNyxcImRcIikpOnRoaXMuZGF0ZShiLmNsb25lKCkuYWRkKHRoaXMuc3RlcHBpbmcoKSxcIm1cIikpfX0sZG93bjpmdW5jdGlvbihhKXtpZighYSlyZXR1cm4gdm9pZCB0aGlzLnNob3coKTt2YXIgYj10aGlzLmRhdGUoKXx8dGhpcy5nZXRNb21lbnQoKTthLmZpbmQoXCIuZGF0ZXBpY2tlclwiKS5pcyhcIjp2aXNpYmxlXCIpP3RoaXMuZGF0ZShiLmNsb25lKCkuYWRkKDcsXCJkXCIpKTp0aGlzLmRhdGUoYi5jbG9uZSgpLnN1YnRyYWN0KHRoaXMuc3RlcHBpbmcoKSxcIm1cIikpfSxcImNvbnRyb2wgdXBcIjpmdW5jdGlvbihhKXtpZihhKXt2YXIgYj10aGlzLmRhdGUoKXx8dGhpcy5nZXRNb21lbnQoKTthLmZpbmQoXCIuZGF0ZXBpY2tlclwiKS5pcyhcIjp2aXNpYmxlXCIpP3RoaXMuZGF0ZShiLmNsb25lKCkuc3VidHJhY3QoMSxcInlcIikpOnRoaXMuZGF0ZShiLmNsb25lKCkuYWRkKDEsXCJoXCIpKX19LFwiY29udHJvbCBkb3duXCI6ZnVuY3Rpb24oYSl7aWYoYSl7dmFyIGI9dGhpcy5kYXRlKCl8fHRoaXMuZ2V0TW9tZW50KCk7YS5maW5kKFwiLmRhdGVwaWNrZXJcIikuaXMoXCI6dmlzaWJsZVwiKT90aGlzLmRhdGUoYi5jbG9uZSgpLmFkZCgxLFwieVwiKSk6dGhpcy5kYXRlKGIuY2xvbmUoKS5zdWJ0cmFjdCgxLFwiaFwiKSl9fSxsZWZ0OmZ1bmN0aW9uKGEpe2lmKGEpe3ZhciBiPXRoaXMuZGF0ZSgpfHx0aGlzLmdldE1vbWVudCgpO2EuZmluZChcIi5kYXRlcGlja2VyXCIpLmlzKFwiOnZpc2libGVcIikmJnRoaXMuZGF0ZShiLmNsb25lKCkuc3VidHJhY3QoMSxcImRcIikpfX0scmlnaHQ6ZnVuY3Rpb24oYSl7aWYoYSl7dmFyIGI9dGhpcy5kYXRlKCl8fHRoaXMuZ2V0TW9tZW50KCk7YS5maW5kKFwiLmRhdGVwaWNrZXJcIikuaXMoXCI6dmlzaWJsZVwiKSYmdGhpcy5kYXRlKGIuY2xvbmUoKS5hZGQoMSxcImRcIikpfX0scGFnZVVwOmZ1bmN0aW9uKGEpe2lmKGEpe3ZhciBiPXRoaXMuZGF0ZSgpfHx0aGlzLmdldE1vbWVudCgpO2EuZmluZChcIi5kYXRlcGlja2VyXCIpLmlzKFwiOnZpc2libGVcIikmJnRoaXMuZGF0ZShiLmNsb25lKCkuc3VidHJhY3QoMSxcIk1cIikpfX0scGFnZURvd246ZnVuY3Rpb24oYSl7aWYoYSl7dmFyIGI9dGhpcy5kYXRlKCl8fHRoaXMuZ2V0TW9tZW50KCk7YS5maW5kKFwiLmRhdGVwaWNrZXJcIikuaXMoXCI6dmlzaWJsZVwiKSYmdGhpcy5kYXRlKGIuY2xvbmUoKS5hZGQoMSxcIk1cIikpfX0sZW50ZXI6ZnVuY3Rpb24oKXt0aGlzLmhpZGUoKX0sZXNjYXBlOmZ1bmN0aW9uKCl7dGhpcy5oaWRlKCl9LFwiY29udHJvbCBzcGFjZVwiOmZ1bmN0aW9uKGEpe2EuZmluZChcIi50aW1lcGlja2VyXCIpLmlzKFwiOnZpc2libGVcIikmJmEuZmluZCgnLmJ0bltkYXRhLWFjdGlvbj1cInRvZ2dsZVBlcmlvZFwiXScpLmNsaWNrKCl9LHQ6ZnVuY3Rpb24oKXt0aGlzLmRhdGUodGhpcy5nZXRNb21lbnQoKSl9LFwiZGVsZXRlXCI6ZnVuY3Rpb24oKXt0aGlzLmNsZWFyKCl9fSxkZWJ1ZzohMSxhbGxvd0lucHV0VG9nZ2xlOiExLGRpc2FibGVkVGltZUludGVydmFsczohMSxkaXNhYmxlZEhvdXJzOiExLGVuYWJsZWRIb3VyczohMSx2aWV3RGF0ZTohMX19KTsiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAvL2RlZmluaW5nIHRoZSBoZWxwZXIgZnVuY3Rpb25zIGluIGdsb2JhbFxyXG5cclxuICAkKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ0RvY3RvciBEYXNoYm9hcmQganMgbG9hZGVkJyk7XHJcblxyXG4gICAgLy90b3AgbGV2ZWwgY29udHJvbGxlclxyXG4gICAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy93aXJpbmcgdGhlIG5hdmlnYXRpb25cclxuICAgICAgICB0aGlzLmxvZ291dFVybCA9IGxpbmtzLmxvZ291dFVybDtcclxuICAgICAgICB0aGlzLmRvY3RvclByb2ZpbGUgPSBsaW5rcy5kb2N0b3JQcm9maWxlO1xyXG4gICAgICAgIHRoaXMuZGFzaGJvYXJkSG9tZVVybCA9IGxpbmtzLmRhc2hib2FyZEhvbWVVcmw7XHJcbiAgICAgICAgdGhpcy5uZXdBcHBvaW50bWVudFVybCA9IGxpbmtzLm5ld0FwcG9pbnRtZW50VXJsO1xyXG4gICAgICAgIHRoaXMucGF0aWVudHNFbnRyeVVybCA9IGxpbmtzLnBhdGllbnRzRW50cnlVcmw7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50c0xpc3RpbmdVcmwgPSBsaW5rcy5wYXRpZW50c0xpc3RpbmdVcmw7XHJcbiAgICAgICAgdGhpcy5jbG9zZUFwcG9pbnRtZW50VXJsID0gbGlua3MuY2xvc2VBcHBvaW50bWVudFVybDtcclxuICAgICAgICB0aGlzLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsID0gbGlua3MuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmw7XHJcblxyXG4gICAgICAgIHRoaXMubmV3U2NoZWR1bGVVcmwgPSBsaW5rcy5uZXdTY2hlZHVsZVVybDtcclxuICAgICAgICB0aGlzLmxpc3RTY2hlZHVsZVVybCA9IHRoaXMubGlzdFNjaGVkdWxlVXJsO1xyXG4gICAgICAgIHRoaXMuU2NoZWR1bGVDYWxlbmRhclVybCA9IGxpbmtzLmdldFNjaGVkdWxlQ2FsZW5kYXJVcmw7XHJcbiAgICAgICAgdGhpcy5hZGRTdGFmZlVybCA9IGxpbmtzLmFkZFN0YWZmVXJsO1xyXG4gICAgICAgIHRoaXMuZG9jdG9yc1N0YWZmTGlzdGluZ1VyID0gbGlua3MuZG9jdG9yc1N0YWZmTGlzdGluZ1VyO1xyXG5cclxuICAgICAgICB0aGlzLnBhdGllbnRzSGlzdG9yeVVybCA9IGxpbmtzLnBhdGllbnRzSGlzdG9yeVVybDtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCA9IGxpbmtzLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDtcclxuICAgICAgICB0aGlzLnByb2dyYW1tZUxpc3RpbmdzVXJsID0gbGlua3MucHJvZ3JhbW1lTGlzdGluZ3NVcmw7XHJcblxyXG4gICAgICAgIHRoaXMuTWFuYWdlTG9jYXRpb25zVXJsID0gbGlua3MuTWFuYWdlTG9jYXRpb25zVXJsO1xyXG4gICAgICAgIHRoaXMuQ2FsZW5kYXJUZW1wbGF0ZVVybCA9IGxpbmtzLmdldENhbGVuZGVyVXJsO1xyXG5cclxuICAgICAgICB0aGlzLmFuYWx5dGljc1JlcG9ydFVybCA9IGxpbmtzLmdldEFuYWx5dGljc1VybDtcclxuICAgICAgICB0aGlzLmFjY291bnRpbmdVcmwgPSBsaW5rcy5hY2NvdW50aW5nVXJsO1xyXG4gICAgICAgIHRoaXMubWVkaWNpbmVTZWFyY2hVcmwgPSBsaW5rcy5tZWRpY2luZVNlYXJjaFVybDtcclxuXHJcbiAgICAgICAgdGhpcy5zdGFmZkxpc3RpbmdVcmwgPSBsaW5rcy5kb2N0b3JzU3RhZmZMaXN0aW5nVXI7XHJcblxyXG4gICAgICAgIC8vZG8gc29tZXRobmcgYWJvdXQgZG9jdG9ycyBpbmZvIGFuZCByZWdpc3RyYXRpb25cclxuXHJcbiAgICAgICAgLy9UaGUgdXJsIGZyb20gdGhlIGJyb3dzZXIgIGNhbiBiZSBjb21wYXJlZCB0byBzZXQgdGhlIGFjdGl2ZSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgbmF2Vmlldy5pbml0KCk7XHJcblxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBuYXZWaWV3ID0ge1xyXG4gICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAvL3dpcmluZyB0aGUgbmF2aWdhdGlvbiBjbGlja3NcclxuXHJcblxyXG4gICAgICAgICQoXCIjcG1zLWJyYW5kLWJ0bi1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1BNUyBicmFuZCBjbGljaycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoXCIjdXNlci1Qcm9maWxlLUJ0bi1MaW5rXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmRvY3RvclByb2ZpbGUpO1xyXG5cclxuICAgICAgICAkKFwiI2RvY3Rvci1kYXNoLWxvZ291dC1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIubG9nb3V0VXJsKTtcclxuXHJcblxyXG5cclxuICAgICAgICAkKFwiI2Rhc2hib2FyZC1TZWN0aW9uLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5kYXNoYm9hcmRIb21lVXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNhcHBvaW50bWVudC1zZWN0aW9uLWxpbmstYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNtYW5hZ2UtRG9jdG9ycy1TY2hlZHVsZS1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLlNjaGVkdWxlQ2FsZW5kYXJVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI2J0bi1wcm9ncmFtbWUtc2VjdGlvbi1saW5rXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLnByb2dyYW1tZUxpc3RpbmdzVXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNjcmVhdGUtcHJvZ3JhbS1mb3ItcGF0aWVudC1zZWN0aW9uXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNwYXRpZW50cy1FbnRyeS1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLnBhdGllbnRzTGlzdGluZ1VybCk7XHJcblxyXG4gICAgICAgIC8vJChcIiNwYXRpZW50cy1lbnRyeS1jcmVhdGUtc2VjdGlvbi1saW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5wYXRpZW50c0VudHJ5VXJsKTtcclxuICAgICAgICAvLyQoXCIjcGF0aWVudHMtSGlzdG9yeS1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLnBhdGllbnRzSGlzdG9yeVVybCk7XHJcblxyXG4gICAgICAgICQoXCIjc3RhZmYtbWFuYWdtZW50LXNlY3Rpb24tbGluay1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuZG9jdG9yc1N0YWZmTGlzdGluZ1VyKTtcclxuXHJcbiAgICAgICAgJChcIiNidG4tbWFuYWdlLWxvY2F0aW9uc1wiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5NYW5hZ2VMb2NhdGlvbnNVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI2FuYWx5dGljcy1zaWRlLW5hdmlnYXRpb24tbGluay1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuYW5hbHl0aWNzUmVwb3J0VXJsKTtcclxuICAgICAgICAkKFwiI2FjY291bnRpbmctc2lkZS1uYXZpZ2F0aW9uLWxpbmstYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmFjY291bnRpbmdVcmwpO1xyXG4gICAgICAgICQoXCIjbWVkaWNpbmUtc2lkZS1uYXZpZ2F0aW9uLWxpbmstYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLm1lZGljaW5lU2VhcmNoVXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNkYXNoLXN0YWZmLW1hbmFnZS1saW5rXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmRvY3RvcnNTdGFmZkxpc3RpbmdVcik7XHJcbiAgICAgICAgJChcIiNkYXNoLWxvY2F0aW9uLW1hbmFnZS1saW5rXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLk1hbmFnZUxvY2F0aW9uc1VybCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8kKFwiI2Jvb2stQXBwb2ludG1lbnRzLVNlY3Rpb24tQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLm5ld0FwcG9pbnRtZW50VXJsKTtcclxuICAgICAgICAvLyQoXCIjY2xvc2UtQm9vay1BcHBvaW50bWVudC1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmNsb3NlQXBwb2ludG1lbnRVcmwpO1xyXG4gICAgICAgIC8vJChcIiN2aWV3LUFwcG9pbnRtZW50LVNlY3Rpb24tTGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwpO1xyXG4gICAgICAgIC8vJChcIiNtYW5hZ2UtRG9jdG9ycy1TY2hlZHVsZS1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmxpc3RTY2hlZHVsZVVybCk7XHJcbiAgICAgICAgLy8kKFwiI21hbmFnZS1zY2hlZHVsZS1jcmVhdGUtc2VjdGlvbi1saW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5uZXdTY2hlZHVsZVVybCk7XHJcbiAgICAgICAgLy8kKFwiI2NhbGVuZGFyLVRlbXBsYXRlLUJ0bi1MaW5rXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLkNhbGVuZGFyVGVtcGxhdGVVcmwpO1xyXG4gICAgICAgIC8vJChcIiNtYW5hZ2Utc2NoZWR1bGUtbGlzdC1zZWN0aW9uLWxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLlNjaGVkdWxlQ2FsZW5kYXJVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI290aGVyLXNldHRpbmdzLXNlY3Rpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIiNjYWxlbmRhci10ZW1wbGF0ZS1zZWN0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICAvL2hpZ2hsaWdodCB0aGUgcmlnaHQgbmF2aWdhdGlvblxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gIH0oKSk7XHJcblxyXG59KTtcclxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgJChmdW5jdGlvbigpe1xyXG4gICAgY29uc29sZS5sb2coJ2NhbGFuZGVyIGpzIGxvYWRlZCcpO1xyXG5cclxuXHJcbiAgICB2YXIgbW9kZWwgPSB7XHJcbiAgICAgIGxvY2F0aW9uTGlzdDpbXSxcclxuICAgICAgY2FsZW5kYXJMaXN0OiBbXSxcclxuICAgICAgc3RhcnREYXRlOicnLFxyXG4gICAgICBlbmREYXRlOicnXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBiYWNrR3JvdW5kQ29sb3JMaXN0ID0gW1xyXG4gICAgICAnIzMzN2FiNycsIC8vYmx1ZVxyXG4gICAgICAnI0Y0NDMzNicsIC8vcmVkXHJcbiAgICAgICcjNENBRjUwJywgLy9ncmVlblxyXG4gICAgICAnI0ZCOEMwMCcsIC8vb3JhbmdlXHJcbiAgICAgICcjMzc0NzRGJywgLy9ncmF5XHJcbiAgICAgICcjMzdBRjRGJywgLy9ncmF5XHJcbiAgICAgICcjMzc0NzRGJywgLy9ncmF5XHJcbiAgICAgICcjMzc0N0FGJywgLy9ncmF5XHJcbiAgICAgICcjQUY0NzRGJywvL2dyYXlcclxuICAgICAgJyMzN0ZGNEYnLCAvL2dyYXlcclxuICAgICAgJyNGRjMzNEYnLCAvL2dyYXlcclxuICAgICAgJyMzM0ZGNEYnLCAvL2dyYXlcclxuICAgICAgJyMzMzQ3RkZGJyAvL2dyYXlcclxuICAgIF07XHJcblxyXG4gICAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5nZXRTZWNoZHVsZUNhbGVuZGFyRGV0YWlsc1VybCA9IGxpbmtzLmdldFNlY2hkdWxlQ2FsZW5kYXJEZXRhaWxzVXJsO1xyXG5cclxuICAgICAgICBjYWxlbmRhclZpZXcuaW5pdCgpO1xyXG5cclxuICAgICAgICB2YXIgbVRvZGF5c0RhdGUgPSBtb21lbnQoKTtcclxuXHJcblxyXG4gICAgICAgIHZhciBtc3RhcnREYXRlID0gbW9tZW50KHsgeWVhcnM6bVRvZGF5c0RhdGUuZ2V0KCd5ZWFyJyksIG1vbnRoczptVG9kYXlzRGF0ZS5nZXQoJ21vbnRoJyl9KVxyXG4gICAgICAgIHZhciBtZW5kRGF0ZSA9IG1vbWVudChtc3RhcnREYXRlKS5lbmRPZignbW9udGgnKTtcclxuXHJcbiAgICAgICAgLy9tb250aFxyXG4gICAgICAgIHZhciBsc3RhcnREYXRlID0gbXN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVknKTtcclxuICAgICAgICB2YXIgbGVuZERhdGUgPSBtZW5kRGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVknKTtcclxuXHJcbiAgICAgICAgLy91cGRhdGluZyBtb2RlbFxyXG4gICAgICAgIG1vZGVsLnN0YXJ0RGF0ZSA9IGxzdGFydERhdGU7XHJcbiAgICAgICAgbW9kZWwuZW5kRGF0ZSA9IGxlbmREYXRlO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnc3RhcnQgZGF0ZSAnICsgbHN0YXJ0RGF0ZSArICcgZW5kIGRhdGUgJyArIGxlbmREYXRlKTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXREZXRhaWxzRnJvbVNlcnZlcihsc3RhcnREYXRlLCBsZW5kRGF0ZSk7XHJcblxyXG4gICAgICB9LFxyXG4gICAgICBnZXRMb2NhdGlvbkxpc3Q6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuICBtb2RlbC5sb2NhdGlvbkxpc3Q7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldFN0YXJ0RGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gbW9kZWwuc3RhcnREYXRlO1xyXG4gICAgICB9LFxyXG4gICAgICBzZWFyY2hTY2hlZHVsZTogZnVuY3Rpb24oc2NoZWR1bGVMaXN0LCBkYXRlKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnbGVuZ3RoJyArIHNjaGVkdWxlTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzY2hlZHVsZUxpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgaWYoc2NoZWR1bGVMaXN0W2ldLmRhdGUgPT0gZGF0ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZUxpc3RbaV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9LFxyXG4gICAgICBhc3NpZ25Db2xvckNvZGVzVG9sb2NhdGlvbkxpc3QoKXtcclxuXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG1vZGVsLmxvY2F0aW9uTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICBpZihpIDwgYmFja0dyb3VuZENvbG9yTGlzdC5sZW5ndGgpe1xyXG4gICAgICAgICAgICBtb2RlbC5sb2NhdGlvbkxpc3RbaV0uY29sb3VyID0gYmFja0dyb3VuZENvbG9yTGlzdFtpXTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBtb2RlbC5sb2NhdGlvbkxpc3RbaV0uY29sb3VyID0gIGJhY2tHcm91bmRDb2xvckxpc3RbMF07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIGdldExvY2F0aW9uQ29sb3VyOiBmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG1vZGVsLmxvY2F0aW9uTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICBpZihtb2RlbC5sb2NhdGlvbkxpc3RbaV0uaWQgPT0gaWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kZWwubG9jYXRpb25MaXN0W2ldLmNvbG91cjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZpbmRFbGVtZW50SW5jb25zdHJ1Y3RlZEFycmF5OiBmdW5jdGlvbihwYXJyYXksIHBkYXRlKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdsZW5ndGgnICsgcGFycmF5Lmxlbmd0aCk7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHBhcnJheS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKCdkYXRlICcgKyBwYXJyYXlbaV0uZGF0ZSArICcgJyArIHBkYXRlKTtcclxuICAgICAgICAgIGlmKHBhcnJheVtpXS5kYXRlID09IHBkYXRlKXtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnJheVtpXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbnN0cnVjdFNjaGVkdWxlTGlzdEZvclJlbmRlcmluZzpmdW5jdGlvbigpe1xyXG5cclxuXHJcbiAgICAgICAgdmFyIG1mcm9tRGF0ZSA9IG1vbWVudChtb2RlbC5zdGFydERhdGUsIFwiREQtTU0tWVlZWVwiKTtcclxuICAgICAgICB2YXIgbXRvRGF0ZSA9IG1vbWVudChtb2RlbC5lbmREYXRlLCBcIkRELU1NLVlZWVlcIik7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnZGF0ZSByYW5nZSBmcm9tICcgKyBtb2RlbC5zdGFydERhdGUgKyAnIHRvICcgKyBtb2RlbC5lbmREYXRlKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdkYXRlIHJhbmdlIGZyb20gJyArIG1mcm9tRGF0ZSArICcgdG8gJyArIG10b0RhdGUpO1xyXG5cclxuICAgICAgICAvL0luaXRpbGl6ZSB0aGUgc2NoZWR1bGUgYXJyYXkgd2l0aCBpdGVtcyBmb3IgYWxsIHRoZSBkYXlzIG9mIHRoZSBtb250aFxyXG4gICAgICAgIC8vcGx1cyB3aXRoIGV4dHJhIGRheXMgbmVlZGVkIHRvIGZpbGwgdGhlIGNhbGVuZGFyIGZyb20gbW9uZGF5XHJcbiAgICAgICAgdmFyIGNvbnN0cnVjdGVkU2NoZWR1bGVMaXN0TW9kZWwgPSBbXTtcclxuXHJcbiAgICAgICAgLy9maW5kaW5nIHRoZSBubyBvZiBkYXlzIHRoYXQgbmVlZCB0byBiZSBmaWxsZWQsIHRvIHN0YXJ0IGZyb20gbW9uZGF5XHJcbiAgICAgICAgdmFyIHN0YXJ0RGF5ID0gbWZyb21EYXRlLmZvcm1hdCgnZGRkJyk7XHJcblxyXG4gICAgICAgIGlmKHN0YXJ0RGF5ICE9ICdNb24nKXtcclxuXHJcbiAgICAgICAgICB2YXIgYmxvY2tzVG9BZGQgPSAwOyAvL25vIG9mIGRheXMgbmVlZGVkIHRvIHN0YXJ0IGZyb20gbW9uZGF5XHJcblxyXG4gICAgICAgICAgaWYoc3RhcnREYXkgPT0gXCJUdWVcIil7XHJcbiAgICAgICAgICAgIGJsb2Nrc1RvQWRkID0gMTtcclxuICAgICAgICAgIH1lbHNlIGlmKHN0YXJ0RGF5ID09IFwiV2VkXCIpe1xyXG4gICAgICAgICAgICBibG9ja3NUb0FkZCA9IDI7XHJcbiAgICAgICAgICB9ZWxzZSBpZihzdGFydERheSA9PSBcIlRodVwiKXtcclxuICAgICAgICAgICAgYmxvY2tzVG9BZGQgPSAzO1xyXG4gICAgICAgICAgfWVsc2UgaWYoc3RhcnREYXkgPT0gXCJGcmlcIil7XHJcbiAgICAgICAgICAgIGJsb2Nrc1RvQWRkID0gNDtcclxuICAgICAgICAgIH1lbHNlIGlmKHN0YXJ0RGF5ID09IFwiU2F0XCIpe1xyXG4gICAgICAgICAgICBibG9ja3NUb0FkZCA9IDU7XHJcbiAgICAgICAgICB9ZWxzZSBpZihzdGFydERheSA9PSBcIlN1blwiKXtcclxuICAgICAgICAgICAgYmxvY2tzVG9BZGQgPSA2O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vZmluZCB0aGUgc3RhcnQgZGF0ZSBmb3IgbW9uZGF5XHJcbiAgICAgICAgICB2YXIgY2FsYW5kZXJTdGFydERhdGUgPSBtb21lbnQobWZyb21EYXRlKS5zdWJ0cmFjdChibG9ja3NUb0FkZCwgJ2RheXMnKTtcclxuXHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKCdjYWwgc3RhcnQgZGF0ZSAnICsgY2FsYW5kZXJTdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZJykpO1xyXG4gICAgICAgICAgLy9hZGQgaW5hY3R2ZSBpdGVtc1xyXG4gICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGJsb2Nrc1RvQWRkIDsgaSsrKXtcclxuXHJcbiAgICAgICAgICAgIHZhciBzY2hlZHVsZSA9IHtcclxuICAgICAgICAgICAgICBpc0FjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgZGF0ZTogY2FsYW5kZXJTdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZJyksXHJcbiAgICAgICAgICAgICAgbGlzdDpbXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RlZFNjaGVkdWxlTGlzdE1vZGVsLnB1c2goc2NoZWR1bGUpO1xyXG4gICAgICAgICAgICAvL2NvbnN0cnVjdGVkU2NoZWR1bGVMaXN0TW9kZWwucHVzaChjYWxhbmRlclN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVknKSk7XHJcbiAgICAgICAgICAgIGNhbGFuZGVyU3RhcnREYXRlLmFkZCgxLCAnZCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hZGRpbmcgaXRlbXMgZm9yIHRoZSBkdXJhdGlvbiBvZiB0aGUgdGltZSBwZXJpb2RcclxuICAgICAgICB2YXIgZGF5c0R1cmF0aW9uID0gIG1vbWVudC5kdXJhdGlvbihtdG9EYXRlLmRpZmYobWZyb21EYXRlKSkuYXNEYXlzKCk7XHJcblxyXG4gICAgICAgIGZvcih2YXIgc2NoZWR1bGVDb3VudGVyID0gMDsgc2NoZWR1bGVDb3VudGVyIDw9IGRheXNEdXJhdGlvbjsgc2NoZWR1bGVDb3VudGVyKyspe1xyXG5cclxuICAgICAgICAgIHZhciBzY2hlZHVsZSA9IHtcclxuICAgICAgICAgICAgaXNBY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBkYXRlOiBtZnJvbURhdGUuZm9ybWF0KCdERC1NTS1ZWVlZJyksXHJcbiAgICAgICAgICAgIGxpc3Q6W11cclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBjb25zdHJ1Y3RlZFNjaGVkdWxlTGlzdE1vZGVsLnB1c2goc2NoZWR1bGUpO1xyXG4gICAgICAgICAgbWZyb21EYXRlLmFkZCgxLCAnZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnY29uc3RydWN0ZWQgTW9kZWwgJyArIEpTT04uc3RyaW5naWZ5KGNvbnN0cnVjdGVkU2NoZWR1bGVMaXN0TW9kZWwpKTtcclxuXHJcbiAgICAgICAgLy9sb29waW5nIHRocm91Z2ggdGhlIHNjaGVkdWxlcyBmb3IgZWFjaCBsb2NhdGlvblxyXG4gICAgICAgIGlmKG1vZGVsLmNhbGVuZGFyTGlzdCl7XHJcbiAgICAgICAgZm9yKHZhciBsb2NDb3VudGVyID0gMDsgbG9jQ291bnRlciA8IG1vZGVsLmNhbGVuZGFyTGlzdC5sZW5ndGg7IGxvY0NvdW50ZXIrKyl7XHJcblxyXG4gICAgICAgICAgdmFyIGxzY2hlZHVsZUxpc3QgPSBtb2RlbC5jYWxlbmRhckxpc3RbbG9jQ291bnRlcl0uc2NoZWR1bGVMaXN0O1xyXG4gICAgICAgICAgdmFyIGxvY0lkID0gbW9kZWwuY2FsZW5kYXJMaXN0W2xvY0NvdW50ZXJdLmxvY2F0aW9uSWQ7XHJcblxyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZygnc2NoZWR1ICcgKyBKU09OLnN0cmluZ2lmeShzY2hlZHVsZUxpc3QpKTtcclxuXHJcbiAgICAgICAgICBmb3IodmFyIHNjaGVkdWxlQ291bnRlciA9IDA7IHNjaGVkdWxlQ291bnRlciA8IGxzY2hlZHVsZUxpc3QubGVuZ3RoOyBzY2hlZHVsZUNvdW50ZXIrKyl7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdzY2hlZHUgJyArIEpTT04uc3RyaW5naWZ5KHNjaGVkdWxlTGlzdFtzY2hlZHVsZUNvdW50ZXJdKSk7XHJcblxyXG4gICAgICAgICAgICAvL2dldCB0aGUgaXRlbSBmcm9tIHRoZSBjb25zdHJ1Y3RlZCBhcnJheVxyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMuZmluZEVsZW1lbnRJbmNvbnN0cnVjdGVkQXJyYXkoY29uc3RydWN0ZWRTY2hlZHVsZUxpc3RNb2RlbCwgbHNjaGVkdWxlTGlzdFtzY2hlZHVsZUNvdW50ZXJdLmRhdGUpO1xyXG4gICAgICAgICAgICBpZihpdGVtKXtcclxuICAgICAgICAgICAgICBpdGVtLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHNjaGVkdWxlID0ge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb25JZDogbG9jSWQsXHJcbiAgICAgICAgICAgICAgICB0aW1pbmdzOiBsc2NoZWR1bGVMaXN0W3NjaGVkdWxlQ291bnRlcl0udGltaW5nc1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpdGVtLmxpc3QucHVzaChzY2hlZHVsZSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfS8vaW5uZXIgbG9vcCBmb3Igc2NoZWR1bGUgaXRlbXMgaW4gbG9jYXRpb25zXHJcblxyXG5cclxuICAgICAgICB9Ly9vdXRlciBsb29wIGZvciBsb2NhdGlvbnNcclxuICAgICAgfVxyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdjb25zdHJ1Y3RlZCBNb2RlbCBhZnRlcicgKyBKU09OLnN0cmluZ2lmeShjb25zdHJ1Y3RlZFNjaGVkdWxlTGlzdE1vZGVsKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb25zdHJ1Y3RlZFNjaGVkdWxlTGlzdE1vZGVsO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXREZXRhaWxzRnJvbVNlcnZlcjogZnVuY3Rpb24ocHN0YXJ0RGF0ZSwgcGVuZERhdGUpe1xyXG4gICAgICAgICQuZ2V0KHRoaXMuZ2V0U2VjaGR1bGVDYWxlbmRhckRldGFpbHNVcmwgLCB7c3RhcnREYXRlOnBzdGFydERhdGUsIGVuZERhdGU6cGVuZERhdGV9KVxyXG4gICAgICAgIC5kb25lKGZ1bmN0aW9uKCByZXNwb25zZSApIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2NzICcgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG4gICAgICAgICAgbW9kZWwgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgY29udHJvbGxlci5hc3NpZ25Db2xvckNvZGVzVG9sb2NhdGlvbkxpc3QoKTtcclxuICAgICAgICAgIGNhbGVuZGFyVmlldy5yZW5kZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdmFyIGNhbGVuZGFyVmlldyA9IHtcclxuICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm5ld1NjaGVkdWxlQnV0dG9uID0gJChcIiNidG4tbmV3LXNjaGVkdWxlXCIpO1xyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZVNjaGVkdWxlQnV0dG9uID0gJChcIiNidG4tZGVhY3RpdmF0ZS1zY2hlZHVsZVwiKTtcclxuICAgICAgICB0aGlzLnR4dE1vbnRoSGVhZGVyID0gJCgnI3R4dC1tb250aC1oZWFkZXInKTtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uTGlzdFRvcCA9ICQoJyNsb2NhdGlvbi1saXN0LXRvcCcpO1xyXG4gICAgICAgIHRoaXMuY2FsZW5kYXJUYWJsZUJvZHkgPSAkKCcjY2FsZW5kYXItYm9keScpO1xyXG5cclxuICAgICAgICB0aGlzLmJ0blByZXZpb3VzU2NoZWR1bGUgPSAkKCcjYnRuLXByZXZpb3VzLXNjaGVkdWxlJyk7XHJcbiAgICAgICAgdGhpcy5idG5OZXh0U2NoZWR1bGUgPSAkKCcjYnRuLW5leHQtc2NoZWR1bGUnKTtcclxuXHJcbiAgICAgICAgdGhpcy5uZXdTY2hlZHVsZUJ1dHRvbi5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbGlua3MubmV3U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZVNjaGVkdWxlQnV0dG9uLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBsaW5rcy5kZWFjdGl2YXRlU2NoZWR1bGVVcmw7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLmJ0blByZXZpb3VzU2NoZWR1bGUuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgdmFyIHN0ckRhdGUgPSBjb250cm9sbGVyLmdldFN0YXJ0RGF0ZSgpO1xyXG4gICAgICAgICAgbWRhdGUgPSBtb21lbnQoc3RyRGF0ZSwgXCJERC1NTS1ZWVlZXCIpO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdzdGFydCBkYXRlICcgKyBtZGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVknKSk7XHJcblxyXG4gICAgICAgICAgdmFyIG1zdGFydERhdGUgPSBtb21lbnQoeyB5ZWFyczptZGF0ZS5nZXQoJ3llYXInKSwgbW9udGhzOiArbWRhdGUuZ2V0KCdtb250aCcpIC0gMX0pO1xyXG5cclxuICAgICAgICAgIHZhciBsc3RhcnREYXRlID0gbXN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVknKTtcclxuXHJcbiAgICAgICAgICB2YXIgbWVuZERhdGUgPSBtc3RhcnREYXRlLmVuZE9mKCdtb250aCcpO1xyXG4gICAgICAgICAgdmFyIGxlbmREYXRlID0gbWVuZERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZJyk7XHJcblxyXG4gICAgICAgICAgLy91cGRhdGluZyBtb2RlbFxyXG4gICAgICAgICAgbW9kZWwuc3RhcnREYXRlID0gbHN0YXJ0RGF0ZTtcclxuICAgICAgICAgIG1vZGVsLmVuZERhdGUgPSBsZW5kRGF0ZTtcclxuXHJcbiAgICAgICAgICBjb250cm9sbGVyLmdldERldGFpbHNGcm9tU2VydmVyKGxzdGFydERhdGUsIGxlbmREYXRlKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuYnRuTmV4dFNjaGVkdWxlLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgdmFyIHN0ckRhdGUgPSBjb250cm9sbGVyLmdldFN0YXJ0RGF0ZSgpO1xyXG4gICAgICAgICAgbWRhdGUgPSBtb21lbnQoc3RyRGF0ZSwgXCJERC1NTS1ZWVlZXCIpO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdzdGFydCBkYXRlICcgKyBtZGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVknKSk7XHJcblxyXG4gICAgICAgICAgdmFyIG1zdGFydERhdGUgPSBtb21lbnQoeyB5ZWFyczptZGF0ZS5nZXQoJ3llYXInKSwgbW9udGhzOiArbWRhdGUuZ2V0KCdtb250aCcpICsgMX0pO1xyXG5cclxuICAgICAgICAgIHZhciBsc3RhcnREYXRlID0gbXN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVknKTtcclxuXHJcbiAgICAgICAgICB2YXIgbWVuZERhdGUgPSBtc3RhcnREYXRlLmVuZE9mKCdtb250aCcpO1xyXG4gICAgICAgICAgdmFyIGxlbmREYXRlID0gbWVuZERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZJyk7XHJcblxyXG4gICAgICAgICAgLy91cGRhdGluZyBtb2RlbFxyXG4gICAgICAgICAgbW9kZWwuc3RhcnREYXRlID0gbHN0YXJ0RGF0ZTtcclxuICAgICAgICAgIG1vZGVsLmVuZERhdGUgPSBsZW5kRGF0ZTtcclxuXHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0ICcgKyBsc3RhcnREYXRlICsgJyBlbmQgJyArIGxlbmREYXRlKTtcclxuICAgICAgICAgIGNvbnRyb2xsZXIuZ2V0RGV0YWlsc0Zyb21TZXJ2ZXIobHN0YXJ0RGF0ZSwgbGVuZERhdGUpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICB9LFxyXG4gICAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHZhciBzdHJEYXRlID0gY29udHJvbGxlci5nZXRTdGFydERhdGUoKTtcclxuICAgICAgICBtU3RhcnREYXRlID0gbW9tZW50KHN0ckRhdGUsIFwiREQtTU0tWVlZWVwiKTtcclxuICAgICAgICB0aGlzLnR4dE1vbnRoSGVhZGVyLnRleHQobVN0YXJ0RGF0ZS5mb3JtYXQoJ01NTSBZWScpKTtcclxuXHJcblxyXG4gICAgICAgIC8vYWRkaW5nIHRoZSBsb2NhaXRvbiBsaXN0IG9uIHRvcFxyXG4gICAgICAgIHZhciBsb2NhdGlvbkxpc3QgPSBjb250cm9sbGVyLmdldExvY2F0aW9uTGlzdCgpO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb25MaXN0VG9wLmVtcHR5KCk7XHJcblxyXG4gICAgICAgIC8vPGxpPjxsYWJlbCBjbGFzcz1cImxhYmVsICBsYWJlbC1wcmltYXJ5XCI+Jm5ic3A7Jm5ic3A7PC9sYWJlbD48c3BhbiBjbGFzcz1cImludmlzaWJsZVwiPi4uLi4uPC9zcGFuPjxsYWJlbD5NYXJnYW8gPC9sYWJlbD48L2xpPlxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsb2NhdGlvbkxpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhsb2NhdGlvbkxpc3RbaV0ubmFtZSk7XHJcbiAgICAgICAgICAvL2xhYmVsIGxhYmVsLXByaW1hcnkgbG9jYXRpb24tbGFiZWxcclxuICAgICAgICAgIHZhciBsYWJlbCA9ICQoJzxsYWJlbC8+Jywge1xyXG4gICAgICAgICAgICBjbGFzczogJyBsb2NhdGlvbi1sYWJlbCBsYWJlbC1wcmltYXJ5ICcsXHJcbiAgICAgICAgICAgIGNzczoge1xyXG4gICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiIDogYmFja0dyb3VuZENvbG9yTGlzdFtpXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgdmFyIHNwYW4gPSAkKCc8c3Bhbi8+Jywge1xyXG4gICAgICAgICAgICBjbGFzczogJ2ludmlzaWJsZScsXHJcbiAgICAgICAgICAgIHRleHQ6Jy4uLidcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgIHZhciBzcGFuMjMgPSAkKCc8c3Bhbi8+Jywge1xyXG4gICAgICAgICAgICBjbGFzczogJ2ludmlzaWJsZScsXHJcbiAgICAgICAgICAgIHRleHQ6Jy4uLidcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHZhciBsYWJlbDEgPSAkKCc8bGFiZWwvPicsIHtcclxuICAgICAgICAgICAgdGV4dDpsb2NhdGlvbkxpc3RbaV0ubmFtZVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgdmFyIGxpID0gJCgnPGxpLz4nKTtcclxuICAgICAgICAgIGxpLmFwcGVuZChsYWJlbCk7XHJcbiAgICAgICAgICBsYWJlbC5hcHBlbmQoc3BhbjIzKTtcclxuXHJcbiAgICAgICAgICBsaS5hcHBlbmQoc3Bhbik7XHJcbiAgICAgICAgICBsaS5hcHBlbmQobGFiZWwxKTtcclxuICAgICAgICAgIHRoaXMubG9jYXRpb25MaXN0VG9wLmFwcGVuZChsaSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2VuZCBvZiBhZGRpbmcgdGhlIGxvY2F0aW9uIGxpc3Qgb24gdG9wXHJcblxyXG4gICAgICAgIC8vYWRkaW5nIHRoZSBlbnRyaWVzIHRvIHRoZSBjYWxlbmRhclxyXG5cclxuICAgICAgICB2YXIgc2NoZWR1bGVMaXN0ID0gY29udHJvbGxlci5jb25zdHJ1Y3RTY2hlZHVsZUxpc3RGb3JSZW5kZXJpbmcoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygncmVuZGVyaW5nICcgK0pTT04uc3RyaW5naWZ5KHNjaGVkdWxlTGlzdCkpO1xyXG5cclxuICAgICAgICB2YXIgaW5kZXhDb3VudGVyID0gMDtcclxuICAgICAgICB2YXIgZGF5c0NvdW50ID0gc2NoZWR1bGVMaXN0Lmxlbmd0aDtcclxuICAgICAgICB2YXIgbG9vcENvdW50ID0gTWF0aC5jZWlsKGRheXNDb3VudCAvIDcpOyAgLy9kaXZpZGUgYnkgc2V2ZW4gZGF5cyBvZiB3ZWVrXHJcblxyXG4gICAgICAgIHRoaXMuY2FsZW5kYXJUYWJsZUJvZHkuZW1wdHkoKTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbG9vcENvdW50IDsgaSsrKXtcclxuXHJcbiAgICAgICAgICB2YXIgdHIgPSAkKCc8dHIvPicse2NsYXNzOiAndGV4dC1jZW50ZXInfSk7XHJcblxyXG4gICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IDcgJiYgaW5kZXhDb3VudGVyIDwgZGF5c0NvdW50OyBqKyspe1xyXG5cclxuICAgICAgICAgICAgdmFyIHNjaGVkdWxlSXRlbSA9IHNjaGVkdWxlTGlzdFtpbmRleENvdW50ZXJdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBtb21lbnQoc2NoZWR1bGVJdGVtLmRhdGUsIFwiREQtTU0tWVlZWVwiKTtcclxuICAgICAgICAgICAgdmFyIHNwYW4gPSAgJCgnPHNwYW4vPicse2NsYXNzOiAncHVsbC1yaWdodCBmb250LTE2IGNhbGVuZGFyLWRhdGUnLCB0ZXh0OmRhdGUuZm9ybWF0KCdEbycpfSk7XHJcbiAgICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+JykuYXBwZW5kKHNwYW4pXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJCgnPGJyPjxicj4nKSk7XHJcblxyXG4gICAgICAgICAgICBpZihzY2hlZHVsZUl0ZW0uaXNBY3RpdmUpe1xyXG5cclxuICAgICAgICAgICAgICB2YXIgbGlzdCA9IHNjaGVkdWxlSXRlbS5saXN0O1xyXG5cclxuICAgICAgICAgICAgICBmb3IodmFyIGxpc3RDb3VudGVyID0gMDsgbGlzdENvdW50ZXIgPCBsaXN0Lmxlbmd0aDsgbGlzdENvdW50ZXIrKyl7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShsaXN0W2xpc3RDb3VudGVyXS50aW1pbmdzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRpbWltZ0xpc3QgPSBsaXN0W2xpc3RDb3VudGVyXS50aW1pbmdzO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vb25lIG1vcmUgbG9vcCB0byBhZGQgdGhlIHRpbWluZ3NcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgdGltaW5nQ291bnRlciA9IDA7IHRpbWluZ0NvdW50ZXIgPCB0aW1pbWdMaXN0Lmxlbmd0aDsgdGltaW5nQ291bnRlcisrKXtcclxuICAgICAgICAgICAgICAgICAgLy9nZXQgdGhlIHN0YXJ0IGFuZCBlbmQgbWludXRlc1xyXG5cclxuICAgICAgICAgICAgICAgICAgdmFyIHNwYW5Mb2NhdGlvbiA9ICAkKCc8c3Bhbi8+Jyx7Y2xhc3M6ICdsb2NhdGlvbi1sYWJlbC0yIGxhYmVsIGxhYmVsLWluZm8nLFxyXG4gICAgICAgICAgICAgICAgICAgIGNzczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCIgOiBjb250cm9sbGVyLmdldExvY2F0aW9uQ29sb3VyKGxpc3RbbGlzdENvdW50ZXJdLmxvY2F0aW9uSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0VGltZU1pbnV0ZXMgPSB0aW1pbWdMaXN0W3RpbWluZ0NvdW50ZXJdLnN0YXJ0VGltZU1pbnV0ZXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgbXN0YXJ0VGltZSA9IG1vbWVudCh7IGhvdXI6MCwgbWludXRlczowIH0pO1xyXG4gICAgICAgICAgICAgICAgbXN0YXJ0VGltZS5hZGQoc3RhcnRUaW1lTWludXRlcywgJ21pbnV0ZXMnKTtcclxuICAgICAgICAgICAgICAgIHZhciBlbmRUaW1lTWludXRlcyA9IHRpbWltZ0xpc3RbdGltaW5nQ291bnRlcl0uZW5kVGltZU1pbnV0ZXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVuZFRpbWUgPSBtb21lbnQoeyBob3VyOjAsIG1pbnV0ZXM6MCB9KTtcclxuICAgICAgICAgICAgICAgIG1lbmRUaW1lLmFkZChlbmRUaW1lTWludXRlcywgJ21pbnV0ZXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRpbWltZ0xpc3RbdGltaW5nQ291bnRlcl0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdGltZSA9IG1zdGFydFRpbWUuZm9ybWF0KCdoaDptbSBhJykgKyAnIC0gJyArIG1lbmRUaW1lLmZvcm1hdCgnaGg6bW0gYScpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNwYW4xID0gICQoJzxzcGFuLz4nLHtjbGFzczogJ2xhYmVsIGZvbnQtMTYgbGFiZWwtY3VzdG9tJ30pO1xyXG4gICAgICAgICAgICAgICAgc3BhbjEudGV4dCh0aW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgIC8vIHRkLmFwcGVuZChzcGFuTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGQuYXBwZW5kKHNwYW4xKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzcGFuTG9jYXRpb24uYXBwZW5kVG8oc3BhbjEpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgdmFyIHNwYW4xID0gICQoJzxzcGFuLz4nLHtjbGFzczogJ2xhYmVsIGZvbnQtMTYgbGFiZWwtaW5mbycsIHRleHQ6J05vIFNjaGVkdWxlJ30pO1xyXG4gICAgICAgICAgICB0ZC5hcHBlbmQoc3BhbjEpO1xyXG4gICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgICAgICtcclxuICAgICAgICAgICsraW5kZXhDb3VudGVyO1xyXG5cclxuICAgICAgICB9ICAvL2lubmVyIGxvb3BcclxuXHJcbiAgICAgICAgdGhpcy5jYWxlbmRhclRhYmxlQm9keS5hcHBlbmQodHIpO1xyXG5cclxuICAgICAgfS8vb3V0ZXIgbG9vcFxyXG5cclxuICAgICAgLy9hZGRpbmcgdGhlIGVudHJpZXMgaW4gdGhlIHRvcCByb3dcclxuICAgICAgLy92YXIgdHIgPSAkKCc8dHIvPicpO1xyXG4gICAgICAvL3RoaXMuY2FsZW5kYXJCb2R5LmFwcGVuZCh0cik7XHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gIC8qXHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5jYWxlbmRhci10aW1lLUJ0blwiLCBmdW5jdGlvbiAoZXYpIHtcclxuXHJcbiAgJChcIi5jYWxlbmRhci10aW1lLUJ0blwiKS5wYXJlbnQoKS5wYXJlbnQoKS5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsXCJ3aGl0ZVwiKTtcclxuICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmNzcyhcImJhY2tncm91bmQtY29sb3JcIixcIiNlNmVjZjRcIik7XHJcbiAgKi9cclxuXHJcbn0oKSk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
