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
//helper function to get the url query parameters
var utility = {
  getURLParam: function(name){
    var url = window.location.href;

    name = name.replace(/[\[\]]/g, "\\$&");

    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },
  getTimeMinutesArray:  function(){

  }
}

var links = {

  //login js urls
   authenticateUrl : "index.php/authenticate/authenitcateUser",
   successRedirectUrl : "index.php/doctorDashboard/",
   registerDoctorUrl : "index.php/doctor/doctorInfo",
   adminUrl:"index.php/adminDashboard/admin",

   //admin related
   doctorListingUrl: "index.php/adminDashboard/doctorListing",

   logoutUrl : "index.php/authenticate/logout",

   //doctor dashboard links 
   doctorProfile : "index.php/doctorDashboard/doctorProfile",
   dashboardHomeUrl : "index.php/doctorDashboard/",
   newAppointmentUrl : "index.php/doctorDashboard/bookAppointment",
   patientsEntryUrl : "index.php/doctorDashboard/patientsEntry",
   patientsListingUrl : "index.php/doctorDashboard/patientsListing",
   closeAppointmentUrl : "index.php/doctorDashboard/closeAppointment",
   doctorsAppointmentsListUrl : "index.php/doctorDashboard/listAppointment",
   newScheduleUrl : "index.php/doctorDashboard/newSchedule",
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

   //programme
   programmeListUrl:"index.php/programme/getMedicationProgrammeList",
   programmeEditUrl:"index.php/doctorDashboard/createMedicalProgram",
   createModifyProgrammeUrl:"index.php/programme/createModifyProgramme",
   getProgrammeUrl:"index.php/programme/getProgrammes",


   //patient
   patientDetailPersistUrl:"index.php/patient/addUpdatePatient",
   patientsDetailsUrl:"index.php/patient/getPatientDetails",
   loginCheckUrl:"index.php/authenticate/isLoggedIn",
   getProgrammeList:"index.php/programme/getMedicationProgrammeList",
   programmeListDetailsUrl:"index.php/programme/getProgrammeListDetails",
   patientsProgrammesUrl:"index.php/programme/getPatientProgrammes",
   patientListingUrl:"index.php/patient/getPatientList",

   saveUpdateLocations:"index.php/locations/addUpdateLocation",
   locationListUrl:"index.php/locations/getDoctorLocations",
   deliveryMethodsUrl:"index.php/patient/getDeliveryMethods",


   //registartion
   doctorUrl:"index.php/doctor/saveUpdateDoctor",
   doctorDetailsUrl:"index.php/doctor/getDoctorDetails",
   loginCheckUrl:"index.php/authenticate/isLoggedIn",
   doctorDashUrl:"index.php/doctorDashboard/",
   logoutUrl:"index.php/authenticate/logout",

   createModifyStaffUrl:"index.php/staff/createModifyStaff",
   getStaffDetailsUrl: "index.php/staff/getStaffDetails",
   staffListingUrl: "index.php/staff/getDoctorsStaffList"

}

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



          $("#btn-programme-section-link").click(function(e){
                  e.preventDefault();

          });

            $("#create-program-for-patient-section").click(function(e){
                    e.preventDefault();
            console.log('create program for patient');
            window.location.href = controller.createProgramForPatientUrl;
            });

            $("#btn-manage-locations").click(function(e){
                    e.preventDefault();
            console.log('manage locations');
            window.location.href = controller.ManageLocationsUrl;
            });



            $("#btn-list-program-section").click(function(e){
              e.preventDefault();
              window.location.href = controller.programmeListingsUrl;
            });



            $("#patients-entry-create-section-link-Btn").click(function(e){
              e.preventDefault();
              console.log('patients Entryclick');
              window.location.href = controller.patientsEntryUrl;
            });

          $("#patients-entry-list-section-link-Btn").click(function(e){
            e.preventDefault();
            console.log('patients listing click');
            window.location.href = controller.patientsListingUrl;
          });

          $("#user-Profile-Btn-Link").click(function(e){
              e.preventDefault();
              console.log('user profile click');
              window.location.href = controller.doctorProfile;

          });

          $("#doctor-dash-logout-btn").click(function(e){
            e.preventDefault();
            console.log('logout click');
            window.location.href = controller.logoutUrl;
          });

          $("#dashboard-Section-Btn").click(function(e){
              e.preventDefault();
              window.location.href = controller.dashboardHomeUrl;
              console.log('dashboard click');
          });

          $("#book-Appointments-Section-Btn").click(function(e){
              e.preventDefault();
              window.location.href = controller.newAppointmentUrl;
          });

          $("#close-Book-Appointment-Section-Link-Btn").click(function(e){
                e.preventDefault();
                window.location.href = controller.closeAppointmentUrl;
          });

          $("#view-Appointment-Section-Link-Btn").click(function(e){
                e.preventDefault();
                window.location.href = controller.doctorsAppointmentsListUrl;
          })


        //$("#manage-Doctors-Schedule-Section-Link-Btn").attr('href', controller.listScheduleUrl);


          $("#manage-Doctors-Schedule-Section-Link-Btn").click(function(e){
              e.preventDefault();
              console.log('schedule manage click');
              window.location.href = controller.ScheduleCalendarUrl;
         });

          $("#manage-schedule-create-section-link-Btn").click(function(e){
              e.preventDefault();
              console.log('new schedule click');
              window.location.href = controller.newScheduleUrl;
          });

        //  $("#manage-schedule-list-section-link-Btn").click(function(e){
              //e.preventDefault();
              //console.log('schedule list click');
            //  window.location.href = controller.listScheduleUrl;
          //});


           $("#add-Staff-Section-Link-Btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.addStaffUrl;
           });

           $("#btn-staff-listing").click(function(e){
                e.preventDefault();
                window.location.href = controller.doctorsStaffListingUr;
           });

            $("#calendar-Template-Btn-Link").click(function(e){
                e.preventDefault();
                window.location.href = controller.CalendarTemplateUrl;
               console.log("hello hid");
            });

           $("#patients-History-Section-Link-Btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.patientsHistoryUrl;
           });


            $("#manage-schedule-list-section-link-Btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.ScheduleCalendarUrl;
           });

             $("#appointment-section-link-btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.doctorsAppointmentsListUrl;
           });
            $("#patients-Entry-Section-Link-Btn").click(function(e){
               e.preventDefault();
           });

             $("#staff-managment-section-link-btn").click(function(e){
               e.preventDefault();
           });
             $("#other-settings-section-link-btn").click(function(e){
               e.preventDefault();
           });
             $("#calendar-template-section-link-btn").click(function(e){
               e.preventDefault();
           });


           $("#analytics-side-navigation-link-btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.analyticsReportUrl;
           });

           $("#accounting-side-navigation-link-btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.accountingUrl;
           });

           $("#medicine-side-navigation-link-btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.medicineSearchUrl;
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

    //http://momentjs.com/ good help for date formatting and stuff


    var scheduleModel = {
      startDate: "",
      endDate: "",
      scheduleDaysCount: 0,
      workLocations: [],
      selectedLocation:{id:0, name:""},
      scheduleList:[]
    };

    var controller = {
      init: function(){
        this.createUpdateScheduleUrl = links.createUpdateScheduleUrl;
        this.getLocationUrl = links.getLocationUrl;
        //this.scheduleListingUrl =   links.listScheduleUrl;
        this.getScheduleCalendarUrl = links.getScheduleCalendarUrl;

        stepOneView.init();
        createScheduleView.init();

        //getting work locations for the doctor
        $.get( controller.getLocationUrl , {})
        .done(function( response ) {
          //console.log('response ' + JSON.stringify(response));
          scheduleModel.workLocations = response.data;
          stepOneView.render();
        });

      },
      updateSelectedLocation: function(id, name){
        scheduleModel.selectedLocation.id = id;
        scheduleModel.selectedLocation.name = name;

        console.log(JSON.stringify(scheduleModel.selectedLocation));
      },
      getLocationModel: function(){
        return scheduleModel.selectedLocation;
      },
      getLocationList:function(){
        return scheduleModel.workLocations;
      },
      generateModel: function(){
        var fromDateStr = stepOneView.fromDateControl.val(); //2016-05-19
        var toDateStr = stepOneView.toDateControl.val(); //2016-05-19

        var startTimeVal = stepOneView.fromTimeControl.val();
        var endTimeVal =  stepOneView.toTimeControl.val();

        //var mStartTime = moment(startTimeVal, "hh:mm A");
        //var mStartDate = moment({hours:0, minutes: 0});
        //mStartDate.minutes(scheduleItem.startTime);
        //console.log('start time: ' + startTimeVal + ' in minutes ' + mStartTime.duration());

        //date validations, cannot put previoous dates
        //cannot dates in revrese order
        //cannot make schedule for more than 60 days

        var mfromDate = moment(fromDateStr, "YYYY-MM-DD");
        var mtoDate = moment(toDateStr, "YYYY-MM-DD");

        //setting the models start and end date
        scheduleModel.startDate = mfromDate.format('DD-MM-YYYY');
        scheduleModel.endDate = mtoDate.format('DD-MM-YYYY');

        //console.log('date range from ' +  mfromDate.format('DD-MM-YYYY') + ' to ' + mtoDate.format('DD-MM-YYYY'));

        //getting the difference is dates in terms of dates
        var daysDuration =  moment.duration(mtoDate.diff(mfromDate)).asDays();
        //console.log('duration ' + daysDuration);

        scheduleModel.scheduleDaysCount = daysDuration;

        //console.log('duration :' + daysDuration);

        var weekArray = [];
        if(stepOneView.chkMon.prop('checked')){
          weekArray.push('Mon');
        }

        if(stepOneView.chkTue.prop('checked')){
          weekArray.push('Tue');
        }

        if(stepOneView.chkWed.prop('checked')){
          weekArray.push('Wed');
        }

        if(stepOneView.chkThu.prop('checked')){
          weekArray.push('Thu');
        }

        if(stepOneView.chkFri.prop('checked')){
          weekArray.push('Fri');
        }

        if(stepOneView.chkSat.prop('checked')){
          weekArray.push('Sat');
        }

        if(stepOneView.chkSun.prop('checked')){
          weekArray.push('Sun');
        }

        console.log('week array ' + weekArray);

        var mStartTime = moment(startTimeVal, "hh:mm A");
        var mEndTime = moment(endTimeVal, "hh:mm A");

        for(var j = 0; j <= daysDuration; j++){

          var schedule = {
            date: mfromDate.format('DD-MM-YYYY'),
            startTime:startTimeVal,
            endTime: endTimeVal,
            startTimeMinutes: mStartTime.hours()*60 + mStartTime.minutes(),
            endTimeMinutes: mEndTime.hours()*60 + mEndTime.minutes(),
            isBlocked: 0,
            active: 0
          };
          scheduleModel.scheduleList.push(schedule);

          var weekDay = mfromDate.format('ddd');

          if(weekArray.indexOf(weekDay)  >= 0 ){
            schedule.active = 1;
          }

          mfromDate.add(1, 'days')

        }; //date loop

      },
      getSchedule: function() {
        return scheduleModel;
      },
      saveUpdateModelRedirect: function(){


        // remove schedues which are not active


        var activeSchedulesArray = [];
        for(var i = 0; i < scheduleModel.scheduleList.length; i++){

            if(scheduleModel.scheduleList[i].active == 1){
              activeSchedulesArray.push(scheduleModel.scheduleList[i]);
            }
        }

        scheduleModel.scheduleDaysCount = activeSchedulesArray.length;
        scheduleModel.scheduleList = activeSchedulesArray;


        //console.log(JSON.stringify(scheduleModel.scheduleList));



        $.post( controller.createUpdateScheduleUrl , scheduleModel)
        .done(function( response ) {
          console.log('response ' + JSON.stringify(response));

          if(response.status == 1){
            window.location.href = controller.getScheduleCalendarUrl;
          }else{
            console.log('something is not right');
          }

          //on success redirect
          // window.location.href = controller.scheduleListingUrl;
          /*
          if(response.data.status == "-1"){
          console.log('could not add or update');
        }else if(response.data.status == "1"){
        console.log('schedules entry is added');
      }else if(response.data.status == "2"){
      console.log('schedules entry is updated');
    }*/

  });



}
};

var stepOneView = {

    init: function(){
      this.panel = $('#schedule-step-one');
      this.selectLocations = $('#sel-work-locations');
      this.fromDateControl = $('#from-date');
      this.toDateControl = $('#to-date');
      this.fromTimeControl = $('#from-time');
      this.toTimeControl = $('#to-time');

      this.fromTimeControl.val("09:00:AM");
      this.fromTimeControl.datetimepicker({
        inline: false,
        format:'LT'
      });

      this.toTimeControl.val("12:00:PM");
      this.toTimeControl.datetimepicker({
        inline: false,
        format:'LT'
      });



      //http://bootstrap-datepicker.readthedocs.io/en/latest/

      this.checkAllWeekDays = $('#chk-all-weekdays');
      this.chkMon = $('#chk-mon');
      this.chkTue = $('#chk-tue');
      this.chkWed = $('#chk-wed');
      this.chkThu = $('#chk-thu');
      this.chkFri = $('#chk-fri');
      this.chkSat = $('#chk-sat');
      this.chkSun = $('#chk-sun');

      //setting all check boxes as checked
      this.chkMon.prop('checked', true);
      this.chkTue.prop('checked', true);
      this.chkWed.prop('checked', true);
      this.chkThu.prop('checked', true);
      this.chkFri.prop('checked', true);
      this.chkSat.prop('checked', true);
      this.chkSun.prop('checked', true);

      //TODO testing code to be removed
      var currDate = moment();
      this.fromDateControl.val(currDate.format('YYYY-MM-DD'));
      currDate.add(15, 'days')
      this.toDateControl.val(currDate.format('YYYY-MM-DD'));

      $('#btn-schedule-next').on('click', (function(self){
        return function(){
          console.log('schedule next nclick');

          //updating location text in the second step
          var locationId = self.selectLocations.find(":selected").attr('value');
          var locationName = self.selectLocations.find(":selected").text();
          controller.updateSelectedLocation(locationId, locationName);

          controller.generateModel();
          self.panel.hide();
          createScheduleView.render();

        };
      })(this));

      this.checkAllWeekDays.change(function(){
        //console.log(this.checked);
        if(this.checked){
          stepOneView.chkMon.prop('checked', true);
          stepOneView.chkTue.prop('checked', true);
          stepOneView.chkWed.prop('checked', true);
          stepOneView.chkThu.prop('checked', true);
          stepOneView.chkFri.prop('checked', true);
          stepOneView.chkSat.prop('checked', true);
          stepOneView.chkSun.prop('checked', true);
        }else{
          stepOneView.chkMon.prop('checked', false);
          stepOneView.chkTue.prop('checked', false);
          stepOneView.chkWed.prop('checked', false);
          stepOneView.chkThu.prop('checked', false);
          stepOneView.chkFri.prop('checked', false);
          stepOneView.chkSat.prop('checked', false);
          stepOneView.chkSun.prop('checked', false);

        }
      });

    },
    render: function(){

      var locations = controller.getLocationList();

      for(var i = 0; i < locations.length; i++){
        var option = $('<option/>',{
          value: locations[i].id,
          text: locations[i].name
        }
      );
      this.selectLocations.append(option);

    }

  }
};

var createScheduleView = {
  init: function(){
    this.panel = $('#schedule-step-two');
    this.locationName = $('#calendar-location-name');
    this.dateHeader = $('#calander-date');

    this.tableBody = $('#table-body-schedule-calander');

    this.tableDataTemplate = $('#table-data-template');

    $('#btn-schedule-create').on('click', (function(self){
      return function(){
        console.log('schedule create click');
        controller.saveUpdateModelRedirect();
      };
    })(this));


  },
  makeTimePickersRow: function(idVal, fromInput, toInput){

    var tr =  $('<tr/>',{class: 'collapse collapse-style',
    id: idVal});

    var td = $('<tr/>',{colspan: "7"});
    tr.append(td);

    var form = $('<form/>',{class: "form-inline"});
    td.append(form);

    var div = $('<div/>',{class: "form-group"});
    form.append(div);

    var fromLabel = $('<label/>',{class: "col-sm-2 control-label", text: 'From'});
    div.append(fromLabel);
    div.append(fromInput);


    div = $('<div/>',{class: "form-group"});
    form.append(div);
    var toLabel = $('<label/>',{class: "col-sm-2 control-label", text: 'To'});
    div.append(toLabel);
    div.append(toInput);

    return tr;

    /*
    <tr  class="collapse collapse-style"  id="collapseExample1">
    <td colspan="7" >
    <form class="form-inline">

    <div class="form-group">
    <div id="datetimepicker5">
    <label class="font-18">From</label></div>
    </div>
    <div class="form-group">
    <label  class="col-sm-2 control-label">To</label>
    <input type="text" class="form-control"  id="datetimepicker6">
    </div>

    </form>

    </td>
    </tr>
    */

  },
  render: function() {
    /*
    $('#datetimepicker5').datetimepicker({
      inline: false,
      format:'LT'
    });

    $('#datetimepicker6').datetimepicker({
      inline: false,
      format:'LT'
    });
    */
    this.panel.removeClass('hidden');

    var schedule = controller.getSchedule();
    console.log('render calendar' + JSON.stringify(schedule.scheduleList));

    //setting the location text
    var location = schedule.selectedLocation;
    this.locationName.text(location.name);

    var mfromDate = moment(schedule.startDate, "DD-MM-YYYY");
    var mtoDate = moment(schedule.endDate, "DD-MM-YYYY");

    this.dateHeader.text(mfromDate.format('Do MMM YYYY') + ' to '  + mtoDate.format('Do MMM YYYY'));

    var indexCounter = 0;

    //when first day is not monday, setting the first row
    var startDay = mfromDate.format('ddd');

    if(startDay != 'Mon'){

      var blocksToAdd = mfromDate.day() - 1;

      var calanderStartDate = moment(mfromDate).subtract(blocksToAdd, 'days');

      var tr = $('<tr/>',{class: 'text-center'});

      for(var i = 0; i < blocksToAdd ; i++){

        var span =  $('<span/>',{class: 'pull-right font-16 calendar-date', text:calanderStartDate.format('Do')});
        var span1 =  $('<span/>',{class: 'label font-16 label-info', text:'No Schedule'});

        var td = $('<td/>').append(span)
        .append($('<br><br>'))
        .append(span1);

        tr.append(td);

        calanderStartDate.add(1, 'd');

      }

      var remainingCoukmnCount = 7 - blocksToAdd;

      for(var i = 0; i < remainingCoukmnCount ; i++){

        var scheduleItem = schedule.scheduleList[indexCounter];

        var date = moment(scheduleItem.date, "DD-MM-YYYY");

        var span =  $('<span/>',{class: 'pull-right font-16 calendar-date', text:date.format('Do')});

        var td = $('<td/>').append(span)
        .append($('<br><br>'));

        var isActive = scheduleItem.active;
        if(isActive == 1){
          var time = scheduleItem.startTime + ' - ' + scheduleItem.endTime;
          var span1 =  $('<span/>',{class: 'black font-10', text:time});

          span1.on('click', (function(passedOn){
            return function(){
              console.log('span click');
              //$('#collapseExample1').collapse('toggle');

              //adding timepicker dynamically
              var fromInput = $('<input/>',{type: "text", class: 'form-control', value:passedOn.item.startTime});
              var toInput = $('<input/>',{type: "text", class: 'form-control', value:passedOn.item.endTime});
              var id = 'collapsed-time-pickers';
              var tr = $('#collapsed-time-pickers');
              tr.remove();  //remove the previously added time pickers
              var timePickerTableRow = createScheduleView.makeTimePickersRow(id, fromInput, toInput);
              timePickerTableRow.insertAfter(passedOn.tableRow);
              timePickerTableRow.collapse('toggle');

              fromInput.datetimepicker({
                inline: true,
                format:'LT'
              });

              fromInput.on('dp.change', (function(passesOn){
                return function(){
                  console.log(' value' + passesOn.self.val());
                  passesOn.scheduleObj.startTime = passesOn.self.val();
                  var mStartTime = moment(passesOn.self.val(), "hh:mm A");
                  passesOn.scheduleObj.startTimeMinutes = mStartTime.hours()*60 + mStartTime.minutes();
                  //update label text
                  passesOn.label.text(passesOn.scheduleObj.startTime + ' - ' + passesOn.scheduleObj.endTime);

                }
              })({self:fromInput, scheduleObj: passedOn.item, label: passedOn.timeLabel}));


              toInput.datetimepicker({
                inline: true,
                format:'LT'
              });

              toInput.on('dp.change', (function(passesOn){
                return function(){
                  console.log(' value' + passesOn.self.val());
                  passesOn.scheduleObj.endTime = passesOn.self.val();
                  var mEndTime = moment(passesOn.self.val(), "hh:mm A");
                  passesOn.scheduleObj.endTimeMinutes = mEndTime.hours()*60 + mEndTime.minutes();
                  //update label text
                  passesOn.label.text(passesOn.scheduleObj.startTime + ' - ' + passesOn.scheduleObj.endTime);
                }
              })({self:toInput, scheduleObj: passedOn.item, label: passedOn.timeLabel}));

            }

          })({tableRow: tr, item: scheduleItem, timeLabel: span1}));

          td.append(span1);

        } else{
          var span1 =  $('<span/>',{class: 'label font-16 label-info', text:'No Schedule'});
          td.append(span1);
        }

        tr.append(td);

        mfromDate.add(1, 'd');
        ++indexCounter;

      }

      this.tableBody.append(tr);
      /*
      <td>
      <span class="pull-right font-16 calendar-date">4</span>
      <br> <br>
      <span class="label font-16 label-info"  data-toggle="collapse" href="#collapseExample1">No Schedule</span>
      </td>

      <span class="label font-16 label-danger" data-toggle="collapse" href="#collapseExample1">14:04:Am To 14:04:Am</span>
      */

    }
    //done setting  the first row


    //addin the rest of the dates
    var daysCount = schedule.scheduleList.length;
    var loopCount = Math.ceil(daysCount / 7);

    //console.log('loopcpunt' + loopCount);
    for(var i = 0; i < loopCount ; i++){

      var tr = $('<tr/>',{class: 'text-center'});

      for(var j = 0; j < 7 && indexCounter < daysCount; j++){

        var date = moment(schedule.scheduleList[indexCounter].date, "DD-MM-YYYY");
        var span =  $('<span/>',{class: 'pull-right font-16 calendar-date', text:date.format('Do')});
        var td = $('<td/>').append(span)
        .append($('<br><br>'));

        var isActive = schedule.scheduleList[indexCounter].active;
        if(isActive == 1){
          var time = scheduleItem.startTime + ' to ' + scheduleItem.endTime;
          var span1 =  $('<span/>',{class: 'label font-16 label-danger', text:time});

          span1.on('click', (function(passedOn){
            return function(){
              console.log('span click');
              //$('#collapseExample1').collapse('toggle');

              //adding timepicker dynamically
              var fromInput = $('<input/>',{type: "text", class: 'form-control', value:passedOn.item.startTime});
              var toInput = $('<input/>',{type: "text", class: 'form-control', value:passedOn.item.endTime});
              var id = 'collapsed-time-pickers';
              var tr = $('#collapsed-time-pickers');
              tr.remove();  //remove the previously added time pickers
              var timePickerTableRow = createScheduleView.makeTimePickersRow(id, fromInput, toInput);
              timePickerTableRow.insertAfter(passedOn.tableRow);
              timePickerTableRow.collapse('toggle');

              fromInput.datetimepicker({
                inline: true,
                format:'LT'
              });

              fromInput.on('dp.change', (function(passesOn){
                return function(){

                  passesOn.scheduleObj.startTime = passesOn.self.val();
                  var mStartTime = moment(passesOn.self.val(), "hh:mm A");
                  passesOn.scheduleObj.startTimeMinutes = mStartTime.hours()*60 + mStartTime.minutes();
                  //update label text
                  passesOn.label.text(passesOn.scheduleObj.startTime + ' to ' + passesOn.scheduleObj.endTime);

                  console.log(' value' + JSON.stringify(passesOn.scheduleObj));

                }
              })({self:fromInput, scheduleObj: passedOn.item, label: passedOn.timeLabel}));


              toInput.datetimepicker({
                inline: true,
                format:'LT'
              });

              toInput.on('dp.change', (function(passesOn){
                return function(){
                  console.log(' value' + passesOn.self.val());
                  passesOn.scheduleObj.endTime = passesOn.self.val();
                  var mEndTime = moment(passesOn.self.val(), "hh:mm A");
                  passesOn.scheduleObj.endTimeMinutes = mEndTime.hours()*60 + mEndTime.minutes();
                  //update label text
                  passesOn.label.text(passesOn.scheduleObj.startTime + ' to ' + passesOn.scheduleObj.endTime);
                }
              })({self:toInput, scheduleObj: passedOn.item, label: passedOn.timeLabel}));


            }

          })({tableRow: tr, item: scheduleItem, timeLabel: span1}));

          td.append(span1);
        } else{
          var span1 =  $('<span/>',{class: 'label font-16 label-info', text:'No Schedule'});
          td.append(span1);
        }

        tr.append(td);

        ++indexCounter;
      } //days of week loop

      //tr.append(td);
      this.tableBody.append(tr);

    }//week loop ends


    /*
    <td id="table-data-template" height="100">
    <span class="pull-right font-16 calendar-date">2</span>
    <br><br>
    <span class="label font-16 label-danger" data-toggle="collapse" href="#collapseExample1">14:04:Am To 14:04:Am</span>
    </td>
    */
  }
}

controller.init();

}());

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vbWVudC5qcyIsImJvb3RzdHJhcC1kYXRldGltZXBpY2tlci5taW4uanMiLCJ1dGlsaXR5LmpzIiwibGlua3MuanMiLCJkb2N0b3JEYXNoYm9hcmQuanMiLCJuZXcuc2NoZWR1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3Y4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJuZXcuc2NoZWR1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyEgbW9tZW50LmpzXHJcbi8vISB2ZXJzaW9uIDogMi4xMy4wXHJcbi8vISBhdXRob3JzIDogVGltIFdvb2QsIElza3JlbiBDaGVybmV2LCBNb21lbnQuanMgY29udHJpYnV0b3JzXHJcbi8vISBsaWNlbnNlIDogTUlUXHJcbi8vISBtb21lbnRqcy5jb21cclxuXHJcbjsoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xyXG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxyXG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcclxuICAgIGdsb2JhbC5tb21lbnQgPSBmYWN0b3J5KClcclxufSh0aGlzLCBmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgaG9va0NhbGxiYWNrO1xyXG5cclxuICAgIGZ1bmN0aW9uIHV0aWxzX2hvb2tzX19ob29rcyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGhvb2tDYWxsYmFjay5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoaXMgaXMgZG9uZSB0byByZWdpc3RlciB0aGUgbWV0aG9kIGNhbGxlZCB3aXRoIG1vbWVudCgpXHJcbiAgICAvLyB3aXRob3V0IGNyZWF0aW5nIGNpcmN1bGFyIGRlcGVuZGVuY2llcy5cclxuICAgIGZ1bmN0aW9uIHNldEhvb2tDYWxsYmFjayAoY2FsbGJhY2spIHtcclxuICAgICAgICBob29rQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0FycmF5KGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgQXJyYXkgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0RhdGUoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBEYXRlIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IERhdGVdJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYXAoYXJyLCBmbikge1xyXG4gICAgICAgIHZhciByZXMgPSBbXSwgaTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHJlcy5wdXNoKGZuKGFycltpXSwgaSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhc093blByb3AoYSwgYikge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYSwgYik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZXh0ZW5kKGEsIGIpIHtcclxuICAgICAgICBmb3IgKHZhciBpIGluIGIpIHtcclxuICAgICAgICAgICAgaWYgKGhhc093blByb3AoYiwgaSkpIHtcclxuICAgICAgICAgICAgICAgIGFbaV0gPSBiW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGFzT3duUHJvcChiLCAndG9TdHJpbmcnKSkge1xyXG4gICAgICAgICAgICBhLnRvU3RyaW5nID0gYi50b1N0cmluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoYXNPd25Qcm9wKGIsICd2YWx1ZU9mJykpIHtcclxuICAgICAgICAgICAgYS52YWx1ZU9mID0gYi52YWx1ZU9mO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlX3V0Y19fY3JlYXRlVVRDIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCkge1xyXG4gICAgICAgIHJldHVybiBjcmVhdGVMb2NhbE9yVVRDKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCB0cnVlKS51dGMoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWZhdWx0UGFyc2luZ0ZsYWdzKCkge1xyXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gZGVlcCBjbG9uZSB0aGlzIG9iamVjdC5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlbXB0eSAgICAgICAgICAgOiBmYWxzZSxcclxuICAgICAgICAgICAgdW51c2VkVG9rZW5zICAgIDogW10sXHJcbiAgICAgICAgICAgIHVudXNlZElucHV0ICAgICA6IFtdLFxyXG4gICAgICAgICAgICBvdmVyZmxvdyAgICAgICAgOiAtMixcclxuICAgICAgICAgICAgY2hhcnNMZWZ0T3ZlciAgIDogMCxcclxuICAgICAgICAgICAgbnVsbElucHV0ICAgICAgIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGludmFsaWRNb250aCAgICA6IG51bGwsXHJcbiAgICAgICAgICAgIGludmFsaWRGb3JtYXQgICA6IGZhbHNlLFxyXG4gICAgICAgICAgICB1c2VySW52YWxpZGF0ZWQgOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNvICAgICAgICAgICAgIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHBhcnNlZERhdGVQYXJ0cyA6IFtdLFxyXG4gICAgICAgICAgICBtZXJpZGllbSAgICAgICAgOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQYXJzaW5nRmxhZ3MobSkge1xyXG4gICAgICAgIGlmIChtLl9wZiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG0uX3BmID0gZGVmYXVsdFBhcnNpbmdGbGFncygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbS5fcGY7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNvbWU7XHJcbiAgICBpZiAoQXJyYXkucHJvdG90eXBlLnNvbWUpIHtcclxuICAgICAgICBzb21lID0gQXJyYXkucHJvdG90eXBlLnNvbWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNvbWUgPSBmdW5jdGlvbiAoZnVuKSB7XHJcbiAgICAgICAgICAgIHZhciB0ID0gT2JqZWN0KHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gdC5sZW5ndGggPj4+IDA7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSBpbiB0ICYmIGZ1bi5jYWxsKHRoaXMsIHRbaV0sIGksIHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkX19pc1ZhbGlkKG0pIHtcclxuICAgICAgICBpZiAobS5faXNWYWxpZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZhciBmbGFncyA9IGdldFBhcnNpbmdGbGFncyhtKTtcclxuICAgICAgICAgICAgdmFyIHBhcnNlZFBhcnRzID0gc29tZS5jYWxsKGZsYWdzLnBhcnNlZERhdGVQYXJ0cywgZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpICE9IG51bGw7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtLl9pc1ZhbGlkID0gIWlzTmFOKG0uX2QuZ2V0VGltZSgpKSAmJlxyXG4gICAgICAgICAgICAgICAgZmxhZ3Mub3ZlcmZsb3cgPCAwICYmXHJcbiAgICAgICAgICAgICAgICAhZmxhZ3MuZW1wdHkgJiZcclxuICAgICAgICAgICAgICAgICFmbGFncy5pbnZhbGlkTW9udGggJiZcclxuICAgICAgICAgICAgICAgICFmbGFncy5pbnZhbGlkV2Vla2RheSAmJlxyXG4gICAgICAgICAgICAgICAgIWZsYWdzLm51bGxJbnB1dCAmJlxyXG4gICAgICAgICAgICAgICAgIWZsYWdzLmludmFsaWRGb3JtYXQgJiZcclxuICAgICAgICAgICAgICAgICFmbGFncy51c2VySW52YWxpZGF0ZWQgJiZcclxuICAgICAgICAgICAgICAgICghZmxhZ3MubWVyaWRpZW0gfHwgKGZsYWdzLm1lcmlkaWVtICYmIHBhcnNlZFBhcnRzKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobS5fc3RyaWN0KSB7XHJcbiAgICAgICAgICAgICAgICBtLl9pc1ZhbGlkID0gbS5faXNWYWxpZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWdzLmNoYXJzTGVmdE92ZXIgPT09IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICBmbGFncy51bnVzZWRUb2tlbnMubGVuZ3RoID09PSAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZ3MuYmlnSG91ciA9PT0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtLl9pc1ZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkX19jcmVhdGVJbnZhbGlkIChmbGFncykge1xyXG4gICAgICAgIHZhciBtID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKE5hTik7XHJcbiAgICAgICAgaWYgKGZsYWdzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZXh0ZW5kKGdldFBhcnNpbmdGbGFncyhtKSwgZmxhZ3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKG0pLnVzZXJJbnZhbGlkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc1VuZGVmaW5lZChpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBpbnB1dCA9PT0gdm9pZCAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFBsdWdpbnMgdGhhdCBhZGQgcHJvcGVydGllcyBzaG91bGQgYWxzbyBhZGQgdGhlIGtleSBoZXJlIChudWxsIHZhbHVlKSxcclxuICAgIC8vIHNvIHdlIGNhbiBwcm9wZXJseSBjbG9uZSBvdXJzZWx2ZXMuXHJcbiAgICB2YXIgbW9tZW50UHJvcGVydGllcyA9IHV0aWxzX2hvb2tzX19ob29rcy5tb21lbnRQcm9wZXJ0aWVzID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gY29weUNvbmZpZyh0bywgZnJvbSkge1xyXG4gICAgICAgIHZhciBpLCBwcm9wLCB2YWw7XHJcblxyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faXNBTW9tZW50T2JqZWN0KSkge1xyXG4gICAgICAgICAgICB0by5faXNBTW9tZW50T2JqZWN0ID0gZnJvbS5faXNBTW9tZW50T2JqZWN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2kpKSB7XHJcbiAgICAgICAgICAgIHRvLl9pID0gZnJvbS5faTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9mKSkge1xyXG4gICAgICAgICAgICB0by5fZiA9IGZyb20uX2Y7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fbCkpIHtcclxuICAgICAgICAgICAgdG8uX2wgPSBmcm9tLl9sO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3N0cmljdCkpIHtcclxuICAgICAgICAgICAgdG8uX3N0cmljdCA9IGZyb20uX3N0cmljdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl90em0pKSB7XHJcbiAgICAgICAgICAgIHRvLl90em0gPSBmcm9tLl90em07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faXNVVEMpKSB7XHJcbiAgICAgICAgICAgIHRvLl9pc1VUQyA9IGZyb20uX2lzVVRDO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX29mZnNldCkpIHtcclxuICAgICAgICAgICAgdG8uX29mZnNldCA9IGZyb20uX29mZnNldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9wZikpIHtcclxuICAgICAgICAgICAgdG8uX3BmID0gZ2V0UGFyc2luZ0ZsYWdzKGZyb20pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2xvY2FsZSkpIHtcclxuICAgICAgICAgICAgdG8uX2xvY2FsZSA9IGZyb20uX2xvY2FsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtb21lbnRQcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChpIGluIG1vbWVudFByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgICAgIHByb3AgPSBtb21lbnRQcm9wZXJ0aWVzW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gZnJvbVtwcm9wXTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNVbmRlZmluZWQodmFsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdG87XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHVwZGF0ZUluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBNb21lbnQgcHJvdG90eXBlIG9iamVjdFxyXG4gICAgZnVuY3Rpb24gTW9tZW50KGNvbmZpZykge1xyXG4gICAgICAgIGNvcHlDb25maWcodGhpcywgY29uZmlnKTtcclxuICAgICAgICB0aGlzLl9kID0gbmV3IERhdGUoY29uZmlnLl9kICE9IG51bGwgPyBjb25maWcuX2QuZ2V0VGltZSgpIDogTmFOKTtcclxuICAgICAgICAvLyBQcmV2ZW50IGluZmluaXRlIGxvb3AgaW4gY2FzZSB1cGRhdGVPZmZzZXQgY3JlYXRlcyBuZXcgbW9tZW50XHJcbiAgICAgICAgLy8gb2JqZWN0cy5cclxuICAgICAgICBpZiAodXBkYXRlSW5Qcm9ncmVzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdXBkYXRlSW5Qcm9ncmVzcyA9IHRydWU7XHJcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQodGhpcyk7XHJcbiAgICAgICAgICAgIHVwZGF0ZUluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNNb21lbnQgKG9iaikge1xyXG4gICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBNb21lbnQgfHwgKG9iaiAhPSBudWxsICYmIG9iai5faXNBTW9tZW50T2JqZWN0ICE9IG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFic0Zsb29yIChudW1iZXIpIHtcclxuICAgICAgICBpZiAobnVtYmVyIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKG51bWJlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtYmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9JbnQoYXJndW1lbnRGb3JDb2VyY2lvbikge1xyXG4gICAgICAgIHZhciBjb2VyY2VkTnVtYmVyID0gK2FyZ3VtZW50Rm9yQ29lcmNpb24sXHJcbiAgICAgICAgICAgIHZhbHVlID0gMDtcclxuXHJcbiAgICAgICAgaWYgKGNvZXJjZWROdW1iZXIgIT09IDAgJiYgaXNGaW5pdGUoY29lcmNlZE51bWJlcikpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBhYnNGbG9vcihjb2VyY2VkTnVtYmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb21wYXJlIHR3byBhcnJheXMsIHJldHVybiB0aGUgbnVtYmVyIG9mIGRpZmZlcmVuY2VzXHJcbiAgICBmdW5jdGlvbiBjb21wYXJlQXJyYXlzKGFycmF5MSwgYXJyYXkyLCBkb250Q29udmVydCkge1xyXG4gICAgICAgIHZhciBsZW4gPSBNYXRoLm1pbihhcnJheTEubGVuZ3RoLCBhcnJheTIubGVuZ3RoKSxcclxuICAgICAgICAgICAgbGVuZ3RoRGlmZiA9IE1hdGguYWJzKGFycmF5MS5sZW5ndGggLSBhcnJheTIubGVuZ3RoKSxcclxuICAgICAgICAgICAgZGlmZnMgPSAwLFxyXG4gICAgICAgICAgICBpO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoKGRvbnRDb252ZXJ0ICYmIGFycmF5MVtpXSAhPT0gYXJyYXkyW2ldKSB8fFxyXG4gICAgICAgICAgICAgICAgKCFkb250Q29udmVydCAmJiB0b0ludChhcnJheTFbaV0pICE9PSB0b0ludChhcnJheTJbaV0pKSkge1xyXG4gICAgICAgICAgICAgICAgZGlmZnMrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGlmZnMgKyBsZW5ndGhEaWZmO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdhcm4obXNnKSB7XHJcbiAgICAgICAgaWYgKHV0aWxzX2hvb2tzX19ob29rcy5zdXBwcmVzc0RlcHJlY2F0aW9uV2FybmluZ3MgPT09IGZhbHNlICYmXHJcbiAgICAgICAgICAgICAgICAodHlwZW9mIGNvbnNvbGUgIT09ICAndW5kZWZpbmVkJykgJiYgY29uc29sZS53YXJuKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignRGVwcmVjYXRpb24gd2FybmluZzogJyArIG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlcHJlY2F0ZShtc2csIGZuKSB7XHJcbiAgICAgICAgdmFyIGZpcnN0VGltZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHJldHVybiBleHRlbmQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodXRpbHNfaG9va3NfX2hvb2tzLmRlcHJlY2F0aW9uSGFuZGxlciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MuZGVwcmVjYXRpb25IYW5kbGVyKG51bGwsIG1zZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGZpcnN0VGltZSkge1xyXG4gICAgICAgICAgICAgICAgd2Fybihtc2cgKyAnXFxuQXJndW1lbnRzOiAnICsgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5qb2luKCcsICcpICsgJ1xcbicgKyAobmV3IEVycm9yKCkpLnN0YWNrKTtcclxuICAgICAgICAgICAgICAgIGZpcnN0VGltZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH0sIGZuKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVwcmVjYXRpb25zID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gZGVwcmVjYXRlU2ltcGxlKG5hbWUsIG1zZykge1xyXG4gICAgICAgIGlmICh1dGlsc19ob29rc19faG9va3MuZGVwcmVjYXRpb25IYW5kbGVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLmRlcHJlY2F0aW9uSGFuZGxlcihuYW1lLCBtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRlcHJlY2F0aW9uc1tuYW1lXSkge1xyXG4gICAgICAgICAgICB3YXJuKG1zZyk7XHJcbiAgICAgICAgICAgIGRlcHJlY2F0aW9uc1tuYW1lXSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5zdXBwcmVzc0RlcHJlY2F0aW9uV2FybmluZ3MgPSBmYWxzZTtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5kZXByZWNhdGlvbkhhbmRsZXIgPSBudWxsO1xyXG5cclxuICAgIGZ1bmN0aW9uIGlzRnVuY3Rpb24oaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBGdW5jdGlvbiB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzT2JqZWN0KGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxvY2FsZV9zZXRfX3NldCAoY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHByb3AsIGk7XHJcbiAgICAgICAgZm9yIChpIGluIGNvbmZpZykge1xyXG4gICAgICAgICAgICBwcm9wID0gY29uZmlnW2ldO1xyXG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpc1tpXSA9IHByb3A7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzWydfJyArIGldID0gcHJvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgLy8gTGVuaWVudCBvcmRpbmFsIHBhcnNpbmcgYWNjZXB0cyBqdXN0IGEgbnVtYmVyIGluIGFkZGl0aW9uIHRvXHJcbiAgICAgICAgLy8gbnVtYmVyICsgKHBvc3NpYmx5KSBzdHVmZiBjb21pbmcgZnJvbSBfb3JkaW5hbFBhcnNlTGVuaWVudC5cclxuICAgICAgICB0aGlzLl9vcmRpbmFsUGFyc2VMZW5pZW50ID0gbmV3IFJlZ0V4cCh0aGlzLl9vcmRpbmFsUGFyc2Uuc291cmNlICsgJ3wnICsgKC9cXGR7MSwyfS8pLnNvdXJjZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWVyZ2VDb25maWdzKHBhcmVudENvbmZpZywgY2hpbGRDb25maWcpIHtcclxuICAgICAgICB2YXIgcmVzID0gZXh0ZW5kKHt9LCBwYXJlbnRDb25maWcpLCBwcm9wO1xyXG4gICAgICAgIGZvciAocHJvcCBpbiBjaGlsZENvbmZpZykge1xyXG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChjaGlsZENvbmZpZywgcHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc09iamVjdChwYXJlbnRDb25maWdbcHJvcF0pICYmIGlzT2JqZWN0KGNoaWxkQ29uZmlnW3Byb3BdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc1twcm9wXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGV4dGVuZChyZXNbcHJvcF0sIHBhcmVudENvbmZpZ1twcm9wXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5kKHJlc1twcm9wXSwgY2hpbGRDb25maWdbcHJvcF0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGlsZENvbmZpZ1twcm9wXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzW3Byb3BdID0gY2hpbGRDb25maWdbcHJvcF07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZXNbcHJvcF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBMb2NhbGUoY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBrZXlzO1xyXG5cclxuICAgIGlmIChPYmplY3Qua2V5cykge1xyXG4gICAgICAgIGtleXMgPSBPYmplY3Qua2V5cztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAga2V5cyA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgdmFyIGksIHJlcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFzT3duUHJvcChvYmosIGkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGludGVybmFsIHN0b3JhZ2UgZm9yIGxvY2FsZSBjb25maWcgZmlsZXNcclxuICAgIHZhciBsb2NhbGVzID0ge307XHJcbiAgICB2YXIgZ2xvYmFsTG9jYWxlO1xyXG5cclxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZUxvY2FsZShrZXkpIHtcclxuICAgICAgICByZXR1cm4ga2V5ID8ga2V5LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnXycsICctJykgOiBrZXk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcGljayB0aGUgbG9jYWxlIGZyb20gdGhlIGFycmF5XHJcbiAgICAvLyB0cnkgWydlbi1hdScsICdlbi1nYiddIGFzICdlbi1hdScsICdlbi1nYicsICdlbicsIGFzIGluIG1vdmUgdGhyb3VnaCB0aGUgbGlzdCB0cnlpbmcgZWFjaFxyXG4gICAgLy8gc3Vic3RyaW5nIGZyb20gbW9zdCBzcGVjaWZpYyB0byBsZWFzdCwgYnV0IG1vdmUgdG8gdGhlIG5leHQgYXJyYXkgaXRlbSBpZiBpdCdzIGEgbW9yZSBzcGVjaWZpYyB2YXJpYW50IHRoYW4gdGhlIGN1cnJlbnQgcm9vdFxyXG4gICAgZnVuY3Rpb24gY2hvb3NlTG9jYWxlKG5hbWVzKSB7XHJcbiAgICAgICAgdmFyIGkgPSAwLCBqLCBuZXh0LCBsb2NhbGUsIHNwbGl0O1xyXG5cclxuICAgICAgICB3aGlsZSAoaSA8IG5hbWVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzcGxpdCA9IG5vcm1hbGl6ZUxvY2FsZShuYW1lc1tpXSkuc3BsaXQoJy0nKTtcclxuICAgICAgICAgICAgaiA9IHNwbGl0Lmxlbmd0aDtcclxuICAgICAgICAgICAgbmV4dCA9IG5vcm1hbGl6ZUxvY2FsZShuYW1lc1tpICsgMV0pO1xyXG4gICAgICAgICAgICBuZXh0ID0gbmV4dCA/IG5leHQuc3BsaXQoJy0nKSA6IG51bGw7XHJcbiAgICAgICAgICAgIHdoaWxlIChqID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxlID0gbG9hZExvY2FsZShzcGxpdC5zbGljZSgwLCBqKS5qb2luKCctJykpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dCAmJiBuZXh0Lmxlbmd0aCA+PSBqICYmIGNvbXBhcmVBcnJheXMoc3BsaXQsIG5leHQsIHRydWUpID49IGogLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGUgbmV4dCBhcnJheSBpdGVtIGlzIGJldHRlciB0aGFuIGEgc2hhbGxvd2VyIHN1YnN0cmluZyBvZiB0aGlzIG9uZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgai0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZExvY2FsZShuYW1lKSB7XHJcbiAgICAgICAgdmFyIG9sZExvY2FsZSA9IG51bGw7XHJcbiAgICAgICAgLy8gVE9ETzogRmluZCBhIGJldHRlciB3YXkgdG8gcmVnaXN0ZXIgYW5kIGxvYWQgYWxsIHRoZSBsb2NhbGVzIGluIE5vZGVcclxuICAgICAgICBpZiAoIWxvY2FsZXNbbmFtZV0gJiYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSAmJlxyXG4gICAgICAgICAgICAgICAgbW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBvbGRMb2NhbGUgPSBnbG9iYWxMb2NhbGUuX2FiYnI7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlKCcuL2xvY2FsZS8nICsgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBiZWNhdXNlIGRlZmluZUxvY2FsZSBjdXJyZW50bHkgYWxzbyBzZXRzIHRoZSBnbG9iYWwgbG9jYWxlLCB3ZVxyXG4gICAgICAgICAgICAgICAgLy8gd2FudCB0byB1bmRvIHRoYXQgZm9yIGxhenkgbG9hZGVkIGxvY2FsZXNcclxuICAgICAgICAgICAgICAgIGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGUob2xkTG9jYWxlKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkgeyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoaXMgZnVuY3Rpb24gd2lsbCBsb2FkIGxvY2FsZSBhbmQgdGhlbiBzZXQgdGhlIGdsb2JhbCBsb2NhbGUuICBJZlxyXG4gICAgLy8gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWQgaW4sIGl0IHdpbGwgc2ltcGx5IHJldHVybiB0aGUgY3VycmVudCBnbG9iYWxcclxuICAgIC8vIGxvY2FsZSBrZXkuXHJcbiAgICBmdW5jdGlvbiBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlIChrZXksIHZhbHVlcykge1xyXG4gICAgICAgIHZhciBkYXRhO1xyXG4gICAgICAgIGlmIChrZXkpIHtcclxuICAgICAgICAgICAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlcykpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gZGVmaW5lTG9jYWxlKGtleSwgdmFsdWVzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vIG1vbWVudC5kdXJhdGlvbi5fbG9jYWxlID0gbW9tZW50Ll9sb2NhbGUgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsTG9jYWxlID0gZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbExvY2FsZS5fYWJicjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWZpbmVMb2NhbGUgKG5hbWUsIGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgY29uZmlnLmFiYnIgPSBuYW1lO1xyXG4gICAgICAgICAgICBpZiAobG9jYWxlc1tuYW1lXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBkZXByZWNhdGVTaW1wbGUoJ2RlZmluZUxvY2FsZU92ZXJyaWRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VzZSBtb21lbnQudXBkYXRlTG9jYWxlKGxvY2FsZU5hbWUsIGNvbmZpZykgdG8gY2hhbmdlICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYW4gZXhpc3RpbmcgbG9jYWxlLiBtb21lbnQuZGVmaW5lTG9jYWxlKGxvY2FsZU5hbWUsICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29uZmlnKSBzaG91bGQgb25seSBiZSB1c2VkIGZvciBjcmVhdGluZyBhIG5ldyBsb2NhbGUnKTtcclxuICAgICAgICAgICAgICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlncyhsb2NhbGVzW25hbWVdLl9jb25maWcsIGNvbmZpZyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLnBhcmVudExvY2FsZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxlc1tjb25maWcucGFyZW50TG9jYWxlXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gbWVyZ2VDb25maWdzKGxvY2FsZXNbY29uZmlnLnBhcmVudExvY2FsZV0uX2NvbmZpZywgY29uZmlnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdHJlYXQgYXMgaWYgdGhlcmUgaXMgbm8gYmFzZSBjb25maWdcclxuICAgICAgICAgICAgICAgICAgICBkZXByZWNhdGVTaW1wbGUoJ3BhcmVudExvY2FsZVVuZGVmaW5lZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3BlY2lmaWVkIHBhcmVudExvY2FsZSBpcyBub3QgZGVmaW5lZCB5ZXQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbmV3IExvY2FsZShjb25maWcpO1xyXG5cclxuICAgICAgICAgICAgLy8gYmFja3dhcmRzIGNvbXBhdCBmb3Igbm93OiBhbHNvIHNldCB0aGUgbG9jYWxlXHJcbiAgICAgICAgICAgIGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGUobmFtZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlc1tuYW1lXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB1c2VmdWwgZm9yIHRlc3RpbmdcclxuICAgICAgICAgICAgZGVsZXRlIGxvY2FsZXNbbmFtZV07XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVMb2NhbGUobmFtZSwgY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZhciBsb2NhbGU7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlncyhsb2NhbGVzW25hbWVdLl9jb25maWcsIGNvbmZpZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbG9jYWxlID0gbmV3IExvY2FsZShjb25maWcpO1xyXG4gICAgICAgICAgICBsb2NhbGUucGFyZW50TG9jYWxlID0gbG9jYWxlc1tuYW1lXTtcclxuICAgICAgICAgICAgbG9jYWxlc1tuYW1lXSA9IGxvY2FsZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGJhY2t3YXJkcyBjb21wYXQgZm9yIG5vdzogYWxzbyBzZXQgdGhlIGxvY2FsZVxyXG4gICAgICAgICAgICBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlKG5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHBhc3MgbnVsbCBmb3IgY29uZmlnIHRvIHVudXBkYXRlLCB1c2VmdWwgZm9yIHRlc3RzXHJcbiAgICAgICAgICAgIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsb2NhbGVzW25hbWVdLnBhcmVudExvY2FsZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxlc1tuYW1lXSA9IGxvY2FsZXNbbmFtZV0ucGFyZW50TG9jYWxlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgbG9jYWxlc1tuYW1lXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbG9jYWxlc1tuYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXR1cm5zIGxvY2FsZSBkYXRhXHJcbiAgICBmdW5jdGlvbiBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlIChrZXkpIHtcclxuICAgICAgICB2YXIgbG9jYWxlO1xyXG5cclxuICAgICAgICBpZiAoa2V5ICYmIGtleS5fbG9jYWxlICYmIGtleS5fbG9jYWxlLl9hYmJyKSB7XHJcbiAgICAgICAgICAgIGtleSA9IGtleS5fbG9jYWxlLl9hYmJyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbExvY2FsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaXNBcnJheShrZXkpKSB7XHJcbiAgICAgICAgICAgIC8vc2hvcnQtY2lyY3VpdCBldmVyeXRoaW5nIGVsc2VcclxuICAgICAgICAgICAgbG9jYWxlID0gbG9hZExvY2FsZShrZXkpO1xyXG4gICAgICAgICAgICBpZiAobG9jYWxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGtleSA9IFtrZXldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNob29zZUxvY2FsZShrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxvY2FsZV9sb2NhbGVzX19saXN0TG9jYWxlcygpIHtcclxuICAgICAgICByZXR1cm4ga2V5cyhsb2NhbGVzKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYWxpYXNlcyA9IHt9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFVuaXRBbGlhcyAodW5pdCwgc2hvcnRoYW5kKSB7XHJcbiAgICAgICAgdmFyIGxvd2VyQ2FzZSA9IHVuaXQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBhbGlhc2VzW2xvd2VyQ2FzZV0gPSBhbGlhc2VzW2xvd2VyQ2FzZSArICdzJ10gPSBhbGlhc2VzW3Nob3J0aGFuZF0gPSB1bml0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZVVuaXRzKHVuaXRzKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB1bml0cyA9PT0gJ3N0cmluZycgPyBhbGlhc2VzW3VuaXRzXSB8fCBhbGlhc2VzW3VuaXRzLnRvTG93ZXJDYXNlKCldIDogdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZU9iamVjdFVuaXRzKGlucHV0T2JqZWN0KSB7XHJcbiAgICAgICAgdmFyIG5vcm1hbGl6ZWRJbnB1dCA9IHt9LFxyXG4gICAgICAgICAgICBub3JtYWxpemVkUHJvcCxcclxuICAgICAgICAgICAgcHJvcDtcclxuXHJcbiAgICAgICAgZm9yIChwcm9wIGluIGlucHV0T2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKGlucHV0T2JqZWN0LCBwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZFByb3AgPSBub3JtYWxpemVVbml0cyhwcm9wKTtcclxuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkUHJvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRJbnB1dFtub3JtYWxpemVkUHJvcF0gPSBpbnB1dE9iamVjdFtwcm9wXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRJbnB1dDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYWtlR2V0U2V0ICh1bml0LCBrZWVwVGltZSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGdldF9zZXRfX3NldCh0aGlzLCB1bml0LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIGtlZXBUaW1lKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldF9zZXRfX2dldCh0aGlzLCB1bml0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0X3NldF9fZ2V0IChtb20sIHVuaXQpIHtcclxuICAgICAgICByZXR1cm4gbW9tLmlzVmFsaWQoKSA/XHJcbiAgICAgICAgICAgIG1vbS5fZFsnZ2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyB1bml0XSgpIDogTmFOO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldF9zZXRfX3NldCAobW9tLCB1bml0LCB2YWx1ZSkge1xyXG4gICAgICAgIGlmIChtb20uaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIG1vbS5fZFsnc2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyB1bml0XSh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXQgKHVuaXRzLCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciB1bml0O1xyXG4gICAgICAgIGlmICh0eXBlb2YgdW5pdHMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGZvciAodW5pdCBpbiB1bml0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQodW5pdCwgdW5pdHNbdW5pdF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XHJcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXNbdW5pdHNdKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbdW5pdHNdKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB6ZXJvRmlsbChudW1iZXIsIHRhcmdldExlbmd0aCwgZm9yY2VTaWduKSB7XHJcbiAgICAgICAgdmFyIGFic051bWJlciA9ICcnICsgTWF0aC5hYnMobnVtYmVyKSxcclxuICAgICAgICAgICAgemVyb3NUb0ZpbGwgPSB0YXJnZXRMZW5ndGggLSBhYnNOdW1iZXIubGVuZ3RoLFxyXG4gICAgICAgICAgICBzaWduID0gbnVtYmVyID49IDA7XHJcbiAgICAgICAgcmV0dXJuIChzaWduID8gKGZvcmNlU2lnbiA/ICcrJyA6ICcnKSA6ICctJykgK1xyXG4gICAgICAgICAgICBNYXRoLnBvdygxMCwgTWF0aC5tYXgoMCwgemVyb3NUb0ZpbGwpKS50b1N0cmluZygpLnN1YnN0cigxKSArIGFic051bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZm9ybWF0dGluZ1Rva2VucyA9IC8oXFxbW15cXFtdKlxcXSl8KFxcXFwpPyhbSGhdbW0oc3MpP3xNb3xNTT9NP00/fERvfERERG98REQ/RD9EP3xkZGQ/ZD98ZG8/fHdbb3x3XT98V1tvfFddP3xRbz98WVlZWVlZfFlZWVlZfFlZWVl8WVl8Z2coZ2dnPyk/fEdHKEdHRz8pP3xlfEV8YXxBfGhoP3xISD98a2s/fG1tP3xzcz98U3sxLDl9fHh8WHx6ej98Wlo/fC4pL2c7XHJcblxyXG4gICAgdmFyIGxvY2FsRm9ybWF0dGluZ1Rva2VucyA9IC8oXFxbW15cXFtdKlxcXSl8KFxcXFwpPyhMVFN8TFR8TEw/TD9MP3xsezEsNH0pL2c7XHJcblxyXG4gICAgdmFyIGZvcm1hdEZ1bmN0aW9ucyA9IHt9O1xyXG5cclxuICAgIHZhciBmb3JtYXRUb2tlbkZ1bmN0aW9ucyA9IHt9O1xyXG5cclxuICAgIC8vIHRva2VuOiAgICAnTSdcclxuICAgIC8vIHBhZGRlZDogICBbJ01NJywgMl1cclxuICAgIC8vIG9yZGluYWw6ICAnTW8nXHJcbiAgICAvLyBjYWxsYmFjazogZnVuY3Rpb24gKCkgeyB0aGlzLm1vbnRoKCkgKyAxIH1cclxuICAgIGZ1bmN0aW9uIGFkZEZvcm1hdFRva2VuICh0b2tlbiwgcGFkZGVkLCBvcmRpbmFsLCBjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBmdW5jID0gY2FsbGJhY2s7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgZnVuYyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW2NhbGxiYWNrXSgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICAgICAgZm9ybWF0VG9rZW5GdW5jdGlvbnNbdG9rZW5dID0gZnVuYztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhZGRlZCkge1xyXG4gICAgICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1twYWRkZWRbMF1dID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHplcm9GaWxsKGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgcGFkZGVkWzFdLCBwYWRkZWRbMl0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3JkaW5hbCkge1xyXG4gICAgICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1tvcmRpbmFsXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5vcmRpbmFsKGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgdG9rZW4pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVGb3JtYXR0aW5nVG9rZW5zKGlucHV0KSB7XHJcbiAgICAgICAgaWYgKGlucHV0Lm1hdGNoKC9cXFtbXFxzXFxTXS8pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9eXFxbfFxcXSQvZywgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXFxcXC9nLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWFrZUZvcm1hdEZ1bmN0aW9uKGZvcm1hdCkge1xyXG4gICAgICAgIHZhciBhcnJheSA9IGZvcm1hdC5tYXRjaChmb3JtYXR0aW5nVG9rZW5zKSwgaSwgbGVuZ3RoO1xyXG5cclxuICAgICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZm9ybWF0VG9rZW5GdW5jdGlvbnNbYXJyYXlbaV1dKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJheVtpXSA9IGZvcm1hdFRva2VuRnVuY3Rpb25zW2FycmF5W2ldXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gcmVtb3ZlRm9ybWF0dGluZ1Rva2VucyhhcnJheVtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobW9tKSB7XHJcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSAnJywgaTtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gYXJyYXlbaV0gaW5zdGFuY2VvZiBGdW5jdGlvbiA/IGFycmF5W2ldLmNhbGwobW9tLCBmb3JtYXQpIDogYXJyYXlbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZvcm1hdCBkYXRlIHVzaW5nIG5hdGl2ZSBkYXRlIG9iamVjdFxyXG4gICAgZnVuY3Rpb24gZm9ybWF0TW9tZW50KG0sIGZvcm1hdCkge1xyXG4gICAgICAgIGlmICghbS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG0ubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3JtYXQgPSBleHBhbmRGb3JtYXQoZm9ybWF0LCBtLmxvY2FsZURhdGEoKSk7XHJcbiAgICAgICAgZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0gPSBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XSB8fCBtYWtlRm9ybWF0RnVuY3Rpb24oZm9ybWF0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdEZ1bmN0aW9uc1tmb3JtYXRdKG0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGV4cGFuZEZvcm1hdChmb3JtYXQsIGxvY2FsZSkge1xyXG4gICAgICAgIHZhciBpID0gNTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZUxvbmdEYXRlRm9ybWF0VG9rZW5zKGlucHV0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGUubG9uZ0RhdGVGb3JtYXQoaW5wdXQpIHx8IGlucHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLmxhc3RJbmRleCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGkgPj0gMCAmJiBsb2NhbEZvcm1hdHRpbmdUb2tlbnMudGVzdChmb3JtYXQpKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKGxvY2FsRm9ybWF0dGluZ1Rva2VucywgcmVwbGFjZUxvbmdEYXRlRm9ybWF0VG9rZW5zKTtcclxuICAgICAgICAgICAgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLmxhc3RJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIGkgLT0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG1hdGNoMSAgICAgICAgID0gL1xcZC87ICAgICAgICAgICAgLy8gICAgICAgMCAtIDlcclxuICAgIHZhciBtYXRjaDIgICAgICAgICA9IC9cXGRcXGQvOyAgICAgICAgICAvLyAgICAgIDAwIC0gOTlcclxuICAgIHZhciBtYXRjaDMgICAgICAgICA9IC9cXGR7M30vOyAgICAgICAgIC8vICAgICAwMDAgLSA5OTlcclxuICAgIHZhciBtYXRjaDQgICAgICAgICA9IC9cXGR7NH0vOyAgICAgICAgIC8vICAgIDAwMDAgLSA5OTk5XHJcbiAgICB2YXIgbWF0Y2g2ICAgICAgICAgPSAvWystXT9cXGR7Nn0vOyAgICAvLyAtOTk5OTk5IC0gOTk5OTk5XHJcbiAgICB2YXIgbWF0Y2gxdG8yICAgICAgPSAvXFxkXFxkPy87ICAgICAgICAgLy8gICAgICAgMCAtIDk5XHJcbiAgICB2YXIgbWF0Y2gzdG80ICAgICAgPSAvXFxkXFxkXFxkXFxkPy87ICAgICAvLyAgICAgOTk5IC0gOTk5OVxyXG4gICAgdmFyIG1hdGNoNXRvNiAgICAgID0gL1xcZFxcZFxcZFxcZFxcZFxcZD8vOyAvLyAgIDk5OTk5IC0gOTk5OTk5XHJcbiAgICB2YXIgbWF0Y2gxdG8zICAgICAgPSAvXFxkezEsM30vOyAgICAgICAvLyAgICAgICAwIC0gOTk5XHJcbiAgICB2YXIgbWF0Y2gxdG80ICAgICAgPSAvXFxkezEsNH0vOyAgICAgICAvLyAgICAgICAwIC0gOTk5OVxyXG4gICAgdmFyIG1hdGNoMXRvNiAgICAgID0gL1srLV0/XFxkezEsNn0vOyAgLy8gLTk5OTk5OSAtIDk5OTk5OVxyXG5cclxuICAgIHZhciBtYXRjaFVuc2lnbmVkICA9IC9cXGQrLzsgICAgICAgICAgIC8vICAgICAgIDAgLSBpbmZcclxuICAgIHZhciBtYXRjaFNpZ25lZCAgICA9IC9bKy1dP1xcZCsvOyAgICAgIC8vICAgIC1pbmYgLSBpbmZcclxuXHJcbiAgICB2YXIgbWF0Y2hPZmZzZXQgICAgPSAvWnxbKy1dXFxkXFxkOj9cXGRcXGQvZ2k7IC8vICswMDowMCAtMDA6MDAgKzAwMDAgLTAwMDAgb3IgWlxyXG4gICAgdmFyIG1hdGNoU2hvcnRPZmZzZXQgPSAvWnxbKy1dXFxkXFxkKD86Oj9cXGRcXGQpPy9naTsgLy8gKzAwIC0wMCArMDA6MDAgLTAwOjAwICswMDAwIC0wMDAwIG9yIFpcclxuXHJcbiAgICB2YXIgbWF0Y2hUaW1lc3RhbXAgPSAvWystXT9cXGQrKFxcLlxcZHsxLDN9KT8vOyAvLyAxMjM0NTY3ODkgMTIzNDU2Nzg5LjEyM1xyXG5cclxuICAgIC8vIGFueSB3b3JkIChvciB0d28pIGNoYXJhY3RlcnMgb3IgbnVtYmVycyBpbmNsdWRpbmcgdHdvL3RocmVlIHdvcmQgbW9udGggaW4gYXJhYmljLlxyXG4gICAgLy8gaW5jbHVkZXMgc2NvdHRpc2ggZ2FlbGljIHR3byB3b3JkIGFuZCBoeXBoZW5hdGVkIG1vbnRoc1xyXG4gICAgdmFyIG1hdGNoV29yZCA9IC9bMC05XSpbJ2EtelxcdTAwQTAtXFx1MDVGRlxcdTA3MDAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0rfFtcXHUwNjAwLVxcdTA2RkZcXC9dKyhcXHMqP1tcXHUwNjAwLVxcdTA2RkZdKyl7MSwyfS9pO1xyXG5cclxuXHJcbiAgICB2YXIgcmVnZXhlcyA9IHt9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFJlZ2V4VG9rZW4gKHRva2VuLCByZWdleCwgc3RyaWN0UmVnZXgpIHtcclxuICAgICAgICByZWdleGVzW3Rva2VuXSA9IGlzRnVuY3Rpb24ocmVnZXgpID8gcmVnZXggOiBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZURhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpc1N0cmljdCAmJiBzdHJpY3RSZWdleCkgPyBzdHJpY3RSZWdleCA6IHJlZ2V4O1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UGFyc2VSZWdleEZvclRva2VuICh0b2tlbiwgY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHJlZ2V4ZXMsIHRva2VuKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCh1bmVzY2FwZUZvcm1hdCh0b2tlbikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlZ2V4ZXNbdG9rZW5dKGNvbmZpZy5fc3RyaWN0LCBjb25maWcuX2xvY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29kZSBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzU2MTQ5My9pcy10aGVyZS1hLXJlZ2V4cC1lc2NhcGUtZnVuY3Rpb24taW4tamF2YXNjcmlwdFxyXG4gICAgZnVuY3Rpb24gdW5lc2NhcGVGb3JtYXQocykge1xyXG4gICAgICAgIHJldHVybiByZWdleEVzY2FwZShzLnJlcGxhY2UoJ1xcXFwnLCAnJykucmVwbGFjZSgvXFxcXChcXFspfFxcXFwoXFxdKXxcXFsoW15cXF1cXFtdKilcXF18XFxcXCguKS9nLCBmdW5jdGlvbiAobWF0Y2hlZCwgcDEsIHAyLCBwMywgcDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHAxIHx8IHAyIHx8IHAzIHx8IHA0O1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWdleEVzY2FwZShzKSB7XHJcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZSgvWy1cXC9cXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRva2VucyA9IHt9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFBhcnNlVG9rZW4gKHRva2VuLCBjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBpLCBmdW5jID0gY2FsbGJhY2s7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdG9rZW4gPSBbdG9rZW5dO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBmdW5jID0gZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xyXG4gICAgICAgICAgICAgICAgYXJyYXlbY2FsbGJhY2tdID0gdG9JbnQoaW5wdXQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdG9rZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdG9rZW5zW3Rva2VuW2ldXSA9IGZ1bmM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFdlZWtQYXJzZVRva2VuICh0b2tlbiwgY2FsbGJhY2spIHtcclxuICAgICAgICBhZGRQYXJzZVRva2VuKHRva2VuLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcsIHRva2VuKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fdyA9IGNvbmZpZy5fdyB8fCB7fTtcclxuICAgICAgICAgICAgY2FsbGJhY2soaW5wdXQsIGNvbmZpZy5fdywgY29uZmlnLCB0b2tlbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkVGltZVRvQXJyYXlGcm9tVG9rZW4odG9rZW4sIGlucHV0LCBjb25maWcpIHtcclxuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCAmJiBoYXNPd25Qcm9wKHRva2VucywgdG9rZW4pKSB7XHJcbiAgICAgICAgICAgIHRva2Vuc1t0b2tlbl0oaW5wdXQsIGNvbmZpZy5fYSwgY29uZmlnLCB0b2tlbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBZRUFSID0gMDtcclxuICAgIHZhciBNT05USCA9IDE7XHJcbiAgICB2YXIgREFURSA9IDI7XHJcbiAgICB2YXIgSE9VUiA9IDM7XHJcbiAgICB2YXIgTUlOVVRFID0gNDtcclxuICAgIHZhciBTRUNPTkQgPSA1O1xyXG4gICAgdmFyIE1JTExJU0VDT05EID0gNjtcclxuICAgIHZhciBXRUVLID0gNztcclxuICAgIHZhciBXRUVLREFZID0gODtcclxuXHJcbiAgICB2YXIgaW5kZXhPZjtcclxuXHJcbiAgICBpZiAoQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcclxuICAgICAgICBpbmRleE9mID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2Y7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGluZGV4T2YgPSBmdW5jdGlvbiAobykge1xyXG4gICAgICAgICAgICAvLyBJIGtub3dcclxuICAgICAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpc1tpXSA9PT0gbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRheXNJbk1vbnRoKHllYXIsIG1vbnRoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoICsgMSwgMCkpLmdldFVUQ0RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ00nLCBbJ01NJywgMl0sICdNbycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb250aCgpICsgMTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdNTU0nLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm1vbnRoc1Nob3J0KHRoaXMsIGZvcm1hdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignTU1NTScsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzKHRoaXMsIGZvcm1hdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBTElBU0VTXHJcblxyXG4gICAgYWRkVW5pdEFsaWFzKCdtb250aCcsICdNJyk7XHJcblxyXG4gICAgLy8gUEFSU0lOR1xyXG5cclxuICAgIGFkZFJlZ2V4VG9rZW4oJ00nLCAgICBtYXRjaDF0bzIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignTU0nLCAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ01NTScsICBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbGUubW9udGhzU2hvcnRSZWdleChpc1N0cmljdCk7XHJcbiAgICB9KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ01NTU0nLCBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbGUubW9udGhzUmVnZXgoaXNTdHJpY3QpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkUGFyc2VUb2tlbihbJ00nLCAnTU0nXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xyXG4gICAgICAgIGFycmF5W01PTlRIXSA9IHRvSW50KGlucHV0KSAtIDE7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRQYXJzZVRva2VuKFsnTU1NJywgJ01NTU0nXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnLCB0b2tlbikge1xyXG4gICAgICAgIHZhciBtb250aCA9IGNvbmZpZy5fbG9jYWxlLm1vbnRoc1BhcnNlKGlucHV0LCB0b2tlbiwgY29uZmlnLl9zdHJpY3QpO1xyXG4gICAgICAgIC8vIGlmIHdlIGRpZG4ndCBmaW5kIGEgbW9udGggbmFtZSwgbWFyayB0aGUgZGF0ZSBhcyBpbnZhbGlkLlxyXG4gICAgICAgIGlmIChtb250aCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGFycmF5W01PTlRIXSA9IG1vbnRoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmludmFsaWRNb250aCA9IGlucHV0O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIExPQ0FMRVNcclxuXHJcbiAgICB2YXIgTU9OVEhTX0lOX0ZPUk1BVCA9IC9EW29EXT8oXFxbW15cXFtcXF1dKlxcXXxcXHMrKStNTU1NPy87XHJcbiAgICB2YXIgZGVmYXVsdExvY2FsZU1vbnRocyA9ICdKYW51YXJ5X0ZlYnJ1YXJ5X01hcmNoX0FwcmlsX01heV9KdW5lX0p1bHlfQXVndXN0X1NlcHRlbWJlcl9PY3RvYmVyX05vdmVtYmVyX0RlY2VtYmVyJy5zcGxpdCgnXycpO1xyXG4gICAgZnVuY3Rpb24gbG9jYWxlTW9udGhzIChtLCBmb3JtYXQpIHtcclxuICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl9tb250aHMpID8gdGhpcy5fbW9udGhzW20ubW9udGgoKV0gOlxyXG4gICAgICAgICAgICB0aGlzLl9tb250aHNbTU9OVEhTX0lOX0ZPUk1BVC50ZXN0KGZvcm1hdCkgPyAnZm9ybWF0JyA6ICdzdGFuZGFsb25lJ11bbS5tb250aCgpXTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdExvY2FsZU1vbnRoc1Nob3J0ID0gJ0phbl9GZWJfTWFyX0Fwcl9NYXlfSnVuX0p1bF9BdWdfU2VwX09jdF9Ob3ZfRGVjJy5zcGxpdCgnXycpO1xyXG4gICAgZnVuY3Rpb24gbG9jYWxlTW9udGhzU2hvcnQgKG0sIGZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX21vbnRoc1Nob3J0KSA/IHRoaXMuX21vbnRoc1Nob3J0W20ubW9udGgoKV0gOlxyXG4gICAgICAgICAgICB0aGlzLl9tb250aHNTaG9ydFtNT05USFNfSU5fRk9STUFULnRlc3QoZm9ybWF0KSA/ICdmb3JtYXQnIDogJ3N0YW5kYWxvbmUnXVttLm1vbnRoKCldO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVuaXRzX21vbnRoX19oYW5kbGVTdHJpY3RQYXJzZShtb250aE5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XHJcbiAgICAgICAgdmFyIGksIGlpLCBtb20sIGxsYyA9IG1vbnRoTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmICghdGhpcy5fbW9udGhzUGFyc2UpIHtcclxuICAgICAgICAgICAgLy8gdGhpcyBpcyBub3QgdXNlZFxyXG4gICAgICAgICAgICB0aGlzLl9tb250aHNQYXJzZSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2UgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgbW9tID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKFsyMDAwLCBpXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlW2ldID0gdGhpcy5tb250aHNTaG9ydChtb20sICcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldID0gdGhpcy5tb250aHMobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0cmljdCkge1xyXG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSAnTU1NJykge1xyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9sb25nTW9udGhzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ01NTScpIHtcclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0TW9udGhzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbG9uZ01vbnRoc1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX2xvbmdNb250aHNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydE1vbnRoc1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHNQYXJzZSAobW9udGhOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xyXG4gICAgICAgIHZhciBpLCBtb20sIHJlZ2V4O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5pdHNfbW9udGhfX2hhbmRsZVN0cmljdFBhcnNlLmNhbGwodGhpcywgbW9udGhOYW1lLCBmb3JtYXQsIHN0cmljdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX21vbnRoc1BhcnNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1BhcnNlID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUT0RPOiBhZGQgc29ydGluZ1xyXG4gICAgICAgIC8vIFNvcnRpbmcgbWFrZXMgc3VyZSBpZiBvbmUgbW9udGggKG9yIGFiYnIpIGlzIGEgcHJlZml4IG9mIGFub3RoZXJcclxuICAgICAgICAvLyBzZWUgc29ydGluZyBpbiBjb21wdXRlTW9udGhzUGFyc2VcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcclxuICAgICAgICAgICAgbW9tID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKFsyMDAwLCBpXSk7XHJcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLm1vbnRocyhtb20sICcnKS5yZXBsYWNlKCcuJywgJycpICsgJyQnLCAnaScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy5tb250aHNTaG9ydChtb20sICcnKS5yZXBsYWNlKCcuJywgJycpICsgJyQnLCAnaScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghc3RyaWN0ICYmICF0aGlzLl9tb250aHNQYXJzZVtpXSkge1xyXG4gICAgICAgICAgICAgICAgcmVnZXggPSAnXicgKyB0aGlzLm1vbnRocyhtb20sICcnKSArICd8XicgKyB0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW9udGhzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKHJlZ2V4LnJlcGxhY2UoJy4nLCAnJyksICdpJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdGVzdCB0aGUgcmVnZXhcclxuICAgICAgICAgICAgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdNTU1NJyAmJiB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnTU1NJyAmJiB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlW2ldLnRlc3QobW9udGhOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCAmJiB0aGlzLl9tb250aHNQYXJzZVtpXS50ZXN0KG1vbnRoTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICBmdW5jdGlvbiBzZXRNb250aCAobW9tLCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciBkYXlPZk1vbnRoO1xyXG5cclxuICAgICAgICBpZiAoIW1vbS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgLy8gTm8gb3BcclxuICAgICAgICAgICAgcmV0dXJuIG1vbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGlmICgvXlxcZCskLy50ZXN0KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0b0ludCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG1vbS5sb2NhbGVEYXRhKCkubW9udGhzUGFyc2UodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogQW5vdGhlciBzaWxlbnQgZmFpbHVyZT9cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF5T2ZNb250aCA9IE1hdGgubWluKG1vbS5kYXRlKCksIGRheXNJbk1vbnRoKG1vbS55ZWFyKCksIHZhbHVlKSk7XHJcbiAgICAgICAgbW9tLl9kWydzZXQnICsgKG1vbS5faXNVVEMgPyAnVVRDJyA6ICcnKSArICdNb250aCddKHZhbHVlLCBkYXlPZk1vbnRoKTtcclxuICAgICAgICByZXR1cm4gbW9tO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldE1vbnRoICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHNldE1vbnRoKHRoaXMsIHZhbHVlKTtcclxuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCB0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdldF9zZXRfX2dldCh0aGlzLCAnTW9udGgnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGF5c0luTW9udGggKCkge1xyXG4gICAgICAgIHJldHVybiBkYXlzSW5Nb250aCh0aGlzLnllYXIoKSwgdGhpcy5tb250aCgpKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdE1vbnRoc1Nob3J0UmVnZXggPSBtYXRjaFdvcmQ7XHJcbiAgICBmdW5jdGlvbiBtb250aHNTaG9ydFJlZ2V4IChpc1N0cmljdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tb250aHNQYXJzZUV4YWN0KSB7XHJcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1JlZ2V4JykpIHtcclxuICAgICAgICAgICAgICAgIGNvbXB1dGVNb250aHNQYXJzZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc1N0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRSZWdleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4ICYmIGlzU3RyaWN0ID9cclxuICAgICAgICAgICAgICAgIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggOiB0aGlzLl9tb250aHNTaG9ydFJlZ2V4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdE1vbnRoc1JlZ2V4ID0gbWF0Y2hXb3JkO1xyXG4gICAgZnVuY3Rpb24gbW9udGhzUmVnZXggKGlzU3RyaWN0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21vbnRoc1BhcnNlRXhhY3QpIHtcclxuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfbW9udGhzUmVnZXgnKSkge1xyXG4gICAgICAgICAgICAgICAgY29tcHV0ZU1vbnRoc1BhcnNlLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU3RyaWN0UmVnZXg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzUmVnZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggOiB0aGlzLl9tb250aHNSZWdleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY29tcHV0ZU1vbnRoc1BhcnNlICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBjbXBMZW5SZXYoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzaG9ydFBpZWNlcyA9IFtdLCBsb25nUGllY2VzID0gW10sIG1peGVkUGllY2VzID0gW10sXHJcbiAgICAgICAgICAgIGksIG1vbTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcclxuICAgICAgICAgICAgbW9tID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKFsyMDAwLCBpXSk7XHJcbiAgICAgICAgICAgIHNob3J0UGllY2VzLnB1c2godGhpcy5tb250aHNTaG9ydChtb20sICcnKSk7XHJcbiAgICAgICAgICAgIGxvbmdQaWVjZXMucHVzaCh0aGlzLm1vbnRocyhtb20sICcnKSk7XHJcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2godGhpcy5tb250aHMobW9tLCAnJykpO1xyXG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIG1vbnRoIChvciBhYmJyKSBpcyBhIHByZWZpeCBvZiBhbm90aGVyIGl0XHJcbiAgICAgICAgLy8gd2lsbCBtYXRjaCB0aGUgbG9uZ2VyIHBpZWNlLlxyXG4gICAgICAgIHNob3J0UGllY2VzLnNvcnQoY21wTGVuUmV2KTtcclxuICAgICAgICBsb25nUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcclxuICAgICAgICBtaXhlZFBpZWNlcy5zb3J0KGNtcExlblJldik7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcclxuICAgICAgICAgICAgc2hvcnRQaWVjZXNbaV0gPSByZWdleEVzY2FwZShzaG9ydFBpZWNlc1tpXSk7XHJcbiAgICAgICAgICAgIGxvbmdQaWVjZXNbaV0gPSByZWdleEVzY2FwZShsb25nUGllY2VzW2ldKTtcclxuICAgICAgICAgICAgbWl4ZWRQaWVjZXNbaV0gPSByZWdleEVzY2FwZShtaXhlZFBpZWNlc1tpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9tb250aHNSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIG1peGVkUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcclxuICAgICAgICB0aGlzLl9tb250aHNTaG9ydFJlZ2V4ID0gdGhpcy5fbW9udGhzUmVnZXg7XHJcbiAgICAgICAgdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBsb25nUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcclxuICAgICAgICB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgc2hvcnRQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrT3ZlcmZsb3cgKG0pIHtcclxuICAgICAgICB2YXIgb3ZlcmZsb3c7XHJcbiAgICAgICAgdmFyIGEgPSBtLl9hO1xyXG5cclxuICAgICAgICBpZiAoYSAmJiBnZXRQYXJzaW5nRmxhZ3MobSkub3ZlcmZsb3cgPT09IC0yKSB7XHJcbiAgICAgICAgICAgIG92ZXJmbG93ID1cclxuICAgICAgICAgICAgICAgIGFbTU9OVEhdICAgICAgIDwgMCB8fCBhW01PTlRIXSAgICAgICA+IDExICA/IE1PTlRIIDpcclxuICAgICAgICAgICAgICAgIGFbREFURV0gICAgICAgIDwgMSB8fCBhW0RBVEVdICAgICAgICA+IGRheXNJbk1vbnRoKGFbWUVBUl0sIGFbTU9OVEhdKSA/IERBVEUgOlxyXG4gICAgICAgICAgICAgICAgYVtIT1VSXSAgICAgICAgPCAwIHx8IGFbSE9VUl0gICAgICAgID4gMjQgfHwgKGFbSE9VUl0gPT09IDI0ICYmIChhW01JTlVURV0gIT09IDAgfHwgYVtTRUNPTkRdICE9PSAwIHx8IGFbTUlMTElTRUNPTkRdICE9PSAwKSkgPyBIT1VSIDpcclxuICAgICAgICAgICAgICAgIGFbTUlOVVRFXSAgICAgIDwgMCB8fCBhW01JTlVURV0gICAgICA+IDU5ICA/IE1JTlVURSA6XHJcbiAgICAgICAgICAgICAgICBhW1NFQ09ORF0gICAgICA8IDAgfHwgYVtTRUNPTkRdICAgICAgPiA1OSAgPyBTRUNPTkQgOlxyXG4gICAgICAgICAgICAgICAgYVtNSUxMSVNFQ09ORF0gPCAwIHx8IGFbTUlMTElTRUNPTkRdID4gOTk5ID8gTUlMTElTRUNPTkQgOlxyXG4gICAgICAgICAgICAgICAgLTE7XHJcblxyXG4gICAgICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKG0pLl9vdmVyZmxvd0RheU9mWWVhciAmJiAob3ZlcmZsb3cgPCBZRUFSIHx8IG92ZXJmbG93ID4gREFURSkpIHtcclxuICAgICAgICAgICAgICAgIG92ZXJmbG93ID0gREFURTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKG0pLl9vdmVyZmxvd1dlZWtzICYmIG92ZXJmbG93ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3cgPSBXRUVLO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MobSkuX292ZXJmbG93V2Vla2RheSAmJiBvdmVyZmxvdyA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIG92ZXJmbG93ID0gV0VFS0RBWTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKG0pLm92ZXJmbG93ID0gb3ZlcmZsb3c7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpc28gODYwMSByZWdleFxyXG4gICAgLy8gMDAwMC0wMC0wMCAwMDAwLVcwMCBvciAwMDAwLVcwMC0wICsgVCArIDAwIG9yIDAwOjAwIG9yIDAwOjAwOjAwIG9yIDAwOjAwOjAwLjAwMCArICswMDowMCBvciArMDAwMCBvciArMDApXHJcbiAgICB2YXIgZXh0ZW5kZWRJc29SZWdleCA9IC9eXFxzKigoPzpbKy1dXFxkezZ9fFxcZHs0fSktKD86XFxkXFxkLVxcZFxcZHxXXFxkXFxkLVxcZHxXXFxkXFxkfFxcZFxcZFxcZHxcXGRcXGQpKSg/OihUfCApKFxcZFxcZCg/OjpcXGRcXGQoPzo6XFxkXFxkKD86Wy4sXVxcZCspPyk/KT8pKFtcXCtcXC1dXFxkXFxkKD86Oj9cXGRcXGQpP3xcXHMqWik/KT8vO1xyXG4gICAgdmFyIGJhc2ljSXNvUmVnZXggPSAvXlxccyooKD86WystXVxcZHs2fXxcXGR7NH0pKD86XFxkXFxkXFxkXFxkfFdcXGRcXGRcXGR8V1xcZFxcZHxcXGRcXGRcXGR8XFxkXFxkKSkoPzooVHwgKShcXGRcXGQoPzpcXGRcXGQoPzpcXGRcXGQoPzpbLixdXFxkKyk/KT8pPykoW1xcK1xcLV1cXGRcXGQoPzo6P1xcZFxcZCk/fFxccypaKT8pPy87XHJcblxyXG4gICAgdmFyIHR6UmVnZXggPSAvWnxbKy1dXFxkXFxkKD86Oj9cXGRcXGQpPy87XHJcblxyXG4gICAgdmFyIGlzb0RhdGVzID0gW1xyXG4gICAgICAgIFsnWVlZWVlZLU1NLUREJywgL1srLV1cXGR7Nn0tXFxkXFxkLVxcZFxcZC9dLFxyXG4gICAgICAgIFsnWVlZWS1NTS1ERCcsIC9cXGR7NH0tXFxkXFxkLVxcZFxcZC9dLFxyXG4gICAgICAgIFsnR0dHRy1bV11XVy1FJywgL1xcZHs0fS1XXFxkXFxkLVxcZC9dLFxyXG4gICAgICAgIFsnR0dHRy1bV11XVycsIC9cXGR7NH0tV1xcZFxcZC8sIGZhbHNlXSxcclxuICAgICAgICBbJ1lZWVktREREJywgL1xcZHs0fS1cXGR7M30vXSxcclxuICAgICAgICBbJ1lZWVktTU0nLCAvXFxkezR9LVxcZFxcZC8sIGZhbHNlXSxcclxuICAgICAgICBbJ1lZWVlZWU1NREQnLCAvWystXVxcZHsxMH0vXSxcclxuICAgICAgICBbJ1lZWVlNTUREJywgL1xcZHs4fS9dLFxyXG4gICAgICAgIC8vIFlZWVlNTSBpcyBOT1QgYWxsb3dlZCBieSB0aGUgc3RhbmRhcmRcclxuICAgICAgICBbJ0dHR0dbV11XV0UnLCAvXFxkezR9V1xcZHszfS9dLFxyXG4gICAgICAgIFsnR0dHR1tXXVdXJywgL1xcZHs0fVdcXGR7Mn0vLCBmYWxzZV0sXHJcbiAgICAgICAgWydZWVlZREREJywgL1xcZHs3fS9dXHJcbiAgICBdO1xyXG5cclxuICAgIC8vIGlzbyB0aW1lIGZvcm1hdHMgYW5kIHJlZ2V4ZXNcclxuICAgIHZhciBpc29UaW1lcyA9IFtcclxuICAgICAgICBbJ0hIOm1tOnNzLlNTU1MnLCAvXFxkXFxkOlxcZFxcZDpcXGRcXGRcXC5cXGQrL10sXHJcbiAgICAgICAgWydISDptbTpzcyxTU1NTJywgL1xcZFxcZDpcXGRcXGQ6XFxkXFxkLFxcZCsvXSxcclxuICAgICAgICBbJ0hIOm1tOnNzJywgL1xcZFxcZDpcXGRcXGQ6XFxkXFxkL10sXHJcbiAgICAgICAgWydISDptbScsIC9cXGRcXGQ6XFxkXFxkL10sXHJcbiAgICAgICAgWydISG1tc3MuU1NTUycsIC9cXGRcXGRcXGRcXGRcXGRcXGRcXC5cXGQrL10sXHJcbiAgICAgICAgWydISG1tc3MsU1NTUycsIC9cXGRcXGRcXGRcXGRcXGRcXGQsXFxkKy9dLFxyXG4gICAgICAgIFsnSEhtbXNzJywgL1xcZFxcZFxcZFxcZFxcZFxcZC9dLFxyXG4gICAgICAgIFsnSEhtbScsIC9cXGRcXGRcXGRcXGQvXSxcclxuICAgICAgICBbJ0hIJywgL1xcZFxcZC9dXHJcbiAgICBdO1xyXG5cclxuICAgIHZhciBhc3BOZXRKc29uUmVnZXggPSAvXlxcLz9EYXRlXFwoKFxcLT9cXGQrKS9pO1xyXG5cclxuICAgIC8vIGRhdGUgZnJvbSBpc28gZm9ybWF0XHJcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tSVNPKGNvbmZpZykge1xyXG4gICAgICAgIHZhciBpLCBsLFxyXG4gICAgICAgICAgICBzdHJpbmcgPSBjb25maWcuX2ksXHJcbiAgICAgICAgICAgIG1hdGNoID0gZXh0ZW5kZWRJc29SZWdleC5leGVjKHN0cmluZykgfHwgYmFzaWNJc29SZWdleC5leGVjKHN0cmluZyksXHJcbiAgICAgICAgICAgIGFsbG93VGltZSwgZGF0ZUZvcm1hdCwgdGltZUZvcm1hdCwgdHpGb3JtYXQ7XHJcblxyXG4gICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5pc28gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpID0gMCwgbCA9IGlzb0RhdGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzb0RhdGVzW2ldWzFdLmV4ZWMobWF0Y2hbMV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdCA9IGlzb0RhdGVzW2ldWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93VGltZSA9IGlzb0RhdGVzW2ldWzJdICE9PSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGF0ZUZvcm1hdCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWF0Y2hbM10pIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGwgPSBpc29UaW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNvVGltZXNbaV1bMV0uZXhlYyhtYXRjaFszXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2hbMl0gc2hvdWxkIGJlICdUJyBvciBzcGFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lRm9ybWF0ID0gKG1hdGNoWzJdIHx8ICcgJykgKyBpc29UaW1lc1tpXVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRpbWVGb3JtYXQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWFsbG93VGltZSAmJiB0aW1lRm9ybWF0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtYXRjaFs0XSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR6UmVnZXguZXhlYyhtYXRjaFs0XSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ekZvcm1hdCA9ICdaJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbmZpZy5fZiA9IGRhdGVGb3JtYXQgKyAodGltZUZvcm1hdCB8fCAnJykgKyAodHpGb3JtYXQgfHwgJycpO1xyXG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KGNvbmZpZyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGRhdGUgZnJvbSBpc28gZm9ybWF0IG9yIGZhbGxiYWNrXHJcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tU3RyaW5nKGNvbmZpZykge1xyXG4gICAgICAgIHZhciBtYXRjaGVkID0gYXNwTmV0SnNvblJlZ2V4LmV4ZWMoY29uZmlnLl9pKTtcclxuXHJcbiAgICAgICAgaWYgKG1hdGNoZWQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoK21hdGNoZWRbMV0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25maWdGcm9tSVNPKGNvbmZpZyk7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5faXNWYWxpZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgZGVsZXRlIGNvbmZpZy5faXNWYWxpZDtcclxuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrKGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayA9IGRlcHJlY2F0ZShcclxuICAgICAgICAnbW9tZW50IGNvbnN0cnVjdGlvbiBmYWxscyBiYWNrIHRvIGpzIERhdGUuIFRoaXMgaXMgJyArXHJcbiAgICAgICAgJ2Rpc2NvdXJhZ2VkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdXBjb21pbmcgbWFqb3IgJyArXHJcbiAgICAgICAgJ3JlbGVhc2UuIFBsZWFzZSByZWZlciB0byAnICtcclxuICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE0MDcgZm9yIG1vcmUgaW5mby4nLFxyXG4gICAgICAgIGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoY29uZmlnLl9pICsgKGNvbmZpZy5fdXNlVVRDID8gJyBVVEMnIDogJycpKTtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZURhdGUgKHksIG0sIGQsIGgsIE0sIHMsIG1zKSB7XHJcbiAgICAgICAgLy9jYW4ndCBqdXN0IGFwcGx5KCkgdG8gY3JlYXRlIGEgZGF0ZTpcclxuICAgICAgICAvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTgxMzQ4L2luc3RhbnRpYXRpbmctYS1qYXZhc2NyaXB0LW9iamVjdC1ieS1jYWxsaW5nLXByb3RvdHlwZS1jb25zdHJ1Y3Rvci1hcHBseVxyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoeSwgbSwgZCwgaCwgTSwgcywgbXMpO1xyXG5cclxuICAgICAgICAvL3RoZSBkYXRlIGNvbnN0cnVjdG9yIHJlbWFwcyB5ZWFycyAwLTk5IHRvIDE5MDAtMTk5OVxyXG4gICAgICAgIGlmICh5IDwgMTAwICYmIHkgPj0gMCAmJiBpc0Zpbml0ZShkYXRlLmdldEZ1bGxZZWFyKCkpKSB7XHJcbiAgICAgICAgICAgIGRhdGUuc2V0RnVsbFllYXIoeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVVUQ0RhdGUgKHkpIHtcclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDLmFwcGx5KG51bGwsIGFyZ3VtZW50cykpO1xyXG5cclxuICAgICAgICAvL3RoZSBEYXRlLlVUQyBmdW5jdGlvbiByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcclxuICAgICAgICBpZiAoeSA8IDEwMCAmJiB5ID49IDAgJiYgaXNGaW5pdGUoZGF0ZS5nZXRVVENGdWxsWWVhcigpKSkge1xyXG4gICAgICAgICAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1knLCAwLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHkgPSB0aGlzLnllYXIoKTtcclxuICAgICAgICByZXR1cm4geSA8PSA5OTk5ID8gJycgKyB5IDogJysnICsgeTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVknLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnllYXIoKSAlIDEwMDtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWScsICAgNF0sICAgICAgIDAsICd5ZWFyJyk7XHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVlZJywgIDVdLCAgICAgICAwLCAneWVhcicpO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydZWVlZWVknLCA2LCB0cnVlXSwgMCwgJ3llYXInKTtcclxuXHJcbiAgICAvLyBBTElBU0VTXHJcblxyXG4gICAgYWRkVW5pdEFsaWFzKCd5ZWFyJywgJ3knKTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbignWScsICAgICAgbWF0Y2hTaWduZWQpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignWVknLCAgICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignWVlZWScsICAgbWF0Y2gxdG80LCBtYXRjaDQpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignWVlZWVknLCAgbWF0Y2gxdG82LCBtYXRjaDYpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignWVlZWVlZJywgbWF0Y2gxdG82LCBtYXRjaDYpO1xyXG5cclxuICAgIGFkZFBhcnNlVG9rZW4oWydZWVlZWScsICdZWVlZWVknXSwgWUVBUik7XHJcbiAgICBhZGRQYXJzZVRva2VuKCdZWVlZJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xyXG4gICAgICAgIGFycmF5W1lFQVJdID0gaW5wdXQubGVuZ3RoID09PSAyID8gdXRpbHNfaG9va3NfX2hvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KSA6IHRvSW50KGlucHV0KTtcclxuICAgIH0pO1xyXG4gICAgYWRkUGFyc2VUb2tlbignWVknLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XHJcbiAgICAgICAgYXJyYXlbWUVBUl0gPSB1dGlsc19ob29rc19faG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpO1xyXG4gICAgfSk7XHJcbiAgICBhZGRQYXJzZVRva2VuKCdZJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xyXG4gICAgICAgIGFycmF5W1lFQVJdID0gcGFyc2VJbnQoaW5wdXQsIDEwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhFTFBFUlNcclxuXHJcbiAgICBmdW5jdGlvbiBkYXlzSW5ZZWFyKHllYXIpIHtcclxuICAgICAgICByZXR1cm4gaXNMZWFwWWVhcih5ZWFyKSA/IDM2NiA6IDM2NTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0xlYXBZZWFyKHllYXIpIHtcclxuICAgICAgICByZXR1cm4gKHllYXIgJSA0ID09PSAwICYmIHllYXIgJSAxMDAgIT09IDApIHx8IHllYXIgJSA0MDAgPT09IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSE9PS1NcclxuXHJcbiAgICB1dGlsc19ob29rc19faG9va3MucGFyc2VUd29EaWdpdFllYXIgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gdG9JbnQoaW5wdXQpICsgKHRvSW50KGlucHV0KSA+IDY4ID8gMTkwMCA6IDIwMDApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgdmFyIGdldFNldFllYXIgPSBtYWtlR2V0U2V0KCdGdWxsWWVhcicsIHRydWUpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldElzTGVhcFllYXIgKCkge1xyXG4gICAgICAgIHJldHVybiBpc0xlYXBZZWFyKHRoaXMueWVhcigpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdGFydC1vZi1maXJzdC13ZWVrIC0gc3RhcnQtb2YteWVhclxyXG4gICAgZnVuY3Rpb24gZmlyc3RXZWVrT2Zmc2V0KHllYXIsIGRvdywgZG95KSB7XHJcbiAgICAgICAgdmFyIC8vIGZpcnN0LXdlZWsgZGF5IC0tIHdoaWNoIGphbnVhcnkgaXMgYWx3YXlzIGluIHRoZSBmaXJzdCB3ZWVrICg0IGZvciBpc28sIDEgZm9yIG90aGVyKVxyXG4gICAgICAgICAgICBmd2QgPSA3ICsgZG93IC0gZG95LFxyXG4gICAgICAgICAgICAvLyBmaXJzdC13ZWVrIGRheSBsb2NhbCB3ZWVrZGF5IC0tIHdoaWNoIGxvY2FsIHdlZWtkYXkgaXMgZndkXHJcbiAgICAgICAgICAgIGZ3ZGx3ID0gKDcgKyBjcmVhdGVVVENEYXRlKHllYXIsIDAsIGZ3ZCkuZ2V0VVRDRGF5KCkgLSBkb3cpICUgNztcclxuXHJcbiAgICAgICAgcmV0dXJuIC1md2RsdyArIGZ3ZCAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy9odHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGUjQ2FsY3VsYXRpbmdfYV9kYXRlX2dpdmVuX3RoZV95ZWFyLjJDX3dlZWtfbnVtYmVyX2FuZF93ZWVrZGF5XHJcbiAgICBmdW5jdGlvbiBkYXlPZlllYXJGcm9tV2Vla3MoeWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpIHtcclxuICAgICAgICB2YXIgbG9jYWxXZWVrZGF5ID0gKDcgKyB3ZWVrZGF5IC0gZG93KSAlIDcsXHJcbiAgICAgICAgICAgIHdlZWtPZmZzZXQgPSBmaXJzdFdlZWtPZmZzZXQoeWVhciwgZG93LCBkb3kpLFxyXG4gICAgICAgICAgICBkYXlPZlllYXIgPSAxICsgNyAqICh3ZWVrIC0gMSkgKyBsb2NhbFdlZWtkYXkgKyB3ZWVrT2Zmc2V0LFxyXG4gICAgICAgICAgICByZXNZZWFyLCByZXNEYXlPZlllYXI7XHJcblxyXG4gICAgICAgIGlmIChkYXlPZlllYXIgPD0gMCkge1xyXG4gICAgICAgICAgICByZXNZZWFyID0geWVhciAtIDE7XHJcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheXNJblllYXIocmVzWWVhcikgKyBkYXlPZlllYXI7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXlPZlllYXIgPiBkYXlzSW5ZZWFyKHllYXIpKSB7XHJcbiAgICAgICAgICAgIHJlc1llYXIgPSB5ZWFyICsgMTtcclxuICAgICAgICAgICAgcmVzRGF5T2ZZZWFyID0gZGF5T2ZZZWFyIC0gZGF5c0luWWVhcih5ZWFyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNZZWFyID0geWVhcjtcclxuICAgICAgICAgICAgcmVzRGF5T2ZZZWFyID0gZGF5T2ZZZWFyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeWVhcjogcmVzWWVhcixcclxuICAgICAgICAgICAgZGF5T2ZZZWFyOiByZXNEYXlPZlllYXJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdlZWtPZlllYXIobW9tLCBkb3csIGRveSkge1xyXG4gICAgICAgIHZhciB3ZWVrT2Zmc2V0ID0gZmlyc3RXZWVrT2Zmc2V0KG1vbS55ZWFyKCksIGRvdywgZG95KSxcclxuICAgICAgICAgICAgd2VlayA9IE1hdGguZmxvb3IoKG1vbS5kYXlPZlllYXIoKSAtIHdlZWtPZmZzZXQgLSAxKSAvIDcpICsgMSxcclxuICAgICAgICAgICAgcmVzV2VlaywgcmVzWWVhcjtcclxuXHJcbiAgICAgICAgaWYgKHdlZWsgPCAxKSB7XHJcbiAgICAgICAgICAgIHJlc1llYXIgPSBtb20ueWVhcigpIC0gMTtcclxuICAgICAgICAgICAgcmVzV2VlayA9IHdlZWsgKyB3ZWVrc0luWWVhcihyZXNZZWFyLCBkb3csIGRveSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh3ZWVrID4gd2Vla3NJblllYXIobW9tLnllYXIoKSwgZG93LCBkb3kpKSB7XHJcbiAgICAgICAgICAgIHJlc1dlZWsgPSB3ZWVrIC0gd2Vla3NJblllYXIobW9tLnllYXIoKSwgZG93LCBkb3kpO1xyXG4gICAgICAgICAgICByZXNZZWFyID0gbW9tLnllYXIoKSArIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzWWVhciA9IG1vbS55ZWFyKCk7XHJcbiAgICAgICAgICAgIHJlc1dlZWsgPSB3ZWVrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2VlazogcmVzV2VlayxcclxuICAgICAgICAgICAgeWVhcjogcmVzWWVhclxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd2Vla3NJblllYXIoeWVhciwgZG93LCBkb3kpIHtcclxuICAgICAgICB2YXIgd2Vla09mZnNldCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSksXHJcbiAgICAgICAgICAgIHdlZWtPZmZzZXROZXh0ID0gZmlyc3RXZWVrT2Zmc2V0KHllYXIgKyAxLCBkb3csIGRveSk7XHJcbiAgICAgICAgcmV0dXJuIChkYXlzSW5ZZWFyKHllYXIpIC0gd2Vla09mZnNldCArIHdlZWtPZmZzZXROZXh0KSAvIDc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUGljayB0aGUgZmlyc3QgZGVmaW5lZCBvZiB0d28gb3IgdGhyZWUgYXJndW1lbnRzLlxyXG4gICAgZnVuY3Rpb24gZGVmYXVsdHMoYSwgYiwgYykge1xyXG4gICAgICAgIGlmIChhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGN1cnJlbnREYXRlQXJyYXkoY29uZmlnKSB7XHJcbiAgICAgICAgLy8gaG9va3MgaXMgYWN0dWFsbHkgdGhlIGV4cG9ydGVkIG1vbWVudCBvYmplY3RcclxuICAgICAgICB2YXIgbm93VmFsdWUgPSBuZXcgRGF0ZSh1dGlsc19ob29rc19faG9va3Mubm93KCkpO1xyXG4gICAgICAgIGlmIChjb25maWcuX3VzZVVUQykge1xyXG4gICAgICAgICAgICByZXR1cm4gW25vd1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCksIG5vd1ZhbHVlLmdldFVUQ01vbnRoKCksIG5vd1ZhbHVlLmdldFVUQ0RhdGUoKV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbbm93VmFsdWUuZ2V0RnVsbFllYXIoKSwgbm93VmFsdWUuZ2V0TW9udGgoKSwgbm93VmFsdWUuZ2V0RGF0ZSgpXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb252ZXJ0IGFuIGFycmF5IHRvIGEgZGF0ZS5cclxuICAgIC8vIHRoZSBhcnJheSBzaG91bGQgbWlycm9yIHRoZSBwYXJhbWV0ZXJzIGJlbG93XHJcbiAgICAvLyBub3RlOiBhbGwgdmFsdWVzIHBhc3QgdGhlIHllYXIgYXJlIG9wdGlvbmFsIGFuZCB3aWxsIGRlZmF1bHQgdG8gdGhlIGxvd2VzdCBwb3NzaWJsZSB2YWx1ZS5cclxuICAgIC8vIFt5ZWFyLCBtb250aCwgZGF5ICwgaG91ciwgbWludXRlLCBzZWNvbmQsIG1pbGxpc2Vjb25kXVxyXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbUFycmF5IChjb25maWcpIHtcclxuICAgICAgICB2YXIgaSwgZGF0ZSwgaW5wdXQgPSBbXSwgY3VycmVudERhdGUsIHllYXJUb1VzZTtcclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5fZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdXJyZW50RGF0ZSA9IGN1cnJlbnREYXRlQXJyYXkoY29uZmlnKTtcclxuXHJcbiAgICAgICAgLy9jb21wdXRlIGRheSBvZiB0aGUgeWVhciBmcm9tIHdlZWtzIGFuZCB3ZWVrZGF5c1xyXG4gICAgICAgIGlmIChjb25maWcuX3cgJiYgY29uZmlnLl9hW0RBVEVdID09IG51bGwgJiYgY29uZmlnLl9hW01PTlRIXSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGRheU9mWWVhckZyb21XZWVrSW5mbyhjb25maWcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pZiB0aGUgZGF5IG9mIHRoZSB5ZWFyIGlzIHNldCwgZmlndXJlIG91dCB3aGF0IGl0IGlzXHJcbiAgICAgICAgaWYgKGNvbmZpZy5fZGF5T2ZZZWFyKSB7XHJcbiAgICAgICAgICAgIHllYXJUb1VzZSA9IGRlZmF1bHRzKGNvbmZpZy5fYVtZRUFSXSwgY3VycmVudERhdGVbWUVBUl0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmZpZy5fZGF5T2ZZZWFyID4gZGF5c0luWWVhcih5ZWFyVG9Vc2UpKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dEYXlPZlllYXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkYXRlID0gY3JlYXRlVVRDRGF0ZSh5ZWFyVG9Vc2UsIDAsIGNvbmZpZy5fZGF5T2ZZZWFyKTtcclxuICAgICAgICAgICAgY29uZmlnLl9hW01PTlRIXSA9IGRhdGUuZ2V0VVRDTW9udGgoKTtcclxuICAgICAgICAgICAgY29uZmlnLl9hW0RBVEVdID0gZGF0ZS5nZXRVVENEYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZWZhdWx0IHRvIGN1cnJlbnQgZGF0ZS5cclxuICAgICAgICAvLyAqIGlmIG5vIHllYXIsIG1vbnRoLCBkYXkgb2YgbW9udGggYXJlIGdpdmVuLCBkZWZhdWx0IHRvIHRvZGF5XHJcbiAgICAgICAgLy8gKiBpZiBkYXkgb2YgbW9udGggaXMgZ2l2ZW4sIGRlZmF1bHQgbW9udGggYW5kIHllYXJcclxuICAgICAgICAvLyAqIGlmIG1vbnRoIGlzIGdpdmVuLCBkZWZhdWx0IG9ubHkgeWVhclxyXG4gICAgICAgIC8vICogaWYgeWVhciBpcyBnaXZlbiwgZG9uJ3QgZGVmYXVsdCBhbnl0aGluZ1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAzICYmIGNvbmZpZy5fYVtpXSA9PSBudWxsOyArK2kpIHtcclxuICAgICAgICAgICAgY29uZmlnLl9hW2ldID0gaW5wdXRbaV0gPSBjdXJyZW50RGF0ZVtpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFplcm8gb3V0IHdoYXRldmVyIHdhcyBub3QgZGVmYXVsdGVkLCBpbmNsdWRpbmcgdGltZVxyXG4gICAgICAgIGZvciAoOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fYVtpXSA9IGlucHV0W2ldID0gKGNvbmZpZy5fYVtpXSA9PSBudWxsKSA/IChpID09PSAyID8gMSA6IDApIDogY29uZmlnLl9hW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIDI0OjAwOjAwLjAwMFxyXG4gICAgICAgIGlmIChjb25maWcuX2FbSE9VUl0gPT09IDI0ICYmXHJcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbTUlOVVRFXSA9PT0gMCAmJlxyXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW1NFQ09ORF0gPT09IDAgJiZcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtNSUxMSVNFQ09ORF0gPT09IDApIHtcclxuICAgICAgICAgICAgY29uZmlnLl9uZXh0RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbmZpZy5fZCA9IChjb25maWcuX3VzZVVUQyA/IGNyZWF0ZVVUQ0RhdGUgOiBjcmVhdGVEYXRlKS5hcHBseShudWxsLCBpbnB1dCk7XHJcbiAgICAgICAgLy8gQXBwbHkgdGltZXpvbmUgb2Zmc2V0IGZyb20gaW5wdXQuIFRoZSBhY3R1YWwgdXRjT2Zmc2V0IGNhbiBiZSBjaGFuZ2VkXHJcbiAgICAgICAgLy8gd2l0aCBwYXJzZVpvbmUuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5fdHptICE9IG51bGwpIHtcclxuICAgICAgICAgICAgY29uZmlnLl9kLnNldFVUQ01pbnV0ZXMoY29uZmlnLl9kLmdldFVUQ01pbnV0ZXMoKSAtIGNvbmZpZy5fdHptKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb25maWcuX25leHREYXkpIHtcclxuICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gMjQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRheU9mWWVhckZyb21XZWVrSW5mbyhjb25maWcpIHtcclxuICAgICAgICB2YXIgdywgd2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95LCB0ZW1wLCB3ZWVrZGF5T3ZlcmZsb3c7XHJcblxyXG4gICAgICAgIHcgPSBjb25maWcuX3c7XHJcbiAgICAgICAgaWYgKHcuR0cgIT0gbnVsbCB8fCB3LlcgIT0gbnVsbCB8fCB3LkUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBkb3cgPSAxO1xyXG4gICAgICAgICAgICBkb3kgPSA0O1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogV2UgbmVlZCB0byB0YWtlIHRoZSBjdXJyZW50IGlzb1dlZWtZZWFyLCBidXQgdGhhdCBkZXBlbmRzIG9uXHJcbiAgICAgICAgICAgIC8vIGhvdyB3ZSBpbnRlcnByZXQgbm93IChsb2NhbCwgdXRjLCBmaXhlZCBvZmZzZXQpLiBTbyBjcmVhdGVcclxuICAgICAgICAgICAgLy8gYSBub3cgdmVyc2lvbiBvZiBjdXJyZW50IGNvbmZpZyAodGFrZSBsb2NhbC91dGMvb2Zmc2V0IGZsYWdzLCBhbmRcclxuICAgICAgICAgICAgLy8gY3JlYXRlIG5vdykuXHJcbiAgICAgICAgICAgIHdlZWtZZWFyID0gZGVmYXVsdHMody5HRywgY29uZmlnLl9hW1lFQVJdLCB3ZWVrT2ZZZWFyKGxvY2FsX19jcmVhdGVMb2NhbCgpLCAxLCA0KS55ZWFyKTtcclxuICAgICAgICAgICAgd2VlayA9IGRlZmF1bHRzKHcuVywgMSk7XHJcbiAgICAgICAgICAgIHdlZWtkYXkgPSBkZWZhdWx0cyh3LkUsIDEpO1xyXG4gICAgICAgICAgICBpZiAod2Vla2RheSA8IDEgfHwgd2Vla2RheSA+IDcpIHtcclxuICAgICAgICAgICAgICAgIHdlZWtkYXlPdmVyZmxvdyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkb3cgPSBjb25maWcuX2xvY2FsZS5fd2Vlay5kb3c7XHJcbiAgICAgICAgICAgIGRveSA9IGNvbmZpZy5fbG9jYWxlLl93ZWVrLmRveTtcclxuXHJcbiAgICAgICAgICAgIHdlZWtZZWFyID0gZGVmYXVsdHMody5nZywgY29uZmlnLl9hW1lFQVJdLCB3ZWVrT2ZZZWFyKGxvY2FsX19jcmVhdGVMb2NhbCgpLCBkb3csIGRveSkueWVhcik7XHJcbiAgICAgICAgICAgIHdlZWsgPSBkZWZhdWx0cyh3LncsIDEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHcuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB3ZWVrZGF5IC0tIGxvdyBkYXkgbnVtYmVycyBhcmUgY29uc2lkZXJlZCBuZXh0IHdlZWtcclxuICAgICAgICAgICAgICAgIHdlZWtkYXkgPSB3LmQ7XHJcbiAgICAgICAgICAgICAgICBpZiAod2Vla2RheSA8IDAgfHwgd2Vla2RheSA+IDYpIHtcclxuICAgICAgICAgICAgICAgICAgICB3ZWVrZGF5T3ZlcmZsb3cgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHcuZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBsb2NhbCB3ZWVrZGF5IC0tIGNvdW50aW5nIHN0YXJ0cyBmcm9tIGJlZ2luaW5nIG9mIHdlZWtcclxuICAgICAgICAgICAgICAgIHdlZWtkYXkgPSB3LmUgKyBkb3c7XHJcbiAgICAgICAgICAgICAgICBpZiAody5lIDwgMCB8fCB3LmUgPiA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgdG8gYmVnaW5pbmcgb2Ygd2Vla1xyXG4gICAgICAgICAgICAgICAgd2Vla2RheSA9IGRvdztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAod2VlayA8IDEgfHwgd2VlayA+IHdlZWtzSW5ZZWFyKHdlZWtZZWFyLCBkb3csIGRveSkpIHtcclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93V2Vla3MgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAod2Vla2RheU92ZXJmbG93ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93V2Vla2RheSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGVtcCA9IGRheU9mWWVhckZyb21XZWVrcyh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpO1xyXG4gICAgICAgICAgICBjb25maWcuX2FbWUVBUl0gPSB0ZW1wLnllYXI7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fZGF5T2ZZZWFyID0gdGVtcC5kYXlPZlllYXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnN0YW50IHRoYXQgcmVmZXJzIHRvIHRoZSBJU08gc3RhbmRhcmRcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5JU09fODYwMSA9IGZ1bmN0aW9uICgpIHt9O1xyXG5cclxuICAgIC8vIGRhdGUgZnJvbSBzdHJpbmcgYW5kIGZvcm1hdCBzdHJpbmdcclxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKSB7XHJcbiAgICAgICAgLy8gVE9ETzogTW92ZSB0aGlzIHRvIGFub3RoZXIgcGFydCBvZiB0aGUgY3JlYXRpb24gZmxvdyB0byBwcmV2ZW50IGNpcmN1bGFyIGRlcHNcclxuICAgICAgICBpZiAoY29uZmlnLl9mID09PSB1dGlsc19ob29rc19faG9va3MuSVNPXzg2MDEpIHtcclxuICAgICAgICAgICAgY29uZmlnRnJvbUlTTyhjb25maWcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25maWcuX2EgPSBbXTtcclxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5lbXB0eSA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIFRoaXMgYXJyYXkgaXMgdXNlZCB0byBtYWtlIGEgRGF0ZSwgZWl0aGVyIHdpdGggYG5ldyBEYXRlYCBvciBgRGF0ZS5VVENgXHJcbiAgICAgICAgdmFyIHN0cmluZyA9ICcnICsgY29uZmlnLl9pLFxyXG4gICAgICAgICAgICBpLCBwYXJzZWRJbnB1dCwgdG9rZW5zLCB0b2tlbiwgc2tpcHBlZCxcclxuICAgICAgICAgICAgc3RyaW5nTGVuZ3RoID0gc3RyaW5nLmxlbmd0aCxcclxuICAgICAgICAgICAgdG90YWxQYXJzZWRJbnB1dExlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIHRva2VucyA9IGV4cGFuZEZvcm1hdChjb25maWcuX2YsIGNvbmZpZy5fbG9jYWxlKS5tYXRjaChmb3JtYXR0aW5nVG9rZW5zKSB8fCBbXTtcclxuXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcclxuICAgICAgICAgICAgcGFyc2VkSW5wdXQgPSAoc3RyaW5nLm1hdGNoKGdldFBhcnNlUmVnZXhGb3JUb2tlbih0b2tlbiwgY29uZmlnKSkgfHwgW10pWzBdO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndG9rZW4nLCB0b2tlbiwgJ3BhcnNlZElucHV0JywgcGFyc2VkSW5wdXQsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgJ3JlZ2V4JywgZ2V0UGFyc2VSZWdleEZvclRva2VuKHRva2VuLCBjb25maWcpKTtcclxuICAgICAgICAgICAgaWYgKHBhcnNlZElucHV0KSB7XHJcbiAgICAgICAgICAgICAgICBza2lwcGVkID0gc3RyaW5nLnN1YnN0cigwLCBzdHJpbmcuaW5kZXhPZihwYXJzZWRJbnB1dCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNraXBwZWQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZElucHV0LnB1c2goc2tpcHBlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgPSBzdHJpbmcuc2xpY2Uoc3RyaW5nLmluZGV4T2YocGFyc2VkSW5wdXQpICsgcGFyc2VkSW5wdXQubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHRvdGFsUGFyc2VkSW5wdXRMZW5ndGggKz0gcGFyc2VkSW5wdXQubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGRvbid0IHBhcnNlIGlmIGl0J3Mgbm90IGEga25vd24gdG9rZW5cclxuICAgICAgICAgICAgaWYgKGZvcm1hdFRva2VuRnVuY3Rpb25zW3Rva2VuXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlZElucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuZW1wdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZFRva2Vucy5wdXNoKHRva2VuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFkZFRpbWVUb0FycmF5RnJvbVRva2VuKHRva2VuLCBwYXJzZWRJbnB1dCwgY29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb25maWcuX3N0cmljdCAmJiAhcGFyc2VkSW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZFRva2Vucy5wdXNoKHRva2VuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWRkIHJlbWFpbmluZyB1bnBhcnNlZCBpbnB1dCBsZW5ndGggdG8gdGhlIHN0cmluZ1xyXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmNoYXJzTGVmdE92ZXIgPSBzdHJpbmdMZW5ndGggLSB0b3RhbFBhcnNlZElucHV0TGVuZ3RoO1xyXG4gICAgICAgIGlmIChzdHJpbmcubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRJbnB1dC5wdXNoKHN0cmluZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjbGVhciBfMTJoIGZsYWcgaWYgaG91ciBpcyA8PSAxMlxyXG4gICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID09PSB0cnVlICYmXHJcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbSE9VUl0gPD0gMTIgJiZcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA+IDApIHtcclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnBhcnNlZERhdGVQYXJ0cyA9IGNvbmZpZy5fYS5zbGljZSgwKTtcclxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5tZXJpZGllbSA9IGNvbmZpZy5fbWVyaWRpZW07XHJcbiAgICAgICAgLy8gaGFuZGxlIG1lcmlkaWVtXHJcbiAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gbWVyaWRpZW1GaXhXcmFwKGNvbmZpZy5fbG9jYWxlLCBjb25maWcuX2FbSE9VUl0sIGNvbmZpZy5fbWVyaWRpZW0pO1xyXG5cclxuICAgICAgICBjb25maWdGcm9tQXJyYXkoY29uZmlnKTtcclxuICAgICAgICBjaGVja092ZXJmbG93KGNvbmZpZyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIG1lcmlkaWVtRml4V3JhcCAobG9jYWxlLCBob3VyLCBtZXJpZGllbSkge1xyXG4gICAgICAgIHZhciBpc1BtO1xyXG5cclxuICAgICAgICBpZiAobWVyaWRpZW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyBub3RoaW5nIHRvIGRvXHJcbiAgICAgICAgICAgIHJldHVybiBob3VyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobG9jYWxlLm1lcmlkaWVtSG91ciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGUubWVyaWRpZW1Ib3VyKGhvdXIsIG1lcmlkaWVtKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvY2FsZS5pc1BNICE9IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gRmFsbGJhY2tcclxuICAgICAgICAgICAgaXNQbSA9IGxvY2FsZS5pc1BNKG1lcmlkaWVtKTtcclxuICAgICAgICAgICAgaWYgKGlzUG0gJiYgaG91ciA8IDEyKSB7XHJcbiAgICAgICAgICAgICAgICBob3VyICs9IDEyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNQbSAmJiBob3VyID09PSAxMikge1xyXG4gICAgICAgICAgICAgICAgaG91ciA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdGhpcyBpcyBub3Qgc3VwcG9zZWQgdG8gaGFwcGVuXHJcbiAgICAgICAgICAgIHJldHVybiBob3VyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkYXRlIGZyb20gc3RyaW5nIGFuZCBhcnJheSBvZiBmb3JtYXQgc3RyaW5nc1xyXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZ0FuZEFycmF5KGNvbmZpZykge1xyXG4gICAgICAgIHZhciB0ZW1wQ29uZmlnLFxyXG4gICAgICAgICAgICBiZXN0TW9tZW50LFxyXG5cclxuICAgICAgICAgICAgc2NvcmVUb0JlYXQsXHJcbiAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZTtcclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5fZi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZEZvcm1hdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKE5hTik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb25maWcuX2YubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY3VycmVudFNjb3JlID0gMDtcclxuICAgICAgICAgICAgdGVtcENvbmZpZyA9IGNvcHlDb25maWcoe30sIGNvbmZpZyk7XHJcbiAgICAgICAgICAgIGlmIChjb25maWcuX3VzZVVUQyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wQ29uZmlnLl91c2VVVEMgPSBjb25maWcuX3VzZVVUQztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZW1wQ29uZmlnLl9mID0gY29uZmlnLl9mW2ldO1xyXG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KHRlbXBDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF2YWxpZF9faXNWYWxpZCh0ZW1wQ29uZmlnKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFueSBpbnB1dCB0aGF0IHdhcyBub3QgcGFyc2VkIGFkZCBhIHBlbmFsdHkgZm9yIHRoYXQgZm9ybWF0XHJcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSArPSBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykuY2hhcnNMZWZ0T3ZlcjtcclxuXHJcbiAgICAgICAgICAgIC8vb3IgdG9rZW5zXHJcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSArPSBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykudW51c2VkVG9rZW5zLmxlbmd0aCAqIDEwO1xyXG5cclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLnNjb3JlID0gY3VycmVudFNjb3JlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNjb3JlVG9CZWF0ID09IG51bGwgfHwgY3VycmVudFNjb3JlIDwgc2NvcmVUb0JlYXQpIHtcclxuICAgICAgICAgICAgICAgIHNjb3JlVG9CZWF0ID0gY3VycmVudFNjb3JlO1xyXG4gICAgICAgICAgICAgICAgYmVzdE1vbWVudCA9IHRlbXBDb25maWc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4dGVuZChjb25maWcsIGJlc3RNb21lbnQgfHwgdGVtcENvbmZpZyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbU9iamVjdChjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnLl9kKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBpID0gbm9ybWFsaXplT2JqZWN0VW5pdHMoY29uZmlnLl9pKTtcclxuICAgICAgICBjb25maWcuX2EgPSBtYXAoW2kueWVhciwgaS5tb250aCwgaS5kYXkgfHwgaS5kYXRlLCBpLmhvdXIsIGkubWludXRlLCBpLnNlY29uZCwgaS5taWxsaXNlY29uZF0sIGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiBwYXJzZUludChvYmosIDEwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRnJvbUNvbmZpZyAoY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHJlcyA9IG5ldyBNb21lbnQoY2hlY2tPdmVyZmxvdyhwcmVwYXJlQ29uZmlnKGNvbmZpZykpKTtcclxuICAgICAgICBpZiAocmVzLl9uZXh0RGF5KSB7XHJcbiAgICAgICAgICAgIC8vIEFkZGluZyBpcyBzbWFydCBlbm91Z2ggYXJvdW5kIERTVFxyXG4gICAgICAgICAgICByZXMuYWRkKDEsICdkJyk7XHJcbiAgICAgICAgICAgIHJlcy5fbmV4dERheSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHJlcGFyZUNvbmZpZyAoY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIGlucHV0ID0gY29uZmlnLl9pLFxyXG4gICAgICAgICAgICBmb3JtYXQgPSBjb25maWcuX2Y7XHJcblxyXG4gICAgICAgIGNvbmZpZy5fbG9jYWxlID0gY29uZmlnLl9sb2NhbGUgfHwgbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZShjb25maWcuX2wpO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXQgPT09IG51bGwgfHwgKGZvcm1hdCA9PT0gdW5kZWZpbmVkICYmIGlucHV0ID09PSAnJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbGlkX19jcmVhdGVJbnZhbGlkKHtudWxsSW5wdXQ6IHRydWV9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5faSA9IGlucHV0ID0gY29uZmlnLl9sb2NhbGUucHJlcGFyc2UoaW5wdXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzTW9tZW50KGlucHV0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE1vbWVudChjaGVja092ZXJmbG93KGlucHV0KSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGZvcm1hdCkpIHtcclxuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEFycmF5KGNvbmZpZyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChmb3JtYXQpIHtcclxuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdChjb25maWcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKGlucHV0KSkge1xyXG4gICAgICAgICAgICBjb25maWcuX2QgPSBpbnB1dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25maWdGcm9tSW5wdXQoY29uZmlnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdmFsaWRfX2lzVmFsaWQoY29uZmlnKSkge1xyXG4gICAgICAgICAgICBjb25maWcuX2QgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tSW5wdXQoY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIGlucHV0ID0gY29uZmlnLl9pO1xyXG4gICAgICAgIGlmIChpbnB1dCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKHV0aWxzX2hvb2tzX19ob29rcy5ub3coKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKGlucHV0LnZhbHVlT2YoKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmcoY29uZmlnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fYSA9IG1hcChpbnB1dC5zbGljZSgwKSwgZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KG9iaiwgMTApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YoaW5wdXQpID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBjb25maWdGcm9tT2JqZWN0KGNvbmZpZyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YoaW5wdXQpID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAvLyBmcm9tIG1pbGxpc2Vjb25kc1xyXG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShpbnB1dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrKGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUxvY2FsT3JVVEMgKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCBpc1VUQykge1xyXG4gICAgICAgIHZhciBjID0ge307XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YobG9jYWxlKSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICAgIHN0cmljdCA9IGxvY2FsZTtcclxuICAgICAgICAgICAgbG9jYWxlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBvYmplY3QgY29uc3RydWN0aW9uIG11c3QgYmUgZG9uZSB0aGlzIHdheS5cclxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQyM1xyXG4gICAgICAgIGMuX2lzQU1vbWVudE9iamVjdCA9IHRydWU7XHJcbiAgICAgICAgYy5fdXNlVVRDID0gYy5faXNVVEMgPSBpc1VUQztcclxuICAgICAgICBjLl9sID0gbG9jYWxlO1xyXG4gICAgICAgIGMuX2kgPSBpbnB1dDtcclxuICAgICAgICBjLl9mID0gZm9ybWF0O1xyXG4gICAgICAgIGMuX3N0cmljdCA9IHN0cmljdDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUZyb21Db25maWcoYyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9jYWxfX2NyZWF0ZUxvY2FsIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCkge1xyXG4gICAgICAgIHJldHVybiBjcmVhdGVMb2NhbE9yVVRDKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHByb3RvdHlwZU1pbiA9IGRlcHJlY2F0ZShcclxuICAgICAgICAgJ21vbWVudCgpLm1pbiBpcyBkZXByZWNhdGVkLCB1c2UgbW9tZW50Lm1heCBpbnN0ZWFkLiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTU0OCcsXHJcbiAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgIHZhciBvdGhlciA9IGxvY2FsX19jcmVhdGVMb2NhbC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmIG90aGVyLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgIHJldHVybiBvdGhlciA8IHRoaXMgPyB0aGlzIDogb3RoZXI7XHJcbiAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZF9fY3JlYXRlSW52YWxpZCgpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgKTtcclxuXHJcbiAgICB2YXIgcHJvdG90eXBlTWF4ID0gZGVwcmVjYXRlKFxyXG4gICAgICAgICdtb21lbnQoKS5tYXggaXMgZGVwcmVjYXRlZCwgdXNlIG1vbWVudC5taW4gaW5zdGVhZC4gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE1NDgnLFxyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG90aGVyID0gbG9jYWxfX2NyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJiBvdGhlci5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvdGhlciA+IHRoaXMgPyB0aGlzIDogb3RoZXI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRfX2NyZWF0ZUludmFsaWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgLy8gUGljayBhIG1vbWVudCBtIGZyb20gbW9tZW50cyBzbyB0aGF0IG1bZm5dKG90aGVyKSBpcyB0cnVlIGZvciBhbGxcclxuICAgIC8vIG90aGVyLiBUaGlzIHJlbGllcyBvbiB0aGUgZnVuY3Rpb24gZm4gdG8gYmUgdHJhbnNpdGl2ZS5cclxuICAgIC8vXHJcbiAgICAvLyBtb21lbnRzIHNob3VsZCBlaXRoZXIgYmUgYW4gYXJyYXkgb2YgbW9tZW50IG9iamVjdHMgb3IgYW4gYXJyYXksIHdob3NlXHJcbiAgICAvLyBmaXJzdCBlbGVtZW50IGlzIGFuIGFycmF5IG9mIG1vbWVudCBvYmplY3RzLlxyXG4gICAgZnVuY3Rpb24gcGlja0J5KGZuLCBtb21lbnRzKSB7XHJcbiAgICAgICAgdmFyIHJlcywgaTtcclxuICAgICAgICBpZiAobW9tZW50cy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShtb21lbnRzWzBdKSkge1xyXG4gICAgICAgICAgICBtb21lbnRzID0gbW9tZW50c1swXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFtb21lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxfX2NyZWF0ZUxvY2FsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcyA9IG1vbWVudHNbMF07XHJcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IG1vbWVudHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgaWYgKCFtb21lbnRzW2ldLmlzVmFsaWQoKSB8fCBtb21lbnRzW2ldW2ZuXShyZXMpKSB7XHJcbiAgICAgICAgICAgICAgICByZXMgPSBtb21lbnRzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETzogVXNlIFtdLnNvcnQgaW5zdGVhZD9cclxuICAgIGZ1bmN0aW9uIG1pbiAoKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XHJcblxyXG4gICAgICAgIHJldHVybiBwaWNrQnkoJ2lzQmVmb3JlJywgYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWF4ICgpIHtcclxuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBpY2tCeSgnaXNBZnRlcicsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBub3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIERhdGUubm93ID8gRGF0ZS5ub3coKSA6ICsobmV3IERhdGUoKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIER1cmF0aW9uIChkdXJhdGlvbikge1xyXG4gICAgICAgIHZhciBub3JtYWxpemVkSW5wdXQgPSBub3JtYWxpemVPYmplY3RVbml0cyhkdXJhdGlvbiksXHJcbiAgICAgICAgICAgIHllYXJzID0gbm9ybWFsaXplZElucHV0LnllYXIgfHwgMCxcclxuICAgICAgICAgICAgcXVhcnRlcnMgPSBub3JtYWxpemVkSW5wdXQucXVhcnRlciB8fCAwLFxyXG4gICAgICAgICAgICBtb250aHMgPSBub3JtYWxpemVkSW5wdXQubW9udGggfHwgMCxcclxuICAgICAgICAgICAgd2Vla3MgPSBub3JtYWxpemVkSW5wdXQud2VlayB8fCAwLFxyXG4gICAgICAgICAgICBkYXlzID0gbm9ybWFsaXplZElucHV0LmRheSB8fCAwLFxyXG4gICAgICAgICAgICBob3VycyA9IG5vcm1hbGl6ZWRJbnB1dC5ob3VyIHx8IDAsXHJcbiAgICAgICAgICAgIG1pbnV0ZXMgPSBub3JtYWxpemVkSW5wdXQubWludXRlIHx8IDAsXHJcbiAgICAgICAgICAgIHNlY29uZHMgPSBub3JtYWxpemVkSW5wdXQuc2Vjb25kIHx8IDAsXHJcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kcyA9IG5vcm1hbGl6ZWRJbnB1dC5taWxsaXNlY29uZCB8fCAwO1xyXG5cclxuICAgICAgICAvLyByZXByZXNlbnRhdGlvbiBmb3IgZGF0ZUFkZFJlbW92ZVxyXG4gICAgICAgIHRoaXMuX21pbGxpc2Vjb25kcyA9ICttaWxsaXNlY29uZHMgK1xyXG4gICAgICAgICAgICBzZWNvbmRzICogMWUzICsgLy8gMTAwMFxyXG4gICAgICAgICAgICBtaW51dGVzICogNmU0ICsgLy8gMTAwMCAqIDYwXHJcbiAgICAgICAgICAgIGhvdXJzICogMTAwMCAqIDYwICogNjA7IC8vdXNpbmcgMTAwMCAqIDYwICogNjAgaW5zdGVhZCBvZiAzNmU1IHRvIGF2b2lkIGZsb2F0aW5nIHBvaW50IHJvdW5kaW5nIGVycm9ycyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMjk3OFxyXG4gICAgICAgIC8vIEJlY2F1c2Ugb2YgZGF0ZUFkZFJlbW92ZSB0cmVhdHMgMjQgaG91cnMgYXMgZGlmZmVyZW50IGZyb20gYVxyXG4gICAgICAgIC8vIGRheSB3aGVuIHdvcmtpbmcgYXJvdW5kIERTVCwgd2UgbmVlZCB0byBzdG9yZSB0aGVtIHNlcGFyYXRlbHlcclxuICAgICAgICB0aGlzLl9kYXlzID0gK2RheXMgK1xyXG4gICAgICAgICAgICB3ZWVrcyAqIDc7XHJcbiAgICAgICAgLy8gSXQgaXMgaW1wb3NzaWJsZSB0cmFuc2xhdGUgbW9udGhzIGludG8gZGF5cyB3aXRob3V0IGtub3dpbmdcclxuICAgICAgICAvLyB3aGljaCBtb250aHMgeW91IGFyZSBhcmUgdGFsa2luZyBhYm91dCwgc28gd2UgaGF2ZSB0byBzdG9yZVxyXG4gICAgICAgIC8vIGl0IHNlcGFyYXRlbHkuXHJcbiAgICAgICAgdGhpcy5fbW9udGhzID0gK21vbnRocyArXHJcbiAgICAgICAgICAgIHF1YXJ0ZXJzICogMyArXHJcbiAgICAgICAgICAgIHllYXJzICogMTI7XHJcblxyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5fbG9jYWxlID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZSgpO1xyXG5cclxuICAgICAgICB0aGlzLl9idWJibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0R1cmF0aW9uIChvYmopIHtcclxuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRHVyYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGZ1bmN0aW9uIG9mZnNldCAodG9rZW4sIHNlcGFyYXRvcikge1xyXG4gICAgICAgIGFkZEZvcm1hdFRva2VuKHRva2VuLCAwLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLnV0Y09mZnNldCgpO1xyXG4gICAgICAgICAgICB2YXIgc2lnbiA9ICcrJztcclxuICAgICAgICAgICAgaWYgKG9mZnNldCA8IDApIHtcclxuICAgICAgICAgICAgICAgIG9mZnNldCA9IC1vZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICBzaWduID0gJy0nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzaWduICsgemVyb0ZpbGwofn4ob2Zmc2V0IC8gNjApLCAyKSArIHNlcGFyYXRvciArIHplcm9GaWxsKH5+KG9mZnNldCkgJSA2MCwgMik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb2Zmc2V0KCdaJywgJzonKTtcclxuICAgIG9mZnNldCgnWlonLCAnJyk7XHJcblxyXG4gICAgLy8gUEFSU0lOR1xyXG5cclxuICAgIGFkZFJlZ2V4VG9rZW4oJ1onLCAgbWF0Y2hTaG9ydE9mZnNldCk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdaWicsIG1hdGNoU2hvcnRPZmZzZXQpO1xyXG4gICAgYWRkUGFyc2VUb2tlbihbJ1onLCAnWlonXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnLl91c2VVVEMgPSB0cnVlO1xyXG4gICAgICAgIGNvbmZpZy5fdHptID0gb2Zmc2V0RnJvbVN0cmluZyhtYXRjaFNob3J0T2Zmc2V0LCBpbnB1dCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIRUxQRVJTXHJcblxyXG4gICAgLy8gdGltZXpvbmUgY2h1bmtlclxyXG4gICAgLy8gJysxMDowMCcgPiBbJzEwJywgICcwMCddXHJcbiAgICAvLyAnLTE1MzAnICA+IFsnLTE1JywgJzMwJ11cclxuICAgIHZhciBjaHVua09mZnNldCA9IC8oW1xcK1xcLV18XFxkXFxkKS9naTtcclxuXHJcbiAgICBmdW5jdGlvbiBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoZXIsIHN0cmluZykge1xyXG4gICAgICAgIHZhciBtYXRjaGVzID0gKChzdHJpbmcgfHwgJycpLm1hdGNoKG1hdGNoZXIpIHx8IFtdKTtcclxuICAgICAgICB2YXIgY2h1bmsgICA9IG1hdGNoZXNbbWF0Y2hlcy5sZW5ndGggLSAxXSB8fCBbXTtcclxuICAgICAgICB2YXIgcGFydHMgICA9IChjaHVuayArICcnKS5tYXRjaChjaHVua09mZnNldCkgfHwgWyctJywgMCwgMF07XHJcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSArKHBhcnRzWzFdICogNjApICsgdG9JbnQocGFydHNbMl0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcGFydHNbMF0gPT09ICcrJyA/IG1pbnV0ZXMgOiAtbWludXRlcztcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm4gYSBtb21lbnQgZnJvbSBpbnB1dCwgdGhhdCBpcyBsb2NhbC91dGMvem9uZSBlcXVpdmFsZW50IHRvIG1vZGVsLlxyXG4gICAgZnVuY3Rpb24gY2xvbmVXaXRoT2Zmc2V0KGlucHV0LCBtb2RlbCkge1xyXG4gICAgICAgIHZhciByZXMsIGRpZmY7XHJcbiAgICAgICAgaWYgKG1vZGVsLl9pc1VUQykge1xyXG4gICAgICAgICAgICByZXMgPSBtb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgICAgICBkaWZmID0gKGlzTW9tZW50KGlucHV0KSB8fCBpc0RhdGUoaW5wdXQpID8gaW5wdXQudmFsdWVPZigpIDogbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KS52YWx1ZU9mKCkpIC0gcmVzLnZhbHVlT2YoKTtcclxuICAgICAgICAgICAgLy8gVXNlIGxvdy1sZXZlbCBhcGksIGJlY2F1c2UgdGhpcyBmbiBpcyBsb3ctbGV2ZWwgYXBpLlxyXG4gICAgICAgICAgICByZXMuX2Quc2V0VGltZShyZXMuX2QudmFsdWVPZigpICsgZGlmZik7XHJcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQocmVzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCkubG9jYWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGF0ZU9mZnNldCAobSkge1xyXG4gICAgICAgIC8vIE9uIEZpcmVmb3guMjQgRGF0ZSNnZXRUaW1lem9uZU9mZnNldCByZXR1cm5zIGEgZmxvYXRpbmcgcG9pbnQuXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvcHVsbC8xODcxXHJcbiAgICAgICAgcmV0dXJuIC1NYXRoLnJvdW5kKG0uX2QuZ2V0VGltZXpvbmVPZmZzZXQoKSAvIDE1KSAqIDE1O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhPT0tTXHJcblxyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuZXZlciBhIG1vbWVudCBpcyBtdXRhdGVkLlxyXG4gICAgLy8gSXQgaXMgaW50ZW5kZWQgdG8ga2VlcCB0aGUgb2Zmc2V0IGluIHN5bmMgd2l0aCB0aGUgdGltZXpvbmUuXHJcbiAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0ID0gZnVuY3Rpb24gKCkge307XHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIC8vIGtlZXBMb2NhbFRpbWUgPSB0cnVlIG1lYW5zIG9ubHkgY2hhbmdlIHRoZSB0aW1lem9uZSwgd2l0aG91dFxyXG4gICAgLy8gYWZmZWN0aW5nIHRoZSBsb2NhbCBob3VyLiBTbyA1OjMxOjI2ICswMzAwIC0tW3V0Y09mZnNldCgyLCB0cnVlKV0tLT5cclxuICAgIC8vIDU6MzE6MjYgKzAyMDAgSXQgaXMgcG9zc2libGUgdGhhdCA1OjMxOjI2IGRvZXNuJ3QgZXhpc3Qgd2l0aCBvZmZzZXRcclxuICAgIC8vICswMjAwLCBzbyB3ZSBhZGp1c3QgdGhlIHRpbWUgYXMgbmVlZGVkLCB0byBiZSB2YWxpZC5cclxuICAgIC8vXHJcbiAgICAvLyBLZWVwaW5nIHRoZSB0aW1lIGFjdHVhbGx5IGFkZHMvc3VidHJhY3RzIChvbmUgaG91cilcclxuICAgIC8vIGZyb20gdGhlIGFjdHVhbCByZXByZXNlbnRlZCB0aW1lLiBUaGF0IGlzIHdoeSB3ZSBjYWxsIHVwZGF0ZU9mZnNldFxyXG4gICAgLy8gYSBzZWNvbmQgdGltZS4gSW4gY2FzZSBpdCB3YW50cyB1cyB0byBjaGFuZ2UgdGhlIG9mZnNldCBhZ2FpblxyXG4gICAgLy8gX2NoYW5nZUluUHJvZ3Jlc3MgPT0gdHJ1ZSBjYXNlLCB0aGVuIHdlIGhhdmUgdG8gYWRqdXN0LCBiZWNhdXNlXHJcbiAgICAvLyB0aGVyZSBpcyBubyBzdWNoIHRpbWUgaW4gdGhlIGdpdmVuIHRpbWV6b25lLlxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0T2Zmc2V0IChpbnB1dCwga2VlcExvY2FsVGltZSkge1xyXG4gICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLl9vZmZzZXQgfHwgMCxcclxuICAgICAgICAgICAgbG9jYWxBZGp1c3Q7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IG9mZnNldEZyb21TdHJpbmcobWF0Y2hTaG9ydE9mZnNldCwgaW5wdXQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGlucHV0KSA8IDE2KSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGlucHV0ICogNjA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc1VUQyAmJiBrZWVwTG9jYWxUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhbEFkanVzdCA9IGdldERhdGVPZmZzZXQodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gaW5wdXQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzVVRDID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGxvY2FsQWRqdXN0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkKGxvY2FsQWRqdXN0LCAnbScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvZmZzZXQgIT09IGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWtlZXBMb2NhbFRpbWUgfHwgdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QodGhpcywgY3JlYXRlX19jcmVhdGVEdXJhdGlvbihpbnB1dCAtIG9mZnNldCwgJ20nKSwgMSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQodGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gb2Zmc2V0IDogZ2V0RGF0ZU9mZnNldCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0Wm9uZSAoaW5wdXQsIGtlZXBMb2NhbFRpbWUpIHtcclxuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSAtaW5wdXQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KGlucHV0LCBrZWVwTG9jYWxUaW1lKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAtdGhpcy51dGNPZmZzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0T2Zmc2V0VG9VVEMgKGtlZXBMb2NhbFRpbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51dGNPZmZzZXQoMCwga2VlcExvY2FsVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0T2Zmc2V0VG9Mb2NhbCAoa2VlcExvY2FsVGltZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc1VUQykge1xyXG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCgwLCBrZWVwTG9jYWxUaW1lKTtcclxuICAgICAgICAgICAgdGhpcy5faXNVVEMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChrZWVwTG9jYWxUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnRyYWN0KGdldERhdGVPZmZzZXQodGhpcyksICdtJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0T2Zmc2V0VG9QYXJzZWRPZmZzZXQgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl90em0pIHtcclxuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQodGhpcy5fdHptKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLl9pID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldChvZmZzZXRGcm9tU3RyaW5nKG1hdGNoT2Zmc2V0LCB0aGlzLl9pKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhc0FsaWduZWRIb3VyT2Zmc2V0IChpbnB1dCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dCA9IGlucHV0ID8gbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KS51dGNPZmZzZXQoKSA6IDA7XHJcblxyXG4gICAgICAgIHJldHVybiAodGhpcy51dGNPZmZzZXQoKSAtIGlucHV0KSAlIDYwID09PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzRGF5bGlnaHRTYXZpbmdUaW1lICgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCgpID4gdGhpcy5jbG9uZSgpLm1vbnRoKDApLnV0Y09mZnNldCgpIHx8XHJcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KCkgPiB0aGlzLmNsb25lKCkubW9udGgoNSkudXRjT2Zmc2V0KClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzRGF5bGlnaHRTYXZpbmdUaW1lU2hpZnRlZCAoKSB7XHJcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9pc0RTVFNoaWZ0ZWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc0RTVFNoaWZ0ZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYyA9IHt9O1xyXG5cclxuICAgICAgICBjb3B5Q29uZmlnKGMsIHRoaXMpO1xyXG4gICAgICAgIGMgPSBwcmVwYXJlQ29uZmlnKGMpO1xyXG5cclxuICAgICAgICBpZiAoYy5fYSkge1xyXG4gICAgICAgICAgICB2YXIgb3RoZXIgPSBjLl9pc1VUQyA/IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyhjLl9hKSA6IGxvY2FsX19jcmVhdGVMb2NhbChjLl9hKTtcclxuICAgICAgICAgICAgdGhpcy5faXNEU1RTaGlmdGVkID0gdGhpcy5pc1ZhbGlkKCkgJiZcclxuICAgICAgICAgICAgICAgIGNvbXBhcmVBcnJheXMoYy5fYSwgb3RoZXIudG9BcnJheSgpKSA+IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5faXNEU1RTaGlmdGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5faXNEU1RTaGlmdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzTG9jYWwgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/ICF0aGlzLl9pc1VUQyA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzVXRjT2Zmc2V0ICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLl9pc1VUQyA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzVXRjICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLl9pc1VUQyAmJiB0aGlzLl9vZmZzZXQgPT09IDAgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBU1AuTkVUIGpzb24gZGF0ZSBmb3JtYXQgcmVnZXhcclxuICAgIHZhciBhc3BOZXRSZWdleCA9IC9eKFxcLSk/KD86KFxcZCopWy4gXSk/KFxcZCspXFw6KFxcZCspKD86XFw6KFxcZCspXFwuPyhcXGR7M30pP1xcZCopPyQvO1xyXG5cclxuICAgIC8vIGZyb20gaHR0cDovL2RvY3MuY2xvc3VyZS1saWJyYXJ5Lmdvb2dsZWNvZGUuY29tL2dpdC9jbG9zdXJlX2dvb2dfZGF0ZV9kYXRlLmpzLnNvdXJjZS5odG1sXHJcbiAgICAvLyBzb21ld2hhdCBtb3JlIGluIGxpbmUgd2l0aCA0LjQuMy4yIDIwMDQgc3BlYywgYnV0IGFsbG93cyBkZWNpbWFsIGFueXdoZXJlXHJcbiAgICAvLyBhbmQgZnVydGhlciBtb2RpZmllZCB0byBhbGxvdyBmb3Igc3RyaW5ncyBjb250YWluaW5nIGJvdGggd2VlayBhbmQgZGF5XHJcbiAgICB2YXIgaXNvUmVnZXggPSAvXigtKT9QKD86KC0/WzAtOSwuXSopWSk/KD86KC0/WzAtOSwuXSopTSk/KD86KC0/WzAtOSwuXSopVyk/KD86KC0/WzAtOSwuXSopRCk/KD86VCg/OigtP1swLTksLl0qKUgpPyg/OigtP1swLTksLl0qKU0pPyg/OigtP1swLTksLl0qKVMpPyk/JC87XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlX19jcmVhdGVEdXJhdGlvbiAoaW5wdXQsIGtleSkge1xyXG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGlucHV0LFxyXG4gICAgICAgICAgICAvLyBtYXRjaGluZyBhZ2FpbnN0IHJlZ2V4cCBpcyBleHBlbnNpdmUsIGRvIGl0IG9uIGRlbWFuZFxyXG4gICAgICAgICAgICBtYXRjaCA9IG51bGwsXHJcbiAgICAgICAgICAgIHNpZ24sXHJcbiAgICAgICAgICAgIHJldCxcclxuICAgICAgICAgICAgZGlmZlJlcztcclxuXHJcbiAgICAgICAgaWYgKGlzRHVyYXRpb24oaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgbXMgOiBpbnB1dC5fbWlsbGlzZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgZCAgOiBpbnB1dC5fZGF5cyxcclxuICAgICAgICAgICAgICAgIE0gIDogaW5wdXQuX21vbnRoc1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBkdXJhdGlvbiA9IHt9O1xyXG4gICAgICAgICAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbltrZXldID0gaW5wdXQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbi5taWxsaXNlY29uZHMgPSBpbnB1dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoISEobWF0Y2ggPSBhc3BOZXRSZWdleC5leGVjKGlucHV0KSkpIHtcclxuICAgICAgICAgICAgc2lnbiA9IChtYXRjaFsxXSA9PT0gJy0nKSA/IC0xIDogMTtcclxuICAgICAgICAgICAgZHVyYXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICB5ICA6IDAsXHJcbiAgICAgICAgICAgICAgICBkICA6IHRvSW50KG1hdGNoW0RBVEVdKSAgICAgICAgKiBzaWduLFxyXG4gICAgICAgICAgICAgICAgaCAgOiB0b0ludChtYXRjaFtIT1VSXSkgICAgICAgICogc2lnbixcclxuICAgICAgICAgICAgICAgIG0gIDogdG9JbnQobWF0Y2hbTUlOVVRFXSkgICAgICAqIHNpZ24sXHJcbiAgICAgICAgICAgICAgICBzICA6IHRvSW50KG1hdGNoW1NFQ09ORF0pICAgICAgKiBzaWduLFxyXG4gICAgICAgICAgICAgICAgbXMgOiB0b0ludChtYXRjaFtNSUxMSVNFQ09ORF0pICogc2lnblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoISEobWF0Y2ggPSBpc29SZWdleC5leGVjKGlucHV0KSkpIHtcclxuICAgICAgICAgICAgc2lnbiA9IChtYXRjaFsxXSA9PT0gJy0nKSA/IC0xIDogMTtcclxuICAgICAgICAgICAgZHVyYXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICB5IDogcGFyc2VJc28obWF0Y2hbMl0sIHNpZ24pLFxyXG4gICAgICAgICAgICAgICAgTSA6IHBhcnNlSXNvKG1hdGNoWzNdLCBzaWduKSxcclxuICAgICAgICAgICAgICAgIHcgOiBwYXJzZUlzbyhtYXRjaFs0XSwgc2lnbiksXHJcbiAgICAgICAgICAgICAgICBkIDogcGFyc2VJc28obWF0Y2hbNV0sIHNpZ24pLFxyXG4gICAgICAgICAgICAgICAgaCA6IHBhcnNlSXNvKG1hdGNoWzZdLCBzaWduKSxcclxuICAgICAgICAgICAgICAgIG0gOiBwYXJzZUlzbyhtYXRjaFs3XSwgc2lnbiksXHJcbiAgICAgICAgICAgICAgICBzIDogcGFyc2VJc28obWF0Y2hbOF0sIHNpZ24pXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIGlmIChkdXJhdGlvbiA9PSBudWxsKSB7Ly8gY2hlY2tzIGZvciBudWxsIG9yIHVuZGVmaW5lZFxyXG4gICAgICAgICAgICBkdXJhdGlvbiA9IHt9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGR1cmF0aW9uID09PSAnb2JqZWN0JyAmJiAoJ2Zyb20nIGluIGR1cmF0aW9uIHx8ICd0bycgaW4gZHVyYXRpb24pKSB7XHJcbiAgICAgICAgICAgIGRpZmZSZXMgPSBtb21lbnRzRGlmZmVyZW5jZShsb2NhbF9fY3JlYXRlTG9jYWwoZHVyYXRpb24uZnJvbSksIGxvY2FsX19jcmVhdGVMb2NhbChkdXJhdGlvbi50bykpO1xyXG5cclxuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcclxuICAgICAgICAgICAgZHVyYXRpb24ubXMgPSBkaWZmUmVzLm1pbGxpc2Vjb25kcztcclxuICAgICAgICAgICAgZHVyYXRpb24uTSA9IGRpZmZSZXMubW9udGhzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0ID0gbmV3IER1cmF0aW9uKGR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgaWYgKGlzRHVyYXRpb24oaW5wdXQpICYmIGhhc093blByb3AoaW5wdXQsICdfbG9jYWxlJykpIHtcclxuICAgICAgICAgICAgcmV0Ll9sb2NhbGUgPSBpbnB1dC5fbG9jYWxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uLmZuID0gRHVyYXRpb24ucHJvdG90eXBlO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlSXNvIChpbnAsIHNpZ24pIHtcclxuICAgICAgICAvLyBXZSdkIG5vcm1hbGx5IHVzZSB+fmlucCBmb3IgdGhpcywgYnV0IHVuZm9ydHVuYXRlbHkgaXQgYWxzb1xyXG4gICAgICAgIC8vIGNvbnZlcnRzIGZsb2F0cyB0byBpbnRzLlxyXG4gICAgICAgIC8vIGlucCBtYXkgYmUgdW5kZWZpbmVkLCBzbyBjYXJlZnVsIGNhbGxpbmcgcmVwbGFjZSBvbiBpdC5cclxuICAgICAgICB2YXIgcmVzID0gaW5wICYmIHBhcnNlRmxvYXQoaW5wLnJlcGxhY2UoJywnLCAnLicpKTtcclxuICAgICAgICAvLyBhcHBseSBzaWduIHdoaWxlIHdlJ3JlIGF0IGl0XHJcbiAgICAgICAgcmV0dXJuIChpc05hTihyZXMpID8gMCA6IHJlcykgKiBzaWduO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpIHtcclxuICAgICAgICB2YXIgcmVzID0ge21pbGxpc2Vjb25kczogMCwgbW9udGhzOiAwfTtcclxuXHJcbiAgICAgICAgcmVzLm1vbnRocyA9IG90aGVyLm1vbnRoKCkgLSBiYXNlLm1vbnRoKCkgK1xyXG4gICAgICAgICAgICAob3RoZXIueWVhcigpIC0gYmFzZS55ZWFyKCkpICogMTI7XHJcbiAgICAgICAgaWYgKGJhc2UuY2xvbmUoKS5hZGQocmVzLm1vbnRocywgJ00nKS5pc0FmdGVyKG90aGVyKSkge1xyXG4gICAgICAgICAgICAtLXJlcy5tb250aHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXMubWlsbGlzZWNvbmRzID0gK290aGVyIC0gKyhiYXNlLmNsb25lKCkuYWRkKHJlcy5tb250aHMsICdNJykpO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKSB7XHJcbiAgICAgICAgdmFyIHJlcztcclxuICAgICAgICBpZiAoIShiYXNlLmlzVmFsaWQoKSAmJiBvdGhlci5pc1ZhbGlkKCkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7bWlsbGlzZWNvbmRzOiAwLCBtb250aHM6IDB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3RoZXIgPSBjbG9uZVdpdGhPZmZzZXQob3RoZXIsIGJhc2UpO1xyXG4gICAgICAgIGlmIChiYXNlLmlzQmVmb3JlKG90aGVyKSkge1xyXG4gICAgICAgICAgICByZXMgPSBwb3NpdGl2ZU1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXMgPSBwb3NpdGl2ZU1vbWVudHNEaWZmZXJlbmNlKG90aGVyLCBiYXNlKTtcclxuICAgICAgICAgICAgcmVzLm1pbGxpc2Vjb25kcyA9IC1yZXMubWlsbGlzZWNvbmRzO1xyXG4gICAgICAgICAgICByZXMubW9udGhzID0gLXJlcy5tb250aHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFic1JvdW5kIChudW1iZXIpIHtcclxuICAgICAgICBpZiAobnVtYmVyIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgtMSAqIG51bWJlcikgKiAtMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChudW1iZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPOiByZW1vdmUgJ25hbWUnIGFyZyBhZnRlciBkZXByZWNhdGlvbiBpcyByZW1vdmVkXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVBZGRlcihkaXJlY3Rpb24sIG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCwgcGVyaW9kKSB7XHJcbiAgICAgICAgICAgIHZhciBkdXIsIHRtcDtcclxuICAgICAgICAgICAgLy9pbnZlcnQgdGhlIGFyZ3VtZW50cywgYnV0IGNvbXBsYWluIGFib3V0IGl0XHJcbiAgICAgICAgICAgIGlmIChwZXJpb2QgIT09IG51bGwgJiYgIWlzTmFOKCtwZXJpb2QpKSB7XHJcbiAgICAgICAgICAgICAgICBkZXByZWNhdGVTaW1wbGUobmFtZSwgJ21vbWVudCgpLicgKyBuYW1lICArICcocGVyaW9kLCBudW1iZXIpIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgbW9tZW50KCkuJyArIG5hbWUgKyAnKG51bWJlciwgcGVyaW9kKS4nKTtcclxuICAgICAgICAgICAgICAgIHRtcCA9IHZhbDsgdmFsID0gcGVyaW9kOyBwZXJpb2QgPSB0bXA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhbCA9IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gK3ZhbCA6IHZhbDtcclxuICAgICAgICAgICAgZHVyID0gY3JlYXRlX19jcmVhdGVEdXJhdGlvbih2YWwsIHBlcmlvZCk7XHJcbiAgICAgICAgICAgIGFkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QodGhpcywgZHVyLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QgKG1vbSwgZHVyYXRpb24sIGlzQWRkaW5nLCB1cGRhdGVPZmZzZXQpIHtcclxuICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gZHVyYXRpb24uX21pbGxpc2Vjb25kcyxcclxuICAgICAgICAgICAgZGF5cyA9IGFic1JvdW5kKGR1cmF0aW9uLl9kYXlzKSxcclxuICAgICAgICAgICAgbW9udGhzID0gYWJzUm91bmQoZHVyYXRpb24uX21vbnRocyk7XHJcblxyXG4gICAgICAgIGlmICghbW9tLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAvLyBObyBvcFxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVPZmZzZXQgPSB1cGRhdGVPZmZzZXQgPT0gbnVsbCA/IHRydWUgOiB1cGRhdGVPZmZzZXQ7XHJcblxyXG4gICAgICAgIGlmIChtaWxsaXNlY29uZHMpIHtcclxuICAgICAgICAgICAgbW9tLl9kLnNldFRpbWUobW9tLl9kLnZhbHVlT2YoKSArIG1pbGxpc2Vjb25kcyAqIGlzQWRkaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRheXMpIHtcclxuICAgICAgICAgICAgZ2V0X3NldF9fc2V0KG1vbSwgJ0RhdGUnLCBnZXRfc2V0X19nZXQobW9tLCAnRGF0ZScpICsgZGF5cyAqIGlzQWRkaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1vbnRocykge1xyXG4gICAgICAgICAgICBzZXRNb250aChtb20sIGdldF9zZXRfX2dldChtb20sICdNb250aCcpICsgbW9udGhzICogaXNBZGRpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXBkYXRlT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQobW9tLCBkYXlzIHx8IG1vbnRocyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBhZGRfc3VidHJhY3RfX2FkZCAgICAgID0gY3JlYXRlQWRkZXIoMSwgJ2FkZCcpO1xyXG4gICAgdmFyIGFkZF9zdWJ0cmFjdF9fc3VidHJhY3QgPSBjcmVhdGVBZGRlcigtMSwgJ3N1YnRyYWN0Jyk7XHJcblxyXG4gICAgZnVuY3Rpb24gbW9tZW50X2NhbGVuZGFyX19jYWxlbmRhciAodGltZSwgZm9ybWF0cykge1xyXG4gICAgICAgIC8vIFdlIHdhbnQgdG8gY29tcGFyZSB0aGUgc3RhcnQgb2YgdG9kYXksIHZzIHRoaXMuXHJcbiAgICAgICAgLy8gR2V0dGluZyBzdGFydC1vZi10b2RheSBkZXBlbmRzIG9uIHdoZXRoZXIgd2UncmUgbG9jYWwvdXRjL29mZnNldCBvciBub3QuXHJcbiAgICAgICAgdmFyIG5vdyA9IHRpbWUgfHwgbG9jYWxfX2NyZWF0ZUxvY2FsKCksXHJcbiAgICAgICAgICAgIHNvZCA9IGNsb25lV2l0aE9mZnNldChub3csIHRoaXMpLnN0YXJ0T2YoJ2RheScpLFxyXG4gICAgICAgICAgICBkaWZmID0gdGhpcy5kaWZmKHNvZCwgJ2RheXMnLCB0cnVlKSxcclxuICAgICAgICAgICAgZm9ybWF0ID0gZGlmZiA8IC02ID8gJ3NhbWVFbHNlJyA6XHJcbiAgICAgICAgICAgICAgICBkaWZmIDwgLTEgPyAnbGFzdFdlZWsnIDpcclxuICAgICAgICAgICAgICAgIGRpZmYgPCAwID8gJ2xhc3REYXknIDpcclxuICAgICAgICAgICAgICAgIGRpZmYgPCAxID8gJ3NhbWVEYXknIDpcclxuICAgICAgICAgICAgICAgIGRpZmYgPCAyID8gJ25leHREYXknIDpcclxuICAgICAgICAgICAgICAgIGRpZmYgPCA3ID8gJ25leHRXZWVrJyA6ICdzYW1lRWxzZSc7XHJcblxyXG4gICAgICAgIHZhciBvdXRwdXQgPSBmb3JtYXRzICYmIChpc0Z1bmN0aW9uKGZvcm1hdHNbZm9ybWF0XSkgPyBmb3JtYXRzW2Zvcm1hdF0oKSA6IGZvcm1hdHNbZm9ybWF0XSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdChvdXRwdXQgfHwgdGhpcy5sb2NhbGVEYXRhKCkuY2FsZW5kYXIoZm9ybWF0LCB0aGlzLCBsb2NhbF9fY3JlYXRlTG9jYWwobm93KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb25lICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1vbWVudCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0FmdGVyIChpbnB1dCwgdW5pdHMpIHtcclxuICAgICAgICB2YXIgbG9jYWxJbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KTtcclxuICAgICAgICBpZiAoISh0aGlzLmlzVmFsaWQoKSAmJiBsb2NhbElucHV0LmlzVmFsaWQoKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKCFpc1VuZGVmaW5lZCh1bml0cykgPyB1bml0cyA6ICdtaWxsaXNlY29uZCcpO1xyXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCkgPiBsb2NhbElucHV0LnZhbHVlT2YoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxJbnB1dC52YWx1ZU9mKCkgPCB0aGlzLmNsb25lKCkuc3RhcnRPZih1bml0cykudmFsdWVPZigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0JlZm9yZSAoaW5wdXQsIHVuaXRzKSB7XHJcbiAgICAgICAgdmFyIGxvY2FsSW5wdXQgPSBpc01vbWVudChpbnB1dCkgPyBpbnB1dCA6IGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCk7XHJcbiAgICAgICAgaWYgKCEodGhpcy5pc1ZhbGlkKCkgJiYgbG9jYWxJbnB1dC5pc1ZhbGlkKCkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyghaXNVbmRlZmluZWQodW5pdHMpID8gdW5pdHMgOiAnbWlsbGlzZWNvbmQnKTtcclxuICAgICAgICBpZiAodW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpIDwgbG9jYWxJbnB1dC52YWx1ZU9mKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5lbmRPZih1bml0cykudmFsdWVPZigpIDwgbG9jYWxJbnB1dC52YWx1ZU9mKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzQmV0d2VlbiAoZnJvbSwgdG8sIHVuaXRzLCBpbmNsdXNpdml0eSkge1xyXG4gICAgICAgIGluY2x1c2l2aXR5ID0gaW5jbHVzaXZpdHkgfHwgJygpJztcclxuICAgICAgICByZXR1cm4gKGluY2x1c2l2aXR5WzBdID09PSAnKCcgPyB0aGlzLmlzQWZ0ZXIoZnJvbSwgdW5pdHMpIDogIXRoaXMuaXNCZWZvcmUoZnJvbSwgdW5pdHMpKSAmJlxyXG4gICAgICAgICAgICAoaW5jbHVzaXZpdHlbMV0gPT09ICcpJyA/IHRoaXMuaXNCZWZvcmUodG8sIHVuaXRzKSA6ICF0aGlzLmlzQWZ0ZXIodG8sIHVuaXRzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNTYW1lIChpbnB1dCwgdW5pdHMpIHtcclxuICAgICAgICB2YXIgbG9jYWxJbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KSxcclxuICAgICAgICAgICAgaW5wdXRNcztcclxuICAgICAgICBpZiAoISh0aGlzLmlzVmFsaWQoKSAmJiBsb2NhbElucHV0LmlzVmFsaWQoKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzIHx8ICdtaWxsaXNlY29uZCcpO1xyXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCkgPT09IGxvY2FsSW5wdXQudmFsdWVPZigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlucHV0TXMgPSBsb2NhbElucHV0LnZhbHVlT2YoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5zdGFydE9mKHVuaXRzKS52YWx1ZU9mKCkgPD0gaW5wdXRNcyAmJiBpbnB1dE1zIDw9IHRoaXMuY2xvbmUoKS5lbmRPZih1bml0cykudmFsdWVPZigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc1NhbWVPckFmdGVyIChpbnB1dCwgdW5pdHMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1NhbWUoaW5wdXQsIHVuaXRzKSB8fCB0aGlzLmlzQWZ0ZXIoaW5wdXQsdW5pdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzU2FtZU9yQmVmb3JlIChpbnB1dCwgdW5pdHMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1NhbWUoaW5wdXQsIHVuaXRzKSB8fCB0aGlzLmlzQmVmb3JlKGlucHV0LHVuaXRzKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkaWZmIChpbnB1dCwgdW5pdHMsIGFzRmxvYXQpIHtcclxuICAgICAgICB2YXIgdGhhdCxcclxuICAgICAgICAgICAgem9uZURlbHRhLFxyXG4gICAgICAgICAgICBkZWx0YSwgb3V0cHV0O1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBOYU47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGF0ID0gY2xvbmVXaXRoT2Zmc2V0KGlucHV0LCB0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGF0LmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gTmFOO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgem9uZURlbHRhID0gKHRoYXQudXRjT2Zmc2V0KCkgLSB0aGlzLnV0Y09mZnNldCgpKSAqIDZlNDtcclxuXHJcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XHJcblxyXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ3llYXInIHx8IHVuaXRzID09PSAnbW9udGgnIHx8IHVuaXRzID09PSAncXVhcnRlcicpIHtcclxuICAgICAgICAgICAgb3V0cHV0ID0gbW9udGhEaWZmKHRoaXMsIHRoYXQpO1xyXG4gICAgICAgICAgICBpZiAodW5pdHMgPT09ICdxdWFydGVyJykge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0IC8gMztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh1bml0cyA9PT0gJ3llYXInKSB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQgLyAxMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRlbHRhID0gdGhpcyAtIHRoYXQ7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IHVuaXRzID09PSAnc2Vjb25kJyA/IGRlbHRhIC8gMWUzIDogLy8gMTAwMFxyXG4gICAgICAgICAgICAgICAgdW5pdHMgPT09ICdtaW51dGUnID8gZGVsdGEgLyA2ZTQgOiAvLyAxMDAwICogNjBcclxuICAgICAgICAgICAgICAgIHVuaXRzID09PSAnaG91cicgPyBkZWx0YSAvIDM2ZTUgOiAvLyAxMDAwICogNjAgKiA2MFxyXG4gICAgICAgICAgICAgICAgdW5pdHMgPT09ICdkYXknID8gKGRlbHRhIC0gem9uZURlbHRhKSAvIDg2NGU1IDogLy8gMTAwMCAqIDYwICogNjAgKiAyNCwgbmVnYXRlIGRzdFxyXG4gICAgICAgICAgICAgICAgdW5pdHMgPT09ICd3ZWVrJyA/IChkZWx0YSAtIHpvbmVEZWx0YSkgLyA2MDQ4ZTUgOiAvLyAxMDAwICogNjAgKiA2MCAqIDI0ICogNywgbmVnYXRlIGRzdFxyXG4gICAgICAgICAgICAgICAgZGVsdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhc0Zsb2F0ID8gb3V0cHV0IDogYWJzRmxvb3Iob3V0cHV0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb250aERpZmYgKGEsIGIpIHtcclxuICAgICAgICAvLyBkaWZmZXJlbmNlIGluIG1vbnRoc1xyXG4gICAgICAgIHZhciB3aG9sZU1vbnRoRGlmZiA9ICgoYi55ZWFyKCkgLSBhLnllYXIoKSkgKiAxMikgKyAoYi5tb250aCgpIC0gYS5tb250aCgpKSxcclxuICAgICAgICAgICAgLy8gYiBpcyBpbiAoYW5jaG9yIC0gMSBtb250aCwgYW5jaG9yICsgMSBtb250aClcclxuICAgICAgICAgICAgYW5jaG9yID0gYS5jbG9uZSgpLmFkZCh3aG9sZU1vbnRoRGlmZiwgJ21vbnRocycpLFxyXG4gICAgICAgICAgICBhbmNob3IyLCBhZGp1c3Q7XHJcblxyXG4gICAgICAgIGlmIChiIC0gYW5jaG9yIDwgMCkge1xyXG4gICAgICAgICAgICBhbmNob3IyID0gYS5jbG9uZSgpLmFkZCh3aG9sZU1vbnRoRGlmZiAtIDEsICdtb250aHMnKTtcclxuICAgICAgICAgICAgLy8gbGluZWFyIGFjcm9zcyB0aGUgbW9udGhcclxuICAgICAgICAgICAgYWRqdXN0ID0gKGIgLSBhbmNob3IpIC8gKGFuY2hvciAtIGFuY2hvcjIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFuY2hvcjIgPSBhLmNsb25lKCkuYWRkKHdob2xlTW9udGhEaWZmICsgMSwgJ21vbnRocycpO1xyXG4gICAgICAgICAgICAvLyBsaW5lYXIgYWNyb3NzIHRoZSBtb250aFxyXG4gICAgICAgICAgICBhZGp1c3QgPSAoYiAtIGFuY2hvcikgLyAoYW5jaG9yMiAtIGFuY2hvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NoZWNrIGZvciBuZWdhdGl2ZSB6ZXJvLCByZXR1cm4gemVybyBpZiBuZWdhdGl2ZSB6ZXJvXHJcbiAgICAgICAgcmV0dXJuIC0od2hvbGVNb250aERpZmYgKyBhZGp1c3QpIHx8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmRlZmF1bHRGb3JtYXQgPSAnWVlZWS1NTS1ERFRISDptbTpzc1onO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmRlZmF1bHRGb3JtYXRVdGMgPSAnWVlZWS1NTS1ERFRISDptbTpzc1taXSc7XHJcblxyXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkubG9jYWxlKCdlbicpLmZvcm1hdCgnZGRkIE1NTSBERCBZWVlZIEhIOm1tOnNzIFtHTVRdWlonKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb21lbnRfZm9ybWF0X190b0lTT1N0cmluZyAoKSB7XHJcbiAgICAgICAgdmFyIG0gPSB0aGlzLmNsb25lKCkudXRjKCk7XHJcbiAgICAgICAgaWYgKDAgPCBtLnllYXIoKSAmJiBtLnllYXIoKSA8PSA5OTk5KSB7XHJcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gbmF0aXZlIGltcGxlbWVudGF0aW9uIGlzIH41MHggZmFzdGVyLCB1c2UgaXQgd2hlbiB3ZSBjYW5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0TW9tZW50KG0sICdZWVlZLU1NLUREW1RdSEg6bW06c3MuU1NTW1pdJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0TW9tZW50KG0sICdZWVlZWVktTU0tRERbVF1ISDptbTpzcy5TU1NbWl0nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZm9ybWF0IChpbnB1dFN0cmluZykge1xyXG4gICAgICAgIGlmICghaW5wdXRTdHJpbmcpIHtcclxuICAgICAgICAgICAgaW5wdXRTdHJpbmcgPSB0aGlzLmlzVXRjKCkgPyB1dGlsc19ob29rc19faG9va3MuZGVmYXVsdEZvcm1hdFV0YyA6IHV0aWxzX2hvb2tzX19ob29rcy5kZWZhdWx0Rm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgb3V0cHV0ID0gZm9ybWF0TW9tZW50KHRoaXMsIGlucHV0U3RyaW5nKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkucG9zdGZvcm1hdChvdXRwdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZyb20gKHRpbWUsIHdpdGhvdXRTdWZmaXgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiZcclxuICAgICAgICAgICAgICAgICgoaXNNb21lbnQodGltZSkgJiYgdGltZS5pc1ZhbGlkKCkpIHx8XHJcbiAgICAgICAgICAgICAgICAgbG9jYWxfX2NyZWF0ZUxvY2FsKHRpbWUpLmlzVmFsaWQoKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24oe3RvOiB0aGlzLCBmcm9tOiB0aW1lfSkubG9jYWxlKHRoaXMubG9jYWxlKCkpLmh1bWFuaXplKCF3aXRob3V0U3VmZml4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZnJvbU5vdyAod2l0aG91dFN1ZmZpeCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZyb20obG9jYWxfX2NyZWF0ZUxvY2FsKCksIHdpdGhvdXRTdWZmaXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvICh0aW1lLCB3aXRob3V0U3VmZml4KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmXHJcbiAgICAgICAgICAgICAgICAoKGlzTW9tZW50KHRpbWUpICYmIHRpbWUuaXNWYWxpZCgpKSB8fFxyXG4gICAgICAgICAgICAgICAgIGxvY2FsX19jcmVhdGVMb2NhbCh0aW1lKS5pc1ZhbGlkKCkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uKHtmcm9tOiB0aGlzLCB0bzogdGltZX0pLmxvY2FsZSh0aGlzLmxvY2FsZSgpKS5odW1hbml6ZSghd2l0aG91dFN1ZmZpeCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvTm93ICh3aXRob3V0U3VmZml4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG8obG9jYWxfX2NyZWF0ZUxvY2FsKCksIHdpdGhvdXRTdWZmaXgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIHBhc3NlZCBhIGxvY2FsZSBrZXksIGl0IHdpbGwgc2V0IHRoZSBsb2NhbGUgZm9yIHRoaXNcclxuICAgIC8vIGluc3RhbmNlLiAgT3RoZXJ3aXNlLCBpdCB3aWxsIHJldHVybiB0aGUgbG9jYWxlIGNvbmZpZ3VyYXRpb25cclxuICAgIC8vIHZhcmlhYmxlcyBmb3IgdGhpcyBpbnN0YW5jZS5cclxuICAgIGZ1bmN0aW9uIGxvY2FsZSAoa2V5KSB7XHJcbiAgICAgICAgdmFyIG5ld0xvY2FsZURhdGE7XHJcblxyXG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlLl9hYmJyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld0xvY2FsZURhdGEgPSBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKGtleSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdMb2NhbGVEYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2FsZSA9IG5ld0xvY2FsZURhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBsYW5nID0gZGVwcmVjYXRlKFxyXG4gICAgICAgICdtb21lbnQoKS5sYW5nKCkgaXMgZGVwcmVjYXRlZC4gSW5zdGVhZCwgdXNlIG1vbWVudCgpLmxvY2FsZURhdGEoKSB0byBnZXQgdGhlIGxhbmd1YWdlIGNvbmZpZ3VyYXRpb24uIFVzZSBtb21lbnQoKS5sb2NhbGUoKSB0byBjaGFuZ2UgbGFuZ3VhZ2VzLicsXHJcbiAgICAgICAgZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZShrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBmdW5jdGlvbiBsb2NhbGVEYXRhICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0YXJ0T2YgKHVuaXRzKSB7XHJcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XHJcbiAgICAgICAgLy8gdGhlIGZvbGxvd2luZyBzd2l0Y2ggaW50ZW50aW9uYWxseSBvbWl0cyBicmVhayBrZXl3b3Jkc1xyXG4gICAgICAgIC8vIHRvIHV0aWxpemUgZmFsbGluZyB0aHJvdWdoIHRoZSBjYXNlcy5cclxuICAgICAgICBzd2l0Y2ggKHVuaXRzKSB7XHJcbiAgICAgICAgY2FzZSAneWVhcic6XHJcbiAgICAgICAgICAgIHRoaXMubW9udGgoMCk7XHJcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cclxuICAgICAgICBjYXNlICdxdWFydGVyJzpcclxuICAgICAgICBjYXNlICdtb250aCc6XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZSgxKTtcclxuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xyXG4gICAgICAgIGNhc2UgJ3dlZWsnOlxyXG4gICAgICAgIGNhc2UgJ2lzb1dlZWsnOlxyXG4gICAgICAgIGNhc2UgJ2RheSc6XHJcbiAgICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgICAgIHRoaXMuaG91cnMoMCk7XHJcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cclxuICAgICAgICBjYXNlICdob3VyJzpcclxuICAgICAgICAgICAgdGhpcy5taW51dGVzKDApO1xyXG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXHJcbiAgICAgICAgY2FzZSAnbWludXRlJzpcclxuICAgICAgICAgICAgdGhpcy5zZWNvbmRzKDApO1xyXG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXHJcbiAgICAgICAgY2FzZSAnc2Vjb25kJzpcclxuICAgICAgICAgICAgdGhpcy5taWxsaXNlY29uZHMoMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB3ZWVrcyBhcmUgYSBzcGVjaWFsIGNhc2VcclxuICAgICAgICBpZiAodW5pdHMgPT09ICd3ZWVrJykge1xyXG4gICAgICAgICAgICB0aGlzLndlZWtkYXkoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ2lzb1dlZWsnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNvV2Vla2RheSgxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHF1YXJ0ZXJzIGFyZSBhbHNvIHNwZWNpYWxcclxuICAgICAgICBpZiAodW5pdHMgPT09ICdxdWFydGVyJykge1xyXG4gICAgICAgICAgICB0aGlzLm1vbnRoKE1hdGguZmxvb3IodGhpcy5tb250aCgpIC8gMykgKiAzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVuZE9mICh1bml0cykge1xyXG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xyXG4gICAgICAgIGlmICh1bml0cyA9PT0gdW5kZWZpbmVkIHx8IHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gJ2RhdGUnIGlzIGFuIGFsaWFzIGZvciAnZGF5Jywgc28gaXQgc2hvdWxkIGJlIGNvbnNpZGVyZWQgYXMgc3VjaC5cclxuICAgICAgICBpZiAodW5pdHMgPT09ICdkYXRlJykge1xyXG4gICAgICAgICAgICB1bml0cyA9ICdkYXknO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRPZih1bml0cykuYWRkKDEsICh1bml0cyA9PT0gJ2lzb1dlZWsnID8gJ3dlZWsnIDogdW5pdHMpKS5zdWJ0cmFjdCgxLCAnbXMnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b190eXBlX192YWx1ZU9mICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZC52YWx1ZU9mKCkgLSAoKHRoaXMuX29mZnNldCB8fCAwKSAqIDYwMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1bml4ICgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLnZhbHVlT2YoKSAvIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvRGF0ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNldCA/IG5ldyBEYXRlKHRoaXMudmFsdWVPZigpKSA6IHRoaXMuX2Q7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9BcnJheSAoKSB7XHJcbiAgICAgICAgdmFyIG0gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBbbS55ZWFyKCksIG0ubW9udGgoKSwgbS5kYXRlKCksIG0uaG91cigpLCBtLm1pbnV0ZSgpLCBtLnNlY29uZCgpLCBtLm1pbGxpc2Vjb25kKCldO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvT2JqZWN0ICgpIHtcclxuICAgICAgICB2YXIgbSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeWVhcnM6IG0ueWVhcigpLFxyXG4gICAgICAgICAgICBtb250aHM6IG0ubW9udGgoKSxcclxuICAgICAgICAgICAgZGF0ZTogbS5kYXRlKCksXHJcbiAgICAgICAgICAgIGhvdXJzOiBtLmhvdXJzKCksXHJcbiAgICAgICAgICAgIG1pbnV0ZXM6IG0ubWludXRlcygpLFxyXG4gICAgICAgICAgICBzZWNvbmRzOiBtLnNlY29uZHMoKSxcclxuICAgICAgICAgICAgbWlsbGlzZWNvbmRzOiBtLm1pbGxpc2Vjb25kcygpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b0pTT04gKCkge1xyXG4gICAgICAgIC8vIG5ldyBEYXRlKE5hTikudG9KU09OKCkgPT09IG51bGxcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLnRvSVNPU3RyaW5nKCkgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vbWVudF92YWxpZF9faXNWYWxpZCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbGlkX19pc1ZhbGlkKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNpbmdGbGFncyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZCh7fSwgZ2V0UGFyc2luZ0ZsYWdzKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbnZhbGlkQXQgKCkge1xyXG4gICAgICAgIHJldHVybiBnZXRQYXJzaW5nRmxhZ3ModGhpcykub3ZlcmZsb3c7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRpb25EYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlucHV0OiB0aGlzLl9pLFxyXG4gICAgICAgICAgICBmb3JtYXQ6IHRoaXMuX2YsXHJcbiAgICAgICAgICAgIGxvY2FsZTogdGhpcy5fbG9jYWxlLFxyXG4gICAgICAgICAgICBpc1VUQzogdGhpcy5faXNVVEMsXHJcbiAgICAgICAgICAgIHN0cmljdDogdGhpcy5fc3RyaWN0XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydnZycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2Vla1llYXIoKSAlIDEwMDtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnR0cnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzb1dlZWtZZWFyKCkgJSAxMDA7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRXZWVrWWVhckZvcm1hdFRva2VuICh0b2tlbiwgZ2V0dGVyKSB7XHJcbiAgICAgICAgYWRkRm9ybWF0VG9rZW4oMCwgW3Rva2VuLCB0b2tlbi5sZW5ndGhdLCAwLCBnZXR0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ2dnZ2cnLCAgICAgJ3dlZWtZZWFyJyk7XHJcbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdnZ2dnZycsICAgICd3ZWVrWWVhcicpO1xyXG4gICAgYWRkV2Vla1llYXJGb3JtYXRUb2tlbignR0dHRycsICAnaXNvV2Vla1llYXInKTtcclxuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ0dHR0dHJywgJ2lzb1dlZWtZZWFyJyk7XHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygnd2Vla1llYXInLCAnZ2cnKTtcclxuICAgIGFkZFVuaXRBbGlhcygnaXNvV2Vla1llYXInLCAnR0cnKTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbignRycsICAgICAgbWF0Y2hTaWduZWQpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignZycsICAgICAgbWF0Y2hTaWduZWQpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignR0cnLCAgICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignZ2cnLCAgICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignR0dHRycsICAgbWF0Y2gxdG80LCBtYXRjaDQpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignZ2dnZycsICAgbWF0Y2gxdG80LCBtYXRjaDQpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignR0dHR0cnLCAgbWF0Y2gxdG82LCBtYXRjaDYpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignZ2dnZ2cnLCAgbWF0Y2gxdG82LCBtYXRjaDYpO1xyXG5cclxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFsnZ2dnZycsICdnZ2dnZycsICdHR0dHJywgJ0dHR0dHJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xyXG4gICAgICAgIHdlZWtbdG9rZW4uc3Vic3RyKDAsIDIpXSA9IHRvSW50KGlucHV0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFsnZ2cnLCAnR0cnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XHJcbiAgICAgICAgd2Vla1t0b2tlbl0gPSB1dGlsc19ob29rc19faG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldFdlZWtZZWFyIChpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBnZXRTZXRXZWVrWWVhckhlbHBlci5jYWxsKHRoaXMsXHJcbiAgICAgICAgICAgICAgICBpbnB1dCxcclxuICAgICAgICAgICAgICAgIHRoaXMud2VlaygpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWVrZGF5KCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3csXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3kpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldElTT1dlZWtZZWFyIChpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBnZXRTZXRXZWVrWWVhckhlbHBlci5jYWxsKHRoaXMsXHJcbiAgICAgICAgICAgICAgICBpbnB1dCwgdGhpcy5pc29XZWVrKCksIHRoaXMuaXNvV2Vla2RheSgpLCAxLCA0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRJU09XZWVrc0luWWVhciAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHdlZWtzSW5ZZWFyKHRoaXMueWVhcigpLCAxLCA0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRXZWVrc0luWWVhciAoKSB7XHJcbiAgICAgICAgdmFyIHdlZWtJbmZvID0gdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWs7XHJcbiAgICAgICAgcmV0dXJuIHdlZWtzSW5ZZWFyKHRoaXMueWVhcigpLCB3ZWVrSW5mby5kb3csIHdlZWtJbmZvLmRveSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0V2Vla1llYXJIZWxwZXIoaW5wdXQsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSB7XHJcbiAgICAgICAgdmFyIHdlZWtzVGFyZ2V0O1xyXG4gICAgICAgIGlmIChpbnB1dCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3ZWVrT2ZZZWFyKHRoaXMsIGRvdywgZG95KS55ZWFyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdlZWtzVGFyZ2V0ID0gd2Vla3NJblllYXIoaW5wdXQsIGRvdywgZG95KTtcclxuICAgICAgICAgICAgaWYgKHdlZWsgPiB3ZWVrc1RhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgd2VlayA9IHdlZWtzVGFyZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzZXRXZWVrQWxsLmNhbGwodGhpcywgaW5wdXQsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0V2Vla0FsbCh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpIHtcclxuICAgICAgICB2YXIgZGF5T2ZZZWFyRGF0YSA9IGRheU9mWWVhckZyb21XZWVrcyh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpLFxyXG4gICAgICAgICAgICBkYXRlID0gY3JlYXRlVVRDRGF0ZShkYXlPZlllYXJEYXRhLnllYXIsIDAsIGRheU9mWWVhckRhdGEuZGF5T2ZZZWFyKTtcclxuXHJcbiAgICAgICAgdGhpcy55ZWFyKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSk7XHJcbiAgICAgICAgdGhpcy5tb250aChkYXRlLmdldFVUQ01vbnRoKCkpO1xyXG4gICAgICAgIHRoaXMuZGF0ZShkYXRlLmdldFVUQ0RhdGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdRJywgMCwgJ1FvJywgJ3F1YXJ0ZXInKTtcclxuXHJcbiAgICAvLyBBTElBU0VTXHJcblxyXG4gICAgYWRkVW5pdEFsaWFzKCdxdWFydGVyJywgJ1EnKTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbignUScsIG1hdGNoMSk7XHJcbiAgICBhZGRQYXJzZVRva2VuKCdRJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xyXG4gICAgICAgIGFycmF5W01PTlRIXSA9ICh0b0ludChpbnB1dCkgLSAxKSAqIDM7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0UXVhcnRlciAoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IE1hdGguY2VpbCgodGhpcy5tb250aCgpICsgMSkgLyAzKSA6IHRoaXMubW9udGgoKGlucHV0IC0gMSkgKiAzICsgdGhpcy5tb250aCgpICUgMyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCd3JywgWyd3dycsIDJdLCAnd28nLCAnd2VlaycpO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1cnLCBbJ1dXJywgMl0sICdXbycsICdpc29XZWVrJyk7XHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygnd2VlaycsICd3Jyk7XHJcbiAgICBhZGRVbml0QWxpYXMoJ2lzb1dlZWsnLCAnVycpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCd3JywgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCd3dycsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ1cnLCAgbWF0Y2gxdG8yKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ1dXJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xyXG5cclxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFsndycsICd3dycsICdXJywgJ1dXJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xyXG4gICAgICAgIHdlZWtbdG9rZW4uc3Vic3RyKDAsIDEpXSA9IHRvSW50KGlucHV0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhFTFBFUlNcclxuXHJcbiAgICAvLyBMT0NBTEVTXHJcblxyXG4gICAgZnVuY3Rpb24gbG9jYWxlV2VlayAobW9tKSB7XHJcbiAgICAgICAgcmV0dXJuIHdlZWtPZlllYXIobW9tLCB0aGlzLl93ZWVrLmRvdywgdGhpcy5fd2Vlay5kb3kpLndlZWs7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVXZWVrID0ge1xyXG4gICAgICAgIGRvdyA6IDAsIC8vIFN1bmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxyXG4gICAgICAgIGRveSA6IDYgIC8vIFRoZSB3ZWVrIHRoYXQgY29udGFpbnMgSmFuIDFzdCBpcyB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhci5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gbG9jYWxlRmlyc3REYXlPZldlZWsgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrLmRvdztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2NhbGVGaXJzdERheU9mWWVhciAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWsuZG95O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXRXZWVrIChpbnB1dCkge1xyXG4gICAgICAgIHZhciB3ZWVrID0gdGhpcy5sb2NhbGVEYXRhKCkud2Vlayh0aGlzKTtcclxuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHdlZWsgOiB0aGlzLmFkZCgoaW5wdXQgLSB3ZWVrKSAqIDcsICdkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0SVNPV2VlayAoaW5wdXQpIHtcclxuICAgICAgICB2YXIgd2VlayA9IHdlZWtPZlllYXIodGhpcywgMSwgNCkud2VlaztcclxuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHdlZWsgOiB0aGlzLmFkZCgoaW5wdXQgLSB3ZWVrKSAqIDcsICdkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdEJywgWydERCcsIDJdLCAnRG8nLCAnZGF0ZScpO1xyXG5cclxuICAgIC8vIEFMSUFTRVNcclxuXHJcbiAgICBhZGRVbml0QWxpYXMoJ2RhdGUnLCAnRCcpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdEJywgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdERCcsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0RvJywgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcclxuICAgICAgICByZXR1cm4gaXNTdHJpY3QgPyBsb2NhbGUuX29yZGluYWxQYXJzZSA6IGxvY2FsZS5fb3JkaW5hbFBhcnNlTGVuaWVudDtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZFBhcnNlVG9rZW4oWydEJywgJ0REJ10sIERBVEUpO1xyXG4gICAgYWRkUGFyc2VUb2tlbignRG8nLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XHJcbiAgICAgICAgYXJyYXlbREFURV0gPSB0b0ludChpbnB1dC5tYXRjaChtYXRjaDF0bzIpWzBdLCAxMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgdmFyIGdldFNldERheU9mTW9udGggPSBtYWtlR2V0U2V0KCdEYXRlJywgdHJ1ZSk7XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdkJywgMCwgJ2RvJywgJ2RheScpO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdkZCcsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXNNaW4odGhpcywgZm9ybWF0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdkZGQnLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLndlZWtkYXlzU2hvcnQodGhpcywgZm9ybWF0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdkZGRkJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5cyh0aGlzLCBmb3JtYXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2UnLCAwLCAwLCAnd2Vla2RheScpO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0UnLCAwLCAwLCAnaXNvV2Vla2RheScpO1xyXG5cclxuICAgIC8vIEFMSUFTRVNcclxuXHJcbiAgICBhZGRVbml0QWxpYXMoJ2RheScsICdkJyk7XHJcbiAgICBhZGRVbml0QWxpYXMoJ3dlZWtkYXknLCAnZScpO1xyXG4gICAgYWRkVW5pdEFsaWFzKCdpc29XZWVrZGF5JywgJ0UnKTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbignZCcsICAgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdlJywgICAgbWF0Y2gxdG8yKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0UnLCAgICBtYXRjaDF0bzIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignZGQnLCAgIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5c01pblJlZ2V4KGlzU3RyaWN0KTtcclxuICAgIH0pO1xyXG4gICAgYWRkUmVnZXhUb2tlbignZGRkJywgICBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbGUud2Vla2RheXNTaG9ydFJlZ2V4KGlzU3RyaWN0KTtcclxuICAgIH0pO1xyXG4gICAgYWRkUmVnZXhUb2tlbignZGRkZCcsICAgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcclxuICAgICAgICByZXR1cm4gbG9jYWxlLndlZWtkYXlzUmVnZXgoaXNTdHJpY3QpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWydkZCcsICdkZGQnLCAnZGRkZCddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcclxuICAgICAgICB2YXIgd2Vla2RheSA9IGNvbmZpZy5fbG9jYWxlLndlZWtkYXlzUGFyc2UoaW5wdXQsIHRva2VuLCBjb25maWcuX3N0cmljdCk7XHJcbiAgICAgICAgLy8gaWYgd2UgZGlkbid0IGdldCBhIHdlZWtkYXkgbmFtZSwgbWFyayB0aGUgZGF0ZSBhcyBpbnZhbGlkXHJcbiAgICAgICAgaWYgKHdlZWtkYXkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB3ZWVrLmQgPSB3ZWVrZGF5O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmludmFsaWRXZWVrZGF5ID0gaW5wdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWydkJywgJ2UnLCAnRSddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcclxuICAgICAgICB3ZWVrW3Rva2VuXSA9IHRvSW50KGlucHV0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhFTFBFUlNcclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZVdlZWtkYXkoaW5wdXQsIGxvY2FsZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaXNOYU4oaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChpbnB1dCwgMTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXQgPSBsb2NhbGUud2Vla2RheXNQYXJzZShpbnB1dCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTE9DQUxFU1xyXG5cclxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXMgPSAnU3VuZGF5X01vbmRheV9UdWVzZGF5X1dlZG5lc2RheV9UaHVyc2RheV9GcmlkYXlfU2F0dXJkYXknLnNwbGl0KCdfJyk7XHJcbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrZGF5cyAobSwgZm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fd2Vla2RheXMpID8gdGhpcy5fd2Vla2RheXNbbS5kYXkoKV0gOlxyXG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1t0aGlzLl93ZWVrZGF5cy5pc0Zvcm1hdC50ZXN0KGZvcm1hdCkgPyAnZm9ybWF0JyA6ICdzdGFuZGFsb25lJ11bbS5kYXkoKV07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVXZWVrZGF5c1Nob3J0ID0gJ1N1bl9Nb25fVHVlX1dlZF9UaHVfRnJpX1NhdCcuc3BsaXQoJ18nKTtcclxuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzU2hvcnQgKG0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFttLmRheSgpXTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdExvY2FsZVdlZWtkYXlzTWluID0gJ1N1X01vX1R1X1dlX1RoX0ZyX1NhJy5zcGxpdCgnXycpO1xyXG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXNNaW4gKG0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNNaW5bbS5kYXkoKV07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGF5X29mX3dlZWtfX2hhbmRsZVN0cmljdFBhcnNlKHdlZWtkYXlOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xyXG4gICAgICAgIHZhciBpLCBpaSwgbW9tLCBsbGMgPSB3ZWVrZGF5TmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZSkge1xyXG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBtb20gPSBjcmVhdGVfdXRjX19jcmVhdGVVVEMoWzIwMDAsIDFdKS5kYXkoaSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldID0gdGhpcy53ZWVrZGF5c01pbihtb20sICcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldID0gdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlW2ldID0gdGhpcy53ZWVrZGF5cyhtb20sICcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RyaWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdkZGRkJykge1xyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fd2Vla2RheXNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0ID09PSAnZGRkJykge1xyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX21pbldlZWtkYXlzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ2RkZGQnKSB7XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChmb3JtYXQgPT09ICdkZGQnKSB7XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fd2Vla2RheXNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX21pbldlZWtkYXlzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fd2Vla2RheXNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzUGFyc2UgKHdlZWtkYXlOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xyXG4gICAgICAgIHZhciBpLCBtb20sIHJlZ2V4O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXlfb2Zfd2Vla19faGFuZGxlU3RyaWN0UGFyc2UuY2FsbCh0aGlzLCB3ZWVrZGF5TmFtZSwgZm9ybWF0LCBzdHJpY3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2UgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2UgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XHJcblxyXG4gICAgICAgICAgICBtb20gPSBjcmVhdGVfdXRjX19jcmVhdGVVVEMoWzIwMDAsIDFdKS5kYXkoaSk7XHJcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mdWxsV2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy53ZWVrZGF5cyhtb20sICcnKS5yZXBsYWNlKCcuJywgJ1xcLj8nKSArICckJywgJ2knKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnXFwuPycpICsgJyQnLCAnaScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy53ZWVrZGF5c01pbihtb20sICcnKS5yZXBsYWNlKCcuJywgJ1xcLj8nKSArICckJywgJ2knKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2VbaV0pIHtcclxuICAgICAgICAgICAgICAgIHJlZ2V4ID0gJ14nICsgdGhpcy53ZWVrZGF5cyhtb20sICcnKSArICd8XicgKyB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykgKyAnfF4nICsgdGhpcy53ZWVrZGF5c01pbihtb20sICcnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKHJlZ2V4LnJlcGxhY2UoJy4nLCAnJyksICdpJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdGVzdCB0aGUgcmVnZXhcclxuICAgICAgICAgICAgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdkZGRkJyAmJiB0aGlzLl9mdWxsV2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ2RkZCcgJiYgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnZGQnICYmIHRoaXMuX21pbldlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFzdHJpY3QgJiYgdGhpcy5fd2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldERheU9mV2VlayAoaW5wdXQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRheSA9IHRoaXMuX2lzVVRDID8gdGhpcy5fZC5nZXRVVENEYXkoKSA6IHRoaXMuX2QuZ2V0RGF5KCk7XHJcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaW5wdXQgPSBwYXJzZVdlZWtkYXkoaW5wdXQsIHRoaXMubG9jYWxlRGF0YSgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkKGlucHV0IC0gZGF5LCAnZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldExvY2FsZURheU9mV2VlayAoaW5wdXQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHdlZWtkYXkgPSAodGhpcy5kYXkoKSArIDcgLSB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3cpICUgNztcclxuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHdlZWtkYXkgOiB0aGlzLmFkZChpbnB1dCAtIHdlZWtkYXksICdkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0SVNPRGF5T2ZXZWVrIChpbnB1dCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgPyB0aGlzIDogTmFOO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBiZWhhdmVzIHRoZSBzYW1lIGFzIG1vbWVudCNkYXkgZXhjZXB0XHJcbiAgICAgICAgLy8gYXMgYSBnZXR0ZXIsIHJldHVybnMgNyBpbnN0ZWFkIG9mIDAgKDEtNyByYW5nZSBpbnN0ZWFkIG9mIDAtNilcclxuICAgICAgICAvLyBhcyBhIHNldHRlciwgc3VuZGF5IHNob3VsZCBiZWxvbmcgdG8gdGhlIHByZXZpb3VzIHdlZWsuXHJcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB0aGlzLmRheSgpIHx8IDcgOiB0aGlzLmRheSh0aGlzLmRheSgpICUgNyA/IGlucHV0IDogaW5wdXQgLSA3KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdFdlZWtkYXlzUmVnZXggPSBtYXRjaFdvcmQ7XHJcbiAgICBmdW5jdGlvbiB3ZWVrZGF5c1JlZ2V4IChpc1N0cmljdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcclxuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wdXRlV2Vla2RheXNQYXJzZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc1N0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNSZWdleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1N0cmljdFJlZ2V4ICYmIGlzU3RyaWN0ID9cclxuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXggOiB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdFdlZWtkYXlzU2hvcnRSZWdleCA9IG1hdGNoV29yZDtcclxuICAgIGZ1bmN0aW9uIHdlZWtkYXlzU2hvcnRSZWdleCAoaXNTdHJpY3QpIHtcclxuICAgICAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XHJcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzUmVnZXgnKSkge1xyXG4gICAgICAgICAgICAgICAgY29tcHV0ZVdlZWtkYXlzUGFyc2UuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNTdHJpY3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXggOiB0aGlzLl93ZWVrZGF5c1Nob3J0UmVnZXg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0V2Vla2RheXNNaW5SZWdleCA9IG1hdGNoV29yZDtcclxuICAgIGZ1bmN0aW9uIHdlZWtkYXlzTWluUmVnZXggKGlzU3RyaWN0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VFeGFjdCkge1xyXG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcclxuICAgICAgICAgICAgICAgIGNvbXB1dGVXZWVrZGF5c1BhcnNlLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNNaW5TdHJpY3RSZWdleDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblJlZ2V4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNNaW5TdHJpY3RSZWdleCA6IHRoaXMuX3dlZWtkYXlzTWluUmVnZXg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBjb21wdXRlV2Vla2RheXNQYXJzZSAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gY21wTGVuUmV2KGEsIGIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbWluUGllY2VzID0gW10sIHNob3J0UGllY2VzID0gW10sIGxvbmdQaWVjZXMgPSBbXSwgbWl4ZWRQaWVjZXMgPSBbXSxcclxuICAgICAgICAgICAgaSwgbW9tLCBtaW5wLCBzaG9ydHAsIGxvbmdwO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XHJcbiAgICAgICAgICAgIG1vbSA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyhbMjAwMCwgMV0pLmRheShpKTtcclxuICAgICAgICAgICAgbWlucCA9IHRoaXMud2Vla2RheXNNaW4obW9tLCAnJyk7XHJcbiAgICAgICAgICAgIHNob3J0cCA9IHRoaXMud2Vla2RheXNTaG9ydChtb20sICcnKTtcclxuICAgICAgICAgICAgbG9uZ3AgPSB0aGlzLndlZWtkYXlzKG1vbSwgJycpO1xyXG4gICAgICAgICAgICBtaW5QaWVjZXMucHVzaChtaW5wKTtcclxuICAgICAgICAgICAgc2hvcnRQaWVjZXMucHVzaChzaG9ydHApO1xyXG4gICAgICAgICAgICBsb25nUGllY2VzLnB1c2gobG9uZ3ApO1xyXG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKG1pbnApO1xyXG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKHNob3J0cCk7XHJcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2gobG9uZ3ApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIHdlZWtkYXkgKG9yIGFiYnIpIGlzIGEgcHJlZml4IG9mIGFub3RoZXIgaXRcclxuICAgICAgICAvLyB3aWxsIG1hdGNoIHRoZSBsb25nZXIgcGllY2UuXHJcbiAgICAgICAgbWluUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcclxuICAgICAgICBzaG9ydFBpZWNlcy5zb3J0KGNtcExlblJldik7XHJcbiAgICAgICAgbG9uZ1BpZWNlcy5zb3J0KGNtcExlblJldik7XHJcbiAgICAgICAgbWl4ZWRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgc2hvcnRQaWVjZXNbaV0gPSByZWdleEVzY2FwZShzaG9ydFBpZWNlc1tpXSk7XHJcbiAgICAgICAgICAgIGxvbmdQaWVjZXNbaV0gPSByZWdleEVzY2FwZShsb25nUGllY2VzW2ldKTtcclxuICAgICAgICAgICAgbWl4ZWRQaWVjZXNbaV0gPSByZWdleEVzY2FwZShtaXhlZFBpZWNlc1tpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl93ZWVrZGF5c1JlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbWl4ZWRQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xyXG4gICAgICAgIHRoaXMuX3dlZWtkYXlzU2hvcnRSZWdleCA9IHRoaXMuX3dlZWtkYXlzUmVnZXg7XHJcbiAgICAgICAgdGhpcy5fd2Vla2RheXNNaW5SZWdleCA9IHRoaXMuX3dlZWtkYXlzUmVnZXg7XHJcblxyXG4gICAgICAgIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBsb25nUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcclxuICAgICAgICB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBzaG9ydFBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XHJcbiAgICAgICAgdGhpcy5fd2Vla2RheXNNaW5TdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIG1pblBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdEREQnLCBbJ0REREQnLCAzXSwgJ0RERG8nLCAnZGF5T2ZZZWFyJyk7XHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygnZGF5T2ZZZWFyJywgJ0RERCcpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdEREQnLCAgbWF0Y2gxdG8zKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0REREQnLCBtYXRjaDMpO1xyXG4gICAgYWRkUGFyc2VUb2tlbihbJ0RERCcsICdEREREJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZy5fZGF5T2ZZZWFyID0gdG9JbnQoaW5wdXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSEVMUEVSU1xyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXREYXlPZlllYXIgKGlucHV0KSB7XHJcbiAgICAgICAgdmFyIGRheU9mWWVhciA9IE1hdGgucm91bmQoKHRoaXMuY2xvbmUoKS5zdGFydE9mKCdkYXknKSAtIHRoaXMuY2xvbmUoKS5zdGFydE9mKCd5ZWFyJykpIC8gODY0ZTUpICsgMTtcclxuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IGRheU9mWWVhciA6IHRoaXMuYWRkKChpbnB1dCAtIGRheU9mWWVhciksICdkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGZ1bmN0aW9uIGhGb3JtYXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaG91cnMoKSAlIDEyIHx8IDEyO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGtGb3JtYXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaG91cnMoKSB8fCAyNDtcclxuICAgIH1cclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignSCcsIFsnSEgnLCAyXSwgMCwgJ2hvdXInKTtcclxuICAgIGFkZEZvcm1hdFRva2VuKCdoJywgWydoaCcsIDJdLCAwLCBoRm9ybWF0KTtcclxuICAgIGFkZEZvcm1hdFRva2VuKCdrJywgWydraycsIDJdLCAwLCBrRm9ybWF0KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignaG1tJywgMCwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAnJyArIGhGb3JtYXQuYXBwbHkodGhpcykgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignaG1tc3MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnICsgaEZvcm1hdC5hcHBseSh0aGlzKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKSArXHJcbiAgICAgICAgICAgIHplcm9GaWxsKHRoaXMuc2Vjb25kcygpLCAyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdIbW0nLCAwLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnICsgdGhpcy5ob3VycygpICsgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0htbXNzJywgMCwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAnJyArIHRoaXMuaG91cnMoKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKSArXHJcbiAgICAgICAgICAgIHplcm9GaWxsKHRoaXMuc2Vjb25kcygpLCAyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1lcmlkaWVtICh0b2tlbiwgbG93ZXJjYXNlKSB7XHJcbiAgICAgICAgYWRkRm9ybWF0VG9rZW4odG9rZW4sIDAsIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm1lcmlkaWVtKHRoaXMuaG91cnMoKSwgdGhpcy5taW51dGVzKCksIGxvd2VyY2FzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbWVyaWRpZW0oJ2EnLCB0cnVlKTtcclxuICAgIG1lcmlkaWVtKCdBJywgZmFsc2UpO1xyXG5cclxuICAgIC8vIEFMSUFTRVNcclxuXHJcbiAgICBhZGRVbml0QWxpYXMoJ2hvdXInLCAnaCcpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBmdW5jdGlvbiBtYXRjaE1lcmlkaWVtIChpc1N0cmljdCwgbG9jYWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5fbWVyaWRpZW1QYXJzZTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdhJywgIG1hdGNoTWVyaWRpZW0pO1xyXG4gICAgYWRkUmVnZXhUb2tlbignQScsICBtYXRjaE1lcmlkaWVtKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0gnLCAgbWF0Y2gxdG8yKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2gnLCAgbWF0Y2gxdG8yKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0hIJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignaGgnLCBtYXRjaDF0bzIsIG1hdGNoMik7XHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbignaG1tJywgbWF0Y2gzdG80KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2htbXNzJywgbWF0Y2g1dG82KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0htbScsIG1hdGNoM3RvNCk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdIbW1zcycsIG1hdGNoNXRvNik7XHJcblxyXG4gICAgYWRkUGFyc2VUb2tlbihbJ0gnLCAnSEgnXSwgSE9VUik7XHJcbiAgICBhZGRQYXJzZVRva2VuKFsnYScsICdBJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZy5faXNQbSA9IGNvbmZpZy5fbG9jYWxlLmlzUE0oaW5wdXQpO1xyXG4gICAgICAgIGNvbmZpZy5fbWVyaWRpZW0gPSBpbnB1dDtcclxuICAgIH0pO1xyXG4gICAgYWRkUGFyc2VUb2tlbihbJ2gnLCAnaGgnXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XHJcbiAgICAgICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dCk7XHJcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHRydWU7XHJcbiAgICB9KTtcclxuICAgIGFkZFBhcnNlVG9rZW4oJ2htbScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xyXG4gICAgICAgIHZhciBwb3MgPSBpbnB1dC5sZW5ndGggLSAyO1xyXG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvcykpO1xyXG4gICAgICAgIGFycmF5W01JTlVURV0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zKSk7XHJcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHRydWU7XHJcbiAgICB9KTtcclxuICAgIGFkZFBhcnNlVG9rZW4oJ2htbXNzJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHBvczEgPSBpbnB1dC5sZW5ndGggLSA0O1xyXG4gICAgICAgIHZhciBwb3MyID0gaW5wdXQubGVuZ3RoIC0gMjtcclxuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MxKSk7XHJcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MxLCAyKSk7XHJcbiAgICAgICAgYXJyYXlbU0VDT05EXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MyKSk7XHJcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHRydWU7XHJcbiAgICB9KTtcclxuICAgIGFkZFBhcnNlVG9rZW4oJ0htbScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xyXG4gICAgICAgIHZhciBwb3MgPSBpbnB1dC5sZW5ndGggLSAyO1xyXG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvcykpO1xyXG4gICAgICAgIGFycmF5W01JTlVURV0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zKSk7XHJcbiAgICB9KTtcclxuICAgIGFkZFBhcnNlVG9rZW4oJ0htbXNzJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHBvczEgPSBpbnB1dC5sZW5ndGggLSA0O1xyXG4gICAgICAgIHZhciBwb3MyID0gaW5wdXQubGVuZ3RoIC0gMjtcclxuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MxKSk7XHJcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MxLCAyKSk7XHJcbiAgICAgICAgYXJyYXlbU0VDT05EXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MyKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBMT0NBTEVTXHJcblxyXG4gICAgZnVuY3Rpb24gbG9jYWxlSXNQTSAoaW5wdXQpIHtcclxuICAgICAgICAvLyBJRTggUXVpcmtzIE1vZGUgJiBJRTcgU3RhbmRhcmRzIE1vZGUgZG8gbm90IGFsbG93IGFjY2Vzc2luZyBzdHJpbmdzIGxpa2UgYXJyYXlzXHJcbiAgICAgICAgLy8gVXNpbmcgY2hhckF0IHNob3VsZCBiZSBtb3JlIGNvbXBhdGlibGUuXHJcbiAgICAgICAgcmV0dXJuICgoaW5wdXQgKyAnJykudG9Mb3dlckNhc2UoKS5jaGFyQXQoMCkgPT09ICdwJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVNZXJpZGllbVBhcnNlID0gL1thcF1cXC4/bT9cXC4/L2k7XHJcbiAgICBmdW5jdGlvbiBsb2NhbGVNZXJpZGllbSAoaG91cnMsIG1pbnV0ZXMsIGlzTG93ZXIpIHtcclxuICAgICAgICBpZiAoaG91cnMgPiAxMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaXNMb3dlciA/ICdwbScgOiAnUE0nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpc0xvd2VyID8gJ2FtJyA6ICdBTSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgLy8gU2V0dGluZyB0aGUgaG91ciBzaG91bGQga2VlcCB0aGUgdGltZSwgYmVjYXVzZSB0aGUgdXNlciBleHBsaWNpdGx5XHJcbiAgICAvLyBzcGVjaWZpZWQgd2hpY2ggaG91ciBoZSB3YW50cy4gU28gdHJ5aW5nIHRvIG1haW50YWluIHRoZSBzYW1lIGhvdXIgKGluXHJcbiAgICAvLyBhIG5ldyB0aW1lem9uZSkgbWFrZXMgc2Vuc2UuIEFkZGluZy9zdWJ0cmFjdGluZyBob3VycyBkb2VzIG5vdCBmb2xsb3dcclxuICAgIC8vIHRoaXMgcnVsZS5cclxuICAgIHZhciBnZXRTZXRIb3VyID0gbWFrZUdldFNldCgnSG91cnMnLCB0cnVlKTtcclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ20nLCBbJ21tJywgMl0sIDAsICdtaW51dGUnKTtcclxuXHJcbiAgICAvLyBBTElBU0VTXHJcblxyXG4gICAgYWRkVW5pdEFsaWFzKCdtaW51dGUnLCAnbScpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdtJywgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdtbScsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcclxuICAgIGFkZFBhcnNlVG9rZW4oWydtJywgJ21tJ10sIE1JTlVURSk7XHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIHZhciBnZXRTZXRNaW51dGUgPSBtYWtlR2V0U2V0KCdNaW51dGVzJywgZmFsc2UpO1xyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbigncycsIFsnc3MnLCAyXSwgMCwgJ3NlY29uZCcpO1xyXG5cclxuICAgIC8vIEFMSUFTRVNcclxuXHJcbiAgICBhZGRVbml0QWxpYXMoJ3NlY29uZCcsICdzJyk7XHJcblxyXG4gICAgLy8gUEFSU0lOR1xyXG5cclxuICAgIGFkZFJlZ2V4VG9rZW4oJ3MnLCAgbWF0Y2gxdG8yKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ3NzJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xyXG4gICAgYWRkUGFyc2VUb2tlbihbJ3MnLCAnc3MnXSwgU0VDT05EKTtcclxuXHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgdmFyIGdldFNldFNlY29uZCA9IG1ha2VHZXRTZXQoJ1NlY29uZHMnLCBmYWxzZSk7XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdTJywgMCwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB+fih0aGlzLm1pbGxpc2Vjb25kKCkgLyAxMDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTUycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIH5+KHRoaXMubWlsbGlzZWNvbmQoKSAvIDEwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTJywgM10sIDAsICdtaWxsaXNlY29uZCcpO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTJywgNF0sIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTA7XHJcbiAgICB9KTtcclxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1MnLCA1XSwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDA7XHJcbiAgICB9KTtcclxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1NTJywgNl0sIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDtcclxuICAgIH0pO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTJywgN10sIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDA7XHJcbiAgICB9KTtcclxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1NTU1MnLCA4XSwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDA7XHJcbiAgICB9KTtcclxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1NTU1NTJywgOV0sIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDAwMDtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvLyBBTElBU0VTXHJcblxyXG4gICAgYWRkVW5pdEFsaWFzKCdtaWxsaXNlY29uZCcsICdtcycpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdTJywgICAgbWF0Y2gxdG8zLCBtYXRjaDEpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignU1MnLCAgIG1hdGNoMXRvMywgbWF0Y2gyKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ1NTUycsICBtYXRjaDF0bzMsIG1hdGNoMyk7XHJcblxyXG4gICAgdmFyIHRva2VuO1xyXG4gICAgZm9yICh0b2tlbiA9ICdTU1NTJzsgdG9rZW4ubGVuZ3RoIDw9IDk7IHRva2VuICs9ICdTJykge1xyXG4gICAgICAgIGFkZFJlZ2V4VG9rZW4odG9rZW4sIG1hdGNoVW5zaWduZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlTXMoaW5wdXQsIGFycmF5KSB7XHJcbiAgICAgICAgYXJyYXlbTUlMTElTRUNPTkRdID0gdG9JbnQoKCcwLicgKyBpbnB1dCkgKiAxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHRva2VuID0gJ1MnOyB0b2tlbi5sZW5ndGggPD0gOTsgdG9rZW4gKz0gJ1MnKSB7XHJcbiAgICAgICAgYWRkUGFyc2VUb2tlbih0b2tlbiwgcGFyc2VNcyk7XHJcbiAgICB9XHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgdmFyIGdldFNldE1pbGxpc2Vjb25kID0gbWFrZUdldFNldCgnTWlsbGlzZWNvbmRzJywgZmFsc2UpO1xyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbigneicsICAwLCAwLCAnem9uZUFiYnInKTtcclxuICAgIGFkZEZvcm1hdFRva2VuKCd6eicsIDAsIDAsICd6b25lTmFtZScpO1xyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRab25lQWJiciAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gJ1VUQycgOiAnJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRab25lTmFtZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gJ0Nvb3JkaW5hdGVkIFVuaXZlcnNhbCBUaW1lJyA6ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBtb21lbnRQcm90b3R5cGVfX3Byb3RvID0gTW9tZW50LnByb3RvdHlwZTtcclxuXHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmFkZCAgICAgICAgICAgICAgID0gYWRkX3N1YnRyYWN0X19hZGQ7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmNhbGVuZGFyICAgICAgICAgID0gbW9tZW50X2NhbGVuZGFyX19jYWxlbmRhcjtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uY2xvbmUgICAgICAgICAgICAgPSBjbG9uZTtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGlmZiAgICAgICAgICAgICAgPSBkaWZmO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5lbmRPZiAgICAgICAgICAgICA9IGVuZE9mO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5mb3JtYXQgICAgICAgICAgICA9IGZvcm1hdDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZnJvbSAgICAgICAgICAgICAgPSBmcm9tO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5mcm9tTm93ICAgICAgICAgICA9IGZyb21Ob3c7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvICAgICAgICAgICAgICAgID0gdG87XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvTm93ICAgICAgICAgICAgID0gdG9Ob3c7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmdldCAgICAgICAgICAgICAgID0gZ2V0U2V0O1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pbnZhbGlkQXQgICAgICAgICA9IGludmFsaWRBdDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNBZnRlciAgICAgICAgICAgPSBpc0FmdGVyO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0JlZm9yZSAgICAgICAgICA9IGlzQmVmb3JlO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0JldHdlZW4gICAgICAgICA9IGlzQmV0d2VlbjtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNTYW1lICAgICAgICAgICAgPSBpc1NhbWU7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzU2FtZU9yQWZ0ZXIgICAgID0gaXNTYW1lT3JBZnRlcjtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNTYW1lT3JCZWZvcmUgICAgPSBpc1NhbWVPckJlZm9yZTtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNWYWxpZCAgICAgICAgICAgPSBtb21lbnRfdmFsaWRfX2lzVmFsaWQ7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmxhbmcgICAgICAgICAgICAgID0gbGFuZztcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubG9jYWxlICAgICAgICAgICAgPSBsb2NhbGU7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmxvY2FsZURhdGEgICAgICAgID0gbG9jYWxlRGF0YTtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWF4ICAgICAgICAgICAgICAgPSBwcm90b3R5cGVNYXg7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1pbiAgICAgICAgICAgICAgID0gcHJvdG90eXBlTWluO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5wYXJzaW5nRmxhZ3MgICAgICA9IHBhcnNpbmdGbGFncztcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uc2V0ICAgICAgICAgICAgICAgPSBnZXRTZXQ7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnN0YXJ0T2YgICAgICAgICAgID0gc3RhcnRPZjtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uc3VidHJhY3QgICAgICAgICAgPSBhZGRfc3VidHJhY3RfX3N1YnRyYWN0O1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b0FycmF5ICAgICAgICAgICA9IHRvQXJyYXk7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvT2JqZWN0ICAgICAgICAgID0gdG9PYmplY3Q7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvRGF0ZSAgICAgICAgICAgID0gdG9EYXRlO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b0lTT1N0cmluZyAgICAgICA9IG1vbWVudF9mb3JtYXRfX3RvSVNPU3RyaW5nO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b0pTT04gICAgICAgICAgICA9IHRvSlNPTjtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9TdHJpbmcgICAgICAgICAgPSB0b1N0cmluZztcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udW5peCAgICAgICAgICAgICAgPSB1bml4O1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by52YWx1ZU9mICAgICAgICAgICA9IHRvX3R5cGVfX3ZhbHVlT2Y7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmNyZWF0aW9uRGF0YSAgICAgID0gY3JlYXRpb25EYXRhO1xyXG5cclxuICAgIC8vIFllYXJcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ueWVhciAgICAgICA9IGdldFNldFllYXI7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzTGVhcFllYXIgPSBnZXRJc0xlYXBZZWFyO1xyXG5cclxuICAgIC8vIFdlZWsgWWVhclxyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by53ZWVrWWVhciAgICA9IGdldFNldFdlZWtZZWFyO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc29XZWVrWWVhciA9IGdldFNldElTT1dlZWtZZWFyO1xyXG5cclxuICAgIC8vIFF1YXJ0ZXJcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ucXVhcnRlciA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8ucXVhcnRlcnMgPSBnZXRTZXRRdWFydGVyO1xyXG5cclxuICAgIC8vIE1vbnRoXHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1vbnRoICAgICAgID0gZ2V0U2V0TW9udGg7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRheXNJbk1vbnRoID0gZ2V0RGF5c0luTW9udGg7XHJcblxyXG4gICAgLy8gV2Vla1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by53ZWVrICAgICAgICAgICA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8ud2Vla3MgICAgICAgID0gZ2V0U2V0V2VlaztcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNvV2VlayAgICAgICAgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWtzICAgICA9IGdldFNldElTT1dlZWs7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLndlZWtzSW5ZZWFyICAgID0gZ2V0V2Vla3NJblllYXI7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWtzSW5ZZWFyID0gZ2V0SVNPV2Vla3NJblllYXI7XHJcblxyXG4gICAgLy8gRGF5XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRhdGUgICAgICAgPSBnZXRTZXREYXlPZk1vbnRoO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5kYXkgICAgICAgID0gbW9tZW50UHJvdG90eXBlX19wcm90by5kYXlzICAgICAgICAgICAgID0gZ2V0U2V0RGF5T2ZXZWVrO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by53ZWVrZGF5ICAgID0gZ2V0U2V0TG9jYWxlRGF5T2ZXZWVrO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc29XZWVrZGF5ID0gZ2V0U2V0SVNPRGF5T2ZXZWVrO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5kYXlPZlllYXIgID0gZ2V0U2V0RGF5T2ZZZWFyO1xyXG5cclxuICAgIC8vIEhvdXJcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaG91ciA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaG91cnMgPSBnZXRTZXRIb3VyO1xyXG5cclxuICAgIC8vIE1pbnV0ZVxyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5taW51dGUgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1pbnV0ZXMgPSBnZXRTZXRNaW51dGU7XHJcblxyXG4gICAgLy8gU2Vjb25kXHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnNlY29uZCA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8uc2Vjb25kcyA9IGdldFNldFNlY29uZDtcclxuXHJcbiAgICAvLyBNaWxsaXNlY29uZFxyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5taWxsaXNlY29uZCA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWlsbGlzZWNvbmRzID0gZ2V0U2V0TWlsbGlzZWNvbmQ7XHJcblxyXG4gICAgLy8gT2Zmc2V0XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnV0Y09mZnNldCAgICAgICAgICAgID0gZ2V0U2V0T2Zmc2V0O1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by51dGMgICAgICAgICAgICAgICAgICA9IHNldE9mZnNldFRvVVRDO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5sb2NhbCAgICAgICAgICAgICAgICA9IHNldE9mZnNldFRvTG9jYWw7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnBhcnNlWm9uZSAgICAgICAgICAgID0gc2V0T2Zmc2V0VG9QYXJzZWRPZmZzZXQ7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmhhc0FsaWduZWRIb3VyT2Zmc2V0ID0gaGFzQWxpZ25lZEhvdXJPZmZzZXQ7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzRFNUICAgICAgICAgICAgICAgID0gaXNEYXlsaWdodFNhdmluZ1RpbWU7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzRFNUU2hpZnRlZCAgICAgICAgID0gaXNEYXlsaWdodFNhdmluZ1RpbWVTaGlmdGVkO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0xvY2FsICAgICAgICAgICAgICA9IGlzTG9jYWw7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzVXRjT2Zmc2V0ICAgICAgICAgID0gaXNVdGNPZmZzZXQ7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzVXRjICAgICAgICAgICAgICAgID0gaXNVdGM7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzVVRDICAgICAgICAgICAgICAgID0gaXNVdGM7XHJcblxyXG4gICAgLy8gVGltZXpvbmVcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uem9uZUFiYnIgPSBnZXRab25lQWJicjtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uem9uZU5hbWUgPSBnZXRab25lTmFtZTtcclxuXHJcbiAgICAvLyBEZXByZWNhdGlvbnNcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF0ZXMgID0gZGVwcmVjYXRlKCdkYXRlcyBhY2Nlc3NvciBpcyBkZXByZWNhdGVkLiBVc2UgZGF0ZSBpbnN0ZWFkLicsIGdldFNldERheU9mTW9udGgpO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5tb250aHMgPSBkZXByZWNhdGUoJ21vbnRocyBhY2Nlc3NvciBpcyBkZXByZWNhdGVkLiBVc2UgbW9udGggaW5zdGVhZCcsIGdldFNldE1vbnRoKTtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ueWVhcnMgID0gZGVwcmVjYXRlKCd5ZWFycyBhY2Nlc3NvciBpcyBkZXByZWNhdGVkLiBVc2UgeWVhciBpbnN0ZWFkJywgZ2V0U2V0WWVhcik7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnpvbmUgICA9IGRlcHJlY2F0ZSgnbW9tZW50KCkuem9uZSBpcyBkZXByZWNhdGVkLCB1c2UgbW9tZW50KCkudXRjT2Zmc2V0IGluc3RlYWQuIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNzc5JywgZ2V0U2V0Wm9uZSk7XHJcblxyXG4gICAgdmFyIG1vbWVudFByb3RvdHlwZSA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG87XHJcblxyXG4gICAgZnVuY3Rpb24gbW9tZW50X19jcmVhdGVVbml4IChpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQgKiAxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb21lbnRfX2NyZWF0ZUluWm9uZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsX19jcmVhdGVMb2NhbC5hcHBseShudWxsLCBhcmd1bWVudHMpLnBhcnNlWm9uZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0Q2FsZW5kYXIgPSB7XHJcbiAgICAgICAgc2FtZURheSA6ICdbVG9kYXkgYXRdIExUJyxcclxuICAgICAgICBuZXh0RGF5IDogJ1tUb21vcnJvdyBhdF0gTFQnLFxyXG4gICAgICAgIG5leHRXZWVrIDogJ2RkZGQgW2F0XSBMVCcsXHJcbiAgICAgICAgbGFzdERheSA6ICdbWWVzdGVyZGF5IGF0XSBMVCcsXHJcbiAgICAgICAgbGFzdFdlZWsgOiAnW0xhc3RdIGRkZGQgW2F0XSBMVCcsXHJcbiAgICAgICAgc2FtZUVsc2UgOiAnTCdcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gbG9jYWxlX2NhbGVuZGFyX19jYWxlbmRhciAoa2V5LCBtb20sIG5vdykge1xyXG4gICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLl9jYWxlbmRhcltrZXldO1xyXG4gICAgICAgIHJldHVybiBpc0Z1bmN0aW9uKG91dHB1dCkgPyBvdXRwdXQuY2FsbChtb20sIG5vdykgOiBvdXRwdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRMb25nRGF0ZUZvcm1hdCA9IHtcclxuICAgICAgICBMVFMgIDogJ2g6bW06c3MgQScsXHJcbiAgICAgICAgTFQgICA6ICdoOm1tIEEnLFxyXG4gICAgICAgIEwgICAgOiAnTU0vREQvWVlZWScsXHJcbiAgICAgICAgTEwgICA6ICdNTU1NIEQsIFlZWVknLFxyXG4gICAgICAgIExMTCAgOiAnTU1NTSBELCBZWVlZIGg6bW0gQScsXHJcbiAgICAgICAgTExMTCA6ICdkZGRkLCBNTU1NIEQsIFlZWVkgaDptbSBBJ1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBsb25nRGF0ZUZvcm1hdCAoa2V5KSB7XHJcbiAgICAgICAgdmFyIGZvcm1hdCA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV0sXHJcbiAgICAgICAgICAgIGZvcm1hdFVwcGVyID0gdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5LnRvVXBwZXJDYXNlKCldO1xyXG5cclxuICAgICAgICBpZiAoZm9ybWF0IHx8ICFmb3JtYXRVcHBlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5XSA9IGZvcm1hdFVwcGVyLnJlcGxhY2UoL01NTU18TU18RER8ZGRkZC9nLCBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWwuc2xpY2UoMSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0SW52YWxpZERhdGUgPSAnSW52YWxpZCBkYXRlJztcclxuXHJcbiAgICBmdW5jdGlvbiBpbnZhbGlkRGF0ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludmFsaWREYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0T3JkaW5hbCA9ICclZCc7XHJcbiAgICB2YXIgZGVmYXVsdE9yZGluYWxQYXJzZSA9IC9cXGR7MSwyfS87XHJcblxyXG4gICAgZnVuY3Rpb24gb3JkaW5hbCAobnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yZGluYWwucmVwbGFjZSgnJWQnLCBudW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHByZVBhcnNlUG9zdEZvcm1hdCAoc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdFJlbGF0aXZlVGltZSA9IHtcclxuICAgICAgICBmdXR1cmUgOiAnaW4gJXMnLFxyXG4gICAgICAgIHBhc3QgICA6ICclcyBhZ28nLFxyXG4gICAgICAgIHMgIDogJ2EgZmV3IHNlY29uZHMnLFxyXG4gICAgICAgIG0gIDogJ2EgbWludXRlJyxcclxuICAgICAgICBtbSA6ICclZCBtaW51dGVzJyxcclxuICAgICAgICBoICA6ICdhbiBob3VyJyxcclxuICAgICAgICBoaCA6ICclZCBob3VycycsXHJcbiAgICAgICAgZCAgOiAnYSBkYXknLFxyXG4gICAgICAgIGRkIDogJyVkIGRheXMnLFxyXG4gICAgICAgIE0gIDogJ2EgbW9udGgnLFxyXG4gICAgICAgIE1NIDogJyVkIG1vbnRocycsXHJcbiAgICAgICAgeSAgOiAnYSB5ZWFyJyxcclxuICAgICAgICB5eSA6ICclZCB5ZWFycydcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gcmVsYXRpdmVfX3JlbGF0aXZlVGltZSAobnVtYmVyLCB3aXRob3V0U3VmZml4LCBzdHJpbmcsIGlzRnV0dXJlKSB7XHJcbiAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuX3JlbGF0aXZlVGltZVtzdHJpbmddO1xyXG4gICAgICAgIHJldHVybiAoaXNGdW5jdGlvbihvdXRwdXQpKSA/XHJcbiAgICAgICAgICAgIG91dHB1dChudW1iZXIsIHdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpIDpcclxuICAgICAgICAgICAgb3V0cHV0LnJlcGxhY2UoLyVkL2ksIG51bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFzdEZ1dHVyZSAoZGlmZiwgb3V0cHV0KSB7XHJcbiAgICAgICAgdmFyIGZvcm1hdCA9IHRoaXMuX3JlbGF0aXZlVGltZVtkaWZmID4gMCA/ICdmdXR1cmUnIDogJ3Bhc3QnXTtcclxuICAgICAgICByZXR1cm4gaXNGdW5jdGlvbihmb3JtYXQpID8gZm9ybWF0KG91dHB1dCkgOiBmb3JtYXQucmVwbGFjZSgvJXMvaSwgb3V0cHV0KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcHJvdG90eXBlX19wcm90byA9IExvY2FsZS5wcm90b3R5cGU7XHJcblxyXG4gICAgcHJvdG90eXBlX19wcm90by5fY2FsZW5kYXIgICAgICAgPSBkZWZhdWx0Q2FsZW5kYXI7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLmNhbGVuZGFyICAgICAgICA9IGxvY2FsZV9jYWxlbmRhcl9fY2FsZW5kYXI7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9sb25nRGF0ZUZvcm1hdCA9IGRlZmF1bHRMb25nRGF0ZUZvcm1hdDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ubG9uZ0RhdGVGb3JtYXQgID0gbG9uZ0RhdGVGb3JtYXQ7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9pbnZhbGlkRGF0ZSAgICA9IGRlZmF1bHRJbnZhbGlkRGF0ZTtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uaW52YWxpZERhdGUgICAgID0gaW52YWxpZERhdGU7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9vcmRpbmFsICAgICAgICA9IGRlZmF1bHRPcmRpbmFsO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5vcmRpbmFsICAgICAgICAgPSBvcmRpbmFsO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5fb3JkaW5hbFBhcnNlICAgPSBkZWZhdWx0T3JkaW5hbFBhcnNlO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5wcmVwYXJzZSAgICAgICAgPSBwcmVQYXJzZVBvc3RGb3JtYXQ7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLnBvc3Rmb3JtYXQgICAgICA9IHByZVBhcnNlUG9zdEZvcm1hdDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX3JlbGF0aXZlVGltZSAgID0gZGVmYXVsdFJlbGF0aXZlVGltZTtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ucmVsYXRpdmVUaW1lICAgID0gcmVsYXRpdmVfX3JlbGF0aXZlVGltZTtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ucGFzdEZ1dHVyZSAgICAgID0gcGFzdEZ1dHVyZTtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uc2V0ICAgICAgICAgICAgID0gbG9jYWxlX3NldF9fc2V0O1xyXG5cclxuICAgIC8vIE1vbnRoXHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1vbnRocyAgICAgICAgICAgID0gICAgICAgIGxvY2FsZU1vbnRocztcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX21vbnRocyAgICAgICAgICAgPSBkZWZhdWx0TG9jYWxlTW9udGhzO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5tb250aHNTaG9ydCAgICAgICA9ICAgICAgICBsb2NhbGVNb250aHNTaG9ydDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX21vbnRoc1Nob3J0ICAgICAgPSBkZWZhdWx0TG9jYWxlTW9udGhzU2hvcnQ7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1vbnRoc1BhcnNlICAgICAgID0gICAgICAgIGxvY2FsZU1vbnRoc1BhcnNlO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5fbW9udGhzUmVnZXggICAgICA9IGRlZmF1bHRNb250aHNSZWdleDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ubW9udGhzUmVnZXggICAgICAgPSBtb250aHNSZWdleDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX21vbnRoc1Nob3J0UmVnZXggPSBkZWZhdWx0TW9udGhzU2hvcnRSZWdleDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ubW9udGhzU2hvcnRSZWdleCAgPSBtb250aHNTaG9ydFJlZ2V4O1xyXG5cclxuICAgIC8vIFdlZWtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ud2VlayA9IGxvY2FsZVdlZWs7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl93ZWVrID0gZGVmYXVsdExvY2FsZVdlZWs7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLmZpcnN0RGF5T2ZZZWFyID0gbG9jYWxlRmlyc3REYXlPZlllYXI7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLmZpcnN0RGF5T2ZXZWVrID0gbG9jYWxlRmlyc3REYXlPZldlZWs7XHJcblxyXG4gICAgLy8gRGF5IG9mIFdlZWtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ud2Vla2RheXMgICAgICAgPSAgICAgICAgbG9jYWxlV2Vla2RheXM7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl93ZWVrZGF5cyAgICAgID0gZGVmYXVsdExvY2FsZVdlZWtkYXlzO1xyXG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrZGF5c01pbiAgICA9ICAgICAgICBsb2NhbGVXZWVrZGF5c01pbjtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX3dlZWtkYXlzTWluICAgPSBkZWZhdWx0TG9jYWxlV2Vla2RheXNNaW47XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWtkYXlzU2hvcnQgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzU2hvcnQ7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl93ZWVrZGF5c1Nob3J0ID0gZGVmYXVsdExvY2FsZVdlZWtkYXlzU2hvcnQ7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWtkYXlzUGFyc2UgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzUGFyc2U7XHJcblxyXG4gICAgcHJvdG90eXBlX19wcm90by5fd2Vla2RheXNSZWdleCAgICAgID0gZGVmYXVsdFdlZWtkYXlzUmVnZXg7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWtkYXlzUmVnZXggICAgICAgPSAgICAgICAgd2Vla2RheXNSZWdleDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX3dlZWtkYXlzU2hvcnRSZWdleCA9IGRlZmF1bHRXZWVrZGF5c1Nob3J0UmVnZXg7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWtkYXlzU2hvcnRSZWdleCAgPSAgICAgICAgd2Vla2RheXNTaG9ydFJlZ2V4O1xyXG4gICAgcHJvdG90eXBlX19wcm90by5fd2Vla2RheXNNaW5SZWdleCAgID0gZGVmYXVsdFdlZWtkYXlzTWluUmVnZXg7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWtkYXlzTWluUmVnZXggICAgPSAgICAgICAgd2Vla2RheXNNaW5SZWdleDtcclxuXHJcbiAgICAvLyBIb3Vyc1xyXG4gICAgcHJvdG90eXBlX19wcm90by5pc1BNID0gbG9jYWxlSXNQTTtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX21lcmlkaWVtUGFyc2UgPSBkZWZhdWx0TG9jYWxlTWVyaWRpZW1QYXJzZTtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ubWVyaWRpZW0gPSBsb2NhbGVNZXJpZGllbTtcclxuXHJcbiAgICBmdW5jdGlvbiBsaXN0c19fZ2V0IChmb3JtYXQsIGluZGV4LCBmaWVsZCwgc2V0dGVyKSB7XHJcbiAgICAgICAgdmFyIGxvY2FsZSA9IGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUoKTtcclxuICAgICAgICB2YXIgdXRjID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKCkuc2V0KHNldHRlciwgaW5kZXgpO1xyXG4gICAgICAgIHJldHVybiBsb2NhbGVbZmllbGRdKHV0YywgZm9ybWF0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsaXN0TW9udGhzSW1wbCAoZm9ybWF0LCBpbmRleCwgZmllbGQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGZvcm1hdCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgaW5kZXggPSBmb3JtYXQ7XHJcbiAgICAgICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAnJztcclxuXHJcbiAgICAgICAgaWYgKGluZGV4ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RzX19nZXQoZm9ybWF0LCBpbmRleCwgZmllbGQsICdtb250aCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgdmFyIG91dCA9IFtdO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XHJcbiAgICAgICAgICAgIG91dFtpXSA9IGxpc3RzX19nZXQoZm9ybWF0LCBpLCBmaWVsZCwgJ21vbnRoJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gKClcclxuICAgIC8vICg1KVxyXG4gICAgLy8gKGZtdCwgNSlcclxuICAgIC8vIChmbXQpXHJcbiAgICAvLyAodHJ1ZSlcclxuICAgIC8vICh0cnVlLCA1KVxyXG4gICAgLy8gKHRydWUsIGZtdCwgNSlcclxuICAgIC8vICh0cnVlLCBmbXQpXHJcbiAgICBmdW5jdGlvbiBsaXN0V2Vla2RheXNJbXBsIChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsIGZpZWxkKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhbGVTb3J0ZWQgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZvcm1hdCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gZm9ybWF0O1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJyc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9ybWF0ID0gbG9jYWxlU29ydGVkO1xyXG4gICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcclxuICAgICAgICAgICAgbG9jYWxlU29ydGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZvcm1hdCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gZm9ybWF0O1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbG9jYWxlID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZSgpLFxyXG4gICAgICAgICAgICBzaGlmdCA9IGxvY2FsZVNvcnRlZCA/IGxvY2FsZS5fd2Vlay5kb3cgOiAwO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdHNfX2dldChmb3JtYXQsIChpbmRleCArIHNoaWZ0KSAlIDcsIGZpZWxkLCAnZGF5Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaTtcclxuICAgICAgICB2YXIgb3V0ID0gW107XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICBvdXRbaV0gPSBsaXN0c19fZ2V0KGZvcm1hdCwgKGkgKyBzaGlmdCkgJSA3LCBmaWVsZCwgJ2RheScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxpc3RzX19saXN0TW9udGhzIChmb3JtYXQsIGluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIGxpc3RNb250aHNJbXBsKGZvcm1hdCwgaW5kZXgsICdtb250aHMnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsaXN0c19fbGlzdE1vbnRoc1Nob3J0IChmb3JtYXQsIGluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIGxpc3RNb250aHNJbXBsKGZvcm1hdCwgaW5kZXgsICdtb250aHNTaG9ydCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxpc3RzX19saXN0V2Vla2RheXMgKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0V2Vla2RheXNJbXBsKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCwgJ3dlZWtkYXlzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbGlzdHNfX2xpc3RXZWVrZGF5c1Nob3J0IChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gbGlzdFdlZWtkYXlzSW1wbChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5c1Nob3J0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbGlzdHNfX2xpc3RXZWVrZGF5c01pbiAobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIGxpc3RXZWVrZGF5c0ltcGwobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4LCAnd2Vla2RheXNNaW4nKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlKCdlbicsIHtcclxuICAgICAgICBvcmRpbmFsUGFyc2U6IC9cXGR7MSwyfSh0aHxzdHxuZHxyZCkvLFxyXG4gICAgICAgIG9yZGluYWwgOiBmdW5jdGlvbiAobnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBiID0gbnVtYmVyICUgMTAsXHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSAodG9JbnQobnVtYmVyICUgMTAwIC8gMTApID09PSAxKSA/ICd0aCcgOlxyXG4gICAgICAgICAgICAgICAgKGIgPT09IDEpID8gJ3N0JyA6XHJcbiAgICAgICAgICAgICAgICAoYiA9PT0gMikgPyAnbmQnIDpcclxuICAgICAgICAgICAgICAgIChiID09PSAzKSA/ICdyZCcgOiAndGgnO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyICsgb3V0cHV0O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFNpZGUgZWZmZWN0IGltcG9ydHNcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5sYW5nID0gZGVwcmVjYXRlKCdtb21lbnQubGFuZyBpcyBkZXByZWNhdGVkLiBVc2UgbW9tZW50LmxvY2FsZSBpbnN0ZWFkLicsIGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGUpO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmxhbmdEYXRhID0gZGVwcmVjYXRlKCdtb21lbnQubGFuZ0RhdGEgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbWVudC5sb2NhbGVEYXRhIGluc3RlYWQuJywgbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZSk7XHJcblxyXG4gICAgdmFyIG1hdGhBYnMgPSBNYXRoLmFicztcclxuXHJcbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9hYnNfX2FicyAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgICAgICAgICAgID0gdGhpcy5fZGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzID0gbWF0aEFicyh0aGlzLl9taWxsaXNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMuX2RheXMgICAgICAgICA9IG1hdGhBYnModGhpcy5fZGF5cyk7XHJcbiAgICAgICAgdGhpcy5fbW9udGhzICAgICAgID0gbWF0aEFicyh0aGlzLl9tb250aHMpO1xyXG5cclxuICAgICAgICBkYXRhLm1pbGxpc2Vjb25kcyAgPSBtYXRoQWJzKGRhdGEubWlsbGlzZWNvbmRzKTtcclxuICAgICAgICBkYXRhLnNlY29uZHMgICAgICAgPSBtYXRoQWJzKGRhdGEuc2Vjb25kcyk7XHJcbiAgICAgICAgZGF0YS5taW51dGVzICAgICAgID0gbWF0aEFicyhkYXRhLm1pbnV0ZXMpO1xyXG4gICAgICAgIGRhdGEuaG91cnMgICAgICAgICA9IG1hdGhBYnMoZGF0YS5ob3Vycyk7XHJcbiAgICAgICAgZGF0YS5tb250aHMgICAgICAgID0gbWF0aEFicyhkYXRhLm1vbnRocyk7XHJcbiAgICAgICAgZGF0YS55ZWFycyAgICAgICAgID0gbWF0aEFicyhkYXRhLnllYXJzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCAoZHVyYXRpb24sIGlucHV0LCB2YWx1ZSwgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIG90aGVyID0gY3JlYXRlX19jcmVhdGVEdXJhdGlvbihpbnB1dCwgdmFsdWUpO1xyXG5cclxuICAgICAgICBkdXJhdGlvbi5fbWlsbGlzZWNvbmRzICs9IGRpcmVjdGlvbiAqIG90aGVyLl9taWxsaXNlY29uZHM7XHJcbiAgICAgICAgZHVyYXRpb24uX2RheXMgICAgICAgICArPSBkaXJlY3Rpb24gKiBvdGhlci5fZGF5cztcclxuICAgICAgICBkdXJhdGlvbi5fbW9udGhzICAgICAgICs9IGRpcmVjdGlvbiAqIG90aGVyLl9tb250aHM7XHJcblxyXG4gICAgICAgIHJldHVybiBkdXJhdGlvbi5fYnViYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3VwcG9ydHMgb25seSAyLjAtc3R5bGUgYWRkKDEsICdzJykgb3IgYWRkKGR1cmF0aW9uKVxyXG4gICAgZnVuY3Rpb24gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19hZGQgKGlucHV0LCB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0KHRoaXMsIGlucHV0LCB2YWx1ZSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3VwcG9ydHMgb25seSAyLjAtc3R5bGUgc3VidHJhY3QoMSwgJ3MnKSBvciBzdWJ0cmFjdChkdXJhdGlvbilcclxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fc3VidHJhY3QgKGlucHV0LCB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0KHRoaXMsIGlucHV0LCB2YWx1ZSwgLTEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFic0NlaWwgKG51bWJlcikge1xyXG4gICAgICAgIGlmIChudW1iZXIgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKG51bWJlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChudW1iZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBidWJibGUgKCkge1xyXG4gICAgICAgIHZhciBtaWxsaXNlY29uZHMgPSB0aGlzLl9taWxsaXNlY29uZHM7XHJcbiAgICAgICAgdmFyIGRheXMgICAgICAgICA9IHRoaXMuX2RheXM7XHJcbiAgICAgICAgdmFyIG1vbnRocyAgICAgICA9IHRoaXMuX21vbnRocztcclxuICAgICAgICB2YXIgZGF0YSAgICAgICAgID0gdGhpcy5fZGF0YTtcclxuICAgICAgICB2YXIgc2Vjb25kcywgbWludXRlcywgaG91cnMsIHllYXJzLCBtb250aHNGcm9tRGF5cztcclxuXHJcbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIG1peCBvZiBwb3NpdGl2ZSBhbmQgbmVnYXRpdmUgdmFsdWVzLCBidWJibGUgZG93biBmaXJzdFxyXG4gICAgICAgIC8vIGNoZWNrOiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMjE2NlxyXG4gICAgICAgIGlmICghKChtaWxsaXNlY29uZHMgPj0gMCAmJiBkYXlzID49IDAgJiYgbW9udGhzID49IDApIHx8XHJcbiAgICAgICAgICAgICAgICAobWlsbGlzZWNvbmRzIDw9IDAgJiYgZGF5cyA8PSAwICYmIG1vbnRocyA8PSAwKSkpIHtcclxuICAgICAgICAgICAgbWlsbGlzZWNvbmRzICs9IGFic0NlaWwobW9udGhzVG9EYXlzKG1vbnRocykgKyBkYXlzKSAqIDg2NGU1O1xyXG4gICAgICAgICAgICBkYXlzID0gMDtcclxuICAgICAgICAgICAgbW9udGhzID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgY29kZSBidWJibGVzIHVwIHZhbHVlcywgc2VlIHRoZSB0ZXN0cyBmb3JcclxuICAgICAgICAvLyBleGFtcGxlcyBvZiB3aGF0IHRoYXQgbWVhbnMuXHJcbiAgICAgICAgZGF0YS5taWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZHMgJSAxMDAwO1xyXG5cclxuICAgICAgICBzZWNvbmRzICAgICAgICAgICA9IGFic0Zsb29yKG1pbGxpc2Vjb25kcyAvIDEwMDApO1xyXG4gICAgICAgIGRhdGEuc2Vjb25kcyAgICAgID0gc2Vjb25kcyAlIDYwO1xyXG5cclxuICAgICAgICBtaW51dGVzICAgICAgICAgICA9IGFic0Zsb29yKHNlY29uZHMgLyA2MCk7XHJcbiAgICAgICAgZGF0YS5taW51dGVzICAgICAgPSBtaW51dGVzICUgNjA7XHJcblxyXG4gICAgICAgIGhvdXJzICAgICAgICAgICAgID0gYWJzRmxvb3IobWludXRlcyAvIDYwKTtcclxuICAgICAgICBkYXRhLmhvdXJzICAgICAgICA9IGhvdXJzICUgMjQ7XHJcblxyXG4gICAgICAgIGRheXMgKz0gYWJzRmxvb3IoaG91cnMgLyAyNCk7XHJcblxyXG4gICAgICAgIC8vIGNvbnZlcnQgZGF5cyB0byBtb250aHNcclxuICAgICAgICBtb250aHNGcm9tRGF5cyA9IGFic0Zsb29yKGRheXNUb01vbnRocyhkYXlzKSk7XHJcbiAgICAgICAgbW9udGhzICs9IG1vbnRoc0Zyb21EYXlzO1xyXG4gICAgICAgIGRheXMgLT0gYWJzQ2VpbChtb250aHNUb0RheXMobW9udGhzRnJvbURheXMpKTtcclxuXHJcbiAgICAgICAgLy8gMTIgbW9udGhzIC0+IDEgeWVhclxyXG4gICAgICAgIHllYXJzID0gYWJzRmxvb3IobW9udGhzIC8gMTIpO1xyXG4gICAgICAgIG1vbnRocyAlPSAxMjtcclxuXHJcbiAgICAgICAgZGF0YS5kYXlzICAgPSBkYXlzO1xyXG4gICAgICAgIGRhdGEubW9udGhzID0gbW9udGhzO1xyXG4gICAgICAgIGRhdGEueWVhcnMgID0geWVhcnM7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRheXNUb01vbnRocyAoZGF5cykge1xyXG4gICAgICAgIC8vIDQwMCB5ZWFycyBoYXZlIDE0NjA5NyBkYXlzICh0YWtpbmcgaW50byBhY2NvdW50IGxlYXAgeWVhciBydWxlcylcclxuICAgICAgICAvLyA0MDAgeWVhcnMgaGF2ZSAxMiBtb250aHMgPT09IDQ4MDBcclxuICAgICAgICByZXR1cm4gZGF5cyAqIDQ4MDAgLyAxNDYwOTc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW9udGhzVG9EYXlzIChtb250aHMpIHtcclxuICAgICAgICAvLyB0aGUgcmV2ZXJzZSBvZiBkYXlzVG9Nb250aHNcclxuICAgICAgICByZXR1cm4gbW9udGhzICogMTQ2MDk3IC8gNDgwMDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhcyAodW5pdHMpIHtcclxuICAgICAgICB2YXIgZGF5cztcclxuICAgICAgICB2YXIgbW9udGhzO1xyXG4gICAgICAgIHZhciBtaWxsaXNlY29uZHMgPSB0aGlzLl9taWxsaXNlY29uZHM7XHJcblxyXG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xyXG5cclxuICAgICAgICBpZiAodW5pdHMgPT09ICdtb250aCcgfHwgdW5pdHMgPT09ICd5ZWFyJykge1xyXG4gICAgICAgICAgICBkYXlzICAgPSB0aGlzLl9kYXlzICAgKyBtaWxsaXNlY29uZHMgLyA4NjRlNTtcclxuICAgICAgICAgICAgbW9udGhzID0gdGhpcy5fbW9udGhzICsgZGF5c1RvTW9udGhzKGRheXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5pdHMgPT09ICdtb250aCcgPyBtb250aHMgOiBtb250aHMgLyAxMjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBoYW5kbGUgbWlsbGlzZWNvbmRzIHNlcGFyYXRlbHkgYmVjYXVzZSBvZiBmbG9hdGluZyBwb2ludCBtYXRoIGVycm9ycyAoaXNzdWUgIzE4NjcpXHJcbiAgICAgICAgICAgIGRheXMgPSB0aGlzLl9kYXlzICsgTWF0aC5yb3VuZChtb250aHNUb0RheXModGhpcy5fbW9udGhzKSk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodW5pdHMpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3dlZWsnICAgOiByZXR1cm4gZGF5cyAvIDcgICAgICsgbWlsbGlzZWNvbmRzIC8gNjA0OGU1O1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZGF5JyAgICA6IHJldHVybiBkYXlzICAgICAgICAgKyBtaWxsaXNlY29uZHMgLyA4NjRlNTtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2hvdXInICAgOiByZXR1cm4gZGF5cyAqIDI0ICAgICsgbWlsbGlzZWNvbmRzIC8gMzZlNTtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ21pbnV0ZScgOiByZXR1cm4gZGF5cyAqIDE0NDAgICsgbWlsbGlzZWNvbmRzIC8gNmU0O1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2Vjb25kJyA6IHJldHVybiBkYXlzICogODY0MDAgKyBtaWxsaXNlY29uZHMgLyAxMDAwO1xyXG4gICAgICAgICAgICAgICAgLy8gTWF0aC5mbG9vciBwcmV2ZW50cyBmbG9hdGluZyBwb2ludCBtYXRoIGVycm9ycyBoZXJlXHJcbiAgICAgICAgICAgICAgICBjYXNlICdtaWxsaXNlY29uZCc6IHJldHVybiBNYXRoLmZsb29yKGRheXMgKiA4NjRlNSkgKyBtaWxsaXNlY29uZHM7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdW5pdCAnICsgdW5pdHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE86IFVzZSB0aGlzLmFzKCdtcycpP1xyXG4gICAgZnVuY3Rpb24gZHVyYXRpb25fYXNfX3ZhbHVlT2YgKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIHRoaXMuX21pbGxpc2Vjb25kcyArXHJcbiAgICAgICAgICAgIHRoaXMuX2RheXMgKiA4NjRlNSArXHJcbiAgICAgICAgICAgICh0aGlzLl9tb250aHMgJSAxMikgKiAyNTkyZTYgK1xyXG4gICAgICAgICAgICB0b0ludCh0aGlzLl9tb250aHMgLyAxMikgKiAzMTUzNmU2XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYWtlQXMgKGFsaWFzKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXMoYWxpYXMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGFzTWlsbGlzZWNvbmRzID0gbWFrZUFzKCdtcycpO1xyXG4gICAgdmFyIGFzU2Vjb25kcyAgICAgID0gbWFrZUFzKCdzJyk7XHJcbiAgICB2YXIgYXNNaW51dGVzICAgICAgPSBtYWtlQXMoJ20nKTtcclxuICAgIHZhciBhc0hvdXJzICAgICAgICA9IG1ha2VBcygnaCcpO1xyXG4gICAgdmFyIGFzRGF5cyAgICAgICAgID0gbWFrZUFzKCdkJyk7XHJcbiAgICB2YXIgYXNXZWVrcyAgICAgICAgPSBtYWtlQXMoJ3cnKTtcclxuICAgIHZhciBhc01vbnRocyAgICAgICA9IG1ha2VBcygnTScpO1xyXG4gICAgdmFyIGFzWWVhcnMgICAgICAgID0gbWFrZUFzKCd5Jyk7XHJcblxyXG4gICAgZnVuY3Rpb24gZHVyYXRpb25fZ2V0X19nZXQgKHVuaXRzKSB7XHJcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbdW5pdHMgKyAncyddKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWFrZUdldHRlcihuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbbmFtZV07XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbWlsbGlzZWNvbmRzID0gbWFrZUdldHRlcignbWlsbGlzZWNvbmRzJyk7XHJcbiAgICB2YXIgc2Vjb25kcyAgICAgID0gbWFrZUdldHRlcignc2Vjb25kcycpO1xyXG4gICAgdmFyIG1pbnV0ZXMgICAgICA9IG1ha2VHZXR0ZXIoJ21pbnV0ZXMnKTtcclxuICAgIHZhciBob3VycyAgICAgICAgPSBtYWtlR2V0dGVyKCdob3VycycpO1xyXG4gICAgdmFyIGRheXMgICAgICAgICA9IG1ha2VHZXR0ZXIoJ2RheXMnKTtcclxuICAgIHZhciBtb250aHMgICAgICAgPSBtYWtlR2V0dGVyKCdtb250aHMnKTtcclxuICAgIHZhciB5ZWFycyAgICAgICAgPSBtYWtlR2V0dGVyKCd5ZWFycycpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHdlZWtzICgpIHtcclxuICAgICAgICByZXR1cm4gYWJzRmxvb3IodGhpcy5kYXlzKCkgLyA3KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcm91bmQgPSBNYXRoLnJvdW5kO1xyXG4gICAgdmFyIHRocmVzaG9sZHMgPSB7XHJcbiAgICAgICAgczogNDUsICAvLyBzZWNvbmRzIHRvIG1pbnV0ZVxyXG4gICAgICAgIG06IDQ1LCAgLy8gbWludXRlcyB0byBob3VyXHJcbiAgICAgICAgaDogMjIsICAvLyBob3VycyB0byBkYXlcclxuICAgICAgICBkOiAyNiwgIC8vIGRheXMgdG8gbW9udGhcclxuICAgICAgICBNOiAxMSAgIC8vIG1vbnRocyB0byB5ZWFyXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGhlbHBlciBmdW5jdGlvbiBmb3IgbW9tZW50LmZuLmZyb20sIG1vbWVudC5mbi5mcm9tTm93LCBhbmQgbW9tZW50LmR1cmF0aW9uLmZuLmh1bWFuaXplXHJcbiAgICBmdW5jdGlvbiBzdWJzdGl0dXRlVGltZUFnbyhzdHJpbmcsIG51bWJlciwgd2l0aG91dFN1ZmZpeCwgaXNGdXR1cmUsIGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbGUucmVsYXRpdmVUaW1lKG51bWJlciB8fCAxLCAhIXdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2h1bWFuaXplX19yZWxhdGl2ZVRpbWUgKHBvc05lZ0R1cmF0aW9uLCB3aXRob3V0U3VmZml4LCBsb2NhbGUpIHtcclxuICAgICAgICB2YXIgZHVyYXRpb24gPSBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uKHBvc05lZ0R1cmF0aW9uKS5hYnMoKTtcclxuICAgICAgICB2YXIgc2Vjb25kcyAgPSByb3VuZChkdXJhdGlvbi5hcygncycpKTtcclxuICAgICAgICB2YXIgbWludXRlcyAgPSByb3VuZChkdXJhdGlvbi5hcygnbScpKTtcclxuICAgICAgICB2YXIgaG91cnMgICAgPSByb3VuZChkdXJhdGlvbi5hcygnaCcpKTtcclxuICAgICAgICB2YXIgZGF5cyAgICAgPSByb3VuZChkdXJhdGlvbi5hcygnZCcpKTtcclxuICAgICAgICB2YXIgbW9udGhzICAgPSByb3VuZChkdXJhdGlvbi5hcygnTScpKTtcclxuICAgICAgICB2YXIgeWVhcnMgICAgPSByb3VuZChkdXJhdGlvbi5hcygneScpKTtcclxuXHJcbiAgICAgICAgdmFyIGEgPSBzZWNvbmRzIDwgdGhyZXNob2xkcy5zICYmIFsncycsIHNlY29uZHNdICB8fFxyXG4gICAgICAgICAgICAgICAgbWludXRlcyA8PSAxICAgICAgICAgICAmJiBbJ20nXSAgICAgICAgICAgfHxcclxuICAgICAgICAgICAgICAgIG1pbnV0ZXMgPCB0aHJlc2hvbGRzLm0gJiYgWydtbScsIG1pbnV0ZXNdIHx8XHJcbiAgICAgICAgICAgICAgICBob3VycyAgIDw9IDEgICAgICAgICAgICYmIFsnaCddICAgICAgICAgICB8fFxyXG4gICAgICAgICAgICAgICAgaG91cnMgICA8IHRocmVzaG9sZHMuaCAmJiBbJ2hoJywgaG91cnNdICAgfHxcclxuICAgICAgICAgICAgICAgIGRheXMgICAgPD0gMSAgICAgICAgICAgJiYgWydkJ10gICAgICAgICAgIHx8XHJcbiAgICAgICAgICAgICAgICBkYXlzICAgIDwgdGhyZXNob2xkcy5kICYmIFsnZGQnLCBkYXlzXSAgICB8fFxyXG4gICAgICAgICAgICAgICAgbW9udGhzICA8PSAxICAgICAgICAgICAmJiBbJ00nXSAgICAgICAgICAgfHxcclxuICAgICAgICAgICAgICAgIG1vbnRocyAgPCB0aHJlc2hvbGRzLk0gJiYgWydNTScsIG1vbnRoc10gIHx8XHJcbiAgICAgICAgICAgICAgICB5ZWFycyAgIDw9IDEgICAgICAgICAgICYmIFsneSddICAgICAgICAgICB8fCBbJ3l5JywgeWVhcnNdO1xyXG5cclxuICAgICAgICBhWzJdID0gd2l0aG91dFN1ZmZpeDtcclxuICAgICAgICBhWzNdID0gK3Bvc05lZ0R1cmF0aW9uID4gMDtcclxuICAgICAgICBhWzRdID0gbG9jYWxlO1xyXG4gICAgICAgIHJldHVybiBzdWJzdGl0dXRlVGltZUFnby5hcHBseShudWxsLCBhKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGFsbG93cyB5b3UgdG8gc2V0IGEgdGhyZXNob2xkIGZvciByZWxhdGl2ZSB0aW1lIHN0cmluZ3NcclxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2h1bWFuaXplX19nZXRTZXRSZWxhdGl2ZVRpbWVUaHJlc2hvbGQgKHRocmVzaG9sZCwgbGltaXQpIHtcclxuICAgICAgICBpZiAodGhyZXNob2xkc1t0aHJlc2hvbGRdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGltaXQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhyZXNob2xkc1t0aHJlc2hvbGRdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJlc2hvbGRzW3RocmVzaG9sZF0gPSBsaW1pdDtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBodW1hbml6ZSAod2l0aFN1ZmZpeCkge1xyXG4gICAgICAgIHZhciBsb2NhbGUgPSB0aGlzLmxvY2FsZURhdGEoKTtcclxuICAgICAgICB2YXIgb3V0cHV0ID0gZHVyYXRpb25faHVtYW5pemVfX3JlbGF0aXZlVGltZSh0aGlzLCAhd2l0aFN1ZmZpeCwgbG9jYWxlKTtcclxuXHJcbiAgICAgICAgaWYgKHdpdGhTdWZmaXgpIHtcclxuICAgICAgICAgICAgb3V0cHV0ID0gbG9jYWxlLnBhc3RGdXR1cmUoK3RoaXMsIG91dHB1dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbG9jYWxlLnBvc3Rmb3JtYXQob3V0cHV0KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaXNvX3N0cmluZ19fYWJzID0gTWF0aC5hYnM7XHJcblxyXG4gICAgZnVuY3Rpb24gaXNvX3N0cmluZ19fdG9JU09TdHJpbmcoKSB7XHJcbiAgICAgICAgLy8gZm9yIElTTyBzdHJpbmdzIHdlIGRvIG5vdCB1c2UgdGhlIG5vcm1hbCBidWJibGluZyBydWxlczpcclxuICAgICAgICAvLyAgKiBtaWxsaXNlY29uZHMgYnViYmxlIHVwIHVudGlsIHRoZXkgYmVjb21lIGhvdXJzXHJcbiAgICAgICAgLy8gICogZGF5cyBkbyBub3QgYnViYmxlIGF0IGFsbFxyXG4gICAgICAgIC8vICAqIG1vbnRocyBidWJibGUgdXAgdW50aWwgdGhleSBiZWNvbWUgeWVhcnNcclxuICAgICAgICAvLyBUaGlzIGlzIGJlY2F1c2UgdGhlcmUgaXMgbm8gY29udGV4dC1mcmVlIGNvbnZlcnNpb24gYmV0d2VlbiBob3VycyBhbmQgZGF5c1xyXG4gICAgICAgIC8vICh0aGluayBvZiBjbG9jayBjaGFuZ2VzKVxyXG4gICAgICAgIC8vIGFuZCBhbHNvIG5vdCBiZXR3ZWVuIGRheXMgYW5kIG1vbnRocyAoMjgtMzEgZGF5cyBwZXIgbW9udGgpXHJcbiAgICAgICAgdmFyIHNlY29uZHMgPSBpc29fc3RyaW5nX19hYnModGhpcy5fbWlsbGlzZWNvbmRzKSAvIDEwMDA7XHJcbiAgICAgICAgdmFyIGRheXMgICAgICAgICA9IGlzb19zdHJpbmdfX2Ficyh0aGlzLl9kYXlzKTtcclxuICAgICAgICB2YXIgbW9udGhzICAgICAgID0gaXNvX3N0cmluZ19fYWJzKHRoaXMuX21vbnRocyk7XHJcbiAgICAgICAgdmFyIG1pbnV0ZXMsIGhvdXJzLCB5ZWFycztcclxuXHJcbiAgICAgICAgLy8gMzYwMCBzZWNvbmRzIC0+IDYwIG1pbnV0ZXMgLT4gMSBob3VyXHJcbiAgICAgICAgbWludXRlcyAgICAgICAgICAgPSBhYnNGbG9vcihzZWNvbmRzIC8gNjApO1xyXG4gICAgICAgIGhvdXJzICAgICAgICAgICAgID0gYWJzRmxvb3IobWludXRlcyAvIDYwKTtcclxuICAgICAgICBzZWNvbmRzICU9IDYwO1xyXG4gICAgICAgIG1pbnV0ZXMgJT0gNjA7XHJcblxyXG4gICAgICAgIC8vIDEyIG1vbnRocyAtPiAxIHllYXJcclxuICAgICAgICB5ZWFycyAgPSBhYnNGbG9vcihtb250aHMgLyAxMik7XHJcbiAgICAgICAgbW9udGhzICU9IDEyO1xyXG5cclxuXHJcbiAgICAgICAgLy8gaW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2RvcmRpbGxlL21vbWVudC1pc29kdXJhdGlvbi9ibG9iL21hc3Rlci9tb21lbnQuaXNvZHVyYXRpb24uanNcclxuICAgICAgICB2YXIgWSA9IHllYXJzO1xyXG4gICAgICAgIHZhciBNID0gbW9udGhzO1xyXG4gICAgICAgIHZhciBEID0gZGF5cztcclxuICAgICAgICB2YXIgaCA9IGhvdXJzO1xyXG4gICAgICAgIHZhciBtID0gbWludXRlcztcclxuICAgICAgICB2YXIgcyA9IHNlY29uZHM7XHJcbiAgICAgICAgdmFyIHRvdGFsID0gdGhpcy5hc1NlY29uZHMoKTtcclxuXHJcbiAgICAgICAgaWYgKCF0b3RhbCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzIGlzIHRoZSBzYW1lIGFzIEMjJ3MgKE5vZGEpIGFuZCBweXRob24gKGlzb2RhdGUpLi4uXHJcbiAgICAgICAgICAgIC8vIGJ1dCBub3Qgb3RoZXIgSlMgKGdvb2cuZGF0ZSlcclxuICAgICAgICAgICAgcmV0dXJuICdQMEQnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuICh0b3RhbCA8IDAgPyAnLScgOiAnJykgK1xyXG4gICAgICAgICAgICAnUCcgK1xyXG4gICAgICAgICAgICAoWSA/IFkgKyAnWScgOiAnJykgK1xyXG4gICAgICAgICAgICAoTSA/IE0gKyAnTScgOiAnJykgK1xyXG4gICAgICAgICAgICAoRCA/IEQgKyAnRCcgOiAnJykgK1xyXG4gICAgICAgICAgICAoKGggfHwgbSB8fCBzKSA/ICdUJyA6ICcnKSArXHJcbiAgICAgICAgICAgIChoID8gaCArICdIJyA6ICcnKSArXHJcbiAgICAgICAgICAgIChtID8gbSArICdNJyA6ICcnKSArXHJcbiAgICAgICAgICAgIChzID8gcyArICdTJyA6ICcnKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZHVyYXRpb25fcHJvdG90eXBlX19wcm90byA9IER1cmF0aW9uLnByb3RvdHlwZTtcclxuXHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFicyAgICAgICAgICAgID0gZHVyYXRpb25fYWJzX19hYnM7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFkZCAgICAgICAgICAgID0gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19hZGQ7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnN1YnRyYWN0ICAgICAgID0gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19zdWJ0cmFjdDtcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXMgICAgICAgICAgICAgPSBhcztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNNaWxsaXNlY29uZHMgPSBhc01pbGxpc2Vjb25kcztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNTZWNvbmRzICAgICAgPSBhc1NlY29uZHM7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzTWludXRlcyAgICAgID0gYXNNaW51dGVzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc0hvdXJzICAgICAgICA9IGFzSG91cnM7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzRGF5cyAgICAgICAgID0gYXNEYXlzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc1dlZWtzICAgICAgICA9IGFzV2Vla3M7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzTW9udGhzICAgICAgID0gYXNNb250aHM7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzWWVhcnMgICAgICAgID0gYXNZZWFycztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8udmFsdWVPZiAgICAgICAgPSBkdXJhdGlvbl9hc19fdmFsdWVPZjtcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uX2J1YmJsZSAgICAgICAgPSBidWJibGU7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmdldCAgICAgICAgICAgID0gZHVyYXRpb25fZ2V0X19nZXQ7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLm1pbGxpc2Vjb25kcyAgID0gbWlsbGlzZWNvbmRzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5zZWNvbmRzICAgICAgICA9IHNlY29uZHM7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLm1pbnV0ZXMgICAgICAgID0gbWludXRlcztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uaG91cnMgICAgICAgICAgPSBob3VycztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uZGF5cyAgICAgICAgICAgPSBkYXlzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by53ZWVrcyAgICAgICAgICA9IHdlZWtzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5tb250aHMgICAgICAgICA9IG1vbnRocztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ueWVhcnMgICAgICAgICAgPSB5ZWFycztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uaHVtYW5pemUgICAgICAgPSBodW1hbml6ZTtcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8udG9JU09TdHJpbmcgICAgPSBpc29fc3RyaW5nX190b0lTT1N0cmluZztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8udG9TdHJpbmcgICAgICAgPSBpc29fc3RyaW5nX190b0lTT1N0cmluZztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8udG9KU09OICAgICAgICAgPSBpc29fc3RyaW5nX190b0lTT1N0cmluZztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubG9jYWxlICAgICAgICAgPSBsb2NhbGU7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmxvY2FsZURhdGEgICAgID0gbG9jYWxlRGF0YTtcclxuXHJcbiAgICAvLyBEZXByZWNhdGlvbnNcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8udG9Jc29TdHJpbmcgPSBkZXByZWNhdGUoJ3RvSXNvU3RyaW5nKCkgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSB0b0lTT1N0cmluZygpIGluc3RlYWQgKG5vdGljZSB0aGUgY2FwaXRhbHMpJywgaXNvX3N0cmluZ19fdG9JU09TdHJpbmcpO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5sYW5nID0gbGFuZztcclxuXHJcbiAgICAvLyBTaWRlIGVmZmVjdCBpbXBvcnRzXHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdYJywgMCwgMCwgJ3VuaXgnKTtcclxuICAgIGFkZEZvcm1hdFRva2VuKCd4JywgMCwgMCwgJ3ZhbHVlT2YnKTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbigneCcsIG1hdGNoU2lnbmVkKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ1gnLCBtYXRjaFRpbWVzdGFtcCk7XHJcbiAgICBhZGRQYXJzZVRva2VuKCdYJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUocGFyc2VGbG9hdChpbnB1dCwgMTApICogMTAwMCk7XHJcbiAgICB9KTtcclxuICAgIGFkZFBhcnNlVG9rZW4oJ3gnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcclxuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZSh0b0ludChpbnB1dCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU2lkZSBlZmZlY3QgaW1wb3J0c1xyXG5cclxuXHJcbiAgICB1dGlsc19ob29rc19faG9va3MudmVyc2lvbiA9ICcyLjEzLjAnO1xyXG5cclxuICAgIHNldEhvb2tDYWxsYmFjayhsb2NhbF9fY3JlYXRlTG9jYWwpO1xyXG5cclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5mbiAgICAgICAgICAgICAgICAgICAgPSBtb21lbnRQcm90b3R5cGU7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MubWluICAgICAgICAgICAgICAgICAgID0gbWluO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLm1heCAgICAgICAgICAgICAgICAgICA9IG1heDtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5ub3cgICAgICAgICAgICAgICAgICAgPSBub3c7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MudXRjICAgICAgICAgICAgICAgICAgID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnVuaXggICAgICAgICAgICAgICAgICA9IG1vbWVudF9fY3JlYXRlVW5peDtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5tb250aHMgICAgICAgICAgICAgICAgPSBsaXN0c19fbGlzdE1vbnRocztcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5pc0RhdGUgICAgICAgICAgICAgICAgPSBpc0RhdGU7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MubG9jYWxlICAgICAgICAgICAgICAgID0gbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZTtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5pbnZhbGlkICAgICAgICAgICAgICAgPSB2YWxpZF9fY3JlYXRlSW52YWxpZDtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5kdXJhdGlvbiAgICAgICAgICAgICAgPSBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmlzTW9tZW50ICAgICAgICAgICAgICA9IGlzTW9tZW50O1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLndlZWtkYXlzICAgICAgICAgICAgICA9IGxpc3RzX19saXN0V2Vla2RheXM7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MucGFyc2Vab25lICAgICAgICAgICAgID0gbW9tZW50X19jcmVhdGVJblpvbmU7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MubG9jYWxlRGF0YSAgICAgICAgICAgID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZTtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5pc0R1cmF0aW9uICAgICAgICAgICAgPSBpc0R1cmF0aW9uO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLm1vbnRoc1Nob3J0ICAgICAgICAgICA9IGxpc3RzX19saXN0TW9udGhzU2hvcnQ7XHJcbiAgICB1dGlsc19ob29rc19faG9va3Mud2Vla2RheXNNaW4gICAgICAgICAgID0gbGlzdHNfX2xpc3RXZWVrZGF5c01pbjtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5kZWZpbmVMb2NhbGUgICAgICAgICAgPSBkZWZpbmVMb2NhbGU7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlTG9jYWxlICAgICAgICAgID0gdXBkYXRlTG9jYWxlO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmxvY2FsZXMgICAgICAgICAgICAgICA9IGxvY2FsZV9sb2NhbGVzX19saXN0TG9jYWxlcztcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy53ZWVrZGF5c1Nob3J0ICAgICAgICAgPSBsaXN0c19fbGlzdFdlZWtkYXlzU2hvcnQ7XHJcbiAgICB1dGlsc19ob29rc19faG9va3Mubm9ybWFsaXplVW5pdHMgICAgICAgID0gbm9ybWFsaXplVW5pdHM7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MucmVsYXRpdmVUaW1lVGhyZXNob2xkID0gZHVyYXRpb25faHVtYW5pemVfX2dldFNldFJlbGF0aXZlVGltZVRocmVzaG9sZDtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5wcm90b3R5cGUgICAgICAgICAgICAgPSBtb21lbnRQcm90b3R5cGU7XHJcblxyXG4gICAgdmFyIF9tb21lbnQgPSB1dGlsc19ob29rc19faG9va3M7XHJcblxyXG4gICAgcmV0dXJuIF9tb21lbnQ7XHJcblxyXG59KSk7IiwiLyohIHZlcnNpb24gOiA0LjE3LjM3XHJcbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuIGJvb3RzdHJhcC1kYXRldGltZWpzXHJcbiBodHRwczovL2dpdGh1Yi5jb20vRW9uYXNkYW4vYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTUgSm9uYXRoYW4gUGV0ZXJzb25cclxuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKi9cclxuIWZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW1wianF1ZXJ5XCIsXCJtb21lbnRcIl0sYSk7ZWxzZSBpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cylhKHJlcXVpcmUoXCJqcXVlcnlcIikscmVxdWlyZShcIm1vbWVudFwiKSk7ZWxzZXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgalF1ZXJ5KXRocm93XCJib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIgcmVxdWlyZXMgalF1ZXJ5IHRvIGJlIGxvYWRlZCBmaXJzdFwiO2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBtb21lbnQpdGhyb3dcImJvb3RzdHJhcC1kYXRldGltZXBpY2tlciByZXF1aXJlcyBNb21lbnQuanMgdG8gYmUgbG9hZGVkIGZpcnN0XCI7YShqUXVlcnksbW9tZW50KX19KGZ1bmN0aW9uKGEsYil7XCJ1c2Ugc3RyaWN0XCI7aWYoIWIpdGhyb3cgbmV3IEVycm9yKFwiYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyIHJlcXVpcmVzIE1vbWVudC5qcyB0byBiZSBsb2FkZWQgZmlyc3RcIik7dmFyIGM9ZnVuY3Rpb24oYyxkKXt2YXIgZSxmLGcsaCxpLGosayxsPXt9LG09ITAsbj0hMSxvPSExLHA9MCxxPVt7Y2xzTmFtZTpcImRheXNcIixuYXZGbmM6XCJNXCIsbmF2U3RlcDoxfSx7Y2xzTmFtZTpcIm1vbnRoc1wiLG5hdkZuYzpcInlcIixuYXZTdGVwOjF9LHtjbHNOYW1lOlwieWVhcnNcIixuYXZGbmM6XCJ5XCIsbmF2U3RlcDoxMH0se2Nsc05hbWU6XCJkZWNhZGVzXCIsbmF2Rm5jOlwieVwiLG5hdlN0ZXA6MTAwfV0scj1bXCJkYXlzXCIsXCJtb250aHNcIixcInllYXJzXCIsXCJkZWNhZGVzXCJdLHM9W1widG9wXCIsXCJib3R0b21cIixcImF1dG9cIl0sdD1bXCJsZWZ0XCIsXCJyaWdodFwiLFwiYXV0b1wiXSx1PVtcImRlZmF1bHRcIixcInRvcFwiLFwiYm90dG9tXCJdLHY9e3VwOjM4LDM4OlwidXBcIixkb3duOjQwLDQwOlwiZG93blwiLGxlZnQ6MzcsMzc6XCJsZWZ0XCIscmlnaHQ6MzksMzk6XCJyaWdodFwiLHRhYjo5LDk6XCJ0YWJcIixlc2NhcGU6MjcsMjc6XCJlc2NhcGVcIixlbnRlcjoxMywxMzpcImVudGVyXCIscGFnZVVwOjMzLDMzOlwicGFnZVVwXCIscGFnZURvd246MzQsMzQ6XCJwYWdlRG93blwiLHNoaWZ0OjE2LDE2Olwic2hpZnRcIixjb250cm9sOjE3LDE3OlwiY29udHJvbFwiLHNwYWNlOjMyLDMyOlwic3BhY2VcIix0Ojg0LDg0OlwidFwiLFwiZGVsZXRlXCI6NDYsNDY6XCJkZWxldGVcIn0sdz17fSx4PWZ1bmN0aW9uKGEpe3ZhciBjLGUsZixnLGgsaT0hMTtyZXR1cm4gdm9pZCAwIT09Yi50eiYmdm9pZCAwIT09ZC50aW1lWm9uZSYmbnVsbCE9PWQudGltZVpvbmUmJlwiXCIhPT1kLnRpbWVab25lJiYoaT0hMCksdm9pZCAwPT09YXx8bnVsbD09PWE/Yz1pP2IoKS50eihkLnRpbWVab25lKS5zdGFydE9mKFwiZFwiKTpiKCkuc3RhcnRPZihcImRcIik6aT8oZT1iKCkudHooZC50aW1lWm9uZSkudXRjT2Zmc2V0KCksZj1iKGEsaixkLnVzZVN0cmljdCkudXRjT2Zmc2V0KCksZiE9PWU/KGc9YigpLnR6KGQudGltZVpvbmUpLmZvcm1hdChcIlpcIiksaD1iKGEsaixkLnVzZVN0cmljdCkuZm9ybWF0KFwiWVlZWS1NTS1ERFtUXUhIOm1tOnNzXCIpK2csYz1iKGgsaixkLnVzZVN0cmljdCkudHooZC50aW1lWm9uZSkpOmM9YihhLGosZC51c2VTdHJpY3QpLnR6KGQudGltZVpvbmUpKTpjPWIoYSxqLGQudXNlU3RyaWN0KSxjfSx5PWZ1bmN0aW9uKGEpe2lmKFwic3RyaW5nXCIhPXR5cGVvZiBhfHxhLmxlbmd0aD4xKXRocm93IG5ldyBUeXBlRXJyb3IoXCJpc0VuYWJsZWQgZXhwZWN0cyBhIHNpbmdsZSBjaGFyYWN0ZXIgc3RyaW5nIHBhcmFtZXRlclwiKTtzd2l0Y2goYSl7Y2FzZVwieVwiOnJldHVybi0xIT09aS5pbmRleE9mKFwiWVwiKTtjYXNlXCJNXCI6cmV0dXJuLTEhPT1pLmluZGV4T2YoXCJNXCIpO2Nhc2VcImRcIjpyZXR1cm4tMSE9PWkudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiZFwiKTtjYXNlXCJoXCI6Y2FzZVwiSFwiOnJldHVybi0xIT09aS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJoXCIpO2Nhc2VcIm1cIjpyZXR1cm4tMSE9PWkuaW5kZXhPZihcIm1cIik7Y2FzZVwic1wiOnJldHVybi0xIT09aS5pbmRleE9mKFwic1wiKTtkZWZhdWx0OnJldHVybiExfX0sej1mdW5jdGlvbigpe3JldHVybiB5KFwiaFwiKXx8eShcIm1cIil8fHkoXCJzXCIpfSxBPWZ1bmN0aW9uKCl7cmV0dXJuIHkoXCJ5XCIpfHx5KFwiTVwiKXx8eShcImRcIil9LEI9ZnVuY3Rpb24oKXt2YXIgYj1hKFwiPHRoZWFkPlwiKS5hcHBlbmQoYShcIjx0cj5cIikuYXBwZW5kKGEoXCI8dGg+XCIpLmFkZENsYXNzKFwicHJldlwiKS5hdHRyKFwiZGF0YS1hY3Rpb25cIixcInByZXZpb3VzXCIpLmFwcGVuZChhKFwiPHNwYW4+XCIpLmFkZENsYXNzKGQuaWNvbnMucHJldmlvdXMpKSkuYXBwZW5kKGEoXCI8dGg+XCIpLmFkZENsYXNzKFwicGlja2VyLXN3aXRjaFwiKS5hdHRyKFwiZGF0YS1hY3Rpb25cIixcInBpY2tlclN3aXRjaFwiKS5hdHRyKFwiY29sc3BhblwiLGQuY2FsZW5kYXJXZWVrcz9cIjZcIjpcIjVcIikpLmFwcGVuZChhKFwiPHRoPlwiKS5hZGRDbGFzcyhcIm5leHRcIikuYXR0cihcImRhdGEtYWN0aW9uXCIsXCJuZXh0XCIpLmFwcGVuZChhKFwiPHNwYW4+XCIpLmFkZENsYXNzKGQuaWNvbnMubmV4dCkpKSksYz1hKFwiPHRib2R5PlwiKS5hcHBlbmQoYShcIjx0cj5cIikuYXBwZW5kKGEoXCI8dGQ+XCIpLmF0dHIoXCJjb2xzcGFuXCIsZC5jYWxlbmRhcldlZWtzP1wiOFwiOlwiN1wiKSkpO3JldHVyblthKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJkYXRlcGlja2VyLWRheXNcIikuYXBwZW5kKGEoXCI8dGFibGU+XCIpLmFkZENsYXNzKFwidGFibGUtY29uZGVuc2VkXCIpLmFwcGVuZChiKS5hcHBlbmQoYShcIjx0Ym9keT5cIikpKSxhKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJkYXRlcGlja2VyLW1vbnRoc1wiKS5hcHBlbmQoYShcIjx0YWJsZT5cIikuYWRkQ2xhc3MoXCJ0YWJsZS1jb25kZW5zZWRcIikuYXBwZW5kKGIuY2xvbmUoKSkuYXBwZW5kKGMuY2xvbmUoKSkpLGEoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcImRhdGVwaWNrZXIteWVhcnNcIikuYXBwZW5kKGEoXCI8dGFibGU+XCIpLmFkZENsYXNzKFwidGFibGUtY29uZGVuc2VkXCIpLmFwcGVuZChiLmNsb25lKCkpLmFwcGVuZChjLmNsb25lKCkpKSxhKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJkYXRlcGlja2VyLWRlY2FkZXNcIikuYXBwZW5kKGEoXCI8dGFibGU+XCIpLmFkZENsYXNzKFwidGFibGUtY29uZGVuc2VkXCIpLmFwcGVuZChiLmNsb25lKCkpLmFwcGVuZChjLmNsb25lKCkpKV19LEM9ZnVuY3Rpb24oKXt2YXIgYj1hKFwiPHRyPlwiKSxjPWEoXCI8dHI+XCIpLGU9YShcIjx0cj5cIik7cmV0dXJuIHkoXCJoXCIpJiYoYi5hcHBlbmQoYShcIjx0ZD5cIikuYXBwZW5kKGEoXCI8YT5cIikuYXR0cih7aHJlZjpcIiNcIix0YWJpbmRleDpcIi0xXCIsdGl0bGU6ZC50b29sdGlwcy5pbmNyZW1lbnRIb3VyfSkuYWRkQ2xhc3MoXCJidG5cIikuYXR0cihcImRhdGEtYWN0aW9uXCIsXCJpbmNyZW1lbnRIb3Vyc1wiKS5hcHBlbmQoYShcIjxzcGFuPlwiKS5hZGRDbGFzcyhkLmljb25zLnVwKSkpKSxjLmFwcGVuZChhKFwiPHRkPlwiKS5hcHBlbmQoYShcIjxzcGFuPlwiKS5hZGRDbGFzcyhcInRpbWVwaWNrZXItaG91clwiKS5hdHRyKHtcImRhdGEtdGltZS1jb21wb25lbnRcIjpcImhvdXJzXCIsdGl0bGU6ZC50b29sdGlwcy5waWNrSG91cn0pLmF0dHIoXCJkYXRhLWFjdGlvblwiLFwic2hvd0hvdXJzXCIpKSksZS5hcHBlbmQoYShcIjx0ZD5cIikuYXBwZW5kKGEoXCI8YT5cIikuYXR0cih7aHJlZjpcIiNcIix0YWJpbmRleDpcIi0xXCIsdGl0bGU6ZC50b29sdGlwcy5kZWNyZW1lbnRIb3VyfSkuYWRkQ2xhc3MoXCJidG5cIikuYXR0cihcImRhdGEtYWN0aW9uXCIsXCJkZWNyZW1lbnRIb3Vyc1wiKS5hcHBlbmQoYShcIjxzcGFuPlwiKS5hZGRDbGFzcyhkLmljb25zLmRvd24pKSkpKSx5KFwibVwiKSYmKHkoXCJoXCIpJiYoYi5hcHBlbmQoYShcIjx0ZD5cIikuYWRkQ2xhc3MoXCJzZXBhcmF0b3JcIikpLGMuYXBwZW5kKGEoXCI8dGQ+XCIpLmFkZENsYXNzKFwic2VwYXJhdG9yXCIpLmh0bWwoXCI6XCIpKSxlLmFwcGVuZChhKFwiPHRkPlwiKS5hZGRDbGFzcyhcInNlcGFyYXRvclwiKSkpLGIuYXBwZW5kKGEoXCI8dGQ+XCIpLmFwcGVuZChhKFwiPGE+XCIpLmF0dHIoe2hyZWY6XCIjXCIsdGFiaW5kZXg6XCItMVwiLHRpdGxlOmQudG9vbHRpcHMuaW5jcmVtZW50TWludXRlfSkuYWRkQ2xhc3MoXCJidG5cIikuYXR0cihcImRhdGEtYWN0aW9uXCIsXCJpbmNyZW1lbnRNaW51dGVzXCIpLmFwcGVuZChhKFwiPHNwYW4+XCIpLmFkZENsYXNzKGQuaWNvbnMudXApKSkpLGMuYXBwZW5kKGEoXCI8dGQ+XCIpLmFwcGVuZChhKFwiPHNwYW4+XCIpLmFkZENsYXNzKFwidGltZXBpY2tlci1taW51dGVcIikuYXR0cih7XCJkYXRhLXRpbWUtY29tcG9uZW50XCI6XCJtaW51dGVzXCIsdGl0bGU6ZC50b29sdGlwcy5waWNrTWludXRlfSkuYXR0cihcImRhdGEtYWN0aW9uXCIsXCJzaG93TWludXRlc1wiKSkpLGUuYXBwZW5kKGEoXCI8dGQ+XCIpLmFwcGVuZChhKFwiPGE+XCIpLmF0dHIoe2hyZWY6XCIjXCIsdGFiaW5kZXg6XCItMVwiLHRpdGxlOmQudG9vbHRpcHMuZGVjcmVtZW50TWludXRlfSkuYWRkQ2xhc3MoXCJidG5cIikuYXR0cihcImRhdGEtYWN0aW9uXCIsXCJkZWNyZW1lbnRNaW51dGVzXCIpLmFwcGVuZChhKFwiPHNwYW4+XCIpLmFkZENsYXNzKGQuaWNvbnMuZG93bikpKSkpLHkoXCJzXCIpJiYoeShcIm1cIikmJihiLmFwcGVuZChhKFwiPHRkPlwiKS5hZGRDbGFzcyhcInNlcGFyYXRvclwiKSksYy5hcHBlbmQoYShcIjx0ZD5cIikuYWRkQ2xhc3MoXCJzZXBhcmF0b3JcIikuaHRtbChcIjpcIikpLGUuYXBwZW5kKGEoXCI8dGQ+XCIpLmFkZENsYXNzKFwic2VwYXJhdG9yXCIpKSksYi5hcHBlbmQoYShcIjx0ZD5cIikuYXBwZW5kKGEoXCI8YT5cIikuYXR0cih7aHJlZjpcIiNcIix0YWJpbmRleDpcIi0xXCIsdGl0bGU6ZC50b29sdGlwcy5pbmNyZW1lbnRTZWNvbmR9KS5hZGRDbGFzcyhcImJ0blwiKS5hdHRyKFwiZGF0YS1hY3Rpb25cIixcImluY3JlbWVudFNlY29uZHNcIikuYXBwZW5kKGEoXCI8c3Bhbj5cIikuYWRkQ2xhc3MoZC5pY29ucy51cCkpKSksYy5hcHBlbmQoYShcIjx0ZD5cIikuYXBwZW5kKGEoXCI8c3Bhbj5cIikuYWRkQ2xhc3MoXCJ0aW1lcGlja2VyLXNlY29uZFwiKS5hdHRyKHtcImRhdGEtdGltZS1jb21wb25lbnRcIjpcInNlY29uZHNcIix0aXRsZTpkLnRvb2x0aXBzLnBpY2tTZWNvbmR9KS5hdHRyKFwiZGF0YS1hY3Rpb25cIixcInNob3dTZWNvbmRzXCIpKSksZS5hcHBlbmQoYShcIjx0ZD5cIikuYXBwZW5kKGEoXCI8YT5cIikuYXR0cih7aHJlZjpcIiNcIix0YWJpbmRleDpcIi0xXCIsdGl0bGU6ZC50b29sdGlwcy5kZWNyZW1lbnRTZWNvbmR9KS5hZGRDbGFzcyhcImJ0blwiKS5hdHRyKFwiZGF0YS1hY3Rpb25cIixcImRlY3JlbWVudFNlY29uZHNcIikuYXBwZW5kKGEoXCI8c3Bhbj5cIikuYWRkQ2xhc3MoZC5pY29ucy5kb3duKSkpKSksaHx8KGIuYXBwZW5kKGEoXCI8dGQ+XCIpLmFkZENsYXNzKFwic2VwYXJhdG9yXCIpKSxjLmFwcGVuZChhKFwiPHRkPlwiKS5hcHBlbmQoYShcIjxidXR0b24+XCIpLmFkZENsYXNzKFwiYnRuIGJ0bi1wcmltYXJ5XCIpLmF0dHIoe1wiZGF0YS1hY3Rpb25cIjpcInRvZ2dsZVBlcmlvZFwiLHRhYmluZGV4OlwiLTFcIix0aXRsZTpkLnRvb2x0aXBzLnRvZ2dsZVBlcmlvZH0pKSksZS5hcHBlbmQoYShcIjx0ZD5cIikuYWRkQ2xhc3MoXCJzZXBhcmF0b3JcIikpKSxhKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJ0aW1lcGlja2VyLXBpY2tlclwiKS5hcHBlbmQoYShcIjx0YWJsZT5cIikuYWRkQ2xhc3MoXCJ0YWJsZS1jb25kZW5zZWRcIikuYXBwZW5kKFtiLGMsZV0pKX0sRD1mdW5jdGlvbigpe3ZhciBiPWEoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcInRpbWVwaWNrZXItaG91cnNcIikuYXBwZW5kKGEoXCI8dGFibGU+XCIpLmFkZENsYXNzKFwidGFibGUtY29uZGVuc2VkXCIpKSxjPWEoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcInRpbWVwaWNrZXItbWludXRlc1wiKS5hcHBlbmQoYShcIjx0YWJsZT5cIikuYWRkQ2xhc3MoXCJ0YWJsZS1jb25kZW5zZWRcIikpLGQ9YShcIjxkaXY+XCIpLmFkZENsYXNzKFwidGltZXBpY2tlci1zZWNvbmRzXCIpLmFwcGVuZChhKFwiPHRhYmxlPlwiKS5hZGRDbGFzcyhcInRhYmxlLWNvbmRlbnNlZFwiKSksZT1bQygpXTtyZXR1cm4geShcImhcIikmJmUucHVzaChiKSx5KFwibVwiKSYmZS5wdXNoKGMpLHkoXCJzXCIpJiZlLnB1c2goZCksZX0sRT1mdW5jdGlvbigpe3ZhciBiPVtdO3JldHVybiBkLnNob3dUb2RheUJ1dHRvbiYmYi5wdXNoKGEoXCI8dGQ+XCIpLmFwcGVuZChhKFwiPGE+XCIpLmF0dHIoe1wiZGF0YS1hY3Rpb25cIjpcInRvZGF5XCIsdGl0bGU6ZC50b29sdGlwcy50b2RheX0pLmFwcGVuZChhKFwiPHNwYW4+XCIpLmFkZENsYXNzKGQuaWNvbnMudG9kYXkpKSkpLCFkLnNpZGVCeVNpZGUmJkEoKSYmeigpJiZiLnB1c2goYShcIjx0ZD5cIikuYXBwZW5kKGEoXCI8YT5cIikuYXR0cih7XCJkYXRhLWFjdGlvblwiOlwidG9nZ2xlUGlja2VyXCIsdGl0bGU6ZC50b29sdGlwcy5zZWxlY3RUaW1lfSkuYXBwZW5kKGEoXCI8c3Bhbj5cIikuYWRkQ2xhc3MoZC5pY29ucy50aW1lKSkpKSxkLnNob3dDbGVhciYmYi5wdXNoKGEoXCI8dGQ+XCIpLmFwcGVuZChhKFwiPGE+XCIpLmF0dHIoe1wiZGF0YS1hY3Rpb25cIjpcImNsZWFyXCIsdGl0bGU6ZC50b29sdGlwcy5jbGVhcn0pLmFwcGVuZChhKFwiPHNwYW4+XCIpLmFkZENsYXNzKGQuaWNvbnMuY2xlYXIpKSkpLGQuc2hvd0Nsb3NlJiZiLnB1c2goYShcIjx0ZD5cIikuYXBwZW5kKGEoXCI8YT5cIikuYXR0cih7XCJkYXRhLWFjdGlvblwiOlwiY2xvc2VcIix0aXRsZTpkLnRvb2x0aXBzLmNsb3NlfSkuYXBwZW5kKGEoXCI8c3Bhbj5cIikuYWRkQ2xhc3MoZC5pY29ucy5jbG9zZSkpKSksYShcIjx0YWJsZT5cIikuYWRkQ2xhc3MoXCJ0YWJsZS1jb25kZW5zZWRcIikuYXBwZW5kKGEoXCI8dGJvZHk+XCIpLmFwcGVuZChhKFwiPHRyPlwiKS5hcHBlbmQoYikpKX0sRj1mdW5jdGlvbigpe3ZhciBiPWEoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcImJvb3RzdHJhcC1kYXRldGltZXBpY2tlci13aWRnZXQgZHJvcGRvd24tbWVudVwiKSxjPWEoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcImRhdGVwaWNrZXJcIikuYXBwZW5kKEIoKSksZT1hKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJ0aW1lcGlja2VyXCIpLmFwcGVuZChEKCkpLGY9YShcIjx1bD5cIikuYWRkQ2xhc3MoXCJsaXN0LXVuc3R5bGVkXCIpLGc9YShcIjxsaT5cIikuYWRkQ2xhc3MoXCJwaWNrZXItc3dpdGNoXCIrKGQuY29sbGFwc2U/XCIgYWNjb3JkaW9uLXRvZ2dsZVwiOlwiXCIpKS5hcHBlbmQoRSgpKTtyZXR1cm4gZC5pbmxpbmUmJmIucmVtb3ZlQ2xhc3MoXCJkcm9wZG93bi1tZW51XCIpLGgmJmIuYWRkQ2xhc3MoXCJ1c2V0d2VudHlmb3VyXCIpLHkoXCJzXCIpJiYhaCYmYi5hZGRDbGFzcyhcIndpZGVyXCIpLGQuc2lkZUJ5U2lkZSYmQSgpJiZ6KCk/KGIuYWRkQ2xhc3MoXCJ0aW1lcGlja2VyLXNic1wiKSxcInRvcFwiPT09ZC50b29sYmFyUGxhY2VtZW50JiZiLmFwcGVuZChnKSxiLmFwcGVuZChhKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJyb3dcIikuYXBwZW5kKGMuYWRkQ2xhc3MoXCJjb2wtbWQtNlwiKSkuYXBwZW5kKGUuYWRkQ2xhc3MoXCJjb2wtbWQtNlwiKSkpLFwiYm90dG9tXCI9PT1kLnRvb2xiYXJQbGFjZW1lbnQmJmIuYXBwZW5kKGcpLGIpOihcInRvcFwiPT09ZC50b29sYmFyUGxhY2VtZW50JiZmLmFwcGVuZChnKSxBKCkmJmYuYXBwZW5kKGEoXCI8bGk+XCIpLmFkZENsYXNzKGQuY29sbGFwc2UmJnooKT9cImNvbGxhcHNlIGluXCI6XCJcIikuYXBwZW5kKGMpKSxcImRlZmF1bHRcIj09PWQudG9vbGJhclBsYWNlbWVudCYmZi5hcHBlbmQoZykseigpJiZmLmFwcGVuZChhKFwiPGxpPlwiKS5hZGRDbGFzcyhkLmNvbGxhcHNlJiZBKCk/XCJjb2xsYXBzZVwiOlwiXCIpLmFwcGVuZChlKSksXCJib3R0b21cIj09PWQudG9vbGJhclBsYWNlbWVudCYmZi5hcHBlbmQoZyksYi5hcHBlbmQoZikpfSxHPWZ1bmN0aW9uKCl7dmFyIGIsZT17fTtyZXR1cm4gYj1jLmlzKFwiaW5wdXRcIil8fGQuaW5saW5lP2MuZGF0YSgpOmMuZmluZChcImlucHV0XCIpLmRhdGEoKSxiLmRhdGVPcHRpb25zJiZiLmRhdGVPcHRpb25zIGluc3RhbmNlb2YgT2JqZWN0JiYoZT1hLmV4dGVuZCghMCxlLGIuZGF0ZU9wdGlvbnMpKSxhLmVhY2goZCxmdW5jdGlvbihhKXt2YXIgYz1cImRhdGVcIithLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Euc2xpY2UoMSk7dm9pZCAwIT09YltjXSYmKGVbYV09YltjXSl9KSxlfSxIPWZ1bmN0aW9uKCl7dmFyIGIsZT0obnx8YykucG9zaXRpb24oKSxmPShufHxjKS5vZmZzZXQoKSxnPWQud2lkZ2V0UG9zaXRpb25pbmcudmVydGljYWwsaD1kLndpZGdldFBvc2l0aW9uaW5nLmhvcml6b250YWw7aWYoZC53aWRnZXRQYXJlbnQpYj1kLndpZGdldFBhcmVudC5hcHBlbmQobyk7ZWxzZSBpZihjLmlzKFwiaW5wdXRcIikpYj1jLmFmdGVyKG8pLnBhcmVudCgpO2Vsc2V7aWYoZC5pbmxpbmUpcmV0dXJuIHZvaWQoYj1jLmFwcGVuZChvKSk7Yj1jLGMuY2hpbGRyZW4oKS5maXJzdCgpLmFmdGVyKG8pfWlmKFwiYXV0b1wiPT09ZyYmKGc9Zi50b3ArMS41Km8uaGVpZ2h0KCk+PWEod2luZG93KS5oZWlnaHQoKSthKHdpbmRvdykuc2Nyb2xsVG9wKCkmJm8uaGVpZ2h0KCkrYy5vdXRlckhlaWdodCgpPGYudG9wP1widG9wXCI6XCJib3R0b21cIiksXCJhdXRvXCI9PT1oJiYoaD1iLndpZHRoKCk8Zi5sZWZ0K28ub3V0ZXJXaWR0aCgpLzImJmYubGVmdCtvLm91dGVyV2lkdGgoKT5hKHdpbmRvdykud2lkdGgoKT9cInJpZ2h0XCI6XCJsZWZ0XCIpLFwidG9wXCI9PT1nP28uYWRkQ2xhc3MoXCJ0b3BcIikucmVtb3ZlQ2xhc3MoXCJib3R0b21cIik6by5hZGRDbGFzcyhcImJvdHRvbVwiKS5yZW1vdmVDbGFzcyhcInRvcFwiKSxcInJpZ2h0XCI9PT1oP28uYWRkQ2xhc3MoXCJwdWxsLXJpZ2h0XCIpOm8ucmVtb3ZlQ2xhc3MoXCJwdWxsLXJpZ2h0XCIpLFwicmVsYXRpdmVcIiE9PWIuY3NzKFwicG9zaXRpb25cIikmJihiPWIucGFyZW50cygpLmZpbHRlcihmdW5jdGlvbigpe3JldHVyblwicmVsYXRpdmVcIj09PWEodGhpcykuY3NzKFwicG9zaXRpb25cIil9KS5maXJzdCgpKSwwPT09Yi5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKFwiZGF0ZXRpbWVwaWNrZXIgY29tcG9uZW50IHNob3VsZCBiZSBwbGFjZWQgd2l0aGluIGEgcmVsYXRpdmUgcG9zaXRpb25lZCBjb250YWluZXJcIik7by5jc3Moe3RvcDpcInRvcFwiPT09Zz9cImF1dG9cIjplLnRvcCtjLm91dGVySGVpZ2h0KCksYm90dG9tOlwidG9wXCI9PT1nP2UudG9wK2Mub3V0ZXJIZWlnaHQoKTpcImF1dG9cIixsZWZ0OlwibGVmdFwiPT09aD9iPT09Yz8wOmUubGVmdDpcImF1dG9cIixyaWdodDpcImxlZnRcIj09PWg/XCJhdXRvXCI6Yi5vdXRlcldpZHRoKCktYy5vdXRlcldpZHRoKCktKGI9PT1jPzA6ZS5sZWZ0KX0pfSxJPWZ1bmN0aW9uKGEpe1wiZHAuY2hhbmdlXCI9PT1hLnR5cGUmJihhLmRhdGUmJmEuZGF0ZS5pc1NhbWUoYS5vbGREYXRlKXx8IWEuZGF0ZSYmIWEub2xkRGF0ZSl8fGMudHJpZ2dlcihhKX0sSj1mdW5jdGlvbihhKXtcInlcIj09PWEmJihhPVwiWVlZWVwiKSxJKHt0eXBlOlwiZHAudXBkYXRlXCIsY2hhbmdlOmEsdmlld0RhdGU6Zi5jbG9uZSgpfSl9LEs9ZnVuY3Rpb24oYSl7byYmKGEmJihrPU1hdGgubWF4KHAsTWF0aC5taW4oMyxrK2EpKSksby5maW5kKFwiLmRhdGVwaWNrZXIgPiBkaXZcIikuaGlkZSgpLmZpbHRlcihcIi5kYXRlcGlja2VyLVwiK3Fba10uY2xzTmFtZSkuc2hvdygpKX0sTD1mdW5jdGlvbigpe3ZhciBiPWEoXCI8dHI+XCIpLGM9Zi5jbG9uZSgpLnN0YXJ0T2YoXCJ3XCIpLnN0YXJ0T2YoXCJkXCIpO2ZvcihkLmNhbGVuZGFyV2Vla3M9PT0hMCYmYi5hcHBlbmQoYShcIjx0aD5cIikuYWRkQ2xhc3MoXCJjd1wiKS50ZXh0KFwiI1wiKSk7Yy5pc0JlZm9yZShmLmNsb25lKCkuZW5kT2YoXCJ3XCIpKTspYi5hcHBlbmQoYShcIjx0aD5cIikuYWRkQ2xhc3MoXCJkb3dcIikudGV4dChjLmZvcm1hdChcImRkXCIpKSksYy5hZGQoMSxcImRcIik7by5maW5kKFwiLmRhdGVwaWNrZXItZGF5cyB0aGVhZFwiKS5hcHBlbmQoYil9LE09ZnVuY3Rpb24oYSl7cmV0dXJuIGQuZGlzYWJsZWREYXRlc1thLmZvcm1hdChcIllZWVktTU0tRERcIildPT09ITB9LE49ZnVuY3Rpb24oYSl7cmV0dXJuIGQuZW5hYmxlZERhdGVzW2EuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKV09PT0hMH0sTz1mdW5jdGlvbihhKXtyZXR1cm4gZC5kaXNhYmxlZEhvdXJzW2EuZm9ybWF0KFwiSFwiKV09PT0hMH0sUD1mdW5jdGlvbihhKXtyZXR1cm4gZC5lbmFibGVkSG91cnNbYS5mb3JtYXQoXCJIXCIpXT09PSEwfSxRPWZ1bmN0aW9uKGIsYyl7aWYoIWIuaXNWYWxpZCgpKXJldHVybiExO2lmKGQuZGlzYWJsZWREYXRlcyYmXCJkXCI9PT1jJiZNKGIpKXJldHVybiExO2lmKGQuZW5hYmxlZERhdGVzJiZcImRcIj09PWMmJiFOKGIpKXJldHVybiExO2lmKGQubWluRGF0ZSYmYi5pc0JlZm9yZShkLm1pbkRhdGUsYykpcmV0dXJuITE7aWYoZC5tYXhEYXRlJiZiLmlzQWZ0ZXIoZC5tYXhEYXRlLGMpKXJldHVybiExO2lmKGQuZGF5c09mV2Vla0Rpc2FibGVkJiZcImRcIj09PWMmJi0xIT09ZC5kYXlzT2ZXZWVrRGlzYWJsZWQuaW5kZXhPZihiLmRheSgpKSlyZXR1cm4hMTtpZihkLmRpc2FibGVkSG91cnMmJihcImhcIj09PWN8fFwibVwiPT09Y3x8XCJzXCI9PT1jKSYmTyhiKSlyZXR1cm4hMTtpZihkLmVuYWJsZWRIb3VycyYmKFwiaFwiPT09Y3x8XCJtXCI9PT1jfHxcInNcIj09PWMpJiYhUChiKSlyZXR1cm4hMTtpZihkLmRpc2FibGVkVGltZUludGVydmFscyYmKFwiaFwiPT09Y3x8XCJtXCI9PT1jfHxcInNcIj09PWMpKXt2YXIgZT0hMTtpZihhLmVhY2goZC5kaXNhYmxlZFRpbWVJbnRlcnZhbHMsZnVuY3Rpb24oKXtyZXR1cm4gYi5pc0JldHdlZW4odGhpc1swXSx0aGlzWzFdKT8oZT0hMCwhMSk6dm9pZCAwfSksZSlyZXR1cm4hMX1yZXR1cm4hMH0sUj1mdW5jdGlvbigpe2Zvcih2YXIgYj1bXSxjPWYuY2xvbmUoKS5zdGFydE9mKFwieVwiKS5zdGFydE9mKFwiZFwiKTtjLmlzU2FtZShmLFwieVwiKTspYi5wdXNoKGEoXCI8c3Bhbj5cIikuYXR0cihcImRhdGEtYWN0aW9uXCIsXCJzZWxlY3RNb250aFwiKS5hZGRDbGFzcyhcIm1vbnRoXCIpLnRleHQoYy5mb3JtYXQoXCJNTU1cIikpKSxjLmFkZCgxLFwiTVwiKTtvLmZpbmQoXCIuZGF0ZXBpY2tlci1tb250aHMgdGRcIikuZW1wdHkoKS5hcHBlbmQoYil9LFM9ZnVuY3Rpb24oKXt2YXIgYj1vLmZpbmQoXCIuZGF0ZXBpY2tlci1tb250aHNcIiksYz1iLmZpbmQoXCJ0aFwiKSxnPWIuZmluZChcInRib2R5XCIpLmZpbmQoXCJzcGFuXCIpO2MuZXEoMCkuZmluZChcInNwYW5cIikuYXR0cihcInRpdGxlXCIsZC50b29sdGlwcy5wcmV2WWVhciksYy5lcSgxKS5hdHRyKFwidGl0bGVcIixkLnRvb2x0aXBzLnNlbGVjdFllYXIpLGMuZXEoMikuZmluZChcInNwYW5cIikuYXR0cihcInRpdGxlXCIsZC50b29sdGlwcy5uZXh0WWVhciksYi5maW5kKFwiLmRpc2FibGVkXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIiksUShmLmNsb25lKCkuc3VidHJhY3QoMSxcInlcIiksXCJ5XCIpfHxjLmVxKDApLmFkZENsYXNzKFwiZGlzYWJsZWRcIiksYy5lcSgxKS50ZXh0KGYueWVhcigpKSxRKGYuY2xvbmUoKS5hZGQoMSxcInlcIiksXCJ5XCIpfHxjLmVxKDIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIiksZy5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKSxlLmlzU2FtZShmLFwieVwiKSYmIW0mJmcuZXEoZS5tb250aCgpKS5hZGRDbGFzcyhcImFjdGl2ZVwiKSxnLmVhY2goZnVuY3Rpb24oYil7UShmLmNsb25lKCkubW9udGgoYiksXCJNXCIpfHxhKHRoaXMpLmFkZENsYXNzKFwiZGlzYWJsZWRcIil9KX0sVD1mdW5jdGlvbigpe3ZhciBhPW8uZmluZChcIi5kYXRlcGlja2VyLXllYXJzXCIpLGI9YS5maW5kKFwidGhcIiksYz1mLmNsb25lKCkuc3VidHJhY3QoNSxcInlcIiksZz1mLmNsb25lKCkuYWRkKDYsXCJ5XCIpLGg9XCJcIjtmb3IoYi5lcSgwKS5maW5kKFwic3BhblwiKS5hdHRyKFwidGl0bGVcIixkLnRvb2x0aXBzLnByZXZEZWNhZGUpLGIuZXEoMSkuYXR0cihcInRpdGxlXCIsZC50b29sdGlwcy5zZWxlY3REZWNhZGUpLGIuZXEoMikuZmluZChcInNwYW5cIikuYXR0cihcInRpdGxlXCIsZC50b29sdGlwcy5uZXh0RGVjYWRlKSxhLmZpbmQoXCIuZGlzYWJsZWRcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKSxkLm1pbkRhdGUmJmQubWluRGF0ZS5pc0FmdGVyKGMsXCJ5XCIpJiZiLmVxKDApLmFkZENsYXNzKFwiZGlzYWJsZWRcIiksYi5lcSgxKS50ZXh0KGMueWVhcigpK1wiLVwiK2cueWVhcigpKSxkLm1heERhdGUmJmQubWF4RGF0ZS5pc0JlZm9yZShnLFwieVwiKSYmYi5lcSgyKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpOyFjLmlzQWZ0ZXIoZyxcInlcIik7KWgrPSc8c3BhbiBkYXRhLWFjdGlvbj1cInNlbGVjdFllYXJcIiBjbGFzcz1cInllYXInKyhjLmlzU2FtZShlLFwieVwiKSYmIW0/XCIgYWN0aXZlXCI6XCJcIikrKFEoYyxcInlcIik/XCJcIjpcIiBkaXNhYmxlZFwiKSsnXCI+JytjLnllYXIoKStcIjwvc3Bhbj5cIixjLmFkZCgxLFwieVwiKTthLmZpbmQoXCJ0ZFwiKS5odG1sKGgpfSxVPWZ1bmN0aW9uKCl7dmFyIGE9by5maW5kKFwiLmRhdGVwaWNrZXItZGVjYWRlc1wiKSxjPWEuZmluZChcInRoXCIpLGc9Yih7eTpmLnllYXIoKS1mLnllYXIoKSUxMDAtMX0pLGg9Zy5jbG9uZSgpLmFkZCgxMDAsXCJ5XCIpLGk9Zy5jbG9uZSgpLGo9XCJcIjtmb3IoYy5lcSgwKS5maW5kKFwic3BhblwiKS5hdHRyKFwidGl0bGVcIixkLnRvb2x0aXBzLnByZXZDZW50dXJ5KSxjLmVxKDIpLmZpbmQoXCJzcGFuXCIpLmF0dHIoXCJ0aXRsZVwiLGQudG9vbHRpcHMubmV4dENlbnR1cnkpLGEuZmluZChcIi5kaXNhYmxlZFwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLChnLmlzU2FtZShiKHt5OjE5MDB9KSl8fGQubWluRGF0ZSYmZC5taW5EYXRlLmlzQWZ0ZXIoZyxcInlcIikpJiZjLmVxKDApLmFkZENsYXNzKFwiZGlzYWJsZWRcIiksYy5lcSgxKS50ZXh0KGcueWVhcigpK1wiLVwiK2gueWVhcigpKSwoZy5pc1NhbWUoYih7eToyZTN9KSl8fGQubWF4RGF0ZSYmZC5tYXhEYXRlLmlzQmVmb3JlKGgsXCJ5XCIpKSYmYy5lcSgyKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpOyFnLmlzQWZ0ZXIoaCxcInlcIik7KWorPSc8c3BhbiBkYXRhLWFjdGlvbj1cInNlbGVjdERlY2FkZVwiIGNsYXNzPVwiZGVjYWRlJysoZy5pc1NhbWUoZSxcInlcIik/XCIgYWN0aXZlXCI6XCJcIikrKFEoZyxcInlcIik/XCJcIjpcIiBkaXNhYmxlZFwiKSsnXCIgZGF0YS1zZWxlY3Rpb249XCInKyhnLnllYXIoKSs2KSsnXCI+JysoZy55ZWFyKCkrMSkrXCIgLSBcIisoZy55ZWFyKCkrMTIpK1wiPC9zcGFuPlwiLGcuYWRkKDEyLFwieVwiKTtqKz1cIjxzcGFuPjwvc3Bhbj48c3Bhbj48L3NwYW4+PHNwYW4+PC9zcGFuPlwiLGEuZmluZChcInRkXCIpLmh0bWwoaiksYy5lcSgxKS50ZXh0KGkueWVhcigpKzErXCItXCIrZy55ZWFyKCkpfSxWPWZ1bmN0aW9uKCl7dmFyIGIsYyxnLGgsaT1vLmZpbmQoXCIuZGF0ZXBpY2tlci1kYXlzXCIpLGo9aS5maW5kKFwidGhcIiksaz1bXTtpZihBKCkpe2ZvcihqLmVxKDApLmZpbmQoXCJzcGFuXCIpLmF0dHIoXCJ0aXRsZVwiLGQudG9vbHRpcHMucHJldk1vbnRoKSxqLmVxKDEpLmF0dHIoXCJ0aXRsZVwiLGQudG9vbHRpcHMuc2VsZWN0TW9udGgpLGouZXEoMikuZmluZChcInNwYW5cIikuYXR0cihcInRpdGxlXCIsZC50b29sdGlwcy5uZXh0TW9udGgpLGkuZmluZChcIi5kaXNhYmxlZFwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLGouZXEoMSkudGV4dChmLmZvcm1hdChkLmRheVZpZXdIZWFkZXJGb3JtYXQpKSxRKGYuY2xvbmUoKS5zdWJ0cmFjdCgxLFwiTVwiKSxcIk1cIil8fGouZXEoMCkuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKSxRKGYuY2xvbmUoKS5hZGQoMSxcIk1cIiksXCJNXCIpfHxqLmVxKDIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIiksYj1mLmNsb25lKCkuc3RhcnRPZihcIk1cIikuc3RhcnRPZihcIndcIikuc3RhcnRPZihcImRcIiksaD0wOzQyPmg7aCsrKTA9PT1iLndlZWtkYXkoKSYmKGM9YShcIjx0cj5cIiksZC5jYWxlbmRhcldlZWtzJiZjLmFwcGVuZCgnPHRkIGNsYXNzPVwiY3dcIj4nK2Iud2VlaygpK1wiPC90ZD5cIiksay5wdXNoKGMpKSxnPVwiXCIsYi5pc0JlZm9yZShmLFwiTVwiKSYmKGcrPVwiIG9sZFwiKSxiLmlzQWZ0ZXIoZixcIk1cIikmJihnKz1cIiBuZXdcIiksYi5pc1NhbWUoZSxcImRcIikmJiFtJiYoZys9XCIgYWN0aXZlXCIpLFEoYixcImRcIil8fChnKz1cIiBkaXNhYmxlZFwiKSxiLmlzU2FtZSh4KCksXCJkXCIpJiYoZys9XCIgdG9kYXlcIiksKDA9PT1iLmRheSgpfHw2PT09Yi5kYXkoKSkmJihnKz1cIiB3ZWVrZW5kXCIpLGMuYXBwZW5kKCc8dGQgZGF0YS1hY3Rpb249XCJzZWxlY3REYXlcIiBkYXRhLWRheT1cIicrYi5mb3JtYXQoXCJMXCIpKydcIiBjbGFzcz1cImRheScrZysnXCI+JytiLmRhdGUoKStcIjwvdGQ+XCIpLGIuYWRkKDEsXCJkXCIpO2kuZmluZChcInRib2R5XCIpLmVtcHR5KCkuYXBwZW5kKGspLFMoKSxUKCksVSgpfX0sVz1mdW5jdGlvbigpe3ZhciBiPW8uZmluZChcIi50aW1lcGlja2VyLWhvdXJzIHRhYmxlXCIpLGM9Zi5jbG9uZSgpLnN0YXJ0T2YoXCJkXCIpLGQ9W10sZT1hKFwiPHRyPlwiKTtmb3IoZi5ob3VyKCk+MTEmJiFoJiZjLmhvdXIoMTIpO2MuaXNTYW1lKGYsXCJkXCIpJiYoaHx8Zi5ob3VyKCk8MTImJmMuaG91cigpPDEyfHxmLmhvdXIoKT4xMSk7KWMuaG91cigpJTQ9PT0wJiYoZT1hKFwiPHRyPlwiKSxkLnB1c2goZSkpLGUuYXBwZW5kKCc8dGQgZGF0YS1hY3Rpb249XCJzZWxlY3RIb3VyXCIgY2xhc3M9XCJob3VyJysoUShjLFwiaFwiKT9cIlwiOlwiIGRpc2FibGVkXCIpKydcIj4nK2MuZm9ybWF0KGg/XCJISFwiOlwiaGhcIikrXCI8L3RkPlwiKSxjLmFkZCgxLFwiaFwiKTtiLmVtcHR5KCkuYXBwZW5kKGQpfSxYPWZ1bmN0aW9uKCl7Zm9yKHZhciBiPW8uZmluZChcIi50aW1lcGlja2VyLW1pbnV0ZXMgdGFibGVcIiksYz1mLmNsb25lKCkuc3RhcnRPZihcImhcIiksZT1bXSxnPWEoXCI8dHI+XCIpLGg9MT09PWQuc3RlcHBpbmc/NTpkLnN0ZXBwaW5nO2YuaXNTYW1lKGMsXCJoXCIpOyljLm1pbnV0ZSgpJSg0KmgpPT09MCYmKGc9YShcIjx0cj5cIiksZS5wdXNoKGcpKSxnLmFwcGVuZCgnPHRkIGRhdGEtYWN0aW9uPVwic2VsZWN0TWludXRlXCIgY2xhc3M9XCJtaW51dGUnKyhRKGMsXCJtXCIpP1wiXCI6XCIgZGlzYWJsZWRcIikrJ1wiPicrYy5mb3JtYXQoXCJtbVwiKStcIjwvdGQ+XCIpLGMuYWRkKGgsXCJtXCIpO2IuZW1wdHkoKS5hcHBlbmQoZSl9LFk9ZnVuY3Rpb24oKXtmb3IodmFyIGI9by5maW5kKFwiLnRpbWVwaWNrZXItc2Vjb25kcyB0YWJsZVwiKSxjPWYuY2xvbmUoKS5zdGFydE9mKFwibVwiKSxkPVtdLGU9YShcIjx0cj5cIik7Zi5pc1NhbWUoYyxcIm1cIik7KWMuc2Vjb25kKCklMjA9PT0wJiYoZT1hKFwiPHRyPlwiKSxkLnB1c2goZSkpLGUuYXBwZW5kKCc8dGQgZGF0YS1hY3Rpb249XCJzZWxlY3RTZWNvbmRcIiBjbGFzcz1cInNlY29uZCcrKFEoYyxcInNcIik/XCJcIjpcIiBkaXNhYmxlZFwiKSsnXCI+JytjLmZvcm1hdChcInNzXCIpK1wiPC90ZD5cIiksYy5hZGQoNSxcInNcIik7Yi5lbXB0eSgpLmFwcGVuZChkKX0sWj1mdW5jdGlvbigpe3ZhciBhLGIsYz1vLmZpbmQoXCIudGltZXBpY2tlciBzcGFuW2RhdGEtdGltZS1jb21wb25lbnRdXCIpO2h8fChhPW8uZmluZChcIi50aW1lcGlja2VyIFtkYXRhLWFjdGlvbj10b2dnbGVQZXJpb2RdXCIpLGI9ZS5jbG9uZSgpLmFkZChlLmhvdXJzKCk+PTEyPy0xMjoxMixcImhcIiksYS50ZXh0KGUuZm9ybWF0KFwiQVwiKSksUShiLFwiaFwiKT9hLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik6YS5hZGRDbGFzcyhcImRpc2FibGVkXCIpKSxjLmZpbHRlcihcIltkYXRhLXRpbWUtY29tcG9uZW50PWhvdXJzXVwiKS50ZXh0KGUuZm9ybWF0KGg/XCJISFwiOlwiaGhcIikpLGMuZmlsdGVyKFwiW2RhdGEtdGltZS1jb21wb25lbnQ9bWludXRlc11cIikudGV4dChlLmZvcm1hdChcIm1tXCIpKSxjLmZpbHRlcihcIltkYXRhLXRpbWUtY29tcG9uZW50PXNlY29uZHNdXCIpLnRleHQoZS5mb3JtYXQoXCJzc1wiKSksVygpLFgoKSxZKCl9LCQ9ZnVuY3Rpb24oKXtvJiYoVigpLFooKSl9LF89ZnVuY3Rpb24oYSl7dmFyIGI9bT9udWxsOmU7cmV0dXJuIGE/KGE9YS5jbG9uZSgpLmxvY2FsZShkLmxvY2FsZSksMSE9PWQuc3RlcHBpbmcmJmEubWludXRlcyhNYXRoLnJvdW5kKGEubWludXRlcygpL2Quc3RlcHBpbmcpKmQuc3RlcHBpbmclNjApLnNlY29uZHMoMCksdm9pZChRKGEpPyhlPWEsZj1lLmNsb25lKCksZy52YWwoZS5mb3JtYXQoaSkpLGMuZGF0YShcImRhdGVcIixlLmZvcm1hdChpKSksbT0hMSwkKCksSSh7dHlwZTpcImRwLmNoYW5nZVwiLGRhdGU6ZS5jbG9uZSgpLG9sZERhdGU6Yn0pKTooZC5rZWVwSW52YWxpZHx8Zy52YWwobT9cIlwiOmUuZm9ybWF0KGkpKSxJKHt0eXBlOlwiZHAuZXJyb3JcIixkYXRlOmF9KSkpKToobT0hMCxnLnZhbChcIlwiKSxjLmRhdGEoXCJkYXRlXCIsXCJcIiksSSh7dHlwZTpcImRwLmNoYW5nZVwiLGRhdGU6ITEsb2xkRGF0ZTpifSksdm9pZCAkKCkpfSxhYT1mdW5jdGlvbigpe3ZhciBiPSExO3JldHVybiBvPyhvLmZpbmQoXCIuY29sbGFwc2VcIikuZWFjaChmdW5jdGlvbigpe3ZhciBjPWEodGhpcykuZGF0YShcImNvbGxhcHNlXCIpO3JldHVybiBjJiZjLnRyYW5zaXRpb25pbmc/KGI9ITAsITEpOiEwfSksYj9sOihuJiZuLmhhc0NsYXNzKFwiYnRuXCIpJiZuLnRvZ2dsZUNsYXNzKFwiYWN0aXZlXCIpLG8uaGlkZSgpLGEod2luZG93KS5vZmYoXCJyZXNpemVcIixIKSxvLm9mZihcImNsaWNrXCIsXCJbZGF0YS1hY3Rpb25dXCIpLG8ub2ZmKFwibW91c2Vkb3duXCIsITEpLG8ucmVtb3ZlKCksbz0hMSxJKHt0eXBlOlwiZHAuaGlkZVwiLGRhdGU6ZS5jbG9uZSgpfSksZy5ibHVyKCksbCkpOmx9LGJhPWZ1bmN0aW9uKCl7XyhudWxsKX0sY2E9e25leHQ6ZnVuY3Rpb24oKXt2YXIgYT1xW2tdLm5hdkZuYztmLmFkZChxW2tdLm5hdlN0ZXAsYSksVigpLEooYSl9LHByZXZpb3VzOmZ1bmN0aW9uKCl7dmFyIGE9cVtrXS5uYXZGbmM7Zi5zdWJ0cmFjdChxW2tdLm5hdlN0ZXAsYSksVigpLEooYSl9LHBpY2tlclN3aXRjaDpmdW5jdGlvbigpe0soMSl9LHNlbGVjdE1vbnRoOmZ1bmN0aW9uKGIpe3ZhciBjPWEoYi50YXJnZXQpLmNsb3Nlc3QoXCJ0Ym9keVwiKS5maW5kKFwic3BhblwiKS5pbmRleChhKGIudGFyZ2V0KSk7Zi5tb250aChjKSxrPT09cD8oXyhlLmNsb25lKCkueWVhcihmLnllYXIoKSkubW9udGgoZi5tb250aCgpKSksZC5pbmxpbmV8fGFhKCkpOihLKC0xKSxWKCkpLEooXCJNXCIpfSxzZWxlY3RZZWFyOmZ1bmN0aW9uKGIpe3ZhciBjPXBhcnNlSW50KGEoYi50YXJnZXQpLnRleHQoKSwxMCl8fDA7Zi55ZWFyKGMpLGs9PT1wPyhfKGUuY2xvbmUoKS55ZWFyKGYueWVhcigpKSksZC5pbmxpbmV8fGFhKCkpOihLKC0xKSxWKCkpLEooXCJZWVlZXCIpfSxzZWxlY3REZWNhZGU6ZnVuY3Rpb24oYil7dmFyIGM9cGFyc2VJbnQoYShiLnRhcmdldCkuZGF0YShcInNlbGVjdGlvblwiKSwxMCl8fDA7Zi55ZWFyKGMpLGs9PT1wPyhfKGUuY2xvbmUoKS55ZWFyKGYueWVhcigpKSksZC5pbmxpbmV8fGFhKCkpOihLKC0xKSxWKCkpLEooXCJZWVlZXCIpfSxzZWxlY3REYXk6ZnVuY3Rpb24oYil7dmFyIGM9Zi5jbG9uZSgpO2EoYi50YXJnZXQpLmlzKFwiLm9sZFwiKSYmYy5zdWJ0cmFjdCgxLFwiTVwiKSxhKGIudGFyZ2V0KS5pcyhcIi5uZXdcIikmJmMuYWRkKDEsXCJNXCIpLF8oYy5kYXRlKHBhcnNlSW50KGEoYi50YXJnZXQpLnRleHQoKSwxMCkpKSx6KCl8fGQua2VlcE9wZW58fGQuaW5saW5lfHxhYSgpfSxpbmNyZW1lbnRIb3VyczpmdW5jdGlvbigpe3ZhciBhPWUuY2xvbmUoKS5hZGQoMSxcImhcIik7UShhLFwiaFwiKSYmXyhhKX0saW5jcmVtZW50TWludXRlczpmdW5jdGlvbigpe3ZhciBhPWUuY2xvbmUoKS5hZGQoZC5zdGVwcGluZyxcIm1cIik7UShhLFwibVwiKSYmXyhhKX0saW5jcmVtZW50U2Vjb25kczpmdW5jdGlvbigpe3ZhciBhPWUuY2xvbmUoKS5hZGQoMSxcInNcIik7UShhLFwic1wiKSYmXyhhKX0sZGVjcmVtZW50SG91cnM6ZnVuY3Rpb24oKXt2YXIgYT1lLmNsb25lKCkuc3VidHJhY3QoMSxcImhcIik7UShhLFwiaFwiKSYmXyhhKX0sZGVjcmVtZW50TWludXRlczpmdW5jdGlvbigpe3ZhciBhPWUuY2xvbmUoKS5zdWJ0cmFjdChkLnN0ZXBwaW5nLFwibVwiKTtRKGEsXCJtXCIpJiZfKGEpfSxkZWNyZW1lbnRTZWNvbmRzOmZ1bmN0aW9uKCl7dmFyIGE9ZS5jbG9uZSgpLnN1YnRyYWN0KDEsXCJzXCIpO1EoYSxcInNcIikmJl8oYSl9LHRvZ2dsZVBlcmlvZDpmdW5jdGlvbigpe18oZS5jbG9uZSgpLmFkZChlLmhvdXJzKCk+PTEyPy0xMjoxMixcImhcIikpfSx0b2dnbGVQaWNrZXI6ZnVuY3Rpb24oYil7dmFyIGMsZT1hKGIudGFyZ2V0KSxmPWUuY2xvc2VzdChcInVsXCIpLGc9Zi5maW5kKFwiLmluXCIpLGg9Zi5maW5kKFwiLmNvbGxhcHNlOm5vdCguaW4pXCIpO2lmKGcmJmcubGVuZ3RoKXtpZihjPWcuZGF0YShcImNvbGxhcHNlXCIpLGMmJmMudHJhbnNpdGlvbmluZylyZXR1cm47Zy5jb2xsYXBzZT8oZy5jb2xsYXBzZShcImhpZGVcIiksaC5jb2xsYXBzZShcInNob3dcIikpOihnLnJlbW92ZUNsYXNzKFwiaW5cIiksaC5hZGRDbGFzcyhcImluXCIpKSxlLmlzKFwic3BhblwiKT9lLnRvZ2dsZUNsYXNzKGQuaWNvbnMudGltZStcIiBcIitkLmljb25zLmRhdGUpOmUuZmluZChcInNwYW5cIikudG9nZ2xlQ2xhc3MoZC5pY29ucy50aW1lK1wiIFwiK2QuaWNvbnMuZGF0ZSl9fSxzaG93UGlja2VyOmZ1bmN0aW9uKCl7by5maW5kKFwiLnRpbWVwaWNrZXIgPiBkaXY6bm90KC50aW1lcGlja2VyLXBpY2tlcilcIikuaGlkZSgpLG8uZmluZChcIi50aW1lcGlja2VyIC50aW1lcGlja2VyLXBpY2tlclwiKS5zaG93KCl9LHNob3dIb3VyczpmdW5jdGlvbigpe28uZmluZChcIi50aW1lcGlja2VyIC50aW1lcGlja2VyLXBpY2tlclwiKS5oaWRlKCksby5maW5kKFwiLnRpbWVwaWNrZXIgLnRpbWVwaWNrZXItaG91cnNcIikuc2hvdygpfSxzaG93TWludXRlczpmdW5jdGlvbigpe28uZmluZChcIi50aW1lcGlja2VyIC50aW1lcGlja2VyLXBpY2tlclwiKS5oaWRlKCksby5maW5kKFwiLnRpbWVwaWNrZXIgLnRpbWVwaWNrZXItbWludXRlc1wiKS5zaG93KCl9LHNob3dTZWNvbmRzOmZ1bmN0aW9uKCl7by5maW5kKFwiLnRpbWVwaWNrZXIgLnRpbWVwaWNrZXItcGlja2VyXCIpLmhpZGUoKSxvLmZpbmQoXCIudGltZXBpY2tlciAudGltZXBpY2tlci1zZWNvbmRzXCIpLnNob3coKX0sc2VsZWN0SG91cjpmdW5jdGlvbihiKXt2YXIgYz1wYXJzZUludChhKGIudGFyZ2V0KS50ZXh0KCksMTApO2h8fChlLmhvdXJzKCk+PTEyPzEyIT09YyYmKGMrPTEyKToxMj09PWMmJihjPTApKSxfKGUuY2xvbmUoKS5ob3VycyhjKSksY2Euc2hvd1BpY2tlci5jYWxsKGwpfSxzZWxlY3RNaW51dGU6ZnVuY3Rpb24oYil7XyhlLmNsb25lKCkubWludXRlcyhwYXJzZUludChhKGIudGFyZ2V0KS50ZXh0KCksMTApKSksY2Euc2hvd1BpY2tlci5jYWxsKGwpfSxzZWxlY3RTZWNvbmQ6ZnVuY3Rpb24oYil7XyhlLmNsb25lKCkuc2Vjb25kcyhwYXJzZUludChhKGIudGFyZ2V0KS50ZXh0KCksMTApKSksY2Euc2hvd1BpY2tlci5jYWxsKGwpfSxjbGVhcjpiYSx0b2RheTpmdW5jdGlvbigpe3ZhciBhPXgoKTtRKGEsXCJkXCIpJiZfKGEpfSxjbG9zZTphYX0sZGE9ZnVuY3Rpb24oYil7cmV0dXJuIGEoYi5jdXJyZW50VGFyZ2V0KS5pcyhcIi5kaXNhYmxlZFwiKT8hMTooY2FbYShiLmN1cnJlbnRUYXJnZXQpLmRhdGEoXCJhY3Rpb25cIildLmFwcGx5KGwsYXJndW1lbnRzKSwhMSl9LGVhPWZ1bmN0aW9uKCl7dmFyIGIsYz17eWVhcjpmdW5jdGlvbihhKXtyZXR1cm4gYS5tb250aCgwKS5kYXRlKDEpLmhvdXJzKDApLnNlY29uZHMoMCkubWludXRlcygwKX0sbW9udGg6ZnVuY3Rpb24oYSl7cmV0dXJuIGEuZGF0ZSgxKS5ob3VycygwKS5zZWNvbmRzKDApLm1pbnV0ZXMoMCl9LGRheTpmdW5jdGlvbihhKXtyZXR1cm4gYS5ob3VycygwKS5zZWNvbmRzKDApLm1pbnV0ZXMoMCl9LGhvdXI6ZnVuY3Rpb24oYSl7cmV0dXJuIGEuc2Vjb25kcygwKS5taW51dGVzKDApfSxtaW51dGU6ZnVuY3Rpb24oYSl7cmV0dXJuIGEuc2Vjb25kcygwKX19O3JldHVybiBnLnByb3AoXCJkaXNhYmxlZFwiKXx8IWQuaWdub3JlUmVhZG9ubHkmJmcucHJvcChcInJlYWRvbmx5XCIpfHxvP2w6KHZvaWQgMCE9PWcudmFsKCkmJjAhPT1nLnZhbCgpLnRyaW0oKS5sZW5ndGg/XyhnYShnLnZhbCgpLnRyaW0oKSkpOmQudXNlQ3VycmVudCYmbSYmKGcuaXMoXCJpbnB1dFwiKSYmMD09PWcudmFsKCkudHJpbSgpLmxlbmd0aHx8ZC5pbmxpbmUpJiYoYj14KCksXCJzdHJpbmdcIj09dHlwZW9mIGQudXNlQ3VycmVudCYmKGI9Y1tkLnVzZUN1cnJlbnRdKGIpKSxfKGIpKSxvPUYoKSxMKCksUigpLG8uZmluZChcIi50aW1lcGlja2VyLWhvdXJzXCIpLmhpZGUoKSxvLmZpbmQoXCIudGltZXBpY2tlci1taW51dGVzXCIpLmhpZGUoKSxvLmZpbmQoXCIudGltZXBpY2tlci1zZWNvbmRzXCIpLmhpZGUoKSwkKCksSygpLGEod2luZG93KS5vbihcInJlc2l6ZVwiLEgpLG8ub24oXCJjbGlja1wiLFwiW2RhdGEtYWN0aW9uXVwiLGRhKSxvLm9uKFwibW91c2Vkb3duXCIsITEpLG4mJm4uaGFzQ2xhc3MoXCJidG5cIikmJm4udG9nZ2xlQ2xhc3MoXCJhY3RpdmVcIiksby5zaG93KCksSCgpLGQuZm9jdXNPblNob3cmJiFnLmlzKFwiOmZvY3VzXCIpJiZnLmZvY3VzKCksSSh7dHlwZTpcImRwLnNob3dcIn0pLGwpfSxmYT1mdW5jdGlvbigpe3JldHVybiBvP2FhKCk6ZWEoKX0sZ2E9ZnVuY3Rpb24oYSl7cmV0dXJuIGE9dm9pZCAwPT09ZC5wYXJzZUlucHV0RGF0ZT9iLmlzTW9tZW50KGEpfHxhIGluc3RhbmNlb2YgRGF0ZT9iKGEpOngoYSk6ZC5wYXJzZUlucHV0RGF0ZShhKSxhLmxvY2FsZShkLmxvY2FsZSksYX0saGE9ZnVuY3Rpb24oYSl7dmFyIGIsYyxlLGYsZz1udWxsLGg9W10saT17fSxqPWEud2hpY2gsaz1cInBcIjt3W2pdPWs7Zm9yKGIgaW4gdyl3Lmhhc093blByb3BlcnR5KGIpJiZ3W2JdPT09ayYmKGgucHVzaChiKSxwYXJzZUludChiLDEwKSE9PWomJihpW2JdPSEwKSk7Zm9yKGIgaW4gZC5rZXlCaW5kcylpZihkLmtleUJpbmRzLmhhc093blByb3BlcnR5KGIpJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBkLmtleUJpbmRzW2JdJiYoZT1iLnNwbGl0KFwiIFwiKSxlLmxlbmd0aD09PWgubGVuZ3RoJiZ2W2pdPT09ZVtlLmxlbmd0aC0xXSkpe2ZvcihmPSEwLGM9ZS5sZW5ndGgtMjtjPj0wO2MtLSlpZighKHZbZVtjXV1pbiBpKSl7Zj0hMTticmVha31pZihmKXtnPWQua2V5QmluZHNbYl07YnJlYWt9fWcmJihnLmNhbGwobCxvKSxhLnN0b3BQcm9wYWdhdGlvbigpLGEucHJldmVudERlZmF1bHQoKSl9LGlhPWZ1bmN0aW9uKGEpe3dbYS53aGljaF09XCJyXCIsYS5zdG9wUHJvcGFnYXRpb24oKSxhLnByZXZlbnREZWZhdWx0KCl9LGphPWZ1bmN0aW9uKGIpe3ZhciBjPWEoYi50YXJnZXQpLnZhbCgpLnRyaW0oKSxkPWM/Z2EoYyk6bnVsbDtyZXR1cm4gXyhkKSxiLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpLCExfSxrYT1mdW5jdGlvbigpe2cub24oe2NoYW5nZTpqYSxibHVyOmQuZGVidWc/XCJcIjphYSxrZXlkb3duOmhhLGtleXVwOmlhLGZvY3VzOmQuYWxsb3dJbnB1dFRvZ2dsZT9lYTpcIlwifSksYy5pcyhcImlucHV0XCIpP2cub24oe2ZvY3VzOmVhfSk6biYmKG4ub24oXCJjbGlja1wiLGZhKSxuLm9uKFwibW91c2Vkb3duXCIsITEpKX0sbGE9ZnVuY3Rpb24oKXtnLm9mZih7Y2hhbmdlOmphLGJsdXI6Ymx1cixrZXlkb3duOmhhLGtleXVwOmlhLGZvY3VzOmQuYWxsb3dJbnB1dFRvZ2dsZT9hYTpcIlwifSksYy5pcyhcImlucHV0XCIpP2cub2ZmKHtmb2N1czplYX0pOm4mJihuLm9mZihcImNsaWNrXCIsZmEpLG4ub2ZmKFwibW91c2Vkb3duXCIsITEpKX0sbWE9ZnVuY3Rpb24oYil7dmFyIGM9e307cmV0dXJuIGEuZWFjaChiLGZ1bmN0aW9uKCl7dmFyIGE9Z2EodGhpcyk7YS5pc1ZhbGlkKCkmJihjW2EuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKV09ITApfSksT2JqZWN0LmtleXMoYykubGVuZ3RoP2M6ITF9LG5hPWZ1bmN0aW9uKGIpe3ZhciBjPXt9O3JldHVybiBhLmVhY2goYixmdW5jdGlvbigpe2NbdGhpc109ITB9KSxPYmplY3Qua2V5cyhjKS5sZW5ndGg/YzohMX0sb2E9ZnVuY3Rpb24oKXt2YXIgYT1kLmZvcm1hdHx8XCJMIExUXCI7aT1hLnJlcGxhY2UoLyhcXFtbXlxcW10qXFxdKXwoXFxcXCk/KExUU3xMVHxMTD9MP0w/fGx7MSw0fSkvZyxmdW5jdGlvbihhKXt2YXIgYj1lLmxvY2FsZURhdGEoKS5sb25nRGF0ZUZvcm1hdChhKXx8YTtyZXR1cm4gYi5yZXBsYWNlKC8oXFxbW15cXFtdKlxcXSl8KFxcXFwpPyhMVFN8TFR8TEw/TD9MP3xsezEsNH0pL2csZnVuY3Rpb24oYSl7cmV0dXJuIGUubG9jYWxlRGF0YSgpLmxvbmdEYXRlRm9ybWF0KGEpfHxhfSl9KSxqPWQuZXh0cmFGb3JtYXRzP2QuZXh0cmFGb3JtYXRzLnNsaWNlKCk6W10sai5pbmRleE9mKGEpPDAmJmouaW5kZXhPZihpKTwwJiZqLnB1c2goaSksaD1pLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImFcIik8MSYmaS5yZXBsYWNlKC9cXFsuKj9cXF0vZyxcIlwiKS5pbmRleE9mKFwiaFwiKTwxLHkoXCJ5XCIpJiYocD0yKSx5KFwiTVwiKSYmKHA9MSkseShcImRcIikmJihwPTApLGs9TWF0aC5tYXgocCxrKSxtfHxfKGUpfTtpZihsLmRlc3Ryb3k9ZnVuY3Rpb24oKXthYSgpLGxhKCksYy5yZW1vdmVEYXRhKFwiRGF0ZVRpbWVQaWNrZXJcIiksYy5yZW1vdmVEYXRhKFwiZGF0ZVwiKX0sbC50b2dnbGU9ZmEsbC5zaG93PWVhLGwuaGlkZT1hYSxsLmRpc2FibGU9ZnVuY3Rpb24oKXtyZXR1cm4gYWEoKSxuJiZuLmhhc0NsYXNzKFwiYnRuXCIpJiZuLmFkZENsYXNzKFwiZGlzYWJsZWRcIiksZy5wcm9wKFwiZGlzYWJsZWRcIiwhMCksbH0sbC5lbmFibGU9ZnVuY3Rpb24oKXtyZXR1cm4gbiYmbi5oYXNDbGFzcyhcImJ0blwiKSYmbi5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLGcucHJvcChcImRpc2FibGVkXCIsITEpLGx9LGwuaWdub3JlUmVhZG9ubHk9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuaWdub3JlUmVhZG9ubHk7aWYoXCJib29sZWFuXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJpZ25vcmVSZWFkb25seSAoKSBleHBlY3RzIGEgYm9vbGVhbiBwYXJhbWV0ZXJcIik7cmV0dXJuIGQuaWdub3JlUmVhZG9ubHk9YSxsfSxsLm9wdGlvbnM9ZnVuY3Rpb24oYil7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGEuZXh0ZW5kKCEwLHt9LGQpO2lmKCEoYiBpbnN0YW5jZW9mIE9iamVjdCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMoKSBvcHRpb25zIHBhcmFtZXRlciBzaG91bGQgYmUgYW4gb2JqZWN0XCIpO3JldHVybiBhLmV4dGVuZCghMCxkLGIpLGEuZWFjaChkLGZ1bmN0aW9uKGEsYil7aWYodm9pZCAwPT09bFthXSl0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9uIFwiK2ErXCIgaXMgbm90IHJlY29nbml6ZWQhXCIpO2xbYV0oYil9KSxsfSxsLmRhdGU9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIG0/bnVsbDplLmNsb25lKCk7aWYoIShudWxsPT09YXx8XCJzdHJpbmdcIj09dHlwZW9mIGF8fGIuaXNNb21lbnQoYSl8fGEgaW5zdGFuY2VvZiBEYXRlKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZGF0ZSgpIHBhcmFtZXRlciBtdXN0IGJlIG9uZSBvZiBbbnVsbCwgc3RyaW5nLCBtb21lbnQgb3IgRGF0ZV1cIik7cmV0dXJuIF8obnVsbD09PWE/bnVsbDpnYShhKSksbH0sbC5mb3JtYXQ9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuZm9ybWF0O2lmKFwic3RyaW5nXCIhPXR5cGVvZiBhJiYoXCJib29sZWFuXCIhPXR5cGVvZiBhfHxhIT09ITEpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJmb3JtYXQoKSBleHBlY3RzIGEgc3Rpbmcgb3IgYm9vbGVhbjpmYWxzZSBwYXJhbWV0ZXIgXCIrYSk7cmV0dXJuIGQuZm9ybWF0PWEsaSYmb2EoKSxsfSxsLnRpbWVab25lPWZ1bmN0aW9uKGEpe3JldHVybiAwPT09YXJndW1lbnRzLmxlbmd0aD9kLnRpbWVab25lOihkLnRpbWVab25lPWEsbCl9LGwuZGF5Vmlld0hlYWRlckZvcm1hdD1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5kYXlWaWV3SGVhZGVyRm9ybWF0O2lmKFwic3RyaW5nXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJkYXlWaWV3SGVhZGVyRm9ybWF0KCkgZXhwZWN0cyBhIHN0cmluZyBwYXJhbWV0ZXJcIik7cmV0dXJuIGQuZGF5Vmlld0hlYWRlckZvcm1hdD1hLGx9LGwuZXh0cmFGb3JtYXRzPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmV4dHJhRm9ybWF0cztpZihhIT09ITEmJiEoYSBpbnN0YW5jZW9mIEFycmF5KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXh0cmFGb3JtYXRzKCkgZXhwZWN0cyBhbiBhcnJheSBvciBmYWxzZSBwYXJhbWV0ZXJcIik7cmV0dXJuIGQuZXh0cmFGb3JtYXRzPWEsaiYmb2EoKSxsfSxsLmRpc2FibGVkRGF0ZXM9ZnVuY3Rpb24oYil7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuZGlzYWJsZWREYXRlcz9hLmV4dGVuZCh7fSxkLmRpc2FibGVkRGF0ZXMpOmQuZGlzYWJsZWREYXRlcztpZighYilyZXR1cm4gZC5kaXNhYmxlZERhdGVzPSExLCQoKSxsO2lmKCEoYiBpbnN0YW5jZW9mIEFycmF5KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZGlzYWJsZWREYXRlcygpIGV4cGVjdHMgYW4gYXJyYXkgcGFyYW1ldGVyXCIpO3JldHVybiBkLmRpc2FibGVkRGF0ZXM9bWEoYiksZC5lbmFibGVkRGF0ZXM9ITEsJCgpLGx9LGwuZW5hYmxlZERhdGVzPWZ1bmN0aW9uKGIpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmVuYWJsZWREYXRlcz9hLmV4dGVuZCh7fSxkLmVuYWJsZWREYXRlcyk6ZC5lbmFibGVkRGF0ZXM7aWYoIWIpcmV0dXJuIGQuZW5hYmxlZERhdGVzPSExLCQoKSxsO2lmKCEoYiBpbnN0YW5jZW9mIEFycmF5KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZW5hYmxlZERhdGVzKCkgZXhwZWN0cyBhbiBhcnJheSBwYXJhbWV0ZXJcIik7cmV0dXJuIGQuZW5hYmxlZERhdGVzPW1hKGIpLGQuZGlzYWJsZWREYXRlcz0hMSwkKCksbH0sbC5kYXlzT2ZXZWVrRGlzYWJsZWQ9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuZGF5c09mV2Vla0Rpc2FibGVkLnNwbGljZSgwKTtpZihcImJvb2xlYW5cIj09dHlwZW9mIGEmJiFhKXJldHVybiBkLmRheXNPZldlZWtEaXNhYmxlZD0hMSwkKCksbDtpZighKGEgaW5zdGFuY2VvZiBBcnJheSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcImRheXNPZldlZWtEaXNhYmxlZCgpIGV4cGVjdHMgYW4gYXJyYXkgcGFyYW1ldGVyXCIpO2lmKGQuZGF5c09mV2Vla0Rpc2FibGVkPWEucmVkdWNlKGZ1bmN0aW9uKGEsYil7cmV0dXJuIGI9cGFyc2VJbnQoYiwxMCksYj42fHwwPmJ8fGlzTmFOKGIpP2E6KC0xPT09YS5pbmRleE9mKGIpJiZhLnB1c2goYiksYSl9LFtdKS5zb3J0KCksZC51c2VDdXJyZW50JiYhZC5rZWVwSW52YWxpZCl7Zm9yKHZhciBiPTA7IVEoZSxcImRcIik7KXtpZihlLmFkZCgxLFwiZFwiKSw3PT09Yil0aHJvd1wiVHJpZWQgNyB0aW1lcyB0byBmaW5kIGEgdmFsaWQgZGF0ZVwiO2IrK31fKGUpfXJldHVybiAkKCksbH0sbC5tYXhEYXRlPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLm1heERhdGU/ZC5tYXhEYXRlLmNsb25lKCk6ZC5tYXhEYXRlO2lmKFwiYm9vbGVhblwiPT10eXBlb2YgYSYmYT09PSExKXJldHVybiBkLm1heERhdGU9ITEsJCgpLGw7XCJzdHJpbmdcIj09dHlwZW9mIGEmJihcIm5vd1wiPT09YXx8XCJtb21lbnRcIj09PWEpJiYoYT14KCkpO3ZhciBiPWdhKGEpO2lmKCFiLmlzVmFsaWQoKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwibWF4RGF0ZSgpIENvdWxkIG5vdCBwYXJzZSBkYXRlIHBhcmFtZXRlcjogXCIrYSk7aWYoZC5taW5EYXRlJiZiLmlzQmVmb3JlKGQubWluRGF0ZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIm1heERhdGUoKSBkYXRlIHBhcmFtZXRlciBpcyBiZWZvcmUgb3B0aW9ucy5taW5EYXRlOiBcIitiLmZvcm1hdChpKSk7cmV0dXJuIGQubWF4RGF0ZT1iLGQudXNlQ3VycmVudCYmIWQua2VlcEludmFsaWQmJmUuaXNBZnRlcihhKSYmXyhkLm1heERhdGUpLGYuaXNBZnRlcihiKSYmKGY9Yi5jbG9uZSgpLnN1YnRyYWN0KGQuc3RlcHBpbmcsXCJtXCIpKSwkKCksbH0sbC5taW5EYXRlPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLm1pbkRhdGU/ZC5taW5EYXRlLmNsb25lKCk6ZC5taW5EYXRlO2lmKFwiYm9vbGVhblwiPT10eXBlb2YgYSYmYT09PSExKXJldHVybiBkLm1pbkRhdGU9ITEsJCgpLGw7XCJzdHJpbmdcIj09dHlwZW9mIGEmJihcIm5vd1wiPT09YXx8XCJtb21lbnRcIj09PWEpJiYoYT14KCkpO3ZhciBiPWdhKGEpO2lmKCFiLmlzVmFsaWQoKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwibWluRGF0ZSgpIENvdWxkIG5vdCBwYXJzZSBkYXRlIHBhcmFtZXRlcjogXCIrYSk7aWYoZC5tYXhEYXRlJiZiLmlzQWZ0ZXIoZC5tYXhEYXRlKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwibWluRGF0ZSgpIGRhdGUgcGFyYW1ldGVyIGlzIGFmdGVyIG9wdGlvbnMubWF4RGF0ZTogXCIrYi5mb3JtYXQoaSkpO3JldHVybiBkLm1pbkRhdGU9YixkLnVzZUN1cnJlbnQmJiFkLmtlZXBJbnZhbGlkJiZlLmlzQmVmb3JlKGEpJiZfKGQubWluRGF0ZSksZi5pc0JlZm9yZShiKSYmKGY9Yi5jbG9uZSgpLmFkZChkLnN0ZXBwaW5nLFwibVwiKSksJCgpLGx9LGwuZGVmYXVsdERhdGU9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuZGVmYXVsdERhdGU/ZC5kZWZhdWx0RGF0ZS5jbG9uZSgpOmQuZGVmYXVsdERhdGU7aWYoIWEpcmV0dXJuIGQuZGVmYXVsdERhdGU9ITEsbDtcInN0cmluZ1wiPT10eXBlb2YgYSYmKFwibm93XCI9PT1hfHxcIm1vbWVudFwiPT09YSkmJihhPXgoKSk7dmFyIGI9Z2EoYSk7aWYoIWIuaXNWYWxpZCgpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJkZWZhdWx0RGF0ZSgpIENvdWxkIG5vdCBwYXJzZSBkYXRlIHBhcmFtZXRlcjogXCIrYSk7aWYoIVEoYikpdGhyb3cgbmV3IFR5cGVFcnJvcihcImRlZmF1bHREYXRlKCkgZGF0ZSBwYXNzZWQgaXMgaW52YWxpZCBhY2NvcmRpbmcgdG8gY29tcG9uZW50IHNldHVwIHZhbGlkYXRpb25zXCIpO3JldHVybiBkLmRlZmF1bHREYXRlPWIsKGQuZGVmYXVsdERhdGUmJmQuaW5saW5lfHxcIlwiPT09Zy52YWwoKS50cmltKCkpJiZfKGQuZGVmYXVsdERhdGUpLGx9LGwubG9jYWxlPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmxvY2FsZTtpZighYi5sb2NhbGVEYXRhKGEpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJsb2NhbGUoKSBsb2NhbGUgXCIrYStcIiBpcyBub3QgbG9hZGVkIGZyb20gbW9tZW50IGxvY2FsZXMhXCIpO3JldHVybiBkLmxvY2FsZT1hLGUubG9jYWxlKGQubG9jYWxlKSxmLmxvY2FsZShkLmxvY2FsZSksaSYmb2EoKSxvJiYoYWEoKSxlYSgpKSxsfSxsLnN0ZXBwaW5nPWZ1bmN0aW9uKGEpe3JldHVybiAwPT09YXJndW1lbnRzLmxlbmd0aD9kLnN0ZXBwaW5nOihhPXBhcnNlSW50KGEsMTApLChpc05hTihhKXx8MT5hKSYmKGE9MSksZC5zdGVwcGluZz1hLGwpfSxsLnVzZUN1cnJlbnQ9ZnVuY3Rpb24oYSl7dmFyIGI9W1wieWVhclwiLFwibW9udGhcIixcImRheVwiLFwiaG91clwiLFwibWludXRlXCJdO2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLnVzZUN1cnJlbnQ7aWYoXCJib29sZWFuXCIhPXR5cGVvZiBhJiZcInN0cmluZ1wiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwidXNlQ3VycmVudCgpIGV4cGVjdHMgYSBib29sZWFuIG9yIHN0cmluZyBwYXJhbWV0ZXJcIik7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGEmJi0xPT09Yi5pbmRleE9mKGEudG9Mb3dlckNhc2UoKSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcInVzZUN1cnJlbnQoKSBleHBlY3RzIGEgc3RyaW5nIHBhcmFtZXRlciBvZiBcIitiLmpvaW4oXCIsIFwiKSk7cmV0dXJuIGQudXNlQ3VycmVudD1hLGx9LGwuY29sbGFwc2U9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuY29sbGFwc2U7aWYoXCJib29sZWFuXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJjb2xsYXBzZSgpIGV4cGVjdHMgYSBib29sZWFuIHBhcmFtZXRlclwiKTtyZXR1cm4gZC5jb2xsYXBzZT09PWE/bDooZC5jb2xsYXBzZT1hLG8mJihhYSgpLGVhKCkpLGwpfSxsLmljb25zPWZ1bmN0aW9uKGIpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBhLmV4dGVuZCh7fSxkLmljb25zKTtpZighKGIgaW5zdGFuY2VvZiBPYmplY3QpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJpY29ucygpIGV4cGVjdHMgcGFyYW1ldGVyIHRvIGJlIGFuIE9iamVjdFwiKTtyZXR1cm4gYS5leHRlbmQoZC5pY29ucyxiKSxvJiYoYWEoKSxlYSgpKSxsfSxsLnRvb2x0aXBzPWZ1bmN0aW9uKGIpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBhLmV4dGVuZCh7fSxkLnRvb2x0aXBzKTtpZighKGIgaW5zdGFuY2VvZiBPYmplY3QpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJ0b29sdGlwcygpIGV4cGVjdHMgcGFyYW1ldGVyIHRvIGJlIGFuIE9iamVjdFwiKTtyZXR1cm4gYS5leHRlbmQoZC50b29sdGlwcyxiKSxvJiYoYWEoKSxlYSgpKSxsfSxsLnVzZVN0cmljdD1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC51c2VTdHJpY3Q7aWYoXCJib29sZWFuXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJ1c2VTdHJpY3QoKSBleHBlY3RzIGEgYm9vbGVhbiBwYXJhbWV0ZXJcIik7cmV0dXJuIGQudXNlU3RyaWN0PWEsbH0sbC5zaWRlQnlTaWRlPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLnNpZGVCeVNpZGU7aWYoXCJib29sZWFuXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJzaWRlQnlTaWRlKCkgZXhwZWN0cyBhIGJvb2xlYW4gcGFyYW1ldGVyXCIpO3JldHVybiBkLnNpZGVCeVNpZGU9YSxvJiYoYWEoKSxlYSgpKSxsfSxsLnZpZXdNb2RlPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLnZpZXdNb2RlO2lmKFwic3RyaW5nXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJ2aWV3TW9kZSgpIGV4cGVjdHMgYSBzdHJpbmcgcGFyYW1ldGVyXCIpO2lmKC0xPT09ci5pbmRleE9mKGEpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJ2aWV3TW9kZSgpIHBhcmFtZXRlciBtdXN0IGJlIG9uZSBvZiAoXCIrci5qb2luKFwiLCBcIikrXCIpIHZhbHVlXCIpO3JldHVybiBkLnZpZXdNb2RlPWEsaz1NYXRoLm1heChyLmluZGV4T2YoYSkscCksSygpLGx9LGwudG9vbGJhclBsYWNlbWVudD1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC50b29sYmFyUGxhY2VtZW50O2lmKFwic3RyaW5nXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJ0b29sYmFyUGxhY2VtZW50KCkgZXhwZWN0cyBhIHN0cmluZyBwYXJhbWV0ZXJcIik7aWYoLTE9PT11LmluZGV4T2YoYSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcInRvb2xiYXJQbGFjZW1lbnQoKSBwYXJhbWV0ZXIgbXVzdCBiZSBvbmUgb2YgKFwiK3Uuam9pbihcIiwgXCIpK1wiKSB2YWx1ZVwiKTtyZXR1cm4gZC50b29sYmFyUGxhY2VtZW50PWEsbyYmKGFhKCksZWEoKSksbH0sbC53aWRnZXRQb3NpdGlvbmluZz1mdW5jdGlvbihiKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gYS5leHRlbmQoe30sZC53aWRnZXRQb3NpdGlvbmluZyk7aWYoXCJbb2JqZWN0IE9iamVjdF1cIiE9PXt9LnRvU3RyaW5nLmNhbGwoYikpdGhyb3cgbmV3IFR5cGVFcnJvcihcIndpZGdldFBvc2l0aW9uaW5nKCkgZXhwZWN0cyBhbiBvYmplY3QgdmFyaWFibGVcIik7aWYoYi5ob3Jpem9udGFsKXtpZihcInN0cmluZ1wiIT10eXBlb2YgYi5ob3Jpem9udGFsKXRocm93IG5ldyBUeXBlRXJyb3IoXCJ3aWRnZXRQb3NpdGlvbmluZygpIGhvcml6b250YWwgdmFyaWFibGUgbXVzdCBiZSBhIHN0cmluZ1wiKTtpZihiLmhvcml6b250YWw9Yi5ob3Jpem9udGFsLnRvTG93ZXJDYXNlKCksLTE9PT10LmluZGV4T2YoYi5ob3Jpem9udGFsKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwid2lkZ2V0UG9zaXRpb25pbmcoKSBleHBlY3RzIGhvcml6b250YWwgcGFyYW1ldGVyIHRvIGJlIG9uZSBvZiAoXCIrdC5qb2luKFwiLCBcIikrXCIpXCIpO2Qud2lkZ2V0UG9zaXRpb25pbmcuaG9yaXpvbnRhbD1iLmhvcml6b250YWx9aWYoYi52ZXJ0aWNhbCl7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGIudmVydGljYWwpdGhyb3cgbmV3IFR5cGVFcnJvcihcIndpZGdldFBvc2l0aW9uaW5nKCkgdmVydGljYWwgdmFyaWFibGUgbXVzdCBiZSBhIHN0cmluZ1wiKTtpZihiLnZlcnRpY2FsPWIudmVydGljYWwudG9Mb3dlckNhc2UoKSwtMT09PXMuaW5kZXhPZihiLnZlcnRpY2FsKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwid2lkZ2V0UG9zaXRpb25pbmcoKSBleHBlY3RzIHZlcnRpY2FsIHBhcmFtZXRlciB0byBiZSBvbmUgb2YgKFwiK3Muam9pbihcIiwgXCIpK1wiKVwiKTtkLndpZGdldFBvc2l0aW9uaW5nLnZlcnRpY2FsPWIudmVydGljYWx9cmV0dXJuICQoKSxsfSxsLmNhbGVuZGFyV2Vla3M9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuY2FsZW5kYXJXZWVrcztpZihcImJvb2xlYW5cIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcImNhbGVuZGFyV2Vla3MoKSBleHBlY3RzIHBhcmFtZXRlciB0byBiZSBhIGJvb2xlYW4gdmFsdWVcIik7cmV0dXJuIGQuY2FsZW5kYXJXZWVrcz1hLCQoKSxsfSxsLnNob3dUb2RheUJ1dHRvbj1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5zaG93VG9kYXlCdXR0b247aWYoXCJib29sZWFuXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJzaG93VG9kYXlCdXR0b24oKSBleHBlY3RzIGEgYm9vbGVhbiBwYXJhbWV0ZXJcIik7cmV0dXJuIGQuc2hvd1RvZGF5QnV0dG9uPWEsbyYmKGFhKCksZWEoKSksbH0sbC5zaG93Q2xlYXI9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuc2hvd0NsZWFyO2lmKFwiYm9vbGVhblwiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwic2hvd0NsZWFyKCkgZXhwZWN0cyBhIGJvb2xlYW4gcGFyYW1ldGVyXCIpO3JldHVybiBkLnNob3dDbGVhcj1hLG8mJihhYSgpLGVhKCkpLGx9LGwud2lkZ2V0UGFyZW50PWZ1bmN0aW9uKGIpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLndpZGdldFBhcmVudDtpZihcInN0cmluZ1wiPT10eXBlb2YgYiYmKGI9YShiKSksbnVsbCE9PWImJlwic3RyaW5nXCIhPXR5cGVvZiBiJiYhKGIgaW5zdGFuY2VvZiBhKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwid2lkZ2V0UGFyZW50KCkgZXhwZWN0cyBhIHN0cmluZyBvciBhIGpRdWVyeSBvYmplY3QgcGFyYW1ldGVyXCIpO3JldHVybiBkLndpZGdldFBhcmVudD1iLG8mJihhYSgpLGVhKCkpLGx9LGwua2VlcE9wZW49ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQua2VlcE9wZW47aWYoXCJib29sZWFuXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJrZWVwT3BlbigpIGV4cGVjdHMgYSBib29sZWFuIHBhcmFtZXRlclwiKTtyZXR1cm4gZC5rZWVwT3Blbj1hLGx9LGwuZm9jdXNPblNob3c9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuZm9jdXNPblNob3c7aWYoXCJib29sZWFuXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJmb2N1c09uU2hvdygpIGV4cGVjdHMgYSBib29sZWFuIHBhcmFtZXRlclwiKTtyZXR1cm4gZC5mb2N1c09uU2hvdz1hLGx9LGwuaW5saW5lPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmlubGluZTtpZihcImJvb2xlYW5cIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcImlubGluZSgpIGV4cGVjdHMgYSBib29sZWFuIHBhcmFtZXRlclwiKTtyZXR1cm4gZC5pbmxpbmU9YSxsfSxsLmNsZWFyPWZ1bmN0aW9uKCl7cmV0dXJuIGJhKCksbH0sbC5rZXlCaW5kcz1mdW5jdGlvbihhKXtyZXR1cm4gZC5rZXlCaW5kcz1hLGx9LGwuZ2V0TW9tZW50PWZ1bmN0aW9uKGEpe3JldHVybiB4KGEpfSxsLmRlYnVnPWZ1bmN0aW9uKGEpe2lmKFwiYm9vbGVhblwiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZGVidWcoKSBleHBlY3RzIGEgYm9vbGVhbiBwYXJhbWV0ZXJcIik7cmV0dXJuIGQuZGVidWc9YSxsfSxsLmFsbG93SW5wdXRUb2dnbGU9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuYWxsb3dJbnB1dFRvZ2dsZTtpZihcImJvb2xlYW5cIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcImFsbG93SW5wdXRUb2dnbGUoKSBleHBlY3RzIGEgYm9vbGVhbiBwYXJhbWV0ZXJcIik7cmV0dXJuIGQuYWxsb3dJbnB1dFRvZ2dsZT1hLGx9LGwuc2hvd0Nsb3NlPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLnNob3dDbG9zZTtpZihcImJvb2xlYW5cIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcInNob3dDbG9zZSgpIGV4cGVjdHMgYSBib29sZWFuIHBhcmFtZXRlclwiKTtyZXR1cm4gZC5zaG93Q2xvc2U9YSxsfSxsLmtlZXBJbnZhbGlkPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmtlZXBJbnZhbGlkO2lmKFwiYm9vbGVhblwiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwia2VlcEludmFsaWQoKSBleHBlY3RzIGEgYm9vbGVhbiBwYXJhbWV0ZXJcIik7cmV0dXJuIGQua2VlcEludmFsaWQ9YSxsfSxsLmRhdGVwaWNrZXJJbnB1dD1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5kYXRlcGlja2VySW5wdXQ7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcImRhdGVwaWNrZXJJbnB1dCgpIGV4cGVjdHMgYSBzdHJpbmcgcGFyYW1ldGVyXCIpO3JldHVybiBkLmRhdGVwaWNrZXJJbnB1dD1hLGx9LGwucGFyc2VJbnB1dERhdGU9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQucGFyc2VJbnB1dERhdGU7XHJcbmlmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcInBhcnNlSW5wdXREYXRlKCkgc2hvbHVkIGJlIGFzIGZ1bmN0aW9uXCIpO3JldHVybiBkLnBhcnNlSW5wdXREYXRlPWEsbH0sbC5kaXNhYmxlZFRpbWVJbnRlcnZhbHM9ZnVuY3Rpb24oYil7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuZGlzYWJsZWRUaW1lSW50ZXJ2YWxzP2EuZXh0ZW5kKHt9LGQuZGlzYWJsZWRUaW1lSW50ZXJ2YWxzKTpkLmRpc2FibGVkVGltZUludGVydmFscztpZighYilyZXR1cm4gZC5kaXNhYmxlZFRpbWVJbnRlcnZhbHM9ITEsJCgpLGw7aWYoIShiIGluc3RhbmNlb2YgQXJyYXkpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJkaXNhYmxlZFRpbWVJbnRlcnZhbHMoKSBleHBlY3RzIGFuIGFycmF5IHBhcmFtZXRlclwiKTtyZXR1cm4gZC5kaXNhYmxlZFRpbWVJbnRlcnZhbHM9YiwkKCksbH0sbC5kaXNhYmxlZEhvdXJzPWZ1bmN0aW9uKGIpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmRpc2FibGVkSG91cnM/YS5leHRlbmQoe30sZC5kaXNhYmxlZEhvdXJzKTpkLmRpc2FibGVkSG91cnM7aWYoIWIpcmV0dXJuIGQuZGlzYWJsZWRIb3Vycz0hMSwkKCksbDtpZighKGIgaW5zdGFuY2VvZiBBcnJheSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcImRpc2FibGVkSG91cnMoKSBleHBlY3RzIGFuIGFycmF5IHBhcmFtZXRlclwiKTtpZihkLmRpc2FibGVkSG91cnM9bmEoYiksZC5lbmFibGVkSG91cnM9ITEsZC51c2VDdXJyZW50JiYhZC5rZWVwSW52YWxpZCl7Zm9yKHZhciBjPTA7IVEoZSxcImhcIik7KXtpZihlLmFkZCgxLFwiaFwiKSwyND09PWMpdGhyb3dcIlRyaWVkIDI0IHRpbWVzIHRvIGZpbmQgYSB2YWxpZCBkYXRlXCI7YysrfV8oZSl9cmV0dXJuICQoKSxsfSxsLmVuYWJsZWRIb3Vycz1mdW5jdGlvbihiKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5lbmFibGVkSG91cnM/YS5leHRlbmQoe30sZC5lbmFibGVkSG91cnMpOmQuZW5hYmxlZEhvdXJzO2lmKCFiKXJldHVybiBkLmVuYWJsZWRIb3Vycz0hMSwkKCksbDtpZighKGIgaW5zdGFuY2VvZiBBcnJheSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcImVuYWJsZWRIb3VycygpIGV4cGVjdHMgYW4gYXJyYXkgcGFyYW1ldGVyXCIpO2lmKGQuZW5hYmxlZEhvdXJzPW5hKGIpLGQuZGlzYWJsZWRIb3Vycz0hMSxkLnVzZUN1cnJlbnQmJiFkLmtlZXBJbnZhbGlkKXtmb3IodmFyIGM9MDshUShlLFwiaFwiKTspe2lmKGUuYWRkKDEsXCJoXCIpLDI0PT09Yyl0aHJvd1wiVHJpZWQgMjQgdGltZXMgdG8gZmluZCBhIHZhbGlkIGRhdGVcIjtjKyt9XyhlKX1yZXR1cm4gJCgpLGx9LGwudmlld0RhdGU9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGYuY2xvbmUoKTtpZighYSlyZXR1cm4gZj1lLmNsb25lKCksbDtpZighKFwic3RyaW5nXCI9PXR5cGVvZiBhfHxiLmlzTW9tZW50KGEpfHxhIGluc3RhbmNlb2YgRGF0ZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcInZpZXdEYXRlKCkgcGFyYW1ldGVyIG11c3QgYmUgb25lIG9mIFtzdHJpbmcsIG1vbWVudCBvciBEYXRlXVwiKTtyZXR1cm4gZj1nYShhKSxKKCksbH0sYy5pcyhcImlucHV0XCIpKWc9YztlbHNlIGlmKGc9Yy5maW5kKGQuZGF0ZXBpY2tlcklucHV0KSwwPT09Zy5zaXplKCkpZz1jLmZpbmQoXCJpbnB1dFwiKTtlbHNlIGlmKCFnLmlzKFwiaW5wdXRcIikpdGhyb3cgbmV3IEVycm9yKCdDU1MgY2xhc3MgXCInK2QuZGF0ZXBpY2tlcklucHV0KydcIiBjYW5ub3QgYmUgYXBwbGllZCB0byBub24gaW5wdXQgZWxlbWVudCcpO2lmKGMuaGFzQ2xhc3MoXCJpbnB1dC1ncm91cFwiKSYmKG49MD09PWMuZmluZChcIi5kYXRlcGlja2VyYnV0dG9uXCIpLnNpemUoKT9jLmZpbmQoXCIuaW5wdXQtZ3JvdXAtYWRkb25cIik6Yy5maW5kKFwiLmRhdGVwaWNrZXJidXR0b25cIikpLCFkLmlubGluZSYmIWcuaXMoXCJpbnB1dFwiKSl0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgaW5pdGlhbGl6ZSBEYXRlVGltZVBpY2tlciB3aXRob3V0IGFuIGlucHV0IGVsZW1lbnRcIik7cmV0dXJuIGU9eCgpLGY9ZS5jbG9uZSgpLGEuZXh0ZW5kKCEwLGQsRygpKSxsLm9wdGlvbnMoZCksb2EoKSxrYSgpLGcucHJvcChcImRpc2FibGVkXCIpJiZsLmRpc2FibGUoKSxnLmlzKFwiaW5wdXRcIikmJjAhPT1nLnZhbCgpLnRyaW0oKS5sZW5ndGg/XyhnYShnLnZhbCgpLnRyaW0oKSkpOmQuZGVmYXVsdERhdGUmJnZvaWQgMD09PWcuYXR0cihcInBsYWNlaG9sZGVyXCIpJiZfKGQuZGVmYXVsdERhdGUpLGQuaW5saW5lJiZlYSgpLGx9O2EuZm4uZGF0ZXRpbWVwaWNrZXI9ZnVuY3Rpb24oYil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBkPWEodGhpcyk7ZC5kYXRhKFwiRGF0ZVRpbWVQaWNrZXJcIil8fChiPWEuZXh0ZW5kKCEwLHt9LGEuZm4uZGF0ZXRpbWVwaWNrZXIuZGVmYXVsdHMsYiksZC5kYXRhKFwiRGF0ZVRpbWVQaWNrZXJcIixjKGQsYikpKX0pfSxhLmZuLmRhdGV0aW1lcGlja2VyLmRlZmF1bHRzPXt0aW1lWm9uZTpcIkV0Yy9VVENcIixmb3JtYXQ6ITEsZGF5Vmlld0hlYWRlckZvcm1hdDpcIk1NTU0gWVlZWVwiLGV4dHJhRm9ybWF0czohMSxzdGVwcGluZzoxLG1pbkRhdGU6ITEsbWF4RGF0ZTohMSx1c2VDdXJyZW50OiEwLGNvbGxhcHNlOiEwLGxvY2FsZTpiLmxvY2FsZSgpLGRlZmF1bHREYXRlOiExLGRpc2FibGVkRGF0ZXM6ITEsZW5hYmxlZERhdGVzOiExLGljb25zOnt0aW1lOlwiZ2x5cGhpY29uIGdseXBoaWNvbi10aW1lXCIsZGF0ZTpcImdseXBoaWNvbiBnbHlwaGljb24tY2FsZW5kYXJcIix1cDpcImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi11cFwiLGRvd246XCJnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tZG93blwiLHByZXZpb3VzOlwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLWxlZnRcIixuZXh0OlwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0XCIsdG9kYXk6XCJnbHlwaGljb24gZ2x5cGhpY29uLXNjcmVlbnNob3RcIixjbGVhcjpcImdseXBoaWNvbiBnbHlwaGljb24tdHJhc2hcIixjbG9zZTpcImdseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlXCJ9LHRvb2x0aXBzOnt0b2RheTpcIkdvIHRvIHRvZGF5XCIsY2xlYXI6XCJDbGVhciBzZWxlY3Rpb25cIixjbG9zZTpcIkNsb3NlIHRoZSBwaWNrZXJcIixzZWxlY3RNb250aDpcIlNlbGVjdCBNb250aFwiLHByZXZNb250aDpcIlByZXZpb3VzIE1vbnRoXCIsbmV4dE1vbnRoOlwiTmV4dCBNb250aFwiLHNlbGVjdFllYXI6XCJTZWxlY3QgWWVhclwiLHByZXZZZWFyOlwiUHJldmlvdXMgWWVhclwiLG5leHRZZWFyOlwiTmV4dCBZZWFyXCIsc2VsZWN0RGVjYWRlOlwiU2VsZWN0IERlY2FkZVwiLHByZXZEZWNhZGU6XCJQcmV2aW91cyBEZWNhZGVcIixuZXh0RGVjYWRlOlwiTmV4dCBEZWNhZGVcIixwcmV2Q2VudHVyeTpcIlByZXZpb3VzIENlbnR1cnlcIixuZXh0Q2VudHVyeTpcIk5leHQgQ2VudHVyeVwiLHBpY2tIb3VyOlwiUGljayBIb3VyXCIsaW5jcmVtZW50SG91cjpcIkluY3JlbWVudCBIb3VyXCIsZGVjcmVtZW50SG91cjpcIkRlY3JlbWVudCBIb3VyXCIscGlja01pbnV0ZTpcIlBpY2sgTWludXRlXCIsaW5jcmVtZW50TWludXRlOlwiSW5jcmVtZW50IE1pbnV0ZVwiLGRlY3JlbWVudE1pbnV0ZTpcIkRlY3JlbWVudCBNaW51dGVcIixwaWNrU2Vjb25kOlwiUGljayBTZWNvbmRcIixpbmNyZW1lbnRTZWNvbmQ6XCJJbmNyZW1lbnQgU2Vjb25kXCIsZGVjcmVtZW50U2Vjb25kOlwiRGVjcmVtZW50IFNlY29uZFwiLHRvZ2dsZVBlcmlvZDpcIlRvZ2dsZSBQZXJpb2RcIixzZWxlY3RUaW1lOlwiU2VsZWN0IFRpbWVcIn0sdXNlU3RyaWN0OiExLHNpZGVCeVNpZGU6ITEsZGF5c09mV2Vla0Rpc2FibGVkOiExLGNhbGVuZGFyV2Vla3M6ITEsdmlld01vZGU6XCJkYXlzXCIsdG9vbGJhclBsYWNlbWVudDpcImRlZmF1bHRcIixzaG93VG9kYXlCdXR0b246ITEsc2hvd0NsZWFyOiExLHNob3dDbG9zZTohMSx3aWRnZXRQb3NpdGlvbmluZzp7aG9yaXpvbnRhbDpcImF1dG9cIix2ZXJ0aWNhbDpcImF1dG9cIn0sd2lkZ2V0UGFyZW50Om51bGwsaWdub3JlUmVhZG9ubHk6ITEsa2VlcE9wZW46ITEsZm9jdXNPblNob3c6ITAsaW5saW5lOiExLGtlZXBJbnZhbGlkOiExLGRhdGVwaWNrZXJJbnB1dDpcIi5kYXRlcGlja2VyaW5wdXRcIixrZXlCaW5kczp7dXA6ZnVuY3Rpb24oYSl7aWYoYSl7dmFyIGI9dGhpcy5kYXRlKCl8fHRoaXMuZ2V0TW9tZW50KCk7YS5maW5kKFwiLmRhdGVwaWNrZXJcIikuaXMoXCI6dmlzaWJsZVwiKT90aGlzLmRhdGUoYi5jbG9uZSgpLnN1YnRyYWN0KDcsXCJkXCIpKTp0aGlzLmRhdGUoYi5jbG9uZSgpLmFkZCh0aGlzLnN0ZXBwaW5nKCksXCJtXCIpKX19LGRvd246ZnVuY3Rpb24oYSl7aWYoIWEpcmV0dXJuIHZvaWQgdGhpcy5zaG93KCk7dmFyIGI9dGhpcy5kYXRlKCl8fHRoaXMuZ2V0TW9tZW50KCk7YS5maW5kKFwiLmRhdGVwaWNrZXJcIikuaXMoXCI6dmlzaWJsZVwiKT90aGlzLmRhdGUoYi5jbG9uZSgpLmFkZCg3LFwiZFwiKSk6dGhpcy5kYXRlKGIuY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLnN0ZXBwaW5nKCksXCJtXCIpKX0sXCJjb250cm9sIHVwXCI6ZnVuY3Rpb24oYSl7aWYoYSl7dmFyIGI9dGhpcy5kYXRlKCl8fHRoaXMuZ2V0TW9tZW50KCk7YS5maW5kKFwiLmRhdGVwaWNrZXJcIikuaXMoXCI6dmlzaWJsZVwiKT90aGlzLmRhdGUoYi5jbG9uZSgpLnN1YnRyYWN0KDEsXCJ5XCIpKTp0aGlzLmRhdGUoYi5jbG9uZSgpLmFkZCgxLFwiaFwiKSl9fSxcImNvbnRyb2wgZG93blwiOmZ1bmN0aW9uKGEpe2lmKGEpe3ZhciBiPXRoaXMuZGF0ZSgpfHx0aGlzLmdldE1vbWVudCgpO2EuZmluZChcIi5kYXRlcGlja2VyXCIpLmlzKFwiOnZpc2libGVcIik/dGhpcy5kYXRlKGIuY2xvbmUoKS5hZGQoMSxcInlcIikpOnRoaXMuZGF0ZShiLmNsb25lKCkuc3VidHJhY3QoMSxcImhcIikpfX0sbGVmdDpmdW5jdGlvbihhKXtpZihhKXt2YXIgYj10aGlzLmRhdGUoKXx8dGhpcy5nZXRNb21lbnQoKTthLmZpbmQoXCIuZGF0ZXBpY2tlclwiKS5pcyhcIjp2aXNpYmxlXCIpJiZ0aGlzLmRhdGUoYi5jbG9uZSgpLnN1YnRyYWN0KDEsXCJkXCIpKX19LHJpZ2h0OmZ1bmN0aW9uKGEpe2lmKGEpe3ZhciBiPXRoaXMuZGF0ZSgpfHx0aGlzLmdldE1vbWVudCgpO2EuZmluZChcIi5kYXRlcGlja2VyXCIpLmlzKFwiOnZpc2libGVcIikmJnRoaXMuZGF0ZShiLmNsb25lKCkuYWRkKDEsXCJkXCIpKX19LHBhZ2VVcDpmdW5jdGlvbihhKXtpZihhKXt2YXIgYj10aGlzLmRhdGUoKXx8dGhpcy5nZXRNb21lbnQoKTthLmZpbmQoXCIuZGF0ZXBpY2tlclwiKS5pcyhcIjp2aXNpYmxlXCIpJiZ0aGlzLmRhdGUoYi5jbG9uZSgpLnN1YnRyYWN0KDEsXCJNXCIpKX19LHBhZ2VEb3duOmZ1bmN0aW9uKGEpe2lmKGEpe3ZhciBiPXRoaXMuZGF0ZSgpfHx0aGlzLmdldE1vbWVudCgpO2EuZmluZChcIi5kYXRlcGlja2VyXCIpLmlzKFwiOnZpc2libGVcIikmJnRoaXMuZGF0ZShiLmNsb25lKCkuYWRkKDEsXCJNXCIpKX19LGVudGVyOmZ1bmN0aW9uKCl7dGhpcy5oaWRlKCl9LGVzY2FwZTpmdW5jdGlvbigpe3RoaXMuaGlkZSgpfSxcImNvbnRyb2wgc3BhY2VcIjpmdW5jdGlvbihhKXthLmZpbmQoXCIudGltZXBpY2tlclwiKS5pcyhcIjp2aXNpYmxlXCIpJiZhLmZpbmQoJy5idG5bZGF0YS1hY3Rpb249XCJ0b2dnbGVQZXJpb2RcIl0nKS5jbGljaygpfSx0OmZ1bmN0aW9uKCl7dGhpcy5kYXRlKHRoaXMuZ2V0TW9tZW50KCkpfSxcImRlbGV0ZVwiOmZ1bmN0aW9uKCl7dGhpcy5jbGVhcigpfX0sZGVidWc6ITEsYWxsb3dJbnB1dFRvZ2dsZTohMSxkaXNhYmxlZFRpbWVJbnRlcnZhbHM6ITEsZGlzYWJsZWRIb3VyczohMSxlbmFibGVkSG91cnM6ITEsdmlld0RhdGU6ITF9fSk7IiwiLy9oZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IHRoZSB1cmwgcXVlcnkgcGFyYW1ldGVyc1xyXG52YXIgdXRpbGl0eSA9IHtcclxuICBnZXRVUkxQYXJhbTogZnVuY3Rpb24obmFtZSl7XHJcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgXCJcXFxcJCZcIik7XHJcblxyXG4gICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChcIls/Jl1cIiArIG5hbWUgKyBcIig9KFteJiNdKil8JnwjfCQpXCIpO1xyXG4gICAgdmFyIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XHJcblxyXG4gICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xyXG5cclxuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcclxuICB9LFxyXG4gIGdldFRpbWVNaW51dGVzQXJyYXk6ICBmdW5jdGlvbigpe1xyXG5cclxuICB9XHJcbn1cclxuIiwidmFyIGxpbmtzID0ge1xyXG5cclxuICAvL2xvZ2luIGpzIHVybHNcclxuICAgYXV0aGVudGljYXRlVXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2F1dGhlbml0Y2F0ZVVzZXJcIixcclxuICAgc3VjY2Vzc1JlZGlyZWN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICByZWdpc3RlckRvY3RvclVybCA6IFwiaW5kZXgucGhwL2RvY3Rvci9kb2N0b3JJbmZvXCIsXHJcbiAgIGFkbWluVXJsOlwiaW5kZXgucGhwL2FkbWluRGFzaGJvYXJkL2FkbWluXCIsXHJcblxyXG4gICAvL2FkbWluIHJlbGF0ZWRcclxuICAgZG9jdG9yTGlzdGluZ1VybDogXCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvZG9jdG9yTGlzdGluZ1wiLFxyXG5cclxuICAgbG9nb3V0VXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgLy9kb2N0b3IgZGFzaGJvYXJkIGxpbmtzIFxyXG4gICBkb2N0b3JQcm9maWxlIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2RvY3RvclByb2ZpbGVcIixcclxuICAgZGFzaGJvYXJkSG9tZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgbmV3QXBwb2ludG1lbnRVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvYm9va0FwcG9pbnRtZW50XCIsXHJcbiAgIHBhdGllbnRzRW50cnlVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcGF0aWVudHNFbnRyeVwiLFxyXG4gICBwYXRpZW50c0xpc3RpbmdVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcGF0aWVudHNMaXN0aW5nXCIsXHJcbiAgIGNsb3NlQXBwb2ludG1lbnRVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY2xvc2VBcHBvaW50bWVudFwiLFxyXG4gICBkb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9saXN0QXBwb2ludG1lbnRcIixcclxuICAgbmV3U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbmV3U2NoZWR1bGVcIixcclxuICAgbGlzdFNjaGVkdWxlVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3NjaGVkdWxlTGlzdFwiLFxyXG4gICBnZXRTY2hlZHVsZUNhbGVuZGFyVXJsOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvU2NoZWR1bGVDYWxlbmRlclZpZXdcIixcclxuICAgYWRkU3RhZmZVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc3RhZmZFbnRyeVwiLFxyXG4gICBkb2N0b3JzU3RhZmZMaXN0aW5nVXIgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc3RhZmZMaXN0aW5nXCIsXHJcbiAgIHBhdGllbnRzSGlzdG9yeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50SGlzdG9yeVwiLFxyXG4gICBjcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiLFxyXG4gICBwcm9ncmFtbWVMaXN0aW5nc1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wcm9ncmFtbWVMaXN0XCIsXHJcbiAgIE1hbmFnZUxvY2F0aW9uc1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC93b3JrTG9jYXRpb25NYW5hZ2VtZW50XCIsXHJcbiAgIGdldEFuYWx5dGljc1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9BbmFseXRpY3NSZXBvcnRcIixcclxuICAgZ2V0Q2FsZW5kZXJVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY2FsZW5kYXJUZW1wbGF0ZVwiLFxyXG4gICBhY2NvdW50aW5nVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2FjY291bnRpbmdcIixcclxuICAgbWVkaWNpbmVTZWFyY2hVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbWVkaWNpbmVTZWFyY2hcIixcclxuXHJcblxyXG4gICAvL3NjaGVkdWxlXHJcbiAgIGdldExvY2F0aW9uVXJsOiBcImluZGV4LnBocC9sb2NhdGlvbnMvZ2V0RG9jdG9yTG9jYXRpb25zXCIsXHJcbiAgIGNyZWF0ZVVwZGF0ZVNjaGVkdWxlVXJsOiBcImluZGV4LnBocC9zY2hlZHVsZS9jcmVhdGVVcGRhdGVTY2hlZHVsZVwiLFxyXG5cclxuICAgLy9wcm9ncmFtbWVcclxuICAgcHJvZ3JhbW1lTGlzdFVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lRWRpdFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9jcmVhdGVNb2RpZnlQcm9ncmFtbWVcIixcclxuICAgZ2V0UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVzXCIsXHJcblxyXG5cclxuICAgLy9wYXRpZW50XHJcbiAgIHBhdGllbnREZXRhaWxQZXJzaXN0VXJsOlwiaW5kZXgucGhwL3BhdGllbnQvYWRkVXBkYXRlUGF0aWVudFwiLFxyXG4gICBwYXRpZW50c0RldGFpbHNVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50RGV0YWlsc1wiLFxyXG4gICBsb2dpbkNoZWNrVXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9pc0xvZ2dlZEluXCIsXHJcbiAgIGdldFByb2dyYW1tZUxpc3Q6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldE1lZGljYXRpb25Qcm9ncmFtbWVMaXN0XCIsXHJcbiAgIHByb2dyYW1tZUxpc3REZXRhaWxzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVMaXN0RGV0YWlsc1wiLFxyXG4gICBwYXRpZW50c1Byb2dyYW1tZXNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFBhdGllbnRQcm9ncmFtbWVzXCIsXHJcbiAgIHBhdGllbnRMaXN0aW5nVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0UGF0aWVudExpc3RcIixcclxuXHJcbiAgIHNhdmVVcGRhdGVMb2NhdGlvbnM6XCJpbmRleC5waHAvbG9jYXRpb25zL2FkZFVwZGF0ZUxvY2F0aW9uXCIsXHJcbiAgIGxvY2F0aW9uTGlzdFVybDpcImluZGV4LnBocC9sb2NhdGlvbnMvZ2V0RG9jdG9yTG9jYXRpb25zXCIsXHJcbiAgIGRlbGl2ZXJ5TWV0aG9kc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldERlbGl2ZXJ5TWV0aG9kc1wiLFxyXG5cclxuXHJcbiAgIC8vcmVnaXN0YXJ0aW9uXHJcbiAgIGRvY3RvclVybDpcImluZGV4LnBocC9kb2N0b3Ivc2F2ZVVwZGF0ZURvY3RvclwiLFxyXG4gICBkb2N0b3JEZXRhaWxzVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9nZXREb2N0b3JEZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZG9jdG9yRGFzaFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIGxvZ291dFVybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9nb3V0XCIsXHJcblxyXG4gICBjcmVhdGVNb2RpZnlTdGFmZlVybDpcImluZGV4LnBocC9zdGFmZi9jcmVhdGVNb2RpZnlTdGFmZlwiLFxyXG4gICBnZXRTdGFmZkRldGFpbHNVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldFN0YWZmRGV0YWlsc1wiLFxyXG4gICBzdGFmZkxpc3RpbmdVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldERvY3RvcnNTdGFmZkxpc3RcIlxyXG5cclxufVxyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAgIC8vZGVmaW5pbmcgdGhlIGhlbHBlciBmdW5jdGlvbnMgaW4gZ2xvYmFsXHJcblxyXG4gICAgJChmdW5jdGlvbigpe1xyXG5cclxuICAgICAgY29uc29sZS5sb2coJ0RvY3RvciBEYXNoYm9hcmQganMgbG9hZGVkJyk7XHJcblxyXG4gICAgICAgICAgLy90b3AgbGV2ZWwgY29udHJvbGxlclxyXG4gICAgICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgLy93aXJpbmcgdGhlIG5hdmlnYXRpb25cclxuICAgICAgICAgIHRoaXMubG9nb3V0VXJsID0gbGlua3MubG9nb3V0VXJsO1xyXG4gICAgICAgICAgdGhpcy5kb2N0b3JQcm9maWxlID0gbGlua3MuZG9jdG9yUHJvZmlsZTtcclxuICAgICAgICAgIHRoaXMuZGFzaGJvYXJkSG9tZVVybCA9IGxpbmtzLmRhc2hib2FyZEhvbWVVcmw7XHJcbiAgICAgICAgICB0aGlzLm5ld0FwcG9pbnRtZW50VXJsID0gbGlua3MubmV3QXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgICB0aGlzLnBhdGllbnRzRW50cnlVcmwgPSBsaW5rcy5wYXRpZW50c0VudHJ5VXJsO1xyXG4gICAgICAgICAgdGhpcy5wYXRpZW50c0xpc3RpbmdVcmwgPSBsaW5rcy5wYXRpZW50c0xpc3RpbmdVcmw7XHJcbiAgICAgICAgICB0aGlzLmNsb3NlQXBwb2ludG1lbnRVcmwgPSBsaW5rcy5jbG9zZUFwcG9pbnRtZW50VXJsO1xyXG4gICAgICAgICAgdGhpcy5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybCA9IGxpbmtzLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsO1xyXG5cclxuICAgICAgICAgIHRoaXMubmV3U2NoZWR1bGVVcmwgPSBsaW5rcy5uZXdTY2hlZHVsZVVybDtcclxuICAgICAgICAgIHRoaXMubGlzdFNjaGVkdWxlVXJsID0gdGhpcy5saXN0U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgICB0aGlzLlNjaGVkdWxlQ2FsZW5kYXJVcmwgPSBsaW5rcy5nZXRTY2hlZHVsZUNhbGVuZGFyVXJsO1xyXG4gICAgICAgICAgdGhpcy5hZGRTdGFmZlVybCA9IGxpbmtzLmFkZFN0YWZmVXJsO1xyXG4gICAgICAgICAgdGhpcy5kb2N0b3JzU3RhZmZMaXN0aW5nVXIgPSBsaW5rcy5kb2N0b3JzU3RhZmZMaXN0aW5nVXI7XHJcblxyXG4gICAgICAgICAgdGhpcy5wYXRpZW50c0hpc3RvcnlVcmwgPSBsaW5rcy5wYXRpZW50c0hpc3RvcnlVcmw7XHJcblxyXG4gICAgICAgICAgdGhpcy5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCA9IGxpbmtzLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDtcclxuICAgICAgICAgIHRoaXMucHJvZ3JhbW1lTGlzdGluZ3NVcmwgPSBsaW5rcy5wcm9ncmFtbWVMaXN0aW5nc1VybDtcclxuXHJcbiAgICAgICAgICB0aGlzLk1hbmFnZUxvY2F0aW9uc1VybCA9IGxpbmtzLk1hbmFnZUxvY2F0aW9uc1VybDtcclxuICAgICAgICAgIHRoaXMuQ2FsZW5kYXJUZW1wbGF0ZVVybCA9IGxpbmtzLmdldENhbGVuZGVyVXJsO1xyXG5cclxuICAgICAgICAgIHRoaXMuYW5hbHl0aWNzUmVwb3J0VXJsID0gbGlua3MuZ2V0QW5hbHl0aWNzVXJsO1xyXG4gICAgICAgICAgdGhpcy5hY2NvdW50aW5nVXJsID0gbGlua3MuYWNjb3VudGluZ1VybDtcclxuICAgICAgICAgIHRoaXMubWVkaWNpbmVTZWFyY2hVcmwgPSBsaW5rcy5tZWRpY2luZVNlYXJjaFVybDtcclxuICAgICAgICAgIC8vZG8gc29tZXRobmcgYWJvdXQgZG9jdG9ycyBpbmZvIGFuZCByZWdpc3RyYXRpb25cclxuXHJcbiAgICAgICAgICAvL1RoZSB1cmwgZnJvbSB0aGUgYnJvd3NlciAgY2FuIGJlIGNvbXBhcmVkIHRvIHNldCB0aGUgYWN0aXZlIG5hdmlnYXRpb25cclxuICAgICAgICAgIG5hdlZpZXcuaW5pdCgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB2YXIgbmF2VmlldyA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgIC8vd2lyaW5nIHRoZSBuYXZpZ2F0aW9uIGNsaWNrc1xyXG5cclxuXHJcbiAgICAgICAgICAkKFwiI3Btcy1icmFuZC1idG4tbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BNUyBicmFuZCBjbGljaycpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgJChcIiNidG4tcHJvZ3JhbW1lLXNlY3Rpb24tbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIiNjcmVhdGUtcHJvZ3JhbS1mb3ItcGF0aWVudC1zZWN0aW9uXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZSBwcm9ncmFtIGZvciBwYXRpZW50Jyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiI2J0bi1tYW5hZ2UtbG9jYXRpb25zXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ21hbmFnZSBsb2NhdGlvbnMnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLk1hbmFnZUxvY2F0aW9uc1VybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoXCIjYnRuLWxpc3QtcHJvZ3JhbS1zZWN0aW9uXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucHJvZ3JhbW1lTGlzdGluZ3NVcmw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKFwiI3BhdGllbnRzLWVudHJ5LWNyZWF0ZS1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGF0aWVudHMgRW50cnljbGljaycpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5wYXRpZW50c0VudHJ5VXJsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI3BhdGllbnRzLWVudHJ5LWxpc3Qtc2VjdGlvbi1saW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGF0aWVudHMgbGlzdGluZyBjbGljaycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucGF0aWVudHNMaXN0aW5nVXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiN1c2VyLVByb2ZpbGUtQnRuLUxpbmtcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1c2VyIHByb2ZpbGUgY2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZG9jdG9yUHJvZmlsZTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI2RvY3Rvci1kYXNoLWxvZ291dC1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ291dCBjbGljaycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubG9nb3V0VXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNkYXNoYm9hcmQtU2VjdGlvbi1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kYXNoYm9hcmRIb21lVXJsO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXNoYm9hcmQgY2xpY2snKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjYm9vay1BcHBvaW50bWVudHMtU2VjdGlvbi1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5uZXdBcHBvaW50bWVudFVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjY2xvc2UtQm9vay1BcHBvaW50bWVudC1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmNsb3NlQXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI3ZpZXctQXBwb2ludG1lbnQtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybDtcclxuICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAvLyQoXCIjbWFuYWdlLURvY3RvcnMtU2NoZWR1bGUtU2VjdGlvbi1MaW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5saXN0U2NoZWR1bGVVcmwpO1xyXG5cclxuXHJcbiAgICAgICAgICAkKFwiI21hbmFnZS1Eb2N0b3JzLVNjaGVkdWxlLVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzY2hlZHVsZSBtYW5hZ2UgY2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuU2NoZWR1bGVDYWxlbmRhclVybDtcclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNtYW5hZ2Utc2NoZWR1bGUtY3JlYXRlLXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCduZXcgc2NoZWR1bGUgY2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubmV3U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gICQoXCIjbWFuYWdlLXNjaGVkdWxlLWxpc3Qtc2VjdGlvbi1saW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAvL2UucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdzY2hlZHVsZSBsaXN0IGNsaWNrJyk7XHJcbiAgICAgICAgICAgIC8vICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubGlzdFNjaGVkdWxlVXJsO1xyXG4gICAgICAgICAgLy99KTtcclxuXHJcblxyXG4gICAgICAgICAgICQoXCIjYWRkLVN0YWZmLVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmFkZFN0YWZmVXJsO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAkKFwiI2J0bi1zdGFmZi1saXN0aW5nXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmRvY3RvcnNTdGFmZkxpc3RpbmdVcjtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoXCIjY2FsZW5kYXItVGVtcGxhdGUtQnRuLUxpbmtcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuQ2FsZW5kYXJUZW1wbGF0ZVVybDtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWxsbyBoaWRcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAkKFwiI3BhdGllbnRzLUhpc3RvcnktU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucGF0aWVudHNIaXN0b3J5VXJsO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICQoXCIjbWFuYWdlLXNjaGVkdWxlLWxpc3Qtc2VjdGlvbi1saW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuU2NoZWR1bGVDYWxlbmRhclVybDtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAkKFwiI2FwcG9pbnRtZW50LXNlY3Rpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsO1xyXG4gICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKFwiI3BhdGllbnRzLUVudHJ5LVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAkKFwiI3N0YWZmLW1hbmFnbWVudC1zZWN0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAkKFwiI290aGVyLXNldHRpbmdzLXNlY3Rpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICQoXCIjY2FsZW5kYXItdGVtcGxhdGUtc2VjdGlvbi1saW5rLWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgJChcIiNhbmFseXRpY3Mtc2lkZS1uYXZpZ2F0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5hbmFseXRpY3NSZXBvcnRVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICQoXCIjYWNjb3VudGluZy1zaWRlLW5hdmlnYXRpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmFjY291bnRpbmdVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICQoXCIjbWVkaWNpbmUtc2lkZS1uYXZpZ2F0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5tZWRpY2luZVNlYXJjaFVybDtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAvL2hpZ2hsaWdodCB0aGUgcmlnaHQgbmF2aWdhdGlvblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxuICB9KCkpO1xyXG5cclxufSk7XHJcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICQoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAvL2h0dHA6Ly9tb21lbnRqcy5jb20vIGdvb2QgaGVscCBmb3IgZGF0ZSBmb3JtYXR0aW5nIGFuZCBzdHVmZlxyXG5cclxuXHJcbiAgICB2YXIgc2NoZWR1bGVNb2RlbCA9IHtcclxuICAgICAgc3RhcnREYXRlOiBcIlwiLFxyXG4gICAgICBlbmREYXRlOiBcIlwiLFxyXG4gICAgICBzY2hlZHVsZURheXNDb3VudDogMCxcclxuICAgICAgd29ya0xvY2F0aW9uczogW10sXHJcbiAgICAgIHNlbGVjdGVkTG9jYXRpb246e2lkOjAsIG5hbWU6XCJcIn0sXHJcbiAgICAgIHNjaGVkdWxlTGlzdDpbXVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmNyZWF0ZVVwZGF0ZVNjaGVkdWxlVXJsID0gbGlua3MuY3JlYXRlVXBkYXRlU2NoZWR1bGVVcmw7XHJcbiAgICAgICAgdGhpcy5nZXRMb2NhdGlvblVybCA9IGxpbmtzLmdldExvY2F0aW9uVXJsO1xyXG4gICAgICAgIC8vdGhpcy5zY2hlZHVsZUxpc3RpbmdVcmwgPSAgIGxpbmtzLmxpc3RTY2hlZHVsZVVybDtcclxuICAgICAgICB0aGlzLmdldFNjaGVkdWxlQ2FsZW5kYXJVcmwgPSBsaW5rcy5nZXRTY2hlZHVsZUNhbGVuZGFyVXJsO1xyXG5cclxuICAgICAgICBzdGVwT25lVmlldy5pbml0KCk7XHJcbiAgICAgICAgY3JlYXRlU2NoZWR1bGVWaWV3LmluaXQoKTtcclxuXHJcbiAgICAgICAgLy9nZXR0aW5nIHdvcmsgbG9jYXRpb25zIGZvciB0aGUgZG9jdG9yXHJcbiAgICAgICAgJC5nZXQoIGNvbnRyb2xsZXIuZ2V0TG9jYXRpb25VcmwgLCB7fSlcclxuICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKCdyZXNwb25zZSAnICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuICAgICAgICAgIHNjaGVkdWxlTW9kZWwud29ya0xvY2F0aW9ucyA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICBzdGVwT25lVmlldy5yZW5kZXIoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHVwZGF0ZVNlbGVjdGVkTG9jYXRpb246IGZ1bmN0aW9uKGlkLCBuYW1lKXtcclxuICAgICAgICBzY2hlZHVsZU1vZGVsLnNlbGVjdGVkTG9jYXRpb24uaWQgPSBpZDtcclxuICAgICAgICBzY2hlZHVsZU1vZGVsLnNlbGVjdGVkTG9jYXRpb24ubmFtZSA9IG5hbWU7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHNjaGVkdWxlTW9kZWwuc2VsZWN0ZWRMb2NhdGlvbikpO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXRMb2NhdGlvbk1vZGVsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBzY2hlZHVsZU1vZGVsLnNlbGVjdGVkTG9jYXRpb247XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldExvY2F0aW9uTGlzdDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBzY2hlZHVsZU1vZGVsLndvcmtMb2NhdGlvbnM7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdlbmVyYXRlTW9kZWw6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGZyb21EYXRlU3RyID0gc3RlcE9uZVZpZXcuZnJvbURhdGVDb250cm9sLnZhbCgpOyAvLzIwMTYtMDUtMTlcclxuICAgICAgICB2YXIgdG9EYXRlU3RyID0gc3RlcE9uZVZpZXcudG9EYXRlQ29udHJvbC52YWwoKTsgLy8yMDE2LTA1LTE5XHJcblxyXG4gICAgICAgIHZhciBzdGFydFRpbWVWYWwgPSBzdGVwT25lVmlldy5mcm9tVGltZUNvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgdmFyIGVuZFRpbWVWYWwgPSAgc3RlcE9uZVZpZXcudG9UaW1lQ29udHJvbC52YWwoKTtcclxuXHJcbiAgICAgICAgLy92YXIgbVN0YXJ0VGltZSA9IG1vbWVudChzdGFydFRpbWVWYWwsIFwiaGg6bW0gQVwiKTtcclxuICAgICAgICAvL3ZhciBtU3RhcnREYXRlID0gbW9tZW50KHtob3VyczowLCBtaW51dGVzOiAwfSk7XHJcbiAgICAgICAgLy9tU3RhcnREYXRlLm1pbnV0ZXMoc2NoZWR1bGVJdGVtLnN0YXJ0VGltZSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnc3RhcnQgdGltZTogJyArIHN0YXJ0VGltZVZhbCArICcgaW4gbWludXRlcyAnICsgbVN0YXJ0VGltZS5kdXJhdGlvbigpKTtcclxuXHJcbiAgICAgICAgLy9kYXRlIHZhbGlkYXRpb25zLCBjYW5ub3QgcHV0IHByZXZpb291cyBkYXRlc1xyXG4gICAgICAgIC8vY2Fubm90IGRhdGVzIGluIHJldnJlc2Ugb3JkZXJcclxuICAgICAgICAvL2Nhbm5vdCBtYWtlIHNjaGVkdWxlIGZvciBtb3JlIHRoYW4gNjAgZGF5c1xyXG5cclxuICAgICAgICB2YXIgbWZyb21EYXRlID0gbW9tZW50KGZyb21EYXRlU3RyLCBcIllZWVktTU0tRERcIik7XHJcbiAgICAgICAgdmFyIG10b0RhdGUgPSBtb21lbnQodG9EYXRlU3RyLCBcIllZWVktTU0tRERcIik7XHJcblxyXG4gICAgICAgIC8vc2V0dGluZyB0aGUgbW9kZWxzIHN0YXJ0IGFuZCBlbmQgZGF0ZVxyXG4gICAgICAgIHNjaGVkdWxlTW9kZWwuc3RhcnREYXRlID0gbWZyb21EYXRlLmZvcm1hdCgnREQtTU0tWVlZWScpO1xyXG4gICAgICAgIHNjaGVkdWxlTW9kZWwuZW5kRGF0ZSA9IG10b0RhdGUuZm9ybWF0KCdERC1NTS1ZWVlZJyk7XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2RhdGUgcmFuZ2UgZnJvbSAnICsgIG1mcm9tRGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVknKSArICcgdG8gJyArIG10b0RhdGUuZm9ybWF0KCdERC1NTS1ZWVlZJykpO1xyXG5cclxuICAgICAgICAvL2dldHRpbmcgdGhlIGRpZmZlcmVuY2UgaXMgZGF0ZXMgaW4gdGVybXMgb2YgZGF0ZXNcclxuICAgICAgICB2YXIgZGF5c0R1cmF0aW9uID0gIG1vbWVudC5kdXJhdGlvbihtdG9EYXRlLmRpZmYobWZyb21EYXRlKSkuYXNEYXlzKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnZHVyYXRpb24gJyArIGRheXNEdXJhdGlvbik7XHJcblxyXG4gICAgICAgIHNjaGVkdWxlTW9kZWwuc2NoZWR1bGVEYXlzQ291bnQgPSBkYXlzRHVyYXRpb247XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2R1cmF0aW9uIDonICsgZGF5c0R1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgdmFyIHdlZWtBcnJheSA9IFtdO1xyXG4gICAgICAgIGlmKHN0ZXBPbmVWaWV3LmNoa01vbi5wcm9wKCdjaGVja2VkJykpe1xyXG4gICAgICAgICAgd2Vla0FycmF5LnB1c2goJ01vbicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoc3RlcE9uZVZpZXcuY2hrVHVlLnByb3AoJ2NoZWNrZWQnKSl7XHJcbiAgICAgICAgICB3ZWVrQXJyYXkucHVzaCgnVHVlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzdGVwT25lVmlldy5jaGtXZWQucHJvcCgnY2hlY2tlZCcpKXtcclxuICAgICAgICAgIHdlZWtBcnJheS5wdXNoKCdXZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHN0ZXBPbmVWaWV3LmNoa1RodS5wcm9wKCdjaGVja2VkJykpe1xyXG4gICAgICAgICAgd2Vla0FycmF5LnB1c2goJ1RodScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoc3RlcE9uZVZpZXcuY2hrRnJpLnByb3AoJ2NoZWNrZWQnKSl7XHJcbiAgICAgICAgICB3ZWVrQXJyYXkucHVzaCgnRnJpJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzdGVwT25lVmlldy5jaGtTYXQucHJvcCgnY2hlY2tlZCcpKXtcclxuICAgICAgICAgIHdlZWtBcnJheS5wdXNoKCdTYXQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHN0ZXBPbmVWaWV3LmNoa1N1bi5wcm9wKCdjaGVja2VkJykpe1xyXG4gICAgICAgICAgd2Vla0FycmF5LnB1c2goJ1N1bicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3dlZWsgYXJyYXkgJyArIHdlZWtBcnJheSk7XHJcblxyXG4gICAgICAgIHZhciBtU3RhcnRUaW1lID0gbW9tZW50KHN0YXJ0VGltZVZhbCwgXCJoaDptbSBBXCIpO1xyXG4gICAgICAgIHZhciBtRW5kVGltZSA9IG1vbWVudChlbmRUaW1lVmFsLCBcImhoOm1tIEFcIik7XHJcblxyXG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPD0gZGF5c0R1cmF0aW9uOyBqKyspe1xyXG5cclxuICAgICAgICAgIHZhciBzY2hlZHVsZSA9IHtcclxuICAgICAgICAgICAgZGF0ZTogbWZyb21EYXRlLmZvcm1hdCgnREQtTU0tWVlZWScpLFxyXG4gICAgICAgICAgICBzdGFydFRpbWU6c3RhcnRUaW1lVmFsLFxyXG4gICAgICAgICAgICBlbmRUaW1lOiBlbmRUaW1lVmFsLFxyXG4gICAgICAgICAgICBzdGFydFRpbWVNaW51dGVzOiBtU3RhcnRUaW1lLmhvdXJzKCkqNjAgKyBtU3RhcnRUaW1lLm1pbnV0ZXMoKSxcclxuICAgICAgICAgICAgZW5kVGltZU1pbnV0ZXM6IG1FbmRUaW1lLmhvdXJzKCkqNjAgKyBtRW5kVGltZS5taW51dGVzKCksXHJcbiAgICAgICAgICAgIGlzQmxvY2tlZDogMCxcclxuICAgICAgICAgICAgYWN0aXZlOiAwXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgc2NoZWR1bGVNb2RlbC5zY2hlZHVsZUxpc3QucHVzaChzY2hlZHVsZSk7XHJcblxyXG4gICAgICAgICAgdmFyIHdlZWtEYXkgPSBtZnJvbURhdGUuZm9ybWF0KCdkZGQnKTtcclxuXHJcbiAgICAgICAgICBpZih3ZWVrQXJyYXkuaW5kZXhPZih3ZWVrRGF5KSAgPj0gMCApe1xyXG4gICAgICAgICAgICBzY2hlZHVsZS5hY3RpdmUgPSAxO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIG1mcm9tRGF0ZS5hZGQoMSwgJ2RheXMnKVxyXG5cclxuICAgICAgICB9OyAvL2RhdGUgbG9vcFxyXG5cclxuICAgICAgfSxcclxuICAgICAgZ2V0U2NoZWR1bGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBzY2hlZHVsZU1vZGVsO1xyXG4gICAgICB9LFxyXG4gICAgICBzYXZlVXBkYXRlTW9kZWxSZWRpcmVjdDogZnVuY3Rpb24oKXtcclxuXHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBzY2hlZHVlcyB3aGljaCBhcmUgbm90IGFjdGl2ZVxyXG5cclxuXHJcbiAgICAgICAgdmFyIGFjdGl2ZVNjaGVkdWxlc0FycmF5ID0gW107XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHNjaGVkdWxlTW9kZWwuc2NoZWR1bGVMaXN0Lmxlbmd0aDsgaSsrKXtcclxuXHJcbiAgICAgICAgICAgIGlmKHNjaGVkdWxlTW9kZWwuc2NoZWR1bGVMaXN0W2ldLmFjdGl2ZSA9PSAxKXtcclxuICAgICAgICAgICAgICBhY3RpdmVTY2hlZHVsZXNBcnJheS5wdXNoKHNjaGVkdWxlTW9kZWwuc2NoZWR1bGVMaXN0W2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2NoZWR1bGVNb2RlbC5zY2hlZHVsZURheXNDb3VudCA9IGFjdGl2ZVNjaGVkdWxlc0FycmF5Lmxlbmd0aDtcclxuICAgICAgICBzY2hlZHVsZU1vZGVsLnNjaGVkdWxlTGlzdCA9IGFjdGl2ZVNjaGVkdWxlc0FycmF5O1xyXG5cclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShzY2hlZHVsZU1vZGVsLnNjaGVkdWxlTGlzdCkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQucG9zdCggY29udHJvbGxlci5jcmVhdGVVcGRhdGVTY2hlZHVsZVVybCAsIHNjaGVkdWxlTW9kZWwpXHJcbiAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlICcgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG5cclxuICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PSAxKXtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmdldFNjaGVkdWxlQ2FsZW5kYXJVcmw7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NvbWV0aGluZyBpcyBub3QgcmlnaHQnKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvL29uIHN1Y2Nlc3MgcmVkaXJlY3RcclxuICAgICAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5zY2hlZHVsZUxpc3RpbmdVcmw7XHJcbiAgICAgICAgICAvKlxyXG4gICAgICAgICAgaWYocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT0gXCItMVwiKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3VsZCBub3QgYWRkIG9yIHVwZGF0ZScpO1xyXG4gICAgICAgIH1lbHNlIGlmKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09IFwiMVwiKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnc2NoZWR1bGVzIGVudHJ5IGlzIGFkZGVkJyk7XHJcbiAgICAgIH1lbHNlIGlmKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09IFwiMlwiKXtcclxuICAgICAgY29uc29sZS5sb2coJ3NjaGVkdWxlcyBlbnRyeSBpcyB1cGRhdGVkJyk7XHJcbiAgICB9Ki9cclxuXHJcbiAgfSk7XHJcblxyXG5cclxuXHJcbn1cclxufTtcclxuXHJcbnZhciBzdGVwT25lVmlldyA9IHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICB0aGlzLnBhbmVsID0gJCgnI3NjaGVkdWxlLXN0ZXAtb25lJyk7XHJcbiAgICAgIHRoaXMuc2VsZWN0TG9jYXRpb25zID0gJCgnI3NlbC13b3JrLWxvY2F0aW9ucycpO1xyXG4gICAgICB0aGlzLmZyb21EYXRlQ29udHJvbCA9ICQoJyNmcm9tLWRhdGUnKTtcclxuICAgICAgdGhpcy50b0RhdGVDb250cm9sID0gJCgnI3RvLWRhdGUnKTtcclxuICAgICAgdGhpcy5mcm9tVGltZUNvbnRyb2wgPSAkKCcjZnJvbS10aW1lJyk7XHJcbiAgICAgIHRoaXMudG9UaW1lQ29udHJvbCA9ICQoJyN0by10aW1lJyk7XHJcblxyXG4gICAgICB0aGlzLmZyb21UaW1lQ29udHJvbC52YWwoXCIwOTowMDpBTVwiKTtcclxuICAgICAgdGhpcy5mcm9tVGltZUNvbnRyb2wuZGF0ZXRpbWVwaWNrZXIoe1xyXG4gICAgICAgIGlubGluZTogZmFsc2UsXHJcbiAgICAgICAgZm9ybWF0OidMVCdcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnRvVGltZUNvbnRyb2wudmFsKFwiMTI6MDA6UE1cIik7XHJcbiAgICAgIHRoaXMudG9UaW1lQ29udHJvbC5kYXRldGltZXBpY2tlcih7XHJcbiAgICAgICAgaW5saW5lOiBmYWxzZSxcclxuICAgICAgICBmb3JtYXQ6J0xUJ1xyXG4gICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgLy9odHRwOi8vYm9vdHN0cmFwLWRhdGVwaWNrZXIucmVhZHRoZWRvY3MuaW8vZW4vbGF0ZXN0L1xyXG5cclxuICAgICAgdGhpcy5jaGVja0FsbFdlZWtEYXlzID0gJCgnI2Noay1hbGwtd2Vla2RheXMnKTtcclxuICAgICAgdGhpcy5jaGtNb24gPSAkKCcjY2hrLW1vbicpO1xyXG4gICAgICB0aGlzLmNoa1R1ZSA9ICQoJyNjaGstdHVlJyk7XHJcbiAgICAgIHRoaXMuY2hrV2VkID0gJCgnI2Noay13ZWQnKTtcclxuICAgICAgdGhpcy5jaGtUaHUgPSAkKCcjY2hrLXRodScpO1xyXG4gICAgICB0aGlzLmNoa0ZyaSA9ICQoJyNjaGstZnJpJyk7XHJcbiAgICAgIHRoaXMuY2hrU2F0ID0gJCgnI2Noay1zYXQnKTtcclxuICAgICAgdGhpcy5jaGtTdW4gPSAkKCcjY2hrLXN1bicpO1xyXG5cclxuICAgICAgLy9zZXR0aW5nIGFsbCBjaGVjayBib3hlcyBhcyBjaGVja2VkXHJcbiAgICAgIHRoaXMuY2hrTW9uLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgdGhpcy5jaGtUdWUucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICB0aGlzLmNoa1dlZC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuY2hrVGh1LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgdGhpcy5jaGtGcmkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICB0aGlzLmNoa1NhdC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuY2hrU3VuLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHJcbiAgICAgIC8vVE9ETyB0ZXN0aW5nIGNvZGUgdG8gYmUgcmVtb3ZlZFxyXG4gICAgICB2YXIgY3VyckRhdGUgPSBtb21lbnQoKTtcclxuICAgICAgdGhpcy5mcm9tRGF0ZUNvbnRyb2wudmFsKGN1cnJEYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpKTtcclxuICAgICAgY3VyckRhdGUuYWRkKDE1LCAnZGF5cycpXHJcbiAgICAgIHRoaXMudG9EYXRlQ29udHJvbC52YWwoY3VyckRhdGUuZm9ybWF0KCdZWVlZLU1NLUREJykpO1xyXG5cclxuICAgICAgJCgnI2J0bi1zY2hlZHVsZS1uZXh0Jykub24oJ2NsaWNrJywgKGZ1bmN0aW9uKHNlbGYpe1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3NjaGVkdWxlIG5leHQgbmNsaWNrJyk7XHJcblxyXG4gICAgICAgICAgLy91cGRhdGluZyBsb2NhdGlvbiB0ZXh0IGluIHRoZSBzZWNvbmQgc3RlcFxyXG4gICAgICAgICAgdmFyIGxvY2F0aW9uSWQgPSBzZWxmLnNlbGVjdExvY2F0aW9ucy5maW5kKFwiOnNlbGVjdGVkXCIpLmF0dHIoJ3ZhbHVlJyk7XHJcbiAgICAgICAgICB2YXIgbG9jYXRpb25OYW1lID0gc2VsZi5zZWxlY3RMb2NhdGlvbnMuZmluZChcIjpzZWxlY3RlZFwiKS50ZXh0KCk7XHJcbiAgICAgICAgICBjb250cm9sbGVyLnVwZGF0ZVNlbGVjdGVkTG9jYXRpb24obG9jYXRpb25JZCwgbG9jYXRpb25OYW1lKTtcclxuXHJcbiAgICAgICAgICBjb250cm9sbGVyLmdlbmVyYXRlTW9kZWwoKTtcclxuICAgICAgICAgIHNlbGYucGFuZWwuaGlkZSgpO1xyXG4gICAgICAgICAgY3JlYXRlU2NoZWR1bGVWaWV3LnJlbmRlcigpO1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgICB9KSh0aGlzKSk7XHJcblxyXG4gICAgICB0aGlzLmNoZWNrQWxsV2Vla0RheXMuY2hhbmdlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmNoZWNrZWQpO1xyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tlZCl7XHJcbiAgICAgICAgICBzdGVwT25lVmlldy5jaGtNb24ucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgc3RlcE9uZVZpZXcuY2hrVHVlLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgIHN0ZXBPbmVWaWV3LmNoa1dlZC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICBzdGVwT25lVmlldy5jaGtUaHUucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgc3RlcE9uZVZpZXcuY2hrRnJpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgIHN0ZXBPbmVWaWV3LmNoa1NhdC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICBzdGVwT25lVmlldy5jaGtTdW4ucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgc3RlcE9uZVZpZXcuY2hrTW9uLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICBzdGVwT25lVmlldy5jaGtUdWUucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgIHN0ZXBPbmVWaWV3LmNoa1dlZC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgc3RlcE9uZVZpZXcuY2hrVGh1LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICBzdGVwT25lVmlldy5jaGtGcmkucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgIHN0ZXBPbmVWaWV3LmNoa1NhdC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgc3RlcE9uZVZpZXcuY2hrU3VuLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgIHZhciBsb2NhdGlvbnMgPSBjb250cm9sbGVyLmdldExvY2F0aW9uTGlzdCgpO1xyXG5cclxuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxvY2F0aW9ucy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgdmFyIG9wdGlvbiA9ICQoJzxvcHRpb24vPicse1xyXG4gICAgICAgICAgdmFsdWU6IGxvY2F0aW9uc1tpXS5pZCxcclxuICAgICAgICAgIHRleHQ6IGxvY2F0aW9uc1tpXS5uYW1lXHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnNlbGVjdExvY2F0aW9ucy5hcHBlbmQob3B0aW9uKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxufTtcclxuXHJcbnZhciBjcmVhdGVTY2hlZHVsZVZpZXcgPSB7XHJcbiAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgIHRoaXMucGFuZWwgPSAkKCcjc2NoZWR1bGUtc3RlcC10d28nKTtcclxuICAgIHRoaXMubG9jYXRpb25OYW1lID0gJCgnI2NhbGVuZGFyLWxvY2F0aW9uLW5hbWUnKTtcclxuICAgIHRoaXMuZGF0ZUhlYWRlciA9ICQoJyNjYWxhbmRlci1kYXRlJyk7XHJcblxyXG4gICAgdGhpcy50YWJsZUJvZHkgPSAkKCcjdGFibGUtYm9keS1zY2hlZHVsZS1jYWxhbmRlcicpO1xyXG5cclxuICAgIHRoaXMudGFibGVEYXRhVGVtcGxhdGUgPSAkKCcjdGFibGUtZGF0YS10ZW1wbGF0ZScpO1xyXG5cclxuICAgICQoJyNidG4tc2NoZWR1bGUtY3JlYXRlJykub24oJ2NsaWNrJywgKGZ1bmN0aW9uKHNlbGYpe1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnc2NoZWR1bGUgY3JlYXRlIGNsaWNrJyk7XHJcbiAgICAgICAgY29udHJvbGxlci5zYXZlVXBkYXRlTW9kZWxSZWRpcmVjdCgpO1xyXG4gICAgICB9O1xyXG4gICAgfSkodGhpcykpO1xyXG5cclxuXHJcbiAgfSxcclxuICBtYWtlVGltZVBpY2tlcnNSb3c6IGZ1bmN0aW9uKGlkVmFsLCBmcm9tSW5wdXQsIHRvSW5wdXQpe1xyXG5cclxuICAgIHZhciB0ciA9ICAkKCc8dHIvPicse2NsYXNzOiAnY29sbGFwc2UgY29sbGFwc2Utc3R5bGUnLFxyXG4gICAgaWQ6IGlkVmFsfSk7XHJcblxyXG4gICAgdmFyIHRkID0gJCgnPHRyLz4nLHtjb2xzcGFuOiBcIjdcIn0pO1xyXG4gICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcbiAgICB2YXIgZm9ybSA9ICQoJzxmb3JtLz4nLHtjbGFzczogXCJmb3JtLWlubGluZVwifSk7XHJcbiAgICB0ZC5hcHBlbmQoZm9ybSk7XHJcblxyXG4gICAgdmFyIGRpdiA9ICQoJzxkaXYvPicse2NsYXNzOiBcImZvcm0tZ3JvdXBcIn0pO1xyXG4gICAgZm9ybS5hcHBlbmQoZGl2KTtcclxuXHJcbiAgICB2YXIgZnJvbUxhYmVsID0gJCgnPGxhYmVsLz4nLHtjbGFzczogXCJjb2wtc20tMiBjb250cm9sLWxhYmVsXCIsIHRleHQ6ICdGcm9tJ30pO1xyXG4gICAgZGl2LmFwcGVuZChmcm9tTGFiZWwpO1xyXG4gICAgZGl2LmFwcGVuZChmcm9tSW5wdXQpO1xyXG5cclxuXHJcbiAgICBkaXYgPSAkKCc8ZGl2Lz4nLHtjbGFzczogXCJmb3JtLWdyb3VwXCJ9KTtcclxuICAgIGZvcm0uYXBwZW5kKGRpdik7XHJcbiAgICB2YXIgdG9MYWJlbCA9ICQoJzxsYWJlbC8+Jyx7Y2xhc3M6IFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFwiLCB0ZXh0OiAnVG8nfSk7XHJcbiAgICBkaXYuYXBwZW5kKHRvTGFiZWwpO1xyXG4gICAgZGl2LmFwcGVuZCh0b0lucHV0KTtcclxuXHJcbiAgICByZXR1cm4gdHI7XHJcblxyXG4gICAgLypcclxuICAgIDx0ciAgY2xhc3M9XCJjb2xsYXBzZSBjb2xsYXBzZS1zdHlsZVwiICBpZD1cImNvbGxhcHNlRXhhbXBsZTFcIj5cclxuICAgIDx0ZCBjb2xzcGFuPVwiN1wiID5cclxuICAgIDxmb3JtIGNsYXNzPVwiZm9ybS1pbmxpbmVcIj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgPGRpdiBpZD1cImRhdGV0aW1lcGlja2VyNVwiPlxyXG4gICAgPGxhYmVsIGNsYXNzPVwiZm9udC0xOFwiPkZyb208L2xhYmVsPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgPGxhYmVsICBjbGFzcz1cImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcIj5UbzwvbGFiZWw+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiICBpZD1cImRhdGV0aW1lcGlja2VyNlwiPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPC9mb3JtPlxyXG5cclxuICAgIDwvdGQ+XHJcbiAgICA8L3RyPlxyXG4gICAgKi9cclxuXHJcbiAgfSxcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgLypcclxuICAgICQoJyNkYXRldGltZXBpY2tlcjUnKS5kYXRldGltZXBpY2tlcih7XHJcbiAgICAgIGlubGluZTogZmFsc2UsXHJcbiAgICAgIGZvcm1hdDonTFQnXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjZGF0ZXRpbWVwaWNrZXI2JykuZGF0ZXRpbWVwaWNrZXIoe1xyXG4gICAgICBpbmxpbmU6IGZhbHNlLFxyXG4gICAgICBmb3JtYXQ6J0xUJ1xyXG4gICAgfSk7XHJcbiAgICAqL1xyXG4gICAgdGhpcy5wYW5lbC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcblxyXG4gICAgdmFyIHNjaGVkdWxlID0gY29udHJvbGxlci5nZXRTY2hlZHVsZSgpO1xyXG4gICAgY29uc29sZS5sb2coJ3JlbmRlciBjYWxlbmRhcicgKyBKU09OLnN0cmluZ2lmeShzY2hlZHVsZS5zY2hlZHVsZUxpc3QpKTtcclxuXHJcbiAgICAvL3NldHRpbmcgdGhlIGxvY2F0aW9uIHRleHRcclxuICAgIHZhciBsb2NhdGlvbiA9IHNjaGVkdWxlLnNlbGVjdGVkTG9jYXRpb247XHJcbiAgICB0aGlzLmxvY2F0aW9uTmFtZS50ZXh0KGxvY2F0aW9uLm5hbWUpO1xyXG5cclxuICAgIHZhciBtZnJvbURhdGUgPSBtb21lbnQoc2NoZWR1bGUuc3RhcnREYXRlLCBcIkRELU1NLVlZWVlcIik7XHJcbiAgICB2YXIgbXRvRGF0ZSA9IG1vbWVudChzY2hlZHVsZS5lbmREYXRlLCBcIkRELU1NLVlZWVlcIik7XHJcblxyXG4gICAgdGhpcy5kYXRlSGVhZGVyLnRleHQobWZyb21EYXRlLmZvcm1hdCgnRG8gTU1NIFlZWVknKSArICcgdG8gJyAgKyBtdG9EYXRlLmZvcm1hdCgnRG8gTU1NIFlZWVknKSk7XHJcblxyXG4gICAgdmFyIGluZGV4Q291bnRlciA9IDA7XHJcblxyXG4gICAgLy93aGVuIGZpcnN0IGRheSBpcyBub3QgbW9uZGF5LCBzZXR0aW5nIHRoZSBmaXJzdCByb3dcclxuICAgIHZhciBzdGFydERheSA9IG1mcm9tRGF0ZS5mb3JtYXQoJ2RkZCcpO1xyXG5cclxuICAgIGlmKHN0YXJ0RGF5ICE9ICdNb24nKXtcclxuXHJcbiAgICAgIHZhciBibG9ja3NUb0FkZCA9IG1mcm9tRGF0ZS5kYXkoKSAtIDE7XHJcblxyXG4gICAgICB2YXIgY2FsYW5kZXJTdGFydERhdGUgPSBtb21lbnQobWZyb21EYXRlKS5zdWJ0cmFjdChibG9ja3NUb0FkZCwgJ2RheXMnKTtcclxuXHJcbiAgICAgIHZhciB0ciA9ICQoJzx0ci8+Jyx7Y2xhc3M6ICd0ZXh0LWNlbnRlcid9KTtcclxuXHJcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBibG9ja3NUb0FkZCA7IGkrKyl7XHJcblxyXG4gICAgICAgIHZhciBzcGFuID0gICQoJzxzcGFuLz4nLHtjbGFzczogJ3B1bGwtcmlnaHQgZm9udC0xNiBjYWxlbmRhci1kYXRlJywgdGV4dDpjYWxhbmRlclN0YXJ0RGF0ZS5mb3JtYXQoJ0RvJyl9KTtcclxuICAgICAgICB2YXIgc3BhbjEgPSAgJCgnPHNwYW4vPicse2NsYXNzOiAnbGFiZWwgZm9udC0xNiBsYWJlbC1pbmZvJywgdGV4dDonTm8gU2NoZWR1bGUnfSk7XHJcblxyXG4gICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+JykuYXBwZW5kKHNwYW4pXHJcbiAgICAgICAgLmFwcGVuZCgkKCc8YnI+PGJyPicpKVxyXG4gICAgICAgIC5hcHBlbmQoc3BhbjEpO1xyXG5cclxuICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICBjYWxhbmRlclN0YXJ0RGF0ZS5hZGQoMSwgJ2QnKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciByZW1haW5pbmdDb3VrbW5Db3VudCA9IDcgLSBibG9ja3NUb0FkZDtcclxuXHJcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCByZW1haW5pbmdDb3VrbW5Db3VudCA7IGkrKyl7XHJcblxyXG4gICAgICAgIHZhciBzY2hlZHVsZUl0ZW0gPSBzY2hlZHVsZS5zY2hlZHVsZUxpc3RbaW5kZXhDb3VudGVyXTtcclxuXHJcbiAgICAgICAgdmFyIGRhdGUgPSBtb21lbnQoc2NoZWR1bGVJdGVtLmRhdGUsIFwiREQtTU0tWVlZWVwiKTtcclxuXHJcbiAgICAgICAgdmFyIHNwYW4gPSAgJCgnPHNwYW4vPicse2NsYXNzOiAncHVsbC1yaWdodCBmb250LTE2IGNhbGVuZGFyLWRhdGUnLCB0ZXh0OmRhdGUuZm9ybWF0KCdEbycpfSk7XHJcblxyXG4gICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+JykuYXBwZW5kKHNwYW4pXHJcbiAgICAgICAgLmFwcGVuZCgkKCc8YnI+PGJyPicpKTtcclxuXHJcbiAgICAgICAgdmFyIGlzQWN0aXZlID0gc2NoZWR1bGVJdGVtLmFjdGl2ZTtcclxuICAgICAgICBpZihpc0FjdGl2ZSA9PSAxKXtcclxuICAgICAgICAgIHZhciB0aW1lID0gc2NoZWR1bGVJdGVtLnN0YXJ0VGltZSArICcgLSAnICsgc2NoZWR1bGVJdGVtLmVuZFRpbWU7XHJcbiAgICAgICAgICB2YXIgc3BhbjEgPSAgJCgnPHNwYW4vPicse2NsYXNzOiAnYmxhY2sgZm9udC0xMCcsIHRleHQ6dGltZX0pO1xyXG5cclxuICAgICAgICAgIHNwYW4xLm9uKCdjbGljaycsIChmdW5jdGlvbihwYXNzZWRPbil7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzcGFuIGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgLy8kKCcjY29sbGFwc2VFeGFtcGxlMScpLmNvbGxhcHNlKCd0b2dnbGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgLy9hZGRpbmcgdGltZXBpY2tlciBkeW5hbWljYWxseVxyXG4gICAgICAgICAgICAgIHZhciBmcm9tSW5wdXQgPSAkKCc8aW5wdXQvPicse3R5cGU6IFwidGV4dFwiLCBjbGFzczogJ2Zvcm0tY29udHJvbCcsIHZhbHVlOnBhc3NlZE9uLml0ZW0uc3RhcnRUaW1lfSk7XHJcbiAgICAgICAgICAgICAgdmFyIHRvSW5wdXQgPSAkKCc8aW5wdXQvPicse3R5cGU6IFwidGV4dFwiLCBjbGFzczogJ2Zvcm0tY29udHJvbCcsIHZhbHVlOnBhc3NlZE9uLml0ZW0uZW5kVGltZX0pO1xyXG4gICAgICAgICAgICAgIHZhciBpZCA9ICdjb2xsYXBzZWQtdGltZS1waWNrZXJzJztcclxuICAgICAgICAgICAgICB2YXIgdHIgPSAkKCcjY29sbGFwc2VkLXRpbWUtcGlja2VycycpO1xyXG4gICAgICAgICAgICAgIHRyLnJlbW92ZSgpOyAgLy9yZW1vdmUgdGhlIHByZXZpb3VzbHkgYWRkZWQgdGltZSBwaWNrZXJzXHJcbiAgICAgICAgICAgICAgdmFyIHRpbWVQaWNrZXJUYWJsZVJvdyA9IGNyZWF0ZVNjaGVkdWxlVmlldy5tYWtlVGltZVBpY2tlcnNSb3coaWQsIGZyb21JbnB1dCwgdG9JbnB1dCk7XHJcbiAgICAgICAgICAgICAgdGltZVBpY2tlclRhYmxlUm93Lmluc2VydEFmdGVyKHBhc3NlZE9uLnRhYmxlUm93KTtcclxuICAgICAgICAgICAgICB0aW1lUGlja2VyVGFibGVSb3cuY29sbGFwc2UoJ3RvZ2dsZScpO1xyXG5cclxuICAgICAgICAgICAgICBmcm9tSW5wdXQuZGF0ZXRpbWVwaWNrZXIoe1xyXG4gICAgICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0OidMVCdcclxuICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgZnJvbUlucHV0Lm9uKCdkcC5jaGFuZ2UnLCAoZnVuY3Rpb24ocGFzc2VzT24pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgdmFsdWUnICsgcGFzc2VzT24uc2VsZi52YWwoKSk7XHJcbiAgICAgICAgICAgICAgICAgIHBhc3Nlc09uLnNjaGVkdWxlT2JqLnN0YXJ0VGltZSA9IHBhc3Nlc09uLnNlbGYudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBtU3RhcnRUaW1lID0gbW9tZW50KHBhc3Nlc09uLnNlbGYudmFsKCksIFwiaGg6bW0gQVwiKTtcclxuICAgICAgICAgICAgICAgICAgcGFzc2VzT24uc2NoZWR1bGVPYmouc3RhcnRUaW1lTWludXRlcyA9IG1TdGFydFRpbWUuaG91cnMoKSo2MCArIG1TdGFydFRpbWUubWludXRlcygpO1xyXG4gICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBsYWJlbCB0ZXh0XHJcbiAgICAgICAgICAgICAgICAgIHBhc3Nlc09uLmxhYmVsLnRleHQocGFzc2VzT24uc2NoZWR1bGVPYmouc3RhcnRUaW1lICsgJyAtICcgKyBwYXNzZXNPbi5zY2hlZHVsZU9iai5lbmRUaW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSkoe3NlbGY6ZnJvbUlucHV0LCBzY2hlZHVsZU9iajogcGFzc2VkT24uaXRlbSwgbGFiZWw6IHBhc3NlZE9uLnRpbWVMYWJlbH0pKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgIHRvSW5wdXQuZGF0ZXRpbWVwaWNrZXIoe1xyXG4gICAgICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0OidMVCdcclxuICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgdG9JbnB1dC5vbignZHAuY2hhbmdlJywgKGZ1bmN0aW9uKHBhc3Nlc09uKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnIHZhbHVlJyArIHBhc3Nlc09uLnNlbGYudmFsKCkpO1xyXG4gICAgICAgICAgICAgICAgICBwYXNzZXNPbi5zY2hlZHVsZU9iai5lbmRUaW1lID0gcGFzc2VzT24uc2VsZi52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIG1FbmRUaW1lID0gbW9tZW50KHBhc3Nlc09uLnNlbGYudmFsKCksIFwiaGg6bW0gQVwiKTtcclxuICAgICAgICAgICAgICAgICAgcGFzc2VzT24uc2NoZWR1bGVPYmouZW5kVGltZU1pbnV0ZXMgPSBtRW5kVGltZS5ob3VycygpKjYwICsgbUVuZFRpbWUubWludXRlcygpO1xyXG4gICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBsYWJlbCB0ZXh0XHJcbiAgICAgICAgICAgICAgICAgIHBhc3Nlc09uLmxhYmVsLnRleHQocGFzc2VzT24uc2NoZWR1bGVPYmouc3RhcnRUaW1lICsgJyAtICcgKyBwYXNzZXNPbi5zY2hlZHVsZU9iai5lbmRUaW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KSh7c2VsZjp0b0lucHV0LCBzY2hlZHVsZU9iajogcGFzc2VkT24uaXRlbSwgbGFiZWw6IHBhc3NlZE9uLnRpbWVMYWJlbH0pKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9KSh7dGFibGVSb3c6IHRyLCBpdGVtOiBzY2hlZHVsZUl0ZW0sIHRpbWVMYWJlbDogc3BhbjF9KSk7XHJcblxyXG4gICAgICAgICAgdGQuYXBwZW5kKHNwYW4xKTtcclxuXHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgdmFyIHNwYW4xID0gICQoJzxzcGFuLz4nLHtjbGFzczogJ2xhYmVsIGZvbnQtMTYgbGFiZWwtaW5mbycsIHRleHQ6J05vIFNjaGVkdWxlJ30pO1xyXG4gICAgICAgICAgdGQuYXBwZW5kKHNwYW4xKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG4gICAgICAgIG1mcm9tRGF0ZS5hZGQoMSwgJ2QnKTtcclxuICAgICAgICArK2luZGV4Q291bnRlcjtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMudGFibGVCb2R5LmFwcGVuZCh0cik7XHJcbiAgICAgIC8qXHJcbiAgICAgIDx0ZD5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJwdWxsLXJpZ2h0IGZvbnQtMTYgY2FsZW5kYXItZGF0ZVwiPjQ8L3NwYW4+XHJcbiAgICAgIDxicj4gPGJyPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImxhYmVsIGZvbnQtMTYgbGFiZWwtaW5mb1wiICBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgaHJlZj1cIiNjb2xsYXBzZUV4YW1wbGUxXCI+Tm8gU2NoZWR1bGU8L3NwYW4+XHJcbiAgICAgIDwvdGQ+XHJcblxyXG4gICAgICA8c3BhbiBjbGFzcz1cImxhYmVsIGZvbnQtMTYgbGFiZWwtZGFuZ2VyXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGhyZWY9XCIjY29sbGFwc2VFeGFtcGxlMVwiPjE0OjA0OkFtIFRvIDE0OjA0OkFtPC9zcGFuPlxyXG4gICAgICAqL1xyXG5cclxuICAgIH1cclxuICAgIC8vZG9uZSBzZXR0aW5nICB0aGUgZmlyc3Qgcm93XHJcblxyXG5cclxuICAgIC8vYWRkaW4gdGhlIHJlc3Qgb2YgdGhlIGRhdGVzXHJcbiAgICB2YXIgZGF5c0NvdW50ID0gc2NoZWR1bGUuc2NoZWR1bGVMaXN0Lmxlbmd0aDtcclxuICAgIHZhciBsb29wQ291bnQgPSBNYXRoLmNlaWwoZGF5c0NvdW50IC8gNyk7XHJcblxyXG4gICAgLy9jb25zb2xlLmxvZygnbG9vcGNwdW50JyArIGxvb3BDb3VudCk7XHJcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbG9vcENvdW50IDsgaSsrKXtcclxuXHJcbiAgICAgIHZhciB0ciA9ICQoJzx0ci8+Jyx7Y2xhc3M6ICd0ZXh0LWNlbnRlcid9KTtcclxuXHJcbiAgICAgIGZvcih2YXIgaiA9IDA7IGogPCA3ICYmIGluZGV4Q291bnRlciA8IGRheXNDb3VudDsgaisrKXtcclxuXHJcbiAgICAgICAgdmFyIGRhdGUgPSBtb21lbnQoc2NoZWR1bGUuc2NoZWR1bGVMaXN0W2luZGV4Q291bnRlcl0uZGF0ZSwgXCJERC1NTS1ZWVlZXCIpO1xyXG4gICAgICAgIHZhciBzcGFuID0gICQoJzxzcGFuLz4nLHtjbGFzczogJ3B1bGwtcmlnaHQgZm9udC0xNiBjYWxlbmRhci1kYXRlJywgdGV4dDpkYXRlLmZvcm1hdCgnRG8nKX0pO1xyXG4gICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+JykuYXBwZW5kKHNwYW4pXHJcbiAgICAgICAgLmFwcGVuZCgkKCc8YnI+PGJyPicpKTtcclxuXHJcbiAgICAgICAgdmFyIGlzQWN0aXZlID0gc2NoZWR1bGUuc2NoZWR1bGVMaXN0W2luZGV4Q291bnRlcl0uYWN0aXZlO1xyXG4gICAgICAgIGlmKGlzQWN0aXZlID09IDEpe1xyXG4gICAgICAgICAgdmFyIHRpbWUgPSBzY2hlZHVsZUl0ZW0uc3RhcnRUaW1lICsgJyB0byAnICsgc2NoZWR1bGVJdGVtLmVuZFRpbWU7XHJcbiAgICAgICAgICB2YXIgc3BhbjEgPSAgJCgnPHNwYW4vPicse2NsYXNzOiAnbGFiZWwgZm9udC0xNiBsYWJlbC1kYW5nZXInLCB0ZXh0OnRpbWV9KTtcclxuXHJcbiAgICAgICAgICBzcGFuMS5vbignY2xpY2snLCAoZnVuY3Rpb24ocGFzc2VkT24pe1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3BhbiBjbGljaycpO1xyXG4gICAgICAgICAgICAgIC8vJCgnI2NvbGxhcHNlRXhhbXBsZTEnKS5jb2xsYXBzZSgndG9nZ2xlJyk7XHJcblxyXG4gICAgICAgICAgICAgIC8vYWRkaW5nIHRpbWVwaWNrZXIgZHluYW1pY2FsbHlcclxuICAgICAgICAgICAgICB2YXIgZnJvbUlucHV0ID0gJCgnPGlucHV0Lz4nLHt0eXBlOiBcInRleHRcIiwgY2xhc3M6ICdmb3JtLWNvbnRyb2wnLCB2YWx1ZTpwYXNzZWRPbi5pdGVtLnN0YXJ0VGltZX0pO1xyXG4gICAgICAgICAgICAgIHZhciB0b0lucHV0ID0gJCgnPGlucHV0Lz4nLHt0eXBlOiBcInRleHRcIiwgY2xhc3M6ICdmb3JtLWNvbnRyb2wnLCB2YWx1ZTpwYXNzZWRPbi5pdGVtLmVuZFRpbWV9KTtcclxuICAgICAgICAgICAgICB2YXIgaWQgPSAnY29sbGFwc2VkLXRpbWUtcGlja2Vycyc7XHJcbiAgICAgICAgICAgICAgdmFyIHRyID0gJCgnI2NvbGxhcHNlZC10aW1lLXBpY2tlcnMnKTtcclxuICAgICAgICAgICAgICB0ci5yZW1vdmUoKTsgIC8vcmVtb3ZlIHRoZSBwcmV2aW91c2x5IGFkZGVkIHRpbWUgcGlja2Vyc1xyXG4gICAgICAgICAgICAgIHZhciB0aW1lUGlja2VyVGFibGVSb3cgPSBjcmVhdGVTY2hlZHVsZVZpZXcubWFrZVRpbWVQaWNrZXJzUm93KGlkLCBmcm9tSW5wdXQsIHRvSW5wdXQpO1xyXG4gICAgICAgICAgICAgIHRpbWVQaWNrZXJUYWJsZVJvdy5pbnNlcnRBZnRlcihwYXNzZWRPbi50YWJsZVJvdyk7XHJcbiAgICAgICAgICAgICAgdGltZVBpY2tlclRhYmxlUm93LmNvbGxhcHNlKCd0b2dnbGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgZnJvbUlucHV0LmRhdGV0aW1lcGlja2VyKHtcclxuICAgICAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZvcm1hdDonTFQnXHJcbiAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgIGZyb21JbnB1dC5vbignZHAuY2hhbmdlJywgKGZ1bmN0aW9uKHBhc3Nlc09uKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgcGFzc2VzT24uc2NoZWR1bGVPYmouc3RhcnRUaW1lID0gcGFzc2VzT24uc2VsZi52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIG1TdGFydFRpbWUgPSBtb21lbnQocGFzc2VzT24uc2VsZi52YWwoKSwgXCJoaDptbSBBXCIpO1xyXG4gICAgICAgICAgICAgICAgICBwYXNzZXNPbi5zY2hlZHVsZU9iai5zdGFydFRpbWVNaW51dGVzID0gbVN0YXJ0VGltZS5ob3VycygpKjYwICsgbVN0YXJ0VGltZS5taW51dGVzKCk7XHJcbiAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIGxhYmVsIHRleHRcclxuICAgICAgICAgICAgICAgICAgcGFzc2VzT24ubGFiZWwudGV4dChwYXNzZXNPbi5zY2hlZHVsZU9iai5zdGFydFRpbWUgKyAnIHRvICcgKyBwYXNzZXNPbi5zY2hlZHVsZU9iai5lbmRUaW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgdmFsdWUnICsgSlNPTi5zdHJpbmdpZnkocGFzc2VzT24uc2NoZWR1bGVPYmopKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSkoe3NlbGY6ZnJvbUlucHV0LCBzY2hlZHVsZU9iajogcGFzc2VkT24uaXRlbSwgbGFiZWw6IHBhc3NlZE9uLnRpbWVMYWJlbH0pKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgIHRvSW5wdXQuZGF0ZXRpbWVwaWNrZXIoe1xyXG4gICAgICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0OidMVCdcclxuICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgdG9JbnB1dC5vbignZHAuY2hhbmdlJywgKGZ1bmN0aW9uKHBhc3Nlc09uKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnIHZhbHVlJyArIHBhc3Nlc09uLnNlbGYudmFsKCkpO1xyXG4gICAgICAgICAgICAgICAgICBwYXNzZXNPbi5zY2hlZHVsZU9iai5lbmRUaW1lID0gcGFzc2VzT24uc2VsZi52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIG1FbmRUaW1lID0gbW9tZW50KHBhc3Nlc09uLnNlbGYudmFsKCksIFwiaGg6bW0gQVwiKTtcclxuICAgICAgICAgICAgICAgICAgcGFzc2VzT24uc2NoZWR1bGVPYmouZW5kVGltZU1pbnV0ZXMgPSBtRW5kVGltZS5ob3VycygpKjYwICsgbUVuZFRpbWUubWludXRlcygpO1xyXG4gICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBsYWJlbCB0ZXh0XHJcbiAgICAgICAgICAgICAgICAgIHBhc3Nlc09uLmxhYmVsLnRleHQocGFzc2VzT24uc2NoZWR1bGVPYmouc3RhcnRUaW1lICsgJyB0byAnICsgcGFzc2VzT24uc2NoZWR1bGVPYmouZW5kVGltZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSkoe3NlbGY6dG9JbnB1dCwgc2NoZWR1bGVPYmo6IHBhc3NlZE9uLml0ZW0sIGxhYmVsOiBwYXNzZWRPbi50aW1lTGFiZWx9KSk7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pKHt0YWJsZVJvdzogdHIsIGl0ZW06IHNjaGVkdWxlSXRlbSwgdGltZUxhYmVsOiBzcGFuMX0pKTtcclxuXHJcbiAgICAgICAgICB0ZC5hcHBlbmQoc3BhbjEpO1xyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgIHZhciBzcGFuMSA9ICAkKCc8c3Bhbi8+Jyx7Y2xhc3M6ICdsYWJlbCBmb250LTE2IGxhYmVsLWluZm8nLCB0ZXh0OidObyBTY2hlZHVsZSd9KTtcclxuICAgICAgICAgIHRkLmFwcGVuZChzcGFuMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICArK2luZGV4Q291bnRlcjtcclxuICAgICAgfSAvL2RheXMgb2Ygd2VlayBsb29wXHJcblxyXG4gICAgICAvL3RyLmFwcGVuZCh0ZCk7XHJcbiAgICAgIHRoaXMudGFibGVCb2R5LmFwcGVuZCh0cik7XHJcblxyXG4gICAgfS8vd2VlayBsb29wIGVuZHNcclxuXHJcblxyXG4gICAgLypcclxuICAgIDx0ZCBpZD1cInRhYmxlLWRhdGEtdGVtcGxhdGVcIiBoZWlnaHQ9XCIxMDBcIj5cclxuICAgIDxzcGFuIGNsYXNzPVwicHVsbC1yaWdodCBmb250LTE2IGNhbGVuZGFyLWRhdGVcIj4yPC9zcGFuPlxyXG4gICAgPGJyPjxicj5cclxuICAgIDxzcGFuIGNsYXNzPVwibGFiZWwgZm9udC0xNiBsYWJlbC1kYW5nZXJcIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgaHJlZj1cIiNjb2xsYXBzZUV4YW1wbGUxXCI+MTQ6MDQ6QW0gVG8gMTQ6MDQ6QW08L3NwYW4+XHJcbiAgICA8L3RkPlxyXG4gICAgKi9cclxuICB9XHJcbn1cclxuXHJcbmNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxufSgpKTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
