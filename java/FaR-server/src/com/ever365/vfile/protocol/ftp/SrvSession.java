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

import java.net.InetAddress;
/**
 * Server Session Base Class
 * 
 * <p>
 * Base class for server session implementations for different protocols.
 * 
 * @author gkspencer
 */
public abstract class SrvSession {

	// Network server this session is associated with

	private NetworkServer m_server;

	// Session id/slot number

	private int m_sessId;

	// Unique session id string

	private String m_uniqueId;

	// Process id

	private int m_processId = -1;

	// Session/user is logged on/validated

	private boolean m_loggedOn;

	// Client details

	private ThreadLocal<ClientInfo> m_clientInfo;


	// Debug flags for this session, and debug output interface.

	private int m_debug;
	private String m_dbgPrefix;


	// Session shutdown flag

	private boolean m_shutdown;

	// Protocol type

	private String m_protocol;

	// Remote client/host name

	private String m_remoteName;

	// Transaction object, for filesystems that implement the TransactionalFilesystemInterface

	private ThreadLocal<Object> m_tx;

	// Time of last I/O on this session
	
	private long m_lastIO;
	
	/**
	 * Class constructor
	 * 
	 * @param sessId int
	 * @param srv NetworkServer
	 * @param proto String
	 * @param remName String
	 */
	public SrvSession(int sessId, NetworkServer srv, String proto, String remName) {
		m_sessId = sessId;
		m_server = srv;

		setProtocolName(proto);
		setRemoteName(remName);
		
		// Allocate the client information thread local
		
		m_clientInfo = new ThreadLocal<ClientInfo>();
	}

	/**
	 * Return the process id
	 * 
	 * @return int
	 */
	public final int getProcessId() {
		return m_processId;
	}

	/**
	 * Return the remote client network address
	 * 
	 * @return InetAddress
	 */
	public abstract InetAddress getRemoteAddress();

	/**
	 * Return the session id for this session.
	 * 
	 * @return int
	 */
	public final int getSessionId() {
		return m_sessId;
	}

	/**
	 * Return the server this session is associated with
	 * 
	 * @return NetworkServer
	 */
	public final NetworkServer getServer() {
		return m_server;
	}

	/**
	 * Check if the session has valid client information
	 * 
	 * @return boolean
	 */
	public final boolean hasClientInformation() {
		return m_clientInfo.get() != null ? true : false;
	}

	/**
	 * Return the client information
	 * 
	 * @return ClientInfo
	 */
	public final ClientInfo getClientInformation() {
		return m_clientInfo.get();
	}

	/**
	 * Determine if the protocol type has been set
	 * 
	 * @return boolean
	 */
	public final boolean hasProtocolName() {
		return m_protocol != null ? true : false;
	}

	/**
	 * Return the protocol name
	 * 
	 * @return String
	 */
	public final String getProtocolName() {
		return m_protocol;
	}

	/**
	 * Determine if the remote client name has been set
	 * 
	 * @return boolean
	 */
	public final boolean hasRemoteName() {
		return m_remoteName != null ? true : false;
	}

	/**
	 * Return the remote client name
	 * 
	 * @return String
	 */
	public final String getRemoteName() {
		return m_remoteName;
	}

	/**
	 * Determine if the session is logged on/validated
	 * 
	 * @return boolean
	 */
	public final boolean isLoggedOn() {
		return m_loggedOn;
	}

	/**
	 * Determine if the session has been shut down
	 * 
	 * @return boolean
	 */
	public final boolean isShutdown() {
		return m_shutdown;
	}

	/**
	 * Return the unique session id
	 * 
	 * @return String
	 */
	public final String getUniqueId() {
		return m_uniqueId;
	}

	/**
	 * Determine if the specified debug flag is enabled.
	 * 
	 * @param dbgFlag int
	 * @return boolean
	 */
	public final boolean hasDebug(int dbgFlag) {
		if ( (m_debug & dbgFlag) != 0)
			return true;
		return false;
	}

	/**
	 * Return the time of the last I/o on this session
	 * 
	 * @return long
	 */
	public final long getLastIOTime() {
		return m_lastIO;
	}
	
	/**
	 * Determine if the protocol uses case sensitive filesystem searches
	 * 
	 * @return boolean
	 */
	public abstract boolean useCaseSensitiveSearch();
	
	/**
	 * Set the client information
	 * 
	 * @param client ClientInfo
	 */
	public final void setClientInformation(ClientInfo client) {
		m_clientInfo.set(client);
	}

	/**
	 * Set the debug output interface.
	 * 
	 * @param flgs int
	 */
	public final void setDebug(int flgs) {
		m_debug = flgs;
	}

	/**
	 * Set the debug output prefix for this session
	 * 
	 * @param prefix String
	 */
	public final void setDebugPrefix(String prefix) {
		m_dbgPrefix = prefix;
	}

	/**
	 * Set the logged on/validated status for the session
	 * 
	 * @param loggedOn boolean
	 */
	public final void setLoggedOn(boolean loggedOn) {
		m_loggedOn = loggedOn;
	}

	/**
	 * Set the process id
	 * 
	 * @param id int
	 */
	public final void setProcessId(int id) {
		m_processId = id;
	}

	/**
	 * Set the protocol name
	 * 
	 * @param name String
	 */
	public final void setProtocolName(String name) {
		m_protocol = name;
	}

	/**
	 * Set the remote client name
	 * 
	 * @param name String
	 */
	public final void setRemoteName(String name) {
		m_remoteName = name;
	}

	/**
	 * Set the session id for this session.
	 * 
	 * @param id int
	 */
	public final void setSessionId(int id) {
		m_sessId = id;
	}

	/**
	 * Set the unique session id
	 * 
	 * @param unid String
	 */
	public final void setUniqueId(String unid) {
		m_uniqueId = unid;
	}

	/**
	 * Set the time of hte last I/O on this session
	 * 
	 * @param ioTime long
	 */
	public final void setLastIOTime(long ioTime) {
		m_lastIO = ioTime;
	}
	
	/**
	 * Set the shutdown flag
	 * 
	 * @param flg boolean
	 */
	protected final void setShutdown(boolean flg) {
		m_shutdown = flg;
	}


	/**
	 * Return the transaction context
	 * 
	 * @return ThreadLocal<Object>
	 */
	public final ThreadLocal<Object> getTransactionObject() {
		return m_tx;
	}

	/**
	 * Set the active transaction and transaction interface
	 * 
	 * @param tx Object
	 * @param txIface TransactionalFilesystemInterface
	 */
	public final void setTransaction() {
		//m_tx.set( tx);
		//m_txInterface.set( txIface);
	}
	
	/**
	 * Check if there is an active transaction
	 * 
	 * @return boolean
	 */
	public final boolean hasTransaction() {
		if ( m_tx == null)
			return false;
		return m_tx.get() != null ? true : false;
	}
}
