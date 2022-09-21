const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    console.log('======================');
    Project.findAll({
        where: {
            user_id: req.session.user_id
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
        const projects = dbProjectData.map(project => project.get({ plain: true }));
        res.render('dashboard', { projects, loggedIn: true, username: req.session.username });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Project.findOne({
        where: {
            id: req.params.id
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
                model: User,
                attributes: ['username']
            }
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'project_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbProjectData => {
        if (!dbProjectData) return res.status(404).json({ message: 'No project found with this id' });

        const project = dbProjectData.get({ plain: true })
        res.render('edit-project', {
            project,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get comment to edit
router.get('/comment/edit/:id', withAuth, (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'comment_text',
        'project_id',
        'created_at',
      ],
      include: {
        model: User,
        attributes: ['username']
      }
    })
      .then(dbCommentData => {
        if (dbCommentData) {
          const comment = dbCommentData.get({ plain: true });
          res.render('edit-comment', {
            comment,
            loggedIn: true
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

module.exports = router;