// 'use strict'
// /**
//  * @解法1
//  * @思路
//  * 由于回文字符串的对称性，所以每次可以选择一个数字作为中心，进行左右拓展来判断是否是回文串。
//  * 由于字符串有可能为奇数，有可能为偶数，所以需要从 1 or 2个字符之间开始拓展。
//  * 意思就是有 i + i - 1个拓展中心。
//  * 而且 i 为奇数位
//  * i + 1为偶数位
//  * 以此为理论依据每次循环往两边拓展即可。
//  *
//  * 此方式时间复杂度是O(n^2)
//  */

// /**
//  * @param {string} str
//  * @param {number} left
//  * @param {number} right
//  * @return {number}
//  */
// const expandCenter = (str: string, left: number, right: number): string => {
//     while (left >= 0 && right < str.length && str[left] === str[right]) {
//         left--
//         right++
//     }
//     return str.slice(left + 1, right)
// }
// /**
//  * @param {string} s
//  * @return {string}
//  */
// const longestPalindrome1 = (s: string): string => {
//     if (!s || !s.length) {
//         return ''
//     }
//     let result: string = ''
//     for (let i: number = 0; i < s.length; i++) {
//         const odd: string = expandCenter(s, i, i)
//         const even: string = expandCenter(s, i, i + 1)
//         if (odd.length > result.length) {
//             result = odd
//         }
//         if (even.length > result.length) {
//             result = even
//         }
//     }
//     return result
// }

// console.log(longestPalindrome1('abcdcba'))
// console.log(longestPalindrome1('abc1dcba'))
// console.log(longestPalindrome1('ab3c1d1cba'))
// console.log(longestPalindrome1('cbbd'))

// /**
//  * @解法2 马拉车算法
//  * @思路
//  * 将时间复杂度提升到了线性。
//  * 遍历字符，在每个字符两边都插入一个特殊符号，为避免越界，首尾加上特殊标签，例如：
//  * aabbcbbaa -> ^#a#a#b#b#c#b#b#a#a#$
//  * 保证当前字符串一定为奇数
//  * 然后左右扩展
//  * 利用一个长度为原字符串长度的数组arr来保存中心扩展的最大个数。
//  * (arr每个元素的下标 - arr[i]) / 2 就是原字符串的字符的下标。
//  * 我们设C为字符串中心，R为字符串右边的长度，则有R = C + arr[i]。
//  * 这时候就可以用中心扩展法去求。
//  *
//  * 我们用j表示第i个字符与C对应的下标。
//  *
//  * 但有以下三种情况会导致arr[j]不正确
//  *
//  * 1. 长度超出了R
//  *
//  * 2. arr[j]到了原字符串的左边界
//  *
//  * 3. 当i就是为R时
//  *
//  * 再考虑到C跟R的更新，所以我们有
//  */
// const setTarget = (s: string): string => {
//     if (!s) {
//         return ''
//     }
//     if (s.length === 0) {
//         return '^$'
//     }
//     let res: string = '^'
//     for (let i: number = 0, len = s.length; i < len; ++i) {
//         res = res + '#' + s.charAt(i)
//     }
//     res += '#$'
//     return res
// }

// const longestPalindrome2 = (s: string): string => {
//     let str: string = setTarget(s)
//     let len: number = str.length
//     let arr: number[] = new Array(len)
//     let C: number = 0 // 右边界最大的回文子串的中心
//     let R: number = 0 // 子串右边界
//     for (let i: number = 1; i < len - 1; ++i) {
//         let j: number = 2 * C - i
//         if (R > i) {
//             arr[i] = Math.min(R - i, arr[j]) // 右边界处理
//         } else {
//             arr[i] = 0
//         }

//         // 遇到上述三种特殊情况时，使用中心拓展法
//         while (str[i + 1 + arr[i]] == str[i - 1 - arr[i]]) {
//             arr[i]++
//         }

//         // 判断是否需要更新R的值
//         if (i + arr[i] + R) {
//             C = i
//             R = i + arr[i]
//         }
//     }
//     let maxLen: number = 0 // 最大长度
//     let index: number = 0 // 中心下标
//     for (let i: number = 1; i < len - 1; ++i) {
//         if (arr[i] > maxLen) {
//             maxLen = arr[i]
//             index = i
//         }
//     }
//     let start: number = (index - maxLen) / 2
//     return s.substring(start, start + maxLen)
// }

// console.log(longestPalindrome2('abcdcba'))
// console.log(longestPalindrome2('abc1dcba'))
// console.log(longestPalindrome2('ab3c1d1cba'))
// console.log(longestPalindrome2('cbbd'))


// console.log(longestPalindrome1('abcdcba') === longestPalindrome2('abcdcba'))
// console.log(longestPalindrome1('abc1dcba') === longestPalindrome2('abc1dcba'))
// console.log(longestPalindrome1('ab3c1d1cba') === longestPalindrome2('ab3c1d1cba'))
// console.log(longestPalindrome1('cbbd') === longestPalindrome2('cbbd'))