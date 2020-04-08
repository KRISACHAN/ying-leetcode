from typing import List
import math

def expandCenter(s: str, left: int, right: int) -> str:
    while left >= 0 and right < len(s) and s[left] == s[right]:
        left -= 1
        right += 1
    return s[left + 1: right]


def longestPalindrome1(s: str) -> str:
    if not(s) or not(len(s)):
        return ''
    result: str = ''
    for i in range(len(s)):
        odd: str = expandCenter(s, i, i)
        even: str = expandCenter(s, i, i + 1)
        if len(odd) > len(result):
            result = odd
        if len(even) > len(result):
            result = even
    return result

print(longestPalindrome1('abcdcba'))
print(longestPalindrome1('abc1dcba'))
print(longestPalindrome1('ab3c1d1cba'))
print(longestPalindrome1('cbbd'))

def setTarget(s: str) -> str:
    if not(s):
        return ''
    if (len(s) == 0):
        return '^$'
    res: str = '^'
    for i in range(len(s)):
        res += '#'
        res += s[i]
    res += '#$'
    return res


def longestPalindrome2(s: str) -> str:
    newStr: str = setTarget(s)
    l: int = len(newStr)
    arr = [0 for _ in range(l)]
    C: int = 0
    R: int = 0
    for i in range(l - 1):
        j: int = 2 * C - i
        if R > i:
            arr[i] = min(R - i, arr[j])
        else:
            arr[i] = 0
        while newStr[i + 1 + arr[i]] == newStr[i - 1 - arr[i]]:
            arr[i] += 1
        if i + arr[i] + R:
            C = i
            R = i + arr[i]
    maxLen: int = 0
    idx: int = 0
    for i in range(1, l - 1):
        if arr[i] > maxLen:
            maxLen = int(arr[i])
            idx = i
    start: int = int((idx - maxLen) / 2)
    return s[start:start + maxLen]

print(longestPalindrome2('abcdcba'))
print(longestPalindrome2('abc1dcba'))
print(longestPalindrome2('ab3c1d1cba'))
print(longestPalindrome2('cbbd'))

print(longestPalindrome1('abcdcba') == longestPalindrome2('abcdcba'))
print(longestPalindrome1('abc1dcba') == longestPalindrome2('abc1dcba'))
print(longestPalindrome1('ab3c1d1cba') == longestPalindrome2('ab3c1d1cba'))
print(longestPalindrome1('cbbd') == longestPalindrome2('cbbd'))
