import cgi,os

from google.appengine.ext import webapp
from google.appengine.api import users
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app
import wsgiref.handlers


class Mainpage(webapp.RequestHandler):
	def get(self):
		self.response.out.write(template.render('can.html',{}))

def check_color(adj,check_list):
	return check_list[adj]

def find_color(adj,node_colors):
	return node_colors[adj]


def give_color(node,adj_list,check_list,node_colors):
	adj_color_list=[]
	avail_list=[0,1,2,3,4,5,6,7,8,9]
	for adj in adj_list[node]:
		if(check_color(adj,check_list)):
			used_color=find_color(adj,node_colors)
			adj_color_list.append(used_color)
	available_colors=set(avail_list)
	colord_list=set(adj_color_list)
	remain_colors=available_colors-colord_list
	remain_list=list(remain_colors)
	return remain_list[0]

class Coloring(webapp.RequestHandler):
	def post(self):
		adj_list=eval(self.request.get('name'))
		nodes = range(len(adj_list))
		check_list = []
		i=0
		while(i<len(adj_list)):
			check_list.append(0)
			i +=1
		colors = {
                0 :"red",
                1 :"blue",
                2 :"green",
                3 :"yellow",
                4 :"orange",
                5 :"black",
                6 :"pink",
                7 :"#00FFFF",
                8 :"magenta",
                9 :"#00FF00",

		}
		node_colors = {
				}
		for node in nodes:
			node_colors[node] = give_color(node,adj_list,check_list,node_colors)
			check_list[node]=1
		color_values=node_colors.values()
		self.response.out.write(color_values)

application=webapp.WSGIApplication([('/',Mainpage),('/.+',Coloring)],debug=True)


def main():
	run_wsgi_app(application)

if __name__ == "__main__":
	main()
