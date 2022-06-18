const express = require('express');
const_ = require('lodash');
const {card, validateCard, generateBizNumber} = require('../models/card');
const auth = require ('../middleware/auth');
const router = express.Router();

router.delete('/:id', auth, async, (req, res) => {

const card = await card.findOneAndRemove ({_id: req.params.id, user_id: req.user._id});   
if(!card) return res.status(404).send ('The card with the given ID was not found.');
res.send(card);

});

router.put('/:id', auth, async, (req, res) => {

const { error } = validateCard(req.body);
if(error) return res.status(400).send (error.details[0].message);

let card = await card.card.findOneAndUpdate({_id: req.params.id, user_id: req.user._id }, req.body);
if(!card) return res.status(404).send ('The card with the given ID was not found.');

card = await card.findOne({_id: req.params.id, user_id: req.user._id})
res.send(card);

});

router.get('/:id', auth, async, (req, res)=> {

    const card = await card.findOne ({_id: req.params.id, user_id: req.user._id});
    if (!card) return res.status(404).send('The card with the given ID was not found.');
    res.send(card);

});

router.post('/', auth, async, (req, res)=> {

    const { error } = validateCard (req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let card = new card(
        {
            bizName: req.body.bizName,
            bizDescription: req.body.bizDescription,
            bizAddress: req.body.bizAddress,
            bizPhone: req.body.bizPhone,
            bizImage: req.body.bizImage ? req.body.bizImage :'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            bizNumber: await generateBizNumber(card), card.
            user_id: req.user_id
        }
    );
    
    post = await card.save();
    res.send(post);

})

module.exports = router;