

## 1. 基本配置

1. 设置用户信息

   ~~~
   git config --global user.name "guangyin"
   git config --global user.email "2899173331@qq.com"
   ~~~

2. 查看配置信息

   ~~~
   git config --global user.name
   git config --global user.email
   ~~~

3. 在用户目录中创建.bashrc文件

4. 输入以下内容

~~~
# 用于输出git提交日志
alias git-log='git log --pretty=oneline --all --graph --abbrev-commit'
# 用于输出当前目录所有文件信息
alias ll='ls -al'
~~~



## 2. 配置远程仓库

1. 配置SSH公钥

   * ~~~git
     ssh-keygen -t rsa
     ~~~

   * 不断回车，如果公钥已经存在，则自动覆盖
   
2. 获取公钥

   * ~~~
     cat ~/.ssh/id_rsa.pub
     ~~~

3. 在码云的ssh公钥中加入公钥

4. 验证是否配置成功

   * ~~~
     ssh -T git@gitee.com
     ~~~

5. 添加远程仓库

   1. 从码云创建的仓库中复制的ssh链接

   2. 输入代码(先git init)

      * ~~~
        git remote add origin 链接
        ~~~

   3. 查看远程仓库

      * ~~~
        git remote
        ~~~

   4. 首次提交远程仓库

      * ~~~
        git push origin master
        ~~~

   5. 绑定分支对应关系

      * ~~~
        git push --set-upstream origin master:master
        ~~~

   6. git push 即可

6. 首次连接远端仓库

   * ~~~
     git pull origin master
     ~~~

## 3.解决nodejs不能访问数据库的问题

~~~sql
show databases ;
create database hkzf;
select user, plugin from mysql.user;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
FLUSH PRIVILEGES;
~~~

