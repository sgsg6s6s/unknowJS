console.info('---------------模拟演示---------------')


function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = function (l1, l2) {
  let head
  let outer
  if (l1.val < l2.val) {
    head = l1
    outer = l2
  } else {
    head = l2 // 134
    outer = l1  //124
  }
  let inner = head // 134
  while (outer) {// 目前inner比outer小 4
    if (inner.next) {
      while (inner.next) { // 3(*)  4 
        const next = inner.next // 备份下属 4
        if (next.val > outer.next) { // 空投领导
          inner.next = outer // 给offer，一个空职位 1(*) 2 3 4 
          outer = outer.next // 离职，老雇主重新规划组织 4
          inner = inner.next // 成为包工头 1 2(*)  
          inner.next = next // 带团队       1 2(*) 3 4           
          break;
        } else if (next) {// 4
          inner = next // 4(*)
        }
      }
    } else {// inner连接outer就结束了
      inner.next = outer
      break;
    }
  }


  return head
};


mergeTwoLists(new ListNode(1, new ListNode(2, new ListNode(4, null))), new ListNode(1, new ListNode(3, new ListNode(4, null))))


console.info('---------------模拟演示---------------')