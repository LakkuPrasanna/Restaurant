const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express();
app.use(cors());
app.use(express.json()); // Body Parser for JSON

const uri = "mongodb+srv://karthika:123@cluster0.xmihhfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
}

connectDB();

app.listen(3008, () => {
  console.log("Server started on http://localhost:3008");
});

app.post("/sign", async (req, res) => {
  const { email, fname, lname, password, phonenumber } = req.body;
  const normalizedEmail = email.toLowerCase();

  console.log(`Received signup request for email: ${normalizedEmail}`);

  try {
    const database = client.db('restaurant');
    await database.command({ ping: 1 });

    const existingUser = await database.collection("users").findOne({ email: normalizedEmail });

    if (existingUser) {
      console.log(`User with email ${normalizedEmail} already exists`);
      return res.status(400).send("Email already exists.");
    }

    const newUser = {
      email: normalizedEmail,
      fname,
      lname,
      password,
      phonenumber,
    };

    const result = await database.collection("signupdata").insertOne(newUser);
    console.log(`New user created with ID: ${result.insertedId}`);

    res.status(201).send({ 
      status: 'success', 
      user: {
        _id: result.insertedId,
        email: newUser.email,
        fname: newUser.fname,
        lname: newUser.lname,
        phonenumber: newUser.phonenumber,
      } 
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();
  
  console.log(`Received login request for email: ${normalizedEmail}`);

  try {
      const database = client.db('restaurant');

      // Find the user by email
      const user = await database.collection("signupdata").findOne({ email: normalizedEmail });

      // Check if user exists and password matches
      if (user && user.password === password) {
          console.log(`User with email ${normalizedEmail} logged in successfully`);
          res.status(200).send({
              status: 'success',
              user: {
                  _id: user._id,
                  email: user.email,
                  fname: user.fname,
                  lname: user.lname,
              }
          });
      } else {
          console.log(`Invalid credentials for email: ${normalizedEmail}`);
          res.status(401).send("Invalid email or password.");
      }
  } catch (err) {
      console.error('Error during login:', err);
      res.status(500).send("Internal Server Error");
  }
});



  app.get("/menulist",(req,res)=>{
 

    const Menu=async()=>{
      
      await client.connect();
      await client.db("admin").command({ping:1});
      const database=client.db('restaurant');
      const result=await database.collection('menulist').find({}).toArray();
     // const menulist=await result.find().toArray();
      console.log(result)
      res.send({status:"success",data:result})
    
    }
    Menu()
    
    })
    app.get("/itemdetail",(req,res)=>{
 

      const Itemdetail=async()=>{
        
        await client.connect();
        await client.db("admin").command({ping:1});
        const database=client.db('restaurant');
        const result=await database.collection('menulist').findOne({itemid:req.query.item_id});
       // const menulist=await result.find().toArray();
        console.log(req.query)
        res.send({status:"success",data:result})

      }
      Itemdetail()
      
      })
      app.post("/api/cart/add", async (req, res) => {
        const { userId, productId, quantity, image } = req.body; // Add image to destructuring
    
        try {
            const database = client.db('restaurant');
            
            // Check if the cart item already exists
            const existingCartItem = await database.collection('cart').findOne({ userId, productId });
    
            if (existingCartItem) {
                // If the item exists, increment the quantity
                const updatedCartItem = await database.collection('cart').updateOne(
                    { userId, productId },
                    { $inc: { quantity: quantity } }
                );
    
                res.send({ status: 'success', message: 'Item quantity updated' });
            } else {
                // If the item is not in the cart, add a new entry
                const newCartItem = { userId, productId, quantity, image }; // Include image in the new cart item
                await database.collection('cart').insertOne(newCartItem);
                res.status(201).send({ status: 'success', message: 'Item added to cart' });
            }
        } catch (err) {
            console.error('Error adding product to cart:', err);
            res.status(500).send("Internal Server Error");
        }
    });
    
    
app.post("/api/items/add", async (req, res) => {
  const { name, price } = req.body;

  try {
      const database = client.db('restaurant');
      
      const newItem = {
          name,
          price,
          createdAt: new Date(),
      };

      const result = await database.collection('cart').insertOne(newItem);
      console.log(`New item created with ID: ${result.insertedId}`);

      res.status(201).send({
          status: 'success',
          item: {
              _id: result.insertedId,
              name: newItem.name,
              price: newItem.price,
          }
      });
  } 
  catch (err) {
      console.error('Error during item addition:', err);
      res.status(500).send("Internal Server Error");
  }
});
app.get("/api/items/cart", async (req, res) => {
  const { userId } = req.query;

  try {
      const database = client.db('restaurant');
      // Assuming userId is used as a field in your cart collection to identify which user's cart items to retrieve
      const cartItems = await database.collection('cart').find({ userId: userId }).toArray();

      res.send({ status: "success", data: cartItems });
  } catch (err) {
      console.error('Error fetching cart items:', err);
      res.status(500).send("Internal Server Error");
  }
});



app.get("/cartitems",(req,res)=>{
  const cart=async()=>{
    await client.connect();
    await client.db("admin").command({ ping: 1});
    const database=client.db("restaurant")
    const collect=database.collection("cart");

    const products = await collect.find({}).toArray()

    if(products){
      console.log(products)
      res.send({status:"success",data:products})
    }
  }
  cart()
})

    
app.get("/search", async (req, res) => {
  const { query } = req.query; // Get the search query from query parameters

  console.log(`Received search request for query: ${query}`);

  try {
      const database = client.db('restaurant');
      const searchResults = await database.collection('menulist').find({
          $or: [
              { name: { $regex: query, $options: 'i' } },
              { description: { $regex: query, $options: 'i' } }
          ]
      }).toArray();

      res.send({ status: "success", data: searchResults });
  } catch (err) {
      console.error('Error during search:', err);
      res.status(500).send({ status: 'error', message: 'Internal Server Error' });
  }
});


app.post("/contact", async (req, res) => {
  const { email, query } = req.body;

  try {
    const newQuery = { email, query, createdAt: new Date() }; // add createdAt for timestamp
    const database = client.db('restaurant');

    const result = await database.collection("query").insertOne(newQuery);
    console.log(`New query created with ID: ${result.insertedId}`);

    res.status(201).send({ 
      status: 'success',
      queryId: result.insertedId
    });
  } catch (err) {
    console.error('Error during query saving:', err);
    res.status(500).send("Internal Server Error");
  }
});
// Add this route after your other routes
app.post("/book", async (req, res) => {
  const { uname, email, date, request } = req.body;

  console.log(`Received booking request for name: ${uname}, email: ${email}, date: ${date}`);

  try {
    const database = client.db('restaurant');

    // Prepare the booking data
    const bookingData = {
      uname,
      email,
      date,
      request,
      createdAt: new Date(),  // Include a timestamp for reference
    };

    // Insert the booking data into the 'bookingup' collection
    const result = await database.collection('bookingup').insertOne(bookingData);
    console.log(`New booking created with ID: ${result.insertedId}`);

    res.status(201).send({
      status: 'success',
      bookingId: result.insertedId,  // Return the ID of the created booking for reference
    });
  } catch (err) {
    console.error('Error during booking:', err);
    res.status(500).send("Internal Server Error"); // Handle server errors
  }
});

