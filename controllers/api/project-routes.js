const router = require('express').Router();
const { Project, User, Comment, Vote } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all projects
router.get('/', (req, res) => {
    console.log('======================');
    Project.findAll({
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
        order: [['created_at', 'DESC']],
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
    .then(dbProjectData => res.json(dbProjectData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get project by id
router.get('/:id', withAuth, (req, res) => {
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
        res.json(dbProjectData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// post project
router.post('/', withAuth, (req, res) => {
    Project.create({
        title: req.body.title,
        image_url: req.body.image_url,
        description: req.body.description,
        date: req.body.date,
        github_url: req.body.github_url,
        public: req.body.public,
        user_id: req.session.user_id,
    })
    .then(dbProjectData => res.json(dbProjectData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update project
router.put('/:id', withAuth, (req, res) => {
    Project.update(
        {
            title: req.body.title,
            image_url: req.body.image_url,
            description: req.body.description,
            date: req.body.date,
            github_url: req.body.github_url,
            public: req.body.public,

        },
        {
            where: {
            id: req.params.id
            }
        }
    )
        .then(dbProjectData => {
        if (!dbProjectData) {
            res.status(404).json({ message: 'No project found with this id' });
            return;
        }
        res.json(dbProjectData);
    })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete project
router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
    Project.destroy({
        where: {
            id: req.params.id
        }  
    })
    .then(dbProjectData => {
        if(!dbProjectData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }
        res.json(dbProjectData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// up vote a project
router.put('/upvote', withAuth, (req, res) => {
    // custom static method created in models/Project.js
    Project.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router;