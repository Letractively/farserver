if (user.isGuest()) {
	response.sendError(401);
}

if (!user.equals(owner)) {
	response.sendError(403);
}

var itemToStart = db.getCollection("activities").remove({"start":parseInt(params.id)});

"1";