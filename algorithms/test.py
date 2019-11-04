# Definition for singly-linked list.
class ListNode:
  def __init__(self, x):
    self.val = x
    self.next = None

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        l3 = None
        cache = 0
        tens = 0
        while l1 or l2:
            total = 0
            if l1:
                l1Head = l1.val
                total = total + l1Head
                l1 = l1.next
            if l2:
                l1Head = l2.val
                total = total + l1Head
                l2 = l2.next
            total = total + tens
            if total >= 10:
                total = total - 10
                tens = 1
            else:
                tens = 0
            node = ListNode(total)
            if cache:
                cache.next = node
                cache = node
            else:
                l3 = node
                cache = l3
        if tens == 1:
            cache.next = ListNode(1)
        return l3