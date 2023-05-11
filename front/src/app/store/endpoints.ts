export const apiHostname = process.env.NEXT_PUBLIC_API_HOSTNAME;

const fileController = '/file';
export const apiFileUpload = apiHostname + fileController + '/upload/';
export const apiFiles = apiHostname + fileController + '/files/';
export const apiDownload = apiHostname + fileController + '/download/';
export const apiFilesStats = apiHostname + fileController + '/stats/';
export const apiFileCheck = apiHostname + fileController + '/check/';

const userController = '/user';
export const apiUserCreate = apiHostname + userController + '/create/';
export const apiUserGet = apiHostname + userController + '/get/';

export const apiUserLike = apiHostname + userController + '/like/';
export const apiUserUnlike = apiHostname + userController + '/unlike/';
export const apiUserDislike = apiHostname + userController + '/dislike/';
export const apiUserUndislike = apiHostname + userController + '/undislike/';
export const apiUserFavorite = apiHostname + userController + '/favorite/';
export const apiUserUnfavorite = apiHostname + userController + '/unfavorite/';

const commentController = '/comment';
export const apiCommentCreate = apiHostname + commentController + '/create/';
export const apiCommentGet = apiHostname + commentController + '/get/';
export const apiCommentDelete = apiHostname + commentController + '/delete/';

const reportController = '/report';
export const apiReportCreate = apiHostname + reportController + '/create/';
export const apiReportDelete = apiHostname + reportController + '/delete/';