#!/bin/sh

gum style \
	--foreground 212 --border-foreground 212 --border double \
	--align center --width 50 --margin "1 2" --padding "2 4" \
	'Bingolicious Deployment Script' 'Bienvenidos al script de deployment más molón!'

sleep 2; clear

# Elegir entorno
ENV=$(gum choose "desarrollo" "producción")

# Instalar dependencias
if gum confirm "¿Instalar/actualizar dependencias?"; then
  pip install -r requirements.txt
fi

# Reconstruir assets
if gum confirm "¿Reconstruir assets de front-end?"; then

  # Reconstruir CSS 
  gum style --foreground="pink" "Reconstruyendo CSS..."
  npx tailwindcss -i ./src/input.css -o ./static/styles.css --watch
fi

# Ejecutar tests
if gum confirm "¿Ejecutar tests?"; then
  python app.py test
fi

# Pedir confirmación final
if ! gum confirm "¿Desplegar a $ENV?"; then
  gum style --bold --foreground="red" "Despliegue cancelado"
  exit 0
fi

# Desplegar con Gunicorn
gum style --bold "Desplegando aplicación..."
gunicorn --bind 0.0.0.0:5000 wsgi:app --daemon

# Mostrar mensaje de éxito  
gum style --bold --foreground="green" "Despliegue a $ENV completado!"
