import * as jalaali from 'jalaali-js';

export default {
    persianDate: function(value) {
        if (value !== null) {
            if (typeof value == String) value = value.split('T')[0];
            const dateObject = jalaali.toJalaali(new Date(value));
            return `${dateObject.jy}/${dateObject.jm}/${dateObject.jd}`;
        }
        return '';
    }
};
