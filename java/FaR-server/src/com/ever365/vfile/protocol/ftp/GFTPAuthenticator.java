/*
 * Copyright (C) 2006-2010 Alfresco Software Limited.
 *
 * This file is part of Alfresco
 *
 * Alfresco is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfresco is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

package com.ever365.vfile.protocol.ftp;

import com.ever365.security.UserService;
import com.ever365.security.User;

/**
 * <p>Local Authenticator Class.
 *
 * <p>Authenticate FTP users using the user accounts defined in the configuration or available via the
 * users interface.
 *
 * @author gkspencer
 */
public class GFTPAuthenticator implements FTPAuthenticator {
	
	private UserService userService;
  
  /**
   * Authenticate an FTP user
   * 
   * @param cInfo ClientInfo
   * @param sess FTPSrvSession
   * @return boolean
   */
  public boolean authenticateUser(ClientInfo cInfo, FTPSrvSession sess) {

    //  Check if the user exists in the user list
	  User user = userService.getUser(cInfo.getUserName());
	  if (user == null) {
		  return false;
	  } else {
		  if (user.getPassword().equals(cInfo.getPasswordAsString())) {
			  cInfo.setUser(user);
			  return true;
		  }
	  }
	  
	  return false;  }

    /**
   * Close the authenticator
   */
  public void closeAuthenticator() {
  }

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

  
}
