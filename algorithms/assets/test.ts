class ListNode {
    val: number
    next: ListNode | any
    constructor(value: number) {
        this.val = value
        this.next = null
    }
}
 
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = (l1: ListNode, l2: ListNode) => {
    let l3: null | ListNode = null
    let cache: ListNode | null = null
    let tens: number = 0
    while (l1 || l2) {
        let total: number = 0
        if (l1) {
            let l1Head = l1.val
            total += l1Head
            l1 = l1.next
        }
        if (l2) {
            let l2Head = l2.val
            total += l2Head
            l2 = l2.next
        }
        total += tens
        if (total >= 10) {
            total -= 10
            tens = 1
        } else {
            tens = 0
        }
        let node = new ListNode(total)
        if (cache) {
            cache.next = node
            cache = node
        } else {
            l3 = node
            cache = l3
        }
    }
    if (tens === 1) {
        cache.next = new ListNode(1)
    }
    return l3
}