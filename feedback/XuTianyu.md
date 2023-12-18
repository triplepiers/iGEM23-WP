# feedback to 徐天予

> 向大三上软工人致敬，以下只是对实现上的建议
>
> 评价是前端非常卷的软工管项目（但其实验收的重点可能在编造创新点上）

### HomePage

- 显然 *Carousel* 的 <u>高度</u> 并不符合预期，请把 `height: 100%;` 改成 `min-height: 100vh;`

   `React.CSSProperties` 语法有点抽象，属性名我没试出来，建议写在 `homepage.css` 里

- 建议为 `*.carousel_images* img` 添加 `object-position: center;` 

- 另外 `index.css` 里对最窄页宽的限制似乎没有生效

  => 建议再限制一下包裹 *Carousel* 的容器 (?)

### MainPage

- 右分栏

  -  “今日推荐” / “热门演员” 可能需要实现一下粘滞定位

    => 思路大概是 `position: sticky;` 实现 orz

  - 考虑一下电影名的居中对齐问题

    单行的 “肖申克的救赎” 和三行的 "The Shawshank Redemption" 一起靠上对齐会有一点违和

- 左分栏

  现在看来宽度足够，但可能也要考虑一下 “主演” 真的很多的极端情况

  => 或者直接把数据洗成不会 超过宽度 / 产生换行 的情况

### ActorPage

> 《英伦对决》的图好像挂了，剩下的都是关于 “影人介绍” 部分的

- toggle 按钮 (`.moviepage_content* *.leftpart* *.intro* span`) hover 时的背景不是正圆

  建议用 `border-radius: 50%;`，但鉴于 `<span>` 是行内元素可能还是会有 bug

- 感觉 toggle 功能和为段落限制 `max-height` 有点冲突

  => 段落同时 可折叠 + 可滚动 会比较抽象

- 介绍段落需要首行缩进的话用 `text-indent`属性实现

  => 手敲 N 个 `&nbsp;` 也不是不行

### MoviePage

对于 UpperBoard：

- 考虑主演过多（疯狂换行）导致文字部分高度 > Poster 的情况（即 $\gt$ 200px 时）

- "我要评价" 

  - 作为主要功能建议突出一下

    => 建议换一个亮一些的 background color

	- “提交” 按钮一般会放在 textarea 下面（?）

  - 建议用 AntD 的 Alert 组件来替换默认的警告弹窗 orz
  