# Feedback to 咕泳蜇老师

> <span style="color:gray;">**只是一些前端实现上的建议**（又名个人手癖），咕老师当下饭材料看就行</span>

## 1 用于表达 respect 的话语

阿巴阿巴咱就是说肝度远超预期，向您致敬 🫡！

然后咱就是说这个别扭的文件命名方式和迷之插槽 => 您该不会跑去看 Wiki 的源码了吧（心虚的目移，因为纯纯是依托答辩）

> <span style="color:gray;">如果没看的话就当我在放屁呃啊</span>
>
> <span style="color:gray;">没有用到 Python 的几个 WEB 框架的话是用不上这个插槽语法的 orz</span>
>
> <span style="color:gray;">不过提前熟悉一下也 OK 捏！</span>

另外入口文件一般会叫做 `index.html` 呜呜呜 🥹（那个 `layout.html` 的命名方式也是受官方给的框架限制）

Anyway，任何不用框架手搓自适应布局的猛士都值得我的 respect！

## 2 输出个人 xp

> <span style="color:gray;">可能需要再了解一下 CSS 中 <code>transition</code> 属性的相关知识 </span>

### 2.1 Loader

> <span style="color:gray;">基本实现没问题捏</span>

1. 更平滑的过渡

   啊其实您在 footprint 的设置中也用到了切换类名控制显隐的操作，这里可以类推

   ```CSS
   /* 默认情况下显示，使用 0.6s 进行过渡 */
   #loaderbox {
     /* 原属性略 */
     opacity: 1;
     transition: opacity 0.6s; /* 不透明度过渡时间为 0.6s */
     pointer-events: all;      /* 防止点到下面的东西 */
   }
   
   /* id="loaderbox" && class="hide" 的情况*/
   #loaderbox .hide {
     opacity: 0;
     pointer-events: none;    /* 避免点不到下面的东西 */
   }
   
   ```

   ```js
   // 这里可以直接用匿名函数（JAVA 应该教过了）
   window.onload = () => {
     var objLoading = document.getElementById("loaderbox");   
       if (objLoading) {   
           objLoading.classList.add('hide');
       }
     // 事实上您应该把 footerbox 的相关设置 & #titleimg 动画的触发写在此处
     // 没记错的话 onload 是一个异步回调，不写在里面等 loader 撤掉 slider 上的动画都播完了
   }
   ```

   2. `#loaderbox .dot` 的居中：咋这么别扭呢

      ```cs
      /* 原版实现 */
      .loader {
          position: absolute;
          top: 50%;
        	/* 下面两行不是 <=> left: 50%; 吗 hhh */
          left: 40%;
          margin-left: 10%;
          /* */
          transform: translate3d(-50%,-50%,0);
      }
      ```

      事实上直接用 `display: flex;` 就不用再套一层 `.loader` 噜

      ```html
      <div id="loaderbox" style="position: relative;width: 100%;height: 90vh;">
            <div class="dot"></div>
      </div>
      ```

      ```css
      /* 用这个替换 .loader 那一整段 */ 
      #loaderbox {
          display: flex;
          justify-content: center;
          align-items: center;
       }
      ```

   3. 禁止页面滚动

      您会发现其实在出现 `loader` 的时候，页面是可以向下滚动漏出下面的内容的（会尬住）

      => 一种选择是用 `position: fixed;` 让 `loader` 始终叠在页面最前面的固定位置（其实可以滚动，但不会漏出来）

      > <span style="color:gray;">禁止滚动有点麻烦，此处省略</span>

### 2.2 Footer

#### 2.2.1 很 '扁' 的情况（超宽 + 超矮）

![](./img/g-2-2-1.png)

<center>如上图所示</center>

- Debug 的结果应该是 footbox 里的元素把整个页面撑开了（sad）

  - 悲报：因为您直接给 newfoot 设置了 left & top 所以 footbox 的大小是 0x0（有点难办）

  - Todo：俺的思路可能要大改 aaaa，暂且略过（因为比例比较极端，假装无事发生）

    俺平时的话会让 body `min-height: 100vh`，更大的高度就让内容撑开

    ➕ 底部留一定的 padding，让 footer `position: absolute; bottom: 0;` 保持贴地

#### 2.2.2 很 '窄' 的情况

懒得截图了，不过显然三个 div 不会换行。

=> 既然本身就是用 `display: flex;` 做了，可以小改：

````css
footer {
  flex-wrap: wrap; /* 支持宽度不够了让元素自动换行 */
  row-gap: ??;     /* 换行后的行间距 */
  
  /* 三等分实现：个人倾向于预设左右 padding，中间均分 + 文字居中 */
  padding: 左右 上下;
}

footer div {
  flex: 1;
  min-width: ?px;     /* 不够分就会换行的下界 */
  text-align: center; /* 文字居中，垂直效果不好就直接用 flex 三件套 */
}
````

### 2.3 Header

嗷因为这次一级菜单项比较少，所以页面宽度比较小的时候不会迷之溢出（实际写 Wiki 的时候得考虑处理一下）

1. 嵌套我有点不太明白

   => 不知道为啥要 `nav.w` 里面套一个 `div.navbox#navbox`

2. \[这条暂时可以忽略] 定位上有点别扭的感觉

   `position: fixed;` 只要设（一般来说）置在包裹整个 header 的容器上就好，不用分别给 logo & dropmenu 设置

3. 个人实现思路：小改了一下 HTML 的结构

   ```html
   <nav>
     <div class="logo" id="logo">
       <a href="mylayout.html"><img src="static/pic/icon.png"></a>
     </div>
     <ul class="dropmenu">
         <li></li>
         <li></li>
     </ul>   
   </nav>
   ```

   ```css
   /* logo 和 dropmenu 的左右分立 => flex */
   nav {
     display: flex;
     padding: 20px 5px;
     justify-content: space-between; /* 主要是这个 */
     align-items: center;
   }
   /* dropmenu 本身就是 dispaly: flex 的写法了，
      不过这里就不能用 space-evenly, 而是用 li 的 padding 撑起 dropmenu 的宽度 */
   ```

4. 还是 `transition`

   能看到在 hover 的时候做了差分，再加一个 `transition: color 0.6s;` 会有更柔和的过渡

   `ul` 的显示同理，不过此处需要稍微调整一下：

   ```css
   .dropmenu li ul {
       /* 其他无关属性略 */
       opacity: 0;
       transition: opacity .6s;
       flex-direction: row;
   }
   .dropmenu li:hover>ul { /* 没有省略属性 */
       opacity: 1;
   }
   ```

### 2.4 Spring

> <span style="color:gray;">没啥毛病，但加上图片排版就会比较难受</span>
>
> <span style="color:gray;">熟悉的直接隐藏侧边目录操作（属于是开摆），去年 [WP](https://triplepiers.github.io/iGEM23-WP/) 的时候写过另一个版本</span>

这里主要讨论您的滚动实现（其实也没毛病，22 年的 Wiki 同学就和您一个做法）

- 事实上可以直接把 `id` 加在 `.title` 上 hhh，为了防止被 header 挡住可能需要了解一下 `scroll-padding` 这个属性

- 更加丝滑的滚动体验可能需要了解一下 `scroll-behavior` 这个属性（应该是加在 body 上）

### 2.5 自适应

您已经很强哩！事实上最简单粗暴的实现方式是 => 插入 动图 / 视频

此举可以将压力转移到美工身上，同时也能避免屏幕过窄的时候横向脚印重叠（以及右侧脚印不显示的问题）

- 您的实现方式还得在 `window.onrisize` 的时候横纵缩放（ aaaaa脑阔疼）
- 纵向适配那是相当的强！

---

<center>The End</center>

<center>总的来说是相当显现数理基础的自适应思路！（苯仁已经算的头皮发麻，🧎🧎 给您磕了）</center>
