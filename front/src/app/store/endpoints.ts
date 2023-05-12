export const apiHostname = process.env.NEXT_PUBLIC_API_HOSTNAME;

const avatarController = '/avatar';
export const apiAvatarCreate = apiHostname + avatarController + '/create/';
export const apiAvatarGetBodies = apiHostname + avatarController + '/bodies/';
export const apiAvatarGetHeads = apiHostname + avatarController + '/heads/';

const userController = '/user';
export const apiUserCreate = apiHostname + userController + '/create/';
