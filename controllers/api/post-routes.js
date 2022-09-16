const router = require('express').Router();
const { Project, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    console.log('======================');
    Project.findAll({
        attributes: [
            'id',
            'project_content',
            'title',
            'created_at',
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

router.get('/:id', (req, res) => {
    roject.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'project_content',
            'title',
            'created_at',
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
                attributes: 'username'
            }
        ]
    })
    .then(dbProjectData => {
        if(!dbProjectData) {
            res.status(404).json({ message: 'No poroject found with this id!' });
            return;
        }
        res.json(dbProjectData);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

router.project('/'. withAuth, (req, res) => {
    Project.create({
        title: req.body.title,
        project_content: req.body.project_content,
        user_id: req.session.user_id
    })
    .then(dbProjectData => res.json(dbProjectData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Project.update(
        {
            title: req.body.title,
            project_content: req.body.project_content
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

module.exports = router;