package com.wsq.exercise.controller;
/**
 * @author wsq
 * @version 1.0
 * @description：后端控制器
 * @date 2021/5/16 11:36
 */
import com.cjl.Ajax;
import com.wsq.exercise.pojo.Admin;
import com.wsq.exercise.pojo.History;
import com.wsq.exercise.pojo.Users;
import com.wsq.exercise.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.*;

@Controller
@ResponseBody
public class BackController {
    Random ran = new Random();

    @Resource
    private UserService userService;

    //获取单个用户信息
    @PostMapping("getUserInfos")
    public String getUserInfos(HttpSession session){
        Admin admin = (Admin) session.getAttribute("user");
        HashMap<String,Object> map = new HashMap<>();
        map.put("user",admin);
        return Ajax.success(map);
    }

    //获取用户信息，用于管理界面
    @PostMapping("/getUserInfo")
    public String getUserInfo(HttpSession session, String username,String pageSize,String currPage){
        if (username==null||"".equals(username)){
            username = null;
        }else {
            username = "%"+username+"%" ;
        }
        Integer page = Integer.valueOf(pageSize);
        Integer currs = Integer.valueOf(currPage);

        int curr = (currs-1)*5;

        List<Users> userInfo = userService.getUserInfo(username,page,curr);
        int count = userService.getUserInfoCount(username);
        HashMap<String,Object> map = new HashMap<>();
        map.put("userInfo",userInfo);
        map.put("count",count);
        return Ajax.success(map);

    }

    //删除用户，逻辑删除，将数据库的roleid变为2
    @PostMapping("/delUser")
    public String delUser(String userId){
        boolean is = userService.delUser(userId);
        if (!is){
            return Ajax.error("删除失败，请稍后再试");
        }
        return Ajax.success();

    }

    //修改用户信息
    @PostMapping("/updateUserInfo")
    public String updateUserInfo(String userId,String nickName,String sex,Integer roleId){
        boolean is = userService.updateUser(userId,nickName,sex,roleId);
        if (!is){
            return Ajax.error("修改失败，请稍后再试");
        }
        return Ajax.success();

    }

    //修改单个用户信息
    @PostMapping("/updateUsers")
    public String updateUserInfo(String userName,String nickName,String sex,String phone,HttpSession session){
        boolean is = userService.updateUsers(userName,nickName,sex,phone);
        if (!is){
            return Ajax.error("修改失败，请稍后再试");
        }
        Admin admin = userService.backLogin(userName);
        session.setAttribute("user",admin);
        return Ajax.success();

    }

    //添加用户信息
    @PostMapping("/addUserInfo")
    public String addUserInfo(String userName,String password,String phone,String email){
        boolean is = userService.addUserInfo(userName,password,phone,email);
        if (!is){
            return Ajax.error("添加失败，请稍后再试");
        }
        return Ajax.success();

    }

    //获取算式
    @PostMapping("/doGenerate")
    public String doGenerate(String[] value, Integer number){
        //两个几个，counts用于存取算式，results用于存取答案
        List<String> counts = new ArrayList<>();
        List<Integer> results = new ArrayList<>();
        //根据用户选择的运算符和算式数量随机生成算式
        for (int i = 0; i < number; i++) {

            Integer numbers = ran.nextInt(value.length);
            //2、	除法不能有小数
            //3、	乘法的积不能超过500
            //4、	减法不能有负数
            //5、	加法的和不能超过500
            switch (value[numbers]){
                case "1":
                    //加法算法
                    Integer a = ran.nextInt(500);
                    Integer b = ran.nextInt(500-a);
                    Integer c = a+b;
                    String add = a.toString()+'+'+b.toString()+"=";
                    counts.add(add.toString());
                    results.add(c);
                    break;
                case "2":
                    Integer a1 = ran.nextInt(500);
                    while (a1==0){
                        a1 = ran.nextInt(500);
                    }
                    Integer b1 = ran.nextInt(a1);
                    Integer c1 = a1-b1;
                    String jian = a1.toString()+'-'+b1.toString()+"=";
                    counts.add(jian.toString());
                    results.add(c1);
                    break;
                case "3":
                    Integer a2 = ran.nextInt(22);
                    while (a2==0){
                        a2 = ran.nextInt(22);
                    }
                    Integer b2 = ran.nextInt(500/a2);
                    Integer c2 = a2*b2;
                    String cheng = a2.toString()+'*'+b2.toString()+"=";
                    counts.add(cheng.toString());
                    results.add(c2);
                    break;
                case "4":
                    Integer a3 = ran.nextInt(500);
                    while (a3==0){
                        a3 = ran.nextInt(500);
                    }
                    Integer b3 = ran.nextInt(50);
                    while (b3==0){
                        b3 = ran.nextInt(a3);
                    }
                    Integer c3 = a3/b3;
                    Integer d3 = a3/c3;
                    a3 = c3*d3;
                    d3 = a3/c3;
                    String chu = a3.toString()+"÷"+c3.toString()+"=";
                    counts.add(chu.toString());
                    results.add(d3);
                    break;
            }
        }
        HashMap<String,Object> map = new HashMap<>();
        map.put("counts",counts);
        map.put("results",results);
        return Ajax.success(map);
    }



    //提交算式
    @PostMapping("/doSubmit")
    public String doSubmit(Integer number ,Double score,HttpSession session){
        Admin admin = (Admin) session.getAttribute("user");
        String username = admin.getUserName();
        boolean is = userService.doSubmit(number,score,username);
        if (!is){
            return Ajax.error("数据提交失败，请刷新重试");
        }
        return Ajax.success();

    }

    //获取历史记录
    @PostMapping("/getHistoryInfo")
    public String getHistoryInfo(String username,String btime,String etime,String currPage,String pageSize,HttpSession session){
        if (btime==null||"".equals(btime)){
            btime = null;
        }else {
            btime+= " 00:00:00";
        }
        if (etime==null||"".equals(etime)){
            etime = null;
        }else {
            etime+= " 23:59:59";
        }

        Integer page = Integer.valueOf(pageSize);
        Integer currs = Integer.valueOf(currPage);

        int curr = (currs-1)*50;
        List<History> historyInfo = userService.getHistoryInfo(username,btime,etime,page,curr);
        int count = userService.getHistoryInfoCount(username,btime,etime);
        HashMap<String,Object> map = new HashMap<>();
        map.put("historyInfo",historyInfo);
        map.put("count",count);
        return Ajax.success(map);
    }

    //获取所有记录总数，用于统计数据
    @PostMapping("/getCountNum")
    public String getCountNum(){
        Integer num = userService.getCountNum();
        HashMap<String,Object> map = new HashMap<>();
        map.put("count",num);
        return Ajax.success(map);
    }

    //获取用户的性别统计
    @PostMapping("/getSexInfo")
    public String getSexInfo(){
        Integer male = userService.getSexInfo("男");
        Integer female = userService.getSexInfo("女");
        HashMap<String,Object> map = new HashMap<>();
        map.put("male",male);
        map.put("female",female);
        return Ajax.success(map);
    }

    //获取历史记录，这里主要是用来计算分数
    @PostMapping("/getScoreInfo")
    public String getScoreInfo(){
        List<History> scores = userService.getScoreInfo();
        HashMap<String,Object> map = new HashMap<>();
        map.put("scores",scores);
        return Ajax.success(map);
    }

    //修改密码申请
    @PostMapping("/updatePsw")
    public String updatePsw(String oldpsw,String newpsw,HttpSession session){
        Admin admin = (Admin) session.getAttribute("user");
        String username = admin.getUserName();
        if (!admin.getPassword().equals(oldpsw)){
            return Ajax.error("旧密码验证错误，请重试");
        }
        boolean is = userService.updatePsw(newpsw,username);
        if (!is){
            return Ajax.error("修改失败，请刷新后重试");
        }
        admin = userService.backLogin(admin.getUserName());
        session.setAttribute("user",admin);
        return Ajax.success();
    }

}
