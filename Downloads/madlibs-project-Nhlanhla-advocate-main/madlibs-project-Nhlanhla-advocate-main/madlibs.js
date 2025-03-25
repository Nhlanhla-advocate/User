/**
 * Complete the implementation of parseStory.
 * 
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */

// FUNCTIONS
document.addEventListener("DOMContentLoaded", function() {

  // SET VIDEO START TIME
  let video = document.getElementById('background-video');
  video.currentTime = 11;

  // VIDEO CONTROL BUTTONS
  let resetButton = document.querySelector('.reset');
  let playButton = document.querySelector('.play');
  let stopButton = document.querySelector('.stop');

  resetButton.addEventListener('click', function() {
      video.currentTime = 0;  // Reset video to start
      video.play();  // Play video after resetting
  });

  playButton.addEventListener('click', function() {
      video.play();  // Play the video
  });

  stopButton.addEventListener('click', function() {
      video.pause();  // Pause the video
      video.currentTime = 0;  // Optionally, reset to start when stopped
  });

  // STORY FUNCTIONS 0
  function parseStory(rawStory) {
          let parsedWords = [];
          const regex = /(\w+)(?:\[([nva])\])?/g;
          let match;
          while ((match = regex.exec(rawStory)) !== null) {
          const word = match[1];
          const pos = match[2];
          const wordObject = { word: word };
          if (pos) {
              wordObject.pos = pos === 'n' ? 'noun' : (pos === 'v' ? 'verb' : 'adjective');
          }
          parsedWords.push(wordObject);
      }
      return parsedWords;
  }
  
  // FUNCTION 1
  function fetchStory(url) {
      return fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.text();
          });
  }

  // FUNCTION 2
  function constructStoryHTML(parsedStory, isEditable) {
          let storyHTML = '';
          parsedStory.forEach((wordObject, index) => {
          if (wordObject.pos) {
              storyHTML += `<input type="text" placeholder="${wordObject.pos}" maxlength="20" data-index="${index}"> `;
          } else {
              storyHTML += wordObject.word + ' ';
          }
      });
      return storyHTML;
  }



  // FUNCTION 3
  function updatePreview(inputField, madLibsPreviewDiv) {
          const index = parseInt(inputField.dataset.index, 10);
          const previewInput = madLibsPreviewDiv.querySelector(`input[data-index="${index}"]`);
      if (previewInput) {
          previewInput.value = inputField.value;
          previewInput.placeholder = inputField.placeholder;
      }
  }

  // FETCH AND DISPLAY THE STORY
          const storyUrl = 'story.txt';
          const madLibsPreview = document.querySelector('.madLibsPreview');
          const madLibsEdit = document.querySelector('.madLibsEdit');

  fetchStory(storyUrl)
      .then(data => {
          const parsedStory = parseStory(data);
          const editHTML = constructStoryHTML(parsedStory, true);
          const previewHTML = constructStoryHTML(parsedStory, false);
          
          madLibsEdit.innerHTML = editHTML;
          madLibsPreview.innerHTML = previewHTML;
          

          // UPDATE PREVIEW ON INPUT CHANGES
          const editInputs = madLibsEdit.querySelectorAll('input');
          editInputs.forEach(input => {
              input.addEventListener('input', () => updatePreview(input, madLibsPreview));
          });
      })
      .catch(error => {
          console.error('There was a problem fetching the story:', error);
      });
});
