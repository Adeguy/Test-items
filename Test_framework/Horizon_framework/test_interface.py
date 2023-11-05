import requests
class InterfaceTesting:

    def __init__(self, base_url):
        self.base_url = base_url

    def send_post(self, endpoint, params=None,header=None, data=None):
        """
        发送 POST 请求。

        参数:
        endpoint -- API endpoint（不包括基本 URL)
        params -- 查询参数（字典）
        data -- 请求数据（JSON 字符串或字典）
        """
        url = f"{self.base_url}/{endpoint}"
        response = requests.post(url, params=params, headers=header, json=data)
        return response

    def send_get(self, endpoint,header=None, params=None):
        """
        发送 GET 请求。

        参数:
        endpoint -- API endpoint（不包括基本 URL）
        params -- 查询参数（字典）
        """
        url = f"{self.base_url}/{endpoint}"
        response = requests.get(url, params=params, headers=header)
        return response
