package com.wsq.exercise.dao;
import com.wsq.exercise.pojo.Admin;
import com.wsq.exercise.pojo.History;
import com.wsq.exercise.pojo.Users;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author wsq
 * @version 1.0
 * @description
 * @date 2021/6/20 14:11
 */
public interface UserDao {

    Admin backLogin(String accName);

    List<Users> getUserInfo(@Param("username")String username, @Param("page")Integer page, @Param("curr")int curr);

    int getUserInfoCount(@Param("username")String username);

    boolean delUser(String userId);

    boolean updateUser(@Param("userId")String userId, @Param("nickName")String nickName, @Param("sex")String sex, @Param("roleId")Integer roleId);

    boolean addUserInfo(@Param("userName")String userName, @Param("password")String password, @Param("phone")String phone, @Param("email")String email);

    boolean reg(Admin user);

    boolean doSubmit(@Param("number")Integer number, @Param("score")Double score, @Param("username")String username);

    List<History> getHistoryInfo(@Param("username")String username, @Param("btime")String btime, @Param("etime")String etime, @Param("page")Integer page, @Param("curr")int curr);

    int getHistoryInfoCount(@Param("username")String username, @Param("btime")String btime, @Param("etime")String etime);

    Integer getCountNum();

    Integer getSexInfo(String sex);

    List<History> getScoreInfo();

    boolean updatePsw(@Param("newpsw")String newpsw, @Param("username")String username);

    boolean updateUsers(@Param("userName")String userName, @Param("nickName")String nickName,@Param("sex")String sex, @Param("phone")String phone);
}
