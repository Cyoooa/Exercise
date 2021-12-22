package com.wsq.exercise.service;

import com.wsq.exercise.pojo.Admin;
import com.wsq.exercise.pojo.History;
import com.wsq.exercise.pojo.Users;

import java.util.List;

/**
 * @author wsq
 * @version 1.0
 * @description
 * @date 2021/6/10 14:08
 */
public interface UserService {
    //登录

    Admin backLogin(String accName);

    List<Users> getUserInfo(String username, Integer page, int curr);

    int getUserInfoCount(String username);

    boolean delUser(String userId);

    boolean updateUser(String userId,String nickName,String sex,Integer roleId);

    boolean addUserInfo(String userName, String password, String phone, String email);

    boolean reg(Admin user);

    boolean doSubmit(Integer number, Double score, String username);

    List<History> getHistoryInfo(String username, String btime, String etime, Integer page, int curr);

    int getHistoryInfoCount(String username, String btime, String etime);

    Integer getCountNum();

    Integer getSexInfo(String sex);

    List<History> getScoreInfo();

    boolean updatePsw(String newpsw, String username);

    boolean updateUsers(String userName, String nickName, String sex, String phone);
}