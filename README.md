# cron admin (前端部分)
------------

一个定时任务后台管理器，基于Go语言和gin框架开发。用于统一管理项目中的定时任务，提供可视化配置界面、执行日志记录、邮件通知等功能，无需依赖*unix下的crontab服务。

## 项目背景
无

## 功能特点

* 统一管理多种定时任务。
* 秒级定时器，使用crontab的时间表达式。
* 可随时暂停任务。
* 记录每次任务的执行结果。
* 执行结果邮件通知。


## 安装说明
获取源码

	$ git clone https://github.com/ntuwang/react_cron
运行

	$npm i 
	$npm run start
	

http://localhost:8080

帐号：admin
密码：123456