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
            this.scheduleListingUrl =   links.listScheduleUrl;
            this.getLocationUrl = links.getLocationUrl;
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

            for(var j = 0; j <= daysDuration; j++){

              var schedule = {
                date: mfromDate.format('DD-MM-YYYY'),
                startTime:startTimeVal,
                endTime: endTimeVal,
                active: false
              };
              scheduleModel.scheduleList.push(schedule);

              var weekDay = mfromDate.format('ddd');

              if(weekArray.indexOf(weekDay)  >= 0 ){
                    schedule.active = true;
                }

                mfromDate.add(1, 'days')

            }; //date loop

          },
        getSchedule: function() {
          return scheduleModel;
        },
        saveUpdateModelRedirect: function(){

          $.post( controller.createUpdateScheduleUrl , scheduleModel)
           .done(function( response ) {
             console.log('response ' + JSON.stringify(response));

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

            $('#datetimepicker5').datetimepicker({
              inline: false,
              format:'LT'
            });

            $('#datetimepicker6').datetimepicker({
              inline: false,
              format:'LT'
            });

            //collapsed-time-pickers

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
                if(isActive){
                  var time = scheduleItem.startTime + ' to ' + scheduleItem.endTime;
                  var span1 =  $('<span/>',{class: 'label font-16 label-danger', text:time});

                  span1.on('click', (function(passedOn){
                    return function(){
                      console.log('span click');
                      //$('#collapseExample1').collapse('toggle');

                      //adding timepicker dynamically
                      var fromInput = $('<input/>',{type: "text", class: 'form-control', value:passedOn.startTime});
                      var toInput = $('<input/>',{type: "text", class: 'form-control', value:passedOn.endTime});
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
                          //update label text
                          passesOn.label.text(passesOn.scheduleObj.startTime + ' to ' + passesOn.scheduleObj.endTime);

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
               if(isActive){
                 var time = scheduleItem.startTime + ' to ' + scheduleItem.endTime;
                 var span1 =  $('<span/>',{class: 'label font-16 label-danger', text:time});

                 span1.on('click', (function(passedOn){
                   return function(){
                     console.log('span click');
                     //$('#collapseExample1').collapse('toggle');

                     //adding timepicker dynamically
                     var fromInput = $('<input/>',{type: "text", class: 'form-control', value:passedOn.startTime});
                     var toInput = $('<input/>',{type: "text", class: 'form-control', value:passedOn.endTime});
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
                         //update label text
                         passesOn.label.text(passesOn.scheduleObj.startTime + ' to ' + passesOn.scheduleObj.endTime);

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
            var fromInput = $('<input/>',{type: "text", class: 'form-control', value:'12:00 PM'});
            var toInput = $('<input/>',{type: "text", class: 'form-control', value:'12:00 PM'});
            var timePickerTableRow = this.makeTimePickersRow('collapsed-time-pickers', fromInput, toInput);
            this.tableBody.append(timePickerTableRow);
            timePickerTableRow.collapse('toggle');
            fromInput.datetimepicker({
              inline: true,
              format:'LT'
            });

            fromInput.on('dp.change', (function(self){
              return function(){
                console.log(' value' + self.val());
              }
            })(fromInput))


            toInput.datetimepicker({
              inline: true,
              format:'LT'
            });

            toInput.on('dp.change', (function(self){
              return function(){
                console.log(' value' + self.val());
              }
            })(toInput))

            */


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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vbWVudC5qcyIsImJvb3RzdHJhcC1kYXRldGltZXBpY2tlci5taW4uanMiLCJ1dGlsaXR5LmpzIiwibGlua3MuanMiLCJkb2N0b3JEYXNoYm9hcmQuanMiLCJuZXcuc2NoZWR1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3Y4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibmV3LnNjaGVkdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8hIG1vbWVudC5qc1xyXG4vLyEgdmVyc2lvbiA6IDIuMTMuMFxyXG4vLyEgYXV0aG9ycyA6IFRpbSBXb29kLCBJc2tyZW4gQ2hlcm5ldiwgTW9tZW50LmpzIGNvbnRyaWJ1dG9yc1xyXG4vLyEgbGljZW5zZSA6IE1JVFxyXG4vLyEgbW9tZW50anMuY29tXHJcblxyXG47KGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcclxuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcclxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XHJcbiAgICBnbG9iYWwubW9tZW50ID0gZmFjdG9yeSgpXHJcbn0odGhpcywgZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgdmFyIGhvb2tDYWxsYmFjaztcclxuXHJcbiAgICBmdW5jdGlvbiB1dGlsc19ob29rc19faG9va3MgKCkge1xyXG4gICAgICAgIHJldHVybiBob29rQ2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIGlzIGRvbmUgdG8gcmVnaXN0ZXIgdGhlIG1ldGhvZCBjYWxsZWQgd2l0aCBtb21lbnQoKVxyXG4gICAgLy8gd2l0aG91dCBjcmVhdGluZyBjaXJjdWxhciBkZXBlbmRlbmNpZXMuXHJcbiAgICBmdW5jdGlvbiBzZXRIb29rQ2FsbGJhY2sgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaG9va0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNBcnJheShpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIEFycmF5IHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNEYXRlKGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgRGF0ZSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBEYXRlXSc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWFwKGFyciwgZm4pIHtcclxuICAgICAgICB2YXIgcmVzID0gW10sIGk7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICByZXMucHVzaChmbihhcnJbaV0sIGkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYXNPd25Qcm9wKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGEsIGIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGV4dGVuZChhLCBiKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSBpbiBiKSB7XHJcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKGIsIGkpKSB7XHJcbiAgICAgICAgICAgICAgICBhW2ldID0gYltpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhhc093blByb3AoYiwgJ3RvU3RyaW5nJykpIHtcclxuICAgICAgICAgICAgYS50b1N0cmluZyA9IGIudG9TdHJpbmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGFzT3duUHJvcChiLCAndmFsdWVPZicpKSB7XHJcbiAgICAgICAgICAgIGEudmFsdWVPZiA9IGIudmFsdWVPZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyAoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QpIHtcclxuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWxPclVUQyhpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgdHJ1ZSkudXRjKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVmYXVsdFBhcnNpbmdGbGFncygpIHtcclxuICAgICAgICAvLyBXZSBuZWVkIHRvIGRlZXAgY2xvbmUgdGhpcyBvYmplY3QuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZW1wdHkgICAgICAgICAgIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHVudXNlZFRva2VucyAgICA6IFtdLFxyXG4gICAgICAgICAgICB1bnVzZWRJbnB1dCAgICAgOiBbXSxcclxuICAgICAgICAgICAgb3ZlcmZsb3cgICAgICAgIDogLTIsXHJcbiAgICAgICAgICAgIGNoYXJzTGVmdE92ZXIgICA6IDAsXHJcbiAgICAgICAgICAgIG51bGxJbnB1dCAgICAgICA6IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnZhbGlkTW9udGggICAgOiBudWxsLFxyXG4gICAgICAgICAgICBpbnZhbGlkRm9ybWF0ICAgOiBmYWxzZSxcclxuICAgICAgICAgICAgdXNlckludmFsaWRhdGVkIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzbyAgICAgICAgICAgICA6IGZhbHNlLFxyXG4gICAgICAgICAgICBwYXJzZWREYXRlUGFydHMgOiBbXSxcclxuICAgICAgICAgICAgbWVyaWRpZW0gICAgICAgIDogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UGFyc2luZ0ZsYWdzKG0pIHtcclxuICAgICAgICBpZiAobS5fcGYgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtLl9wZiA9IGRlZmF1bHRQYXJzaW5nRmxhZ3MoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG0uX3BmO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzb21lO1xyXG4gICAgaWYgKEFycmF5LnByb3RvdHlwZS5zb21lKSB7XHJcbiAgICAgICAgc29tZSA9IEFycmF5LnByb3RvdHlwZS5zb21lO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzb21lID0gZnVuY3Rpb24gKGZ1bikge1xyXG4gICAgICAgICAgICB2YXIgdCA9IE9iamVjdCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIGxlbiA9IHQubGVuZ3RoID4+PiAwO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgaW4gdCAmJiBmdW4uY2FsbCh0aGlzLCB0W2ldLCBpLCB0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZF9faXNWYWxpZChtKSB7XHJcbiAgICAgICAgaWYgKG0uX2lzVmFsaWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgZmxhZ3MgPSBnZXRQYXJzaW5nRmxhZ3MobSk7XHJcbiAgICAgICAgICAgIHZhciBwYXJzZWRQYXJ0cyA9IHNvbWUuY2FsbChmbGFncy5wYXJzZWREYXRlUGFydHMsIGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAhPSBudWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbS5faXNWYWxpZCA9ICFpc05hTihtLl9kLmdldFRpbWUoKSkgJiZcclxuICAgICAgICAgICAgICAgIGZsYWdzLm92ZXJmbG93IDwgMCAmJlxyXG4gICAgICAgICAgICAgICAgIWZsYWdzLmVtcHR5ICYmXHJcbiAgICAgICAgICAgICAgICAhZmxhZ3MuaW52YWxpZE1vbnRoICYmXHJcbiAgICAgICAgICAgICAgICAhZmxhZ3MuaW52YWxpZFdlZWtkYXkgJiZcclxuICAgICAgICAgICAgICAgICFmbGFncy5udWxsSW5wdXQgJiZcclxuICAgICAgICAgICAgICAgICFmbGFncy5pbnZhbGlkRm9ybWF0ICYmXHJcbiAgICAgICAgICAgICAgICAhZmxhZ3MudXNlckludmFsaWRhdGVkICYmXHJcbiAgICAgICAgICAgICAgICAoIWZsYWdzLm1lcmlkaWVtIHx8IChmbGFncy5tZXJpZGllbSAmJiBwYXJzZWRQYXJ0cykpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG0uX3N0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgbS5faXNWYWxpZCA9IG0uX2lzVmFsaWQgJiZcclxuICAgICAgICAgICAgICAgICAgICBmbGFncy5jaGFyc0xlZnRPdmVyID09PSAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZ3MudW51c2VkVG9rZW5zLmxlbmd0aCA9PT0gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWdzLmJpZ0hvdXIgPT09IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbS5faXNWYWxpZDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZF9fY3JlYXRlSW52YWxpZCAoZmxhZ3MpIHtcclxuICAgICAgICB2YXIgbSA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyhOYU4pO1xyXG4gICAgICAgIGlmIChmbGFncyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGV4dGVuZChnZXRQYXJzaW5nRmxhZ3MobSksIGZsYWdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhtKS51c2VySW52YWxpZGF0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNVbmRlZmluZWQoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQgPT09IHZvaWQgMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQbHVnaW5zIHRoYXQgYWRkIHByb3BlcnRpZXMgc2hvdWxkIGFsc28gYWRkIHRoZSBrZXkgaGVyZSAobnVsbCB2YWx1ZSksXHJcbiAgICAvLyBzbyB3ZSBjYW4gcHJvcGVybHkgY2xvbmUgb3Vyc2VsdmVzLlxyXG4gICAgdmFyIG1vbWVudFByb3BlcnRpZXMgPSB1dGlsc19ob29rc19faG9va3MubW9tZW50UHJvcGVydGllcyA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvcHlDb25maWcodG8sIGZyb20pIHtcclxuICAgICAgICB2YXIgaSwgcHJvcCwgdmFsO1xyXG5cclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2lzQU1vbWVudE9iamVjdCkpIHtcclxuICAgICAgICAgICAgdG8uX2lzQU1vbWVudE9iamVjdCA9IGZyb20uX2lzQU1vbWVudE9iamVjdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pKSkge1xyXG4gICAgICAgICAgICB0by5faSA9IGZyb20uX2k7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fZikpIHtcclxuICAgICAgICAgICAgdG8uX2YgPSBmcm9tLl9mO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2wpKSB7XHJcbiAgICAgICAgICAgIHRvLl9sID0gZnJvbS5fbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9zdHJpY3QpKSB7XHJcbiAgICAgICAgICAgIHRvLl9zdHJpY3QgPSBmcm9tLl9zdHJpY3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fdHptKSkge1xyXG4gICAgICAgICAgICB0by5fdHptID0gZnJvbS5fdHptO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2lzVVRDKSkge1xyXG4gICAgICAgICAgICB0by5faXNVVEMgPSBmcm9tLl9pc1VUQztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9vZmZzZXQpKSB7XHJcbiAgICAgICAgICAgIHRvLl9vZmZzZXQgPSBmcm9tLl9vZmZzZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fcGYpKSB7XHJcbiAgICAgICAgICAgIHRvLl9wZiA9IGdldFBhcnNpbmdGbGFncyhmcm9tKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9sb2NhbGUpKSB7XHJcbiAgICAgICAgICAgIHRvLl9sb2NhbGUgPSBmcm9tLl9sb2NhbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobW9tZW50UHJvcGVydGllcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAoaSBpbiBtb21lbnRQcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wID0gbW9tZW50UHJvcGVydGllc1tpXTtcclxuICAgICAgICAgICAgICAgIHZhbCA9IGZyb21bcHJvcF07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHZhbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b1twcm9wXSA9IHZhbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRvO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB1cGRhdGVJblByb2dyZXNzID0gZmFsc2U7XHJcblxyXG4gICAgLy8gTW9tZW50IHByb3RvdHlwZSBvYmplY3RcclxuICAgIGZ1bmN0aW9uIE1vbWVudChjb25maWcpIHtcclxuICAgICAgICBjb3B5Q29uZmlnKHRoaXMsIGNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5fZCAhPSBudWxsID8gY29uZmlnLl9kLmdldFRpbWUoKSA6IE5hTik7XHJcbiAgICAgICAgLy8gUHJldmVudCBpbmZpbml0ZSBsb29wIGluIGNhc2UgdXBkYXRlT2Zmc2V0IGNyZWF0ZXMgbmV3IG1vbWVudFxyXG4gICAgICAgIC8vIG9iamVjdHMuXHJcbiAgICAgICAgaWYgKHVwZGF0ZUluUHJvZ3Jlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZUluUHJvZ3Jlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KHRoaXMpO1xyXG4gICAgICAgICAgICB1cGRhdGVJblByb2dyZXNzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzTW9tZW50IChvYmopIHtcclxuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgTW9tZW50IHx8IChvYmogIT0gbnVsbCAmJiBvYmouX2lzQU1vbWVudE9iamVjdCAhPSBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhYnNGbG9vciAobnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG51bWJlciA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChudW1iZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKG51bWJlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvSW50KGFyZ3VtZW50Rm9yQ29lcmNpb24pIHtcclxuICAgICAgICB2YXIgY29lcmNlZE51bWJlciA9ICthcmd1bWVudEZvckNvZXJjaW9uLFxyXG4gICAgICAgICAgICB2YWx1ZSA9IDA7XHJcblxyXG4gICAgICAgIGlmIChjb2VyY2VkTnVtYmVyICE9PSAwICYmIGlzRmluaXRlKGNvZXJjZWROdW1iZXIpKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gYWJzRmxvb3IoY29lcmNlZE51bWJlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29tcGFyZSB0d28gYXJyYXlzLCByZXR1cm4gdGhlIG51bWJlciBvZiBkaWZmZXJlbmNlc1xyXG4gICAgZnVuY3Rpb24gY29tcGFyZUFycmF5cyhhcnJheTEsIGFycmF5MiwgZG9udENvbnZlcnQpIHtcclxuICAgICAgICB2YXIgbGVuID0gTWF0aC5taW4oYXJyYXkxLmxlbmd0aCwgYXJyYXkyLmxlbmd0aCksXHJcbiAgICAgICAgICAgIGxlbmd0aERpZmYgPSBNYXRoLmFicyhhcnJheTEubGVuZ3RoIC0gYXJyYXkyLmxlbmd0aCksXHJcbiAgICAgICAgICAgIGRpZmZzID0gMCxcclxuICAgICAgICAgICAgaTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKChkb250Q29udmVydCAmJiBhcnJheTFbaV0gIT09IGFycmF5MltpXSkgfHxcclxuICAgICAgICAgICAgICAgICghZG9udENvbnZlcnQgJiYgdG9JbnQoYXJyYXkxW2ldKSAhPT0gdG9JbnQoYXJyYXkyW2ldKSkpIHtcclxuICAgICAgICAgICAgICAgIGRpZmZzKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRpZmZzICsgbGVuZ3RoRGlmZjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3YXJuKG1zZykge1xyXG4gICAgICAgIGlmICh1dGlsc19ob29rc19faG9va3Muc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmdzID09PSBmYWxzZSAmJlxyXG4gICAgICAgICAgICAgICAgKHR5cGVvZiBjb25zb2xlICE9PSAgJ3VuZGVmaW5lZCcpICYmIGNvbnNvbGUud2Fybikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0RlcHJlY2F0aW9uIHdhcm5pbmc6ICcgKyBtc2cpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZXByZWNhdGUobXNnLCBmbikge1xyXG4gICAgICAgIHZhciBmaXJzdFRpbWUgPSB0cnVlO1xyXG5cclxuICAgICAgICByZXR1cm4gZXh0ZW5kKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzX2hvb2tzX19ob29rcy5kZXByZWNhdGlvbkhhbmRsZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLmRlcHJlY2F0aW9uSGFuZGxlcihudWxsLCBtc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChmaXJzdFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHdhcm4obXNnICsgJ1xcbkFyZ3VtZW50czogJyArIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykuam9pbignLCAnKSArICdcXG4nICsgKG5ldyBFcnJvcigpKS5zdGFjayk7XHJcbiAgICAgICAgICAgICAgICBmaXJzdFRpbWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9LCBmbik7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlcHJlY2F0aW9ucyA9IHt9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGRlcHJlY2F0ZVNpbXBsZShuYW1lLCBtc2cpIHtcclxuICAgICAgICBpZiAodXRpbHNfaG9va3NfX2hvb2tzLmRlcHJlY2F0aW9uSGFuZGxlciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy5kZXByZWNhdGlvbkhhbmRsZXIobmFtZSwgbXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkZXByZWNhdGlvbnNbbmFtZV0pIHtcclxuICAgICAgICAgICAgd2Fybihtc2cpO1xyXG4gICAgICAgICAgICBkZXByZWNhdGlvbnNbbmFtZV0gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1dGlsc19ob29rc19faG9va3Muc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmdzID0gZmFsc2U7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MuZGVwcmVjYXRpb25IYW5kbGVyID0gbnVsbDtcclxuXHJcbiAgICBmdW5jdGlvbiBpc0Z1bmN0aW9uKGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgRnVuY3Rpb24gfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc09iamVjdChpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBPYmplY3RdJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2NhbGVfc2V0X19zZXQgKGNvbmZpZykge1xyXG4gICAgICAgIHZhciBwcm9wLCBpO1xyXG4gICAgICAgIGZvciAoaSBpbiBjb25maWcpIHtcclxuICAgICAgICAgICAgcHJvcCA9IGNvbmZpZ1tpXTtcclxuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24ocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbaV0gPSBwcm9wO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpc1snXycgKyBpXSA9IHByb3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIC8vIExlbmllbnQgb3JkaW5hbCBwYXJzaW5nIGFjY2VwdHMganVzdCBhIG51bWJlciBpbiBhZGRpdGlvbiB0b1xyXG4gICAgICAgIC8vIG51bWJlciArIChwb3NzaWJseSkgc3R1ZmYgY29taW5nIGZyb20gX29yZGluYWxQYXJzZUxlbmllbnQuXHJcbiAgICAgICAgdGhpcy5fb3JkaW5hbFBhcnNlTGVuaWVudCA9IG5ldyBSZWdFeHAodGhpcy5fb3JkaW5hbFBhcnNlLnNvdXJjZSArICd8JyArICgvXFxkezEsMn0vKS5zb3VyY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1lcmdlQ29uZmlncyhwYXJlbnRDb25maWcsIGNoaWxkQ29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHJlcyA9IGV4dGVuZCh7fSwgcGFyZW50Q29uZmlnKSwgcHJvcDtcclxuICAgICAgICBmb3IgKHByb3AgaW4gY2hpbGRDb25maWcpIHtcclxuICAgICAgICAgICAgaWYgKGhhc093blByb3AoY2hpbGRDb25maWcsIHByb3ApKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNPYmplY3QocGFyZW50Q29uZmlnW3Byb3BdKSAmJiBpc09iamVjdChjaGlsZENvbmZpZ1twcm9wXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNbcHJvcF0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBleHRlbmQocmVzW3Byb3BdLCBwYXJlbnRDb25maWdbcHJvcF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4dGVuZChyZXNbcHJvcF0sIGNoaWxkQ29uZmlnW3Byb3BdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hpbGRDb25maWdbcHJvcF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc1twcm9wXSA9IGNoaWxkQ29uZmlnW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcmVzW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gTG9jYWxlKGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldChjb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIga2V5cztcclxuXHJcbiAgICBpZiAoT2JqZWN0LmtleXMpIHtcclxuICAgICAgICBrZXlzID0gT2JqZWN0LmtleXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGtleXMgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBpLCByZXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChpIGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhhc093blByb3Aob2JqLCBpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpbnRlcm5hbCBzdG9yYWdlIGZvciBsb2NhbGUgY29uZmlnIGZpbGVzXHJcbiAgICB2YXIgbG9jYWxlcyA9IHt9O1xyXG4gICAgdmFyIGdsb2JhbExvY2FsZTtcclxuXHJcbiAgICBmdW5jdGlvbiBub3JtYWxpemVMb2NhbGUoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIGtleSA/IGtleS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJ18nLCAnLScpIDoga2V5O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHBpY2sgdGhlIGxvY2FsZSBmcm9tIHRoZSBhcnJheVxyXG4gICAgLy8gdHJ5IFsnZW4tYXUnLCAnZW4tZ2InXSBhcyAnZW4tYXUnLCAnZW4tZ2InLCAnZW4nLCBhcyBpbiBtb3ZlIHRocm91Z2ggdGhlIGxpc3QgdHJ5aW5nIGVhY2hcclxuICAgIC8vIHN1YnN0cmluZyBmcm9tIG1vc3Qgc3BlY2lmaWMgdG8gbGVhc3QsIGJ1dCBtb3ZlIHRvIHRoZSBuZXh0IGFycmF5IGl0ZW0gaWYgaXQncyBhIG1vcmUgc3BlY2lmaWMgdmFyaWFudCB0aGFuIHRoZSBjdXJyZW50IHJvb3RcclxuICAgIGZ1bmN0aW9uIGNob29zZUxvY2FsZShuYW1lcykge1xyXG4gICAgICAgIHZhciBpID0gMCwgaiwgbmV4dCwgbG9jYWxlLCBzcGxpdDtcclxuXHJcbiAgICAgICAgd2hpbGUgKGkgPCBuYW1lcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc3BsaXQgPSBub3JtYWxpemVMb2NhbGUobmFtZXNbaV0pLnNwbGl0KCctJyk7XHJcbiAgICAgICAgICAgIGogPSBzcGxpdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIG5leHQgPSBub3JtYWxpemVMb2NhbGUobmFtZXNbaSArIDFdKTtcclxuICAgICAgICAgICAgbmV4dCA9IG5leHQgPyBuZXh0LnNwbGl0KCctJykgOiBudWxsO1xyXG4gICAgICAgICAgICB3aGlsZSAoaiA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxvY2FsZSA9IGxvYWRMb2NhbGUoc3BsaXQuc2xpY2UoMCwgaikuam9pbignLScpKTtcclxuICAgICAgICAgICAgICAgIGlmIChsb2NhbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5leHQgJiYgbmV4dC5sZW5ndGggPj0gaiAmJiBjb21wYXJlQXJyYXlzKHNwbGl0LCBuZXh0LCB0cnVlKSA+PSBqIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhlIG5leHQgYXJyYXkgaXRlbSBpcyBiZXR0ZXIgdGhhbiBhIHNoYWxsb3dlciBzdWJzdHJpbmcgb2YgdGhpcyBvbmVcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGotLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxvYWRMb2NhbGUobmFtZSkge1xyXG4gICAgICAgIHZhciBvbGRMb2NhbGUgPSBudWxsO1xyXG4gICAgICAgIC8vIFRPRE86IEZpbmQgYSBiZXR0ZXIgd2F5IHRvIHJlZ2lzdGVyIGFuZCBsb2FkIGFsbCB0aGUgbG9jYWxlcyBpbiBOb2RlXHJcbiAgICAgICAgaWYgKCFsb2NhbGVzW25hbWVdICYmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykgJiZcclxuICAgICAgICAgICAgICAgIG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgb2xkTG9jYWxlID0gZ2xvYmFsTG9jYWxlLl9hYmJyO1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZSgnLi9sb2NhbGUvJyArIG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gYmVjYXVzZSBkZWZpbmVMb2NhbGUgY3VycmVudGx5IGFsc28gc2V0cyB0aGUgZ2xvYmFsIGxvY2FsZSwgd2VcclxuICAgICAgICAgICAgICAgIC8vIHdhbnQgdG8gdW5kbyB0aGF0IGZvciBsYXp5IGxvYWRlZCBsb2NhbGVzXHJcbiAgICAgICAgICAgICAgICBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlKG9sZExvY2FsZSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbG9jYWxlc1tuYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgbG9hZCBsb2NhbGUgYW5kIHRoZW4gc2V0IHRoZSBnbG9iYWwgbG9jYWxlLiAgSWZcclxuICAgIC8vIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkIGluLCBpdCB3aWxsIHNpbXBseSByZXR1cm4gdGhlIGN1cnJlbnQgZ2xvYmFsXHJcbiAgICAvLyBsb2NhbGUga2V5LlxyXG4gICAgZnVuY3Rpb24gbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZSAoa2V5LCB2YWx1ZXMpIHtcclxuICAgICAgICB2YXIgZGF0YTtcclxuICAgICAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChpc1VuZGVmaW5lZCh2YWx1ZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZShrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IGRlZmluZUxvY2FsZShrZXksIHZhbHVlcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBtb21lbnQuZHVyYXRpb24uX2xvY2FsZSA9IG1vbWVudC5fbG9jYWxlID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbExvY2FsZSA9IGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBnbG9iYWxMb2NhbGUuX2FiYnI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVmaW5lTG9jYWxlIChuYW1lLCBjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5hYmJyID0gbmFtZTtcclxuICAgICAgICAgICAgaWYgKGxvY2FsZXNbbmFtZV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGVwcmVjYXRlU2ltcGxlKCdkZWZpbmVMb2NhbGVPdmVycmlkZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd1c2UgbW9tZW50LnVwZGF0ZUxvY2FsZShsb2NhbGVOYW1lLCBjb25maWcpIHRvIGNoYW5nZSAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2FuIGV4aXN0aW5nIGxvY2FsZS4gbW9tZW50LmRlZmluZUxvY2FsZShsb2NhbGVOYW1lLCAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbmZpZykgc2hvdWxkIG9ubHkgYmUgdXNlZCBmb3IgY3JlYXRpbmcgYSBuZXcgbG9jYWxlJyk7XHJcbiAgICAgICAgICAgICAgICBjb25maWcgPSBtZXJnZUNvbmZpZ3MobG9jYWxlc1tuYW1lXS5fY29uZmlnLCBjb25maWcpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5wYXJlbnRMb2NhbGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsZXNbY29uZmlnLnBhcmVudExvY2FsZV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlncyhsb2NhbGVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdLl9jb25maWcsIGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRyZWF0IGFzIGlmIHRoZXJlIGlzIG5vIGJhc2UgY29uZmlnXHJcbiAgICAgICAgICAgICAgICAgICAgZGVwcmVjYXRlU2ltcGxlKCdwYXJlbnRMb2NhbGVVbmRlZmluZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NwZWNpZmllZCBwYXJlbnRMb2NhbGUgaXMgbm90IGRlZmluZWQgeWV0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbG9jYWxlc1tuYW1lXSA9IG5ldyBMb2NhbGUoY29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGJhY2t3YXJkcyBjb21wYXQgZm9yIG5vdzogYWxzbyBzZXQgdGhlIGxvY2FsZVxyXG4gICAgICAgICAgICBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlKG5hbWUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZXNbbmFtZV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdXNlZnVsIGZvciB0ZXN0aW5nXHJcbiAgICAgICAgICAgIGRlbGV0ZSBsb2NhbGVzW25hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9jYWxlKG5hbWUsIGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgbG9jYWxlO1xyXG4gICAgICAgICAgICBpZiAobG9jYWxlc1tuYW1lXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25maWcgPSBtZXJnZUNvbmZpZ3MobG9jYWxlc1tuYW1lXS5fY29uZmlnLCBjb25maWcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxvY2FsZSA9IG5ldyBMb2NhbGUoY29uZmlnKTtcclxuICAgICAgICAgICAgbG9jYWxlLnBhcmVudExvY2FsZSA9IGxvY2FsZXNbbmFtZV07XHJcbiAgICAgICAgICAgIGxvY2FsZXNbbmFtZV0gPSBsb2NhbGU7XHJcblxyXG4gICAgICAgICAgICAvLyBiYWNrd2FyZHMgY29tcGF0IGZvciBub3c6IGFsc28gc2V0IHRoZSBsb2NhbGVcclxuICAgICAgICAgICAgbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZShuYW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBwYXNzIG51bGwgZm9yIGNvbmZpZyB0byB1bnVwZGF0ZSwgdXNlZnVsIGZvciB0ZXN0c1xyXG4gICAgICAgICAgICBpZiAobG9jYWxlc1tuYW1lXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxlc1tuYW1lXS5wYXJlbnRMb2NhbGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZXNbbmFtZV0gPSBsb2NhbGVzW25hbWVdLnBhcmVudExvY2FsZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9jYWxlc1tuYW1lXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGxvY2FsZXNbbmFtZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsZXNbbmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmV0dXJucyBsb2NhbGUgZGF0YVxyXG4gICAgZnVuY3Rpb24gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZSAoa2V5KSB7XHJcbiAgICAgICAgdmFyIGxvY2FsZTtcclxuXHJcbiAgICAgICAgaWYgKGtleSAmJiBrZXkuX2xvY2FsZSAmJiBrZXkuX2xvY2FsZS5fYWJicikge1xyXG4gICAgICAgICAgICBrZXkgPSBrZXkuX2xvY2FsZS5fYWJicjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgha2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWxMb2NhbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWlzQXJyYXkoa2V5KSkge1xyXG4gICAgICAgICAgICAvL3Nob3J0LWNpcmN1aXQgZXZlcnl0aGluZyBlbHNlXHJcbiAgICAgICAgICAgIGxvY2FsZSA9IGxvYWRMb2NhbGUoa2V5KTtcclxuICAgICAgICAgICAgaWYgKGxvY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBrZXkgPSBba2V5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjaG9vc2VMb2NhbGUoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2NhbGVfbG9jYWxlc19fbGlzdExvY2FsZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGtleXMobG9jYWxlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGFsaWFzZXMgPSB7fTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRVbml0QWxpYXMgKHVuaXQsIHNob3J0aGFuZCkge1xyXG4gICAgICAgIHZhciBsb3dlckNhc2UgPSB1bml0LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgYWxpYXNlc1tsb3dlckNhc2VdID0gYWxpYXNlc1tsb3dlckNhc2UgKyAncyddID0gYWxpYXNlc1tzaG9ydGhhbmRdID0gdW5pdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBub3JtYWxpemVVbml0cyh1bml0cykge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdW5pdHMgPT09ICdzdHJpbmcnID8gYWxpYXNlc1t1bml0c10gfHwgYWxpYXNlc1t1bml0cy50b0xvd2VyQ2FzZSgpXSA6IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBub3JtYWxpemVPYmplY3RVbml0cyhpbnB1dE9iamVjdCkge1xyXG4gICAgICAgIHZhciBub3JtYWxpemVkSW5wdXQgPSB7fSxcclxuICAgICAgICAgICAgbm9ybWFsaXplZFByb3AsXHJcbiAgICAgICAgICAgIHByb3A7XHJcblxyXG4gICAgICAgIGZvciAocHJvcCBpbiBpbnB1dE9iamVjdCkge1xyXG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChpbnB1dE9iamVjdCwgcHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wID0gbm9ybWFsaXplVW5pdHMocHJvcCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZFByb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVkSW5wdXRbbm9ybWFsaXplZFByb3BdID0gaW5wdXRPYmplY3RbcHJvcF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBub3JtYWxpemVkSW5wdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWFrZUdldFNldCAodW5pdCwga2VlcFRpbWUpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRfc2V0X19zZXQodGhpcywgdW5pdCwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCBrZWVwVGltZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRfc2V0X19nZXQodGhpcywgdW5pdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldF9zZXRfX2dldCAobW9tLCB1bml0KSB7XHJcbiAgICAgICAgcmV0dXJuIG1vbS5pc1ZhbGlkKCkgP1xyXG4gICAgICAgICAgICBtb20uX2RbJ2dldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgdW5pdF0oKSA6IE5hTjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRfc2V0X19zZXQgKG1vbSwgdW5pdCwgdmFsdWUpIHtcclxuICAgICAgICBpZiAobW9tLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICBtb20uX2RbJ3NldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgdW5pdF0odmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0ICh1bml0cywgdmFsdWUpIHtcclxuICAgICAgICB2YXIgdW5pdDtcclxuICAgICAgICBpZiAodHlwZW9mIHVuaXRzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBmb3IgKHVuaXQgaW4gdW5pdHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KHVuaXQsIHVuaXRzW3VuaXRdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xyXG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzW3VuaXRzXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW3VuaXRzXSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gemVyb0ZpbGwobnVtYmVyLCB0YXJnZXRMZW5ndGgsIGZvcmNlU2lnbikge1xyXG4gICAgICAgIHZhciBhYnNOdW1iZXIgPSAnJyArIE1hdGguYWJzKG51bWJlciksXHJcbiAgICAgICAgICAgIHplcm9zVG9GaWxsID0gdGFyZ2V0TGVuZ3RoIC0gYWJzTnVtYmVyLmxlbmd0aCxcclxuICAgICAgICAgICAgc2lnbiA9IG51bWJlciA+PSAwO1xyXG4gICAgICAgIHJldHVybiAoc2lnbiA/IChmb3JjZVNpZ24gPyAnKycgOiAnJykgOiAnLScpICtcclxuICAgICAgICAgICAgTWF0aC5wb3coMTAsIE1hdGgubWF4KDAsIHplcm9zVG9GaWxsKSkudG9TdHJpbmcoKS5zdWJzdHIoMSkgKyBhYnNOdW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGZvcm1hdHRpbmdUb2tlbnMgPSAvKFxcW1teXFxbXSpcXF0pfChcXFxcKT8oW0hoXW1tKHNzKT98TW98TU0/TT9NP3xEb3xERERvfEREP0Q/RD98ZGRkP2Q/fGRvP3x3W298d10/fFdbb3xXXT98UW8/fFlZWVlZWXxZWVlZWXxZWVlZfFlZfGdnKGdnZz8pP3xHRyhHR0c/KT98ZXxFfGF8QXxoaD98SEg/fGtrP3xtbT98c3M/fFN7MSw5fXx4fFh8eno/fFpaP3wuKS9nO1xyXG5cclxuICAgIHZhciBsb2NhbEZvcm1hdHRpbmdUb2tlbnMgPSAvKFxcW1teXFxbXSpcXF0pfChcXFxcKT8oTFRTfExUfExMP0w/TD98bHsxLDR9KS9nO1xyXG5cclxuICAgIHZhciBmb3JtYXRGdW5jdGlvbnMgPSB7fTtcclxuXHJcbiAgICB2YXIgZm9ybWF0VG9rZW5GdW5jdGlvbnMgPSB7fTtcclxuXHJcbiAgICAvLyB0b2tlbjogICAgJ00nXHJcbiAgICAvLyBwYWRkZWQ6ICAgWydNTScsIDJdXHJcbiAgICAvLyBvcmRpbmFsOiAgJ01vJ1xyXG4gICAgLy8gY2FsbGJhY2s6IGZ1bmN0aW9uICgpIHsgdGhpcy5tb250aCgpICsgMSB9XHJcbiAgICBmdW5jdGlvbiBhZGRGb3JtYXRUb2tlbiAodG9rZW4sIHBhZGRlZCwgb3JkaW5hbCwgY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgZnVuYyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGZ1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1tjYWxsYmFja10oKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW3Rva2VuXSA9IGZ1bmM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYWRkZWQpIHtcclxuICAgICAgICAgICAgZm9ybWF0VG9rZW5GdW5jdGlvbnNbcGFkZGVkWzBdXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB6ZXJvRmlsbChmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHBhZGRlZFsxXSwgcGFkZGVkWzJdKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9yZGluYWwpIHtcclxuICAgICAgICAgICAgZm9ybWF0VG9rZW5GdW5jdGlvbnNbb3JkaW5hbF0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkub3JkaW5hbChmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHRva2VuKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlRm9ybWF0dGluZ1Rva2VucyhpbnB1dCkge1xyXG4gICAgICAgIGlmIChpbnB1dC5tYXRjaCgvXFxbW1xcc1xcU10vKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXlxcW3xcXF0kL2csICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL1xcXFwvZywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1ha2VGb3JtYXRGdW5jdGlvbihmb3JtYXQpIHtcclxuICAgICAgICB2YXIgYXJyYXkgPSBmb3JtYXQubWF0Y2goZm9ybWF0dGluZ1Rva2VucyksIGksIGxlbmd0aDtcclxuXHJcbiAgICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGZvcm1hdFRva2VuRnVuY3Rpb25zW2FycmF5W2ldXSkge1xyXG4gICAgICAgICAgICAgICAgYXJyYXlbaV0gPSBmb3JtYXRUb2tlbkZ1bmN0aW9uc1thcnJheVtpXV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhcnJheVtpXSA9IHJlbW92ZUZvcm1hdHRpbmdUb2tlbnMoYXJyYXlbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1vbSkge1xyXG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0gJycsIGk7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IGFycmF5W2ldIGluc3RhbmNlb2YgRnVuY3Rpb24gPyBhcnJheVtpXS5jYWxsKG1vbSwgZm9ybWF0KSA6IGFycmF5W2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBmb3JtYXQgZGF0ZSB1c2luZyBuYXRpdmUgZGF0ZSBvYmplY3RcclxuICAgIGZ1bmN0aW9uIGZvcm1hdE1vbWVudChtLCBmb3JtYXQpIHtcclxuICAgICAgICBpZiAoIW0uaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9ybWF0ID0gZXhwYW5kRm9ybWF0KGZvcm1hdCwgbS5sb2NhbGVEYXRhKCkpO1xyXG4gICAgICAgIGZvcm1hdEZ1bmN0aW9uc1tmb3JtYXRdID0gZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0gfHwgbWFrZUZvcm1hdEZ1bmN0aW9uKGZvcm1hdCk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XShtKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBleHBhbmRGb3JtYXQoZm9ybWF0LCBsb2NhbGUpIHtcclxuICAgICAgICB2YXIgaSA9IDU7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2VMb25nRGF0ZUZvcm1hdFRva2VucyhpbnB1dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlLmxvbmdEYXRlRm9ybWF0KGlucHV0KSB8fCBpbnB1dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy5sYXN0SW5kZXggPSAwO1xyXG4gICAgICAgIHdoaWxlIChpID49IDAgJiYgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLnRlc3QoZm9ybWF0KSkge1xyXG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShsb2NhbEZvcm1hdHRpbmdUb2tlbnMsIHJlcGxhY2VMb25nRGF0ZUZvcm1hdFRva2Vucyk7XHJcbiAgICAgICAgICAgIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy5sYXN0SW5kZXggPSAwO1xyXG4gICAgICAgICAgICBpIC09IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZm9ybWF0O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBtYXRjaDEgICAgICAgICA9IC9cXGQvOyAgICAgICAgICAgIC8vICAgICAgIDAgLSA5XHJcbiAgICB2YXIgbWF0Y2gyICAgICAgICAgPSAvXFxkXFxkLzsgICAgICAgICAgLy8gICAgICAwMCAtIDk5XHJcbiAgICB2YXIgbWF0Y2gzICAgICAgICAgPSAvXFxkezN9LzsgICAgICAgICAvLyAgICAgMDAwIC0gOTk5XHJcbiAgICB2YXIgbWF0Y2g0ICAgICAgICAgPSAvXFxkezR9LzsgICAgICAgICAvLyAgICAwMDAwIC0gOTk5OVxyXG4gICAgdmFyIG1hdGNoNiAgICAgICAgID0gL1srLV0/XFxkezZ9LzsgICAgLy8gLTk5OTk5OSAtIDk5OTk5OVxyXG4gICAgdmFyIG1hdGNoMXRvMiAgICAgID0gL1xcZFxcZD8vOyAgICAgICAgIC8vICAgICAgIDAgLSA5OVxyXG4gICAgdmFyIG1hdGNoM3RvNCAgICAgID0gL1xcZFxcZFxcZFxcZD8vOyAgICAgLy8gICAgIDk5OSAtIDk5OTlcclxuICAgIHZhciBtYXRjaDV0bzYgICAgICA9IC9cXGRcXGRcXGRcXGRcXGRcXGQ/LzsgLy8gICA5OTk5OSAtIDk5OTk5OVxyXG4gICAgdmFyIG1hdGNoMXRvMyAgICAgID0gL1xcZHsxLDN9LzsgICAgICAgLy8gICAgICAgMCAtIDk5OVxyXG4gICAgdmFyIG1hdGNoMXRvNCAgICAgID0gL1xcZHsxLDR9LzsgICAgICAgLy8gICAgICAgMCAtIDk5OTlcclxuICAgIHZhciBtYXRjaDF0bzYgICAgICA9IC9bKy1dP1xcZHsxLDZ9LzsgIC8vIC05OTk5OTkgLSA5OTk5OTlcclxuXHJcbiAgICB2YXIgbWF0Y2hVbnNpZ25lZCAgPSAvXFxkKy87ICAgICAgICAgICAvLyAgICAgICAwIC0gaW5mXHJcbiAgICB2YXIgbWF0Y2hTaWduZWQgICAgPSAvWystXT9cXGQrLzsgICAgICAvLyAgICAtaW5mIC0gaW5mXHJcblxyXG4gICAgdmFyIG1hdGNoT2Zmc2V0ICAgID0gL1p8WystXVxcZFxcZDo/XFxkXFxkL2dpOyAvLyArMDA6MDAgLTAwOjAwICswMDAwIC0wMDAwIG9yIFpcclxuICAgIHZhciBtYXRjaFNob3J0T2Zmc2V0ID0gL1p8WystXVxcZFxcZCg/Ojo/XFxkXFxkKT8vZ2k7IC8vICswMCAtMDAgKzAwOjAwIC0wMDowMCArMDAwMCAtMDAwMCBvciBaXHJcblxyXG4gICAgdmFyIG1hdGNoVGltZXN0YW1wID0gL1srLV0/XFxkKyhcXC5cXGR7MSwzfSk/LzsgLy8gMTIzNDU2Nzg5IDEyMzQ1Njc4OS4xMjNcclxuXHJcbiAgICAvLyBhbnkgd29yZCAob3IgdHdvKSBjaGFyYWN0ZXJzIG9yIG51bWJlcnMgaW5jbHVkaW5nIHR3by90aHJlZSB3b3JkIG1vbnRoIGluIGFyYWJpYy5cclxuICAgIC8vIGluY2x1ZGVzIHNjb3R0aXNoIGdhZWxpYyB0d28gd29yZCBhbmQgaHlwaGVuYXRlZCBtb250aHNcclxuICAgIHZhciBtYXRjaFdvcmQgPSAvWzAtOV0qWydhLXpcXHUwMEEwLVxcdTA1RkZcXHUwNzAwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdK3xbXFx1MDYwMC1cXHUwNkZGXFwvXSsoXFxzKj9bXFx1MDYwMC1cXHUwNkZGXSspezEsMn0vaTtcclxuXHJcblxyXG4gICAgdmFyIHJlZ2V4ZXMgPSB7fTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRSZWdleFRva2VuICh0b2tlbiwgcmVnZXgsIHN0cmljdFJlZ2V4KSB7XHJcbiAgICAgICAgcmVnZXhlc1t0b2tlbl0gPSBpc0Z1bmN0aW9uKHJlZ2V4KSA/IHJlZ2V4IDogZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGVEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaXNTdHJpY3QgJiYgc3RyaWN0UmVnZXgpID8gc3RyaWN0UmVnZXggOiByZWdleDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFBhcnNlUmVnZXhGb3JUb2tlbiAodG9rZW4sIGNvbmZpZykge1xyXG4gICAgICAgIGlmICghaGFzT3duUHJvcChyZWdleGVzLCB0b2tlbikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAodW5lc2NhcGVGb3JtYXQodG9rZW4pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZWdleGVzW3Rva2VuXShjb25maWcuX3N0cmljdCwgY29uZmlnLl9sb2NhbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENvZGUgZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM1NjE0OTMvaXMtdGhlcmUtYS1yZWdleHAtZXNjYXBlLWZ1bmN0aW9uLWluLWphdmFzY3JpcHRcclxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlRm9ybWF0KHMpIHtcclxuICAgICAgICByZXR1cm4gcmVnZXhFc2NhcGUocy5yZXBsYWNlKCdcXFxcJywgJycpLnJlcGxhY2UoL1xcXFwoXFxbKXxcXFxcKFxcXSl8XFxbKFteXFxdXFxbXSopXFxdfFxcXFwoLikvZywgZnVuY3Rpb24gKG1hdGNoZWQsIHAxLCBwMiwgcDMsIHA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwMSB8fCBwMiB8fCBwMyB8fCBwNDtcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVnZXhFc2NhcGUocykge1xyXG4gICAgICAgIHJldHVybiBzLnJlcGxhY2UoL1stXFwvXFxcXF4kKis/LigpfFtcXF17fV0vZywgJ1xcXFwkJicpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0b2tlbnMgPSB7fTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRQYXJzZVRva2VuICh0b2tlbiwgY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgaSwgZnVuYyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRva2VuID0gW3Rva2VuXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgZnVuYyA9IGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIGFycmF5W2NhbGxiYWNrXSA9IHRvSW50KGlucHV0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRva2Vuc1t0b2tlbltpXV0gPSBmdW5jO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRXZWVrUGFyc2VUb2tlbiAodG9rZW4sIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgYWRkUGFyc2VUb2tlbih0b2tlbiwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnLCB0b2tlbikge1xyXG4gICAgICAgICAgICBjb25maWcuX3cgPSBjb25maWcuX3cgfHwge307XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGlucHV0LCBjb25maWcuX3csIGNvbmZpZywgdG9rZW4pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFRpbWVUb0FycmF5RnJvbVRva2VuKHRva2VuLCBpbnB1dCwgY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwgJiYgaGFzT3duUHJvcCh0b2tlbnMsIHRva2VuKSkge1xyXG4gICAgICAgICAgICB0b2tlbnNbdG9rZW5dKGlucHV0LCBjb25maWcuX2EsIGNvbmZpZywgdG9rZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgWUVBUiA9IDA7XHJcbiAgICB2YXIgTU9OVEggPSAxO1xyXG4gICAgdmFyIERBVEUgPSAyO1xyXG4gICAgdmFyIEhPVVIgPSAzO1xyXG4gICAgdmFyIE1JTlVURSA9IDQ7XHJcbiAgICB2YXIgU0VDT05EID0gNTtcclxuICAgIHZhciBNSUxMSVNFQ09ORCA9IDY7XHJcbiAgICB2YXIgV0VFSyA9IDc7XHJcbiAgICB2YXIgV0VFS0RBWSA9IDg7XHJcblxyXG4gICAgdmFyIGluZGV4T2Y7XHJcblxyXG4gICAgaWYgKEFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XHJcbiAgICAgICAgaW5kZXhPZiA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbmRleE9mID0gZnVuY3Rpb24gKG8pIHtcclxuICAgICAgICAgICAgLy8gSSBrbm93XHJcbiAgICAgICAgICAgIHZhciBpO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbaV0gPT09IG8pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkYXlzSW5Nb250aCh5ZWFyLCBtb250aCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQyh5ZWFyLCBtb250aCArIDEsIDApKS5nZXRVVENEYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdNJywgWydNTScsIDJdLCAnTW8nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGgoKSArIDE7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tb250aHNTaG9ydCh0aGlzLCBmb3JtYXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ01NTU0nLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm1vbnRocyh0aGlzLCBmb3JtYXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygnbW9udGgnLCAnTScpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdNJywgICAgbWF0Y2gxdG8yKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ01NJywgICBtYXRjaDF0bzIsIG1hdGNoMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdNTU0nLCAgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcclxuICAgICAgICByZXR1cm4gbG9jYWxlLm1vbnRoc1Nob3J0UmVnZXgoaXNTdHJpY3QpO1xyXG4gICAgfSk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdNTU1NJywgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcclxuICAgICAgICByZXR1cm4gbG9jYWxlLm1vbnRoc1JlZ2V4KGlzU3RyaWN0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZFBhcnNlVG9rZW4oWydNJywgJ01NJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcclxuICAgICAgICBhcnJheVtNT05USF0gPSB0b0ludChpbnB1dCkgLSAxO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkUGFyc2VUb2tlbihbJ01NTScsICdNTU1NJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZywgdG9rZW4pIHtcclxuICAgICAgICB2YXIgbW9udGggPSBjb25maWcuX2xvY2FsZS5tb250aHNQYXJzZShpbnB1dCwgdG9rZW4sIGNvbmZpZy5fc3RyaWN0KTtcclxuICAgICAgICAvLyBpZiB3ZSBkaWRuJ3QgZmluZCBhIG1vbnRoIG5hbWUsIG1hcmsgdGhlIGRhdGUgYXMgaW52YWxpZC5cclxuICAgICAgICBpZiAobW9udGggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBhcnJheVtNT05USF0gPSBtb250aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5pbnZhbGlkTW9udGggPSBpbnB1dDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBMT0NBTEVTXHJcblxyXG4gICAgdmFyIE1PTlRIU19JTl9GT1JNQVQgPSAvRFtvRF0/KFxcW1teXFxbXFxdXSpcXF18XFxzKykrTU1NTT8vO1xyXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVNb250aHMgPSAnSmFudWFyeV9GZWJydWFyeV9NYXJjaF9BcHJpbF9NYXlfSnVuZV9KdWx5X0F1Z3VzdF9TZXB0ZW1iZXJfT2N0b2Jlcl9Ob3ZlbWJlcl9EZWNlbWJlcicuc3BsaXQoJ18nKTtcclxuICAgIGZ1bmN0aW9uIGxvY2FsZU1vbnRocyAobSwgZm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fbW9udGhzKSA/IHRoaXMuX21vbnRoc1ttLm1vbnRoKCldIDpcclxuICAgICAgICAgICAgdGhpcy5fbW9udGhzW01PTlRIU19JTl9GT1JNQVQudGVzdChmb3JtYXQpID8gJ2Zvcm1hdCcgOiAnc3RhbmRhbG9uZSddW20ubW9udGgoKV07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVNb250aHNTaG9ydCA9ICdKYW5fRmViX01hcl9BcHJfTWF5X0p1bl9KdWxfQXVnX1NlcF9PY3RfTm92X0RlYycuc3BsaXQoJ18nKTtcclxuICAgIGZ1bmN0aW9uIGxvY2FsZU1vbnRoc1Nob3J0IChtLCBmb3JtYXQpIHtcclxuICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl9tb250aHNTaG9ydCkgPyB0aGlzLl9tb250aHNTaG9ydFttLm1vbnRoKCldIDpcclxuICAgICAgICAgICAgdGhpcy5fbW9udGhzU2hvcnRbTU9OVEhTX0lOX0ZPUk1BVC50ZXN0KGZvcm1hdCkgPyAnZm9ybWF0JyA6ICdzdGFuZGFsb25lJ11bbS5tb250aCgpXTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1bml0c19tb250aF9faGFuZGxlU3RyaWN0UGFyc2UobW9udGhOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xyXG4gICAgICAgIHZhciBpLCBpaSwgbW9tLCBsbGMgPSBtb250aE5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAoIXRoaXMuX21vbnRoc1BhcnNlKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgbm90IHVzZWRcclxuICAgICAgICAgICAgdGhpcy5fbW9udGhzUGFyc2UgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDEyOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIG1vbSA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyhbMjAwMCwgaV0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXSA9IHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSA9IHRoaXMubW9udGhzKG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdHJpY3QpIHtcclxuICAgICAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ01NTScpIHtcclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0TW9udGhzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbG9uZ01vbnRoc1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdNTU0nKSB7XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydE1vbnRoc1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX2xvbmdNb250aHNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9sb25nTW9udGhzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9jYWxlTW9udGhzUGFyc2UgKG1vbnRoTmFtZSwgZm9ybWF0LCBzdHJpY3QpIHtcclxuICAgICAgICB2YXIgaSwgbW9tLCByZWdleDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21vbnRoc1BhcnNlRXhhY3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuaXRzX21vbnRoX19oYW5kbGVTdHJpY3RQYXJzZS5jYWxsKHRoaXMsIG1vbnRoTmFtZSwgZm9ybWF0LCBzdHJpY3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9tb250aHNQYXJzZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tb250aHNQYXJzZSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2UgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZSA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVE9ETzogYWRkIHNvcnRpbmdcclxuICAgICAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIG1vbnRoIChvciBhYmJyKSBpcyBhIHByZWZpeCBvZiBhbm90aGVyXHJcbiAgICAgICAgLy8gc2VlIHNvcnRpbmcgaW4gY29tcHV0ZU1vbnRoc1BhcnNlXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XHJcbiAgICAgICAgICAgIG1vbSA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyhbMjAwMCwgaV0pO1xyXG4gICAgICAgICAgICBpZiAoc3RyaWN0ICYmICF0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy5tb250aHMobW9tLCAnJykucmVwbGFjZSgnLicsICcnKSArICckJywgJ2knKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykucmVwbGFjZSgnLicsICcnKSArICckJywgJ2knKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXN0cmljdCAmJiAhdGhpcy5fbW9udGhzUGFyc2VbaV0pIHtcclxuICAgICAgICAgICAgICAgIHJlZ2V4ID0gJ14nICsgdGhpcy5tb250aHMobW9tLCAnJykgKyAnfF4nICsgdGhpcy5tb250aHNTaG9ydChtb20sICcnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vbnRoc1BhcnNlW2ldID0gbmV3IFJlZ0V4cChyZWdleC5yZXBsYWNlKCcuJywgJycpLCAnaScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHRlc3QgdGhlIHJlZ2V4XHJcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnTU1NTScgJiYgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldLnRlc3QobW9udGhOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ01NTScgJiYgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXS50ZXN0KG1vbnRoTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFzdHJpY3QgJiYgdGhpcy5fbW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgZnVuY3Rpb24gc2V0TW9udGggKG1vbSwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgZGF5T2ZNb250aDtcclxuXHJcbiAgICAgICAgaWYgKCFtb20uaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIG9wXHJcbiAgICAgICAgICAgIHJldHVybiBtb207XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBpZiAoL15cXGQrJC8udGVzdCh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdG9JbnQodmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBtb20ubG9jYWxlRGF0YSgpLm1vbnRoc1BhcnNlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IEFub3RoZXIgc2lsZW50IGZhaWx1cmU/XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb207XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRheU9mTW9udGggPSBNYXRoLm1pbihtb20uZGF0ZSgpLCBkYXlzSW5Nb250aChtb20ueWVhcigpLCB2YWx1ZSkpO1xyXG4gICAgICAgIG1vbS5fZFsnc2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyAnTW9udGgnXSh2YWx1ZSwgZGF5T2ZNb250aCk7XHJcbiAgICAgICAgcmV0dXJuIG1vbTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXRNb250aCAodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzZXRNb250aCh0aGlzLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQodGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRfc2V0X19nZXQodGhpcywgJ01vbnRoJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldERheXNJbk1vbnRoICgpIHtcclxuICAgICAgICByZXR1cm4gZGF5c0luTW9udGgodGhpcy55ZWFyKCksIHRoaXMubW9udGgoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRNb250aHNTaG9ydFJlZ2V4ID0gbWF0Y2hXb3JkO1xyXG4gICAgZnVuY3Rpb24gbW9udGhzU2hvcnRSZWdleCAoaXNTdHJpY3QpIHtcclxuICAgICAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xyXG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNSZWdleCcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wdXRlTW9udGhzUGFyc2UuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNTdHJpY3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0UmVnZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4IDogdGhpcy5fbW9udGhzU2hvcnRSZWdleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRNb250aHNSZWdleCA9IG1hdGNoV29yZDtcclxuICAgIGZ1bmN0aW9uIG1vbnRoc1JlZ2V4IChpc1N0cmljdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tb250aHNQYXJzZUV4YWN0KSB7XHJcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1JlZ2V4JykpIHtcclxuICAgICAgICAgICAgICAgIGNvbXB1dGVNb250aHNQYXJzZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc1N0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1JlZ2V4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4ICYmIGlzU3RyaWN0ID9cclxuICAgICAgICAgICAgICAgIHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4IDogdGhpcy5fbW9udGhzUmVnZXg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXB1dGVNb250aHNQYXJzZSAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gY21wTGVuUmV2KGEsIGIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc2hvcnRQaWVjZXMgPSBbXSwgbG9uZ1BpZWNlcyA9IFtdLCBtaXhlZFBpZWNlcyA9IFtdLFxyXG4gICAgICAgICAgICBpLCBtb207XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XHJcbiAgICAgICAgICAgIG1vbSA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyhbMjAwMCwgaV0pO1xyXG4gICAgICAgICAgICBzaG9ydFBpZWNlcy5wdXNoKHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykpO1xyXG4gICAgICAgICAgICBsb25nUGllY2VzLnB1c2godGhpcy5tb250aHMobW9tLCAnJykpO1xyXG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKHRoaXMubW9udGhzKG1vbSwgJycpKTtcclxuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaCh0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU29ydGluZyBtYWtlcyBzdXJlIGlmIG9uZSBtb250aCAob3IgYWJicikgaXMgYSBwcmVmaXggb2YgYW5vdGhlciBpdFxyXG4gICAgICAgIC8vIHdpbGwgbWF0Y2ggdGhlIGxvbmdlciBwaWVjZS5cclxuICAgICAgICBzaG9ydFBpZWNlcy5zb3J0KGNtcExlblJldik7XHJcbiAgICAgICAgbG9uZ1BpZWNlcy5zb3J0KGNtcExlblJldik7XHJcbiAgICAgICAgbWl4ZWRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHNob3J0UGllY2VzW2ldID0gcmVnZXhFc2NhcGUoc2hvcnRQaWVjZXNbaV0pO1xyXG4gICAgICAgICAgICBsb25nUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobG9uZ1BpZWNlc1tpXSk7XHJcbiAgICAgICAgICAgIG1peGVkUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobWl4ZWRQaWVjZXNbaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbW9udGhzUmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBtaXhlZFBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XHJcbiAgICAgICAgdGhpcy5fbW9udGhzU2hvcnRSZWdleCA9IHRoaXMuX21vbnRoc1JlZ2V4O1xyXG4gICAgICAgIHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbG9uZ1BpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XHJcbiAgICAgICAgdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIHNob3J0UGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja092ZXJmbG93IChtKSB7XHJcbiAgICAgICAgdmFyIG92ZXJmbG93O1xyXG4gICAgICAgIHZhciBhID0gbS5fYTtcclxuXHJcbiAgICAgICAgaWYgKGEgJiYgZ2V0UGFyc2luZ0ZsYWdzKG0pLm92ZXJmbG93ID09PSAtMikge1xyXG4gICAgICAgICAgICBvdmVyZmxvdyA9XHJcbiAgICAgICAgICAgICAgICBhW01PTlRIXSAgICAgICA8IDAgfHwgYVtNT05USF0gICAgICAgPiAxMSAgPyBNT05USCA6XHJcbiAgICAgICAgICAgICAgICBhW0RBVEVdICAgICAgICA8IDEgfHwgYVtEQVRFXSAgICAgICAgPiBkYXlzSW5Nb250aChhW1lFQVJdLCBhW01PTlRIXSkgPyBEQVRFIDpcclxuICAgICAgICAgICAgICAgIGFbSE9VUl0gICAgICAgIDwgMCB8fCBhW0hPVVJdICAgICAgICA+IDI0IHx8IChhW0hPVVJdID09PSAyNCAmJiAoYVtNSU5VVEVdICE9PSAwIHx8IGFbU0VDT05EXSAhPT0gMCB8fCBhW01JTExJU0VDT05EXSAhPT0gMCkpID8gSE9VUiA6XHJcbiAgICAgICAgICAgICAgICBhW01JTlVURV0gICAgICA8IDAgfHwgYVtNSU5VVEVdICAgICAgPiA1OSAgPyBNSU5VVEUgOlxyXG4gICAgICAgICAgICAgICAgYVtTRUNPTkRdICAgICAgPCAwIHx8IGFbU0VDT05EXSAgICAgID4gNTkgID8gU0VDT05EIDpcclxuICAgICAgICAgICAgICAgIGFbTUlMTElTRUNPTkRdIDwgMCB8fCBhW01JTExJU0VDT05EXSA+IDk5OSA/IE1JTExJU0VDT05EIDpcclxuICAgICAgICAgICAgICAgIC0xO1xyXG5cclxuICAgICAgICAgICAgaWYgKGdldFBhcnNpbmdGbGFncyhtKS5fb3ZlcmZsb3dEYXlPZlllYXIgJiYgKG92ZXJmbG93IDwgWUVBUiB8fCBvdmVyZmxvdyA+IERBVEUpKSB7XHJcbiAgICAgICAgICAgICAgICBvdmVyZmxvdyA9IERBVEU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGdldFBhcnNpbmdGbGFncyhtKS5fb3ZlcmZsb3dXZWVrcyAmJiBvdmVyZmxvdyA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIG92ZXJmbG93ID0gV0VFSztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKG0pLl9vdmVyZmxvd1dlZWtkYXkgJiYgb3ZlcmZsb3cgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBvdmVyZmxvdyA9IFdFRUtEQVk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhtKS5vdmVyZmxvdyA9IG92ZXJmbG93O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaXNvIDg2MDEgcmVnZXhcclxuICAgIC8vIDAwMDAtMDAtMDAgMDAwMC1XMDAgb3IgMDAwMC1XMDAtMCArIFQgKyAwMCBvciAwMDowMCBvciAwMDowMDowMCBvciAwMDowMDowMC4wMDAgKyArMDA6MDAgb3IgKzAwMDAgb3IgKzAwKVxyXG4gICAgdmFyIGV4dGVuZGVkSXNvUmVnZXggPSAvXlxccyooKD86WystXVxcZHs2fXxcXGR7NH0pLSg/OlxcZFxcZC1cXGRcXGR8V1xcZFxcZC1cXGR8V1xcZFxcZHxcXGRcXGRcXGR8XFxkXFxkKSkoPzooVHwgKShcXGRcXGQoPzo6XFxkXFxkKD86OlxcZFxcZCg/OlsuLF1cXGQrKT8pPyk/KShbXFwrXFwtXVxcZFxcZCg/Ojo/XFxkXFxkKT98XFxzKlopPyk/LztcclxuICAgIHZhciBiYXNpY0lzb1JlZ2V4ID0gL15cXHMqKCg/OlsrLV1cXGR7Nn18XFxkezR9KSg/OlxcZFxcZFxcZFxcZHxXXFxkXFxkXFxkfFdcXGRcXGR8XFxkXFxkXFxkfFxcZFxcZCkpKD86KFR8ICkoXFxkXFxkKD86XFxkXFxkKD86XFxkXFxkKD86Wy4sXVxcZCspPyk/KT8pKFtcXCtcXC1dXFxkXFxkKD86Oj9cXGRcXGQpP3xcXHMqWik/KT8vO1xyXG5cclxuICAgIHZhciB0elJlZ2V4ID0gL1p8WystXVxcZFxcZCg/Ojo/XFxkXFxkKT8vO1xyXG5cclxuICAgIHZhciBpc29EYXRlcyA9IFtcclxuICAgICAgICBbJ1lZWVlZWS1NTS1ERCcsIC9bKy1dXFxkezZ9LVxcZFxcZC1cXGRcXGQvXSxcclxuICAgICAgICBbJ1lZWVktTU0tREQnLCAvXFxkezR9LVxcZFxcZC1cXGRcXGQvXSxcclxuICAgICAgICBbJ0dHR0ctW1ddV1ctRScsIC9cXGR7NH0tV1xcZFxcZC1cXGQvXSxcclxuICAgICAgICBbJ0dHR0ctW1ddV1cnLCAvXFxkezR9LVdcXGRcXGQvLCBmYWxzZV0sXHJcbiAgICAgICAgWydZWVlZLURERCcsIC9cXGR7NH0tXFxkezN9L10sXHJcbiAgICAgICAgWydZWVlZLU1NJywgL1xcZHs0fS1cXGRcXGQvLCBmYWxzZV0sXHJcbiAgICAgICAgWydZWVlZWVlNTUREJywgL1srLV1cXGR7MTB9L10sXHJcbiAgICAgICAgWydZWVlZTU1ERCcsIC9cXGR7OH0vXSxcclxuICAgICAgICAvLyBZWVlZTU0gaXMgTk9UIGFsbG93ZWQgYnkgdGhlIHN0YW5kYXJkXHJcbiAgICAgICAgWydHR0dHW1ddV1dFJywgL1xcZHs0fVdcXGR7M30vXSxcclxuICAgICAgICBbJ0dHR0dbV11XVycsIC9cXGR7NH1XXFxkezJ9LywgZmFsc2VdLFxyXG4gICAgICAgIFsnWVlZWURERCcsIC9cXGR7N30vXVxyXG4gICAgXTtcclxuXHJcbiAgICAvLyBpc28gdGltZSBmb3JtYXRzIGFuZCByZWdleGVzXHJcbiAgICB2YXIgaXNvVGltZXMgPSBbXHJcbiAgICAgICAgWydISDptbTpzcy5TU1NTJywgL1xcZFxcZDpcXGRcXGQ6XFxkXFxkXFwuXFxkKy9dLFxyXG4gICAgICAgIFsnSEg6bW06c3MsU1NTUycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZCxcXGQrL10sXHJcbiAgICAgICAgWydISDptbTpzcycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZC9dLFxyXG4gICAgICAgIFsnSEg6bW0nLCAvXFxkXFxkOlxcZFxcZC9dLFxyXG4gICAgICAgIFsnSEhtbXNzLlNTU1MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkXFwuXFxkKy9dLFxyXG4gICAgICAgIFsnSEhtbXNzLFNTU1MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkLFxcZCsvXSxcclxuICAgICAgICBbJ0hIbW1zcycsIC9cXGRcXGRcXGRcXGRcXGRcXGQvXSxcclxuICAgICAgICBbJ0hIbW0nLCAvXFxkXFxkXFxkXFxkL10sXHJcbiAgICAgICAgWydISCcsIC9cXGRcXGQvXVxyXG4gICAgXTtcclxuXHJcbiAgICB2YXIgYXNwTmV0SnNvblJlZ2V4ID0gL15cXC8/RGF0ZVxcKChcXC0/XFxkKykvaTtcclxuXHJcbiAgICAvLyBkYXRlIGZyb20gaXNvIGZvcm1hdFxyXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbUlTTyhjb25maWcpIHtcclxuICAgICAgICB2YXIgaSwgbCxcclxuICAgICAgICAgICAgc3RyaW5nID0gY29uZmlnLl9pLFxyXG4gICAgICAgICAgICBtYXRjaCA9IGV4dGVuZGVkSXNvUmVnZXguZXhlYyhzdHJpbmcpIHx8IGJhc2ljSXNvUmVnZXguZXhlYyhzdHJpbmcpLFxyXG4gICAgICAgICAgICBhbGxvd1RpbWUsIGRhdGVGb3JtYXQsIHRpbWVGb3JtYXQsIHR6Rm9ybWF0O1xyXG5cclxuICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaXNvID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGwgPSBpc29EYXRlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc29EYXRlc1tpXVsxXS5leGVjKG1hdGNoWzFdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQgPSBpc29EYXRlc1tpXVswXTtcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1RpbWUgPSBpc29EYXRlc1tpXVsyXSAhPT0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGVGb3JtYXQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1hdGNoWzNdKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gaXNvVGltZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzb1RpbWVzW2ldWzFdLmV4ZWMobWF0Y2hbM10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoWzJdIHNob3VsZCBiZSAnVCcgb3Igc3BhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZUZvcm1hdCA9IChtYXRjaFsyXSB8fCAnICcpICsgaXNvVGltZXNbaV1bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aW1lRm9ybWF0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFhbGxvd1RpbWUgJiYgdGltZUZvcm1hdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWF0Y2hbNF0pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0elJlZ2V4LmV4ZWMobWF0Y2hbNF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHpGb3JtYXQgPSAnWic7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25maWcuX2YgPSBkYXRlRm9ybWF0ICsgKHRpbWVGb3JtYXQgfHwgJycpICsgKHR6Rm9ybWF0IHx8ICcnKTtcclxuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdChjb25maWcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkYXRlIGZyb20gaXNvIGZvcm1hdCBvciBmYWxsYmFja1xyXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZyhjb25maWcpIHtcclxuICAgICAgICB2YXIgbWF0Y2hlZCA9IGFzcE5ldEpzb25SZWdleC5leGVjKGNvbmZpZy5faSk7XHJcblxyXG4gICAgICAgIGlmIChtYXRjaGVkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKCttYXRjaGVkWzFdKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uZmlnRnJvbUlTTyhjb25maWcpO1xyXG4gICAgICAgIGlmIChjb25maWcuX2lzVmFsaWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb25maWcuX2lzVmFsaWQ7XHJcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayhjb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1dGlsc19ob29rc19faG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgPSBkZXByZWNhdGUoXHJcbiAgICAgICAgJ21vbWVudCBjb25zdHJ1Y3Rpb24gZmFsbHMgYmFjayB0byBqcyBEYXRlLiBUaGlzIGlzICcgK1xyXG4gICAgICAgICdkaXNjb3VyYWdlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHVwY29taW5nIG1ham9yICcgK1xyXG4gICAgICAgICdyZWxlYXNlLiBQbGVhc2UgcmVmZXIgdG8gJyArXHJcbiAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNDA3IGZvciBtb3JlIGluZm8uJyxcclxuICAgICAgICBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5faSArIChjb25maWcuX3VzZVVUQyA/ICcgVVRDJyA6ICcnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVEYXRlICh5LCBtLCBkLCBoLCBNLCBzLCBtcykge1xyXG4gICAgICAgIC8vY2FuJ3QganVzdCBhcHBseSgpIHRvIGNyZWF0ZSBhIGRhdGU6XHJcbiAgICAgICAgLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE4MTM0OC9pbnN0YW50aWF0aW5nLWEtamF2YXNjcmlwdC1vYmplY3QtYnktY2FsbGluZy1wcm90b3R5cGUtY29uc3RydWN0b3ItYXBwbHlcclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHksIG0sIGQsIGgsIE0sIHMsIG1zKTtcclxuXHJcbiAgICAgICAgLy90aGUgZGF0ZSBjb25zdHJ1Y3RvciByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcclxuICAgICAgICBpZiAoeSA8IDEwMCAmJiB5ID49IDAgJiYgaXNGaW5pdGUoZGF0ZS5nZXRGdWxsWWVhcigpKSkge1xyXG4gICAgICAgICAgICBkYXRlLnNldEZ1bGxZZWFyKHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVVVENEYXRlICh5KSB7XHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQy5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcclxuXHJcbiAgICAgICAgLy90aGUgRGF0ZS5VVEMgZnVuY3Rpb24gcmVtYXBzIHllYXJzIDAtOTkgdG8gMTkwMC0xOTk5XHJcbiAgICAgICAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwICYmIGlzRmluaXRlKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSkpIHtcclxuICAgICAgICAgICAgZGF0ZS5zZXRVVENGdWxsWWVhcih5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdZJywgMCwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB5ID0gdGhpcy55ZWFyKCk7XHJcbiAgICAgICAgcmV0dXJuIHkgPD0gOTk5OSA/ICcnICsgeSA6ICcrJyArIHk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy55ZWFyKCkgJSAxMDA7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVknLCAgIDRdLCAgICAgICAwLCAneWVhcicpO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydZWVlZWScsICA1XSwgICAgICAgMCwgJ3llYXInKTtcclxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWVlZJywgNiwgdHJ1ZV0sIDAsICd5ZWFyJyk7XHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygneWVhcicsICd5Jyk7XHJcblxyXG4gICAgLy8gUEFSU0lOR1xyXG5cclxuICAgIGFkZFJlZ2V4VG9rZW4oJ1knLCAgICAgIG1hdGNoU2lnbmVkKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ1lZJywgICAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ1lZWVknLCAgIG1hdGNoMXRvNCwgbWF0Y2g0KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ1lZWVlZJywgIG1hdGNoMXRvNiwgbWF0Y2g2KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ1lZWVlZWScsIG1hdGNoMXRvNiwgbWF0Y2g2KTtcclxuXHJcbiAgICBhZGRQYXJzZVRva2VuKFsnWVlZWVknLCAnWVlZWVlZJ10sIFlFQVIpO1xyXG4gICAgYWRkUGFyc2VUb2tlbignWVlZWScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcclxuICAgICAgICBhcnJheVtZRUFSXSA9IGlucHV0Lmxlbmd0aCA9PT0gMiA/IHV0aWxzX2hvb2tzX19ob29rcy5wYXJzZVR3b0RpZ2l0WWVhcihpbnB1dCkgOiB0b0ludChpbnB1dCk7XHJcbiAgICB9KTtcclxuICAgIGFkZFBhcnNlVG9rZW4oJ1lZJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xyXG4gICAgICAgIGFycmF5W1lFQVJdID0gdXRpbHNfaG9va3NfX2hvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KTtcclxuICAgIH0pO1xyXG4gICAgYWRkUGFyc2VUb2tlbignWScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcclxuICAgICAgICBhcnJheVtZRUFSXSA9IHBhcnNlSW50KGlucHV0LCAxMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIRUxQRVJTXHJcblxyXG4gICAgZnVuY3Rpb24gZGF5c0luWWVhcih5ZWFyKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzTGVhcFllYXIoeWVhcikgPyAzNjYgOiAzNjU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNMZWFwWWVhcih5ZWFyKSB7XHJcbiAgICAgICAgcmV0dXJuICh5ZWFyICUgNCA9PT0gMCAmJiB5ZWFyICUgMTAwICE9PSAwKSB8fCB5ZWFyICUgNDAwID09PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhPT0tTXHJcblxyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnBhcnNlVHdvRGlnaXRZZWFyID0gZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRvSW50KGlucHV0KSArICh0b0ludChpbnB1dCkgPiA2OCA/IDE5MDAgOiAyMDAwKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIHZhciBnZXRTZXRZZWFyID0gbWFrZUdldFNldCgnRnVsbFllYXInLCB0cnVlKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRJc0xlYXBZZWFyICgpIHtcclxuICAgICAgICByZXR1cm4gaXNMZWFwWWVhcih0aGlzLnllYXIoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RhcnQtb2YtZmlyc3Qtd2VlayAtIHN0YXJ0LW9mLXllYXJcclxuICAgIGZ1bmN0aW9uIGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSkge1xyXG4gICAgICAgIHZhciAvLyBmaXJzdC13ZWVrIGRheSAtLSB3aGljaCBqYW51YXJ5IGlzIGFsd2F5cyBpbiB0aGUgZmlyc3Qgd2VlayAoNCBmb3IgaXNvLCAxIGZvciBvdGhlcilcclxuICAgICAgICAgICAgZndkID0gNyArIGRvdyAtIGRveSxcclxuICAgICAgICAgICAgLy8gZmlyc3Qtd2VlayBkYXkgbG9jYWwgd2Vla2RheSAtLSB3aGljaCBsb2NhbCB3ZWVrZGF5IGlzIGZ3ZFxyXG4gICAgICAgICAgICBmd2RsdyA9ICg3ICsgY3JlYXRlVVRDRGF0ZSh5ZWFyLCAwLCBmd2QpLmdldFVUQ0RheSgpIC0gZG93KSAlIDc7XHJcblxyXG4gICAgICAgIHJldHVybiAtZndkbHcgKyBmd2QgLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8vaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlI0NhbGN1bGF0aW5nX2FfZGF0ZV9naXZlbl90aGVfeWVhci4yQ193ZWVrX251bWJlcl9hbmRfd2Vla2RheVxyXG4gICAgZnVuY3Rpb24gZGF5T2ZZZWFyRnJvbVdlZWtzKHllYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSB7XHJcbiAgICAgICAgdmFyIGxvY2FsV2Vla2RheSA9ICg3ICsgd2Vla2RheSAtIGRvdykgJSA3LFxyXG4gICAgICAgICAgICB3ZWVrT2Zmc2V0ID0gZmlyc3RXZWVrT2Zmc2V0KHllYXIsIGRvdywgZG95KSxcclxuICAgICAgICAgICAgZGF5T2ZZZWFyID0gMSArIDcgKiAod2VlayAtIDEpICsgbG9jYWxXZWVrZGF5ICsgd2Vla09mZnNldCxcclxuICAgICAgICAgICAgcmVzWWVhciwgcmVzRGF5T2ZZZWFyO1xyXG5cclxuICAgICAgICBpZiAoZGF5T2ZZZWFyIDw9IDApIHtcclxuICAgICAgICAgICAgcmVzWWVhciA9IHllYXIgLSAxO1xyXG4gICAgICAgICAgICByZXNEYXlPZlllYXIgPSBkYXlzSW5ZZWFyKHJlc1llYXIpICsgZGF5T2ZZZWFyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF5T2ZZZWFyID4gZGF5c0luWWVhcih5ZWFyKSkge1xyXG4gICAgICAgICAgICByZXNZZWFyID0geWVhciArIDE7XHJcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhciAtIGRheXNJblllYXIoeWVhcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzWWVhciA9IHllYXI7XHJcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHllYXI6IHJlc1llYXIsXHJcbiAgICAgICAgICAgIGRheU9mWWVhcjogcmVzRGF5T2ZZZWFyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3ZWVrT2ZZZWFyKG1vbSwgZG93LCBkb3kpIHtcclxuICAgICAgICB2YXIgd2Vla09mZnNldCA9IGZpcnN0V2Vla09mZnNldChtb20ueWVhcigpLCBkb3csIGRveSksXHJcbiAgICAgICAgICAgIHdlZWsgPSBNYXRoLmZsb29yKChtb20uZGF5T2ZZZWFyKCkgLSB3ZWVrT2Zmc2V0IC0gMSkgLyA3KSArIDEsXHJcbiAgICAgICAgICAgIHJlc1dlZWssIHJlc1llYXI7XHJcblxyXG4gICAgICAgIGlmICh3ZWVrIDwgMSkge1xyXG4gICAgICAgICAgICByZXNZZWFyID0gbW9tLnllYXIoKSAtIDE7XHJcbiAgICAgICAgICAgIHJlc1dlZWsgPSB3ZWVrICsgd2Vla3NJblllYXIocmVzWWVhciwgZG93LCBkb3kpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAod2VlayA+IHdlZWtzSW5ZZWFyKG1vbS55ZWFyKCksIGRvdywgZG95KSkge1xyXG4gICAgICAgICAgICByZXNXZWVrID0gd2VlayAtIHdlZWtzSW5ZZWFyKG1vbS55ZWFyKCksIGRvdywgZG95KTtcclxuICAgICAgICAgICAgcmVzWWVhciA9IG1vbS55ZWFyKCkgKyAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc1llYXIgPSBtb20ueWVhcigpO1xyXG4gICAgICAgICAgICByZXNXZWVrID0gd2VlaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdlZWs6IHJlc1dlZWssXHJcbiAgICAgICAgICAgIHllYXI6IHJlc1llYXJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdlZWtzSW5ZZWFyKHllYXIsIGRvdywgZG95KSB7XHJcbiAgICAgICAgdmFyIHdlZWtPZmZzZXQgPSBmaXJzdFdlZWtPZmZzZXQoeWVhciwgZG93LCBkb3kpLFxyXG4gICAgICAgICAgICB3ZWVrT2Zmc2V0TmV4dCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyICsgMSwgZG93LCBkb3kpO1xyXG4gICAgICAgIHJldHVybiAoZGF5c0luWWVhcih5ZWFyKSAtIHdlZWtPZmZzZXQgKyB3ZWVrT2Zmc2V0TmV4dCkgLyA3O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFBpY2sgdGhlIGZpcnN0IGRlZmluZWQgb2YgdHdvIG9yIHRocmVlIGFyZ3VtZW50cy5cclxuICAgIGZ1bmN0aW9uIGRlZmF1bHRzKGEsIGIsIGMpIHtcclxuICAgICAgICBpZiAoYSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjdXJyZW50RGF0ZUFycmF5KGNvbmZpZykge1xyXG4gICAgICAgIC8vIGhvb2tzIGlzIGFjdHVhbGx5IHRoZSBleHBvcnRlZCBtb21lbnQgb2JqZWN0XHJcbiAgICAgICAgdmFyIG5vd1ZhbHVlID0gbmV3IERhdGUodXRpbHNfaG9va3NfX2hvb2tzLm5vdygpKTtcclxuICAgICAgICBpZiAoY29uZmlnLl91c2VVVEMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtub3dWYWx1ZS5nZXRVVENGdWxsWWVhcigpLCBub3dWYWx1ZS5nZXRVVENNb250aCgpLCBub3dWYWx1ZS5nZXRVVENEYXRlKCldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW25vd1ZhbHVlLmdldEZ1bGxZZWFyKCksIG5vd1ZhbHVlLmdldE1vbnRoKCksIG5vd1ZhbHVlLmdldERhdGUoKV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29udmVydCBhbiBhcnJheSB0byBhIGRhdGUuXHJcbiAgICAvLyB0aGUgYXJyYXkgc2hvdWxkIG1pcnJvciB0aGUgcGFyYW1ldGVycyBiZWxvd1xyXG4gICAgLy8gbm90ZTogYWxsIHZhbHVlcyBwYXN0IHRoZSB5ZWFyIGFyZSBvcHRpb25hbCBhbmQgd2lsbCBkZWZhdWx0IHRvIHRoZSBsb3dlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAgICAvLyBbeWVhciwgbW9udGgsIGRheSAsIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBtaWxsaXNlY29uZF1cclxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21BcnJheSAoY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIGksIGRhdGUsIGlucHV0ID0gW10sIGN1cnJlbnREYXRlLCB5ZWFyVG9Vc2U7XHJcblxyXG4gICAgICAgIGlmIChjb25maWcuX2QpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3VycmVudERhdGUgPSBjdXJyZW50RGF0ZUFycmF5KGNvbmZpZyk7XHJcblxyXG4gICAgICAgIC8vY29tcHV0ZSBkYXkgb2YgdGhlIHllYXIgZnJvbSB3ZWVrcyBhbmQgd2Vla2RheXNcclxuICAgICAgICBpZiAoY29uZmlnLl93ICYmIGNvbmZpZy5fYVtEQVRFXSA9PSBudWxsICYmIGNvbmZpZy5fYVtNT05USF0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBkYXlPZlllYXJGcm9tV2Vla0luZm8oY29uZmlnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaWYgdGhlIGRheSBvZiB0aGUgeWVhciBpcyBzZXQsIGZpZ3VyZSBvdXQgd2hhdCBpdCBpc1xyXG4gICAgICAgIGlmIChjb25maWcuX2RheU9mWWVhcikge1xyXG4gICAgICAgICAgICB5ZWFyVG9Vc2UgPSBkZWZhdWx0cyhjb25maWcuX2FbWUVBUl0sIGN1cnJlbnREYXRlW1lFQVJdKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25maWcuX2RheU9mWWVhciA+IGRheXNJblllYXIoeWVhclRvVXNlKSkge1xyXG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93RGF5T2ZZZWFyID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGF0ZSA9IGNyZWF0ZVVUQ0RhdGUoeWVhclRvVXNlLCAwLCBjb25maWcuX2RheU9mWWVhcik7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fYVtNT05USF0gPSBkYXRlLmdldFVUQ01vbnRoKCk7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fYVtEQVRFXSA9IGRhdGUuZ2V0VVRDRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRGVmYXVsdCB0byBjdXJyZW50IGRhdGUuXHJcbiAgICAgICAgLy8gKiBpZiBubyB5ZWFyLCBtb250aCwgZGF5IG9mIG1vbnRoIGFyZSBnaXZlbiwgZGVmYXVsdCB0byB0b2RheVxyXG4gICAgICAgIC8vICogaWYgZGF5IG9mIG1vbnRoIGlzIGdpdmVuLCBkZWZhdWx0IG1vbnRoIGFuZCB5ZWFyXHJcbiAgICAgICAgLy8gKiBpZiBtb250aCBpcyBnaXZlbiwgZGVmYXVsdCBvbmx5IHllYXJcclxuICAgICAgICAvLyAqIGlmIHllYXIgaXMgZ2l2ZW4sIGRvbid0IGRlZmF1bHQgYW55dGhpbmdcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMyAmJiBjb25maWcuX2FbaV0gPT0gbnVsbDsgKytpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fYVtpXSA9IGlucHV0W2ldID0gY3VycmVudERhdGVbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBaZXJvIG91dCB3aGF0ZXZlciB3YXMgbm90IGRlZmF1bHRlZCwgaW5jbHVkaW5nIHRpbWVcclxuICAgICAgICBmb3IgKDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICBjb25maWcuX2FbaV0gPSBpbnB1dFtpXSA9IChjb25maWcuX2FbaV0gPT0gbnVsbCkgPyAoaSA9PT0gMiA/IDEgOiAwKSA6IGNvbmZpZy5fYVtpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciAyNDowMDowMC4wMDBcclxuICAgICAgICBpZiAoY29uZmlnLl9hW0hPVVJdID09PSAyNCAmJlxyXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW01JTlVURV0gPT09IDAgJiZcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtTRUNPTkRdID09PSAwICYmXHJcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbTUlMTElTRUNPTkRdID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fbmV4dERheSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25maWcuX2QgPSAoY29uZmlnLl91c2VVVEMgPyBjcmVhdGVVVENEYXRlIDogY3JlYXRlRGF0ZSkuYXBwbHkobnVsbCwgaW5wdXQpO1xyXG4gICAgICAgIC8vIEFwcGx5IHRpbWV6b25lIG9mZnNldCBmcm9tIGlucHV0LiBUaGUgYWN0dWFsIHV0Y09mZnNldCBjYW4gYmUgY2hhbmdlZFxyXG4gICAgICAgIC8vIHdpdGggcGFyc2Vab25lLlxyXG4gICAgICAgIGlmIChjb25maWcuX3R6bSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fZC5zZXRVVENNaW51dGVzKGNvbmZpZy5fZC5nZXRVVENNaW51dGVzKCkgLSBjb25maWcuX3R6bSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY29uZmlnLl9uZXh0RGF5KSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IDI0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkYXlPZlllYXJGcm9tV2Vla0luZm8oY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHcsIHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSwgdGVtcCwgd2Vla2RheU92ZXJmbG93O1xyXG5cclxuICAgICAgICB3ID0gY29uZmlnLl93O1xyXG4gICAgICAgIGlmICh3LkdHICE9IG51bGwgfHwgdy5XICE9IG51bGwgfHwgdy5FICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZG93ID0gMTtcclxuICAgICAgICAgICAgZG95ID0gNDtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IFdlIG5lZWQgdG8gdGFrZSB0aGUgY3VycmVudCBpc29XZWVrWWVhciwgYnV0IHRoYXQgZGVwZW5kcyBvblxyXG4gICAgICAgICAgICAvLyBob3cgd2UgaW50ZXJwcmV0IG5vdyAobG9jYWwsIHV0YywgZml4ZWQgb2Zmc2V0KS4gU28gY3JlYXRlXHJcbiAgICAgICAgICAgIC8vIGEgbm93IHZlcnNpb24gb2YgY3VycmVudCBjb25maWcgKHRha2UgbG9jYWwvdXRjL29mZnNldCBmbGFncywgYW5kXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBub3cpLlxyXG4gICAgICAgICAgICB3ZWVrWWVhciA9IGRlZmF1bHRzKHcuR0csIGNvbmZpZy5fYVtZRUFSXSwgd2Vla09mWWVhcihsb2NhbF9fY3JlYXRlTG9jYWwoKSwgMSwgNCkueWVhcik7XHJcbiAgICAgICAgICAgIHdlZWsgPSBkZWZhdWx0cyh3LlcsIDEpO1xyXG4gICAgICAgICAgICB3ZWVrZGF5ID0gZGVmYXVsdHMody5FLCAxKTtcclxuICAgICAgICAgICAgaWYgKHdlZWtkYXkgPCAxIHx8IHdlZWtkYXkgPiA3KSB7XHJcbiAgICAgICAgICAgICAgICB3ZWVrZGF5T3ZlcmZsb3cgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZG93ID0gY29uZmlnLl9sb2NhbGUuX3dlZWsuZG93O1xyXG4gICAgICAgICAgICBkb3kgPSBjb25maWcuX2xvY2FsZS5fd2Vlay5kb3k7XHJcblxyXG4gICAgICAgICAgICB3ZWVrWWVhciA9IGRlZmF1bHRzKHcuZ2csIGNvbmZpZy5fYVtZRUFSXSwgd2Vla09mWWVhcihsb2NhbF9fY3JlYXRlTG9jYWwoKSwgZG93LCBkb3kpLnllYXIpO1xyXG4gICAgICAgICAgICB3ZWVrID0gZGVmYXVsdHMody53LCAxKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh3LmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gd2Vla2RheSAtLSBsb3cgZGF5IG51bWJlcnMgYXJlIGNvbnNpZGVyZWQgbmV4dCB3ZWVrXHJcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gdy5kO1xyXG4gICAgICAgICAgICAgICAgaWYgKHdlZWtkYXkgPCAwIHx8IHdlZWtkYXkgPiA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh3LmUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gbG9jYWwgd2Vla2RheSAtLSBjb3VudGluZyBzdGFydHMgZnJvbSBiZWdpbmluZyBvZiB3ZWVrXHJcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gdy5lICsgZG93O1xyXG4gICAgICAgICAgICAgICAgaWYgKHcuZSA8IDAgfHwgdy5lID4gNikge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlZWtkYXlPdmVyZmxvdyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IHRvIGJlZ2luaW5nIG9mIHdlZWtcclxuICAgICAgICAgICAgICAgIHdlZWtkYXkgPSBkb3c7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHdlZWsgPCAxIHx8IHdlZWsgPiB3ZWVrc0luWWVhcih3ZWVrWWVhciwgZG93LCBkb3kpKSB7XHJcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLl9vdmVyZmxvd1dlZWtzID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHdlZWtkYXlPdmVyZmxvdyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLl9vdmVyZmxvd1dlZWtkYXkgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlbXAgPSBkYXlPZlllYXJGcm9tV2Vla3Mod2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KTtcclxuICAgICAgICAgICAgY29uZmlnLl9hW1lFQVJdID0gdGVtcC55ZWFyO1xyXG4gICAgICAgICAgICBjb25maWcuX2RheU9mWWVhciA9IHRlbXAuZGF5T2ZZZWFyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zdGFudCB0aGF0IHJlZmVycyB0byB0aGUgSVNPIHN0YW5kYXJkXHJcbiAgICB1dGlsc19ob29rc19faG9va3MuSVNPXzg2MDEgPSBmdW5jdGlvbiAoKSB7fTtcclxuXHJcbiAgICAvLyBkYXRlIGZyb20gc3RyaW5nIGFuZCBmb3JtYXQgc3RyaW5nXHJcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KGNvbmZpZykge1xyXG4gICAgICAgIC8vIFRPRE86IE1vdmUgdGhpcyB0byBhbm90aGVyIHBhcnQgb2YgdGhlIGNyZWF0aW9uIGZsb3cgdG8gcHJldmVudCBjaXJjdWxhciBkZXBzXHJcbiAgICAgICAgaWYgKGNvbmZpZy5fZiA9PT0gdXRpbHNfaG9va3NfX2hvb2tzLklTT184NjAxKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21JU08oY29uZmlnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uZmlnLl9hID0gW107XHJcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuZW1wdHkgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBUaGlzIGFycmF5IGlzIHVzZWQgdG8gbWFrZSBhIERhdGUsIGVpdGhlciB3aXRoIGBuZXcgRGF0ZWAgb3IgYERhdGUuVVRDYFxyXG4gICAgICAgIHZhciBzdHJpbmcgPSAnJyArIGNvbmZpZy5faSxcclxuICAgICAgICAgICAgaSwgcGFyc2VkSW5wdXQsIHRva2VucywgdG9rZW4sIHNraXBwZWQsXHJcbiAgICAgICAgICAgIHN0cmluZ0xlbmd0aCA9IHN0cmluZy5sZW5ndGgsXHJcbiAgICAgICAgICAgIHRvdGFsUGFyc2VkSW5wdXRMZW5ndGggPSAwO1xyXG5cclxuICAgICAgICB0b2tlbnMgPSBleHBhbmRGb3JtYXQoY29uZmlnLl9mLCBjb25maWcuX2xvY2FsZSkubWF0Y2goZm9ybWF0dGluZ1Rva2VucykgfHwgW107XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XHJcbiAgICAgICAgICAgIHBhcnNlZElucHV0ID0gKHN0cmluZy5tYXRjaChnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4odG9rZW4sIGNvbmZpZykpIHx8IFtdKVswXTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Rva2VuJywgdG9rZW4sICdwYXJzZWRJbnB1dCcsIHBhcnNlZElucHV0LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICdyZWdleCcsIGdldFBhcnNlUmVnZXhGb3JUb2tlbih0b2tlbiwgY29uZmlnKSk7XHJcbiAgICAgICAgICAgIGlmIChwYXJzZWRJbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgc2tpcHBlZCA9IHN0cmluZy5zdWJzdHIoMCwgc3RyaW5nLmluZGV4T2YocGFyc2VkSW5wdXQpKTtcclxuICAgICAgICAgICAgICAgIGlmIChza2lwcGVkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRJbnB1dC5wdXNoKHNraXBwZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RyaW5nID0gc3RyaW5nLnNsaWNlKHN0cmluZy5pbmRleE9mKHBhcnNlZElucHV0KSArIHBhcnNlZElucHV0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB0b3RhbFBhcnNlZElucHV0TGVuZ3RoICs9IHBhcnNlZElucHV0Lmxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBkb24ndCBwYXJzZSBpZiBpdCdzIG5vdCBhIGtub3duIHRva2VuXHJcbiAgICAgICAgICAgIGlmIChmb3JtYXRUb2tlbkZ1bmN0aW9uc1t0b2tlbl0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZWRJbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmVtcHR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRUb2tlbnMucHVzaCh0b2tlbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhZGRUaW1lVG9BcnJheUZyb21Ub2tlbih0b2tlbiwgcGFyc2VkSW5wdXQsIGNvbmZpZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY29uZmlnLl9zdHJpY3QgJiYgIXBhcnNlZElucHV0KSB7XHJcbiAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRUb2tlbnMucHVzaCh0b2tlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGFkZCByZW1haW5pbmcgdW5wYXJzZWQgaW5wdXQgbGVuZ3RoIHRvIHRoZSBzdHJpbmdcclxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5jaGFyc0xlZnRPdmVyID0gc3RyaW5nTGVuZ3RoIC0gdG90YWxQYXJzZWRJbnB1dExlbmd0aDtcclxuICAgICAgICBpZiAoc3RyaW5nLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkSW5wdXQucHVzaChzdHJpbmcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY2xlYXIgXzEyaCBmbGFnIGlmIGhvdXIgaXMgPD0gMTJcclxuICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9PT0gdHJ1ZSAmJlxyXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdIDw9IDEyICYmXHJcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbSE9VUl0gPiAwKSB7XHJcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5wYXJzZWREYXRlUGFydHMgPSBjb25maWcuX2Euc2xpY2UoMCk7XHJcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykubWVyaWRpZW0gPSBjb25maWcuX21lcmlkaWVtO1xyXG4gICAgICAgIC8vIGhhbmRsZSBtZXJpZGllbVxyXG4gICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IG1lcmlkaWVtRml4V3JhcChjb25maWcuX2xvY2FsZSwgY29uZmlnLl9hW0hPVVJdLCBjb25maWcuX21lcmlkaWVtKTtcclxuXHJcbiAgICAgICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XHJcbiAgICAgICAgY2hlY2tPdmVyZmxvdyhjb25maWcpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBtZXJpZGllbUZpeFdyYXAgKGxvY2FsZSwgaG91ciwgbWVyaWRpZW0pIHtcclxuICAgICAgICB2YXIgaXNQbTtcclxuXHJcbiAgICAgICAgaWYgKG1lcmlkaWVtID09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gbm90aGluZyB0byBkb1xyXG4gICAgICAgICAgICByZXR1cm4gaG91cjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxvY2FsZS5tZXJpZGllbUhvdXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlLm1lcmlkaWVtSG91cihob3VyLCBtZXJpZGllbSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2NhbGUuaXNQTSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vIEZhbGxiYWNrXHJcbiAgICAgICAgICAgIGlzUG0gPSBsb2NhbGUuaXNQTShtZXJpZGllbSk7XHJcbiAgICAgICAgICAgIGlmIChpc1BtICYmIGhvdXIgPCAxMikge1xyXG4gICAgICAgICAgICAgICAgaG91ciArPSAxMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzUG0gJiYgaG91ciA9PT0gMTIpIHtcclxuICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBob3VyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgbm90IHN1cHBvc2VkIHRvIGhhcHBlblxyXG4gICAgICAgICAgICByZXR1cm4gaG91cjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGF0ZSBmcm9tIHN0cmluZyBhbmQgYXJyYXkgb2YgZm9ybWF0IHN0cmluZ3NcclxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21TdHJpbmdBbmRBcnJheShjb25maWcpIHtcclxuICAgICAgICB2YXIgdGVtcENvbmZpZyxcclxuICAgICAgICAgICAgYmVzdE1vbWVudCxcclxuXHJcbiAgICAgICAgICAgIHNjb3JlVG9CZWF0LFxyXG4gICAgICAgICAgICBpLFxyXG4gICAgICAgICAgICBjdXJyZW50U2NvcmU7XHJcblxyXG4gICAgICAgIGlmIChjb25maWcuX2YubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmludmFsaWRGb3JtYXQgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShOYU4pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29uZmlnLl9mLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSA9IDA7XHJcbiAgICAgICAgICAgIHRlbXBDb25maWcgPSBjb3B5Q29uZmlnKHt9LCBjb25maWcpO1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnLl91c2VVVEMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGVtcENvbmZpZy5fdXNlVVRDID0gY29uZmlnLl91c2VVVEM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGVtcENvbmZpZy5fZiA9IGNvbmZpZy5fZltpXTtcclxuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdCh0ZW1wQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdmFsaWRfX2lzVmFsaWQodGVtcENvbmZpZykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbnkgaW5wdXQgdGhhdCB3YXMgbm90IHBhcnNlZCBhZGQgYSBwZW5hbHR5IGZvciB0aGF0IGZvcm1hdFxyXG4gICAgICAgICAgICBjdXJyZW50U2NvcmUgKz0gZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLmNoYXJzTGVmdE92ZXI7XHJcblxyXG4gICAgICAgICAgICAvL29yIHRva2Vuc1xyXG4gICAgICAgICAgICBjdXJyZW50U2NvcmUgKz0gZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLnVudXNlZFRva2Vucy5sZW5ndGggKiAxMDtcclxuXHJcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyh0ZW1wQ29uZmlnKS5zY29yZSA9IGN1cnJlbnRTY29yZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzY29yZVRvQmVhdCA9PSBudWxsIHx8IGN1cnJlbnRTY29yZSA8IHNjb3JlVG9CZWF0KSB7XHJcbiAgICAgICAgICAgICAgICBzY29yZVRvQmVhdCA9IGN1cnJlbnRTY29yZTtcclxuICAgICAgICAgICAgICAgIGJlc3RNb21lbnQgPSB0ZW1wQ29uZmlnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHRlbmQoY29uZmlnLCBiZXN0TW9tZW50IHx8IHRlbXBDb25maWcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21PYmplY3QoY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5fZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaSA9IG5vcm1hbGl6ZU9iamVjdFVuaXRzKGNvbmZpZy5faSk7XHJcbiAgICAgICAgY29uZmlnLl9hID0gbWFwKFtpLnllYXIsIGkubW9udGgsIGkuZGF5IHx8IGkuZGF0ZSwgaS5ob3VyLCBpLm1pbnV0ZSwgaS5zZWNvbmQsIGkubWlsbGlzZWNvbmRdLCBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmogJiYgcGFyc2VJbnQob2JqLCAxMCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbmZpZ0Zyb21BcnJheShjb25maWcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUZyb21Db25maWcgKGNvbmZpZykge1xyXG4gICAgICAgIHZhciByZXMgPSBuZXcgTW9tZW50KGNoZWNrT3ZlcmZsb3cocHJlcGFyZUNvbmZpZyhjb25maWcpKSk7XHJcbiAgICAgICAgaWYgKHJlcy5fbmV4dERheSkge1xyXG4gICAgICAgICAgICAvLyBBZGRpbmcgaXMgc21hcnQgZW5vdWdoIGFyb3VuZCBEU1RcclxuICAgICAgICAgICAgcmVzLmFkZCgxLCAnZCcpO1xyXG4gICAgICAgICAgICByZXMuX25leHREYXkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHByZXBhcmVDb25maWcgKGNvbmZpZykge1xyXG4gICAgICAgIHZhciBpbnB1dCA9IGNvbmZpZy5faSxcclxuICAgICAgICAgICAgZm9ybWF0ID0gY29uZmlnLl9mO1xyXG5cclxuICAgICAgICBjb25maWcuX2xvY2FsZSA9IGNvbmZpZy5fbG9jYWxlIHx8IGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUoY29uZmlnLl9sKTtcclxuXHJcbiAgICAgICAgaWYgKGlucHV0ID09PSBudWxsIHx8IChmb3JtYXQgPT09IHVuZGVmaW5lZCAmJiBpbnB1dCA9PT0gJycpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWxpZF9fY3JlYXRlSW52YWxpZCh7bnVsbElucHV0OiB0cnVlfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBjb25maWcuX2kgPSBpbnB1dCA9IGNvbmZpZy5fbG9jYWxlLnByZXBhcnNlKGlucHV0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc01vbWVudChpbnB1dCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBNb21lbnQoY2hlY2tPdmVyZmxvdyhpbnB1dCkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShmb3JtYXQpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRBcnJheShjb25maWcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0KSB7XHJcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZShpbnB1dCkpIHtcclxuICAgICAgICAgICAgY29uZmlnLl9kID0gaW5wdXQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uZmlnRnJvbUlucHV0KGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXZhbGlkX19pc1ZhbGlkKGNvbmZpZykpIHtcclxuICAgICAgICAgICAgY29uZmlnLl9kID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbUlucHV0KGNvbmZpZykge1xyXG4gICAgICAgIHZhciBpbnB1dCA9IGNvbmZpZy5faTtcclxuICAgICAgICBpZiAoaW5wdXQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZSh1dGlsc19ob29rc19faG9va3Mubm93KCkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKGlucHV0KSkge1xyXG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShpbnB1dC52YWx1ZU9mKCkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nKGNvbmZpZyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGlucHV0KSkge1xyXG4gICAgICAgICAgICBjb25maWcuX2EgPSBtYXAoaW5wdXQuc2xpY2UoMCksIGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChvYmosIDEwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21BcnJheShjb25maWcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mKGlucHV0KSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgY29uZmlnRnJvbU9iamVjdChjb25maWcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mKGlucHV0KSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgLy8gZnJvbSBtaWxsaXNlY29uZHNcclxuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoaW5wdXQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayhjb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVMb2NhbE9yVVRDIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgaXNVVEMpIHtcclxuICAgICAgICB2YXIgYyA9IHt9O1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mKGxvY2FsZSkgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgICBzdHJpY3QgPSBsb2NhbGU7XHJcbiAgICAgICAgICAgIGxvY2FsZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gb2JqZWN0IGNvbnN0cnVjdGlvbiBtdXN0IGJlIGRvbmUgdGhpcyB3YXkuXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE0MjNcclxuICAgICAgICBjLl9pc0FNb21lbnRPYmplY3QgPSB0cnVlO1xyXG4gICAgICAgIGMuX3VzZVVUQyA9IGMuX2lzVVRDID0gaXNVVEM7XHJcbiAgICAgICAgYy5fbCA9IGxvY2FsZTtcclxuICAgICAgICBjLl9pID0gaW5wdXQ7XHJcbiAgICAgICAgYy5fZiA9IGZvcm1hdDtcclxuICAgICAgICBjLl9zdHJpY3QgPSBzdHJpY3Q7XHJcblxyXG4gICAgICAgIHJldHVybiBjcmVhdGVGcm9tQ29uZmlnKGMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxvY2FsX19jcmVhdGVMb2NhbCAoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QpIHtcclxuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWxPclVUQyhpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBwcm90b3R5cGVNaW4gPSBkZXByZWNhdGUoXHJcbiAgICAgICAgICdtb21lbnQoKS5taW4gaXMgZGVwcmVjYXRlZCwgdXNlIG1vbWVudC5tYXggaW5zdGVhZC4gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE1NDgnLFxyXG4gICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICB2YXIgb3RoZXIgPSBsb2NhbF9fY3JlYXRlTG9jYWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJiBvdGhlci5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXIgPCB0aGlzID8gdGhpcyA6IG90aGVyO1xyXG4gICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRfX2NyZWF0ZUludmFsaWQoKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICk7XHJcblxyXG4gICAgdmFyIHByb3RvdHlwZU1heCA9IGRlcHJlY2F0ZShcclxuICAgICAgICAnbW9tZW50KCkubWF4IGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQubWluIGluc3RlYWQuIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNTQ4JyxcclxuICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBvdGhlciA9IGxvY2FsX19jcmVhdGVMb2NhbC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiYgb3RoZXIuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXIgPiB0aGlzID8gdGhpcyA6IG90aGVyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkX19jcmVhdGVJbnZhbGlkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIFBpY2sgYSBtb21lbnQgbSBmcm9tIG1vbWVudHMgc28gdGhhdCBtW2ZuXShvdGhlcikgaXMgdHJ1ZSBmb3IgYWxsXHJcbiAgICAvLyBvdGhlci4gVGhpcyByZWxpZXMgb24gdGhlIGZ1bmN0aW9uIGZuIHRvIGJlIHRyYW5zaXRpdmUuXHJcbiAgICAvL1xyXG4gICAgLy8gbW9tZW50cyBzaG91bGQgZWl0aGVyIGJlIGFuIGFycmF5IG9mIG1vbWVudCBvYmplY3RzIG9yIGFuIGFycmF5LCB3aG9zZVxyXG4gICAgLy8gZmlyc3QgZWxlbWVudCBpcyBhbiBhcnJheSBvZiBtb21lbnQgb2JqZWN0cy5cclxuICAgIGZ1bmN0aW9uIHBpY2tCeShmbiwgbW9tZW50cykge1xyXG4gICAgICAgIHZhciByZXMsIGk7XHJcbiAgICAgICAgaWYgKG1vbWVudHMubGVuZ3RoID09PSAxICYmIGlzQXJyYXkobW9tZW50c1swXSkpIHtcclxuICAgICAgICAgICAgbW9tZW50cyA9IG1vbWVudHNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghbW9tZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxvY2FsX19jcmVhdGVMb2NhbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXMgPSBtb21lbnRzWzBdO1xyXG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBtb21lbnRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGlmICghbW9tZW50c1tpXS5pc1ZhbGlkKCkgfHwgbW9tZW50c1tpXVtmbl0ocmVzKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzID0gbW9tZW50c1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE86IFVzZSBbXS5zb3J0IGluc3RlYWQ/XHJcbiAgICBmdW5jdGlvbiBtaW4gKCkge1xyXG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xyXG5cclxuICAgICAgICByZXR1cm4gcGlja0J5KCdpc0JlZm9yZScsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1heCAoKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XHJcblxyXG4gICAgICAgIHJldHVybiBwaWNrQnkoJ2lzQWZ0ZXInLCBhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbm93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBEYXRlLm5vdyA/IERhdGUubm93KCkgOiArKG5ldyBEYXRlKCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBEdXJhdGlvbiAoZHVyYXRpb24pIHtcclxuICAgICAgICB2YXIgbm9ybWFsaXplZElucHV0ID0gbm9ybWFsaXplT2JqZWN0VW5pdHMoZHVyYXRpb24pLFxyXG4gICAgICAgICAgICB5ZWFycyA9IG5vcm1hbGl6ZWRJbnB1dC55ZWFyIHx8IDAsXHJcbiAgICAgICAgICAgIHF1YXJ0ZXJzID0gbm9ybWFsaXplZElucHV0LnF1YXJ0ZXIgfHwgMCxcclxuICAgICAgICAgICAgbW9udGhzID0gbm9ybWFsaXplZElucHV0Lm1vbnRoIHx8IDAsXHJcbiAgICAgICAgICAgIHdlZWtzID0gbm9ybWFsaXplZElucHV0LndlZWsgfHwgMCxcclxuICAgICAgICAgICAgZGF5cyA9IG5vcm1hbGl6ZWRJbnB1dC5kYXkgfHwgMCxcclxuICAgICAgICAgICAgaG91cnMgPSBub3JtYWxpemVkSW5wdXQuaG91ciB8fCAwLFxyXG4gICAgICAgICAgICBtaW51dGVzID0gbm9ybWFsaXplZElucHV0Lm1pbnV0ZSB8fCAwLFxyXG4gICAgICAgICAgICBzZWNvbmRzID0gbm9ybWFsaXplZElucHV0LnNlY29uZCB8fCAwLFxyXG4gICAgICAgICAgICBtaWxsaXNlY29uZHMgPSBub3JtYWxpemVkSW5wdXQubWlsbGlzZWNvbmQgfHwgMDtcclxuXHJcbiAgICAgICAgLy8gcmVwcmVzZW50YXRpb24gZm9yIGRhdGVBZGRSZW1vdmVcclxuICAgICAgICB0aGlzLl9taWxsaXNlY29uZHMgPSArbWlsbGlzZWNvbmRzICtcclxuICAgICAgICAgICAgc2Vjb25kcyAqIDFlMyArIC8vIDEwMDBcclxuICAgICAgICAgICAgbWludXRlcyAqIDZlNCArIC8vIDEwMDAgKiA2MFxyXG4gICAgICAgICAgICBob3VycyAqIDEwMDAgKiA2MCAqIDYwOyAvL3VzaW5nIDEwMDAgKiA2MCAqIDYwIGluc3RlYWQgb2YgMzZlNSB0byBhdm9pZCBmbG9hdGluZyBwb2ludCByb3VuZGluZyBlcnJvcnMgaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzI5NzhcclxuICAgICAgICAvLyBCZWNhdXNlIG9mIGRhdGVBZGRSZW1vdmUgdHJlYXRzIDI0IGhvdXJzIGFzIGRpZmZlcmVudCBmcm9tIGFcclxuICAgICAgICAvLyBkYXkgd2hlbiB3b3JraW5nIGFyb3VuZCBEU1QsIHdlIG5lZWQgdG8gc3RvcmUgdGhlbSBzZXBhcmF0ZWx5XHJcbiAgICAgICAgdGhpcy5fZGF5cyA9ICtkYXlzICtcclxuICAgICAgICAgICAgd2Vla3MgKiA3O1xyXG4gICAgICAgIC8vIEl0IGlzIGltcG9zc2libGUgdHJhbnNsYXRlIG1vbnRocyBpbnRvIGRheXMgd2l0aG91dCBrbm93aW5nXHJcbiAgICAgICAgLy8gd2hpY2ggbW9udGhzIHlvdSBhcmUgYXJlIHRhbGtpbmcgYWJvdXQsIHNvIHdlIGhhdmUgdG8gc3RvcmVcclxuICAgICAgICAvLyBpdCBzZXBhcmF0ZWx5LlxyXG4gICAgICAgIHRoaXMuX21vbnRocyA9ICttb250aHMgK1xyXG4gICAgICAgICAgICBxdWFydGVycyAqIDMgK1xyXG4gICAgICAgICAgICB5ZWFycyAqIDEyO1xyXG5cclxuICAgICAgICB0aGlzLl9kYXRhID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuX2xvY2FsZSA9IGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYnViYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNEdXJhdGlvbiAob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIER1cmF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBmdW5jdGlvbiBvZmZzZXQgKHRva2VuLCBzZXBhcmF0b3IpIHtcclxuICAgICAgICBhZGRGb3JtYXRUb2tlbih0b2tlbiwgMCwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy51dGNPZmZzZXQoKTtcclxuICAgICAgICAgICAgdmFyIHNpZ24gPSAnKyc7XHJcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSAtb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgc2lnbiA9ICctJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc2lnbiArIHplcm9GaWxsKH5+KG9mZnNldCAvIDYwKSwgMikgKyBzZXBhcmF0b3IgKyB6ZXJvRmlsbCh+fihvZmZzZXQpICUgNjAsIDIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9mZnNldCgnWicsICc6Jyk7XHJcbiAgICBvZmZzZXQoJ1paJywgJycpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdaJywgIG1hdGNoU2hvcnRPZmZzZXQpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignWlonLCBtYXRjaFNob3J0T2Zmc2V0KTtcclxuICAgIGFkZFBhcnNlVG9rZW4oWydaJywgJ1paJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZy5fdXNlVVRDID0gdHJ1ZTtcclxuICAgICAgICBjb25maWcuX3R6bSA9IG9mZnNldEZyb21TdHJpbmcobWF0Y2hTaG9ydE9mZnNldCwgaW5wdXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSEVMUEVSU1xyXG5cclxuICAgIC8vIHRpbWV6b25lIGNodW5rZXJcclxuICAgIC8vICcrMTA6MDAnID4gWycxMCcsICAnMDAnXVxyXG4gICAgLy8gJy0xNTMwJyAgPiBbJy0xNScsICczMCddXHJcbiAgICB2YXIgY2h1bmtPZmZzZXQgPSAvKFtcXCtcXC1dfFxcZFxcZCkvZ2k7XHJcblxyXG4gICAgZnVuY3Rpb24gb2Zmc2V0RnJvbVN0cmluZyhtYXRjaGVyLCBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgbWF0Y2hlcyA9ICgoc3RyaW5nIHx8ICcnKS5tYXRjaChtYXRjaGVyKSB8fCBbXSk7XHJcbiAgICAgICAgdmFyIGNodW5rICAgPSBtYXRjaGVzW21hdGNoZXMubGVuZ3RoIC0gMV0gfHwgW107XHJcbiAgICAgICAgdmFyIHBhcnRzICAgPSAoY2h1bmsgKyAnJykubWF0Y2goY2h1bmtPZmZzZXQpIHx8IFsnLScsIDAsIDBdO1xyXG4gICAgICAgIHZhciBtaW51dGVzID0gKyhwYXJ0c1sxXSAqIDYwKSArIHRvSW50KHBhcnRzWzJdKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcnRzWzBdID09PSAnKycgPyBtaW51dGVzIDogLW1pbnV0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJuIGEgbW9tZW50IGZyb20gaW5wdXQsIHRoYXQgaXMgbG9jYWwvdXRjL3pvbmUgZXF1aXZhbGVudCB0byBtb2RlbC5cclxuICAgIGZ1bmN0aW9uIGNsb25lV2l0aE9mZnNldChpbnB1dCwgbW9kZWwpIHtcclxuICAgICAgICB2YXIgcmVzLCBkaWZmO1xyXG4gICAgICAgIGlmIChtb2RlbC5faXNVVEMpIHtcclxuICAgICAgICAgICAgcmVzID0gbW9kZWwuY2xvbmUoKTtcclxuICAgICAgICAgICAgZGlmZiA9IChpc01vbWVudChpbnB1dCkgfHwgaXNEYXRlKGlucHV0KSA/IGlucHV0LnZhbHVlT2YoKSA6IGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCkudmFsdWVPZigpKSAtIHJlcy52YWx1ZU9mKCk7XHJcbiAgICAgICAgICAgIC8vIFVzZSBsb3ctbGV2ZWwgYXBpLCBiZWNhdXNlIHRoaXMgZm4gaXMgbG93LWxldmVsIGFwaS5cclxuICAgICAgICAgICAgcmVzLl9kLnNldFRpbWUocmVzLl9kLnZhbHVlT2YoKSArIGRpZmYpO1xyXG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KHJlcywgZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpLmxvY2FsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldERhdGVPZmZzZXQgKG0pIHtcclxuICAgICAgICAvLyBPbiBGaXJlZm94LjI0IERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyBhIGZsb2F0aW5nIHBvaW50LlxyXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L3B1bGwvMTg3MVxyXG4gICAgICAgIHJldHVybiAtTWF0aC5yb3VuZChtLl9kLmdldFRpbWV6b25lT2Zmc2V0KCkgLyAxNSkgKiAxNTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIT09LU1xyXG5cclxuICAgIC8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgYSBtb21lbnQgaXMgbXV0YXRlZC5cclxuICAgIC8vIEl0IGlzIGludGVuZGVkIHRvIGtlZXAgdGhlIG9mZnNldCBpbiBzeW5jIHdpdGggdGhlIHRpbWV6b25lLlxyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldCA9IGZ1bmN0aW9uICgpIHt9O1xyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICAvLyBrZWVwTG9jYWxUaW1lID0gdHJ1ZSBtZWFucyBvbmx5IGNoYW5nZSB0aGUgdGltZXpvbmUsIHdpdGhvdXRcclxuICAgIC8vIGFmZmVjdGluZyB0aGUgbG9jYWwgaG91ci4gU28gNTozMToyNiArMDMwMCAtLVt1dGNPZmZzZXQoMiwgdHJ1ZSldLS0+XHJcbiAgICAvLyA1OjMxOjI2ICswMjAwIEl0IGlzIHBvc3NpYmxlIHRoYXQgNTozMToyNiBkb2Vzbid0IGV4aXN0IHdpdGggb2Zmc2V0XHJcbiAgICAvLyArMDIwMCwgc28gd2UgYWRqdXN0IHRoZSB0aW1lIGFzIG5lZWRlZCwgdG8gYmUgdmFsaWQuXHJcbiAgICAvL1xyXG4gICAgLy8gS2VlcGluZyB0aGUgdGltZSBhY3R1YWxseSBhZGRzL3N1YnRyYWN0cyAob25lIGhvdXIpXHJcbiAgICAvLyBmcm9tIHRoZSBhY3R1YWwgcmVwcmVzZW50ZWQgdGltZS4gVGhhdCBpcyB3aHkgd2UgY2FsbCB1cGRhdGVPZmZzZXRcclxuICAgIC8vIGEgc2Vjb25kIHRpbWUuIEluIGNhc2UgaXQgd2FudHMgdXMgdG8gY2hhbmdlIHRoZSBvZmZzZXQgYWdhaW5cclxuICAgIC8vIF9jaGFuZ2VJblByb2dyZXNzID09IHRydWUgY2FzZSwgdGhlbiB3ZSBoYXZlIHRvIGFkanVzdCwgYmVjYXVzZVxyXG4gICAgLy8gdGhlcmUgaXMgbm8gc3VjaCB0aW1lIGluIHRoZSBnaXZlbiB0aW1lem9uZS5cclxuICAgIGZ1bmN0aW9uIGdldFNldE9mZnNldCAoaW5wdXQsIGtlZXBMb2NhbFRpbWUpIHtcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5fb2Zmc2V0IHx8IDAsXHJcbiAgICAgICAgICAgIGxvY2FsQWRqdXN0O1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgPyB0aGlzIDogTmFOO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoU2hvcnRPZmZzZXQsIGlucHV0KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChNYXRoLmFicyhpbnB1dCkgPCAxNikge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSBpbnB1dCAqIDYwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5faXNVVEMgJiYga2VlcExvY2FsVGltZSkge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxBZGp1c3QgPSBnZXREYXRlT2Zmc2V0KHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IGlucHV0O1xyXG4gICAgICAgICAgICB0aGlzLl9pc1VUQyA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbEFkanVzdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChsb2NhbEFkanVzdCwgJ20nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob2Zmc2V0ICE9PSBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFrZWVwTG9jYWxUaW1lIHx8IHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0KHRoaXMsIGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24oaW5wdXQgLSBvZmZzZXQsICdtJyksIDEsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VJblByb2dyZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1VUQyA/IG9mZnNldCA6IGdldERhdGVPZmZzZXQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldFpvbmUgKGlucHV0LCBrZWVwTG9jYWxUaW1lKSB7XHJcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gLWlucHV0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldChpbnB1dCwga2VlcExvY2FsVGltZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gLXRoaXMudXRjT2Zmc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldE9mZnNldFRvVVRDIChrZWVwTG9jYWxUaW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXRjT2Zmc2V0KDAsIGtlZXBMb2NhbFRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldE9mZnNldFRvTG9jYWwgKGtlZXBMb2NhbFRpbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNVVEMpIHtcclxuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoMCwga2VlcExvY2FsVGltZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzVVRDID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoa2VlcExvY2FsVGltZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWJ0cmFjdChnZXREYXRlT2Zmc2V0KHRoaXMpLCAnbScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldE9mZnNldFRvUGFyc2VkT2Zmc2V0ICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdHptKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KHRoaXMuX3R6bSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5faSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQob2Zmc2V0RnJvbVN0cmluZyhtYXRjaE9mZnNldCwgdGhpcy5faSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYXNBbGlnbmVkSG91ck9mZnNldCAoaW5wdXQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXQgPSBpbnB1dCA/IGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCkudXRjT2Zmc2V0KCkgOiAwO1xyXG5cclxuICAgICAgICByZXR1cm4gKHRoaXMudXRjT2Zmc2V0KCkgLSBpbnB1dCkgJSA2MCA9PT0gMDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0RheWxpZ2h0U2F2aW5nVGltZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoKSA+IHRoaXMuY2xvbmUoKS5tb250aCgwKS51dGNPZmZzZXQoKSB8fFxyXG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCgpID4gdGhpcy5jbG9uZSgpLm1vbnRoKDUpLnV0Y09mZnNldCgpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0RheWxpZ2h0U2F2aW5nVGltZVNoaWZ0ZWQgKCkge1xyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5faXNEU1RTaGlmdGVkKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNEU1RTaGlmdGVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGMgPSB7fTtcclxuXHJcbiAgICAgICAgY29weUNvbmZpZyhjLCB0aGlzKTtcclxuICAgICAgICBjID0gcHJlcGFyZUNvbmZpZyhjKTtcclxuXHJcbiAgICAgICAgaWYgKGMuX2EpIHtcclxuICAgICAgICAgICAgdmFyIG90aGVyID0gYy5faXNVVEMgPyBjcmVhdGVfdXRjX19jcmVhdGVVVEMoYy5fYSkgOiBsb2NhbF9fY3JlYXRlTG9jYWwoYy5fYSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzRFNUU2hpZnRlZCA9IHRoaXMuaXNWYWxpZCgpICYmXHJcbiAgICAgICAgICAgICAgICBjb21wYXJlQXJyYXlzKGMuX2EsIG90aGVyLnRvQXJyYXkoKSkgPiAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzRFNUU2hpZnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRFNUU2hpZnRlZDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0xvY2FsICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyAhdGhpcy5faXNVVEMgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc1V0Y09mZnNldCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpcy5faXNVVEMgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc1V0YyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpcy5faXNVVEMgJiYgdGhpcy5fb2Zmc2V0ID09PSAwIDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQVNQLk5FVCBqc29uIGRhdGUgZm9ybWF0IHJlZ2V4XHJcbiAgICB2YXIgYXNwTmV0UmVnZXggPSAvXihcXC0pPyg/OihcXGQqKVsuIF0pPyhcXGQrKVxcOihcXGQrKSg/OlxcOihcXGQrKVxcLj8oXFxkezN9KT9cXGQqKT8kLztcclxuXHJcbiAgICAvLyBmcm9tIGh0dHA6Ly9kb2NzLmNsb3N1cmUtbGlicmFyeS5nb29nbGVjb2RlLmNvbS9naXQvY2xvc3VyZV9nb29nX2RhdGVfZGF0ZS5qcy5zb3VyY2UuaHRtbFxyXG4gICAgLy8gc29tZXdoYXQgbW9yZSBpbiBsaW5lIHdpdGggNC40LjMuMiAyMDA0IHNwZWMsIGJ1dCBhbGxvd3MgZGVjaW1hbCBhbnl3aGVyZVxyXG4gICAgLy8gYW5kIGZ1cnRoZXIgbW9kaWZpZWQgdG8gYWxsb3cgZm9yIHN0cmluZ3MgY29udGFpbmluZyBib3RoIHdlZWsgYW5kIGRheVxyXG4gICAgdmFyIGlzb1JlZ2V4ID0gL14oLSk/UCg/OigtP1swLTksLl0qKVkpPyg/OigtP1swLTksLl0qKU0pPyg/OigtP1swLTksLl0qKVcpPyg/OigtP1swLTksLl0qKUQpPyg/OlQoPzooLT9bMC05LC5dKilIKT8oPzooLT9bMC05LC5dKilNKT8oPzooLT9bMC05LC5dKilTKT8pPyQvO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24gKGlucHV0LCBrZXkpIHtcclxuICAgICAgICB2YXIgZHVyYXRpb24gPSBpbnB1dCxcclxuICAgICAgICAgICAgLy8gbWF0Y2hpbmcgYWdhaW5zdCByZWdleHAgaXMgZXhwZW5zaXZlLCBkbyBpdCBvbiBkZW1hbmRcclxuICAgICAgICAgICAgbWF0Y2ggPSBudWxsLFxyXG4gICAgICAgICAgICBzaWduLFxyXG4gICAgICAgICAgICByZXQsXHJcbiAgICAgICAgICAgIGRpZmZSZXM7XHJcblxyXG4gICAgICAgIGlmIChpc0R1cmF0aW9uKGlucHV0KSkge1xyXG4gICAgICAgICAgICBkdXJhdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIG1zIDogaW5wdXQuX21pbGxpc2Vjb25kcyxcclxuICAgICAgICAgICAgICAgIGQgIDogaW5wdXQuX2RheXMsXHJcbiAgICAgICAgICAgICAgICBNICA6IGlucHV0Ll9tb250aHNcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcclxuICAgICAgICAgICAgaWYgKGtleSkge1xyXG4gICAgICAgICAgICAgICAgZHVyYXRpb25ba2V5XSA9IGlucHV0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZHVyYXRpb24ubWlsbGlzZWNvbmRzID0gaW5wdXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKCEhKG1hdGNoID0gYXNwTmV0UmVnZXguZXhlYyhpbnB1dCkpKSB7XHJcbiAgICAgICAgICAgIHNpZ24gPSAobWF0Y2hbMV0gPT09ICctJykgPyAtMSA6IDE7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgeSAgOiAwLFxyXG4gICAgICAgICAgICAgICAgZCAgOiB0b0ludChtYXRjaFtEQVRFXSkgICAgICAgICogc2lnbixcclxuICAgICAgICAgICAgICAgIGggIDogdG9JbnQobWF0Y2hbSE9VUl0pICAgICAgICAqIHNpZ24sXHJcbiAgICAgICAgICAgICAgICBtICA6IHRvSW50KG1hdGNoW01JTlVURV0pICAgICAgKiBzaWduLFxyXG4gICAgICAgICAgICAgICAgcyAgOiB0b0ludChtYXRjaFtTRUNPTkRdKSAgICAgICogc2lnbixcclxuICAgICAgICAgICAgICAgIG1zIDogdG9JbnQobWF0Y2hbTUlMTElTRUNPTkRdKSAqIHNpZ25cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2UgaWYgKCEhKG1hdGNoID0gaXNvUmVnZXguZXhlYyhpbnB1dCkpKSB7XHJcbiAgICAgICAgICAgIHNpZ24gPSAobWF0Y2hbMV0gPT09ICctJykgPyAtMSA6IDE7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgeSA6IHBhcnNlSXNvKG1hdGNoWzJdLCBzaWduKSxcclxuICAgICAgICAgICAgICAgIE0gOiBwYXJzZUlzbyhtYXRjaFszXSwgc2lnbiksXHJcbiAgICAgICAgICAgICAgICB3IDogcGFyc2VJc28obWF0Y2hbNF0sIHNpZ24pLFxyXG4gICAgICAgICAgICAgICAgZCA6IHBhcnNlSXNvKG1hdGNoWzVdLCBzaWduKSxcclxuICAgICAgICAgICAgICAgIGggOiBwYXJzZUlzbyhtYXRjaFs2XSwgc2lnbiksXHJcbiAgICAgICAgICAgICAgICBtIDogcGFyc2VJc28obWF0Y2hbN10sIHNpZ24pLFxyXG4gICAgICAgICAgICAgICAgcyA6IHBhcnNlSXNvKG1hdGNoWzhdLCBzaWduKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPT0gbnVsbCkgey8vIGNoZWNrcyBmb3IgbnVsbCBvciB1bmRlZmluZWRcclxuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkdXJhdGlvbiA9PT0gJ29iamVjdCcgJiYgKCdmcm9tJyBpbiBkdXJhdGlvbiB8fCAndG8nIGluIGR1cmF0aW9uKSkge1xyXG4gICAgICAgICAgICBkaWZmUmVzID0gbW9tZW50c0RpZmZlcmVuY2UobG9jYWxfX2NyZWF0ZUxvY2FsKGR1cmF0aW9uLmZyb20pLCBsb2NhbF9fY3JlYXRlTG9jYWwoZHVyYXRpb24udG8pKTtcclxuXHJcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge307XHJcbiAgICAgICAgICAgIGR1cmF0aW9uLm1zID0gZGlmZlJlcy5taWxsaXNlY29uZHM7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uLk0gPSBkaWZmUmVzLm1vbnRocztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldCA9IG5ldyBEdXJhdGlvbihkdXJhdGlvbik7XHJcblxyXG4gICAgICAgIGlmIChpc0R1cmF0aW9uKGlucHV0KSAmJiBoYXNPd25Qcm9wKGlucHV0LCAnX2xvY2FsZScpKSB7XHJcbiAgICAgICAgICAgIHJldC5fbG9jYWxlID0gaW5wdXQuX2xvY2FsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlX19jcmVhdGVEdXJhdGlvbi5mbiA9IER1cmF0aW9uLnByb3RvdHlwZTtcclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZUlzbyAoaW5wLCBzaWduKSB7XHJcbiAgICAgICAgLy8gV2UnZCBub3JtYWxseSB1c2Ugfn5pbnAgZm9yIHRoaXMsIGJ1dCB1bmZvcnR1bmF0ZWx5IGl0IGFsc29cclxuICAgICAgICAvLyBjb252ZXJ0cyBmbG9hdHMgdG8gaW50cy5cclxuICAgICAgICAvLyBpbnAgbWF5IGJlIHVuZGVmaW5lZCwgc28gY2FyZWZ1bCBjYWxsaW5nIHJlcGxhY2Ugb24gaXQuXHJcbiAgICAgICAgdmFyIHJlcyA9IGlucCAmJiBwYXJzZUZsb2F0KGlucC5yZXBsYWNlKCcsJywgJy4nKSk7XHJcbiAgICAgICAgLy8gYXBwbHkgc2lnbiB3aGlsZSB3ZSdyZSBhdCBpdFxyXG4gICAgICAgIHJldHVybiAoaXNOYU4ocmVzKSA/IDAgOiByZXMpICogc2lnbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwb3NpdGl2ZU1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKSB7XHJcbiAgICAgICAgdmFyIHJlcyA9IHttaWxsaXNlY29uZHM6IDAsIG1vbnRoczogMH07XHJcblxyXG4gICAgICAgIHJlcy5tb250aHMgPSBvdGhlci5tb250aCgpIC0gYmFzZS5tb250aCgpICtcclxuICAgICAgICAgICAgKG90aGVyLnllYXIoKSAtIGJhc2UueWVhcigpKSAqIDEyO1xyXG4gICAgICAgIGlmIChiYXNlLmNsb25lKCkuYWRkKHJlcy5tb250aHMsICdNJykuaXNBZnRlcihvdGhlcikpIHtcclxuICAgICAgICAgICAgLS1yZXMubW9udGhzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzLm1pbGxpc2Vjb25kcyA9ICtvdGhlciAtICsoYmFzZS5jbG9uZSgpLmFkZChyZXMubW9udGhzLCAnTScpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb21lbnRzRGlmZmVyZW5jZShiYXNlLCBvdGhlcikge1xyXG4gICAgICAgIHZhciByZXM7XHJcbiAgICAgICAgaWYgKCEoYmFzZS5pc1ZhbGlkKCkgJiYgb3RoZXIuaXNWYWxpZCgpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge21pbGxpc2Vjb25kczogMCwgbW9udGhzOiAwfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG90aGVyID0gY2xvbmVXaXRoT2Zmc2V0KG90aGVyLCBiYXNlKTtcclxuICAgICAgICBpZiAoYmFzZS5pc0JlZm9yZShvdGhlcikpIHtcclxuICAgICAgICAgICAgcmVzID0gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShiYXNlLCBvdGhlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzID0gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShvdGhlciwgYmFzZSk7XHJcbiAgICAgICAgICAgIHJlcy5taWxsaXNlY29uZHMgPSAtcmVzLm1pbGxpc2Vjb25kcztcclxuICAgICAgICAgICAgcmVzLm1vbnRocyA9IC1yZXMubW9udGhzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhYnNSb3VuZCAobnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG51bWJlciA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoLTEgKiBudW1iZXIpICogLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQobnVtYmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETzogcmVtb3ZlICduYW1lJyBhcmcgYWZ0ZXIgZGVwcmVjYXRpb24gaXMgcmVtb3ZlZFxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQWRkZXIoZGlyZWN0aW9uLCBuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIHBlcmlvZCkge1xyXG4gICAgICAgICAgICB2YXIgZHVyLCB0bXA7XHJcbiAgICAgICAgICAgIC8vaW52ZXJ0IHRoZSBhcmd1bWVudHMsIGJ1dCBjb21wbGFpbiBhYm91dCBpdFxyXG4gICAgICAgICAgICBpZiAocGVyaW9kICE9PSBudWxsICYmICFpc05hTigrcGVyaW9kKSkge1xyXG4gICAgICAgICAgICAgICAgZGVwcmVjYXRlU2ltcGxlKG5hbWUsICdtb21lbnQoKS4nICsgbmFtZSAgKyAnKHBlcmlvZCwgbnVtYmVyKSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIG1vbWVudCgpLicgKyBuYW1lICsgJyhudW1iZXIsIHBlcmlvZCkuJyk7XHJcbiAgICAgICAgICAgICAgICB0bXAgPSB2YWw7IHZhbCA9IHBlcmlvZDsgcGVyaW9kID0gdG1wO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YWwgPSB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyA/ICt2YWwgOiB2YWw7XHJcbiAgICAgICAgICAgIGR1ciA9IGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24odmFsLCBwZXJpb2QpO1xyXG4gICAgICAgICAgICBhZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0KHRoaXMsIGR1ciwgZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0IChtb20sIGR1cmF0aW9uLCBpc0FkZGluZywgdXBkYXRlT2Zmc2V0KSB7XHJcbiAgICAgICAgdmFyIG1pbGxpc2Vjb25kcyA9IGR1cmF0aW9uLl9taWxsaXNlY29uZHMsXHJcbiAgICAgICAgICAgIGRheXMgPSBhYnNSb3VuZChkdXJhdGlvbi5fZGF5cyksXHJcbiAgICAgICAgICAgIG1vbnRocyA9IGFic1JvdW5kKGR1cmF0aW9uLl9tb250aHMpO1xyXG5cclxuICAgICAgICBpZiAoIW1vbS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgLy8gTm8gb3BcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlT2Zmc2V0ID0gdXBkYXRlT2Zmc2V0ID09IG51bGwgPyB0cnVlIDogdXBkYXRlT2Zmc2V0O1xyXG5cclxuICAgICAgICBpZiAobWlsbGlzZWNvbmRzKSB7XHJcbiAgICAgICAgICAgIG1vbS5fZC5zZXRUaW1lKG1vbS5fZC52YWx1ZU9mKCkgKyBtaWxsaXNlY29uZHMgKiBpc0FkZGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXlzKSB7XHJcbiAgICAgICAgICAgIGdldF9zZXRfX3NldChtb20sICdEYXRlJywgZ2V0X3NldF9fZ2V0KG1vbSwgJ0RhdGUnKSArIGRheXMgKiBpc0FkZGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtb250aHMpIHtcclxuICAgICAgICAgICAgc2V0TW9udGgobW9tLCBnZXRfc2V0X19nZXQobW9tLCAnTW9udGgnKSArIG1vbnRocyAqIGlzQWRkaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVwZGF0ZU9mZnNldCkge1xyXG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KG1vbSwgZGF5cyB8fCBtb250aHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgYWRkX3N1YnRyYWN0X19hZGQgICAgICA9IGNyZWF0ZUFkZGVyKDEsICdhZGQnKTtcclxuICAgIHZhciBhZGRfc3VidHJhY3RfX3N1YnRyYWN0ID0gY3JlYXRlQWRkZXIoLTEsICdzdWJ0cmFjdCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1vbWVudF9jYWxlbmRhcl9fY2FsZW5kYXIgKHRpbWUsIGZvcm1hdHMpIHtcclxuICAgICAgICAvLyBXZSB3YW50IHRvIGNvbXBhcmUgdGhlIHN0YXJ0IG9mIHRvZGF5LCB2cyB0aGlzLlxyXG4gICAgICAgIC8vIEdldHRpbmcgc3RhcnQtb2YtdG9kYXkgZGVwZW5kcyBvbiB3aGV0aGVyIHdlJ3JlIGxvY2FsL3V0Yy9vZmZzZXQgb3Igbm90LlxyXG4gICAgICAgIHZhciBub3cgPSB0aW1lIHx8IGxvY2FsX19jcmVhdGVMb2NhbCgpLFxyXG4gICAgICAgICAgICBzb2QgPSBjbG9uZVdpdGhPZmZzZXQobm93LCB0aGlzKS5zdGFydE9mKCdkYXknKSxcclxuICAgICAgICAgICAgZGlmZiA9IHRoaXMuZGlmZihzb2QsICdkYXlzJywgdHJ1ZSksXHJcbiAgICAgICAgICAgIGZvcm1hdCA9IGRpZmYgPCAtNiA/ICdzYW1lRWxzZScgOlxyXG4gICAgICAgICAgICAgICAgZGlmZiA8IC0xID8gJ2xhc3RXZWVrJyA6XHJcbiAgICAgICAgICAgICAgICBkaWZmIDwgMCA/ICdsYXN0RGF5JyA6XHJcbiAgICAgICAgICAgICAgICBkaWZmIDwgMSA/ICdzYW1lRGF5JyA6XHJcbiAgICAgICAgICAgICAgICBkaWZmIDwgMiA/ICduZXh0RGF5JyA6XHJcbiAgICAgICAgICAgICAgICBkaWZmIDwgNyA/ICduZXh0V2VlaycgOiAnc2FtZUVsc2UnO1xyXG5cclxuICAgICAgICB2YXIgb3V0cHV0ID0gZm9ybWF0cyAmJiAoaXNGdW5jdGlvbihmb3JtYXRzW2Zvcm1hdF0pID8gZm9ybWF0c1tmb3JtYXRdKCkgOiBmb3JtYXRzW2Zvcm1hdF0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQob3V0cHV0IHx8IHRoaXMubG9jYWxlRGF0YSgpLmNhbGVuZGFyKGZvcm1hdCwgdGhpcywgbG9jYWxfX2NyZWF0ZUxvY2FsKG5vdykpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9uZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNb21lbnQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNBZnRlciAoaW5wdXQsIHVuaXRzKSB7XHJcbiAgICAgICAgdmFyIGxvY2FsSW5wdXQgPSBpc01vbWVudChpbnB1dCkgPyBpbnB1dCA6IGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCk7XHJcbiAgICAgICAgaWYgKCEodGhpcy5pc1ZhbGlkKCkgJiYgbG9jYWxJbnB1dC5pc1ZhbGlkKCkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyghaXNVbmRlZmluZWQodW5pdHMpID8gdW5pdHMgOiAnbWlsbGlzZWNvbmQnKTtcclxuICAgICAgICBpZiAodW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpID4gbG9jYWxJbnB1dC52YWx1ZU9mKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxvY2FsSW5wdXQudmFsdWVPZigpIDwgdGhpcy5jbG9uZSgpLnN0YXJ0T2YodW5pdHMpLnZhbHVlT2YoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNCZWZvcmUgKGlucHV0LCB1bml0cykge1xyXG4gICAgICAgIHZhciBsb2NhbElucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpO1xyXG4gICAgICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHMoIWlzVW5kZWZpbmVkKHVuaXRzKSA/IHVuaXRzIDogJ21pbGxpc2Vjb25kJyk7XHJcbiAgICAgICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA8IGxvY2FsSW5wdXQudmFsdWVPZigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkuZW5kT2YodW5pdHMpLnZhbHVlT2YoKSA8IGxvY2FsSW5wdXQudmFsdWVPZigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0JldHdlZW4gKGZyb20sIHRvLCB1bml0cywgaW5jbHVzaXZpdHkpIHtcclxuICAgICAgICBpbmNsdXNpdml0eSA9IGluY2x1c2l2aXR5IHx8ICcoKSc7XHJcbiAgICAgICAgcmV0dXJuIChpbmNsdXNpdml0eVswXSA9PT0gJygnID8gdGhpcy5pc0FmdGVyKGZyb20sIHVuaXRzKSA6ICF0aGlzLmlzQmVmb3JlKGZyb20sIHVuaXRzKSkgJiZcclxuICAgICAgICAgICAgKGluY2x1c2l2aXR5WzFdID09PSAnKScgPyB0aGlzLmlzQmVmb3JlKHRvLCB1bml0cykgOiAhdGhpcy5pc0FmdGVyKHRvLCB1bml0cykpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzU2FtZSAoaW5wdXQsIHVuaXRzKSB7XHJcbiAgICAgICAgdmFyIGxvY2FsSW5wdXQgPSBpc01vbWVudChpbnB1dCkgPyBpbnB1dCA6IGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCksXHJcbiAgICAgICAgICAgIGlucHV0TXM7XHJcbiAgICAgICAgaWYgKCEodGhpcy5pc1ZhbGlkKCkgJiYgbG9jYWxJbnB1dC5pc1ZhbGlkKCkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyB8fCAnbWlsbGlzZWNvbmQnKTtcclxuICAgICAgICBpZiAodW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpID09PSBsb2NhbElucHV0LnZhbHVlT2YoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbnB1dE1zID0gbG9jYWxJbnB1dC52YWx1ZU9mKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkuc3RhcnRPZih1bml0cykudmFsdWVPZigpIDw9IGlucHV0TXMgJiYgaW5wdXRNcyA8PSB0aGlzLmNsb25lKCkuZW5kT2YodW5pdHMpLnZhbHVlT2YoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNTYW1lT3JBZnRlciAoaW5wdXQsIHVuaXRzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTYW1lKGlucHV0LCB1bml0cykgfHwgdGhpcy5pc0FmdGVyKGlucHV0LHVuaXRzKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc1NhbWVPckJlZm9yZSAoaW5wdXQsIHVuaXRzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTYW1lKGlucHV0LCB1bml0cykgfHwgdGhpcy5pc0JlZm9yZShpbnB1dCx1bml0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGlmZiAoaW5wdXQsIHVuaXRzLCBhc0Zsb2F0KSB7XHJcbiAgICAgICAgdmFyIHRoYXQsXHJcbiAgICAgICAgICAgIHpvbmVEZWx0YSxcclxuICAgICAgICAgICAgZGVsdGEsIG91dHB1dDtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gTmFOO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhhdCA9IGNsb25lV2l0aE9mZnNldChpbnB1dCwgdGhpcyk7XHJcblxyXG4gICAgICAgIGlmICghdGhhdC5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE5hTjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHpvbmVEZWx0YSA9ICh0aGF0LnV0Y09mZnNldCgpIC0gdGhpcy51dGNPZmZzZXQoKSkgKiA2ZTQ7XHJcblxyXG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xyXG5cclxuICAgICAgICBpZiAodW5pdHMgPT09ICd5ZWFyJyB8fCB1bml0cyA9PT0gJ21vbnRoJyB8fCB1bml0cyA9PT0gJ3F1YXJ0ZXInKSB7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG1vbnRoRGlmZih0aGlzLCB0aGF0KTtcclxuICAgICAgICAgICAgaWYgKHVuaXRzID09PSAncXVhcnRlcicpIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dCAvIDM7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodW5pdHMgPT09ICd5ZWFyJykge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0IC8gMTI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkZWx0YSA9IHRoaXMgLSB0aGF0O1xyXG4gICAgICAgICAgICBvdXRwdXQgPSB1bml0cyA9PT0gJ3NlY29uZCcgPyBkZWx0YSAvIDFlMyA6IC8vIDEwMDBcclxuICAgICAgICAgICAgICAgIHVuaXRzID09PSAnbWludXRlJyA/IGRlbHRhIC8gNmU0IDogLy8gMTAwMCAqIDYwXHJcbiAgICAgICAgICAgICAgICB1bml0cyA9PT0gJ2hvdXInID8gZGVsdGEgLyAzNmU1IDogLy8gMTAwMCAqIDYwICogNjBcclxuICAgICAgICAgICAgICAgIHVuaXRzID09PSAnZGF5JyA/IChkZWx0YSAtIHpvbmVEZWx0YSkgLyA4NjRlNSA6IC8vIDEwMDAgKiA2MCAqIDYwICogMjQsIG5lZ2F0ZSBkc3RcclxuICAgICAgICAgICAgICAgIHVuaXRzID09PSAnd2VlaycgPyAoZGVsdGEgLSB6b25lRGVsdGEpIC8gNjA0OGU1IDogLy8gMTAwMCAqIDYwICogNjAgKiAyNCAqIDcsIG5lZ2F0ZSBkc3RcclxuICAgICAgICAgICAgICAgIGRlbHRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXNGbG9hdCA/IG91dHB1dCA6IGFic0Zsb29yKG91dHB1dCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW9udGhEaWZmIChhLCBiKSB7XHJcbiAgICAgICAgLy8gZGlmZmVyZW5jZSBpbiBtb250aHNcclxuICAgICAgICB2YXIgd2hvbGVNb250aERpZmYgPSAoKGIueWVhcigpIC0gYS55ZWFyKCkpICogMTIpICsgKGIubW9udGgoKSAtIGEubW9udGgoKSksXHJcbiAgICAgICAgICAgIC8vIGIgaXMgaW4gKGFuY2hvciAtIDEgbW9udGgsIGFuY2hvciArIDEgbW9udGgpXHJcbiAgICAgICAgICAgIGFuY2hvciA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYsICdtb250aHMnKSxcclxuICAgICAgICAgICAgYW5jaG9yMiwgYWRqdXN0O1xyXG5cclxuICAgICAgICBpZiAoYiAtIGFuY2hvciA8IDApIHtcclxuICAgICAgICAgICAgYW5jaG9yMiA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYgLSAxLCAnbW9udGhzJyk7XHJcbiAgICAgICAgICAgIC8vIGxpbmVhciBhY3Jvc3MgdGhlIG1vbnRoXHJcbiAgICAgICAgICAgIGFkanVzdCA9IChiIC0gYW5jaG9yKSAvIChhbmNob3IgLSBhbmNob3IyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbmNob3IyID0gYS5jbG9uZSgpLmFkZCh3aG9sZU1vbnRoRGlmZiArIDEsICdtb250aHMnKTtcclxuICAgICAgICAgICAgLy8gbGluZWFyIGFjcm9zcyB0aGUgbW9udGhcclxuICAgICAgICAgICAgYWRqdXN0ID0gKGIgLSBhbmNob3IpIC8gKGFuY2hvcjIgLSBhbmNob3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jaGVjayBmb3IgbmVnYXRpdmUgemVybywgcmV0dXJuIHplcm8gaWYgbmVnYXRpdmUgemVyb1xyXG4gICAgICAgIHJldHVybiAtKHdob2xlTW9udGhEaWZmICsgYWRqdXN0KSB8fCAwO1xyXG4gICAgfVxyXG5cclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5kZWZhdWx0Rm9ybWF0ID0gJ1lZWVktTU0tRERUSEg6bW06c3NaJztcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5kZWZhdWx0Rm9ybWF0VXRjID0gJ1lZWVktTU0tRERUSEg6bW06c3NbWl0nO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmxvY2FsZSgnZW4nKS5mb3JtYXQoJ2RkZCBNTU0gREQgWVlZWSBISDptbTpzcyBbR01UXVpaJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW9tZW50X2Zvcm1hdF9fdG9JU09TdHJpbmcgKCkge1xyXG4gICAgICAgIHZhciBtID0gdGhpcy5jbG9uZSgpLnV0YygpO1xyXG4gICAgICAgIGlmICgwIDwgbS55ZWFyKCkgJiYgbS55ZWFyKCkgPD0gOTk5OSkge1xyXG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZykpIHtcclxuICAgICAgICAgICAgICAgIC8vIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBpcyB+NTB4IGZhc3RlciwgdXNlIGl0IHdoZW4gd2UgY2FuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b0RhdGUoKS50b0lTT1N0cmluZygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdE1vbWVudChtLCAnWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1taXScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdE1vbWVudChtLCAnWVlZWVlZLU1NLUREW1RdSEg6bW06c3MuU1NTW1pdJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZvcm1hdCAoaW5wdXRTdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWlucHV0U3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlucHV0U3RyaW5nID0gdGhpcy5pc1V0YygpID8gdXRpbHNfaG9va3NfX2hvb2tzLmRlZmF1bHRGb3JtYXRVdGMgOiB1dGlsc19ob29rc19faG9va3MuZGVmYXVsdEZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG91dHB1dCA9IGZvcm1hdE1vbWVudCh0aGlzLCBpbnB1dFN0cmluZyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLnBvc3Rmb3JtYXQob3V0cHV0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmcm9tICh0aW1lLCB3aXRob3V0U3VmZml4KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmXHJcbiAgICAgICAgICAgICAgICAoKGlzTW9tZW50KHRpbWUpICYmIHRpbWUuaXNWYWxpZCgpKSB8fFxyXG4gICAgICAgICAgICAgICAgIGxvY2FsX19jcmVhdGVMb2NhbCh0aW1lKS5pc1ZhbGlkKCkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uKHt0bzogdGhpcywgZnJvbTogdGltZX0pLmxvY2FsZSh0aGlzLmxvY2FsZSgpKS5odW1hbml6ZSghd2l0aG91dFN1ZmZpeCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZyb21Ob3cgKHdpdGhvdXRTdWZmaXgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mcm9tKGxvY2FsX19jcmVhdGVMb2NhbCgpLCB3aXRob3V0U3VmZml4KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0byAodGltZSwgd2l0aG91dFN1ZmZpeCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJlxyXG4gICAgICAgICAgICAgICAgKChpc01vbWVudCh0aW1lKSAmJiB0aW1lLmlzVmFsaWQoKSkgfHxcclxuICAgICAgICAgICAgICAgICBsb2NhbF9fY3JlYXRlTG9jYWwodGltZSkuaXNWYWxpZCgpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlX19jcmVhdGVEdXJhdGlvbih7ZnJvbTogdGhpcywgdG86IHRpbWV9KS5sb2NhbGUodGhpcy5sb2NhbGUoKSkuaHVtYW5pemUoIXdpdGhvdXRTdWZmaXgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b05vdyAod2l0aG91dFN1ZmZpeCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvKGxvY2FsX19jcmVhdGVMb2NhbCgpLCB3aXRob3V0U3VmZml4KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiBwYXNzZWQgYSBsb2NhbGUga2V5LCBpdCB3aWxsIHNldCB0aGUgbG9jYWxlIGZvciB0aGlzXHJcbiAgICAvLyBpbnN0YW5jZS4gIE90aGVyd2lzZSwgaXQgd2lsbCByZXR1cm4gdGhlIGxvY2FsZSBjb25maWd1cmF0aW9uXHJcbiAgICAvLyB2YXJpYWJsZXMgZm9yIHRoaXMgaW5zdGFuY2UuXHJcbiAgICBmdW5jdGlvbiBsb2NhbGUgKGtleSkge1xyXG4gICAgICAgIHZhciBuZXdMb2NhbGVEYXRhO1xyXG5cclxuICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZS5fYWJicjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdMb2NhbGVEYXRhID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZShrZXkpO1xyXG4gICAgICAgICAgICBpZiAobmV3TG9jYWxlRGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbGUgPSBuZXdMb2NhbGVEYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgbGFuZyA9IGRlcHJlY2F0ZShcclxuICAgICAgICAnbW9tZW50KCkubGFuZygpIGlzIGRlcHJlY2F0ZWQuIEluc3RlYWQsIHVzZSBtb21lbnQoKS5sb2NhbGVEYXRhKCkgdG8gZ2V0IHRoZSBsYW5ndWFnZSBjb25maWd1cmF0aW9uLiBVc2UgbW9tZW50KCkubG9jYWxlKCkgdG8gY2hhbmdlIGxhbmd1YWdlcy4nLFxyXG4gICAgICAgIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGUoa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgZnVuY3Rpb24gbG9jYWxlRGF0YSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdGFydE9mICh1bml0cykge1xyXG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xyXG4gICAgICAgIC8vIHRoZSBmb2xsb3dpbmcgc3dpdGNoIGludGVudGlvbmFsbHkgb21pdHMgYnJlYWsga2V5d29yZHNcclxuICAgICAgICAvLyB0byB1dGlsaXplIGZhbGxpbmcgdGhyb3VnaCB0aGUgY2FzZXMuXHJcbiAgICAgICAgc3dpdGNoICh1bml0cykge1xyXG4gICAgICAgIGNhc2UgJ3llYXInOlxyXG4gICAgICAgICAgICB0aGlzLm1vbnRoKDApO1xyXG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXHJcbiAgICAgICAgY2FzZSAncXVhcnRlcic6XHJcbiAgICAgICAgY2FzZSAnbW9udGgnOlxyXG4gICAgICAgICAgICB0aGlzLmRhdGUoMSk7XHJcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cclxuICAgICAgICBjYXNlICd3ZWVrJzpcclxuICAgICAgICBjYXNlICdpc29XZWVrJzpcclxuICAgICAgICBjYXNlICdkYXknOlxyXG4gICAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgICAgICB0aGlzLmhvdXJzKDApO1xyXG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXHJcbiAgICAgICAgY2FzZSAnaG91cic6XHJcbiAgICAgICAgICAgIHRoaXMubWludXRlcygwKTtcclxuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xyXG4gICAgICAgIGNhc2UgJ21pbnV0ZSc6XHJcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kcygwKTtcclxuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xyXG4gICAgICAgIGNhc2UgJ3NlY29uZCc6XHJcbiAgICAgICAgICAgIHRoaXMubWlsbGlzZWNvbmRzKDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gd2Vla3MgYXJlIGEgc3BlY2lhbCBjYXNlXHJcbiAgICAgICAgaWYgKHVuaXRzID09PSAnd2VlaycpIHtcclxuICAgICAgICAgICAgdGhpcy53ZWVrZGF5KDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodW5pdHMgPT09ICdpc29XZWVrJykge1xyXG4gICAgICAgICAgICB0aGlzLmlzb1dlZWtkYXkoMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBxdWFydGVycyBhcmUgYWxzbyBzcGVjaWFsXHJcbiAgICAgICAgaWYgKHVuaXRzID09PSAncXVhcnRlcicpIHtcclxuICAgICAgICAgICAgdGhpcy5tb250aChNYXRoLmZsb29yKHRoaXMubW9udGgoKSAvIDMpICogMyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBlbmRPZiAodW5pdHMpIHtcclxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcclxuICAgICAgICBpZiAodW5pdHMgPT09IHVuZGVmaW5lZCB8fCB1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICdkYXRlJyBpcyBhbiBhbGlhcyBmb3IgJ2RheScsIHNvIGl0IHNob3VsZCBiZSBjb25zaWRlcmVkIGFzIHN1Y2guXHJcbiAgICAgICAgaWYgKHVuaXRzID09PSAnZGF0ZScpIHtcclxuICAgICAgICAgICAgdW5pdHMgPSAnZGF5JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0T2YodW5pdHMpLmFkZCgxLCAodW5pdHMgPT09ICdpc29XZWVrJyA/ICd3ZWVrJyA6IHVuaXRzKSkuc3VidHJhY3QoMSwgJ21zJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9fdHlwZV9fdmFsdWVPZiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2QudmFsdWVPZigpIC0gKCh0aGlzLl9vZmZzZXQgfHwgMCkgKiA2MDAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdW5peCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy52YWx1ZU9mKCkgLyAxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b0RhdGUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vZmZzZXQgPyBuZXcgRGF0ZSh0aGlzLnZhbHVlT2YoKSkgOiB0aGlzLl9kO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvQXJyYXkgKCkge1xyXG4gICAgICAgIHZhciBtID0gdGhpcztcclxuICAgICAgICByZXR1cm4gW20ueWVhcigpLCBtLm1vbnRoKCksIG0uZGF0ZSgpLCBtLmhvdXIoKSwgbS5taW51dGUoKSwgbS5zZWNvbmQoKSwgbS5taWxsaXNlY29uZCgpXTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b09iamVjdCAoKSB7XHJcbiAgICAgICAgdmFyIG0gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHllYXJzOiBtLnllYXIoKSxcclxuICAgICAgICAgICAgbW9udGhzOiBtLm1vbnRoKCksXHJcbiAgICAgICAgICAgIGRhdGU6IG0uZGF0ZSgpLFxyXG4gICAgICAgICAgICBob3VyczogbS5ob3VycygpLFxyXG4gICAgICAgICAgICBtaW51dGVzOiBtLm1pbnV0ZXMoKSxcclxuICAgICAgICAgICAgc2Vjb25kczogbS5zZWNvbmRzKCksXHJcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kczogbS5taWxsaXNlY29uZHMoKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9KU09OICgpIHtcclxuICAgICAgICAvLyBuZXcgRGF0ZShOYU4pLnRvSlNPTigpID09PSBudWxsXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpcy50b0lTT1N0cmluZygpIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb21lbnRfdmFsaWRfX2lzVmFsaWQgKCkge1xyXG4gICAgICAgIHJldHVybiB2YWxpZF9faXNWYWxpZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzaW5nRmxhZ3MgKCkge1xyXG4gICAgICAgIHJldHVybiBleHRlbmQoe30sIGdldFBhcnNpbmdGbGFncyh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW52YWxpZEF0ICgpIHtcclxuICAgICAgICByZXR1cm4gZ2V0UGFyc2luZ0ZsYWdzKHRoaXMpLm92ZXJmbG93O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0aW9uRGF0YSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbnB1dDogdGhpcy5faSxcclxuICAgICAgICAgICAgZm9ybWF0OiB0aGlzLl9mLFxyXG4gICAgICAgICAgICBsb2NhbGU6IHRoaXMuX2xvY2FsZSxcclxuICAgICAgICAgICAgaXNVVEM6IHRoaXMuX2lzVVRDLFxyXG4gICAgICAgICAgICBzdHJpY3Q6IHRoaXMuX3N0cmljdFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnZ2cnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndlZWtZZWFyKCkgJSAxMDA7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ0dHJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc29XZWVrWWVhcigpICUgMTAwO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkV2Vla1llYXJGb3JtYXRUb2tlbiAodG9rZW4sIGdldHRlcikge1xyXG4gICAgICAgIGFkZEZvcm1hdFRva2VuKDAsIFt0b2tlbiwgdG9rZW4ubGVuZ3RoXSwgMCwgZ2V0dGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdnZ2dnJywgICAgICd3ZWVrWWVhcicpO1xyXG4gICAgYWRkV2Vla1llYXJGb3JtYXRUb2tlbignZ2dnZ2cnLCAgICAnd2Vla1llYXInKTtcclxuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ0dHR0cnLCAgJ2lzb1dlZWtZZWFyJyk7XHJcbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdHR0dHRycsICdpc29XZWVrWWVhcicpO1xyXG5cclxuICAgIC8vIEFMSUFTRVNcclxuXHJcbiAgICBhZGRVbml0QWxpYXMoJ3dlZWtZZWFyJywgJ2dnJyk7XHJcbiAgICBhZGRVbml0QWxpYXMoJ2lzb1dlZWtZZWFyJywgJ0dHJyk7XHJcblxyXG4gICAgLy8gUEFSU0lOR1xyXG5cclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0cnLCAgICAgIG1hdGNoU2lnbmVkKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2cnLCAgICAgIG1hdGNoU2lnbmVkKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHJywgICAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2dnJywgICAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHR0cnLCAgIG1hdGNoMXRvNCwgbWF0Y2g0KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2dnZ2cnLCAgIG1hdGNoMXRvNCwgbWF0Y2g0KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHR0dHJywgIG1hdGNoMXRvNiwgbWF0Y2g2KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2dnZ2dnJywgIG1hdGNoMXRvNiwgbWF0Y2g2KTtcclxuXHJcbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2dnZ2cnLCAnZ2dnZ2cnLCAnR0dHRycsICdHR0dHRyddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcclxuICAgICAgICB3ZWVrW3Rva2VuLnN1YnN0cigwLCAyKV0gPSB0b0ludChpbnB1dCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2dnJywgJ0dHJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xyXG4gICAgICAgIHdlZWtbdG9rZW5dID0gdXRpbHNfaG9va3NfX2hvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXRXZWVrWWVhciAoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gZ2V0U2V0V2Vla1llYXJIZWxwZXIuY2FsbCh0aGlzLFxyXG4gICAgICAgICAgICAgICAgaW5wdXQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndlZWsoKSxcclxuICAgICAgICAgICAgICAgIHRoaXMud2Vla2RheSgpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWsuZG93LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWsuZG95KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXRJU09XZWVrWWVhciAoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gZ2V0U2V0V2Vla1llYXJIZWxwZXIuY2FsbCh0aGlzLFxyXG4gICAgICAgICAgICAgICAgaW5wdXQsIHRoaXMuaXNvV2VlaygpLCB0aGlzLmlzb1dlZWtkYXkoKSwgMSwgNCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SVNPV2Vla3NJblllYXIgKCkge1xyXG4gICAgICAgIHJldHVybiB3ZWVrc0luWWVhcih0aGlzLnllYXIoKSwgMSwgNCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0V2Vla3NJblllYXIgKCkge1xyXG4gICAgICAgIHZhciB3ZWVrSW5mbyA9IHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrO1xyXG4gICAgICAgIHJldHVybiB3ZWVrc0luWWVhcih0aGlzLnllYXIoKSwgd2Vla0luZm8uZG93LCB3ZWVrSW5mby5kb3kpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldFdlZWtZZWFySGVscGVyKGlucHV0LCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSkge1xyXG4gICAgICAgIHZhciB3ZWVrc1RhcmdldDtcclxuICAgICAgICBpZiAoaW5wdXQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gd2Vla09mWWVhcih0aGlzLCBkb3csIGRveSkueWVhcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3ZWVrc1RhcmdldCA9IHdlZWtzSW5ZZWFyKGlucHV0LCBkb3csIGRveSk7XHJcbiAgICAgICAgICAgIGlmICh3ZWVrID4gd2Vla3NUYXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIHdlZWsgPSB3ZWVrc1RhcmdldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc2V0V2Vla0FsbC5jYWxsKHRoaXMsIGlucHV0LCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFdlZWtBbGwod2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSB7XHJcbiAgICAgICAgdmFyIGRheU9mWWVhckRhdGEgPSBkYXlPZlllYXJGcm9tV2Vla3Mod2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSxcclxuICAgICAgICAgICAgZGF0ZSA9IGNyZWF0ZVVUQ0RhdGUoZGF5T2ZZZWFyRGF0YS55ZWFyLCAwLCBkYXlPZlllYXJEYXRhLmRheU9mWWVhcik7XHJcblxyXG4gICAgICAgIHRoaXMueWVhcihkYXRlLmdldFVUQ0Z1bGxZZWFyKCkpO1xyXG4gICAgICAgIHRoaXMubW9udGgoZGF0ZS5nZXRVVENNb250aCgpKTtcclxuICAgICAgICB0aGlzLmRhdGUoZGF0ZS5nZXRVVENEYXRlKCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignUScsIDAsICdRbycsICdxdWFydGVyJyk7XHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygncXVhcnRlcicsICdRJyk7XHJcblxyXG4gICAgLy8gUEFSU0lOR1xyXG5cclxuICAgIGFkZFJlZ2V4VG9rZW4oJ1EnLCBtYXRjaDEpO1xyXG4gICAgYWRkUGFyc2VUb2tlbignUScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcclxuICAgICAgICBhcnJheVtNT05USF0gPSAodG9JbnQoaW5wdXQpIC0gMSkgKiAzO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldFF1YXJ0ZXIgKGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyBNYXRoLmNlaWwoKHRoaXMubW9udGgoKSArIDEpIC8gMykgOiB0aGlzLm1vbnRoKChpbnB1dCAtIDEpICogMyArIHRoaXMubW9udGgoKSAlIDMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbigndycsIFsnd3cnLCAyXSwgJ3dvJywgJ3dlZWsnKTtcclxuICAgIGFkZEZvcm1hdFRva2VuKCdXJywgWydXVycsIDJdLCAnV28nLCAnaXNvV2VlaycpO1xyXG5cclxuICAgIC8vIEFMSUFTRVNcclxuXHJcbiAgICBhZGRVbml0QWxpYXMoJ3dlZWsnLCAndycpO1xyXG4gICAgYWRkVW5pdEFsaWFzKCdpc29XZWVrJywgJ1cnKTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbigndycsICBtYXRjaDF0bzIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignd3cnLCBtYXRjaDF0bzIsIG1hdGNoMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdXJywgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdXVycsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcclxuXHJcbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ3cnLCAnd3cnLCAnVycsICdXVyddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcclxuICAgICAgICB3ZWVrW3Rva2VuLnN1YnN0cigwLCAxKV0gPSB0b0ludChpbnB1dCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIRUxQRVJTXHJcblxyXG4gICAgLy8gTE9DQUxFU1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWsgKG1vbSkge1xyXG4gICAgICAgIHJldHVybiB3ZWVrT2ZZZWFyKG1vbSwgdGhpcy5fd2Vlay5kb3csIHRoaXMuX3dlZWsuZG95KS53ZWVrO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2VlayA9IHtcclxuICAgICAgICBkb3cgOiAwLCAvLyBTdW5kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cclxuICAgICAgICBkb3kgOiA2ICAvLyBUaGUgd2VlayB0aGF0IGNvbnRhaW5zIEphbiAxc3QgaXMgdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHllYXIuXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvY2FsZUZpcnN0RGF5T2ZXZWVrICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2Vlay5kb3c7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9jYWxlRmlyc3REYXlPZlllYXIgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrLmRveTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0V2VlayAoaW5wdXQpIHtcclxuICAgICAgICB2YXIgd2VlayA9IHRoaXMubG9jYWxlRGF0YSgpLndlZWsodGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrIDogdGhpcy5hZGQoKGlucHV0IC0gd2VlaykgKiA3LCAnZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldElTT1dlZWsgKGlucHV0KSB7XHJcbiAgICAgICAgdmFyIHdlZWsgPSB3ZWVrT2ZZZWFyKHRoaXMsIDEsIDQpLndlZWs7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrIDogdGhpcy5hZGQoKGlucHV0IC0gd2VlaykgKiA3LCAnZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignRCcsIFsnREQnLCAyXSwgJ0RvJywgJ2RhdGUnKTtcclxuXHJcbiAgICAvLyBBTElBU0VTXHJcblxyXG4gICAgYWRkVW5pdEFsaWFzKCdkYXRlJywgJ0QnKTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbignRCcsICBtYXRjaDF0bzIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignREQnLCBtYXRjaDF0bzIsIG1hdGNoMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdEbycsIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzU3RyaWN0ID8gbG9jYWxlLl9vcmRpbmFsUGFyc2UgOiBsb2NhbGUuX29yZGluYWxQYXJzZUxlbmllbnQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRQYXJzZVRva2VuKFsnRCcsICdERCddLCBEQVRFKTtcclxuICAgIGFkZFBhcnNlVG9rZW4oJ0RvJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xyXG4gICAgICAgIGFycmF5W0RBVEVdID0gdG9JbnQoaW5wdXQubWF0Y2gobWF0Y2gxdG8yKVswXSwgMTApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIHZhciBnZXRTZXREYXlPZk1vbnRoID0gbWFrZUdldFNldCgnRGF0ZScsIHRydWUpO1xyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignZCcsIDAsICdkbycsICdkYXknKTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignZGQnLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLndlZWtkYXlzTWluKHRoaXMsIGZvcm1hdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignZGRkJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5c1Nob3J0KHRoaXMsIGZvcm1hdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignZGRkZCcsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXModGhpcywgZm9ybWF0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdlJywgMCwgMCwgJ3dlZWtkYXknKTtcclxuICAgIGFkZEZvcm1hdFRva2VuKCdFJywgMCwgMCwgJ2lzb1dlZWtkYXknKTtcclxuXHJcbiAgICAvLyBBTElBU0VTXHJcblxyXG4gICAgYWRkVW5pdEFsaWFzKCdkYXknLCAnZCcpO1xyXG4gICAgYWRkVW5pdEFsaWFzKCd3ZWVrZGF5JywgJ2UnKTtcclxuICAgIGFkZFVuaXRBbGlhcygnaXNvV2Vla2RheScsICdFJyk7XHJcblxyXG4gICAgLy8gUEFSU0lOR1xyXG5cclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2QnLCAgICBtYXRjaDF0bzIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignZScsICAgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdFJywgICAgbWF0Y2gxdG8yKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkJywgICBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbGUud2Vla2RheXNNaW5SZWdleChpc1N0cmljdCk7XHJcbiAgICB9KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkZCcsICAgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcclxuICAgICAgICByZXR1cm4gbG9jYWxlLndlZWtkYXlzU2hvcnRSZWdleChpc1N0cmljdCk7XHJcbiAgICB9KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkZGQnLCAgIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5c1JlZ2V4KGlzU3RyaWN0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFsnZGQnLCAnZGRkJywgJ2RkZGQnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XHJcbiAgICAgICAgdmFyIHdlZWtkYXkgPSBjb25maWcuX2xvY2FsZS53ZWVrZGF5c1BhcnNlKGlucHV0LCB0b2tlbiwgY29uZmlnLl9zdHJpY3QpO1xyXG4gICAgICAgIC8vIGlmIHdlIGRpZG4ndCBnZXQgYSB3ZWVrZGF5IG5hbWUsIG1hcmsgdGhlIGRhdGUgYXMgaW52YWxpZFxyXG4gICAgICAgIGlmICh3ZWVrZGF5ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgd2Vlay5kID0gd2Vla2RheTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5pbnZhbGlkV2Vla2RheSA9IGlucHV0O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFsnZCcsICdlJywgJ0UnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XHJcbiAgICAgICAgd2Vla1t0b2tlbl0gPSB0b0ludChpbnB1dCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIRUxQRVJTXHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VXZWVrZGF5KGlucHV0LCBsb2NhbGUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWlzTmFOKGlucHV0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoaW5wdXQsIDEwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlucHV0ID0gbG9jYWxlLndlZWtkYXlzUGFyc2UoaW5wdXQpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIExPQ0FMRVNcclxuXHJcbiAgICB2YXIgZGVmYXVsdExvY2FsZVdlZWtkYXlzID0gJ1N1bmRheV9Nb25kYXlfVHVlc2RheV9XZWRuZXNkYXlfVGh1cnNkYXlfRnJpZGF5X1NhdHVyZGF5Jy5zcGxpdCgnXycpO1xyXG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXMgKG0sIGZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX3dlZWtkYXlzKSA/IHRoaXMuX3dlZWtkYXlzW20uZGF5KCldIDpcclxuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNbdGhpcy5fd2Vla2RheXMuaXNGb3JtYXQudGVzdChmb3JtYXQpID8gJ2Zvcm1hdCcgOiAnc3RhbmRhbG9uZSddW20uZGF5KCldO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXNTaG9ydCA9ICdTdW5fTW9uX1R1ZV9XZWRfVGh1X0ZyaV9TYXQnLnNwbGl0KCdfJyk7XHJcbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrZGF5c1Nob3J0IChtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU2hvcnRbbS5kYXkoKV07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVXZWVrZGF5c01pbiA9ICdTdV9Nb19UdV9XZV9UaF9Gcl9TYScuc3BsaXQoJ18nKTtcclxuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzTWluIChtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzTWluW20uZGF5KCldO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRheV9vZl93ZWVrX19oYW5kbGVTdHJpY3RQYXJzZSh3ZWVrZGF5TmFtZSwgZm9ybWF0LCBzdHJpY3QpIHtcclxuICAgICAgICB2YXIgaSwgaWksIG1vbSwgbGxjID0gd2Vla2RheU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgbW9tID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKFsyMDAwLCAxXSkuZGF5KGkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZVtpXSA9IHRoaXMud2Vla2RheXNNaW4obW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZVtpXSA9IHRoaXMud2Vla2RheXNTaG9ydChtb20sICcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZVtpXSA9IHRoaXMud2Vla2RheXMobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0cmljdCkge1xyXG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSAnZGRkZCcpIHtcclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3dlZWtkYXlzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ2RkZCcpIHtcclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdkZGRkJykge1xyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fd2Vla2RheXNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbWluV2Vla2RheXNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0ID09PSAnZGRkJykge1xyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3dlZWtkYXlzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbWluV2Vla2RheXNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3dlZWtkYXlzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrZGF5c1BhcnNlICh3ZWVrZGF5TmFtZSwgZm9ybWF0LCBzdHJpY3QpIHtcclxuICAgICAgICB2YXIgaSwgbW9tLCByZWdleDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VFeGFjdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF5X29mX3dlZWtfX2hhbmRsZVN0cmljdFBhcnNlLmNhbGwodGhpcywgd2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZSkge1xyXG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2UgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxyXG5cclxuICAgICAgICAgICAgbW9tID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKFsyMDAwLCAxXSkuZGF5KGkpO1xyXG4gICAgICAgICAgICBpZiAoc3RyaWN0ICYmICF0aGlzLl9mdWxsV2Vla2RheXNQYXJzZVtpXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMud2Vla2RheXMobW9tLCAnJykucmVwbGFjZSgnLicsICdcXC4/JykgKyAnJCcsICdpJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMud2Vla2RheXNTaG9ydChtb20sICcnKS5yZXBsYWNlKCcuJywgJ1xcLj8nKSArICckJywgJ2knKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMud2Vla2RheXNNaW4obW9tLCAnJykucmVwbGFjZSgnLicsICdcXC4/JykgKyAnJCcsICdpJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlW2ldKSB7XHJcbiAgICAgICAgICAgICAgICByZWdleCA9ICdeJyArIHRoaXMud2Vla2RheXMobW9tLCAnJykgKyAnfF4nICsgdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpICsgJ3xeJyArIHRoaXMud2Vla2RheXNNaW4obW9tLCAnJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cChyZWdleC5yZXBsYWNlKCcuJywgJycpLCAnaScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHRlc3QgdGhlIHJlZ2V4XHJcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnZGRkZCcgJiYgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdkZGQnICYmIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ2RkJyAmJiB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXREYXlPZldlZWsgKGlucHV0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBkYXkgPSB0aGlzLl9pc1VUQyA/IHRoaXMuX2QuZ2V0VVRDRGF5KCkgOiB0aGlzLl9kLmdldERheSgpO1xyXG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlucHV0ID0gcGFyc2VXZWVrZGF5KGlucHV0LCB0aGlzLmxvY2FsZURhdGEoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZChpbnB1dCAtIGRheSwgJ2QnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXRMb2NhbGVEYXlPZldlZWsgKGlucHV0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB3ZWVrZGF5ID0gKHRoaXMuZGF5KCkgKyA3IC0gdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWsuZG93KSAlIDc7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrZGF5IDogdGhpcy5hZGQoaW5wdXQgLSB3ZWVrZGF5LCAnZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldElTT0RheU9mV2VlayAoaW5wdXQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYmVoYXZlcyB0aGUgc2FtZSBhcyBtb21lbnQjZGF5IGV4Y2VwdFxyXG4gICAgICAgIC8vIGFzIGEgZ2V0dGVyLCByZXR1cm5zIDcgaW5zdGVhZCBvZiAwICgxLTcgcmFuZ2UgaW5zdGVhZCBvZiAwLTYpXHJcbiAgICAgICAgLy8gYXMgYSBzZXR0ZXIsIHN1bmRheSBzaG91bGQgYmVsb25nIHRvIHRoZSBwcmV2aW91cyB3ZWVrLlxyXG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gdGhpcy5kYXkoKSB8fCA3IDogdGhpcy5kYXkodGhpcy5kYXkoKSAlIDcgPyBpbnB1dCA6IGlucHV0IC0gNyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRXZWVrZGF5c1JlZ2V4ID0gbWF0Y2hXb3JkO1xyXG4gICAgZnVuY3Rpb24gd2Vla2RheXNSZWdleCAoaXNTdHJpY3QpIHtcclxuICAgICAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XHJcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzUmVnZXgnKSkge1xyXG4gICAgICAgICAgICAgICAgY29tcHV0ZVdlZWtkYXlzUGFyc2UuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNTdHJpY3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1N0cmljdFJlZ2V4O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzUmVnZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1N0cmljdFJlZ2V4IDogdGhpcy5fd2Vla2RheXNSZWdleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRXZWVrZGF5c1Nob3J0UmVnZXggPSBtYXRjaFdvcmQ7XHJcbiAgICBmdW5jdGlvbiB3ZWVrZGF5c1Nob3J0UmVnZXggKGlzU3RyaWN0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VFeGFjdCkge1xyXG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcclxuICAgICAgICAgICAgICAgIGNvbXB1dGVXZWVrZGF5c1BhcnNlLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFN0cmljdFJlZ2V4O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU2hvcnRSZWdleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNTaG9ydFN0cmljdFJlZ2V4IDogdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdFdlZWtkYXlzTWluUmVnZXggPSBtYXRjaFdvcmQ7XHJcbiAgICBmdW5jdGlvbiB3ZWVrZGF5c01pblJlZ2V4IChpc1N0cmljdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcclxuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wdXRlV2Vla2RheXNQYXJzZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc1N0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNNaW5SZWdleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4ICYmIGlzU3RyaWN0ID9cclxuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXggOiB0aGlzLl93ZWVrZGF5c01pblJlZ2V4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gY29tcHV0ZVdlZWtkYXlzUGFyc2UgKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNtcExlblJldihhLCBiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG1pblBpZWNlcyA9IFtdLCBzaG9ydFBpZWNlcyA9IFtdLCBsb25nUGllY2VzID0gW10sIG1peGVkUGllY2VzID0gW10sXHJcbiAgICAgICAgICAgIGksIG1vbSwgbWlucCwgc2hvcnRwLCBsb25ncDtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxyXG4gICAgICAgICAgICBtb20gPSBjcmVhdGVfdXRjX19jcmVhdGVVVEMoWzIwMDAsIDFdKS5kYXkoaSk7XHJcbiAgICAgICAgICAgIG1pbnAgPSB0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpO1xyXG4gICAgICAgICAgICBzaG9ydHAgPSB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJyk7XHJcbiAgICAgICAgICAgIGxvbmdwID0gdGhpcy53ZWVrZGF5cyhtb20sICcnKTtcclxuICAgICAgICAgICAgbWluUGllY2VzLnB1c2gobWlucCk7XHJcbiAgICAgICAgICAgIHNob3J0UGllY2VzLnB1c2goc2hvcnRwKTtcclxuICAgICAgICAgICAgbG9uZ1BpZWNlcy5wdXNoKGxvbmdwKTtcclxuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaChtaW5wKTtcclxuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaChzaG9ydHApO1xyXG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKGxvbmdwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU29ydGluZyBtYWtlcyBzdXJlIGlmIG9uZSB3ZWVrZGF5IChvciBhYmJyKSBpcyBhIHByZWZpeCBvZiBhbm90aGVyIGl0XHJcbiAgICAgICAgLy8gd2lsbCBtYXRjaCB0aGUgbG9uZ2VyIHBpZWNlLlxyXG4gICAgICAgIG1pblBpZWNlcy5zb3J0KGNtcExlblJldik7XHJcbiAgICAgICAgc2hvcnRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xyXG4gICAgICAgIGxvbmdQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xyXG4gICAgICAgIG1peGVkUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgIHNob3J0UGllY2VzW2ldID0gcmVnZXhFc2NhcGUoc2hvcnRQaWVjZXNbaV0pO1xyXG4gICAgICAgICAgICBsb25nUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobG9uZ1BpZWNlc1tpXSk7XHJcbiAgICAgICAgICAgIG1peGVkUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobWl4ZWRQaWVjZXNbaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fd2Vla2RheXNSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIG1peGVkUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcclxuICAgICAgICB0aGlzLl93ZWVrZGF5c1Nob3J0UmVnZXggPSB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xyXG4gICAgICAgIHRoaXMuX3dlZWtkYXlzTWluUmVnZXggPSB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xyXG5cclxuICAgICAgICB0aGlzLl93ZWVrZGF5c1N0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbG9uZ1BpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XHJcbiAgICAgICAgdGhpcy5fd2Vla2RheXNTaG9ydFN0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgc2hvcnRQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xyXG4gICAgICAgIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBtaW5QaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignREREJywgWydEREREJywgM10sICdERERvJywgJ2RheU9mWWVhcicpO1xyXG5cclxuICAgIC8vIEFMSUFTRVNcclxuXHJcbiAgICBhZGRVbml0QWxpYXMoJ2RheU9mWWVhcicsICdEREQnKTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbignREREJywgIG1hdGNoMXRvMyk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdEREREJywgbWF0Y2gzKTtcclxuICAgIGFkZFBhcnNlVG9rZW4oWydEREQnLCAnRERERCddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcclxuICAgICAgICBjb25maWcuX2RheU9mWWVhciA9IHRvSW50KGlucHV0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhFTFBFUlNcclxuXHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0RGF5T2ZZZWFyIChpbnB1dCkge1xyXG4gICAgICAgIHZhciBkYXlPZlllYXIgPSBNYXRoLnJvdW5kKCh0aGlzLmNsb25lKCkuc3RhcnRPZignZGF5JykgLSB0aGlzLmNsb25lKCkuc3RhcnRPZigneWVhcicpKSAvIDg2NGU1KSArIDE7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyBkYXlPZlllYXIgOiB0aGlzLmFkZCgoaW5wdXQgLSBkYXlPZlllYXIpLCAnZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBmdW5jdGlvbiBoRm9ybWF0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhvdXJzKCkgJSAxMiB8fCAxMjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBrRm9ybWF0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhvdXJzKCkgfHwgMjQ7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0gnLCBbJ0hIJywgMl0sIDAsICdob3VyJyk7XHJcbiAgICBhZGRGb3JtYXRUb2tlbignaCcsIFsnaGgnLCAyXSwgMCwgaEZvcm1hdCk7XHJcbiAgICBhZGRGb3JtYXRUb2tlbignaycsIFsna2snLCAyXSwgMCwga0Zvcm1hdCk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2htbScsIDAsIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJycgKyBoRm9ybWF0LmFwcGx5KHRoaXMpICsgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2htbXNzJywgMCwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAnJyArIGhGb3JtYXQuYXBwbHkodGhpcykgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMikgK1xyXG4gICAgICAgICAgICB6ZXJvRmlsbCh0aGlzLnNlY29uZHMoKSwgMik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignSG1tJywgMCwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAnJyArIHRoaXMuaG91cnMoKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdIbW1zcycsIDAsIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJycgKyB0aGlzLmhvdXJzKCkgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMikgK1xyXG4gICAgICAgICAgICB6ZXJvRmlsbCh0aGlzLnNlY29uZHMoKSwgMik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBtZXJpZGllbSAodG9rZW4sIGxvd2VyY2FzZSkge1xyXG4gICAgICAgIGFkZEZvcm1hdFRva2VuKHRva2VuLCAwLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tZXJpZGllbSh0aGlzLmhvdXJzKCksIHRoaXMubWludXRlcygpLCBsb3dlcmNhc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG1lcmlkaWVtKCdhJywgdHJ1ZSk7XHJcbiAgICBtZXJpZGllbSgnQScsIGZhbHNlKTtcclxuXHJcbiAgICAvLyBBTElBU0VTXHJcblxyXG4gICAgYWRkVW5pdEFsaWFzKCdob3VyJywgJ2gnKTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgZnVuY3Rpb24gbWF0Y2hNZXJpZGllbSAoaXNTdHJpY3QsIGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbGUuX21lcmlkaWVtUGFyc2U7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbignYScsICBtYXRjaE1lcmlkaWVtKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0EnLCAgbWF0Y2hNZXJpZGllbSk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdIJywgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdoJywgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdISCcsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2hoJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xyXG5cclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2htbScsIG1hdGNoM3RvNCk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdobW1zcycsIG1hdGNoNXRvNik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdIbW0nLCBtYXRjaDN0bzQpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignSG1tc3MnLCBtYXRjaDV0bzYpO1xyXG5cclxuICAgIGFkZFBhcnNlVG9rZW4oWydIJywgJ0hIJ10sIEhPVVIpO1xyXG4gICAgYWRkUGFyc2VUb2tlbihbJ2EnLCAnQSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcclxuICAgICAgICBjb25maWcuX2lzUG0gPSBjb25maWcuX2xvY2FsZS5pc1BNKGlucHV0KTtcclxuICAgICAgICBjb25maWcuX21lcmlkaWVtID0gaW5wdXQ7XHJcbiAgICB9KTtcclxuICAgIGFkZFBhcnNlVG9rZW4oWydoJywgJ2hoJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xyXG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQpO1xyXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICBhZGRQYXJzZVRva2VuKCdobW0nLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcclxuICAgICAgICB2YXIgcG9zID0gaW5wdXQubGVuZ3RoIC0gMjtcclxuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MpKTtcclxuICAgICAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvcykpO1xyXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICBhZGRQYXJzZVRva2VuKCdobW1zcycsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xyXG4gICAgICAgIHZhciBwb3MxID0gaW5wdXQubGVuZ3RoIC0gNDtcclxuICAgICAgICB2YXIgcG9zMiA9IGlucHV0Lmxlbmd0aCAtIDI7XHJcbiAgICAgICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dC5zdWJzdHIoMCwgcG9zMSkpO1xyXG4gICAgICAgIGFycmF5W01JTlVURV0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMSwgMikpO1xyXG4gICAgICAgIGFycmF5W1NFQ09ORF0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMikpO1xyXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICBhZGRQYXJzZVRva2VuKCdIbW0nLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcclxuICAgICAgICB2YXIgcG9zID0gaW5wdXQubGVuZ3RoIC0gMjtcclxuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MpKTtcclxuICAgICAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvcykpO1xyXG4gICAgfSk7XHJcbiAgICBhZGRQYXJzZVRva2VuKCdIbW1zcycsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xyXG4gICAgICAgIHZhciBwb3MxID0gaW5wdXQubGVuZ3RoIC0gNDtcclxuICAgICAgICB2YXIgcG9zMiA9IGlucHV0Lmxlbmd0aCAtIDI7XHJcbiAgICAgICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dC5zdWJzdHIoMCwgcG9zMSkpO1xyXG4gICAgICAgIGFycmF5W01JTlVURV0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMSwgMikpO1xyXG4gICAgICAgIGFycmF5W1NFQ09ORF0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMikpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTE9DQUxFU1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvY2FsZUlzUE0gKGlucHV0KSB7XHJcbiAgICAgICAgLy8gSUU4IFF1aXJrcyBNb2RlICYgSUU3IFN0YW5kYXJkcyBNb2RlIGRvIG5vdCBhbGxvdyBhY2Nlc3Npbmcgc3RyaW5ncyBsaWtlIGFycmF5c1xyXG4gICAgICAgIC8vIFVzaW5nIGNoYXJBdCBzaG91bGQgYmUgbW9yZSBjb21wYXRpYmxlLlxyXG4gICAgICAgIHJldHVybiAoKGlucHV0ICsgJycpLnRvTG93ZXJDYXNlKCkuY2hhckF0KDApID09PSAncCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0TG9jYWxlTWVyaWRpZW1QYXJzZSA9IC9bYXBdXFwuP20/XFwuPy9pO1xyXG4gICAgZnVuY3Rpb24gbG9jYWxlTWVyaWRpZW0gKGhvdXJzLCBtaW51dGVzLCBpc0xvd2VyKSB7XHJcbiAgICAgICAgaWYgKGhvdXJzID4gMTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlzTG93ZXIgPyAncG0nIDogJ1BNJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gaXNMb3dlciA/ICdhbScgOiAnQU0nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIC8vIFNldHRpbmcgdGhlIGhvdXIgc2hvdWxkIGtlZXAgdGhlIHRpbWUsIGJlY2F1c2UgdGhlIHVzZXIgZXhwbGljaXRseVxyXG4gICAgLy8gc3BlY2lmaWVkIHdoaWNoIGhvdXIgaGUgd2FudHMuIFNvIHRyeWluZyB0byBtYWludGFpbiB0aGUgc2FtZSBob3VyIChpblxyXG4gICAgLy8gYSBuZXcgdGltZXpvbmUpIG1ha2VzIHNlbnNlLiBBZGRpbmcvc3VidHJhY3RpbmcgaG91cnMgZG9lcyBub3QgZm9sbG93XHJcbiAgICAvLyB0aGlzIHJ1bGUuXHJcbiAgICB2YXIgZ2V0U2V0SG91ciA9IG1ha2VHZXRTZXQoJ0hvdXJzJywgdHJ1ZSk7XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdtJywgWydtbScsIDJdLCAwLCAnbWludXRlJyk7XHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygnbWludXRlJywgJ20nKTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbignbScsICBtYXRjaDF0bzIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignbW0nLCBtYXRjaDF0bzIsIG1hdGNoMik7XHJcbiAgICBhZGRQYXJzZVRva2VuKFsnbScsICdtbSddLCBNSU5VVEUpO1xyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICB2YXIgZ2V0U2V0TWludXRlID0gbWFrZUdldFNldCgnTWludXRlcycsIGZhbHNlKTtcclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ3MnLCBbJ3NzJywgMl0sIDAsICdzZWNvbmQnKTtcclxuXHJcbiAgICAvLyBBTElBU0VTXHJcblxyXG4gICAgYWRkVW5pdEFsaWFzKCdzZWNvbmQnLCAncycpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdzJywgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdzcycsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcclxuICAgIGFkZFBhcnNlVG9rZW4oWydzJywgJ3NzJ10sIFNFQ09ORCk7XHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIHZhciBnZXRTZXRTZWNvbmQgPSBtYWtlR2V0U2V0KCdTZWNvbmRzJywgZmFsc2UpO1xyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignUycsIDAsIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gfn4odGhpcy5taWxsaXNlY29uZCgpIC8gMTAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1MnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB+fih0aGlzLm1pbGxpc2Vjb25kKCkgLyAxMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTUycsIDNdLCAwLCAnbWlsbGlzZWNvbmQnKTtcclxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTUycsIDRdLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwO1xyXG4gICAgfSk7XHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTJywgNV0sIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwO1xyXG4gICAgfSk7XHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTUycsIDZdLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDA7XHJcbiAgICB9KTtcclxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1NTUycsIDddLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDAwO1xyXG4gICAgfSk7XHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTU1NTJywgOF0sIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDAwO1xyXG4gICAgfSk7XHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTU1NTUycsIDldLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDAwMDA7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygnbWlsbGlzZWNvbmQnLCAnbXMnKTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbignUycsICAgIG1hdGNoMXRvMywgbWF0Y2gxKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ1NTJywgICBtYXRjaDF0bzMsIG1hdGNoMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdTU1MnLCAgbWF0Y2gxdG8zLCBtYXRjaDMpO1xyXG5cclxuICAgIHZhciB0b2tlbjtcclxuICAgIGZvciAodG9rZW4gPSAnU1NTUyc7IHRva2VuLmxlbmd0aCA8PSA5OyB0b2tlbiArPSAnUycpIHtcclxuICAgICAgICBhZGRSZWdleFRva2VuKHRva2VuLCBtYXRjaFVuc2lnbmVkKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZU1zKGlucHV0LCBhcnJheSkge1xyXG4gICAgICAgIGFycmF5W01JTExJU0VDT05EXSA9IHRvSW50KCgnMC4nICsgaW5wdXQpICogMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh0b2tlbiA9ICdTJzsgdG9rZW4ubGVuZ3RoIDw9IDk7IHRva2VuICs9ICdTJykge1xyXG4gICAgICAgIGFkZFBhcnNlVG9rZW4odG9rZW4sIHBhcnNlTXMpO1xyXG4gICAgfVxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIHZhciBnZXRTZXRNaWxsaXNlY29uZCA9IG1ha2VHZXRTZXQoJ01pbGxpc2Vjb25kcycsIGZhbHNlKTtcclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ3onLCAgMCwgMCwgJ3pvbmVBYmJyJyk7XHJcbiAgICBhZGRGb3JtYXRUb2tlbignenonLCAwLCAwLCAnem9uZU5hbWUnKTtcclxuXHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Wm9uZUFiYnIgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1VUQyA/ICdVVEMnIDogJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Wm9uZU5hbWUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1VUQyA/ICdDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZScgOiAnJztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbW9tZW50UHJvdG90eXBlX19wcm90byA9IE1vbWVudC5wcm90b3R5cGU7XHJcblxyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5hZGQgICAgICAgICAgICAgICA9IGFkZF9zdWJ0cmFjdF9fYWRkO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5jYWxlbmRhciAgICAgICAgICA9IG1vbWVudF9jYWxlbmRhcl9fY2FsZW5kYXI7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmNsb25lICAgICAgICAgICAgID0gY2xvbmU7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRpZmYgICAgICAgICAgICAgID0gZGlmZjtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZW5kT2YgICAgICAgICAgICAgPSBlbmRPZjtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZm9ybWF0ICAgICAgICAgICAgPSBmb3JtYXQ7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmZyb20gICAgICAgICAgICAgID0gZnJvbTtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZnJvbU5vdyAgICAgICAgICAgPSBmcm9tTm93O1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50byAgICAgICAgICAgICAgICA9IHRvO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b05vdyAgICAgICAgICAgICA9IHRvTm93O1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5nZXQgICAgICAgICAgICAgICA9IGdldFNldDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaW52YWxpZEF0ICAgICAgICAgPSBpbnZhbGlkQXQ7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzQWZ0ZXIgICAgICAgICAgID0gaXNBZnRlcjtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNCZWZvcmUgICAgICAgICAgPSBpc0JlZm9yZTtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNCZXR3ZWVuICAgICAgICAgPSBpc0JldHdlZW47XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzU2FtZSAgICAgICAgICAgID0gaXNTYW1lO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1NhbWVPckFmdGVyICAgICA9IGlzU2FtZU9yQWZ0ZXI7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzU2FtZU9yQmVmb3JlICAgID0gaXNTYW1lT3JCZWZvcmU7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzVmFsaWQgICAgICAgICAgID0gbW9tZW50X3ZhbGlkX19pc1ZhbGlkO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5sYW5nICAgICAgICAgICAgICA9IGxhbmc7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmxvY2FsZSAgICAgICAgICAgID0gbG9jYWxlO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5sb2NhbGVEYXRhICAgICAgICA9IGxvY2FsZURhdGE7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1heCAgICAgICAgICAgICAgID0gcHJvdG90eXBlTWF4O1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5taW4gICAgICAgICAgICAgICA9IHByb3RvdHlwZU1pbjtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ucGFyc2luZ0ZsYWdzICAgICAgPSBwYXJzaW5nRmxhZ3M7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnNldCAgICAgICAgICAgICAgID0gZ2V0U2V0O1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5zdGFydE9mICAgICAgICAgICA9IHN0YXJ0T2Y7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnN1YnRyYWN0ICAgICAgICAgID0gYWRkX3N1YnRyYWN0X19zdWJ0cmFjdDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9BcnJheSAgICAgICAgICAgPSB0b0FycmF5O1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b09iamVjdCAgICAgICAgICA9IHRvT2JqZWN0O1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b0RhdGUgICAgICAgICAgICA9IHRvRGF0ZTtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9JU09TdHJpbmcgICAgICAgPSBtb21lbnRfZm9ybWF0X190b0lTT1N0cmluZztcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9KU09OICAgICAgICAgICAgPSB0b0pTT047XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvU3RyaW5nICAgICAgICAgID0gdG9TdHJpbmc7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnVuaXggICAgICAgICAgICAgID0gdW5peDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udmFsdWVPZiAgICAgICAgICAgPSB0b190eXBlX192YWx1ZU9mO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5jcmVhdGlvbkRhdGEgICAgICA9IGNyZWF0aW9uRGF0YTtcclxuXHJcbiAgICAvLyBZZWFyXHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnllYXIgICAgICAgPSBnZXRTZXRZZWFyO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0xlYXBZZWFyID0gZ2V0SXNMZWFwWWVhcjtcclxuXHJcbiAgICAvLyBXZWVrIFllYXJcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ud2Vla1llYXIgICAgPSBnZXRTZXRXZWVrWWVhcjtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNvV2Vla1llYXIgPSBnZXRTZXRJU09XZWVrWWVhcjtcclxuXHJcbiAgICAvLyBRdWFydGVyXHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnF1YXJ0ZXIgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnF1YXJ0ZXJzID0gZ2V0U2V0UXVhcnRlcjtcclxuXHJcbiAgICAvLyBNb250aFxyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5tb250aCAgICAgICA9IGdldFNldE1vbnRoO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5kYXlzSW5Nb250aCA9IGdldERheXNJbk1vbnRoO1xyXG5cclxuICAgIC8vIFdlZWtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ud2VlayAgICAgICAgICAgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLndlZWtzICAgICAgICA9IGdldFNldFdlZWs7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWsgICAgICAgID0gbW9tZW50UHJvdG90eXBlX19wcm90by5pc29XZWVrcyAgICAgPSBnZXRTZXRJU09XZWVrO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by53ZWVrc0luWWVhciAgICA9IGdldFdlZWtzSW5ZZWFyO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc29XZWVrc0luWWVhciA9IGdldElTT1dlZWtzSW5ZZWFyO1xyXG5cclxuICAgIC8vIERheVxyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5kYXRlICAgICAgID0gZ2V0U2V0RGF5T2ZNb250aDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF5ICAgICAgICA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF5cyAgICAgICAgICAgICA9IGdldFNldERheU9mV2VlaztcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ud2Vla2RheSAgICA9IGdldFNldExvY2FsZURheU9mV2VlaztcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNvV2Vla2RheSA9IGdldFNldElTT0RheU9mV2VlaztcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF5T2ZZZWFyICA9IGdldFNldERheU9mWWVhcjtcclxuXHJcbiAgICAvLyBIb3VyXHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmhvdXIgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmhvdXJzID0gZ2V0U2V0SG91cjtcclxuXHJcbiAgICAvLyBNaW51dGVcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWludXRlID0gbW9tZW50UHJvdG90eXBlX19wcm90by5taW51dGVzID0gZ2V0U2V0TWludXRlO1xyXG5cclxuICAgIC8vIFNlY29uZFxyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5zZWNvbmQgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnNlY29uZHMgPSBnZXRTZXRTZWNvbmQ7XHJcblxyXG4gICAgLy8gTWlsbGlzZWNvbmRcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWlsbGlzZWNvbmQgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1pbGxpc2Vjb25kcyA9IGdldFNldE1pbGxpc2Vjb25kO1xyXG5cclxuICAgIC8vIE9mZnNldFxyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by51dGNPZmZzZXQgICAgICAgICAgICA9IGdldFNldE9mZnNldDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udXRjICAgICAgICAgICAgICAgICAgPSBzZXRPZmZzZXRUb1VUQztcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubG9jYWwgICAgICAgICAgICAgICAgPSBzZXRPZmZzZXRUb0xvY2FsO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5wYXJzZVpvbmUgICAgICAgICAgICA9IHNldE9mZnNldFRvUGFyc2VkT2Zmc2V0O1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5oYXNBbGlnbmVkSG91ck9mZnNldCA9IGhhc0FsaWduZWRIb3VyT2Zmc2V0O1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0RTVCAgICAgICAgICAgICAgICA9IGlzRGF5bGlnaHRTYXZpbmdUaW1lO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0RTVFNoaWZ0ZWQgICAgICAgICA9IGlzRGF5bGlnaHRTYXZpbmdUaW1lU2hpZnRlZDtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNMb2NhbCAgICAgICAgICAgICAgPSBpc0xvY2FsO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1V0Y09mZnNldCAgICAgICAgICA9IGlzVXRjT2Zmc2V0O1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1V0YyAgICAgICAgICAgICAgICA9IGlzVXRjO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1VUQyAgICAgICAgICAgICAgICA9IGlzVXRjO1xyXG5cclxuICAgIC8vIFRpbWV6b25lXHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnpvbmVBYmJyID0gZ2V0Wm9uZUFiYnI7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnpvbmVOYW1lID0gZ2V0Wm9uZU5hbWU7XHJcblxyXG4gICAgLy8gRGVwcmVjYXRpb25zXHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRhdGVzICA9IGRlcHJlY2F0ZSgnZGF0ZXMgYWNjZXNzb3IgaXMgZGVwcmVjYXRlZC4gVXNlIGRhdGUgaW5zdGVhZC4nLCBnZXRTZXREYXlPZk1vbnRoKTtcclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubW9udGhzID0gZGVwcmVjYXRlKCdtb250aHMgYWNjZXNzb3IgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbnRoIGluc3RlYWQnLCBnZXRTZXRNb250aCk7XHJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnllYXJzICA9IGRlcHJlY2F0ZSgneWVhcnMgYWNjZXNzb3IgaXMgZGVwcmVjYXRlZC4gVXNlIHllYXIgaW5zdGVhZCcsIGdldFNldFllYXIpO1xyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by56b25lICAgPSBkZXByZWNhdGUoJ21vbWVudCgpLnpvbmUgaXMgZGVwcmVjYXRlZCwgdXNlIG1vbWVudCgpLnV0Y09mZnNldCBpbnN0ZWFkLiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTc3OScsIGdldFNldFpvbmUpO1xyXG5cclxuICAgIHZhciBtb21lbnRQcm90b3R5cGUgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1vbWVudF9fY3JlYXRlVW5peCAoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0ICogMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW9tZW50X19jcmVhdGVJblpvbmUgKCkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbF9fY3JlYXRlTG9jYWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKS5wYXJzZVpvbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdENhbGVuZGFyID0ge1xyXG4gICAgICAgIHNhbWVEYXkgOiAnW1RvZGF5IGF0XSBMVCcsXHJcbiAgICAgICAgbmV4dERheSA6ICdbVG9tb3Jyb3cgYXRdIExUJyxcclxuICAgICAgICBuZXh0V2VlayA6ICdkZGRkIFthdF0gTFQnLFxyXG4gICAgICAgIGxhc3REYXkgOiAnW1llc3RlcmRheSBhdF0gTFQnLFxyXG4gICAgICAgIGxhc3RXZWVrIDogJ1tMYXN0XSBkZGRkIFthdF0gTFQnLFxyXG4gICAgICAgIHNhbWVFbHNlIDogJ0wnXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvY2FsZV9jYWxlbmRhcl9fY2FsZW5kYXIgKGtleSwgbW9tLCBub3cpIHtcclxuICAgICAgICB2YXIgb3V0cHV0ID0gdGhpcy5fY2FsZW5kYXJba2V5XTtcclxuICAgICAgICByZXR1cm4gaXNGdW5jdGlvbihvdXRwdXQpID8gb3V0cHV0LmNhbGwobW9tLCBub3cpIDogb3V0cHV0O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0TG9uZ0RhdGVGb3JtYXQgPSB7XHJcbiAgICAgICAgTFRTICA6ICdoOm1tOnNzIEEnLFxyXG4gICAgICAgIExUICAgOiAnaDptbSBBJyxcclxuICAgICAgICBMICAgIDogJ01NL0REL1lZWVknLFxyXG4gICAgICAgIExMICAgOiAnTU1NTSBELCBZWVlZJyxcclxuICAgICAgICBMTEwgIDogJ01NTU0gRCwgWVlZWSBoOm1tIEEnLFxyXG4gICAgICAgIExMTEwgOiAnZGRkZCwgTU1NTSBELCBZWVlZIGg6bW0gQSdcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gbG9uZ0RhdGVGb3JtYXQgKGtleSkge1xyXG4gICAgICAgIHZhciBmb3JtYXQgPSB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldLFxyXG4gICAgICAgICAgICBmb3JtYXRVcHBlciA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcclxuXHJcbiAgICAgICAgaWYgKGZvcm1hdCB8fCAhZm9ybWF0VXBwZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV0gPSBmb3JtYXRVcHBlci5yZXBsYWNlKC9NTU1NfE1NfEREfGRkZGQvZywgZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsLnNsaWNlKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdEludmFsaWREYXRlID0gJ0ludmFsaWQgZGF0ZSc7XHJcblxyXG4gICAgZnVuY3Rpb24gaW52YWxpZERhdGUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZhbGlkRGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdE9yZGluYWwgPSAnJWQnO1xyXG4gICAgdmFyIGRlZmF1bHRPcmRpbmFsUGFyc2UgPSAvXFxkezEsMn0vO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9yZGluYWwgKG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcmRpbmFsLnJlcGxhY2UoJyVkJywgbnVtYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwcmVQYXJzZVBvc3RGb3JtYXQgKHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRSZWxhdGl2ZVRpbWUgPSB7XHJcbiAgICAgICAgZnV0dXJlIDogJ2luICVzJyxcclxuICAgICAgICBwYXN0ICAgOiAnJXMgYWdvJyxcclxuICAgICAgICBzICA6ICdhIGZldyBzZWNvbmRzJyxcclxuICAgICAgICBtICA6ICdhIG1pbnV0ZScsXHJcbiAgICAgICAgbW0gOiAnJWQgbWludXRlcycsXHJcbiAgICAgICAgaCAgOiAnYW4gaG91cicsXHJcbiAgICAgICAgaGggOiAnJWQgaG91cnMnLFxyXG4gICAgICAgIGQgIDogJ2EgZGF5JyxcclxuICAgICAgICBkZCA6ICclZCBkYXlzJyxcclxuICAgICAgICBNICA6ICdhIG1vbnRoJyxcclxuICAgICAgICBNTSA6ICclZCBtb250aHMnLFxyXG4gICAgICAgIHkgIDogJ2EgeWVhcicsXHJcbiAgICAgICAgeXkgOiAnJWQgeWVhcnMnXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlbGF0aXZlX19yZWxhdGl2ZVRpbWUgKG51bWJlciwgd2l0aG91dFN1ZmZpeCwgc3RyaW5nLCBpc0Z1dHVyZSkge1xyXG4gICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLl9yZWxhdGl2ZVRpbWVbc3RyaW5nXTtcclxuICAgICAgICByZXR1cm4gKGlzRnVuY3Rpb24ob3V0cHV0KSkgP1xyXG4gICAgICAgICAgICBvdXRwdXQobnVtYmVyLCB3aXRob3V0U3VmZml4LCBzdHJpbmcsIGlzRnV0dXJlKSA6XHJcbiAgICAgICAgICAgIG91dHB1dC5yZXBsYWNlKC8lZC9pLCBudW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhc3RGdXR1cmUgKGRpZmYsIG91dHB1dCkge1xyXG4gICAgICAgIHZhciBmb3JtYXQgPSB0aGlzLl9yZWxhdGl2ZVRpbWVbZGlmZiA+IDAgPyAnZnV0dXJlJyA6ICdwYXN0J107XHJcbiAgICAgICAgcmV0dXJuIGlzRnVuY3Rpb24oZm9ybWF0KSA/IGZvcm1hdChvdXRwdXQpIDogZm9ybWF0LnJlcGxhY2UoLyVzL2ksIG91dHB1dCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHByb3RvdHlwZV9fcHJvdG8gPSBMb2NhbGUucHJvdG90eXBlO1xyXG5cclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX2NhbGVuZGFyICAgICAgID0gZGVmYXVsdENhbGVuZGFyO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5jYWxlbmRhciAgICAgICAgPSBsb2NhbGVfY2FsZW5kYXJfX2NhbGVuZGFyO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5fbG9uZ0RhdGVGb3JtYXQgPSBkZWZhdWx0TG9uZ0RhdGVGb3JtYXQ7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLmxvbmdEYXRlRm9ybWF0ICA9IGxvbmdEYXRlRm9ybWF0O1xyXG4gICAgcHJvdG90eXBlX19wcm90by5faW52YWxpZERhdGUgICAgPSBkZWZhdWx0SW52YWxpZERhdGU7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLmludmFsaWREYXRlICAgICA9IGludmFsaWREYXRlO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5fb3JkaW5hbCAgICAgICAgPSBkZWZhdWx0T3JkaW5hbDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ub3JkaW5hbCAgICAgICAgID0gb3JkaW5hbDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX29yZGluYWxQYXJzZSAgID0gZGVmYXVsdE9yZGluYWxQYXJzZTtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ucHJlcGFyc2UgICAgICAgID0gcHJlUGFyc2VQb3N0Rm9ybWF0O1xyXG4gICAgcHJvdG90eXBlX19wcm90by5wb3N0Zm9ybWF0ICAgICAgPSBwcmVQYXJzZVBvc3RGb3JtYXQ7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9yZWxhdGl2ZVRpbWUgICA9IGRlZmF1bHRSZWxhdGl2ZVRpbWU7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLnJlbGF0aXZlVGltZSAgICA9IHJlbGF0aXZlX19yZWxhdGl2ZVRpbWU7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLnBhc3RGdXR1cmUgICAgICA9IHBhc3RGdXR1cmU7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLnNldCAgICAgICAgICAgICA9IGxvY2FsZV9zZXRfX3NldDtcclxuXHJcbiAgICAvLyBNb250aFxyXG4gICAgcHJvdG90eXBlX19wcm90by5tb250aHMgICAgICAgICAgICA9ICAgICAgICBsb2NhbGVNb250aHM7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9tb250aHMgICAgICAgICAgID0gZGVmYXVsdExvY2FsZU1vbnRocztcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ubW9udGhzU2hvcnQgICAgICAgPSAgICAgICAgbG9jYWxlTW9udGhzU2hvcnQ7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9tb250aHNTaG9ydCAgICAgID0gZGVmYXVsdExvY2FsZU1vbnRoc1Nob3J0O1xyXG4gICAgcHJvdG90eXBlX19wcm90by5tb250aHNQYXJzZSAgICAgICA9ICAgICAgICBsb2NhbGVNb250aHNQYXJzZTtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX21vbnRoc1JlZ2V4ICAgICAgPSBkZWZhdWx0TW9udGhzUmVnZXg7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1vbnRoc1JlZ2V4ICAgICAgID0gbW9udGhzUmVnZXg7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9tb250aHNTaG9ydFJlZ2V4ID0gZGVmYXVsdE1vbnRoc1Nob3J0UmVnZXg7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1vbnRoc1Nob3J0UmVnZXggID0gbW9udGhzU2hvcnRSZWdleDtcclxuXHJcbiAgICAvLyBXZWVrXHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWsgPSBsb2NhbGVXZWVrO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5fd2VlayA9IGRlZmF1bHRMb2NhbGVXZWVrO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5maXJzdERheU9mWWVhciA9IGxvY2FsZUZpcnN0RGF5T2ZZZWFyO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5maXJzdERheU9mV2VlayA9IGxvY2FsZUZpcnN0RGF5T2ZXZWVrO1xyXG5cclxuICAgIC8vIERheSBvZiBXZWVrXHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWtkYXlzICAgICAgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzO1xyXG4gICAgcHJvdG90eXBlX19wcm90by5fd2Vla2RheXMgICAgICA9IGRlZmF1bHRMb2NhbGVXZWVrZGF5cztcclxuICAgIHByb3RvdHlwZV9fcHJvdG8ud2Vla2RheXNNaW4gICAgPSAgICAgICAgbG9jYWxlV2Vla2RheXNNaW47XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl93ZWVrZGF5c01pbiAgID0gZGVmYXVsdExvY2FsZVdlZWtkYXlzTWluO1xyXG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrZGF5c1Nob3J0ICA9ICAgICAgICBsb2NhbGVXZWVrZGF5c1Nob3J0O1xyXG4gICAgcHJvdG90eXBlX19wcm90by5fd2Vla2RheXNTaG9ydCA9IGRlZmF1bHRMb2NhbGVXZWVrZGF5c1Nob3J0O1xyXG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrZGF5c1BhcnNlICA9ICAgICAgICBsb2NhbGVXZWVrZGF5c1BhcnNlO1xyXG5cclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX3dlZWtkYXlzUmVnZXggICAgICA9IGRlZmF1bHRXZWVrZGF5c1JlZ2V4O1xyXG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrZGF5c1JlZ2V4ICAgICAgID0gICAgICAgIHdlZWtkYXlzUmVnZXg7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl93ZWVrZGF5c1Nob3J0UmVnZXggPSBkZWZhdWx0V2Vla2RheXNTaG9ydFJlZ2V4O1xyXG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrZGF5c1Nob3J0UmVnZXggID0gICAgICAgIHdlZWtkYXlzU2hvcnRSZWdleDtcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uX3dlZWtkYXlzTWluUmVnZXggICA9IGRlZmF1bHRXZWVrZGF5c01pblJlZ2V4O1xyXG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrZGF5c01pblJlZ2V4ICAgID0gICAgICAgIHdlZWtkYXlzTWluUmVnZXg7XHJcblxyXG4gICAgLy8gSG91cnNcclxuICAgIHByb3RvdHlwZV9fcHJvdG8uaXNQTSA9IGxvY2FsZUlzUE07XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9tZXJpZGllbVBhcnNlID0gZGVmYXVsdExvY2FsZU1lcmlkaWVtUGFyc2U7XHJcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1lcmlkaWVtID0gbG9jYWxlTWVyaWRpZW07XHJcblxyXG4gICAgZnVuY3Rpb24gbGlzdHNfX2dldCAoZm9ybWF0LCBpbmRleCwgZmllbGQsIHNldHRlcikge1xyXG4gICAgICAgIHZhciBsb2NhbGUgPSBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKCk7XHJcbiAgICAgICAgdmFyIHV0YyA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQygpLnNldChzZXR0ZXIsIGluZGV4KTtcclxuICAgICAgICByZXR1cm4gbG9jYWxlW2ZpZWxkXSh1dGMsIGZvcm1hdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbGlzdE1vbnRoc0ltcGwgKGZvcm1hdCwgaW5kZXgsIGZpZWxkKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gZm9ybWF0O1xyXG4gICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJyc7XHJcblxyXG4gICAgICAgIGlmIChpbmRleCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0c19fZ2V0KGZvcm1hdCwgaW5kZXgsIGZpZWxkLCAnbW9udGgnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIHZhciBvdXQgPSBbXTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xyXG4gICAgICAgICAgICBvdXRbaV0gPSBsaXN0c19fZ2V0KGZvcm1hdCwgaSwgZmllbGQsICdtb250aCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vICgpXHJcbiAgICAvLyAoNSlcclxuICAgIC8vIChmbXQsIDUpXHJcbiAgICAvLyAoZm10KVxyXG4gICAgLy8gKHRydWUpXHJcbiAgICAvLyAodHJ1ZSwgNSlcclxuICAgIC8vICh0cnVlLCBmbXQsIDUpXHJcbiAgICAvLyAodHJ1ZSwgZm10KVxyXG4gICAgZnVuY3Rpb24gbGlzdFdlZWtkYXlzSW1wbCAobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4LCBmaWVsZCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbG9jYWxlU29ydGVkID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcclxuICAgICAgICAgICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICcnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvcm1hdCA9IGxvY2FsZVNvcnRlZDtcclxuICAgICAgICAgICAgaW5kZXggPSBmb3JtYXQ7XHJcbiAgICAgICAgICAgIGxvY2FsZVNvcnRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcclxuICAgICAgICAgICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxvY2FsZSA9IGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUoKSxcclxuICAgICAgICAgICAgc2hpZnQgPSBsb2NhbGVTb3J0ZWQgPyBsb2NhbGUuX3dlZWsuZG93IDogMDtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RzX19nZXQoZm9ybWF0LCAoaW5kZXggKyBzaGlmdCkgJSA3LCBmaWVsZCwgJ2RheScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgdmFyIG91dCA9IFtdO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgb3V0W2ldID0gbGlzdHNfX2dldChmb3JtYXQsIChpICsgc2hpZnQpICUgNywgZmllbGQsICdkYXknKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsaXN0c19fbGlzdE1vbnRocyAoZm9ybWF0LCBpbmRleCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0TW9udGhzSW1wbChmb3JtYXQsIGluZGV4LCAnbW9udGhzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbGlzdHNfX2xpc3RNb250aHNTaG9ydCAoZm9ybWF0LCBpbmRleCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0TW9udGhzSW1wbChmb3JtYXQsIGluZGV4LCAnbW9udGhzU2hvcnQnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsaXN0c19fbGlzdFdlZWtkYXlzIChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gbGlzdFdlZWtkYXlzSW1wbChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5cycpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxpc3RzX19saXN0V2Vla2RheXNTaG9ydCAobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIGxpc3RXZWVrZGF5c0ltcGwobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4LCAnd2Vla2RheXNTaG9ydCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxpc3RzX19saXN0V2Vla2RheXNNaW4gKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0V2Vla2RheXNJbXBsKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCwgJ3dlZWtkYXlzTWluJyk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZSgnZW4nLCB7XHJcbiAgICAgICAgb3JkaW5hbFBhcnNlOiAvXFxkezEsMn0odGh8c3R8bmR8cmQpLyxcclxuICAgICAgICBvcmRpbmFsIDogZnVuY3Rpb24gKG51bWJlcikge1xyXG4gICAgICAgICAgICB2YXIgYiA9IG51bWJlciAlIDEwLFxyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gKHRvSW50KG51bWJlciAlIDEwMCAvIDEwKSA9PT0gMSkgPyAndGgnIDpcclxuICAgICAgICAgICAgICAgIChiID09PSAxKSA/ICdzdCcgOlxyXG4gICAgICAgICAgICAgICAgKGIgPT09IDIpID8gJ25kJyA6XHJcbiAgICAgICAgICAgICAgICAoYiA9PT0gMykgPyAncmQnIDogJ3RoJztcclxuICAgICAgICAgICAgcmV0dXJuIG51bWJlciArIG91dHB1dDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTaWRlIGVmZmVjdCBpbXBvcnRzXHJcbiAgICB1dGlsc19ob29rc19faG9va3MubGFuZyA9IGRlcHJlY2F0ZSgnbW9tZW50LmxhbmcgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbWVudC5sb2NhbGUgaW5zdGVhZC4nLCBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlKTtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5sYW5nRGF0YSA9IGRlcHJlY2F0ZSgnbW9tZW50LmxhbmdEYXRhIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb21lbnQubG9jYWxlRGF0YSBpbnN0ZWFkLicsIGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUpO1xyXG5cclxuICAgIHZhciBtYXRoQWJzID0gTWF0aC5hYnM7XHJcblxyXG4gICAgZnVuY3Rpb24gZHVyYXRpb25fYWJzX19hYnMgKCkge1xyXG4gICAgICAgIHZhciBkYXRhICAgICAgICAgICA9IHRoaXMuX2RhdGE7XHJcblxyXG4gICAgICAgIHRoaXMuX21pbGxpc2Vjb25kcyA9IG1hdGhBYnModGhpcy5fbWlsbGlzZWNvbmRzKTtcclxuICAgICAgICB0aGlzLl9kYXlzICAgICAgICAgPSBtYXRoQWJzKHRoaXMuX2RheXMpO1xyXG4gICAgICAgIHRoaXMuX21vbnRocyAgICAgICA9IG1hdGhBYnModGhpcy5fbW9udGhzKTtcclxuXHJcbiAgICAgICAgZGF0YS5taWxsaXNlY29uZHMgID0gbWF0aEFicyhkYXRhLm1pbGxpc2Vjb25kcyk7XHJcbiAgICAgICAgZGF0YS5zZWNvbmRzICAgICAgID0gbWF0aEFicyhkYXRhLnNlY29uZHMpO1xyXG4gICAgICAgIGRhdGEubWludXRlcyAgICAgICA9IG1hdGhBYnMoZGF0YS5taW51dGVzKTtcclxuICAgICAgICBkYXRhLmhvdXJzICAgICAgICAgPSBtYXRoQWJzKGRhdGEuaG91cnMpO1xyXG4gICAgICAgIGRhdGEubW9udGhzICAgICAgICA9IG1hdGhBYnMoZGF0YS5tb250aHMpO1xyXG4gICAgICAgIGRhdGEueWVhcnMgICAgICAgICA9IG1hdGhBYnMoZGF0YS55ZWFycyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QgKGR1cmF0aW9uLCBpbnB1dCwgdmFsdWUsIGRpcmVjdGlvbikge1xyXG4gICAgICAgIHZhciBvdGhlciA9IGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24oaW5wdXQsIHZhbHVlKTtcclxuXHJcbiAgICAgICAgZHVyYXRpb24uX21pbGxpc2Vjb25kcyArPSBkaXJlY3Rpb24gKiBvdGhlci5fbWlsbGlzZWNvbmRzO1xyXG4gICAgICAgIGR1cmF0aW9uLl9kYXlzICAgICAgICAgKz0gZGlyZWN0aW9uICogb3RoZXIuX2RheXM7XHJcbiAgICAgICAgZHVyYXRpb24uX21vbnRocyAgICAgICArPSBkaXJlY3Rpb24gKiBvdGhlci5fbW9udGhzO1xyXG5cclxuICAgICAgICByZXR1cm4gZHVyYXRpb24uX2J1YmJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN1cHBvcnRzIG9ubHkgMi4wLXN0eWxlIGFkZCgxLCAncycpIG9yIGFkZChkdXJhdGlvbilcclxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fYWRkIChpbnB1dCwgdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCh0aGlzLCBpbnB1dCwgdmFsdWUsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN1cHBvcnRzIG9ubHkgMi4wLXN0eWxlIHN1YnRyYWN0KDEsICdzJykgb3Igc3VidHJhY3QoZHVyYXRpb24pXHJcbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX3N1YnRyYWN0IChpbnB1dCwgdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCh0aGlzLCBpbnB1dCwgdmFsdWUsIC0xKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhYnNDZWlsIChudW1iZXIpIHtcclxuICAgICAgICBpZiAobnVtYmVyIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihudW1iZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwobnVtYmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYnViYmxlICgpIHtcclxuICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gdGhpcy5fbWlsbGlzZWNvbmRzO1xyXG4gICAgICAgIHZhciBkYXlzICAgICAgICAgPSB0aGlzLl9kYXlzO1xyXG4gICAgICAgIHZhciBtb250aHMgICAgICAgPSB0aGlzLl9tb250aHM7XHJcbiAgICAgICAgdmFyIGRhdGEgICAgICAgICA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgdmFyIHNlY29uZHMsIG1pbnV0ZXMsIGhvdXJzLCB5ZWFycywgbW9udGhzRnJvbURheXM7XHJcblxyXG4gICAgICAgIC8vIGlmIHdlIGhhdmUgYSBtaXggb2YgcG9zaXRpdmUgYW5kIG5lZ2F0aXZlIHZhbHVlcywgYnViYmxlIGRvd24gZmlyc3RcclxuICAgICAgICAvLyBjaGVjazogaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzIxNjZcclxuICAgICAgICBpZiAoISgobWlsbGlzZWNvbmRzID49IDAgJiYgZGF5cyA+PSAwICYmIG1vbnRocyA+PSAwKSB8fFxyXG4gICAgICAgICAgICAgICAgKG1pbGxpc2Vjb25kcyA8PSAwICYmIGRheXMgPD0gMCAmJiBtb250aHMgPD0gMCkpKSB7XHJcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kcyArPSBhYnNDZWlsKG1vbnRoc1RvRGF5cyhtb250aHMpICsgZGF5cykgKiA4NjRlNTtcclxuICAgICAgICAgICAgZGF5cyA9IDA7XHJcbiAgICAgICAgICAgIG1vbnRocyA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGNvZGUgYnViYmxlcyB1cCB2YWx1ZXMsIHNlZSB0aGUgdGVzdHMgZm9yXHJcbiAgICAgICAgLy8gZXhhbXBsZXMgb2Ygd2hhdCB0aGF0IG1lYW5zLlxyXG4gICAgICAgIGRhdGEubWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzICUgMTAwMDtcclxuXHJcbiAgICAgICAgc2Vjb25kcyAgICAgICAgICAgPSBhYnNGbG9vcihtaWxsaXNlY29uZHMgLyAxMDAwKTtcclxuICAgICAgICBkYXRhLnNlY29uZHMgICAgICA9IHNlY29uZHMgJSA2MDtcclxuXHJcbiAgICAgICAgbWludXRlcyAgICAgICAgICAgPSBhYnNGbG9vcihzZWNvbmRzIC8gNjApO1xyXG4gICAgICAgIGRhdGEubWludXRlcyAgICAgID0gbWludXRlcyAlIDYwO1xyXG5cclxuICAgICAgICBob3VycyAgICAgICAgICAgICA9IGFic0Zsb29yKG1pbnV0ZXMgLyA2MCk7XHJcbiAgICAgICAgZGF0YS5ob3VycyAgICAgICAgPSBob3VycyAlIDI0O1xyXG5cclxuICAgICAgICBkYXlzICs9IGFic0Zsb29yKGhvdXJzIC8gMjQpO1xyXG5cclxuICAgICAgICAvLyBjb252ZXJ0IGRheXMgdG8gbW9udGhzXHJcbiAgICAgICAgbW9udGhzRnJvbURheXMgPSBhYnNGbG9vcihkYXlzVG9Nb250aHMoZGF5cykpO1xyXG4gICAgICAgIG1vbnRocyArPSBtb250aHNGcm9tRGF5cztcclxuICAgICAgICBkYXlzIC09IGFic0NlaWwobW9udGhzVG9EYXlzKG1vbnRoc0Zyb21EYXlzKSk7XHJcblxyXG4gICAgICAgIC8vIDEyIG1vbnRocyAtPiAxIHllYXJcclxuICAgICAgICB5ZWFycyA9IGFic0Zsb29yKG1vbnRocyAvIDEyKTtcclxuICAgICAgICBtb250aHMgJT0gMTI7XHJcblxyXG4gICAgICAgIGRhdGEuZGF5cyAgID0gZGF5cztcclxuICAgICAgICBkYXRhLm1vbnRocyA9IG1vbnRocztcclxuICAgICAgICBkYXRhLnllYXJzICA9IHllYXJzO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkYXlzVG9Nb250aHMgKGRheXMpIHtcclxuICAgICAgICAvLyA0MDAgeWVhcnMgaGF2ZSAxNDYwOTcgZGF5cyAodGFraW5nIGludG8gYWNjb3VudCBsZWFwIHllYXIgcnVsZXMpXHJcbiAgICAgICAgLy8gNDAwIHllYXJzIGhhdmUgMTIgbW9udGhzID09PSA0ODAwXHJcbiAgICAgICAgcmV0dXJuIGRheXMgKiA0ODAwIC8gMTQ2MDk3O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vbnRoc1RvRGF5cyAobW9udGhzKSB7XHJcbiAgICAgICAgLy8gdGhlIHJldmVyc2Ugb2YgZGF5c1RvTW9udGhzXHJcbiAgICAgICAgcmV0dXJuIG1vbnRocyAqIDE0NjA5NyAvIDQ4MDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYXMgKHVuaXRzKSB7XHJcbiAgICAgICAgdmFyIGRheXM7XHJcbiAgICAgICAgdmFyIG1vbnRocztcclxuICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gdGhpcy5fbWlsbGlzZWNvbmRzO1xyXG5cclxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcclxuXHJcbiAgICAgICAgaWYgKHVuaXRzID09PSAnbW9udGgnIHx8IHVuaXRzID09PSAneWVhcicpIHtcclxuICAgICAgICAgICAgZGF5cyAgID0gdGhpcy5fZGF5cyAgICsgbWlsbGlzZWNvbmRzIC8gODY0ZTU7XHJcbiAgICAgICAgICAgIG1vbnRocyA9IHRoaXMuX21vbnRocyArIGRheXNUb01vbnRocyhkYXlzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuaXRzID09PSAnbW9udGgnID8gbW9udGhzIDogbW9udGhzIC8gMTI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gaGFuZGxlIG1pbGxpc2Vjb25kcyBzZXBhcmF0ZWx5IGJlY2F1c2Ugb2YgZmxvYXRpbmcgcG9pbnQgbWF0aCBlcnJvcnMgKGlzc3VlICMxODY3KVxyXG4gICAgICAgICAgICBkYXlzID0gdGhpcy5fZGF5cyArIE1hdGgucm91bmQobW9udGhzVG9EYXlzKHRoaXMuX21vbnRocykpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHVuaXRzKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd3ZWVrJyAgIDogcmV0dXJuIGRheXMgLyA3ICAgICArIG1pbGxpc2Vjb25kcyAvIDYwNDhlNTtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2RheScgICAgOiByZXR1cm4gZGF5cyAgICAgICAgICsgbWlsbGlzZWNvbmRzIC8gODY0ZTU7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdob3VyJyAgIDogcmV0dXJuIGRheXMgKiAyNCAgICArIG1pbGxpc2Vjb25kcyAvIDM2ZTU7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdtaW51dGUnIDogcmV0dXJuIGRheXMgKiAxNDQwICArIG1pbGxpc2Vjb25kcyAvIDZlNDtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3NlY29uZCcgOiByZXR1cm4gZGF5cyAqIDg2NDAwICsgbWlsbGlzZWNvbmRzIC8gMTAwMDtcclxuICAgICAgICAgICAgICAgIC8vIE1hdGguZmxvb3IgcHJldmVudHMgZmxvYXRpbmcgcG9pbnQgbWF0aCBlcnJvcnMgaGVyZVxyXG4gICAgICAgICAgICAgICAgY2FzZSAnbWlsbGlzZWNvbmQnOiByZXR1cm4gTWF0aC5mbG9vcihkYXlzICogODY0ZTUpICsgbWlsbGlzZWNvbmRzO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHVuaXQgJyArIHVuaXRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPOiBVc2UgdGhpcy5hcygnbXMnKT9cclxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2FzX192YWx1ZU9mICgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICB0aGlzLl9taWxsaXNlY29uZHMgK1xyXG4gICAgICAgICAgICB0aGlzLl9kYXlzICogODY0ZTUgK1xyXG4gICAgICAgICAgICAodGhpcy5fbW9udGhzICUgMTIpICogMjU5MmU2ICtcclxuICAgICAgICAgICAgdG9JbnQodGhpcy5fbW9udGhzIC8gMTIpICogMzE1MzZlNlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWFrZUFzIChhbGlhcykge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFzKGFsaWFzKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhc01pbGxpc2Vjb25kcyA9IG1ha2VBcygnbXMnKTtcclxuICAgIHZhciBhc1NlY29uZHMgICAgICA9IG1ha2VBcygncycpO1xyXG4gICAgdmFyIGFzTWludXRlcyAgICAgID0gbWFrZUFzKCdtJyk7XHJcbiAgICB2YXIgYXNIb3VycyAgICAgICAgPSBtYWtlQXMoJ2gnKTtcclxuICAgIHZhciBhc0RheXMgICAgICAgICA9IG1ha2VBcygnZCcpO1xyXG4gICAgdmFyIGFzV2Vla3MgICAgICAgID0gbWFrZUFzKCd3Jyk7XHJcbiAgICB2YXIgYXNNb250aHMgICAgICAgPSBtYWtlQXMoJ00nKTtcclxuICAgIHZhciBhc1llYXJzICAgICAgICA9IG1ha2VBcygneScpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2dldF9fZ2V0ICh1bml0cykge1xyXG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzW3VuaXRzICsgJ3MnXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1ha2VHZXR0ZXIobmFtZSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhW25hbWVdO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG1pbGxpc2Vjb25kcyA9IG1ha2VHZXR0ZXIoJ21pbGxpc2Vjb25kcycpO1xyXG4gICAgdmFyIHNlY29uZHMgICAgICA9IG1ha2VHZXR0ZXIoJ3NlY29uZHMnKTtcclxuICAgIHZhciBtaW51dGVzICAgICAgPSBtYWtlR2V0dGVyKCdtaW51dGVzJyk7XHJcbiAgICB2YXIgaG91cnMgICAgICAgID0gbWFrZUdldHRlcignaG91cnMnKTtcclxuICAgIHZhciBkYXlzICAgICAgICAgPSBtYWtlR2V0dGVyKCdkYXlzJyk7XHJcbiAgICB2YXIgbW9udGhzICAgICAgID0gbWFrZUdldHRlcignbW9udGhzJyk7XHJcbiAgICB2YXIgeWVhcnMgICAgICAgID0gbWFrZUdldHRlcigneWVhcnMnKTtcclxuXHJcbiAgICBmdW5jdGlvbiB3ZWVrcyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGFic0Zsb29yKHRoaXMuZGF5cygpIC8gNyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHJvdW5kID0gTWF0aC5yb3VuZDtcclxuICAgIHZhciB0aHJlc2hvbGRzID0ge1xyXG4gICAgICAgIHM6IDQ1LCAgLy8gc2Vjb25kcyB0byBtaW51dGVcclxuICAgICAgICBtOiA0NSwgIC8vIG1pbnV0ZXMgdG8gaG91clxyXG4gICAgICAgIGg6IDIyLCAgLy8gaG91cnMgdG8gZGF5XHJcbiAgICAgICAgZDogMjYsICAvLyBkYXlzIHRvIG1vbnRoXHJcbiAgICAgICAgTTogMTEgICAvLyBtb250aHMgdG8geWVhclxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBoZWxwZXIgZnVuY3Rpb24gZm9yIG1vbWVudC5mbi5mcm9tLCBtb21lbnQuZm4uZnJvbU5vdywgYW5kIG1vbWVudC5kdXJhdGlvbi5mbi5odW1hbml6ZVxyXG4gICAgZnVuY3Rpb24gc3Vic3RpdHV0ZVRpbWVBZ28oc3RyaW5nLCBudW1iZXIsIHdpdGhvdXRTdWZmaXgsIGlzRnV0dXJlLCBsb2NhbGUpIHtcclxuICAgICAgICByZXR1cm4gbG9jYWxlLnJlbGF0aXZlVGltZShudW1iZXIgfHwgMSwgISF3aXRob3V0U3VmZml4LCBzdHJpbmcsIGlzRnV0dXJlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9odW1hbml6ZV9fcmVsYXRpdmVUaW1lIChwb3NOZWdEdXJhdGlvbiwgd2l0aG91dFN1ZmZpeCwgbG9jYWxlKSB7XHJcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gY3JlYXRlX19jcmVhdGVEdXJhdGlvbihwb3NOZWdEdXJhdGlvbikuYWJzKCk7XHJcbiAgICAgICAgdmFyIHNlY29uZHMgID0gcm91bmQoZHVyYXRpb24uYXMoJ3MnKSk7XHJcbiAgICAgICAgdmFyIG1pbnV0ZXMgID0gcm91bmQoZHVyYXRpb24uYXMoJ20nKSk7XHJcbiAgICAgICAgdmFyIGhvdXJzICAgID0gcm91bmQoZHVyYXRpb24uYXMoJ2gnKSk7XHJcbiAgICAgICAgdmFyIGRheXMgICAgID0gcm91bmQoZHVyYXRpb24uYXMoJ2QnKSk7XHJcbiAgICAgICAgdmFyIG1vbnRocyAgID0gcm91bmQoZHVyYXRpb24uYXMoJ00nKSk7XHJcbiAgICAgICAgdmFyIHllYXJzICAgID0gcm91bmQoZHVyYXRpb24uYXMoJ3knKSk7XHJcblxyXG4gICAgICAgIHZhciBhID0gc2Vjb25kcyA8IHRocmVzaG9sZHMucyAmJiBbJ3MnLCBzZWNvbmRzXSAgfHxcclxuICAgICAgICAgICAgICAgIG1pbnV0ZXMgPD0gMSAgICAgICAgICAgJiYgWydtJ10gICAgICAgICAgIHx8XHJcbiAgICAgICAgICAgICAgICBtaW51dGVzIDwgdGhyZXNob2xkcy5tICYmIFsnbW0nLCBtaW51dGVzXSB8fFxyXG4gICAgICAgICAgICAgICAgaG91cnMgICA8PSAxICAgICAgICAgICAmJiBbJ2gnXSAgICAgICAgICAgfHxcclxuICAgICAgICAgICAgICAgIGhvdXJzICAgPCB0aHJlc2hvbGRzLmggJiYgWydoaCcsIGhvdXJzXSAgIHx8XHJcbiAgICAgICAgICAgICAgICBkYXlzICAgIDw9IDEgICAgICAgICAgICYmIFsnZCddICAgICAgICAgICB8fFxyXG4gICAgICAgICAgICAgICAgZGF5cyAgICA8IHRocmVzaG9sZHMuZCAmJiBbJ2RkJywgZGF5c10gICAgfHxcclxuICAgICAgICAgICAgICAgIG1vbnRocyAgPD0gMSAgICAgICAgICAgJiYgWydNJ10gICAgICAgICAgIHx8XHJcbiAgICAgICAgICAgICAgICBtb250aHMgIDwgdGhyZXNob2xkcy5NICYmIFsnTU0nLCBtb250aHNdICB8fFxyXG4gICAgICAgICAgICAgICAgeWVhcnMgICA8PSAxICAgICAgICAgICAmJiBbJ3knXSAgICAgICAgICAgfHwgWyd5eScsIHllYXJzXTtcclxuXHJcbiAgICAgICAgYVsyXSA9IHdpdGhvdXRTdWZmaXg7XHJcbiAgICAgICAgYVszXSA9ICtwb3NOZWdEdXJhdGlvbiA+IDA7XHJcbiAgICAgICAgYVs0XSA9IGxvY2FsZTtcclxuICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZVRpbWVBZ28uYXBwbHkobnVsbCwgYSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBhbGxvd3MgeW91IHRvIHNldCBhIHRocmVzaG9sZCBmb3IgcmVsYXRpdmUgdGltZSBzdHJpbmdzXHJcbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9odW1hbml6ZV9fZ2V0U2V0UmVsYXRpdmVUaW1lVGhyZXNob2xkICh0aHJlc2hvbGQsIGxpbWl0KSB7XHJcbiAgICAgICAgaWYgKHRocmVzaG9sZHNbdGhyZXNob2xkXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxpbWl0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRocmVzaG9sZHNbdGhyZXNob2xkXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyZXNob2xkc1t0aHJlc2hvbGRdID0gbGltaXQ7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaHVtYW5pemUgKHdpdGhTdWZmaXgpIHtcclxuICAgICAgICB2YXIgbG9jYWxlID0gdGhpcy5sb2NhbGVEYXRhKCk7XHJcbiAgICAgICAgdmFyIG91dHB1dCA9IGR1cmF0aW9uX2h1bWFuaXplX19yZWxhdGl2ZVRpbWUodGhpcywgIXdpdGhTdWZmaXgsIGxvY2FsZSk7XHJcblxyXG4gICAgICAgIGlmICh3aXRoU3VmZml4KSB7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IGxvY2FsZS5wYXN0RnV0dXJlKCt0aGlzLCBvdXRwdXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5wb3N0Zm9ybWF0KG91dHB1dCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGlzb19zdHJpbmdfX2FicyA9IE1hdGguYWJzO1xyXG5cclxuICAgIGZ1bmN0aW9uIGlzb19zdHJpbmdfX3RvSVNPU3RyaW5nKCkge1xyXG4gICAgICAgIC8vIGZvciBJU08gc3RyaW5ncyB3ZSBkbyBub3QgdXNlIHRoZSBub3JtYWwgYnViYmxpbmcgcnVsZXM6XHJcbiAgICAgICAgLy8gICogbWlsbGlzZWNvbmRzIGJ1YmJsZSB1cCB1bnRpbCB0aGV5IGJlY29tZSBob3Vyc1xyXG4gICAgICAgIC8vICAqIGRheXMgZG8gbm90IGJ1YmJsZSBhdCBhbGxcclxuICAgICAgICAvLyAgKiBtb250aHMgYnViYmxlIHVwIHVudGlsIHRoZXkgYmVjb21lIHllYXJzXHJcbiAgICAgICAgLy8gVGhpcyBpcyBiZWNhdXNlIHRoZXJlIGlzIG5vIGNvbnRleHQtZnJlZSBjb252ZXJzaW9uIGJldHdlZW4gaG91cnMgYW5kIGRheXNcclxuICAgICAgICAvLyAodGhpbmsgb2YgY2xvY2sgY2hhbmdlcylcclxuICAgICAgICAvLyBhbmQgYWxzbyBub3QgYmV0d2VlbiBkYXlzIGFuZCBtb250aHMgKDI4LTMxIGRheXMgcGVyIG1vbnRoKVxyXG4gICAgICAgIHZhciBzZWNvbmRzID0gaXNvX3N0cmluZ19fYWJzKHRoaXMuX21pbGxpc2Vjb25kcykgLyAxMDAwO1xyXG4gICAgICAgIHZhciBkYXlzICAgICAgICAgPSBpc29fc3RyaW5nX19hYnModGhpcy5fZGF5cyk7XHJcbiAgICAgICAgdmFyIG1vbnRocyAgICAgICA9IGlzb19zdHJpbmdfX2Ficyh0aGlzLl9tb250aHMpO1xyXG4gICAgICAgIHZhciBtaW51dGVzLCBob3VycywgeWVhcnM7XHJcblxyXG4gICAgICAgIC8vIDM2MDAgc2Vjb25kcyAtPiA2MCBtaW51dGVzIC0+IDEgaG91clxyXG4gICAgICAgIG1pbnV0ZXMgICAgICAgICAgID0gYWJzRmxvb3Ioc2Vjb25kcyAvIDYwKTtcclxuICAgICAgICBob3VycyAgICAgICAgICAgICA9IGFic0Zsb29yKG1pbnV0ZXMgLyA2MCk7XHJcbiAgICAgICAgc2Vjb25kcyAlPSA2MDtcclxuICAgICAgICBtaW51dGVzICU9IDYwO1xyXG5cclxuICAgICAgICAvLyAxMiBtb250aHMgLT4gMSB5ZWFyXHJcbiAgICAgICAgeWVhcnMgID0gYWJzRmxvb3IobW9udGhzIC8gMTIpO1xyXG4gICAgICAgIG1vbnRocyAlPSAxMjtcclxuXHJcblxyXG4gICAgICAgIC8vIGluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9kb3JkaWxsZS9tb21lbnQtaXNvZHVyYXRpb24vYmxvYi9tYXN0ZXIvbW9tZW50Lmlzb2R1cmF0aW9uLmpzXHJcbiAgICAgICAgdmFyIFkgPSB5ZWFycztcclxuICAgICAgICB2YXIgTSA9IG1vbnRocztcclxuICAgICAgICB2YXIgRCA9IGRheXM7XHJcbiAgICAgICAgdmFyIGggPSBob3VycztcclxuICAgICAgICB2YXIgbSA9IG1pbnV0ZXM7XHJcbiAgICAgICAgdmFyIHMgPSBzZWNvbmRzO1xyXG4gICAgICAgIHZhciB0b3RhbCA9IHRoaXMuYXNTZWNvbmRzKCk7XHJcblxyXG4gICAgICAgIGlmICghdG90YWwpIHtcclxuICAgICAgICAgICAgLy8gdGhpcyBpcyB0aGUgc2FtZSBhcyBDIydzIChOb2RhKSBhbmQgcHl0aG9uIChpc29kYXRlKS4uLlxyXG4gICAgICAgICAgICAvLyBidXQgbm90IG90aGVyIEpTIChnb29nLmRhdGUpXHJcbiAgICAgICAgICAgIHJldHVybiAnUDBEJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAodG90YWwgPCAwID8gJy0nIDogJycpICtcclxuICAgICAgICAgICAgJ1AnICtcclxuICAgICAgICAgICAgKFkgPyBZICsgJ1knIDogJycpICtcclxuICAgICAgICAgICAgKE0gPyBNICsgJ00nIDogJycpICtcclxuICAgICAgICAgICAgKEQgPyBEICsgJ0QnIDogJycpICtcclxuICAgICAgICAgICAgKChoIHx8IG0gfHwgcykgPyAnVCcgOiAnJykgK1xyXG4gICAgICAgICAgICAoaCA/IGggKyAnSCcgOiAnJykgK1xyXG4gICAgICAgICAgICAobSA/IG0gKyAnTScgOiAnJykgK1xyXG4gICAgICAgICAgICAocyA/IHMgKyAnUycgOiAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8gPSBEdXJhdGlvbi5wcm90b3R5cGU7XHJcblxyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hYnMgICAgICAgICAgICA9IGR1cmF0aW9uX2Fic19fYWJzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hZGQgICAgICAgICAgICA9IGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fYWRkO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5zdWJ0cmFjdCAgICAgICA9IGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fc3VidHJhY3Q7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzICAgICAgICAgICAgID0gYXM7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzTWlsbGlzZWNvbmRzID0gYXNNaWxsaXNlY29uZHM7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzU2Vjb25kcyAgICAgID0gYXNTZWNvbmRzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc01pbnV0ZXMgICAgICA9IGFzTWludXRlcztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNIb3VycyAgICAgICAgPSBhc0hvdXJzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc0RheXMgICAgICAgICA9IGFzRGF5cztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNXZWVrcyAgICAgICAgPSBhc1dlZWtzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc01vbnRocyAgICAgICA9IGFzTW9udGhzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc1llYXJzICAgICAgICA9IGFzWWVhcnM7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnZhbHVlT2YgICAgICAgID0gZHVyYXRpb25fYXNfX3ZhbHVlT2Y7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLl9idWJibGUgICAgICAgID0gYnViYmxlO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5nZXQgICAgICAgICAgICA9IGR1cmF0aW9uX2dldF9fZ2V0O1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5taWxsaXNlY29uZHMgICA9IG1pbGxpc2Vjb25kcztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uc2Vjb25kcyAgICAgICAgPSBzZWNvbmRzO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5taW51dGVzICAgICAgICA9IG1pbnV0ZXM7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmhvdXJzICAgICAgICAgID0gaG91cnM7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmRheXMgICAgICAgICAgID0gZGF5cztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ud2Vla3MgICAgICAgICAgPSB3ZWVrcztcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubW9udGhzICAgICAgICAgPSBtb250aHM7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnllYXJzICAgICAgICAgID0geWVhcnM7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmh1bWFuaXplICAgICAgID0gaHVtYW5pemU7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnRvSVNPU3RyaW5nICAgID0gaXNvX3N0cmluZ19fdG9JU09TdHJpbmc7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnRvU3RyaW5nICAgICAgID0gaXNvX3N0cmluZ19fdG9JU09TdHJpbmc7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnRvSlNPTiAgICAgICAgID0gaXNvX3N0cmluZ19fdG9JU09TdHJpbmc7XHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmxvY2FsZSAgICAgICAgID0gbG9jYWxlO1xyXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5sb2NhbGVEYXRhICAgICA9IGxvY2FsZURhdGE7XHJcblxyXG4gICAgLy8gRGVwcmVjYXRpb25zXHJcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnRvSXNvU3RyaW5nID0gZGVwcmVjYXRlKCd0b0lzb1N0cmluZygpIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgdG9JU09TdHJpbmcoKSBpbnN0ZWFkIChub3RpY2UgdGhlIGNhcGl0YWxzKScsIGlzb19zdHJpbmdfX3RvSVNPU3RyaW5nKTtcclxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubGFuZyA9IGxhbmc7XHJcblxyXG4gICAgLy8gU2lkZSBlZmZlY3QgaW1wb3J0c1xyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignWCcsIDAsIDAsICd1bml4Jyk7XHJcbiAgICBhZGRGb3JtYXRUb2tlbigneCcsIDAsIDAsICd2YWx1ZU9mJyk7XHJcblxyXG4gICAgLy8gUEFSU0lOR1xyXG5cclxuICAgIGFkZFJlZ2V4VG9rZW4oJ3gnLCBtYXRjaFNpZ25lZCk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdYJywgbWF0Y2hUaW1lc3RhbXApO1xyXG4gICAgYWRkUGFyc2VUb2tlbignWCcsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKHBhcnNlRmxvYXQoaW5wdXQsIDEwKSAqIDEwMDApO1xyXG4gICAgfSk7XHJcbiAgICBhZGRQYXJzZVRva2VuKCd4JywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUodG9JbnQoaW5wdXQpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFNpZGUgZWZmZWN0IGltcG9ydHNcclxuXHJcblxyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnZlcnNpb24gPSAnMi4xMy4wJztcclxuXHJcbiAgICBzZXRIb29rQ2FsbGJhY2sobG9jYWxfX2NyZWF0ZUxvY2FsKTtcclxuXHJcbiAgICB1dGlsc19ob29rc19faG9va3MuZm4gICAgICAgICAgICAgICAgICAgID0gbW9tZW50UHJvdG90eXBlO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLm1pbiAgICAgICAgICAgICAgICAgICA9IG1pbjtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5tYXggICAgICAgICAgICAgICAgICAgPSBtYXg7XHJcbiAgICB1dGlsc19ob29rc19faG9va3Mubm93ICAgICAgICAgICAgICAgICAgID0gbm93O1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnV0YyAgICAgICAgICAgICAgICAgICA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQztcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy51bml4ICAgICAgICAgICAgICAgICAgPSBtb21lbnRfX2NyZWF0ZVVuaXg7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MubW9udGhzICAgICAgICAgICAgICAgID0gbGlzdHNfX2xpc3RNb250aHM7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MuaXNEYXRlICAgICAgICAgICAgICAgID0gaXNEYXRlO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmxvY2FsZSAgICAgICAgICAgICAgICA9IGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGU7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MuaW52YWxpZCAgICAgICAgICAgICAgID0gdmFsaWRfX2NyZWF0ZUludmFsaWQ7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MuZHVyYXRpb24gICAgICAgICAgICAgID0gY3JlYXRlX19jcmVhdGVEdXJhdGlvbjtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5pc01vbWVudCAgICAgICAgICAgICAgPSBpc01vbWVudDtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy53ZWVrZGF5cyAgICAgICAgICAgICAgPSBsaXN0c19fbGlzdFdlZWtkYXlzO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnBhcnNlWm9uZSAgICAgICAgICAgICA9IG1vbWVudF9fY3JlYXRlSW5ab25lO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmxvY2FsZURhdGEgICAgICAgICAgICA9IGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGU7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MuaXNEdXJhdGlvbiAgICAgICAgICAgID0gaXNEdXJhdGlvbjtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5tb250aHNTaG9ydCAgICAgICAgICAgPSBsaXN0c19fbGlzdE1vbnRoc1Nob3J0O1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLndlZWtkYXlzTWluICAgICAgICAgICA9IGxpc3RzX19saXN0V2Vla2RheXNNaW47XHJcbiAgICB1dGlsc19ob29rc19faG9va3MuZGVmaW5lTG9jYWxlICAgICAgICAgID0gZGVmaW5lTG9jYWxlO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZUxvY2FsZSAgICAgICAgICA9IHVwZGF0ZUxvY2FsZTtcclxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5sb2NhbGVzICAgICAgICAgICAgICAgPSBsb2NhbGVfbG9jYWxlc19fbGlzdExvY2FsZXM7XHJcbiAgICB1dGlsc19ob29rc19faG9va3Mud2Vla2RheXNTaG9ydCAgICAgICAgID0gbGlzdHNfX2xpc3RXZWVrZGF5c1Nob3J0O1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLm5vcm1hbGl6ZVVuaXRzICAgICAgICA9IG5vcm1hbGl6ZVVuaXRzO1xyXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnJlbGF0aXZlVGltZVRocmVzaG9sZCA9IGR1cmF0aW9uX2h1bWFuaXplX19nZXRTZXRSZWxhdGl2ZVRpbWVUaHJlc2hvbGQ7XHJcbiAgICB1dGlsc19ob29rc19faG9va3MucHJvdG90eXBlICAgICAgICAgICAgID0gbW9tZW50UHJvdG90eXBlO1xyXG5cclxuICAgIHZhciBfbW9tZW50ID0gdXRpbHNfaG9va3NfX2hvb2tzO1xyXG5cclxuICAgIHJldHVybiBfbW9tZW50O1xyXG5cclxufSkpOyIsIi8qISB2ZXJzaW9uIDogNC4xNy4zN1xyXG4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiBib290c3RyYXAtZGF0ZXRpbWVqc1xyXG4gaHR0cHM6Ly9naXRodWIuY29tL0VvbmFzZGFuL2Jvb3RzdHJhcC1kYXRldGltZXBpY2tlclxyXG4gQ29weXJpZ2h0IChjKSAyMDE1IEpvbmF0aGFuIFBldGVyc29uXHJcbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICovXHJcbiFmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtcImpxdWVyeVwiLFwibW9tZW50XCJdLGEpO2Vsc2UgaWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMpYShyZXF1aXJlKFwianF1ZXJ5XCIpLHJlcXVpcmUoXCJtb21lbnRcIikpO2Vsc2V7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIGpRdWVyeSl0aHJvd1wiYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyIHJlcXVpcmVzIGpRdWVyeSB0byBiZSBsb2FkZWQgZmlyc3RcIjtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgbW9tZW50KXRocm93XCJib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIgcmVxdWlyZXMgTW9tZW50LmpzIHRvIGJlIGxvYWRlZCBmaXJzdFwiO2EoalF1ZXJ5LG1vbWVudCl9fShmdW5jdGlvbihhLGIpe1widXNlIHN0cmljdFwiO2lmKCFiKXRocm93IG5ldyBFcnJvcihcImJvb3RzdHJhcC1kYXRldGltZXBpY2tlciByZXF1aXJlcyBNb21lbnQuanMgdG8gYmUgbG9hZGVkIGZpcnN0XCIpO3ZhciBjPWZ1bmN0aW9uKGMsZCl7dmFyIGUsZixnLGgsaSxqLGssbD17fSxtPSEwLG49ITEsbz0hMSxwPTAscT1be2Nsc05hbWU6XCJkYXlzXCIsbmF2Rm5jOlwiTVwiLG5hdlN0ZXA6MX0se2Nsc05hbWU6XCJtb250aHNcIixuYXZGbmM6XCJ5XCIsbmF2U3RlcDoxfSx7Y2xzTmFtZTpcInllYXJzXCIsbmF2Rm5jOlwieVwiLG5hdlN0ZXA6MTB9LHtjbHNOYW1lOlwiZGVjYWRlc1wiLG5hdkZuYzpcInlcIixuYXZTdGVwOjEwMH1dLHI9W1wiZGF5c1wiLFwibW9udGhzXCIsXCJ5ZWFyc1wiLFwiZGVjYWRlc1wiXSxzPVtcInRvcFwiLFwiYm90dG9tXCIsXCJhdXRvXCJdLHQ9W1wibGVmdFwiLFwicmlnaHRcIixcImF1dG9cIl0sdT1bXCJkZWZhdWx0XCIsXCJ0b3BcIixcImJvdHRvbVwiXSx2PXt1cDozOCwzODpcInVwXCIsZG93bjo0MCw0MDpcImRvd25cIixsZWZ0OjM3LDM3OlwibGVmdFwiLHJpZ2h0OjM5LDM5OlwicmlnaHRcIix0YWI6OSw5OlwidGFiXCIsZXNjYXBlOjI3LDI3OlwiZXNjYXBlXCIsZW50ZXI6MTMsMTM6XCJlbnRlclwiLHBhZ2VVcDozMywzMzpcInBhZ2VVcFwiLHBhZ2VEb3duOjM0LDM0OlwicGFnZURvd25cIixzaGlmdDoxNiwxNjpcInNoaWZ0XCIsY29udHJvbDoxNywxNzpcImNvbnRyb2xcIixzcGFjZTozMiwzMjpcInNwYWNlXCIsdDo4NCw4NDpcInRcIixcImRlbGV0ZVwiOjQ2LDQ2OlwiZGVsZXRlXCJ9LHc9e30seD1mdW5jdGlvbihhKXt2YXIgYyxlLGYsZyxoLGk9ITE7cmV0dXJuIHZvaWQgMCE9PWIudHomJnZvaWQgMCE9PWQudGltZVpvbmUmJm51bGwhPT1kLnRpbWVab25lJiZcIlwiIT09ZC50aW1lWm9uZSYmKGk9ITApLHZvaWQgMD09PWF8fG51bGw9PT1hP2M9aT9iKCkudHooZC50aW1lWm9uZSkuc3RhcnRPZihcImRcIik6YigpLnN0YXJ0T2YoXCJkXCIpOmk/KGU9YigpLnR6KGQudGltZVpvbmUpLnV0Y09mZnNldCgpLGY9YihhLGosZC51c2VTdHJpY3QpLnV0Y09mZnNldCgpLGYhPT1lPyhnPWIoKS50eihkLnRpbWVab25lKS5mb3JtYXQoXCJaXCIpLGg9YihhLGosZC51c2VTdHJpY3QpLmZvcm1hdChcIllZWVktTU0tRERbVF1ISDptbTpzc1wiKStnLGM9YihoLGosZC51c2VTdHJpY3QpLnR6KGQudGltZVpvbmUpKTpjPWIoYSxqLGQudXNlU3RyaWN0KS50eihkLnRpbWVab25lKSk6Yz1iKGEsaixkLnVzZVN0cmljdCksY30seT1mdW5jdGlvbihhKXtpZihcInN0cmluZ1wiIT10eXBlb2YgYXx8YS5sZW5ndGg+MSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiaXNFbmFibGVkIGV4cGVjdHMgYSBzaW5nbGUgY2hhcmFjdGVyIHN0cmluZyBwYXJhbWV0ZXJcIik7c3dpdGNoKGEpe2Nhc2VcInlcIjpyZXR1cm4tMSE9PWkuaW5kZXhPZihcIllcIik7Y2FzZVwiTVwiOnJldHVybi0xIT09aS5pbmRleE9mKFwiTVwiKTtjYXNlXCJkXCI6cmV0dXJuLTEhPT1pLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImRcIik7Y2FzZVwiaFwiOmNhc2VcIkhcIjpyZXR1cm4tMSE9PWkudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiaFwiKTtjYXNlXCJtXCI6cmV0dXJuLTEhPT1pLmluZGV4T2YoXCJtXCIpO2Nhc2VcInNcIjpyZXR1cm4tMSE9PWkuaW5kZXhPZihcInNcIik7ZGVmYXVsdDpyZXR1cm4hMX19LHo9ZnVuY3Rpb24oKXtyZXR1cm4geShcImhcIil8fHkoXCJtXCIpfHx5KFwic1wiKX0sQT1mdW5jdGlvbigpe3JldHVybiB5KFwieVwiKXx8eShcIk1cIil8fHkoXCJkXCIpfSxCPWZ1bmN0aW9uKCl7dmFyIGI9YShcIjx0aGVhZD5cIikuYXBwZW5kKGEoXCI8dHI+XCIpLmFwcGVuZChhKFwiPHRoPlwiKS5hZGRDbGFzcyhcInByZXZcIikuYXR0cihcImRhdGEtYWN0aW9uXCIsXCJwcmV2aW91c1wiKS5hcHBlbmQoYShcIjxzcGFuPlwiKS5hZGRDbGFzcyhkLmljb25zLnByZXZpb3VzKSkpLmFwcGVuZChhKFwiPHRoPlwiKS5hZGRDbGFzcyhcInBpY2tlci1zd2l0Y2hcIikuYXR0cihcImRhdGEtYWN0aW9uXCIsXCJwaWNrZXJTd2l0Y2hcIikuYXR0cihcImNvbHNwYW5cIixkLmNhbGVuZGFyV2Vla3M/XCI2XCI6XCI1XCIpKS5hcHBlbmQoYShcIjx0aD5cIikuYWRkQ2xhc3MoXCJuZXh0XCIpLmF0dHIoXCJkYXRhLWFjdGlvblwiLFwibmV4dFwiKS5hcHBlbmQoYShcIjxzcGFuPlwiKS5hZGRDbGFzcyhkLmljb25zLm5leHQpKSkpLGM9YShcIjx0Ym9keT5cIikuYXBwZW5kKGEoXCI8dHI+XCIpLmFwcGVuZChhKFwiPHRkPlwiKS5hdHRyKFwiY29sc3BhblwiLGQuY2FsZW5kYXJXZWVrcz9cIjhcIjpcIjdcIikpKTtyZXR1cm5bYShcIjxkaXY+XCIpLmFkZENsYXNzKFwiZGF0ZXBpY2tlci1kYXlzXCIpLmFwcGVuZChhKFwiPHRhYmxlPlwiKS5hZGRDbGFzcyhcInRhYmxlLWNvbmRlbnNlZFwiKS5hcHBlbmQoYikuYXBwZW5kKGEoXCI8dGJvZHk+XCIpKSksYShcIjxkaXY+XCIpLmFkZENsYXNzKFwiZGF0ZXBpY2tlci1tb250aHNcIikuYXBwZW5kKGEoXCI8dGFibGU+XCIpLmFkZENsYXNzKFwidGFibGUtY29uZGVuc2VkXCIpLmFwcGVuZChiLmNsb25lKCkpLmFwcGVuZChjLmNsb25lKCkpKSxhKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJkYXRlcGlja2VyLXllYXJzXCIpLmFwcGVuZChhKFwiPHRhYmxlPlwiKS5hZGRDbGFzcyhcInRhYmxlLWNvbmRlbnNlZFwiKS5hcHBlbmQoYi5jbG9uZSgpKS5hcHBlbmQoYy5jbG9uZSgpKSksYShcIjxkaXY+XCIpLmFkZENsYXNzKFwiZGF0ZXBpY2tlci1kZWNhZGVzXCIpLmFwcGVuZChhKFwiPHRhYmxlPlwiKS5hZGRDbGFzcyhcInRhYmxlLWNvbmRlbnNlZFwiKS5hcHBlbmQoYi5jbG9uZSgpKS5hcHBlbmQoYy5jbG9uZSgpKSldfSxDPWZ1bmN0aW9uKCl7dmFyIGI9YShcIjx0cj5cIiksYz1hKFwiPHRyPlwiKSxlPWEoXCI8dHI+XCIpO3JldHVybiB5KFwiaFwiKSYmKGIuYXBwZW5kKGEoXCI8dGQ+XCIpLmFwcGVuZChhKFwiPGE+XCIpLmF0dHIoe2hyZWY6XCIjXCIsdGFiaW5kZXg6XCItMVwiLHRpdGxlOmQudG9vbHRpcHMuaW5jcmVtZW50SG91cn0pLmFkZENsYXNzKFwiYnRuXCIpLmF0dHIoXCJkYXRhLWFjdGlvblwiLFwiaW5jcmVtZW50SG91cnNcIikuYXBwZW5kKGEoXCI8c3Bhbj5cIikuYWRkQ2xhc3MoZC5pY29ucy51cCkpKSksYy5hcHBlbmQoYShcIjx0ZD5cIikuYXBwZW5kKGEoXCI8c3Bhbj5cIikuYWRkQ2xhc3MoXCJ0aW1lcGlja2VyLWhvdXJcIikuYXR0cih7XCJkYXRhLXRpbWUtY29tcG9uZW50XCI6XCJob3Vyc1wiLHRpdGxlOmQudG9vbHRpcHMucGlja0hvdXJ9KS5hdHRyKFwiZGF0YS1hY3Rpb25cIixcInNob3dIb3Vyc1wiKSkpLGUuYXBwZW5kKGEoXCI8dGQ+XCIpLmFwcGVuZChhKFwiPGE+XCIpLmF0dHIoe2hyZWY6XCIjXCIsdGFiaW5kZXg6XCItMVwiLHRpdGxlOmQudG9vbHRpcHMuZGVjcmVtZW50SG91cn0pLmFkZENsYXNzKFwiYnRuXCIpLmF0dHIoXCJkYXRhLWFjdGlvblwiLFwiZGVjcmVtZW50SG91cnNcIikuYXBwZW5kKGEoXCI8c3Bhbj5cIikuYWRkQ2xhc3MoZC5pY29ucy5kb3duKSkpKSkseShcIm1cIikmJih5KFwiaFwiKSYmKGIuYXBwZW5kKGEoXCI8dGQ+XCIpLmFkZENsYXNzKFwic2VwYXJhdG9yXCIpKSxjLmFwcGVuZChhKFwiPHRkPlwiKS5hZGRDbGFzcyhcInNlcGFyYXRvclwiKS5odG1sKFwiOlwiKSksZS5hcHBlbmQoYShcIjx0ZD5cIikuYWRkQ2xhc3MoXCJzZXBhcmF0b3JcIikpKSxiLmFwcGVuZChhKFwiPHRkPlwiKS5hcHBlbmQoYShcIjxhPlwiKS5hdHRyKHtocmVmOlwiI1wiLHRhYmluZGV4OlwiLTFcIix0aXRsZTpkLnRvb2x0aXBzLmluY3JlbWVudE1pbnV0ZX0pLmFkZENsYXNzKFwiYnRuXCIpLmF0dHIoXCJkYXRhLWFjdGlvblwiLFwiaW5jcmVtZW50TWludXRlc1wiKS5hcHBlbmQoYShcIjxzcGFuPlwiKS5hZGRDbGFzcyhkLmljb25zLnVwKSkpKSxjLmFwcGVuZChhKFwiPHRkPlwiKS5hcHBlbmQoYShcIjxzcGFuPlwiKS5hZGRDbGFzcyhcInRpbWVwaWNrZXItbWludXRlXCIpLmF0dHIoe1wiZGF0YS10aW1lLWNvbXBvbmVudFwiOlwibWludXRlc1wiLHRpdGxlOmQudG9vbHRpcHMucGlja01pbnV0ZX0pLmF0dHIoXCJkYXRhLWFjdGlvblwiLFwic2hvd01pbnV0ZXNcIikpKSxlLmFwcGVuZChhKFwiPHRkPlwiKS5hcHBlbmQoYShcIjxhPlwiKS5hdHRyKHtocmVmOlwiI1wiLHRhYmluZGV4OlwiLTFcIix0aXRsZTpkLnRvb2x0aXBzLmRlY3JlbWVudE1pbnV0ZX0pLmFkZENsYXNzKFwiYnRuXCIpLmF0dHIoXCJkYXRhLWFjdGlvblwiLFwiZGVjcmVtZW50TWludXRlc1wiKS5hcHBlbmQoYShcIjxzcGFuPlwiKS5hZGRDbGFzcyhkLmljb25zLmRvd24pKSkpKSx5KFwic1wiKSYmKHkoXCJtXCIpJiYoYi5hcHBlbmQoYShcIjx0ZD5cIikuYWRkQ2xhc3MoXCJzZXBhcmF0b3JcIikpLGMuYXBwZW5kKGEoXCI8dGQ+XCIpLmFkZENsYXNzKFwic2VwYXJhdG9yXCIpLmh0bWwoXCI6XCIpKSxlLmFwcGVuZChhKFwiPHRkPlwiKS5hZGRDbGFzcyhcInNlcGFyYXRvclwiKSkpLGIuYXBwZW5kKGEoXCI8dGQ+XCIpLmFwcGVuZChhKFwiPGE+XCIpLmF0dHIoe2hyZWY6XCIjXCIsdGFiaW5kZXg6XCItMVwiLHRpdGxlOmQudG9vbHRpcHMuaW5jcmVtZW50U2Vjb25kfSkuYWRkQ2xhc3MoXCJidG5cIikuYXR0cihcImRhdGEtYWN0aW9uXCIsXCJpbmNyZW1lbnRTZWNvbmRzXCIpLmFwcGVuZChhKFwiPHNwYW4+XCIpLmFkZENsYXNzKGQuaWNvbnMudXApKSkpLGMuYXBwZW5kKGEoXCI8dGQ+XCIpLmFwcGVuZChhKFwiPHNwYW4+XCIpLmFkZENsYXNzKFwidGltZXBpY2tlci1zZWNvbmRcIikuYXR0cih7XCJkYXRhLXRpbWUtY29tcG9uZW50XCI6XCJzZWNvbmRzXCIsdGl0bGU6ZC50b29sdGlwcy5waWNrU2Vjb25kfSkuYXR0cihcImRhdGEtYWN0aW9uXCIsXCJzaG93U2Vjb25kc1wiKSkpLGUuYXBwZW5kKGEoXCI8dGQ+XCIpLmFwcGVuZChhKFwiPGE+XCIpLmF0dHIoe2hyZWY6XCIjXCIsdGFiaW5kZXg6XCItMVwiLHRpdGxlOmQudG9vbHRpcHMuZGVjcmVtZW50U2Vjb25kfSkuYWRkQ2xhc3MoXCJidG5cIikuYXR0cihcImRhdGEtYWN0aW9uXCIsXCJkZWNyZW1lbnRTZWNvbmRzXCIpLmFwcGVuZChhKFwiPHNwYW4+XCIpLmFkZENsYXNzKGQuaWNvbnMuZG93bikpKSkpLGh8fChiLmFwcGVuZChhKFwiPHRkPlwiKS5hZGRDbGFzcyhcInNlcGFyYXRvclwiKSksYy5hcHBlbmQoYShcIjx0ZD5cIikuYXBwZW5kKGEoXCI8YnV0dG9uPlwiKS5hZGRDbGFzcyhcImJ0biBidG4tcHJpbWFyeVwiKS5hdHRyKHtcImRhdGEtYWN0aW9uXCI6XCJ0b2dnbGVQZXJpb2RcIix0YWJpbmRleDpcIi0xXCIsdGl0bGU6ZC50b29sdGlwcy50b2dnbGVQZXJpb2R9KSkpLGUuYXBwZW5kKGEoXCI8dGQ+XCIpLmFkZENsYXNzKFwic2VwYXJhdG9yXCIpKSksYShcIjxkaXY+XCIpLmFkZENsYXNzKFwidGltZXBpY2tlci1waWNrZXJcIikuYXBwZW5kKGEoXCI8dGFibGU+XCIpLmFkZENsYXNzKFwidGFibGUtY29uZGVuc2VkXCIpLmFwcGVuZChbYixjLGVdKSl9LEQ9ZnVuY3Rpb24oKXt2YXIgYj1hKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJ0aW1lcGlja2VyLWhvdXJzXCIpLmFwcGVuZChhKFwiPHRhYmxlPlwiKS5hZGRDbGFzcyhcInRhYmxlLWNvbmRlbnNlZFwiKSksYz1hKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJ0aW1lcGlja2VyLW1pbnV0ZXNcIikuYXBwZW5kKGEoXCI8dGFibGU+XCIpLmFkZENsYXNzKFwidGFibGUtY29uZGVuc2VkXCIpKSxkPWEoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcInRpbWVwaWNrZXItc2Vjb25kc1wiKS5hcHBlbmQoYShcIjx0YWJsZT5cIikuYWRkQ2xhc3MoXCJ0YWJsZS1jb25kZW5zZWRcIikpLGU9W0MoKV07cmV0dXJuIHkoXCJoXCIpJiZlLnB1c2goYikseShcIm1cIikmJmUucHVzaChjKSx5KFwic1wiKSYmZS5wdXNoKGQpLGV9LEU9ZnVuY3Rpb24oKXt2YXIgYj1bXTtyZXR1cm4gZC5zaG93VG9kYXlCdXR0b24mJmIucHVzaChhKFwiPHRkPlwiKS5hcHBlbmQoYShcIjxhPlwiKS5hdHRyKHtcImRhdGEtYWN0aW9uXCI6XCJ0b2RheVwiLHRpdGxlOmQudG9vbHRpcHMudG9kYXl9KS5hcHBlbmQoYShcIjxzcGFuPlwiKS5hZGRDbGFzcyhkLmljb25zLnRvZGF5KSkpKSwhZC5zaWRlQnlTaWRlJiZBKCkmJnooKSYmYi5wdXNoKGEoXCI8dGQ+XCIpLmFwcGVuZChhKFwiPGE+XCIpLmF0dHIoe1wiZGF0YS1hY3Rpb25cIjpcInRvZ2dsZVBpY2tlclwiLHRpdGxlOmQudG9vbHRpcHMuc2VsZWN0VGltZX0pLmFwcGVuZChhKFwiPHNwYW4+XCIpLmFkZENsYXNzKGQuaWNvbnMudGltZSkpKSksZC5zaG93Q2xlYXImJmIucHVzaChhKFwiPHRkPlwiKS5hcHBlbmQoYShcIjxhPlwiKS5hdHRyKHtcImRhdGEtYWN0aW9uXCI6XCJjbGVhclwiLHRpdGxlOmQudG9vbHRpcHMuY2xlYXJ9KS5hcHBlbmQoYShcIjxzcGFuPlwiKS5hZGRDbGFzcyhkLmljb25zLmNsZWFyKSkpKSxkLnNob3dDbG9zZSYmYi5wdXNoKGEoXCI8dGQ+XCIpLmFwcGVuZChhKFwiPGE+XCIpLmF0dHIoe1wiZGF0YS1hY3Rpb25cIjpcImNsb3NlXCIsdGl0bGU6ZC50b29sdGlwcy5jbG9zZX0pLmFwcGVuZChhKFwiPHNwYW4+XCIpLmFkZENsYXNzKGQuaWNvbnMuY2xvc2UpKSkpLGEoXCI8dGFibGU+XCIpLmFkZENsYXNzKFwidGFibGUtY29uZGVuc2VkXCIpLmFwcGVuZChhKFwiPHRib2R5PlwiKS5hcHBlbmQoYShcIjx0cj5cIikuYXBwZW5kKGIpKSl9LEY9ZnVuY3Rpb24oKXt2YXIgYj1hKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJib290c3RyYXAtZGF0ZXRpbWVwaWNrZXItd2lkZ2V0IGRyb3Bkb3duLW1lbnVcIiksYz1hKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJkYXRlcGlja2VyXCIpLmFwcGVuZChCKCkpLGU9YShcIjxkaXY+XCIpLmFkZENsYXNzKFwidGltZXBpY2tlclwiKS5hcHBlbmQoRCgpKSxmPWEoXCI8dWw+XCIpLmFkZENsYXNzKFwibGlzdC11bnN0eWxlZFwiKSxnPWEoXCI8bGk+XCIpLmFkZENsYXNzKFwicGlja2VyLXN3aXRjaFwiKyhkLmNvbGxhcHNlP1wiIGFjY29yZGlvbi10b2dnbGVcIjpcIlwiKSkuYXBwZW5kKEUoKSk7cmV0dXJuIGQuaW5saW5lJiZiLnJlbW92ZUNsYXNzKFwiZHJvcGRvd24tbWVudVwiKSxoJiZiLmFkZENsYXNzKFwidXNldHdlbnR5Zm91clwiKSx5KFwic1wiKSYmIWgmJmIuYWRkQ2xhc3MoXCJ3aWRlclwiKSxkLnNpZGVCeVNpZGUmJkEoKSYmeigpPyhiLmFkZENsYXNzKFwidGltZXBpY2tlci1zYnNcIiksXCJ0b3BcIj09PWQudG9vbGJhclBsYWNlbWVudCYmYi5hcHBlbmQoZyksYi5hcHBlbmQoYShcIjxkaXY+XCIpLmFkZENsYXNzKFwicm93XCIpLmFwcGVuZChjLmFkZENsYXNzKFwiY29sLW1kLTZcIikpLmFwcGVuZChlLmFkZENsYXNzKFwiY29sLW1kLTZcIikpKSxcImJvdHRvbVwiPT09ZC50b29sYmFyUGxhY2VtZW50JiZiLmFwcGVuZChnKSxiKTooXCJ0b3BcIj09PWQudG9vbGJhclBsYWNlbWVudCYmZi5hcHBlbmQoZyksQSgpJiZmLmFwcGVuZChhKFwiPGxpPlwiKS5hZGRDbGFzcyhkLmNvbGxhcHNlJiZ6KCk/XCJjb2xsYXBzZSBpblwiOlwiXCIpLmFwcGVuZChjKSksXCJkZWZhdWx0XCI9PT1kLnRvb2xiYXJQbGFjZW1lbnQmJmYuYXBwZW5kKGcpLHooKSYmZi5hcHBlbmQoYShcIjxsaT5cIikuYWRkQ2xhc3MoZC5jb2xsYXBzZSYmQSgpP1wiY29sbGFwc2VcIjpcIlwiKS5hcHBlbmQoZSkpLFwiYm90dG9tXCI9PT1kLnRvb2xiYXJQbGFjZW1lbnQmJmYuYXBwZW5kKGcpLGIuYXBwZW5kKGYpKX0sRz1mdW5jdGlvbigpe3ZhciBiLGU9e307cmV0dXJuIGI9Yy5pcyhcImlucHV0XCIpfHxkLmlubGluZT9jLmRhdGEoKTpjLmZpbmQoXCJpbnB1dFwiKS5kYXRhKCksYi5kYXRlT3B0aW9ucyYmYi5kYXRlT3B0aW9ucyBpbnN0YW5jZW9mIE9iamVjdCYmKGU9YS5leHRlbmQoITAsZSxiLmRhdGVPcHRpb25zKSksYS5lYWNoKGQsZnVuY3Rpb24oYSl7dmFyIGM9XCJkYXRlXCIrYS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSthLnNsaWNlKDEpO3ZvaWQgMCE9PWJbY10mJihlW2FdPWJbY10pfSksZX0sSD1mdW5jdGlvbigpe3ZhciBiLGU9KG58fGMpLnBvc2l0aW9uKCksZj0obnx8Yykub2Zmc2V0KCksZz1kLndpZGdldFBvc2l0aW9uaW5nLnZlcnRpY2FsLGg9ZC53aWRnZXRQb3NpdGlvbmluZy5ob3Jpem9udGFsO2lmKGQud2lkZ2V0UGFyZW50KWI9ZC53aWRnZXRQYXJlbnQuYXBwZW5kKG8pO2Vsc2UgaWYoYy5pcyhcImlucHV0XCIpKWI9Yy5hZnRlcihvKS5wYXJlbnQoKTtlbHNle2lmKGQuaW5saW5lKXJldHVybiB2b2lkKGI9Yy5hcHBlbmQobykpO2I9YyxjLmNoaWxkcmVuKCkuZmlyc3QoKS5hZnRlcihvKX1pZihcImF1dG9cIj09PWcmJihnPWYudG9wKzEuNSpvLmhlaWdodCgpPj1hKHdpbmRvdykuaGVpZ2h0KCkrYSh3aW5kb3cpLnNjcm9sbFRvcCgpJiZvLmhlaWdodCgpK2Mub3V0ZXJIZWlnaHQoKTxmLnRvcD9cInRvcFwiOlwiYm90dG9tXCIpLFwiYXV0b1wiPT09aCYmKGg9Yi53aWR0aCgpPGYubGVmdCtvLm91dGVyV2lkdGgoKS8yJiZmLmxlZnQrby5vdXRlcldpZHRoKCk+YSh3aW5kb3cpLndpZHRoKCk/XCJyaWdodFwiOlwibGVmdFwiKSxcInRvcFwiPT09Zz9vLmFkZENsYXNzKFwidG9wXCIpLnJlbW92ZUNsYXNzKFwiYm90dG9tXCIpOm8uYWRkQ2xhc3MoXCJib3R0b21cIikucmVtb3ZlQ2xhc3MoXCJ0b3BcIiksXCJyaWdodFwiPT09aD9vLmFkZENsYXNzKFwicHVsbC1yaWdodFwiKTpvLnJlbW92ZUNsYXNzKFwicHVsbC1yaWdodFwiKSxcInJlbGF0aXZlXCIhPT1iLmNzcyhcInBvc2l0aW9uXCIpJiYoYj1iLnBhcmVudHMoKS5maWx0ZXIoZnVuY3Rpb24oKXtyZXR1cm5cInJlbGF0aXZlXCI9PT1hKHRoaXMpLmNzcyhcInBvc2l0aW9uXCIpfSkuZmlyc3QoKSksMD09PWIubGVuZ3RoKXRocm93IG5ldyBFcnJvcihcImRhdGV0aW1lcGlja2VyIGNvbXBvbmVudCBzaG91bGQgYmUgcGxhY2VkIHdpdGhpbiBhIHJlbGF0aXZlIHBvc2l0aW9uZWQgY29udGFpbmVyXCIpO28uY3NzKHt0b3A6XCJ0b3BcIj09PWc/XCJhdXRvXCI6ZS50b3ArYy5vdXRlckhlaWdodCgpLGJvdHRvbTpcInRvcFwiPT09Zz9lLnRvcCtjLm91dGVySGVpZ2h0KCk6XCJhdXRvXCIsbGVmdDpcImxlZnRcIj09PWg/Yj09PWM/MDplLmxlZnQ6XCJhdXRvXCIscmlnaHQ6XCJsZWZ0XCI9PT1oP1wiYXV0b1wiOmIub3V0ZXJXaWR0aCgpLWMub3V0ZXJXaWR0aCgpLShiPT09Yz8wOmUubGVmdCl9KX0sST1mdW5jdGlvbihhKXtcImRwLmNoYW5nZVwiPT09YS50eXBlJiYoYS5kYXRlJiZhLmRhdGUuaXNTYW1lKGEub2xkRGF0ZSl8fCFhLmRhdGUmJiFhLm9sZERhdGUpfHxjLnRyaWdnZXIoYSl9LEo9ZnVuY3Rpb24oYSl7XCJ5XCI9PT1hJiYoYT1cIllZWVlcIiksSSh7dHlwZTpcImRwLnVwZGF0ZVwiLGNoYW5nZTphLHZpZXdEYXRlOmYuY2xvbmUoKX0pfSxLPWZ1bmN0aW9uKGEpe28mJihhJiYoaz1NYXRoLm1heChwLE1hdGgubWluKDMsaythKSkpLG8uZmluZChcIi5kYXRlcGlja2VyID4gZGl2XCIpLmhpZGUoKS5maWx0ZXIoXCIuZGF0ZXBpY2tlci1cIitxW2tdLmNsc05hbWUpLnNob3coKSl9LEw9ZnVuY3Rpb24oKXt2YXIgYj1hKFwiPHRyPlwiKSxjPWYuY2xvbmUoKS5zdGFydE9mKFwid1wiKS5zdGFydE9mKFwiZFwiKTtmb3IoZC5jYWxlbmRhcldlZWtzPT09ITAmJmIuYXBwZW5kKGEoXCI8dGg+XCIpLmFkZENsYXNzKFwiY3dcIikudGV4dChcIiNcIikpO2MuaXNCZWZvcmUoZi5jbG9uZSgpLmVuZE9mKFwid1wiKSk7KWIuYXBwZW5kKGEoXCI8dGg+XCIpLmFkZENsYXNzKFwiZG93XCIpLnRleHQoYy5mb3JtYXQoXCJkZFwiKSkpLGMuYWRkKDEsXCJkXCIpO28uZmluZChcIi5kYXRlcGlja2VyLWRheXMgdGhlYWRcIikuYXBwZW5kKGIpfSxNPWZ1bmN0aW9uKGEpe3JldHVybiBkLmRpc2FibGVkRGF0ZXNbYS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpXT09PSEwfSxOPWZ1bmN0aW9uKGEpe3JldHVybiBkLmVuYWJsZWREYXRlc1thLmZvcm1hdChcIllZWVktTU0tRERcIildPT09ITB9LE89ZnVuY3Rpb24oYSl7cmV0dXJuIGQuZGlzYWJsZWRIb3Vyc1thLmZvcm1hdChcIkhcIildPT09ITB9LFA9ZnVuY3Rpb24oYSl7cmV0dXJuIGQuZW5hYmxlZEhvdXJzW2EuZm9ybWF0KFwiSFwiKV09PT0hMH0sUT1mdW5jdGlvbihiLGMpe2lmKCFiLmlzVmFsaWQoKSlyZXR1cm4hMTtpZihkLmRpc2FibGVkRGF0ZXMmJlwiZFwiPT09YyYmTShiKSlyZXR1cm4hMTtpZihkLmVuYWJsZWREYXRlcyYmXCJkXCI9PT1jJiYhTihiKSlyZXR1cm4hMTtpZihkLm1pbkRhdGUmJmIuaXNCZWZvcmUoZC5taW5EYXRlLGMpKXJldHVybiExO2lmKGQubWF4RGF0ZSYmYi5pc0FmdGVyKGQubWF4RGF0ZSxjKSlyZXR1cm4hMTtpZihkLmRheXNPZldlZWtEaXNhYmxlZCYmXCJkXCI9PT1jJiYtMSE9PWQuZGF5c09mV2Vla0Rpc2FibGVkLmluZGV4T2YoYi5kYXkoKSkpcmV0dXJuITE7aWYoZC5kaXNhYmxlZEhvdXJzJiYoXCJoXCI9PT1jfHxcIm1cIj09PWN8fFwic1wiPT09YykmJk8oYikpcmV0dXJuITE7aWYoZC5lbmFibGVkSG91cnMmJihcImhcIj09PWN8fFwibVwiPT09Y3x8XCJzXCI9PT1jKSYmIVAoYikpcmV0dXJuITE7aWYoZC5kaXNhYmxlZFRpbWVJbnRlcnZhbHMmJihcImhcIj09PWN8fFwibVwiPT09Y3x8XCJzXCI9PT1jKSl7dmFyIGU9ITE7aWYoYS5lYWNoKGQuZGlzYWJsZWRUaW1lSW50ZXJ2YWxzLGZ1bmN0aW9uKCl7cmV0dXJuIGIuaXNCZXR3ZWVuKHRoaXNbMF0sdGhpc1sxXSk/KGU9ITAsITEpOnZvaWQgMH0pLGUpcmV0dXJuITF9cmV0dXJuITB9LFI9ZnVuY3Rpb24oKXtmb3IodmFyIGI9W10sYz1mLmNsb25lKCkuc3RhcnRPZihcInlcIikuc3RhcnRPZihcImRcIik7Yy5pc1NhbWUoZixcInlcIik7KWIucHVzaChhKFwiPHNwYW4+XCIpLmF0dHIoXCJkYXRhLWFjdGlvblwiLFwic2VsZWN0TW9udGhcIikuYWRkQ2xhc3MoXCJtb250aFwiKS50ZXh0KGMuZm9ybWF0KFwiTU1NXCIpKSksYy5hZGQoMSxcIk1cIik7by5maW5kKFwiLmRhdGVwaWNrZXItbW9udGhzIHRkXCIpLmVtcHR5KCkuYXBwZW5kKGIpfSxTPWZ1bmN0aW9uKCl7dmFyIGI9by5maW5kKFwiLmRhdGVwaWNrZXItbW9udGhzXCIpLGM9Yi5maW5kKFwidGhcIiksZz1iLmZpbmQoXCJ0Ym9keVwiKS5maW5kKFwic3BhblwiKTtjLmVxKDApLmZpbmQoXCJzcGFuXCIpLmF0dHIoXCJ0aXRsZVwiLGQudG9vbHRpcHMucHJldlllYXIpLGMuZXEoMSkuYXR0cihcInRpdGxlXCIsZC50b29sdGlwcy5zZWxlY3RZZWFyKSxjLmVxKDIpLmZpbmQoXCJzcGFuXCIpLmF0dHIoXCJ0aXRsZVwiLGQudG9vbHRpcHMubmV4dFllYXIpLGIuZmluZChcIi5kaXNhYmxlZFwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLFEoZi5jbG9uZSgpLnN1YnRyYWN0KDEsXCJ5XCIpLFwieVwiKXx8Yy5lcSgwKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpLGMuZXEoMSkudGV4dChmLnllYXIoKSksUShmLmNsb25lKCkuYWRkKDEsXCJ5XCIpLFwieVwiKXx8Yy5lcSgyKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpLGcucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIiksZS5pc1NhbWUoZixcInlcIikmJiFtJiZnLmVxKGUubW9udGgoKSkuYWRkQ2xhc3MoXCJhY3RpdmVcIiksZy5lYWNoKGZ1bmN0aW9uKGIpe1EoZi5jbG9uZSgpLm1vbnRoKGIpLFwiTVwiKXx8YSh0aGlzKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpfSl9LFQ9ZnVuY3Rpb24oKXt2YXIgYT1vLmZpbmQoXCIuZGF0ZXBpY2tlci15ZWFyc1wiKSxiPWEuZmluZChcInRoXCIpLGM9Zi5jbG9uZSgpLnN1YnRyYWN0KDUsXCJ5XCIpLGc9Zi5jbG9uZSgpLmFkZCg2LFwieVwiKSxoPVwiXCI7Zm9yKGIuZXEoMCkuZmluZChcInNwYW5cIikuYXR0cihcInRpdGxlXCIsZC50b29sdGlwcy5wcmV2RGVjYWRlKSxiLmVxKDEpLmF0dHIoXCJ0aXRsZVwiLGQudG9vbHRpcHMuc2VsZWN0RGVjYWRlKSxiLmVxKDIpLmZpbmQoXCJzcGFuXCIpLmF0dHIoXCJ0aXRsZVwiLGQudG9vbHRpcHMubmV4dERlY2FkZSksYS5maW5kKFwiLmRpc2FibGVkXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIiksZC5taW5EYXRlJiZkLm1pbkRhdGUuaXNBZnRlcihjLFwieVwiKSYmYi5lcSgwKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpLGIuZXEoMSkudGV4dChjLnllYXIoKStcIi1cIitnLnllYXIoKSksZC5tYXhEYXRlJiZkLm1heERhdGUuaXNCZWZvcmUoZyxcInlcIikmJmIuZXEoMikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTshYy5pc0FmdGVyKGcsXCJ5XCIpOyloKz0nPHNwYW4gZGF0YS1hY3Rpb249XCJzZWxlY3RZZWFyXCIgY2xhc3M9XCJ5ZWFyJysoYy5pc1NhbWUoZSxcInlcIikmJiFtP1wiIGFjdGl2ZVwiOlwiXCIpKyhRKGMsXCJ5XCIpP1wiXCI6XCIgZGlzYWJsZWRcIikrJ1wiPicrYy55ZWFyKCkrXCI8L3NwYW4+XCIsYy5hZGQoMSxcInlcIik7YS5maW5kKFwidGRcIikuaHRtbChoKX0sVT1mdW5jdGlvbigpe3ZhciBhPW8uZmluZChcIi5kYXRlcGlja2VyLWRlY2FkZXNcIiksYz1hLmZpbmQoXCJ0aFwiKSxnPWIoe3k6Zi55ZWFyKCktZi55ZWFyKCklMTAwLTF9KSxoPWcuY2xvbmUoKS5hZGQoMTAwLFwieVwiKSxpPWcuY2xvbmUoKSxqPVwiXCI7Zm9yKGMuZXEoMCkuZmluZChcInNwYW5cIikuYXR0cihcInRpdGxlXCIsZC50b29sdGlwcy5wcmV2Q2VudHVyeSksYy5lcSgyKS5maW5kKFwic3BhblwiKS5hdHRyKFwidGl0bGVcIixkLnRvb2x0aXBzLm5leHRDZW50dXJ5KSxhLmZpbmQoXCIuZGlzYWJsZWRcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKSwoZy5pc1NhbWUoYih7eToxOTAwfSkpfHxkLm1pbkRhdGUmJmQubWluRGF0ZS5pc0FmdGVyKGcsXCJ5XCIpKSYmYy5lcSgwKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpLGMuZXEoMSkudGV4dChnLnllYXIoKStcIi1cIitoLnllYXIoKSksKGcuaXNTYW1lKGIoe3k6MmUzfSkpfHxkLm1heERhdGUmJmQubWF4RGF0ZS5pc0JlZm9yZShoLFwieVwiKSkmJmMuZXEoMikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTshZy5pc0FmdGVyKGgsXCJ5XCIpOylqKz0nPHNwYW4gZGF0YS1hY3Rpb249XCJzZWxlY3REZWNhZGVcIiBjbGFzcz1cImRlY2FkZScrKGcuaXNTYW1lKGUsXCJ5XCIpP1wiIGFjdGl2ZVwiOlwiXCIpKyhRKGcsXCJ5XCIpP1wiXCI6XCIgZGlzYWJsZWRcIikrJ1wiIGRhdGEtc2VsZWN0aW9uPVwiJysoZy55ZWFyKCkrNikrJ1wiPicrKGcueWVhcigpKzEpK1wiIC0gXCIrKGcueWVhcigpKzEyKStcIjwvc3Bhbj5cIixnLmFkZCgxMixcInlcIik7ais9XCI8c3Bhbj48L3NwYW4+PHNwYW4+PC9zcGFuPjxzcGFuPjwvc3Bhbj5cIixhLmZpbmQoXCJ0ZFwiKS5odG1sKGopLGMuZXEoMSkudGV4dChpLnllYXIoKSsxK1wiLVwiK2cueWVhcigpKX0sVj1mdW5jdGlvbigpe3ZhciBiLGMsZyxoLGk9by5maW5kKFwiLmRhdGVwaWNrZXItZGF5c1wiKSxqPWkuZmluZChcInRoXCIpLGs9W107aWYoQSgpKXtmb3Ioai5lcSgwKS5maW5kKFwic3BhblwiKS5hdHRyKFwidGl0bGVcIixkLnRvb2x0aXBzLnByZXZNb250aCksai5lcSgxKS5hdHRyKFwidGl0bGVcIixkLnRvb2x0aXBzLnNlbGVjdE1vbnRoKSxqLmVxKDIpLmZpbmQoXCJzcGFuXCIpLmF0dHIoXCJ0aXRsZVwiLGQudG9vbHRpcHMubmV4dE1vbnRoKSxpLmZpbmQoXCIuZGlzYWJsZWRcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKSxqLmVxKDEpLnRleHQoZi5mb3JtYXQoZC5kYXlWaWV3SGVhZGVyRm9ybWF0KSksUShmLmNsb25lKCkuc3VidHJhY3QoMSxcIk1cIiksXCJNXCIpfHxqLmVxKDApLmFkZENsYXNzKFwiZGlzYWJsZWRcIiksUShmLmNsb25lKCkuYWRkKDEsXCJNXCIpLFwiTVwiKXx8ai5lcSgyKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpLGI9Zi5jbG9uZSgpLnN0YXJ0T2YoXCJNXCIpLnN0YXJ0T2YoXCJ3XCIpLnN0YXJ0T2YoXCJkXCIpLGg9MDs0Mj5oO2grKykwPT09Yi53ZWVrZGF5KCkmJihjPWEoXCI8dHI+XCIpLGQuY2FsZW5kYXJXZWVrcyYmYy5hcHBlbmQoJzx0ZCBjbGFzcz1cImN3XCI+JytiLndlZWsoKStcIjwvdGQ+XCIpLGsucHVzaChjKSksZz1cIlwiLGIuaXNCZWZvcmUoZixcIk1cIikmJihnKz1cIiBvbGRcIiksYi5pc0FmdGVyKGYsXCJNXCIpJiYoZys9XCIgbmV3XCIpLGIuaXNTYW1lKGUsXCJkXCIpJiYhbSYmKGcrPVwiIGFjdGl2ZVwiKSxRKGIsXCJkXCIpfHwoZys9XCIgZGlzYWJsZWRcIiksYi5pc1NhbWUoeCgpLFwiZFwiKSYmKGcrPVwiIHRvZGF5XCIpLCgwPT09Yi5kYXkoKXx8Nj09PWIuZGF5KCkpJiYoZys9XCIgd2Vla2VuZFwiKSxjLmFwcGVuZCgnPHRkIGRhdGEtYWN0aW9uPVwic2VsZWN0RGF5XCIgZGF0YS1kYXk9XCInK2IuZm9ybWF0KFwiTFwiKSsnXCIgY2xhc3M9XCJkYXknK2crJ1wiPicrYi5kYXRlKCkrXCI8L3RkPlwiKSxiLmFkZCgxLFwiZFwiKTtpLmZpbmQoXCJ0Ym9keVwiKS5lbXB0eSgpLmFwcGVuZChrKSxTKCksVCgpLFUoKX19LFc9ZnVuY3Rpb24oKXt2YXIgYj1vLmZpbmQoXCIudGltZXBpY2tlci1ob3VycyB0YWJsZVwiKSxjPWYuY2xvbmUoKS5zdGFydE9mKFwiZFwiKSxkPVtdLGU9YShcIjx0cj5cIik7Zm9yKGYuaG91cigpPjExJiYhaCYmYy5ob3VyKDEyKTtjLmlzU2FtZShmLFwiZFwiKSYmKGh8fGYuaG91cigpPDEyJiZjLmhvdXIoKTwxMnx8Zi5ob3VyKCk+MTEpOyljLmhvdXIoKSU0PT09MCYmKGU9YShcIjx0cj5cIiksZC5wdXNoKGUpKSxlLmFwcGVuZCgnPHRkIGRhdGEtYWN0aW9uPVwic2VsZWN0SG91clwiIGNsYXNzPVwiaG91cicrKFEoYyxcImhcIik/XCJcIjpcIiBkaXNhYmxlZFwiKSsnXCI+JytjLmZvcm1hdChoP1wiSEhcIjpcImhoXCIpK1wiPC90ZD5cIiksYy5hZGQoMSxcImhcIik7Yi5lbXB0eSgpLmFwcGVuZChkKX0sWD1mdW5jdGlvbigpe2Zvcih2YXIgYj1vLmZpbmQoXCIudGltZXBpY2tlci1taW51dGVzIHRhYmxlXCIpLGM9Zi5jbG9uZSgpLnN0YXJ0T2YoXCJoXCIpLGU9W10sZz1hKFwiPHRyPlwiKSxoPTE9PT1kLnN0ZXBwaW5nPzU6ZC5zdGVwcGluZztmLmlzU2FtZShjLFwiaFwiKTspYy5taW51dGUoKSUoNCpoKT09PTAmJihnPWEoXCI8dHI+XCIpLGUucHVzaChnKSksZy5hcHBlbmQoJzx0ZCBkYXRhLWFjdGlvbj1cInNlbGVjdE1pbnV0ZVwiIGNsYXNzPVwibWludXRlJysoUShjLFwibVwiKT9cIlwiOlwiIGRpc2FibGVkXCIpKydcIj4nK2MuZm9ybWF0KFwibW1cIikrXCI8L3RkPlwiKSxjLmFkZChoLFwibVwiKTtiLmVtcHR5KCkuYXBwZW5kKGUpfSxZPWZ1bmN0aW9uKCl7Zm9yKHZhciBiPW8uZmluZChcIi50aW1lcGlja2VyLXNlY29uZHMgdGFibGVcIiksYz1mLmNsb25lKCkuc3RhcnRPZihcIm1cIiksZD1bXSxlPWEoXCI8dHI+XCIpO2YuaXNTYW1lKGMsXCJtXCIpOyljLnNlY29uZCgpJTIwPT09MCYmKGU9YShcIjx0cj5cIiksZC5wdXNoKGUpKSxlLmFwcGVuZCgnPHRkIGRhdGEtYWN0aW9uPVwic2VsZWN0U2Vjb25kXCIgY2xhc3M9XCJzZWNvbmQnKyhRKGMsXCJzXCIpP1wiXCI6XCIgZGlzYWJsZWRcIikrJ1wiPicrYy5mb3JtYXQoXCJzc1wiKStcIjwvdGQ+XCIpLGMuYWRkKDUsXCJzXCIpO2IuZW1wdHkoKS5hcHBlbmQoZCl9LFo9ZnVuY3Rpb24oKXt2YXIgYSxiLGM9by5maW5kKFwiLnRpbWVwaWNrZXIgc3BhbltkYXRhLXRpbWUtY29tcG9uZW50XVwiKTtofHwoYT1vLmZpbmQoXCIudGltZXBpY2tlciBbZGF0YS1hY3Rpb249dG9nZ2xlUGVyaW9kXVwiKSxiPWUuY2xvbmUoKS5hZGQoZS5ob3VycygpPj0xMj8tMTI6MTIsXCJoXCIpLGEudGV4dChlLmZvcm1hdChcIkFcIikpLFEoYixcImhcIik/YS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpOmEuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKSksYy5maWx0ZXIoXCJbZGF0YS10aW1lLWNvbXBvbmVudD1ob3Vyc11cIikudGV4dChlLmZvcm1hdChoP1wiSEhcIjpcImhoXCIpKSxjLmZpbHRlcihcIltkYXRhLXRpbWUtY29tcG9uZW50PW1pbnV0ZXNdXCIpLnRleHQoZS5mb3JtYXQoXCJtbVwiKSksYy5maWx0ZXIoXCJbZGF0YS10aW1lLWNvbXBvbmVudD1zZWNvbmRzXVwiKS50ZXh0KGUuZm9ybWF0KFwic3NcIikpLFcoKSxYKCksWSgpfSwkPWZ1bmN0aW9uKCl7byYmKFYoKSxaKCkpfSxfPWZ1bmN0aW9uKGEpe3ZhciBiPW0/bnVsbDplO3JldHVybiBhPyhhPWEuY2xvbmUoKS5sb2NhbGUoZC5sb2NhbGUpLDEhPT1kLnN0ZXBwaW5nJiZhLm1pbnV0ZXMoTWF0aC5yb3VuZChhLm1pbnV0ZXMoKS9kLnN0ZXBwaW5nKSpkLnN0ZXBwaW5nJTYwKS5zZWNvbmRzKDApLHZvaWQoUShhKT8oZT1hLGY9ZS5jbG9uZSgpLGcudmFsKGUuZm9ybWF0KGkpKSxjLmRhdGEoXCJkYXRlXCIsZS5mb3JtYXQoaSkpLG09ITEsJCgpLEkoe3R5cGU6XCJkcC5jaGFuZ2VcIixkYXRlOmUuY2xvbmUoKSxvbGREYXRlOmJ9KSk6KGQua2VlcEludmFsaWR8fGcudmFsKG0/XCJcIjplLmZvcm1hdChpKSksSSh7dHlwZTpcImRwLmVycm9yXCIsZGF0ZTphfSkpKSk6KG09ITAsZy52YWwoXCJcIiksYy5kYXRhKFwiZGF0ZVwiLFwiXCIpLEkoe3R5cGU6XCJkcC5jaGFuZ2VcIixkYXRlOiExLG9sZERhdGU6Yn0pLHZvaWQgJCgpKX0sYWE9ZnVuY3Rpb24oKXt2YXIgYj0hMTtyZXR1cm4gbz8oby5maW5kKFwiLmNvbGxhcHNlXCIpLmVhY2goZnVuY3Rpb24oKXt2YXIgYz1hKHRoaXMpLmRhdGEoXCJjb2xsYXBzZVwiKTtyZXR1cm4gYyYmYy50cmFuc2l0aW9uaW5nPyhiPSEwLCExKTohMH0pLGI/bDoobiYmbi5oYXNDbGFzcyhcImJ0blwiKSYmbi50b2dnbGVDbGFzcyhcImFjdGl2ZVwiKSxvLmhpZGUoKSxhKHdpbmRvdykub2ZmKFwicmVzaXplXCIsSCksby5vZmYoXCJjbGlja1wiLFwiW2RhdGEtYWN0aW9uXVwiKSxvLm9mZihcIm1vdXNlZG93blwiLCExKSxvLnJlbW92ZSgpLG89ITEsSSh7dHlwZTpcImRwLmhpZGVcIixkYXRlOmUuY2xvbmUoKX0pLGcuYmx1cigpLGwpKTpsfSxiYT1mdW5jdGlvbigpe18obnVsbCl9LGNhPXtuZXh0OmZ1bmN0aW9uKCl7dmFyIGE9cVtrXS5uYXZGbmM7Zi5hZGQocVtrXS5uYXZTdGVwLGEpLFYoKSxKKGEpfSxwcmV2aW91czpmdW5jdGlvbigpe3ZhciBhPXFba10ubmF2Rm5jO2Yuc3VidHJhY3QocVtrXS5uYXZTdGVwLGEpLFYoKSxKKGEpfSxwaWNrZXJTd2l0Y2g6ZnVuY3Rpb24oKXtLKDEpfSxzZWxlY3RNb250aDpmdW5jdGlvbihiKXt2YXIgYz1hKGIudGFyZ2V0KS5jbG9zZXN0KFwidGJvZHlcIikuZmluZChcInNwYW5cIikuaW5kZXgoYShiLnRhcmdldCkpO2YubW9udGgoYyksaz09PXA/KF8oZS5jbG9uZSgpLnllYXIoZi55ZWFyKCkpLm1vbnRoKGYubW9udGgoKSkpLGQuaW5saW5lfHxhYSgpKTooSygtMSksVigpKSxKKFwiTVwiKX0sc2VsZWN0WWVhcjpmdW5jdGlvbihiKXt2YXIgYz1wYXJzZUludChhKGIudGFyZ2V0KS50ZXh0KCksMTApfHwwO2YueWVhcihjKSxrPT09cD8oXyhlLmNsb25lKCkueWVhcihmLnllYXIoKSkpLGQuaW5saW5lfHxhYSgpKTooSygtMSksVigpKSxKKFwiWVlZWVwiKX0sc2VsZWN0RGVjYWRlOmZ1bmN0aW9uKGIpe3ZhciBjPXBhcnNlSW50KGEoYi50YXJnZXQpLmRhdGEoXCJzZWxlY3Rpb25cIiksMTApfHwwO2YueWVhcihjKSxrPT09cD8oXyhlLmNsb25lKCkueWVhcihmLnllYXIoKSkpLGQuaW5saW5lfHxhYSgpKTooSygtMSksVigpKSxKKFwiWVlZWVwiKX0sc2VsZWN0RGF5OmZ1bmN0aW9uKGIpe3ZhciBjPWYuY2xvbmUoKTthKGIudGFyZ2V0KS5pcyhcIi5vbGRcIikmJmMuc3VidHJhY3QoMSxcIk1cIiksYShiLnRhcmdldCkuaXMoXCIubmV3XCIpJiZjLmFkZCgxLFwiTVwiKSxfKGMuZGF0ZShwYXJzZUludChhKGIudGFyZ2V0KS50ZXh0KCksMTApKSkseigpfHxkLmtlZXBPcGVufHxkLmlubGluZXx8YWEoKX0saW5jcmVtZW50SG91cnM6ZnVuY3Rpb24oKXt2YXIgYT1lLmNsb25lKCkuYWRkKDEsXCJoXCIpO1EoYSxcImhcIikmJl8oYSl9LGluY3JlbWVudE1pbnV0ZXM6ZnVuY3Rpb24oKXt2YXIgYT1lLmNsb25lKCkuYWRkKGQuc3RlcHBpbmcsXCJtXCIpO1EoYSxcIm1cIikmJl8oYSl9LGluY3JlbWVudFNlY29uZHM6ZnVuY3Rpb24oKXt2YXIgYT1lLmNsb25lKCkuYWRkKDEsXCJzXCIpO1EoYSxcInNcIikmJl8oYSl9LGRlY3JlbWVudEhvdXJzOmZ1bmN0aW9uKCl7dmFyIGE9ZS5jbG9uZSgpLnN1YnRyYWN0KDEsXCJoXCIpO1EoYSxcImhcIikmJl8oYSl9LGRlY3JlbWVudE1pbnV0ZXM6ZnVuY3Rpb24oKXt2YXIgYT1lLmNsb25lKCkuc3VidHJhY3QoZC5zdGVwcGluZyxcIm1cIik7UShhLFwibVwiKSYmXyhhKX0sZGVjcmVtZW50U2Vjb25kczpmdW5jdGlvbigpe3ZhciBhPWUuY2xvbmUoKS5zdWJ0cmFjdCgxLFwic1wiKTtRKGEsXCJzXCIpJiZfKGEpfSx0b2dnbGVQZXJpb2Q6ZnVuY3Rpb24oKXtfKGUuY2xvbmUoKS5hZGQoZS5ob3VycygpPj0xMj8tMTI6MTIsXCJoXCIpKX0sdG9nZ2xlUGlja2VyOmZ1bmN0aW9uKGIpe3ZhciBjLGU9YShiLnRhcmdldCksZj1lLmNsb3Nlc3QoXCJ1bFwiKSxnPWYuZmluZChcIi5pblwiKSxoPWYuZmluZChcIi5jb2xsYXBzZTpub3QoLmluKVwiKTtpZihnJiZnLmxlbmd0aCl7aWYoYz1nLmRhdGEoXCJjb2xsYXBzZVwiKSxjJiZjLnRyYW5zaXRpb25pbmcpcmV0dXJuO2cuY29sbGFwc2U/KGcuY29sbGFwc2UoXCJoaWRlXCIpLGguY29sbGFwc2UoXCJzaG93XCIpKTooZy5yZW1vdmVDbGFzcyhcImluXCIpLGguYWRkQ2xhc3MoXCJpblwiKSksZS5pcyhcInNwYW5cIik/ZS50b2dnbGVDbGFzcyhkLmljb25zLnRpbWUrXCIgXCIrZC5pY29ucy5kYXRlKTplLmZpbmQoXCJzcGFuXCIpLnRvZ2dsZUNsYXNzKGQuaWNvbnMudGltZStcIiBcIitkLmljb25zLmRhdGUpfX0sc2hvd1BpY2tlcjpmdW5jdGlvbigpe28uZmluZChcIi50aW1lcGlja2VyID4gZGl2Om5vdCgudGltZXBpY2tlci1waWNrZXIpXCIpLmhpZGUoKSxvLmZpbmQoXCIudGltZXBpY2tlciAudGltZXBpY2tlci1waWNrZXJcIikuc2hvdygpfSxzaG93SG91cnM6ZnVuY3Rpb24oKXtvLmZpbmQoXCIudGltZXBpY2tlciAudGltZXBpY2tlci1waWNrZXJcIikuaGlkZSgpLG8uZmluZChcIi50aW1lcGlja2VyIC50aW1lcGlja2VyLWhvdXJzXCIpLnNob3coKX0sc2hvd01pbnV0ZXM6ZnVuY3Rpb24oKXtvLmZpbmQoXCIudGltZXBpY2tlciAudGltZXBpY2tlci1waWNrZXJcIikuaGlkZSgpLG8uZmluZChcIi50aW1lcGlja2VyIC50aW1lcGlja2VyLW1pbnV0ZXNcIikuc2hvdygpfSxzaG93U2Vjb25kczpmdW5jdGlvbigpe28uZmluZChcIi50aW1lcGlja2VyIC50aW1lcGlja2VyLXBpY2tlclwiKS5oaWRlKCksby5maW5kKFwiLnRpbWVwaWNrZXIgLnRpbWVwaWNrZXItc2Vjb25kc1wiKS5zaG93KCl9LHNlbGVjdEhvdXI6ZnVuY3Rpb24oYil7dmFyIGM9cGFyc2VJbnQoYShiLnRhcmdldCkudGV4dCgpLDEwKTtofHwoZS5ob3VycygpPj0xMj8xMiE9PWMmJihjKz0xMik6MTI9PT1jJiYoYz0wKSksXyhlLmNsb25lKCkuaG91cnMoYykpLGNhLnNob3dQaWNrZXIuY2FsbChsKX0sc2VsZWN0TWludXRlOmZ1bmN0aW9uKGIpe18oZS5jbG9uZSgpLm1pbnV0ZXMocGFyc2VJbnQoYShiLnRhcmdldCkudGV4dCgpLDEwKSkpLGNhLnNob3dQaWNrZXIuY2FsbChsKX0sc2VsZWN0U2Vjb25kOmZ1bmN0aW9uKGIpe18oZS5jbG9uZSgpLnNlY29uZHMocGFyc2VJbnQoYShiLnRhcmdldCkudGV4dCgpLDEwKSkpLGNhLnNob3dQaWNrZXIuY2FsbChsKX0sY2xlYXI6YmEsdG9kYXk6ZnVuY3Rpb24oKXt2YXIgYT14KCk7UShhLFwiZFwiKSYmXyhhKX0sY2xvc2U6YWF9LGRhPWZ1bmN0aW9uKGIpe3JldHVybiBhKGIuY3VycmVudFRhcmdldCkuaXMoXCIuZGlzYWJsZWRcIik/ITE6KGNhW2EoYi5jdXJyZW50VGFyZ2V0KS5kYXRhKFwiYWN0aW9uXCIpXS5hcHBseShsLGFyZ3VtZW50cyksITEpfSxlYT1mdW5jdGlvbigpe3ZhciBiLGM9e3llYXI6ZnVuY3Rpb24oYSl7cmV0dXJuIGEubW9udGgoMCkuZGF0ZSgxKS5ob3VycygwKS5zZWNvbmRzKDApLm1pbnV0ZXMoMCl9LG1vbnRoOmZ1bmN0aW9uKGEpe3JldHVybiBhLmRhdGUoMSkuaG91cnMoMCkuc2Vjb25kcygwKS5taW51dGVzKDApfSxkYXk6ZnVuY3Rpb24oYSl7cmV0dXJuIGEuaG91cnMoMCkuc2Vjb25kcygwKS5taW51dGVzKDApfSxob3VyOmZ1bmN0aW9uKGEpe3JldHVybiBhLnNlY29uZHMoMCkubWludXRlcygwKX0sbWludXRlOmZ1bmN0aW9uKGEpe3JldHVybiBhLnNlY29uZHMoMCl9fTtyZXR1cm4gZy5wcm9wKFwiZGlzYWJsZWRcIil8fCFkLmlnbm9yZVJlYWRvbmx5JiZnLnByb3AoXCJyZWFkb25seVwiKXx8bz9sOih2b2lkIDAhPT1nLnZhbCgpJiYwIT09Zy52YWwoKS50cmltKCkubGVuZ3RoP18oZ2EoZy52YWwoKS50cmltKCkpKTpkLnVzZUN1cnJlbnQmJm0mJihnLmlzKFwiaW5wdXRcIikmJjA9PT1nLnZhbCgpLnRyaW0oKS5sZW5ndGh8fGQuaW5saW5lKSYmKGI9eCgpLFwic3RyaW5nXCI9PXR5cGVvZiBkLnVzZUN1cnJlbnQmJihiPWNbZC51c2VDdXJyZW50XShiKSksXyhiKSksbz1GKCksTCgpLFIoKSxvLmZpbmQoXCIudGltZXBpY2tlci1ob3Vyc1wiKS5oaWRlKCksby5maW5kKFwiLnRpbWVwaWNrZXItbWludXRlc1wiKS5oaWRlKCksby5maW5kKFwiLnRpbWVwaWNrZXItc2Vjb25kc1wiKS5oaWRlKCksJCgpLEsoKSxhKHdpbmRvdykub24oXCJyZXNpemVcIixIKSxvLm9uKFwiY2xpY2tcIixcIltkYXRhLWFjdGlvbl1cIixkYSksby5vbihcIm1vdXNlZG93blwiLCExKSxuJiZuLmhhc0NsYXNzKFwiYnRuXCIpJiZuLnRvZ2dsZUNsYXNzKFwiYWN0aXZlXCIpLG8uc2hvdygpLEgoKSxkLmZvY3VzT25TaG93JiYhZy5pcyhcIjpmb2N1c1wiKSYmZy5mb2N1cygpLEkoe3R5cGU6XCJkcC5zaG93XCJ9KSxsKX0sZmE9ZnVuY3Rpb24oKXtyZXR1cm4gbz9hYSgpOmVhKCl9LGdhPWZ1bmN0aW9uKGEpe3JldHVybiBhPXZvaWQgMD09PWQucGFyc2VJbnB1dERhdGU/Yi5pc01vbWVudChhKXx8YSBpbnN0YW5jZW9mIERhdGU/YihhKTp4KGEpOmQucGFyc2VJbnB1dERhdGUoYSksYS5sb2NhbGUoZC5sb2NhbGUpLGF9LGhhPWZ1bmN0aW9uKGEpe3ZhciBiLGMsZSxmLGc9bnVsbCxoPVtdLGk9e30saj1hLndoaWNoLGs9XCJwXCI7d1tqXT1rO2ZvcihiIGluIHcpdy5oYXNPd25Qcm9wZXJ0eShiKSYmd1tiXT09PWsmJihoLnB1c2goYikscGFyc2VJbnQoYiwxMCkhPT1qJiYoaVtiXT0hMCkpO2ZvcihiIGluIGQua2V5QmluZHMpaWYoZC5rZXlCaW5kcy5oYXNPd25Qcm9wZXJ0eShiKSYmXCJmdW5jdGlvblwiPT10eXBlb2YgZC5rZXlCaW5kc1tiXSYmKGU9Yi5zcGxpdChcIiBcIiksZS5sZW5ndGg9PT1oLmxlbmd0aCYmdltqXT09PWVbZS5sZW5ndGgtMV0pKXtmb3IoZj0hMCxjPWUubGVuZ3RoLTI7Yz49MDtjLS0paWYoISh2W2VbY11daW4gaSkpe2Y9ITE7YnJlYWt9aWYoZil7Zz1kLmtleUJpbmRzW2JdO2JyZWFrfX1nJiYoZy5jYWxsKGwsbyksYS5zdG9wUHJvcGFnYXRpb24oKSxhLnByZXZlbnREZWZhdWx0KCkpfSxpYT1mdW5jdGlvbihhKXt3W2Eud2hpY2hdPVwiclwiLGEuc3RvcFByb3BhZ2F0aW9uKCksYS5wcmV2ZW50RGVmYXVsdCgpfSxqYT1mdW5jdGlvbihiKXt2YXIgYz1hKGIudGFyZ2V0KS52YWwoKS50cmltKCksZD1jP2dhKGMpOm51bGw7cmV0dXJuIF8oZCksYi5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKSwhMX0sa2E9ZnVuY3Rpb24oKXtnLm9uKHtjaGFuZ2U6amEsYmx1cjpkLmRlYnVnP1wiXCI6YWEsa2V5ZG93bjpoYSxrZXl1cDppYSxmb2N1czpkLmFsbG93SW5wdXRUb2dnbGU/ZWE6XCJcIn0pLGMuaXMoXCJpbnB1dFwiKT9nLm9uKHtmb2N1czplYX0pOm4mJihuLm9uKFwiY2xpY2tcIixmYSksbi5vbihcIm1vdXNlZG93blwiLCExKSl9LGxhPWZ1bmN0aW9uKCl7Zy5vZmYoe2NoYW5nZTpqYSxibHVyOmJsdXIsa2V5ZG93bjpoYSxrZXl1cDppYSxmb2N1czpkLmFsbG93SW5wdXRUb2dnbGU/YWE6XCJcIn0pLGMuaXMoXCJpbnB1dFwiKT9nLm9mZih7Zm9jdXM6ZWF9KTpuJiYobi5vZmYoXCJjbGlja1wiLGZhKSxuLm9mZihcIm1vdXNlZG93blwiLCExKSl9LG1hPWZ1bmN0aW9uKGIpe3ZhciBjPXt9O3JldHVybiBhLmVhY2goYixmdW5jdGlvbigpe3ZhciBhPWdhKHRoaXMpO2EuaXNWYWxpZCgpJiYoY1thLmZvcm1hdChcIllZWVktTU0tRERcIildPSEwKX0pLE9iamVjdC5rZXlzKGMpLmxlbmd0aD9jOiExfSxuYT1mdW5jdGlvbihiKXt2YXIgYz17fTtyZXR1cm4gYS5lYWNoKGIsZnVuY3Rpb24oKXtjW3RoaXNdPSEwfSksT2JqZWN0LmtleXMoYykubGVuZ3RoP2M6ITF9LG9hPWZ1bmN0aW9uKCl7dmFyIGE9ZC5mb3JtYXR8fFwiTCBMVFwiO2k9YS5yZXBsYWNlKC8oXFxbW15cXFtdKlxcXSl8KFxcXFwpPyhMVFN8TFR8TEw/TD9MP3xsezEsNH0pL2csZnVuY3Rpb24oYSl7dmFyIGI9ZS5sb2NhbGVEYXRhKCkubG9uZ0RhdGVGb3JtYXQoYSl8fGE7cmV0dXJuIGIucmVwbGFjZSgvKFxcW1teXFxbXSpcXF0pfChcXFxcKT8oTFRTfExUfExMP0w/TD98bHsxLDR9KS9nLGZ1bmN0aW9uKGEpe3JldHVybiBlLmxvY2FsZURhdGEoKS5sb25nRGF0ZUZvcm1hdChhKXx8YX0pfSksaj1kLmV4dHJhRm9ybWF0cz9kLmV4dHJhRm9ybWF0cy5zbGljZSgpOltdLGouaW5kZXhPZihhKTwwJiZqLmluZGV4T2YoaSk8MCYmai5wdXNoKGkpLGg9aS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJhXCIpPDEmJmkucmVwbGFjZSgvXFxbLio/XFxdL2csXCJcIikuaW5kZXhPZihcImhcIik8MSx5KFwieVwiKSYmKHA9MikseShcIk1cIikmJihwPTEpLHkoXCJkXCIpJiYocD0wKSxrPU1hdGgubWF4KHAsayksbXx8XyhlKX07aWYobC5kZXN0cm95PWZ1bmN0aW9uKCl7YWEoKSxsYSgpLGMucmVtb3ZlRGF0YShcIkRhdGVUaW1lUGlja2VyXCIpLGMucmVtb3ZlRGF0YShcImRhdGVcIil9LGwudG9nZ2xlPWZhLGwuc2hvdz1lYSxsLmhpZGU9YWEsbC5kaXNhYmxlPWZ1bmN0aW9uKCl7cmV0dXJuIGFhKCksbiYmbi5oYXNDbGFzcyhcImJ0blwiKSYmbi5hZGRDbGFzcyhcImRpc2FibGVkXCIpLGcucHJvcChcImRpc2FibGVkXCIsITApLGx9LGwuZW5hYmxlPWZ1bmN0aW9uKCl7cmV0dXJuIG4mJm4uaGFzQ2xhc3MoXCJidG5cIikmJm4ucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKSxnLnByb3AoXCJkaXNhYmxlZFwiLCExKSxsfSxsLmlnbm9yZVJlYWRvbmx5PWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmlnbm9yZVJlYWRvbmx5O2lmKFwiYm9vbGVhblwiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiaWdub3JlUmVhZG9ubHkgKCkgZXhwZWN0cyBhIGJvb2xlYW4gcGFyYW1ldGVyXCIpO3JldHVybiBkLmlnbm9yZVJlYWRvbmx5PWEsbH0sbC5vcHRpb25zPWZ1bmN0aW9uKGIpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBhLmV4dGVuZCghMCx7fSxkKTtpZighKGIgaW5zdGFuY2VvZiBPYmplY3QpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zKCkgb3B0aW9ucyBwYXJhbWV0ZXIgc2hvdWxkIGJlIGFuIG9iamVjdFwiKTtyZXR1cm4gYS5leHRlbmQoITAsZCxiKSxhLmVhY2goZCxmdW5jdGlvbihhLGIpe2lmKHZvaWQgMD09PWxbYV0pdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbiBcIithK1wiIGlzIG5vdCByZWNvZ25pemVkIVwiKTtsW2FdKGIpfSksbH0sbC5kYXRlPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBtP251bGw6ZS5jbG9uZSgpO2lmKCEobnVsbD09PWF8fFwic3RyaW5nXCI9PXR5cGVvZiBhfHxiLmlzTW9tZW50KGEpfHxhIGluc3RhbmNlb2YgRGF0ZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcImRhdGUoKSBwYXJhbWV0ZXIgbXVzdCBiZSBvbmUgb2YgW251bGwsIHN0cmluZywgbW9tZW50IG9yIERhdGVdXCIpO3JldHVybiBfKG51bGw9PT1hP251bGw6Z2EoYSkpLGx9LGwuZm9ybWF0PWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmZvcm1hdDtpZihcInN0cmluZ1wiIT10eXBlb2YgYSYmKFwiYm9vbGVhblwiIT10eXBlb2YgYXx8YSE9PSExKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZm9ybWF0KCkgZXhwZWN0cyBhIHN0aW5nIG9yIGJvb2xlYW46ZmFsc2UgcGFyYW1ldGVyIFwiK2EpO3JldHVybiBkLmZvcm1hdD1hLGkmJm9hKCksbH0sbC50aW1lWm9uZT1mdW5jdGlvbihhKXtyZXR1cm4gMD09PWFyZ3VtZW50cy5sZW5ndGg/ZC50aW1lWm9uZTooZC50aW1lWm9uZT1hLGwpfSxsLmRheVZpZXdIZWFkZXJGb3JtYXQ9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuZGF5Vmlld0hlYWRlckZvcm1hdDtpZihcInN0cmluZ1wiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZGF5Vmlld0hlYWRlckZvcm1hdCgpIGV4cGVjdHMgYSBzdHJpbmcgcGFyYW1ldGVyXCIpO3JldHVybiBkLmRheVZpZXdIZWFkZXJGb3JtYXQ9YSxsfSxsLmV4dHJhRm9ybWF0cz1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5leHRyYUZvcm1hdHM7aWYoYSE9PSExJiYhKGEgaW5zdGFuY2VvZiBBcnJheSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcImV4dHJhRm9ybWF0cygpIGV4cGVjdHMgYW4gYXJyYXkgb3IgZmFsc2UgcGFyYW1ldGVyXCIpO3JldHVybiBkLmV4dHJhRm9ybWF0cz1hLGomJm9hKCksbH0sbC5kaXNhYmxlZERhdGVzPWZ1bmN0aW9uKGIpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmRpc2FibGVkRGF0ZXM/YS5leHRlbmQoe30sZC5kaXNhYmxlZERhdGVzKTpkLmRpc2FibGVkRGF0ZXM7aWYoIWIpcmV0dXJuIGQuZGlzYWJsZWREYXRlcz0hMSwkKCksbDtpZighKGIgaW5zdGFuY2VvZiBBcnJheSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcImRpc2FibGVkRGF0ZXMoKSBleHBlY3RzIGFuIGFycmF5IHBhcmFtZXRlclwiKTtyZXR1cm4gZC5kaXNhYmxlZERhdGVzPW1hKGIpLGQuZW5hYmxlZERhdGVzPSExLCQoKSxsfSxsLmVuYWJsZWREYXRlcz1mdW5jdGlvbihiKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5lbmFibGVkRGF0ZXM/YS5leHRlbmQoe30sZC5lbmFibGVkRGF0ZXMpOmQuZW5hYmxlZERhdGVzO2lmKCFiKXJldHVybiBkLmVuYWJsZWREYXRlcz0hMSwkKCksbDtpZighKGIgaW5zdGFuY2VvZiBBcnJheSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcImVuYWJsZWREYXRlcygpIGV4cGVjdHMgYW4gYXJyYXkgcGFyYW1ldGVyXCIpO3JldHVybiBkLmVuYWJsZWREYXRlcz1tYShiKSxkLmRpc2FibGVkRGF0ZXM9ITEsJCgpLGx9LGwuZGF5c09mV2Vla0Rpc2FibGVkPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmRheXNPZldlZWtEaXNhYmxlZC5zcGxpY2UoMCk7aWYoXCJib29sZWFuXCI9PXR5cGVvZiBhJiYhYSlyZXR1cm4gZC5kYXlzT2ZXZWVrRGlzYWJsZWQ9ITEsJCgpLGw7aWYoIShhIGluc3RhbmNlb2YgQXJyYXkpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJkYXlzT2ZXZWVrRGlzYWJsZWQoKSBleHBlY3RzIGFuIGFycmF5IHBhcmFtZXRlclwiKTtpZihkLmRheXNPZldlZWtEaXNhYmxlZD1hLnJlZHVjZShmdW5jdGlvbihhLGIpe3JldHVybiBiPXBhcnNlSW50KGIsMTApLGI+Nnx8MD5ifHxpc05hTihiKT9hOigtMT09PWEuaW5kZXhPZihiKSYmYS5wdXNoKGIpLGEpfSxbXSkuc29ydCgpLGQudXNlQ3VycmVudCYmIWQua2VlcEludmFsaWQpe2Zvcih2YXIgYj0wOyFRKGUsXCJkXCIpOyl7aWYoZS5hZGQoMSxcImRcIiksNz09PWIpdGhyb3dcIlRyaWVkIDcgdGltZXMgdG8gZmluZCBhIHZhbGlkIGRhdGVcIjtiKyt9XyhlKX1yZXR1cm4gJCgpLGx9LGwubWF4RGF0ZT1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5tYXhEYXRlP2QubWF4RGF0ZS5jbG9uZSgpOmQubWF4RGF0ZTtpZihcImJvb2xlYW5cIj09dHlwZW9mIGEmJmE9PT0hMSlyZXR1cm4gZC5tYXhEYXRlPSExLCQoKSxsO1wic3RyaW5nXCI9PXR5cGVvZiBhJiYoXCJub3dcIj09PWF8fFwibW9tZW50XCI9PT1hKSYmKGE9eCgpKTt2YXIgYj1nYShhKTtpZighYi5pc1ZhbGlkKCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIm1heERhdGUoKSBDb3VsZCBub3QgcGFyc2UgZGF0ZSBwYXJhbWV0ZXI6IFwiK2EpO2lmKGQubWluRGF0ZSYmYi5pc0JlZm9yZShkLm1pbkRhdGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJtYXhEYXRlKCkgZGF0ZSBwYXJhbWV0ZXIgaXMgYmVmb3JlIG9wdGlvbnMubWluRGF0ZTogXCIrYi5mb3JtYXQoaSkpO3JldHVybiBkLm1heERhdGU9YixkLnVzZUN1cnJlbnQmJiFkLmtlZXBJbnZhbGlkJiZlLmlzQWZ0ZXIoYSkmJl8oZC5tYXhEYXRlKSxmLmlzQWZ0ZXIoYikmJihmPWIuY2xvbmUoKS5zdWJ0cmFjdChkLnN0ZXBwaW5nLFwibVwiKSksJCgpLGx9LGwubWluRGF0ZT1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5taW5EYXRlP2QubWluRGF0ZS5jbG9uZSgpOmQubWluRGF0ZTtpZihcImJvb2xlYW5cIj09dHlwZW9mIGEmJmE9PT0hMSlyZXR1cm4gZC5taW5EYXRlPSExLCQoKSxsO1wic3RyaW5nXCI9PXR5cGVvZiBhJiYoXCJub3dcIj09PWF8fFwibW9tZW50XCI9PT1hKSYmKGE9eCgpKTt2YXIgYj1nYShhKTtpZighYi5pc1ZhbGlkKCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIm1pbkRhdGUoKSBDb3VsZCBub3QgcGFyc2UgZGF0ZSBwYXJhbWV0ZXI6IFwiK2EpO2lmKGQubWF4RGF0ZSYmYi5pc0FmdGVyKGQubWF4RGF0ZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIm1pbkRhdGUoKSBkYXRlIHBhcmFtZXRlciBpcyBhZnRlciBvcHRpb25zLm1heERhdGU6IFwiK2IuZm9ybWF0KGkpKTtyZXR1cm4gZC5taW5EYXRlPWIsZC51c2VDdXJyZW50JiYhZC5rZWVwSW52YWxpZCYmZS5pc0JlZm9yZShhKSYmXyhkLm1pbkRhdGUpLGYuaXNCZWZvcmUoYikmJihmPWIuY2xvbmUoKS5hZGQoZC5zdGVwcGluZyxcIm1cIikpLCQoKSxsfSxsLmRlZmF1bHREYXRlPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmRlZmF1bHREYXRlP2QuZGVmYXVsdERhdGUuY2xvbmUoKTpkLmRlZmF1bHREYXRlO2lmKCFhKXJldHVybiBkLmRlZmF1bHREYXRlPSExLGw7XCJzdHJpbmdcIj09dHlwZW9mIGEmJihcIm5vd1wiPT09YXx8XCJtb21lbnRcIj09PWEpJiYoYT14KCkpO3ZhciBiPWdhKGEpO2lmKCFiLmlzVmFsaWQoKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZGVmYXVsdERhdGUoKSBDb3VsZCBub3QgcGFyc2UgZGF0ZSBwYXJhbWV0ZXI6IFwiK2EpO2lmKCFRKGIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJkZWZhdWx0RGF0ZSgpIGRhdGUgcGFzc2VkIGlzIGludmFsaWQgYWNjb3JkaW5nIHRvIGNvbXBvbmVudCBzZXR1cCB2YWxpZGF0aW9uc1wiKTtyZXR1cm4gZC5kZWZhdWx0RGF0ZT1iLChkLmRlZmF1bHREYXRlJiZkLmlubGluZXx8XCJcIj09PWcudmFsKCkudHJpbSgpKSYmXyhkLmRlZmF1bHREYXRlKSxsfSxsLmxvY2FsZT1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5sb2NhbGU7aWYoIWIubG9jYWxlRGF0YShhKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwibG9jYWxlKCkgbG9jYWxlIFwiK2ErXCIgaXMgbm90IGxvYWRlZCBmcm9tIG1vbWVudCBsb2NhbGVzIVwiKTtyZXR1cm4gZC5sb2NhbGU9YSxlLmxvY2FsZShkLmxvY2FsZSksZi5sb2NhbGUoZC5sb2NhbGUpLGkmJm9hKCksbyYmKGFhKCksZWEoKSksbH0sbC5zdGVwcGluZz1mdW5jdGlvbihhKXtyZXR1cm4gMD09PWFyZ3VtZW50cy5sZW5ndGg/ZC5zdGVwcGluZzooYT1wYXJzZUludChhLDEwKSwoaXNOYU4oYSl8fDE+YSkmJihhPTEpLGQuc3RlcHBpbmc9YSxsKX0sbC51c2VDdXJyZW50PWZ1bmN0aW9uKGEpe3ZhciBiPVtcInllYXJcIixcIm1vbnRoXCIsXCJkYXlcIixcImhvdXJcIixcIm1pbnV0ZVwiXTtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC51c2VDdXJyZW50O2lmKFwiYm9vbGVhblwiIT10eXBlb2YgYSYmXCJzdHJpbmdcIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcInVzZUN1cnJlbnQoKSBleHBlY3RzIGEgYm9vbGVhbiBvciBzdHJpbmcgcGFyYW1ldGVyXCIpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBhJiYtMT09PWIuaW5kZXhPZihhLnRvTG93ZXJDYXNlKCkpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJ1c2VDdXJyZW50KCkgZXhwZWN0cyBhIHN0cmluZyBwYXJhbWV0ZXIgb2YgXCIrYi5qb2luKFwiLCBcIikpO3JldHVybiBkLnVzZUN1cnJlbnQ9YSxsfSxsLmNvbGxhcHNlPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmNvbGxhcHNlO2lmKFwiYm9vbGVhblwiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiY29sbGFwc2UoKSBleHBlY3RzIGEgYm9vbGVhbiBwYXJhbWV0ZXJcIik7cmV0dXJuIGQuY29sbGFwc2U9PT1hP2w6KGQuY29sbGFwc2U9YSxvJiYoYWEoKSxlYSgpKSxsKX0sbC5pY29ucz1mdW5jdGlvbihiKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gYS5leHRlbmQoe30sZC5pY29ucyk7aWYoIShiIGluc3RhbmNlb2YgT2JqZWN0KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiaWNvbnMoKSBleHBlY3RzIHBhcmFtZXRlciB0byBiZSBhbiBPYmplY3RcIik7cmV0dXJuIGEuZXh0ZW5kKGQuaWNvbnMsYiksbyYmKGFhKCksZWEoKSksbH0sbC50b29sdGlwcz1mdW5jdGlvbihiKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gYS5leHRlbmQoe30sZC50b29sdGlwcyk7aWYoIShiIGluc3RhbmNlb2YgT2JqZWN0KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwidG9vbHRpcHMoKSBleHBlY3RzIHBhcmFtZXRlciB0byBiZSBhbiBPYmplY3RcIik7cmV0dXJuIGEuZXh0ZW5kKGQudG9vbHRpcHMsYiksbyYmKGFhKCksZWEoKSksbH0sbC51c2VTdHJpY3Q9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQudXNlU3RyaWN0O2lmKFwiYm9vbGVhblwiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwidXNlU3RyaWN0KCkgZXhwZWN0cyBhIGJvb2xlYW4gcGFyYW1ldGVyXCIpO3JldHVybiBkLnVzZVN0cmljdD1hLGx9LGwuc2lkZUJ5U2lkZT1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5zaWRlQnlTaWRlO2lmKFwiYm9vbGVhblwiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwic2lkZUJ5U2lkZSgpIGV4cGVjdHMgYSBib29sZWFuIHBhcmFtZXRlclwiKTtyZXR1cm4gZC5zaWRlQnlTaWRlPWEsbyYmKGFhKCksZWEoKSksbH0sbC52aWV3TW9kZT1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC52aWV3TW9kZTtpZihcInN0cmluZ1wiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwidmlld01vZGUoKSBleHBlY3RzIGEgc3RyaW5nIHBhcmFtZXRlclwiKTtpZigtMT09PXIuaW5kZXhPZihhKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwidmlld01vZGUoKSBwYXJhbWV0ZXIgbXVzdCBiZSBvbmUgb2YgKFwiK3Iuam9pbihcIiwgXCIpK1wiKSB2YWx1ZVwiKTtyZXR1cm4gZC52aWV3TW9kZT1hLGs9TWF0aC5tYXgoci5pbmRleE9mKGEpLHApLEsoKSxsfSxsLnRvb2xiYXJQbGFjZW1lbnQ9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQudG9vbGJhclBsYWNlbWVudDtpZihcInN0cmluZ1wiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwidG9vbGJhclBsYWNlbWVudCgpIGV4cGVjdHMgYSBzdHJpbmcgcGFyYW1ldGVyXCIpO2lmKC0xPT09dS5pbmRleE9mKGEpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJ0b29sYmFyUGxhY2VtZW50KCkgcGFyYW1ldGVyIG11c3QgYmUgb25lIG9mIChcIit1LmpvaW4oXCIsIFwiKStcIikgdmFsdWVcIik7cmV0dXJuIGQudG9vbGJhclBsYWNlbWVudD1hLG8mJihhYSgpLGVhKCkpLGx9LGwud2lkZ2V0UG9zaXRpb25pbmc9ZnVuY3Rpb24oYil7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGEuZXh0ZW5kKHt9LGQud2lkZ2V0UG9zaXRpb25pbmcpO2lmKFwiW29iamVjdCBPYmplY3RdXCIhPT17fS50b1N0cmluZy5jYWxsKGIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJ3aWRnZXRQb3NpdGlvbmluZygpIGV4cGVjdHMgYW4gb2JqZWN0IHZhcmlhYmxlXCIpO2lmKGIuaG9yaXpvbnRhbCl7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGIuaG9yaXpvbnRhbCl0aHJvdyBuZXcgVHlwZUVycm9yKFwid2lkZ2V0UG9zaXRpb25pbmcoKSBob3Jpem9udGFsIHZhcmlhYmxlIG11c3QgYmUgYSBzdHJpbmdcIik7aWYoYi5ob3Jpem9udGFsPWIuaG9yaXpvbnRhbC50b0xvd2VyQ2FzZSgpLC0xPT09dC5pbmRleE9mKGIuaG9yaXpvbnRhbCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIndpZGdldFBvc2l0aW9uaW5nKCkgZXhwZWN0cyBob3Jpem9udGFsIHBhcmFtZXRlciB0byBiZSBvbmUgb2YgKFwiK3Quam9pbihcIiwgXCIpK1wiKVwiKTtkLndpZGdldFBvc2l0aW9uaW5nLmhvcml6b250YWw9Yi5ob3Jpem9udGFsfWlmKGIudmVydGljYWwpe2lmKFwic3RyaW5nXCIhPXR5cGVvZiBiLnZlcnRpY2FsKXRocm93IG5ldyBUeXBlRXJyb3IoXCJ3aWRnZXRQb3NpdGlvbmluZygpIHZlcnRpY2FsIHZhcmlhYmxlIG11c3QgYmUgYSBzdHJpbmdcIik7aWYoYi52ZXJ0aWNhbD1iLnZlcnRpY2FsLnRvTG93ZXJDYXNlKCksLTE9PT1zLmluZGV4T2YoYi52ZXJ0aWNhbCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIndpZGdldFBvc2l0aW9uaW5nKCkgZXhwZWN0cyB2ZXJ0aWNhbCBwYXJhbWV0ZXIgdG8gYmUgb25lIG9mIChcIitzLmpvaW4oXCIsIFwiKStcIilcIik7ZC53aWRnZXRQb3NpdGlvbmluZy52ZXJ0aWNhbD1iLnZlcnRpY2FsfXJldHVybiAkKCksbH0sbC5jYWxlbmRhcldlZWtzPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmNhbGVuZGFyV2Vla3M7aWYoXCJib29sZWFuXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJjYWxlbmRhcldlZWtzKCkgZXhwZWN0cyBwYXJhbWV0ZXIgdG8gYmUgYSBib29sZWFuIHZhbHVlXCIpO3JldHVybiBkLmNhbGVuZGFyV2Vla3M9YSwkKCksbH0sbC5zaG93VG9kYXlCdXR0b249ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuc2hvd1RvZGF5QnV0dG9uO2lmKFwiYm9vbGVhblwiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwic2hvd1RvZGF5QnV0dG9uKCkgZXhwZWN0cyBhIGJvb2xlYW4gcGFyYW1ldGVyXCIpO3JldHVybiBkLnNob3dUb2RheUJ1dHRvbj1hLG8mJihhYSgpLGVhKCkpLGx9LGwuc2hvd0NsZWFyPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLnNob3dDbGVhcjtpZihcImJvb2xlYW5cIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcInNob3dDbGVhcigpIGV4cGVjdHMgYSBib29sZWFuIHBhcmFtZXRlclwiKTtyZXR1cm4gZC5zaG93Q2xlYXI9YSxvJiYoYWEoKSxlYSgpKSxsfSxsLndpZGdldFBhcmVudD1mdW5jdGlvbihiKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC53aWRnZXRQYXJlbnQ7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGImJihiPWEoYikpLG51bGwhPT1iJiZcInN0cmluZ1wiIT10eXBlb2YgYiYmIShiIGluc3RhbmNlb2YgYSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIndpZGdldFBhcmVudCgpIGV4cGVjdHMgYSBzdHJpbmcgb3IgYSBqUXVlcnkgb2JqZWN0IHBhcmFtZXRlclwiKTtyZXR1cm4gZC53aWRnZXRQYXJlbnQ9YixvJiYoYWEoKSxlYSgpKSxsfSxsLmtlZXBPcGVuPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmtlZXBPcGVuO2lmKFwiYm9vbGVhblwiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwia2VlcE9wZW4oKSBleHBlY3RzIGEgYm9vbGVhbiBwYXJhbWV0ZXJcIik7cmV0dXJuIGQua2VlcE9wZW49YSxsfSxsLmZvY3VzT25TaG93PWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmZvY3VzT25TaG93O2lmKFwiYm9vbGVhblwiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZm9jdXNPblNob3coKSBleHBlY3RzIGEgYm9vbGVhbiBwYXJhbWV0ZXJcIik7cmV0dXJuIGQuZm9jdXNPblNob3c9YSxsfSxsLmlubGluZT1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5pbmxpbmU7aWYoXCJib29sZWFuXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJpbmxpbmUoKSBleHBlY3RzIGEgYm9vbGVhbiBwYXJhbWV0ZXJcIik7cmV0dXJuIGQuaW5saW5lPWEsbH0sbC5jbGVhcj1mdW5jdGlvbigpe3JldHVybiBiYSgpLGx9LGwua2V5QmluZHM9ZnVuY3Rpb24oYSl7cmV0dXJuIGQua2V5QmluZHM9YSxsfSxsLmdldE1vbWVudD1mdW5jdGlvbihhKXtyZXR1cm4geChhKX0sbC5kZWJ1Zz1mdW5jdGlvbihhKXtpZihcImJvb2xlYW5cIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcImRlYnVnKCkgZXhwZWN0cyBhIGJvb2xlYW4gcGFyYW1ldGVyXCIpO3JldHVybiBkLmRlYnVnPWEsbH0sbC5hbGxvd0lucHV0VG9nZ2xlPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmFsbG93SW5wdXRUb2dnbGU7aWYoXCJib29sZWFuXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJhbGxvd0lucHV0VG9nZ2xlKCkgZXhwZWN0cyBhIGJvb2xlYW4gcGFyYW1ldGVyXCIpO3JldHVybiBkLmFsbG93SW5wdXRUb2dnbGU9YSxsfSxsLnNob3dDbG9zZT1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5zaG93Q2xvc2U7aWYoXCJib29sZWFuXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJzaG93Q2xvc2UoKSBleHBlY3RzIGEgYm9vbGVhbiBwYXJhbWV0ZXJcIik7cmV0dXJuIGQuc2hvd0Nsb3NlPWEsbH0sbC5rZWVwSW52YWxpZD1mdW5jdGlvbihhKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5rZWVwSW52YWxpZDtpZihcImJvb2xlYW5cIiE9dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcImtlZXBJbnZhbGlkKCkgZXhwZWN0cyBhIGJvb2xlYW4gcGFyYW1ldGVyXCIpO3JldHVybiBkLmtlZXBJbnZhbGlkPWEsbH0sbC5kYXRlcGlja2VySW5wdXQ9ZnVuY3Rpb24oYSl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuZGF0ZXBpY2tlcklucHV0O2lmKFwic3RyaW5nXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJkYXRlcGlja2VySW5wdXQoKSBleHBlY3RzIGEgc3RyaW5nIHBhcmFtZXRlclwiKTtyZXR1cm4gZC5kYXRlcGlja2VySW5wdXQ9YSxsfSxsLnBhcnNlSW5wdXREYXRlPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLnBhcnNlSW5wdXREYXRlO1xyXG5pZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJwYXJzZUlucHV0RGF0ZSgpIHNob2x1ZCBiZSBhcyBmdW5jdGlvblwiKTtyZXR1cm4gZC5wYXJzZUlucHV0RGF0ZT1hLGx9LGwuZGlzYWJsZWRUaW1lSW50ZXJ2YWxzPWZ1bmN0aW9uKGIpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBkLmRpc2FibGVkVGltZUludGVydmFscz9hLmV4dGVuZCh7fSxkLmRpc2FibGVkVGltZUludGVydmFscyk6ZC5kaXNhYmxlZFRpbWVJbnRlcnZhbHM7aWYoIWIpcmV0dXJuIGQuZGlzYWJsZWRUaW1lSW50ZXJ2YWxzPSExLCQoKSxsO2lmKCEoYiBpbnN0YW5jZW9mIEFycmF5KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiZGlzYWJsZWRUaW1lSW50ZXJ2YWxzKCkgZXhwZWN0cyBhbiBhcnJheSBwYXJhbWV0ZXJcIik7cmV0dXJuIGQuZGlzYWJsZWRUaW1lSW50ZXJ2YWxzPWIsJCgpLGx9LGwuZGlzYWJsZWRIb3Vycz1mdW5jdGlvbihiKXtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZC5kaXNhYmxlZEhvdXJzP2EuZXh0ZW5kKHt9LGQuZGlzYWJsZWRIb3Vycyk6ZC5kaXNhYmxlZEhvdXJzO2lmKCFiKXJldHVybiBkLmRpc2FibGVkSG91cnM9ITEsJCgpLGw7aWYoIShiIGluc3RhbmNlb2YgQXJyYXkpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJkaXNhYmxlZEhvdXJzKCkgZXhwZWN0cyBhbiBhcnJheSBwYXJhbWV0ZXJcIik7aWYoZC5kaXNhYmxlZEhvdXJzPW5hKGIpLGQuZW5hYmxlZEhvdXJzPSExLGQudXNlQ3VycmVudCYmIWQua2VlcEludmFsaWQpe2Zvcih2YXIgYz0wOyFRKGUsXCJoXCIpOyl7aWYoZS5hZGQoMSxcImhcIiksMjQ9PT1jKXRocm93XCJUcmllZCAyNCB0aW1lcyB0byBmaW5kIGEgdmFsaWQgZGF0ZVwiO2MrK31fKGUpfXJldHVybiAkKCksbH0sbC5lbmFibGVkSG91cnM9ZnVuY3Rpb24oYil7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGQuZW5hYmxlZEhvdXJzP2EuZXh0ZW5kKHt9LGQuZW5hYmxlZEhvdXJzKTpkLmVuYWJsZWRIb3VycztpZighYilyZXR1cm4gZC5lbmFibGVkSG91cnM9ITEsJCgpLGw7aWYoIShiIGluc3RhbmNlb2YgQXJyYXkpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJlbmFibGVkSG91cnMoKSBleHBlY3RzIGFuIGFycmF5IHBhcmFtZXRlclwiKTtpZihkLmVuYWJsZWRIb3Vycz1uYShiKSxkLmRpc2FibGVkSG91cnM9ITEsZC51c2VDdXJyZW50JiYhZC5rZWVwSW52YWxpZCl7Zm9yKHZhciBjPTA7IVEoZSxcImhcIik7KXtpZihlLmFkZCgxLFwiaFwiKSwyND09PWMpdGhyb3dcIlRyaWVkIDI0IHRpbWVzIHRvIGZpbmQgYSB2YWxpZCBkYXRlXCI7YysrfV8oZSl9cmV0dXJuICQoKSxsfSxsLnZpZXdEYXRlPWZ1bmN0aW9uKGEpe2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBmLmNsb25lKCk7aWYoIWEpcmV0dXJuIGY9ZS5jbG9uZSgpLGw7aWYoIShcInN0cmluZ1wiPT10eXBlb2YgYXx8Yi5pc01vbWVudChhKXx8YSBpbnN0YW5jZW9mIERhdGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJ2aWV3RGF0ZSgpIHBhcmFtZXRlciBtdXN0IGJlIG9uZSBvZiBbc3RyaW5nLCBtb21lbnQgb3IgRGF0ZV1cIik7cmV0dXJuIGY9Z2EoYSksSigpLGx9LGMuaXMoXCJpbnB1dFwiKSlnPWM7ZWxzZSBpZihnPWMuZmluZChkLmRhdGVwaWNrZXJJbnB1dCksMD09PWcuc2l6ZSgpKWc9Yy5maW5kKFwiaW5wdXRcIik7ZWxzZSBpZighZy5pcyhcImlucHV0XCIpKXRocm93IG5ldyBFcnJvcignQ1NTIGNsYXNzIFwiJytkLmRhdGVwaWNrZXJJbnB1dCsnXCIgY2Fubm90IGJlIGFwcGxpZWQgdG8gbm9uIGlucHV0IGVsZW1lbnQnKTtpZihjLmhhc0NsYXNzKFwiaW5wdXQtZ3JvdXBcIikmJihuPTA9PT1jLmZpbmQoXCIuZGF0ZXBpY2tlcmJ1dHRvblwiKS5zaXplKCk/Yy5maW5kKFwiLmlucHV0LWdyb3VwLWFkZG9uXCIpOmMuZmluZChcIi5kYXRlcGlja2VyYnV0dG9uXCIpKSwhZC5pbmxpbmUmJiFnLmlzKFwiaW5wdXRcIikpdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGluaXRpYWxpemUgRGF0ZVRpbWVQaWNrZXIgd2l0aG91dCBhbiBpbnB1dCBlbGVtZW50XCIpO3JldHVybiBlPXgoKSxmPWUuY2xvbmUoKSxhLmV4dGVuZCghMCxkLEcoKSksbC5vcHRpb25zKGQpLG9hKCksa2EoKSxnLnByb3AoXCJkaXNhYmxlZFwiKSYmbC5kaXNhYmxlKCksZy5pcyhcImlucHV0XCIpJiYwIT09Zy52YWwoKS50cmltKCkubGVuZ3RoP18oZ2EoZy52YWwoKS50cmltKCkpKTpkLmRlZmF1bHREYXRlJiZ2b2lkIDA9PT1nLmF0dHIoXCJwbGFjZWhvbGRlclwiKSYmXyhkLmRlZmF1bHREYXRlKSxkLmlubGluZSYmZWEoKSxsfTthLmZuLmRhdGV0aW1lcGlja2VyPWZ1bmN0aW9uKGIpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZD1hKHRoaXMpO2QuZGF0YShcIkRhdGVUaW1lUGlja2VyXCIpfHwoYj1hLmV4dGVuZCghMCx7fSxhLmZuLmRhdGV0aW1lcGlja2VyLmRlZmF1bHRzLGIpLGQuZGF0YShcIkRhdGVUaW1lUGlja2VyXCIsYyhkLGIpKSl9KX0sYS5mbi5kYXRldGltZXBpY2tlci5kZWZhdWx0cz17dGltZVpvbmU6XCJFdGMvVVRDXCIsZm9ybWF0OiExLGRheVZpZXdIZWFkZXJGb3JtYXQ6XCJNTU1NIFlZWVlcIixleHRyYUZvcm1hdHM6ITEsc3RlcHBpbmc6MSxtaW5EYXRlOiExLG1heERhdGU6ITEsdXNlQ3VycmVudDohMCxjb2xsYXBzZTohMCxsb2NhbGU6Yi5sb2NhbGUoKSxkZWZhdWx0RGF0ZTohMSxkaXNhYmxlZERhdGVzOiExLGVuYWJsZWREYXRlczohMSxpY29uczp7dGltZTpcImdseXBoaWNvbiBnbHlwaGljb24tdGltZVwiLGRhdGU6XCJnbHlwaGljb24gZ2x5cGhpY29uLWNhbGVuZGFyXCIsdXA6XCJnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tdXBcIixkb3duOlwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLWRvd25cIixwcmV2aW91czpcImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1sZWZ0XCIsbmV4dDpcImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1yaWdodFwiLHRvZGF5OlwiZ2x5cGhpY29uIGdseXBoaWNvbi1zY3JlZW5zaG90XCIsY2xlYXI6XCJnbHlwaGljb24gZ2x5cGhpY29uLXRyYXNoXCIsY2xvc2U6XCJnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZVwifSx0b29sdGlwczp7dG9kYXk6XCJHbyB0byB0b2RheVwiLGNsZWFyOlwiQ2xlYXIgc2VsZWN0aW9uXCIsY2xvc2U6XCJDbG9zZSB0aGUgcGlja2VyXCIsc2VsZWN0TW9udGg6XCJTZWxlY3QgTW9udGhcIixwcmV2TW9udGg6XCJQcmV2aW91cyBNb250aFwiLG5leHRNb250aDpcIk5leHQgTW9udGhcIixzZWxlY3RZZWFyOlwiU2VsZWN0IFllYXJcIixwcmV2WWVhcjpcIlByZXZpb3VzIFllYXJcIixuZXh0WWVhcjpcIk5leHQgWWVhclwiLHNlbGVjdERlY2FkZTpcIlNlbGVjdCBEZWNhZGVcIixwcmV2RGVjYWRlOlwiUHJldmlvdXMgRGVjYWRlXCIsbmV4dERlY2FkZTpcIk5leHQgRGVjYWRlXCIscHJldkNlbnR1cnk6XCJQcmV2aW91cyBDZW50dXJ5XCIsbmV4dENlbnR1cnk6XCJOZXh0IENlbnR1cnlcIixwaWNrSG91cjpcIlBpY2sgSG91clwiLGluY3JlbWVudEhvdXI6XCJJbmNyZW1lbnQgSG91clwiLGRlY3JlbWVudEhvdXI6XCJEZWNyZW1lbnQgSG91clwiLHBpY2tNaW51dGU6XCJQaWNrIE1pbnV0ZVwiLGluY3JlbWVudE1pbnV0ZTpcIkluY3JlbWVudCBNaW51dGVcIixkZWNyZW1lbnRNaW51dGU6XCJEZWNyZW1lbnQgTWludXRlXCIscGlja1NlY29uZDpcIlBpY2sgU2Vjb25kXCIsaW5jcmVtZW50U2Vjb25kOlwiSW5jcmVtZW50IFNlY29uZFwiLGRlY3JlbWVudFNlY29uZDpcIkRlY3JlbWVudCBTZWNvbmRcIix0b2dnbGVQZXJpb2Q6XCJUb2dnbGUgUGVyaW9kXCIsc2VsZWN0VGltZTpcIlNlbGVjdCBUaW1lXCJ9LHVzZVN0cmljdDohMSxzaWRlQnlTaWRlOiExLGRheXNPZldlZWtEaXNhYmxlZDohMSxjYWxlbmRhcldlZWtzOiExLHZpZXdNb2RlOlwiZGF5c1wiLHRvb2xiYXJQbGFjZW1lbnQ6XCJkZWZhdWx0XCIsc2hvd1RvZGF5QnV0dG9uOiExLHNob3dDbGVhcjohMSxzaG93Q2xvc2U6ITEsd2lkZ2V0UG9zaXRpb25pbmc6e2hvcml6b250YWw6XCJhdXRvXCIsdmVydGljYWw6XCJhdXRvXCJ9LHdpZGdldFBhcmVudDpudWxsLGlnbm9yZVJlYWRvbmx5OiExLGtlZXBPcGVuOiExLGZvY3VzT25TaG93OiEwLGlubGluZTohMSxrZWVwSW52YWxpZDohMSxkYXRlcGlja2VySW5wdXQ6XCIuZGF0ZXBpY2tlcmlucHV0XCIsa2V5QmluZHM6e3VwOmZ1bmN0aW9uKGEpe2lmKGEpe3ZhciBiPXRoaXMuZGF0ZSgpfHx0aGlzLmdldE1vbWVudCgpO2EuZmluZChcIi5kYXRlcGlja2VyXCIpLmlzKFwiOnZpc2libGVcIik/dGhpcy5kYXRlKGIuY2xvbmUoKS5zdWJ0cmFjdCg3LFwiZFwiKSk6dGhpcy5kYXRlKGIuY2xvbmUoKS5hZGQodGhpcy5zdGVwcGluZygpLFwibVwiKSl9fSxkb3duOmZ1bmN0aW9uKGEpe2lmKCFhKXJldHVybiB2b2lkIHRoaXMuc2hvdygpO3ZhciBiPXRoaXMuZGF0ZSgpfHx0aGlzLmdldE1vbWVudCgpO2EuZmluZChcIi5kYXRlcGlja2VyXCIpLmlzKFwiOnZpc2libGVcIik/dGhpcy5kYXRlKGIuY2xvbmUoKS5hZGQoNyxcImRcIikpOnRoaXMuZGF0ZShiLmNsb25lKCkuc3VidHJhY3QodGhpcy5zdGVwcGluZygpLFwibVwiKSl9LFwiY29udHJvbCB1cFwiOmZ1bmN0aW9uKGEpe2lmKGEpe3ZhciBiPXRoaXMuZGF0ZSgpfHx0aGlzLmdldE1vbWVudCgpO2EuZmluZChcIi5kYXRlcGlja2VyXCIpLmlzKFwiOnZpc2libGVcIik/dGhpcy5kYXRlKGIuY2xvbmUoKS5zdWJ0cmFjdCgxLFwieVwiKSk6dGhpcy5kYXRlKGIuY2xvbmUoKS5hZGQoMSxcImhcIikpfX0sXCJjb250cm9sIGRvd25cIjpmdW5jdGlvbihhKXtpZihhKXt2YXIgYj10aGlzLmRhdGUoKXx8dGhpcy5nZXRNb21lbnQoKTthLmZpbmQoXCIuZGF0ZXBpY2tlclwiKS5pcyhcIjp2aXNpYmxlXCIpP3RoaXMuZGF0ZShiLmNsb25lKCkuYWRkKDEsXCJ5XCIpKTp0aGlzLmRhdGUoYi5jbG9uZSgpLnN1YnRyYWN0KDEsXCJoXCIpKX19LGxlZnQ6ZnVuY3Rpb24oYSl7aWYoYSl7dmFyIGI9dGhpcy5kYXRlKCl8fHRoaXMuZ2V0TW9tZW50KCk7YS5maW5kKFwiLmRhdGVwaWNrZXJcIikuaXMoXCI6dmlzaWJsZVwiKSYmdGhpcy5kYXRlKGIuY2xvbmUoKS5zdWJ0cmFjdCgxLFwiZFwiKSl9fSxyaWdodDpmdW5jdGlvbihhKXtpZihhKXt2YXIgYj10aGlzLmRhdGUoKXx8dGhpcy5nZXRNb21lbnQoKTthLmZpbmQoXCIuZGF0ZXBpY2tlclwiKS5pcyhcIjp2aXNpYmxlXCIpJiZ0aGlzLmRhdGUoYi5jbG9uZSgpLmFkZCgxLFwiZFwiKSl9fSxwYWdlVXA6ZnVuY3Rpb24oYSl7aWYoYSl7dmFyIGI9dGhpcy5kYXRlKCl8fHRoaXMuZ2V0TW9tZW50KCk7YS5maW5kKFwiLmRhdGVwaWNrZXJcIikuaXMoXCI6dmlzaWJsZVwiKSYmdGhpcy5kYXRlKGIuY2xvbmUoKS5zdWJ0cmFjdCgxLFwiTVwiKSl9fSxwYWdlRG93bjpmdW5jdGlvbihhKXtpZihhKXt2YXIgYj10aGlzLmRhdGUoKXx8dGhpcy5nZXRNb21lbnQoKTthLmZpbmQoXCIuZGF0ZXBpY2tlclwiKS5pcyhcIjp2aXNpYmxlXCIpJiZ0aGlzLmRhdGUoYi5jbG9uZSgpLmFkZCgxLFwiTVwiKSl9fSxlbnRlcjpmdW5jdGlvbigpe3RoaXMuaGlkZSgpfSxlc2NhcGU6ZnVuY3Rpb24oKXt0aGlzLmhpZGUoKX0sXCJjb250cm9sIHNwYWNlXCI6ZnVuY3Rpb24oYSl7YS5maW5kKFwiLnRpbWVwaWNrZXJcIikuaXMoXCI6dmlzaWJsZVwiKSYmYS5maW5kKCcuYnRuW2RhdGEtYWN0aW9uPVwidG9nZ2xlUGVyaW9kXCJdJykuY2xpY2soKX0sdDpmdW5jdGlvbigpe3RoaXMuZGF0ZSh0aGlzLmdldE1vbWVudCgpKX0sXCJkZWxldGVcIjpmdW5jdGlvbigpe3RoaXMuY2xlYXIoKX19LGRlYnVnOiExLGFsbG93SW5wdXRUb2dnbGU6ITEsZGlzYWJsZWRUaW1lSW50ZXJ2YWxzOiExLGRpc2FibGVkSG91cnM6ITEsZW5hYmxlZEhvdXJzOiExLHZpZXdEYXRlOiExfX0pOyIsIi8vaGVscGVyIGZ1bmN0aW9uIHRvIGdldCB0aGUgdXJsIHF1ZXJ5IHBhcmFtZXRlcnNcclxudmFyIHV0aWxpdHkgPSB7XHJcbiAgZ2V0VVJMUGFyYW06IGZ1bmN0aW9uKG5hbWUpe1xyXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csIFwiXFxcXCQmXCIpO1xyXG5cclxuICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbPyZdXCIgKyBuYW1lICsgXCIoPShbXiYjXSopfCZ8I3wkKVwiKTtcclxuICAgIHZhciByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xyXG5cclxuICAgIGlmICghcmVzdWx0cykgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAoIXJlc3VsdHNbMl0pIHJldHVybiAnJztcclxuXHJcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XHJcbiAgfSxcclxuICBnZXRUaW1lTWludXRlc0FycmF5OiAgZnVuY3Rpb24oKXtcclxuXHJcbiAgfVxyXG59XHJcbiIsInZhciBsaW5rcyA9IHtcclxuXHJcbiAgLy9sb2dpbiBqcyB1cmxzXHJcbiAgIGF1dGhlbnRpY2F0ZVVybCA6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9hdXRoZW5pdGNhdGVVc2VyXCIsXHJcbiAgIHN1Y2Nlc3NSZWRpcmVjdFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgcmVnaXN0ZXJEb2N0b3JVcmwgOiBcImluZGV4LnBocC9kb2N0b3IvZG9jdG9ySW5mb1wiLFxyXG4gICBhZG1pblVybDpcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9hZG1pblwiLFxyXG5cclxuICAgLy9hZG1pbiByZWxhdGVkXHJcbiAgIGRvY3Rvckxpc3RpbmdVcmw6IFwiaW5kZXgucGhwL2FkbWluRGFzaGJvYXJkL2RvY3Rvckxpc3RpbmdcIixcclxuXHJcbiAgIGxvZ291dFVybCA6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dvdXRcIixcclxuXHJcbiAgIC8vZG9jdG9yIGRhc2hib2FyZCBsaW5rcyBcclxuICAgZG9jdG9yUHJvZmlsZSA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9kb2N0b3JQcm9maWxlXCIsXHJcbiAgIGRhc2hib2FyZEhvbWVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIG5ld0FwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Jvb2tBcHBvaW50bWVudFwiLFxyXG4gICBwYXRpZW50c0VudHJ5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzRW50cnlcIixcclxuICAgcGF0aWVudHNMaXN0aW5nVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzTGlzdGluZ1wiLFxyXG4gICBjbG9zZUFwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Nsb3NlQXBwb2ludG1lbnRcIixcclxuICAgZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbGlzdEFwcG9pbnRtZW50XCIsXHJcbiAgIG5ld1NjaGVkdWxlVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL25ld1NjaGVkdWxlXCIsXHJcbiAgIGxpc3RTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zY2hlZHVsZUxpc3RcIixcclxuICAgZ2V0U2NoZWR1bGVDYWxlbmRhclVybDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1NjaGVkdWxlQ2FsZW5kZXJWaWV3XCIsXHJcbiAgIGFkZFN0YWZmVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmRW50cnlcIixcclxuICAgZG9jdG9yc1N0YWZmTGlzdGluZ1VyIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmTGlzdGluZ1wiLFxyXG4gICBwYXRpZW50c0hpc3RvcnlVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcGF0aWVudEhpc3RvcnlcIixcclxuICAgY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgcHJvZ3JhbW1lTGlzdGluZ3NVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBNYW5hZ2VMb2NhdGlvbnNVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvd29ya0xvY2F0aW9uTWFuYWdlbWVudFwiLFxyXG4gICBnZXRBbmFseXRpY3NVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvQW5hbHl0aWNzUmVwb3J0XCIsXHJcbiAgIGdldENhbGVuZGVyVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NhbGVuZGFyVGVtcGxhdGVcIixcclxuICAgYWNjb3VudGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9hY2NvdW50aW5nXCIsXHJcbiAgIG1lZGljaW5lU2VhcmNoVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL21lZGljaW5lU2VhcmNoXCIsXHJcblxyXG5cclxuICAgLy9zY2hlZHVsZVxyXG4gICBnZXRMb2NhdGlvblVybDogXCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiLFxyXG4gICBjcmVhdGVVcGRhdGVTY2hlZHVsZVVybDogXCJpbmRleC5waHAvc2NoZWR1bGUvY3JlYXRlVXBkYXRlU2NoZWR1bGVcIixcclxuXHJcbiAgIC8vcHJvZ3JhbW1lXHJcbiAgIHByb2dyYW1tZUxpc3RVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldE1lZGljYXRpb25Qcm9ncmFtbWVMaXN0XCIsXHJcbiAgIHByb2dyYW1tZUVkaXRVcmw6XCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIGNyZWF0ZU1vZGlmeVByb2dyYW1tZVVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lXCIsXHJcbiAgIGdldFByb2dyYW1tZVVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UHJvZ3JhbW1lc1wiLFxyXG5cclxuXHJcbiAgIC8vcGF0aWVudFxyXG4gICBwYXRpZW50RGV0YWlsUGVyc2lzdFVybDpcImluZGV4LnBocC9wYXRpZW50L2FkZFVwZGF0ZVBhdGllbnRcIixcclxuICAgcGF0aWVudHNEZXRhaWxzVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0UGF0aWVudERldGFpbHNcIixcclxuICAgbG9naW5DaGVja1VybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvaXNMb2dnZWRJblwiLFxyXG4gICBnZXRQcm9ncmFtbWVMaXN0OlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRNZWRpY2F0aW9uUHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBwcm9ncmFtbWVMaXN0RGV0YWlsc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UHJvZ3JhbW1lTGlzdERldGFpbHNcIixcclxuICAgcGF0aWVudHNQcm9ncmFtbWVzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQYXRpZW50UHJvZ3JhbW1lc1wiLFxyXG4gICBwYXRpZW50TGlzdGluZ1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnRMaXN0XCIsXHJcblxyXG4gICBzYXZlVXBkYXRlTG9jYXRpb25zOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9hZGRVcGRhdGVMb2NhdGlvblwiLFxyXG4gICBsb2NhdGlvbkxpc3RVcmw6XCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiLFxyXG4gICBkZWxpdmVyeU1ldGhvZHNVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXREZWxpdmVyeU1ldGhvZHNcIixcclxuXHJcblxyXG4gICAvL3JlZ2lzdGFydGlvblxyXG4gICBkb2N0b3JVcmw6XCJpbmRleC5waHAvZG9jdG9yL3NhdmVVcGRhdGVEb2N0b3JcIixcclxuICAgZG9jdG9yRGV0YWlsc1VybDpcImluZGV4LnBocC9kb2N0b3IvZ2V0RG9jdG9yRGV0YWlsc1wiLFxyXG4gICBsb2dpbkNoZWNrVXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9pc0xvZ2dlZEluXCIsXHJcbiAgIGRvY3RvckRhc2hVcmw6XCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBsb2dvdXRVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgY3JlYXRlTW9kaWZ5U3RhZmZVcmw6XCJpbmRleC5waHAvc3RhZmYvY3JlYXRlTW9kaWZ5U3RhZmZcIixcclxuICAgZ2V0U3RhZmZEZXRhaWxzVXJsOiBcImluZGV4LnBocC9zdGFmZi9nZXRTdGFmZkRldGFpbHNcIixcclxuICAgc3RhZmZMaXN0aW5nVXJsOiBcImluZGV4LnBocC9zdGFmZi9nZXREb2N0b3JzU3RhZmZMaXN0XCJcclxuXHJcbn1cclxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAvL2RlZmluaW5nIHRoZSBoZWxwZXIgZnVuY3Rpb25zIGluIGdsb2JhbFxyXG5cclxuICAgICQoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKCdEb2N0b3IgRGFzaGJvYXJkIGpzIGxvYWRlZCcpO1xyXG5cclxuICAgICAgICAgIC8vdG9wIGxldmVsIGNvbnRyb2xsZXJcclxuICAgICAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIC8vd2lyaW5nIHRoZSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgICB0aGlzLmxvZ291dFVybCA9IGxpbmtzLmxvZ291dFVybDtcclxuICAgICAgICAgIHRoaXMuZG9jdG9yUHJvZmlsZSA9IGxpbmtzLmRvY3RvclByb2ZpbGU7XHJcbiAgICAgICAgICB0aGlzLmRhc2hib2FyZEhvbWVVcmwgPSBsaW5rcy5kYXNoYm9hcmRIb21lVXJsO1xyXG4gICAgICAgICAgdGhpcy5uZXdBcHBvaW50bWVudFVybCA9IGxpbmtzLm5ld0FwcG9pbnRtZW50VXJsO1xyXG4gICAgICAgICAgdGhpcy5wYXRpZW50c0VudHJ5VXJsID0gbGlua3MucGF0aWVudHNFbnRyeVVybDtcclxuICAgICAgICAgIHRoaXMucGF0aWVudHNMaXN0aW5nVXJsID0gbGlua3MucGF0aWVudHNMaXN0aW5nVXJsO1xyXG4gICAgICAgICAgdGhpcy5jbG9zZUFwcG9pbnRtZW50VXJsID0gbGlua3MuY2xvc2VBcHBvaW50bWVudFVybDtcclxuICAgICAgICAgIHRoaXMuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwgPSBsaW5rcy5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybDtcclxuXHJcbiAgICAgICAgICB0aGlzLm5ld1NjaGVkdWxlVXJsID0gbGlua3MubmV3U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgICB0aGlzLmxpc3RTY2hlZHVsZVVybCA9IHRoaXMubGlzdFNjaGVkdWxlVXJsO1xyXG4gICAgICAgICAgdGhpcy5TY2hlZHVsZUNhbGVuZGFyVXJsID0gbGlua3MuZ2V0U2NoZWR1bGVDYWxlbmRhclVybDtcclxuICAgICAgICAgIHRoaXMuYWRkU3RhZmZVcmwgPSBsaW5rcy5hZGRTdGFmZlVybDtcclxuICAgICAgICAgIHRoaXMuZG9jdG9yc1N0YWZmTGlzdGluZ1VyID0gbGlua3MuZG9jdG9yc1N0YWZmTGlzdGluZ1VyO1xyXG5cclxuICAgICAgICAgIHRoaXMucGF0aWVudHNIaXN0b3J5VXJsID0gbGlua3MucGF0aWVudHNIaXN0b3J5VXJsO1xyXG5cclxuICAgICAgICAgIHRoaXMuY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgPSBsaW5rcy5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCA7XHJcbiAgICAgICAgICB0aGlzLnByb2dyYW1tZUxpc3RpbmdzVXJsID0gbGlua3MucHJvZ3JhbW1lTGlzdGluZ3NVcmw7XHJcblxyXG4gICAgICAgICAgdGhpcy5NYW5hZ2VMb2NhdGlvbnNVcmwgPSBsaW5rcy5NYW5hZ2VMb2NhdGlvbnNVcmw7XHJcbiAgICAgICAgICB0aGlzLkNhbGVuZGFyVGVtcGxhdGVVcmwgPSBsaW5rcy5nZXRDYWxlbmRlclVybDtcclxuXHJcbiAgICAgICAgICB0aGlzLmFuYWx5dGljc1JlcG9ydFVybCA9IGxpbmtzLmdldEFuYWx5dGljc1VybDtcclxuICAgICAgICAgIHRoaXMuYWNjb3VudGluZ1VybCA9IGxpbmtzLmFjY291bnRpbmdVcmw7XHJcbiAgICAgICAgICB0aGlzLm1lZGljaW5lU2VhcmNoVXJsID0gbGlua3MubWVkaWNpbmVTZWFyY2hVcmw7XHJcbiAgICAgICAgICAvL2RvIHNvbWV0aG5nIGFib3V0IGRvY3RvcnMgaW5mbyBhbmQgcmVnaXN0cmF0aW9uXHJcblxyXG4gICAgICAgICAgLy9UaGUgdXJsIGZyb20gdGhlIGJyb3dzZXIgIGNhbiBiZSBjb21wYXJlZCB0byBzZXQgdGhlIGFjdGl2ZSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgICBuYXZWaWV3LmluaXQoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgdmFyIG5hdlZpZXcgPSB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAvL3dpcmluZyB0aGUgbmF2aWdhdGlvbiBjbGlja3NcclxuXHJcblxyXG4gICAgICAgICAgJChcIiNwbXMtYnJhbmQtYnRuLWxpbmtcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQTVMgYnJhbmQgY2xpY2snKTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICQoXCIjYnRuLXByb2dyYW1tZS1zZWN0aW9uLWxpbmtcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoXCIjY3JlYXRlLXByb2dyYW0tZm9yLXBhdGllbnQtc2VjdGlvblwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjcmVhdGUgcHJvZ3JhbSBmb3IgcGF0aWVudCcpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIiNidG4tbWFuYWdlLWxvY2F0aW9uc1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtYW5hZ2UgbG9jYXRpb25zJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5NYW5hZ2VMb2NhdGlvbnNVcmw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKFwiI2J0bi1saXN0LXByb2dyYW0tc2VjdGlvblwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLnByb2dyYW1tZUxpc3RpbmdzVXJsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJChcIiNwYXRpZW50cy1lbnRyeS1jcmVhdGUtc2VjdGlvbi1saW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhdGllbnRzIEVudHJ5Y2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucGF0aWVudHNFbnRyeVVybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNwYXRpZW50cy1lbnRyeS1saXN0LXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhdGllbnRzIGxpc3RpbmcgY2xpY2snKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLnBhdGllbnRzTGlzdGluZ1VybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjdXNlci1Qcm9maWxlLUJ0bi1MaW5rXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXNlciBwcm9maWxlIGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmRvY3RvclByb2ZpbGU7XHJcblxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNkb2N0b3ItZGFzaC1sb2dvdXQtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2dvdXQgY2xpY2snKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmxvZ291dFVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjZGFzaGJvYXJkLVNlY3Rpb24tQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZGFzaGJvYXJkSG9tZVVybDtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGFzaGJvYXJkIGNsaWNrJyk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI2Jvb2stQXBwb2ludG1lbnRzLVNlY3Rpb24tQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubmV3QXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI2Nsb3NlLUJvb2stQXBwb2ludG1lbnQtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5jbG9zZUFwcG9pbnRtZW50VXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiN2aWV3LUFwcG9pbnRtZW50LVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmw7XHJcbiAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgLy8kKFwiI21hbmFnZS1Eb2N0b3JzLVNjaGVkdWxlLVNlY3Rpb24tTGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIubGlzdFNjaGVkdWxlVXJsKTtcclxuXHJcblxyXG4gICAgICAgICAgJChcIiNtYW5hZ2UtRG9jdG9ycy1TY2hlZHVsZS1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2NoZWR1bGUgbWFuYWdlIGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLlNjaGVkdWxlQ2FsZW5kYXJVcmw7XHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjbWFuYWdlLXNjaGVkdWxlLWNyZWF0ZS1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbmV3IHNjaGVkdWxlIGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLm5ld1NjaGVkdWxlVXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vICAkKFwiI21hbmFnZS1zY2hlZHVsZS1saXN0LXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgLy9lLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnc2NoZWR1bGUgbGlzdCBjbGljaycpO1xyXG4gICAgICAgICAgICAvLyAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmxpc3RTY2hlZHVsZVVybDtcclxuICAgICAgICAgIC8vfSk7XHJcblxyXG5cclxuICAgICAgICAgICAkKFwiI2FkZC1TdGFmZi1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5hZGRTdGFmZlVybDtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgJChcIiNidG4tc3RhZmYtbGlzdGluZ1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kb2N0b3JzU3RhZmZMaXN0aW5nVXI7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiI2NhbGVuZGFyLVRlbXBsYXRlLUJ0bi1MaW5rXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLkNhbGVuZGFyVGVtcGxhdGVVcmw7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVsbG8gaGlkXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgJChcIiNwYXRpZW50cy1IaXN0b3J5LVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLnBhdGllbnRzSGlzdG9yeVVybDtcclxuICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAkKFwiI21hbmFnZS1zY2hlZHVsZS1saXN0LXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLlNjaGVkdWxlQ2FsZW5kYXJVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgJChcIiNhcHBvaW50bWVudC1zZWN0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQoXCIjcGF0aWVudHMtRW50cnktU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICQoXCIjc3RhZmYtbWFuYWdtZW50LXNlY3Rpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICQoXCIjb3RoZXItc2V0dGluZ3Mtc2VjdGlvbi1saW5rLWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgJChcIiNjYWxlbmRhci10ZW1wbGF0ZS1zZWN0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAkKFwiI2FuYWx5dGljcy1zaWRlLW5hdmlnYXRpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmFuYWx5dGljc1JlcG9ydFVybDtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgJChcIiNhY2NvdW50aW5nLXNpZGUtbmF2aWdhdGlvbi1saW5rLWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuYWNjb3VudGluZ1VybDtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgJChcIiNtZWRpY2luZS1zaWRlLW5hdmlnYXRpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLm1lZGljaW5lU2VhcmNoVXJsO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIC8vaGlnaGxpZ2h0IHRoZSByaWdodCBuYXZpZ2F0aW9uXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gIH0oKSk7XHJcblxyXG59KTtcclxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIC8vaHR0cDovL21vbWVudGpzLmNvbS8gZ29vZCBoZWxwIGZvciBkYXRlIGZvcm1hdHRpbmcgYW5kIHN0dWZmXHJcblxyXG5cclxuICAgICAgICB2YXIgc2NoZWR1bGVNb2RlbCA9IHtcclxuICAgICAgICAgIHN0YXJ0RGF0ZTogXCJcIixcclxuICAgICAgICAgIGVuZERhdGU6IFwiXCIsXHJcbiAgICAgICAgICBzY2hlZHVsZURheXNDb3VudDogMCxcclxuICAgICAgICAgIHdvcmtMb2NhdGlvbnM6IFtdLFxyXG4gICAgICAgICAgc2VsZWN0ZWRMb2NhdGlvbjp7aWQ6MCwgbmFtZTpcIlwifSxcclxuICAgICAgICAgIHNjaGVkdWxlTGlzdDpbXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0ge1xyXG4gICAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVVcGRhdGVTY2hlZHVsZVVybCA9IGxpbmtzLmNyZWF0ZVVwZGF0ZVNjaGVkdWxlVXJsO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlTGlzdGluZ1VybCA9ICAgbGlua3MubGlzdFNjaGVkdWxlVXJsO1xyXG4gICAgICAgICAgICB0aGlzLmdldExvY2F0aW9uVXJsID0gbGlua3MuZ2V0TG9jYXRpb25Vcmw7XHJcbiAgICAgICAgICAgIHN0ZXBPbmVWaWV3LmluaXQoKTtcclxuICAgICAgICAgICAgY3JlYXRlU2NoZWR1bGVWaWV3LmluaXQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vZ2V0dGluZyB3b3JrIGxvY2F0aW9ucyBmb3IgdGhlIGRvY3RvclxyXG4gICAgICAgICAgICAkLmdldCggY29udHJvbGxlci5nZXRMb2NhdGlvblVybCAsIHt9KVxyXG4gICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdyZXNwb25zZSAnICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuICAgICAgICAgICAgICAgc2NoZWR1bGVNb2RlbC53b3JrTG9jYXRpb25zID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgICAgc3RlcE9uZVZpZXcucmVuZGVyKCk7XHJcbiAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdXBkYXRlU2VsZWN0ZWRMb2NhdGlvbjogZnVuY3Rpb24oaWQsIG5hbWUpe1xyXG4gICAgICAgICAgICBzY2hlZHVsZU1vZGVsLnNlbGVjdGVkTG9jYXRpb24uaWQgPSBpZDtcclxuICAgICAgICAgICAgc2NoZWR1bGVNb2RlbC5zZWxlY3RlZExvY2F0aW9uLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoc2NoZWR1bGVNb2RlbC5zZWxlY3RlZExvY2F0aW9uKSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ2V0TG9jYXRpb25Nb2RlbDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlTW9kZWwuc2VsZWN0ZWRMb2NhdGlvbjtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBnZXRMb2NhdGlvbkxpc3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlTW9kZWwud29ya0xvY2F0aW9ucztcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBnZW5lcmF0ZU1vZGVsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgZnJvbURhdGVTdHIgPSBzdGVwT25lVmlldy5mcm9tRGF0ZUNvbnRyb2wudmFsKCk7IC8vMjAxNi0wNS0xOVxyXG4gICAgICAgICAgICB2YXIgdG9EYXRlU3RyID0gc3RlcE9uZVZpZXcudG9EYXRlQ29udHJvbC52YWwoKTsgLy8yMDE2LTA1LTE5XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhcnRUaW1lVmFsID0gc3RlcE9uZVZpZXcuZnJvbVRpbWVDb250cm9sLnZhbCgpO1xyXG4gICAgICAgICAgICB2YXIgZW5kVGltZVZhbCA9ICBzdGVwT25lVmlldy50b1RpbWVDb250cm9sLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgLy9kYXRlIHZhbGlkYXRpb25zLCBjYW5ub3QgcHV0IHByZXZpb291cyBkYXRlc1xyXG4gICAgICAgICAgICAvL2Nhbm5vdCBkYXRlcyBpbiByZXZyZXNlIG9yZGVyXHJcbiAgICAgICAgICAgIC8vY2Fubm90IG1ha2Ugc2NoZWR1bGUgZm9yIG1vcmUgdGhhbiA2MCBkYXlzXHJcblxyXG4gICAgICAgICAgICB2YXIgbWZyb21EYXRlID0gbW9tZW50KGZyb21EYXRlU3RyLCBcIllZWVktTU0tRERcIik7XHJcbiAgICAgICAgICAgIHZhciBtdG9EYXRlID0gbW9tZW50KHRvRGF0ZVN0ciwgXCJZWVlZLU1NLUREXCIpO1xyXG5cclxuICAgICAgICAgICAgLy9zZXR0aW5nIHRoZSBtb2RlbHMgc3RhcnQgYW5kIGVuZCBkYXRlXHJcbiAgICAgICAgICAgIHNjaGVkdWxlTW9kZWwuc3RhcnREYXRlID0gbWZyb21EYXRlLmZvcm1hdCgnREQtTU0tWVlZWScpO1xyXG4gICAgICAgICAgICBzY2hlZHVsZU1vZGVsLmVuZERhdGUgPSBtdG9EYXRlLmZvcm1hdCgnREQtTU0tWVlZWScpO1xyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnZGF0ZSByYW5nZSBmcm9tICcgKyAgbWZyb21EYXRlLmZvcm1hdCgnREQtTU0tWVlZWScpICsgJyB0byAnICsgbXRvRGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVknKSk7XHJcblxyXG4gICAgICAgICAgICAvL2dldHRpbmcgdGhlIGRpZmZlcmVuY2UgaXMgZGF0ZXMgaW4gdGVybXMgb2YgZGF0ZXNcclxuICAgICAgICAgICAgdmFyIGRheXNEdXJhdGlvbiA9ICBtb21lbnQuZHVyYXRpb24obXRvRGF0ZS5kaWZmKG1mcm9tRGF0ZSkpLmFzRGF5cygpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdkdXJhdGlvbiAnICsgZGF5c0R1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIHNjaGVkdWxlTW9kZWwuc2NoZWR1bGVEYXlzQ291bnQgPSBkYXlzRHVyYXRpb247XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdkdXJhdGlvbiA6JyArIGRheXNEdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICB2YXIgd2Vla0FycmF5ID0gW107XHJcbiAgICAgICAgICAgIGlmKHN0ZXBPbmVWaWV3LmNoa01vbi5wcm9wKCdjaGVja2VkJykpe1xyXG4gICAgICAgICAgICAgIHdlZWtBcnJheS5wdXNoKCdNb24nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoc3RlcE9uZVZpZXcuY2hrVHVlLnByb3AoJ2NoZWNrZWQnKSl7XHJcbiAgICAgICAgICAgICAgd2Vla0FycmF5LnB1c2goJ1R1ZScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihzdGVwT25lVmlldy5jaGtXZWQucHJvcCgnY2hlY2tlZCcpKXtcclxuICAgICAgICAgICAgICB3ZWVrQXJyYXkucHVzaCgnV2VkJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHN0ZXBPbmVWaWV3LmNoa1RodS5wcm9wKCdjaGVja2VkJykpe1xyXG4gICAgICAgICAgICAgIHdlZWtBcnJheS5wdXNoKCdUaHUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoc3RlcE9uZVZpZXcuY2hrRnJpLnByb3AoJ2NoZWNrZWQnKSl7XHJcbiAgICAgICAgICAgICAgd2Vla0FycmF5LnB1c2goJ0ZyaScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihzdGVwT25lVmlldy5jaGtTYXQucHJvcCgnY2hlY2tlZCcpKXtcclxuICAgICAgICAgICAgICB3ZWVrQXJyYXkucHVzaCgnU2F0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHN0ZXBPbmVWaWV3LmNoa1N1bi5wcm9wKCdjaGVja2VkJykpe1xyXG4gICAgICAgICAgICAgIHdlZWtBcnJheS5wdXNoKCdTdW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3dlZWsgYXJyYXkgJyArIHdlZWtBcnJheSk7XHJcblxyXG4gICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDw9IGRheXNEdXJhdGlvbjsgaisrKXtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHNjaGVkdWxlID0ge1xyXG4gICAgICAgICAgICAgICAgZGF0ZTogbWZyb21EYXRlLmZvcm1hdCgnREQtTU0tWVlZWScpLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lOnN0YXJ0VGltZVZhbCxcclxuICAgICAgICAgICAgICAgIGVuZFRpbWU6IGVuZFRpbWVWYWwsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICBzY2hlZHVsZU1vZGVsLnNjaGVkdWxlTGlzdC5wdXNoKHNjaGVkdWxlKTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHdlZWtEYXkgPSBtZnJvbURhdGUuZm9ybWF0KCdkZGQnKTtcclxuXHJcbiAgICAgICAgICAgICAgaWYod2Vla0FycmF5LmluZGV4T2Yod2Vla0RheSkgID49IDAgKXtcclxuICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG1mcm9tRGF0ZS5hZGQoMSwgJ2RheXMnKVxyXG5cclxuICAgICAgICAgICAgfTsgLy9kYXRlIGxvb3BcclxuXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIGdldFNjaGVkdWxlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiBzY2hlZHVsZU1vZGVsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2F2ZVVwZGF0ZU1vZGVsUmVkaXJlY3Q6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgJC5wb3N0KCBjb250cm9sbGVyLmNyZWF0ZVVwZGF0ZVNjaGVkdWxlVXJsICwgc2NoZWR1bGVNb2RlbClcclxuICAgICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzcG9uc2UgJyArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XHJcblxyXG4gICAgICAgICAgICAgLy9vbiBzdWNjZXNzIHJlZGlyZWN0XHJcbiAgICAgICAgICAgICAvLyB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuc2NoZWR1bGVMaXN0aW5nVXJsO1xyXG4gICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgIGlmKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09IFwiLTFcIil7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3VsZCBub3QgYWRkIG9yIHVwZGF0ZScpO1xyXG4gICAgICAgICAgICAgfWVsc2UgaWYocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT0gXCIxXCIpe1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2NoZWR1bGVzIGVudHJ5IGlzIGFkZGVkJyk7XHJcbiAgICAgICAgICAgICB9ZWxzZSBpZihyZXNwb25zZS5kYXRhLnN0YXR1cyA9PSBcIjJcIil7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzY2hlZHVsZXMgZW50cnkgaXMgdXBkYXRlZCcpO1xyXG4gICAgICAgICAgICAgfSovXHJcblxyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIHN0ZXBPbmVWaWV3ID0ge1xyXG5cclxuICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwgPSAkKCcjc2NoZWR1bGUtc3RlcC1vbmUnKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RMb2NhdGlvbnMgPSAkKCcjc2VsLXdvcmstbG9jYXRpb25zJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZnJvbURhdGVDb250cm9sID0gJCgnI2Zyb20tZGF0ZScpO1xyXG4gICAgICAgICAgICB0aGlzLnRvRGF0ZUNvbnRyb2wgPSAkKCcjdG8tZGF0ZScpO1xyXG4gICAgICAgICAgICB0aGlzLmZyb21UaW1lQ29udHJvbCA9ICQoJyNmcm9tLXRpbWUnKTtcclxuICAgICAgICAgICAgdGhpcy50b1RpbWVDb250cm9sID0gJCgnI3RvLXRpbWUnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZnJvbVRpbWVDb250cm9sLnZhbChcIjA5OjAwOkFNXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmZyb21UaW1lQ29udHJvbC5kYXRldGltZXBpY2tlcih7XHJcbiAgICAgICAgICAgICAgaW5saW5lOiBmYWxzZSxcclxuICAgICAgICAgICAgICBmb3JtYXQ6J0xUJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudG9UaW1lQ29udHJvbC52YWwoXCIxMjowMDpQTVwiKTtcclxuICAgICAgICAgICAgdGhpcy50b1RpbWVDb250cm9sLmRhdGV0aW1lcGlja2VyKHtcclxuICAgICAgICAgICAgICBpbmxpbmU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGZvcm1hdDonTFQnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL2h0dHA6Ly9ib290c3RyYXAtZGF0ZXBpY2tlci5yZWFkdGhlZG9jcy5pby9lbi9sYXRlc3QvXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQWxsV2Vla0RheXMgPSAkKCcjY2hrLWFsbC13ZWVrZGF5cycpO1xyXG4gICAgICAgICAgICB0aGlzLmNoa01vbiA9ICQoJyNjaGstbW9uJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hrVHVlID0gJCgnI2Noay10dWUnKTtcclxuICAgICAgICAgICAgdGhpcy5jaGtXZWQgPSAkKCcjY2hrLXdlZCcpO1xyXG4gICAgICAgICAgICB0aGlzLmNoa1RodSA9ICQoJyNjaGstdGh1Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hrRnJpID0gJCgnI2Noay1mcmknKTtcclxuICAgICAgICAgICAgdGhpcy5jaGtTYXQgPSAkKCcjY2hrLXNhdCcpO1xyXG4gICAgICAgICAgICB0aGlzLmNoa1N1biA9ICQoJyNjaGstc3VuJyk7XHJcblxyXG4gICAgICAgICAgICAvL3NldHRpbmcgYWxsIGNoZWNrIGJveGVzIGFzIGNoZWNrZWRcclxuICAgICAgICAgICAgdGhpcy5jaGtNb24ucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNoa1R1ZS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hrV2VkLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5jaGtUaHUucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNoa0ZyaS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hrU2F0LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5jaGtTdW4ucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy9UT0RPIHRlc3RpbmcgY29kZSB0byBiZSByZW1vdmVkXHJcbiAgICAgICAgICAgIHZhciBjdXJyRGF0ZSA9IG1vbWVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLmZyb21EYXRlQ29udHJvbC52YWwoY3VyckRhdGUuZm9ybWF0KCdZWVlZLU1NLUREJykpO1xyXG4gICAgICAgICAgICBjdXJyRGF0ZS5hZGQoMTUsICdkYXlzJylcclxuICAgICAgICAgICAgdGhpcy50b0RhdGVDb250cm9sLnZhbChjdXJyRGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSk7XHJcblxyXG4gICAgICAgICAgICAkKCcjYnRuLXNjaGVkdWxlLW5leHQnKS5vbignY2xpY2snLCAoZnVuY3Rpb24oc2VsZil7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2NoZWR1bGUgbmV4dCBuY2xpY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3VwZGF0aW5nIGxvY2F0aW9uIHRleHQgaW4gdGhlIHNlY29uZCBzdGVwXHJcbiAgICAgICAgICAgICAgICB2YXIgbG9jYXRpb25JZCA9IHNlbGYuc2VsZWN0TG9jYXRpb25zLmZpbmQoXCI6c2VsZWN0ZWRcIikuYXR0cigndmFsdWUnKTtcclxuICAgICAgICAgICAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBzZWxmLnNlbGVjdExvY2F0aW9ucy5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIudXBkYXRlU2VsZWN0ZWRMb2NhdGlvbihsb2NhdGlvbklkLCBsb2NhdGlvbk5hbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuZ2VuZXJhdGVNb2RlbCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wYW5lbC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVTY2hlZHVsZVZpZXcucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tBbGxXZWVrRGF5cy5jaGFuZ2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuY2hlY2tlZCk7XHJcbiAgICAgICAgICAgICAgaWYodGhpcy5jaGVja2VkKXtcclxuICAgICAgICAgICAgICAgIHN0ZXBPbmVWaWV3LmNoa01vbi5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzdGVwT25lVmlldy5jaGtUdWUucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgc3RlcE9uZVZpZXcuY2hrV2VkLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHN0ZXBPbmVWaWV3LmNoa1RodS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzdGVwT25lVmlldy5jaGtGcmkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgc3RlcE9uZVZpZXcuY2hrU2F0LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHN0ZXBPbmVWaWV3LmNoa1N1bi5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBzdGVwT25lVmlldy5jaGtNb24ucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHN0ZXBPbmVWaWV3LmNoa1R1ZS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgc3RlcE9uZVZpZXcuY2hrV2VkLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBzdGVwT25lVmlldy5jaGtUaHUucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHN0ZXBPbmVWaWV3LmNoa0ZyaS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgc3RlcE9uZVZpZXcuY2hrU2F0LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBzdGVwT25lVmlldy5jaGtTdW4ucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgdmFyIGxvY2F0aW9ucyA9IGNvbnRyb2xsZXIuZ2V0TG9jYXRpb25MaXN0KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbG9jYXRpb25zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gJCgnPG9wdGlvbi8+Jyx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBsb2NhdGlvbnNbaV0uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGxvY2F0aW9uc1tpXS5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgdGhpcy5zZWxlY3RMb2NhdGlvbnMuYXBwZW5kKG9wdGlvbik7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBjcmVhdGVTY2hlZHVsZVZpZXcgPSB7XHJcbiAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsID0gJCgnI3NjaGVkdWxlLXN0ZXAtdHdvJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb25OYW1lID0gJCgnI2NhbGVuZGFyLWxvY2F0aW9uLW5hbWUnKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRlSGVhZGVyID0gJCgnI2NhbGFuZGVyLWRhdGUnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGFibGVCb2R5ID0gJCgnI3RhYmxlLWJvZHktc2NoZWR1bGUtY2FsYW5kZXInKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGFibGVEYXRhVGVtcGxhdGUgPSAkKCcjdGFibGUtZGF0YS10ZW1wbGF0ZScpO1xyXG5cclxuICAgICAgICAgICAgJCgnI2J0bi1zY2hlZHVsZS1jcmVhdGUnKS5vbignY2xpY2snLCAoZnVuY3Rpb24oc2VsZil7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2NoZWR1bGUgY3JlYXRlIGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLnNhdmVVcGRhdGVNb2RlbFJlZGlyZWN0KCk7XHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSkodGhpcykpO1xyXG5cclxuXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbWFrZVRpbWVQaWNrZXJzUm93OiBmdW5jdGlvbihpZFZhbCwgZnJvbUlucHV0LCB0b0lucHV0KXtcclxuXHJcbiAgICAgICAgICAgIHZhciB0ciA9ICAkKCc8dHIvPicse2NsYXNzOiAnY29sbGFwc2UgY29sbGFwc2Utc3R5bGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaWRWYWx9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ci8+Jyx7Y29sc3BhbjogXCI3XCJ9KTtcclxuICAgICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gJCgnPGZvcm0vPicse2NsYXNzOiBcImZvcm0taW5saW5lXCJ9KTtcclxuICAgICAgICAgICAgdGQuYXBwZW5kKGZvcm0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRpdiA9ICQoJzxkaXYvPicse2NsYXNzOiBcImZvcm0tZ3JvdXBcIn0pO1xyXG4gICAgICAgICAgICBmb3JtLmFwcGVuZChkaXYpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZyb21MYWJlbCA9ICQoJzxsYWJlbC8+Jyx7Y2xhc3M6IFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFwiLCB0ZXh0OiAnRnJvbSd9KTtcclxuICAgICAgICAgICAgZGl2LmFwcGVuZChmcm9tTGFiZWwpO1xyXG4gICAgICAgICAgICBkaXYuYXBwZW5kKGZyb21JbnB1dCk7XHJcblxyXG5cclxuICAgICAgICAgICAgZGl2ID0gJCgnPGRpdi8+Jyx7Y2xhc3M6IFwiZm9ybS1ncm91cFwifSk7XHJcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kKGRpdik7XHJcbiAgICAgICAgICAgIHZhciB0b0xhYmVsID0gJCgnPGxhYmVsLz4nLHtjbGFzczogXCJjb2wtc20tMiBjb250cm9sLWxhYmVsXCIsIHRleHQ6ICdUbyd9KTtcclxuICAgICAgICAgICAgZGl2LmFwcGVuZCh0b0xhYmVsKTtcclxuICAgICAgICAgICAgZGl2LmFwcGVuZCh0b0lucHV0KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cjtcclxuXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIDx0ciAgY2xhc3M9XCJjb2xsYXBzZSBjb2xsYXBzZS1zdHlsZVwiICBpZD1cImNvbGxhcHNlRXhhbXBsZTFcIj5cclxuICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjdcIiA+XHJcbiAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzcz1cImZvcm0taW5saW5lXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJkYXRldGltZXBpY2tlcjVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvbnQtMThcIj5Gcm9tPC9sYWJlbD48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGxhYmVsICBjbGFzcz1cImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcIj5UbzwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiICBpZD1cImRhdGV0aW1lcGlja2VyNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgPC9mb3JtPlxyXG5cclxuICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcjZGF0ZXRpbWVwaWNrZXI1JykuZGF0ZXRpbWVwaWNrZXIoe1xyXG4gICAgICAgICAgICAgIGlubGluZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgZm9ybWF0OidMVCdcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcjZGF0ZXRpbWVwaWNrZXI2JykuZGF0ZXRpbWVwaWNrZXIoe1xyXG4gICAgICAgICAgICAgIGlubGluZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgZm9ybWF0OidMVCdcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL2NvbGxhcHNlZC10aW1lLXBpY2tlcnNcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNjaGVkdWxlID0gY29udHJvbGxlci5nZXRTY2hlZHVsZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVuZGVyIGNhbGVuZGFyJyArIEpTT04uc3RyaW5naWZ5KHNjaGVkdWxlLnNjaGVkdWxlTGlzdCkpO1xyXG5cclxuICAgICAgICAgICAgLy9zZXR0aW5nIHRoZSBsb2NhdGlvbiB0ZXh0XHJcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IHNjaGVkdWxlLnNlbGVjdGVkTG9jYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb25OYW1lLnRleHQobG9jYXRpb24ubmFtZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWZyb21EYXRlID0gbW9tZW50KHNjaGVkdWxlLnN0YXJ0RGF0ZSwgXCJERC1NTS1ZWVlZXCIpO1xyXG4gICAgICAgICAgICB2YXIgbXRvRGF0ZSA9IG1vbWVudChzY2hlZHVsZS5lbmREYXRlLCBcIkRELU1NLVlZWVlcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRhdGVIZWFkZXIudGV4dChtZnJvbURhdGUuZm9ybWF0KCdEbyBNTU0gWVlZWScpICsgJyB0byAnICArIG10b0RhdGUuZm9ybWF0KCdEbyBNTU0gWVlZWScpKTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgaW5kZXhDb3VudGVyID0gMDtcclxuXHJcblxyXG4gICAgICAgICAgICAvL3doZW4gZmlyc3QgZGF5IGlzIG5vdCBtb25kYXksIHNldHRpbmcgdGhlIGZpcnN0IHJvd1xyXG4gICAgICAgICAgICB2YXIgc3RhcnREYXkgPSBtZnJvbURhdGUuZm9ybWF0KCdkZGQnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHN0YXJ0RGF5ICE9ICdNb24nKXtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIGJsb2Nrc1RvQWRkID0gbWZyb21EYXRlLmRheSgpIC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIGNhbGFuZGVyU3RhcnREYXRlID0gbW9tZW50KG1mcm9tRGF0ZSkuc3VidHJhY3QoYmxvY2tzVG9BZGQsICdkYXlzJyk7XHJcblxyXG4gICAgICAgICAgICAgIHZhciB0ciA9ICQoJzx0ci8+Jyx7Y2xhc3M6ICd0ZXh0LWNlbnRlcid9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgYmxvY2tzVG9BZGQgOyBpKyspe1xyXG5cclxuICAgICAgICAgICAgICAgICAgdmFyIHNwYW4gPSAgJCgnPHNwYW4vPicse2NsYXNzOiAncHVsbC1yaWdodCBmb250LTE2IGNhbGVuZGFyLWRhdGUnLCB0ZXh0OmNhbGFuZGVyU3RhcnREYXRlLmZvcm1hdCgnRG8nKX0pO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgc3BhbjEgPSAgJCgnPHNwYW4vPicse2NsYXNzOiAnbGFiZWwgZm9udC0xNiBsYWJlbC1pbmZvJywgdGV4dDonTm8gU2NoZWR1bGUnfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICB2YXIgdGQgPSAkKCc8dGQvPicpLmFwcGVuZChzcGFuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8YnI+PGJyPicpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChzcGFuMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgY2FsYW5kZXJTdGFydERhdGUuYWRkKDEsICdkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICB2YXIgcmVtYWluaW5nQ291a21uQ291bnQgPSA3IC0gYmxvY2tzVG9BZGQ7XHJcblxyXG4gICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCByZW1haW5pbmdDb3VrbW5Db3VudCA7IGkrKyl7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNjaGVkdWxlSXRlbSA9IHNjaGVkdWxlLnNjaGVkdWxlTGlzdFtpbmRleENvdW50ZXJdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbW9tZW50KHNjaGVkdWxlSXRlbS5kYXRlLCBcIkRELU1NLVlZWVlcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNwYW4gPSAgJCgnPHNwYW4vPicse2NsYXNzOiAncHVsbC1yaWdodCBmb250LTE2IGNhbGVuZGFyLWRhdGUnLCB0ZXh0OmRhdGUuZm9ybWF0KCdEbycpfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKS5hcHBlbmQoc3BhbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzxicj48YnI+JykpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpc0FjdGl2ZSA9IHNjaGVkdWxlSXRlbS5hY3RpdmU7XHJcbiAgICAgICAgICAgICAgICBpZihpc0FjdGl2ZSl7XHJcbiAgICAgICAgICAgICAgICAgIHZhciB0aW1lID0gc2NoZWR1bGVJdGVtLnN0YXJ0VGltZSArICcgdG8gJyArIHNjaGVkdWxlSXRlbS5lbmRUaW1lO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgc3BhbjEgPSAgJCgnPHNwYW4vPicse2NsYXNzOiAnbGFiZWwgZm9udC0xNiBsYWJlbC1kYW5nZXInLCB0ZXh0OnRpbWV9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIHNwYW4xLm9uKCdjbGljaycsIChmdW5jdGlvbihwYXNzZWRPbil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3BhbiBjbGljaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy8kKCcjY29sbGFwc2VFeGFtcGxlMScpLmNvbGxhcHNlKCd0b2dnbGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAvL2FkZGluZyB0aW1lcGlja2VyIGR5bmFtaWNhbGx5XHJcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgZnJvbUlucHV0ID0gJCgnPGlucHV0Lz4nLHt0eXBlOiBcInRleHRcIiwgY2xhc3M6ICdmb3JtLWNvbnRyb2wnLCB2YWx1ZTpwYXNzZWRPbi5zdGFydFRpbWV9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIHZhciB0b0lucHV0ID0gJCgnPGlucHV0Lz4nLHt0eXBlOiBcInRleHRcIiwgY2xhc3M6ICdmb3JtLWNvbnRyb2wnLCB2YWx1ZTpwYXNzZWRPbi5lbmRUaW1lfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSAnY29sbGFwc2VkLXRpbWUtcGlja2Vycyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgdHIgPSAkKCcjY29sbGFwc2VkLXRpbWUtcGlja2VycycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdHIucmVtb3ZlKCk7ICAvL3JlbW92ZSB0aGUgcHJldmlvdXNseSBhZGRlZCB0aW1lIHBpY2tlcnNcclxuICAgICAgICAgICAgICAgICAgICAgIHZhciB0aW1lUGlja2VyVGFibGVSb3cgPSBjcmVhdGVTY2hlZHVsZVZpZXcubWFrZVRpbWVQaWNrZXJzUm93KGlkLCBmcm9tSW5wdXQsIHRvSW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGltZVBpY2tlclRhYmxlUm93Lmluc2VydEFmdGVyKHBhc3NlZE9uLnRhYmxlUm93KTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRpbWVQaWNrZXJUYWJsZVJvdy5jb2xsYXBzZSgndG9nZ2xlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgZnJvbUlucHV0LmRhdGV0aW1lcGlja2VyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6J0xUJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgZnJvbUlucHV0Lm9uKCdkcC5jaGFuZ2UnLCAoZnVuY3Rpb24ocGFzc2VzT24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnIHZhbHVlJyArIHBhc3Nlc09uLnNlbGYudmFsKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3Nlc09uLnNjaGVkdWxlT2JqLnN0YXJ0VGltZSA9IHBhc3Nlc09uLnNlbGYudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy91cGRhdGUgbGFiZWwgdGV4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3Nlc09uLmxhYmVsLnRleHQocGFzc2VzT24uc2NoZWR1bGVPYmouc3RhcnRUaW1lICsgJyB0byAnICsgcGFzc2VzT24uc2NoZWR1bGVPYmouZW5kVGltZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KSh7c2VsZjpmcm9tSW5wdXQsIHNjaGVkdWxlT2JqOiBwYXNzZWRPbi5pdGVtLCBsYWJlbDogcGFzc2VkT24udGltZUxhYmVsfSkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICB0b0lucHV0LmRhdGV0aW1lcGlja2VyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6J0xUJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgdG9JbnB1dC5vbignZHAuY2hhbmdlJywgKGZ1bmN0aW9uKHBhc3Nlc09uKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyB2YWx1ZScgKyBwYXNzZXNPbi5zZWxmLnZhbCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzZXNPbi5zY2hlZHVsZU9iai5lbmRUaW1lID0gcGFzc2VzT24uc2VsZi52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBsYWJlbCB0ZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2VzT24ubGFiZWwudGV4dChwYXNzZXNPbi5zY2hlZHVsZU9iai5zdGFydFRpbWUgKyAnIHRvICcgKyBwYXNzZXNPbi5zY2hlZHVsZU9iai5lbmRUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfSkoe3NlbGY6dG9JbnB1dCwgc2NoZWR1bGVPYmo6IHBhc3NlZE9uLml0ZW0sIGxhYmVsOiBwYXNzZWRPbi50aW1lTGFiZWx9KSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICB9KSh7dGFibGVSb3c6IHRyLCBpdGVtOiBzY2hlZHVsZUl0ZW0sIHRpbWVMYWJlbDogc3BhbjF9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICB0ZC5hcHBlbmQoc3BhbjEpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBzcGFuMSA9ICAkKCc8c3Bhbi8+Jyx7Y2xhc3M6ICdsYWJlbCBmb250LTE2IGxhYmVsLWluZm8nLCB0ZXh0OidObyBTY2hlZHVsZSd9KTtcclxuICAgICAgICAgICAgICAgICAgdGQuYXBwZW5kKHNwYW4xKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgICAgICAgIG1mcm9tRGF0ZS5hZGQoMSwgJ2QnKTtcclxuICAgICAgICAgICAgICAgICsraW5kZXhDb3VudGVyO1xyXG5cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMudGFibGVCb2R5LmFwcGVuZCh0cik7XHJcbiAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwdWxsLXJpZ2h0IGZvbnQtMTYgY2FsZW5kYXItZGF0ZVwiPjQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJyPiA8YnI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbCBmb250LTE2IGxhYmVsLWluZm9cIiAgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGhyZWY9XCIjY29sbGFwc2VFeGFtcGxlMVwiPk5vIFNjaGVkdWxlPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgIDwvdGQ+XHJcblxyXG4gICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWwgZm9udC0xNiBsYWJlbC1kYW5nZXJcIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgaHJlZj1cIiNjb2xsYXBzZUV4YW1wbGUxXCI+MTQ6MDQ6QW0gVG8gMTQ6MDQ6QW08L3NwYW4+XHJcbiAgICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9kb25lIHNldHRpbmcgIHRoZSBmaXJzdCByb3dcclxuXHJcblxyXG4gICAgICAgICAgICAvL2FkZGluIHRoZSByZXN0IG9mIHRoZSBkYXRlc1xyXG4gICAgICAgICAgICB2YXIgZGF5c0NvdW50ID0gc2NoZWR1bGUuc2NoZWR1bGVMaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIGxvb3BDb3VudCA9IE1hdGguY2VpbChkYXlzQ291bnQgLyA3KTtcclxuXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2xvb3BjcHVudCcgKyBsb29wQ291bnQpO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbG9vcENvdW50IDsgaSsrKXtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHRyID0gJCgnPHRyLz4nLHtjbGFzczogJ3RleHQtY2VudGVyJ30pO1xyXG5cclxuICAgICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgNyAmJiBpbmRleENvdW50ZXIgPCBkYXlzQ291bnQ7IGorKyl7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGUgPSBtb21lbnQoc2NoZWR1bGUuc2NoZWR1bGVMaXN0W2luZGV4Q291bnRlcl0uZGF0ZSwgXCJERC1NTS1ZWVlZXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNwYW4gPSAgJCgnPHNwYW4vPicse2NsYXNzOiAncHVsbC1yaWdodCBmb250LTE2IGNhbGVuZGFyLWRhdGUnLCB0ZXh0OmRhdGUuZm9ybWF0KCdEbycpfSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGQgPSAkKCc8dGQvPicpLmFwcGVuZChzcGFuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPGJyPjxicj4nKSk7XHJcblxyXG4gICAgICAgICAgICAgICB2YXIgaXNBY3RpdmUgPSBzY2hlZHVsZS5zY2hlZHVsZUxpc3RbaW5kZXhDb3VudGVyXS5hY3RpdmU7XHJcbiAgICAgICAgICAgICAgIGlmKGlzQWN0aXZlKXtcclxuICAgICAgICAgICAgICAgICB2YXIgdGltZSA9IHNjaGVkdWxlSXRlbS5zdGFydFRpbWUgKyAnIHRvICcgKyBzY2hlZHVsZUl0ZW0uZW5kVGltZTtcclxuICAgICAgICAgICAgICAgICB2YXIgc3BhbjEgPSAgJCgnPHNwYW4vPicse2NsYXNzOiAnbGFiZWwgZm9udC0xNiBsYWJlbC1kYW5nZXInLCB0ZXh0OnRpbWV9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgc3BhbjEub24oJ2NsaWNrJywgKGZ1bmN0aW9uKHBhc3NlZE9uKXtcclxuICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3BhbiBjbGljaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAvLyQoJyNjb2xsYXBzZUV4YW1wbGUxJykuY29sbGFwc2UoJ3RvZ2dsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgLy9hZGRpbmcgdGltZXBpY2tlciBkeW5hbWljYWxseVxyXG4gICAgICAgICAgICAgICAgICAgICB2YXIgZnJvbUlucHV0ID0gJCgnPGlucHV0Lz4nLHt0eXBlOiBcInRleHRcIiwgY2xhc3M6ICdmb3JtLWNvbnRyb2wnLCB2YWx1ZTpwYXNzZWRPbi5zdGFydFRpbWV9KTtcclxuICAgICAgICAgICAgICAgICAgICAgdmFyIHRvSW5wdXQgPSAkKCc8aW5wdXQvPicse3R5cGU6IFwidGV4dFwiLCBjbGFzczogJ2Zvcm0tY29udHJvbCcsIHZhbHVlOnBhc3NlZE9uLmVuZFRpbWV9KTtcclxuICAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gJ2NvbGxhcHNlZC10aW1lLXBpY2tlcnMnO1xyXG4gICAgICAgICAgICAgICAgICAgICB2YXIgdHIgPSAkKCcjY29sbGFwc2VkLXRpbWUtcGlja2VycycpO1xyXG4gICAgICAgICAgICAgICAgICAgICB0ci5yZW1vdmUoKTsgIC8vcmVtb3ZlIHRoZSBwcmV2aW91c2x5IGFkZGVkIHRpbWUgcGlja2Vyc1xyXG4gICAgICAgICAgICAgICAgICAgICB2YXIgdGltZVBpY2tlclRhYmxlUm93ID0gY3JlYXRlU2NoZWR1bGVWaWV3Lm1ha2VUaW1lUGlja2Vyc1JvdyhpZCwgZnJvbUlucHV0LCB0b0lucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgdGltZVBpY2tlclRhYmxlUm93Lmluc2VydEFmdGVyKHBhc3NlZE9uLnRhYmxlUm93KTtcclxuICAgICAgICAgICAgICAgICAgICAgdGltZVBpY2tlclRhYmxlUm93LmNvbGxhcHNlKCd0b2dnbGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgIGZyb21JbnB1dC5kYXRldGltZXBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDonTFQnXHJcbiAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgZnJvbUlucHV0Lm9uKCdkcC5jaGFuZ2UnLCAoZnVuY3Rpb24ocGFzc2VzT24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyB2YWx1ZScgKyBwYXNzZXNPbi5zZWxmLnZhbCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3Nlc09uLnNjaGVkdWxlT2JqLnN0YXJ0VGltZSA9IHBhc3Nlc09uLnNlbGYudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBsYWJlbCB0ZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzZXNPbi5sYWJlbC50ZXh0KHBhc3Nlc09uLnNjaGVkdWxlT2JqLnN0YXJ0VGltZSArICcgdG8gJyArIHBhc3Nlc09uLnNjaGVkdWxlT2JqLmVuZFRpbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgIH0pKHtzZWxmOmZyb21JbnB1dCwgc2NoZWR1bGVPYmo6IHBhc3NlZE9uLml0ZW0sIGxhYmVsOiBwYXNzZWRPbi50aW1lTGFiZWx9KSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgdG9JbnB1dC5kYXRldGltZXBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDonTFQnXHJcbiAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgdG9JbnB1dC5vbignZHAuY2hhbmdlJywgKGZ1bmN0aW9uKHBhc3Nlc09uKXtcclxuICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgdmFsdWUnICsgcGFzc2VzT24uc2VsZi52YWwoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzZXNPbi5zY2hlZHVsZU9iai5lbmRUaW1lID0gcGFzc2VzT24uc2VsZi52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIGxhYmVsIHRleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3Nlc09uLmxhYmVsLnRleHQocGFzc2VzT24uc2NoZWR1bGVPYmouc3RhcnRUaW1lICsgJyB0byAnICsgcGFzc2VzT24uc2NoZWR1bGVPYmouZW5kVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICB9KSh7c2VsZjp0b0lucHV0LCBzY2hlZHVsZU9iajogcGFzc2VkT24uaXRlbSwgbGFiZWw6IHBhc3NlZE9uLnRpbWVMYWJlbH0pKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICB9KSh7dGFibGVSb3c6IHRyLCBpdGVtOiBzY2hlZHVsZUl0ZW0sIHRpbWVMYWJlbDogc3BhbjF9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgIHRkLmFwcGVuZChzcGFuMSk7XHJcbiAgICAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgICB2YXIgc3BhbjEgPSAgJCgnPHNwYW4vPicse2NsYXNzOiAnbGFiZWwgZm9udC0xNiBsYWJlbC1pbmZvJywgdGV4dDonTm8gU2NoZWR1bGUnfSk7XHJcbiAgICAgICAgICAgICAgICAgdGQuYXBwZW5kKHNwYW4xKTtcclxuICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgKytpbmRleENvdW50ZXI7XHJcbiAgICAgICAgICAgICAgfSAvL2RheXMgb2Ygd2VlayBsb29wXHJcblxyXG4gICAgICAgICAgICAgIC8vdHIuYXBwZW5kKHRkKTtcclxuICAgICAgICAgICAgICB0aGlzLnRhYmxlQm9keS5hcHBlbmQodHIpO1xyXG5cclxuICAgICAgICAgICAgfS8vd2VlayBsb29wIGVuZHNcclxuXHJcblxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICB2YXIgZnJvbUlucHV0ID0gJCgnPGlucHV0Lz4nLHt0eXBlOiBcInRleHRcIiwgY2xhc3M6ICdmb3JtLWNvbnRyb2wnLCB2YWx1ZTonMTI6MDAgUE0nfSk7XHJcbiAgICAgICAgICAgIHZhciB0b0lucHV0ID0gJCgnPGlucHV0Lz4nLHt0eXBlOiBcInRleHRcIiwgY2xhc3M6ICdmb3JtLWNvbnRyb2wnLCB2YWx1ZTonMTI6MDAgUE0nfSk7XHJcbiAgICAgICAgICAgIHZhciB0aW1lUGlja2VyVGFibGVSb3cgPSB0aGlzLm1ha2VUaW1lUGlja2Vyc1JvdygnY29sbGFwc2VkLXRpbWUtcGlja2VycycsIGZyb21JbnB1dCwgdG9JbnB1dCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVCb2R5LmFwcGVuZCh0aW1lUGlja2VyVGFibGVSb3cpO1xyXG4gICAgICAgICAgICB0aW1lUGlja2VyVGFibGVSb3cuY29sbGFwc2UoJ3RvZ2dsZScpO1xyXG4gICAgICAgICAgICBmcm9tSW5wdXQuZGF0ZXRpbWVwaWNrZXIoe1xyXG4gICAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgICBmb3JtYXQ6J0xUJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZyb21JbnB1dC5vbignZHAuY2hhbmdlJywgKGZ1bmN0aW9uKHNlbGYpe1xyXG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyB2YWx1ZScgKyBzZWxmLnZhbCgpKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKGZyb21JbnB1dCkpXHJcblxyXG5cclxuICAgICAgICAgICAgdG9JbnB1dC5kYXRldGltZXBpY2tlcih7XHJcbiAgICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGZvcm1hdDonTFQnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdG9JbnB1dC5vbignZHAuY2hhbmdlJywgKGZ1bmN0aW9uKHNlbGYpe1xyXG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyB2YWx1ZScgKyBzZWxmLnZhbCgpKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKHRvSW5wdXQpKVxyXG5cclxuICAgICAgICAgICAgKi9cclxuXHJcblxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICA8dGQgaWQ9XCJ0YWJsZS1kYXRhLXRlbXBsYXRlXCIgaGVpZ2h0PVwiMTAwXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwdWxsLXJpZ2h0IGZvbnQtMTYgY2FsZW5kYXItZGF0ZVwiPjI8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPGJyPjxicj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxhYmVsIGZvbnQtMTYgbGFiZWwtZGFuZ2VyXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGhyZWY9XCIjY29sbGFwc2VFeGFtcGxlMVwiPjE0OjA0OkFtIFRvIDE0OjA0OkFtPC9zcGFuPlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxuICAgIH0oKSk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
