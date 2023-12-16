# Feedback to 杨一苇

> <u>本文档仅供参考（只是本人对于前端实现的建议，不涉及对作品本身的评价）</u>

## 1 丑话写在前面

如果从结果出发，我只能给您的 homework 打 **零分** => 毕竟比赛时看的是实际运行结果，而不是录屏结果。

> 如果您用的 VS Code 插件不是 `Live Server`，那么请换成它。



下面是一些您可能需要补习的知识点：

- ⚠️ **当前工作路径** 与 **相对路径**

  请学习相关知识，直到您明白 `..` 和 `.` 分别代表了什么，以及 `index.html` 与其他文件所在位置的 *相对关系*。

- ⚠️ 不同语言的 **注释语法**

  - HTML 使用 `<!-- -->` 单行 / 多行注释

    => 当你在 HTML 文件的非 `<script>` 标签内使用 `//` 进行注释，这东西就会被浏览器解析成 `<div>`

  - JS 使用 `//` 进行单行注释，` /* */` 进行多行注释

- JQuery 语法

  ❌ 当您在页面内引入了 JQuery，就请不要再使用 `document.getElementById()` 和 `document.querySelectorAll()` 了

  > 既然您已经将其作为 reveal.JS 的依赖引入了，那么就好好使用它

  您会发现 `$("#[id]")` 和 `$(".[className]")` 就能优雅的完成相同的工作。
  
  

=> 另外建议尽量少用行内样式（因为文档变长的时候就 .... 很难修改.jpg 😭 ）

## 2 好耶！

- 优秀的 Grid 布局使用者（因为我不会，）

- 优秀的交互与动效设计

  > 不过在比赛过程中 UI 会以美工老师的设计为准，Wiki 自己能掌控的基本只有交互本身的部分 => 当然，如果您的肝足够好 + 两边都入选了就可以尝试一个人全都肝掉

- 可以有意识的使用 JS 库（好评！库 fine 秒 mine）
  
  >  看到 `Typed, scrollRveal & Parallax` 直接开始同技术栈狂喜
  
  - `Typed` 在近几年的 Wiki 中有点被滥用的趋势（sad）
  
  - `scrollReaveal` 是好东西，不过有时候会和其他操作蜜汁冲突（不过大多数情况下都是好用的）
  
    另外也可以看看 [AOS](https://michalsnik.github.io/aos/)，也是一个不错的滚动动画库
  
  - `Parallax` 库本身是 OK 的，但是开启之后定位会变得很迷
  
    好的效果需要大量分层 + 考虑窗口缩放适配的时候可能会裂开
  
  ---
  
  - 另外全屏滚动效果可以看一下 [fullScreen](https://alvarotrigo.com/fullPage/zh/)
  
    虽然在有 header 的情况下配置会比较阴间，但也是一个很不错的库

## 3 关于实现

> 这部分就是纯纯个人 XP 的输出（可以完全忽略）
>
> 大纲基本与 *说明文档 · 亮点功能* 一致

### 3.1 动效

#### 3.1.1 光标联动

> 主要看着那一串的 `setTimeout` 有点绷不住
>
> => 下面的方法可能对 `z-index` 的处理不太好用，但是 `opacity` 还是 OK 的

- 首先您可能需要了解一下 `transition-delay` 这个属性 + CSS 变量定义 + `calc()` 的使用；

- 然后您可能需要熟悉一下 `.className1.className2` 的选择器语法

  => 选择了 classList 中同时包含了 className1 & className2 的标签

---

以下面这一段为例（忽略 `z-index` 的部分）：

​	=> 显然 `a800_1` ~ `a800_7` 的时延是一个等差数列

```js
document.getElementById("sleep").addEventListener("mouseover", function () {
    document.querySelector(".item_10").style.zIndex = "10";
    document.querySelector(".a800_1").style.opacity = "1";
    setTimeout(function () {
        document.querySelector(".a800_2").style.opacity = "1";
    }, 50);
    setTimeout(function () {
        document.querySelector(".a800_3").style.opacity = "1";
    }, 100);
    setTimeout(function () {
        document.querySelector(".a800_4").style.opacity = "1";
    }, 150);
    setTimeout(function () {
        document.querySelector(".a800_5").style.opacity = "1";
    }, 200);
    setTimeout(function () {
        document.querySelector(".a800_6").style.opacity = "1";
    }, 250);
    setTimeout(function () {
        document.querySelector(".a800_7").style.opacity = "1";
    }, 300);
})
```

1. 首先，我们需要为 `a800_1` ~ `a800_7` 定义 CSS 变量（此处为 `i`）

   ```css
   .a00_1 { --i: 0 }
   .a00_2 { --i: 1;}
   /* 略 */
   .a00_7 { --i: 6;}
   
   /* 非 active 情况下不显示图片 */
   .item_10 > img {
     opacity: 0;
     /* 这一行是区分不同图片显示时延的关键捏 */
     transition-delay: calc(var(--i) * 0.05s);
   }
   ```

2. 监听 `#sleep` 的 `mouseover` 事件，并为 `a800_[x]` 的 **父元素** 添加 `.active` 类

   > 同理， `mouseleave` 时移除 `.active` 类

   ```js
   $("#sleep").mouseover(() => {
     $(".item_10").classList.toggle('active');
     // 或者用 add('active')
   })
   
   $("#sleep").mouseleave(() => {
     $(".item_10").classList.toggle('active');
     // 或者用 remove('active')
   })
   ```

> 啊这样就好了嗯嗯

#### 3.1.2 无限次重复播放

阿巴阿巴，其实 scrollReveal 的本质也就是监听页面滚动，然后修改 `classList`

=> 所以不难类推一下？

- 我们可以把需要重置的动画写在 `.page_[x].active` 的选择器下

  当然，HTML 里 `page_1` 一开始就要带 `active` 的类名

- 不同页面的切换是通过监听对 `[_]bar_[color]` 的点击事件实现的

  => 点击 `bar` 时，移除当前页的 `active` 类，并为目标页添加 `active` 类

  > 当然，为了等待页面整体平移，这里需要加一个 `setTimeout()`

### 3.2 光标

您用的是 `window.requestAnimationFrame()` 实现，挺好的捏。这里只是给另外一个思路：

1. 给 `#cursor_circle` 设置 `transition` 
2. 在 `document.addEventListener("mousemove", (*e*) => {})` 中直接改变  `#cursor_circle` 的坐标就可以了

---

另外您可以考虑当鼠标不在页面内的时候让这东西小时，belike：

```css
body #cursor_dot,
body #cursor_circle {
  opacity: 0;
  transition: opacity .6s;
}

body:hover #cursor_dot,
body:hover #cursor_circle {
  opacity: 1;
}

```

### 3.3 卡片网页式效果

目前的实现没毛病，但其实可以给同一 row 的 page 外面再套一个标签

=> 这样横向移动的时候可以少挪一个元素（没啥区别倒是）

----

<center>The End</center>

<center>总体来说已经很棒啦！</center>