# CS-465

Executive Summary

	The application being developed is a comprehensive travel website for Travlr Getaways. The application will utilize the MEAN stack to facilitate customer and administrative functions. The MEAN stack includes the following technologies, MongoDB, Express, Angular, and Node. MongoDB will provide the database to facilitate data creation and retrieval. Express provides the framework to organize the components of the website. Angular allows for dynamic content to be utilized for the website. Lastly Node allows for JavaScript on the server application.
 On the customer side, users will be able to view the available room, trips, food options, and destination-related news articles. The pages on the customer-facing application will include dynamically loaded content to produce a robust and stable website. Administrative users will access a single-page application that allows them to provide updates to the website and monitor the server side of the application. This includes access to the database for analytical reports and administrative functions. 

Design Constraints

	The application should support cross-browser compatibility to reach a large cross-section of potential clientele. The application should also feature modern security principles to safeguard personal data. The application should also utilize design principles to ensure that the website operates regardless of the connection speed and is responsive to actions performed on the website. 
	The implications of these constraints will provide users with a convenient, easy-to-use site that has the tools to protect the user. Furthermore, the constraints provide guidelines for the developers to adhere to when designing the application.  

System Architecture View

Component Diagram

 

A text version of the component diagram is available: CS 465 Full Stack Component Diagram Text Version. 

	The major components of the system are the database, the client system, and the server system. The database is composed of one component and provides interfaces to both the client and server systems. On the server system at the bottom of the diagram we have Mongoose ODM which requires an interface to the Mongo database. It in turn produces an interface to the rest of the server system to link the server system to the database. Above this is the Server Session which interfaces to the Mongoose ODM and the Traveler database components. The Server session is linked to the Authentication server and exits to an interface to the client system.
	In the client system the Client Session interfaces with the provided Server Session interface. The Client Session interfaces with the Web Browser and Traveler Portfolio. The Traveler Portfolio interfaces with the Graphic Library to provide pictures to the Web Browser. The Traveler Portfolio also interfaces with the provided interface from the database.
 
Sequence Diagram

 

The sequence starts with the actor. When the actor navigates to the website in the browser. The browser pulls the view and template to be displayed to the client. The browser also connects to the controller to handle the connections in the application. The controller calls the http client to retrieve any data that needs to be accessed. The http client sends a request to the server to retrieve the data. The server routes the request to the controller/model layer to retrieve the requested data. The controller requests the data through Mongoose ODM to MongoDB. MongoDB processes the request, and the callback sends the data to the server controller. The server controller transforms the raw data into a Json and passes it to the http client. The http client passes the Json object to the client controller which assigns the scope of the object. Lastly the controller displays the data in the Json format to the browser view.

Class Diagram

 

Itinerary: 	Has associations with Travel_Agent, CruiseInfo, FlightInfo, and HotelInfo. Also has many to many relationships with HotelBooking, FlightBooking, and CruiseBooking. It also has a one to many relationship with Membership_Admin. Has the methods;
o	BookPackage(Itinerary):Itinerary
o	BookHotel(Itinerary):HotelInfo
o	BookFlight(Itinerary): FlightInfo
o	BookCruise(Itinerary): CruiseInfo

CruiseInfo:	Has associations with Travel_Agent and CruiseBooking. It inherits from the TravellerInfo class. The class is utilized in the TripInfo class. Has the methods;
o	name:string
o	cabintype:string
o	price:float

TravellerInfo:	The classes CruiseInfo, HotelInfo, and FlightInfo inherit from this class. Has the methods;
o	totalprince:float
o	totalmiles:int
o	stopover:string

FlightInfo: 	Has associations with Travel_Agent and FlightBooking. It inherits from the TravellerInfo class. The class is utilized in the TripInfo class. Has the methods;
o	name:string
o	seatclass:string
o	price:float

HotelInfo:	Has associations with Travel_Agent and HotelBooking. It inherits from the TravellerInfo class. The class is utilized in the TripInfo class. Has the methods;
o	name:string
o	star:int
o	location:string
o	roomrequested:int
o	price:float

TripInfo:	The class utilizes the classes HotelInfo, FlightInfo, and CruiseInfo. Has the methods;
o	starting_date:int
o	returning_date:int
o	origin:string
o	destination:string

Membership_Admin: Has a one to many relationship to Itinerary. The class MemberAccount inherits from this class. The class has the methods;
o	creditpoints(itinerary):bool
o	getpoints(membernum:int, frequent_airline:string):int
o	validate(membernum:int, frequent_airline:string):bool

HotelBooking:	Has associations with HotelInfo and Travel_Agent. Has a many to many relationship with Itinerary. Has a method;
o	getHotel(TravelerInfo, HotelInfo):HotelInfo

CruiseBooking:	Has associations with CruiseInfo and Travel_Agent. Has a many to many relationship with Itinerary. Has a method;
o	getCruise(TravelerInfo, CruiseInfo):CruiseInfo


FlightBooking:	Has associations with FlightInfo and Travel_Agent. Has a many to many relationship with Itinerary. Has a method;
o	getFlight (TravelerInfo, FlightInfo): FlightInfo


Travel_Agent: 	Utilized by the MemberAccount class. Has associations with Itinerary, HotelBooking, FlightBooking, and CruiseBooking. Has the method;
o	companionnum:int

MemberAccount:	Inherits from the Membership_Admin. Utilizes the class Travel_Agent. Has the methods;
o	membernumber:int
o	frequent_airline:string
o	memberstatus:int
o	memberclub:string

API Endpoints


Method	Purpose	URL	Notes
GET	Retrieve list of trips	/api/trips	Returns a list of all trips
GET	Retrieve a single trip	/api/trips/:tripCode	Returns a single trip from the provided trip code

The User Interface

 
Admin Page showing new Trip added to the trip list.

 
Edit Page of Mega Reef 1 of 2

 
Edit Page of Mega reef 2 of 2

The project structures of Angular and Express share similarities in their organization to enhance maintainability and scalability. Angular focuses on the client-side (front-end) functionality, while Express handles server-side (back-end) logic.

Angular's project structure typically includes an "app" folder where components, modules, views, and assets are managed. This structure facilitates the development of Single Page Applications (SPAs), where a single HTML page dynamically updates without full page reloads. Express, on the other hand, follows a more traditional Model-View-Controller (MVC) design pattern, organizing code within a "source" or "src" folder.

In terms of functionality, SPAs offer a rich user experience by dynamically updating content without reloading the entire page, resulting in smoother and more responsive interactions compared to traditional web applications. This is achieved through features like client-side routing, asynchronous data fetching, and dynamic DOM manipulation.

To ensure the SPA interacts seamlessly with the API to retrieve (GET) and update (PUT) data in the database, comprehensive testing is essential. Postman, a popular API testing tool, can be used to send requests to API endpoints and verify their responses.

The testing process typically involves:

•	Identifying API endpoints: Determine the endpoints responsible for fetching and updating data in the database.

•	Sending GET requests: Use Postman to send GET requests to these endpoints, ensuring they return the expected data from the database.

•	Sending PUT requests: Similarly, send PUT requests to endpoints responsible for updating data, ensuring that changes are reflected in the database.

•	Verifying responses: Check the responses from each request to ensure they match the expected outcomes. Successful requests should return appropriate status codes (e.g., 200 for successful GET requests, 204 for successful PUT requests), along with the expected data.

•	Handling errors: If any request fails, investigate the cause by checking logs or error messages. Common issues include incorrect endpoint URLs, missing authentication tokens, or server-side errors.

