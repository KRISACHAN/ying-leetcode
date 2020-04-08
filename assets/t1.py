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


nums1 = [1, 3]
nums2 = [2]

print(findMedianSortedArrays(nums1, nums2))
