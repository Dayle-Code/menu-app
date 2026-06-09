# Menu App

Proyecto de menú digital hecho con **React + Vite + Tailwind CSS + pnpm**.

La página sirve para mostrar una carta de comidas por categorías.  
No tiene carrito ni sistema de compra. Es solo un menú visual.

---

## 1. Qué necesitan instalar

Antes de abrir el proyecto, cada persona necesita tener instalado:

### Node.js

Descargar e instalar desde:

https://nodejs.org/

Recomendado: versión **LTS**.

Para comprobar si está instalado:

```bash
node -v
```

### pnpm

Después de instalar Node.js, instalar pnpm:

```bash
npm install -g pnpm
```

Para comprobar si está instalado:

```bash
pnpm -v
```

### Visual Studio Code

Recomendado para editar el proyecto:

https://code.visualstudio.com/

---

## 2. Cómo abrir el proyecto

Primero descargar o copiar la carpeta completa del proyecto.

Ejemplo de carpeta:

```text
menu-app
├─ src
├─ package.json
├─ vite.config.js
├─ pnpm-lock.yaml
└─ README.md
```

Abrir la carpeta `menu-app` con Visual Studio Code.

---

## 3. Instalar dependencias

Dentro de la carpeta del proyecto, abrir la terminal y ejecutar:

```bash
pnpm install
```

---

## 4. Iniciar la página

Para abrir la página en el navegador:

```bash
pnpm dev
```

Luego abrir el link que aparezca en la terminal, por ejemplo:

```text
http://localhost:5173/
```

Si el puerto está ocupado puede aparecer otro, como:

```text
http://localhost:5174/
```

---

## 5. Dónde modificar productos, precios e imágenes

La mayoría de los cambios se hacen en:

```text
src/data/menuData.js
```

Ahí están las categorías y productos.

Ejemplo:

```js
{
  title: "Pizzas",
  image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300",
  icon: Pizza,
  products: [
    {
      name: "Muzzarella",
      description: "Salsa de tomate, muzzarella y orégano.",
      price: 6500,
    },
  ],
}
```

---

## 6. Cómo cambiar precios

Buscar el producto y cambiar el valor de `price`.

```js
price: 6500,
```

Cambiarlo por:

```js
price: 7000,
```

No hace falta poner `$`, porque la app lo agrega automáticamente.

---

## 7. Cómo cambiar descripciones

Buscar el producto y cambiar `description`.

```js
description: "Salsa de tomate, muzzarella y orégano.",
```

---

## 8. Cómo agregar un producto

Dentro de la categoría, agregar un nuevo objeto dentro de `products`.

```js
{
  name: "Calabresa",
  description: "Muzzarella, longaniza, tomate y orégano.",
  price: 8200,
},
```

---

## 9. Cómo agregar una categoría nueva

Primero importar un icono arriba del archivo `menuData.js`.

```js
import { IceCream } from "lucide-react";
```

Después agregar una categoría nueva:

```js
{
  title: "Postres",
  icon: IceCream,
  image: "",
  products: [
    {
      name: "Flan casero",
      description: "Con dulce de leche o crema.",
      price: 2500,
    },
  ],
}
```

---

## 10. Cómo usar imágenes en vez de iconos

Cada categoría puede usar imagen o icono.

### Usar imagen desde internet

```js
{
  title: "Pizzas",
  image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300",
  icon: Pizza,
  products: []
}
```

### Usar solo icono

```js
{
  title: "Pizzas",
  image: "",
  icon: Pizza,
  products: []
}
```

Si `image` está vacío, se muestra el icono.

---

## 11. Importante sobre imágenes externas

No todas las URLs funcionan.

La URL tiene que ser un link directo a una imagen.

Funciona:

```text
https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300
```

No suele funcionar:

```text
https://pagina.com/articulo-de-pizza
```

Tampoco sirve usar una página normal. Tiene que ser una imagen real.

---

## 12. Cómo usar imágenes locales

Guardar imágenes en:

```text
src/assets/
```

Ejemplo:

```text
src/assets/pizza.jpg
```

Importar la imagen en `menuData.js`:

```js
import pizzaImg from "../assets/pizza.jpg";
```

Y usarla así:

```js
{
  title: "Pizzas",
  image: pizzaImg,
  icon: Pizza,
  products: []
}
```

---

## 13. Archivos principales

```text
src/App.jsx
```

Contiene la estructura visual de la página.

```text
src/data/menuData.js
```

Contiene categorías, productos, precios, descripciones e imágenes.

```text
src/index.css
```

Contiene estilos generales y Tailwind.

---

## 14. Errores comunes

### La página queda en blanco

Abrir la consola del navegador:

```text
F12 → Console
```

Revisar el error rojo.

### Cambié un icono y se rompió

El icono debe existir en `lucide-react` y estar importado.

Correcto:

```js
import { Pizza } from "lucide-react";
```

Y luego:

```js
icon: Pizza,
```

### La imagen no aparece

Puede ser porque:

- la URL está mal;
- la URL no es directa a una imagen;
- el sitio bloquea imágenes externas;
- falta poner comillas.

Correcto:

```js
image: "https://ejemplo.com/imagen.jpg",
```

Incorrecto:

```js
image: https://ejemplo.com/imagen.jpg,
```

---

## 15. Comandos útiles

Instalar dependencias:

```bash
pnpm install
```

Iniciar proyecto:

```bash
pnpm dev
```

Detener servidor:

```bash
Ctrl + C
```

Instalar un paquete:

```bash
pnpm add nombre-del-paquete
```

---

## 16. Recomendación para trabajar entre varios

Si varias personas van a modificar el proyecto:

1. No borrar `package.json`.
2. No borrar `src/data/menuData.js`.
3. No modificar todo `App.jsx` si solo quieren cambiar productos.
4. Cambiar productos, precios e imágenes principalmente desde `menuData.js`.
5. Avisar qué archivo modificó cada uno para no pisarse cambios.

---

## 17. Resumen rápido

Para abrir el proyecto:

```bash
pnpm install
pnpm dev
```

Para modificar la carta:

```text
src/data/menuData.js
```
