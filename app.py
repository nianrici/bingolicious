from flask import Flask, render_template
import random

app = Flask(__name__)
app.static_folder = 'static'

# Variables
todos_numeros = list(range(1,91))
numeros_elegidos = []

def elegir_numero():
  numero = random.choice(todos_numeros)
  numeros_elegidos.append(numero)
  todos_numeros.remove(numero)
  return numero

@app.route("/")
def index():
  return render_template("index.html")

@app.route("/nuevo_numero")
def nuevo_numero():
  if len(todos_numeros) == 0:
    return "Ya no quedan números para elegir"
  numero = elegir_numero()
  return f"{numero}"

@app.route("/numeros_elegidos")
def get_numeros_elegidos():
  return jsonify(numeros_elegidos) 

@app.route("/reiniciar")
def reiniciar():
  global todos_numeros
  todos_numeros = list(range(1,91))
  global numeros_elegidos
  numeros_elegidos = []
  return "Juego reiniciado"
