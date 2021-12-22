package com.wsq.exercise.pojo;

import java.util.Date;

public class History {
    private Integer historyId;
    private String userName ;
    private Integer number;
    private Double score;
    private String datetime;

    public History() {
    }

    public History(Integer historyId, String userName, Integer number, Double score, String datetime) {
        this.historyId = historyId;
        this.userName = userName;
        this.number = number;
        this.score = score;
        this.datetime = datetime;
    }

    public Integer getHistoryId() {
        return historyId;
    }

    public void setHistoryId(Integer historyId) {
        this.historyId = historyId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public String getDatetime() {
        return datetime;
    }

    public void setDatetime(String datetime) {
        this.datetime = datetime;
    }
}
