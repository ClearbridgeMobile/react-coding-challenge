# Getting Started

The developed code is aimed at building a React SPA using Ant Design components to interact with the Art Institute of Chicago's API. This application comprises two main parts: a list view (`ArtifactsList`) that displays artworks fetched from the API with capabilities for searching and filtering, and a detail view (`ArtifactDetail`) that shows more detailed information about a specific artwork. Below, I document the design decisions made throughout this development process.

### Design Decisions

The application's design leverages modern React practices and Ant Design components to create a user-friendly interface for exploring artworks from the Art Institute of Chicago. By utilizing React Router for navigation, managing state with Hooks, and dynamically fetching data, the application offers a seamless experience for users to search, filter, and view detailed information about artworks. The implementation decisions were guided by the goals of optimizing user experience, ensuring code maintainability, and efficiently handling data.

#### 1. **Use of Ant Design for UI Components**
- **Rationale**: Ant Design (AntD) provides a comprehensive set of high-quality React components that are ready to use and easy to customize, which accelerates the development process and ensures consistency across the UI. 
- **Implementation**: Implemented AntD components such as `List`, `Button`, `Pagination`, `Form`, `Input`, `Select`, and `Spin` were used to build the UI. This choice allowed for rapid development with an appealing and user-friendly interface.

#### 2. **React Router for Navigation**
- **Rationale**: React Router enables the implementation of declarative routing within React applications. It was chosen to manage navigation between the list of artworks and the detailed view of a specific artwork, enhancing the application's usability by allowing users to bookmark or share URLs directly.
- **Implementation**: Used `useParams` to extract parameters from the URL, enabling the `ArtifactDetail` component to fetch and display details based on the artwork's ID.

#### 3. **State Management with Hooks**
- **Rationale**: React's built-in Hooks API provides a straightforward way to manage state and lifecycle events in functional components, promoting code reusability and simplicity.
- **Implementation**: Utilized `useState` for local state management to store artworks, pagination data, search terms, category filters, and loading states. `useEffect` was employed to trigger side effects, such as fetching data when component mounts or dependencies change.

#### 4. **Dynamic Data Fetching**
- **Rationale**: To ensure the application displays the most current data available from the Art Institute of Chicago's API, dynamic data fetching was implemented.
- **Implementation**: Created `fetchArtworks` and `fetchArtworkDetail` functions to make asynchronous API calls, allowing the application to fetch a list of artworks and detailed information for a specific artwork, respectively. These functions handle constructing API URLs with query parameters for pagination, search, and filtering.

#### 5. **Client-Side Filtering**
- **Rationale**: While the API provides basic search functionality, implementing additional client-side filtering offers flexibility in how data is displayed without requiring additional API requests.
- **Implementation**: Implemented a function to filter artworks based on selected categories within the `ArtifactsList` component, enhancing the application's responsiveness and reducing the need for frequent API calls.

#### 6. **Pagination and Search/Filter UI**
- **Rationale**: To improve user experience by managing large datasets and allowing users to find specific artworks easily.
- **Implementation**: Integrated Ant Design's `Pagination` component to handle dataset navigation and used `Form`, `Input`, and `Select` components to create a user-friendly interface for searching and filtering artworks.

#### 7. **Error Handling and Loading States**
- **Rationale**: Providing feedback to users on the application's state (e.g., loading, error states) improves the overall user experience.
- **Implementation**: Incorporated loading states using Ant Design's `Spin` component to indicate data fetching processes and implemented basic error handling in data fetching functions to log errors.

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.