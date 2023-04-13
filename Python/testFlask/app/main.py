from flask import Flask, redirect, render_template, request, url_for


class TestServer:
    def __init__(self, host="127.0.0.1", port=8080):
        self.host = host
        self.port = port
        self.app = Flask(__name__)
        self.init_routes()

    def init_routes(self):

        @self.app.before_request
        def before_request():
            print('Antes de la petición')

        @self.app.after_request
        def after_request(response):
            print('Después de la petición')
            # Se puede modificar la response, pero es mejor consultar a chatGPT como hacerlo...
            print(response)
            return response

        # Define aquí tus rutas
        @self.app.route("/", methods=["GET"])
        def index():
            return "¡Hola, Mundo!"

        @self.app.route("/testHtml", methods=["GET"])
        def test_html():
            try:
                data = {
                    'title_tab': 'Test Flask',
                    'title': 'TITULO',
                    'contain': 'Soy contenido',
                    'animals': ['Perro', 'Gato', 'Mapache', ],
                    'count_animals': 3
                }
                return render_template("index.jinja", data=data)
            except Exception as e:
                print(e)
                return (f"Se produjo una excepción: {e}")

        @self.app.route("/contacto/<name>/<int:age>", methods=["GET"])
        def contacto(name, age):
            try:
                data = {
                    'title_tab': 'Contacto',
                    'name': name,
                    'age': age,
                }
                return render_template("contacto.jinja", data=data)
            except Exception as e:
                print(e)
                return (f"Se produjo una excepción: {e}")

        def query_string():
            print(request)
            print(request.args)
            print(request.args.get('param1'))
            print(request.args.get('param2'))
            return "ok"

        def page_not_found(error):
            data = {
                'title_tab': '404 | Perdido',
            }
            # return redirect(url_for('index'))
            # return redirect(url_for('test_html'))
            return render_template('404.jinja', data=data), 404

        self.app.add_url_rule(
            '/queryString', view_func=query_string, methods=['GET'])
        self.app.register_error_handler(404, page_not_found)

    def start(self):
        # self.app.run(host=self.host, port=self.port)
        self.app.run(host=self.host, port=self.port, debug=True)


if __name__ == "__main__":
    server = TestServer()
    server.start()
