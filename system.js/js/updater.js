var domUpdater = function () {
    var update = function (id,value) {
        console.debug('I\'m in main.js' );
        document.getElementById(id).innerHTML = value;
    };
    return {
        update:update
    }
};
