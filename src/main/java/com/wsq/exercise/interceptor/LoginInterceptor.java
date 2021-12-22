package com.wsq.exercise.interceptor;


import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

//拦截器
public class LoginInterceptor implements HandlerInterceptor , WebMvcConfigurer {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();
        if(session.getAttribute("user")==null) {
            response.sendRedirect("/backLogin");
            return false;
        }
        boolean is = false ;
        if(session.getAttribute("user")!=null) {
            if(request.getMethod().equals("GET")){
                is=true;
            }
            if(request.getMethod().equals("POST")){
                is=true;
            }
            if(is==false){
                response.sendRedirect("/erro");
                return false;
            }
        }
        return  true;
    }



}
