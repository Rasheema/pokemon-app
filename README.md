# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Perfect 👍 Here’s a **full `README.md`** you can just copy-paste into your project root.


# Pokémon App

A Pokémon web application built with **React, Zustand, and Bootstrap 5.3**.  
The app fetches Pokémon data from the [PokéAPI](https://pokeapi.co/) and provides features like searching, filtering, and pagination.


## 🚀 Features
- Browse Pokémon in a paginated grid (30 Pokémon per page, ~34 pages total)
- Search Pokémon by name
- Filter Pokémon by type with colorful buttons
- Responsive design (mobile-friendly)
- Zustand state management
- Bootstrap 5 for layout & styling


## 🛠️ Installation & Setup

Follow these steps to run the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/pokemon-app.git
   cd pokemon-app
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

   The app will be available at **[http://localhost:3000](http://localhost:3000)**

---

##  Project Structure

```
src/
 ├── components/
 │    ├── Navbar/        # Top navigation bar
 │    ├── Filter/        # Pokémon type filters
 │    ├── Pagination/    # Pagination controls
 │    ├── PokemonCard/   # Individual Pokémon cards
 │    └── ...
 ├── zustand/
 │    └── useStore.js    # Zustand global store
 ├── App.js              # Main app
 ├── index.js            # React entry point
 └── styles/             # CSS files
```

## Deployment

This app can be deployed for free on hosting services such as:

* GitHub Pages
* Netlify
* Render

### Example Netlify Deployment

1. Push your repo to GitHub.
2. Log in to [Netlify](https://www.netlify.com/).
3. Click **"New site from Git"** and select your repository.
4. Build command:

   ```
   npm run build
   ```
5. Publish directory:

   ```
   build
   ```
6. After deployment, you’ll get a live URL like:
    `https://pokemon-app.netlify.app`

##  Author

* Akmal
* Email: akmalrasheema18@gmail.com
* GitHub: https://github.com/Rasheema/

---

## License

This project is licensed under the **MIT License**. You are free to use and modify it.

```

---