import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

wd = webdriver.Edge()
wd.implicitly_wait(10)
wd.get('http://localhost:3001/')
# 登录
wd.find_element(By.CSS_SELECTOR, 'input[placeholder*="U"]').send_keys('awd_123')
wd.find_element(By.CSS_SELECTOR, 'input[type*="p"]').send_keys("123wxg1372")
wd.find_element(By.XPATH, "//button[@type='submit'][1]").click()
login_handle = wd.current_window_handle
for window_handle in wd.window_handles:
    if window_handle != wd.current_window_handle:
        wd.switch_to.window(window_handle)
        break
todo_handle = wd.current_window_handle
wd.find_element(By.CSS_SELECTOR, 'a[href="/"]').click()
wd.switch_to.window(login_handle)
# 登录
wd.find_element(By.CSS_SELECTOR, 'input[placeholder*="U"]').send_keys('awd_123')
wd.find_element(By.CSS_SELECTOR, 'input[type*="p"]').send_keys("123wxg1372")
wd.find_element(By.XPATH, "//button[@type='submit'][1]").click()
wd.switch_to.window(todo_handle)
# 添加事件
wd.find_element(By.CSS_SELECTOR, "div[class='container1']>div>button").click()
wd.find_element(By.CSS_SELECTOR, 'input[placeholder="Select date"]').click()
wd.find_element(By.XPATH, "//td[@title='2023-11-02']/div[text()='2']").click()
wd.find_element(By.XPATH, '//input[@autocomplete="off"][@role="combobox"][@aria-owns="rc_select_2_list"]/../..').click()
wd.find_element(By.XPATH, "//div[text()='高']").click()
wd.find_element(By.CSS_SELECTOR, "input[placeholder='输入待办事项']").send_keys("wxgwxg1")
wd.find_element(By.XPATH, "//span[text()='OK']/..").click()
# 点击月份
wd.find_element(By.CSS_SELECTOR, "label[class='ant-radio-button-wrapper css-dev-only-do-not-override-xu9wm8']").click()
wd.find_element(By.CSS_SELECTOR, "label[class='ant-radio-button-wrapper css-dev-only-do-not-override-xu9wm8']").click()
# 切换月份并添加事件
wd.find_element(By.XPATH,
                '//div[@class="ant-select ant-picker-calendar-year-select css-dev-only-do-not-override-xu9wm8 ant-select-single ant-select-show-arrow"]/div[@class="ant-select-selector"]').click()
wd.find_element(By.XPATH, "//div[text()=2021]").click()
wd.find_element(By.XPATH, "//span[text()='Nov']").click()
wd.find_element(By.XPATH, "//div[text()='Jun']").click()
# 添加事件
wd.find_element(By.CSS_SELECTOR, "div[class='container1']>div>button").click()
wd.find_element(By.CSS_SELECTOR, 'input[placeholder="Select date"]').click()
wd.find_element(By.XPATH, "//td[@title='2021-06-01']/div[text()='1']").click()
wd.find_element(By.XPATH, '//input[@autocomplete="off"][@role="combobox"][@aria-owns="rc_select_2_list"]/../..').click()
wd.find_element(By.XPATH, "//div[text()='中']").click()
wd.find_element(By.CSS_SELECTOR, "input[placeholder='输入待办事项']").send_keys("wxgwxg2")
wd.find_element(By.XPATH, "//span[text()='OK']/..").click()
# 点击日期后直接输入日期
wd.find_element(By.XPATH, "//td[@title='2021-06-02']/div/div/following-sibling::div")
wd.find_element(By.CSS_SELECTOR, "div[class='container1']>div>button").click()
wd.find_element(By.XPATH, '//input[@autocomplete="off"][@role="combobox"][@aria-owns="rc_select_2_list"]/../..').click()
wd.find_element(By.XPATH, "//div[text()='低']").click()
wd.find_element(By.CSS_SELECTOR, "input[placeholder='输入待办事项']").send_keys("wxgwxg3")
wd.find_element(By.XPATH, "//span[text()='OK']/..").click()
# 删除
time.sleep(1)
wd.find_element(By.CSS_SELECTOR,
                "button[class='ant-btn css-dev-only-do-not-override-xu9wm8 ant-btn-link delete']").click()
wd.quit()