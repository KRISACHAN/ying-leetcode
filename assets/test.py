from typing import List
def findMedian(start1: int, nums1: List[int], start2: int, nums2: List[int], half: int) -> float:
    """
    :type start1: int
    :type nums1: List[int]
    :type start2: int
    :type nums2: List[int]
    :type half: int
    :rtype: float
    """
    len1 = len(nums1)
    len2 = len(nums2)

    if start1 >= len1:
        return nums2[int(start2 + half - 1)]

    if start2 >= len2:
        return nums1[int(start1 + half - 1)]

    if half == 1:
        return min(nums1[start1], nums2[start2])

    halfVal1 = float('Infinity')
    halfVal2 = float('Infinity')

    if (start1 + int(half / 2) - 1) < len1:
        halfVal1 = nums1[start1 + int(half / 2) - 1]

    if (start2 + int(half / 2) - 1) < len2:
        halfVal2 = nums2[start2 + int(half / 2) - 1]


    if halfVal1 < halfVal2:
        return findMedian(start1 + int(half / 2), nums1, start2, nums2, half - int(half / 2))
    else:
        return findMedian(start1, nums1, start2 + int(half / 2), nums2, half - int(half / 2))

def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:
    """
    :type nums1: List[int]
    :type nums2: List[int]
    :rtype: float
    """
    len1 = len(nums1)
    len2 = len(nums2)
    totalLen = len1 + len2
    if totalLen % 2 == 1:
        return findMedian(0, nums1, 0, nums2, (totalLen + 1) / 2)
    else:
        return (findMedian(0, nums1, 0, nums2, totalLen / 2) + findMedian(0, nums1, 0, nums2, totalLen / 2 + 1)) / 2


nums1 = [1.0, 2.0]
nums2 = [2.0]
print(findMedianSortedArrays(nums1, nums2)) # 2.0

nums3 = [1.0, 2.0]
nums4 = [3.0, 4.0]
print(findMedianSortedArrays(nums3, nums4)) # (2 + 3)/2 = 2.5

nums5 = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0]
nums6 = [7.0, 8.0, 9.0, 10.0, 11.0, 12.0]
print(findMedianSortedArrays(nums5, nums6)) # (6 + 7)/2 = 6.5

nums7 = []
nums8 = [1.0]
print(findMedianSortedArrays(nums7, nums8)) # 1.0

nums9 = []
nums10 = [2.0, 3.0]
print(findMedianSortedArrays(nums9, nums10)) # 2.5

nums11 = [2.0, 3.0]
nums12 = []
print(findMedianSortedArrays(nums11, nums12)) # 2.5

nums13 = [3.0]
nums14 = [-2.0, -1.0]
print(findMedianSortedArrays(nums13, nums14)) # -1

nums15 = [1.0, 3.0]
nums16 = [2.0]
print(findMedianSortedArrays(nums15, nums16)) # 2