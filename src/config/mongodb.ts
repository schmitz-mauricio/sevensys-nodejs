interface configMongo {
    uri: string,
    database: string
}

export const configMongo:configMongo = {
    uri: 'mongodb+srv://sevensys:nodejs@cluster0-jukop.mongodb.net/mauricio?retryWrites=true&w=majority',
    database: 'mauricio'
};
  