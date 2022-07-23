# Kirav.ru - Client App. 
This is a frontend part of the site [kirav.ru](https://kirav.ru/). 

![screenshot of Kirav.ru](https://kirav.ru/images/articles/images_for_github/kiravru/20220723070133screen_kirav_ru-min.jpg)

Project use the following technologies:
- [x] Frontend: React + Redux, Thunk, TypeScript, Webpack
- [ ] Backend: ASP.NET Core 3.1, Entity Framework
- [ ] Database: PostgreeSQL

- [x] - current repository

Also you can find Dockerfile.prod in the project. Use it in your case, it saves you a lot of time.
This project was prepared with another big project [KiravRu_WebApi](https://github.com/NikitaKirav/KiravRu_WebApi). There you can find a file docker-compose.yml, nginx.conf and also some useful bash scripts (for Deployment Automation and getting free ssl for your site).

## Available Scripts

In the project directory, you can run:

### `npm dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `production` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.