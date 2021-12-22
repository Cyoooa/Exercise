package com.wsq.exercise.controller;
import com.cjl.Ajax;
import com.wsq.exercise.pojo.Admin;
import com.wsq.exercise.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Enumeration;
import java.util.HashMap;

/**
 * @author
 * @version 1.0
 * @description
 * @date 2021/5/16 11:46
 */

@Controller
@ResponseBody
public class LoginController {
    @Resource
    private UserService userService;
    //登录操作
    @PostMapping("/doLogin")
    public String doLogin(String accName, String passWord, String code, HttpSession session, HttpServletRequest request) throws Exception {
        String captchaCode = (String) session.getAttribute("captcha");
        if (null == code || !code.equalsIgnoreCase(captchaCode)) {
            return Ajax.error("验证码错误");
        }
        if (null == accName || accName.trim().length() < 3) {
            return Ajax.error("请输入正确的用户名");
        }
        if (null == passWord || passWord.trim().length() < 3) {

            return Ajax.error("请输入正确的密码");
        }
        //大小写转换 统一大写
        accName = accName.toUpperCase();


        Admin admin = userService.backLogin(accName);
        if (null == admin || !admin.getPassword().equals(passWord) || admin.getRoleId() > 1) {
            return Ajax.error("用户名或密码错误，请重试");
        }


        //登录成功后将用户信息存储至session中
        session.setAttribute("acc", admin.getUserName());
        session.setAttribute("userId", admin.getUserId());
        session.setAttribute("user", admin);
        //测试session
        Enumeration e = session.getAttributeNames();
        while (e.hasMoreElements()) {
            String sessionName = (String) e.nextElement();
            System.out.println("\nsession item name=" + sessionName);
            System.out.println("\nsession item value=" + request.getSession().getAttribute(sessionName));
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("location" , "backIndex");
        //向前台发送登录成功的信息
        return Ajax.success(map);
    }

    //获取用户登录信息
    @PostMapping("/getLoginInfo")
    public String getLoginInfo(HttpSession session, HttpServletRequest request){
        Admin admin = (Admin) session.getAttribute("user");
        HashMap<String, Object> map = new HashMap<>();
        map.put("admin",admin);
        return Ajax.success(map);
    }


    //退出系统
    @PostMapping("/exit")
    public String exit(HttpSession session, HttpServletRequest request){
        //让session失效
        session.invalidate();
        try {
            Enumeration e = session.getAttributeNames();
            while (e.hasMoreElements()) {
                String sessionName = (String) e.nextElement();
                System.out.println("\nsession item name=" + sessionName);
                System.out.println("\nsession item value=" + request.getSession().getAttribute(sessionName));
            }
        }catch (IllegalStateException e){
            System.out.println("会话失效成功！");
        }finally {
            System.out.println("执行完成");
        }
        //测试session
        HashMap<String, Object> map = new HashMap<>();
        map.put("location" , "backLogin");
        return Ajax.success(map);
    }


    //注册
    @PostMapping("/doRegister")
    public String doRegister(String userName,String acc,String psw,String sex,String phone){
//        System.out.println(userName+acc+psw+sex+height+weight+goalType);
        //进入数据库判断是否存在该账号
        Admin isUser = userService.backLogin(acc);

        if (isUser !=null){
            return Ajax.error("该账号已存在，请重新输入！");
        }
        Admin user = new Admin(0,acc,psw,sex,phone,userName,1);
        boolean isReg = userService.reg(user);
        if (!isReg){
            return Ajax.error("注册失败，请刷新后再试！");
        }
        //注册成功提示
        return Ajax.success();
    }

}
