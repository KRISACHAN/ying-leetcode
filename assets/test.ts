/**
 * @func
 * @name findMedian
 * @desc 使用二分法来获取中位数
 * @param {number} start1 第一个数组需要查找的起始位置
 * @param {number[]} nums1 传入的第一个数组
 * @param {number} start2 第二个数组需要查找的起始位置
 * @param {number[]} nums2 传入的第二个数组
 * @param {number} half nums1与nums2的长度中间值
 * @return {number} nums1与nums2的中位数
 */
const findMedian = (start1: number, nums1: number[], start2: number, nums2: number[], half: number): number => {
    const [{ length: len1 }, { length: len2 }] = [nums1, nums2]
    // 下面两个if主要是对空数组的判断，如果是有一个是空数组，则输出另一个数组的中位数
    if (start1 >= len1) {
        return nums2[start2 + half - 1]
    }
    if (start2 >= len2) {
        return nums1[start1 + half - 1]
    }
    if (half === 1) { // 此时两个数组总长度的一半就是等于1，说明两个数组就只有一个值，那么就哪个小输出哪个
        return Math.min(nums1[start1], nums2[start2])
    }
    // 下面的不变量定义主要是为了查找是否有中间值，如果没有就赋值为Infinity，否则则赋值为这个中间值
    const halfVal1 = (start1 + parseInt(half / 2) - 1 < len1
                        ? nums1[start1 + parseInt(half / 2) - 1]
                        : Infinity)
    const halfVal2 = (start2 + parseInt(half / 2) - 1 < len2
                        ? nums2[start2 + parseInt(half / 2) - 1] 
                        : Infinity)
    // 这里是二分法的核心，判断两个数组中间值的大小，如果nums1的(half / 2)比较小的话，就说明我们找的数字不在nums1的前(half / 2)数字之中，所以我们nums1就往后移动(half / 2)。反之就是nums2往后移动(half / 2)。一直用二分法递归对比没有判断过的数，从而得到结果值。
    return (halfVal1 < halfVal2
                ? findMedian(start1 + parseInt(half / 2), nums1, start2, nums2, half - parseInt(half / 2))
                : findMedian(start1, nums1, start2 + parseInt(half / 2), nums2, half - parseInt(half / 2)));
}

/**
 * @func
 * @name findMedianSortedArrays
 * @desc 寻找两个有序数组的中位数
 * @param {number[]} nums1 传入的第一个数组
 * @param {number[]} nums2 传入的第二个数组
 * @return {number} 中位数
 */
const findMedianSortedArrays = (nums1: number, nums2: number): number => {
    const [{ length: len1 }, { length: len2 }] = [nums1, nums2]
    const totalLen = len1 + len2 // 两个数组的总长度
    return (totalLen % 2 === 1
                ? findMedian(0, nums1, 0, nums2, (totalLen + 1) / 2) // 总长度为奇数时
                : (findMedian(0, nums1, 0, nums2, totalLen / 2) + findMedian(0, nums1, 0, nums2, totalLen / 2 + 1)) / 2) // 总长度为偶数时
}

/**
 * @func
 * @name findMedianSortedArrays2
 * @desc 寻找两个有序数组的中位数
 * @param {number[]} nums1 传入的第一个数组
 * @param {number[]} nums2 传入的第二个数组
 * @return {number} 中位数
 */
const findMedianSortedArrays2 = (nums1: number[], nums2: number[]): number => {
    let len1: number = nums1.length
    let len2: number = nums2.length

    // 下面交换法主要是为了统一一个方向，方便迭代
    if (len1 > len2) {
        let lenTemp: number = len1
        let numsTemp: number[] = nums1
        len1 = len2
        len2 = lenTemp
        nums1 = nums2
        nums2 = numsTemp
    }

    let left: number = 0 // 左边开始的位置
    let right: number = len1 // 右边开始的位置
    let mid: number = Math.floor((len1 + len2 + 1) / 2) // 中间位置

    // 二分法 迭代模式
    while (left <= right) {
        let i: number = Math.floor((left + right) / 2) // 左边遍历到的位置
        let j: number = Math.floor(mid - i) // 右边遍历到的位置
        if (i < len1 && nums2[j - 1] > nums1[i]) { // 如果当前左边遍历的位置还没到数组1的长度，并且数组二遍历到的元素是比数组已的元素大的，那么这该时候就说明i还太小，需要+1
            left = i + 1
        } else if (i > 0 && nums1[i - 1] > nums2[j]) { // 如上，相反的逻辑 - 1
            right = i - 1
        } else {
            let maxLeft: number
            let maxRight: number
            // 下面一层二层的判断是为了处理当有一个数组长度为0时的情况
            if (i === 0) {
                maxLeft = nums2[j - 1]
            } else if (j === 0) {
                maxLeft = nums1[i - 1]
            } else { // 此时则是获取当前遍历到的两个数组对比的最大值
                maxLeft = Math.max(nums1[i - 1], nums2[j - 1])
            }
            if ((len1 + len2) % 2 === 1) { // 如果两个数组的长度为奇数，可以直接输出最大值
                return maxLeft
            }
            // 下面则是判断数组长度加起来为偶数时的情况
            if (i === len1) { // 当i已经遍历完时，则右边中间值为第二个数组当前遍历的值
                maxRight = nums2[j]
            } else if (j === len2) { // 与上相反
                maxRight = nums1[i]
            } else { // 获取当前遍历到的值中的最大值
                maxRight = Math.min(nums1[i], nums2[j])
            }
            // 最终的值为left right两边中间值的一半
            return (maxLeft + maxRight) / 2
        }
    }
}