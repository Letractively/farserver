package net.gqu.content;

import net.gqu.mongodb.MongoDBProvider;
import net.gqu.security.AuthenticationUtil;
import net.gqu.security.BasicUserService;
import net.gqu.webscript.object.ContentFile;

import org.bson.types.ObjectId;

import com.mongodb.DB;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSInputFile;

public class GridFSContentService  implements ContentService {

	
	public void setDbProvider(MongoDBProvider dbProvider) {
		this.dbProvider = dbProvider;
	}
	
	public BasicUserService getUserService() {
		return userService;
	}

	public void setUserService(BasicUserService userService) {
		this.userService = userService;
	}


	private BasicUserService userService;
	private MongoDBProvider dbProvider;
	
	@Override
	public ContentFile getContent(String id) {
		DB contentDB = dbProvider.getMongo().getDB("contents");
		GridFS gridFS = new GridFS(contentDB);
		GridFSDBFile file = gridFS.find(new ObjectId(id));
		
		ContentFile contentFile = new ContentFile();
		contentFile.setModified(file.getUploadDate());
		contentFile.setMimetype(file.getContentType());
		contentFile.setContent(file.getInputStream());
		contentFile.setFileName(file.getFilename());
		contentFile.setSize(file.getLength());
		return contentFile;
	}

	@Override
	public String putContent(ContentFile contentFile) {
		DB contentDB = dbProvider.getMongo().getDB("contents");
		String contextUser = AuthenticationUtil.getContextUser();
		userService.incUserUsage(contextUser, contentFile.getSize());
		
		GridFS gridFS = new GridFS(contentDB);
		GridFSInputFile file = gridFS.createFile(contentFile.getInputStream(), contentFile.getFileName());
		file.setContentType(contentFile.getMimetype());
		file.save();
		ObjectId id = (ObjectId) file.getId();
		return id.toString();
	}

	@Override
	public boolean removeContent(String id) {
		DB contentDB = dbProvider.getMongo().getDB("contents");
		String contextUser = AuthenticationUtil.getContextUser();
		
		GridFS gridFS = new GridFS(contentDB);
		
		GridFSDBFile file = gridFS.find(new ObjectId(id));
		if (file!=null) {
			userService.incUserUsage(contextUser, -file.getLength());
		}		
		
		gridFS.remove(new ObjectId(id));
		return true;
	}
}