class Assertions :
    def __init__(self, case_data):
        self.case_data = case_data

    def is_equal(self, expected_status):
        actual_status = self.case_data['status']
        return actual_status == expected_status

    def is_contain(self, expected_content):
        return expected_content in self.case_data['content']