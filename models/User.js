const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email address']
    },
    thought: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }
    ],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// UserSchema.virtual('friendCount').get(function(){
//     return this.friends.length;
// });

const User = model('User', UserSchema);
module.exports = User;