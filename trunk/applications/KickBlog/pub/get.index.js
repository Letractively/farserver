

if (params.from==null) {
	params.from = 0;
}

if (params.max==null) {
	params.max = 10;
}


var cur = db.getCollection("blogs").find(
			{'tags': params.tag},
			{
				"content":0
			}
		).sort({"modified":-1}).skip(params.from).limit(params.max);

var config = db.getCollection("config").findOne({});

var model = new Object();

model.total = cur.count();
model.config = config;
model.from = params.from;
model.to = params.from + cur.size();
model.blogs = new Array();
while (cur.hasNext()) {
	model.blogs.push(cur.next());
}
model;