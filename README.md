![tradeify_icon](https://user-images.githubusercontent.com/10810722/148707800-94be37cf-6054-4a30-8904-a7e6b87ad100.png)

# Tradeify

Tradeify is a project currently under construction to provide investors with a flexible interface to record tradenotes and the related KPIs and Trades. It provides value to investors through the provision of formal trade history and recording to track gains and losses, and to track rationale and trading strategies.

Tradeify is built on a Javascript => Python => MongoDB Stack and is architected as follows:
   * React (JavaScript) frontend to define the views and the UI for customers. UI/UX designed by Adeboye Olaniyan and implemented by Adeboye Olaniyan and Tobi Adegunloye.
   * Django (Python) backend to define endpoints and create an API that houses the business logic for the app.
   * MongoDB (NoSQL document database) to store tradeify user and trade data in documents that are highly scalable and accessible through the Django backend.
   * Hosting for this web app is currently planned through Microsoft Azure services.
   * Reporting and application insights will be completed using the Microsoft Azure App Insights service.
