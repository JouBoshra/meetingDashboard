# Meeting Dashboard

This project is a modern, interactive meeting dashboard built with React, Vite, and Tailwind CSS. It provides a centralized place to view meeting summaries, key discussion points, presentations, and action items.

## ✨ Features

- **Modern React Application**: Built with Vite for a fast development experience.
- **Responsive Design**: Optimized for various screen sizes, from mobile to desktop.
- **Interactive Tabs**: Easily navigate between Overview, Meeting 1, Meeting 2, Presentations, and Action Items.
- **Dynamic Content**: Meeting details, key points, and action items are dynamically rendered.
- **Framer Motion Animations**: Smooth and engaging animations for a better user experience.
- **Tailwind CSS**: Utility-first CSS framework for rapid and consistent styling.
- **Shadcn/ui Components**: Reusable UI components for a professional look and feel.
- **Company Logo Integration**: Clearly displays the company logo for branding and authenticity.

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js (version 18 or higher) and pnpm installed on your machine.

- **Node.js**: [https://nodejs.org/](https://nodejs.org/)
- **pnpm**: `npm install -g pnpm`

### Installation

1.  **Clone the repository (if you haven't already):**

    ```bash
    git clone https://github.com/[your-username]/meeting-dashboard.git
    cd meeting-dashboard
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

### Running Locally

To start the development server:

```bash
pnpm run dev --host
```

The application will be accessible at `http://localhost:5173` in your web browser.

## 📤 Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages using GitHub Actions.

1.  **Create a new GitHub Repository:**

    If you haven't already, create a new public repository on GitHub (e.g., `meeting-dashboard`).

2.  **Initialize Git and Push to GitHub:**

    ```bash
    git init
    git add .
    git commit -m "Initial commit: Meeting Dashboard with Company Logo"
    git branch -M main
    git remote add origin https://github.com/[your-username]/meeting-dashboard.git
    git push -u origin main
    ```

3.  **Enable GitHub Pages:**

    -   Go to your GitHub repository.
    -   Click on **Settings**.
    -   In the left sidebar, click on **Pages**.
    -   Under "Build and deployment", select **GitHub Actions** as the source.
    -   The provided `.github/workflows/deploy.yml` file will automatically handle the build and deployment process whenever you push changes to the `main` branch.

4.  **Access Your Live Site:**

    Once the GitHub Actions workflow completes successfully (this might take a few minutes), your live site will be available at:

    `https://[your-username].github.io/meeting-dashboard`

## 🤝 Sharing with Your Team

-   **Repository URL**: Share the GitHub repository link (`https://github.com/[your-username]/meeting-dashboard`) with your team members so they can clone the project, contribute, and run it locally.
-   **Live Site URL**: Share the GitHub Pages URL (`https://[your-username].github.io/meeting-dashboard`) for quick access to the live dashboard without needing to set up a local environment.

## 🎨 Customization

-   **Content**: Modify the `meeting1Data`, `meeting2Data`, `presentationsData`, and `actionItems` arrays in `src/App.jsx` to update the dashboard content.
-   **Styling**: Adjust Tailwind CSS classes in `src/App.jsx` and `src/App.css` for visual changes.
-   **Logo**: Replace `src/assets/Brain-Health-USA-Center_white-png(1).webp` with your desired logo file. Remember to update the import path in `src/App.jsx` if the filename changes.

## 🐞 Troubleshooting

-   If the site doesn't deploy, check the **Actions** tab in your GitHub repository for any workflow errors.
-   Ensure all dependencies are installed correctly (`pnpm install`).
-   Verify that the `base` path in `vite.config.js` is correctly set to `'/meeting-dashboard/'` for GitHub Pages deployment.

---

**Built with ❤️ by Manus AI**

