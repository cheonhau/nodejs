const express = require('express');
const router = express.Router();

router.use('/api', require('./api'));
// thử use /web coi được hông, chia ra được hay không để dễ phân cấp 
module.exports = router;