/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = (s: string): number => {
    let len: number = s.length
    if (len <= 1) {
        return len
    }
    let max: number = 1
    let record: number = 0
    for (let i: number = 0; i < len; ++i) {
        let index: number = s.indexOf(s[i], record)
        if (index < i) {
            record = index + 1
        }
        max = Math.max(max, i - record + 1)
    }
    return max
}