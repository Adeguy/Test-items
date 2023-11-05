import time

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
# 创建实例对象,相当于调用这个driver，记得引入系统环境变量（webdriver的路径）

users=["adder","awd_er","aawdder","123_123",'awd_123',"awd","awd_123123311","23112",'______']
passwords=["123wxg123","123wxg123","123wxg123","123wxg123","123wxg123","123wxg123","123wxg123","123wxg123",'']
for user,password in zip(users,passwords):
  wd = webdriver.Edge()
  wd.implicitly_wait(10)
  wd.get('http://localhost:3001/')
  wd.find_element(By.CSS_SELECTOR,'input[placeholder*="U"]').send_keys(user)
  wd.find_element(By.CSS_SELECTOR,'input[type*="p"]').send_keys(password)
  wd.find_element(By.XPATH,"//button[@type='submit'][1]").click()
  time.sleep(2)
  wd.quit()
