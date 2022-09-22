const router = require('express').Router();
const sequelize = require('../config/connection');
const { Op } = require("sequelize");
const { Project, User, Comment } = require('../models');

// get by developer username
router.get('/:username', (req, res) => {
    console.log(req.session);
    Project.findAll({
        where: {
            user_id:{
                [Op.eq]: sequelize.literal(`(SELECT id FROM user WHERE username = '${req.params.username}')`)
            },
            public: true
          },        
        order: [
            ['id', 'DESC']
          ],

        attributes: [
            'id',
            'title',
            'image_url',
            'description',
            'github_url',
            'date',
            'public',
            'user_id',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'project_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbProjectData => {
        const projects = dbProjectData.map(project => project.get({ plain: true }));
        res.render('developer', { projects, developer: req.params.username, username: req.session.username });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});




module.exports = router;