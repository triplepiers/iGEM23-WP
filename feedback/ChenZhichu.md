# feedback to 陈志初

> <u>本文档仅供参考（只是本人对于前端实现的建议，不涉及对作品本身的评价）</u>

---

<center>对手搓个人网站的勇士致以崇高的敬意</center>

<center>但还请注意</center>

<center><span style="color:red;">最好 · 不要 · 把 <code>dist</code> 和 <code>node_modules</code> 放进压缩包到处发！</span></center>

<center>=> 在 `.gitignore` 中忽略了不代表在打压缩包的时候也会消失</center>

---

<center>下面是对实现细节的一些建议，可以直接忽略</center>

### 1 封装 bannerList

目前看来 `bannerList1 ~ bannerLIst3` 具有较大的冗余性，建议再封装一层：

> 保持 `.titleName` 先于 `.bannerBox` 的 `template` 结构

- 参数列表

  ```json
  {
    // optional
    alignRight: true / false, // => defalt: false, 控制 slider 居左 / 居右
    option: {},               // => 配置项，没有就用默认的
    // required
    content: {
    	titleName: "",
    	contentTitle: "",
    	someList: {}
  	}
  }
  ```

- 根据 `alignLeft` 使用 `flex-direction` 控制 slider 位置（默认居左）

  ```html
   <div :class="alignRight ? 'blogBox right' : 'blogBox'">
  ```

  ```css
  .blogBox {
    flex-direction: row;
  }
  .blogBox.right {
    flex-direction: row-reverse;
  }
  
  /* 严格左右交替的话甚至可以省略 aignRight */
  .blogBox:nth-of-type(2n) { /* 选择偶数个 */
    flex-direction: row-reverse;
  }
  ```

### 2 enter-active-class

直接拿 `display: none` 解决 *'抖动'* 有点太果断了（退场动画直接被砍了好吗！）

> 目前看起来是 切入/切出 动画重叠导致的（？存疑）

=> 改成下面这样稍微好点：

```html
<transition class="auto-scroll" 
 ...
  enter-active-class="animate__backInUp animate__slow animate__delay-1s" 
 ...>
```

### 3 自适应



- 熟练依赖，cSS覆盖太少 + github 手搓
- 宽度不够看不到 go-top
- slider 点太小了
- 
- typeJS 代替打字机？留点高度