CREATE DATABASE IF NOT EXISTS answer;

use answer;

-- 用户表
CREATE TABLE users(
    id INT PRIMARY KEY auto_increment,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    avatar VARCHAR(100) NULL,
    gender bit NULL
);

-- 文章表
CREATE TABLE articles(
    id INT PRIMARY KEY auto_increment,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    time DATETIME NOT NULL,
    uid INT NOT NULL
);

-- 评论表
CREATE TABLE comments
(
  id INT PRIMARY KEY auto_increment,
  content TEXT NOT NULL,  -- 评论内容
  time DATETIME NOT NULL, -- 评论时间
  uid INT NOT NULL, -- 评论者
  aid INT NOT NULL -- 所属文章
);

