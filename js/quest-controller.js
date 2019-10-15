'use strict';

// NOTE: This is a global used only in the controller

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    $('.game-start').hide();
    $('.quest').show();
    renderQuest();
}

function renderQuest() {
    var currQuest = getCurrQuestText();
    $('.quest h2').text(currQuest)
}


function onUserResponse(res) {

    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            $('.quest').hide();
            $('.game-start').show();
            onRestartGame();
        } else {
            alert('I dont know...teach me!')
            $('.quest').hide();
            $('.new-quest').show();
        }
    } else {
        updateLastRes(res)
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    var $elNewQuest = $('[name="newQuest"]').val();
    var $elNewGuess = $('[name="newGuess"]').val();
    var lastRes = getLastRes()
    addGuess($elNewQuest, $elNewGuess, lastRes)
    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
    gameRestart();
}

