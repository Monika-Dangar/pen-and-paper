﻿# 📜 **Pen & Paper**

Welcome to **Pen & Paper**, a platform where writers can share their work and readers can explore, enjoy, and engage with it.

[Pen and Paper](https://pen-and-paper-gilt.vercel.app/)


## **Overview**

The goal of this project is to create a platform for writers to share their creative works, including **essays, poems, short stories, and thoughts**. Readers can explore the content freely, without needing an account, and can engage by liking, commenting, and interacting with the content. Writers can authenticate, manage their content, and submit new works easily.

## **Features**

### ✍️ **For Writers:**
- **Authentication**: Writers can sign up and log in to manage their work.
- **Create, Edit, and Delete Content**: Writers can create, edit, and delete essays, poems, short stories, and other types of content.
- **Content Management**: Writers can organize their work by category (e.g., love, philosophy, life, etc.) and publish it for readers to enjoy.

### 👀 **For Readers:**
- **Explore**: Readers can browse through a wide variety of essays, poems, and stories.
- **Engage**: Readers can like and comment on the works they enjoy.
- **No Account Needed**: No need for readers to sign up or log in to access the content.

### 🔐 **Admin Features:**
- Admin users can have additional access to manage categories and content.

### 🛠️ **Technologies Used**

- **Frontend:**
  - **Vercel**: Deployment and hosting of the frontend and application.
  - **React**: JavaScript library for building user interfaces.
  - **Axios**: Promise-based HTTP client for making API requests.
  - **Redux**: To maintain user session at client side.
  - **TailwindCSS**: For creaing appealing UI/UX.


- **Backend:**
  - **Vercel**: Deployment and hosting of the backend services.
  - **Express.js**: Web framework for Node.js to build APIs.
  - **Node.js**: JavaScript runtime for server-side scripting.
  - **MongoDB Atlas**: Cloud-hosted MongoDB database service.
  - **bcryptjs**: Library for hashing passwords.

## 🤝 Contributing
We welcome contributions! To contribute to the Pen & Paper project, follow these steps:

- Fork the repository
- Clone your fork:
- git clone https://github.com/your-username/pen-and-paper.git
- Create a new branch:
- git checkout -b feature/your-feature
- Make your changes and commit: git commit -am 'Add new feature'
- Push to your branch: git push origin feature/your-feature
- Submit a pull request


### 📂 File Structure
```bash
pen-and-paper/
├── backend/                 # Backend Node.js server
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes (writer, reader)
│   ├── controllers/         # Controllers for handling requests
│   ├── services/            # Services for handling business logic
│   ├── repository/          # Respository for database queries
│   ├── config/              # Database and environment configuration
│   ├── server.js            # Main server file
│   └── .env                 # Environment variables
│
├── frontend/                # React.js frontend
│   ├── src/
│   │   ├── components/      # React components (form, editor, etc.)
│   │   ├── services/        # API calls (content upload, fetch)
│   │   ├── pages/           # Pages (WriterDashboard, ReaderPage, etc.)
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
│   └── .env                 # Environment variables (e.g., API base URL)
│
└── README.md                # Project documentation
```

## 🌐 Connect with Me
Feel free to reach out for feedback, suggestions, or just to connect!

**🔗 My Portfolio: [Monika-Dangar](https://monika-dangar-portfoliosite.vercel.app/)**


I’m always happy to chat and collaborate on new ideas!

