Module('Utils')({
    getJSON : function getJSON(file_path, callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open("GET", file_path, true);
        xobj.onreadystatechange = function() {
            if (xobj.readyState === 4 && xobj.status == "200") {
                callback(xobj.responseText);
            }
        }
        xobj.send();

        return null;
    }
});
