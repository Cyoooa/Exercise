package com.wsq.exercise.service.Impl;

import com.wsq.exercise.dao.UserDao;
import com.wsq.exercise.pojo.Admin;
import com.wsq.exercise.pojo.History;
import com.wsq.exercise.pojo.Users;
import com.wsq.exercise.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author wsq
 * @version 1.0
 * @description
 * @date 2021/6/1 11:30
 */
@Service
public class UserServiceImpl implements UserService {
    @Resource
    UserDao userDao;

    @Override
    public Admin backLogin(String accName) {
        return userDao.backLogin(accName);
    }

    @Override
    public List<Users> getUserInfo(String username,Integer page, int curr) {
        return userDao.getUserInfo(username,page,curr);
    }

    @Override
    public int getUserInfoCount(String username) {
        return userDao.getUserInfoCount(username);
    }

    @Override
    public boolean delUser(String userId) {
        return userDao.delUser(userId);
    }

    @Override
    public boolean updateUser(String userId,String nickName,String sex,Integer roleId) {
        return userDao.updateUser(userId,nickName,sex,roleId);
    }

    @Override
    public boolean addUserInfo(String userName, String password, String phone, String email) {
        return userDao.addUserInfo(userName, password, phone, email);
    }

    @Override
    public boolean reg(Admin user) {
        return userDao.reg(user);
    }

    @Override
    public boolean doSubmit(Integer number, Double score, String username) {
        return userDao.doSubmit(number,score,username);
    }

    @Override
    public List<History> getHistoryInfo(String username, String btime, String etime, Integer page, int curr) {
        return userDao.getHistoryInfo(username,btime,etime,page,curr);
    }

    @Override
    public int getHistoryInfoCount(String username, String btime, String etime) {
        return userDao.getHistoryInfoCount(username,btime,etime);
    }

    @Override
    public Integer getCountNum() {
        return userDao.getCountNum();
    }

    @Override
    public Integer getSexInfo(String sex) {
        return userDao.getSexInfo(sex);
    }

    @Override
    public List<History> getScoreInfo() {
        return userDao.getScoreInfo();
    }

    @Override
    public boolean updatePsw(String newpsw, String username) {
        return userDao.updatePsw(newpsw,username);
    }

    @Override
    public boolean updateUsers(String userName, String nickName, String sex, String phone) {
        return userDao.updateUsers(userName, nickName, sex, phone);
    }


}
