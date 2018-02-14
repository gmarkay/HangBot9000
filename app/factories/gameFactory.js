'use strict';

angular.module("Hangman").factory("GameFactory", (WordCreds, $http, $q) => {
  let apiKey = WordCreds.apiKey;
  let wordUrl = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=5&maxCorpusCount=-1&minDictionaryCount=20&maxDictionaryCount=-1';

  function makeGuess(urlString, wordPtrn, wrongGuesses) {
    return $q((resolve, reject) => {
      let guessUrl = `http://api.wordnik.com:/v4/words.json/search/${urlString}?caseSensitive=false?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&e&excludePartOfSpeech=given-name&excludePartOfSpeech=family-name&minCorpusCount=20&maxCorpusCount=-1&minDictionaryCount=20&maxDictionaryCount=-1`;
      $http
        .get(`${guessUrl}&minLength=${wordPtrn.length}&maxLength=${wordPtrn.length}&skip=0&limit=3000&api_key=${apiKey}`)
        .then(({ data }) => {
          let results = data.searchResults;
          let filteredResults = removeGuessed(results, wrongGuesses);
          if(filteredResults.length ===1){
            let onlyword = filteredResults[0].word.toLowerCase();
            resolve(onlyword);
          }else{
          let highestVal = getHighest(wordPtrn, filteredResults);
            resolve(highestVal);
          }
        });
    });
  }
  //words sometimes include spaces or dashes, so these must be removed before counting probability
  function deleteNaN(alphabet) {
    for (var a in alphabet) {
      if (isNaN(alphabet[a])) {
        delete alphabet[a];
      }
    }
  }
  //remove any words from result that inlude wrongly guessed letters
  function removeGuessed(results, wrongGuesses) {
    for (let x = 0; x < wrongGuesses.length; x++) {
      if (wrongGuesses[x] !== '') {
        results = results.filter(result => {
          if (!result.word.includes(wrongGuesses[x])) {
            return result;
          }
        });
      }
    }
    return results;
  }
  //get the total number of times a letter occurs in all matching words
  function getHighest(wordPtrn, results) {
    let alphabet = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0 };
    results.forEach((result) => {
      let word = result.word.toLowerCase();
      for (let i = 0; i < word.length; i++) {
        if (!wordPtrn.includes(word[i])) {
          alphabet[word[i]]++;
        }
      }
    });
    deleteNaN(alphabet);
    let highest = Object.keys(alphabet).reduce((a, b) => alphabet[a] > alphabet[b] ? a : b);
    return highest;
  }

  function getWord(minLength, maxLength) {
    return $q((resolve, reject) => {
      $http
        .get(`${wordUrl}&minLength=${minLength}&maxLength=${maxLength}&api_key=${apiKey}`)
        .then(({ data }) => {
          resolve(data.word);
        });
    });
  }

  return { getWord, makeGuess };
});
