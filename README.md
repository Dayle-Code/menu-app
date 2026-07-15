# Menu App

Menú digital mobile-first hecho con **React, Vite, Tailwind CSS y pnpm**.

La aplicación muestra una carta de comidas organizada por categorías. No incluye carrito, pedidos ni pagos: su objetivo actual es ofrecer una consulta visual rápida desde el celular.

## Requisitos

- Node.js 22 o una versión LTS compatible.
- pnpm 10.
- Git.

Comprobar las instalaciones:

```bash
node -v
pnpm -v
git --version
```

## Instalación y ejecución

```bash
pnpm install
pnpm dev
```

Vite mostrará la dirección local disponible, normalmente:

```text
http://localhost:5173/menu-app/
```

Para probar desde otro dispositivo conectado a la misma red:

```bash
pnpm dev --host
```

## Verificaciones de calidad

Ejecutar todas las comprobaciones antes de subir cambios:

```bash
pnpm check
```

Ese comando ejecuta, en orden:

```bash
pnpm lint
pnpm test
pnpm build
```

Las mismas verificaciones se ejecutan automáticamente mediante GitHub Actions en ramas `fix/**`, `feat/**`, `master` y pull requests hacia `master`.

## Personalización del comercio

Los textos generales del negocio están en:

```text
src/config/site.js
```

Ahí se modifican el nombre, tipo de comercio, lema y textos comunes:

```js
export const siteConfig = {
  businessName: "NombreLocal",
  businessType: "Café y comidas",
  tagline: "Lo mejor de Salta",
  footerMessage: "Buen sabor, buenos momentos",
};
```

También deben actualizarse el título y la descripción pública de `index.html` cuando se defina el nombre real del comercio.

## Categorías y productos

La carta se administra desde:

```text
src/data/menuData.js
```

Cada categoría y producto debe tener un `id` único y estable. El `id` no debe cambiar cuando solo se modifica el nombre visible, porque también se utiliza en la navegación y en las claves de React.

Ejemplo:

```js
{
  id: "pizzas",
  title: "Pizzas",
  icon: Pizza,
  image: categoryImage("pizzas.svg"),
  products: [
    {
      id: "muzzarella",
      name: "Muzzarella",
      description: "Salsa de tomate, muzzarella y orégano.",
      price: 6500,
    },
  ],
}
```

### Cambiar un precio

Modificar únicamente el valor numérico:

```js
price: 7000,
```

No agregar el símbolo `$`; la aplicación lo formatea automáticamente para Argentina.

### Agregar un producto

```js
{
  id: "calabresa",
  name: "Calabresa",
  description: "Muzzarella, longaniza, tomate y orégano.",
  price: 8200,
},
```

### Agregar una categoría

1. Importar un icono válido de `lucide-react`.
2. Crear una ilustración local en `public/images/categories/` o dejar `image` vacío.
3. Agregar un objeto con `id`, `title`, `icon`, `image` y `products`.

```js
{
  id: "postres",
  title: "Postres",
  icon: IceCream,
  image: categoryImage("postres.svg"),
  products: [],
}
```

Cuando una categoría no contiene productos, la interfaz muestra un estado vacío en lugar de dejar la pantalla en blanco.

## Imágenes

Las ilustraciones de categorías son recursos locales ubicados en:

```text
public/images/categories/
```

Usar el helper definido en `menuData.js`:

```js
image: categoryImage("pizzas.svg"),
```

Esto evita depender de servidores externos, enlaces vencidos y bloqueos de hotlinking.

Si una imagen local no puede cargarse, la interfaz muestra automáticamente el icono de la categoría. Para usar únicamente el icono:

```js
image: "",
```

Para fotografías, preferir archivos WebP o AVIF optimizados y evitar imágenes innecesariamente pesadas.

## Navegación

Cada categoría tiene una URL compartible mediante hash:

```text
/menu-app/#categoria/pizzas
```

El botón Atrás del navegador o del celular vuelve al listado de categorías. Una URL directa a una categoría también puede abrirse o compartirse sin instalar un router adicional.

Las funciones de navegación y formato están en:

```text
src/utils/menu.js
```

Sus pruebas están en:

```text
src/tests/menu.test.js
```

## Estructura principal

```text
menu-app/
├─ .github/workflows/quality.yml
├─ public/
│  ├─ images/categories/
│  └─ menu.svg
├─ src/
│  ├─ config/
│  │  ├─ site.js
│  │  └─ theme.js
│  ├─ data/menuData.js
│  ├─ tests/menu.test.js
│  ├─ utils/menu.js
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ index.html
├─ package.json
└─ vite.config.js
```

## Despliegue

Crear la compilación local:

```bash
pnpm build
pnpm preview
```

Publicar manualmente en GitHub Pages:

```bash
pnpm deploy
```

La propiedad `base` de `vite.config.js` debe mantenerse como `/menu-app/` mientras el proyecto se publique en esa ruta.

## Trabajo con ramas y commits

Crear una rama por objetivo:

```bash
git switch master
git pull origin master
git switch -c feat/nombre-de-la-feature
```

Usar conventional commits en español y en modo imperativo:

```text
feat: agrega el detalle de productos
fix: corrige el fallback de imágenes
docs: actualiza la guía de mantenimiento
test: cubre la navegación por categorías
ci: verifica lint pruebas y build
```

Antes de hacer commit:

```bash
pnpm check
git status
git diff
```

No subir `node_modules`, `dist` ni archivos locales del editor.
