import time
from http.server import BaseHTTPRequestHandler,HTTPServer
import urllib.request
import socket
import sys


HOST_NAME = sys.argv[1]
PORT_NUMBER = 8080

class ProxyHandler(BaseHTTPRequestHandler):
	def do_GET(s):	
		request = urllib.request.Request("http://www.extra-life.org/" + s.path)
		try:
			response = urllib.request.urlopen(request)
			code = response.getcode()
			headers = response.getheaders()
			data = response.read()

			s.send_response(code)
			for header in headers:
				s.send_header(header[0], header[1])
			s.send_header("Access-Control-Allow-Origin", "*")
			s.end_headers()
			s.wfile.write(data)
			
		except urllib.error.HTTPError as e:
			print ("http error %s : %s" % (e.code, e.reason));

		except urllib.error.URLError as e:
			print ("url error: %s" % (e.reason));


if __name__ == '__main__':
	httpd = HTTPServer((HOST_NAME, PORT_NUMBER), ProxyHandler)
	print ("Server Starts - %s:%s" % (HOST_NAME, PORT_NUMBER))
	try:
		httpd.serve_forever()
	except KeyboardInterrupt:
		pass
	httpd.server_close()
	print ("Server Stops - %s:%s" % (HOST_NAME, PORT_NUMBER))
