angular.module("services", [])
    .factory("formatDate", function(){
        return function(date) {
            if (!(date instanceof Date)){
                throw "Not a valid date."
            }

            var month = date.getMonth() + 1;
            var day = (date.getDate() < 10 ? "0" : "") + date.getDate();
            var year = date.getFullYear();
            var hour = date.getHours();
            var ampm = " am";
            if  (hour === 0){
                hour = 12;
            }
            else if (hour > 12){
                hour -= 12;
                ampm = " pm";
            }
            var minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
            var second = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();

            return month + '/' + day + '/' + year + ' ' + hour + ':' + minute + ':' + second + ampm;
        };

    });