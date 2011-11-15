var adjacent = [];
var i,j;

var can;
var cxt;
var draw = function() {
	can = document.getElementById("c");
	cxt = can.getContext("2d");
	can.addEventListener("dblclick",draw_nodes,false);
	can.addEventListener("mousedown",mousedown,true);
	can.addEventListener("mouseup",mouseup,true);
	cxt.fillStyle = "white";
	cxt.fillRect(0,0,850,450);
	cxt.strokeStyle = "#f0c"
	cxt.stroke();
}

var nodes=[];
var node_no=0;
var node={};

function Cell(x,y)
{
	
	this.x=x;
	this.y=y;

}

function getCursorPosition(e)
{
	var x;
	var y;

	if(e.pageX != undefined && e.pageY != undefined)
	{
		x=e.pageX;
		y=e.pageY;

	}
	else
	{
		x=e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y=e.clientY + document.body.scrollTop +document.documentElement.scrollTop;
	}	

	x-= can.offsetLeft;
	y-= can.offsetTop;

	var cell=new Cell(x,y);
	return cell;
}

function draw_nodes(e) {
	var cell = getCursorPosition(e);
	x=cell.x-10;
	y=cell.y-10;
	node = new Object();
	node.name=node_no;
	node.x=x;
	node.y=y;
	nodes[node_no]=[node.x,node.y];
	adjacent[node_no]=[];
	cxt.beginPath();
	cxt.arc(x,y,17,0,Math.PI*2,true);
	cxt.closePath();
	cxt.fillStyle="#a0f";
	cxt.fill();
	cxt.strokeStyle="#000";
	cxt.linewidth=1;
	cxt.stroke();
	cxt.font="10px sans-serif";
	if(node_no<10)
	{
		cxt.fillText("V"+node_no,x-7,y-27);
	} 

	else
	{
		cxt.fillText("V"+node_no,x-10,y-23);
	}
	node_no++;
}

var x1=0,x2=0,y1=0,y2=0,i,n1,n2;

function mousedown(e)
{
	var cell = getCursorPosition(e);
	for(i=0;i<nodes.length;i++)
	{
		if(cell.x>=nodes[i][0]-10 && cell.x<=nodes[i][0]+10 && cell.y>=nodes[i][1]-10 && cell.y<=nodes[i][1]+10)
		{
			x1=nodes[i][0];
			y1=nodes[i][1];
			for(j=0;j<nodes.length;j++)
			{
				if(x1==nodes[j][0] && y1==nodes[j][1])
				{
					n1=j;
				}
			}
		}
	}
}

function mouseup(e)
{
	var cell=getCursorPosition(e);
	for(i=0;i<=nodes.length;i++)
	{
		if(cell.x>=nodes[i][0]-10 && cell.x<=nodes[i][0]+10 && cell.y>=nodes[i][1]-10 && cell.y<=nodes[i][1])
		{
			x2=nodes[i][0];
			y2=nodes[i][1];
			cxt.strokeStyle = "black";
			cxt.moveTo(x1,y1);
			cxt.lineTo(x2,y2);
			cxt.stroke();
			for(j=0;j<nodes.length;j++) 
			{
				if(x2==nodes[j][0] && y2==nodes[j][1])
				{
					n2=j;
					adjacent[n1].push(n2);
					adjacent[n2].push(n1);
					coloring()
				}
			}
		}
	}
}

var color = {
		0 :"red",
		1 :"blue",
		2 :"green",
		3 :"yellow",
		4 :"orange",
		5 :"black",
		6 :"pink",
		7 :"#00FFFF",
		8 :"magenta",
		9 :"#00FF00"

            };

function coloring()
{
		var j=0;
		var y='[';
		while(j < nodes.length)
		{
			if(j == ((nodes.length)))
			{
				y= y+ '['+ adjacent[j] + ']';
				break;
			}
			y= y + '['+ adjacent[j] + ']'+',';
			j=j+1;		
		}
		y= y + ']';
		$(document).ready(function(){
		$.post("/.+",{name : y}, function(data){
						var res_colors = data;
		for(i=0;i<= res_colors.length; i += 1){
			cxt.beginPath();
			cxt.arc(nodes[i][0],nodes[i][1],17,0,Math.PI * 2,true);
			cxt.fillStyle = color[res_colors[i]];
			cxt.fill();
						}
				},"json");
			});
}
