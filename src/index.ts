import { PrismaClient } from "@prisma/client"
import express, { Request, Response} from "express"


const prisma = new PrismaClient()
const port = 8000
const app = express();
app.use(express.json());


   
    app.post('/user', async (req: Request, res: Response) => {
        
        console.log(req.body)
        const { email, name } = req.body;
        
        try {
          const newUser = await prisma.user.create({
          data: {
           email,
            name
          }
          });
          res.status(201).json(newUser);
        } catch (error) {
          res.status(400).json({ error: 'User creation failed', details: error });
       
        }
      });
      
      // GET method to fetch all users
      app.get('/users', async (req: Request, res: Response) => {
        try {
          const users = await prisma.user.findMany();
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch users', details: error });
        }
      });
      
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
      
   






