
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (DwrHandler == null) var DwrHandler = {};
DwrHandler._path = '/dwr';
DwrHandler.getBookCaseById = function(p0, callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'getBookCaseById', p0, callback);
}
DwrHandler.getTrackerProductDetailsByGroupId = function(p0, callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'getTrackerProductDetailsByGroupId', p0, callback);
}
DwrHandler.deleteBookShelf = function(p0, callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'deleteBookShelf', p0, callback);
}
DwrHandler.getBookShelfById = function(p0, callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'getBookShelfById', p0, callback);
}
DwrHandler.getAnalystsByProfileIdLike = function(p0, p1, callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'getAnalystsByProfileIdLike', p0, p1, callback);
}
DwrHandler.getIdcTweets = function(p0, callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'getIdcTweets', p0, callback);
}
DwrHandler.getIndustryWatch = function(callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'getIndustryWatch', callback);
}
DwrHandler.createTeamBookCase = function(p0, callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'createTeamBookCase', p0, callback);
}
DwrHandler.createBookShelf = function(p0, callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'createBookShelf', p0, callback);
}
DwrHandler.getBookShelfItemById = function(p0, callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'getBookShelfItemById', p0, callback);
}
DwrHandler.copyBookShelfItem = function(p0, p1, callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'copyBookShelfItem', p0, p1, callback);
}
DwrHandler.moveBookShelfItem = function(p0, p1, callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'moveBookShelfItem', p0, p1, callback);
}
DwrHandler.deleteBookShelfItem = function(p0, callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'deleteBookShelfItem', p0, callback);
}
DwrHandler.updateBookShelfName = function(p0, p1, callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'updateBookShelfName', p0, p1, callback);
}
DwrHandler.isTrackerDeliveryTypeNameExist = function(p0, p1, callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'isTrackerDeliveryTypeNameExist', p0, p1, callback);
}
DwrHandler.isProductGroupNameExist = function(p0, p1, callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'isProductGroupNameExist', p0, p1, callback);
}
DwrHandler.updateBookShelfItemNote = function(p0, p1, callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'updateBookShelfItemNote', p0, p1, callback);
}
DwrHandler.getTweetsByUsername = function(p0, callback) {
  dwr.engine._execute(DwrHandler._path, 'DwrHandler', 'getTweetsByUsername', p0, callback);
}
