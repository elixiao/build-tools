module.exports = function(source) {
    this.cacheable && this.cacheable();
    var str = "["+source.split('\n').join(' ')+"]"
    this.callback(null,str);
    return "module.exports = "+JSON.stringify(str);
}
