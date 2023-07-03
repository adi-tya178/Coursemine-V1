const Link = require('../models/link')
const slugify = require('slugify');
const User = require('../models/user');
const Category = require('../models/category');
const {linkPublishedParams} = require('../helpers/email');
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

exports.create = (req, res) => {

    const { title, url, categories, type, medium} = req.body;
   //console.log({title, url ,categories, type, medium});
    const slug = url;
    let link  = new Link({title, url, categories, type, medium, slug});
    link.postedBy = req.user._id;

    // catagories

   

    link.save((err, data) => {
        if(err)
        {
            return res.status(400).json({
                error: 'Link already exit'
            })
        }

        res.json(data);

        // find all user in the category
        User.find({ categories: { $in: categories } }).exec((err, users) => {
            if (err) {
                throw new Error(err);
                console.log('Error finding users to send email on link publish');
            }
            Category.find({ _id: { $in: categories } }).exec((err, result) => {
                data.categories = result;

                for (let i = 0; i < users.length; i++) {
                    const params = linkPublishedParams(users[i].email, data);
                    const sendEmail = ses.sendEmail(params).promise();

                    sendEmail
                        .then(success => {
                            console.log('email submitted to SES ', success);
                            return;
                        })
                        .catch(failure => {
                            console.log('error on email submitted to SES  ', failure);
                            return;
                        });
                }
            });
        });
    })
}

exports.list = (req, res) => {

    // let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    // let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    

    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    Link.find({})
        .populate('postedBy', 'name')
        .populate('categories', 'name slug')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Could not list links'
                });
            }
            res.json(data);
        });

}


exports.read = (req, res) => {
    const {id} = req.params
    Link.findOne({_id: id}).exec((err, data) => {
        if(err)
        {
            return res.status(400).json({
                error: 'Error Finding the link'
            })
        }

        res.json(data)
    })

}

exports.update = (req, res) => {
    const {id} = req.params

    const {title, url, categories, type, medium} = req.body
    
    const updatedLink = {title, url, categories, type, medium}


    Link.findOneAndUpdate({_id: id}, updatedLink, {new: true}).exec((err, updated ) => {
        if(err)
        {
            return res.status(400).json({
                error: 'Error removing the link'
            })
        }

        res.json(updated)
    })


}

exports.remove = (req, res) => {
    const {id} = req.params
    Link.findOneAndRemove({_id: id}).exec((err, data)=> {
        if(err)
        {
            return res.status(400).json({
                error: 'Error removing the link'
            })
        }

        res.json({
            message: 'Link removed SuccessFully'
        })

    })

}

exports.clickCount = (req, res) => {
    const {linkId} = req.body
    Link.findByIdAndUpdate(linkId, {$inc: {clicks: 1}}, { upsert: true, new: true}).exec((err, result) => {
        if(err) {
            return res.status(400).json({
                error: 'Could not Update view clicks'
            })
        }
        res.json(result)
    })
}


exports.popular = (req, res) => {
    Link.find()
    .populate('postedBy', 'name')
    .sort({clicks: -1})
    .limit(3)
    .exec((err, links) => {
        if(err)
        {
            return res.status(400).json({
                error: 'Link not found'
            })
        }
        res.json(links);
    })

}

exports.popularInCategory = (req, res) => {

    const {slug} = req.params
    Category.findOne({slug}).exec((err, category) => {
        if(err)
        {
            return res.status(400).json({
                error: 'Category not found'
            })
        }
        
        Link.find({categories: category})
        .sort({clicks: -1})
        .limit(3)
        .exec((err, links) => {
            if(err)
            {
                return res.status(400).json({
                    error: 'Links not found'
                })
            }

            res.json(links)
        }) 
    })

}


exports.comment = async (req, res) => {
    const {id} = req.params
    const comment = req.body.comment
    let doc = await Link.findOneAndUpdate({_id : id},
        { $push: {comment: {
            text: comment,
            created: Date.now()
        } } },{upsert:true,new: true}
    ).exec((error,comment)=> {
        if(err)
            {
                return res.status(400).json({
                    error: 'Links not found'
                })
            }

            res.json(comment)
    })
    //return doc;
//     let doc = await Link.findOneAndUpdate({id}, {$push: {comment: "this video is good"}}, (err, success) => {
//     console.log("ERROR",JSON.stringify(err))
//     console.log("DATA",JSON.stringify(success))
//     return success;
//    })
//    return doc;


    // Link.findOneAndUpdate(
    //     id,
    // { $push: {comment: comment } },
    // { new: true }



    // ).exec((err, result) => {
    //     if(err)
    //     {
    //         return res.status(400).json({
    //             error: JSON.stringify(err)
    //         })
    //     }

    //     res.json(result)
    // }) 

    


}