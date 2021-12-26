#Use to create local host
import http.server
import socketserver

PORT = 8080

class NoCacheHTTPRequestHandler(
    http.server.SimpleHTTPRequestHandler
):
    def send_response_only(self, code, message=None):
        super().send_response_only(code, message)
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Expires', '0')

if __name__ == '__main__':
    NoCacheHTTPRequestHandler.extensions_map.update({".js": "application/javascript",})
    httpd = socketserver.TCPServer(("", PORT), NoCacheHTTPRequestHandler)
    httpd.timeout = 1
    while True:
        try:
            httpd.handle_request()
        except KeyboardInterrupt:
            httpd.server_close()
            break