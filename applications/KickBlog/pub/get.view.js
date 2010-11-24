
var arrays = request.getPath().split("/");
if (arrays.length!=2) response.sendError(400);

var blog = db.getCollection("blogs").getById(arrays[1]);

if (blog==null) {
	response.sendError(404);
}

var model = new Object();
model.blog = blog;
model.next = db.getCollection("blogs").findOne({"modified":{"$gt":blog.modified}});
model.previous = db.getCollection("blogs").findOne({"modified":{"$lt":blog.modified}});

model.comments = db.getCollection("comments").find({"blogid":blog.id}).limit(20).toArray();


model;