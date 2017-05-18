<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}

#include <iostream>
#include <cassert>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <set>
#include <stack>
#include <queue>

using namespace std;



//思考题:n < 0
double pow(double x, int n){
    assert( n >= 0);

    if(n == 0)
        return 1.0;

    double t = pow(x, n/2);
    if( n%2)
        return x*t*t;

    return t*t;
}

int f(int n){
    assert( n >= 0);
    if( n == 0)
        return 1;

    return f(n-1) + f(n-1);
}
// 计算调用次数
// 画一颗递归树
// O(2^n) 指数级的算法

template<typename T>
int binarySearch(T arr[], int n, T target){

    int l = 0, r = n - 1; //在[l, r]的范围内寻找target
    while( l <= r){ // 当 l == r时,区间[l, r]依然有效
        int mid = l + (r-l)/2; //避免整型溢出
        if(arr[mid] == target)
            return mid;
        else if(target > arr[mid])
            l = mid + 1; // target在[mid+1, r]中
        else
            r = mid - 1; // target在[l, mid-1]中
    }

}

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL){}
};

struct TreeNode{
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

struct Command{
    string s; //go, print
    TreeNode* node;
    Command(string s, TreeNode* node): s(s), node(node){}
};

class Solution {
public:

    //283.Move Zeroes
    //给定一个数组nums,写一个函数把所有第0移到数组第末尾并保持其它fei0元素第相对位置
    //例如nums = [0,1,0,3,12],after calling your function, nums should be [1,2,12,0,0]


    // 时间复杂度: O(n)
    // 空间复杂度: O(n)
    // 如何优化你的算法,能不能做得更好
void moveZeroes(vector<int> &nums) {

vector<int> nonZeroElements;

for (int i = 0; i < nums.size(); i++)
if (nums[i])
nonZeroElements.push_back(nums[i]);

for (int i = 0; i < nonZeroElements.size(); i++)
nums[i] = nonZeroElements[i];

for (int i = nonZeroElements.size(); i < nums.size(); i++)
nums[i] = 0;
}

    // 时间复杂度: O(n)
    // 空间复杂度: O(1)
    void moveZeroes2(vector<int> &nums) {

    int k = 0; //nums中,[0, k)的元素均为非0元素

        //遍历到第i个元素后,保证[0,i]中所有非0元素
        // 都按照顺序排列到[0,k)中
        for (int i = 0; i < nums.size(); i++)
            if (nums[i])
                nums[k++] = nums[i];

        // 将nums剩余位置放0
        for (int i = k; i < nums.size(); i++)
            nums[i] = 0;

    }

    void moveZeroes3(vector<int> &nums) {
    int k = 0;

        for (int i = 0; i < nums.size(); i++)
            if (nums[i])
                if (i != k)
                    swap(nums[k++], nums[i]);
                else
                    k++;

    }

    //给定一个有n个元素的数组,数组中元素的取值只有0,1,2三种可能.为这个数组排序 75 Sort Colors
// -可以使用任意一种排序算法
// -没有使用上题中给出的特殊条件
// -没有思路就使用暴力解法

// 计数排序:适用元素个数有序的情况

    //时间:O(n)
    //空间:O(1)
    void sortColors(vector<int> &nums) {
    int count[3] = {0}; //存放0,1,2三个元素的频率
        for (int i = 0; i < nums.size(); i++) {
        assert(nums[i] >= 0 && nums[i] <= 2);
        count[nums[i]]++; //注意数组越界的问题
    }

        int index = 0;
        for (int i = 0; i < count[0]; i++)
            nums[index++] = 0;
        for (int i = 0; i < count[1]; i++)
            nums[index++] = 1;
        for (int i = 0; i < count[2]; i++)
            nums[index++] = 2;
    }

    //时间:O(n)
    //空间:O(1)
    // 遍历一遍
    void sortColors2(vector<int> &nums) {

    int zero = -1; //nums[0, zero] == 0;
        int two = nums.size();   // nums[two, n-1] == 2;
        for (int i = 0; i < two;) {
        if (nums[i] == 1)
            i++;
        else if (nums[i] == 2) {
            swap(nums[i], nums[--two]);
        } else {
            assert(nums[i] == 0);
            swap(nums[++zero], nums[i++]);
        }

    }

    }

    //88 Merge Sorted Array
    //给定两个有序数组nums1, nums2,将nums2的元素归并到nums1中

    //215
    // 在一个整数序列中寻找第k大的元素
    //- 如给定数组[3,2,1,5,6,4],k=2, 结果为5

    //利用快排partition中,将pivot放置在了其正确位置上第性质


    //167 Two Sum II - Input array is sorted
    //给定一个有序整型数组和一个整数target,在其中寻找两个元素,使其和为target.返回这两个数的索引.
    //-如nunbers=[2,7,11,15],target = 9
    //-返回数字2,7的索引为1,2(索引从1开始计算)

    //最直接的思考:暴力解法.双层遍历O(n^2)
    //有序? 二分搜索
    //对撞指针

    //时间复杂度 O(n)
    //空间复杂度 O(1)
    vector<int> twoSum(vector<int> &numbers, int target) {

    assert(numbers.size() >= 2);
    int l = 0, r = numbers.size() - 1;
        while (l < r) {
            if (numbers[l] + numbers[r] == target) {
                int res[2] = {l + 1, r + 1};
                return vector<int>(res, res + 2);
            } else if (numbers[l] + numbers[r] < target)
                l++;
            else
                r--;
        }

        throw invalid_argument("The input has no solution.");
    }

    //125 Valid Palindrome 回文串
    //给定一个字符串,只看其中的数字和字母,忽略大小写,判断这个字符串是否为回文串?
    // "A man , a plan, a canal;Panama" - 是回文串
    // "race a car" - 不是回文串

    //344 给定一个字符串,返回这个字符串的倒序字符串.
    //-如hello,返回olleh
    //类似:翻转一个数组

    //345 给定一个字符串,将该字符串中的元音字母翻转
    //-如:给出"hello",返回"holle"
    //给出leetcode 返回 leotcede

    // 11 Container With Most Water
    // 给出一个非负整数数组a1,a2,a3,...,an;每一个整数表示一个竖立在坐标轴x位置的一堵高墙
    // 为ai的墙,选择两堵墙,和x轴构成的容器可以容纳最多的水



    //滑动窗口 209 Minimum Size Subarray Sum
    //给定一个整型数组和一个数字s,找到数组中最短的一个连续子数组,使得连续子数组的数字和sum >= s,返回这个
    //最短连续子数组的长度值
    //-如,给定数组[2, 3, 1, 2, 4, 3], s = 7
    //-答案为[4, 3],返回2

    //暴力解:遍历所有的连续字数组[i...j]
    //计算其和sum,验证sum >= s
    //时间复杂度O(n^3)
    int minSubArrayLen(int s, vector<int> &nums) {

    int l = 0, r = -1; //nums[l,r]为我们滑动窗口
        int sum = 0;
        int res = nums.size() + 1;

        while (l < nums.size()) {

            if (r + 1 < nums.size() && sum < s)
                sum += nums[++r];
            else
                sum -= nums[l++];

            if (sum >= s)
                res = min(res, r - l + 1);

        }

        if (res == nums.size() + 1)
            return 0;
        return res;

    }

    //3 在一个字符串中寻找没有重复字母的最长子串
    //-如"abcabcbb",则结果为"abc"
    // 如bbbbb,则结果为b
    // ru

    int lengthOfLongestSubstring(string s) {

    int freq[256] = {0};
        int l = 0, r = -1; //滑动窗口为s[l...r]
        int res = 0;

        while (l < s.size()) {

            if (r + 1 < s.size() && freq[s[r + 1]] == 0) {
                r++;
                freq[s[r]]++;
            } else {
                freq[s[l++]]--;
            }

            res = max(res, r - l + 1);
        }

        return res;

    }

    //438 Find All Anagrams in a String

    //给定一个字符串s和一个非空字符串p,找出p中的所有是s的anagrams的字符串,返回这些子串的起始索引
    //- 如 s = "cbaebabace" p = "abc", 返回[0,6]
    //- 如 s = "abab" p = "ba", 返回[0, 1, 2]


    //76 Minimum Window Substring
    //给定一个字符串S和T,在S中寻找最短的子串,包含T中的所有字符
    //-如S = "SDOBECODEBANC";T="ABC"
    //-结果为"BANG"


    //349 Intersection of Two Arrays
    //给定两个数组nums, 求两个数组的公共元素.


    //Valid Anagram
    //202 Happy Number
    //290 Word Pattern
    //205 Isomorphic Strings

    //451 practice Sort Characters By Frequency


    //1. Two Sum
    //给出一个整型数组nums.返回这个数组中两个数字的索引值i和j,使得nums[i] + nums[j]等于一个给定的target值.索引不相等
    //暴力解法:O(n^2)
    //

    //时间:O(n)
    //空间:O(n)
    vector<int> twoSum2(vector<int> &nums, int target) {

    unordered_map<int, int> record;
        for (int i = 0; i < nums.size(); i++) {

        int complement = target - nums[i];
            if (record.find(complement) != record.end()) {
                int res[2] = {i, record[complement]};
                return vector<int>(res, res + 2);
            }

            record[nums[i]] = i;
        }

        throw invalid_argument("the input has no solution");
    }

    //practice 3Sum 15
    //18 4sum


    // 454 4Sum II
    //给出四个整形数组A,B,C,D,寻找有多少i,j,k的组合,使得 A[i] + B[j] + C[k] + D[l] == 0
    //其中,A,B,C,D中均含有相同的元素个数N,且0<=N<=500
    //
    //时间O(n^2)
    //空间O(n^2)

    int fourSumCount(vector<int> &A, vector<int> &B, vector<int> &C, vector<int> &D) {

    unordered_map<int, int> record;
        for (int i = 0; i < C.size(); i++)
            for (int j = 0; j < D.size(); j++)
                record[C[i] + D[j]]++;
        int res = 0;
        for (int i = 0; i < A.size(); i++)
            for (int j = 0; j < B.size(); j++)
                if (record.find(0 - A[i] - B[j]) != record.end())
                    res += record[0 - A[i] - B[j]];

        return res;
    }

    //49 Group Anagrams


    //447 Number of Boomeranges
    //给出一个平面上的n个点,寻找存在多少个由这些点构成的三元组(i,j,k),使得i,j两点的距离等于i,k两点的距离.其中n最多为500,且所有点的
    //坐标范围在[-10000, 10000]之间.
    //-如[[0,0] , [1, 0], [2,0]],则结果为2
    //-两个结果为[[1,0],[0,0],[2,0]]和[[1,0],[2,0],[0,0]]

    //暴力解法:O(n^3)


    //时间: O(n^2)
    //空间: O(n)
    int numberOfboomeranges(vector<pair<int, int>> &points) {

    int res = 0;
        for (int i = 0; i < points.size(); i++) {

        unordered_map<int, int> record;
            for (int j = 0; j < points.size(); j++)
                if (j != i)
                    record[dis(points[i], points[j])]++;

            for (unordered_map<int, int>::iterator iter = record.begin(); iter != record.end(); iter++) {
            if (iter->second >= 2)
                    res += (iter->second) * (iter->second - 1);
            }
        }

        return res;
    }

    int dis(const pair<int, int> &pa, const pair<int, int> &pb) {
    return (pa.first - pb.first) * (pa.first - pb.first) +
    (pa.second - pb.second) * (pa.second - pb.second);
}

    // 149 Max Points on a Line

    //219 Contains Duplicate II
    //给出一个整形数组nums和一个整数k,是否存在索引i和j,使得nums[i] == nums[j]且i和j之和不超过k
    //暴力解法: O(n^2)
    //

    //时间:O(n)
    //空间:O(k)
    bool containsNearbyDuplicate(vector<int> &nums, int k) {

    unordered_set<int> record;
        for (int i = 0; i < nums.size(); i++) {

        if (record.find(nums[i]) != record.end())
            return true;

        record.insert(nums[i]);

        // 保持record中最多有k个元素
        if (record.size() == k + 1)
            record.erase(nums[i - k]);
    }

        return false;

    }

    //practice 217 Contains Duplicate

    //给出一个整形数组nums,是否存在索引i和j,使得nums[i]和nums[j]之间的差别不超过给定的整数t,且i和j之间的差别不超过给定的整数k
    //
    //

    // 时间复杂度: O(nlogn)
    // 空间复杂度: O(k)
    bool containsNearbyAlmostDuplicate(vector<int> &nums, int k, int t) {

    set<long long> record;
        for (int i = 0; i < nums.size(); i++) {

        //if (record.find(nums[i]) != record.end())
        //    return true;

        if (record.lower_bound((long long) nums[i] - (long long) t) != record.end() &&
                *record.lower_bound((long long) nums[i] - (long long) t) <= (long long) nums[i] + (long long) t)
                return true;

            record.insert(nums[i]);

            // 保持record中最多有k个元素
            if (record.size() == k + 1)
                record.erase(nums[i - k]);
        }

        return false;

    }

    //206 Reverse Linked List

    ListNode *reverseList(ListNode *head) {

    ListNode *pre = NULL;
        ListNode *cur = head;
        while (cur != NULL) {
            ListNode *next = cur->next;

            cur->next = pre;
            pre = cur;
            cur = next;
        }

        return pre;
    }

    //92 Reverse Linked List II
    //反转一个链表从m到n的元素.
    //如对于链表1->2->3->4->5->NULL, m = 2, n = 4
    //则返回链表1->4->3->2->5->NULL
    //- m 和 n超过链表范围怎么办?
    //- m > n 怎么办?

    ListNode *reverseBetween(ListNode *head, int m, int n) {

    ListNode *pre = NULL;
    ListNode *cur = head;

    ListNode *first = head;
    for (int i = 1; i < m; i++)
            first = first->next;

        ListNode *last = head;
        for (int i = 1; i <= n; i++)
            last = last->next;

        int count = 1;
        while (cur != NULL) {
            ListNode *next = cur->next;
            if (count = m) {
                cur->next = last;
                pre = cur;
                cur = next;
            } else if (count = n) {
                cur->next = pre;
                first->next = cur;
                pre = cur;
                cur = next;
            } else if (count > m && count < n) {
                cur->next = pre;
                pre = cur;
                cur = next;
            } else if (count < m)
                count++;
            else
                break;
        }

        return pre;
    }

    // practice 83 Remove Duplicates from Sorted List
    // 86 Partition List
    // 328 Odd Even Linked List
    // 2 Add Two Numbers
    // 445 Add Two Numbers II

    //203 Remove Linked List Elements
    // 在链表中删除值为val的所有节点
    //- 如1->2->6->3->4->5->6->NULL
    //- 返回 1->2->3->4->5->NULL

    ListNode *removeElements(ListNode *head, int val) {

    /*while(head->val == val && head != NULL){
        ListNode* delNode = head;
        head = delNode->next;
        delete delNode;
    }


    if(head == NULL)
        return NULL;*/

    ListNode *dummyHead = new ListNode(0);
    dummyHead->next = head;

        ListNode *cur = dummyHead;
        while (cur->next != NULL) {

        if (cur->next->val == val) {
            // 删除cur->next
            ListNode *delNode = cur->next;
                cur->next = delNode->next;
                delete delNode;
                //delNode->next = NULL;
            }
            else
                cur = cur->next;
        }
        ListNode *retNode = dummyHead->next;
        delete dummyHead;

        return retNode;
    }

    //practice 82 Remove Duplicates from Sorted List II
    //21 Merge Two Sorted Lists

    //24. Swap Nodes in Pairs
    //给定一个链表,对于每两个相邻的节点,交换其位置.
    //-如:链表为1->2->3->4->NULL
    //-返回:2->1->4->3->NULL
    //-只能对节点进行操作,不能修改节点对值

    ListNode* swapPairs(ListNode* head){

    ListNode* dummyHead = new ListNode(0);
        dummyHead->next = head;

        ListNode* p = dummyHead;
        while( p->next && p->next->next){
    ListNode* node1 = p->next;
            ListNode* node2 = node1->next;
            ListNode* next = node2->next;

            node2->next = node1;
            node1->next = next;
            p->next = node2;

            p = node1;
        }

        ListNode* retNode = dummyHead->next;
        delete dummyHead;

        return retNode;

    }

    // 25 Reverse Nodes in k-Group
    // 147 Insertion Sort List
    // 148 Sort List 归并排序,自底向上


    //237 Delete Node in a Linked List
    //给定链表中对一个节点,删除该节点

    //可以改变节点对值
    void deleteNode(ListNode* node){

        if(node == NULL)
            return;
        if(node->next == NULL){
    delete node;
            node = NULL;
            return;
        }
        node->val = node->next->val;
        ListNode* delNode = node->next;
        node->next = delNode->next;

        delete delNode;

        return;
    }


    // 19 Remove Nth Node From End of List
    //给定一个链表,删除倒数第n个节点
    //-如: 1->2->3->4->5->NULL, n = 2
    //-返回: 1->2->3->5
    //双指针技术

    ListNode* removeNthFromEnd(ListNode* head, int n){

    assert( n >= 0);
    ListNode* dummyHead = new ListNode(0);
    dummyHead->next = head;

        ListNode* p = dummyHead;
        ListNode* q = dummyHead;
        for(int i = 0 ; i < n + 1 ; i ++){
        assert(q);
        q = q->next;
        }

        while( q != NULL){
            p = p->next;
            q = q->next;
        }

        ListNode* delNode = p->next;
        p->next = delNode->next;
        delete delNode;

        ListNode* retNode = dummyHead->next;
        delete dummyHead;
        return retNode;

    }

    //61 .Rotate List
    //143. Reorder List
    //234. Palindrome Linked List

    //20. Valid Parentheses
    //给定一个字符串,只包含(,[,{,),],},判定字符串中第括号匹配是否合法
    //- 如 "()","()[]{}"是合法第
    //- 如 "(]", "([)]"是非法的
    //栈顶元素反映了嵌套的层次关系中,最近的需要匹配的元素


    bool isValid(string s){

    stack<char> stack;
        for(int i = 0 ; i < s.size(); i++){
        if(s[i] == '(' || s[i] == '{' || s[i] == '[')
            stack.push(s[i]);
        else{

            if(stack.size() == 0)
                return false;

            char c = stack.top();
                stack.pop();

                char match;
                if(s[i] == ')')
                    match = '(';
                else if(s[i] == ']' )
                    match = '[';
                else{
                    assert( s[i] == '}');
                    match = '{';
                }

                if( c != match )
                    return false;

            }

    }

        return true;
    }

    //150.Evaluate Reverse Polish Notation
    //71. Simplify Path


    //144. Binary Tree Preorder Traversal
    //94
    //145

    vector<int> preorderTraversal(TreeNode* root){

vector<int> res;
        if(root == NULL)
            return res;

        stack<Command> stack;
        stack.push(Command("go", root));
        while( !stack.empty() ){

            Command command = stack.top();
            stack.pop();

            if(command.s == "print")
                res.push_back(command.node->val);
            else{
                assert(command.s == "go");
                if( command.node -> right)
                    stack.push(Command("go", command.node->right));
                if( command.node -> left)
                    stack.push(Command("go", command.node));
                stack.push( Command("print",command.node));
            }

        }

        return res;

    }

    vector<int> inorderTraversal(TreeNode* root){

vector<int> res;
        if(root == NULL)
            return res;

        stack<Command> stack;
        stack.push(Command("go", root));
        while( !stack.empty() ){

            Command command = stack.top();
            stack.pop();

            if(command.s == "print")
                res.push_back(command.node->val);
            else{
                assert(command.s == "go");
                if( command.node -> right)
                    stack.push(Command("go", command.node->right));
                stack.push( Command("print",command.node));
                if( command.node -> left)
                    stack.push(Command("go", command.node));
            }

        }

        return res;

    }

    //341 Flatten Nested List Iterator

    // 102 Binary Tree Level Order Traversal
    //对一个二叉树进行层序遍历

    vector<vector<int>> levelOrder(TreeNode* root){

vector<vector<int>> res;
        if(root == NULL)
            return res;

        queue<pair<TreeNode*, int>> q;

        q.push(make_pair(root, 0));
        while( !q.empty() ){

            TreeNode* node = q.front().first;
            int level = q.front().second;
            q.pop();

            if( level = res.size() )
                res.push_back(vector<int>());

            res[level].push_back(node->val);

            if( node->left)
                q.push(make_pair(node->left, level + 1));

            if( node->right)
                q.push(make_pair(node->right, level + 1));

        }

        return res;


    }

    //107 Binary Tree Level Order Traversal II
    //103 Binary Tree Zigzag Level Order Travelsal
    //199 Binary Tree Right Side View


    //347 Top K Frequent Elements
    //给定一个非空数组,返回前k个出现频率最高对元素.
    //- 如给定[1,1,1,2,2,3], k = 2
    //- 返回[1,2]
    //- 注意k的合法性问题
    vector<int> topKFrequent2(vector<int>& nums, int k){

    assert(k > 0);

    //统计元素出现频率
    unordered_map<int, int> freq;
        for(int i = 0 ; i < nums.size(); i ++)
            freq[nums[i]] ++;

        assert( k <= freq.size() );

        //扫描freq, 维护当前出现频率最高的k个元素
        //在优先队列中,按照频率排序,所以数据对是 (频率,元素) 对形式
        priority_queue<pair<int,int> , vector<pair<int,int>>, greater<pair<int,int>> > pq;
        for( unordered_map<int,int>::iterator iter = freq.begin(); iter != freq.end() ; iter++){

        if(pq.size() == k) {
            if (iter->second > pq.top().first) {
                pq.pop();
                pq.push(make_pair(iter->second, iter->first));
                }
            } else
            pq.push(make_pair(iter->second, iter->first));
        }

        vector<int> res;
        while(!pq.empty()){
            res.push_back(pq.top().second);
            pq.pop();
        }

        return res;

        //思路三
    }

    // 23.Merge K Sorted Lists

    //104 Maximum Depth of Binary Tree
    int maxDepth(TreeNode* root){

        if(root == NULL)
            return 0;

        int leftMaxDepth = maxDepth(root->left);
        int rightMaxDepth = maxDepth(root->right);
        return max(leftMaxDepth,rightMaxDepth) + 1;


    }

     //111 Minimum Depth of Binary Tree;

    //226 Invert Binary Tree
    //反转一颗二叉树
    //Max Hower因不会做这道题而被拒绝

    TreeNode* invertTree(TreeNode* root){

        if(root == NULL)
            return NULL;

        invertTree( root->left );
        invertTree( root->right );

        swap(root->left, root->right);

        return root;

    }
    //100 Same Tree
    //101 Symmetric Tree
    //222 Count Complete Tree Nodes
    //110 Balanced Binary Tree

    //112 Path Sum
    //给出一颗二叉树以及一个数字sum,判断在这颗二叉树上是否存在一条根到叶子到路径
    //其路径上到所有节点和为sum

    bool hasPathSum(TreeNode* root, int sum){

    if(root == NULL)
        return false;

    if( root->left == NULL && root->right == NULL)
            return root->val == sum;

        return hasPathSum(root->left, sum - root->val ) ||
                hasPathSum(root->right, sum - root->val );
    }

    //111.Minimum Depth of Binary Tree
    //404 Sum of Left Leaves

    //257 Binary Tree Paths
    //给定一颗二叉树,返回所有表示从根节点到叶子节点路径到字符串
    vector<string> binaryTreePaths(TreeNode* root){

vector<string> res;

        if(root == NULL)
            return res;

        if( root->left == NULL && root->right == NULL){
    res.push_back(to_string(root->val) );
            return res;
        }

        vector<string> leftS = binaryTreePaths(root->left);
        for(int i = 0 ; i < leftS.size() ; i++)
            res.push_back(to_string(root->val) + "->" + leftS[i] );

        vector<string> rightS = binaryTreePaths(root->right);
        for(int i = 0 ; i < rightS.size() ; i++)
            res.push_back(to_string(root->val) + "->" + rightS[i] );

        return res;

    }

    //113. Path Sum II
    //129. Sum Root to Leaf Numbers

    //437.Path Sum III
    // 给出一颗二叉树以及一个数字sum,判断在这棵二叉树上存在多少路径,其路径上到所有节点和为sum
    // -其中路径不一定要起始于根节点;终止与叶子节点
    // -路径可以从任意节点开始,但是只能往下走.

    //以root为根节点到二叉树中,寻找和为sum的路径,返回这样的路径个数,和为sum
    // 返回这样的路径个数
    int pathSum(TreeNode* root, int sum){

    if(root == NULL)
        return 0;

    int res = findPath(root, sum);

        res += pathSum(root->left, sum);
        res += pathSum(root->right, sum);

        return res;

    }

    //在以node为根节点的二叉树中,寻找包含node的路径,和
    int findPath(TreeNode* node, int num){

    if(node == NULL)
        return 0;

    int res = 0;
        if(node->val == num)
            res += 1;

        res += findPath(node->left, num - node->val );
        res += findPath(node->right, num - node->val );

        return res;
    }

    //235.Lowest Common Ancestor of a Binary Search Tree
    //给定一颗二分搜索树和两个节点,寻找这两个节点的最近公共祖先
    //

    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q){

    assert(p != NULL && q != NULL);

        if( root == NULL)
            return NULL;

        if( p->val < root->val && q->val < root->val)
            return lowestCommonAncestor(root->left , p, q);
        if( p->val > root->val && q->val > root->val)
            return lowestCommonAncestor(root->right , p, q);

        return root;
    }

    //98.Validate Binary Search Tree
    //450. Delete Node In a BST
    //108.Convert Sorted Array to Binary Search Tree
    //230.Kth Smallest Element in a BST
    //236.Lowest Common Ancestor of a Binary Tree

    //17.Letter Combinations of a Phone Number
    //给出 一个数字字符串,返回这个数字字符串能表示的所有字母组合

    vector<string> letterCombinations(string digists){

    vector<string> res;
        findCombination(digists, 0, "");

        return res;
    }

    // s中保存了此时从digits[0,index-1]翻译得到的一个字母字符串
    // 寻找和digits[index]匹配的字母,获得digits[0,inde]翻译得到的解
    void findCombination(const string &digits, int index, const string &s) {

    if (index == digits.size()) {
        //s
        return ;
    }
    char c = digits[index];
        assert( c >= '0' && c<= '9' && c != '1');
        string letters = letterMap[c - '0'];
        for(int i = 0 ; i < letters.size() ; i ++)
            findCombination(digits, index+1, s + letters[i] );

        return;

    }

    const string letterMap[10] = {
    " ",  //0
            "" ,  //1
            "abc", //2
            "def", //3
            "ghi", //4
            "jkl", //5
            "mno", //6
            "pqrs", //7
            "tuv", //8
            "wxyz", //9
    }

    //93.practice Restore IP Addresses
    //131. Palindrome Partitioning

    //46.Permutations
    //给定一个整型数组,其中的每一个元素都格不相同,返回这些元素所有排列的可能.
    //-如对于[1,2,3]
    //-返回[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

    vector<vector<int>> res;
    vector<bool> used;

    vector<vector<int>> permute(vector<int>& nums){

    res.clear();
    if(nums.size() == 0)
        return res;

    used = vector<bool>(nums.size(), false);
        vector<int> p;
        generatePermutation(nums, 0, p);

        return res;
    }

    //p中保存了一个有index个元素的排列.
    //向这个排列的末尾添加第index + 1个元素,获得一个有index + 1个元素到排列
    void generatePermutation(const vector<int>& nums, int index, vector<int>& p){

    if( index == nums.size() ){
        res.push_back(p);
        return;
    }

    for(int i = 0; i < nums.size() ; i ++){
        if( !used[i] ){
            p.push_back(nums[i]);
            used[i] = true;
            generatePermutation(nums, index + 1, p);

            //将两个辅助变量状态回到原位
            p.pop_back();
            used[i] = false;
        }
    }

        return;


    }

    //practice. 47 Permutations II

    //77.Combinations
    //给出两个整数n,k,求在1..n这n个数字中选出k个数字到所有组合.
    //-如n = 4, k = 2
    //-结果为[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
    vector<vector<int>> combine(int n, int k){

    res.clear();
    if(n <= 0 || k <= 0 || k > n)
        return res;

    vector<int> c;
        generateCombinations(n, k, 1, c);

        return res;
    }

    //求解C(n,k),当前已经找到的组合存储在c中,需要从start开始搜索新的元素
    void generateCombinations(int n, int k, int start, vector<int> &c){

    if( c.size() == k){
        res.push_back(c);
        return;
    }


    // 还有k - c.size()个空位,所以,[i,n]中至少要有k-c.size()个元素
    // i最多为n - (k-c.size()) + 1
    // i <= n - (k-c.size()) + 1
    for(int i = start; i <= n ; i ++){
        c.push_back(i);
        generateCombinations(n, k, i + 1, c);
        c.pop_back();
    }

        return;
    }

    //39.Combination Sum (snapchat uber)
    //40.Combination Sum II (snapchat)
    //216.Combination Sum III
    //78.Subsets
    //90.Subsets II (facebook)
    //401.Binary Watch



}



 int main() {

srand(time(NULL));
    priority_queue<int> pq;
    for(int i = 0 ; i < 10 ; i ++){
    int num = rand() % 100;
        pq.push(num);
        cout<<"insert "<<num<<" in priority queue."<<endl;
    }




    return 0;
}