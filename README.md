# URL Shortener

A modern, fully functional URL shortener built with React and React Router. This application allows you to shorten long URLs and provides an admin panel to manage all your shortened URLs.

## Features

- ✨ **Modern UI**: Beautiful, responsive design with gradient backgrounds and smooth animations
- 🔗 **URL Shortening**: Convert long URLs into short, shareable links
- 📊 **Admin Panel**: View, search, sort, and manage all your shortened URLs
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 💾 **Local Storage**: All data is persisted in browser's local storage
- 🎯 **Click Tracking**: Track how many times each shortened URL has been clicked
- 🔍 **Search & Filter**: Search through your URLs and sort by various criteria
- 📋 **Copy to Clipboard**: One-click copying of shortened URLs
- 🗑️ **Delete Management**: Delete individual URLs or all URLs at once
- 📤 **Export Data**: Export your URL data as JSON

## How It Works

1. **Shorten URLs**: Enter any valid URL and get a shortened version
2. **Share Links**: Use the shortened URLs anywhere you need them
3. **Track Clicks**: See how many times each URL has been accessed
4. **Manage URLs**: Use the admin panel to view, search, and manage all your URLs

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the project files
2. Navigate to the project directory:
   ```bash
   cd url-shortener
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Project Structure

```
src/
├── components/
│   ├── UrlShortener.jsx      # Main URL shortening component
│   ├── UrlShortener.css      # Styles for URL shortener
│   ├── AdminPanel.jsx        # Admin panel component
│   ├── AdminPanel.css        # Styles for admin panel
│   ├── RedirectHandler.jsx   # Handles URL redirections
│   └── RedirectHandler.css   # Styles for redirect handler
├── App.jsx                   # Main app component with routing
├── App.css                   # Global styles
├── main.jsx                  # Entry point
└── index.css                 # Base styles
```

## Usage

### Shortening URLs

1. Go to the home page
2. Enter a valid URL in the input field
3. Click "Shorten URL"
4. Copy and share your shortened URL

### Managing URLs

1. Click "Admin" in the navigation
2. View all your shortened URLs in a table format
3. Use the search bar to find specific URLs
4. Sort by creation date or click count
5. Delete individual URLs or export all data

### URL Redirection

When someone clicks on a shortened URL (e.g., `http://localhost:5173/abc123`), they will be automatically redirected to the original URL after a brief loading screen.

## Technical Details

- **Frontend**: React 19 with React Router DOM
- **Styling**: Pure CSS with modern features (Grid, Flexbox, CSS Variables)
- **Storage**: Browser Local Storage for data persistence
- **Build Tool**: Vite
- **Routing**: React Router for single-page application navigation

## Browser Support

This application works in all modern browsers that support:
- ES6+ features
- CSS Grid and Flexbox
- Local Storage API
- Clipboard API

## Customization

You can easily customize the application by:

1. **Changing Colors**: Modify the CSS variables in the CSS files
2. **Adding Features**: Extend the components with new functionality
3. **Styling**: Update the CSS files to match your design preferences
4. **Backend Integration**: Replace local storage with a real database API

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

---

**Note**: This is a frontend-only application. For production use, consider adding a backend API for better data management and analytics.