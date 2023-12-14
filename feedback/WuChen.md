# Feedback to 吴晨

## 0 写在前面

- 非常感谢吴晨同学成为 **第一个交作业的小朋友** ，ddl 周辛苦了！

- 祝贺您踏上了自己设计网页的不归路（bushi），尊嘟很有趣 hhh

  速通 + 原创做成这个样子已经非常不容易了，以及 CSS 上限真的 ... 很高

  => 悲报：CS 的后续课程基本不涉及做网页orz（除了臭名昭著的软工课）

- 感受到了您对打雷姐的爱（仙品！）Ditto 也是仙品！

- `网络上搜索如何实现我需要的功能，并运用于自己的生产中` 

  正确的！（只要在不侵权的情况下，能不能缝出来就是各凭本事）

- <u>本文档仅供参考（只是本人对于前端实现的建议，不涉及 judge）</u>

> 以及俺是学姐来着（是 QQ 个人信息的锅，确信）

<center>OK, let's start!</center>

## 1 关于项目结构

- 首先，感谢您没有成为单文件战士！（我们至少把 CSS 拆分出来了）

  但是把所有文件平铺在 `/src` 下并不是一个好习惯 => 图片多了就容易自闭

  **下面是一个可供参考的 `/src` 子路径结构：**

  ```text
  .
  ├── css              => 用于存放样式表文件
  │   └── style.css
  ├── img              => 用于存放图片文件
  │   └── TGG.jpg      => 可以再用文件夹划分用于不同 page 的图片
  └── pages            => 用于存放 HTML 文件
      └── index.html
  ```

- 另外，入口文件一般会命名为 `index.html`（就是您的 `wiki.html`）

> 但是文件结构和命名都是自由的！（点头，并磕头）

## 2 关于实现本身

### 2.1 footer

其实把 `wiki.html` 拉长，你就会发现 => footer 没有贴合底边 hhh

> 其他页面是因为 page 里的内容足够长撑起来了，所以没有 bug

可以尝试对样式做如下修改：

```css
/* 下面是新增内容 */
body {
	position: relative;
	min-height: 100vh;
}

.page {
 	margin-bottom: 230px;
}

.footer {
 	width: 100vw;
  /* 保证 footer 始终位于页面的最底部 */
	position: absolute;
	bottom: 0;
}
```

### 2.2 background

嗯目前的背景图策略其实没啥问题，建议还是再给 `<body>` 加一个 `background-position: center;`

这时候反复缩放窗口，您会看到一些不同的效果（难以描述，试图使用双手比划）

### 2.3 居中和左右分栏

1. `.page` 的居中
   - 目前的解决应该是用 `margin: 0 auto;` 解决的（正确的，但有时候不太好用）
   - 可以了解一下 `flex` 布局
2. 左右布局
   - `float` 布局是 OK 的（但是有时候会异常难用 orz）
   - 可以了解一下 `grid` 布局嗯嗯
   - 其实也可以用 `flex` 做 => 还能搞个宽度不够自动变成单列的奇妙操作

### 2.4 或许：更少的文件

目前是写了 1+3 个 HTML 文件，但我们不难发现每个页面只有 `div.right.fl` 的内容是不同的（冗余，我们发现了冗余）

=> 可以考虑压缩到 1+1（但是会用到 JS），或者直接压缩到 1

---

大致思路如下：

- 把 4 个 HTML 里的 `div.right.fl` 塞在一起，用 `display: none / block;` 控制显示
- 给 `<nav>` 里的三个 `<a>` 标签添加 `click` 事件监听：
  - 任意标签被点击：显示 `back` 按钮 + 将对应的  `div.right.fl`  设置为 `display: block`，其他用 `display: none` 隐藏
  - 点击 `back` 按钮：隐藏 `back` 按钮 + 将 `wiki.html` 对应的  `div.right.fl`  设置为 `display: block`，其他用 `display: none` 隐藏

### 2.5 Ditto

> 方形图片 + 旋转还是有点难绷 hhh

- 更加不讲武德的开始播放方式

  原来的实现是在鼠标移动后 2s 开始播放（很讲武德）

  下面这东西能让页面一打开就开始放歌

  ```js
  window.onload = () => {
  	mucics.play();
  }
  ```

- 其实用 JS 也是可以暂停的 => 需要您自己画一个按钮添加 `click` 事件监听来控制

  下面是一个案例

  ```js
  let mucics = document.getElementById('audio');
  // 假设按钮的 id = "btn"
  let btn = document.getElementById('btn');
  btn.addEventListener('click', () => {
    if (mucics.paused) { audio.play();  }
    else               { audio.pause(); }
  });
  ```

### 2.6 UI 上的一些建议

- 统一的顶部留白

  目前三个分页面的顶部因为 `back` 按钮会多出一部分留白

  => 在 `wiki.html` 的顶部手动用 `margin-top` 留一些外边距或许会更统一

- 使用 `transition`

  目前使用 `li:hover` 对光标悬浮的情况做了颜色差分，非常棒！

  为了避免颜色的突变，您可以在 `.nav ul li` 中添加 `transition: .6s` 获得更加顺滑的过渡

- 使用一些圆角矩形（更加柔和的视觉效果）

  为一些标签添加 `border-radius` 属性，或许会有新的收获

---

<center>The End</center>

<center style="color: #555;">（磕头）仅代表个人习惯，不必当真</center>