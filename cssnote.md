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
- text-shadow:3px 5px 5px rgba(0,255,0,0,5) 距離x方向延伸 距離y方向延伸 模糊範圍 顔色 可以多爾叠加組合
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

### Reference
[https://study.163.com/course/courseMain.htm?courseId=190001](https://study.163.com/course/courseMain.htm?courseId=190001 "網易雲課堂_CSS_FatMouse")
