package com.wsq.exercise.pojo;

public class Admin {
    private Integer userId;
    private String userName ;
    private String password;
    private String sex;
    private String phone;
    private String nickName;
    private Integer roleId;

    public Admin() {
    }

    public Admin(Integer userId, String userName, String password, String sex, String phone, String nickName, Integer roleId) {
        this.userId = userId;
        this.userName = userName;
        this.password = password;
        this.sex = sex;
        this.phone = phone;
        this.nickName = nickName;
        this.roleId = roleId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
}
