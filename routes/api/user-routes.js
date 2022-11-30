const router = require('express').Router();
const {getAllUser, getUserById, createUser, updateUser, addFriend, removeFriend, deleteUser} = require('../../controllers/user-controller')


//Set up GET and POST at /api/pizzas
router.route('/')
.get(getAllUser)
.post(createUser);

//set up GET one PUT, and DELETE
router.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);


router.route('/:id')
    .put(addFriend)

router.route('/:id/removeFriend')
    .put(removeFriend)

module.exports = router;