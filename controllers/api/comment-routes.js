const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'comment_text',
            'user_id',
            'project_id',
            'created_at',
            'updated_at'
        ] 
    })
    .then(dbCommentData = re.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// post comments
router.post('/', withAuth, (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        project_id: req.body.project_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

// edit comment
router.put('/:id', withAuth, (req, res) => {
    Comment.update(
      {
        comment_text: req.body.commentText,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id
        }
      }
    )
      .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id' });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// delete comments
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status.apply(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;