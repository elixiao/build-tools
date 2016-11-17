module.exports = function(source) {
    this.cacheable && this.cacheable();
    var str = "{"+source.split('\n').join(' ')+"}"
    return "module.exports = "+JSON.stringify(str);
}