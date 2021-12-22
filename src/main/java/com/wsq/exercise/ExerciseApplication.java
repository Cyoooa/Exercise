/**
 * 主类，启动程序
 */
package com.wsq.exercise;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

/**
 * @author wsq
 */
@SpringBootApplication
@MapperScan("com.wsq.exercise.dao")
@ServletComponentScan
public class ExerciseApplication {
    public static void main(String[] args) {
        SpringApplication.run(ExerciseApplication.class, args);
    }
}
