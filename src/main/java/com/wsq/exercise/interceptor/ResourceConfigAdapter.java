package com.wsq.exercise.interceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author
 * @version 1.0
 * @description
 * @date 2020/12/29 9:46
 */
@Configuration
public class ResourceConfigAdapter implements WebMvcConfigurer {


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/**")
                .excludePathPatterns("/backLogin")//排除登录页
                .excludePathPatterns("/doLogin")//排除验证账号和密码
                .excludePathPatterns("/register")//排除验证账号和密码
                .excludePathPatterns("/doRegister")//排除验证账号和密码
                .excludePathPatterns("/code")//排除验证码
                .excludePathPatterns("/file/img/**")//排除验证码
                .excludePathPatterns("/file/video/**")//排除验证码
                .excludePathPatterns("/file/doc/**")//排除验证码
                .excludePathPatterns("/erro")
                .excludePathPatterns("/static/**")
                .excludePathPatterns("/");//排除静态文件*/

    }
}
