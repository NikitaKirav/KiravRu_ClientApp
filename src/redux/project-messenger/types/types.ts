export type PostType = {
    id: string
    userId: string
    avatar: string
    createDate: string
    text: string
    userName: string
    likes: number
    dislikes: number
    userLike: string | null
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainlink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    id: string
    userId: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType,
    photos: PhotosType
}
export type UserType = {
    id: string
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}