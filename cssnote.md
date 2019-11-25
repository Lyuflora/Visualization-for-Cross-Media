### text style

- text-indent:首行縮進
- padding：和瀏覽器邊界距離
- line-height:行間距
- text-align：對齊——right center justify
- word-spacing:單詞間空格的寬度（對英文有效）em px in mm %
- letter-spacing:字符間距
- text-transform:變形 uppercase lower capitalize(單詞首字母大寫)
- text-decoration:劃綫 underline overline line-through blink(閃爍)
- white-space:normal(只保留一個) pre(保留原數空格和縮進，不自動捲繞) pre-wrap(有捲繞) nowrap(只有一行) pre-line(合并空白，保留換行)

### font
 - font-family:
	 - serif 矢量，綫條有粗細，襯綫字體
	 - sans-serif 非襯綫
	 - monispace 等寬
	 - cursive 手寫
	 - fantasy 符號
	 - 多種備選字體
 - font-style
	 - italic 斜體
	 - obique 斜體（一個是字體的斜體，一個是瀏覽器及結算的斜體）
	 - small-caps 小號的大寫字母
	 - font-weight: bold 700 加粗
	 - font-size
	 
### 文本效果
- text-shadow:3px 5px 5px rgba(0,255,0,0.5) 距離x方向延伸 距離y方向延伸 模糊範圍 顔色 可以多爾叠加組合
- outline-color:red 邊框顔色
- outline-style:solid 邊框綫形 dotted dashed double groove(三維凹槽) ridge(三維凸槽) inset(凹邊) outset(凸邊)
- outline-width:1 邊框粗細

### list style
 - list-style-type:
	- disc circle 實心圓 空心圓
	- square
 - list-style-image:url() 放圖標
 - list-style-position:
	- inside outside 影響列表某一行太長超出一行時，和圖標是否對其

### table style
 - border:1x solid blue width height 畫框
 - border-collaspe：
	 - seperate
	 - collapse
 - vertical-align:top
 - text-align: right
 - padding
 - caption-side:bottom 標題放在底部
 - table-layout:
	 - automatic 自動分析寬度，但要等待表格加載完，可能耗時間大
	 -   fixed 根據第一行列寬

### box
padding: top right bottom left
margin

### 定位
突破了流式排版的限制
`<div>`
`</div>`
側邊條，footer，導航
#### 相對定位
	<p style="position: relative; left:-20;bottom:-30;">
	// 在原來預先定好的地方向左、向下，原來的位置因爲已經定好了所以是保留著的

#### 絕對定位
	<p style="position: absolute; left:-20;bottom:-30;">
	// 從原來的地方移開。從裏往外找能定位的元素（若沒有，就相對整個瀏覽器），以它為標準移動

#### 浮動定位
	<img src="a.jpg" style="float:right"></img>
	// 貼在瀏覽器的右邊


### 樣式選擇器
#### 元素選擇器
	<style>
		th {border:1x solid blue}
	</style>
	// 下文的th不需要再指定樣式了

	th,td,p {border:1x solid blue}
	// th,td,p都不需要再指定樣式了
	// 逗號隔開

	p {background-color:red}
	// p獲得了兩種樣式

#### 類的選擇器

遵循甚麽類、遵循甚麽樣式..
	<style>
		*.important {color:red}
	</style>

	<p class="important">
		paragraph
	</p>
	// 起一個類的名字 *意味著所有的
<br>

	<style>
		p.important {color:red}
	</style>

	<p class="important">
		paragraph
	</p>
	// 寫了標記號，僅僅在<p>中的important遵循
<br>

	<p class="important warn1ng">
	</p>
	// 遵循兩個樣式

<br>

ID叫做xx的應該是甚麽樣子..

	<style>
		*#important {color:red}
	</style>
	<p id="important warn1ng">

#### 屬性選擇器

	<style>
		*[title] {color:red}
	</style>

	<p title="Hello">
	// 包含title的所有元素都是紅色的(title：鼠標移上去可出現浮動的小字)
	// 注意不是title變成紅色

#### 後代選擇器
	<style>
		p em {color:red}
	</style>

	<p>
		哦<em>哈</em>喲
	</p>
	// 在p當中的em遵循
	// 只有哈的顔色變了

	// 中間有其他層次不影響


	<style>
		p > em {color:red}
	</style>
	<p>
		<i>哦<em>哈</em>喲</i>
	</p>
	
	// p和em必須緊挨，中間有其他層次不起作用

	<style>
		h1 + p {color:red}
	</style>
	
	<p>√</p>
	<p>×</p>
	// 必須是相鄰的p才起作用，也就是第一行這個

#### 超鏈選擇器

	<head>
	...
		a:visited {color:#FF0000}
		a:link
		a:hover
		a:active
		a.red:visited {color:red}
	...
	</head>
	
	<a href="https://verybusyrecently.club">
	<a class = "red" href="https://verybusyrecently.club">

#### before 选择器
	p:before {}
	// 在每个 <p> 元素的内容之前插入内容。

### Reference
[https://study.163.com/course/courseMain.htm?courseId=190001](https://study.163.com/course/courseMain.htm?courseId=190001 "網易雲課堂_CSS_FatMouse")

[https://www.w3school.com.cn/cssref/index.asp](https://www.w3school.com.cn/cssref/index.asp "CSS參考表")

### 字體導入

	@font-face {
	    font-family: Supernett;
	    src: url("../fonts/Supernett-cn Light.otf") format("otf");
	    font-weight: 700;
	    font-style: italic
	}

### 响应式布局
根据设置自适应显示。媒体查询可用于检测很多事情，例如：

 - viewport(视窗) 的宽度与高度
 - 设备的宽度与高度
 - 朝向 (智能手机横屏，竖屏)
 - 分辨率

必须在 <head> 中添加一个 <meta> 标签：

	&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;

代码原意翻译过来既是： 视窗的宽度等于设备宽度，原始比例始终为 1:1 。这样在改变 device-width 的时候任意变化修改都能自适应了。


	@media (min-width: 768px){ //>=768的设备 }
	// 注意顺序不同，可能有的会被覆盖而失效


#### 多媒体查询语法
多媒体查询由多种媒体组成，可以包含一个或多个表达式，表达式根据条件是否成立返回 true 或 false 。
如果指定的多媒体类型匹配设备类型则查询结果返回 true，文档会在匹配的设备上显示指定样式效果。
除非你使用了 not 或 only 操作符，否则所有的样式会适应在所有设备上显示效果。

#### html manifest属性
规定文档的缓存 manifest 的位置。Web 应用程序可以被缓存。
如需启用应用程序缓存，文档的<html> 标签中包含 manifest 属性：

	<!DOCTYPE HTML>
	<html manifest="demo.appcache">
	...
	</html>
每个指定了 manifest 的页面在用户对其访问时都会被缓存。如果未指定 manifest 属性，则页面不会被缓存（除非在 manifest 文件中直接指定了该页面）。
这方面还没有仔细了解过，等以后用到了再研究。

### HTML `<a>` 标签的 target 属性

规定在何处打开链接文档

#### 打开新窗口
一个简单的作用是：可以将文档重定向到一个单独的窗口。


	<html>
	<body>

	<h3>Table of Contents</h3>
	<ul>
 	 <li><a href="/example/html/pref.html" 	target="view_window">Preface</a></li>
 	 <li><a href="/example/html/chap1.html" target="view_window">Chapter 1</a></li>
 	 <li><a href="/example/html/chap2.html" target="view_window">Chapter 2</a></li>
 	 <li><a href="/example/html/chap3.html" target="view_window">Chapter 3</a></li>
	</ul>

	</body>
	</html>
	// 例子来源于w3school,打开三个超链接，将在同一个新窗口中重新加载内容

#### 在框架中打开窗口

在一个 `<frameset>` 显示中将超链接内容定向到一个或者多个框架中。可以将这个内容列表放入一个带有两个框架的文档的其中一个框架中，并用这个相邻的框架来显示选定的文档：

	<html>

	<frameset cols="200,*">
  		<frame src="/example/html/toc.html">
  		<frame src="/example/html/pref.html" name="view_frame">
	</frameset> 

	</html>
	// 例子来源于w3school

### @keyframes

### CSS justify-content

在弹性盒对象的 <div> 元素中的各项周围留有空白：

		div
	{
 	   display: flex;
	    justify-content: space-around;
	}

### not 选择器

	<style>
	p {
	    color: #000000;
	}
	
	:not(p) {
	    color: #ff0000;
	}
	</style>
	</head>
	<body>

	<h1>这是一个标题</h1>

	<p>这是一个段落.</p>
	<p>这是另一个段落.</p>

	<div>这是div元素的一些文本。</div>



	// 为每个并非<p>元素的元素设置背景颜色：两类元素获得不同效果


none	此元素不会被显示。<br>
block	此元素将显示为块级元素，此元素前后会带有换行符。<br>
inline	默认。此元素会被显示为内联元素，元素前后没有换行符。<br>
inline-block	行内块元素。（CSS2.1 新增的值）<br>
list-item	此元素会作为列表显示。<br>
run-in	此元素会根据上下文作为块级元素或内联元素显示。<br>

### CSS display选择器
display 属性规定元素应该生成的框的类型

### CSS transition 属性

可以实现把鼠标指针放到 div 元素上，其宽度会从 100px 逐渐变为 300px的效果：

	<style> 
	div
	{
		width:100px;
		height:100px;
		background:blue;
		transition:width 5s;
		-webkit-transition:width 2s; /* Safari and Chrome */
	}
	
	div:hover
	{
		width:300px;
	}
	</style>
	</head>
	<body>
	
		<div></div>
	
		<p>请把鼠标指针移动到蓝色的 div 元素上，就可以看到过渡效果。</p>

		<p><b>注释：</b>本例在 Internet Explorer 中无效。</p>

	</body>



transition 属性是一个简写属性，用于设置四个过渡属性：

transition-property<br>
**transition-duration** 必须设置<br>	
transition-timing-function<br>
transition-delay<br>

### HTML <meta> 标签

	必需的属性属性	content	

#### mask-icon
用于mbp的Touch Bar

	<link rel="mask-icon" href="website_icon.svg" color="red">

其中color部分的值支持16进制的写法 #ffffff
设计增加对应的svg文件

对应的svg文件的要求是viewBox的值必须是 0 0 16 16


### html stylesheet

html的link标签是用于当前文档引用外部文档用的
	
	<link rel="stylesheet"  href="style.css" type="text/css" />

 描述了当前页面与href所指定文档的关系。即说明href连接的文档是一个样式表。


### HTML <link> media 属性

media 属性规定被链接文档将显示在什么设备上。该属性通常与 CSS 样式表一起使用，用于为不同的媒介类型规定不同的样式。

media 属性接受若干个值。