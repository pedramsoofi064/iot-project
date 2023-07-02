export default {
    enToFaNum: function(value) {
        if (value !== null && value !== undefined) {
            let val = value.toString();
            val = val.replace(/0/g, '۰');
            val = val.replace(/1/g, '۱');
            val = val.replace(/2/g, '۲');
            val = val.replace(/3/g, '۳');
            val = val.replace(/4/g, '۴');
            val = val.replace(/5/g, '۵');
            val = val.replace(/6/g, '۶');
            val = val.replace(/7/g, '۷');
            val = val.replace(/8/g, '۸');
            val = val.replace(/9/g, '۹');

            return val;
        }
    },
    faToEnNum: function(value) {
        // debugger
        if (value !== null && value !== undefined) {
            let val = value.toString();
            val = val.replace(/۰/g, '0');
            val = val.replace(/۱/g, '1');
            val = val.replace(/۲/g, '2');
            val = val.replace(/۳/g, '3');
            val = val.replace(/۴/g, '4');
            val = val.replace(/۵/g, '5');
            val = val.replace(/۶/g, '6');
            val = val.replace(/۷/g, '7');
            val = val.replace(/۸/g, '8');
            val = val.replace(/۹/g, '9');

            return val;
        }
    }
};
