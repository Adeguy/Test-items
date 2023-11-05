from Horizon_framework import DataFormZephyrScale, Assertions, InterfaceTesting

# access_key、base_URL正常应该存环境变量，这里是演示
access_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb250ZXh0Ijp7ImJhc2VVcmwiOiJodHRwczovL3podW96aHVvLmF0bGFzc2lhbi5uZXQiLCJ1c2VyIjp7ImFjY291bnRJZCI6IjcxMjAyMDozNWQ1ZjU2ZC00ZDFhLTQ2YTUtYmM2YS02ZTZjYjk5M2JhN2YifX0sImlzcyI6ImNvbS5rYW5vYWgudGVzdC1tYW5hZ2VyIiwic3ViIjoiNGE1NWU2MzgtZDU2Mi0zOTg3LWE3MGYtMTc3N2RhYmU3Yzg3IiwiZXhwIjoxNzMwNzIwNTY0LCJpYXQiOjE2OTkxODQ1NjR9.6sVCEI4-78x6lGD5d9-ZvEHn4BeELKwovwfizgy5LUY'
base_URL = 'http://127.0.0.1:5000'
case_data = DataFormZephyrScale(access_key)  # 输入许可码
APItest = InterfaceTesting(base_URL)  # 输入根地址
# 从用例管理平台获取数据
data = case_data.data_form_zephyr_scale('HOR-T86')
# 对获得数据进行整理
data_handed = case_data.data_handling(data)
print(data_handed)
# 进行接口测试
response = APItest.send_post(endpoint=data_handed['endpoint'], header={data_handed["head"]}, data=data_handed['token'])
# 进行断言
Asser = Assertions(data_handed['状态码'])
print(Asser.is_equal(response.status_code))  # 这里返回的是true和false
