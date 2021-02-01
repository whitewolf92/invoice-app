# Shopping Cart

### Design Methodology

The application is designed using ReactJs which is one of the most popular Frontend Framework out there. I would assume that most people would be at least familiar with 1 Javascript UI framework and they will have no problem learning from my Demo code.

After thinking through which css strategy to use, I decided to use the Tailwind css framework which allows me to quickly design my UI just using utility classes. This particular setup will allow other programmers to easily redesign the UI using the framework or just remove the utility classes and come with their own CSS strategy.

I kept the ReactJS as simple as possible by not using too many libraries as to reduce dependencies. For state management, I used React hooks to maintain the state across different pages.

### Assumptions

There wasn't any instructions on where I can retrieve the products, so I used an online free api service to get the products.

The free api provides the product in USD dollars. I had to convert them via an exchange rate of USD1 to 14.000IDR. The conversion is done at the checkout page.

Requirements did not mentioned that the cart page must allow the user to update the quantity. I added it in because most shopping cart design would allow users to change the products quantity on the cart page.

There wasn't any requirement to maintain the state of the cart after a user has closed and reopened the browser tab, but I felt its a common requirement so I decided to use **local storage** to store the cart details. 

Creating an invoice requires the email, so I had to redirect the user to a checkout page where they have to enter their email and then press the **Process to Payment** button. Once click, they would be redirect to Xendit checkout.

### Challenges

I had no knowledge of Xendit API so it took me awhile to figure how create the invoices via the API. Initially, I tried to call the Xendit invoice creation API from ReactJS but I hit a cross origin issue. So I read back the documentation and realised that I needed a backend server to run the [https://github.com/xendit/xendit-node](https://github.com/xendit/xendit-node) libraries. After setting ExpressJs, I exposed its API for the frontend to call and initiate the invoice creation.

### Plan

Tidy the code further, make it into a plugin/package which people can install via npm or yarn. 

Try to setup integration via dialog pop-up (a.k.a. modal iframe) and redirect.

Add the shopping cart items into invoice but will have for invoice to have the necessary features. 

Write unit test and integration test to test the robustness of the application.

