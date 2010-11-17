package net.gqu.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.bson.types.ObjectId;

import net.gqu.application.ApprovedApplication;
import net.gqu.application.InstalledApplication;
import net.gqu.cache.EhCacheService;
import net.gqu.exception.HttpStatusExceptionImpl;
import net.gqu.security.AuthenticationUtil;
import net.gqu.security.BasicUserService;
import net.gqu.security.Role;
import net.gqu.security.User;
import net.gqu.service.ApplicationService;

public class WebRestService {

	private ApplicationService applicationService;
	private EhCacheService cacheService;
	private BasicUserService userService;
	
	public void setCacheService(EhCacheService cacheService) {
		this.cacheService = cacheService;
	}

	public void setApplicationService(ApplicationService applicationService) {
		this.applicationService = applicationService;
	}
	
	public BasicUserService getUserService() {
		return userService;
	}

	public void setUserService(BasicUserService userService) {
		this.userService = userService;
	}

	@RestService(method="POST", uri="/application/install")
	public Map<String, Object> installApp(@RestParam(value="application")String application, @RestParam(value="mapping")String mapping) {
		if (!AuthenticationUtil.isCurrentLogon()) {
			throw new HttpStatusExceptionImpl(401);
		}
		
		User user = AuthenticationUtil.getCurrentUser();
		ApprovedApplication app = applicationService.getApplication(application);
		
		if (app==null) {
			throw new HttpStatusExceptionImpl(404);
		}
		
		InstalledApplication installed = applicationService.install(user, app, mapping);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put(ApplicationService.APPLICATION, installed.getApp());
		result.put(ApplicationService.USER, installed.getUser());
		result.put(ApplicationService._ID, installed.getId());
		result.put(ApplicationService.MAPPING, installed.getMapping());
		return result;
	}
	
	@RestService(method="GET", uri="/application/clean")
	public String cleanAppCache(@RestParam(value="application")String application) {
		cacheService.getApplicationCache(application).removeAll();
		return "OK";
	}

	@RestService(method="POST", uri="/admin/role/list")
	public Map<String, Object> getRoles() {
		if (!AuthenticationUtil.isCurrentUserAdmin()) throw new HttpStatusExceptionImpl(403);
		
		List<Role> roles = userService.getRoles();
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		List<Map<String, Object>> rolesMap = new ArrayList<Map<String,Object>>();
		
		for (Role role : roles) {
			rolesMap.add(role.getMap());
		}
		result.put("total", roles.size());
		result.put("rows", rolesMap);
		
		return result;
	}

	@RestService(method="POST", uri="/admin/role/remove")
	public void removeRole(@RestParam(value="id")String id) {
		if (!AuthenticationUtil.isCurrentUserAdmin()) throw new HttpStatusExceptionImpl(403);
		userService.removeRole(id);
	}

	
	
	@RestService(method="POST", uri="/admin/role/save")
	public String addRole(@RestParam(value="id")String id, @RestParam(value="name")String name, 
			@RestParam(value="contentSize")String contentSize,
			@RestParam(value="totalSize")String totalSize,
			@RestParam(value="open")String open,
			@RestParam(value="enabled")String enabled
			) {
		if (!AuthenticationUtil.isCurrentUserAdmin()) throw new HttpStatusExceptionImpl(403);
		
		
		if (name==null || name.equals("")) return "name can't be empty";
		long filesize = 0;
		long total  = 0;
		try{
			filesize = new Integer(contentSize);
			total = new Integer(totalSize);
		} catch (Exception e) {
			return "size should be integer";
		}
		
		boolean opened = false;
		if ("true".equals(open)) {
			opened = true;	
		}
		
		boolean benabled = false;
		if ("true".equals(enabled)) {
			benabled = true;	
		}
		
		Role role = new Role();
		role.setName(name);
		role.setContentSize(filesize);
		role.setTotalSize(total);
		role.setEnabled(benabled);
		role.setOpen(opened);
		if (id!=null && !"".equals(id)) {
			role.setId(new ObjectId(id));
		}
		userService.updateRole(role);
		return "OK";
	}

	
	
	
	
	
	
}
