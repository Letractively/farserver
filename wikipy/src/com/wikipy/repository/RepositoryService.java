package com.wikipy.repository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Map;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.wikipy.mongodb.MongoDBDataSource;

public class RepositoryService {

	private MongoDBDataSource dataSource;
	
	public void appendChildren(String parentQuery, Map<String, Object> obj) {
		DBCollection collection = dataSource.getMainDB().getCollection("items");
		
		DBObject parent = collection.findOne(BasicDBObjectBuilder.start("_id", new ObjectId(parentQuery)).get());
		if (parent!=null) {
			auditCreated(parent, obj);
			collection.insert(BasicDBObjectBuilder.start(obj).get());
		}
	}
	
	public Collection<Map<String, Object>> listChildRen(String parentQuery, Map<String, Object> filter,  int from, int limit, String orderField, String groupBy) {
		DBCollection collection = dataSource.getMainDB().getCollection("items");
		DBObject parent = collection.findOne(BasicDBObjectBuilder.start("_id", new ObjectId(parentQuery)).get());
		
		Collection<Map<String, Object>> result = new ArrayList<Map<String,Object>>();
		if (parent!=null) {
			BasicDBObjectBuilder builder;
			
			if (filter!=null) {
				builder = BasicDBObjectBuilder.start(filter).append("_parent_id", parent.get("_id"));
			} else {
				builder = BasicDBObjectBuilder.start("_parent_id", parent.get("_id"));
			}
			DBCursor queryResult = collection.find(builder.get()).skip(from).limit(limit);
			while (queryResult.hasNext()) {
				DBObject dbo = queryResult.next();
				result.add(dbo.toMap());
			}
		}
		return result;
	}
	
	
	private void auditCreated(DBObject parent, Map<String, Object> obj) {
		obj.put("_audit_created", new Date());
		obj.put("_parent_id",  parent.get("_id"));
	}
	
	
	private void audit(Map<String, Object> obj) {
		
	}
	
}
