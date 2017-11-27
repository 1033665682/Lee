package cn.tedu.read.entity;

import java.io.Serializable;

public class Project implements Serializable {
	 private static final long serialVersionUID = 1L;
	 //id
	 private Integer id;
	//����
	 private String name;
	 //�û���
	 private String username;
	 //�û�����
	 private String password;
	 //Ŀ¼
	 private String directory;
	 //����
	 private String writer;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getDirectory() {
		return directory;
	}
	public void setDirectory(String directory) {
		this.directory = directory;
	}
	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	 @Override
		public String toString() {
			return "Project [id=" + id + ", name=" + name + ", username=" + username + ", password=" + password
					+ ", directory=" + directory + ", writer=" + writer + "]";
		}
	 
	
}
