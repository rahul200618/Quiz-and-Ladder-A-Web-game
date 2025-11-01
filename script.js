// ============================================
// GAME DATA
// ============================================

// Snakes: Start -> End
var snakes = {
    99: 41,
    95: 77,
    89: 53,
    66: 45,
    54: 31,
    43: 18,
    40: 3,
    27: 5
};

// Ladders: Start -> End
var ladders = {
    4: 25,
    13: 46,
    42: 63,
    50: 69,
    62: 81,
    74: 92
};

// ============================================
// GAME VARIABLES
// ============================================

var player = 1;              // Which player's turn (1 or 2)
var pos1 = 0;                // Player 1 position
var pos2 = 0;                // Player 2 position
var gameOver = false;        // Is game finished?
var questions = [];          // Quiz questions
var qNum = 0;                // Current question number

// ============================================
// START GAME
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    loadQuestions();
    document.getElementById('rollBtn').onclick = roll;
    document.getElementById('resetBtn').onclick = reset;
});

// ============================================
// LOAD QUIZ QUESTIONS
// ============================================

function loadQuestions() {
    fetch('https://opentdb.com/api.php?amount=5')
        .then(function(res) { return res.json(); })
        .then(function(data) { 
            questions = data.results;
            qNum = 0;
        });
}

// ============================================
// ROLL DICE
// ============================================

function roll() {
    if (gameOver) return;
    
    document.getElementById('rollBtn').disabled = true;
    
    fetch('https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new')
        .then(function(res) { return res.text(); })
        .then(function(num) {
            var dice = parseInt(num);
            document.querySelector('.dice-face').textContent = dice;
            move(dice);
        })
        .catch(function() {
            msg('Error! Check internet.');
            document.getElementById('rollBtn').disabled = false;
        });
}

// ============================================
// MOVE PLAYER
// ============================================

function move(dice) {
    var old = getPos();
    var newPos = old + dice;
    
    // Bounce if over 100
    if (newPos > 100) {
        newPos = 100 - (newPos - 100);
        msg('Player ' + player + ' rolled ' + dice + '. Bounced to ' + newPos + '!');
    } else {
        msg('Player ' + player + ' rolled ' + dice + '!');
    }
    
    setPos(newPos);
    draw();
    
    setTimeout(function() {
        check(newPos);
    }, 600);
}

// ============================================
// CHECK SNAKE OR LADDER
// ============================================

function check(pos) {
    if (ladders[pos]) {
        quiz('ladder', pos, ladders[pos]);
    } else if (snakes[pos]) {
        quiz('snake', pos, snakes[pos]);
    } else {
        win();
    }
}

// ============================================
// SHOW QUIZ
// ============================================

function quiz(type, from, to) {
    if (qNum >= questions.length) {
        loadQuestions();
        setTimeout(function() { quiz(type, from, to); }, 1000);
        return;
    }
    
    var q = questions[qNum];
    qNum++;
    
    var right = clean(q.correct_answer);
    var all = [q.incorrect_answers[0], q.incorrect_answers[1], q.incorrect_answers[2], q.correct_answer];
    all.sort(function() { return Math.random() - 0.5; });
    
    if (type === 'ladder') {
        document.getElementById('quizTitle').textContent = '🪜 Ladder Quiz!';
        document.getElementById('quizMessage').textContent = 'Answer right to climb ' + from + ' → ' + to;
    } else {
        document.getElementById('quizTitle').textContent = '🐍 Snake Quiz!';
        document.getElementById('quizMessage').textContent = 'Answer right to avoid sliding ' + from + ' → ' + to;
    }
    
    document.getElementById('quizQuestion').textContent = clean(q.question);
    
    document.getElementById('answer1').textContent = clean(all[0]);
    document.getElementById('answer1').onclick = function() { answer(clean(all[0]) === right, type, from, to); };
    
    document.getElementById('answer2').textContent = clean(all[1]);
    document.getElementById('answer2').onclick = function() { answer(clean(all[1]) === right, type, from, to); };
    
    document.getElementById('answer3').textContent = clean(all[2]);
    document.getElementById('answer3').onclick = function() { answer(clean(all[2]) === right, type, from, to); };
    
    document.getElementById('answer4').textContent = clean(all[3]);
    document.getElementById('answer4').onclick = function() { answer(clean(all[3]) === right, type, from, to); };
    
    document.getElementById('quizModal').style.display = 'flex';
}

// ============================================
// CHECK ANSWER
// ============================================

function answer(right, type, from, to) {
    document.getElementById('quizModal').style.display = 'none';
    
    if (type === 'ladder') {
        if (right) {
            setPos(to);
            msg('✅ Right! Player ' + player + ' climbs to ' + to);
        } else {
            msg('❌ Wrong! Player ' + player + ' stays at ' + from);
        }
    } else {
        if (right) {
            msg('✅ Right! Player ' + player + ' avoids snake!');
        } else {
            setPos(to);
            msg('❌ Wrong! Player ' + player + ' slides to ' + to);
        }
    }
    
    draw();
    setTimeout(win, 1500);
}

// ============================================
// CHECK WINNER
// ============================================

function win() {
    if (getPos() === 100) {
        gameOver = true;
        msg('🎉 Player ' + player + ' WINS! 🎉');
        document.querySelector('.game-status').classList.add('winner');
    } else {
        next();
    }
}

// ============================================
// NEXT PLAYER
// ============================================

function next() {
    player = (player === 1) ? 2 : 1;
    
    document.querySelector('.player1').classList.toggle('active');
    document.querySelector('.player2').classList.toggle('active');
    
    if (!gameOver) {
        msg('Player ' + player + "'s Turn");
    }
    
    document.getElementById('rollBtn').disabled = false;
}

// ============================================
// DRAW BOARD
// ============================================

function draw() {
    var old = document.querySelectorAll('.player-marker');
    for (var i = 0; i < old.length; i++) {
        old[i].remove();
    }
    
    if (pos1 > 0) mark(1, pos1);
    if (pos2 > 0) mark(2, pos2);
    
    document.getElementById('player1Pos').textContent = pos1;
    document.getElementById('player2Pos').textContent = pos2;
}

// ============================================
// DRAW MARKER
// ============================================

function mark(p, pos) {
    var cell = document.getElementById('cell-' + pos);
    if (!cell) return;
    
    var img = document.createElement('img');
    img.className = 'player-marker';
    img.src = 'player' + p + '.svg';
    
    var existing = cell.querySelectorAll('.player-marker');
    if (existing.length > 0) {
        img.style.marginLeft = '25px';
    }
    
    cell.appendChild(img);
}

// ============================================
// GET POSITION
// ============================================

function getPos() {
    return (player === 1) ? pos1 : pos2;
}

// ============================================
// SET POSITION
// ============================================

function setPos(val) {
    if (player === 1) {
        pos1 = val;
    } else {
        pos2 = val;
    }
}

// ============================================
// SHOW MESSAGE
// ============================================

function msg(text) {
    document.getElementById('gameStatus').textContent = text;
}

// ============================================
// CLEAN TEXT
// ============================================

function clean(html) {
    var t = document.createElement('textarea');
    t.innerHTML = html;
    return t.value;
}

// ============================================
// RESET GAME
// ============================================

function reset() {
    player = 1;
    pos1 = 0;
    pos2 = 0;
    gameOver = false;
    qNum = 0;
    
    document.querySelector('.dice-face').textContent = '🎲';
    document.querySelector('.game-status').classList.remove('winner');
    document.querySelector('.player1').classList.add('active');
    document.querySelector('.player2').classList.remove('active');
    document.getElementById('quizModal').style.display = 'none';
    document.getElementById('rollBtn').disabled = false;
    
    draw();
    msg("Player 1's Turn");
    loadQuestions();
}