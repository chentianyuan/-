// 93. 复原IP地址

// 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

// 有效的 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

// 例如："0.1.2.201" 和 "192.168.1.1" 是 有效的 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效的 IP 地址。

// 示例 1：

// 输入：s = "25525511135"
// 输出：["255.255.11.135", "255.255.111.35"]
// 示例 2：

// 输入：s = "0000"
// 输出：["0.0.0.0"]
// 示例 3：

// 输入：s = "1111"
// 输出：["1.1.1.1"]
// 示例 4：

// 输入：s = "010010"
// 输出：["0.10.0.10", "0.100.1.0"]
// 示例 5：

// 输入：s = "101023"
// 输出：["1.0.10.23", "1.0.102.3", "10.1.0.23", "10.10.2.3", "101.0.2.3"]

/**
 * @param {string} s
 * @return {string[]}
 */
function restoreIpAddresses(s: string): string[] {
  // 创建回溯函数
  const result: string[] = []
  const search = function (m: string, ipAddress: string, n: number) {
    // 已经截取了4段，且m为空了，则得到一个合法的ip地址
    if (n === 5 && !m) {
      result.push(ipAddress.slice(0, -1))
      return
    }
    // 剪枝0：剩余字符串已不够截取或者剩余字符串已经放不下
    let left = 5 - n
    if (m.length > left * 3 || m.length < left) return
    // 剪枝1：如果剩下的字符串小于3位，则只进行m.length位截取
    for (let i = 0; i < Math.min(3, m.length); i++) {
      let str = m.slice(0, i + 1)
      // 剪枝2：截取的字符串已经大于255
      if (Number(str) > 255) return
      // 剪枝3：以0开头的字符串并不能被截取
      if (String(+str).length !== str.length) return
      search(m.slice(i + 1), ipAddress + str + '.', n + 1)
    }
  }
  search(s, '', 1)
  return result
}

// 解题思路：
// 回溯思想，通过递归一一枚举，并通过剪枝减小程序消耗