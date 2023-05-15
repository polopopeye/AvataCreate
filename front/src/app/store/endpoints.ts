export const apiHostname = process.env.NEXT_PUBLIC_API_HOSTNAME;

const avatarController = '/avatar';
export const apiAvatarCreate = apiHostname + avatarController + '/create';
export const apiAvatarCreateHead = apiAvatarCreate + '/head';
export const apiAvatarCreateBody = apiAvatarCreate + '/body';

export const apiAvatarGetBodies = apiHostname + avatarController + '/bodies';
export const apiAvatarGetHeads = apiHostname + avatarController + '/heads';

const userController = '/user';
export const apiUserCreate = apiHostname + userController + '/create';
export const apiUserUpdate = apiHostname + userController + '/update';
