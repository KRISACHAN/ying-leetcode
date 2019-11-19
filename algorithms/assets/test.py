class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        """
        :type s: str
        :rtype: int
        """
        if len(s) <=1:
            return len(s)
        maxLen = 1
        record = 0
        for i in range(len(s)):
            index = s.index(s[i], record)
            if index < i:
                record = index + 1
            maxLen = max(maxLen, i - record + 1)
        return maxLen