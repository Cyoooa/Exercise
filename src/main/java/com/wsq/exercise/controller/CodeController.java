package com.wsq.exercise.controller;

import com.cjl.Captcha;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;

/**
 * @author wsq
 * @version 1.0
 * @description：验证码控制器
 * @date 2021/5/16 11:39
 */
@Controller
public class CodeController {
    @GetMapping("/code")
    public void getCode(HttpServletRequest req, HttpServletResponse resp, HttpSession session) throws IOException {
        // <img src="" /> get请求
        Captcha captcha = new Captcha(200,40,6);
        BufferedImage img = captcha.getImage();
        //拿到验证码的字符串，存到session
        session.setAttribute("captcha" , captcha.getCode());
        System.out.println("验证码为："+captcha.getCode());
        OutputStream os = resp.getOutputStream();
        //声明返回的类型
        resp.setContentType("image/png");
        ImageIO.write(img , "png" , os);
    }
}
