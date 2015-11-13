module.exports = {
	formatter : function(array) {
    var self = "g12-kelly-byrne-memories.cfapps.io/api/v1/memories"
    var data = [];
	for (var i=0; i< array.length; i++){
		data.push({
		     "type": "memory","id": array[i].id, "attributes": {"old_days": array[i].old_days, "these_days": array[i].these_days, "year": array[i].year}, "links": "g12-kelly-byrne-memories.cfapps.io/api/v1/memories"});
    }
    return {"links": {self: "g12-kelly-byrne-memories.cfapps.io/api/v1/memories"}, "data": data};
}
}