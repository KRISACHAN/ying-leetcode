# 1. 两数之和
> 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
>
> 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
>
> 给定 nums = [2, 7, 11, 15], target = 9
>
> 因为 nums[0] + nums[1] = 2 + 7 = 9
> 所以返回 [0, 1]

## 解题思路
看到题目第一时间想到的就是冒泡，但是既然是正经刷LeetCode，写个冒泡就有点尴尬了，那么有没有时间复杂度低一点的计算方式呢？想了一下就选择了HASH的方式，思路就是定义一个保存数据的对象，然后循环查询数组，然后要做的一点当然就是将当前循环到的数字当成键，地址当成值，插入对象中，然后计算当前目标结果与当前数字的差，再判断这个差是不是已经在对象里，如果在，就说明这两个就是结果，遂输出，不然就继续循环。


## JS版

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
    const obj = {}
    for (let i = 0, len = nums.length; i < len; ++i) {
		const data = nums[i]
        const res = target - data
        if (res in obj) {
            return [obj[res], i]
        }
        obj[data] = i
    }
}
```

## PY版

```python
class Solution:
    """
    Args:
    	nums: List[int]
    	target: int
    Returns:
    	返回结果是一个[int, int]或者None
    """
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        obj = {}
        for i, data in enumerate(nums):
            res = target - data
            if res in obj:
                return [obj[res], i]
            obj[data] = i
        
```

