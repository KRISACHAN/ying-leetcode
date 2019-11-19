/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = s => {
    let len = s.length
    if (len <= 1) {
        return len
    }
    let max = 1
    let record = 0
    for (let i = 0; i < len; ++i) {
        let index = s.indexOf(s[i], record)
        if (index < i) {
            record = index + 1
        }
        max = Math.max(max, i - record + 1)
    }
    return max
}