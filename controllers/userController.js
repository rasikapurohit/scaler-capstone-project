// all the route handlers here
// logic
async function createUserHandler(req,res){

    try {
        const userDetails = req.body;
    const isEmpty = Object.keys(userDetails).length === 0;
    if (isEmpty){
        res.status(400).json({
            status:400,
            message:"Body cannnot be empty"
        });
    } 
    else {
        // userDetails.id = id;
        console.log("user => ", userDetails);
       const user = await User.create(userDetails);
       res.status(201).json({
        status:201,
        message:"User created!",
        data:user
    });
    }
    } catch (err) {
        console.log(err)
    }
    

}