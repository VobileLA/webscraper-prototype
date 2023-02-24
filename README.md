# Introduction
This program is a web scraper that uses the factory method pattern to extract data from websites. The program supports two scraping frameworks, Puppeteer and Playwright, to provide a flexible and scalable solution for web scraping.

# Features
Input data is specified in a JSON file.
Supports two scraping frameworks, Puppeteer and Playwright.
The factory method pattern is used to create the appropriate scraper based on the input data.

# Requirements
Node.js\
npm\
TypeScript

# Usage
1. Clone the repository to your local machine. 
3. Change into the project directory and install the dependencies.
`npm install`
3. Compile the TypeScript code.
`npm run build`
4. Create a JSON file that specifies the queries you want to perform.
```json
  {
    "queries": [
      {
        "flow_type": "INDEXER",
        "work": {
          "id": "1",
          "type": "MOVIE",
          "label": "avatar"
        }
      },
      {
        "flow_type": "HOST_URL_FINDER",
        "work": {
          "label": "Avatar: O Caminho da Água",
          "id": "3",
          "type": "MOVIE"
        },
        "seed": {
          "url": "https://filmoves.net/pelicula/avatar-2"
        }
      }
    ]
  }
```
5. Run the program and pass in the path to the JSON file as an argument.
`npm start <path-to-json-file>`

# Output
The program outputs a JSON file that contains the results of the web scraping queries. The format of the output file is as follows: 
```json
{
        "work_id": 1,
        "match_candidates": [
            {
                "label": "Matrix",
                "url": "https://myflixer.to/movie/the-matrix-19724",
                "metadata": {"imdb": "tt0133093", "poster_url": “https://img.myflixer.to/xxrz/250x400/201/e5/10/e510db60b0ea7b6584ee972b466cc212/e510db60b0ea7b6584ee972b466cc212.jpg", "year": 1999, "description": "Set in the 22nd century, The Matrix tells the story of a computer hacker that joins a group of underground insurgents fighting the vast and powerful computers who now rule the ground.
", “duration”: 136}, 
            }
        ],
    },
    {
        "work_id": 1,
        "match_candidates": [
            {
Process_id: 
Date
work_id:
                "label": "Matrix",
                "url": "https://myflixer.to/movie/the-matrix-19724",
                "metadata": {"imdb": "tt0133093", "poster_url": “https://img.myflixer.to/xxrz/250x400/201/e5/10/e510db60b0ea7b6584ee972b466cc212/e510db60b0ea7b6584ee972b466cc212.jpg", "year": 1999, "description": "Set in the 22nd century, The Matrix tells the story of a computer hacker that joins a group of underground insurgents fighting the vast and powerful computers who now rule the ground.
", “duration”: 136}, 
            }
        ],
    }
```

# Conclusion
This program provides a flexible and scalable solution for web scraping. The use of the factory method pattern and the support for multiple scraping frameworks make it a versatile tool for data extraction.
