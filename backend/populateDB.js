const { MongoClient } = require('mongodb');
const axios = require('axios');

// MongoDB connection string
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'diplomski';

(async function () {
  try {
    // Connect to MongoDB
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();

    console.log('Connected successfully to server');

    const db = client.db(dbName);
    
    let brojac = 1;
    const NumOfBooks = 5;
    const URLS = [
      { url: `http://openlibrary.org/subjects/science_fiction.json?limit=${NumOfBooks}`, genre: 'science_fiction' },
      { url: `http://openlibrary.org/subjects/fantasy.json?limit=${NumOfBooks}`, genre: 'fantasy' },
      { url: `http://openlibrary.org/subjects/mystery.json?limit=${NumOfBooks}`, genre: 'mystery' },
      { url: `http://openlibrary.org/subjects/romance.json?limit=${NumOfBooks}`, genre: 'romance' },
      { url: `http://openlibrary.org/subjects/horror.json?limit=${NumOfBooks}`, genre: 'horror' },
      { url: `http://openlibrary.org/subjects/biography.json?limit=${NumOfBooks}`, genre: 'biography' },
      { url: `http://openlibrary.org/subjects/history.json?limit=${NumOfBooks}`, genre: 'history' },
      { url: `http://openlibrary.org/subjects/adventure.json?limit=${NumOfBooks}`, genre: 'adventure' },
      { url: `http://openlibrary.org/subjects/drama.json?limit=${NumOfBooks}`, genre: 'drama' },
      { url: `http://openlibrary.org/subjects/poetry.json?limit=${NumOfBooks}`, genre: 'poetry' }
    ];  

    (async () => {
      for(let i=0; i<URLS.length; i++) {
        // Fetch books
        const response = await axios.get(URLS[i].url);
    
        // Map response into items
        const books = response.data.works.map(work => ({
            title: work.title,
            authors: work.authors.map(author => ({
                name: author.name,
                key: author.key
            })),
            description: null,
            genre: URLS[i].genre,
            first_publish_year: work.first_publish_year,

            cover_id: work.cover_id,
            coverData64: null,
            coverContentType64: null,

            openlibrary_work: work.availability ? work.availability.openlibrary_work : null,
            isbn:work.availability ? work.availability.isbn : null
        }));

        // For each book request a author data via author.key and a picture via cover_id
        for (let book of books) {

          // GET DESCRIPTION of BOOK
          if (book.openlibrary_work != null){
            const bookResponse = await axios.get(`https://openlibrary.org/works/${book.openlibrary_work}.json`);
            book.description = bookResponse.data.description ;
          }
          
          // COVER PICTURE
          if (book.cover_id) {
            // Get a picture(cover)
            const coverResponse = await axios.get(`http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`, { responseType: 'arraybuffer' });

            // Make coverResponse to base64
            const coverBase64 = Buffer.from(coverResponse.data, 'binary').toString('base64');

            // Assign it to a field
            book.coverData64 = `data:${coverResponse.headers['content-type']};base64,${coverBase64}`;
            book.coverContentType64 = coverResponse.headers['content-type'];
          }

          // AUTHOR DATA
          for (let author of book.authors) {
            // Get an author response
            const authorResponse = await axios.get(`http://openlibrary.org${author.key}.json`);

            // Map the response into author object
            const authorData  = {
              key: authorResponse.data.key,
              name: authorResponse.data.name,
              bio: typeof authorResponse.data.bio === 'object' ? authorResponse.data.bio.value : authorResponse.data.bio,
              birth_date: authorResponse.data.birth_date,
              death_date: authorResponse.data.death_date,
              links: authorResponse.data.links
            }

            // Insert author object into db
            const res = await db.collection('authors').insertOne(authorData);
            //console.log(`Inserted ${res.insertedCount} author: ${brojac + authorData.name} into the 'authors' collection`);
            //brojac = brojac + 1;
          }
          
        }

    
        // Insert books into the 'books' collection
        const result = await db.collection('books').insertMany(books);
        console.log(`Inserted ${result.insertedCount} documents of genre: ${URLS[i].genre} into the 'books' collection`);
      }
      
      // Close connection
      await client.close();
    })();

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
