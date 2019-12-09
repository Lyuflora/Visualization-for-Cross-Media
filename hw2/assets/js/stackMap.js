        var x = 100;    var y = 341;
        var topY = 0;   var topYValue = 0;
        var tempY = 0;  var tempYValue = 0;


        var canvas = document.getElementById("canvas");
        var CTX = canvas.getContext("2d");
        window.onload = function () {
            var data1 = [
                {xAxis:'1月', names:['A', 'B', 'C', 'D'], values:[341, 200, 100, 500]},
                {xAxis:'2月', names:['A', 'B', 'C', 'D'], values:[499, 310, 200, 600]},
                {xAxis:'3月', names:['A', 'B', 'C', 'D'], values:[360, 300, 250, 650]},
                {xAxis:'4月', names:['A', 'B', 'C', 'D'], values:[700, 280, 210, 600]},
                {xAxis:'5月', names:['A', 'B', 'C', 'D'], values:[970, 340, 300, 700]},
                {xAxis:'6月', names:['A', 'B', 'C', 'D'], values:[1350, 400, 400, 900]},
                {xAxis:'7月', names:['A', 'B', 'C', 'D'], values:[1050, 300, 500, 880]}
            ];

            window.dataset1 = data1;

            var data2 = [
                {xAxis:'1月', names:['A', 'B', 'C', 'D'], values:[141, 100, 40, 240]},
                {xAxis:'2月', names:['A', 'B', 'C', 'D'], values:[299, 290, 230, 400]},
                {xAxis:'3月', names:['A', 'B', 'C', 'D'], values:[320, 240, 200, 600]},
                {xAxis:'4月', names:['A', 'B', 'C', 'D'], values:[400, 260, 240, 630]},
                {xAxis:'5月', names:['A', 'B', 'C', 'D'], values:[360, 330, 310, 530]},
                {xAxis:'6月', names:['A', 'B', 'C', 'D'], values:[300, 240, 300, 330]},
                {xAxis:'7月', names:['A', 'B', 'C', 'D'], values:[550, 200, 190, 340]}
            ];

            window.dataset2 = data2;
            window.dataset = 1; // 默认数据选项 1

            var colors = [ 'rgba(42,65,99,1)','rgba(93,136,204,1)','rgba(141,176,230,1)', 'rgba(184,211,254,1)'];
            window.hovercolor = 'rgba(255,219,102,1)';
            window.colors = colors;
            window.tag = 'Genre Name';

            var chartset = {
                title: 'Output of the Year',
                bgColor: '#91acc6',
                lengthX: 1420,
                lengthY: 720,
                titleColor: '#ffffff',
                titlePosition: 'top',
                originalX: 240,
                originalY: 890,
                titleXx:-40,
                titleXy:50,
                titleYx:120,
                titleYy:-20,
                hoverboxfont:'25px Microsoft YaHei',
                hoverboxH:45,
                hoverboxW:90,
                subtitlefont:'30px Microsoft YaHei',
                ytagpadding: 60,
                xtagpadding: 90,
                axisfont:'25px Microsoft YaHei',
                fillColor: colors,
                axisColor: '#303C4A',
                contentColor: '#bbbbbb',
                streamGraph: 0
            };
            window.settings = chartset;
            var chart = new StackMap('canvas', dataset1, chartset);

            window.chart = chart;
            window.isHover = false;
            var topValue = 0;
            window.Yceil = 0;
            window.AnimON = false;
            // stackData(CTX, settings, data1,d1);
            // stackData(CTX, settings, data2,d2);
        }

            stackData = function (ctx, settings, data,d)
            {
                var row = data[0]["values"].length;  //行数 几种堆在一起
                var col = data.length; //长度 列数
                for(var i = 0;i<col; i++)
                {
                    d[i]= data[i];
                    for(var j = 1;j<row; j++)
                    {
                        d[i]["values"][j] += data[i]["values"][j-1];
                    }
                }
            }

        function StackMap(canvas,data,settings){
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");
            var row = data.length;  //行数 几种堆在一起
            var col = data[0]["values"].length; //长度 列数

            var H = canvas.height;
            var W = canvas.width;

            //var theme;  // 颜色选择
            var high_ratio;
            var chartData = data;
	        this.Initset(canvas,settings,d1);
	        this.tempdrawchart(ctx, settings, d1);


}

StackMap.prototype.Initset = function (canvas, settings, chartData) {
        var ctx = canvas.getContext("2d");

        this.drawBackground(ctx, canvas.height, canvas.width, fill = 1, stroke = 1);
        this.drawCord(ctx, settings);
        this.drawAxis(ctx, settings, chartData);
    };

    StackMap.prototype.drawAxis=function (ctx, settings, data) {

        var row = d1[0]["values"].length;  // 行数 几种堆在一起
        var col = d1.length; // 长度 列数
        var maxValue = 0;
        // 最大值
        for (var i = 0; i < d1.length; i++) {
            var temp = Math.max.apply(null, d1[i]["values"]);
            if (maxValue < temp) {
                maxValue = temp;
            }
        }


        // 估计y方向的顶值 topYValue，它在y轴上的位置是固定的 topY，以此推出具体数据的位置
        topYValue = Math.ceil(maxValue / 100) * 100;
        topY = (settings.lengthY - 50)+settings.originalY;
        console.log("Max: ", topYValue);

        ctx.fillStyle = "#0f1f3d";
        ctx.moveTo(settings.originalX, settings.originalY);
        ctx.save();

        ctx.beginPath();
        ctx.fillStyle = "rgb(36,64,140)";
        var xInter = (settings.lengthX - 50) / (col+1);    // 设置间隔
        ctx.font = settings.axisfont;
        for (i = 0; i < col; i++) {
            var xid = data[i].xAxis;    // 名称
            var xlen = xInter * (i + 1);
            ctx.moveTo(settings.originalX + xlen + 0.5, settings.originalY + 0.5);
            ctx.lineTo(settings.originalX + xlen + 0.5, settings.originalY + 5.5);
            ctx.fillText(xid, settings.originalX + xlen - 4, settings.originalY + settings.ytagpadding);
        }
        ctx.stroke();

        ctx.beginPath();
        var yInter = (settings.lengthY - 50) / 5;    // 设置间隔, 默认5级
        var yValue = topYValue / 5;
        ctx.font = settings.axisfont;
        ctx.fillText("0", settings.originalX - settings.ytagpadding, settings.originalY);
        ctx.stroke();
        var yAxisValue=0;
        for (i = 0; i < 5; i++) {
            var ylen = yInter * (i + 1);
            yAxisValue += yValue;
            ctx.moveTo(settings.originalX + 3.5, settings.originalY - ylen + 0.5);
            ctx.lineTo(settings.originalX + 3.5, settings.originalY - ylen + 5.5);
            ctx.fillText(yAxisValue.toString(), settings.originalX - settings.xtagpadding, settings.originalY - ylen + 10);
        }
        Yceil = settings.originalY - ylen + 5.5;
        ctx.stroke();


    };
    StackMap.prototype.drawCord=function (ctx, settings) {

        var oX = settings.originalX;
        var oY = settings.originalY;
        var x1 = oX;
        var y1 = oY;
        var lengthY = settings.lengthY;
        var lengthX = settings.lengthX;
        ctx.beginPath();
        ctx.fillStyle = "#0f1f3d";
        ctx.strokeStyle = settings.axisColor;
        ctx.lineWidth = 5;
        ctx.moveTo(x1, y1);
        ctx.save();
        ctx.lineTo(x1, y1 - lengthY);   //原点往上画 y轴
        ctx.moveTo(x1 - 2, y1 - 2);
        ctx.lineTo(x1 + lengthX, y1);
        ctx.stroke();

        ctx.beginPath();
        ctx.font = settings.subtitlefont;
        var textPosX = x1 + lengthX + settings.titleXx;
        var textPosY = y1 + settings.titleXy;
        ctx.fillText("Month", textPosX, textPosY);
        ctx.restore();
        ctx.stroke();

        ctx.beginPath();
        ctx.font = settings.subtitlefont;
        textPosX = x1 - settings.titleYx;
        textPosY = y1 - lengthY + settings.titleYy;
        ctx.fillText("Output", textPosX, textPosY);
        ctx.restore();
        ctx.stroke();


    };
    StackMap.prototype.drawTitle=function (ctx, settings) {
        if (settings.title) {
            ctx.beginPath();
            ctx.fillStyle = "#0f1f3d";
            ctx.textAlign = 'center';
            ctx.fillStyle = this.titleColor;
            ctx.font = '40px Microsoft YaHei';

            var textPosX = canvas.width / 2;
            var textPosY = canvas.height * 0.01;
            var titlePos = "Top";
            ctx.fillText(settings.title, textPosX, textPosY);

        }
        ctx.stroke();
    };

    StackMap.prototype.drawPoint = function (ctx, x, y, r) {
        var xP = x;
        var yP = y;
        var radiuDot = r;

        ctx.beginPath();
        ctx.arc(xP, yP, radiuDot, 0 * Math.PI / 180, 360 * Math.PI / 180);
        ctx.strokeStyle = '#deefff';
        ctx.lineWidth = 10;
        ctx.stroke();
        ctx.fill();

    };
    StackMap.prototype.drawBackground = function (ctx, h, w, fill, stroke) {
        ctx.save();
        ctx.beginPath(); // draw top and top right corner
        var x = 60;
        var y = 0;
        var r = 40;
        var width = w - 2 * x;
        var height = h * 0.9;
        ctx.lineWidth = 0.05;
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + width, y, x + width, y + r, r); // draw right side and bottom right corner
        ctx.arcTo(x + width, y + height, x + width - r, y + height, r); // draw bottom and bottom left corner
        ctx.arcTo(x, y + height, x, y + height - r, r); // draw left and top left corner
        ctx.arcTo(x, y, x + r, y, r);
        // 背景的圆角矩形
        if (fill) {
            ctx.fillStyle = "#D1DAE9";
            ctx.fill();
            ctx.stroke();
        }
        if (stroke) {
            ctx.fillStyle = "#0f1f3d";
            ctx.stroke();
        }
        ctx.restore();

    };

    StackMap.prototype.tempdrawchart = function (ctx, settings, data)
        {
            this.Initset(window.canvas, settings, data);
            var row = data[0]["values"].length;  //行数 几种堆在一起
            var col = data.length; //长度 列数
            var xInter = (settings.lengthX - 50) / (col+1);    // 设置间隔
            var xlen, j;
            var t = topY + (settings.originalY-topY)*(y-topYValue)/(-topYValue);

                var ratio = (topY-settings.originalY)/topYValue;    //***
                ratio = 0.26;
            ctx.restore();

            for(var i =row-1;i>=0; i--)    //6
            {
                var poly = [];
                poly[0] = settings.originalX;
                poly[1] = settings.originalY;
                for(j = 0;j<col; j++)
                {
                    xlen = xInter * (j + 1);
                    poly.push(settings.originalX + xlen + 0.5);
                    var temp = data[j]["values"][i];
                    poly.push(data[j]["values"][i]*(-ratio)+ settings.originalY);

                }
                poly.push(settings.originalX + xlen + 0.5);
                poly.push(settings.originalY);

                ctx.fillStyle=window.colors[i]; // 该类数据的填充颜色
                ctx.strokeStyle = ctx.fillStyle; // 外边框
                ctx.lineWidth = 2;


                polygon(poly, ctx);

            }

            // 绘制数据点
            for(var i =0;i<col; i++)    //6
            {
                ctx.beginPath();
                var xlen = xInter * (i + 1);
                var DotX = settings.originalX + xlen + 0.5;
                var DotY = 0;
                ctx.font = settings.axisfont;

                for (var k = 0; k < row; k++) {
                    ctx.fillStyle=settings.fillColor[k];
                    var xtag = Math.floor(data[i]["values"][k]) ;    // 名称
                    DotY = data[i]["values"][k]*(-ratio)+ settings.originalY;
                    this.drawPoint(ctx, DotX, DotY, 10);

                    ctx.fillStyle = "#ffffff";  //标注数值
                    ctx.font = '20px Microsoft YaHei';
                    ctx.fillText(xtag.toString(),DotX+20, DotY+10);
                }

            }
            this.drawCord(ctx, settings);
               //画原点
            ctx.beginPath();
            ctx.fillStyle="#ca6f6a";
            this.drawPoint(ctx, settings.originalX, settings.originalY, 2);
            // ctx.stroke();

          // 鼠标悬浮标签
            var Mx = x+20;
            var My = y-20;
            if(window.isHover){
                ctx.beginPath();
                var width = settings.hoverboxW; var r =5; var height = settings.hoverboxH;
                ctx.lineWidth = 0.5;
                ctx.moveTo(Mx , My);
                ctx.arcTo(Mx + width, My, Mx + width, My + r, r); // draw right side and bottom right corner
                ctx.arcTo(Mx + width, My + height, Mx + width - r, My + height, r); // draw bottom and bottom left corner
                ctx.arcTo(Mx, My + height, Mx, My + height - r, r); // draw left and top left corner
                ctx.arcTo(Mx, My, Mx + r, My, r);
                ctx.fillStyle = "#884873";
                ctx.fill();

                ctx.beginPath();
                ctx.font = settings.hoverboxfont;
                ctx.fillStyle = "rgb(222,239,255)";
                var textPosX = Mx + settings.hoverboxW/2*0.8;
                var textPosY = My + settings.hoverboxH*0.7;
                ctx.fillText(window.tag, textPosX, textPosY);
                ctx.restore();
                ctx.stroke();

            }

        }

    function polygon(poly, context) {
        context.beginPath();
        context.moveTo(poly[0], poly[1]);

        for (var i = 2; i < 20; i += 2) {
            context.lineTo(poly[i], poly[i + 1]);
            // console.log(poly[i], poly[i + 1]);
        }
        context.closePath();
        context.fill();
        context.stroke();
    }

    function animPoint()
    {

        var endYValue = endData[0]["values"][0];  //141
        for(var i =0; i<endData.length; i++)
        {
            for(var k = 0; k<endData[0]["values"].length; k++)
            {
                tempData[i]["values"][k] += changeData[i]["values"][k];
            }
        }
        window.chart.tempdrawchart(CTX, window.settings, tempData);

        tempYValue = tempData[0]["values"][0];
        console.log(tempYValue);
        if(tempYValue==endYValue)
        {
            AnimON = false;
        }
        if(AnimON){
            window.requestAnimationFrame(animPoint);
        }
    }

    var d1,d2;
    // 经过stackData()后的d1

    d1 = [
            {xAxis:'1月', names:['A', 'B', 'C', 'D'], values:[341, 341+200, 341+200+100, 341+200+100+500]},
            {xAxis:'2月', names:['A', 'B', 'C', 'D'], values:[499, 499+310, 499+310+200, 499+310+200+600]},
            {xAxis:'3月', names:['A', 'B', 'C', 'D'], values:[360, 300+360, 300+360+250, 300+360+250+650]},
            {xAxis:'4月', names:['A', 'B', 'C', 'D'], values:[700, 700+280, 700+280+210, 700+280+210+600]},
            {xAxis:'5月', names:['A', 'B', 'C', 'D'], values:[970, 970+340, 970+340+300, 970+340+300+700]},
            {xAxis:'6月', names:['A', 'B', 'C', 'D'], values:[950, 950+400, 950+400+400, 950+400+400+900]},
            {xAxis:'7月', names:['A', 'B', 'C', 'D'], values:[1050, 1050+300, 1050+300+500, 1050+300+500+880]}
           ];
    // 经过stackData()后的d2
    d2 = [
                {xAxis:'1月', names:['A', 'B', 'C', 'D'], values:[141, 141+100, 141+100+40, 141+100+40+240]},
                {xAxis:'2月', names:['A', 'B', 'C', 'D'], values:[299, 299+290, 299+290+230, 299+290+230+400]},
                {xAxis:'3月', names:['A', 'B', 'C', 'D'], values:[320, 320+240, 320+240+200, 320+240+200+600]},
                {xAxis:'4月', names:['A', 'B', 'C', 'D'], values:[400, 400+260, 400+260+240, 400+260+240+630]},
                {xAxis:'5月', names:['A', 'B', 'C', 'D'], values:[360, 360+330, 360+330+310, 360+330+310+530]},
                {xAxis:'6月', names:['A', 'B', 'C', 'D'], values:[300, 300+240, 300+240+300, 300+240+300+330]},
                {xAxis:'7月', names:['A', 'B', 'C', 'D'], values:[550, 550+200, 550+200+190, 550+200+190+340]}
            ];

    var startData;
    var endData;
    var changeData;
    var tempData = d1;
    function startMovingA() // 数据变成2
    {
        startData = d1;
        endData = d2;
        if(dataset == 1)    // 当前数据是1
        {
            startData =[
                {xAxis:'1月', names:['A', 'B', 'C', 'D'], values:[341, 341+200, 341+200+100, 341+200+100+500]},
                {xAxis:'2月', names:['A', 'B', 'C', 'D'], values:[499, 499+310, 499+310+200, 499+310+200+600]},
                {xAxis:'3月', names:['A', 'B', 'C', 'D'], values:[360, 300+360, 300+360+250, 300+360+250+650]},
                {xAxis:'4月', names:['A', 'B', 'C', 'D'], values:[700, 700+280, 700+280+210, 700+280+210+600]},
                {xAxis:'5月', names:['A', 'B', 'C', 'D'], values:[970, 970+340, 970+340+300, 970+340+300+700]},
                {xAxis:'6月', names:['A', 'B', 'C', 'D'], values:[950, 950+400, 950+400+400, 950+400+400+900]},
                {xAxis:'7月', names:['A', 'B', 'C', 'D'], values:[1050, 1050+300, 1050+300+500, 1050+300+500+880]}
            ];
             tempData =[
                 {xAxis:'1月', names:['A', 'B', 'C', 'D'], values:[341, 341+200, 341+200+100, 341+200+100+500]},
                {xAxis:'2月', names:['A', 'B', 'C', 'D'], values:[499, 499+310, 499+310+200, 499+310+200+600]},
                {xAxis:'3月', names:['A', 'B', 'C', 'D'], values:[360, 300+360, 300+360+250, 300+360+250+650]},
                {xAxis:'4月', names:['A', 'B', 'C', 'D'], values:[700, 700+280, 700+280+210, 700+280+210+600]},
                {xAxis:'5月', names:['A', 'B', 'C', 'D'], values:[970, 970+340, 970+340+300, 970+340+300+700]},
                {xAxis:'6月', names:['A', 'B', 'C', 'D'], values:[950, 950+400, 950+400+400, 950+400+400+900]},
                {xAxis:'7月', names:['A', 'B', 'C', 'D'], values:[1050, 1050+300, 1050+300+500, 1050+300+500+880]}
            ];
        }else if(dataset == 2)
        {
            startData =[
               {xAxis:'1月', names:['A', 'B', 'C', 'D'], values:[141, 141+100, 141+100+40, 141+100+40+240]},
                {xAxis:'2月', names:['A', 'B', 'C', 'D'], values:[299, 299+290, 299+290+230, 299+290+230+400]},
                {xAxis:'3月', names:['A', 'B', 'C', 'D'], values:[320, 320+240, 320+240+200, 320+240+200+600]},
                {xAxis:'4月', names:['A', 'B', 'C', 'D'], values:[400, 400+260, 400+260+240, 400+260+240+630]},
                {xAxis:'5月', names:['A', 'B', 'C', 'D'], values:[360, 360+330, 360+330+310, 360+330+310+530]},
                {xAxis:'6月', names:['A', 'B', 'C', 'D'], values:[300, 300+240, 300+240+300, 300+240+300+330]},
                {xAxis:'7月', names:['A', 'B', 'C', 'D'], values:[550, 550+200, 550+200+190, 550+200+190+340]}
            ];
            tempData =[
                {xAxis:'1月', names:['A', 'B', 'C', 'D'], values:[141, 141+100, 141+100+40, 141+100+40+240]},
                {xAxis:'2月', names:['A', 'B', 'C', 'D'], values:[299, 299+290, 299+290+230, 299+290+230+400]},
                {xAxis:'3月', names:['A', 'B', 'C', 'D'], values:[320, 320+240, 320+240+200, 320+240+200+600]},
                {xAxis:'4月', names:['A', 'B', 'C', 'D'], values:[400, 400+260, 400+260+240, 400+260+240+630]},
                {xAxis:'5月', names:['A', 'B', 'C', 'D'], values:[360, 360+330, 360+330+310, 360+330+310+530]},
                {xAxis:'6月', names:['A', 'B', 'C', 'D'], values:[300, 300+240, 300+240+300, 300+240+300+330]},
                {xAxis:'7月', names:['A', 'B', 'C', 'D'], values:[550, 550+200, 550+200+190, 550+200+190+340]}
            ];
        }

        endData = [
                {xAxis:'1月', names:['A', 'B', 'C', 'D'], values:[141, 141+100, 141+100+40, 141+100+40+240]},
                {xAxis:'2月', names:['A', 'B', 'C', 'D'], values:[299, 299+290, 299+290+230, 299+290+230+400]},
                {xAxis:'3月', names:['A', 'B', 'C', 'D'], values:[320, 320+240, 320+240+200, 320+240+200+600]},
                {xAxis:'4月', names:['A', 'B', 'C', 'D'], values:[400, 400+260, 400+260+240, 400+260+240+630]},
                {xAxis:'5月', names:['A', 'B', 'C', 'D'], values:[360, 360+330, 360+330+310, 360+330+310+530]},
                {xAxis:'6月', names:['A', 'B', 'C', 'D'], values:[300, 300+240, 300+240+300, 300+240+300+330]},
                {xAxis:'7月', names:['A', 'B', 'C', 'D'], values:[550, 550+200, 550+200+190, 550+200+190+340]}
            ];

        // 差值 初始化
        changeData  = [
                {xAxis:'1月', names:['A', 'B', 'C', 'D'], values:[141, 141+100, 141+100+40, 141+100+40+240]},
                {xAxis:'2月', names:['A', 'B', 'C', 'D'], values:[299, 299+290, 299+290+230, 299+290+230+400]},
                {xAxis:'3月', names:['A', 'B', 'C', 'D'], values:[320, 320+240, 320+240+200, 320+240+200+600]},
                {xAxis:'4月', names:['A', 'B', 'C', 'D'], values:[400, 400+260, 400+260+240, 400+260+240+630]},
                {xAxis:'5月', names:['A', 'B', 'C', 'D'], values:[360, 360+330, 360+330+310, 360+330+310+530]},
                {xAxis:'6月', names:['A', 'B', 'C', 'D'], values:[300, 300+240, 300+240+300, 300+240+300+330]},
                {xAxis:'7月', names:['A', 'B', 'C', 'D'], values:[550, 550+200, 550+200+190, 550+200+190+340]}
            ];


        for(var i =0; i< endData.length; i++)
        {
            var line = {};
            var valueslist = [];

            for(var k = 0; k<endData[0]["values"].length; k++)
            {
                changeData[i]["values"][k] = (endData[i]["values"][k]-startData[i]["values"][k])/100;
            }
            line["values"] = valueslist;
        }


        AnimON = true;
        tempYValue = 341; tempY = (tempYValue)*(topY- window.settings.originalY)/topYValue;
        dataset = 2; // 切换到第二组数据

        window.animPoint();
        document.getElementById("charttitle").innerHTML =
        "数据 B" ;
    }
     function startMovingB()    // 数据变为1
    {
        startData = d2;
        endData = d1;

         endData = [
                {xAxis:'1月', names:['A', 'B', 'C', 'D'], values:[341, 341+200, 341+200+100, 341+200+100+500]},
                {xAxis:'2月', names:['A', 'B', 'C', 'D'], values:[499, 499+310, 499+310+200, 499+310+200+600]},
                {xAxis:'3月', names:['A', 'B', 'C', 'D'], values:[360, 300+360, 300+360+250, 300+360+250+650]},
                {xAxis:'4月', names:['A', 'B', 'C', 'D'], values:[700, 700+280, 700+280+210, 700+280+210+600]},
                {xAxis:'5月', names:['A', 'B', 'C', 'D'], values:[970, 970+340, 970+340+300, 970+340+300+700]},
                {xAxis:'6月', names:['A', 'B', 'C', 'D'], values:[950, 950+400, 950+400+400, 950+400+400+900]},
                {xAxis:'7月', names:['A', 'B', 'C', 'D'], values:[1050, 1050+300, 1050+300+500, 1050+300+500+880]}
            ];

         if(dataset == 1)   // 已经是数据1
        {
            startData =[
                {xAxis:'1月', names:['A', 'B', 'C', 'D'], values:[341, 341+200, 341+200+100, 341+200+100+500]},
                {xAxis:'2月', names:['A', 'B', 'C', 'D'], values:[499, 499+310, 499+310+200, 499+310+200+600]},
                {xAxis:'3月', names:['A', 'B', 'C', 'D'], values:[360, 300+360, 300+360+250, 300+360+250+650]},
                {xAxis:'4月', names:['A', 'B', 'C', 'D'], values:[700, 700+280, 700+280+210, 700+280+210+600]},
                {xAxis:'5月', names:['A', 'B', 'C', 'D'], values:[970, 970+340, 970+340+300, 970+340+300+700]},
                {xAxis:'6月', names:['A', 'B', 'C', 'D'], values:[950, 950+400, 950+400+400, 950+400+400+900]},
                {xAxis:'7月', names:['A', 'B', 'C', 'D'], values:[1050, 1050+300, 1050+300+500, 1050+300+500+880]}
            ];
             tempData =[
                 {xAxis:'1月', names:['A', 'B', 'C', 'D'], values:[341, 341+200, 341+200+100, 341+200+100+500]},
                {xAxis:'2月', names:['A', 'B', 'C', 'D'], values:[499, 499+310, 499+310+200, 499+310+200+600]},
                {xAxis:'3月', names:['A', 'B', 'C', 'D'], values:[360, 300+360, 300+360+250, 300+360+250+650]},
                {xAxis:'4月', names:['A', 'B', 'C', 'D'], values:[700, 700+280, 700+280+210, 700+280+210+600]},
                {xAxis:'5月', names:['A', 'B', 'C', 'D'], values:[970, 970+340, 970+340+300, 970+340+300+700]},
                {xAxis:'6月', names:['A', 'B', 'C', 'D'], values:[950, 950+400, 950+400+400, 950+400+400+900]},
                {xAxis:'7月', names:['A', 'B', 'C', 'D'], values:[1050, 1050+300, 1050+300+500, 1050+300+500+880]}
            ];
        }else if(dataset == 2)  // 从2变成1
        {
            startData =[
               {xAxis:'1月', names:['A', 'B', 'C', 'D'], values:[141, 141+100, 141+100+40, 141+100+40+240]},
                {xAxis:'2月', names:['A', 'B', 'C', 'D'], values:[299, 299+290, 299+290+230, 299+290+230+400]},
                {xAxis:'3月', names:['A', 'B', 'C', 'D'], values:[320, 320+240, 320+240+200, 320+240+200+600]},
                {xAxis:'4月', names:['A', 'B', 'C', 'D'], values:[400, 400+260, 400+260+240, 400+260+240+630]},
                {xAxis:'5月', names:['A', 'B', 'C', 'D'], values:[360, 360+330, 360+330+310, 360+330+310+530]},
                {xAxis:'6月', names:['A', 'B', 'C', 'D'], values:[300, 300+240, 300+240+300, 300+240+300+330]},
                {xAxis:'7月', names:['A', 'B', 'C', 'D'], values:[550, 550+200, 550+200+190, 550+200+190+340]}
            ];
            tempData =[
                {xAxis:'1月', names:['A', 'B', 'C', 'D'], values:[141, 141+100, 141+100+40, 141+100+40+240]},
                {xAxis:'2月', names:['A', 'B', 'C', 'D'], values:[299, 299+290, 299+290+230, 299+290+230+400]},
                {xAxis:'3月', names:['A', 'B', 'C', 'D'], values:[320, 320+240, 320+240+200, 320+240+200+600]},
                {xAxis:'4月', names:['A', 'B', 'C', 'D'], values:[400, 400+260, 400+260+240, 400+260+240+630]},
                {xAxis:'5月', names:['A', 'B', 'C', 'D'], values:[360, 360+330, 360+330+310, 360+330+310+530]},
                {xAxis:'6月', names:['A', 'B', 'C', 'D'], values:[300, 300+240, 300+240+300, 300+240+300+330]},
                {xAxis:'7月', names:['A', 'B', 'C', 'D'], values:[550, 550+200, 550+200+190, 550+200+190+340]}
            ];
        }



        // 差值 初始化
        changeData  = [
                {xAxis:'1月', names:['A', 'B', 'C', 'D'], values:[141, 141+100, 141+100+40, 141+100+40+240]},
                {xAxis:'2月', names:['A', 'B', 'C', 'D'], values:[299, 299+290, 299+290+230, 299+290+230+400]},
                {xAxis:'3月', names:['A', 'B', 'C', 'D'], values:[320, 320+240, 320+240+200, 320+240+200+600]},
                {xAxis:'4月', names:['A', 'B', 'C', 'D'], values:[400, 400+260, 400+260+240, 400+260+240+630]},
                {xAxis:'5月', names:['A', 'B', 'C', 'D'], values:[360, 360+330, 360+330+310, 360+330+310+530]},
                {xAxis:'6月', names:['A', 'B', 'C', 'D'], values:[300, 300+240, 300+240+300, 300+240+300+330]},
                {xAxis:'7月', names:['A', 'B', 'C', 'D'], values:[550, 550+200, 550+200+190, 550+200+190+340]}
            ];


        for(var i =0; i< endData.length; i++)
        {
            var line = {};
            var valueslist = [];

            for(var k = 0; k<endData[0]["values"].length; k++)
            {
                changeData[i]["values"][k] = (endData[i]["values"][k]-startData[i]["values"][k])/100;
            }
            line["values"] = valueslist;
        }


        AnimON = true;
        tempYValue = 141;   tempY = (tempYValue-0)*(topY- window.settings.originalY)/topYValue;
        dataset = 1; // 切换到第一组数据
        window.animPoint();
        document.getElementById("charttitle").innerHTML =
        "数据 A" ;
    }
var color = document.getElementById('color');
var text = document.getElementById('text');
var x, y;   // 鼠标在canvas的坐标
   function pick(event) {

          x = event.layerX*2;
          y = event.layerY*2;

          // 获取图片像素信息
          var pixel = CTX.getImageData(x, y, 1, 1);
          var data = pixel.data;

          console.log(pixel);

          // 获取rgba值
          var rgba = 'x:'+x+',y:'+y+',rgba(' + data[0] + ',' + data[1] +',' + data[2] + ',' + (data[3] / 255) + ')';
            console.log(rgba );
            var colorStr;
            //	用getImageData获取当前的位置的色素
            if(data[0]==42&&data[1]==65&&data[2]==99&&data[3]==255){
                colorStr='D';
                window.isHover = true;
                 hightlight(0);
            }else if(data[0]==93&&data[1]==136&&data[2]==204&&data[3]==255){
                colorStr='C';
                isHover = true;
                hightlight(1);
            }else if(data[0]==141&&data[1]==176&&data[2]==230&&data[3]==255){
                colorStr='B';
                isHover = true;
                 hightlight(2);
            }else if(data[0]==184&&data[1]==211&&data[2]==254&&data[3]==255){
                colorStr='A';
                isHover = true;
                 hightlight(3);
            }else if(data[0]==209&&data[1]==218&&data[2]==233&&data[3]==255){
                 hightlight(4);
                 isHover = false;
            }
        window.chart.tempdrawchart(CTX, window.settings, tempData);
          // text.textContent = colorStr;

        }
   canvas.addEventListener('mousemove', pick);

var palette = [ 'rgba(42,65,99,1)','rgba(93,136,204,1)','rgba(141,176,230,1)', 'rgba(184,211,254,1)'];

function hightlight(i)
{
    for(var k=0;k<4;k++)
    {
        colors[k] = palette[k];
    }
    if(i>=0 && i<4){
        colors[i] = hovercolor;
        window.tag = tempData[0]["names"][i];
    }
}
