SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL UNIQUE,
  `password` varchar(45) DEFAULT NULL,
  `sex` varchar(5) DEFAULT '男',
  `phone` varchar(45) DEFAULT NULL,
	`nickname` varchar(45) DEFAULT NULL,
	`roleid` int ,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

-- 插入管理员信息
INSERT INTO user VALUES(null,'admin','123','男','13333333333','管理员',0);

-- 插入测试用户信息
INSERT INTO user VALUES(null,'a004','123','男','13313131313','小明',1);
INSERT INTO user VALUES(null,'a003','123','女','13344511331','小丽',1);



-- 做题历史
CREATE TABLE `HISTORY_INFO` (
  `historyid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45),
  `number` varchar(45),
  `score` double (16,2) ,
  `datetime` datetime,
  PRIMARY KEY (`historyid`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;