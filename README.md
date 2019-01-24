<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
  <img alt="add" src="https://www.svgrepo.com/show/13238/plus-cross.svg" height="30" width="50">
  <a href="https://cosmicjs.com">
    <img alt="Gatsby" src="https://cosmicjs.com/images/logo.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Docs
</h1>
<p align="center">A minimalistic App for creating and viewing Documentation powered by Cosmic JS<p>

## Quick Start

1.  **Get this source Code**

    Install this software by cloning this repository:

    ```sh
    # create a directory on your machine with this source code inside
    git clone https://github.com/JacobKnaack/gatsby-docs.git
    ```

2.  **Install the necessary packages.**

    Navigate into your new site’s directory.

    ```sh
    cd gatsby-docs/
    ```

    then install with use npm.
    ```sh
    npm install
    ```

    or use yarn
    ```sh
    yarn install
    ```

3.  **Configure your environment variables required for Cosmic JS**

    Create a `.env` file at the root of your project

    ```sh
    touch .env
    ```

    Open your .`env` file and add three environment variables
    ```sh
    # Inside your .env file
    COSMIC_BUCKET=bucket_title_goes_here
    COSMIC_READ_KEY=read_key_goes_here
    COSMIC_WRITE_KEY=write_key_goes_here
    ```

4.  **Run your development script**

    start a development server using pre-built scripts
    ```sh
    yarn develop
    ```
    or
    ```sh
    npm run develop
    ```

5.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Open the `gatsby-docs` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## Project Structure
Here's what you should see when you first install the project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── app.json
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── static.json
    └── yarn.lock

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5. **`app.json`**: this is a configuration for deplying your code on either heroku or Cosmic JS.  Acts as a manifest to describing the application for an app container.  This one container urls for buildpacks needed for deployment.

6.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

7.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

8.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

9.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

10.  **`LICENSE`**: Gatsby is licensed under the MIT license.

11. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

12. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

13. **`static.json`**: A file used with the horokus buildpacks furing deployment.  The contents handle static build files.

14. **`yarn.lock`**: a configuration file for yarn to help install dependenies on your local machine.
    
15. **`package-lock.json`**: a configuration for npm also to help with installation of dependecies on your local machine.

16. **`README.md`**: A text file containing useful reference information about your project.

## Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)
