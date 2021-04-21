export type ArticleType = {
    id: number
    name: string
    imagePath: string | null
    imageText: string | null
    dateCreate: string
    dateChange: string
    text: string
    shortDescription: string
    categoryId: number
    difficultyLevel: number
    isFavorite: boolean
    visible: boolean
}
export type ArticleShortType = {
    id: number
    title: string
    description: string
    dateCreate: string
    difficultyLevel: number
}
export type CategoryType = {
    value: string
    label: string
}
export type RoleType = {
    id: string
    name: string
}
export type RolesType = {
    userRoles: Array<string>
    allRoles: Array<RoleType>
}
export type DirInfosType = {

}
export type UserType = {
    
}
