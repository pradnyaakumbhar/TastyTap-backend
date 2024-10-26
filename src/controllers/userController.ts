import { Request, Response } from 'express';
import User from '../modals/user';

const getCurrentUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const createCurrentUser = async (req: Request, res: Response) => {
  //check if user exists
  //create user if doesnt exists
  //return user
  try {
    const { auth0Id } = req.body;
    const user = await User.findOne({ auth0Id });
    if (user) {
      res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating the user' });
  }
};

const updateCurrentUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, addressLine1, city, country } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating the user' });
  }
};

export default { getCurrentUser, createCurrentUser, updateCurrentUser };
