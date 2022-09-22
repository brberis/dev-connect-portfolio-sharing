const router = require('express').Router();
const homeRoutes = require('./home-routes');
const developerRoutes = require('./developer-routes');
const dashboardRoutes = require('./dashboard-routes');
const streamerRoutes = require('./streamer-routes');
const apiRoutes = require('./api/');

router.use('/', homeRoutes);
router.use('/developer', developerRoutes);
router.use('/streamer', streamerRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;