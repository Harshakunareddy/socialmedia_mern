// getUser,
// getUserFriends,
// addRemoveFriend

import User from "../models/User.js";

// display single User details
const getUser = async (req, res) => {
  try {
    // params - to access the parameters from the URL of an http req like id, name,password,email etc
    // alternative - req.body for accessing the whole input fields from the frontend
    let { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    // res.status(404).json({error: err.message});
    res.status(404).json({ message: err.message });
  }
};

// get friends of the user simple logic here
const getUserFriends = async (req, res) => {
  try {
    let { id } = req.params;
    const user = await User.findById(id);

    // handles multiple asynchrounous operations concurrently and wait for the completion of all of them before proceeding further.
    // resolve and reject are present
    // if any one task is not rejected it return the reason for the reject of the 1st rejection and ignores the other tasks or the opearions.

    // const friends = await Promise.allSettled() - used for returning the other operations that are resolved instead of the rejected one.

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
        ({
            _id, firstName,lastName,occupation,location,picturePath
        })=>{
            return {
                _id, firstName,lastName,occupation,location,picturePath
            }
        }
    );
    res.status(200).json(formattedFriends);
  } 
  catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const addRemoveFriend = async (req,res)=>{

    // if user is friend already then the option for removing him
    // else there will an option for adding him as a friend
    try{
        const {id,friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id)=> id!== friendId);
            friend.friends = friend.friends.filter((id)=> id !== id);
        }
        else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
          user.friends.map((id)=>User.findById(id))
        );

        // now its time for sending the formatted friends to the frontend by using the json
        const formattedFriends = friends.map(
            ({_id,firstName,lastName,location,occupation,picturePath})=>{
                return{
                    _id,firstName,lastName,location,occupation,picturePath
                }
            }
        );
        // res.status(200).json({formattedFriends});
        res.status(200).json(formattedFriends);
    }
    catch(err){
        res.status(404).json({msg:err.message});
    }
}
export default { getUser, getUserFriends, addRemoveFriend };
