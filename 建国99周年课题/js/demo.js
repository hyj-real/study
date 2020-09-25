var dataset=[[1923, 0], [1927, 137.0], [1928, -0.224], [1930, 1.718], [1949, 35.697], [1956, 1.003], [1978, 2.051], [2000, 1.352], [2003, 0.058], [2008, 0.112], [2012, 0.216], [2013, -0.061], [2014, 0.013], [2015, 0.011], [2016, 0.016], [2017, -0.007], [2018, 0.012], [2019, 0.015]]
        var time=[1923, 1927, 1928, 1930, 1949, 1956, 1978, 2000, 2003, 2008, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];
		var rate=[0, 137, -0.224, 1.718, 35.697, 1.003, 2.051, 1.352, 0.058, 0.112, 0.216, -0.061, 0.013, 0.011, 0.016, -0.007, 0.012, 0.015];
		let color=['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#CD5C5C',"#696969","#ADFF2F"];
        var margin = {
				top: 73,
				right: 10,
				bottom: 10,
				left: 10
		},
		width = 2200,
		height = 755;
		var padding={top:340,left:100,bottom:100}
		 const zoom = d3.behavior.zoom()  
				.scaleExtent([0.6,1.2])//用于设置最小和最大的缩放比例  
				.on("zoom", zoomed);
				
        var svg = d3.select('#party_line').append('svg')
			.attr('width',width)
			.attr('height',height).call(zoom);
		var g=svg.append("g");
		
//画坐标
 
        var xScale = d3.scale.linear() //序列比例尺
               .domain([1921,2020])
                .range([0,2000]);

		var yScale = d3.scale.linear()//线性比例尺
				//.exponent(0.5)
                .domain([0,10000])
                .range([400,0]);
		var yScale1 = d3.scale.linear()//线性比例尺
				//.exponent(0.5)
		        .domain([0,1000000])
		        .range([400,0]);
		var xaixs=d3.svg.axis()
					.scale(xScale)
					.orient("bottom")
					 .ticks(20);
		
		var yaixs=d3.svg.axis()
					.scale(yScale)
					.orient("left");
		var yaixs1=d3.svg.axis()
					.scale(yScale1)
					.orient("right");

		g.append('g')
                .attr('class','axixs')
				.attr("transform","translate(" + padding.left+ "," + (740) + ")")
				.call(xaixs);
		
        g.append('g')
                .attr('class','axixs11')
				.attr("transform","translate(" + padding.left+ "," + (padding.top) + ")")
				.call(yaixs);
		g.append('g')
		        .attr('class','axixs11')
				.attr("transform","translate(" + 2200+ "," + (padding.top) + ")")
				.call(yaixs1);

		function zoomed(){//缩放函数
		
		    g.attr("transform","translate("  +d3.event.translate[0] + ","+0+")scale(" +d3.event.scale + ","+1+")");
		
		}
			
var arrowMarker = g.append("marker")  
                        .attr("id","arrow")  
                        .attr("markerUnits","userSpaceOnUse")  
                        .attr("markerWidth","12")  
                        .attr("markerHeight","12")  
                        .attr("viewBox","0 0 12 12")   
                        .attr("refX","6")  
                        .attr("refY","6")  
                        .attr("orient","auto"); 
var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";  

                          
arrowMarker.append("path")  
            .attr("d",arrow_path)  
            .attr("fill","#000");  
  
var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";  

party_line()
draw_pie()
GDP_line()
function party_line(){
	d3.json("json/party_line.json",function(error,data){
				 if(error)
				        return console.log(error);
				  else{
					 let line = d3.svg.line()  //线段数据访问器
						.x(function(d){
						  return xScale(d["time"])
						})
						.y(function (d) {
						   return yScale(d["sum_num"])
						});
					let path =  g.append("path")
					  .datum(data)
					  .attr("class","line")
					  .attr("d",line)
					  .attr("class","L")
					  .attr("transform","translate(" + (padding.left)+ "," + (padding.top) + ")")
					  .attr("fill","none")
					  .attr("stroke",0)
					  .attr("stroke-width",2)
					  .attr("stroke","black");
					
					person(data);
				  }
			})
		
		  
}
function draw_pie(){
	d3.json("json/pie_data.json",function(error,data){
				 if(error)
				        return console.log(error);
				  else{
					  console.log(data)
					  var cir=g.append("g").selectAll(".circle")
					  		.data(data)
					  		.enter()
					  		.append("circle")
					  		.attr("transform", function(d,i){
					  			return "translate(" + padding.left+ ", " +padding.top+ ")";
					  		})
					  		.attr("cx",function(d,i){
					  			return xScale(d["time"]);
					  		})
					  		.attr('id',function(d,i){
					  			return "cir"+i;
					  		})
					  		.attr("cy",function(d,i){
								return yScale(d["num"]);
							})
					  		.attr("r",5)
					  		.attr("fill","#4169E1")
							.attr("stroke","white")
							.attr("stroke-width","3px")
							.on("click",function(d,i){
								var a=d3.select(this).attr("id");
								inter2(d,i);
							})
							.on("mouseover",function(d,i){
								d3.select(this).transition()
									.duration(300)
									.attr("r",10)
									.attr("stroke-width","4px")
							})
							.on("mouseout",function(d,i){
								d3.select(this).transition()
									.duration(300)
									.attr("r",5)
									.attr("stroke-width","3px")
							})
				var text=g.append("g").selectAll(".text")
						.data(data)
						.enter()
						.append("text")
						.attr("transform", function(d,i){
							return "translate(" + (padding.left+xScale(d["time"]))+ ", " +(padding.top+13+yScale(d["num"]))+ ")";
						})
						.attr('x', 0)
						.attr('y', 0)
						.text(function (d) {
						    return d["num"]+"万";
						})
						.attr('font-size',13)
						.attr("fill","#4169E1");
			}
	
	})
}		
function GDP_line(){
	d3.json("json/GDP_data.json",function(error,data){
				 if(error)
				        return console.log(error);
				  else{
					 var tooltip = d3.select("body")
					  .append("div")
					  .attr("class","tooltip")
					  .style("width","190px")
					  .style("opacity",0.0)
					 var rect=g.append("g").selectAll('.rect')
					 					.data(data)
					 					.enter()
					 					.append("rect")
										.attr("class","GDP")
					 					 .attr("transform",function(d,i){
					 						return "translate(" +(xScale(d["年份"])+padding.left-4.5)+ "," + (yScale1(d["GDP（亿元）"])+padding.top)+ ")"
					 					 })
										 .on("mouseover",function(d,i){
										 				 tooltip.html(d["年份"]+"年"+"<br>"+"人均GDP: "+d["人均GDP（元）"]+"元"+"<br>"+"国民GDP:"+d["GDP（亿元）"]+"亿元")
										 				.style("left", (d3.event.pageX-150) + "px")
										 				.style("top", (d3.event.pageY -80) + "px")
										 				.style("opacity",1.0)
														
										             d3.select(this)
										                 .attr("fill","	#BDB76B");
										         })
										 .on("mouseout",function(d,i){
										 			tooltip.style("opacity",0.0)
										             d3.select(this)
										                 .attr("fill","#FF1493");
										         })
										 .attr("y1",function(d){
										     var min = yScale1.domain()[0];
										     return yScale1(min);
										 })
										 .transition()
										 .delay(function(d,i){
										     return i * 80;
										 })
										 .duration(1500)
										 .ease("bounce")
										 
					 					.attr('x1',function(d,i){
					 						return xScale(d["年份"]);
					 					})
					 					.attr("y1",function(d,i){
					 						return yScale1(d["GDP（亿元）"])-10;
					 					})
					 					.attr("width",9)
					 					.attr("height",function(d,i){
											return yScale1(0)-yScale1(d["GDP（亿元）"]);
					 					})
					 					.attr("fill","#FF1493")
										.style("opacity",0.5);					var rect1 = g.append('g').selectAll('.rect')					            .data(data)					            .enter()					            .append("rect")
								.on("mouseover",function(d,i){
									tooltip.html(d["年份"]+"年"+"<br>"+"人均GDP:"+d["人均GDP（元）"]+"元"+"<br>"+"国民GDP:"+d["GDP（亿元）"]+"亿元")
																			          			.style("left", (d3.event.pageX-150) + "px")
																			          			.style("top", (d3.event.pageY -80) + "px")
																			          			.style("opacity",1.0)
								            d3.select(this)
								                .attr("fill","yellow");
								        })
								.on("mouseout",function(d,i){
									 tooltip.style("opacity",0.0)
								            d3.select(this)
								                .transition()
								                .duration(500)
								                .attr("fill","blue");
								        })
								.attr("y",function(d){
								    var min = yScale1.domain()[0];
								    return yScale1(min);
								})
								.transition()
								.delay(function(d,i){
								    return i * 80;
								})
								.duration(1500)					            .attr('x',function(d,i){						           	return xScale(d["年份"])+padding.left-4.5;						            })					            .attr("y",function(d,i){					            	return yScale1(d["人均GDP（元）"])+340-(400-yScale1(d["GDP（亿元）"]));					            })					            .attr("width",9)					            .attr("height",function(d){											  return 400-yScale1(d["人均GDP（元）"]);										  })								.attr("fill","blue")								.style("opacity",0.3)												  				  }				  			})}

// //绘制上面的线段
Line()
function Line(){
	var Line1=g.append("path")
		.attr("d",function(d,i){
			return'M'+xScale(1921)+''+-360+'L'+xScale(2020)+''+-360;
		})
		.attr("transform","translate("+padding.left+","+(padding.top+30)+")")
		.attr("fill","none")
		.attr("stroke-width",1)
		.attr("stroke","#F5F5F5")
		g.append("text")
				.attr('transform',"translate(20,15)")
				.text("交通工程")
				.attr("font-size","12px")
				.attr("fill","#f5f5f5")
		
	g.append("image")
				.attr("xlink:href","imag/交通.jpg")
				.attr('transform','translate('+padding.left+','+90+')')
				.attr('x',-25)
				.attr('y',-90)
				.attr("width",25)
				.attr("height",25);
	
	var Line2=g.append("path")
		.attr("d",function(d,i){
			return'M'+xScale(1921)+''+-320+'L'+xScale(2020)+''+-320;
		})
		.attr("transform","translate("+padding.left+","+(padding.top+30)+")")
		.attr("fill","none")
		.attr("stroke-width",1)
		.attr("stroke","#4169E1")
	g.append("text")
				.attr('transform',"translate(20,55)")
				.text("文化教育")
				.attr("font-size","12px")
				.attr("fill","#f5f5f5")
		
	g.append("image")
				.attr("xlink:href","imag/文化.jpg")
				.attr('transform','translate('+padding.left+','+90+')')
				.attr('x',-25)
				.attr('y',-55)
				.attr("width",25)
				.attr("height",25);
	var Line3=g.append("path")
		.attr("d",function(d,i){
			return'M'+xScale(1921)+''+-280+'L'+xScale(2020)+''+-280;
		})
		.attr("transform","translate("+padding.left+","+(padding.top+30)+")")
		.attr("fill","none")
		.attr("stroke-width",1)
		.attr("stroke","#9370DB")
	g.append("text")
				.attr('transform',"translate(20,95)")
				.text("科技成果")
				.attr("font-size","12px")
				.attr("fill","#f5f5f5")
		
	g.append("image")
				.attr("xlink:href","imag/科技.jpg")
				.attr('transform','translate('+padding.left+','+95+')')
				.attr('x',-25)
				.attr('y',-20)
				.attr("width",25)
				.attr("height",25);
				
	var Line4=g.append("path")
			   .attr("d",function(d,i){
			   	return'M'+xScale(1921)+''+-240+'L'+xScale(2020)+''+-240;
			   })
			   .attr("transform","translate("+padding.left+","+(padding.top+30)+")")
			   .attr("fill","none")
			   .attr("stroke-width",1)
			  .attr("stroke","#aa5500")
	g.append("text")
				.attr('transform',"translate(20,135)")
				.text("超级工程")
				.attr("font-size","12px")
				.attr("fill","#f5f5f5")
	
	g.append("image")
				.attr("xlink:href","imag/工程.png")
				.attr('transform','translate('+padding.left+','+-24+')')
				.attr('x',-25)
				.attr('y',140)
				.attr("width",25)
				.attr("height",25);
				
	var Line5=g.append("path")
			   .attr("d",function(d,i){
				return'M'+xScale(1921)+''+-200+'L'+xScale(2020)+''+-200;
			   })
			   .attr("transform","translate("+padding.left+","+(padding.top+30)+")")
			   .attr("fill","none")
			   .attr("stroke-width",1)
			   .attr("stroke","#ffaa00")
	g.append("text")
				.attr('transform',"translate(20,175)")
				.text("卫生事业")
				.attr("font-size","12px")
				.attr("fill","#f5f5f5")
	
	g.append("image")
				.attr("xlink:href","imag/卫生 (1).png")
				.attr('transform','translate('+padding.left+','+-64+')')
				.attr('x',-25)
				.attr('y',220)
				.attr("width",25)
				.attr("height",25);
				
	var Line6=g.append("path")
			   .attr("d",function(d,i){
				return'M'+xScale(1921)+''+-160+'L'+xScale(2020)+''+-160;
			   })
			   .attr("transform","translate("+padding.left+","+(padding.top+30)+")")
			   .attr("fill","none")
			   .attr("stroke-width",1)
			   .attr("stroke","#aaaa00")
	
	g.append("text")
				.attr('transform',"translate(20,215)")
				.text("应急救灾")
				.attr("font-size","12px")
				.attr("fill","#f5f5f5")
			   
	g.append("image")
				.attr("xlink:href","imag/民政救灾.png")
				.attr('transform','translate('+padding.left+','+-105+')')
				.attr('x',-25)
				.attr('y',300)
				.attr("width",25)
				.attr("height",25);
}
function person(){
	d3.json("json/famousP.json",function(error,data){
		if(error)
			console.log(error);
		else{
			var tooltip1 = d3.select("body").append("div")
							    .attr("class","tooltip") //用于css设置类样式
							    .attr("opacity",0.0);	
			let per=g.selectAll(".image")
						.data(data)
						.enter()
						.append("image")
						.attr("id","imag")
						.attr("class","imag")
						.attr("id",function(d,i){
							return "image"+i;
						})
						.attr("xlink:href","imag/person.png")
						.attr('transform','translate('+padding.left+','+padding.top+')')
						.attr('x',function(d,i){
							return xScale(d["时间"].substring(0,4));
						})
						.attr('y',function(d,i){
							if(i==0)
								return 360;
							else if(i==1)
								return 315;
							else if(i==2)
								return 312;
							else if(i==3)
								return 235;
							else if(i==4)
								return 220;
							else if(i==5)
								return 195;
							else if(i==6)
								return 175;
							else if(i==7)
								return 40;
						})
						.style("opacity",0.8)
						.attr("width",25)
						.attr("height",25)
						.on("click",function(d,i){
							var a=d3.select(this).attr("id");
							d3.select(this)
							.attr("href", "imag/人物.png");
							inter(d,a,i);
						})
		}
	})
}
function inter(d,a,i){
	console.log("imag/person/person"+(1+i)+".jpg");
	var BG=document.getElementById("Party_line");
	//文本框
	var div = document.createElement('div');
	var id =document.createAttribute('id')
	id.value='box';
	div.setAttributeNode(id);//添加id
	div.style.width = '300px';
	div.style.height = "300px";
	div.style.backgroundColor = 'rgb(28 ,28 ,28,0.6)';
	div.style.zIndex = 1000;
	div.style.position = 'absolute';
	div.style.borderRadius = '5px';
	console.log(event.pageX)
	if(event.pageX<=300){
		div.style.left =(300-event.pageX)+"px";
		div.style.top = (event.pageY-300)+"px";
	}
	else{
		div.style.left =(event.pageX-300)+"px";
		div.style.top = (event.pageY-300)+"px";
	}
	BG.appendChild(div);
	
	//背景淡化
	var div2=document.createElement('div');
	div2.style.width = '2200px';
	div2.style.height = '820px';
	div2.style.position = 'absolute';
	div2.style.top = '0';
	div2.style.backgroundColor = 'rgb(28 ,28 ,28,0.6)';
	BG.appendChild(div2);
	//文本
	$("#box").html("<div>"+
	                "<h4 style='text-align:center' >"+d["姓名"]+"</h4>"+
	                "<img src='imag/person/person"+(1+i)+".jpg' width=150px height=150px  alt='图片无法正常加载'/>"+
	                "<p style='font-size:1px font:white' id='event'>"+d["事迹"]+"</p>"+
	                "</div>") 
	//删除键
	var remove = document.createElement('button');
	remove.innerHTML = 'X';
	remove.style.left = '0%';
	remove.style.top = '0';
	remove.style.zIndex = 100000;
	remove.style.position = 'absolute';
	div.appendChild(remove);
	remove.onclick = function(){
		//找到上面创建的两个div的父节点，清除父节点下的div与div2
		div.parentNode.removeChild(div);
		div2.parentNode.removeChild(div2);
		$("#"+a).attr("href", "imag/person.png");
	}
}
function inter1(d,a,i){   //上面的矩形块
	var cl=a.substring(0,5);
	console.log(cl=="rect2");
	console.log($("#"+a).css("fill"));
	var BG=document.getElementById("Party_line");
	//文本框
	var div = document.createElement('div');
	var id =document.createAttribute('id')
	id.value='box';
	div.setAttributeNode(id);//添加id
	div.style.width = '300px';
	div.style.height = "300px";
	div.style.backgroundColor = 'rgb(28 ,28 ,28,0.6)';
	div.style.zIndex = 1000;
	div.style.position = 'absolute';
	div.style.borderRadius = '5px';
	if(event.pageX<=300){
		div.style.left =(300-event.pageX)+"px";
		div.style.top = (event.pageY-300)+"px";
	}
	else{
		div.style.left =(event.pageX-300)+"px";
		div.style.top = (event.pageY-300)+"px";
	}
	BG.appendChild(div);
	//淡化背景
	var div2=document.createElement('div');
	div2.style.width = '2200px';
	div2.style.height = '800px';
	div2.style.position = 'absolute';
	div2.style.top = '0';
	div2.style.backgroundColor = $("#"+a).css("stroke");
	div2.style.opacity = '0.4';
	BG.appendChild(div2);
	//文本
	if(cl=="rect2"){
		$("#box").html("<div>"+
	                "<h4 style='text-align:center' >"+d["name"]+"</h4>"+
	                "<img src='imag/traffic/traffic"+(1+i)+".jpg' id='Img' width=150px height=150px  alt='图片无法正常加载' />"+
	                "<p style='font-size:1px font:white' id='event'>"+d["content"]+"</p>"+
	                "</div>") 
	}
	if(cl=="rect0"){
		$("#box").html("<div>"+
	                "<h4 style='text-align:center' >"+d["name"]+"</h4>"+
	                "<img src='imag/education/education"+(1+i)+".jpg' id='Img' width=150px height=150px  alt='图片无法正常加载' />"+
	                "<p style='font-size:1px font:white' id='event'>"+d["content"]+"</p>"+
	                "</div>") 
	}
	if(cl=="rect1"){
		$("#box").html("<div>"+
	                "<h4 style='text-align:center' >"+d["name"]+"</h4>"+
	                "<img src='imag/science/science"+(1+i)+".jpg' id='Img' width=150px height=150px  alt='图片无法正常加载' />"+
	                "<p style='font-size:1px font:white' id='event'>"+d["content"]+"</p>"+
	                "</div>") 
	}
	if(cl=="rect3"){
		$("#box").html("<div>"+
	                "<h4 style='text-align:center' >"+d["name"]+"</h4>"+
	                "<img src='imag/project/project"+(1+i)+".jpg' id='Img' width=150px height=150px  alt='图片无法正常加载' />"+
	                "<p style='font-size:1px font:white' id='event'>"+d["content"]+"</p>"+
	                "</div>") 
	}
	if(cl=="rect4"){
		$("#box").html("<div>"+
	                "<h4 style='text-align:center' >"+d["name"]+"</h4>"+
	                "<img src='imag/medical/medical"+(1+i)+".jpg' id='Img' width=150px height=150px  alt='图片无法正常加载' />"+
	                "<p style='font-size:1px font:white' id='event'>"+d["content"]+"</p>"+
	                "</div>") 
	}
	if(cl=="rect5"){
		$("#box").html("<div>"+
	                "<h4 style='text-align:center' >"+d["name"]+"</h4>"+
	                "<img src='imag/disaster/disaster"+(1+i)+".jpg' id='Img' width=150px height=150px  alt='图片无法正常加载' />"+
	                "<p style='font-size:1px font:white' id='event'>"+d["content"]+"</p>"+
	                "</div>") 
	}
	//删除键
	var remove = document.createElement('button');
	remove.innerHTML = 'X';
	remove.style.left = '0%';
	remove.style.top = '0';
	remove.style.zIndex = 100000;
	remove.style.position = 'absolute';
	div.appendChild(remove);
	remove.onclick = function(){
		//找到上面创建的两个div的父节点，清除父节点下的div与div2
		div.parentNode.removeChild(div);
		div2.parentNode.removeChild(div2);
		
	//	$("#"+a).attr("href", "imag/person.png");
	}
}
function inter2(data){//饼图
	console.log(data)
	var BG=document.getElementById("Party_line");
	//文本框
	var div = document.createElement('div');
	var id =document.createAttribute('id')
	id.value='SVG';
	div.setAttributeNode(id);//添加id
	div.style.width = '350px';
	div.style.height = "350px";
	div.style.backgroundColor = '#031f2d';
	div.style.zIndex = 1000;
	div.style.position = 'absolute';
	div.style.borderRadius = '5px';
	if(event.pageX<=350){
		div.style.left =(350-event.pageX)+"px";
		div.style.top = (event.pageY-350)+"px";
	}
	else{
		div.style.left =(event.pageX-350)+"px";
		div.style.top = (event.pageY-350)+"px";
	}
	
	BG.appendChild(div);
	var svg = d3.select('#SVG').append('svg')
		.attr('width',350)
		.attr('height',350);
	
	var pie=d3.layout.pie()
				.value(function(d){
					return d[1];
				})
	console.log(data["time"])

	var data1=data["type"];
	var piedata=pie(data["type"]);
	var radius=120;	
	var circle = svg.append("circle")
					.attr("transform","translate(175,175)")
					.attr("cx",0)
					.attr("cy",0)
					.attr("r",radius*0.35)
					.attr("fill","	#FFE4B5")
	var te = svg.append("text")
					.attr("transform","translate(175,175)")
					.attr("x",-28)
					.attr("y",5)
					.text(data["num"]+"万")
					.attr("fill","white");
	var arc=d3.svg.arc()     
				.innerRadius(radius*0.4)
				.outerRadius(radius*0.7)
				.padAngle(0.05);
				
	var tooltip = d3.select("#SVG")
				.append("div")
				.attr("class","tooltip")
				.style("opacity",0.0)
	var arcs = svg.selectAll(".Path")
					.data(piedata)
					.enter()
					.append("path")
					.attr("d",function(d){
						return arc(d);
					})
					.attr("id", function(d, i) {
						return "Pi" + i;
					})
					.attr("transform","translate(175,175)")
					.attr("stroke",function(d,i) {
							if(data1[i][0]=="工人")
								return color[0];
							else if(data1[i][0]=="农民")
								return color[1];
							else if(data1[i][0]=="公司人员")
								return color[2];
							else if(data1[i][0]=="党政人员")
								return color[3];
							else if(data1[i][0]=="学生")
								return color[4];
							else if(data1[i][0]=="退休")
								return color[5];
							else if(data1[i][0]=="军人")
								return color[6];
							else if(data1[i][0]=="其他")
								return color[7];
							else
								return "#FFEBCD";
						})
					.attr("stroke-width","1px")
					.attr("fill", function(d,i) {
							if(data1[i][0]=="工人")
								return color[0];
							else if(data1[i][0]=="农民")
								return color[1];
							else if(data1[i][0]=="公司人员")
								return color[2];
							else if(data1[i][0]=="党政人员")
								return color[3];
							else if(data1[i][0]=="学生")
								return color[4];
							else if(data1[i][0]=="退休")
								return color[5];
							else if(data1[i][0]=="军人")
								return color[6];
							else if(data1[i][0]=="其他")
								return color[7];
							else
								return "#FFEBCD";
						})
					//.transition().duration(1500)
					.on("mouseover", function(d) {
							var m = d3.select(this).attr("id");
							$("#" + m).css("stroke-width", 8)
							$("#" + m).css("opacity", 1)
						})
						.on("mouseout", function(d) {
							var m = d3.select(this).attr("id");
							tooltip.style("opacity", 0.0);
							$("#" + m).css("stroke-width", 1)
							$("#" + m).css("opacity", 0.7)
						});
	var polyline = svg.selectAll("polyline")
		                .data(piedata)
						.enter()
		                .append("polyline")
						.attr("transform","translate(175,175)")
						.transition().duration(1500)
						.attr("points", function (d) {
							var pos=[];
								 pos[0] = (arc.centroid(d)[0] * 1.5)+(((d.startAngle + (d.endAngle - d.startAngle) / 2) < Math.PI ? 30 : -30))
								 pos[1] = arc.centroid(d)[1] * 1.5;
		                        //折线从饼图文本中心位置开始，到饼图外圆文本的中心位置，再到文本的显示位置
		                        return arc.centroid(d)[0] * 1.25+","+ arc.centroid(d)[1] * 1.25+" "+ arc.centroid(d)[0] * 1.5+","+arc.centroid(d)[1] * 1.5+" "+pos[0]+","+pos[1];
		                   
		                })
						.attr("stroke","white")
						.attr("stroke-width","1px")
						.attr("fill","none");
	var text=svg.selectAll(".text")
				.data(piedata)
				.enter()
				.append("text")
				.attr("transform","translate(175,175)")
				.attr("text-anchor","middle")
				.attr("x",function(d){
					return  (arc.centroid(d)[0] * 1.5)+(((d.startAngle + (d.endAngle - d.startAngle) / 2) < Math.PI ? 30 : -30))
				})
				.attr("y",function(d){
					return arc.centroid(d)[1] * 1.5-3;
				})
				.text(function(d){
					console.log(d)
					 var percent=Number(d.value)/(data['num'])*100;
					 return d.data[0]+percent.toFixed(1)+"%";
				})
				.attr("fill","white");
		

	//淡化背景
	var div2=document.createElement('div');
	div2.style.width = '2200px';
	div2.style.height = '800px';
	div2.style.position = 'absolute';
	div2.style.top = '0';
	div2.style.backgroundColor = "#B3CDE3";
	div2.style.opacity = '0.4';
	BG.appendChild(div2);
	//文本
	
	//删除键
	var remove = document.createElement('button');
	remove.innerHTML = 'X';
	remove.style.left = '0%';
	remove.style.top = '0';
	remove.style.zIndex = 100000;
	remove.style.position = 'absolute';
	div.appendChild(remove);
	remove.onclick = function(){
		//找到上面创建的两个div的父节点，清除父节点下的div与div2
		div.parentNode.removeChild(div);
		div2.parentNode.removeChild(div2);
		
	//	$("#"+a).attr("href", "imag/person.png");
	}
}
function inter3(d,a,i){  //大事件
	console.log(d[0])
	var BG=document.getElementById("Party_line");
	//文本框
	var div = document.createElement('div');
	var id =document.createAttribute('id')
	id.value='box';
	div.setAttributeNode(id);//添加id
	div.style.width = '300px';
	div.style.height = "300px";
	div.style.backgroundColor = 'rgb(28 ,28 ,28,0.6)';
	div.style.zIndex = 1000;
	div.style.position = 'absolute';
	div.style.borderRadius = '5px';
	if(event.pageX<=300){
		div.style.left =(300-event.pageX)+"px";
		div.style.top = (event.pageY-300)+"px";
	}
	else{
		div.style.left =(event.pageX-300)+"px";
		div.style.top = (event.pageY-300)+"px";
	}
	BG.appendChild(div);
	
	//背景淡化
	var div2=document.createElement('div');
	div2.style.width = '2200px';
	div2.style.height = '820px';
	div2.style.position = 'absolute';
	div2.style.top = '0';
	div2.style.backgroundColor = 'rgb(28 ,28 ,28,0.6)';
	BG.appendChild(div2);
	//文本
	$("#box").html("<div>"+
	                "<h4 style='text-align:center' >"+d[0]["title"]+"</h4>"+
	                "<img src="+d[0]["typeData"]+" width=150px height=150px  alt='图片无法正常加载'/>"+
	                "<p style='font-size:1px font:white' id='event'>"+d[0]["desc"]+"</p>"+
	                "</div>") 
	//删除键
	var remove = document.createElement('button');
	remove.innerHTML = 'X';
	remove.style.left = '0%';
	remove.style.top = '0';
	remove.style.zIndex = 100000;
	remove.style.position = 'absolute';
	div.appendChild(remove);
	remove.onclick = function(){
		//找到上面创建的两个div的父节点，清除父节点下的div与div2
		div.parentNode.removeChild(div);
		div2.parentNode.removeChild(div2);
		$("#"+a).attr("href", "imag/person.png");
	}
}
function inter4(){ //党代会
	var BG=document.getElementById("Party_line");
	//文本框
	var div = document.createElement('div');
	var id =document.createAttribute('id')
	id.value='SVG';
	div.setAttributeNode(id);//添加id
	div.style.width = '350px';
	div.style.height = "350px";
	div.style.backgroundColor = 'navajowhite';
	div.style.zIndex = 1000;
	div.style.position = 'absolute';
	div.style.borderRadius = '5px';
	if(event.pageX<=350){
		div.style.left =(350-event.pageX)+"px";
		div.style.top = (event.pageY-200)+"px";
	}
	else{
		div.style.left =(event.pageX-350)+"px";
		div.style.top = (event.pageY-350)+"px";
	}
	
	BG.appendChild(div);
	var svg = d3.select('#SVG').append('svg')
		.attr('width',350)
		.attr('height',350);
	
	var xy=[
		{x:175,y:40,color:"red",text:"时间"},
		{x:310,y:170,color:"orange",text:"地点"},
		{x:240,y:310,color:"yellow",text:"会议代表"},
		{x:110,y:310,color:"green",text:"背景"},
		{x:40,y:170,color:"blue",text:"纲领"}
	];
	var dataset={"time":"1922年7月16日至23日","addr":"中国上海","repre":"陈独秀、邓中夏、张国焘、蔡和森、高君宇为中央执行委员会委员等","num":"12人","纲领":"《中国共产党第二次全国代表大会宣言》","background":"马克思主义的传播 中国工人运动的兴起"}
	
	var line=svg
	.append("polygon")
	.attr("points","175,40 310,170 240,310 110,310 40,170 ")
	.attr("fill","yellow")
	.attr("opacity",0.2)
	.attr("stroke","black")
	
	svg.selectAll("text")
			 .append("g")
			 .data(xy)
			 .enter()
			 .append("text") 
			 .text(function(xy){
				return xy.text;   
			 })
			.attr('x', function(d) {
			 return d.x;
			})
			.attr('y', function(d) {
			 return d.y;
			})
			.attr('dy',5)
			.attr("text-anchor","middle")
			 .attr("font-size",10)
	var circle=svg.selectAll("circle")
				.data(xy)
				.enter()
				.append("circle")
				.attr('cx',function(xy,i){
					return xy.x;
				})
				.attr("id",function(d,i){
					return "c"+i;
				})
				.attr("cy",function(xy,i){
					return xy.y;
				})
				.attr("r",20)
				.attr("fill",function(xy,i){
					return xy.color;
				})
				.attr("opacity",0.4)
				.on("mouseover",function(d){
					var a=d3.select(this).attr("id").substring(1);
					if(a==0){
						t="<div>"+
							"<br /><br /><br /><br /><div style='text-align:center' >"+dataset["time"]+"</div>"+
						"</div>";
					}
					else if(a==1){
						t="<div>"+
							"<br /><br /><h3 style='text-align:center' >"+dataset["addr"]+"</h3>"+
						"</div>";
					}
					else if(a==2){
						t="<div>"+
							"<br /><h3 style='text-align:center' >"+dataset["num"]+"</h3>"+
							"<br /><div style='text-align:center' >"+dataset["repre"]+"</div>"+
						"</div>";
					}
					else if(a==3){
						t="<div>"+
							"<br /><br /><br /><div style='text-align:center' >"+dataset["background"]+"</div>"+
						"</div>";
					}
					else if(a==4){
						t="<div>"+
							"<br /><br /><br /><br /><div style='text-align:center' >"+dataset["纲领"]+"</div>"+
						"</div>";
					}
							//.attr("stroke-width",2)
					tooltip.html(t)
						.style("left", 80+"px")
						.style("top",95+"px")
						.style("width","190px")
						.style("height","190px")
						.style("border-radius", "100px")
						.style("opacity",1.0)
					d3.select(this)
							.attr("fill",function(d){
								return d["color"];
							})
							.attr("opacity",0.7)
				})
				 .on("mouseout",function(d){
					 tooltip.style("opacity",0)
					d3.select(this)
					.attr("fill",function(d){
						return d["color"];
					})
					.attr("opacity",0.4)
				 });							
				 var tooltip = d3.select("#SVG")
								  .append("div")
								  .attr("class","tooltip")
								  .attr("id","Tooltip")
								  .style("opacity",0.0)
				var fill = d3.scale.category20();
				
				var layout = d3.layout.cloud()
				    .size([200, 200])
				    .words([
				      "中央局","陈独秀","成立","中国共产党第一个纲领","无产阶级","中国共产党","第三国际","诞生","马列主义理论"].map(function(d) {
				      return {text: d, size: 20};
				    }))
				    .padding(5)
				    .rotate(function() { return ~~(Math.random() * 2) * 90; })
				    .font("Impact")
				    .fontSize(function(d) { return d.size; })
				    .on("end", draw);
				
				layout.start();
				
				function draw(words) {
				 svg.append("g").selectAll("text") 
					.data(words)
				    .enter().
					append("text")
					.attr("transform", "translate(" + 100 + "," +100+ ")")
				      .style("font-size", function(d) { return d.size + "px"; })
				      .style("font-family", "Impact")
				      .style("fill", function(d, i) { return fill(i); })
				      .attr("text-anchor", "middle")
				      .attr("transform", function(d) {
				        return "translate(" + [d.x+175, d.y+200] + ")rotate(" + d.rotate + ")";
				      })
				      .text(function(d) { return d.text; });
				}
						
	
	//淡化背景
	var div2=document.createElement('div');
	div2.style.width = '2200px';
	div2.style.height = '800px';
	div2.style.position = 'absolute';
	div2.style.top = '0';
	div2.style.backgroundColor = "#B3CDE3";
	div2.style.opacity = '0.4';
	BG.appendChild(div2);
	//文本
	
	//删除键
	var remove = document.createElement('button');
	remove.innerHTML = 'X';
	remove.style.left = '0%';
	remove.style.top = '0';
	remove.style.zIndex = 100000;
	remove.style.position = 'absolute';
	div.appendChild(remove);
	remove.onclick = function(){
		//找到上面创建的两个div的父节点，清除父节点下的div与div2
		div.parentNode.removeChild(div);
		div2.parentNode.removeChild(div2);
		
	//	$("#"+a).attr("href", "imag/person.png");
	}
}
Education();
function Education(){
	d3.json("json/education.json",function(error,data){
		if(error)
			console.log(error);
		else{
			g.append("g").selectAll(".circle")
					.data(data)
					.enter()
					.append("circle")
					.attr('transform','translate('+padding.left+','+50+')')
					.attr("cx",function(d,i){
						console.log(d["time"])
						return xScale(d["time"].substring(0,4));
					})
					.attr('id',function(d,i){
						return "cir"+i;
					})
					.attr("cy",0)
					.attr("r",5)
					.attr("fill","#4169E1")
					.on("mouseover",function(d,i){                           //圆圈变大
									var a= d3.select(this).attr("id").substring(3)
									console.log(a)
									 d3.select(this).transition()
								    .duration(2000)
								     .attr("r", 10);
									 if(i==2){
										 c=i-1;
										 var b="#edu"+a;
										$(b).css("stroke-width",4);
										var b="#edu"+c;
										$(b).css("stroke-width",4);
									 }
									 else{
										 var b="#edu"+a;
										 $(b).css("stroke-width",4);
									 }
									 
								})
					.on("mouseout",function(d,i){
									var a= d3.select(this).attr("id").substring(3)
									d3.select(this).transition()
								    .duration(2000)
								    .attr("r", 5);
									if(i==2){
										c=i-1;
										var b="#edu"+a;
										$(b).css("stroke-width",1);
										var b="#edu"+c;
										$(b).css("stroke-width",1);
									}
									else{
										var b="#edu"+a;
										$(b).css("stroke-width",1);
									}
								});
		g.append('g').selectAll(".path")
			.data(data)
			.enter()
			.append("path")
			.attr("class","Education")
			.attr("id",function(d,i){
							return "edu"+i;
					})
			.attr("transform","translate("+padding.left+","+(50)+")")
			.attr('d',function(d,i){
				if(i==0)
				return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+220;
				else if(i==1)
				return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+250+'L'+(xScale(d["time"].substring(0,4))-180)+' '+250;
				else if(i==2)
				return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+290+'L'+(xScale(d["time"].substring(0,4))-180)+' '+290;
				else if(i==3)
				return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+270+'L'+(xScale(d["time"].substring(0,4))-140)+' '+270;
				else if(i==4)
				return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+215;
				else if(i==5)
				return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+230+'L'+(xScale(d["time"].substring(0,4))+15)+' '+230;
				else if(i==6)
				return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+225;
				else if(i==7)
				return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+240+'L'+(xScale(d["time"].substring(0,4))-10)+' '+240;
				else if(i==8)
				return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+250+'L'+(xScale(d["time"].substring(0,4))-15)+' '+250;
				else if(i==9)
				return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+230;
			})
			
			.attr("fill","none")
			.attr("stroke","#4169E1")
			.attr("stroke-width",1)
			.style("opacity",0)
			.transition()
			.delay(function(d,i){
			    return i * 200;
			})
			.duration(1500)
			.attr("fill","none")
			.style("opacity",0.3)
			.attr("stroke-width",1)
			.attr("stroke","#4169E1")
			.attr("marker-end","url(#arrow)");
			
		g.append('g').selectAll(".rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("class","Education")
			.attr("id",function(d,i){
							return "rect0"+i;
						})
			.attr("transform","translate("+padding.left+","+(padding.top)+")")
			.on("click",function(d,i){
				var a=d3.select(this).attr("id");
				inter1(d,a,i);
			})
			.attr('x',function(d,i){
				if(i==0)
				return xScale(d["time"].substring(0,4))-20;
				else if(i==1)
				return xScale(d["time"].substring(0,4))-222;
				 else if(i==2)
				 return xScale(d["time"].substring(0,4))-222;
				 else if(i==3)
				return xScale(d["time"].substring(0,4))-210;
				 else if(i==4)
				return xScale(d["time"].substring(0,4))-50;
				 else if(i==5)
				 return xScale(d["time"].substring(0,4))+20;
				 else if(i==6)
				return xScale(d["time"].substring(0,4))-25;
				else if(i==7)
				 return xScale(d["time"].substring(0,4))-92;
				 else if(i==8)
				 return xScale(d["time"].substring(0,4))-70;
				 else if(i==9)
				 return xScale(d["time"].substring(0,4))-22;
			})
			.attr("fill","#4169E1")
			.attr("stroke","#4169E1")
			.attr("stroke-width",1)
			.style("opacity",0.35)
			.attr("y",100)
			.transition()
			.delay(function(d,i){
			    return i * 200;
			})
			.duration(1500)
			.attr("y",function(d,i){
				if(i==0)
				return -65;
				else if(i==1)
				return -55;
				else if(i==2)
				 	return -15;
				 else if(i==3)
				 	return -35;
				else if(i==4)
				 	return -70;
				else if(i==5)
				 	return -75;
				 else if(i==6)
				 	return -60;
				 else if(i==7)
					return -60;
				  else if(i==8)
				 	return -50;
				 else if(i==9)
				 	return -55;
			})
			.attr("width",function(d,i){
				if(i==0)
				return 40;
				if(i==2)
				return 38;
				if(i==3)
				return 65;
				if(i==4)
				return 85;
				if(i==5)
					return 50;
				 if(i==6)
					return 50;
				if(i==7)
					return 78;
				if(i==8)
					return 50;
				if(i==9)
					return 45;
				return 38;
			})
			.attr("height",function(d,i){
				return 30;
			})
			.attr("fill","#4169E1")
			.style("opacity",0.3)
			.attr("stroke-width",1)
			.attr("stroke","#4169E1");
			
		g.append('g').selectAll(".text")
			.data(data)
			.enter()
			.append("text")
			.attr("class","Education")
			.attr("transform",function(d,i){
				if(i==0)
				return "translate("+(xScale(d["time"].substring(0,4))+85)+","+285+")";
				 if(i==1)
				 return "translate("+(xScale(d["time"].substring(0,4))-115)+","+295+")";
				if(i==2)
				  return "translate("+(xScale(d["time"].substring(0,4))-120)+","+335+")";
				if(i==3)
				return "translate("+(xScale(d["time"].substring(0,4))-110)+","+315+")";
				if (i==4)
				  return "translate("+(xScale(d["time"].substring(0,4))+50)+","+280+")";
				 if(i==5)
				  return "translate("+(xScale(d["time"].substring(0,4))+120)+","+(275)+")";
				 if(i==6)
				 return "translate("+(xScale(d["time"].substring(0,4))+80)+","+(290)+")";
				  if(i==7)
				  return "translate("+(xScale(d["time"].substring(0,4))+10)+","+(290)+")";
				if(i==8)
				 return "translate("+(xScale(d["time"].substring(0,4))+35)+","+(300)+")";
				 if(i==9)
				 return "translate("+(xScale(d["time"].substring(0,4))+80)+","+(295)+")";
			})
			.attr("x",function(d,i){ 
					d3.select(this).append('tspan')
					   .attr('x', 0)
					   .attr('dy',0)
					    .attr("font-size",9)
					   .text(d["time"])
					   .attr("fill","white")
					   .style("opacity",0)
					   .transition()
					   .delay(function(d,i){
					       return i * 200;
					   })
					   .duration(1500)
					   .attr("fill","#FFDAB9")
					   .style("opacity",1)
					d3.select(this).append('tspan')
						.attr('x', 1)
						.attr('dy',14)
					    .text(function() {
					        return d["name"];
					    })
						.attr("fill","white")
						.style("opacity",0)
						.transition()
						.delay(function(d,i){
						    return i * 200;
						})
						.duration(1500)
						.style("opacity",1)
						.attr("font-size",10)
						.attr("fill","#FFDAB9")
			    })
				.attr("pointer-events", "none");
		}
	})
 }
Science();
function Science(){
	d3.json("json/science.json",function(error,data){
		if(error)
			console.log(error);
		else{
			console.log(data)
			g.append("g").selectAll(".circle")
					.data(data)
					.enter()
					.append("circle")
					.attr('transform','translate('+padding.left+','+90+')')
					.attr("cx",function(d,i){
						console.log(d["time"])
						return xScale(d["time"].substring(0,4));
					})
					.attr('id',function(d,i){
						return "cir"+i;
					})
					.attr("cy",0)
					.attr("r",5)
					.attr("fill","#9370DB")
					.on("mouseover",function(d){                           //圆圈变大
									var a= d3.select(this).attr("id").substring(3)
									console.log(a)
									 d3.select(this).transition()
								    .duration(2000)
								     .attr("r", 10);
									 var b="#sci"+a;
									 $(b).css("stroke-width",4);
								})
					.on("mouseout",function(d){
									var a= d3.select(this).attr("id").substring(3)
									d3.select(this).transition()
								    .duration(2000)
								    .attr("r", 5);
									var b="#sci"+a;
									$(b).css("stroke-width",1);
								});
			g.append('g').selectAll(".path")
				.data(data)
				.enter()
				.append("path")
				.attr("class","Science")
				.attr("id",function(d,i){
								return "sci"+i;
						})
				.attr("transform","translate("+padding.left+","+(90)+")")
				.attr('d',function(d,i){
					if(i==0)
						return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))+5)+' '+20+'L'+(xScale(d["time"].substring(0,4))+5)+' '+235;
					else if(i==1)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+280;
					else if(i==2)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))+5)+' '+20+'L'+(xScale(d["time"].substring(0,4))+5)+' '+230+'L'+(xScale(d["time"].substring(0,4))+10)+' '+230;
					else if(i==3)
						return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-70)+' '+20+'L'+(xScale(d["time"].substring(0,4))-70)+' '+230;
					else if(i==4)
						return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+205+'L'+(xScale(d["time"].substring(0,4))-5)+' '+205;
				 	else if(i==5)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+280+'L'+(xScale(d["time"].substring(0,4))-5)+' '+280;
					 else if(i==6)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+245+'L'+(xScale(d["time"].substring(0,4))+5)+' '+245;
					 else if(i==7)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+260+'L'+(xScale(d["time"].substring(0,4))-10)+' '+260;
					else if(i==8)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))+5)+' '+20+'L'+(xScale(d["time"].substring(0,4))+5)+' '+300+'L'+(xScale(d["time"].substring(0,4))-10)+' '+300;
					else if(i==9)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+250+'L'+(xScale(d["time"].substring(0,4))-10)+' '+250;
					else if(i==10)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+275+'L'+(xScale(d["time"].substring(0,4))-15)+' '+275;
					else if(i==11)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+275+'L'+(xScale(d["time"].substring(0,4))+0)+' '+275;
					 else if(i==12)
						return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+310+'L'+(xScale(d["time"].substring(0,4))+0)+' '+310;
					else if(i==13)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-15)+' '+20+'L'+(xScale(d["time"].substring(0,4))-15)+' '+235+'L'+(xScale(d["time"].substring(0,4))-10)+' '+235;
					else if(i==14)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+250+'L'+(xScale(d["time"].substring(0,4))+10)+' '+250;
					else if(i==15)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+275+'L'+(xScale(d["time"].substring(0,4))+10)+' '+275;
					else if(i==16)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+270+'L'+(xScale(d["time"].substring(0,4))+10)+' '+270;
					 else if(i==17)
						return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+300+'L'+(xScale(d["time"].substring(0,4))+5)+' '+300;
					else if(i==18)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-15)+' '+20+'L'+(xScale(d["time"].substring(0,4))-15)+' '+235+'L'+(xScale(d["time"].substring(0,4))-10)+' '+235;
					else if(i==19)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+265;
													
				})
				.attr("fill","none")
				.attr("stroke","#9370DB")
				.attr("stroke-width",1)
				.style("opacity",0)
				.transition()
				.delay(function(d,i){
				    return i * 200;
				})
				.duration(1500)
				.attr("fill","none")
				.style("opacity",0.5)
				.attr("stroke-width",1)
				.attr("stroke","#9370DB")
				.attr("marker-end","url(#arrow)");
			g.append('g').selectAll(".rect")
				.data(data)
				.enter()
				.append("rect")
				.attr("class","Science")
				.attr("id",function(d,i){
								return "rect1"+i;
							})
				.attr("transform","translate("+padding.left+","+(padding.top)+")")
				.on("click",function(d,i){
					var a=d3.select(this).attr("id");
					inter1(d,a,i);
				})
				.attr('x',function(d,i){
					if(i==0)
					return xScale(d["time"].substring(0,4))-25;
					else if(i==1)
					return xScale(d["time"].substring(0,4))-32;
					 else if(i==2)
					 return xScale(d["time"].substring(0,4))+15;
					 else if(i==3)
					return xScale(d["time"].substring(0,4))-95;
					 else if(i==4)
					return xScale(d["time"].substring(0,4))-60;
					 else if(i==5)
					 return xScale(d["time"].substring(0,4))-75;
					 else if(i==6)
					return xScale(d["time"].substring(0,4))+10;
					else if(i==7)
						return xScale(d["time"].substring(0,4))-82;
					 else if(i==8)
					 return xScale(d["time"].substring(0,4))-95;
					 else if(i==9)
					 return xScale(d["time"].substring(0,4))-65;
					 else if(i==10)
					 return xScale(d["time"].substring(0,4))-70;
					 else if(i==11)
					 	return xScale(d["time"].substring(0,4))+5;
					 else if(i==12)
					 	return xScale(d["time"].substring(0,4))+5;
					 else if(i==13)
					 	return xScale(d["time"].substring(0,4))-8;
					 else if(i==14)
					 	return xScale(d["time"].substring(0,4))+15;
					 else if(i==15)
					 	return xScale(d["time"].substring(0,4))+10;
					 else if(i==16)
					 	return xScale(d["time"].substring(0,4))+10;
					else if(i==17)
						return xScale(d["time"].substring(0,4))+9;
					else if(i==18)
						return xScale(d["time"].substring(0,4))-5;
					else if(i==19)
						return xScale(d["time"].substring(0,4))-10;

				})
				.attr("fill","#9370DB")
				.attr("stroke","#9370DB")
				.attr("stroke-width",1)
				.style("opacity",0.35)
				.attr("y",100)
				.transition()
				.delay(function(d,i){
				    return i * 200;
				})
				.duration(1000)
				.attr("y",function(d,i){
					if(i==0)
					return -10;
					else if(i==1)
					return 35;
					else if(i==2)
					 	return -35;
					 else if(i==3)
					 	return -15;
					else if(i==4)
					 	return -55;
					else if(i==5)
					 	return 15;
					 else if(i==6)
					 	return -15;
					 else if(i==7)
						return -5;
					  else if(i==8)
					 	return 30;
					 else if(i==9)
					 	return -20;
					else if(i==10)
						return 10;
					else if(i==11)
						return 5;
					else if(i==12)
						return 40;
					else if(i==13)
						return -30;
					else if(i==14)
						return -10;
					else if(i==15)
						return 10;
					else if(i==16)
						return 5;
					else if(i==17)
						return 35;
					else if(i==18)
						return -25;
					else if(i==19)
						return 18;
					
				})
				.attr("width",function(d,i){
					if(i==2)
					return 60;
					if(i==4)
					return 50;
					if(i==5)
					return 65;
					if(i==6)
					return 65;
					if(i==7)
					return 70;
					if(i==8)
					return 80;
					if(i==9)
					return 50;
					if(i==10||i==11)
					return 50;
					return 48;
				})
				.attr("height",function(d,i){
					return 30;
				})
				.attr("fill","#9370DB")
				.style("opacity",0.3)
				.attr("stroke-width",1)
				.attr("stroke","#9370DB")
				.attr("marker-end","url(#arrow)");
				
			g.append('g').selectAll(".text")
				.data(data)
				.enter()
				.append("text")
				.attr("class","Science")
				.attr("transform",function(d,i){
					if(i==0)
					return "translate("+(xScale(d["time"].substring(0,4))+80)+","+340+")";
					 if(i==1)
					 return "translate("+(xScale(d["time"].substring(0,4))+70)+","+385+")";
					if(i==2)
					  return "translate("+(xScale(d["time"].substring(0,4))+120)+","+315+")";
					if(i==3)
					return "translate("+(xScale(d["time"].substring(0,4))+10)+","+335+")";
					if (i==4)
					  return "translate("+(xScale(d["time"].substring(0,4))+45)+","+295+")";
					 if(i==5)
					  return "translate("+(xScale(d["time"].substring(0,4))+25)+","+(365)+")";
					 if(i==6)
					 return "translate("+(xScale(d["time"].substring(0,4))+112)+","+(335)+")";
					  if(i==7)
					  return "translate("+(xScale(d["time"].substring(0,4))+20)+","+(347)+")";
					if(i==8)
					 return "translate("+(xScale(d["time"].substring(0,4))+7)+","+(382)+")";
					 if(i==9)
					 return "translate("+(xScale(d["time"].substring(0,4))+40)+","+(330)+")";
					 if(i==10)
					 return "translate("+(xScale(d["time"].substring(0,4))+35)+","+(360)+")";
					 if(i==11)
					 return "translate("+(xScale(d["time"].substring(0,4))+110)+","+(355)+")";
					 if(i==12)
					 return "translate("+(xScale(d["time"].substring(0,4))+110)+","+(390)+")";
					if(i==13)
						 return "translate("+(xScale(d["time"].substring(0,4))+100)+","+(320)+")";
					if(i==14)
					 return "translate("+(xScale(d["time"].substring(0,4))+120)+","+(340)+")";
					if(i==15)
						 return "translate("+(xScale(d["time"].substring(0,4))+110)+","+(360)+")";
					if(i==16)
						  return "translate("+(xScale(d["time"].substring(0,4))+110)+","+(355)+")";
					if(i==17)
						 	 return "translate("+(xScale(d["time"].substring(0,4))+110)+","+(386)+")";
					if(i==18)
						  return "translate("+(xScale(d["time"].substring(0,4))+100)+","+(325)+")";
					if(i==19)
						 	 return "translate("+(xScale(d["time"].substring(0,4))+90)+","+(370)+")";
				})
				.attr("x",function(d,i){ 
						d3.select(this).append('tspan')
						   .attr('x', 0)
						   .attr('dy',0)
						    .attr("font-size",9)
						   .text(d["time"])
						   .attr("fill","white")
						   .style("opacity",0)
						   .transition()
						   .delay(function(d,i){
						       return i * 200;
						   })
						   .duration(1500)
						   .style("opacity",1)
						   .attr("font-size",10)
						   .attr("fill","white")
						   
						d3.select(this).append('tspan')
							.attr('x', 1)
							.attr('dy',14)
						    .text(function() {
						        return d["name"];
						    })
							.attr("fill","white")
							.style("opacity",0)
							.transition()
							.delay(function(d,i){
							    return i * 200;
							})
							.duration(1500)
							.style("opacity",1)
							.attr("font-size",10)
							.attr("font-size",10)
							.attr("fill","white")
				    })
					.attr("pointer-events", "none");
		}
	})
}
Traffic()
function Traffic(){
	d3.json("json/traffic.json",function(error,data){
		if(error)
			console.log(error);
		else{
			console.log(data)
			g.append("g").selectAll(".circle")
					.data(data)
					.enter()
					.append("circle")
					.attr('transform','translate('+padding.left+','+10+')')
					.attr("cx",function(d,i){
						console.log(d["time"])
						return xScale(d["time"].substring(0,4));
					})
					.attr('id',function(d,i){
						return "cir"+i;
					})
					.attr("cy",0)
					.attr("r",5)
					.attr("fill","#f5f5f5")
					.on("mouseover",function(d,i){                           //圆圈变大
									var a= d3.select(this).attr("id").substring(3)
									console.log(a)
									 d3.select(this).transition()
								    .duration(2000)
								     .attr("r", 10);
									 if(a==1||a==7){
											c=i-1;
											var b="#tra"+a;
											$(b).css("stroke-width",4);
											var b="#tra"+(c);
											$(b).css("stroke-width",4);
									 }
									 else{
										 var b="#tra"+a;
										 $(b).css("stroke-width",4);
									 }
								})
					.on("mouseout",function(d,i){
									var a= d3.select(this).attr("id").substring(3)
									d3.select(this).transition()
								    .duration(2000)
								    .attr("r", 5);
									if(i==1||i==7){
										c=i-1;
										var b="#tra"+a;
										$(b).css("stroke-width",1);
										var b="#tra"+(c);
										$(b).css("stroke-width",1);
									}
									else{
										 var b="#tra"+a;
										 $(b).css("stroke-width",1);
									}
								});
					
		}
	g.append("g").selectAll(".path")
		.data(data)
		.enter()
		.append("path")
		.attr("transform","translate("+padding.left+","+10+")")
		.attr("class","Traffic")
		.attr("id",function(d,i){
						return "tra"+i;
				})
		.attr('d',function(d,i){
			if(i==0)
			return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+225+'L'+(xScale(d["time"].substring(0,4))-100)+' '+225;
			else if(i==1)
			return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+260+'L'+(xScale(d["time"].substring(0,4))-100)+' '+260;
		 else if(i==2)
			return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+240+'L'+(xScale(d["time"].substring(0,4))-20)+' '+240;
		 	else if(i==3)
				return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))+30)+' '+20+'L'+(xScale(d["time"].substring(0,4))+30)+' '+230+'L'+(xScale(d["time"].substring(0,4))+20)+' '+230;
		 	else if(i==4)
		 		return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+225+'L'+(xScale(d["time"].substring(0,4))-7)+' '+225;
		 	else if(i==5)
		 		return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+260+'L'+(xScale(d["time"].substring(0,4))-7)+' '+260;
		 	else if(i==6)
		 		return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+225+'L'+(xScale(d["time"].substring(0,4))-20)+' '+225;
		 	else if(i==7)
		 		return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+260+'L'+(xScale(d["time"].substring(0,4))-20)+' '+260;
		 	else if(i==8)
		 		return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+250+'L'+(xScale(d["time"].substring(0,4))+10)+' '+250;
			else if(i==9)
			 		return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+260+'L'+(xScale(d["time"].substring(0,4))-10)+' '+260;
			else if(i==10)
			 		return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+225+'L'+(xScale(d["time"].substring(0,4))-15)+' '+225;
			else if(i==11)
			 		return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+300+'L'+(xScale(d["time"].substring(0,4))+15)+' '+300;
			else if(i==12)
			 		return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+225+'L'+(xScale(d["time"].substring(0,4))+5)+' '+225;
			else if(i==13)
				 		return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+265+'L'+(xScale(d["time"].substring(0,4))+5)+' '+265;
			
		})
		.attr("fill","none")
		.attr("stroke","#F5F5F5")
		.attr("stroke-width",1)
		.style("opacity",0)
		.transition()
		.delay(function(d,i){
		    return i * 200;
		})
		.duration(1500)
		.attr("fill","none")
		.style("opacity",0.5)
		.attr("stroke-width",1)
		.attr("stroke","#F5F5F5")
		.attr("marker-end","url(#arrow)");
		
		g.append('g').selectAll(".rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("class","Traffic")
			.attr("id",function(d,i){
							return "rect2"+i;
						})
			.attr("transform","translate("+padding.left+","+(padding.top)+")")
			.on("click",function(d,i){
				var a=d3.select(this).attr("id");
				inter1(d,a,i);
			})
			.attr('x',function(d,i){
				if(i==0)
				return xScale(d["time"].substring(0,4))-185;
				else if(i==1)
				return xScale(d["time"].substring(0,4))-162;
				 else if(i==2)
				 return xScale(d["time"].substring(0,4))-72;
				 else if(i==3)
				return xScale(d["time"].substring(0,4))-35;
				 else if(i==4)
				return xScale(d["time"].substring(0,4))-70;
				 else if(i==5)
				 return xScale(d["time"].substring(0,4))-70;
				 else if(i==6)
				return xScale(d["time"].substring(0,4))-80;
				else if(i==7)
				 return xScale(d["time"].substring(0,4))-135;
				 else if(i==8)
				 return xScale(d["time"].substring(0,4))+15;
				 else if(i==9)
				 return xScale(d["time"].substring(0,4))-60;
				 else if(i==10)
				 return xScale(d["time"].substring(0,4))-100;
				else if(i==11)
					return xScale(d["time"].substring(0,4))+20;
				else if(i==12)
					return xScale(d["time"].substring(0,4))+10;
				else if(i==13)
					return xScale(d["time"].substring(0,4))+10;
			})
			.attr("fill","#F5F5F5")
			.attr("stroke","#F5F5F5")
			.style("opacity",0.35)
			.attr("y",100)
			.transition()
			.delay(function(d,i){
			    return i * 200;
			})
			.duration(1500)
			//.ease("bounce")
			.attr("y",function(d,i){
				if(i==0)
				return -120;
				else if(i==1)
				return -85;
				else if(i==2)
				 	return -105;
				 else if(i==3)
				 	return -113;
				else if(i==4)
				 	return -123;
				else if(i==5)
				 	return -90;
				 else if(i==6)
				 	return -125;
				 else if(i==7)
					return -90;
				  else if(i==8)
				 	return -95;
				 else if(i==9)
				 	return -80;
				else if(i==10)
					return -120;
				else if(i==11)
					return -45;
				else if(i==12)
					return -120;
				else if(i==13)
					return -80;
			})
			.attr("width",function(d,i){
				if(i==0)
				return 80;
				if(i==2)
				return 48;
				if(i==3)
				return 50;
				 if(i==7)
					return 112;
				if(i==8)
					return 40;
				if(i==9)
					return 45;
				if(i==10)
					return 80;
				if(i==11)
					return 140;
				if(i==13)
					return 60;
				return 58;
			})
			.attr("height",function(d,i){
				return 30;
			})
			.attr("fill","#F5F5F5")
			.style("opacity",0.3)
			.attr("stroke-width",1)
			.attr("stroke","#F5F5F5")
			.attr("marker-end","url(#arrow)");
			
		g.append('g').selectAll(".text")
			.data(data)
			.enter()
			.append("text")
			.attr("class","Traffic")
			.attr("transform",function(d,i){
				if(i==0)
				return "translate("+(xScale(d["time"].substring(0,4))-80)+","+230+")";
				 if(i==1)
				 return "translate("+(xScale(d["time"].substring(0,4))-55)+","+265+")";
				if(i==2)
				  return "translate("+(xScale(d["time"].substring(0,4))+30)+","+248+")";
				if(i==3)
				return "translate("+(xScale(d["time"].substring(0,4))+70)+","+240+")";
				if (i==4)
				  return "translate("+(xScale(d["time"].substring(0,4))+40)+","+230+")";
				 if(i==5)
				  return "translate("+(xScale(d["time"].substring(0,4))+30)+","+(260)+")";
				 if(i==6)
				 return "translate("+(xScale(d["time"].substring(0,4))+20)+","+(230)+")";
				  if(i==7)
				  return "translate("+(xScale(d["time"].substring(0,4))-35)+","+(260)+")";
				if(i==8)
				 return "translate("+(xScale(d["time"].substring(0,4))+120)+","+(255)+")";
				 if(i==9)
				 return "translate("+(xScale(d["time"].substring(0,4))+40)+","+(275)+")";
				 if(i==10)
				 return "translate("+(xScale(d["time"].substring(0,4))-0)+","+(230)+")";
				 if(i==11)
				 return "translate("+(xScale(d["time"].substring(0,4))+120)+","+(305)+")";
				 if(i==12)
				 return "translate("+(xScale(d["time"].substring(0,4))+115)+","+(230)+")";
				if(i==13)
					 return "translate("+(xScale(d["time"].substring(0,4))+110)+","+(270)+")";
				
			})
			.attr("x",function(d,i){ 
					d3.select(this).append('tspan')
					   .attr('x', 0)
					   .attr('dy',0)
					    .attr("font-size",9)
						.attr("fill","#696969")
						.style("opacity",0)
						.transition()
						.delay(function(d,i){
						    return i * 200;
						})
						.duration(1500)
						.style("opacity",1)
						.attr("font-size",10)
					   .text(d["time"])
					d3.select(this).append('tspan')
						.attr('x', 1)
						.attr('dy',12)
					    .text(function() {
					        return d["name"];
					    })
						.style("opacity",0)
						.transition()
						.delay(function(d,i){
						    return i * 200;
						})
						.duration(1500)
						.style("opacity",1)
						.attr("font-size",10)
						.attr("fill","#696969")
			    })
				.attr("pointer-events", "none");
		})
}
Project();
function Project(){
	d3.json("json/project.json",function(error,data){
		if(error)
			console.log(error);
		else{
			console.log(data)
			g.append("g").selectAll(".circle")
					.data(data)
					.enter()
					.append("circle")
					.attr('transform','translate('+padding.left+','+130+')')
					.attr("cx",function(d,i){
						console.log(d["time"])
						return xScale(d["time"].substring(0,4));
					})
					.attr('id',function(d,i){
						return "cir"+i;
					})
					.attr("cy",0)
					.attr("r",5)
					.attr("fill","#aa5500")
					.on("mouseover",function(d,i){                           //圆圈变大
									var a= d3.select(this).attr("id").substring(3)
									console.log(a)
									 d3.select(this).transition()
								    .duration(2000)
								     .attr("r", 10);
									 if(a==9||a==17){
											c=i-1;
											var b="#pro"+a;
											$(b).css("stroke-width",4);
											var b="#pro"+(c);
											$(b).css("stroke-width",4);
									 }
									 else{
										 var b="#pro"+a;
										 $(b).css("stroke-width",4);
									 }
								})
					.on("mouseout",function(d,i){
									var a= d3.select(this).attr("id").substring(3)
									d3.select(this).transition()
								    .duration(2000)
								    .attr("r", 5);
									if(i==9||i==17){
										c=i-1;
										var b="#pro"+a;
										$(b).css("stroke-width",1);
										var b="#pro"+(c);
										$(b).css("stroke-width",1);
									}
									else{
										 var b="#pro"+a;
										 $(b).css("stroke-width",1);
									}
								});
					
			g.append('g').selectAll(".path")
				.data(data)
				.enter()
				.append("path")
				.attr("class","Project")
				.attr("id",function(d,i){
								return "pro"+i;
						})
				.attr("transform","translate("+padding.left+","+(130)+")")
				.attr('d',function(d,i){
					if(i==0)
						return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+245+'L'+(xScale(d["time"].substring(0,4))-200)+' '+245;
					else if(i==1)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+280+'L'+(xScale(d["time"].substring(0,4))-180)+' '+280;
					else if(i==2)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))+5)+' '+20+'L'+(xScale(d["time"].substring(0,4))+5)+' '+230+'L'+(xScale(d["time"].substring(0,4))-140)+' '+230;
					else if(i==3)
						return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+320+'L'+(xScale(d["time"].substring(0,4))+10)+' '+320;
					else if(i==4)
						return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))+5)+' '+20+'L'+(xScale(d["time"].substring(0,4))+5)+' '+275+'L'+(xScale(d["time"].substring(0,4))+10)+' '+275;
				 	else if(i==5)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+300;
					 else if(i==6)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))+5)+' '+20+'L'+(xScale(d["time"].substring(0,4))+5)+' '+270;
					 else if(i==7)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+260+'L'+(xScale(d["time"].substring(0,4))-10)+' '+260;
					else if(i==8)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))+7)+' '+20+'L'+(xScale(d["time"].substring(0,4))+7)+' '+290+'L'+(xScale(d["time"].substring(0,4))-10)+' '+290;
					else if(i==9)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))+7)+' '+20+'L'+(xScale(d["time"].substring(0,4))+7)+' '+320+'L'+(xScale(d["time"].substring(0,4))-10)+' '+320;
					else if(i==10)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+360+'L'+(xScale(d["time"].substring(0,4))-3)+' '+360;
					else if(i==11)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+320+'L'+(xScale(d["time"].substring(0,4))-10)+' '+320;
					 else if(i==12)
						return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-7)+' '+20+'L'+(xScale(d["time"].substring(0,4))-7)+' '+280+'L'+(xScale(d["time"].substring(0,4))-15)+' '+280;
					 else if(i==13)
					  	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-7)+' '+20+'L'+(xScale(d["time"].substring(0,4))-7)+' '+305+'L'+(xScale(d["time"].substring(0,4))+0)+' '+305;
					 else if(i==14)
					  	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+350+'L'+(xScale(d["time"].substring(0,4))+5)+' '+350;
					 else if(i==15)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+300;
					else if(i==16)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+270;
					 else if(i==17)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+320;								
				})
				.attr("fill","none")
				.attr("stroke","#aa5500")
				.attr("stroke-width",1)
				.style("opacity",0)
				.transition()
				.delay(function(d,i){
				    return i * 200;
				})
				.duration(1500)
				.attr("fill","none")
				.style("opacity",0.3)
				.attr("stroke-width",1)
				.attr("stroke","#aa5500")
				.attr("marker-end","url(#arrow)");
			g.append('g').selectAll(".rect")
				.data(data)
				.enter()
				.append("rect")
				.attr("class","Project")
				.attr("id",function(d,i){
								return "rect3"+i;
							})
				.attr("transform","translate("+padding.left+","+(padding.top)+")")
				.on("click",function(d,i){
					var a=d3.select(this).attr("id");
					inter1(d,a,i);
				})
				.attr('x',function(d,i){
					if(i==0)
					return xScale(d["time"].substring(0,4))-250;
					else if(i==1)
					return xScale(d["time"].substring(0,4))-230;
					 else if(i==2)
					 return xScale(d["time"].substring(0,4))-205;
					 else if(i==3)
					return xScale(d["time"].substring(0,4))+15;
					 else if(i==4)
					return xScale(d["time"].substring(0,4))+15;
					 else if(i==5)
					 return xScale(d["time"].substring(0,4))-25;
					 else if(i==6)
					return xScale(d["time"].substring(0,4))-30;
					else if(i==7)
						return xScale(d["time"].substring(0,4))-55;
					 else if(i==8)
					 return xScale(d["time"].substring(0,4))-65;
					 else if(i==9)
					 return xScale(d["time"].substring(0,4))-65;
					 else if(i==10)
					 return xScale(d["time"].substring(0,4))-95;
					 else if(i==11)
					 	return xScale(d["time"].substring(0,4))-69;
					 else if(i==12)
					 	return xScale(d["time"].substring(0,4))-105;
					 else if(i==13)
			 		 	return xScale(d["time"].substring(0,4))+4;
			 		 else if(i==14)
			 		 	return xScale(d["time"].substring(0,4))+10;
					 else if(i==15)
					 	return xScale(d["time"].substring(0,4))-30;
					 else if(i==16)
					 	return xScale(d["time"].substring(0,4))-30;
					else if(i==17)
						return xScale(d["time"].substring(0,4))-30;			
				})
				.attr("fill","#aa5500")
				.attr("stroke","#aa5500")
				.style("opacity",0.35)
				.attr("y",100)
				.transition()
				.delay(function(d,i){
				    return i * 200;
				})
				.duration(1500)
				.attr("y",function(d,i){
					if(i==0)
					return 20;
					else if(i==1)
					return 55;
					else if(i==2)
					 	return 5;
					 else if(i==3)
					 	return 95;
					else if(i==4)
					 	return 50;
					else if(i==5)
					 	return 95;
					 else if(i==6)
					 	return 65;
					 else if(i==7)
						return 35;
					  else if(i==8)
					 	return 65;
					 else if(i==9)
					 	return 100;
					else if(i==10)
						return 135;
					else if(i==11)
						return 60;
					else if(i==12)
						return 100;
					else if(i==13)
						return 80;
					else if(i==14)
						return 130;
					else if(i==15)
						return 95;
					else if(i==16)
						return 65;
					else if(i==17)
						return 115;
					
				})
				.attr("width",function(d,i){
					if(i==2)
					return 60;
					if(i==3)
					return 70;
					if(i==4)
					return 60;
					if(i==5)
					return 55;
					if(i==6)
					return 70;
					if(i==7)
					return 40;
					if(i==8)
					return 50;
					if(i==9)
					return 50;
					if(i==10)
					return 90;
					if(i==11)
					return 70;
					if(i==12||i==16||i==17)
					return 70;
					if(i==13||i==15)
					return 65;
					return 48;
				})
				.attr("height",function(d,i){
					return 30;
				})
				.attr("fill","#aa5500")
				.style("opacity",0.3)
				.attr("stroke-width",1)
				.attr("stroke","#aa5500")
				.attr("marker-end","url(#arrow)");
				
			g.append('g').selectAll(".text")
				.data(data)
				.enter()
				.append("text")
				.attr("class","Project")
				.attr("transform",function(d,i){
					if(i==0)
					return "translate("+(xScale(d["time"].substring(0,4))-145)+","+370+")";
					 if(i==1)
					 return "translate("+(xScale(d["time"].substring(0,4))-125)+","+405+")";
					if(i==2)
					  return "translate("+(xScale(d["time"].substring(0,4))-105)+","+355+")";
					if(i==3)
						return "translate("+(xScale(d["time"].substring(0,4))+120)+","+445+")";
					if (i==4)
					  return "translate("+(xScale(d["time"].substring(0,4))+130)+","+400+")";
					 if(i==5)
					  return "translate("+(xScale(d["time"].substring(0,4))+80)+","+(445)+")";
					 if(i==6)
					 return "translate("+(xScale(d["time"].substring(0,4))+70)+","+(415)+")";
					  if(i==7)
					  return "translate("+(xScale(d["time"].substring(0,4))+50)+","+(390)+")";
					if(i==8)
					 return "translate("+(xScale(d["time"].substring(0,4))+40)+","+(415)+")";
					 if(i==9)
					 return "translate("+(xScale(d["time"].substring(0,4))+40)+","+(450)+")";
					 if(i==10)
					 return "translate("+(xScale(d["time"].substring(0,4))+10)+","+(485)+")";
					 if(i==11)
					 return "translate("+(xScale(d["time"].substring(0,4))+20)+","+(450)+")";
					 if(i==12)
					 return "translate("+(xScale(d["time"].substring(0,4))+15)+","+(410)+")";
				 	if(i==13)
				 		 return "translate("+(xScale(d["time"].substring(0,4))+105)+","+(430)+")";
				 	if(i==14)
				 	 return "translate("+(xScale(d["time"].substring(0,4))+120)+","+(480)+")";
					if(i==15)
				 		 return "translate("+(xScale(d["time"].substring(0,4))+70)+","+(445)+")";
					if(i==16)
						  return "translate("+(xScale(d["time"].substring(0,4))+70)+","+(415)+")";
					if(i==17)
						 	 return "translate("+(xScale(d["time"].substring(0,4))+70)+","+(468)+")";
				})
				.attr("x",function(d,i){ 
						d3.select(this).append('tspan')
						   .attr('x', 0)
						   .attr('dy',0)
						    .attr("font-size",9)
							.attr("fill","white")
							.style("opacity",0)
							.transition()
							.delay(function(d,i){
							    return i * 200;
							})
							.duration(1500)
							.style("opacity",1)
							.attr("font-size",10)
						   .text(d["time"])
						   .attr("fill","white")
						   
						d3.select(this).append('tspan')
							.attr('x', 1)
							.attr('dy',14)
						    .text(function() {
						        return d["name"];
						    })
							.attr("fill","white")
							.style("opacity",0)
							.transition()
							.delay(function(d,i){
							    return i * 200;
							})
							.duration(1500)
							.style("opacity",1)
							.attr("font-size",10)
							.attr("font-size",10)
							.attr("fill","white")
				    })
					.attr("pointer-events", "none");
		}
		
	})
}
Medical();
function Medical(){
	d3.json("json/medical.json",function(error,data){
			if(error)
				console.log(error);
			else{
				console.log(data)
				g.append("g").selectAll(".circle")
						.data(data)
						.enter()
						.append("circle")
						.attr('transform','translate('+padding.left+','+170+')')
						.attr("cx",function(d,i){
							console.log(d["time"])
							return xScale(d["time"].substring(0,4));
						})
						.attr('id',function(d,i){
							return "cir"+i;
						})
						.attr("cy",0)
						.attr("r",5)
						.attr("fill","#ffaa00")
						.on("mouseover",function(d,i){                           //圆圈变大
										var a= d3.select(this).attr("id").substring(3)
										console.log(a)
										 d3.select(this).transition()
									    .duration(2000)
									     .attr("r", 10);
										var b="#med"+a;
											$(b).css("stroke-width",4);
									})
						.on("mouseout",function(d,i){
										var a= d3.select(this).attr("id").substring(3)
										d3.select(this).transition()
									    .duration(2000)
									    .attr("r", 5);
										var b="#med"+a;
										$(b).css("stroke-width",1);
									});
				g.append('g').selectAll(".path")
					.data(data)
					.enter()
					.append("path")
					.attr("class","Medical")
					.attr("id",function(d,i){
									return "med"+i;
							})
					.attr("transform","translate("+padding.left+","+(170)+")")
					.attr('d',function(d,i){
						if(i==0)
						return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+320+'L'+(xScale(d["time"].substring(0,4))-150)+' '+320;
						else if(i==1)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+280+'L'+(xScale(d["time"].substring(0,4))-10)+' '+280;
						else if(i==2)
						return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+340+'L'+(xScale(d["time"].substring(0,4))+10)+' '+340;
					 	else if(i==3)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+300;
					 	else if(i==4)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-9)+' '+20+'L'+(xScale(d["time"].substring(0,4))-9)+' '+325;
					 	else if(i==5)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+300+'L'+(xScale(d["time"].substring(0,4))+15)+' '+300;
					 })
					 .attr("fill","none")
					 .attr("stroke","#ffaa00")
					 .attr("stroke-width",1)
					 .style("opacity",0)
					 .transition()
					 .delay(function(d,i){
					     return i * 200;
					 })
					 .duration(1500)
					.attr("fill","none")
					.style("opacity",0.3)
					.attr("stroke-width",1)
					.attr("stroke","#ffaa00")
					.attr("marker-end","url(#arrow)");
				g.append('g').selectAll(".rect")
					.data(data)
					.enter()
					.append("rect")
					.attr("class","Medical")
					.attr("id",function(d,i){
									return "rect4"+i;
								})
					.attr("transform","translate("+padding.left+","+(padding.top)+")")
					.on("click",function(d,i){
						var a=d3.select(this).attr("id");
						inter1(d,a,i);
					})
					.attr('x',function(d,i){
						if(i==0)
						return xScale(d["time"].substring(0,4))-225;
						else if(i==1)
						return xScale(d["time"].substring(0,4))-145;
						 else if(i==2)
						 return xScale(d["time"].substring(0,4))+15;
						 else if(i==3)
						return xScale(d["time"].substring(0,4))-30;
						 else if(i==4)
						return xScale(d["time"].substring(0,4))-50;
						 else if(i==5)
						 return xScale(d["time"].substring(0,4))+20;
					})
					.attr("fill","#ffaa00")
					.attr("stroke","#ffaa00")
					.style("opacity",0.35)
					.attr("y",100)
					.transition()
					.delay(function(d,i){
					    return i * 200;
					})
					.duration(1500)
					.attr("y",function(d,i){
						if(i==0)
						return 135;
						else if(i==1)
						return 95;
						else if(i==2)
						 	return 155;
						 else if(i==3)
						 	return 135;
						else if(i==4)
						 	return 160;
						else if(i==5)
						 	return 115;
					})
					.attr("width",function(d,i){
						if(i==0)
						return 70;
						if(i==1)
						return 130;
						if(i==2)
						return 48;
						if(i==3)
						return 65;
						if(i==4)
						return 85;
						if(i==5)
							return 80;
							return 40;
					})
					.attr("height",function(d,i){
						return 30;
					})
					.attr("fill","#ffaa00")
					.style("opacity",0.3)
					.attr("stroke-width",1)
					.attr("stroke","#ffaa00")
					.attr("marker-end","url(#arrow)");
					
				g.append('g').selectAll(".text")
					.data(data)
					.enter()
					.append("text")
					.attr("class","Medical")
					.attr("transform",function(d,i){
						if(i==0)
						return "translate("+(xScale(d["time"].substring(0,4))-120)+","+485+")";
						 if(i==1)
						 return "translate("+(xScale(d["time"].substring(0,4))-45)+","+445+")";
						if(i==2)
						  return "translate("+(xScale(d["time"].substring(0,4))+120)+","+505+")";
						if(i==3)
						return "translate("+(xScale(d["time"].substring(0,4))+80)+","+485+")";
						if (i==4)
						  return "translate("+(xScale(d["time"].substring(0,4))+50)+","+510+")";
						 if(i==5)
						  return "translate("+(xScale(d["time"].substring(0,4))+120)+","+(465)+")";
											})
					.attr("x",function(d,i){ 
							d3.select(this).append('tspan')
							   .attr('x', 0)
							   .attr('dy',0)
							    .attr("font-size",9)
							   .text(d["time"])
							   .attr("fill","white")
							   .style("opacity",0)
							   .transition()
							   .delay(function(d,i){
							       return i * 200;
							   })
							   .duration(1500)
							   .style("opacity",1)
							   .attr("font-size",10)
							   .attr("fill","white")
							d3.select(this).append('tspan')
								.attr('x', 1)
								.attr('dy',14)
							    .text(function() {
							        return d["name"];
							    })
								.attr("fill","white")
								.style("opacity",0)
								.transition()
								.delay(function(d,i){
								    return i * 200;
								})
								.duration(1500)
								.style("opacity",1)
								.attr("font-size",10)
								.attr("font-size",10)
								.attr("fill","white")
					    })
						.attr("pointer-events", "none");
				}
		})
}
Disaster();
function Disaster(){
	d3.json("json/disaster.json",function(error,data){
			if(error)
				console.log(error);
			else{
				console.log(data)
				g.append("g").selectAll(".circle")
						.data(data)
						.enter()
						.append("circle")
						.attr('transform','translate('+padding.left+','+210+')')
						.attr("cx",function(d,i){
							console.log(d["time"])
							return xScale(d["time"].substring(0,4));
						})
						.attr('id',function(d,i){
							return "cir"+i;
						})
						.attr("cy",0)
						.attr("r",5)
						.attr("fill","#aaaa00")
						.on("mouseover",function(d,i){                           //圆圈变大
										var a= d3.select(this).attr("id").substring(3)
										console.log(a)
										 d3.select(this).transition()
									    .duration(2000)
									     .attr("r", 10);
										var b="#dis"+a;
										 $(b).css("stroke-width",4);
									})
						.on("mouseout",function(d,i){
										var a= d3.select(this).attr("id").substring(3)
										d3.select(this).transition()
									    .duration(2000)
									    .attr("r", 5);
										 var b="#dis"+a;
										$(b).css("stroke-width",1);
									});
				g.append('g').selectAll(".path")
					.data(data)
					.enter()
					.append("path")
					.attr("class","Disaster")
					.attr("id",function(d,i){
									return "dis"+i;
							})
					.attr("transform","translate("+padding.left+","+(210)+")")
					.attr('d',function(d,i){
						if(i==0)
						return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+310;
						else if(i==1)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+310;
					 	else if(i==2)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+280;
					 	else if(i==3)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+20+'L'+(xScale(d["time"].substring(0,4))-5)+' '+280;
					 	else if(i==4)
						return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+320;
					 	else if(i==5)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+280;
					 	else if(i==6)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+xScale(d["time"].substring(0,4))+' '+280;
					 	else if(i==7)
					 	return 'M'+xScale(d["time"].substring(0,4))+' '+0+'L'+(xScale(d["time"].substring(0,4)))+' '+320;
					 })
					 .attr("fill","none")
					 .attr("stroke","#aaaa00")
					 .attr("stroke-width",1)
					 .style("opacity",0)
					 .transition()
					 .delay(function(d,i){
					     return i * 200;
					 })
					 .duration(1500)
					.attr("fill","none")
					.style("opacity",0.3)
					.attr("stroke-width",1)
					.attr("stroke","#aaaa00")
					.attr("marker-end","url(#arrow)");
				g.append('g').selectAll(".rect")
					.data(data)
					.enter()
					.append("rect")
					.attr("class","Disaster")
					.attr("id",function(d,i){
									return "rect5"+i;
								})
					.attr("transform","translate("+padding.left+","+(padding.top)+")")
					.on("click",function(d,i){
						var a=d3.select(this).attr("id");
						inter1(d,a,i);
					})
					.attr('x',function(d,i){
						if(i==0)
						return xScale(d["time"].substring(0,4))-28;
						 else if(i==1)
						 return xScale(d["time"].substring(0,4))-22;
						  else if(i==2)
						  return xScale(d["time"].substring(0,4))-22;
						  else if(i==3)
						 return xScale(d["time"].substring(0,4))-25;
						  else if(i==4)
						 return xScale(d["time"].substring(0,4))-20;
						  else if(i==5)
						  return xScale(d["time"].substring(0,4))-20;
						  else if(i==6)
						return xScale(d["time"].substring(0,4))-25;
						 else if(i==7)
						  return xScale(d["time"].substring(0,4))-23;
					})
					.attr("fill","#aaaa00")
					.attr("stroke","#aaaa00")
					.style("opacity",0.35)
					.attr("y",100)
					.transition()
					.delay(function(d,i){
					    return i * 200;
					})
					.duration(1500)
					.attr("y",function(d,i){
						if(i==0)
						return 185;
						else if(i==1)
						return 185;
						else if(i==2)
						 	return 155;
						 else if(i==3)
						 	return 153;
						else if(i==4)
						 	return 195;
						else if(i==5)
						 	return 155;
						 else if(i==6)
						 	return 155;
						 else if(i==7)
							return 190;
					})
					.attr("width",function(d,i){
						if(i==0)
						return 55;
						if(i==1)
						return 60;
						if(i==2)
						return 48;
						if(i==3)
						return 65;
						if(i==4)
						return 45;
						if(i==5)
							return 50;
						 if(i==6)
							return 50;
						if(i==7)
							return 68;
					})
					.attr("height",function(d,i){
						return 30;
					})
					.attr("fill","#aaaa00")
					.style("opacity",0.3)
					.attr("stroke-width",1)
					.attr("stroke","#aaaa00")
					.attr("marker-end","url(#arrow)");
					
				g.append('g').selectAll(".text")
					.data(data)
					.enter()
					.append("text")
					.attr("class","Disaster")
					.attr("transform",function(d,i){
						if(i==0)
						return "translate("+(xScale(d["time"].substring(0,4))+75)+","+535+")";
						 if(i==1)
						 return "translate("+(xScale(d["time"].substring(0,4))+80)+","+535+")";
						if(i==2)
						  return "translate("+(xScale(d["time"].substring(0,4))+80)+","+505+")";
						if(i==3)
						return "translate("+(xScale(d["time"].substring(0,4))+80)+","+505+")";
						if (i==4)
						  return "translate("+(xScale(d["time"].substring(0,4))+90)+","+545+")";
						 if(i==5)
						  return "translate("+(xScale(d["time"].substring(0,4))+80)+","+(505)+")";
						 if(i==6)
						 return "translate("+(xScale(d["time"].substring(0,4))+80)+","+(505)+")";
						  if(i==7)
						  return "translate("+(xScale(d["time"].substring(0,4))+80)+","+(540)+")";
					})
					.attr("x",function(d,i){ 
							d3.select(this).append('tspan')
							   .attr('x', 0)
							   .attr('dy',0)
							    .attr("font-size",9)
								.attr("fill","white")
								.style("opacity",0)
								.transition()
								.delay(function(d,i){
								    return i * 200;
								})
								.duration(1500)
								.style("opacity",1)
								.attr("font-size",10)
							   .text(d["time"])
							   .attr("fill","white")
							d3.select(this).append('tspan')
								.attr('x', 1)
								.attr('dy',14)
							    .text(function() {
							        return d["name"];
							    })
								.attr("font-size",10)
								.attr("fill","white")
								.style("opacity",0)
								.transition()
								.delay(function(d,i){
								    return i * 200;
								})
								.duration(1500)
								.style("opacity",1)
								.attr("font-size",10)
								.attr("fill","white")
					    })
						.attr("pointer-events", "none");
			}
		})
}
draw_event();
function draw_event(){
	d3.json("json/data.json",function(error,data){
		if(error)
			console.log(error);
		else{
			console.log(data)
			g.append('g').selectAll(".path")
				.data(data["content"])
				.enter()
				.append("path")
				.attr("class","Et")
				.attr("transform","translate("+padding.left+","+(padding.top)+")")
				.attr('d',function(d,i){
					if(i==1)
					return'M'+xScale(d[0]["timeStart"])+' '+yScale(0)+'L'+xScale(d[0]["timeStart"])+' '+width*0.160;
					if(i==2)
					return'M'+xScale(d[0]["timeStart"])+' '+yScale(0)+'L'+xScale(d[0]["timeStart"])+' '+width*0.158+'L'+(xScale(d[0]["timeStart"])-25)+' '+width*0.158;
					if(i==5)
					return'M'+xScale(d[0]["timeStart"])+' '+yScale(0)+'L'+xScale(d[0]["timeStart"])+' '+width*0.150+'L'+(xScale(d[0]["timeStart"])-5)+' '+width*0.150;
					if(i==7)
					return'M'+xScale(d[0]["timeStart"])+' '+yScale(0)+'L'+xScale(d[0]["timeStart"])+' '+width*0.152+'L'+(xScale(d[0]["timeStart"])+5)+' '+width*0.152;
					if(i==9)
					return'M'+xScale(d[0]["timeStart"])+' '+yScale(0)+'L'+xScale(d[0]["timeStart"])+' '+width*0.165+'L'+(xScale(d[0]["timeStart"])-5)+' '+width*0.165;
					if(i==10)
					return'M'+xScale(d[0]["timeStart"])+' '+yScale(0)+'L'+xScale(d[0]["timeStart"])+' '+width*0.16;
					return'M'+xScale(d[0]["timeStart"])+' '+yScale(0)+'L'+xScale(d[0]["timeStart"])+' '+width*0.16;
				})
				.attr("fill","none")
				.attr("stroke","rgb(47,79,79)")
				.attr("stroke-width",1)
				.style("opacity",0)
				.transition()
				.delay(function(d,i){
				    return i * 200;
				})
				.duration(1500)
				.attr("fill","none")
				.style("opacity",0.5)
				.attr("stroke-width",1)
				.attr("stroke","rgb(47,79,79)")
				.attr("marker-end","url(#arrow)");
			g.append('g').selectAll(".rect")
				.data(data["content"])
				.enter()
				.append("rect")
				.attr("class","Et")
				.attr("transform","translate("+padding.left+","+(padding.top)+")")
				.on("click",function(d,i){
					var a=d3.select(this).attr("id");
					inter3(d,a,i);
				})
				.attr('x',function(d,i){
					if(i==1)
						return xScale(d[0]["timeStart"])-35;
					if(i==2)
						return xScale(d[0]["timeStart"])-110;
					if(i==3)
						return xScale(d[0]["timeStart"])-30;
					if(i==4)
						return xScale(d[0]["timeStart"])-20;
					if(i==5)
						return xScale(d[0]["timeStart"])-70;
					if(i==7)
						return xScale(d[0]["timeStart"])+10;
					if(i==9)
						return xScale(d[0]["timeStart"])-70;
					if(i==10)
						return xScale(d[0]["timeStart"])-70;
					if(i==13)
						return xScale(d[0]["timeStart"])-30;
					if(i==14)
						return xScale(d[0]["timeStart"])-45;
					if(i==15)
						return xScale(d[0]["timeStart"])-75;
					return xScale(d[0]["timeStart"])-40;
				})
				.attr("y",-100)
				.transition()
				.delay(function(d,i){
				    return i * 200;
				})
				.duration(1500)
				.attr("y",function(d,i){
					if(i==0)
						return width*0.145;
					if(i==1)
						return width*0.145;
					if(i==2)
						return width*0.152;	
					if(i==9)
						return width*0.160;
					if(i==10)
						return width*0.1450;
					return width*0.145;		
				})
				.attr("width",function(d,i){
					if(i==0)
					return 75;
					if(i==2)
					return 80;
					if(i==3)
					return 45;
					if(i==4)
					return 70;
					if(i==10)
					return 130;
					if(i==11)
					return 100;
					if(i==12)
					return 70;
					if(i==14)
					return 90;
					if(i==15)
					return 150;
					return 60;
					
				})
				.attr("height",function(d,i){
					return 30;
				})
				.attr("fill","black")
				.style("opacity",0.3)
				.attr("stroke-width",1)
				.attr("stroke","rgb(47,79,79)")
				.attr("marker-end","url(#arrow)");
			g.append('g').selectAll(".text")
				.data(data["content"])
				.enter()
				.append("text")
				.attr("class","Et")
				.attr("transform",function(d,i){
					if(i==0)
					return "translate("+(xScale(d[0]["timeStart"])+padding.left-3)+","+(padding.top+width*0.147)+")";
					if(i==1)
					return "translate("+(xScale(d[0]["timeStart"])+padding.left-3)+","+(padding.top+width*0.147)+")";
					if(i==2)
					return "translate("+(xScale(d[0]["timeStart"])+padding.left-70)+","+(padding.top+width*0.154)+")";
					if(i==3)
					return "translate("+(xScale(d[0]["timeStart"])+padding.left-5)+","+(padding.top+width*0.147)+")";
					if(i==4)
					return "translate("+(xScale(d[0]["timeStart"])+padding.left+15)+","+(padding.top+width*0.147)+")";
					if(i==5)
					return "translate("+(xScale(d[0]["timeStart"])+padding.left-40)+","+(padding.top+width*0.147)+")";
					if(i==6)
					return "translate("+(xScale(d[0]["timeStart"])+padding.left-10)+","+(padding.top+width*0.147)+")";
					if(i==7)
					return "translate("+(xScale(d[0]["timeStart"])+padding.left+40)+","+(padding.top+width*0.147)+")";
					if(i==8)
					return "translate("+(xScale(d[0]["timeStart"])+padding.left-10)+","+(padding.top+width*0.147)+")";
					if(i==9)
					return "translate("+(xScale(d[0]["timeStart"])+padding.left-40)+","+(padding.top+width*0.162)+")";
					if(i==10)
					return "translate("+(xScale(d[0]["timeStart"])+padding.left-5)+","+(padding.top+width*0.148)+")";
					if(i==11)
					return "translate("+(xScale(d[0]["timeStart"])+padding.left+10)+","+(padding.top+width*0.148)+")";
					if(i==12)
					return "translate("+(xScale(d[0]["timeStart"])+padding.left-4)+","+(padding.top+width*0.148)+")";
					if(i==13)
					return "translate("+(xScale(d[0]["timeStart"])+padding.left)+","+(padding.top+width*0.147)+")";
					if(i==14)
					return "translate("+(xScale(d[0]["timeStart"])+padding.left)+","+(padding.top+width*0.147)+")";
					if(i==15)
					return "translate("+(xScale(d[0]["timeStart"])+padding.left)+","+(padding.top+width*0.147)+")";
					
					return "translate("+(xScale(d[0]["timeStart"])+padding.left-5)+","+(padding.top+width*0.147)+")";
				})
				.attr("x",function(d,i){ 
				    if(d.length!=1){
						d3.select(this).append('tspan')
						   .attr('x', 0)
						   .attr('dy',11)
						   .attr("font-size",9)
						   .text(d[0]["timeStart"])
				       for(var j=0;j<d.length;j++){
				             d3.select(this).append('tspan')
				            .attr('x', 0)
				            .attr('dy',12)
				            .text(d[j]["title"])
				       }
				    } 
				    else {
						d3.select(this).append('tspan')
						   .attr('x', 0)
						   .attr('dy',7)
						    .attr("font-size",9)
						   .text(d[0]["timeStart"])
				        d3.select(this).append('tspan')
							.attr('x', 0)
							.attr('dy',12)
				            .text(function() {
				                return d[0]["title"];
				            })
				    }
				})
				.attr("fill","white")
				.style("opacity",0)
				.transition()
				.delay(function(d,i){
				    return i * 200;
				})
				.duration(1500)
				.style("opacity",1)
				.attr("font-size",10)
				.attr("font-size","10px")
				.attr("text-anchor","middle")
				.attr("dy","1em")
				.attr("fill","white");
		}
	})
}
Congress()
function Congress(){
	d3.json("json/congress.json",function(error,data){
		if(error)
			console.log(error);
		else{
			g.append('g').selectAll(".path")
				.data(data)
				.enter()
				.append("path")
				.attr("class","Congress")
				.attr("transform","translate("+padding.left+","+(padding.top)+")")
				.attr('d',function(d,i){
					console.log(d);
					if(i==0)
					return'M'+xScale(d["time"])+' '+yScale(0)+'L'+xScale(d["time"])+' '+width*0+'L'+(xScale(d["time"])+10)+' '+width*0;
					else if(i==1)
					return'M'+xScale(d["time"])+' '+yScale(0)+'L'+xScale(d["time"])+' '+width*0.025+'L'+(xScale(d["time"])+10)+' '+width*0.025;
					else if(i==2)
					return'M'+xScale(d["time"])+' '+yScale(0)+'L'+xScale(d["time"])+' '+width*0.050+'L'+(xScale(d["time"])+10)+' '+width*0.05;
					else if(i==3)
					return'M'+xScale(d["time"])+' '+yScale(0)+'L'+xScale(d["time"])+' '+width*0.07+'L'+(xScale(d["time"])+10)+' '+width*0.07;
					else if(i==4)
					 return'M'+xScale(d["time"])+' '+yScale(0)+'L'+xScale(d["time"])+' '+width*0.1+'L'+(xScale(d["time"])+40)+' '+width*0.1;
					else if(i==5)
					return'M'+xScale(d["time"])+' '+yScale(0)+'L'+xScale(d["time"])+' '+width*0.118+'L'+(xScale(d["time"])+60)+' '+width*0.118;
					else if(i==9)
					return'M'+xScale(d["time"])+' '+yScale(0)+'L'+xScale(d["time"])+' '+width*0.158;
					else if(i==12||i==14||i==16||i==18)
					return'M'+xScale(d["time"])+' '+yScale(0)+'L'+xScale(d["time"])+' '+width*0.12;
					return'M'+xScale(d["time"])+' '+yScale(0)+'L'+xScale(d["time"])+' '+width*0.14;			
				})
				.attr("fill","none")
				.attr("stroke","#DB7093")
				.attr("stroke-width",1)
				.style("opacity",0)
				.transition()
				.delay(function(d,i){
				    return i * 200;
				})
				.duration(1500)
				.attr("fill","none")
				.style("opacity",0.5)
				//.attr("stroke-width",1)
				.attr("stroke","#DB7093")
				.attr("marker-end","url(#arrow)");
			g.append('g').selectAll(".rect")
				.data(data)
				.enter()
				.append("rect")
				.attr("class","Congress")
				.attr("transform","translate("+padding.left+","+(padding.top)+")")
				.on("click",function(){
					inter4();
				})
				.attr('x',function(d,i){
					if(i==0)
					return xScale(d["time"])+19;
				 	else if(i==1)
				 	return xScale(d["time"])+14;
					else if(i==2)
					return xScale(d["time"])+14;
					else if(i==3)
					return xScale(d["time"])+14;
					else if(i==4)
					return xScale(d["time"])+43;
					else if(i==5)
					return xScale(d["time"])+65;
					else if(i==6)
					return xScale(d["time"])-50;
					else if(i==7)
					return xScale(d["time"])-70;
					else if(i==8)
					return xScale(d["time"])-90;
					else if(i==9)
					return xScale(d["time"])-50;
					else if(i==10)
					return xScale(d["time"])-90;
					else if(i==10)
					return xScale(d["time"])-100;
					else if(i==11)
					return xScale(d["time"])-50;
					else if(i==12)
					return xScale(d["time"])-85;
					else if(i==13)
					return xScale(d["time"])-65;
					else if(i==14)
					return xScale(d["time"])-75;
					else if(i==15)
					return xScale(d["time"])-40;
					else if(i==16)
					return xScale(d["time"])-80;
					else if(i==17)
					return xScale(d["time"])-65;
					else if(i==18)
					return xScale(d["time"])-85;
				})
				.attr("stroke","#DB7093")
				.attr("y",-100)
				.transition()
				.delay(function(d,i){
				    return i * 200;
				})
				.duration(1500)
				.attr("y",function(d,i){
					if(i==0)
					return -width*0.008;
					else if(i==1)
						return width*0.017;
					else if(i==2)
						return width*0.042;
					else if(i==3)
						return width*0.062;
					else if(i==4)
						return width*0.092;
					else if(i==5)
						return width*0.11;
					else if(i==6)
						return width*0.125;
					else if(i==7)
						return width*0.123;
					else if(i==8)
						return width*0.123;
					else if(i==9)
						return width*0.141;
					else if(i==10)
						return width*0.123;
					else if(i==11)
						return width*0.123;
					else if(i==12)
						return width*0.103;
					else if(i==13)
						return width*0.123;
					else if(i==14)
						return width*0.103;
					else if(i==15)
						return width*0.123;
					else if(i==16)
						return width*0.103;	
					else if(i==17)
						return width*0.123;
					else if(i==18)
						return width*0.103;	
							
				})
				.attr("width",function(d,i){
					if(i==0)
					return 115;
					if(i==1)
					return 105;
					if(i==2)
					return 85;
					if(i==3)
					return 90;
					if(i==4)
					return 70;
					if(i==6)
					return 90;
					if(i==7)
					return 150;
					if(i==8)
					return 115;
					if(i==10)
					return 130;
					if(i==11)
					return 130;
					if(i==12)
					return 170;
					if(i==13)
					return 130;
					if(i==14)
					return 170;
					if(i==15)
					return 80;
					if(i==16)
					return 145;
					if(i==17)
					return 130;
					if(i==18)
					return 175;
					 return 110;
					
				})
				.attr("height",function(d,i){
					return 35;
				})
				.attr("fill","	#DB7093")
				.style("opacity",0.3)
				.attr("stroke-width",1)
				.attr("stroke","#DB7093")
				.attr("marker-end","url(#arrow)");
			g.append('g').selectAll(".text")
				.data(data)
				.enter()
				.append("text")
				.attr("class","Congress")
				.attr("transform",function(d,i){
					if(i==0)
					return "translate("+(xScale(d["time"])+padding.left+80)+","+(padding.top-width*0.009)+")";
					if(i==1)
					 return "translate("+(xScale(d["time"])+padding.left+70)+","+(padding.top+width*0.016)+")";
					 if(i==2)
					return "translate("+(xScale(d["time"])+padding.left+55)+","+(padding.top+width*0.041)+")";
					if(i==3)
					return "translate("+(xScale(d["time"])+padding.left+60)+","+(padding.top+width*0.06)+")";
					if(i==4)
					return "translate("+(xScale(d["time"])+padding.left+78)+","+(padding.top+width*0.09)+")";
					if(i==5)
					 return "translate("+(xScale(d["time"])+padding.left+120)+","+(padding.top+width*0.109)+")";
					if(i==6)
					return "translate("+(xScale(d["time"])+padding.left-5)+","+(padding.top+width*0.123)+")";
					if(i==7)
					return "translate("+(xScale(d["time"])+padding.left+5)+","+(padding.top+width*0.122)+")";
					 if(i==8)
					 return "translate("+(xScale(d["time"])+padding.left-36)+","+(padding.top+width*0.122)+")";
					if(i==9)
					return "translate("+(xScale(d["time"])+padding.left+5)+","+(padding.top+width*0.14)+")";
					if(i==10)
					return "translate("+(xScale(d["time"])+padding.left-25)+","+(padding.top+width*0.122)+")";
					if(i==11)
					return "translate("+(xScale(d["time"])+padding.left+10)+","+(padding.top+width*0.122)+")";
					if(i==12)
					return "translate("+(xScale(d["time"])+padding.left)+","+(padding.top+width*0.102)+")";
					if(i==13)
					return "translate("+(xScale(d["time"])+padding.left)+","+(padding.top+width*0.122)+")";
					if(i==14)
					return "translate("+(xScale(d["time"])+padding.left+10)+","+(padding.top+width*0.103)+")";
					if(i==15)
					return "translate("+(xScale(d["time"])+padding.left-0)+","+(padding.top+width*0.122)+")";
					if(i==16)
					return "translate("+(xScale(d["time"])+padding.left-8)+","+(padding.top+width*0.102)+")";
					if(i==17)
					return "translate("+(xScale(d["time"])+padding.left+0)+","+(padding.top+width*0.122)+")";
					if(i==18)
					return "translate("+(xScale(d["time"])+padding.left+0)+","+(padding.top+width*0.102)+")";
				})
				.attr("x",function(d,i){ 
						d3.select(this).append('tspan')
						   .attr('x', 0)
						   .attr('dy',11)
						   .attr("font-size",9)
						   .text(d['time'])
						  d3.select(this).append('tspan')
						      .attr('x', 0)
						      .attr('dy',12)
						      .text(d["name"])
				         d3.select(this).append('tspan')
				            .attr('x', 0)
				            .attr('dy',12)
				            .text(d["event"])
				})
				.attr("fill","white")
				.style("opacity",0)
				.transition()
				.delay(function(d,i){
				    return i * 200;
				})
				.duration(1500)
				.style("opacity",1)
				.attr("font-size",10)
				.attr("font-size","10px")
				.attr("text-anchor","middle")
				.attr("dy","1em")
				.attr("fill","white")
				.style("opacity",1);
		}
	 })
}
//画图标
var Line=["党员","GDP"];
var Rect=["交通","教育","科技","工程","医疗","民政救灾","国会","事件"];
var Color=["#F5F5F5","#4169E1","#9370DB","#aa5500","#ffaa00","#aaaa00","#DB7093","rgb(0, 0, 0)"]
            var margin = {'left': 8, 'right': 10, 'top': 70, 'bottom': 100}

            var recthei = 15, rectwid = 40, rectpad = 20;

            var  rect= g.append('g')
                    .attr('transform', 'translate(' + width/2.5+ ',' + margin.top+ ')')

            rect.selectAll('.rect')
                .data(Rect)
                .enter()
                .append('rect')
				.attr('x', 1250)
                .attr('y', function (d, i) {
                    return margin.top + i * (recthei+ rectpad)
                })
                .attr('width', rectwid)
                .attr('height', recthei)
                .attr('fill', function (d, i) {
                    return Color[i];
                })
				.attr("id",function(d,i){
					return "R"+i;
				})
				.style("opacity",0.5)
				.on("click",function(d){
					 var a = d3.select(this).attr("id");
					 var b = d3.select(this).attr("id").substring(1);
					 if(b==0){
						  console.log($("#"+a).css("fill"))
						 if($("#"+a).css("fill")=="rgb(245, 245, 245)"){
							$("#"+a).css("fill","gray");
							d3.selectAll(".Traffic")
							.transition()
							.delay(function(d,i){
							    return i * 8;
							})
							.duration(200)
							.remove();
						}
						else{
							$("#"+a).css("fill","rgb(245, 245, 245)").css("opacity",0.5);
							Traffic()
						}
					 }
					 else if(b==1){
					 		if($("#"+a).css("fill")=="rgb(65, 105, 225)"){
					 			$("#"+a).css("fill","gray");
					 			d3.selectAll(".Education").transition()
								.delay(function(d,i){
									return i * 8;
								})
								.duration(200)
					 			.remove();
					 		}
					 		else{
					 			$("#"+a).css("fill","rgb(65, 105, 225)").css("opacity",0.5);
									Education()
					 			}
					 }
					 else if(b==2){
					 		console.log($("#"+a).css("fill"))
					 		if($("#"+a).css("fill")=="rgb(147, 112, 219)"){
					 			$("#"+a).css("fill","gray");
					 			d3.selectAll(".Science").transition()
									.delay(function(d,i){
										return i * 8;
									})
									.duration(200)
					 			.remove();
					 		}
					 		else{
					 			$("#"+a).css("fill","rgb(147, 112, 219)").css("opacity",0.5);
					 				Science()
					 			}
					 }
					 else if(b==3){
						 console.log($("#"+a).css("fill"))
					 		console.log($("#"+a).css("fill"))
					 		if($("#"+a).css("fill")=="rgb(170, 85, 0)"){
					 			$("#"+a).css("fill","gray");
					 			d3.selectAll(".Project").transition()
								.delay(function(d,i){
									return i * 8;
								})
								.duration(200)
					 			.remove();
					 		}
					 		else{
					 			$("#"+a).css("fill","rgb(170, 85, 0)");
					 				Project() 
					 			}
					 }
					 else if(b==4){
						 console.log($("#"+a).css("fill"))
					 		if($("#"+a).css("fill")=="rgb(255, 170, 0)"){
					 			$("#"+a).css("fill","gray");
					 			d3.selectAll(".Medical").transition()
					 			.duration(100)
					 			.remove();
					 		}
					 		else{
					 			$("#"+a).css("fill","rgb(255, 170, 0)");
					 				Medical()
					 			}
					 }
					 
					 else if(b==5){
						 console.log($("#"+a).css("fill"))
					 		if($("#"+a).css("fill")=="rgb(170, 170, 0)"){
					 			$("#"+a).css("fill","gray");
					 			d3.selectAll(".Disaster").transition()
					 			.duration(100)
					 			.remove();
					 		}
					 		else{
					 			$("#"+a).css("fill","rgb(170, 170, 0)");
					 				 Disaster()
					 			}
					 }
					 else if(b==6){
						 console.log($("#"+a).css("fill"))
					 		if($("#"+a).css("fill")=="rgb(219, 112, 147)"){
					 			$("#"+a).css("fill","gray");
					 			d3.selectAll(".Congress").transition()
					 			.duration(100)
					 			.remove();
					 		}
					 		else{
					 			$("#"+a).css("fill","rgb(219, 112, 147)");
					 				Congress()
					 			}
					 }
					 else if(b==7){
							console.log($("#"+a).css("fill"))
							console.log($("#"+a).css("fill")=="rgb(0, 0, 0)")
					 		if($("#"+a).css("fill")=="rgb(0, 0, 0)"){
					 			$("#"+a).css("fill","gray");
								console.log($("#"+a).css("fill"))
					 			d3.selectAll(".Et").transition()
					 			.duration(100)
					 			.remove();
					 		}
					 		else{
					 			$("#"+a).css("fill","rgb(0, 0, 0)");
									  draw_event()
					 			}
					 }
				});