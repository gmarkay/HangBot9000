'use strict';

angular.module("Hangman").factory("GameFactory", (WordCreds, $http, $q) => {

  let wordUrl = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&';
  let apiKey = WordCreds.apiKey;


  function getWord(minLength, maxLength) {
    console.log(minLength, 'min');
    console.log(maxLength, 'max');
    return $q((resolve, reject) => {
      $http
        .get(`${wordUrl}&inLength=${minLength}&maxLength=${maxLength}&api_key=${apiKey}`)
        .then(({ data }) => {

          resolve(data.word);
        });
    });



  }


  return { getWord };
});
