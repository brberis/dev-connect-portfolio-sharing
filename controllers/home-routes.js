const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, User, Comment } = require('../models');

// get last 4 public projects
router.get('/', (req, res) => {
    console.log('======================');
    Project.findAll({
        where: {
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
        ],
        limit:4
    })
    .then(dbProjectData => {
        const projects = dbProjectData.map(project => project.get({ plain: true }));
        res.render('homepage', {
            projects,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get public project by id
router.get('/project/:id', (req, res) => {
    Project.findOne({
        where: {
            id: req.params.id,
            public: true
        },
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
        if (!dbProjectData) {
            res.status(404).json({ message: 'No project found under this id' });
            return;
        }
        const project = dbProjectData.get({ plain: true });

        res.render('single-project', {
            project,
            loggedIn: req.session.loggedIn,
            loggedUser: req.session.username
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// user registration
router.get('/sign-up', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});


module.exports = router;
