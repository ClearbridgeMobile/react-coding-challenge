# react-coding-challenge

## 1. Technologies Used
- React
- React router dom
- TypeScript
- Materrial UI
- Formik
- yup

## 2. Folder Structure
- **/src**
    - **/assets :** storing static files and resources used by the application.
    - **/components :** All components are organized in separate folders, each containing an index.tsx file and its corresponding individual CSS file.
        - **/component1**
            - **index.tsx :** Component code
            - **component.css :** Component Style
    - **/app.tsx :** Routers structure for entire application
        - /home - entry page of application, where Arts are listed with pagination
        - /home/:id - individule Art detail page

## Steps to rune code
1. Clone project from "ami-dholakiya-steller-element-task" branch: git clone -b ami-dholakiya-steller-element-task https://github.com/ClearbridgeMobile/react-coding-challenge.git

2. install all dependencies: npm i

3. run the code: npm run start

## Notes
- If image information is not sent successfully via the Fetch API, a static sample image from the assets folder will be rendered.
- The CommentForm component includes a single-field form with required validation, implemented using the Yup library. 