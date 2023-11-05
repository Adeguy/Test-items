import requests


class DataFormZephyrScale:
    def __init__(self, token):
        """
               初始化 DateFormZephyrScale 对象。

               参数：
               token -- Zephyr Scale API 的认证 token
               """
        self.bearer_token = token  # 初始化时传入实际的 bearer_token
        self.base_url = "https://api.zephyrscale.smartbear.com/v2"
        self.headers = {
            'Authorization': f'Bearer {self.bearer_token}',
            'Content-Type': 'application/json'
        }

    def data_form_zephyr_scale(self, case_key):
        """
               获取指定的测试案例 key 对应的测试步骤数据。

               参数：
               case_key -- 测试案例的 key

               返回值：
               测试步骤数据的 JSON 对象
        """
        url = f"{self.base_url}/testcases/{case_key}/teststeps"
        response1 = requests.get(url, headers=self.headers)
        return response1.json()['values'][0]['inline']['testData']

    def data_handling(self,lines):
        lines = lines.split("<br />")
        request_dict = {}

        # 逐行提取信息
        for line in lines:
            print(line)
            if "POST" in line:
                request_dict["method"] = "POST"
                continue
            if "http://" in line:
                request_dict["endpoint"] = line.split("127.0.0.1:5000")[-1]
                continue
            if "content-type:" in line:
                request_dict["head"] = line
                continue
            if "加密令牌" in line:
                request_dict["token"] = line
                continue
            if "状态码：" in line:
                key, value = line.split("：")
                request_dict[key] = value
                continue
        return request_dict

# 实现案例
# token = "XXXXX" #your actual token
# date_form = DateFormZephyrScale(token)
# print(date_form.date_form_zephyr_scale("HOR-T86"))
