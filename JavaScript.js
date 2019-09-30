(function() {

	var ConnectFour = function() {

		gameBoard = {};
		currentPlayer = 'rood';
		numRows = 6;
		numCols = 7;
		numTurns = 0;
		
		// Onderstaande code maakt het mogelijk om een lege ruimte op te vullen.

		_init = function() {
			
			var columns;
			
			columns = document.querySelectorAll('.column');
			
			Array.prototype.forEach.call(columns, function(col) {
				col.addEventListener('click', function() {
					markNextFree(col.getAttribute('data-x'));
				});
			});
			
			for(var x = 0; x <= numRows; x++) {
			
				gameBoard[x] = {};
				
				for(var y = 0; y <= numCols; y++) {
					gameBoard[x][y] = 'free';
				}
			}
			
		};

		// Onderstaande functie bekijkt of de rij nog leeg is en wanneer deze vol is geeft deze een alert.

		var markNextFree = function(x) {

			var nextY;
			
			nextY = false;
			
			for(var y = 0; y < numRows; y++) {
				if(gameBoard[x][y] === 'free') {
					nextY = y;
					break;
				}
			}
			
			// Onderstaande functie geeft een alert als een rij vol zit.

			if(nextY === false) {
				alert('Geen ruimte meer. Probeer een andere rij');
				return false;
			}
			
			gameBoard[x][nextY] = currentPlayer;
			
			document.querySelector('#column-'+x+' .row-'+nextY+' circle').setAttribute(
					'class', currentPlayer
			);
			
			// Onderstaande functie geeft een alert als 1 van de spelers wint (rood of geel)

			if(isWinner(parseInt(x), nextY)) {
				alert(currentPlayer+' wint!');
				clearBoard();
				return true;
			}

			// onderstaande functie geeft een alert als het een gelijkspel is.

			numTurns = numTurns + 1;

			if(numTurns >= numRows * numCols) {
				alert('It\'s a tie!');
				clearBoard();
				return true;				
			}

			currentPlayer = currentPlayer === 'rood' ? 'geel' : 'rood';

		};
		
		//De functie hieronder maakt het mogelijk dat het spel opnieuw begint bij een winnaar of een gelijkspel.

		var clearBoard = function() {
			
			Array.prototype.forEach.call(document.querySelectorAll('circle'), function(piece) {
				piece.setAttribute('class', 'free');
			});
			
			gameBoard = {};

			for(var x = 0; x <= numRows; x++) {
			
				gameBoard[x] = {};
				
				for(var y = 0; y <= numCols; y++) {
					gameBoard[x][y] = 'free';
				}
        
          console.log(gameBoard);
			}

			numTurns = 0;
			
			return gameBoard;

		};

		//De functie hieroner maakt het mogelijk om verticaal, horizontaal en diagonaal een winnaar te vinden.

		var isWinner = function(currentX, currentY) {
			return checkDirection(currentX, currentY, 'vertical') || 
				checkDirection(currentX, currentY, 'diagonal') || 
				checkDirection(currentX, currentY, 'horizontal');
		};
		
		var isBounds = function(x, y) {
			return (gameBoard.hasOwnProperty(x) && typeof gameBoard[x][y] !== 'undefined');
		};

		var checkDirection = function(currentX, currentY, direction) {
		
			var chainLength, directions;
			
			directions = {
				horizontal: [
					[0, -1], [0, 1]
				],
				vertical: [
					[-1, 0], [1, 0]
				],
				diagonal: [
					[-1, -1], [1, 1], [-1, 1], [1, -1]
				]
			};
			
			chainLength = 1;
			
			directions[direction].forEach(function(coords) {
				
				var i = 1;

				while( isBounds(currentX + (coords[0] * i), currentY + (coords[1] * i)) && 
					(gameBoard[currentX + (coords[0] * i)][currentY + (coords[1] * i)] === currentPlayer)
				) {
					chainLength = chainLength + 1; 
					i = i + 1; 
				};
				
			});
			
			return (chainLength >= 4);
			
		};
		
		_init();
		
	};

	ConnectFour();
  
	
})();
