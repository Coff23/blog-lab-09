'use strict';

const express = require('express');
const router = express.Router();
const { blog } = require('../middleware/auth/models/index');

router.get('/blog', async (req, res, next) => {
  const allPosts = await blog.findAll({});
  res.status(200).json(allPosts);
});

router.get('/blog/:id', async (req, res, next) => {
  const onePost = await blog.findOne({ where: { id: req.params.id } });
  res.status(200).json(onePost);
});

router.post('/blog', async (req, res, next) => {
  const post = await blog.create(req.body);
  res.status(200).json(post);
});

router.put('/blog/:id', async(req,res,next)=>{
  const id = req.params.id;
  const post = await blog.findOne({where:{id}});
  let updatePost = await post.update(req.body);
  res.status(200).send(updatePost);
});

router.delete('/blog/:id', async(req, res, next)=>{
  let post = await blog.findOne({where:{id:req.params.id}});
  await post.destroy();
  res.status(200).send('Post Deleted');
  
});

module.exports = router;
