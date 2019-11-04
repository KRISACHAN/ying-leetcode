var ListNode = /** @class */ (function () {
    function ListNode(value) {
        this.val = value;
        this.next = null;
    }
    return ListNode;
}());
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    var l3 = null;
    var cache = null;
    var tens = 0;
    while (l1 || l2) {
        var total = 0;
        if (l1) {
            var l1Head = l1.val;
            total += l1Head;
            l1 = l1.next;
        }
        if (l2) {
            var l2Head = l2.val;
            total += l2Head;
            l2 = l2.next;
        }
        total += tens;
        if (total >= 10) {
            total -= 10;
            tens = 1;
        }
        else {
            tens = 0;
        }
        var node = new ListNode(total);
        if (cache) {
            cache.next = node;
            cache = node;
        }
        else {
            l3 = node;
            cache = l3;
        }
    }
    if (tens === 1) {
        cache.next = new ListNode(1);
    }
    return l3;
};
