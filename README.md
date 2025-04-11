# Node Farm

This project is a simple HTTP server built using Node.js. It serves an e-commerce-like application where users can view an overview of products and get detailed information about each product. The server dynamically generates product pages using HTML templates and JSON data.

## Features:

- **Product Overview Page**: Displays a list of products with links to individual product pages.
- **Product Page**: Displays detailed information for a specific product when accessed via a link.
- **API Endpoint**: Provides JSON data for all products.
- **404 Handling**: Displays a custom 404 error page if a user accesses an invalid route.

---

## Installation and Setup

To get started with this project, follow the steps below.

### Step 1: Clone the Repository

First, clone the repository to your local machine.

```bash
git clone https://github.com/your-username/product-display-server.git
```

### Step 2: Install Dependencies

Navigate to the project directory and install the required dependencies.

```bash
cd product-display-server
npm install
```

This will install the `slugify` module (and any other dependencies you may have defined in `package.json`).

### Step 3: Run the Server

Start the server by running the following command:

```bash
npm start
```

This will start the server on `http://127.0.0.1:8000/`. Open this URL in your browser to see the product overview page.

### Step 4: Accessing the Pages

- **Overview Page**: `http://127.0.0.1:8000/` - Displays a list of products with links to each product page.
- **Product Page**: `http://127.0.0.1:8000/product?item=<slug>` - Replace `<slug>` with the slug of the product you want to view. Slugs are generated from the product names (e.g., `product-name`).
- **API Endpoint**: `http://127.0.0.1:8000/api` - Returns a JSON response with all product data.

---

## Project Structure

Here’s an overview of the project structure:

```
/product-display-server
├── /dev-data
│   └── data.json             # Product data in JSON format
├── /images
│   └── 404-error-illustration.png  # Custom 404 error image
├── /modules
│   ├── replaceTemplate.js    # Function to replace placeholders in templates
│   └── sendNotFoundPage.js   # Function to send a custom 404 page
├── /templates
│   ├── template-404.html     # Template for 404 error page
│   ├── template-overview.html # Template for the overview page
│   ├── template-product.html  # Template for product page
│   └── template-card.html    # Template for individual product cards
├── index.js                 # Main server file
├── package.json              # Project metadata and dependencies
└── README.md                 # Project documentation
```

---

## How it Works

1. **Product Data**: Product information is stored in `dev-data/data.json`. The JSON data is parsed into an array of objects (`dataObj`). Each object contains information such as product name, price, description, and image URL.
2. **Slugs**: The `slugify` function is used to generate slugs from product names. Slugs are unique, lowercased strings used as identifiers for each product.

3. **Templates**: The project uses HTML templates to generate the pages. Each product card, product page, and error page is built by inserting dynamic data into placeholders.

   - The **Overview Page** lists all products and uses the `slugify` slugs for the product links.
   - The **Product Page** displays detailed information about a selected product.
   - A **404 Error Page** is displayed when an invalid route is accessed.

4. **Routing**: The server uses the `http` module to listen for requests. The routing logic is as follows:
   - `/overview` or `/`: Displays the product overview page.
   - `/product?item=<slug>`: Displays a specific product page based on the product slug.
   - `/api`: Returns a JSON response with all product data.
   - All other routes return a 404 error page.

---

## Placeholders

In the templates, you can replace placeholders with actual data:

1. `{%PRODUCT_CARDS%}`: This placeholder is replaced with the HTML for all product cards on the overview page.
2. `{%PRODUCT_NAME%}`: Replaced with the product's name on the product page.
3. `{%PRODUCT_IMAGE%}`: Replaced with the product's image URL.
4. `{%PRODUCT_DESCRIPTION%}`: Replaced with the product's description.
5. `{%PRODUCT_SLUG%}`: Replaced with the generated slug for each product.

---

## Customizing the Templates

To customize the templates or add new images, follow these steps:

1. **Adding New Product Images**:

   - Place your images in the `/images` directory.
   - Ensure the image path is correct in the `data.json` file (e.g., `imageUrl: '/images/product-image.jpg'`).

2. **Modifying Template Structure**:
   - Modify the HTML in `/templates` to fit your design needs.
   - Ensure placeholders like `{%PRODUCT_NAME%}`, `{%PRODUCT_IMAGE%}`, etc., are maintained to avoid breaking the dynamic content rendering.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Troubleshooting

- **404 Error**: If you encounter a 404 error for any image or page, ensure the image paths and URLs are correctly configured in `data.json` and the templates.
- **Missing Templates**: Ensure that all required template files (`template-404.html`, `template-overview.html`, etc.) are present in the `/templates` directory.

---

By following these instructions, you should be able to run and customize the server to fit your needs.
