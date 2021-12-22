package com.wsq.exercise.controller;
/**
 * @author wsq
 * @version 1.0
 * @description：页面控制器
 * @date 2021/5/16 11:38
 */
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BackPageController {
    //登录界面
    @GetMapping("/backLogin")
    public String backLogin(){
        return "back/backLogin";
    }

    //后台首页
    @GetMapping("/backIndex")
    public String backIndex(){
        return "back/backIndex";
    }

    //用户管理
    @GetMapping("/userManage")
    public String userManage(){
        return "back/userManage";
    }

    //欢迎界面
    @GetMapping("/welcome")
    public String welcome(){
        return "back/welcome";
    }

    //注册界面
    @GetMapping("/register")
    public String register(){
        return "back/register";
    }

    //历史记录
    @GetMapping("/historyManage")
    public String history(){
        return "back/history";
    }


    //练习中心
    @GetMapping("/exerciseCenter")
    public String exerciseCenter(){
        return "back/exerciseCenter";
    }

    //数据统计
    @GetMapping("/countManage")
    public String countManage(){
        return "back/countManage";
    }

    //个人中心
    @GetMapping("/personCenter")
    public String personCenter(){
        return "back/personCenter";
    }


}
