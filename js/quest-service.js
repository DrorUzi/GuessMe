'use strict'

const QUESTS_KEY = 'quests';
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;


function createQuestsTree() {
    gQuestsTree = loadQuestsFromStorage();
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');

    }
    saveQuestsToStorag();
    gameRestart();

}

function gameRestart() {
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gPrevQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    gPrevQuest[lastRes] = createQuest(newQuestTxt);
    gPrevQuest[lastRes].no = gCurrQuest;
    gPrevQuest[lastRes].yes = createQuest(newGuessTxt);
    saveQuestsToStorag();
}

function getCurrQuestText() {
    return gCurrQuest.txt;
}

function getLastRes() {
    return gLastRes;
}

function updateLastRes(res) {
    return gLastRes = res
}


function saveQuestsToStorag() {
    saveToStorage(QUESTS_KEY, gQuestsTree);
}

function loadQuestsFromStorage() {
    return loadFromStorage(QUESTS_KEY);
}
