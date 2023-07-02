import {
    extend
} from 'vee-validate';
import * as rules from "vee-validate/dist/rules";
import {
    required
} from 'vee-validate/dist/rules';


Object.keys(rules).forEach((rule) => {
    extend(rule, {
        ...rules[rule], // copies rule configuration
    });
});

extend('required', {
    ...required,
    message: (fieldName) => {
        return fieldName + " is required"
    }
});

extend('lengthMinMax', {
    validate(value, {
        min,
        max
    }) {
        return ('' + value).length >= min && ('' + value).length <= max;
    },
    params: ['min', 'max'],
    message: () => {}
});



// extend('lengthFixed', {
//     validate(value, { len }) {
//         return ('' + value).length === len;
//     },
//     params: ['len'],
//     message: (fieldName, { len }) => {
//         return `طول ${fieldName} می‌بایست ${len} کاراکتر باشد`;
//     }
// });

extend('macAddress', {
    validate(value) {
        var reg = new RegExp(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/);
        return reg.test('' + value);
    },
    message: () => {
        return 'مک آدرس معتبر نمی باشد';
    }
});

extend('ipv4', {
    validate(value) {
        var reg = new RegExp(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/);
        return reg.test('' + value);
    },
    message: () => {
        return ' آی پی معتبر نمی باشد';
    }
});

extend('version', {
    validate(value) {
        var reg = new RegExp(/^v[0-9]{1,2}(.[0-9]{1,2}(.[0-9]{1,2})?)?$/);
        return reg.test('' + value);
    },
    message: () => {
        return '  نسخه معتبر نمی باشد';
    }
});

// extend('isNationalCardSerial', {
//     validate(str, obj) {
//         try {
//             if (!str) {
//                 return true;
//             }
//             if (str.length > 10 || str.length < 10) {
//                 return false;
//             }

//             return true;
//         } catch (e) {
//             return false;
//         }
//     },
//     message: (fieldName, placeholders) => {
//         return `${fieldName} معتبر نمی باشد`;
//     }
// });

extend('isNationalCode', {
    validate(str) {
        try {
            if (!str) {
                return true;
            }
            let meliCode = str;
            if (meliCode.length === 10) {
                if (meliCode === '0000000000' || meliCode === '1111111111' || meliCode === '2222222222' || meliCode === '3333333333' || meliCode === '4444444444' || meliCode === '5555555555' || meliCode === '6666666666' || meliCode === '7777777777' || meliCode === '8888888888' || meliCode === '9999999999') {
                    return false;
                }
                let c = parseInt(meliCode.charAt(9));
                let n = parseInt(meliCode.charAt(0)) * 10 + parseInt(meliCode.charAt(1)) * 9 + parseInt(meliCode.charAt(2)) * 8 + parseInt(meliCode.charAt(3)) * 7 + parseInt(meliCode.charAt(4)) * 6 + parseInt(meliCode.charAt(5)) * 5 + parseInt(meliCode.charAt(6)) * 4 + parseInt(meliCode.charAt(7)) * 3 + parseInt(meliCode.charAt(8)) * 2;
                let r = n - parseInt(n / 11) * 11;
                if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
                    return true;
                }

                return false;
            }
            return false;
        } catch (e) {
            return false;
        }
    },
    message: (fieldName) => {
        return `${fieldName} معتبر نمی باشد`;
    }
});

extend('isMobile', {
    validate(str) {
        try {
            if (!str) {
                return true;
            }
            return str.match(/^(989)[0-9]{9}$/);
        } catch (e) {
            return false;
        }
    },
    message: (fieldName) => {
        return `${fieldName} معتبر نمی باشد`;
    }
});

extend('otpLength', {
    validate(value, {
        len
    }) {
        return ('' + value).length === len;
    },
    params: ['len'],
    message: () => {
        return `رمز یکبار مصرف معتبر نمی باشد.`;
    }
});