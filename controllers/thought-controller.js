const { Thought, User } = require('../models');
const dateFormat = require('../utils/dateFormat');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res){
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //get one thought by id
    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.id })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(400).json({ message: 'No thought found with this id'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },

    //add a Thought
    addThought({ params, body}, res){
        Thought.create(body)
        .then(({ _id}) => {
            return User.findOneAndUpdate(
                { _id: params.userId},
                { $push: { thought: _id}},
                { new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: { reaction: body }},
            { new: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },

    removeReaction({ params }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reaction: { reactionId: params.reactionId }}},
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    removeThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.thoughtId})
        .then(deletedThought => {
            if(!deletedThought){
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
                { _id: params.userId},
                { $pull: { thought: params.thoughtId }},
                { new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },

};

module.exports = thoughtController;