'use strict';

angular.module("Hangman").factory("GameFactory", (WordCreds, $http, $q) => {


  let apiKey = WordCreds.apiKey;

  function makeGuess(wordPtrn) {
    console.log(wordPtrn, 'word pattern');
    let guessPtrn = [];
    wordPtrn.forEach((letter, i)=>{
      if(letter === '_'){
        console.log('found dash');
        guessPtrn.push('%3F');
      }else{
        guessPtrn.push(letter);
      }
    });
    guessPtrn = guessPtrn.join('');
    console.log(guessPtrn, 'fixed');
    
    // &minLength=5&maxLength=5&skip=0&limit=100000&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5
    let guessUrl = `http://api.wordnik.com:/v4/words.json/search/${guessPtrn}?caseSensitive=false?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&e&excludePartOfSpeech=given-name&excludePartOfSpeech=family-name&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1`;
    return $q((resolve, reject) => {
      $http
        .get(`${guessUrl}&minLength=${wordPtrn.length}&maxLength=${wordPtrn.length}&skip=0&limit=3000&api_key=${apiKey}`)
        .then(( wordList ) => {
          console.log(wordList, 'word list');
          resolve(wordList);
        });
    });
  }

  function getWord(minLength, maxLength) {

    let wordUrl = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1';

    console.log(minLength, 'min');
    console.log(maxLength, 'max');
    return $q((resolve, reject) => {
      $http
        .get(`${wordUrl}&minLength=${minLength}&maxLength=${maxLength}&api_key=${apiKey}`)
        .then(({ data }) => {

          resolve(data.word);
        });
    });



  }


  return { getWord, makeGuess};
});
